fetch('https://anchor.fm/s/f887d5f4/podcast/rss') // Replace with your actual RSS feed URL
   .then(response => response.text())
   .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
   .then(data => {
       const episodesContainer = document.getElementById('podcast-episodes');
       const items = data.querySelectorAll('item');
       episodesContainer.innerHTML = ''; // Clear the loading text

       items.forEach(item => {
           const title = item.querySelector('title').textContent;
           const description = item.querySelector('description') ? item.querySelector('description').textContent : 'No description available';
           const enclosure = item.querySelector('enclosure');
           const audioUrl = enclosure ? enclosure.getAttribute('url') : '';

           // Only create elements if audioUrl exists
           if (audioUrl) {
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
           } else {
               console.error('No audio URL found for episode:', title);
           }
       });
   })
   .catch(error => {
       console.error('Error fetching the RSS feed:', error);
       document.getElementById('podcast-episodes').innerText = 'Failed to load episodes..';
   });
