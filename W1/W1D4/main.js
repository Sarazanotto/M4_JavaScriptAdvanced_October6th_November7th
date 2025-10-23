const inputSearch = document.querySelector(".input-search");
const btnSearch = document.getElementById("button-search");
const mainPage = document.querySelector(".mainPage");
// CREO PAGINA PRINCIPALE
const allArtist = async (nameArtist, containerArtist) => {
  const container = document.getElementById(containerArtist);
  try {
    const response = await fetch(
      `https://striveschool-api.herokuapp.com/api/deezer/search?q=${nameArtist}`
    );
    const data = await response.json();
    const albums = data.data.slice(3, 7);

    albums.forEach((album) => {
      createArtistCard(album, container);
    });
  } catch (error) {
   `<div class='vh-100 d-flex justify-content-center align-items-center'>
   <div class="alert alert-danger" role="alert">
         oops qualcosa è andato storto       
        </div>
        </div>`;
  }
};

const createArtistCard = (album, container) => {
  const cardContainer = document.createElement("div");
  cardContainer.setAttribute("class", "col");

  const card = document.createElement("div");
  card.classList.add("card", "bg-transparent", "border-none", "mt-2");

  const imgAlbum = document.createElement("img");
  imgAlbum.classList.add("w-100", "object-fit-cover");
  imgAlbum.src = album.album.cover_small;

  const titleAlbum = document.createElement("h6");
  titleAlbum.classList.add("text-light");
  titleAlbum.innerText = album.album.title;

  card.append(imgAlbum, titleAlbum);
  cardContainer.appendChild(card);
  container.appendChild(cardContainer);
};

window.addEventListener("DOMContentLoaded", () => {
  allArtist("Eminem", "eminemSection");
  allArtist("Metallica", "metallicaSection");
  allArtist("Queen", "queenSection");
});

btnSearch.addEventListener("click", async () => {
  mainPage.innerHTML = "";
  const albums = await getArtists();
  albums.forEach((album) => {
    createCardAllSection(album, mainPage);
  });
});

const createCardAllSection = (artist, container) => {
  const containerCard = document.createElement("div");
  containerCard.classList.add("col-8", "mb-5");

  const card = document.createElement("div");
  card.classList.add("card");

  const rowCard = document.createElement("div");
  rowCard.classList.add("row", "g-0", "d-flex");

  const colCardImg = document.createElement("div");
  colCardImg.classList.add("col-3");

  const imgcard = document.createElement("img");
  imgcard.classList.add("w-75", "object-fit-cover'", "img-fluid");
  imgcard.src = artist.album.cover_small;

  const colCardText = document.createElement("div");
  colCardText.classList.add("col-9", "container-text");

  const bodyCard = document.createElement("div");
  bodyCard.classList.add("body-card");

  const titleSong = document.createElement("h5");
  titleSong.classList.add("text-dark,'p-0", "m-0", "d-block");
  titleSong.innerText = artist.title;

  const containerArtistAndSong = document.createElement("div");
  containerArtistAndSong.classList.add("container-artist-song");

  const artistName = document.createElement("h6");
  artistName.classList.add("p-0", "m-0");
  artistName.innerText = artist.artist.name;

  const duration = document.createElement("p");
  duration.classList.add("badge", "text-bg-secondary", "p-0", "m-0");
  duration.innerText = "Durata " + newDuration(artist.duration);

  const linkTrack = document.createElement("a");
  linkTrack.href = artist.link;
  linkTrack.innerText = "Ascolta su Deezer";
  linkTrack.target = "_blank";
  linkTrack.classList.add("btn", "btn-sm", "btn-info");
  containerArtistAndSong.append(artistName, duration, linkTrack);
  bodyCard.append(titleSong, containerArtistAndSong);
  colCardImg.appendChild(imgcard);
  colCardText.appendChild(bodyCard);
  rowCard.append(colCardImg, colCardText);
  card.append(rowCard);
  containerCard.appendChild(card);
  container.appendChild(containerCard);
};

const getArtists = async () => {
  const response = await fetch(
    `https://striveschool-api.herokuapp.com/api/deezer/search?q=${inputSearch.value}`
  );
  try {
    const data = await response.json();
    return data.data;
  } catch (error) {
    mainPage.innerHTML = `<div class='vh-100 d-flex justify-content-center align-items-center'>
    <div class="alert alert-secondary p-4" role="alert">
           Non hai inserito alcun nome <br> Effettua una nuova ricerca      
        </div> </div>`;
  } 
};

const newDuration = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const second = seconds % 60;
  return `${minutes}:${second}`;
};
