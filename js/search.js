document.addEventListener("DOMContentLoaded", function() {
    async function searchMusic(searchTerm) {
        const url = `https://youtube-music6.p.rapidapi.com/ytmusic/?query=${encodeURIComponent(searchTerm)}`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '1a2851fc19mshd76c482ea687c10p1f3369jsn6763f26dbe97',
                'X-RapidAPI-Host': 'youtube-music6.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const data = await response.json();
            console.log(data);
            displayResults(data);
        } catch (error) {
            console.error(error);
        }
    }

    function displayResults(data) {
        const searchResultsContainer = document.getElementById("searchResults");
        if (!searchResultsContainer) {
            console.error("Search results container not found.");
            return;
        }
        searchResultsContainer.innerHTML = ""; // Clear previous results
    
        // Display videos
        if (data && data.length > 0) {
            data.forEach(item => {
                const resultDiv = document.createElement("div");
                resultDiv.classList.add("result");
    
                // Image container
                const imageContainer = document.createElement("div");
                imageContainer.classList.add("searchimage-container");
    
                const image = document.createElement("img");
                image.src = item.thumbnails[0].url;
                image.alt = item.title;
                image.classList.add("searchimage");
                imageContainer.appendChild(image);
    
                // Play button
                const playButton = document.createElement("div");
                playButton.classList.add("bi", "bi-caret-right-fill", "play-button");
                imageContainer.appendChild(playButton);
                
    
                imageContainer.addEventListener("mouseover", () => {
                    image.style.opacity = "0.7";
                    playButton.style.display = "block";
                });
    
                imageContainer.addEventListener("mouseout", () => {
                    image.style.opacity = "1";
                    playButton.style.display = "none";
                });
    
                resultDiv.appendChild(imageContainer);
    
                // Details container
                const detailsContainer = document.createElement("div");
                detailsContainer.classList.add("details-container");
    
                const title = document.createElement("h6");
                title.textContent = item.title;
                detailsContainer.appendChild(title);

                const author = document.createElement("p");
                author.textContent = `author:${getAuthorName(item)}`;
                detailsContainer.appendChild(author);
                author.addEventListener('click', () => {
                    const artistId = song.artists[0].id;
                    localStorage.setItem('getArtist', artistId)
                    window.location.href = '../pages/artistPage.html';
                  
                  });

                const duration = document.createElement("p");
                duration.textContent = `Duration: ${item.duration}`;
                detailsContainer.appendChild(duration);
    
                resultDiv.appendChild(detailsContainer);
    
                searchResultsContainer.appendChild(resultDiv);
    
                // Add horizontal rule
                const hr = document.createElement("hr");
                searchResultsContainer.appendChild(hr);
            });
        }
    }
    const searchTerm = localStorage.getItem('searchTerm');
    if (searchTerm) {
        searchMusic(searchTerm);
    }
    
});


function getAuthorName(item) {
    if (item.category === 'Top result') {
        return item.author.name || '';
    } else if (item.category === 'Songs' || item.category === 'Videos') {
        if (item.artists && item.artists.length > 0) {
            return item.artists[0].name || item.artists||" ";
        }
    }
    return '';
}