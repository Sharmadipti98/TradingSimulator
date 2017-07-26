<?php


include_once (__DIR__) . "/../../config/Environment.php";

function createConnection()
{


    if (isProd()) {
        $servername = "mysql.hostinger.in";
        $username = "u350336948_netpr";
        $password = "7yseE6pYXkPZ";
        $dbname = "u350336948_netpr";
    } else {
        $servername = "localhost";
        $username = "Admin";
        $password = "test1234";
        $dbname = "stockin";
    }

    /// On localhost sometimes adding User to specific Database doesn't work. Go to Home page of PHPMYADMIN and then create new User

    try {
        // Create connection
        $conn = new mysqli($servername, $username, $password, $dbname);
        return $conn;


    } catch (Exception $e) {
    }
}

?>