<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.

 */
include './lib/function.php';
$connect  =  new admin();
$id=$_POST['id'];
$name = $_POST['name'];
var_dump($id);
$connect->config("localhost","csv","root","");
$info = $connect->update("info","name='$name'","id='$id'");



