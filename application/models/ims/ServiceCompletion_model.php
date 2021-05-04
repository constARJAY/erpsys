<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class ServiceCompletion_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
    }

    public function getServiceCompletionData($id = null) {
        if ($id) {
            $sql = "
            SELECT 
                isrt.*,
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
                ims_service_completion_tbl AS isrt
                LEFT JOIN pms_client_tbl AS pctl USING(clientID)
            WHERE serviceCompletionID = $id";
            $query = $this->db->query($sql);
            return $query ? $query->row() : null;
        }
        return null;
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

    

    public function deleteServicesAndScopes($id = 0)
    {
        $query1 = $this->db->delete("ims_request_services_tbl", ["serviceCompletionID" => $id]);
        $query2 = $this->db->delete("ims_service_scope_tbl", ["serviceCompletionID" => $id]);
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
                        "serviceCompletionID" => $id,
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
