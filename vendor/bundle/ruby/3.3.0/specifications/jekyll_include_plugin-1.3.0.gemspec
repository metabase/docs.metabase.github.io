# -*- encoding: utf-8 -*-
# stub: jekyll_include_plugin 1.3.0 ruby lib

Gem::Specification.new do |s|
  s.name = "jekyll_include_plugin".freeze
  s.version = "1.3.0".freeze

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.metadata = { "homepage_uri" => "https://github.com/flant/jekyll_include_plugin", "source_code_uri" => "https://github.com/flant/jekyll_include_plugin" } if s.respond_to? :metadata=
  s.require_paths = ["lib".freeze]
  s.authors = ["Ilya Lesikov".freeze]
  s.bindir = "exe".freeze
  s.date = "2025-03-19"
  s.email = ["ilya@lesikov.com".freeze]
  s.homepage = "https://github.com/flant/jekyll_include_plugin".freeze
  s.licenses = ["MIT".freeze]
  s.required_ruby_version = Gem::Requirement.new(">= 2.6.3".freeze)
  s.rubygems_version = "3.5.9".freeze
  s.summary = "Plugin for including contents of local/remote plain text files (or parts of them) into your pages. Allows for multilang comments in the included files.".freeze

  s.installed_by_version = "3.5.9".freeze if s.respond_to? :installed_by_version

  s.specification_version = 4

  s.add_runtime_dependency(%q<liquid>.freeze, ["~> 4.0".freeze])
  s.add_runtime_dependency(%q<jekyll>.freeze, [">= 3.5".freeze, "< 5.0".freeze])
  s.add_development_dependency(%q<rake>.freeze, ["~> 13.0".freeze])
  s.add_development_dependency(%q<rspec>.freeze, ["~> 3.0".freeze])
end
