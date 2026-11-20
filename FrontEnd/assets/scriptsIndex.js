const worksGallery = document.querySelector(".gallery");

const worksCategories = document.querySelector(".categories");

const editWorksGrid = document.getElementById("modaleWorksGrid");

const allButton = document.querySelector(".categories button");

const picturePreview = document.getElementById("picturePreview");

const picturePreviewImg = document.getElementById("picturePlaceholder");

const picturePreviewDiv = document.querySelector("#labelImage div");

const picturePreviewP = document.querySelector("#labelImage p");

const inputPicture = document.getElementById("image");

const inputTitle = document.getElementById("title");

const inputCategory = document.getElementById("categorie");

const form = document.getElementById("workForm");

const logoutButton = document.getElementById("logout");

const editButtonClick = document.getElementById("editButton");

const crossButtonClick = document.getElementById("modaleCross");

const shadowClick = document.getElementById("bodyShadow");

const modalePictureButton = document.getElementById("modalePicture");

const modaleLeftArrowBack = document.getElementById("modaleLeftArrow");

let userToken = 0;

let addNewWorkPicture = 0;

let addNewWorkTitle = 0;

let addNewWorkCategory = 0;

let worksList = await worksFetch();

let worksCategoriesList = await worksCategoriesFetch();

function changeValidateButtonColor() {
  const button = document.getElementById("validateButton");
  if (
    addNewWorkPicture === 1 &&
    addNewWorkTitle === 1 &&
    addNewWorkCategory === 1
  ) {
    button.style.backgroundColor = "#1d6154";
    button.setAttribute("form", "workForm");
    button.setAttribute("type", "submit");
  } else {
    button.style.backgroundColor = "#A7A7A7";
  }
}

function preview(file, url) {
  picturePreview.src = url;
  picturePreview.alt = file.name;
  picturePreview.style.display = "flex";
  picturePreviewImg.style.display = "none";
  picturePreviewDiv.style.display = "none";
  picturePreviewP.style.display = "none";
}

async function worksFetch() {
  const worksReponse = await fetch("http://localhost:5678/api/works/");
  const worksList = await worksReponse.json();
  return worksList;
}

async function worksCategoriesFetch() {
  const worksCategoriesReponse = await fetch(
    "http://localhost:5678/api/categories",
  );
  const worksCategoriesList = await worksCategoriesReponse.json();
  return worksCategoriesList;
}

function worksCategoriesCreation(id) {
  const categorie = worksCategoriesList[id];
  const button = document.createElement("button");
  const text = categorie.name;
  const buttonText = document.createTextNode(text);
  button.appendChild(buttonText);
  worksCategories.appendChild(button);
  button.classList.add("buttonCategorieUnselected");
  const categoryOption = document.createElement("option");
  categoryOption.value = categorie.id;
  categoryOption.innerHTML = text;
  const dropdownOptions = document.getElementById("categorie");
  dropdownOptions.appendChild(categoryOption);
  button.addEventListener("click", (event) => {
    unselectButton();
    selectButton(event.target);
    worksRemove();
    worksDisplay();
  });
}

function worksCreation(id) {
  const work = worksList[id];
  const workcategory = work.category.name;
  const buttonSelected = document.querySelector(".buttonCategorieSelected");
  const buttonSelectedName = buttonSelected.textContent;
  if (buttonSelectedName == "Tous") {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    figure.id = work.title;
    img.src = work.imageUrl;
    img.alt = work.title;
    const figcaption = document.createElement("figcaption");
    figcaption.innerText = work.title;
    figure.appendChild(img);
    figure.appendChild(figcaption);
    worksGallery.appendChild(figure);
  } else {
    if (buttonSelectedName == workcategory) {
      const figure = document.createElement("figure");
      const img = document.createElement("img");
      img.src = work.imageUrl;
      img.alt = work.title;
      const figcaption = document.createElement("figcaption");
      figcaption.innerText = work.title;
      figure.appendChild(img);
      figure.appendChild(figcaption);
      worksGallery.appendChild(figure);
    }
  }
}

function worksCategoriesDisplay() {
  for (let i = 0; i < worksCategoriesList.length; i++) {
    worksCategoriesCreation(i);
  }
}

function worksDisplay() {
  for (let i = 0; i < worksList.length; i++) {
    worksCreation(i);
  }
}

function worksRemove() {
  const works = document.querySelectorAll(".gallery figure");
  for (let i = 0; i < works.length; i++) {
    works[i].remove();
  }
}

function categoriesRemove() {
  const categories = document.querySelectorAll(".categories button");
  const options = document.querySelectorAll("select option");
  for (let i = 1; i < categories.length; i++) {
    categories[i].remove();
    options[i].remove();
  }
}

async function editWorksCreation(id) {
  const work = worksList[id];
  const img = document.createElement("img");
  const figure = document.createElement("figure");
  const icon = document.createElement("i");
  icon.id = work.id;
  img.src = work.imageUrl;
  img.alt = work.title;
  icon.className = "fa-solid fa-trash-can fa-canvas-roomy";
  figure.appendChild(img);
  figure.appendChild(icon);
  editWorksGrid.appendChild(figure);
  icon.addEventListener("click", async (event) => {
    worksDelete(event.target.id, userToken);
    main();
  });
}

function editWorksRemove() {
  const editWorks = document.querySelectorAll("#modaleGallery figure");
  for (let i = 0; i < editWorks.length; i++) {
    editWorks[i].remove();
  }
}

async function worksDelete(id, userToken) {
  console.log(id);
  const urlWorks = "http://localhost:5678/api/works/";
  const deleteUrl = urlWorks.concat(id);
  const bearer = "Bearer " + userToken;
  const deleteHeaders = new Headers();
  deleteHeaders.append("Authorization", bearer);
  await fetch(deleteUrl, {
    method: "DELETE",
    headers: deleteHeaders,
  });
}

function editWorksDisplay() {
  for (let i = 0; i < worksList.length; i++) {
    editWorksCreation(i);
  }
}

function editMode() {
  userToken = window.localStorage.getItem("token");
  if (userToken) {
    const editButton = document.querySelector(".projects h3");
    editButton.style.display = "block";
    const editBar = document.querySelector(".editionBar");
    editBar.style.display = "flex";
    const removeCategories = document.querySelector(".categories");
    removeCategories.style.display = "none";
    const login = document.getElementById("login");
    login.style.display = "none";
    const logout = document.getElementById("logout");
    logout.style.display = "list-item";
  }
}

function selectButton(buttonClicked) {
  buttonClicked.classList.remove("buttonCategorieUnselected");
  buttonClicked.classList.add("buttonCategorieSelected");
}

function unselectButton() {
  const buttonsSelected = document.querySelector(".buttonCategorieSelected");
  buttonsSelected.classList.remove("buttonCategorieSelected");
  buttonsSelected.classList.add("buttonCategorieUnselected");
}

function logOut() {
  window.localStorage.removeItem("token");
  const editButton = document.querySelector(".projects h3");
  editButton.style.display = "none";
  const editBar = document.querySelector(".editionBar");
  editBar.style.display = "none";
  const removeCategories = document.querySelector(".categories");
  removeCategories.style.display = "flex";
  const login = document.getElementById("login");
  login.style.display = "list-item";
  const logout = document.getElementById("logout");
  logout.style.display = "none";
}

function modaleDisplay() {
  const bodyShadow = document.getElementById("bodyShadow");
  bodyShadow.style.display = "block";
  const modale = document.getElementById("modale");
  modale.style.display = "flex";
}

async function modaleRemove() {
  const bodyShadow = document.getElementById("bodyShadow");
  bodyShadow.style.display = "none";
  const modale = document.getElementById("modale");
  modale.style.display = "none";
  addNewWorkPicture = 0;
  addNewWorkTitle = 0;
  addNewWorkCategory = 0;
  main();
}

function addPicture() {
  const modaleLeftArrow = document.getElementById("modaleLeftArrow");
  modaleLeftArrow.style.color = "black";
  const title = document.querySelector("#modaleGallery h2");
  title.textContent = "Ajout photo";
  const worksGrid = document.getElementById("modaleWorksGrid");
  worksGrid.style.display = "none";
  const modaleButton = document.getElementById("modalePicture");
  modaleButton.style.display = "none";
  const validateButton = document.getElementById("validateButton");
  validateButton.style.display = "block";
  const modaleAddNew = document.getElementById("modaleAddNew");
  modaleAddNew.style.display = "flex";
  picturePreview.style.display = "none";
  picturePreviewImg.style.display = "block";
  picturePreviewDiv.style.display = "flex";
  picturePreviewP.style.display = "block";
  changeValidateButtonColor();
}

function leftArrowBack() {
  const modaleLeftArrow = document.getElementById("modaleLeftArrow");
  modaleLeftArrow.style.color = "white";
  const title = document.querySelector("#modaleGallery h2");
  title.textContent = "Galerie photo";
  const worksGrid = document.getElementById("modaleWorksGrid");
  worksGrid.style.display = "grid";
  const modaleButton = document.getElementById("modalePicture");
  modaleButton.style.display = "block";
  const validateButton = document.getElementById("validateButton");
  validateButton.style.display = "none";
  const modaleAddNew = document.getElementById("modaleAddNew");
  modaleAddNew.style.display = "none";
  addNewWorkPicture = 0;
  addNewWorkTitle = 0;
  addNewWorkCategory = 0;
  form.reset();
  main();
}

async function formSubmit() {
  if (
    addNewWorkPicture === 1 &&
    addNewWorkTitle === 1 &&
    addNewWorkCategory === 1
  ) {
    const formData = new FormData();
    const newPicture = inputPicture.files[0];
    const newTitle = inputTitle.value;
    const newCategory = inputCategory.value;
    formData.append("image", newPicture);
    formData.append("title", newTitle);
    formData.append("category", newCategory);
    const bearer = "Bearer " + userToken;
    const request = new XMLHttpRequest();
    request.open("POST", "http://localhost:5678/api/works");
    request.setRequestHeader("Authorization", bearer);
    request.setRequestHeader("Accept", "application/json");
    request.send(formData);
    form.reset();
    main();
  } else {
    alert("Il y a une erreur dans le formulaire");
  }
}

async function main() {
  worksCategoriesList = await worksCategoriesFetch();
  worksList = await worksFetch();
  editWorksRemove();
  worksRemove();
  categoriesRemove();
  worksCategoriesDisplay();
  worksDisplay();
  editWorksDisplay();
  editMode();
  form.reset();
}

inputPicture.addEventListener("change", (event) => {
  if (event.target.value) {
    addNewWorkPicture = 1;
  } else {
    addNewWorkPicture = 0;
  }
  const file = inputPicture.files[0];
  const fileUrl = URL.createObjectURL(file);
  preview(file, fileUrl);
  changeValidateButtonColor();
  return file;
});

inputTitle.addEventListener("change", (event) => {
  if (event.target.value) {
    addNewWorkTitle = 1;
  } else {
    addNewWorkTitle = 0;
  }
  changeValidateButtonColor();
});

inputCategory.addEventListener("change", (event) => {
  if (event.target.value) {
    addNewWorkCategory = 1;
  } else {
    addNewWorkCategory = 0;
  }
  changeValidateButtonColor();
});

allButton.addEventListener("click", (event) => {
  unselectButton();
  selectButton(event.target);
  worksRemove();
  worksDisplay();
});

logoutButton.addEventListener("click", () => {
  logOut();
});

editButtonClick.addEventListener("click", () => {
  modaleDisplay();
});

crossButtonClick.addEventListener("click", () => {
  leftArrowBack();
  modaleRemove();
});

shadowClick.addEventListener("click", () => {
  leftArrowBack();
  modaleRemove();
});

modalePictureButton.addEventListener("click", () => {
  addPicture();
});

modaleLeftArrowBack.addEventListener("click", () => {
  leftArrowBack();
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  formSubmit();
});

main();
