const PRODUCTS_INFO =
    "https://japceibal.github.io/emercado-api/products/" + localStorage.getItem("productID") + ".json";
const productInfoContainer = document.getElementById("producto");

const COMMENTS_LIST = "https://japceibal.github.io/emercado-api/products_comments/" + localStorage.getItem("productID") + ".json";

const productCommentsContainer = document.getElementById("comentarios")

fetch(PRODUCTS_INFO)
    .then((response) => response.json())
    .then((product) => {
        if (product) {
            document.getElementById("product-name").innerHTML += product.name;
            document.getElementById("product-description").innerHTML += `<b>Descripción:</b> ${product.description}`;
            document.getElementById("product-category").innerHTML += `<b>Categoría:</b> ${product.category}`;
            document.getElementById("product-price").innerHTML += `<b>Precio:</b> ${product.cost} ${product.currency}`;

            const productImages = document.getElementById("product-image-list");
            product.images.forEach((imageSrc) => {
                productImages.innerHTML +=
                  `<div class="col-sm-6 col-md-4 mb-3"><a href="` +
                  imageSrc +
                  `" target="_blank" class="d-block mb-4 h-100"><img class="img-fluid img-thumbnail" src="` +
                  imageSrc +
                  `"></a></div>`;
              });
            const relatedProductList = document.getElementById("related-product-list");
            product.relatedProducts.forEach((relatedProduct) => {
                relatedProductList.innerHTML +=
                  `<div class="card"><img class="card-img-top" src="` +
                  relatedProduct.image +
                  `"><div class="card-body"><h4 class="card-title">` +
                  relatedProduct.name +
                  `</h4></div></div>`;
              });        
        } else {
            productInfoContainer.innerHTML = "Producto no encontrado";
        }
    })
    .catch((error) => {
        console.error("Error al cargar los datos del producto:", error);
    });
    
    fetch(COMMENTS_LIST)
    .then((response) => response.json())
    .then((comments) => {
      if (comments.length > 0) {
        let htmlContentToAppend = "";
        for (let i = 0; i < comments.length; i++) {
          let comentario = comments[i];
          localStorage.setItem("score", comentario.score);
          htmlContentToAppend +=
            `<div class="card p-3 mt-2"><div class="d-flex justify-content-between align-items-center"><div class="user d-flex flex-row align-items-center"><i class="fa fa-user"></i><span><small class="font-weight-bold text-primary"><b> ` +
            comentario.user +
            `</b></small></span></div><small>` +
            comentario.dateTime +
            `</small></div><div class="action d-flex justify-content-between mt-2 align-items-center"><div class="reply"><small class="font-weight-bold">` +
            comentario.description +
            `</small></div><div class="icons align-items-center">`;
          for (let j = 1; j <= 5; j++) {
            if (j <= comentario.score) {
              htmlContentToAppend += `<span class="fa fa-star checked"></span>`;
            } else {
              htmlContentToAppend += `<span class="fa fa-star"></span>`;
            }
          }
          htmlContentToAppend += `</div></div></div>`; // Cerrar el div del comentario
        }
        productCommentsContainer.innerHTML += htmlContentToAppend;
      } else {
        productCommentsContainer.innerHTML += `<div> <p>No hay comentarios</p> </div>`;
      }
    })
    .catch((error) => {
      console.error("Error al cargar los comentarios del producto:", error);
    });
  
  

// desafiate
// variables e ids
var sendBoton = document.getElementById('sendComentario');
var comentarioTextArea = document.getElementById('ingresarComentario');
var puntuacionSelect = document.getElementById('estrellas');
var comentariosContainer = document.getElementById('comentarios');

document.getElementById("puntosOup").innerHTML = '<span class="fa fa-star checked"></span>'+'<span class="fa fa-star"></span>'.repeat(4);
puntuacionSelect.oninput = function() {
  document.getElementById("puntosOup").innerHTML = '<span class="fa fa-star checked"></span>'.repeat(puntuacionSelect.value);
  document.getElementById("puntosOup").innerHTML += '<span class="fa fa-star"></span>'.repeat(5 - puntuacionSelect.value);
}

// boton
sendBoton.addEventListener('click', function (event) {
    event.preventDefault(); // Evita que el formulario se envíe realmente
  
    // values comment y puntuación
    var comentario = comentarioTextArea.value;
    var puntuacion = puntuacionSelect.value;
    var usuario = localStorage.getItem("user") || sessionStorage.getItem("user"); // agarra el usuario del local storage o session
  
    // Fecha convertida a formato legible string
    var fecha = new Date().toLocaleString();
  
    // Comentario a ser agregado
    let htmlContentToAppend = "";
    htmlContentToAppend += '<div class="card p-3 mt-2"><div class="d-flex justify-content-between align-items-center"><div class="user d-flex flex-row align-items-center"><i class="fa fa-user"></i><span><small class="font-weight-bold text-primary"><b>' + usuario + '</b></small></span></div><small>' + fecha + '</small></div><div class="action d-flex justify-content-between mt-2 align-items-center"><div class="reply"><small class="font-weight-bold">' + comentario +
    '</small></div><div class="icons align-items-center">';
    for (let j = 1; j <= 5; j++) {
        if (j <= puntuacion) {
          htmlContentToAppend += '<span class="fa fa-star checked"></span>';
        } else {
          htmlContentToAppend += '<span class="fa fa-star"></span>';
        }
      }
      htmlContentToAppend += '</div></div></div>'; // Cerrar el div del comentario
      
    // crear div para el comment nuevo y su formato
    var nuevoComentario = document.createElement('div');
    nuevoComentario.innerHTML = htmlContentToAppend;
  
    // agregar comentario fake al container
    comentariosContainer.appendChild(nuevoComentario);
  
    // deja vacio el textarea para escribir otro comment
    comentarioTextArea.value = '';
});