//SWIPER

const swiper = new Swiper(".swiper", {
  direction: "horizontal",
  loop: true,

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});


const containerProducts= document.querySelector('.container-products')
console.log("Container trovato:", containerProducts);

const apiUrl = "https://striveschool-api.herokuapp.com/api/product/";
const authorizationToken =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTA4YjMwOTg5MDE1MzAwMTU3ODc5MTkiLCJpYXQiOjE3NjIxNzc4MDEsImV4cCI6MTc2MzM4NzQwMX0.sFMQlGftzi09IkjFdEfOGb4fA72aoK3w8Rc-MCHq35I";


  const getProduct=async()=>{
    try{
        const response= await fetch(apiUrl, {
            headers:{
                Authorization: authorizationToken
            }
        })
        return await response.json()
     
    }catch(e){
        console.log(e)
    }
  }
getProduct().then(data=>{
    console.log(data)
    data.forEach(product=>{
        generateCardProduct(product)
    })
})



const generateCardProduct = (product) => {
  
  const col = document.createElement("div");
  col.setAttribute("class", "col-12 col-md-4 col-lg-3");

  const card = document.createElement("div");
  card.classList.add("card", "card-main");

  const imgCard = document.createElement("img");
  imgCard.src = product.imageUrl;
  imgCard.classList.add("card-img-top", "card-img");

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body", 'd-flex', 'flex-column','justify-content-between');

  const cardTitle = document.createElement("h5");
  cardTitle.classList.add("card-title");
  cardTitle.innerText = product.name;

  const cardPrice = document.createElement("h6");
  cardPrice.classList.add("small");
  cardPrice.innerText =`€ ${product.price}`;

const cardDetails= document.createElement('a')
cardDetails.classList.add('card-detail')
cardDetails.innerText= 'Dettagli del prodotto'
cardDetails.href= `../detail/detail.html?id=${product._id}`
console.log(cardDetails)



  cardBody.append( cardTitle, cardPrice, cardDetails)
  card.append(imgCard,cardBody)
  col.appendChild(card)
  containerProducts.append(col)
};

