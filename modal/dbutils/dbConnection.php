<?php


include_once (__DIR__) . "/../../config/Environment.php";

function createConnection()
{


    if (isProd()) {
        $servername = "localhost";
        $username = "gadgerpo_admin";
        $password = "*OSNTWSy#Ikn";
        $dbname = "gadgerpo_gizmos";
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