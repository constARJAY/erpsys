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

}
