require 'uri'
require 'net/http'
require 'json'
require 'yaml'

def slugify(str)
  str.downcase.strip.gsub(' ', '-').gsub(/[^\w-]/, '')
end

# Used to standardize the description format.
def add_period_if_missing(string)
  terminal_punctuation = [".", "!", "?"].freeze
  string << "." unless string.end_with?(*terminal_punctuation)
  string
end

# Removes Ruby symbol colons from keys (for YAML)
def clear_keys(hash)
  hash.map do |k, v|
    k = k.to_s
    if v.is_a?(Hash)
      v = clear_keys(v)
    elsif v.is_a?(Array)
      v = v.map do |item|
        i = clear_keys(item) if item.is_a?(Hash)
        i
      end
    end

    [k, v]
  end.to_h
end

# Check for ENV vars
["NOTION_TOKEN", "NOTION_DB_ID", "TARGET_PATH"].each do |v|
  raise "Need to provide #{v} as an environment variable for this to work." if ENV[v].nil?
end

# Preps the request
uri = URI("https://api.notion.com/v1/databases/#{ENV['NOTION_DB_ID']}/query")
http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true

request = Net::HTTP::Post.new(uri.request_uri)
request["Authorization"] = "Bearer #{ENV['NOTION_TOKEN']}"
request["Notion-Version"] = "2022-06-28"
request["Accept"] = "application/json"
request["Content-Type "] = "application/json"
response = http.request(request)

# If it's not a failure
if response.is_a?(Net::HTTPSuccess)
  puts "Roadmap data loaded. Processing..."

  # Parses the response
  content = JSON.parse(response.body)

  # Preps the object to be serialized later
  output = {
    :now => [],
    :soon => [],
    :later => []
  }

  # Maps each row to a column, with properly transformed properties
  content["results"].each do |row|
    group = nil
    entry = {}

    row["properties"].each_pair do |name, val|
      case name
      when "Status"       then group = slugify(row["properties"]["Status"]["select"]["name"]).to_sym # Target for later
      when "Title"        then entry[:title] = val["title"][0]["text"]["content"]
      when "Description"  then entry[:description] = add_period_if_missing(val["rich_text"][0]["text"]["content"]) unless val["rich_text"].empty?
      when "Release"      then entry[:release] = val["select"]["name"] unless val["select"].empty?
      when "Paid"         then entry[:paid] = val["checkbox"]
      end
    end

    output[group] = [] if output[group].nil?
    output[group] << entry
  end

  # Only select the statuses we need for the roadmap
  output.select! { |key, _| [:now, :soon, :later].include?(key) }

  # Sort by paid, then alphabetically by title
  [:now, :soon, :later].each do |group|
    output[group].sort_by! { |entry| [entry[:paid] ? 0 : 1, entry[:title]] }
  end

  # Add one-by-two class to now, soon, and later
  [:now, :soon, :later].each do |group|
    # The `one-by-two` class is used to style these two sections
    output[group].each do |entry|
      entry[:class] = "one-by-two"
    end
  end

  # Emtpy the target file and write the serialized YAML to it
  output = clear_keys(output)
  File.open(ENV['TARGET_PATH'], 'w') do |file|
    file.truncate 0
    file.write output.to_yaml
  end

  # Call it a day
  puts "Roadmap data written to #{ENV['TARGET_PATH']}."
else
  # This should prevent a broken roadmap version to be checked in
  raise "Could not get database from Notion"
end
