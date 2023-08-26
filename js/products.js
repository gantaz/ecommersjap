const PRODUCTS_DATA = "https://japceibal.github.io/emercado-api/cats_products/"+ localStorage.getItem("catID") + ".json";

const categoria = document.getElementById("categoria");
function showData(dataArray) {
  for (const item of dataArray) {
    categoria.innerHTML += `<div onclick="setCatID(${item.id})" class="list-group-item list-group-item-action cursor-active">
        <div class="row">
            <div class="col-3">
                <img src="${item.image}" alt="${item.description}" class="img-thumbnail">
            </div>
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <h4 class="mb-1">${item.name} </h4> 
                    
                    <small class="text-muted">${item.soldCount} artículos vendidos</small>
                </div>
                <p class="mb-1">${item.description}</p>
                <h4 class="mb-1">${item.currency} ${item.cost}</h4> 
            </div>
        </div>
    </div>
    `
  }
}
fetch(PRODUCTS_DATA)
  .then((response) => response.json())
  .then((data) => {
    showData(data.products);
  });