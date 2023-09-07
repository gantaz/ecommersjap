const PRODUCTS_INFO =
    "https://japceibal.github.io/emercado-api/products/" + localStorage.getItem("productID") + ".json";
const productInfoContainer = document.getElementById("producto");

const COMMENTS_LIST = "https://japceibal.github.io/emercado-api/products_comments/" + localStorage.getItem("productID") + ".json";

const productCommentsContainer = document.getElementById("comentarios")

fetch(PRODUCTS_INFO)
    .then((response) => response.json())
    .then((product) => {
        if (product) {
            document.getElementById("product-name").textContent = product.name;
            document.getElementById("product-description").textContent = `Descripción: ${product.description}`;
            document.getElementById("product-category").textContent = `Categoría: ${product.category}`;
            document.getElementById("product-price").textContent = `Precio: ${product.cost} ${product.currency}`;

            const productImages = document.getElementById("product-image-list");
            product.images.forEach((imageSrc) => {
                const image = document.createElement("img");
                image.src = imageSrc;
                productImages.appendChild(image);
            });
            const relatedProductList = document.getElementById("related-product-list");
            product.relatedProducts.forEach((relatedProduct) => {
                const listItem = document.createElement("li");
                listItem.innerHTML = `<img src="${relatedProduct.image}" alt="${relatedProduct.name}">${relatedProduct.name}`;
                relatedProductList.appendChild(listItem);
            });
        } else {
            productInfoContainer.innerHTML = "Producto no encontrado";
        }
    })
    .catch((error) => {
        console.error("Error al cargar los datos del producto:", error);
    });

fetch(COMMENTS_LIST)  // fetch para cargar los comentarios de cada producto con su respectivo puntaje 
    .then((response) => response.json())
    .then((comment) => {
        if (comment.length > 0) {
            let htmlContentToAppend = "";
            for (let i = 0; i <= comment.length; i++) {
                let comentario = comment[i]


                htmlContentToAppend += `<div> <b>${comentario.user}:</b> ${comentario.description} <br> ${comentario.dateTime}</div>`
                productCommentsContainer.innerHTML = htmlContentToAppend;

                for (let j = 1; j <= 5; j++) {

                    if (j <= comentario.score) {
                        htmlContentToAppend += `<span class="fa fa-star checked"></span>`

                    } else { htmlContentToAppend += `<span class="fa fa-star "></span>` }

                }
                productCommentsContainer.innerHTML = htmlContentToAppend;
            }

        } else {
            productCommentsContainer.innerHTML = `<div> <p>No hay comentarios</p> </div>`
        }
    })
    .catch((error) => {
        console.error("Error al cargar los comentarios del producto:", error);
    });


const usuario = document.getElementById("usuario");

if (localStorage.getItem("user") === null) {
    usuario.innerHTML += sessionStorage.getItem("user");
} else {
    usuario.innerHTML += localStorage.getItem("user");
}


function sendComment() {

    const rate = document.getElementById("rate").value
    const desc = document.getElementById("commentText").value
    const prod = localStorage.getItem("productID")
    let fecha = new Date();

    url = "https://crudcrud.com/api/adc54d7744e946cd8ffc1851accabb6d/comentariospruebas" // recurso para probar formato de envio, deberiamos usar la api COMMENTS_LIST
    fetch(url, {
        headers: { "Content-Type": "application/json; charset=utf-8" },
        method: 'POST',
        body: JSON.stringify({

            product: prod,
            score: rate,
            description: desc,
            user: usuario.textContent,
            dateTime: fecha.toLocaleString(),
        })
    })

}

function commentAlert(){
    alert("Comentario enviado correctamente!")
}



document.getElementById("sendCommentBtn").addEventListener("click", sendComment)
document.getElementById("sendCommentBtn").addEventListener("click", commentAlert)










