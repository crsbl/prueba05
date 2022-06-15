export default (textoOrdenarPor) => {
  let estadoOrdenarPor = false;

  const ordenarPor = (e) => {
    const containerDatosOpcionesOrdenarPor = document.getElementById(
      "containerOpcionesOrdenarPor"
    );
    const inpOrdenarPor = document.getElementById("inputOrdenarPor");

    switch (estadoOrdenarPor) {
      case false:
        containerDatosOpcionesOrdenarPor.style.display = "block";
        estadoOrdenarPor = true;
        break;

      case true:
        console.log("aqqq", e.target.innerText);
        containerDatosOpcionesOrdenarPor.style.display = "none";
        estadoOrdenarPor = false;
        inpOrdenarPor.value = e.target.innerText;
        textoOrdenarPor= e.target.innerText;
        inpOrdenarPor.setAttribute("name",`nameInputOrdenarPor${e.target.id.slice(18)}`);
        break;

      default:
        break;
    }

    console.log("datosOpcion");
  };

  document
    .getElementById("inputOrdenarPor")
    .addEventListener("click", ordenarPor);

  const cargarOrdenarPor = () => {
    const opcionesOrdenarPor = [
      {id:0, name: "Nombre" },
      {id:1, name: "Menor Precio" },
      {id:2, name: "Mayor Precio" },
    ];

    const containerOpcionesOrdenarPor = document.getElementById(
      "containerOpcionesOrdenarPor"
    );

    opcionesOrdenarPor
      .map((datosOpcion) => {
        let H4OpcionesOrdenarPor = document.createElement("h4");
        H4OpcionesOrdenarPor.setAttribute(
          "id",
          `h4opcionFiltro${datosOpcion.id}`
        );
        H4OpcionesOrdenarPor.innerText = datosOpcion.name;
        H4OpcionesOrdenarPor.addEventListener("click", ordenarPor);
        H4OpcionesOrdenarPor.setAttribute("id", `h4opcionOrdenarPor${datosOpcion.id}`);
        containerOpcionesOrdenarPor.appendChild(H4OpcionesOrdenarPor);

        /*       return `
    <h4 id='${datosOpcion.id}'>${datosOpcion.name}</h4>
  `; */
      })
      .join("");
  };

  cargarOrdenarPor();
};
