// Colocar usuario en campo email
let datosUsuario = JSON.parse(localStorage.getItem("datosUsuario")) || {};
document.getElementById("email").placeholder = localStorage.getItem("user") || sessionStorage.getItem("user");

// Validar campos requeridos
let pNombre = document.getElementById("primer-nombre");
let pApellido = document.getElementById("primer-apellido");
let telefono = document.getElementById("telefono");
let sNombre = document.getElementById("segundo-nombre");
let sApellido = document.getElementById("segundo-apellido");

// Obtener datos del localStorage
let datosUsuarioLocal = JSON.parse(localStorage.getItem("datosUsuario")) || {};

function misValidaciones() {
  let validity = false;

  document.getElementById("datos-obligatorios").classList.add("was-validated");

  if (pNombre.value) {
    datosUsuario.pNombre = pNombre.value;
    validity = true;
  } else {
    document.getElementById("feedback-nombre").classList.add("d-block");
  }

  if (pApellido.value) {
    datosUsuario.pApellido = pApellido.value;
    validity = true;
  } else {
    document.getElementById("feedback-apellido").classList.add("d-block");
  }

  if (telefono.value) {
    datosUsuario.telefono = telefono.value;
    validity = true;
  } else {
    document.getElementById("feedback-telefono").classList.add("d-block");
  }

  if (sNombre.value) {
    datosUsuario.sNombre = sNombre.value;
    validity = true;
  }

  if (sApellido.value) {
    datosUsuario.sApellido = sApellido.value;
    validity = true;
  }

  if (validity) {
    showSuccessAlert();
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

const enviar = document.getElementById("submitBtn");
enviar.addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();

  if (!misValidaciones()) {
    return;
  }

  document.body.classList.add("was-validated");

  // Guardar datos en el localStorage
  localStorage.setItem("datosUsuario", JSON.stringify(datosUsuario));
});

// Mostrar datos si ya fueron ingresados
if (datosUsuarioLocal.pNombre) {
  pNombre.value = datosUsuarioLocal.pNombre;
}

if (datosUsuarioLocal.pApellido) {
  pApellido.value = datosUsuarioLocal.pApellido;
}

if (datosUsuarioLocal.telefono) {
  telefono.value = datosUsuarioLocal.telefono;
}

if (datosUsuarioLocal.sNombre) {
  sNombre.value = datosUsuarioLocal.sNombre;
}

if (datosUsuarioLocal.sApellido) {
  sApellido.value = datosUsuarioLocal.sApellido;
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
          // Guardar la data url en el local
          localStorage.setItem('imagenPerfil', lector.result);

          // Carga la imagen en la pagina
          const imagenGuardada = localStorage.getItem('imagenPerfil');
          if (imagenGuardada) {
              // Si hay una imagen en el local, establece la data url como el valor del atributo src
              fotoDePerfil.setAttribute('src', imagenGuardada);
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