require 'rss'
require 'open-uri'
require 'fileutils'

# URL of your podcast RSS feed
rss_url = 'https://anchor.fm/s/f887d5f4/podcast/rss' # Replace with your actual RSS feed URL

# Directory to store the generated markdown files
posts_dir = '_posts'

# Ensure the posts directory exists
FileUtils.mkdir_p(posts_dir)

# Fetch the RSS feed
URI.open(rss_url) do |rss|
  feed = RSS::Parser.parse(rss, false)

  feed.items.each do |item|
    # Generate a file name for each post
    # Format: YYYY-MM-DD-title.md
    post_title = item.title.strip.gsub(' ', '-').gsub(/[^0-9A-Za-z\-]/, '')
    post_date = item.pubDate.strftime('%Y-%m-%d')
    file_name = "#{posts_dir}/#{post_date}-#{post_title}.md"

    # Generate the markdown content
    content = <<~MARKDOWN
      ---
      layout: podcast
      title: "#{item.title}"
      date: #{item.pubDate.strftime('%Y-%m-%d %H:%M:%S %z')}
      categories: podcast
      audio_url: "#{item.enclosure.url}"
      ---

      #{item.description}
      MARKDOWN

    # Write the markdown file
    File.open(file_name, 'w') do |file|
      file.write(content)
    end

    puts "Generated post: #{file_name}"
  end
end
