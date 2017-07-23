<?php

/**
 * Created by PhpStorm.
 * User: prabhato
 * Date: 5/18/2017
 * Time: 9:13 PM
 */

include_once (__DIR__) . "/DbQuery.inc";
include_once (__DIR__) . "/../sql/tables/AppAnswerTable.inc";

class AppAnswerDB
{
    var $sqlQuery;

    function __construct($conn)
    {
        $this->sqlQuery = new DbQuery($conn);
    }

    function getAllAnswers($appId, $gender = null)
    {
        $query = "SELECT * FROM " . AppAnswerTable::$TABLE_NAME . " WHERE " . AppAnswerTable::$APP_ID . "=? AND " . AppAnswerTable::$IS_ON
            . "=?";

        $params = array($appId, 1);
        $type = 'ii';
        if($gender) {
            $query .= " AND " . AppAnswerTable::$GENDER . '=?';
            array_push($params, $gender);
            $type .= 'i';
        }

        return $this->sqlQuery->_fetchAllData($query, $type, $params);
    }
}