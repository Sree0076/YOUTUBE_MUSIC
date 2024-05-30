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
            'x-rapidapi-key': '33c431b604msh6e6d5181f112eeep19ae7cjsnf5c1fdd3ef0b',
'x-rapidapi-host': 'youtube-music-api3.p.rapidapi.com'
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
        quickpicks(song);
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
function quickpicks(song) {
    const quick_itemsElement = document.getElementById('categories');
    const quick_listItem = document.createElement('li');
    quick_listItem.classList.add('category');
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('card');
    const quickpicksTitle = document.createElement('div');
    quickpicksTitle.classList.add('quick-picks-title');
    const image = document.createElement('img');
    image.src = song.thumbnail;
    quickpicksTitle.appendChild(image);
    const titleContainer = document.createElement('div');
    titleContainer.classList.add('quick-picks-title-p');
    const text = document.createElement('p');
    text.textContent = song.title;
    titleContainer.appendChild(text)
    quickpicksTitle.appendChild(titleContainer);


    const authorContainer = document.createElement('div');
    authorContainer.classList.add('quick-picks-author');
    const authorText = document.createElement('p');
    authorText.textContent = song.author;
    authorText.classList.add('author-text');
    authorContainer.appendChild(authorText);
    quickpicksTitle.appendChild(authorContainer);

    cardContainer.appendChild(quickpicksTitle)
    quick_listItem.appendChild(cardContainer);
    quick_itemsElement.appendChild(quick_listItem);

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