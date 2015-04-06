<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.

 */
include './lib/function.php';
$connect  =  new admin();
$empty = array();
$id_detail = $_POST['id_detail'];
$connect->config("localhost","csv","root","");
$userdata = $connect->select("max(id) as id","info","true");
$id = $userdata[0]['id'];
$data_detail = $connect->select("*","detail","id='$id_detail'");
foreach ($data_detail as $line){
    array_push($empty,array("name"=>$line['count'],"id"=>$id));
}
echo (json_encode($empty[0]));

