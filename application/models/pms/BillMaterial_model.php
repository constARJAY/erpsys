<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class BillMaterial_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
    }

    public function saveBillMaterial($action, $data, $id = null) 
    {
        if ($action == "insert") {
            $query = $this->db->insert("pms_bill_material_tbl", $data);
        } else {
            $where = ["billMaterialID" => $id];
            $query = $this->db->update("pms_bill_material_tbl", $data, $where);
        }

        if ($query) {
            $insertID = $action == "insert" ? $this->db->insert_id() : $id;
            return "true|Successfully submitted|$insertID|".date("Y-m-d");
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }

    public function deleteBIllMaterialItems($id) {
        $queryPersonnel = $this->db->delete("hris_personnel_request_tbl", ["billMaterialID" => $id]) ? true : "";
        $queryTravel    = $this->db->delete("ims_travel_request_tbl",     ["billMaterialID" => $id]) ? true : "";
        $queryItems     = $this->db->delete("ims_request_items_tbl",      ["billMaterialID" => $id]) ? true : "";
        $query          = false;
        if($queryPersonnel && $queryTravel && $queryItems){
            $query = true;
        }
        return $query;
    }

    public function saveBillMaterialItems($data, $id = null){
        $personnelData  = [];
        $travelData     = [];
        $itemsData      = [];

        if ($id) {
            $deleteBIllMaterialItems = $this->deleteBIllMaterialItems($id);
        }
        // unset($arr['billMaterialID']);

        foreach($data as $index => $item) {
            if($item["designationID"] != null){
                $temp = [
                    "billMaterialID"        => $item["billMaterialID"],
                    "costEstimateID"        => $item["costEstimateID"],
                    "designationID"         => $item["designationID"],
                    "designationName"       => $item["designationName"],
                    "designationTotalHours" => $item["designationTotalHours"],
                    "quantity"              => $item["quantity"],
                    "unitCost"              => $item["unitCost"],
                    "totalCost"             => $item["totalCost"],
                    "createdBy"             => $item["createdBy"],
                    "updatedBy"             => $item["updatedBy"],
                ];
                array_push($personnelData, $temp);
            }elseif($item["travelDescription"] != null){
                $temp = [
                    "billMaterialID"        => $item["billMaterialID"],
                    "costEstimateID"        => $item["costEstimateID"],
                    "travelDescription"     => $item["travelDescription"],
                    "unitOfMeasure"         => $item["itemUom"],
                    "quantity"              => $item["quantity"],
                    "unitCost"              => $item["unitCost"],
                    "totalCost"             => $item["totalCost"],
                    "createdBy"             => $item["createdBy"],
                    "updatedBy"             => $item["updatedBy"],
                ];
                array_push($travelData, $temp);
            }else{
                $requestItemID  = $item["requestItemID"];
                $sql    = "SELECT files FROM ims_request_items_tbl WHERE requestItemID = '$requestItemID'";
                $query  = $this->db->query($sql);
                $result = $query->result_array();
                $temp = [
                    "billMaterialID"        => $item["billMaterialID"],
                    "costEstimateID"        => $item["costEstimateID"],
                    "itemID"                => $item["itemID"],
                    "itemName"	 	        => $item["itemName"],
                    "itemDescription"       => $item["itemDescription"],
                    "itemUom"	            => $item["itemUom"],
                    "categoryType"          => $item["categoryType"],
                    "quantity"              => $item["quantity"],
                    "unitCost"              => $item["unitCost"],
                    "totalCost"             => $item["totalCost"],
                    "files"                 => $result[0]["files"],
                    "createdBy"             => $item["createdBy"],
                    "updatedBy"             => $item["updatedBy"],
                ];
                array_push($itemsData, $temp);
            }
        }


        // CHECK IF THE BILL OF MATERIAL IS EXISTING;
        // $personnelQuery = $this->db->query("SELECT * FROM hris_personnel_request_tbl WHERE billMaterialID = '$id'");
        // $travelQuery    = $this->db->query("SELECT * FROM ims_travel_request_tbl WHERE billMaterialID = '$id'");
        // $itemsQuery     = $this->db->query("SELECT * FROM ims_request_items_tbl WHERE billMaterialID = '$id'");
        
        // if($personnelQuery->num_rows() > 0){
        //     $deletePersonnel = $this->db->delete("hris_personnel_request_tbl", ["billMaterialID" => $id]);
            
        // }
        // if($travelQuery->num_rows() > 0){
        //     $deleteTravel = $this->db->delete("ims_travel_request_tbl", ["billMaterialID" => $id]);
        // }
        // if($itemsQuery->num_rows() > 0){
        //     $deleteItems = $this->db->delete("ims_travel_request_tbl", ["billMaterialID" => $id]);
        // }

        $perssonelResult = count($personnelData) > 0 ? $this->db->insert_batch("hris_personnel_request_tbl", $personnelData) : true; 
        $travelResult    = count($travelData)    > 0 ? $this->db->insert_batch("ims_travel_request_tbl", $travelData)        : true;
        $itemsResult     = count($itemsData)     > 0 ? $this->db->insert_batch("ims_request_items_tbl", $itemsData)          : true;
        
        if ($perssonelResult && $travelResult && $itemsResult) {
            return "true|Successfully submitted";
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }

    
}
