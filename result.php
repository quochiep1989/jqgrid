<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.

 */
include './lib/function.php';
$connect  =  new admin();
$connect->config("localhost","csv","root","");
$userdata = $connect->select("max(id) as id","info","true");
echo (json_encode($userdata[0]));

