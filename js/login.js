function showFailAlert() {
    const failAlert = document.getElementById("danger-alert");
  
    failAlert.classList.remove("d-none");
  
    setTimeout(() => {
      failAlert.classList.add("d-none");
    }, 3000);
}

function validarFormatoEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validar() {
    let user = document.getElementById("user").value;
    let password = document.getElementById("password").value;
    let recordar = document.getElementById("recordarme").checked;
    let validity = false;

    if (validarFormatoEmail(user) === false){
        document.getElementById("feedback-user").classList.add("d-block");
    } else {
        document.getElementById("feedback-user").classList.remove("d-block");
    }

    function myValidations() {
        if ((user.length > 0) && (password.length > 0)) {
            validity = true;
            return true;
        } else {
           // document.getElementById("feedback-password").classList.add("d-block");
            return false;
        }
    }

    if (validarFormatoEmail(user) && myValidations()) {
        if (recordar) {
          localStorage.setItem("user", user);
        } else {
          sessionStorage.setItem("user", user);
        }
        window.location.href = "index.html";
      } else {
        showFailAlert();
      }
}


document.addEventListener("DOMContentLoaded", function () {
    const enviar = document.getElementById("submitBtn");
    enviar.addEventListener("click", validar);
})