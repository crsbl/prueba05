export default async (url, metodo, texto, filtro, ordenarPor, paginaActual) => {
  const contenedorProductos = document.getElementById("contenedorProductos");
  contenedorProductos.innerHTML = "";
  let res = null;
  switch (metodo) {
    case "POST":
      res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          textobuscar: texto,
          filtro: filtro,
          OrdenarPor: ordenarPor,
          pagina: paginaActual,
        }),
   
      });
      break;

    case "GET":
      res = await fetch(url);

      break;

    default:
      break;
  }
  const datos = JSON.parse(await res.text());

  return datos;
};
