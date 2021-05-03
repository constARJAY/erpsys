<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class ServiceOrder_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
    }

    public function getServiceOrder($id = null)
    {
        if ($id) {
            $sql = "
            SELECT 
                isot.*,
                isrt.createdAt AS srCreatedAt
            FROM 
                ims_service_order_tbl AS isot 
                LEFT JOIN ims_service_requisition_tbl AS isrt USING(serviceRequisitionID)
            WHERE serviceOrderID = $id";
            $query = $this->db->query($sql);
            return $query ? $query->row() : false;
        }
        return false;
    }

    public function getServiceScopeItems($id = null)
    {
        if ($id) {
            $sql = "SELECT * FROM ims_service_scope_tbl WHERE requestServiceID = $id";
            $query = $this->db->query($sql);
            return $query ? $query->result_array() : [];
        }
        return [];
    }

    public function getServiceOrderItems($id = null) 
    {
        if ($id) {
            $sql   = "
            SELECT 
                requestServiceID,
                irst.serviceName, 
                irst.serviceID,
                ist.createdAt AS istCreatedAt
            FROM ims_request_services_tbl AS irst 
                LEFT JOIN ims_services_tbl AS ist USING(serviceID)
            WHERE serviceOrderID = $id";
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
            $soData = $this->getServiceOrder($id);
            if ($soData) {
                $data["companyName"]      = $soData->clientName ?? "-";
                $data["address"]          = $soData->clientAddress ?? "-";
                $data["contactDetails"]   = $soData->clientContactDetails ?? "-";
                $data["contactPerson"]    = $soData->clientContactPerson ?? "-";
                $data["dateAproved"]      = date("F d, Y", strtotime($soData->submittedAt)) ?? "-";
                $data["referenceNo"]      = $soData->serviceRequisitionID ? getFormCode("SR", $soData->srCreatedAt, $soData->serviceRequisitionID) : "-";
                $data["paymentTerms"]     = $soData->paymentTerms ?? "-";
                $data["scheduleDate"]     = date("F d, Y", strtotime($soData->scheduleDate)) ?? "-";
                $data["total"]            = $soData->total ?? "0";
                $data["discount"]         = $soData->discount ?? "0";
                $data["totalAmount"]      = $soData->totalAmount ?? "0";
                $data["vatSales"]         = $soData->vatSales ?? "0";
                $data["vat"]              = $soData->vat ?? "0";
                $data["totalVat"]         = $soData->totalVat ?? "0";
                $data["lessEwt"]          = $soData->lessEwt ?? "0";
                $data["grandTotalAmount"] = $soData->grandTotalAmount ?? "0";
                $data["createdAt"]        = $soData->createdAt ?? date("Y-m-d");
                $data["serviceOrderID"]  = $id;

                $preparedID  = $soData->employeeID;
                $approversID = $soData->approversID;
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

            $serviceOrderItems = $this->getServiceOrderItems($id);
            foreach ($serviceOrderItems as $item) {
                $requestServiceID = $item["requestServiceID"];
                $seviceScopeItems = $this->getServiceScopeItems($requestServiceID);
                $scopes = [];
                foreach ($seviceScopeItems as $scope) {
                    $temp = [
                        "description" => $scope["description"],
                        "quantity"    => $scope["quantity"],
                        "uom"         => $scope["uom"],
                        "unitCost"    => $scope["unitCost"],
                        "totalCost"   => $scope["totalCost"],
                    ];
                    array_push($scopes, $temp);
                }

                $temp = [
                    "serviceCode" => getFormCode("SVC", $item["istCreatedAt"], $item["serviceID"]),
                    "serviceName" => $item["serviceName"],
                    "scopes"      => $scopes
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

            // ----- SAVE TO SERVICE ORDER -----
            if ($data["serviceOrderStatus"] == 2) {
                $insertToServiceCompletion = $this->saveServiceCompletion($insertID);
            }
            // ----- END SAVE TO SERVICE ORDER -----

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


    // ----- SAVE TO SERVICE COMPLETION -----
    
    public function saveServiceCompletion($id = null)
    {
        $sessionID = $this->session->has_userdata("adminSessionID") ? $this->session->userdata("adminSessionID") : 0;

        $soData = $this->getServiceOrder($id);
        if ($soData) {
            $employeeID       = $soData->employeeID;
            $total            = (float)$soData->serviceRequisitionTotalAmount;
            $discount         = 0;
            $totalAmount      = $total - $discount;
            $vat              = $totalAmount * 0.12;
            $vatSales         = $totalAmount - $vat;
            $totalVat         = $vatSales + $vat;
            $lessEwt          = $totalVat * 0.01;
            $grandTotalAmount = $totalVat - $lessEwt;
            $approversID      = null;
            $approversStatus  = null;
            $approversDate    = null;

            $soData = [
                "serviceRequisitionID" => $id,
                "employeeID"           => $employeeID,
                "clientID"             => $soData->clientID,
                "projectID"            => $soData->projectID,
                "clientName"           => $soData->clientName,
                "clientAddress"        => $soData->clientAddress,
                "clientContactDetails" => $soData->clientContactDetails,
                "clientContactPerson"  => $soData->clientContactPerson,
                "total"                => $total,
                "discount"             => $discount,
                "totalAmount"          => $totalAmount,
                "vatSales"             => $vatSales,
                "vat"                  => $vat,
                "totalVat"             => $totalVat,
                "lessEwt"              => $lessEwt,
                "grandTotalAmount"     => $grandTotalAmount,
                "approversID"          => $approversID,
                "approversStatus"      => $approversStatus,
                "approversDate"        => $approversDate,
                "serviceOrderStatus"   => 0,
                "createdBy"            => $sessionID,
                "updatedBy"            => $sessionID,
            ];

            $query = $this->db->insert("ims_service_order_tbl", $soData);
            if ($query) {
                $insertID = $this->db->insert_id();
                $this->updateServices($id, $insertID);
            }
        }
    }

    // ----- END SAVE TO SERVICE COMPLETION -----

}
