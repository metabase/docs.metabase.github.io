# Builds `site.data.version_support`, a lookup table of support status keyed by
# the version strings used throughout the site ("v0.63", "v0.57", ...).
#
# The source data is _data/major_version_support.json, refreshed nightly from
# the `major_version_support` key of https://static.metabase.com/version-info.json
# by .github/workflows/update-version-support.yml
#
# Templates just look a version up:
#
#   {% assign support = site.data.version_support[page.version] %}
#   {% if support.status == "unsupported" %}...{% endif %}
#   {% if support.lts %}...{% endif %}
#
# The data file only tracks the most recent majors, so anything older than the
# oldest tracked major is unsupported. Versions with no entry and no verdict
# (such as "latest" and "master") are simply absent from the table, and a
# missing key renders as nil in Liquid — so callers need no special casing.
module Jekyll
  class VersionSupportGenerator < Generator
    safe true
    priority :high

    SUPPORTED = "supported".freeze
    UNSUPPORTED = "unsupported".freeze

    def generate(site)
      entries = site.data["major_version_support"] || []
      by_major = entries.each_with_object({}) do |entry, acc|
        major = entry["major"]
        acc[major.to_i] = entry if major
      end

      oldest_tracked = by_major.keys.min
      today = site.time.to_date

      site.data["version_support"] = Array(site.config["available_versions"])
        .each_with_object({}) do |version, acc|
          major = major_of(version)
          status = status_for(major, by_major, oldest_tracked, today)
          next if status.nil?

          acc[version] = {
            "status" => status,
            "lts" => by_major.dig(major, "lts") || false,
          }
        end
    end

    private

    # "v0.63" -> 63
    def major_of(version)
      version.to_s[/\Av\d+\.(\d+)\z/, 1]&.to_i
    end

    def status_for(major, by_major, oldest_tracked, today)
      return nil if major.nil?

      entry = by_major[major]
      return UNSUPPORTED if entry.nil? && oldest_tracked && major < oldest_tracked
      return nil if entry.nil?

      eol = parse_date(entry["eol"])
      return SUPPORTED if eol.nil?

      eol <= today ? UNSUPPORTED : SUPPORTED
    end

    def parse_date(value)
      return value.to_date if value.respond_to?(:to_date) && !value.is_a?(String)

      Date.parse(value.to_s)
    rescue ArgumentError, TypeError
      nil
    end
  end
end
