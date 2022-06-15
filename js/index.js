import cargarProductos from "./acciones/cargarProductos/index.js";
import buscarProducto from "./buscador/buscarTexto/index.js";
import ordenarPor from "./buscador/ordenarPor/index.js";
import filtro from "./buscador/filtro/index.js";
import paginas from "./paginas/index.js";

const App = () => {
    let textofiltro = "Todo",
    ordenPor = "Nombre",
    textoBuscar = "";

  buscarProducto(textofiltro, ordenPor,textoBuscar);
  cargarProductos( textoBuscar, textofiltro, ordenPor);
  ordenarPor(ordenPor);
  filtro(textofiltro);


  if(document.getElementById("inputFiltro").value ==""){
    document.getElementById("inputFiltro").value =="Todo"
  }
};

App();
