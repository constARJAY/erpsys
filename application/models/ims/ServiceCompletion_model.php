<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class ServiceCompletion_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
    }

    public function saveServiceCompletionData($action, $data, $id = null) 
    {
        if ($action == "insert") {
            $query = $this->db->insert("ims_service_completion_tbl", $data);
        } else {
            $where = ["serviceCompletionID" => $id];
            $query = $this->db->update("ims_service_completion_tbl", $data, $where);
        }

        if ($query) {
            $insertID = $action == "insert" ? $this->db->insert_id() : $id;
            return "true|Successfully submitted|$insertID|".date("Y-m-d");
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }

    public function getServiceCompletion($id = null)
    {
        if ($id) {
            $sql = "SELECT * FROM ims_service_completion_tbl WHERE serviceCompletionID = $id";
            $query = $this->db->query($sql);
            return $query ? $query->row() : null;
        }
        return null;
    }

    public function getRequestServices($id) 
    {
        $sql   = "SELECT * FROM ims_request_services_tbl WHERE requestServiceID = $id";
        $query = $this->db->query($sql);
        return $query ? $query->row() : [];
    }

    public function getServiceScope($id) 
    {
        $sql   = "SELECT * FROM ims_service_scope_tbl WHERE scopeID = $id";
        $query = $this->db->query($sql);
        return $query ? $query->row() : [];
    }

    public function insertRequestService($data = [])
    {
        if ($data) {
            $query = $this->db->insert("ims_request_services_tbl", $data);
            if ($query) {
                $insertID = $this->db->insert_id();
                return $insertID;
            }  
            return false;
        }  
        return false;
    }

    public function insertServiceScope($data = [])
    {
        if ($data) {
            $query = $this->db->insert_batch("ims_service_scope_tbl", $data);
            return $query ? true : false;
        }  
        return false;
    }

    public function updateServices($servicesData, $scopesData, $action, $serviceCompletionID = null)
    {
        if ($action == "update") {
            $serviceQuery = $this->db->update_batch("ims_request_services_tbl", $servicesData, "requestServiceID");
            $scopeQuery = $this->db->update_batch("ims_service_scope_tbl", $scopesData, "scopeID");
            return $serviceQuery && $scopeQuery ? true : false;
        } else {
            foreach ($servicesData as $service) {
                $serviceRequestServiceID = $service["requestServiceID"];
                $serviceData = $this->getRequestServices($serviceRequestServiceID);
                $requestServiceData = [
                    "serviceRequisitionID" => $serviceData->serviceRequisitionID,
                    "serviceOrderID"       => $serviceData->serviceOrderID,
                    "serviceCompletionID"  => $serviceCompletionID,
                    "serviceID"            => $serviceData->serviceID,
                    "serviceName"          => $serviceData->serviceName,
                    "serviceDateFrom"      => $service["serviceDateFrom"],
                    "serviceDateTo"        => $service["serviceDateTo"],
                    "remarks"              => $serviceData->remarks,
                    "createdBy"            => $serviceData->createdBy,
                    "updatedBy"            => $service["updatedBy"],
                ];

                $newRequestServiceID = $this->insertRequestService($requestServiceData);
                if ($newRequestServiceID) {
                    $dataScope = [];
                    foreach ($scopesData as $scope) {
                        $scopeRequestServiceID = $scope["requestServiceID"];
                        $scopeData        = $this->getServiceScope($scope["scopeID"]);
                        $serviceScopeData = [
                            "serviceRequisitionID" => $scopeData->serviceRequisitionID,
                            "serviceOrderID"       => $scopeData->serviceOrderID,
                            "serviceCompletionID"  => $serviceCompletionID,
                            "requestServiceID"     => $newRequestServiceID,
                            "description"          => $scopeData->description,
                            "quantity"             => $scopeData->quantity,
                            "uom"                  => $scopeData->uom,
                            "unitCost"             => $scopeData->unitCost,
                            "totalCost"            => $scopeData->totalCost,
                            "file"                 => $scope["file"],
                            "createdBy"            => $scopeData->createdBy,
                            "updatedBy"            => $scope["updatedBy"]
                        ];
                        if ($serviceRequestServiceID == $scopeRequestServiceID) {
                            array_push($dataScope, $serviceScopeData);
                        }
                    }
                    $insertServiceScope = $this->insertServiceScope($dataScope);
                }
            }
        }
    }

    public function saveServices($serviceData = null) 
    {
        if ($serviceData) {
            $query = $this->db->insert("ims_request_services_tbl", $serviceData);
            if ($query) {
                $insertID = $this->db->insert_id();
                return $insertID;
            }
            return null;
        }
        return null;
    }

    public function saveScopes($scopeData = null) 
    {
        if ($scopeData) {
            $query = $this->db->insert_batch("ims_service_scope_tbl", $scopeData);
            return $query ? true : false;
        }
        return false;
    }


}
