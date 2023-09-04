const PRODUCTS_INFO =
  "https://japceibal.github.io/emercado-api/products/" +
  localStorage.getItem("productID") +
  ".json";
const productInfoContainer = document.getElementById("producto");

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

