<!DOCTYPE html>
<?php
session_start();
ob_start();

include_once (__DIR__) . "/config/Environment.php";

$contextPath = getContextPath();
?>

<html class="no-js" lang="en-US" prefix="og: http://ogp.me/ns#">
<head>
    <meta charset="utf-8">
    <title>Cool awesome applications</title>
    <meta charset="UTF-8">
    <meta name="author" content="Prabhat Ojha">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">

    <link rel='dns-prefetch' href='//s.w.org'/>
    <link
        href="https://fonts.googleapis.com/css?family=Baumans|Orbitron|Roboto|Questrial|Rationale|Signika|Ubuntu+Condensed|Unica+One"
        rel="stylesheet">
    <!--For dev only when no internet-->
    <!--<script src="/js/build/react.js"></script>
    <script src="/js/build/react-dom.js"></script>-->

    <link
        href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
        rel="stylesheet">
    <!--this is to support promises in IE and Safari-->
    <script async defer src="https://cdnjs.cloudflare.com/ajax/libs/bluebird/3.3.5/bluebird.min.js"></script>
    <script src="https://cdn.rawgit.com/michalsnik/aos/2.1.1/dist/aos.js"></script>

    <script>
        var appContextPath = "/chevak";
    </script>

</head>

<body style="position:relative;background:#fff;font-family: Lato,sans-serif;">

<div id="fb-root"></div>
<App id="app">
    <div style="position: fixed;left: 50%;top: 50%;text-align: center;font-size: 13px">
        <div style="margin-top:-55px;margin-left:-40px;text-align: center;">
            <img width="30" height="30" src="/images/spinner.gif">
            <br/>
            <label>Loading...</label>
        </div>
    </div>
</App>


<!--For prod only-->
<script src="https://unpkg.com/react@15/dist/react.min.js"></script>
<script src="https://unpkg.com/react-dom@15/dist/react-dom.min.js"></script>
<!-- Search -->
<script src="public/vendor.bundle.js" type="text/javascript"></script>
<script src="public/bundle.js" type="text/javascript"></script>

<script>
    AOS.init({
        duration: 1200
    });
</script>
</body>
</html>