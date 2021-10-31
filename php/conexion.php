<?php 


    $conn = mysqli_connect("mdb-test.c6vunyturrl6.us-west-1.rds.amazonaws.com", "bsale_test", "bsale_test","bsale_test");
    if (!$conn) {
    die("Database connection failed: " . mysqli_connect_error());
    }
?>