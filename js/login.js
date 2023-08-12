function validar() {
    let mail = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let recordar = document.getElementById("recordarme").checked;

    if ((mail.length) > 0 && (password.length > 0) && (recordar === true)) {
        window.location.href = "index.html";

    } else {
        alert("Datos incorrectos")
    }
}

document.addEventListener("DOMContentLoaded", function() {

const enviar = document.getElementById("submitBtn");

enviar.addEventListener("click", validar);

})



//asdsaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa