// Colocar usuario en campo email
document.getElementById("email").placeholder = localStorage.getItem("user") || sessionStorage.getItem("user");

// Validar campos requeridos
let pNombre = document.getElementById("primer-nombre");
let pApellido = document.getElementById("primer-apellido");
let telefono = document.getElementById("telefono");
let sNombre = document.getElementById("segundo-nombre");
let sApellido = document.getElementById("segundo-apellido");

function myValidations() {
  let validity = false;

  document.getElementById("datos-obligatorios").classList.add("was-validated");

  if (pNombre.value) {
    datosUsuario.pNombre = pNombre.value;
    validity = true;
  } else {
    document.getElementById("feedback-nombre").classList.add("d-block");
    validity = false;
  }

  if (pApellido.value) {
    datosUsuario.pApellido = pApellido.value;
    validity = true;
  } else {
    document.getElementById("feedback-apellido").classList.add("d-block");
    validity = false;
  }

  if (telefono.value) {
    datosUsuario.telefono = telefono.value;
    validity = true;
  } else {
    validity = false;
    document.getElementById("feedback-telefono").classList.add("d-block");
  }

  if (sNombre.value) {
    datosUsuario.sNombre = sNombre.value;
  }

  if (sApellido.value) {
    datosUsuario.sApellido = sApellido.value;
  }

  return validity;
}

// Alerta existosa
function showSuccessAlert() {
  const alertaExitosa = document.getElementById("success-alert");

  alertaExitosa.classList.remove("d-none");

  setTimeout(() => {
    alertaExitosa.classList.add("d-none");
  }, 3000);
}

// Alerta de falla
function showFailAlert() {
  const failAlert = document.getElementById("danger-alert");

  failAlert.classList.remove("d-none");

  setTimeout(() => {
    failAlert.classList.add("d-none");
  }, 3000);
}

//Validar al enviar
const enviar = document.getElementById("submitBtn");
enviar.addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();

  if (!myValidations()) {
    showFailAlert();
    return false;
  } else {
    showSuccessAlert();
  }

  document.body.classList.add("was-validated");

  // Guardar datos en el localStorage
  localStorage.setItem("datosUsuario", JSON.stringify(datosUsuario));
});

// Mostrar datos si ya fueron ingresados
let datosUsuario = JSON.parse(localStorage.getItem("datosUsuario")) || {};

if (datosUsuario.pNombre) {
  pNombre.value = datosUsuario.pNombre;
}

if (datosUsuario.pApellido) {
  pApellido.value = datosUsuario.pApellido;
}

if (datosUsuario.telefono) {
  telefono.value = datosUsuario.telefono;
}

if (datosUsuario.sNombre) {
  sNombre.value = datosUsuario.sNombre;
}

if (datosUsuario.sApellido) {
  sApellido.value = datosUsuario.sApellido;
}

//Cambiar foto de perfil
// documentación usada para base64: 
// https://www.webmound.com/save-images-localstorage-javascript/
// https://www.webmound.com/convert-images-data-urls-javascript/

document.addEventListener('DOMContentLoaded', () => {
  // Obtener el input y la imagen del perfil del documento
  const input = document.getElementById('img');
  const fotoDePerfil = document.getElementById('foto-de-perfil');

  // Event listener que detecta cambios en el input (cuando elegis un archivo)
  input.addEventListener('change', (event) => {
      // Obtener la imagen seleccionada
      const imagen = event.target.files[0];

      // Crear un objeto lector de archivos a través del filereader de que incorpora javascript
      const lector = new FileReader();

      // Convertir la imagen a data url (base64)
      lector.readAsDataURL(imagen);

      // Una vez convertido a base64 se ejecuta el evento 'load' para cargar los datos del base64 y disparar lo que hay dentro de la función
      lector.addEventListener('load', () => {
        try {
          // Guardar la data url en el local
          localStorage.setItem('imagenPerfil', lector.result);

          // Carga la imagen en la pagina
          const imagenGuardada = localStorage.getItem('imagenPerfil');
          if (imagenGuardada) {
              // Si hay una imagen en el local, establece la data url como el valor del atributo src
              fotoDePerfil.setAttribute('src', imagenGuardada);
          }
        }
        // Mostrar error si el tamnaño de imagen es muy grande 
        catch (error) {
          input.value = null;
          document.getElementById("feedback-img").classList.add("d-block");
          //alert('Storage quota exceeded. Please free up some space.');
        }
      });
  });

  // Carga la imagen del local al iniciar la pagina
  const imagenGuardada = localStorage.getItem('imagenPerfil');
  if (imagenGuardada) {
      // Si hay una imagen en el local establece la data url como el valor del atributo src
      fotoDePerfil.setAttribute('src', imagenGuardada);
  }
});

// Borrar storage al cerrar sesión
document.getElementById("cerrarsesion").addEventListener("click", function () {
  localStorage.removeItem("datosUsuario");
  localStorage.removeItem("imagenPerfil");
});