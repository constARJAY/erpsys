<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class ServiceRequisition_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
    }

    public function getServiceRequisitionData($id = null) {
        if ($id) {
            $sql = "SELECT * FROM  ims_service_requisition_tbl WHERE serviceRequisitionID = $id";
            $query = $this->db->query($sql);
            return $query ? $query->row() : null;
        }
        return null;
    }

    public function saveServiceRequisitionData($action, $data, $id = null) 
    {
        if ($action == "insert") {
            $query = $this->db->insert("ims_service_requisition_tbl", $data);
        } else {
            $where = ["serviceRequisitionID" => $id];
            $query = $this->db->update("ims_service_requisition_tbl", $data, $where);
        }

        if ($query) {
            $insertID = $action == "insert" ? $this->db->insert_id() : $id;
            return "true|Successfully submitted|$insertID|".date("Y-m-d");
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }

    public function deleteServicesAndScopes($id = 0)
    {
        $query1 = $this->db->delete(
            "ims_request_services_tbl", 
            [
                "serviceRequisitionID" => $id,
                "serviceOrderID"       => NULL,
                "serviceCompletionID"  => NULL
            ]);
        $query2 = $this->db->delete("ims_service_scope_tbl", ["serviceRequisitionID" => $id]);
        return $query1 && $query2 ? true : false;
    }

    public function saveScopes($scopes = null)
    {
        $query = $this->db->insert_batch("ims_service_scope_tbl", $scopes);
        return $query ? true : false;
    }

    public function saveServices($service = null, $scopes = null, $id = null)
    {
        $sessionID = $this->session->has_userdata("adminSessionID") ? $this->session->userdata("adminSessionID") : 0;
        if ($service && $scopes) {
            $query = $this->db->insert("ims_request_services_tbl", $service);
            if ($query) {
                $insertID  = $this->db->insert_id();
                $scopeData = [];
                foreach ($scopes as $scope) {
                    $temp = [
                        "serviceRequisitionID" => $id,
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
    

    // ----- SAVE SERVICE ORDER -----
    public function getRequestServiceScope($serviceRequisitionID = 0, $requestServiceID = 0)
    {
        $sql = "SELECT * FROM ims_service_scope_tbl WHERE serviceRequisitionID = $serviceRequisitionID AND requestServiceID = $requestServiceID AND serviceOrderID IS NULL";
        $query = $this->db->query($sql);
        return $query ? $query->result_array() : [];
    }

    public function getRequestService($serviceRequisitionID = 0)
    {
        $sql = "SELECT * FROM ims_request_services_tbl WHERE serviceRequisitionID = $serviceRequisitionID AND serviceOrderID IS NULL";
        $query = $this->db->query($sql);
        return $query ? $query->result_array() : [];
    }

    public function insertServiceOrderItems($serviceRequisitionID = 0, $serviceOrderID = 0)
    {
        $sessionID = $this->session->has_userdata('adminSessionID') ? $this->session->userdata('adminSessionID') : 0;

        $serviceScopeData = [];
        $requestService = $this->getRequestService($serviceRequisitionID);
        if (!empty($requestService)) {
            foreach($requestService as $service) {
                $requestServiceID = $service["requestServiceID"];

                $requestServiceData = [
                    'serviceRequisitionID' => $serviceRequisitionID,
                    'serviceOrderID'       => $serviceOrderID,
                    'serviceID'            => $service['serviceID'],
                    'serviceName'          => $service['serviceName'],
                    'serviceDateFrom'      => $service['serviceDateFrom'],
                    'serviceDateTo'        => $service['serviceDateTo'],
                    'remarks'              => $service['remarks'],
                    'createdBy'            => $sessionID,
                    'updatedBy'            => $sessionID,
                ];
                $insertRequestServiceData = $this->db->insert("ims_request_services_tbl", $requestServiceData);
                if ($insertRequestServiceData) {
                    $newRequestServiceID = $this->db->insert_id();

                    $requestServiceScope = $this->getRequestServiceScope($serviceRequisitionID, $requestServiceID);
                    if (!empty($requestServiceScope)) {
                        $scopes = [];
                        foreach($requestServiceScope as $scope) {
                            $scopes[] = [
                                'serviceRequisitionID' => $serviceRequisitionID,
                                'serviceOrderID'       => $serviceOrderID,
                                'requestServiceID'     => $newRequestServiceID,
                                'description'          => $scope['description'],
                                'quantity'             => $scope['quantity'],
                                'uom'                  => $scope['uom'],
                                'unitCost'             => $scope['unitCost'],
                                'totalCost'            => $scope['totalCost'],
                                'file'                 => $scope['file'],
                                'createdBy'            => $sessionID,
                                'updatedBy'            => $sessionID,
                            ];
                        }
                        if (!empty($scopes)) {
                            $insertRequestServiceScope = $this->db->insert_batch("ims_service_scope_tbl", $scopes);
                        }
                    }
                }
            }
        }
    }

    public function insertServiceOrderData($serviceRequisitionID = 0)
    {
        $sessionID = $this->session->has_userdata('adminSessionID') ? $this->session->userdata('adminSessionID') : 0;

        $serviceRequisitionData = $this->getServiceRequisitionData($serviceRequisitionID);
        if (!empty($serviceRequisitionData)) {
            $data = [
                'serviceRequisitionID' => $serviceRequisitionID,
                'employeeID'           => 0,
                'projectID'            => $serviceRequisitionData->projectID,
                'projectCode'          => $serviceRequisitionData->projectCode,
                'projectName'          => $serviceRequisitionData->projectName,
                'projectCategory'      => $serviceRequisitionData->projectCategory,
                'clientID'             => $serviceRequisitionData->clientID,
                'clientCode'           => $serviceRequisitionData->clientCode,
                'clientName'           => $serviceRequisitionData->clientName,
                'clientAddress'        => $serviceRequisitionData->clientAddress,
                'clientContactDetails' => $serviceRequisitionData->clientContactDetails,
                'clientContactPerson'  => $serviceRequisitionData->clientContactPerson,
                'serviceOrderStatus'   => 0,
                'createdBy'            => $sessionID,
                'updatedBy'            => $sessionID,
            ];
            $query = $this->db->insert("ims_service_order_tbl", $data);
            if ($query) {
                $serviceOrderID = $this->db->insert_id();
                $this->insertServiceOrderItems($serviceRequisitionID, $serviceOrderID);
                return true;
            }
        }
        return false;
    }
    // ----- END SAVE SERVICE ORDER -----


}
