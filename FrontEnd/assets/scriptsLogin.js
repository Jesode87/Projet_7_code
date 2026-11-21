const loginForm = document.querySelector("form")

loginForm.addEventListener("submit",async (event) => { // event listener du formulaire afin d'envoyer les données au serveur pour se connecter
    event.preventDefault();
    let userEmail = document.getElementById("email").value
    let userPassword = document.getElementById("password").value
    const loginResponse = await fetch("http://localhost:5678/api/users/login", {
    method:"POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({email: userEmail, password:userPassword}),
})
const loginRes = await loginResponse.json()

if (loginResponse.status === 200 ) { // permet de récupérer le token de connexion qui sera stocké dans le local storage avant qu'on revienne à la page d'accueil
    const UserToken = loginRes.token
    window.localStorage.setItem("token",UserToken)
    location = "http://127.0.0.1:5500/FrontEnd/index.html"
}

else {
    alert("Erreur dans l’identifiant ou le mot de passe") // message d'erreur en cas de formulaire mal rempli
}
});

