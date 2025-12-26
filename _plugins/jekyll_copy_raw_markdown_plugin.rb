# frozen_string_literal: true

# Jekyll plugin to copy raw markdown files to the _site directory
# This allows llms.txt and AI agents to reference raw .md files.
# Example: https://www.metabase.com/docs/latest/data-modeling/models.md
Jekyll::Hooks.register :site, :post_write do |site|
  # Get the source and destination directories
  source_dir = site.source
  dest_dir = site.dest

  # Process the docs collection
  docs_collection = site.collections['docs']
  next unless docs_collection

  docs_collection.docs.each do |doc|
    relative_source_path = doc.relative_path

    # Skip if not a markdown file
    next unless relative_source_path.end_with?('.md')

    source_file = File.join(source_dir, relative_source_path)
    dest_path = relative_source_path.sub(/^_docs\//, 'docs/')
    dest_file = File.join(dest_dir, dest_path)
    content = File.read(source_file)

    # Create the destination directory
    FileUtils.mkdir_p(File.dirname(dest_file))

    # Strip YAML frontmatter
    content_without_frontmatter = content.sub(/\A---\s*\n.*?\n---\s*\n/m, '')

    # Strip Liquid templates in {% ... %} tags
    content_clean = content_without_frontmatter.gsub(/\{%.*?%\}/m, '')

    File.write(dest_file, content_clean)

    Jekyll.logger.debug "Copied raw markdown:", "#{relative_source_path} -> #{dest_path}"
  end

  Jekyll.logger.info "Raw markdown files:", "Copied all .md files to site output"
end
