# frozen_string_literal: true

# Jekyll plugin to generate llms.txt and llms-full.txt files
# See: https://llmstxt.org for specification
#
# This plugin generates:
# 1. llms.txt index file for each version (table of contents)
# 2. llms-full.txt concatenated documentation for specific sections

# Sections to generate llms-full.txt for.
# These huge files are used by AI tools like Cursor for RAG chunking and indexing.
# Add more sections to let AI agents understand Metabase better.
LLMS_FULL_TO_GENERATE = ['embedding'].freeze

Jekyll::Hooks.register :site, :post_write do |site|
  source_dir = site.source
  dest_dir = site.dest

  # Get the docs collection
  docs_collection = site.collections['docs']
  next unless docs_collection

  # Group documents by version
  docs_by_version = Hash.new { |h, k| h[k] = [] }

  docs_collection.docs.each do |doc|
    next unless doc.relative_path.end_with?('.md')

    # Extract version from path: _docs/VERSION/...
    path_parts = doc.relative_path.split('/')
    next if path_parts.length < 2

    # _docs/VERSION/...
    version = path_parts[1]
    docs_by_version[version] << doc
  end

  # Generate llms.txt for each version
  docs_by_version.each do |version, docs|
    generate_index_llms_txt(site, dest_dir, version, docs)
  end

  # Generate llms-full.txt for specified sections
  LLMS_FULL_TO_GENERATE.each do |section|
    docs_by_version.each do |version, docs|
      generate_llms_full_txt(source_dir, dest_dir, version, section, docs)
    end
  end

  Jekyll.logger.info "llms.txt files:", "Generated all llms.txt and llms-full.txt files"
end

def generate_index_llms_txt(site, dest_dir, version, docs)
  sorted_docs = docs.sort_by(&:relative_path)

  # Build table of contents
  lines = []
  lines << '# Metabase Documentation'
  lines << 'Metabase - The simplest, fastest way to get business intelligence and analytics to everyone in your company.'
  lines << ''
  lines << '## Table of Contents'

  sorted_docs.each do |doc|
    # Get the title from frontmatter or filename
    title = doc.data['title'] || File.basename(doc.relative_path, '.md').gsub('-', ' ').capitalize

    # Remove _docs/VERSION/ prefix to get the relative path
    relative_path = doc.relative_path.sub(%r{^_docs/[^/]+/}, '')

    # Create markdown link: - [Title](/docs/version/path.md)
    md_url = "/docs/#{version}/#{relative_path}"
    lines << "- [#{title}](#{md_url})"
  end

  # Add reference to llms-full.txt files
  lines << ""
  lines << "## Complete References"

  LLMS_FULL_TO_GENERATE.each do |section|
    # Check if this version has docs in this section
    has_section = docs.any? { |doc| doc.relative_path.include?("/#{section}/") }
    if has_section
      lines << "- [#{section.capitalize} Complete Reference](/docs/#{version}/#{section}/llms-full.txt)"
    end
  end

  # Write llms.txt file
  llms_txt_path = File.join(dest_dir, 'docs', version, 'llms.txt')
  FileUtils.mkdir_p(File.dirname(llms_txt_path))
  File.write(llms_txt_path, lines.join("\n"))

  Jekyll.logger.debug "Generated llms.txt:", "docs/#{version}/llms.txt"
end

def generate_llms_full_txt(source_dir, dest_dir, version, section, docs)
  # Filter docs for this section
  section_docs = docs.select { |doc| doc.relative_path.include?("/#{section}/") }
  return if section_docs.empty?

  # Sort by path for consistent ordering
  section_docs.sort_by!(&:relative_path)

  # Concatenate content
  lines = []
  lines << "# Metabase #{section.capitalize} - Complete Reference"
  lines << ''
  lines << "> Table of contents: https://metabase.com/docs/#{version}/llms.txt"
  lines << ''

  # Add special note for embedding section (v58+ only)
  add_embedding_v58_notes(lines) if section == 'embedding' && above_version?(version, 58)

  # Concatenate all documents into llms-full.txt
  llms_full_concatenate_documents(lines, section_docs, source_dir)

  llms_full_path = File.join(dest_dir, 'docs', version, section, 'llms-full.txt')
  FileUtils.mkdir_p(File.dirname(llms_full_path))
  File.write(llms_full_path, lines.join("\n"))

  Jekyll.logger.debug 'Generated llms-full.txt:', "docs/#{version}/#{section}/llms-full.txt"
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

def add_embedding_v58_notes(lines)
  lines << '> **Important Version Notes+**'
  lines << '>'
  lines << '> Watch out for these deprecated props and gotchas for Metabase 58 onwards:'
  lines << '>'
  lines << '> 1. `config` prop on MetabaseProvider no longer exist - it is replaced by `authConfig`.'
  lines << '> 2. `authProviderUri` field no longer exist.'
  lines << '> 3. `jwtProviderUri` field is not needed by default. This is only used to speed up ' \
           'JWT authentication by skipping the `GET /auth/sso` discovery request, not usually needed.'
  lines << '> 4. `fetchRequestToken` is not needed by default. This is only used to customize ' \
           'how the SDK fetches the request token.'
  lines << '> 5. Numeric IDs must be integers not strings, e.g. `dashboardId={1}`. When the ID is ' \
           'retrieved from the URL, make sure to convert it to an integer via `parseInt` before ' \
           'passing it to the SDK.'
  lines << ''
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

    # Add document section
    lines << content.strip
    lines << ''
    lines << '---'
    lines << ''
  end
end
