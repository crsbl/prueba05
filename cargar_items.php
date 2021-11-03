
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


$datos00 = $conn->query("SELECT COUNT(*) FROM product");
$conteo =  array($datos00-> fetch_array());
//$conteo[0][0]




$datos01 = $conn->query("SELECT * FROM product ORDER BY  product.name LIMIT 0, 6");
$itms01 =  array($datos01-> fetch_array());

echo json_encode([$itms01,$conteo[0][0]]);



?>