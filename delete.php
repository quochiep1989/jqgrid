<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.

 */
include './lib/function.php';
$connect  =  new admin();
$id=$_POST['id'];
var_dump($id);
$connect->config("localhost","csv","root","");
$connect->delete("info","id='$id'");
