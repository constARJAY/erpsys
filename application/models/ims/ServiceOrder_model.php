<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class ServiceOrder_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
    }

    public function getInventoryVendor($clientID )
    {
        $sql = "
        SELECT 
            clientName,
            CONCAT(
                (IF (clientUnitNumber <> NULL OR clientUnitNumber <> '', 
                    CONCAT(UCASE(LEFT(clientUnitNumber, 1)), LCASE(SUBSTRING(clientUnitNumber, 2)),', '),
                    '')),
                (IF (clientHouseNumber <> NULL OR clientHouseNumber <> '', 
                    CONCAT(UCASE(LEFT(clientHouseNumber, 1)), LCASE(SUBSTRING(clientHouseNumber, 2)),', '),
                    '')),
                (IF (clientBarangay <> NULL OR clientBarangay <> '', 
                    CONCAT(UCASE(LEFT(clientBarangay, 1)), LCASE(SUBSTRING(clientBarangay, 2)),', '),
                    '')),
                (IF (clientCity <> NULL OR clientCity <> '', 
                    CONCAT(UCASE(LEFT(clientCity, 1)), LCASE(SUBSTRING(clientCity, 2)),', '),
                    '')),
                (IF (clientProvince <> NULL OR clientProvince <> '', 
                    CONCAT(UCASE(LEFT(clientProvince, 1)), LCASE(SUBSTRING(clientProvince, 2)),', '),
                    '')),
                (IF (clientCountry <> NULL OR clientCountry <> '', 
                    CONCAT(UCASE(LEFT(clientCountry, 1)), LCASE(SUBSTRING(clientCountry, 2)),', '),
                    '')),
                (IF (clientPostalCode <> NULL OR clientPostalCode <> '', 
                    CONCAT(UCASE(LEFT(clientPostalCode, 1)), LCASE(SUBSTRING(clientPostalCode, 2)),', '),
                    ''))
            ) AS clientAddress,
            CONCAT(IF(client_MobileNo, client_MobileNo, '-'), ' / ', IF(clientTelephoneNo, clientTelephoneNo, '-')) AS clientContactDetails,
            clientContactPerson AS clientContactPerson
        FROM 
            pms_client_tbl 
        WHERE 
            clientID  = $clientID";
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

    public function insertServiceOrder($data = [], $requestItemsID = []) {
        if ($data) {
            $query           = $this->db->insert("ims_service_order_tbl", $data);
            $serviceOrderID = $this->db->insert_id();
            if ($requestItemsID) {
                $updateSql = "
                UPDATE 
                    ims_request_items_tbl 
                SET 
                    serviceOrderID = $serviceOrderID
                WHERE
                    requestItemID IN ($requestItemsID)";
                $updateQuery = $this->db->query($updateSql);
            }
            return $query ? $serviceOrderID : false;
        }
        return false;
    }

    public function getServiceOrder($id = null)
    {
        if ($id) {
            $sql = "SELECT * FROM ims_service_order_tbl WHERE serviceOrderID = $id";
            $query = $this->db->query($sql);
            return $query ? $query->row() : false;
        }
        return false;
    }

    public function getServiceOrderItems($id = null) 
    {
        if ($id) {
            $sql   = "SELECT * FROM ims_request_items_tbl WHERE serviceOrderID = $id";
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

    public function getServiceOrderData($id = null)
    {
        $data = ["items" => [], "employees" => []];
        if ($id) {
            $purchaseOrderData = $this->getServiceOrder($id);
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
                $data["serviceOrderID"]  = $id;

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

            $purchaseOrderItems = $this->getServiceOrderItems($id);
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

    public function saveServiceOrderData($action, $data, $id = null) 
    {
        if ($action == "insert") {
            $query = $this->db->insert("ims_service_order_tbl", $data);
        } else {
            $where = ["serviceOrderID" => $id];
            $query = $this->db->update("ims_service_order_tbl", $data, $where);
        }

        if ($query) {
            $insertID = $action == "insert" ? $this->db->insert_id() : $id;
            return "true|Successfully submitted|$insertID|".date("Y-m-d");
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }

    public function saveServiceOrderItems($data, $id)
    {
        $query = $this->db->insert_batch("ims_request_items_tbl", $data);
        if ($query) {
            return "true|Successfully submitted";
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }

    public function saveServiceOrderContract($serviceOrderID = null, $filename = null)
    {
        $query = $this->db->update(
            "ims_service_order_tbl", 
            ["contractFile" => $filename],
            ["serviceOrderID" => $serviceOrderID]);
        if ($query) {
            return "true|Successfully submitted|$serviceOrderID|".date("Y-m-d");
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }

    public function saveScopes($scopes = null)
    {
        $query = $this->db->insert_batch("ims_service_scope_tbl", $scopes);
        return $query ? true : false;
    }

    public function saveServices($service = null, $scopes = null, $serviceRequisitionID = null, $serviceOrderID = null)
    {
        $sessionID = $this->session->has_userdata("adminSessionID") ? $this->session->userdata("adminSessionID") : 0;
        if ($service && $scopes) {
            $query = $this->db->insert("ims_request_services_tbl", $service);
            if ($query) {
                $insertID  = $this->db->insert_id();
                $scopeData = [];
                foreach ($scopes as $scope) {
                    $temp = [
                        "serviceRequisitionID" => $serviceRequisitionID,
                        "serviceOrderID"       => $serviceOrderID,
                        "requestServiceID"     => $insertID,
                        "description"          => $scope["description"],
                        "quantity"             => $scope["quantity"],
                        "uom"                  => $scope["uom"],
                        "unitCost"             => $scope["unitCost"],
                        "totalCost"            => $scope["totalCost"],
                        "createdBy"            => $sessionID,
                        "updatedBy"            => $sessionID,
                    ];
                    array_push($scopeData, $temp);
                }
                $saveScopes = $this->saveScopes($scopeData);
                if ($saveScopes) {
                    return true;
                }
            }
        }
        return false;
    }

}
