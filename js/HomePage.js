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



// Function to fetch music data from the API
async function fetchMusicData(search) {
    let url = 'https://youtube-music-api3.p.rapidapi.com/search?';
    if (search) {
        url += `&q=${search}&type=song`;
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
        const result = await response.json();
        console.log(result.result)// Parse as JSON instead of text
        return result.result;
    } catch (error) {
        console.error(error);
    }
}

// Function to create music cards and display them on the page
async function createMusicCards(search) {
    const musicContainer = document.getElementById('product-container');
    const songs = await fetchMusicData(search);

    if (!songs || songs.length === 0) {
        musicContainer.innerHTML = '<p>No songs found.</p>';
        return;
    }

    songs.forEach(song => {
 
        createAlbumElement(song);

    });
}

createMusicCards("despacito")



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
    image.src = song.thumbnail; // Assuming thumbnail is the property containing the image URL
    image.addEventListener('click', () => {
        const videoId = song.videoId;
        console.log('Clicked video ID:', videoId);
        // Add more logic here to handle the click event if needed
    });
    // Play icon
    const playIcon = document.createElement("i");
    playIcon.classList.add("fa", "fa-solid", "fa-play", "bi", "bi-play-circle", "fa-2x");
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
    detailsContainer.classList.add('details-container');
    const title = document.createElement('div');
    title.textContent = song.title; // Assuming title is the property containing song name
    title.classList.add('title');

    detailsContainer.appendChild(title);
    contentContainer.appendChild(detailsContainer);

    listItem.appendChild(contentContainer);
    itemsElement.appendChild(listItem); // Appending the song element to items
}

document.addEventListener("DOMContentLoaded", function () {
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const carouselWrapper = document.querySelector('.slider-container');

    prevButton.addEventListener('click', function () {
        // Move carousel to the left
        carouselWrapper.scrollLeft -= carouselWrapper.offsetWidth;
    });

    nextButton.addEventListener('click', function () {
        // Move carousel to the right
        carouselWrapper.scrollLeft += carouselWrapper.offsetWidth;
    });
});