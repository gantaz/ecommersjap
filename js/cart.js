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
        <tbody>
            <tr style="vertical-align: middle;">
            <td style="vertical-align: middle;"><img src=${foto} class= "img-fluid" style="width: 7em; height: 5em; vertical-align: middle; margin-right: 20px; ">${name}</td>
                <td>${precio} USD</td>
                <td><input type="number" value="1" min="1" id="cantidadInput"></td>
                <td class="subtotal"><span id="subtotal">${precio} USD</span></td>
            </tr>
        </tbody>
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
          <tr style="vertical-align: middle;">
          <td style="vertical-align: middle;"><img src=${foto} class= "img-fluid" style="width: 7em; height: 5em; vertical-align: middle; margin-right: 20px; ">${name}</td>
              <td>${precio} USD</td>
              <td><input type="number" value="1" min="1" id="cantidadInput"></td>
              <td class="subtotal"><span id="subtotal">${precio} USD</span></td>
          </tr>
      </tbody>
 `;

    document.querySelector("#productos").innerHTML += htmlContentToAppend;
  });
}
carritoLocal();
