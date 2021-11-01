<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class DisposalItem_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
    }

    public function saveDisposalItemData($action, $data, $id = null,$disposalStatus) 
    {
        if ($action == "insert") {
            $query = $this->db->insert("ims_inventory_disposal_tbl", $data);
        } else {
            $where = ["disposalID" => $id];
            $query = $this->db->update("ims_inventory_disposal_tbl", $data, $where);
        }

        if ($query) {
            $insertID = $action == "insert" ? $this->db->insert_id() : $id;
            $sql = $this->db->query("SELECT idd.stockInAssetID, (isia.quantity - idd.quantity) AS  quantity FROM ims_inventory_disposal_details_tbl AS idd 
            LEFT JOIN ims_inventory_disposal_tbl AS id ON idd.disposalID = id.disposalID
            LEFT JOIN ims_stock_in_assets_tbl AS isia ON idd.stockInAssetID = isia.stockInAssetID
             WHERE id.disposalID= $insertID AND id.disposalStatus =2");
            foreach ($sql->result() as $row)
             {  
                $data =  array(
                           'quantity'            =>$row->quantity);
                      // $this->db->where($array);  
                       $this->db->where('stockInAssetID', $row->stockInAssetID);
                       $this->db->update("ims_stock_in_assets_tbl", $data);  
            }    
            return "true|Successfully submitted|$insertID|".date("Y-m-d");
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }

    public function deleteDisposalItems($id) {
        $query = $this->db->delete("ims_inventory_disposal_details_tbl", ["disposalID" => $id]);
        return $query ? true : false;
    }

    public function saveDisposalItems($data, $id = null, $approversStatus)
    {
            if ($id) {
                $deletePurchaseRequestItems = $this->deleteDisposalItems($id);
            }
            $query = $this->db->insert_batch("ims_inventory_disposal_details_tbl", $data);
            if ($query) {
                return "true|Successfully submitted";
            }
            return "false|System error: Please contact the system administrator for assistance!";
       
    }

}
