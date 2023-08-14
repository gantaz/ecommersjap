function validar() {
    let user = document.getElementById("user").value;
    let password = document.getElementById("password").value;
    let recordar = document.getElementById("recordarme").checked;

    function validarpass() {
        if ((user.length > 0) && (password.length > 0)) {
            return true;
        } else {
            return false;
        }
    }

    if (recordar && validarpass()) {
        localStorage.setItem("user", user);
        window.location.href = "index.html";
    } else if (!recordar && validarpass()) {
        sessionStorage.setItem("user", user);
        window.location.href = "index.html";
    } else {
        alert("Datos incorrectos");
    }
}


document.addEventListener("DOMContentLoaded", function () {
    const enviar = document.getElementById("submitBtn");
    enviar.addEventListener("click", validar);
})
