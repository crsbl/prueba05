export default async (textoBuscar) => {
  const inputFiltro = document.getElementById("inputFiltro");
  console.log(textoBuscar);
  const contenedorProductos = document.getElementById("contenedorProductos");
  contenedorProductos.innerHTML = '';
  const res = await fetch("http://localhost:5000/buscarProducto", {
    method: "POST",
    body: JSON.stringify({ buscar: textoBuscar, filtro: inputFiltro.value }),
 
  });

  /* , orden_seleccionado, posicion*6 */
  const datos = JSON.parse(await res.text());
  datos[0]
    .map((datos) => {
      contenedorProductos.innerHTML += `<div id='contenedorProducto' class='divContenedorProducto flexColumn'>
    <img class="img_datos00" src="${datos.url_image}"></img>
    <h3>${datos.name}</h3>
    <h3>${datos.discount}</h3>
    <h3>${datos.price}</h3>
    </div>`;

      /*     let H4OpcionesFiltro = document.createElement("h4");
    H4OpcionesFiltro.setAttribute("id", `h4opcionFiltro${datosOpcion.id}`);
    H4OpcionesFiltro.innerText = datosOpcion.name;
    H4OpcionesFiltro.addEventListener("click", filtro);
    containerOpcionesFiltro.appendChild(H4OpcionesFiltro); */
    })
    .join();
  console.log(datos);
};
