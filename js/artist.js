

document.addEventListener("DOMContentLoaded", function () {
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const carouselWrapper = document.querySelector('.single-slider-container');
 
    prevButton.addEventListener('click', function () {
        // Move carousel to the left
        carouselWrapper.scrollLeft -= carouselWrapper.offsetWidth;
    });
 
    nextButton.addEventListener('click', function () {
        // Move carousel to the right
        carouselWrapper.scrollLeft += carouselWrapper.offsetWidth;
    });
    getHomeData();
});

// document.addEventListener("DOMContentLoaded", function () {
//     var settingsmodal = document.getElementById("modaal");
//     settingsmodal.style.display = "none";
// });



const showmodal =()=>{
    var settingsmodal = document.getElementById("modaal");
    if(settingsmodal.style.display == "none"){
        settingsmodal.style.display ="block";
    }
    else{
        settingsmodal.style.display ="none";
    }
}



const showSidebar=()=>{
    // document.getElementById("#sidebar").style.backgroundColor = "black"
    document.querySelector("#sidebar").classList.toggle("expand");
    
}


const hamBurger = document.querySelector(".toggle-btn");

hamBurger.addEventListener("click", function () {
  document.querySelector("#sidebar").classList.toggle("expand");
});


    document.addEventListener('scroll', function () {
        var sidebar = document.getElementById('sidebar');
        var rightnav = document.querySelector('.rightnav');

        if (window.scrollY > 50) { // Change this value to adjust when the color change should happen
            sidebar.classList.add('scrolled');
            rightnav.classList.add('scrolled');
        } else {
            sidebar.classList.remove('scrolled');
            rightnav.classList.remove('scrolled');
        }
    });



    // --------------------


    
    async function fetchMusicData(search) {
      let url = 'https://youtube-music-api3.p.rapidapi.com/search?';
      if (search) {
          url += `&q=${search}&type=song`;
      }
      const options = {
          method: 'GET',
          headers: {
              'X-RapidAPI-Key': '33c431b604msh6e6d5181f112eeep19ae7cjsnf5c1fdd3ef0b',
              'X-RapidAPI-Host': 'youtube-music-api3.p.rapidapi.com'
          }
      };
   
      try {
          const response = await fetch(url, options);
          const result = await response.json();
          console.log(result.result)
          return result.result;
      } catch (error) {
          console.error(error);
      }
  }



  async function renderSongs(songs) {
    // const songs = await populateSongs(search);
     const container = document.getElementById('table-grid-container');
    container.innerHTML = ''; // Clear previous content
    
   
    songs.forEach(song => {
      const songElement = document.createElement('div');
      songElement.classList.add('song');
      
      // Image
      const img = document.createElement('img');
      img.src = song.thumbnail; // Assuming 'image' is the key for image URL
      img.alt = song.title; // Assuming 'title' is the key for song title

    
      
      
      // Details (You can replace 'details' with the actual details property from the data)
      
      const details = document.createElement('div');
      details.classList.add('detailsTable');
      const listtitlelink = document.createElement('a')
      listtitlelink.href='#';
      const title = document.createElement('p');
      listtitlelink.textContent =song.title;
    //   const author = document.createElement('p');
    //   const authorWords = song.author.split(' ');
    //   author.textContent = authorWords.slice(0, 4).join(' ');
      details.appendChild(title);
      details.appendChild(listtitlelink);
    //   details.appendChild(author);
      songElement.appendChild(img);
      songElement.appendChild(details);

        const duration = document.createElement('div');
        duration.classList.add('duration');
        duration.textContent= song.duration;
        songElement.appendChild(duration);
      

    
      container.appendChild(songElement);
    });
  }





//   FOR THE MORE SONGS PAGE==============================================





  
  // Call renderSongs function with search query if needed
  // Example: renderSongs('Your search query');
  
  // For demo purpose, let's call it without any search query

  async function createMusicCards(search) {
    const musicContainer = document.getElementById('product-container');
    const songs = await fetchMusicData(search);
    if (!songs || songs.length === 0) {
        musicContainer.innerHTML = '<p>No songs found.</p>';
        return;
    }

    songs.forEach(song => {
 
        createAlbumElement(song);
        createSingleElement(song);
        createFeaturedElements(song);
        createFanElement(song);
        renderSongs(songs);
        createVideoElement(song)


    });
}
async function getData()
{
    await createMusicCards("Jack Harlow")
}





// Function to create album elements
function createAlbumElement(song) {
    const itemsElement = document.getElementById('items');
    const listItem = document.createElement('li');
    listItem.classList.add('song-container');

    const contentContainer = document.createElement('div');
    contentContainer.classList.add('content-container');

    const imageContainer = document.createElement('div');
    imageContainer.classList.add('image-container');
    const image = document.createElement('img');
    image.src = song.thumbnail; 
    image.addEventListener('click', () => {
        const videoId = song.videoId;
        console.log('Clicked video ID:', videoId);
    });
    // Play icon
    const playIcon = document.createElement("i");
    playIcon.classList.add("fa", "fa-solid", "fa-play", "bi", "bi-play-circle-fill", "fa-2x","fs-2","text-light");
    playIcon.addEventListener('click', () => {
        const videoId = song.videoId;
        console.log('Clicked video ID:', videoId);
    });
    imageContainer.appendChild(image);
    imageContainer.appendChild(playIcon);

    contentContainer.appendChild(imageContainer);
    const detailsContainer = document.createElement('div');
    detailsContainer.classList.add('details-container');
    const title = document.createElement('div');

    const titleLink = document.createElement('a');
    titleLink.href = '#';
    titleLink.textContent = song.title;
    title.classList.add('title');
    title.appendChild(titleLink);

    detailsContainer.appendChild(title);
    contentContainer.appendChild(detailsContainer);

    listItem.appendChild(contentContainer);
    itemsElement.appendChild(listItem);
}



// SINGLES CAROUSEL


function createSingleElement(song) {
    const itemsElement = document.getElementById('singlesItems');
    const listItem = document.createElement('li');
    listItem.classList.add('single-container');

    const contentContainer = document.createElement('div');
    contentContainer.classList.add('single-content-container');

    const imageContainer = document.createElement('div');
    imageContainer.classList.add('single-image-container');
    const image = document.createElement('img');
    image.src = song.thumbnail; // Assuming thumbnail is the property containing the image URL
    image.addEventListener('click', () => {
        const videoId = song.videoId;
        console.log('Clicked video ID:', videoId);
        // Add more logic here to handle the click event if needed
    });
    // Play icon
    const playIcon = document.createElement("i");
    playIcon.classList.add("fa", "fa-solid", "fa-play", "bi", "bi-play-circle-fill", "fa-2x", "fs-2", "text-light");
    playIcon.addEventListener('click', () => {
        const videoId = song.videoId;
        console.log('Clicked video ID:', videoId);
        // Add more logic here to handle the click event if needed
    });
    imageContainer.appendChild(image);
    imageContainer.appendChild(playIcon); // Add play icon to the image container

    contentContainer.appendChild(imageContainer);
    // Details container
    const detailsContainer = document.createElement('div');
    detailsContainer.classList.add('single-details-container');
    const title = document.createElement('div');

    const titleLink = document.createElement('a');
    titleLink.href = '#';
    titleLink.textContent = song.title;
    title.classList.add('single-title');
    title.appendChild(titleLink);
    

    detailsContainer.appendChild(title);
    contentContainer.appendChild(detailsContainer);

    listItem.appendChild(contentContainer);
    itemsElement.appendChild(listItem); // Appending the song element to items
}

// video carousel



function createVideoElement(song) {
    const itemsElement = document.getElementById('videosItems');
    const listItem = document.createElement('li');
    listItem.classList.add('video-container');

    const contentContainer = document.createElement('div');
    contentContainer.classList.add('video-content-container');

    const imageContainer = document.createElement('div');
    imageContainer.classList.add('video-image-container');
    const image = document.createElement('img');
    image.src = song.thumbnail; // Assuming thumbnail is the property containing the image URL
    image.addEventListener('click', () => {
        const videoId = song.videoId;
        console.log('Clicked video ID:', videoId);
        // Add more logic here to handle the click event if needed
    });
    // Play icon
    const playIcon = document.createElement("i");
    playIcon.classList.add("fa", "fa-solid", "fa-play", "bi", "bi-play-fill", "fa-2x", "fs-1", "text-light");
    playIcon.addEventListener('click', () => {
        const videoId = song.videoId;
        console.log('Clicked video ID:', videoId);
        // Add more logic here to handle the click event if needed
    });
    imageContainer.appendChild(image);
    imageContainer.appendChild(playIcon); // Add play icon to the image container

    contentContainer.appendChild(imageContainer);
    // Details container
    const detailsContainer = document.createElement('div');
    detailsContainer.classList.add('video-details-container');
    const title = document.createElement('div');

    const titleLink = document.createElement('a');
    titleLink.href = '#';
    titleLink.textContent = song.title;
    title.classList.add('video-title');
    title.appendChild(titleLink);

    detailsContainer.appendChild(title);
    contentContainer.appendChild(detailsContainer);

    listItem.appendChild(contentContainer);
    itemsElement.appendChild(listItem); // Appending the video element to items
}










// FEATURED ON CAROUSEL


function createFeaturedElements(song) {
    const itemsElement = document.getElementById('featuredItems');
    const listItem = document.createElement('li');
    listItem.classList.add('featured-container');

    const contentContainer = document.createElement('div');
    contentContainer.classList.add('featured-content-container');

    const imageContainer = document.createElement('div');
    imageContainer.classList.add('featured-image-container');
    const image = document.createElement('img');
    image.src = song.thumbnail; 
    image.addEventListener('click', () => {
        const videoId = song.videoId;
        console.log('Clicked video ID:', videoId);
    });
    // Play icon
    const playIcon = document.createElement("i");
    playIcon.classList.add("fa", "fa-solid", "fa-play", "bi", "bi-play-circle-fill", "fa-2x", "fs-2", "text-light");
    playIcon.addEventListener('click', () => {
        const videoId = song.videoId;
        console.log('Clicked video ID:', videoId);
    });
    imageContainer.appendChild(image);
    imageContainer.appendChild(playIcon); 

    contentContainer.appendChild(imageContainer);
    // Details container
    const detailsContainer = document.createElement('div');
    detailsContainer.classList.add('featured-details-container');
    const title = document.createElement('div');

    const titleLink = document.createElement('a');
    titleLink.href = '#';
    titleLink.textContent = song.title;
    title.classList.add('featured-title');
    title.appendChild(titleLink);


  

    detailsContainer.appendChild(title);
    contentContainer.appendChild(detailsContainer);

    listItem.appendChild(contentContainer);
    itemsElement.appendChild(listItem); 
}





// --------------------------FANS YOU MIGHT LIKE CAROUSE------------------------------------


function createFanElement(song) {
    const itemsElement = document.getElementById('fanItems');
    const listItem = document.createElement('li');
    listItem.classList.add('fan-container');

    const contentContainer = document.createElement('div');
    contentContainer.classList.add('fan-content-container');

    const imageContainer = document.createElement('div');
    imageContainer.classList.add('fan-image-container');
    const image = document.createElement('img');
    image.src = song.thumbnail; // Assuming thumbnail is the property containing the image URL
    image.addEventListener('click', () => {
        const videoId = song.videoId;
        console.log('Clicked video ID:', videoId);
        // Add more logic here to handle the click event if needed
    });
    imageContainer.appendChild(image);

    contentContainer.appendChild(imageContainer);
    // Details container
    const detailsContainer = document.createElement('div');
    detailsContainer.classList.add('fan-details-container');
    const title = document.createElement('div');

    
const titleLink = document.createElement('a');
titleLink.href = '#';
titleLink.textContent = song.title;
title.classList.add('fan-title');
title.appendChild(titleLink);
    detailsContainer.appendChild(title);
    contentContainer.appendChild(detailsContainer);

    listItem.appendChild(contentContainer);
    itemsElement.appendChild(listItem); // Appending the song element to items
}






// const title = document.createElement('div');
//     const titleLink = document.createElement('a');
//     titleLink.href = '#'; // Replace with actual link
//     titleLink.textContent = song.title; // Assuming title is the property containing song name
//     titleLink.classList.add('fan-title');
//     title.appendChild(titleLink);


getData();



