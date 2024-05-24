const hamBurger = document.querySelector(".toggle-btn");

hamBurger.addEventListener("click", function () {
  document.querySelector("#sidebar").classList.toggle("expand");
});


async function populateSongs(search) {
  let url = 'https://youtube-music-api3.p.rapidapi.com/search?';
  if (search) {
    url += `q=${search}&type=song`;
  }
  
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'd87ec7dc89msh63d1fdc07b1d8afp14c0b0jsn4f221ff84310',
      'X-RapidAPI-Host': 'youtube-music-api3.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('Failed to fetch songs');
    }
    const data = await response.json(); // Parsing JSON response
    return data.result; // Return the array of songs
  } catch (error) {
    console.error('Error fetching songs:', error);
    return []; // Return an empty array if an error occurs
  }
}


document.addEventListener('DOMContentLoaded', () => {
  const search = 'd se dance'; // Your search query
  populateSongs(search)
    .then(songs => {
      const itemsElement = document.getElementById('items'); // Getting the element

      // Check if songs is defined and is an array
      if (Array.isArray(songs)) {
        // Loop through each song object in the array of songs and populate the HTML
        songs.forEach(song => {
          const listItem = document.createElement('li');
          listItem.classList.add('song-container');

          // Create a parent container for image and details
          const contentContainer = document.createElement('div');
          contentContainer.classList.add('content-container');

          // Image container
          const imageContainer = document.createElement('div');
          imageContainer.classList.add('image-container');
          const image = document.createElement('img');
          image.src = song.thumbnail; // Assuming thumbnail is the property containing the image URL
          imageContainer.appendChild(image);
          contentContainer.appendChild(imageContainer);
          // Details container
          const detailsContainer = document.createElement('div');
          detailsContainer.classList.add('details-container');
          
          const title = document.createElement('p');
          title.textContent = song.title; // Assuming title is the property containing song name
          title.classList.add('title');
          // title.style.whiteSpace = 'break-spaces';
          title.style.overflow = 'hidden';
          const details = document.createElement('p');
          details.textContent = song.details; // Assuming details is the property containing song details
          details.classList.add('details');
          details.style.whiteSpace = 'break-spaces'; 
          details.style.overflow = 'hidden';
          details.style.textOverflow = 'ellipsis';
          details.style.display = '-webkit-box';
          details.style.webkitLineClamp = '2'; 
          details.style.webkitBoxOrient = 'vertical';
          const type = document.createElement('p');
          type.textContent =  (song.album ? 'Album': 'Single')+' • '+song.author; 
          details.appendChild(type);
          detailsContainer.appendChild(title);
          detailsContainer.appendChild(details);
          contentContainer.appendChild(detailsContainer);

          listItem.appendChild(contentContainer);
          itemsElement.appendChild(listItem); // Appending the song element to items
        });
      } else {
        console.error('Error: Invalid data format for songs');
      }
    })
    .catch(error => {
      console.error('Error fetching songs:', error);
    });
});


/* Define an array of basic colors */
var basicColors = ['red', 'orange', 'yellow', 'cyan', 'blue', 'blueviolet', '#90EE90','gold','limegreen','antiquewhite'];

/* Select all cards and assign a border-left color randomly from the basic colors array */
document.querySelectorAll('.card').forEach(function(card) {
    var randomColor = basicColors[Math.floor(Math.random() * basicColors.length)];
    card.style.borderLeft = '5px solid ' + randomColor;
});

