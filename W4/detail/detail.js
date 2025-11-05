const params = new URLSearchParams(window.location.search);
const id = params.get("id");
console.log("prdotto", id);
const containerDetail= document.querySelector('.container-detail-product')


const getDetailProduct = async () => {
  try {
    const response = await fetch(
      `https://striveschool-api.herokuapp.com/api/product/${id}`,
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTA4YjMwOTg5MDE1MzAwMTU3ODc5MTkiLCJpYXQiOjE3NjIxNzc4MDEsImV4cCI6MTc2MzM4NzQwMX0.sFMQlGftzi09IkjFdEfOGb4fA72aoK3w8Rc-MCHq35I",
        },
      }
    );
    return response.json();
  } catch (e) {
    console.log(e);
  }
};
getDetailProduct().then(product=>{
  generateCardDetail(product)
})

const generateCardDetail = (product) => {
  const colImage = document.createElement("div");
  colImage.classList.add("col-12","col-md-4");

  const detailImage = document.createElement("img");
  detailImage.src = product.imageUrl;
  detailImage.classList.add("image-detail");

  const colDescription = document.createElement("div");
  colDescription.classList.add("col-12","col-md-8","text-center", "text-md-start", 'container-detail-text', "pt-5");

  const detailTitle = document.createElement("h2");
  detailTitle.classList.add("detail-title");
  detailTitle.innerText = product.name;

  const detailDescription = document.createElement("p");
  detailDescription.classList.add("detail-description");
  detailDescription.innerText = product.description;

  const detailPrice = document.createElement("p");
  detailPrice.classList.add("detail-price");
  detailPrice.innerText = '€'+product.price;

  const detailBrand = document.createElement("p");
  detailBrand.classList.add("detail-brand","small");
  detailBrand.innerText = product.brand;

  colImage.appendChild(detailImage)
  colDescription.append(detailTitle,detailDescription,detailPrice, detailBrand)
  
  containerDetail.append(colImage,colDescription)
};
