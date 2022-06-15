import peticionFech from "../../peticiones/index.js";

export default (textoFiltro) => {
  
  let estadoFiltro = false;
  const filtro = (e) => {
    const containerDatosOpciones = document.getElementById(
      "containerOpcionesFiltro"
    );
    const inpFiltro = document.getElementById("inputFiltro");
    inpFiltro.value = "Todo";
    switch (estadoFiltro) {
      case false:
        containerDatosOpciones.style.display = "block";
        estadoFiltro = true;
        break;

      case true:
        console.log("aqqq", e.target.innerText);
        containerDatosOpciones.style.display = "none";
        estadoFiltro = false;
        inpFiltro.value = e.target.innerText;
        inpFiltro.setAttribute("name",`nameInputFiltro${e.target.id.slice(14)}`);
        textoFiltro =e.target.innerText;
        break;

      default:
        break;
    }
    buscarProducto(e.target.value, textofiltro, ordenPor, 0);
  };

  document.getElementById("inputFiltro").addEventListener("click", filtro);
  document
    .getElementById("h4opcionFiltroTodo")
    .addEventListener("click", filtro);

  const cargarFiltros = async () => {

   
    const containerOpcionesFiltro = document.getElementById(
      "containerOpcionesFiltro"
    );
    const datosOpcion = await peticionFech("https://tesbsaleback2-production.up.railway.app/filtroDatos","GET");



    datosOpcion
      .map((datosOpcion) => {
        let H4OpcionesFiltro = document.createElement("h4");
        H4OpcionesFiltro.setAttribute("id", `h4opcionFiltro${datosOpcion.id}`);
        H4OpcionesFiltro.innerText = datosOpcion.name;
        H4OpcionesFiltro.addEventListener("click", filtro);
        containerOpcionesFiltro.appendChild(H4OpcionesFiltro);

        /*       return `
    <h4 id='${datosOpcion.id}'>${datosOpcion.name}</h4>
  `; */
      })
      .join("");
  };

  cargarFiltros();

  /* filtro(); */
};
