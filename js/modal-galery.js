import { fetchWorks } from "./api.js";


const BUTTON_MODIF_WORKS = document.querySelector('#modif_projet');
let modal = null


const modal1 = document.querySelector("modal1");
 const modifier = document.querySelectorAll("modifier");

// ajouter un event listener sur ce bouton au click
modifier.forEach(trigger => trigger.addEventListener('click' ,toggleModale))

function toggleModale (){
modal1.classList.toggle("active")
}
const ajout_photo = document.querySelectorAll(".ajout-photo");
console.log(ajout_photo);

//FONCTION OUVERTURE BOITE MODALE
function OPEN_MODAL (e) {
    e.preventDefault()
    modal=document.querySelector("#modal1");
    modal.style.display=null
  
}


//AJOUT LISTENER SUR CLIQUE BOUTON MODIFIER POUR APPELER OUVERTURE MODALE  
BUTTON_MODIF_WORKS.addEventListener('click', OPEN_MODAL)


