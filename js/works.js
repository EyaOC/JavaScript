import { fetchWorks } from "./api.js";
let worksData;
let categoriesData;
const modal1 = document.querySelector("#modal1");

//----------- Récupération des API -------------------------
async function fetchCategory() {
  const response = await fetch("http://localhost:5678/api/categories");
  const categories = await response.json();
  categoriesData = categories;
  return categories;
}
fetchCategory();
//-------- Fonction refresh pour synchroniser les images supprimés
function refreshWorks() {
  fetchWorks().then((works) => {
    worksData = works;
    // console.log(worksData);
    displayWorks(worksData);
  });
}


//----------- Fonction qui comprend l'affichage des images-------------------------
export function displayWorks(works) {
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";
  works.forEach((project) => {
    const figure = document.createElement("figure");
    figure.innerHTML = `
       <img src="${project.imageUrl}" alt="${project.title}">
       <figcaption>${project.title}</figcaption>
       `;
    gallery.appendChild(figure);
  });
}

function closeModal(modal) {
  modal.style.display = "none";
}
//-------- ----------------Modale1 -------------------------------------------------

export function displayModalGallery(works) {
  const modal__wrapper1 = document.querySelector(".modal__wrapper");
  const modal_content = document.querySelector(".modal-content");

  const gallery = document.createElement("div");
  gallery.className = "modal-gallery";
  gallery.innerHTML = "";

  const separation = document.createElement("div");
  separation.className = "separation1";
  const ajout_photo = document.createElement("div");
  ajout_photo.className = "ajout-photo";
  ajout_photo.innerHTML = "Ajouter une photo";
  ajout_photo.addEventListener("click", OPEN_MODAL2);

  const closeIcon1 = document.createElement("i");
  closeIcon1.classList.add("fa-solid", "fa-xmark", "close__icon");
  closeIcon1.addEventListener("click", () => {
    closeModal(modal1);
  });

  // Ajout des icônes à la div "icone"
  modal__wrapper1.appendChild(closeIcon1);

  works.forEach((project) => {
    const img = document.createElement("img");
    img.src = project.imageUrl;
    img.dataset.id = project.id;

    const figure = document.createElement("div");
    figure.className = "modal-gallery-item";
    //icone corbeille
    const trashIcon1 = document.createElement("i");
    trashIcon1.classList.add("fa", "fa-regular", "fa-trash-can", "trash-icon"); // Ajoutez la classe "trash-icon"

    // Clone l'icône pour chaque image
    const trashIconClone = trashIcon1.cloneNode(true);

    // Ajoutez un écouteur d'événements à chaque icône de corbeille
    trashIconClone.addEventListener("click", (event) => {
      event.preventDefault();
      const selectedPicture = event.target.parentNode.querySelector("img");
      console.log(selectedPicture);
      if (selectedPicture) {
        const imageId = selectedPicture.dataset.id;
        console.log(imageId);
        console.log("TEST 1");
        fetchDelete(imageId).then(() => {
          selectedPicture.parentNode.remove();
          refreshWorks();
        });
      }
    });

    // Ajouter l'image à la figure
    figure.appendChild(img);
    figure.appendChild(trashIconClone);
    // Ajouter la figure à la galerie
    gallery.appendChild(figure);
  });
  // Ajouter la galerie au contenu modal
  modal_content.appendChild(gallery);

  // Ajouter la séparation et l'élément d'ajout de photo au contenu modal
  modal_content.appendChild(separation);
  separation.appendChild(ajout_photo);

  // Ajouter le contenu modal au wrapper modal
  modal__wrapper1.appendChild(modal_content);

  // Ajouter le wrapper modal à l'élément modal
  modal1.appendChild(modal__wrapper1);
}
// --------- Requéte API delete picture

async function fetchDelete(imageId) {
  const token = localStorage.getItem("token");
  try {
    console.log(imageId);
    const response = await fetch(`http://localhost:5678/api/works/${imageId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      console.log("Image supprimée avec succès");
    } else {
      throw new Error("Erreur lors de la suppression de l'image");
    }
  } catch (error) {
    console.log(error.message);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Votre code JavaScript ici
  const modal2 = document.querySelector("#modal2");
  // Autres opérations avec modal2
});

function OPEN_MODAL2(e) {
  e.preventDefault();
  modal2.style.display = null;
}
await fetchCategory(); // Attendre que les catégories soient récupérées
// Vérifier si categoriesData est défini avant d'appeler map
const categoryOptions = categoriesData;
// Création des éléments de la partie supérieure du modal2
const modal__wrapper2 = document.querySelector(".modal__wrapper");

const iconeDiv = document.createElement("div");
iconeDiv.classList.add("icone");
const arrowLeftIcon = document.createElement("i");
arrowLeftIcon.classList.add("fa-solid", "fa-arrow-left");
//arrowLeftIcon.id = "open__modal__previous";
const closeIcon = document.createElement("i");
closeIcon.classList.add("fa-solid", "fa-xmark", "close__icon");

// Ajout des icônes à la div "icone"
iconeDiv.appendChild(arrowLeftIcon);
iconeDiv.appendChild(closeIcon);

// Création de la div "add__global"
const addGlobalDiv = document.createElement("div");
addGlobalDiv.id = "add__global";

// Création du formulaire
const form = document.createElement("form");
form.classList.add("display__form");
form.setAttribute("action", "#");
form.setAttribute("method", "post");
console.log(categoriesData);
// Ajout du contenu au formulaire
form.innerHTML = `
    <h3 id="title_modal">Ajout photo</h3>
    <div class="add__picture">
        <i class="fa-regular fa-image previous__icone"></i>
        <input type="file" id="modal__add__picture" /><br>
        <label for="modal__add__picture">+ Ajouter une photo</label>
        <p>jpg, png: 4mo max</p>
    </div>
    <div id="modal__title__categorie">
        <label for="title-form">Titre</label>
        <input type="text" name="title-form" id="title-form" autocomplete="title-form" />
        <label for="categories">Catégorie</label>
        <select id="categories" name="categories">
            <option value=" " class="option__category" ></option>
            
            ${categoryOptions.map(
              (category) => `<option value="${category.id}">${category.name}</option>`
            )}
        </select>
    </div>
`;
// Création du formulaire de validation
const validationForm = document.createElement("form");
validationForm.classList.add("form__valid");
validationForm.setAttribute("action", "#");
validationForm.setAttribute("method", "post");
const validationButton = document.createElement("input");
validationButton.type = "submit";
validationButton.id = "valid";
validationButton.value = "Valider";
validationForm.appendChild(validationButton);

// Ajout des éléments au formulaire global
addGlobalDiv.appendChild(form);
addGlobalDiv.appendChild(validationForm);

// Ajout des éléments à la div "modal__wrapper"
modal__wrapper2.appendChild(iconeDiv);
modal__wrapper2.appendChild(addGlobalDiv);

// Ajout de la div "modal__wrapper" à l'élément <aside> modal2
modal2.appendChild(modal__wrapper2);

// Ajout de l'élément <aside> au document
let modal_new = null;
document.body.appendChild(modal2);
function closeModal2() {
  modal2.style.display = "none";
  closeModal(modal1);
}
function returnModal2() {
  modal2.style.display = "none";
}
// Ajouter un écouteur d'événements pour l'icône de fermeture
closeIcon.addEventListener("click", closeModal2, closeModal(modal1));

// Ajouter un écouteur d'événements pour l'icône flèche gauche
arrowLeftIcon.addEventListener("click", returnModal2);

function addPictureInput() {
  const addInput = document.querySelector("#modal__add__picture");
  const divAddPicture = document.querySelector(".add__picture");
  const titleInput = document.querySelector("#title-form");
  const categoriesInput = document.querySelector("#categories");
  categoriesInput.addEventListener("input", (e) => {
    checker(categoriesInput.value, addInput.files[0], titleInput.value);
  });
  titleInput.addEventListener("input", (e) => {
    checker(categoriesInput.value, addInput.files[0], titleInput.value);
  });
  addInput.addEventListener("change", (e) => {
    const selectFile = e.target.files[0];
    const newFile = new FileReader();
    const fileName = selectFile.name;
    const fileExtension = fileName.split(".").pop().toLowerCase();
    if (fileExtension !== "jpg" && fileExtension !== "png") {
      alert("Format de fichier non valide. Veuillez sélectionner un fichier au format JPG ou PNG.");
      return;
    }
    const fileSizeInBytes = selectFile.size;
    const fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);
    const maxSizeInMegabytes = 4;
    if (fileSizeInMegabytes > maxSizeInMegabytes) {
      alert(
        "Taille de fichier dépassée. Veuillez sélectionner un fichier de taille inférieure à 4 Mo."
      );
      return;
    }
    newFile.addEventListener("load", (e) => {
      const addImage = document.createElement("img");
      addImage.src = e.target.result;
      addImage.classList.add("add__img__display");
      divAddPicture.querySelectorAll("*").forEach((child) => {
        child.style.display = "none";
      });
      divAddPicture.appendChild(addImage);
      divAddPicture.style.flexDirection = "revert";
      checker(categoriesInput.value, addInput.files[0], titleInput.value);
    });
    newFile.readAsDataURL(selectFile);
  });
  const submit = document.querySelector(".form__valid");
  submit.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log(titleInput);
    const work = {
      title: titleInput.value,
      image: addInput.files[0],
      category: categoriesInput.value,
    };
    console.log(work);
    postLoadWorks(work);
  });
}
addPictureInput();

function checker(category, title, image) {
  const submitButton = document.getElementById("valid");
  const submit = document.querySelector(".form__valid");
  if (category.trim() !== "" && title && image) {
    submitButton.style.background = "#1D6154";
    submit.disabled = false;
  } else {
    submitButton.style.background = "#A7A7A7";
    submit.disabled = true;
  }
}
function postLoadWorks(work) {
  const token = localStorage.getItem(`token`);
  const formData = new FormData();
  formData.append("image", work.image);
  formData.append("title", work.title);
  formData.append("category", work.category);
  event.preventDefault();
  let request = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  };
  fetch("http://localhost:5678/api/works", request)
    .then((response) => {
      if (response.ok) {
        reinit();
        //alert(`Votre projet ` + work.title + ` est en ligne`);
        closeModal2();
        return fetchWorks();
      } else {
  
        console.log("Erreur lors de la mise à jour de l'image ");
      }
    })
    .then((updateWorks) => {
      if (updateWorks) {
        worksData = updateWorks;
        displayWorks(worksData);
      }
    });
}
// Reinitialisation modaleNext
function reinit() {
  const reinitPicture = document.querySelector(".add__img__display");
  const titleInput = document.querySelector("#title-form");
  const categoriesInput = document.querySelector("#categories");
  const divAddPicture = document.querySelector(".add__picture");
  const submit = document.querySelector(".form__valid");
  const submitButton = document.getElementById("valid");
  reinitPicture.src = "";
  titleInput.value = "";
  categoriesInput.value = "Sélectionner une catégorie";
  submit.disabled = true;
  submitButton.style.background = "#A7A7A7";
  divAddPicture.querySelectorAll("*").forEach((child) => {
    child.style.display = "flex";
  });
  divAddPicture.style.flexDirection = "column";
  // ModalNext();
}
