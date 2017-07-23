<?php


function isProd()
{
    return false;
}

function getContextPath()
{
    return isProd() ? "/" : "/chevak";
}