// Obtener info usuario almacenada y concatenarla a la api para obtener carrito
let user = localStorage.getItem("user") || sessionStorage.getItem("user");
let carrito = "http://localhost:3000/user_cart/" + user;

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

    // Valor de cantidad ingresada por el usuario (nuevo valor)
    const nuevaCantidad = parseInt(cantidadInput.value);

    // Valor de cantidad anterior (puedes almacenar el valor anterior en un atributo data o en una variable)
    const cantidadAnterior = parseInt(cantidadInput.getAttribute("data-cantidad-anterior")) || 0;

    // Diferencia entre la nueva cantidad y la cantidad anterior
    const cambioEnCantidad = nuevaCantidad - cantidadAnterior;

    // Cálculo del subtotal
    const subtotal = precio * nuevaCantidad;

    // Mostrar el subtotal del producto
    subtotalElement.textContent = `${subtotal} ${productos[productIndex].currency}`;

    // Actualizar el subtotal general considerando el cambio en cantidad
    subtotalGeneral += cambioEnCantidad * precio;

    // Mostrar el subtotal general
    const subtotalGeneralElement = document.getElementById('subtotalGeneral');
    subtotalGeneralElement.textContent = `${subtotalGeneral.toFixed(2)} ${productos[productIndex].currency}`;

    // Actualizar el valor anterior de la cantidad
    cantidadInput.setAttribute("data-cantidad-anterior", nuevaCantidad);
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
  totalPagarElement.innerHTML = `<strong>${totalPagar.toFixed(2)} USD</strong>`; // Mostrar el total a pagar
}

// Evento que se activa al hacer clic en una opción del desplegable
document.querySelectorAll('#envio input[type="radio"]').forEach(item => {
  item.addEventListener('click', (event) => {
    const selectedOptionId = event.target.id;
    // Calcular el porcentaje basado en el tipo de envío seleccionado
    var porcentaje = 0;
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

//HTML para insertar en el carrito
function generarHTML(nombre, precio, foto, moneda, productIndex) {
  return `
    <tr class="producto text-center" id="filaProducto${productIndex}">
      <td>
       <figure class="figure m-0">
        <img src="${foto}" class="figure-img img-fluid rounded m-0" alt="${nombre}">
        <figcaption class="figure-caption">${nombre}</figcaption>
       </figure>
      </td>
      <td>${precio} ${moneda}</td>
      <td><input type="number" value="1" min="1" id="cantidadInput${productIndex}" cant-index="${productIndex}" class="form-control"></td>
      <td><span id="subtotal${productIndex}">${precio} ${moneda}</span></td>
      <td><button class="btn btn-danger eliminar-producto btn-sm" id="eliminarProducto${productIndex}" data-product-index="${productIndex}"><i class="fas fa-trash"></i></button></td>
    </tr>
  `;
}

// Función para mostrar productos desde el carrito local
function carritoLocal() {
  // Obtén los productos del almacenamiento local
  let products = JSON.parse(localStorage.getItem("carrito"));

  if (products) {
    // Utiliza un conjunto para almacenar productos únicos
    const uniqueProducts = new Set();

    // Filtra productos duplicados
    products = products.filter((product) => {
      // Usa alguna propiedad única del producto, como el ID, para determinar la unicidad
      const productKey = `${product.id}-${product.color}`; // Reemplaza con la propiedad única que tengas

      // Verifica si el producto ya está en el conjunto
      if (!uniqueProducts.has(productKey)) {
        // Si no está en el conjunto, agrégalo al conjunto y devuelve true para incluirlo en la nueva lista de productos
        uniqueProducts.add(productKey);
        return true;
      }

      // Si ya está en el conjunto, devuelve false para excluirlo de la nueva lista de productos
      return false;
    });

    // Guarda la nueva lista de productos en el almacenamiento local
    localStorage.setItem("carrito", JSON.stringify(products));

    // Actualiza la presentación de los productos en la página, si es necesario
    products.forEach((product) => {
      const productIndex = productos.length;
      document.querySelector("#productos").innerHTML += generarHTML(product.name, product.cost, product.images[0], product.currency, productIndex);
      productos.push(product);

      // Llama a la función para calcular y mostrar el subtotal
      updateSubtotal(productIndex);
    });
  }
}

// Cargar producto desde la API
fetch(carrito)
  .then((response) => response.json())
  .then((data) => {
    // Iterar en los productos existentes
    for (let i = 0; i < productos.length; i++) {
      // Revisar si existe
      if (productos[i].id === data.articles[0].id) {
        // No agregarlo
        return;
      }
    } 
    // Añadir al HTML
    const product = data.articles[0];
    const productIndex = productos.length;
    document.querySelector("#productos").innerHTML += generarHTML(
      product.name,
      product.unitCost,
      product.image,
      product.currency,
      productIndex
    );
    productos.push(product);
    updateSubtotal(productIndex);

    // Tomamos carrito del local storage y lo concatenamos con los datos de la API
    var carritoLocal = localStorage.getItem("carrito");
    var carritoAPI = data;
    var carrito = JSON.parse(carritoLocal);
    carrito = carrito.concat(carritoAPI.articles);
    // Guardamos en una clave del storage
    localStorage.setItem("carritosConcat", JSON.stringify(carrito));
  })
  // llama la funcion para mostrar el carrito local
  .then(carritoLocal())
  .catch((error) => {
    console.error("Error al cargar el producto: " + error);
  });

// eventlistener para los cambios en los input de cantidad
document.addEventListener("input", function (event) {
  if (event.target.hasAttribute("cant-index")) {
    // chequea si el elemento tiene el atributo "cant-index" para identificar el producto
    const productIndex = parseInt(event.target.getAttribute("cant-index")); // Obtener el indice del input
    // Actualizar el subtotal cuando hay cambio en la cantidad del input
    updateSubtotal(productIndex);
  }
});

//Funcionalidad para validar
const inputTarjeta = document.getElementById("inputcc");
const inputTransferencia = document.getElementById("inputtransf");
const radioTarjeta = document.getElementById("radiocc");
const radioTransferencia = document.getElementById("radiotransf");
const numeroTarjeta = document.getElementById("ccnum");
const expiracionTarjeta = document.getElementById("ccexp");
const cvcTarjeta = document.getElementById("cvc");
const numeroCuenta = document.getElementById("cuenta");
const calleDir = document.getElementById("calle");
const esquinaDir = document.getElementById("esq");
const numeroDir = document.getElementById("nbr");
const envioPremium = document.getElementById("premium");
const envioExpress = document.getElementById("express");
const envioStandard = document.getElementById("standard");

// Validar tarjeta
radioTarjeta.addEventListener("click", () => {
  // Clear the bank account field
  numeroCuenta.value = "";

  // Enable the credit card input and disable the bank transfer input
  inputTarjeta.removeAttribute("disabled");
  inputTransferencia.setAttribute("disabled", "");
});

radioTransferencia.addEventListener("click", () => {
  // Limpiar campos tarjeta
  numeroTarjeta.value = "";
  expiracionTarjeta.value = "";
  cvcTarjeta.value = "";

  inputTransferencia.removeAttribute("disabled");
  inputTarjeta.setAttribute("disabled", "");
});

// Alerta existosa
function showSuccessAlert() {
  const successAlert = document.getElementById("success-alert");

  fetch("http://localhost:3000/cart")
    .then((response) => response.json())
    .then((data) => {
      // Manejar la respuesta de la API
      successAlert.innerHTML = data.msg;
    })
    .catch((error) => console.error("Error:", error));

  successAlert.classList.remove("d-none");

  setTimeout(() => {
    successAlert.classList.add("d-none");
  }, 3000);
}

// Validaciones del formulario
function myValidations() {
  let validity = false;
  //Forma de pago
  function validarFormaDePago() {
    const hayInfoTarjeta =
      numeroTarjeta.value && expiracionTarjeta.value && cvcTarjeta.value;
    const hayInfoTransferencia = numeroCuenta.value;
    if (!hayInfoTarjeta && !hayInfoTransferencia) {
      document.getElementById("feedback-fop").classList.add("d-block");
      return false;
    }
    return true;
  }
  //Direccion
  function validarDireccion() {
    if (!calleDir.value || !esquinaDir.value || !numeroDir.value) {
      return false;
    }
    return true;
  }
  //Tipo de envio
  function validarEnvio() {
    if (
      !envioPremium.checked &&
      !envioExpress.checked &&
      !envioStandard.checked
    ) {
      console.log("Falta tipo de envio");
      return false;
    }
    return true;
  }
  function validarFormulario() {
    return validarFormaDePago() && validarDireccion() && validarEnvio();
  }
  if (validarFormulario()) {
    // Todas las validaciones OK
    validity = true;
    // Mostrar alerta exitosa
    showSuccessAlert();
    comprar();
    guardarEnServer();
    return validity;
  }
}

/////////////////////////////////////////////////////
const token = localStorage.getItem("token") || sessionStorage.getItem("token");

function comprar() {
  // Obtener el token almacenado en localStorage o sessionStorage

  console.log("Token:", token);

  // Verificar si el token existe
  if (token) {
    // Configurar los encabezados de la solicitud con el token de autorización
    const headers = new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    });

    // Configurar la solicitud para el endpoint de finalizar compra (/cart)
    const requestOptions = {
      method: "POST", // Puedes ajustar el método según tus necesidades
      headers: headers,
      // Puedes agregar un cuerpo a la solicitud si es necesario
      // body: JSON.stringify({ /* Datos adicionales si los hay */ }),
    };

    // Realizar la solicitud al endpoint
    fetch("http://localhost:3000/cart", requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Manejar la respuesta exitosa del servidor
        console.log("Respuesta del servidor:", data);
        // Puedes realizar acciones adicionales según la respuesta del servidor
      })
      .catch((error) => {
        // Manejar errores en la solicitud
        console.error("Error en la solicitud:", error.message);
      });
  } else {
    // Si el token no está presente, el usuario no está autenticado
    console.error(
      "Usuario no autenticado. No se puede realizar la solicitud al endpoint /cart."
    );
  }
}

function guardarEnServer() {
  const url = "http://localhost:3000/cart";
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  fetch(url, {
    method: "POST",
    headers: headers,
    body: localStorage.getItem("carritosConcat"),
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error("Error:", error));
}

//////////////////////////////////////////////

// Validar al comprar
let finalizar = document.getElementById("finalizar");

finalizar.addEventListener("click", () => {
  if (!myValidations()) {
    event.preventDefault();
    event.stopPropagation();
  }
  document.body.classList.add("was-validated");
  //["change", "input"].forEach((ev) => { document.body.addEventListener(ev, myValidations) });
  myValidations();
});

// Validar datos de pago al guardar
let guardarFop = document.getElementById("guardar-fop");
guardarFop.addEventListener("click", function () {
  document.getElementById("feedback-fop").classList.remove("d-block");
});

// Botón eliminar
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("eliminar-producto")) {
    const productIndex = event.target.getAttribute("data-product-index");
    if (productIndex !== null) {
      // Eliminar el producto del carrito local
      removerDeLocal(productIndex);

      // Eliminar el producto de la lista en la página
      removerDeCarrito(productIndex);
    }
  }
});

// Función para eliminar un producto del carrito local
function removerDeLocal(productIndex) {
  let products = JSON.parse(localStorage.getItem("carrito"));
  if (products) {
    products.splice(productIndex, 1); // Eliminar el producto del array local
    localStorage.setItem("carrito", JSON.stringify(products)); // Actualizar el carrito local
  }
}

// Función para eliminar un producto de la lista en la página
function removerDeCarrito(productIndex) {
  const filaProducto = document.getElementById(`filaProducto${productIndex}`);
  if (filaProducto) {
    filaProducto.remove(); // Eliminar el elemento HTML del producto de la lista en la página

    // Eliminar el producto del array 'productos'
    const product = productos[productIndex];
    productos.splice(productIndex, 1);

    // Actualizar el subtotal general
    subtotalGeneral -= product.cost || product.unitCost;

    // Mostrar el subtotal general actualizado
    const subtotalGeneralElement = document.getElementById("subtotalGeneral");
    subtotalGeneralElement.textContent = `${subtotalGeneral.toFixed(2)} USD`;
  }
}
