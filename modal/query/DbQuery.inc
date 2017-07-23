<?php

/**
 * Created by PhpStorm.
 * User: prabhato
 * Date: 11/22/2016
 * Time: 8:21 PM
 */
class DbQuery
{
    var $conn;
    var $isCountryBased = true;

    function __construct($conn)
    {
        $this->conn = $conn;
    }

    function _fetchWithoutPreparedStatement($queryString)
    {
        return $this->convertToArray(mysqli_query($this->conn, $queryString));
    }

    private function convertToArray($mysqlResult)
    {
        $result = array();
        $i = 0;
        while ($row = mysqli_fetch_assoc($mysqlResult)) {
            $result[$i++] = $row;
        }

        return $result;
    }

    function _fetchAllData($queryString, $typeString, $params)
    {
        if($submitReq = mysqli_prepare($this->conn, $queryString)) {
            $params = array_merge(array($typeString), $params);
            call_user_func_array(array($submitReq, 'bind_param'), $this->refValues($params));
            mysqli_stmt_execute($submitReq) or die("Something went wrong");
        }

        return $this->_getResult($submitReq);
    }

    function _saveData($query, $typeString, $params)
    {
        $submitReq = mysqli_prepare($this->conn, $query);
        $params = array_merge(array($typeString), $params);

        call_user_func_array(array($submitReq, 'bind_param'), $this->refValues($params));
        return mysqli_stmt_execute($submitReq);
    }

    function _updateAColumn($query, $typeString, $params)
    {
        $submitReq = mysqli_prepare($this->conn, $query);
        $params = array_merge(array($typeString), $params);

        call_user_func_array(array($submitReq, 'bind_param'), $this->refValues($params));
        return mysqli_stmt_execute($submitReq) or die("Error");
    }

    function _insertData($query, $typeString, $params)
    {
        $submitReq = mysqli_prepare($this->conn, $query);
        $params = array_merge(array($typeString), $params);

        call_user_func_array(array($submitReq, 'bind_param'), $this->refValues($params));
        return mysqli_stmt_execute($submitReq) or die("Error");
    }

    function _fetchSingleColumnData($queryString, $typeString, $params)
    {
        if($submitReq = mysqli_prepare($this->conn, $queryString)) {
            $params = array_merge(array($typeString), $params);
            call_user_func_array(array($submitReq, 'bind_param'), $this->refValues($params));
            mysqli_stmt_execute($submitReq) or die("Error");
        }

        return $this->_getResult($submitReq);
    }

    function _getResult($submitReq)
    {
        $metaResults = mysqli_stmt_result_metadata($submitReq) or die("Error");
        return $this->fetchArray($submitReq, $metaResults);
    }

    function fetchArray($stmt, $data)
    {
        $fields = array();
        $result = array();
        $out = array();

        $fields[] = &$stmt;
        $count = 1;

        while ($field = mysqli_fetch_field($data)) {
            $fields[] = &$out[$field->name];
            $count++;
        }

        call_user_func_array('mysqli_stmt_bind_result', $fields);


        for ($i = 0; mysqli_stmt_fetch($stmt); $i++) {
            $result[$i] = array();
            foreach ($out as $k => $v) {
                $result[$i][$k] = $v;
            }
        }

        return $result;
    }

    function refValues($arr)
    {
        if(strnatcmp(phpversion(), '5.3') >= 0) //Reference is required for PHP 5.3+
        {
            $refs = array();
            foreach ($arr as $key => $value) {
                $refs[$key] = &$arr[$key];
            }
            return $refs;
        }
        return $arr;
    }

    function executeQuery($query)
    {
        mysqli_query($this->conn, $query);
    }
}