<?php

/**
 * Created by PhpStorm.
 * User: prabhato
 * Date: 7/24/2017
 * Time: 7:02 PM
 */

include_once (__DIR__) . "/DbQuery.inc";
include_once (__DIR__) . "/../sql/tables/DataSetsTable.php";

class DataSetsDB
{
    var $sqlQuery;

    function __construct($conn)
    {
        $this->sqlQuery = new DbQuery($conn);
    }

    function getSearchItemsByLimit($companyName, $limit, $exchange)
    {
        $query = "SELECT * FROM " . DataSetsTable::$TABLE_NAME . " WHERE "
            . DataSetsTable::$NAME . " LIKE '%$companyName%' AND "
            . DataSetsTable::$EXCHANGE . "='$exchange'" . " ORDER BY id ASC LIMIT $limit";

        return $this->sqlQuery->_fetchWithoutPreparedStatement($query);
    }
}