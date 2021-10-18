<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class MaterialRequest_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
    }
    
    public function saveMaterialRequestData($action, $data, $id = null) {
        if ($action == "insert") {
            $query = $this->db->insert("ims_material_request_tbl", $data);
        } else {
            $where = ["materialRequestID" => $id];
            $query = $this->db->update("ims_material_request_tbl", $data, $where);
        }

        if ($query) {
            $insertID = $action == "insert" ? $this->db->insert_id() : $id;
            $materialRequestCode = "IRF-".date("y")."-".str_pad($insertID, 5, "0", STR_PAD_LEFT);
            $updateArr = ["materialRequestCode"=> $materialRequestCode ];
            $this->db->update("ims_material_request_tbl", $updateArr, ["materialRequestID" => $insertID]);

            return "true|Successfully submitted|$insertID|".date("Y-m-d");
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }

    public function getTableRowDetails($param, $id){
        $column = $param == "item" ? "itemID, itemCode, itemName, itemDescription, itemImage," : "assetID, assetCode, assetName, assetDescription, assetImage,";
        $table  = $param == "item" ? "ims_inventory_item_tbl" : "ims_inventory_asset_tbl";
        $where  = $param == "item" ? "itemID" : "assetID";
        $sql   = "  SELECT $column brandName, categoryName, classificationName ,unitOfMeasurementID
                    FROM $table 
                        LEFT JOIN ims_inventory_category_tbl USING(categoryID) 
                        LEFT JOIN ims_inventory_classification_tbl ON ($table.classificationID = ims_inventory_classification_tbl.classificationID)  
                    WHERE $where = $id";
        $query = $this->db->query($sql);
        return $query ? $query->row() : false;
    }

    public function saveInventoryRequest($param, $data, $materialRequestID = null, $billMaterialID = null){
        // $deleteMaterialRequestItems = $this->deleteMaterialRequestItems($materialRequestID, $billMaterialID);
        $table = $param == "item" ? "ims_request_items_tbl" : "ims_request_assets_tbl ";
        $query = $this->db->insert_batch($table, $data);
        if ($query) {
            return "true|Successfully submitted";
        }
        return "false";
    }


    public function getInventoryRequest($param = "item", $materialRequestID = null, $billMaterialID = null){
        $column     = $param == "item" ? "SUM(requestQuantity) AS sumRequestQuantity" : "SUM(requestQuantity) AS sumRequestQuantity, SUM(requestManHours) AS sumRequestManHours" ;
        $table      = $param == "item" ? "ims_request_items_tbl" : "ims_request_assets_tbl";
        $groupBy    = $param == "item" ? "itemID" : "assetID"; 
        $whereBOM   = $billMaterialID ? "materialRequestID IS NULL AND billMaterialID = '$billMaterialID'" : "materialRequestID = '$materialRequestID' ";
        $sql        = "SELECT $table.* , $column FROM $table WHERE 
                                $whereBOM  AND  
                                inventoryValidationID IS NULL AND 
                                bidRecapID              IS NULL AND  
                                purchaseRequestID       IS NULL AND
                                purchaseOrderID         IS NULL AND 
                                changeRequestID         IS NULL AND
                                inventoryReceivingID    IS NULL
                    GROUP BY $groupBy";
        $query      = $this->db->query($sql);
        return $query ? $query->result_array() : [];
    }


    public function getInventoryRequestData($materialRequestID = null, $billMaterialID = null){
        $materialRequestCondition   = $billMaterialID ? null : $materialRequestID;
        $billMaterialCondition      = $billMaterialID ? $billMaterialID : null;
        $result = [
            "items"     => $this->getInventoryRequest("item", $materialRequestCondition, $billMaterialCondition),
            "assets"    => $this->getInventoryRequest("asset", $materialRequestCondition, $billMaterialCondition) 
        ];
        return $result;
    }
    
    public function insertToIVR($materialRequestID){
        $sql        = "SELECT * FROM ims_material_request_tbl WHERE materialRequestID = '$materialRequestID'";
        $query      = $this->db->query($sql);
        $result     = $query->row();
        $data       = [

                "materialRequestID"             => $result->materialRequestID,
                "materialRequestCode"           => $result->materialRequestCode,
                "costEstimateID"                => $result->costEstimateID,
                "costEstimateCode"              => $result->costEstimateCode,
                "billMaterialID"                => $result->billMaterialID,
                "billMaterialCode"              => $result->billMaterialCode,
                "timelineBuilderID"             => $result->materialRequestCode,
                "projectCode"                   => $result->projectCode,
                "projectName"                   => $result->projectName,
                "projectCategory"               => $result->projectCategory,
                "clientCode"                    => $result->clientCode,
                "clientName"                    => $result->clientName,
                "clientAddress"                 => $result->clientAddress,
                "inventoryValidationStatus"     => "0",
                "dateNeeded"                    => $result->dateNeeded,
                "inventoryValidationReason"     => $result->materialRequestReason,
                "createdBy"                     => $result->createdBy
        ];
        $queryIVR = $this->db->insert("ims_inventory_validation_tbl", $data);
    }


    // public function getInventoryRequestdata($materialRequestID = null, $billMaterialID = null){
    //     $data   =   [
    //         "items"     => getInventoryRequest("item", null, $billMaterialID),
    //         "assets"    => getInventoryRequest("asset", null, $billMaterialID)
    //     ];
    //     return $data;
    // }




}
