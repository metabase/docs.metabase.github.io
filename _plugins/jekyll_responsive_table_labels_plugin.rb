require "nokogiri"

module Jekyll
  module ResponsiveTableLabels
    def self.process(doc)
      return unless doc.output_ext == ".html"

      html = Nokogiri::HTML5(doc.output)

      html.css("table").each do |table|
        header_cells =
          table.at_css("thead tr")&.css("th") ||
          table.at_css("tr")&.css("th,td")
        next if header_cells.nil? || header_cells.empty?

        headers = header_cells.map { |th| th.text.strip }

        table.css("tbody tr, tr").each do |tr|
          tr.css("td").each_with_index do |td, idx|
            label = headers[idx]
            next if label.nil? || label.empty?
            td.set_attribute("data-label", label)
          end
        end
      end

      doc.output = html.to_html
    end
  end

  Hooks.register(%i[pages documents], :post_render) do |doc|
    ResponsiveTableLabels.process(doc)
  end
end
