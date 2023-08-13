document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("autos").addEventListener("click", function () {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function () {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function () {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});

let guardar = localStorage.getItem("user") && localStorage.getItem("password")
let noguardar = sessionStorage.getItem("noguardar");
if (!(guardar || noguardar)){
    window.location.href = "login.html";
}