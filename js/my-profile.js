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
    return validity;
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