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
    <div class="container" >
    <br>
    <h1>Mi carrito</h1>
    <br>
    <table class="table" id="carrito">
        <thead>
            <tr>
                <th>Producto</th>
                <th>Costo</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
            </tr>
        </thead>
        <tbody>
            <tr style="vertical-align: middle;">
            <td style="vertical-align: middle;"><img src=${foto} class= "img-fluid" style="width: 7em; height: 5em; vertical-align: middle; margin-right: 20px; ">${name}</td>
                <td>${precio} USD</td>
                <td><input type="number" value="1" min="1" id="cantidadInput">                </td>
                <td class="subtotal"><span id="subtotal">${precio} USD</span></td>
            </tr>
        </tbody>
    </table>
    
    <button id="agregarProducto" class="btn btn-primary">Comprar</button>
</div>`;

 
    document.querySelector("#productos").innerHTML = htmlContentToAppend;


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



