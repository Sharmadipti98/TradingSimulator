<?php

session_start();

if(!isset($_GET['_url'])) {
    die();
}
$_url = $_GET['_url'];

include_once (__DIR__) . "/../modal/dbutils/dbConnection.php";
include_once (__DIR__) . "/../modal/app/DataSets.inc";

$conn = createConnection();


switch ($_url) {
    case "search" :
        $dataSets = new DataSets($conn);
        if(isset($_GET['companyName']) && isset($_GET['exchange'])) {
            echo json_encode($dataSets->getSearchItemsByLimit($_GET['companyName'], $_GET['exchange']));
        }
        break;
    default :
        header($_SERVER["SERVER_PROTOCOL"] . "404 Not Found", true, 404);
}

include_once (__DIR__) . "/../modal/dbutils/closeDbConnection.php";
