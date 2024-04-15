import { fetchWorks, fetchCategory } from "./api.js";
import { displayWorksAndCategories } from "./filtre.js";
import { displayWorks, displayModalGallery } from "./works.js";

const works = await fetchWorks();
const categories = await fetchCategory();
// Affichage des works
displayWorks(works);
displayModalGallery(works);

// Verifier si le token est dans le local storage
const logoutButton = document.getElementById("logout");
var token = localStorage.getItem("token");
if (token !== null) {
  // Si c'est dans le local storage, l'utilisateur est connecte donc on modifie l'affichage du site
  affichageConnecte();
} else {
  affichageNonConnecte();
  // Si c'est pas dans le local storage l'utilisateur n'est pas connecté on affiche le site d'une autre manière
}

function affichageConnecte() {
  administrator();
  logoutAdministrator();
  headbandBlack();
}
function affichageNonConnecte() {
  displayWorksAndCategories(categories, works);

}

function handleClickLogout() {
  if (logoutButton.textContent === "login") {
    window.location.href = "./login.html";
  } else if (logoutButton.textContent === "logout") {
    logoutButton.removeEventListener("click", handleClickLogout);
    window.location.href = "./index.html";
  }
}
logoutButton.addEventListener("click", handleClickLogout);

function administrator() {
  if (token) {
    logoutButton.textContent = "logout";
    const linkModals = document.getElementsByClassName("modifier");
    document.querySelector("header").style.marginTop = "100px ";
    for (let i = 0; i < linkModals.length; i++) {
      linkModals[i].style.visibility = "visible";
    }
  }
}
function logoutAdministrator() {
  const linkModals = document.getElementsByClassName("link__modal");
  logoutButton.addEventListener("click", function () {
    if (token) {
      localStorage.removeItem("token");
      document.getElementById("modal__header").style.visibility = "hidden";
      for (let i = 0; i < linkModals.length; i++) {
        linkModals[i].style.visibility = "hidden";
      }
    }
  });
}
function headbandBlack() {
  const header = document.querySelector(".barre-noir");
  const displayHeadband = document.createElement("div");
  header.appendChild(displayHeadband);
  displayHeadband.innerHTML = `
  <aside
  
    id="modal__header"
    class="modal__header js-modal"
    aria-hidden="true"
    role="dialog"
    aria-modal="false"
    aria-labelledby="title_modal"
  >
    <div  class="modal__header__display">
      <p> <i class="fa-regular fa-pen-to-square"></i> Mode édition </p>
      
    </div>
  </aside>
  `;
}


