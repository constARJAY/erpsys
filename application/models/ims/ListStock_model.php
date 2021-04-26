<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class ListStock_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
    }
    public function getListStock($classificationID, $categoryID, $inventoryStorageID){

        $sql = "SELECT * FROM ims_inventory_item_tbl WHERE categoryID = $categoryID";
        return $this->db->query($sql)->result_array();

    }

}    