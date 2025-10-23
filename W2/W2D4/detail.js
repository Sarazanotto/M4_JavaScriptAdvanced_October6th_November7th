const params = new URLSearchParams(window.location.search);
const detailOfBook = params.get("id");
const containerDetailBook = document.querySelector(".container-detail");
const contentCart = document.querySelector(".content-cart");
const btnOpenCart = document.querySelector(".btn-cart");
const dialogCartToAdd = document.querySelector(".dialog-cart");
const btnCloseCart = document.querySelector(".close-dialog");
const spinner= document.querySelector('.spinner-loading')
const myCart = [];
let indexCart=0;
const badgeIndexAddCart=document.querySelector('.index-add-to-cart');

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

const getDetailBook = async () => {
  try {
    const response = await fetch(
      `https://striveschool-api.herokuapp.com/books`
    );
    const books = await response.json();
    return books;
  } catch (error) {
    console.log(error.message);
  }
};
getDetailBook().then((books) => {
  const book = books.find((book) => book.asin === detailOfBook);
  if (book) {
    createCardForDetailPage(book, containerDetailBook);
  }
});

const createCardForDetailPage = (element, container) => {
  const col = document.createElement("div");
  col.setAttribute("class", "col d-flex justify-content-center");

  const card = document.createElement("div");
  card.classList.add("card-detail",'d-md-flex','align-items-end','gap-5');
  const containerImg = document.createElement("div");
  
  containerImg.classList.add("containerimg");
  const imageCardMain = document.createElement("img");
  imageCardMain.setAttribute("class", "w-100 imgcard");
  imageCardMain.src = element.img;
  imageCardMain.alt = "book img";

  const cardBody = document.createElement("div");
  cardBody.classList.add("cardbody","mt-4",'d-flex','flex-column');
  const titleCardMain = document.createElement("h5");
  titleCardMain.classList.add("title-card", "m-0");
  titleCardMain.innerText = element.title;

  const priceBook = document.createElement("p");
  priceBook.classList.add("fw-light", "m-0",'fw-bold','mt-2','mt-md-4');
  priceBook.innerText = `Prezzo: ${element.price}€`;

  const asinBook = document.createElement("badge");
  asinBook.classList.add("fw-light",'small', "m-0");
  asinBook.innerText = `Asin: ${element.asin}€`;

  const containerCardDetail = document.createElement("div");
  containerCardDetail.classList.add("containerCardDetail");

 

  const iconLikeCardMain = document.createElement("i");
  iconLikeCardMain.classList.add("bi", "bi-hand-thumbs-up", "fs-5");

  const cartProductCardMain = document.createElement("button");
  cartProductCardMain.classList.add("btn", "btn-success");
  cartProductCardMain.addEventListener("click", () => {
    addToCart(element), (badgeIndexAddCart.textContent = indexCart);
  });

  const iconCartCardMain = document.createElement("i");
  iconCartCardMain.classList.add("bi", "bi-cart");

  cartProductCardMain.append(iconCartCardMain);


  containerCardDetail.append( cartProductCardMain);
  cardBody.append(titleCardMain, asinBook, priceBook, containerCardDetail);
  containerImg.append(imageCardMain);
  card.append(containerImg, cardBody);
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
  btnRemoveToCart.addEventListener('click',()=>{removeBookToCart(containerBookAddToCart,book), badgeIndexAddCart.textContent=indexCart })


  containerPriceAsin.append(asinBookAddToCart, priceBookAddToCart);
  containerDetails.append(containerPriceAsin, btnRemoveToCart);
  containerBookAddToCart.append(
    titleBookAddToCart,containerDetails
  );
  container.append(containerBookAddToCart);
};


btnOpenCart.addEventListener("click", () => {
  showDialog();
});

btnCloseCart.addEventListener("click", () => {
  hideDialog();
});
