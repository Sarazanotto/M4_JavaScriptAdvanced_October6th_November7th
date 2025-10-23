const inputSearch = document.querySelector(".input-search");
const BtnSearch = document.querySelector(".btn-search");
const containerResultToSearch = document.querySelector(".container-result");
const btnOpenCart = document.querySelector(".btn-cart");
const dialogCartToAdd = document.querySelector(".dialog-cart");
const contentCart = document.querySelector(".content-cart");
const btnCloseCart = document.querySelector(".close-dialog");
const spinner= document.querySelector('.spinner-loading')
const myCart = [];
let indexCart=0;
const badgeIndexAddCart=document.querySelector('.index-add-to-cart');


const showSpinner=()=>{
spinner.classList.remove('d-none')
}
const hideSpinner=()=>{
spinner.classList.add('d-none')
}

const removeBookToCart=(element, book)=>{
element.remove()
const removeToArray= myCart.find((index)=>index.asin===book.asin)
if(removeToArray!==-1){
  myCart.splice(removeToArray,1)
}
  indexCart --
 
}

const populateCart = () => {
  contentCart.innerHTML = "";
  if (myCart.length > 0) {
    myCart.forEach((book) => {
      bookAddToCart(book, contentCart);
    });
  }
};

const showDialog = () => {
  contentCart.innerHTML=""
  dialogCartToAdd.showModal();
  populateCart();
};

const hideDialog = () => {
  dialogCartToAdd.close();
};

const addToCart = (book) => {
 
  myCart.push(book);
   contentCart.innerHTML=""
  indexCart ++
 console.log(myCart)
};

const like = (btn, icon, classAdd, classRemove) => {
  btn.addEventListener("click", () => {
    icon.classList.toggle(classAdd);
    icon.classList.toggle(classRemove);
  });
};

const getBooks = async () => {
  showSpinner()
  try {
    const response = await fetch(
      "https://striveschool-api.herokuapp.com/books"
    );
    return await response.json();
  } catch (error) {
    console.log(error.message);
  }finally{
    hideSpinner()
  }
};
const createCardForMainPage = (element, container) => {
  const col = document.createElement("div");
  col.setAttribute("class", "col-6 col-md-4 col-lg-2");

  const card = document.createElement("div");
  card.classList.add("card", "card-main",'position-relative');

  const imageCardMain = document.createElement("img");
  imageCardMain.setAttribute("class", "w-100 img-card");
  imageCardMain.src = element.img;
  imageCardMain.alt = "book img";

const ancorForDetails= document.createElement('a')
ancorForDetails.classList.add('ancor-details-card','position-absolute', 'top-0', 'bg-success', 'rounded', 'text-light', 'text-decoration-none','p-1','small')
ancorForDetails.innerText="Visualizza dettagli"
ancorForDetails.href=`./detail.html?id=${element.asin}`

  const containerDetailsCardMain = document.createElement("div");
  containerDetailsCardMain.classList.add(
    "card-body",
    "d-flex",
    "flex-column",
    "align-items-center",
    "p-1"
  );
  const titleCardMain = document.createElement("h5");
  titleCardMain.classList.add("titlecard", "m-0");
  titleCardMain.innerText = element.title;
  titleCardMain.title = element.title;

  const priceBook = document.createElement("p");
  priceBook.classList.add("fw-light", "m-0", "pt-1");
  priceBook.innerText = `Prezzo: ${element.price}€`;

  const containerBtnsCardMain = document.createElement("div");
  containerBtnsCardMain.classList.add("containerBtnsCardMain");

  const btnLikeProductCardMain = document.createElement("button");
  btnLikeProductCardMain.classList.add("btn", "p-0", "m-0");

  const iconLikeCardMain = document.createElement("i");
  iconLikeCardMain.classList.add("bi", "bi-hand-thumbs-up", "fs-5");

  like(
    btnLikeProductCardMain,
    iconLikeCardMain,
    "bi-hand-thumbs-up-fill",
    "bi-hand-thumbs-up"
  );

  const cartProductCardMain = document.createElement("button");
  cartProductCardMain.classList.add("btn");
  cartProductCardMain.addEventListener("click", (e) => {
    addToCart(element), badgeIndexAddCart.textContent=indexCart;
    const cardAdded=e.target.closest('.card')
    console.log(cardAdded)
    cardAdded.classList.add('borderGreen')
  });

  const iconCartCardMain = document.createElement("i");
  iconCartCardMain.classList.add("bi", "bi-cart");

  cartProductCardMain.append(iconCartCardMain);
  btnLikeProductCardMain.append(iconLikeCardMain);

  containerBtnsCardMain.append(btnLikeProductCardMain, cartProductCardMain);
  containerDetailsCardMain.append(
    titleCardMain,
    priceBook,
    containerBtnsCardMain
  );
  card.append(imageCardMain,ancorForDetails, containerDetailsCardMain);
  col.append(card);
  container.append(col);
};
const bookAddToCart = (book, container) => {
  const containerBookAddToCart = document.createElement("div");
  containerBookAddToCart.classList.add("d-flex", "flex-column");

  const titleBookAddToCart = document.createElement("p");
  titleBookAddToCart.classList.add("titleBookToCart", "m-0");
  titleBookAddToCart.innerText = book.title;

  const containerDetails = document.createElement("div");
  containerDetails.classList.add("d-flex", 'align-items-center','justify-content-between');

  containerPriceAsin = document.createElement("div");
  containerPriceAsin.classList.add("d-flex", "flex-column");
  const asinBookAddToCart = document.createElement("p");
  asinBookAddToCart.classList.add("asinBookToCart", "m-0");
  asinBookAddToCart.innerText = `ASIN code. ${book.asin}`;

  const priceBookAddToCart = document.createElement("p");
  priceBookAddToCart.classList.add("priceBookToCart");
  priceBookAddToCart.innerText = `€ ${book.price}`;

  const btnRemoveToCart=document.createElement('button')
  btnRemoveToCart.classList.add('btn','btn-sm','btn-danger')
  btnRemoveToCart.innerText="Rimuovi"
  btnRemoveToCart.addEventListener('click',()=>{removeBookToCart(containerBookAddToCart,book), badgeIndexAddCart.textContent=indexCart;

   })


  containerPriceAsin.append(asinBookAddToCart, priceBookAddToCart);
  containerDetails.append(containerPriceAsin, btnRemoveToCart);
  containerBookAddToCart.append(
    titleBookAddToCart,containerDetails
  );
  container.append(containerBookAddToCart);
};
getBooks().then((books) => {
  books.forEach((book) => createCardForMainPage(book, containerResultToSearch));
});

BtnSearch.addEventListener("click", async (e) => {
  e.preventDefault();
  const inputValue = inputSearch.value.toLowerCase();
  if (!inputValue || inputValue.length<2) {
    return alert("Scrivi almeno due lettere per la ricerca");
  }
  const AllBooks = await getBooks();
  const filterBooks = AllBooks.filter((book) =>
    book.title.toLowerCase().includes(inputValue)
  );
  console.log(filterBooks);
  containerResultToSearch.innerHTML = "";
  if (filterBooks.length === 0) {
    containerResultToSearch.innerHTML = `<div class="alert alert-light" role="alert">
 Nessun risultato trovato
</div>`;
    return;
  }
  filterBooks.forEach((book) =>
    createCardForMainPage(book, containerResultToSearch)
  );
});


btnOpenCart.addEventListener("click", () => {
  showDialog();
});

btnCloseCart.addEventListener("click", () => {
  hideDialog();
});




