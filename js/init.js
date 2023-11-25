const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

//muevo esto del index al init para que esté linkeado a todos los html sin conflictear. -Diego R

let guardado = localStorage.getItem("user");
let noguardado = sessionStorage.getItem("user");
if (!(guardado || noguardado)){
    window.location.href = "login.html";
}

const usuario = document.getElementById("usuario");

if (localStorage.getItem("user") === null) {
    usuario.innerHTML += sessionStorage.getItem("user");
} else {
    usuario.innerHTML += localStorage.getItem("user");
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("cerrarsesion").addEventListener("click", function () {
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = "login.html"
})});


// Event listener al botón del darkmode
document.addEventListener("DOMContentLoaded", function () {
  // Verificar el valor en el localStorage al cargar la página
  const darkModeCheck = document.getElementById("btnDarkMode");
  const ModoOscuro = localStorage.getItem("darkMode");

  if (ModoOscuro === "true") {
    darkModeCheck.checked = true;
  } else {
    darkModeCheck.checked = false;
  }

  aplicarDarkMode(); // Aplicar el modo oscuro según el estado actual del checkbox
});

document.getElementById("btnDarkMode").addEventListener("click", function () {
  const darkModeCheck = document.getElementById("btnDarkMode");

  // Si esta "checkeado" el botón se le asigna true en el local, de lo contrario, false
  if (darkModeCheck.checked) {
    localStorage.setItem("darkMode", "true");
  } else {
    localStorage.setItem("darkMode", "false");
  }

  aplicarDarkMode();
});

// Funcion para aplicar el darkmode segun el localstorage
function aplicarDarkMode() {
  let ModoOscuro = localStorage.getItem("darkMode");

  // Obtener elementos
  const html = document.getElementById("html");
  const oscureable = document.querySelectorAll('[class*="oscureable"]');

  if (ModoOscuro === "true") {
    // Si el modo oscuro está activado se agrega el atributo data-bs-theme="dark" (bootstrap) al html
    html.setAttribute("data-bs-theme", "dark");

    // Reemplazar clase "light" por "dark" en los elementos "oscureables"
    oscureable.forEach(function (oscureable) {
      oscureable.classList.remove("bg-light");
      oscureable.classList.remove("btn-light");
      oscureable.classList.add("btn-dark");
      oscureable.classList.add("bg-dark");
    });
  } else {
    // Si el modo oscuro está desactivado, se elimina el atributo data-bs-theme al html
    html.removeAttribute("data-bs-theme");

    // Reemplazar clase "dark" por "light" en los elementos "oscureables"
    oscureable.forEach(function (oscureable) {
      oscureable.classList.remove("bg-dark");
      oscureable.classList.remove("btn-dark");
      oscureable.classList.add("btn-light");
      oscureable.classList.add("bg-light");
    });
  }
}