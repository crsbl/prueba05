


//esta funcion hace aparecer el carrito dando en width y overflow
ventana_carrito_estado = false;
const llamar_carrito = ()=>{


 const ventana_carrito = document.getElementById('ventana_carrito');

if(ventana_carrito_estado == false)

{ventana_carrito.style.overflow='visible'; 
    ventana_carrito.style.width='20rem'; 
    ventana_carrito_estado = true;
}
else
{
    ventana_carrito.style.overflow='hidden';
    ventana_carrito_estado = false;
    ventana_carrito.style.width='0rem';    
}

}


const quitar_item_carro =(id)=>{

    const array_localstorage =  JSON.parse(window.localStorage.getItem('crrto'));

    let nuevo_array_local = [];

    

  for (let i = 0; i < array_localstorage.length; i++) {
   
   


    if(array_localstorage[i][0]== id)

{
    console.log('es' + array_localstorage[i][0])
}
else 
{
    nuevo_array_local.push(array_localstorage[i])
}

}

console.log(nuevo_array_local);

window.localStorage.setItem('crrto', JSON.stringify(nuevo_array_local))


cargar_carrito();
}


//carga los objetos de localstorage 
const cargar_carrito = ()=>{
     
contenedor_items_carrito = document.getElementById('contenedor_carrito_items');


const array_localstorage =  JSON.parse(window.localStorage.getItem('crrto'));
                          
if(array_localstorage)
{
    console.log(array_localstorage);

    contenedor_items_carrito.innerHTML = array_localstorage.map((array_local)=>{return`
    
    <div id ='${array_local[0]}' class='d_item_carrito00' onclick='quitar_item_carro(this.id);'>
  
    <img class='img_datos01' src='${array_local[1]}'></img>

 
    <h3 class='h3_carrito_item_nombre00'>${array_local[2]}</h3>
    <h3 class='h3_carrito_item_precio00'>${array_local[3]}</h3>


   
    </div>
    `});
}











}





//suma items al localstorage, recibe las variables del items desde  la funcion cargar_items()
const agregar_items = (id, url_image,nombre, precio)=>{

const array_localstorage =  JSON.parse(window.localStorage.getItem('crrto'));
          
if(array_localstorage)
{
  
agregado= false;




for (let i = 0; i < array_localstorage.length; i++) {
 
if(array_localstorage[i][0] == id)
{
    agregado = true; 
}


}

if(agregado== false)
{
    console.log('no a sido agregado');
    window.localStorage.setItem('crrto', JSON.stringify([...array_localstorage,[id, url_image, nombre, precio]]))}
}

else
{
    window.localStorage.setItem('crrto', JSON.stringify([[id, url_image, nombre, precio]]))

}
cargar_carrito();
}


//manda el filtro y muestra lo seleccionado al hacer click en el()
let filtro_seleccionado = 'sin_filtrar';
const selecion_filtro =(e)=>{
    filtro_seleccionado =e.id;
document.getElementById('mostrar_slc_filtro').innerHTML=(e.innerHTML);
document.getElementById('select_filtro').style.height='0'
buscar_items(0)
}
//manda el orden y muestra lo seleccionado al hacer click en el()
let orden_seleccionado = 'nombre';
const selecion_orden =(e)=>{
    orden_seleccionado =e.id;
document.getElementById('mostrar_slc_orden').innerHTML=(e.innerHTML);
document.getElementById('select_orden').style.height='0'
buscar_items(0)
}
//carga los filtros desde la bd
let estado_filtro = false;
const cargar_filtros = async()=>{

    const contenedor_filtros = document.getElementById('select_filtro');

  

    const res = await fetch('./php/cargar_filtros.php');
    const data =  JSON.parse(await res.text());







contenedor_filtros.innerHTML += data.map((dts)=>{return `


    <h3 class='h3_slc00' id='${dts.id}' onclick="selecion_filtro(this);">${dts.name}</h3>

`



});


  
}



let posicion_pag = 0;
//funcion para consultar y mostrar items de la bd 
const buscar_items = async(posicion)=>{

    txt_buscar = document.getElementById('input_buscar');
 
  

    const contenedor_items = document.getElementById('contenedor_items');
    contenedor_items.innerHTML ='';

    console.log(txt_buscar.value);




    const res = await fetch('/php/buscar_items.php',{
        method:'POST',
        headers:{'Content-Type': 'application/json'},
        body:JSON.stringify([txt_buscar.value, filtro_seleccionado, orden_seleccionado, posicion*6])
    });

    const data =  await res.text();

console.log(data+'dd');

if(data.length > 0)
{



    let json_data = JSON.parse(data);





cargar_paginacion(json_data[1][0][0],posicion)

    contenedor_items.innerHTML = json_data[0].map((dts)=>{

  
       
        return `

    <div class="d_datos00" >
    <img class="img_datos00" src="${dts.url_image}"></img>
    <h3 class='h3_nombre00'>${dts[1]}</h3>
    
    <h3 class='h3_titulo00'>Precio</h3>
    <h3 class='h3_precio00'>${dts.price}</h3>

    <h3 class='h3_titulo00'>Descuento</h3>
    <h3 class='h3_precio00'>${dts.discount}</h3>
 
    <button class='btn_agregar00' onclick="agregar_items(${dts.id} ,'${dts.url_image}','${dts[1]}', ${dts.price});">Agregar</button>
    
    </div>
    `});



}

     


   




}



const cargar_paginacion =(nmro, posicion)=>{

let contenedor_paginas = document.getElementById('contenedor_paginas');

contenedor_paginas.innerHTML ='';

let cantidad_paginas = null;



if(nmro % 6 == 0)
{cantidad_paginas = Math.trunc(nmro/6)}
else
{cantidad_paginas= Math.trunc(nmro/6) + 1}

contador = 0;

console.log(cantidad_paginas);

for (let i = 0; i < cantidad_paginas; i++) {
   
    contenedor_paginas.innerHTML += `<button class='btn_pagina00  ${i ==posicion ? 'btn_pagina00_seleccionado' : ''}'  onclick="buscar_items(${i});" >${i+1}</button>`
    
}

}


//muestra los items en la primera carga de la pagina y para actualizar
const cargar_items = async()=>{






    const contenedor_items = document.getElementById('contenedor_items');


    const res = await fetch('cargar_items.php');
    const data =  JSON.parse(await res.text());

    



    contenedor_items.innerHTML ='';


    contenedor_items.innerHTML = data[0].map((dts)=>{return `
    <div class="d_datos00" >
    <img class="img_datos00" src="${dts.url_image}"></img>
    <h3 class='h3_nombre00'>${dts[1]}</h3>
    
    <h3 class='h3_titulo00'>Precio</h3>
    <h3 class='h3_precio00'>${dts.price}</h3>

    <h3 class='h3_titulo00'>Descuento</h3>
    <h3 class='h3_precio00'>${dts.discount}</h3>

    <button class='btn_agregar00' onclick="agregar_items(${dts.id} ,'${dts.url_image}','${dts[1]}', ${dts.price});">Agregar</button>
    
    </div>
    `});

    cargar_paginacion(data[1],0)
}


//abre el cuadro de filtro para seleccionar
const mostrar_filtro = ()=>{

const contenedor_filtros = document.getElementById('select_filtro')




if(estado_filtro)
{ contenedor_filtros.style.height='0'; estado_filtro = false; }
else
{contenedor_filtros.style.height='max-content';estado_filtro = true;}

}
//abre el cuadro de ordem para seleccionar
const mostrar_orden = ()=>{

    const contenedor_filtros = document.getElementById('select_orden')
    
    
    
    
    if(estado_filtro)
    { contenedor_filtros.style.height='0'; estado_filtro = false; }
    else
    {contenedor_filtros.style.height='max-content';estado_filtro = true;}
    
    }

cargar_filtros();
cargar_items();
cargar_carrito();