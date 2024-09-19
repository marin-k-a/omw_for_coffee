fetch('https://anchor.fm/s/f887d5f4/podcast/rss')
  .then(response => response.text())
  .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
  .then(data => {
      const episodesContainer = document.getElementById('podcast-episodes');
      const items = data.querySelectorAll('item');
      episodesContainer.innerHTML = ''; // Clear the loading text

      items.forEach(item => {
          const title = item.querySelector('title').textContent;
          const description = item.querySelector('description').textContent;
          const audioUrl = item.querySelector('enclosure').getAttribute('url');

          // Create HTML elements to display the episode
          const episodeDiv = document.createElement('div');
          episodeDiv.classList.add('episode');
          episodeDiv.innerHTML = `
            <h2>${title}</h2>
            <p>${description}</p>
            <audio controls>
              <source src="${audioUrl}" type="audio/mpeg">
              Your browser does not support the audio element.
            </audio>
          `;
          episodesContainer.appendChild(episodeDiv);
      });
  })
  .catch(error => {
      console.error('Error fetching the RSS feed:', error);
      document.getElementById('podcast-episodes').innerText = 'Failed to load episodes.';
  });
