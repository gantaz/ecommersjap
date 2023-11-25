/*

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
*/

function showFailAlert() {
  const failAlert = document.getElementById("danger-alert");

  failAlert.classList.remove("d-none");

  setTimeout(() => {
    failAlert.classList.add("d-none");
  }, 3000);
}

function login() {
  // Obtener los valores del usuario y la contraseña del formulario
  const usuario = document.getElementById("user").value;
  const contraseña = document.getElementById("password").value;
  const recordar = document.getElementById("recordarme").checked;

  // Construir el cuerpo de la solicitud (formato JSON)
  const requestBody = {
    usuario: usuario,
    contraseña: contraseña,
  };

  // Realizar la solicitud POST al endpoint /login en tu servidor
  fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  })
    .then((response) => {
      // Verificar si la respuesta es exitosa (código de estado 200-299)
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      // Parsear la respuesta JSON
      return response.json();
    })
    .then((data) => {
      // Manejar la respuesta del servidor (token)
      console.log("Token recibido:", data.token);

      // Almacenar el token en localStorage o sessionStorage según sea necesario
      localStorage.setItem("token", data.token);

      if (recordar) {
        localStorage.setItem("user", usuario);
      } else {
        sessionStorage.setItem("user", usuario);
      }

      // Redirigir a la página principal u otra página después del inicio de sesión
      window.location.href = "index.html";
    })
    .catch((error) => {
      // Manejar errores durante la solicitud
      console.error("Error durante la solicitud:", error);

      // Mostrar mensaje de error al usuario
      showFailAlert();
    });
}

// Asociar la función login al evento click del botón de inicio de sesión
document.addEventListener("DOMContentLoaded", function () {
  const enviar = document.getElementById("submitBtn");
  enviar.addEventListener("click", login);
});
