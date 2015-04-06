<?php

include './lib/function.php';
$connect  =  new admin();
$connect->config("localhost","csv","root","");
$info = $connect->select("*","info",true);
echo json_encode($info);

