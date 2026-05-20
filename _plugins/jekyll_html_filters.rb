require "nokogiri"

module Jekyll
  module JekyllHtmlFilterUtils
    module_function

    ABSOLUTE_URL_ATTRIBUTES = %w[href src action poster].freeze
    PASS_THROUGH_URL_PREFIXES = ["#", "mailto:", "tel:", "data:", "javascript:"].freeze

    def absolute_url(url, origin)
      return url if url.nil? || url.empty?
      return url if PASS_THROUGH_URL_PREFIXES.any? { |prefix| url.start_with?(prefix) }
      return url if url.match?(%r{\A(?:[a-z][a-z0-9+\-.]*:)?//}i)

      url.start_with?("/") ? "#{origin.sub(%r{/\z}, "")}#{url}" : url
    end

    def absolutize_srcset(srcset, origin)
      srcset.split(",").map do |candidate|
        url, descriptor = candidate.strip.split(/\s+/, 2)
        next candidate if url.nil? || url.empty?

        [absolute_url(url, origin), descriptor].compact.join(" ")
      end.join(", ")
    end

    def absolutize_style_urls(style, origin)
      style.gsub(/url\((['"]?)(\/[^)'"]*)\1\)/i) do
        quote = Regexp.last_match(1)
        path = Regexp.last_match(2)
        %(url(#{quote}#{absolute_url(path, origin)}#{quote}))
      end
    end

    def absolutize_html_fragment(html, origin)
      fragment = Nokogiri::HTML5::DocumentFragment.parse(html.to_s)

      fragment.css("*").each do |node|
        ABSOLUTE_URL_ATTRIBUTES.each do |attribute|
          next unless node[attribute]

          node[attribute] = absolute_url(node[attribute], origin)
        end

        node["srcset"] = absolutize_srcset(node["srcset"], origin) if node["srcset"]
        node["style"] = absolutize_style_urls(node["style"], origin) if node["style"]
      end

      fragment.to_html
    end

    def node_to_tag_object(node)
      tag_object = {
        "tag" => node.name,
        "attributes" => node.attribute_nodes.to_h { |attribute| [attribute.name, attribute.value] },
      }
      children = node.inner_html
      tag_object["children"] = children unless children.nil? || children.empty?
      tag_object
    end

    def absolutize_value(value, origin)
      case value
      when Array
        value.map { |entry| absolutize_value(entry, origin) }
      when Hash
        value.each_with_object({}) do |(key, entry), memo|
          memo[key] =
            case key.to_s
            when *ABSOLUTE_URL_ATTRIBUTES
              absolute_url(entry, origin)
            when "srcset"
              absolutize_srcset(entry, origin)
            when "style"
              absolutize_style_urls(entry, origin)
            else
              absolutize_value(entry, origin)
            end
        end
      when String
        value
      else
        value
      end
    end
  end

  module JekyllHtmlFilters
    def just(html, selector)
      fragment = Nokogiri::HTML5::DocumentFragment.parse(html.to_s)
      fragment.css(selector.to_s).map(&:to_html).join("\n")
    end

    def structurize(html)
      fragment = Nokogiri::HTML5::DocumentFragment.parse(html.to_s)
      fragment.css("*").map do |node|
        JekyllHtmlFilterUtils.node_to_tag_object(node)
      end
    end

    def use_absolute_urls(value, origin)
      case value
      when Array, Hash
        JekyllHtmlFilterUtils.absolutize_value(value, origin)
      else
        JekyllHtmlFilterUtils.absolutize_html_fragment(value, origin)
      end
    end
  end
end

Liquid::Template.register_filter(Jekyll::JekyllHtmlFilters)
