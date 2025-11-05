const formSubmit = document.querySelector(".formInput");
const formInputs = document.querySelectorAll(".form-control");
const btnSubmit = document.querySelector(".btn-submit");
const containerProductsBackoffice = document.querySelector(
  ".container-products-add"
);

const inputName = document.querySelector(".input-name");
const inputDescription = document.querySelector(".input-description");
const inputBrand = document.querySelector(".input-brand");
const inputPrice = document.querySelector(".input-price");
const inputImage = document.querySelector(".input-image");

const allInputsError = document.querySelectorAll(".error");
const errorName = document.querySelector(".error-name");
const errorDescription = document.querySelector(".error-description");
const errorBrand = document.querySelector(".error-brand");
const errorImage = document.querySelector(".error-image");
const errorPrice = document.querySelector(".error-price");
const classInvalid = document.querySelectorAll(".is-invalid");

const formInputDialog = document.querySelector("dialog");
const btnCloseDialog = document.querySelector(".btn-close-dialog");
const btnModifyDialog = document.querySelector(".btn-modify-dialog");
const inputNameDialog = document.querySelector(".input-name-dialog");
const inputDescriptionDialog = document.querySelector(
  ".input-description-dialog"
);
const inputBrandDialog = document.querySelector(".input-brand-dialog");
const inputPriceDialog = document.querySelector(".input-price-dialog");
const inputImageDialog = document.querySelector(".input-image-dialog");

const allInputsErrorDialog = document.querySelectorAll(".error-dialog");
const errorNameDialog = document.querySelector(".error-name-dialog");
const errorDescriptionDialog = document.querySelector(
  ".error-description-dialog"
);
const errorBrandDialog = document.querySelector(".error-brand-dialog");
const errorImageDialog = document.querySelector(".error-image-dialog");
const errorPriceDialog = document.querySelector(".error-price-dialog");

const validateLettersOnly = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;
const validateNumbersOnly = /^\d+(\.\d+)?$/;
const validateUrlImage =
  /^(https?:\/\/(?:www\.)?[\w\-]+(?:\.[\w\-]+)+(?:[\w\-./?%&=+#:@]*)?)$/;

const apiUrl = "https://striveschool-api.herokuapp.com/api/product/";
const authorizationToken =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTA4YjMwOTg5MDE1MzAwMTU3ODc5MTkiLCJpYXQiOjE3NjIxNzc4MDEsImV4cCI6MTc2MzM4NzQwMX0.sFMQlGftzi09IkjFdEfOGb4fA72aoK3w8Rc-MCHq35I";

const getProduct = () => {
  return {
    name: inputName.value.trim(),
    description: inputDescription.value.trim(),
    brand: inputBrand.value.trim(),
    imageUrl: inputImage.value.trim(),
    price: parseFloat(inputPrice.value.trim().replace(",", ".")),
  };
};

const validateSectionWithWords = (input, error) => {
  if (!validateLettersOnly.test(input.value.trim())) {
    error.textContent = "Puoi inserire solo lettere";
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
    return false;
  } else {
    error.textContent = "";
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
    return true;
  }
};
const validateDescription = (input, error) => {
  if (input.value.trim().length < 10) {
    error.textContent = "Compila con almeno 10 caratteri";
    input.classList.add("is-invalid");
    return false;
  } else {
    input.classList.add("is-valid");
    return true;
  }
};
const validatePrice = (input, error) => {
  if (!validateNumbersOnly.test(input.value.trim())) {
    error.textContent = "Puoi inserire solo numeri";
    input.classList.add("is-invalid");
    return false;
  } else {
    input.classList.add("is-valid");
    return true;
  }
};
const validateImage = (input, error) => {
  if (!validateUrlImage.test(input.value.trim())) {
    error.textContent = "Ulr non valido";
    input.classList.add("is-invalid");

    return false;
  } else {
    input.classList.add("is-valid");

    return true;
  }
};

const validateForm = () => {
  const validName = validateSectionWithWords(inputName, errorName);
  const validDescription = validateDescription(
    inputDescription,
    errorDescription
  );
  const validBrand = validateSectionWithWords(inputBrand, errorBrand);
  const validPrice = validatePrice(inputPrice, errorPrice);
  const validImage = validateImage(inputImage, errorImage);
  return (
    validName && validDescription && validBrand && validImage && validPrice
  );
};

const removeValidation = (element) => {
  element.forEach((input) => {
    input.classList.remove("is-valid", "is-invalid");
  });
};
const removeErrorMeassge = (error) => {
  error.forEach((input) => (input.textContent = ""));
};
const showAlertProblem = (message) => {
  const alert = document.createElement("div");
  alert.classList.add("alert", "alert-danger");
  alert.textContent = message;
  formSubmit.appendChild(alert);

  setTimeout(() => {
    removeValidation(formInputs);
    alert.remove();
    removeErrorMeassge(allInputsError);
    alert.classList.remove("alert", "alert-danger");
  }, 2000);
};
const showAlertSuccess = (message) => {
  const alert = document.createElement("div");
  alert.classList.add("alert", "alert-success");
  alert.textContent = message;
  formSubmit.appendChild(alert);
  setTimeout(() => alert.remove(), 4000);
};
const refresh = async () => {
  containerProductsBackoffice.innerHTML = "";
  const products = await allProductIncluded();
  products.forEach((product) => generateCardProduct(product));
};
/**POST BACK */
const addNewProduct = async (product) => {
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authorizationToken,
      },
      body: JSON.stringify(product),
    });

    const data = await response.json();
    console.log("prodotto aggiunto", data);
    showAlertSuccess("prodotto aggiunto con successo!");
    formSubmit.reset();
    removeValidation(formInputs);
    await refresh();
    return data;
  } catch (e) {
    console.log(e);
    showAlertProblem("errore");
  }
};

/**GET BACK */
const allProductIncluded = async () => {
  try {
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: authorizationToken,
      },
    });
    return await response.json();
  } catch (e) {
    console.log(e);
  }
};

/**DELETE BACK */
const removeProduct = async (id) => {
  try {
    const response = await fetch(`${apiUrl}${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: authorizationToken,
      },
    });

    return response.json();
  } catch (e) {
    console.log(e);
  }
};
/**PUT BACK */
const addModifyProduct = async (id, product) => {
  try {
    const response = await fetch(`${apiUrl}${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: authorizationToken,
      },
      body: JSON.stringify(product),
    });
    return response.json();
  } catch (e) {
    console.log(e);
  }
};

formSubmit.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (validateForm()) {
    const newProduct = getProduct();
    await addNewProduct(newProduct);
  } else {
    showAlertProblem("Correggi gli errori");
  }
});

const generateCardProduct = (product) => {
  const row = document.createElement("div");
  row.classList.add("row", "g-3");

  const col = document.createElement("div");
  col.classList.add("col-4");

  const card = document.createElement("div");
  card.classList.add("cardProduct", "d-flex", "gap-3");

  const title = document.createElement("h6");
  title.classList.add("title-bacoffice");
  title.innerText = "NOME PRODOTTO:  " + product.name;

  const colBtn = document.createElement("div");
  colBtn.classList.add("col-8", "d-flex", "gap-4");

  const btnMidify = document.createElement("button");
  btnMidify.setAttribute("class", "btn btn-warning btn-submit btn-add");
  btnMidify.innerText = "Modifica prodotto";
  btnMidify.addEventListener("click", () => {
    formInputDialog.dataset.id = product._id;
    inputNameDialog.value = product.name;
    inputDescriptionDialog.value = product.description;
    inputBrandDialog.value = product.brand;
    inputPriceDialog.value = product.price;
    inputImageDialog.value = product.imageUrl;
    formInputDialog.showModal();
  });

  const btnRemove = document.createElement("button");
  btnRemove.setAttribute("class", "btn btn-warning btn-danger btn-remove");
  btnRemove.innerText = "Elimina prodotto";
  btnRemove.addEventListener("click", async () => {
    const eliminateProduct = await removeProduct(product._id);
    if (eliminateProduct) {
      row.remove(), await refresh();
    }
  });
  row.append(col, colBtn);
  colBtn.append(btnMidify, btnRemove);
  col.append(card);
  card.append(title);
  containerProductsBackoffice.append(row);
};
allProductIncluded().then((data) => {
  console.log(data);
  data.forEach((product) => {
    generateCardProduct(product);
  });
});

btnCloseDialog.addEventListener("click", () => {
  formInputDialog.close();
});

const valideteFormDialog = () => {
  const validateNameDialog = validateSectionWithWords(
    inputNameDialog,
    errorNameDialog
  );
  const validateDescriptionDialog = validateDescription(
    inputDescriptionDialog,
    errorDescriptionDialog
  );
  const validateBrandDialog = validateSectionWithWords(
    inputBrandDialog,
    errorBrandDialog
  );
  const validatePriceDialog = validatePrice(inputPriceDialog, errorPriceDialog);
  const validateImageDialog = validateImage(inputImageDialog, errorImageDialog);
  return (
    validateNameDialog &&
    validateDescriptionDialog &&
    validateBrandDialog &&
    validatePriceDialog &&
    validateImageDialog
  );
};

formInputDialog.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (valideteFormDialog()) {
    const modifyProduct = getModifyProduct();
    const id = formInputDialog.dataset.id;
    await addModifyProduct(id, modifyProduct);
    formInputDialog.close();
    await refresh();
  }
});

const getModifyProduct = () => {
  return {
    name: inputNameDialog.value.trim(),
    description: inputDescriptionDialog.value.trim(),
    brand: inputBrandDialog.value.trim(),
    imageUrl: inputImageDialog.value.trim(),
    price: parseFloat(inputPriceDialog.value.trim().replace(",", ".")),
  };
};
