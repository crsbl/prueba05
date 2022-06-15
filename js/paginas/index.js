import buscarProducto from "../acciones/buscarProductos/index.js";
let paginaActual = 0;
  let filtroActual = "Todo";
  let ordenActual = "Nombre";
export default (cantidadDatos) => {
  

  let cantidadPaginas = null;
  const contenedorPaginas = document.getElementById("contenedorPaginas");
  contenedorPaginas.innerHTML = "";
  if (cantidadDatos % 8 == 0) {
    cantidadPaginas = Math.trunc(cantidadDatos / 8);
  } else {
    cantidadPaginas = Math.trunc(cantidadDatos / 8) + 1;
  }

  const cambiarPagina = (e) => {
    let textobuscar = document.getElementById("inputBuscarProducto");
    let textofiltro = document.getElementById("inputFiltro");
    let ordenPor = document.getElementById("inputOrdenarPor");
    paginaActual = e.target.id.slice(19);

    if (ordenPor.value === "Nombre") {
      ordenActual = 0;
    } else {
      ordenActual = ordenPor.name.slice(19);
    }

    if (textofiltro.value === "Todo") {
      filtroActual = textofiltro.value;
    } else {
      filtroActual = textofiltro.name.slice(15);
    }

    console.log(filtroActual, ordenActual, paginaActual);
    buscarProducto(
      textobuscar.value,
      filtroActual,
      parseInt(ordenActual),
      paginaActual
    );

  };

  for (let i = 0; i < cantidadPaginas; i++) {
    let buttonCambiarPagina = document.createElement("button");
    buttonCambiarPagina.setAttribute("id", `buttonCambiarPagina${i}`);
    buttonCambiarPagina.setAttribute(
      "class",
      `${paginaActual == i ? "buttonPaginaActual" : ""}`
    );
    buttonCambiarPagina.innerText = i + 1;
    buttonCambiarPagina.addEventListener("click", cambiarPagina);
    contenedorPaginas.appendChild(buttonCambiarPagina);
  }
  paginaActual= 0;
};
