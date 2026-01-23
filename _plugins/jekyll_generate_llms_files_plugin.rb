# frozen_string_literal: true

# Jekyll plugin to generate llms.txt and llms-full.txt files
# See: https://llmstxt.org for specification
#
# This plugin generates:
# 1. llms.txt index file for each version (table of contents with links to docs)
# 2. llms-{section}-full.txt concatenated documentation for specific sections
#
# This plugin mirrors the behavior of the generate-llms-txt.js script in the main repo.

REPO = 'metabase/metabase'
OUTPUT_FILE = 'llms.txt'

# Sections to generate llms-{section}-full.txt for.
# These huge files are used by AI tools like Cursor for RAG chunking and indexing.
# Add more sections to let AI agents understand Metabase better.
LLMS_FULL_TO_GENERATE = ['embedding'].freeze

# Paths to include in llms.txt generation (allowlist approach).
# We focus on content relevant to coding with Metabase:
# 1. Embedding integration guides (modular embedding & SDK)
# 2. Embedding related setup and config (auth, SSO)
#
# Use prefix matching - a path matches if it starts with any of these.
# For specific files, include the full path. For directories, include trailing slash.
INCLUDED_PATHS = [
  # All embedding docs (SDK, modular embedding, integration guides)
  'embedding/',

  # Auth/SSO configuration for embedding
  'people-and-groups/api-keys.md',
  'people-and-groups/authenticating-with-jwt.md',
  'people-and-groups/authenticating-with-saml.md',
  'people-and-groups/saml-auth0.md',
  'people-and-groups/saml-azure.md',
  'people-and-groups/saml-google.md',
  'people-and-groups/saml-keycloak.md',
  'people-and-groups/saml-okta.md',
  'people-and-groups/google-sign-in.md',
  'people-and-groups/ldap.md',

  # Configuration reference
  'configuring-metabase/environment-variables.md',
  'configuring-metabase/config-file.md'
].freeze

# Paths to exclude from llms.txt generation (applied after allowlist)
EXCLUDED_PATHS = ['embedding/sdk/api/snippets'].freeze

Jekyll::Hooks.register :site, :post_write do |site|
  source_dir = site.source
  dest_dir = site.dest

  # Get the docs collection
  docs_collection = site.collections['docs']
  next unless docs_collection

  # Group documents by version
  docs_by_version = Hash.new { |h, k| h[k] = [] }

  docs_collection.docs.each do |doc|
    # Extract version from path: _docs/VERSION/path/to/file.md
    # Skip files directly under _docs/ like _docs/index.md
    match = doc.relative_path.match(%r{^_docs/(?<version>[^/]+)/.+\.md$})
    next unless match

    # Skip README.md files
    next if File.basename(doc.relative_path) == 'README.md'

    version = match[:version]
    docs_by_version[version] << doc
  end

  # Generate llms.txt for each version
  docs_by_version.each do |version, docs|
    generate_index_llms_txt(dest_dir, version, docs)
  end

  # Generate llms-{section}-full.txt for specified sections
  LLMS_FULL_TO_GENERATE.each do |section|
    docs_by_version.each do |version, docs|
      generate_llms_full_txt(source_dir, dest_dir, version, section, docs)
    end
  end

  Jekyll.logger.info 'llms.txt files:', 'Generated all llms.txt and llms-{section}-full.txt files'
end

# Convert Jekyll version format to branch name for raw GitHub URLs
# Examples: "v0.58" -> "release-x.58.x", "master" -> "master", "latest" -> "master"
def version_to_branch(version)
  return 'master' if %w[master latest].include?(version)

  # Parse version like "v0.58" -> "release-x.58.x"
  match = version.match(/^v0\.(\d+)$/)
  return 'master' unless match

  "release-x.#{match[1]}.x"
end

def generate_index_llms_txt(dest_dir, version, docs)
  sorted_docs = docs.sort_by(&:relative_path)
  branch = version_to_branch(version)
  base_url = "https://raw.githubusercontent.com/#{REPO}/refs/heads/#{branch}"

  # Filter docs: must match allowlist and not match excludelist
  filtered_docs = sorted_docs.select do |doc|
    relative_path = doc.relative_path.sub(%r{^_docs/[^/]+/}, '')

    # Must match at least one included path
    included = INCLUDED_PATHS.any? do |pattern|
      if pattern.end_with?('/')
        # Directory pattern: check if path starts with it
        relative_path.start_with?(pattern)
      else
        # File pattern: exact match
        relative_path == pattern
      end
    end

    # Must not match any excluded path
    excluded = EXCLUDED_PATHS.any? { |pattern| relative_path.start_with?(pattern) }

    included && !excluded
  end

  # Build table of contents
  lines = []
  lines << '# Metabase Documentation'
  lines << 'Metabase - The simplest, fastest way to get business intelligence and analytics to everyone in your company.'
  lines << ''
  lines << '## Table of Contents'
  lines << ''

  filtered_docs.each do |doc|
    # Get the title using the same logic as the JS script
    title = extract_title(doc)

    # Remove _docs/VERSION/ prefix to get the relative path
    relative_path = doc.relative_path.sub(%r{^_docs/[^/]+/}, '')

    # Create markdown link with raw GitHub URL
    url = "#{base_url}/docs/#{relative_path}"
    lines << "- [#{title}](#{url})"
  end

  # Add reference to llms-full.txt files
  lines << ''
  lines << '## Complete References'
  lines << ''
  lines << 'These files are very large and are around 90,000 tokens. Do not use by default unless the context window is huge or RAG is supported in your editor.'
  lines << ''

  LLMS_FULL_TO_GENERATE.each do |section|
    # Check if this version has docs in this section
    has_section = docs.any? { |doc| doc.relative_path.include?("/#{section}/") }
    next unless has_section

    capitalized = section.capitalize
    lines << "- [#{capitalized} - Complete Reference](#{base_url}/llms-#{section}-full.txt)"
  end

  # Write llms.txt file
  llms_txt_path = File.join(dest_dir, 'docs', version, OUTPUT_FILE)
  FileUtils.mkdir_p(File.dirname(llms_txt_path))
  File.write(llms_txt_path, lines.join("\n") + "\n")

  Jekyll.logger.debug 'Generated llms.txt:', "docs/#{version}/#{OUTPUT_FILE}"
end

def generate_llms_full_txt(source_dir, dest_dir, version, section, docs)
  # Filter docs for this section
  section_docs = docs.select { |doc| doc.relative_path.include?("/#{section}/") }
  return if section_docs.empty?

  # Sort by path for consistent ordering
  section_docs.sort_by!(&:relative_path)

  branch = version_to_branch(version)
  base_url = "https://raw.githubusercontent.com/#{REPO}/refs/heads/#{branch}"

  # Build content
  section_capitalized = section.capitalize
  lines = []
  lines << "# Metabase #{section_capitalized} - Complete Reference for AI agents"
  lines << ''
  lines << "> Table of contents: #{base_url}/#{OUTPUT_FILE}"
  lines << ''

  # Add preamble for embedding section (v57+ only)
  if section == 'embedding' && above_version?(version, 57)
    lines << get_modular_embedding_gotcha_notes
    lines << ''
  end

  # Concatenate all documents into llms-full.txt
  llms_full_concatenate_documents(lines, section_docs, source_dir)

  # Write llms-{section}-full.txt file at version root (not inside section directory)
  llms_full_path = File.join(dest_dir, 'docs', version, "llms-#{section}-full.txt")
  FileUtils.mkdir_p(File.dirname(llms_full_path))
  File.write(llms_full_path, lines.join("\n"))

  Jekyll.logger.debug 'Generated llms-full.txt:', "docs/#{version}/llms-#{section}-full.txt"
end

def above_version?(source_version, target_version)
  # master and latest always get the notes
  return true if %w[master latest].include?(source_version)

  # Parse version like "v0.58" -> 58
  match = source_version.match(/^v0\.(\d+)$/)
  return false unless match

  version_num = match[1].to_i
  version_num >= target_version
end

# LLMs are likely to pay attention to the very first lines.
# We add the most important context for LLMs to avoid
# confusion and pitfalls like out-of-date APIs in trained data.
def get_modular_embedding_gotcha_notes
  <<~NOTES.chomp
    > **Important Version Notes**
    >
    > Watch out for these deprecated props and gotchas for Metabase 57 onwards, for modular embedding:
    >
    > 1. `config` prop on MetabaseProvider no longer exist - it is replaced by `authConfig`.
    > 2. `authProviderUri` field no longer exist.
    > 3. `jwtProviderUri` optional field only exists in v58+. This is used to make JWT auth faster by skipping the `GET /auth/sso` discovery request. Not needed for initial implementation.
    > 4. `fetchRequestToken` is not needed by default. This is only used to customize how the SDK fetches the request token.
    > 5. Numeric IDs must be integers not strings, e.g. `dashboardId={1}`. When the ID is retrieved from the URL and it is numeric, convert it to an integer via `parseInt` before passing it to the SDK. IDs can also be strings for entity ids, so you should not parse all IDs as numbers if entity ids are also to be expected.
  NOTES
end

# Extract title from document using the same logic as the JS script:
# 1. Try YAML frontmatter title
# 2. Try first H1 heading
# 3. Fallback to filename converted to title case
def extract_title(doc)
  # First, try frontmatter title
  return doc.data['title'] if doc.data['title'] && !doc.data['title'].empty?

  # Read content and try to find H1 heading
  content = doc.content || ''
  h1_match = content.match(/^#\s+(.+)$/m)
  return h1_match[1].strip if h1_match

  # Fallback to filename
  filename = File.basename(doc.relative_path, '.md')
  # Convert kebab-case or snake_case to Title Case
  filename.split(/[-_]/).map(&:capitalize).join(' ')
end

def llms_full_concatenate_documents(lines, section_docs, source_dir)
  section_docs.each do |doc|
    # Read the source file
    source_file = File.join(source_dir, doc.relative_path)
    content = File.read(source_file)

    # Strip YAML frontmatter
    content = content.sub(/\A---\s*\n.*?\n---\s*\n/m, '')

    # Strip Jekyll/Liquid template syntax
    content = content.gsub(/\{%.*?%\}/m, '')
    content = content.gsub(/\{\{.*?\}\}/m, '')

    # Add document section with separator (matching JS format)
    lines << "#{content.strip}\n\n---\n"
  end
end
