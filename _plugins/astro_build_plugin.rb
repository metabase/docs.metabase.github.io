Jekyll::Hooks.register :site, :post_write do |site|
  next if site.config['serving']

  build_astro = "bun run build"

  raise "Astro build failed" unless system(build_astro)

  shuffle_directories = "rsync -a dist/* _site && rm -rf dist"

  raise "Astro sitemap rename / sync failed" unless system("#{shuffle_directories}")
end
