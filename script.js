let episodes = []; // To store all fetched episodes
let currentPage = 1;
const episodesPerPage = 5; // Number of episodes to display per page

// Fetch and parse the RSS feed
fetch('https://anchor.fm/s/f887d5f4/podcast/rss') // Replace with your actual RSS feed URL
  .then(response => response.text())
  .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
  .then(data => {
      const items = data.querySelectorAll('item');
      items.forEach(item => {
          const title = item.querySelector('title').textContent;
          const description = item.querySelector('description') ? item.querySelector('description').textContent : 'No description available';
          const enclosure = item.querySelector('enclosure');
          const audioUrl = enclosure ? enclosure.getAttribute('url') : '';

          if (audioUrl) {
              // Store episode data
              episodes.push({
                  title: title,
                  description: description,
                  audioUrl: audioUrl
              });
          }
      });

      // Initial rendering of the first page
      displayEpisodes();
      updatePaginationControls();
  })
  .catch(error => {
      console.error('Error fetching the RSS feed:', error);
      document.getElementById('podcast-episodes').innerText = 'Failed to load episodes.';
  });

// Function to display episodes for the current page
function displayEpisodes() {
    const episodesContainer = document.getElementById('podcast-episodes');
    episodesContainer.innerHTML = ''; // Clear previous episodes

    // Calculate the start and end indices for the current page
    const startIndex = (currentPage - 1) * episodesPerPage;
    const endIndex = Math.min(startIndex + episodesPerPage, episodes.length);

    // Loop through and display episodes for the current page
    for (let i = startIndex; i < endIndex; i++) {
        const episode = episodes[i];
        const episodeDiv = document.createElement('div');
        episodeDiv.classList.add('episode');
        episodeDiv.innerHTML = `
            <h2>${episode.title}</h2>
            <p>${episode.description}</p>
            <audio controls>
                <source src="${episode.audioUrl}" type="audio/mpeg">
                Your browser does not support the audio element.
            </audio>
        `;
        episodesContainer.appendChild(episodeDiv);
    }
}

// Function to update the pagination controls
function updatePaginationControls() {
    const totalPages = Math.ceil(episodes.length / episodesPerPage);
    document.getElementById('page-info').innerText = `Page ${currentPage} of ${totalPages}`;

    // Enable/disable pagination buttons
    document.getElementById('prev').disabled = currentPage === 1;
    document.getElementById('next').disabled = currentPage === totalPages;
}

// Event listeners for pagination buttons
document.getElementById('prev').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        displayEpisodes();
        updatePaginationControls();
    }
});

document.getElementById('next').addEventListener('click', () => {
    const totalPages = Math.ceil(episodes.length / episodesPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        displayEpisodes();
        updatePaginationControls();
    }
});
