<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class CollectionModule_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
    }

    // ----- GET COLLECTION DATA -----
    public function getCollectionActivities($billingID = 0) 
    {
        $sql    = "SELECT * FROM fms_billing_items_tbl WHERE billingID = $billingID";
        $query  = $this->db->query($sql);
        $result = $query ? $query->result_array() : [];
        return $result;
    }

    public function getCollectionContent($billingID = 0)
    {
        $sql    = "
        SELECT 
            fbt.*,
            CONCAT(helt.employeeFirstname, ' ', helt.employeeLastname) AS preparedBy,
            hdt.departmentName,
            hdt2.designationName
        FROM 
            fms_billing_tbl AS fbt
            LEFT JOIN hris_employee_list_tbl AS helt ON fbt.employeeID = helt.employeeID
            LEFT JOIN hris_department_tbl AS hdt ON helt.departmentID = hdt.departmentID
            LEFT JOIN hris_designation_tbl AS hdt2 ON helt.designationID = hdt2.designationID 
            WHERE fbt.billingID = $billingID";
        $query  = $this->db->query($sql);
        $result = $query ? $query->row() : false;

        $data = [];
        if ($result) {
            $data = [
                "billingID"         => $result->billingID,
                "createdAt"         => $result->createdAt,
                "employeeID"        => $result->employeeID,
                "billingStatus"     => $result->billingStatus,
                "submittedAt"       => $result->submittedAt,
                "billingReason"     => $result->billingReason,
                "clientID"          => $result->clientID,
                "clientName"        => $result->clientName,
                "clientAddress"     => $result->clientAddress,
                "billingComment"    => $result->billingComment,
                "billingSubtotal"   => $result->billingSubtotal,
                "billingVatAmount"  => $result->billingVatAmount,
                "billingGrandTotal" => $result->billingGrandTotal,
                "activities"        => $this->getCollectionActivities($billingID),
            ];
        }
        return $data;
    }
    // ----- END GET COLLECTION DATA -----


    // ----- SAVE COLLECTION DATA -----
    public function deleteActivity($billingID = 0)
    {
        $query = $this->db->delete("fms_billing_items_tbl", ["billingID" => $billingID]);
        return $query ? true : false;
    }

    public function insertActivity($data = [])
    {
        if ($data && count($data) > 0) {
            $query = $this->db->insert_batch("fms_billing_items_tbl", $data);
            return $query ? true : false;
        }
        return false;
    }

    public function saveCollection($billingID, $data, $activities)
    {
        $sessionID = $this->session->has_userdata("adminSessionID") ? $this->session->userdata("adminSessionID") : 1;

        if (!$billingID) {
            $query = $this->db->insert("fms_billing_tbl", $data);
            $billingID = $this->db->insert_id();
        } else {
            $query = $this->db->update("fms_billing_tbl", $data, ["billingID" => $billingID]);
            $deleteActivity = $this->deleteActivity($billingID);
        }

        $data = [];
        foreach ($activities as $activity) {
            $temp = [
                "billingID"   => $billingID,
                "activity"    => $activity["activity"],
                "quantity"    => $activity["quantity"],
                "amount"      => $activity["amount"],
                "totalAmount" => $activity["totalAmount"],
                "createdBy"   => $sessionID,
                "updatedBy"   => $sessionID,
            ];
            array_push($data, $temp);
        }

        $query = $this->insertActivity($data);
        return $query ? "true|Successfully submitted|$billingID|".date("Y-m-d") : "false|System error: Please contact the system administrator for assistance!";
    }
    // ----- END SAVE COLLECTION DATA -----

}
