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
    
    public function getRequestItems($purchaseRequestID = null, $inventoryVendorID = null, $categoryType = null)
    {
        $sql = "
        SELECT 
            *
        FROM 
            ims_request_items_tbl
        WHERE
            purchaseRequestID = $purchaseRequestID AND
            inventoryVendorID = $inventoryVendorID AND
            categoryType = '$categoryType'";
        $query = $this->db->query($sql);
        return $query ? $query->result_array() : [];
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
            $sql = "SELECT * FROM ims_purchase_order_tbl WHERE purchaseOrderID = $id";
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

    public function getPurchaseOrderData($id = null)
    {
        $data = ["items" => [], "employees" => []];
        if ($id) {
            $purchaseOrderData = $this->getPurchaseOrder($id);
            if ($purchaseOrderData) {
                $data["companyName"]      = $purchaseOrderData->vendorName ?? "-";
                $data["address"]          = $purchaseOrderData->vendorAddress ?? "-";
                $data["contactDetails"]   = $purchaseOrderData->vendorContactDetails ?? "-";
                $data["contactPerson"]    = $purchaseOrderData->vendorContactPerson ?? "-";
                $data["dateAproved"]      = date("F d, Y", strtotime($purchaseOrderData->submittedAt)) ?? "-";
                $data["referenceNo"]      = $purchaseOrderData->bidRecapID ?? "-";
                $data["paymentTerms"]     = $purchaseOrderData->paymentTerms ?? "-";
                $data["deliveryDate"]     = date("F d, Y", strtotime($purchaseOrderData->deliveryDate)) ?? "-";
                $data["total"]            = $purchaseOrderData->total ?? "0";
                $data["discount"]         = $purchaseOrderData->discount ?? "0";
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
            return "true|Successfully submitted|$insertID|".date("Y-m-d");
        }
        return "false|System error: Please contact the system administrator for assistance!";
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
            return "true|Successfully submitted|$purchaseOrderID|".date("Y-m-d");
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }

}
