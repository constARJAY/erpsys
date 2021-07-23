<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class ReservationReport_model extends CI_Model {

    public function getProjectTimeline($projectID = 0)
    {
        $where = $projectID != 0 ? "ptbt.projectID = $projectID" : "ptbt.projectID <> 0"; 
        $sql   = "
        SELECT 
            timelineBuilderID, projectCode, projectListName AS projectName
        FROM 
            pms_timeline_builder_tbl AS ptbt
            LEFT JOIN pms_project_list_tbl AS pplt ON ptbt.projectID = pplt.projectListID
        WHERE $where";
        $query = $this->db->query($sql);
        return $query ? $query->result_array() : [];
    }

    public function getApprovedInventoryValidation($timelineBuilderID = 0, $dateFrom = "2021-07-01", $dateTo = "2022-07-01") 
    {
        $sql = "
        SELECT 
            * 
        FROM 
            ims_inventory_validation_tbl 
        WHERE 
            timelineBuilderID = $timelineBuilderID AND 
            updatedAt BETWEEN '$dateFrom 00:00:00' AND '$dateTo 23:59:59' AND
            inventoryValidationStatus = 2";
        $query = $this->db->query($sql);
        return $query ? $query->result_array() : [];
    }

    public function getRequestItems($inventoryValidationID = 0, $purchaseRequestID = 0)
    {
        $sql = "SELECT * FROM ims_request_items_tbl WHERE inventoryValidationID = $inventoryValidationID AND purchaseRequestID = $purchaseRequestID AND bidRecapID IS NULL";
        $query = $this->db->query($sql);
        return $query ? $query->result_array() : [];
    }

    public function getItems($data = [], $projectCode, $projectName, $updatedAt)
    {
        $temp = [
            "id"                => $data["requestItemID"],
            "projectCode"       => $projectCode,
            "projectName"       => $projectName,
            "itemName"          => $data["itemName"],
            "itemUom"           => $data["itemUom"],
            "reservedQuantity"  => $data["stocks"] ?? 0,
            "dateReserved"      => $updatedAt,
            "materialUsageCode" => "",
        ];
        return $temp;
    }

    public function getReservationData($projectID, $dateFrom, $dateTo)
    {
        $data = [];
        $timelines = $this->getProjectTimeline($projectID);
        foreach($timelines as $timeline) {
            $timelineBuilderID = $timeline["timelineBuilderID"];
            $projectCode       = $timeline["projectCode"];
            $projectName       = $timeline["projectName"];
            $validations = $this->getApprovedInventoryValidation($timelineBuilderID, $dateFrom, $dateTo);
            foreach($validations as $validation) {
                $inventoryValidationID = $validation["inventoryValidationID"];
                $purchaseRequestID     = $validation["purchaseRequestID"];
                $updatedAt             = $validation["updatedAt"];
                $items = $this->getRequestItems($inventoryValidationID, $purchaseRequestID);
                foreach($items as $item) {
                    $temp  = $this->getItems($item, $projectCode, $projectName, $updatedAt);
                    array_push($data, $temp);
                }
            }
        }

        return $data;

        // $data = [
        //     [
        //         "id" => 1,
        //         "projectCode" => "PRJ-21-00001",
        //         "projectName" => "BlackBox Accounting System",
        //         "itemName" => "Towel",
        //         "itemUom" => "piece",
        //         "reservedQuantity" => 5,
        //         "dateReserved" => "2021-05-12",
        //         "materialUsageCode" => "MTR-21-00001"
        //     ],
        //     [
        //         "id" => 2,
        //         "projectCode" => "PRJ-21-00001",
        //         "projectName" => "BlackBox Accounting System",
        //         "itemName" => "Towel",
        //         "itemUom" => "piece",
        //         "reservedQuantity" => 5,
        //         "dateReserved" => "2021-05-12",
        //         "materialUsageCode" => "MTR-21-00001"
        //     ],
        //     [
        //         "id" => 3,
        //         "projectCode" => "PRJ-21-00001",
        //         "projectName" => "BlackBox Accounting System",
        //         "itemName" => "Towel",
        //         "itemUom" => "piece",
        //         "reservedQuantity" => 5,
        //         "dateReserved" => "2021-05-12",
        //         "materialUsageCode" => "MTR-21-00001"
        //     ],
        //     [
        //         "id" => 4,
        //         "projectCode" => "PRJ-21-00001",
        //         "projectName" => "BlackBox Accounting System",
        //         "itemName" => "Towel",
        //         "itemUom" => "piece",
        //         "reservedQuantity" => 5,
        //         "dateReserved" => "2021-05-12",
        //         "materialUsageCode" => "MTR-21-00001"
        //     ],
        //     [
        //         "id" => 5,
        //         "projectCode" => "PRJ-21-00001",
        //         "projectName" => "BlackBox Accounting System",
        //         "itemName" => "Towel",
        //         "itemUom" => "piece",
        //         "reservedQuantity" => 5,
        //         "dateReserved" => "2021-05-12",
        //         "materialUsageCode" => "MTR-21-00001"
        //     ],
        // ];
        // return $data;
    }

}
