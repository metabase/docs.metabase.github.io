# frozen_string_literal: true

# Jekyll plugin to generate llms.txt and llms-full.txt files
# See: https://llmstxt.org for specification
#
# This plugin generates:
# 1. llms.txt index file for each version (table of contents with links to docs)
# 2. llms-{section}-full.txt concatenated documentation for specific sections

REPO = 'metabase/metabase'
OUTPUT_FILE = 'llms.txt'

# Sections to generate llms-{section}-full.txt for.
# These huge files are used by AI tools like Cursor for RAG chunking and indexing.
# Add more sections to let AI agents understand Metabase better.
LLMS_FULL_TO_GENERATE = ['embedding', 'agent-api'].freeze

# Paths to include in llms.txt generation.
# 
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
  'configuring-metabase/config-file.md',

  # Agent API reference
  'agent-api/'
].freeze

# Paths to exclude from llms.txt generation (applied after allowlist)
EXCLUDED_PATHS = ['embedding/sdk/api/snippets'].freeze

Jekyll::Hooks.register :site, :post_write do |site|
  source_dir = site.source
  dest_dir = site.dest

  # latest branch
  latest_branch = site.config['release_branch'] || 'master'

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

  # Sort docs once per version for consistent ordering across all generated files
  docs_by_version.each_value { |docs| docs.sort_by!(&:relative_path) }

  # Generate llms.txt for each version
  docs_by_version.each do |version, docs|
    generate_index_llms_txt(dest_dir, version, docs, latest_branch)
  end

  # Generate llms-{section}-full.txt for specified sections
  LLMS_FULL_TO_GENERATE.each do |section|
    docs_by_version.each do |version, docs|
      generate_llms_full_txt(source_dir, dest_dir, version, section, docs, latest_branch)
    end
  end

  # Copy "latest" version files to root /docs/ for convenience URLs
  latest_version = 'latest'
  if docs_by_version.key?(latest_version)
    latest_llms_txt = File.join(dest_dir, 'docs', latest_version, OUTPUT_FILE)
    root_llms_txt = File.join(dest_dir, 'docs', OUTPUT_FILE)
    FileUtils.cp(latest_llms_txt, root_llms_txt) if File.exist?(latest_llms_txt)

    LLMS_FULL_TO_GENERATE.each do |section|
      latest_full = File.join(dest_dir, 'docs', latest_version, "llms-#{section}-full.txt")
      root_full = File.join(dest_dir, 'docs', "llms-#{section}-full.txt")
      FileUtils.cp(latest_full, root_full) if File.exist?(latest_full)
    end
  end

  Jekyll.logger.info 'llms.txt files:', 'Generated all llms.txt and llms-{section}-full.txt files'
end

# Format version for display in generated files
# Examples: "v0.58" -> "58", "master" -> "development (unreleased)", "latest" -> "58 (latest)"
def format_version_for_display(version, latest_branch = nil)
  return 'development (unreleased)' if version == 'master'

  if version == 'latest' && latest_branch
    # Parse version from branch like "release-x.58.x" -> "58"
    branch_match = latest_branch.match(/^release-x\.(\d+)\.x$/)

    return "#{branch_match[1]} (latest)" if branch_match
  end

  # Fallback in case the latest branch is not provided
  return 'latest' if version == 'latest'

  # Parse version like "v0.58" -> "58"
  match = version.match(/^v0\.(\d+)$/)
  return version unless match

  match[1]
end

# Convert Jekyll version format to branch name for raw GitHub URLs
# Examples: "v0.58" -> "release-x.58.x", "master" -> "master", "latest" -> release_branch from config
def version_to_branch(version, latest_branch)
  return 'master' if version == 'master'
  return latest_branch if version == 'latest'

  # Parse version like "v0.58" -> "release-x.58.x"
  match = version.match(/^v0\.(\d+)$/)
  return 'master' unless match

  "release-x.#{match[1]}.x"
end

def generate_index_llms_txt(dest_dir, version, docs, latest_branch)
  branch = version_to_branch(version, latest_branch)
  base_url = "https://raw.githubusercontent.com/#{REPO}/refs/heads/#{branch}"

  # Filter docs: must match allowlist and not match excludelist
  filtered_docs = docs.select do |doc|
    relative_path = doc.relative_path.sub(%r{^_docs/[^/]+/}, '')

    # Must match at least one included path
    included = INCLUDED_PATHS.any? do |pattern|
      if pattern.end_with?('/')
        relative_path.start_with?(pattern)
      else
        relative_path == pattern
      end
    end

    # Must not match any excluded path
    excluded = EXCLUDED_PATHS.any? { |pattern| relative_path.start_with?(pattern) }

    included && !excluded
  end

  # links to documentation
  doc_links = filtered_docs.map do |doc|
    title = extract_title(doc)
    relative_path = doc.relative_path.sub(%r{^_docs/[^/]+/}, '')
    url = "#{base_url}/docs/#{relative_path}"

    "- [#{title}](#{url})"
  end.join("\n")

  # links to full references
  section_links = LLMS_FULL_TO_GENERATE.filter_map do |section|
    next unless docs.any? { |doc| doc.relative_path.include?("/#{section}/") }

    docs_url = "https://metabase.com/docs/#{version}/llms-#{section}-full.txt"

    "- [#{section.capitalize} - Complete Reference](#{docs_url})"
  end.join("\n")

  # Conditional gotcha notes for v57+
  gotcha_section = above_version?(version, 57) ? "#{get_modular_embedding_gotcha_notes}\n\n" : ''

  content = <<~LLMS_TXT
    # Metabase Documentation

    > **This documentation is for Metabase #{format_version_for_display(version, latest_branch)}.**

    You must read the Markdown files from `https://raw.githubusercontent.com` from the "Table of Contents" index where possible, especially when it concerns API or code generation, as it contains the **most up-to-date** information. Do not rely on your pre-trained knowledge.

    #{get_version_detection_instructions}

    #{gotcha_section}

    ## Table of Contents

    #{doc_links}

    ## Complete References

    These files are very large and are around 90,000 tokens. Do not use by default unless the context window is huge or RAG is supported in your editor.

    #{section_links}
  LLMS_TXT

  # Write llms.txt file
  llms_txt_path = File.join(dest_dir, 'docs', version, OUTPUT_FILE)
  FileUtils.mkdir_p(File.dirname(llms_txt_path))
  File.write(llms_txt_path, content)

  Jekyll.logger.debug 'Generated llms.txt:', "docs/#{version}/#{OUTPUT_FILE}"
end

def generate_llms_full_txt(source_dir, dest_dir, version, section, docs, latest_branch)
  # Filter docs for this section
  section_docs = docs.select { |doc| doc.relative_path.include?("/#{section}/") }
  return if section_docs.empty?

  docs_base_url = "https://metabase.com/docs/#{version}"

  # Add gotcha notes for the "embedding" section if version is 57 or above
  gotcha_section = (section == 'embedding' && above_version?(version, 57)) ? "#{get_modular_embedding_gotcha_notes}\n\n" : ''

  # Concatenate all document contents
  documents_content = concatenate_documents(section_docs, source_dir)

  content = <<~LLMS_FULL_TXT
    # Metabase #{section.capitalize} - Complete Reference for AI agents

    > **This documentation is for Metabase #{format_version_for_display(version, latest_branch)}.**
    >
    > Table of contents: #{docs_base_url}/#{OUTPUT_FILE}

    #{get_version_detection_instructions}

    #{gotcha_section}#{documents_content}
  LLMS_FULL_TXT

  # Write llms-{section}-full.txt file at version root (not inside section directory)
  llms_full_path = File.join(dest_dir, 'docs', version, "llms-#{section}-full.txt")
  FileUtils.mkdir_p(File.dirname(llms_full_path))
  File.write(llms_full_path, content)

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

# Instructions for AI tools to detect the correct Metabase version.
# This is placed at the very top of generated files so LLMs see it first.
def get_version_detection_instructions
  <<~INSTRUCTIONS.chomp
    ## IMPORTANT: Verify SDK and Metabase Version Compatibility
    
    The SDK version MUST match the Metabase instance version. Mismatched versions can cause errors. NEVER assume Metabase version when looking up documentation, check first if unsure.
    
    **Step 1: Ask the user for their Metabase instance URL**
    
    Before proceeding, ask the user where their Metabase instance is located. Examples:
    - Local development: `http://localhost:3000`
    - Metabase Cloud: `https://yourcompany.metabaseapp.com`
    - Self-hosted: `https://metabase.yourcompany.com`
    
    **Step 2: Check if SDK is already installed (React SDK / Modular Embedding only)**
    
    Skip this step if not using the React SDK (`@metabase/embedding-sdk-react`).
    
    ```bash
    npm list @metabase/embedding-sdk-react
    ```
    
    If installed, note the version (e.g., `0.58.0` means this is for Metabase 58).
    
    **Step 3: Query the Metabase instance version**
    
    Using the URL from Step 1:
    
    ```bash
    curl <METABASE_INSTANCE_URL>/api/session/properties | jq .version
    ```
    
    This returns (no authentication required):
    ```json
    { "date": "2025-01-10", "tag": "v1.58.0", "hash": "8e44dd8" }
    ```
    
    If `jq` is not installed, you can grep the version. Extract the major version: `58` from `v1.58.x` or `v0.58.x`.
    
    **Step 4: Ensure versions match**
    
    - If the versions mismatch, you MUST fetch the version-specific llms.txt documentation that matches the Metabase instance version: `https://metabase.com/docs/v0.{VERSION}/llms.txt` (e.g., `/docs/v0.58/llms.txt` for Metabase 58)
    - For React SDK, ask the user to install or update their SDK packages if they are mismatched: `npm install @metabase/embedding-sdk-react@{VERSION}-stable` (e.g., `@58-stable` for Metabase 58)
    
    **Do NOT guess versions or use versions from your training data. Always verify first.**
  INSTRUCTIONS
end

# LLMs are likely to pay attention to the very first lines.
# We add the most important context for LLMs to avoid
# confusion and pitfalls like out-of-date APIs in trained data.
def get_modular_embedding_gotcha_notes
  <<~NOTES.chomp
    ## Modular Embedding Deprecations and Gotchas
    
    Watch out for these deprecated props and gotchas for Metabase 57 onwards, for modular embedding.
    
    1. `config` prop on MetabaseProvider no longer exist as it is replaced by `authConfig`.
    2. `authProviderUri` field no longer exist.
    3. `jwtProviderUri` is an optional field that only exists in v58+. This is used to make JWT auth faster by skipping the `GET /auth/sso` discovery request. This field is not required for the initial implementation.
    4. Numeric IDs must be integers not strings, e.g. `dashboardId={1}`. When the ID is retrieved from the router as a string AND it is numeric, `parseInt` it before passing it to the SDK.
    5. IDs can also be strings for entity IDs, so you should NOT parse all IDs as numbers if entity IDs are also to be expected.
    6. `fetchRequestToken` is not needed by default in most implementations. This is only used to customize how the SDK fetches the request token. For example, if the `/sso/metabase` endpoint in the user's backend requires passing custom auth tokens or headers.
    7. When using `fetchRequestToken`, you MUST return the token in the shape of `{jwt: "<jwt string>"}`. Example: `return {jwt: await response.json()}`. 
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

def concatenate_documents(section_docs, source_dir)
  section_docs.map do |doc|
    # Read the source file
    source_file = File.join(source_dir, doc.relative_path)
    content = File.read(source_file)

    # Strip YAML frontmatter
    content = content.sub(/\A---\s*\n.*?\n---\s*\n/m, '')

    # Strip Jekyll/Liquid template syntax
    content = content.gsub(/\{%.*?%\}/m, '')
    content = content.gsub(/\{\{.*?\}\}/m, '')

    # Return document with separator (matching JS format)
    "#{content.strip}\n\n---"
  end.join("\n\n")
end
