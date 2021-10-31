
<?php  



header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER['REQUEST_METHOD'];
if($method == "OPTIONS") {
    die();
}

include 'conexion.php';


$json = file_get_contents('php://input');

$json_slc = json_decode($json);



if($json_slc[2] == 'nombre')
 {
$orden = 'product.name';
 }

 if($json_slc[2] == 'mayor')
 {
$orden = 'product.price DESC';
 }


 if($json_slc[2] == 'menor')
 {
$orden = 'product.price ASC';
 }



if($json_slc[1]=='sin_filtrar')
{
    
    $datos = $conn->query("SELECT * FROM product  WHERE product.name like '$json_slc[0]%'  ORDER BY  $orden LIMIT 0, 6" );
    $items_tda =  array($datos-> fetch_array());
    
    echo json_encode([$items_tda]);

}else{
   
    $datos = $conn->query("SELECT * FROM product  iNNER JOIN category on product.category =  category.id  WHERE product.name like '$json_slc[0]%' and product.category like '%$json_slc[1]%'  ORDER BY  $orden LIMIT 0, 6" );
    $items_tda =  array($datos-> fetch_array());
    
    echo json_encode([$items_tda]);

}






?>