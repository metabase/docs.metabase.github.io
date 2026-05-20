# Adds the `dirname` field to the `payload`
Jekyll::Hooks.register [:pages, :documents], :pre_render do |page, payload|
  site_source = Pathname.new(page.site.source)

  path = page.path || page.relative_path
  absolute_path = Pathname.new(path)

  relative_path = absolute_path.absolute? ? absolute_path.relative_path_from(site_source).to_s : path

  dirname = File.dirname(relative_path)
  payload["dirname"] = (dirname == "." ? "/" : "/#{dirname}")
end
