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
      'x-rapidapi-key': 'd04ddb7ca3msh473b358e94a8eb2p145bd1jsn6298b36506ab',
      'x-rapidapi-host': 'youtube-music-api3.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('Failed to fetch songs');
    }
    const data = await response.json(); // Parsing JSON response
    renderSongs(data.result);
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


const categories = [
  'Hindi', 'Workout', 'Monsoon', 'Party', 'Romance', 'Sleep', 'Feel Good', 'Focus',
  'Hindi', 'Workout', 'Monsoon', 'Party', 'Romance', 'Sleep', 'Feel Good', 'Focus',
  'Hindi', 'Workout', 'Monsoon', 'Party', 'Romance', 'Sleep', 'Feel Good', 'Focus',
  'Hindi', 'Workout', 'Monsoon', 'Party', 'Romance', 'Sleep', 'Feel Good', 'Focus'
];

function renderCategories() {
  const categoriesContainer = document.getElementById('categories');
  categoriesContainer.innerHTML = ''; // Clear previous content
  
  categories.forEach(category => {
    const li = document.createElement('li');
    li.classList.add('category');
    
    const card = document.createElement('div');
    card.classList.add('card');
    card.textContent = category;
    
    li.appendChild(card);
    categoriesContainer.appendChild(li);
  });
}

// Call the function to render the categories
renderCategories();

/* Define an array of basic colors */
var basicColors = ['red', 'orange', 'yellow', 'cyan', 'blue', 'blueviolet', '#90EE90','gold','limegreen','antiquewhite'];

/* Select all cards and assign a border-left color randomly from the basic colors array */
document.querySelectorAll('.card').forEach(function(card) {
    var randomColor = basicColors[Math.floor(Math.random() * basicColors.length)];
    card.style.borderLeft = '5px solid ' + randomColor;
});


document.addEventListener('DOMContentLoaded', () => {
  const popularEpisodesList = document.getElementById('episodes-popular');

  // Sample data
  // const data = [
  //     { imgSrc: 'image1.jpg', title: 'Title 1', description: 'Description 1' },
  //     { imgSrc: 'image2.jpg', title: 'Title 2', description: 'Description 2' },
  //     { imgSrc: 'image3.jpg', title: 'Title 3', description: 'Description 3' },
  //     { imgSrc: 'image4.jpg', title: 'Title 4', description: 'Description 4' },
  //     { imgSrc: 'image5.jpg', title: 'Title 5', description: 'Description 5' },
  //     { imgSrc: 'image6.jpg', title: 'Title 6', description: 'Description 6' },
  //     { imgSrc: 'image7.jpg', title: 'Title 7', description: 'Description 7' },
  //     { imgSrc: 'image8.jpg', title: 'Title 8', description: 'Description 8' },
  //     { imgSrc: 'image9.jpg', title: 'Title 9', description: 'Description 9' },
  //     { imgSrc: 'image10.jpg', title: 'Title 10', description: 'Description 10' },
  //     { imgSrc: 'image11.jpg', title: 'Title 11', description: 'Description 11' },
  //     { imgSrc: 'image12.jpg', title: 'Title 12', description: 'Description 12' },
  //     { imgSrc: 'image8.jpg', title: 'Title 8', description: 'Description 8' },
  //     { imgSrc: 'image9.jpg', title: 'Title 9', description: 'Description 9' },
  //     { imgSrc: 'image10.jpg', title: 'Title 10', description: 'Description 10' },
  //     { imgSrc: 'image11.jpg', title: 'Title 11', description: 'Description 11' },
  //     { imgSrc: 'image12.jpg', title: 'Title 12', description: 'Description 12' },
  //     { imgSrc: 'image8.jpg', title: 'Title 8', description: 'Description 8' },
  //     { imgSrc: 'image9.jpg', title: 'Title 9', description: 'Description 9' },
  //     { imgSrc: 'image10.jpg', title: 'Title 10', description: 'Description 10' },
  //     { imgSrc: 'image11.jpg', title: 'Title 11', description: 'Description 11' },
  //     { imgSrc: 'image12.jpg', title: 'Title 12', description: 'Description 12' },
  // ];

  // Function to create a card inside a list item
  const createCardInListItem = (item) => {
      const li = document.createElement('li');
      const card = document.createElement('div');
      card.className = 'card-episodes';

      const img = document.createElement('img');
      img.src = item.imgSrc;
      img.alt = item.title;

      const details = document.createElement('div');
      details.className = 'details';

      const title = document.createElement('h3');
      title.textContent = item.title;

      const description = document.createElement('p');
      description.textContent = item.description;

      details.appendChild(title);
      details.appendChild(description);
      card.appendChild(img);
      card.appendChild(details);
      li.appendChild(card);

      return li;
  };

  // Append cards to the ul
//   data.forEach(item => {
//       const listItem = createCardInListItem(item);
//       popularEpisodesList.appendChild(listItem);
//   });
 });



 async function renderSongs(songs) {
  // const songs = await populateSongs(search);
   const container = document.getElementById('table-grid-container');
  container.innerHTML = ''; // Clear previous content
  let serialNumber = 1; // Initialize serial number
 
  songs.forEach(song => {
    const songElement = document.createElement('div');
    songElement.classList.add('song');
    
    // Image
    const img = document.createElement('img');
    img.src = song.thumbnail; // Assuming 'image' is the key for image URL
    img.alt = song.title; // Assuming 'title' is the key for song title
    
    // Number (You can replace 'number' with the actual number property from the data)
    const number = document.createElement('div');
    number.classList.add('serial-number');
    number.textContent = serialNumber++;// Assuming 'number' is the key for song number
    
    // Details (You can replace 'details' with the actual details property from the data)
    
    const details = document.createElement('div');
    details.classList.add('detailsTable');
    const title = document.createElement('p');
    title.textContent =song.title;
    const author = document.createElement('p');
    const authorWords = song.author.split(' ');
    author.textContent = authorWords.slice(0, 4).join(' ');
    details.appendChild(title);
    details.appendChild(author);
    
    songElement.appendChild(img);
    songElement.appendChild(number);
    songElement.appendChild(details);
    
    container.appendChild(songElement);
  });
}

// Call renderSongs function with search query if needed
// Example: renderSongs('Your search query');

// For demo purpose, let's call it without any search query
renderSongs();



document.addEventListener('DOMContentLoaded', () => {
  const search = 'd se dance'; // Your search query
  populateSongs(search)
    .then(songs => {
      const newvideosElement = document.getElementById('newvideos');
      // Check if songs is defined and is an array
      if (Array.isArray(songs)) {
        // Loop through each song object in the array of songs and populate the HTML
        songs.forEach(song => {
          const newlistItem = document.createElement('li');
          newlistItem.classList.add('song-container');

          // Create a parent container for image and details
          const contentContainer = document.createElement('div');
          contentContainer.classList.add('newvideo-container');

          // Image container
          const imageContainer = document.createElement('div');
          imageContainer.classList.add('newimage-container');
          const image = document.createElement('img');
          image.src = song.thumbnail; // Assuming thumbnail is the property containing the image URL
          imageContainer.appendChild(image);
          contentContainer.appendChild(imageContainer);
          // Details container
          const detailsContainer = document.createElement('div');
          detailsContainer.classList.add('newdetails-container');
          
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
          subContent =  song.author.split(' '); 

          type.textContent = subContent.slice(0, 3).join(' ');
          details.appendChild(type);
          detailsContainer.appendChild(title);
          detailsContainer.appendChild(details);
          contentContainer.appendChild(detailsContainer);

          newlistItem.appendChild(contentContainer);
          newvideosElement.appendChild(newlistItem); // Appending the song element to items
          
        });
      } else {
        console.error('Error: Invalid data format for songs');
      }
    })
    .catch(error => {
      console.error('Error fetching songs:', error);
    });
});

document.addEventListener('DOMContentLoaded', () => {
  const dropdownButton = document.querySelector('.dropdown-button');
  const dropdownMenu = document.querySelector('.dropdown-menu');

  dropdownButton.addEventListener('click', () => {
      dropdownMenu.style.display = "block";
  });

  window.addEventListener('click', (event) => {
      if (!event.target.matches('.dropdown-button')) {
          if (dropdownMenu.style.display = "block") {
              dropdownMenu.style.display = "none";
          }
      }
  });
});
