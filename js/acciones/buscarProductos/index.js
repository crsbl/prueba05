import peticion from "../../peticiones/index.js";
import paginas from "../../paginas/index.js";

export default async (textoBuscar, textofiltror, ordenPort, paginaActual) => {
  const contenedorProductos = document.getElementById("contenedorProductos");
 
  let filtro = "Todo";
  let ordenarPor = 0;
  let textofiltro = document.getElementById("inputFiltro");
  let ordenPor = document.getElementById("inputOrdenarPor");

  if (ordenPor.value === "Nombre") {
    ordenarPor = 0;
  } else {
    ordenarPor = ordenPor.name.slice(19);
  }

  if (textofiltro.value === "Todo") {
    filtro = textofiltro.value;
  } else {
    filtro = textofiltro.name.slice(15);
  }

  console.log(paginaActual);
  const datos = await peticion(
    "https://tesbsaleback2-production.up.railway.app/buscarProducto",
    "POST",
    textoBuscar,
    filtro,
    parseInt(ordenarPor),
    paginaActual
  );
  console.log(datos);
  contenedorProductos.innerHTML = "";
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

  paginas(datos[1]);
};
