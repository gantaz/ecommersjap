// Obtener info usuario almacenada y concatenarla a la api para obtener carrito
let user = localStorage.getItem("user") || sessionStorage.getItem("user");
let carrito = "https://japceibal.github.io/emercado-api/user_cart/" + user + ".json";

// Array para almacenar info de los productos
let productos = [];

// Función para actualizar el subtotal de un producto
function updateSubtotal(productIndex) {
  // Obtener elementos para cant y subtotal del producto
  const cantidadInput = document.getElementById(`cantidadInput${productIndex}`);
  const subtotalElement = document.getElementById(`subtotal${productIndex}`);

  if (productos[productIndex]) {
    // precio oscila entre .cost y .unitCost xq la api y el local tienen unidades distintas
    const precio = productos[productIndex].cost || productos[productIndex].unitCost;

    // value de cant ingresada por el user
    const cantidad = parseInt(cantidadInput.value);

    // calculo del subtotal
    const subtotal = precio * cantidad;

    // mostrar el subtotal
    subtotalElement.textContent = `${subtotal} ${productos[productIndex].currency}`;
  }
}

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
