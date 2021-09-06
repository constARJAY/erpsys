<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class PurchaseOrder_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
    }

    public function getInventoryVendor($inventoryVendorID)
    {
        $sql = "
        SELECT 
            inventoryVendorName AS vendorName,
            CONCAT(
                (IF (inventoryVendorUnit <> NULL OR inventoryVendorUnit <> '', 
                    CONCAT(UCASE(LEFT(inventoryVendorUnit, 1)), LCASE(SUBSTRING(inventoryVendorUnit, 2)),', '),
                    '')),
                (IF (inventoryVendorStreet <> NULL OR inventoryVendorStreet <> '', 
                    CONCAT(UCASE(LEFT(inventoryVendorStreet, 1)), LCASE(SUBSTRING(inventoryVendorStreet, 2)),', '),
                    '')),
                (IF (inventoryVendorSubdivision <> NULL OR inventoryVendorSubdivision <> '', 
                    CONCAT(UCASE(LEFT(inventoryVendorSubdivision, 1)), LCASE(SUBSTRING(inventoryVendorSubdivision, 2)),', '),
                    '')),
                (IF (inventoryVendorBarangay <> NULL OR inventoryVendorBarangay <> '', 
                    CONCAT(UCASE(LEFT(inventoryVendorBarangay, 1)), LCASE(SUBSTRING(inventoryVendorBarangay, 2)),', '),
                    '')),
                (IF (inventoryVendorCity <> NULL OR inventoryVendorCity <> '', 
                    CONCAT(UCASE(LEFT(inventoryVendorCity, 1)), LCASE(SUBSTRING(inventoryVendorCity, 2)),', '),
                    '')),
                (IF (inventoryVendorProvince <> NULL OR inventoryVendorProvince <> '', 
                    CONCAT(UCASE(LEFT(inventoryVendorProvince, 1)), LCASE(SUBSTRING(inventoryVendorProvince, 2)),', '),
                    '')),
                (IF (inventoryVendorCountry <> NULL OR inventoryVendorCountry <> '', 
                    CONCAT(UCASE(LEFT(inventoryVendorCountry, 1)), LCASE(SUBSTRING(inventoryVendorCountry, 2)),', '),
                    '')),
                (IF (inventoryVendorZipCode <> NULL OR inventoryVendorZipCode <> '', 
                    CONCAT(UCASE(LEFT(inventoryVendorZipCode, 1)), LCASE(SUBSTRING(inventoryVendorZipCode, 2)),', '),
                    ''))
            ) AS vendorAddress,
            CONCAT(IF(inventoryVendorMobile, inventoryVendorMobile, '-'), ' / ', IF(inventoryVendorTelephone, inventoryVendorTelephone, '-')) AS vendorContactDetails,
            inventoryVendorPerson AS vendorContactPerson
        FROM 
            ims_inventory_vendor_tbl 
        WHERE 
            inventoryVendorID = $inventoryVendorID";
        $query = $this->db->query($sql);
        return $query ? $query->row() : false;
    }

    public function getRequestItem($requestItemID = null) 
    {
        if ($requestItemID) {
            $sql   = "SELECT * FROM ims_request_items_tbl WHERE requestItemID = $requestItemID";
            $query = $this->db->query($sql);
            return $query ? $query->row() : null;
        }
        return null;
    }

    public function deleteRequestItems($purchaseRequestID = null, $bidRecapID = null, $purchaseOrderID = null)
    {
        $query = $this->db->delete("ims_request_items_tbl", [
            "purchaseRequestID" => $purchaseRequestID,
            "bidRecapID"        => $bidRecapID,
            "purchaseOrderID"   => $purchaseOrderID,
        ]);
        return $query ? true : false;
    }

    public function insertPurchaseOrder($data = [], $requestItemsID = []) {
        if ($data) {
            $query           = $this->db->insert("ims_purchase_order_tbl", $data);
            $purchaseOrderID = $this->db->insert_id();
            if ($requestItemsID) {
                $updateSql = "
                UPDATE 
                    ims_request_items_tbl 
                SET 
                    purchaseOrderID = $purchaseOrderID
                WHERE
                    requestItemID IN ($requestItemsID)";
                $updateQuery = $this->db->query($updateSql);
            }
            return $query ? $purchaseOrderID : false;
        }
        return false;
    }

    public function getPurchaseOrder($id = null)
    {
        if ($id) {
            $sql = "
            SELECT 
                ipot.*, ibrt.createdAt AS ibrtCreatedAt 
            FROM 
                ims_purchase_order_tbl AS ipot 
                LEFT JOIN ims_bid_recap_tbl AS ibrt USING(bidRecapID)
            WHERE ipot.purchaseOrderID = $id";
            $query = $this->db->query($sql);
            return $query ? $query->row() : false;
        }
        return false;
    }

    public function getPurchaseOrderItems($id = null) 
    {
        if ($id) {
            $sql   = "SELECT * FROM ims_request_items_tbl WHERE purchaseOrderID = $id";
            $query = $this->db->query($sql);
            return $query ? $query->result_array() : [];
        }
        return [];
    }

    public function getEmployeeInformation($id = null) {
        if ($id) {
            $sql = "
            SELECT 
                CONCAT(helt.employeeFirstname, ' ', helt.employeeLastname) AS fullname,
                designationName
            FROM 
                hris_employee_list_tbl AS helt 
                LEFT JOIN hris_designation_tbl USING(designationID)
            WHERE employeeID = $id";
            $query = $this->db->query($sql);
            return $query ? $query->row() : null;
        }
        return null;
    }

    public function getPurchaseOrderData($id = null){
        $data = ["items" => [], "employees" => []];
        if ($id) {
            $purchaseOrderData = $this->getPurchaseOrder($id);
            if ($purchaseOrderData) {
                $data["companyName"]      = $purchaseOrderData->vendorName ?? "-";
                $data["address"]          = $purchaseOrderData->vendorAddress ?? "-";
                $data["contactDetails"]   = $purchaseOrderData->vendorContactDetails ?? "-";
                $data["contactPerson"]    = $purchaseOrderData->vendorContactPerson ?? "-";
                $data["dateAproved"]      = date("F d, Y", strtotime($purchaseOrderData->submittedAt)) ?? "-";
                $data["referenceNo"]      = $purchaseOrderData->bidRecapID ? getFormCode("BRF", $purchaseOrderData->ibrtCreatedAt, $purchaseOrderData->bidRecapID) : "-";
                $data["paymentTerms"]     = $purchaseOrderData->paymentTerms ?? "-";
                $data["deliveryDate"]     = date("F d, Y", strtotime($purchaseOrderData->deliveryDate)) ?? "-";
                $data["total"]            = $purchaseOrderData->total ?? "0";
                $data["discount"]         = $purchaseOrderData->discount ?? "0";
                $data["discountType"]     = $purchaseOrderData->discountType;
                $data["totalAmount"]      = $purchaseOrderData->totalAmount ?? "0";
                $data["vatSales"]         = $purchaseOrderData->vatSales ?? "0";
                $data["vat"]              = $purchaseOrderData->vat ?? "0";
                $data["totalVat"]         = $purchaseOrderData->totalVat ?? "0";
                $data["lessEwt"]          = $purchaseOrderData->lessEwt ?? "0";
                $data["grandTotalAmount"] = $purchaseOrderData->grandTotalAmount ?? "0";
                $data["createdAt"]        = $purchaseOrderData->createdAt ?? date("Y-m-d");
                $data["purchaseOrderID"]  = $id;

                $preparedID  = $purchaseOrderData->employeeID;
                $approversID = $purchaseOrderData->approversID;
                $approversID = explode("|", $approversID);
                $employeesID = array_merge([$preparedID], $approversID);
                foreach ($employeesID as $index => $employeeID) {
                    $employeeData = $this->getEmployeeInformation($employeeID);
                    if ($index == 0) {
                        $title = "Prepared By";
                    } else if (($index+1) == count($employeesID)) {
                        $title = "Approved By";
                    } else {
                        $title = "Checked By";
                    }
                    $employee = [
                        "title"    => $title,
                        "name"     => $employeeData->fullname,
                        "position" => $employeeData->designationName
                    ];
                    array_push($data["employees"], $employee);
                }
            }

            $purchaseOrderItems = $this->getPurchaseOrderItems($id);
            foreach ($purchaseOrderItems as $item) {
                $temp = [
                    "code"        => getFormCode("ITM", $item["createdAt"], $item["itemID"]),
                    "desc"        => $item["itemName"]." - ".$item["itemDescription"],
                    "qty"         => $item["quantity"],
                    "unit"        => $item["itemUom"],
                    "unitcost"    => $item["unitCost"],
                    "totalamount" => $item["totalCost"]
                ];
                array_push($data["items"], $temp);
            }
        }
        return $data;
    }

    public function savePurchaseOrderData($action, $data, $id = null) 
    {
        if ($action == "insert") {
            $query = $this->db->insert("ims_purchase_order_tbl", $data);
        } else {
            $where = ["purchaseOrderID" => $id];
            $query = $this->db->update("ims_purchase_order_tbl", $data, $where);
        }

        if ($query) {
            $insertID = $action == "insert" ? $this->db->insert_id() : $id;
            // ----- UPDATE BID ITEMS -----
            $poData            = $this->getPurchaseOrder($id);
            $bidRecapID        = $poData->bidRecapID ?? $data["bidRecapID"];
            $inventoryVendorID = $poData->inventoryVendorID ?? $data["inventoryVendorID"];
            $status            = $data["purchaseOrderStatus"];
            if ($bidRecapID && $bidRecapID != "" && $inventoryVendorID && $inventoryVendorID != "") {
                if($status != 3 && $status != 4){
                    $itemStatus = 1;
                }else{
                    $itemStatus = 0;
                }
                if ($bidRecapID != 0 && $inventoryVendorID != 0){
                    $primaryKey    = $this->getPOPrimaryID($bidRecapID, $inventoryVendorID);
                    $updateSql     = "UPDATE ims_bid_po_tbl SET bidPoStatus = $itemStatus WHERE bidPoID IN ($primaryKey)";
                    $updateQuery   = $this->db->query($updateSql);
                    if(!$updateQuery){
                        return "false|System error: Please contact the system administrator for assistance!!";
                    }
                }
            }
            // ----- END UPDATE BID ITEMS -----
            return "true|Successfully submitted|$insertID|".date("Y-m-d");
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }

    public function getPOPrimaryID($bidRecapID, $inventoryVendorID){
        $sql    = "SELECT GROUP_CONCAT(bidPoID SEPARATOR ',') AS primaryKey FROM ims_bid_po_tbl WHERE bidRecapID = '$bidRecapID' AND inventoryVendorID = '$inventoryVendorID' ";
        $query  = $this->db->query($sql);
        $result = $query->result_array();
        $status = count($result) > 0 ? true : false;
        foreach ($query->result() as $row)
        {
                $primaryKey =  $row->primaryKey;
        }
        return  $status ? $primaryKey : false;
    }

    public function savePurchaseOrderItems($data, $id)
    {
        $query = $this->db->insert_batch("ims_request_items_tbl", $data);
        if ($query) {
            return "true|Successfully submitted";
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }

    public function savePurchaseOrderContract($purchaseOrderID = null, $filename = null)
    {
        $query = $this->db->update(
            "ims_purchase_order_tbl", 
            ["contractFile" => $filename],
            ["purchaseOrderID" => $purchaseOrderID]);
        if ($query) {
            return "true|$filename|$purchaseOrderID|".date("Y-m-d");
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }

    public function getPhases($purchaseOrderID = 0, $bidRecapID = 0, $inventoryVendorID = 0)
    {
        $wherePO = $purchaseOrderID && $purchaseOrderID > 0 ? "AND purchaseOrderID = $purchaseOrderID" : "AND purchaseOrderID IS NULL";
        $sql = "
        SELECT 
            milestoneBuilderID, phaseDescription
        FROM 
            ims_request_items_tbl 
        WHERE 
            milestoneBuilderID IS NOT NULL AND
            phaseDescription IS NOT NULL AND
            milestoneListID IS NOT NULL AND
            projectMilestoneID IS NOT NULL AND
            projectMilestoneName IS NOT NULL AND
            bidRecapID = $bidRecapID AND
            inventoryVendorID = $inventoryVendorID
            $wherePO 
        GROUP BY milestoneBuilderID";
        $query = $this->db->query($sql);
        return $query ? $query->result_array() : [];
    }

    public function getMilestones($purchaseOrderID = 0, $bidRecapID = 0, $inventoryVendorID = 0, $milestoneBuilderID = 0) {
        $wherePO = $purchaseOrderID && $purchaseOrderID > 0 ? "AND purchaseOrderID = $purchaseOrderID" : "AND purchaseOrderID IS NULL";
        $sql = "
        SELECT 
            projectMilestoneID, projectMilestoneName
        FROM 
            ims_request_items_tbl 
        WHERE 
            milestoneBuilderID IS NOT NULL AND
            phaseDescription IS NOT NULL AND
            milestoneListID IS NOT NULL AND
            projectMilestoneID IS NOT NULL AND
            projectMilestoneName IS NOT NULL AND
            bidRecapID = $bidRecapID AND 
            inventoryVendorID = $inventoryVendorID AND
            milestoneBuilderID = $milestoneBuilderID 
            $wherePO
        GROUP BY projectMilestoneID";
        $query = $this->db->query($sql);
        return $query ? $query->result_array() : [];
    }

    public function getMilestoneItems($purchaseOrderID = 0, $bidRecapID = 0, $inventoryVendorID = 0, $milestoneBuilderID = 0, $projectMilestoneID = 0)
    {
        $wherePO = $purchaseOrderID && $purchaseOrderID > 0 ? "AND purchaseOrderID = $purchaseOrderID" : "AND purchaseOrderID IS NULL";
        $sql = "
        SELECT 
            *
        FROM 
            ims_request_items_tbl 
        WHERE 
            milestoneBuilderID IS NOT NULL AND
            phaseDescription IS NOT NULL AND
            milestoneListID IS NOT NULL AND
            projectMilestoneID IS NOT NULL AND
            projectMilestoneName IS NOT NULL AND
            bidRecapID = $bidRecapID AND 
            inventoryVendorID = $inventoryVendorID AND
            milestoneBuilderID = $milestoneBuilderID AND
            projectMilestoneID = $projectMilestoneID
            $wherePO";
        $query = $this->db->query($sql);
        return $query ? $query->result_array() : [];
    }

    public function getProjectPhases($purchaseOrderID = 0, $bidRecapID = 0, $inventoryVendorID = 0)
    {
        $result = [];
        $phases = $this->getPhases($purchaseOrderID, $bidRecapID, $inventoryVendorID);
        foreach($phases as $phase) {
            $milestoneBuilderID = $phase["milestoneBuilderID"];
            $phaseDescription   = $phase["phaseDescription"];

            $milestones = $this->getMilestones($purchaseOrderID, $bidRecapID, $inventoryVendorID, $milestoneBuilderID);
            $milestoneItems = [];
            foreach($milestones as $milestone) {
                $projectMilestoneID   = $milestone["projectMilestoneID"];
                $projectMilestoneName = $milestone["projectMilestoneName"];

                $temp2 = [
                    "projectMilestoneID" => $projectMilestoneID,
                    "name"  => $projectMilestoneName,
                    "items" => $this->getMilestoneItems($purchaseOrderID, $bidRecapID, $inventoryVendorID, $milestoneBuilderID, $projectMilestoneID)
                ];
                array_push($milestoneItems, $temp2);
            }
            $temp = [
                "milestoneBuilderID" => $milestoneBuilderID,
                "phaseDescription"   => $phaseDescription,
                "milestones"         => $milestoneItems,
            ];
            array_push($result, $temp);
        }
        return $result;
    }

    public function getMaterialEquipmentRequestItems($purchaseOrderID = 0, $bidRecapID = 0, $inventoryVendorID = 0)
    {
        $classifications = $this->getPurchaseRequestClassification($purchaseOrderID, $bidRecapID, $inventoryVendorID);
        $result = [];
        foreach($classifications as $classification) {
            $itemClassification = $classification["itemClassification"];
            $temp = [
                "name"  => $itemClassification,
                "items" => $this->getPurchaseRequestItems($purchaseOrderID, $bidRecapID, $inventoryVendorID, $itemClassification)
            ];
            array_push($result, $temp);
        }
        return $result;
    }

    public function getPurchaseRequestClassification($purchaseOrderID = 0, $bidRecapID = 0, $inventoryVendorID = 0)
    {
        $result = [];
        if ($purchaseOrderID && $purchaseOrderID > 0 || $bidRecapID && $bidRecapID > 0) {
            $wherePO  = $purchaseOrderID && $purchaseOrderID > 0 ? "AND purchaseOrderID = $purchaseOrderID" : "AND purchaseOrderID IS NULL";
            $whereBR = $bidRecapID && $bidRecapID > 0 ? "AND bidRecapID = $bidRecapID" : "";
            $sql = "
            SELECT 
                itemClassification
            FROM 
                ims_request_items_tbl 
            WHERE 
                (inventoryValidationID IS NULL OR inventoryValidationID = 0) AND
                inventoryVendorID = $inventoryVendorID
                $wherePO
                $whereBR
            GROUP BY itemClassification";
            $query = $this->db->query($sql);
            $result = $query ? $query->result_array() : [];
        }
        return $result;
    }

    public function getPurchaseRequestItems($purchaseOrderID = 0, $bidRecapID = 0, $inventoryVendorID = 0, $itemClassification = "")
    {
        $result = [];
        if ($purchaseOrderID && $purchaseOrderID > 0 || $bidRecapID && $bidRecapID > 0) {
            $wherePO  = $purchaseOrderID && $purchaseOrderID > 0 ? "AND purchaseOrderID = $purchaseOrderID" : "AND purchaseOrderID IS NULL";
            $whereBR = $bidRecapID && $bidRecapID > 0 ? "AND bidRecapID = $bidRecapID" : "";
            $sql = "
            SELECT 
                *
            FROM 
                ims_request_items_tbl 
            WHERE 
                milestoneBuilderID IS NULL AND
                phaseDescription IS NULL AND
                milestoneListID IS NULL AND
                projectMilestoneID IS NULL AND
                projectMilestoneName IS NULL AND
                (inventoryValidationID IS NULL OR inventoryValidationID = 0) AND
                inventoryVendorID = $inventoryVendorID AND
                itemClassification = BINARY('$itemClassification')
                $wherePO 
                $whereBR";
            $query = $this->db->query($sql);
            $result = $query ? $query->result_array() : [];
        }
        return $result;
    }

    public function getRequestItems($purchaseOrderID = 0, $bidRecapID = 0, $inventoryVendorID = 0)
    {
        $result = [
            "phases" => $this->getProjectPhases($purchaseOrderID, $bidRecapID, $inventoryVendorID),
            "materialsEquipment" => $this->getMaterialEquipmentRequestItems($purchaseOrderID, $bidRecapID, $inventoryVendorID)
        ];
        return $result;
    }

}
