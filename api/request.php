<?php

session_start();

if(!isset($_GET['_url'])) {
    die();
}
$_url = $_GET['_url'];


include_once (__DIR__) . "/../modal/apps/AppInfo.inc";
include_once (__DIR__) . "/../modal/dbutils/dbConnection.php";

$conn = createConnection();


switch ($_url) {
    case "all-apps" :
        $appInfo = new AppInfo($conn);
        echo json_encode($appInfo->getAllApps());
        break;
    case "app-by-link" :
        $appInfo = new AppInfo($conn);
        if(isset($_GET['appLink'])) {
            $age = isset($_GET['age']) ? $_GET['age'] : null;
            $gender = isset($_GET['age']) ? $_GET['gender'] : null;
            echo json_encode($appInfo->getAppInfoByLink($_GET['appLink'], $age, $gender));
        }
        break;
    default :
        header($_SERVER["SERVER_PROTOCOL"] . "404 Not Found", true, 404);
}

include_once (__DIR__) . "/../modal/dbutils/closeDbConnection.php";
