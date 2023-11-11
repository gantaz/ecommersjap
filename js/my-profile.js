//Colocar usuario en campo email
let localUser = localStorage.getItem("user");
let sessionUser = sessionStorage.getItem("user");
document.getElementById("email").placeholder = (localUser || sessionUser);

//Validar campos requeridos
let pNombre = document.getElementById("primer-nombre");
let pApellido = document.getElementById("primer-apellido");
let telefono = document.getElementById("telefono");
let sNombre =  document.getElementById("segundo-nombre"); 
let sApellido =  document.getElementById("segundo-apellido"); 

//Keys donde se guardan los datos
let pNombreLocal = localStorage.getItem("pNombre");
let pApellidoLocal = localStorage.getItem("pApellido");
let telefonoLocal = localStorage.getItem("telefono");
let sNombreLocal = localStorage.getItem("sNombre");
let sApellidoLocal = localStorage.getItem("sApellido");

function myValidations() {
    let validity = false;
    if (!(pNombre.value)) {
        document.getElementById("feedback-nombre").classList.add("d-block");
    } else {
        localStorage.setItem("pNombre",pNombre.value);
    };
    if (!(pApellido.value)) {
        document.getElementById("feedback-apellido").classList.add("d-block");
    } else {
        localStorage.setItem("pApellido",pApellido.value);
    };
    if (!(telefono.value)) {
        document.getElementById("feedback-telefono").classList.add("d-block");
    } else {
        localStorage.setItem("telefono",telefono.value);
    }
    if (sNombre) {
        localStorage.setItem("sNombre",sNombre.value);
    }
    if (sApellido) {
        localStorage.setItem("sApellido",sApellido.value);
    }
    showSuccessAlert();
    return validity;
}

// Alerta existosa
function showSuccessAlert() {
    const successAlert = document.getElementById("success-alert");
  
    successAlert.classList.remove("d-none");
  
    setTimeout(() => {
      successAlert.classList.add("d-none");
    }, 3000);
  }

const enviar = document.getElementById("submitBtn");
enviar.addEventListener("click", () => {
    if (!myValidations()) {
     event.preventDefault();
     event.stopPropagation();
   } 
   document.body.classList.add("was-validated");
   myValidations();
 });

//Mostrar datos si ya fueron ingresados
if (pNombreLocal){
    pNombre.value = pNombreLocal;
}
if (pApellidoLocal){
    pApellido.value = pApellidoLocal;
}
if (telefonoLocal){
    telefono.value = telefonoLocal;
}
if (sNombreLocal){
    sNombre.value = sNombreLocal;
}
if (sApellidoLocal){
    sApellido.value = sApellidoLocal;
}

//Borrar storage al cerrar sesion
document.getElementById("cerrarsesion").addEventListener("click",function(){
    localStorage.removeItem("pNombre");
    localStorage.removeItem("pApellido");
    localStorage.removeItem("telefono");
    localStorage.removeItem("sNombre");
    localStorage.removeItem("sApellido");
})

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
=======
//Colocar usuario en campo email
let localUser = localStorage.getItem("user");
let sessionUser = sessionStorage.getItem("user");
document.getElementById("email").placeholder = (localUser || sessionUser);

//Validar campos requeridos
let pNombre = document.getElementById("primer-nombre");
let pApellido = document.getElementById("primer-apellido");
let telefono = document.getElementById("telefono");
let sNombre =  document.getElementById("segundo-nombre"); 
let sApellido =  document.getElementById("segundo-apellido"); 

//Keys donde se guardan los datos
let pNombreLocal = localStorage.getItem("pNombre");
let pApellidoLocal = localStorage.getItem("pApellido");
let telefonoLocal = localStorage.getItem("telefono");
let sNombreLocal = localStorage.getItem("sNombre");
let sApellidoLocal = localStorage.getItem("sApellido");

function myValidations() {
    let validity = false;
    if (!(pNombre.value)) {
        document.getElementById("feedback-nombre").classList.add("d-block");
    } else {
        localStorage.setItem("pNombre",pNombre.value);
    };
    if (!(pApellido.value)) {
        document.getElementById("feedback-apellido").classList.add("d-block");
    } else {
        localStorage.setItem("pApellido",pApellido.value);
    };
    if (!(telefono.value)) {
        document.getElementById("feedback-telefono").classList.add("d-block");
    } else {
        localStorage.setItem("telefono",telefono.value);
    }
    if (sNombre) {
        localStorage.setItem("sNombre",sNombre.value);
    }
    if (sApellido) {
        localStorage.setItem("sApellido",sApellido.value);
    }
    showSuccessAlert();
    return validity;
}

// Alerta existosa
function showSuccessAlert() {
    const successAlert = document.getElementById("success-alert");
  
    successAlert.classList.remove("d-none");
  
    setTimeout(() => {
      successAlert.classList.add("d-none");
    }, 3000);
  }

const enviar = document.getElementById("submitBtn");
enviar.addEventListener("click", () => {
    if (!myValidations()) {
     event.preventDefault();
     event.stopPropagation();
   } 
   document.body.classList.add("was-validated");
   myValidations();
 });

//Mostrar datos si ya fueron ingresados
if (pNombreLocal){
    pNombre.value = pNombreLocal;
}
if (pApellidoLocal){
    pApellido.value = pApellidoLocal;
}
if (telefonoLocal){
    telefono.value = telefonoLocal;
}
if (sNombreLocal){
    sNombre.value = sNombreLocal;
}
if (sApellidoLocal){
    sApellido.value = sApellidoLocal;
}

//Borrar storage al cerrar sesion
document.getElementById("cerrarsesion").addEventListener("click",function(){
    localStorage.removeItem("pNombre");
    localStorage.removeItem("pApellido");
    localStorage.removeItem("telefono");
    localStorage.removeItem("sNombre");
    localStorage.removeItem("sApellido");
})