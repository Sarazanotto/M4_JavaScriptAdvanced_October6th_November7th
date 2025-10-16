//TOGGGLE NAV
const burgerToggle = document.querySelector(".burger");
const navLink = document.querySelector(".nav-links");
const hero = document.querySelector(".hero");
burgerToggle.addEventListener("click", () => {
  navLink.classList.toggle("nav-active");
  hero.classList.toggle("hero-toggle");
});

//MAIN IMG
const mainPage = async (element, containerElement) => {
  const container = document.querySelector(containerElement);
  try {
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${element}`,
      {
        headers: {
          Authorization:
            "ikwJHM7PSH2YB9rDFZeDqkxb3m2sY910gJohhX3UOMCSpRJ3eRb3AZcZ",
        },
      }
    );

    const data = await response.json();
    const imgs = data.photos.slice(0, 6);

    imgs.forEach((img) => {
      createCardForMainPage(img, container);
    });
  } catch (error) {
    `oops ${error.message}`;
  }
};

const createCardForMainPage = (photo, container) => {
  const col = document.createElement("div");
  col.classList.add("col-6", "col-sm-4", "col-md-4", "col-lg-2");

  const card = document.createElement("div");
  card.classList.add("card", "card-main");

  const img = document.createElement("img");
  img.src = photo.src.medium;
  img.classList.add("card-img", "img-card-main", "w-100");

  card.appendChild(img);
  col.appendChild(card);
  container.appendChild(col);
};

window.addEventListener("DOMContentLoaded", () => {
  mainPage("nature", ".container-photo-main-nature");
  mainPage("portrait", ".container-photo-main-portrait");
  mainPage("animals", ".container-photo-main-animals");
  mainPage("fruits", ".container-photo-main-fruits");
});

//SERACH-IMG-INPUT-SEARCH
const inputSearch = document.querySelector(".input-search");
const btnSearch = document.querySelector(".btn-search");
const rowCondatinerCards = document.querySelector(".row-container");
const fetchPhoto = async () => {
  try {
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${inputSearch.value}`,
      {
        headers: {
          Authorization:
            "ikwJHM7PSH2YB9rDFZeDqkxb3m2sY910gJohhX3UOMCSpRJ3eRb3AZcZ",
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error.message);
  }
};
const containerCards = document.querySelector(".container-cards");

btnSearch.addEventListener("click", async (event) => {
  event.preventDefault();
  const searchValue = inputSearch.value.trim();

  if (inputSearch.value !== "") {
    rowCondatinerCards.innerHTML = "";
    containerCards.innerHTML = "";

    try {
      const photoArray = await fetchPhoto(searchValue);
      if (!photoArray || !photoArray.photos || photoArray.photos.length === 0) {
        rowCondatinerCards.innerHTML = `<div class="alert alert-info" role="alert">
 Non ci sono foto per la ricerca che hai effettuato
</div>`;
        return;
      }

      const newArrayPhoto = photoArray.photos.map((photo) => {
        return {
          id: photo.id,
          img: photo.src.large,
        };
      });

      newArrayPhoto.forEach((photo) => {
        generateCardPhoto(photo, rowCondatinerCards);
      });
    } catch (error) {
      alert("errore durante il recupero");
    }
  } else {
    alert("Inserisci una parola");
  }
});

const generateCardPhoto = (photo, container) => {
  const colCard = document.createElement("div");
  colCard.setAttribute("class", "col-6 col-md-4 col-lg-3");

  const cardContainer = document.createElement("div");
  cardContainer.classList.add("card", "card-search");

  const img = document.createElement("img");
  img.src = photo.img;
  img.classList.add("card-img-top", "img-card-selectionate");

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  const cardId = document.createElement("p");
  cardId.classList.add("card-text", "text-center");
  cardId.innerText = `Author id ${photo.id}`;

  cardBody.append(cardId);
  cardContainer.append(img, cardBody);
  colCard.appendChild(cardContainer);
  container.appendChild(colCard);
};
