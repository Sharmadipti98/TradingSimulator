<?php

/**
 * Created by PhpStorm.
 * User: prabhato
 * Date: 3/21/2017
 * Time: 7:58 PM
 */
class CountryCode
{
    public static function getCountryCode()
    {
        try {
            $content = @file_get_contents('http://api.wipmania.com/json');
            if($content === false){
                return "IN";
            }
            $payload = json_decode($content);
            if($payload->address->country_code != "XX") {
                return $payload->address->country_code;
            }
        } catch (Exception $ex) {

        }

        return "IN";
    }

}