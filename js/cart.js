// Obtener info usuario almacenada y concatenarla a la api para obtener carrito
let user = localStorage.getItem("user") || sessionStorage.getItem("user");
let carrito = "https://japceibal.github.io/emercado-api/user_cart/" + user + ".json";

// Array para almacenar info de los productos
let productos = [];


let subtotalGeneral = 0;  // Variable para almacenar el subtotal general

function updateSubtotal(productIndex) {
  // Obtener elementos para cantidad y subtotal del producto
  const cantidadInput = document.getElementById(`cantidadInput${productIndex}`);
  const subtotalElement = document.getElementById(`subtotal${productIndex}`);

  if (productos[productIndex]) {
    // Precio oscila entre .cost y .unitCost porque la API y el local tienen unidades distintas
    const precio = productos[productIndex].cost || productos[productIndex].unitCost;

    // Valor de cantidad ingresada por el usuario
    const cantidad = parseInt(cantidadInput.value);

    // Cálculo del subtotal
    const subtotal = precio * cantidad;

    // Mostrar el subtotal del producto
    subtotalElement.textContent = `${subtotal} ${productos[productIndex].currency}`;

    // Actualizar el subtotal general sumando el subtotal del producto
    subtotalGeneral += subtotal;

    // Mostrar el subtotal general
    const subtotalGeneralElement = document.getElementById('subtotalGeneral');
    subtotalGeneralElement.textContent = `${subtotalGeneral} ${productos[productIndex].currency}`;

  }
}

function calcularCostoEnvio(porcentaje) {
  const subtotalGeneralElement = document.getElementById('subtotalGeneral');
  const subtotal = parseFloat(subtotalGeneralElement.textContent.replace(/[^\d.]/g, '')); // Obtener el subtotal

  const costoEnvio = (porcentaje / 100) * subtotal; // Calcular el costo de envío

  const costoEnvioElement = document.getElementById('costoEnvio');
  costoEnvioElement.textContent = `${costoEnvio.toFixed(2)} USD`; // Mostrar el costo de envío

  const totalPagar = subtotal + costoEnvio; // Calcular el total a pagar

  const totalPagarElement = document.getElementById('totalPagar');
  totalPagarElement.innerHTML = `<strong>$${totalPagar.toFixed(2)} USD</strong>`; // Mostrar el total a pagar
}

// Evento que se activa al hacer clic en una opción del desplegable
document.querySelectorAll('.dropdown-item').forEach(item => {
  item.addEventListener('click', (event) => {
    const selectedOptionId = event.target.id;
    const dropdown = document.getElementById('dropdownMenuLink');
    dropdown.setAttribute('data-selected-option-id', selectedOptionId);

    // Calcular el porcentaje basado en el tipo de envío seleccionado
    let porcentaje = 0;
    switch (selectedOptionId) {
      case 'premium':
        porcentaje = 15;
        break;
      case 'express':
        porcentaje = 7;
        break;
      case 'standard':
        porcentaje = 5;
        break;
      default:
        porcentaje = 0;
    }

    // Llamar a la función para calcular el costo de envío y actualizar el total a pagar
    calcularCostoEnvio(porcentaje);
  });
});


// Cargar producto desde la API
fetch(carrito)
  .then((response) => response.json())
  .then((data) => {

    const product = data.articles[0];

    const name = product.name;
    const precio = product.unitCost;
    const foto = product.image;

    // se le asigna un indice al producto para identificarlo en la función de cálculo
    const productIndex = productos.length; //length es para tomarlo según la longitud del array, en la posi en la que se encuentre el producto, se le asigna un indice al ser agregado al carrito

    // Crear contenido HTML para mostrar el producto en la página
    const htmlContentToAppend = ` 
    <tr>
      <td><img src=${foto} class="img-thumbnail">${name}</td>
      <td class="centrar">${precio} ${product.currency}</td>
      <td class="centrar"><input type="number" value="1" min="1" id="cantidadInput${productIndex}" cant-index="${productIndex}" class="form-control"></td>
      <td class="centrar"><span id="subtotal${productIndex}">${precio} ${product.currency}</span></td>
    </tr>
 `;

    // agrega html
    document.querySelector("#productos").innerHTML += htmlContentToAppend;

    // pushea el producto al array
    productos.push(product);

    // calcula subtotal y lo muestra tomando como parametro el indice previamente definido
    updateSubtotal(productIndex);
  })
  .catch((error) => {
    console.error("Error al cargar el producto: " + error);
  });

// Función para mostrar productos desde el carrito local
function carritoLocal() {
  // agarra los productos del local
  let products = JSON.parse(localStorage.getItem("carrito"));

  if (products) {
    //para cada producto del local:
    products.forEach((product) => {
      const name = product.name;
      const precio = product.cost;
      const foto = product.images[0];

      //asigna indice al producto segun posi en el array
      const productIndex = productos.length;

      const htmlContentToAppend = `
    <tr>
    <td><img src=${foto} class="img-thumbnail">${name}</td>
    <td class="centrar">${precio} ${product.currency}</td>
    <td class="centrar"><input type="number" value="1" min="1" id="cantidadInput${productIndex}" cant-index="${productIndex}" class="form-control"></td>
    <td class="centrar"><span id="subtotal${productIndex}">${precio} ${product.currency}</span></td>
  </tr>
`;

      document.querySelector("#productos").innerHTML += htmlContentToAppend;
      //pushea el producto al array
      productos.push(product);

      // llama a la funcion para calcular y mostrar el subtotalf
      updateSubtotal(productIndex);
    });
  }
}

// llama la funcion para mostrar el carrito local
carritoLocal();

// eventlistener para los cambios en los input de cantidad
document.addEventListener("input", function (event) {
  if (event.target.hasAttribute("cant-index")) {   // chequea si el elemento tiene el atributo "cant-index" para identificar el producto
    const productIndex = parseInt(event.target.getAttribute("cant-index")); // Obtener el indice del input
    // Actualizar el subtotal cuando hay cambio en la cantidad del input
    updateSubtotal(productIndex);
  }
});

//Funcionalidad para desactivar forma de pago
let fop1 = document.getElementById("inputcc");
let fop2 = document.getElementById("inputtransf");
let radio1 = document.getElementById("radiocc");
let radio2 = document.getElementById("radiotransf");

radio1.addEventListener("click", () => {
  fop1.removeAttribute('disabled', '');
  fop2.setAttribute('disabled', '');
});


radio2.addEventListener("click", () => {
  fop2.removeAttribute('disabled', '');
  fop1.setAttribute('disabled', '');
}); 

let finalizar = document.getElementById("finalizar");

function myValidations() {
  let validity = false;
}

finalizar.addEventListener("click", () => {
     if (!myValidations()) {
      event.preventDefault();
      event.stopPropagation();
    }

 
    document.body.classList.add("was-validated");
//    ["change", "input"].forEach((ev) => { document.body.addEventListener(ev, myValidations) });
  });
  