// documentación usada para base64: 
// https://www.webmound.com/save-images-localstorage-javascript/
// https://www.webmound.com/convert-images-data-urls-javascript/

document.addEventListener('DOMContentLoaded', () => {
  // Obtener el input y la imagen del perfil del documento
  const input = document.getElementById('img');
  const fotoDePerfil = document.getElementById('foto-de-perfil');

  // Event listener que detecta cambios en el input (cuando elegis un archivo)
  input.addEventListener('change', (event) => {
      // Obtener la imagen seleccionada
      const imagen = event.target.files[0];

      // Crear un objeto lector de archivos a través del filereader de que incorpora javascript
      const lector = new FileReader();

      // Convertir la imagen a data url (base64)
      lector.readAsDataURL(imagen);

      // Una vez convertido a base64 se ejecuta el evento 'load' para cargar los datos del base64 y disparar lo que hay dentro de la función
      lector.addEventListener('load', () => {
          // Guardar la data url en el local
          localStorage.setItem('imagenPerfil', lector.result);

          // Carga la imagen en la pagina
          const imagenGuardada = localStorage.getItem('imagenPerfil');
          if (imagenGuardada) {
              // Si hay una imagen en el local, establece la data url como el valor del atributo src
              fotoDePerfil.setAttribute('src', imagenGuardada);
          }
      });
  });

  // Carga la imagen del local al iniciar la pagina
  const imagenGuardada = localStorage.getItem('imagenPerfil');
  if (imagenGuardada) {
      // Si hay una imagen en el local establece la data url como el valor del atributo src
      fotoDePerfil.setAttribute('src', imagenGuardada);
  }
});
