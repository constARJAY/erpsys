<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class InventoryPriceList_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
    }

    public function add_price_list($id,$data, $param = "item"){
        $where = $param == "item" ? ["itemID" => $id] : ["assetID" => $id];
        if ($id) {
            $this->db->delete("ims_inventory_price_list_tbl", $where);
        }
        $query = $this->db->insert_batch("ims_inventory_price_list_tbl", $data);
        if ($query) {
            return "true|Successfully submitted";
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }
}
