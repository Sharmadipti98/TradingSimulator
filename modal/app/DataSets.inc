<?php

/**
 * Created by PhpStorm.
 * User: prabhato
 * Date: 7/24/2017
 * Time: 7:10 PM
 */
include_once (__DIR__) . "/../query/DataSetsDB.php";

class DataSets
{
    var $conn;
    var $dataSetsDb;

    function __construct($conn)
    {
        $this->conn = $conn;
        $this->dataSetsDb = new DataSetsDB($conn);
    }

    function getSearchItemsByLimit($companyName, $exchange)
    {
        $result = Array();
        if(($companyName == "" || preg_match('/^[a-z0-9 .\-]+$/i', $exchange)) && ctype_alpha($exchange) && strlen($exchange) < 4) {

            $result = $this->dataSetsDb->getSearchItemsByLimit($companyName, 7, $exchange);
        }
        return $result;
    }
}