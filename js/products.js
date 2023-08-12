const PRODUCTS_DATA = "https://japceibal.github.io/emercado-api/cats_products/101.json";

const autos = document.getElementById("autos");
function showData(dataArray) {
  for (const item of dataArray) {
    autos.innerHTML += `<div class="product">
    <img src="${item.image}" alt="${item.name}">
    <h2>${item.name} <p>${item.currency} ${item.cost}</p></h2>
    <p>${item.description}</p>
    <p>${item.soldCount} Vendidos</p>
  </div>`;
  }
}
fetch(PRODUCTS_DATA)
  .then((response) => response.json())
  .then((data) => {
    showData(data.products);
  });
