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

fetch(COMMENTS_LIST)
    .then((response) => response.json())
    .then((comment) => {
        if (comment.length > 0) {
            let htmlContentToAppend = "";
            for (let i = 0; i <= comment.length; i++) {
                let comentario = comment[i]
                localStorage.setItem("score", comentario.score)

                htmlContentToAppend += `<div><div> <b>${comentario.user}:</b> ${comentario.description} <br> ${comentario.dateTime}</div></div>`
                productCommentsContainer.innerHTML = htmlContentToAppend

                for (let i = 1; i <= localStorage.getItem("score"); i++) {

                    htmlContentToAppend += `<span class="fa fa-star checked"></span>`
                }

            }

        } else {
            productCommentsContainer.innerHTML = `<div> <p>No hay comentarios</p> </div>`
        }
    })
    .catch((error) => {
        console.error("Error al cargar los comentarios del producto:", error);
    });


