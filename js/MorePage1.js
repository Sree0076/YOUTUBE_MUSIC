const hamBurger = document.querySelector(".toggle-btn");

hamBurger.addEventListener("click", function () {
  document.querySelector("#sidebar").classList.toggle("expand");
});


    document.addEventListener('scroll', function () {
        var sidebar = document.getElementById('sidebar');
        var rightnav = document.querySelector('.rightnav');

        if (window.scrollY > 50) { 
            sidebar.classList.add('scrolled');
            rightnav.classList.add('scrolled');
        } else {
            sidebar.classList.remove('scrolled');
            rightnav.classList.remove('scrolled');
        }
    });

   

        // document.addEventListener('DOMContentLoaded', async () => {
        //     // Function to fetch music data from the API
        //     async function fetchMusicData(search) {
        //         let url = 'https://youtube-music-api3.p.rapidapi.com/search?';
        //         if (search) {
                    
        //             url += `&q=${search}&type=song`;
        //         }
        //         const options = {
        //             method: 'GET',
        //             headers: {
        //                 'x-rapidapi-key': '33c431b604msh6e6d5181f112eeep19ae7cjsnf5c1fdd3ef0b',
        //                 'x-rapidapi-host': 'youtube-music-api3.p.rapidapi.com'
        //             }
        //         };
        
        //         try {
        //             const response = await fetch(url, options);
        //             const result = await response.json();
        //             console.log(result.result); 
        //             return result.result;
        //         } catch (error) {
        //             console.error(error);
        //         }
        //     }
        
        //     // Function to create music cards and display them on the page
        //     async function createMusicCards(search) {
        //         const moregrid = document.getElementById('moregrid');
        //         moregrid.innerHTML = ''; 
        //         const songs = await fetchMusicData(search);
        
        //         if (!songs || songs.length === 0) {
        //             moregrid.innerHTML = '<div class="col-12">No songs found.</div>';
        //             return;
        //         }
        
        //         songs.forEach(song => {
        //             createCardElement(song);
        //         });
        //     }
        
            
        //     function createCardElement(song) {
        //         const moregrid = document.getElementById('moregrid');
        //         const col = document.createElement('div');
        //         col.className = "col-md-2 col-sm-4 moregrid-item"; 
            
        //         const thumbnailContainer = document.createElement('div');
        //         thumbnailContainer.className = 'thumbnail-container';
            
        //         const thumbnail = document.createElement('img');
        //         thumbnail.className = 'card-img-top';
        //         thumbnail.src = `${song.thumbnail}`;
        //         thumbnail.alt = `${song.title}`;
            
        //         const playIcon = document.createElement('i');
        //         playIcon.classList.add('fa', 'fa-solid', 'fa-play', 'bi', 'bi-play-circle-fill', 'fa-2x', 'play-icon');
        //         playIcon.addEventListener('click', () => {
        //             const videoId = song.videoId;
        //             console.log('Clicked video ID:', videoId);
                    
        //         });
            
        //         thumbnailContainer.appendChild(thumbnail);
        //         thumbnailContainer.appendChild(playIcon);
            
        //         col.innerHTML = `
        //             <div class="card" style="width: 100%;">
        //                 <div class="card-body d-flex align-items-start">
        //                     ${thumbnailContainer.outerHTML}
        //                     <div>
        //                         <h5 class="card-title">${song.title}</h5>
        //                         <p class="card-text">${song.author}</p>
        //                     </div>
        //                 </div>
        //             </div>
        //         `;
            
        //         moregrid.appendChild(col);
        //     }
            
        
          
        //     createMusicCards("sky full of stars");
        // });

        document.addEventListener('DOMContentLoaded', async () => {
            // Function to fetch music data from the API
            async function fetchMusicData(search) {
                let url = 'https://youtube-music-api3.p.rapidapi.com/search?';
                if (search) {
                    url += `&q=${search}&type=song`;
                }
                const options = {
                    method: 'GET',
                    headers: {
                        'x-rapidapi-key': '520a5da3f0mshe5dda608862ad28p170020jsne02fd8099741',
                        'x-rapidapi-host': 'youtube-music-api3.p.rapidapi.com'
                    }
                };
        
                try {
                    const response = await fetch(url, options);
                    const result = await response.json();
                    console.log(result.result);
                    return result.result;
                } catch (error) {
                    console.error(error);
                }
            }
        
            // Function to create music cards and display them on the page
            async function createMusicCards(search) {
                const moregrid = document.getElementById('moregrid');
                moregrid.innerHTML = '';
                const songs = await fetchMusicData(search);
        
                if (!songs || songs.length === 0) {
                    moregrid.innerHTML = '<div class="col-12">No songs found.</div>';
                    return;
                }
        
                songs.forEach(song => {
                    createCardElement(song);
                });
            }
        
            function createCardElement(song) {
                const moregrid = document.getElementById('moregrid');
                const col = document.createElement('div');
                col.className = "col-md-2 col-sm-4 moregrid-item";
        
                const thumbnailContainer = document.createElement('div');
                thumbnailContainer.className = 'thumbnail-container';
        
                const thumbnail = document.createElement('img');
                thumbnail.className = 'card-img-top';
                thumbnail.src = `${song.thumbnail}`;
                thumbnail.alt = `${song.title}`;
        
                const playIcon = document.createElement('i');
                playIcon.classList.add('fa', 'fa-solid', 'fa-play', 'bi', 'bi-play-circle-fill', 'fa-2x', 'play-icon');
                playIcon.addEventListener('click', () => {
                    const videoId = song.videoId;
                    console.log('Clicked video ID:', videoId);

                    localStorage.setItem('VideoId', videoId);
                    
                });
        
                thumbnailContainer.appendChild(thumbnail);
                thumbnailContainer.appendChild(playIcon);
        
                col.innerHTML = `
                    <div class="card" style="width: 100%;">
                        <div class="card-body d-flex align-items-start">
                            ${thumbnailContainer.outerHTML}
                            <div>
                                <h5 class="card-title">${song.title}</h5>
                                <p class="card-text">${song.author}</p>
                            </div>
                        </div>
                    </div>
                `;
        
                moregrid.appendChild(col);
            }
        
            // Event listener for search input
            const searchBar = document.getElementById('search-bar');
            searchBar.addEventListener('keypress', async (event) => {
                if (event.key === 'Enter') {
                    const searchQuery = searchBar.value.trim();
                    if (searchQuery) {
                        await createMusicCards(searchQuery);
                    }
                }
            });
        
            // Initial load
            await createMusicCards("sky full of stars");
        });
        
        

      

      