require "liquid"

module Jekyll
  class TolerantIncludeFileTag < Liquid::Tag
    def initialize(tag_name, markup, tokens)
      super
      @markup = markup.strip
    end

    def render(context)
      site = context.registers[:site]
      path = Liquid::Template.parse(@markup).render(context).strip
      path = path.delete_prefix('"').delete_suffix('"').delete_prefix("'").delete_suffix("'")
      full_path = File.expand_path(path, site.source)

      if File.file?(full_path)
        File.read(full_path)
      else
        "```text\nSnippet unavailable: #{path}\n```"
      end
    end
  end
end

Liquid::Template.register_tag("include_file", Jekyll::TolerantIncludeFileTag)
