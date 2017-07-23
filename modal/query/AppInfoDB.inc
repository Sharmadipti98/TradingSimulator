<?php

/**
 * Created by PhpStorm.
 * User: prabhato
 * Date: 5/20/2017
 * Time: 11:31 PM
 */

include_once (__DIR__) . "/DbQuery.inc";
include_once (__DIR__) . "/../sql/tables/AppInfoTable.inc";

class AppInfoDB
{
    var $sqlQuery;

    function __construct($conn)
    {
        $this->sqlQuery = new DbQuery($conn);
    }

    function getAllApps()
    {
        $query = "SELECT * FROM " . AppInfoTable::$TABLE_NAME . " WHERE " . AppInfoTable::$IS_ON
            . "=1 ORDER BY " . AppInfoTable::$APP_ID . " DESC";

        return $this->sqlQuery->_fetchWithoutPreparedStatement($query);
    }


    function getAppInfoByAppLink($appLink)
    {
        $query = "SELECT * FROM " . AppInfoTable::$TABLE_NAME . " WHERE " . AppInfoTable::$IS_ON
            . "=1 AND " . AppInfoTable::$LINK . '=?';

        $params = array($appLink);
        return $this->sqlQuery->_fetchAllData($query, 's', $params);
    }

    function getResultOnInput()
    {
        $query = "SELECT * FROM " . AppInfoTable::$TABLE_NAME . " WHERE " . AppInfoTable::$IS_ON
            . "=1 ORDER BY id DESC";

        return $this->sqlQuery->_fetchWithoutPreparedStatement($query);
    }
}