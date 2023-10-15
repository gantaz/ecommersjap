const input = document.getElementById("cantidadInput");
let user = localStorage.getItem("user")|| sessionStorage.getItem("user");
let carrito = "https://japceibal.github.io/emercado-api/user_cart/"+user+".json"; 

fetch(carrito)
  .then((response) => response.json())
  .then((data) => {

    const product = data.articles[0];

    const name = product.name;
    const precio = product.unitCost;
    const foto = product.image;

    const htmlContentToAppend = ` 
    <tr>
      <td><img src=${foto} class="img-thumbnail">${name}</td>
      <td class="centrar">${precio} USD</td>
      <td class="centrar"><input type="number" value="1" min="1" id="cantidadInput" class="form-control"></td>
      <td class="centrar"><span id="subtotal">${precio} USD</span></td>
    </tr>
 `;

    document.querySelector("#productos").innerHTML += htmlContentToAppend;

    const cantidadInput = document.getElementById("cantidadInput");
    cantidadInput.addEventListener("input", function () {
      const cantidad = parseInt(this.value);
      const subtotal = precio * cantidad;
      document.getElementById("subtotal").textContent = `${subtotal} USD`;
    });
  })
  .catch((error) => {
    console.error("Error al cargar el producto: " + error);
  });

//Función para mostrar los productos guardados en el local storage
function carritoLocal() {
  let products = JSON.parse(localStorage.getItem("carrito"));
  //Para cada producto 
  products.forEach((product) => {
    const name = product.name;
    const precio = product.cost;
    const foto = product.images[0];

    const htmlContentToAppend = `
      <tr>
          <td><img src=${foto} class="img-thumbnail">${name}</td>
          <td class="centrar">${precio} USD</td>
          <td class="centrar"><input type="number" value="1" min="1" id="cantidadInput" class="form-control"></td>
          <td class="centrar"><span id="subtotal">${precio} USD</span></td>
      </tr>
 `;

    document.querySelector("#productos").innerHTML += htmlContentToAppend;
  });
}
carritoLocal();
