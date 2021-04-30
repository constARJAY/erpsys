<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class ServiceRequisition_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
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
        $query1 = $this->db->delete("ims_request_services_tbl", ["serviceRequisitionID" => $id]);
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
        if ($id) {
            $deleteServicesAndScopes = $this->deleteServicesAndScopes($id);
        }

        if ($service && $scopes) {
            $query = $this->db->insert("ims_request_services_tbl", $service);
            if ($query) {
                $insertID  = $this->db->insert_id();
                $scopeData = [];
                foreach ($scopes as $scope) {
                    $temp = [
                        "serviceRequisitionID" => $id,
                        "requestServiceID"     => $insertID,
                        "description"          => $scope,
                        "createdBy"            => $service["createdBy"],
                        "updatedBy"            => $service["updatedBy"],
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

    public function deletePurchaseRequestItems($id) {
        $query = $this->db->delete("ims_request_items_tbl", ["serviceRequisitionID" => $id]);
        return $query ? true : false;
    }

    public function savePurchaseRequestItems($data, $id = null)
    {
        if ($id) {
            $deletePurchaseRequestItems = $this->deletePurchaseRequestItems($id);
        }

        $query = $this->db->insert_batch("ims_request_items_tbl", $data);
        if ($query) {
            return "true|Successfully submitted";
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }

    

}
