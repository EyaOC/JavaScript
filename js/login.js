const form = document.getElementById("form");

form.addEventListener("submit", async (event) => {
    // Empêche le formulaire de se soumettre et d'actualiser la page
  event.preventDefault();
  const email = form["email"].value;
  const password = form["password"].value;

  const user = {
    email: email,
    password: password,
  };

  callAPI(user);
});

async function callAPI(user) {
  let response = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
        "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(user),
});

// RECUPERATION DU TOKEN
let result = await response.json();
const errorDisplay = document.querySelector('.error');
// Déclaration de loginError avant son utilisation
const loginError = document.getElementById("login_error");

// Si l'authentification s'est bien passée
if (result.token !== undefined) {
    //   ETAPE 1 : STOCKER LE TOKEN DANS LE LOCAL STORAGE
    const authToken = result.token;
    localStorage.setItem("token", authToken);

    //   ETAPE 2 : FAIRE UNE REDIRECTION VERS LA PAGE D'ACCUEIL
    window.location.href = "index.html";
} else {
    // Si l'authentification ne s'est pas bien passée
    loginError.innerHTML = "E-mail ou mot de passe incorrect";
    loginError.style.display = "flex";
}
  
}

