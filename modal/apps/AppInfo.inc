<?php

/**
 * Created by PhpStorm.
 * User: prabhato
 * Date: 5/20/2017
 * Time: 11:30 PM
 */

include_once (__DIR__) . "/../query/AppInfoDB.inc";
include_once (__DIR__) . "/../query/AppAnswerDB.inc";
include_once (__DIR__) . "/../sql/tables/AppAnswerTable.inc";
include_once (__DIR__) . "/../sql/tables/AppInfoTable.inc";


class AppInfo
{
    var $appInfoDB;
    var $appAnswerDB;

    function __construct($conn)
    {
        $this->appInfoDB = new AppInfoDB($conn);
        $this->appAnswerDB = new AppAnswerDB($conn);
    }

    function getAllApps()
    {
        return $this->appInfoDB->getAllApps();
    }

    function getAppInfoByLink($appLink, $age, $gender)
    {
        $gender = $gender == 'male' ? 1 : 2;
        $IMAGE_URL = 'imageUrl';
        $appInfos = $this->appInfoDB->getAppInfoByAppLink($appLink);
        $result = array();
        $result[$IMAGE_URL] = null;



        if(sizeof($appInfos) > 0) {
            $appInfo = $appInfos[0];
            $result['NAME'] = $appInfo[AppInfoTable::$NAME];
            $sameGender = $appInfo[AppInfoTable::$SAME_GENDER];
            $appId = $appInfo[AppInfoTable::$APP_ID];

            if($gender) {
                $gender = $sameGender == 1 ? $gender : ($gender == 1 ? 2 : 1);
            }

            $allAnswers = $this->appAnswerDB->getAllAnswers($appId, $gender);
            if($age) {
                $answer = $this->getNearestAnswerToAge($allAnswers, $age);
                $result[$IMAGE_URL] = $answer[AppAnswerTable::$IMAGE_URL];
            } else {
                $result[$IMAGE_URL] = $allAnswers[rand(0, sizeof($allAnswers) - 1)][AppAnswerTable::$IMAGE_URL];
            }
        }
        return $result;
    }

    function getNearestAnswerToAge($allAnswers, $age)
    {
        $nearestAgeIndex = 0;
        $nearestAgeDiff = 200;  // Max age
        for ($i = 0; $i < sizeof($allAnswers); $i++) {
            $ageDiff = abs($allAnswers[$i][AppAnswerTable::$AGE] - $age);
            if($ageDiff < $nearestAgeDiff) {
                $nearestAgeDiff = $ageDiff;
                $nearestAgeIndex = $i;
            }
        }

        return sizeof($allAnswers) > 0 ? $allAnswers[$nearestAgeIndex] : null;
    }
}