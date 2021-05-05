<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class CostEstimate_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
    }

    public function saveCostEstimateData($action, $data, $id = null) 
    {
        if ($action == "insert") {
            $query = $this->db->insert("pms_cost_estimate_tbl", $data);
        } else {
            $where = ["costEstimateID" => $id];
            $query = $this->db->update("pms_cost_estimate_tbl", $data, $where);
        }

        if ($query) {
            $insertID = $action == "insert" ? $this->db->insert_id() : $id;
            return "true|Successfully submitted|$insertID|".date("Y-m-d");
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }

    public function deleteCostEstimateItems($id) {
        $queryPersonnel = $this->db->delete("hris_personnel_request_tbl", ["costEstimateID" => $id]) ? true : "";
        $queryTravel    = $this->db->delete("ims_travel_request_tbl",     ["costEstimateID" => $id]) ? true : "";
        $queryItems     = $this->db->delete("ims_request_items_tbl",      ["costEstimateID" => $id]) ? true : "";
        $query          = false;
        if($queryPersonnel && $queryTravel && $queryItems){
            $query = true;
        }
        return $query;
    }

    public function saveCostEstimateItems($data, $id = null){
        $personnelData  = [];
        $travelData     = [];
        $itemsData      = [];

        if ($id) {
            $deleteCostEstimateItems = $this->deleteCostEstimateItems($id);
        }


        foreach($data as $index => $item) {
            if($item["designationID"] != 'undefined'){
                $temp = [
                    "costEstimateID"        => $item["costEstimateID"],
                    "designationID"         => $item["designationID"],
                    "designationName"       => $item["designationName"],
                    "designationTotalHours" => $item["designationTotalHours"],
                    "quantity"              => $item["quantity"],
                    "createdBy"             => $item["createdBy"],
                    "updatedBy"             => $item["updatedBy"],
                ];
                array_push($personnelData, $temp);
            }elseif($item["travelDescription"] != 'undefined'){
                $temp = [
                    "costEstimateID"        => $item["costEstimateID"],
                    "travelDescription"     => $item["travelDescription"],
                    "unitOfMeasure"         => $item["travelUnitOfMeasure"],
                    "quantity"              => $item["quantity"],
                    "createdBy"             => $item["createdBy"],
                    "updatedBy"             => $item["updatedBy"],
                ];
                array_push($travelData, $temp);
            }else{
                $temp = [
                    "costEstimateID"        => $item["costEstimateID"],
                    "itemID"                => $item["itemID"],
                    "itemName"	 	        => $item["itemName"],
                    "itemDescription"       => $item["itemDescription"],
                    "itemUom"	            => $item["itemUom"],
                    "categoryType"          => $item["categoryType"],
                    "quantity"              => $item["quantity"],
                    "files"                 => array_key_exists("existingFile", $item) ? $item["existingFile"] : null,
                    "createdBy"             => $item["createdBy"],
                    "updatedBy"             => $item["updatedBy"],
                ];
                array_push($itemsData, $temp);
            }
        }

        $perssonelQuery = count($personnelData)   > 0 ? $this->db->insert_batch("hris_personnel_request_tbl", $personnelData) : true; 
        $travelQuery    = count($travelData)      > 0 ? $this->db->insert_batch("ims_travel_request_tbl", $travelData)        : true;
        $itemsQuery     = count($itemsData)       > 0 ? $this->db->insert_batch("ims_request_items_tbl", $itemsData)          : true;
        
        if ($perssonelQuery && $travelQuery && $itemsQuery) {
            return "true|Successfully submitted";
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }

    public function saveCanvassingData($id){
        $sql    = "SELECT * FROM pms_cost_estimate_tbl WHERE costEstimateID = '$id'";
        $query  = $this->db->query($sql);
        $result = $query->result_array();
        $projectID  =  $result[0]["projectID"];
        $costEstimateID = $id;
        $createdBy      = $result[0]["createdBy"];
        $updatedBy      = $result[0]["updatedBy"];
            $insertSql  = "INSERT INTO ims_inventory_canvassing_tbl SET
                            `projectID`      = '$projectID',
                            `costEstimateID` = '$costEstimateID',
                            `referenceCode`  = '$costEstimateID',
                            `createdBy`      = '$createdBy',
                            `updatedBy`      = '$updatedBy',
                            `inventoryCanvassingStatus` = '5'
                        ";
            $insertQuery =  $this->db->query($insertSql);
            return $insertQuery ? true : false;
         
    }
}
