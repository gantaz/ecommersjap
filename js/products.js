const PRODUCTS_DATA =
  "https://japceibal.github.io/emercado-api/cats_products/" +
  localStorage.getItem("catID") +
  ".json";
const categoria = document.getElementById("categoria");

//Se declaran nuevas variables para las funciones de orden y filtrado
const ORDER_BY_SOLD_COUNT = "Cant.";
const ORDER_ASC_BY_PRICE = "Asc.";
const ORDER_DESC_BY_PRICE = "Desc.";
let currentProducts = undefined;
let minCount = undefined;
let maxCount = undefined;

//Funcion para ordenar productos alfabeticamente y cantidad vendidos
function sortProducts(criteria, array) {
  let result = [];
  if (criteria === ORDER_BY_SOLD_COUNT) {
    result = array.sort(function (a, b) {
      let aCount = parseInt(a.soldCount);
      let bCount = parseInt(b.soldCount);

      if (aCount > bCount) {
        return -1;
      }
      if (aCount < bCount) {
        return 1;
      }
      return 0;
    });
  } else if (criteria === ORDER_ASC_BY_PRICE) {
    result = array.sort(function (a, b) {
      let aCount = parseInt(a.cost);
      let bCount = parseInt(b.cost);

      if (aCount > bCount) {
        return 1;
      }
      if (aCount < bCount) {
        return -1;
      }
      return 0;
    });
  } else if (criteria === ORDER_DESC_BY_PRICE) {
    result = array.sort(function (a, b) {
      let aCount = parseInt(a.cost);
      let bCount = parseInt(b.cost);

      if (aCount > bCount) {
        return -1;
      }
      if (aCount < bCount) {
        return 1;
      }
      return 0;
    });
  }

  return result;
}

//Función que se usa en el showData para que al hacer click en un producto se le llame y guarde su id en el local storage
function setProductID(id) {
  localStorage.setItem("productID", id);
  window.location = "products.html";
}

//Modificación del fetch para que la data obtenida se guarde en currentProducts xq me daba problema la anterior version del fetch que llamaba directamente a la data desde la función
fetch(PRODUCTS_DATA)
  .then((response) => response.json())
  .then((data) => {
    currentProducts = data;
    showData(currentProducts.products);
  });

//Modificaciones de la función: se declara variable vacía a la que se le va agregando el contenido html con el inner.html a medida que va iterando
//
function showData(dataArray) {
  let htmlContentToAppend = "";
  for (let i = 0; i < dataArray.length; i++) {
    let product = dataArray[i];
    let productPrice = parseInt(product.cost);
    if (
      (minCount == undefined ||
        (minCount != undefined && productPrice >= minCount)) &&
      (maxCount == undefined ||
        (maxCount != undefined && productPrice <= maxCount))
    ) {
      htmlContentToAppend += `<div onclick="setProductID(${product.id})" class="list-group-item list-group-item-action cursor-active">
            <div class="row">
                <div class="col-3">
                    <img src="${product.image}" alt="${product.description}" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">${product.name} - ${product.currency} ${product.cost}</h4>
                        <small class="text-muted">${product.soldCount} Vendidos</small>
                    </div>
                    <p class="mb-1">${product.description}</p>
                </div>
            </div>
        </div>`;
    }
  }
  document.getElementById("categoria").innerHTML = htmlContentToAppend;
}

//Función que muestra los items ordenados, se invoca al clickear los botones correspondientes con el parámetro ORDER_XX_BY_XX que definimos al principio y que le damos valor en la funcion sortProducts
function sortAndShowProducts(sortCriteria, dataArray) {
  let currentSortCriteria = sortCriteria;

  if (dataArray != undefined) {
    currentProducts.products = dataArray;
  }
  currentProducts.products = sortProducts(
    currentSortCriteria,
    currentProducts.products
  );
  // Mostrar la lista de productos ordenada
  showData(currentProducts.products);
}

//BOTON ORDENAR X RELEVANCIA (CANTIDAD DE VENDIDOS)
document.getElementById("sortByCount").addEventListener("click", function () {
  sortAndShowProducts(ORDER_BY_SOLD_COUNT);
});

//BOTON LIMPIAR
document
  .getElementById("clearRangeFilter")
  .addEventListener("click", function () {
    document.getElementById("rangeFilterCountMin").value = "";
    document.getElementById("rangeFilterCountMax").value = "";

    minCount = undefined;
    maxCount = undefined;

    showData(currentProducts.products);
  });

//BOTON FILTRAR
document
  .getElementById("rangeFilterCount")
  .addEventListener("click", function () {
    // Obtener el mínimo y máximo de los intervalos para filtrar por cantidad
    // de productos disponibles.
    minCount = document.getElementById("rangeFilterCountMin").value;
    maxCount = document.getElementById("rangeFilterCountMax").value;

    if (minCount != undefined && minCount != "" && parseInt(minCount) >= 0) {
      minCount = parseInt(minCount);
    } else {
      minCount = undefined;
    }

    if (maxCount != undefined && maxCount != "" && parseInt(maxCount) >= 0) {
      maxCount = parseInt(maxCount);
    } else {
      maxCount = undefined;
    }

    showData(currentProducts.products);
  });
  
//BOTONES ORDENAR X PRECIO
document
  .getElementById("sortByPriceAsc")
  .addEventListener("click", function () {
    sortAndShowProducts(ORDER_ASC_BY_PRICE);
  });
document
  .getElementById("sortByPriceDesc")
  .addEventListener("click", function () {
    sortAndShowProducts(ORDER_DESC_BY_PRICE);
  });

//FUNCIONALIDAD BUSCADOR
document.addEventListener("keyup", (e) => {
  if (e.target.matches("#buscador")) {
    const texto = e.target.value.toLowerCase();

    const busquedaProducto = currentProducts.products.filter((product) =>
      product.name.toLowerCase().includes(texto)
    );

    showData(busquedaProducto);
  }
});