import buscarProducto from "../../acciones/buscarProductos/index.js";

export default (textofiltro, ordenPor, textoBuscar) => {
  const inputBuscar = document.getElementById("inputBuscarProducto");
  const buttonBuscar = document.getElementById("buttonBuscar");




  const changeBuscar = (e) => {
    textoBuscar = e.target.value;
    buscarProducto(e.target.value, textofiltro, ordenPor, 0);
  };

  inputBuscar.addEventListener("change", changeBuscar);
  buttonBuscar.addEventListener('click',()=>{
   buscarProducto(inputBuscar.value, textofiltro, ordenPor, 0); 
  })
};
