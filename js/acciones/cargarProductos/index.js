import peticion from "../../peticiones/index.js";
import paginas from "../../paginas/index.js";

export default async (textoBuscar, textofiltro, ordenPor) => {
  const contenedorProductos = document.getElementById("contenedorProductos");

  contenedorProductos.innerHTML = "";

  let datos = await peticion("https://tesbsaleback2-production.up.railway.app/productosDatos", "GET");

  datos[0]
    .map((datos) => {
      contenedorProductos.innerHTML += `<div id='contenedorProducto' class='divContenedorProducto flexColumn'>
    <img class="img_datos00" src="${datos.url_image}"></img>
    <h3>${datos.name}</h3>
    <div class='divContenedorInfoProducto flexRow'>
      <h3>${datos.discount}</h3>
      <h3>${datos.price}</h3>
      </div>
    </div>`;
    })
    .join();
  paginas(datos[1], textoBuscar, textofiltro, ordenPor);
};
