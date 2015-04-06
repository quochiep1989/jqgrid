
<?php

class admin {

    //function config database 
    var $db;

    function config($host, $dbname, $user, $pass) {
        $this->db = new PDO('mysql:host=' . $host . ';dbname=' . $dbname, $user, $pass);
        $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $this->db->exec("SET NAMES utf8");
    }

    //function get data from table
    function select($field, $nameDb, $condition) {
        // $this->db->exec("SET CHARACTER SET utf8"); 
        $statement = $this->db->query('SELECT ' . $field . ' FROM ' . $nameDb . ' where ' . $condition);
        $statement->setFetchMode(PDO::FETCH_ASSOC);
        return $statement->fetchAll();
    }
   

    //function insert data from table
    function insert($table, $value) {
        $fi = array();
        $nameField = "";
        foreach ($value as $key => $data) {
            array_push($fi, $key);
        }
        $info = $table . "(" . implode(",", $fi) . ")";
        foreach ($fi as $key => $line) {
            if ($key == count($fi) - 1)
                $nameField .=":" . $line;
            else
                $nameField .=":" . $line . ",";
        }
        $process = $this->db->prepare('INSERT INTO ' . $info . ' VALUES (' . $nameField . ')');
        $process->execute($value);
    }

    //function update data from table
    function update($nameDb, $value, $condition) {
        $process = $this->db->query("UPDATE $nameDb set $value where $condition");
        $process->execute();
    }

    //function delete data from table
    function delete($nameDb, $condition) {
        $process = $this->db->query("DELETE FROM $nameDb  where $condition");
        $process->execute();
        
    }

    //begin transaction
    function begin() {
        $this->db->beginTransaction();
    }

    //commit
    function commit() {
        $this->db->commit();
    }

    //rollback
    function rollback() {
        $this->db->rollBack();
    }

}
