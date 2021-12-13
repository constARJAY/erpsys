

<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class SalaryRelease_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
    }

    public function updateStatus($data = false, $salaryReleaseID){
        if($salaryReleaseID){
            
            $this->db->where('salaryReleaseID', $salaryReleaseID);
            $this->db->update('hris_salary_release_tbl', $data);

            return "true|Successfully submitted|$salaryReleaseID|".date("Y-m-d");
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }

    public function saveCheckVoucherData($action, $data, $id = null) 
    {
        if ($action == "insert") {
            $query = $this->db->insert("fms_check_voucher_tbl", $data);
        } else {
            $where = ["voucherID" => $id];
            $query = $this->db->update("fms_check_voucher_tbl", $data, $where);
        }

        if ($query) {
            $insertID = $action == "insert" ? $this->db->insert_id() : $id;
            return "true|Successfully submitted|$insertID|".date("Y-m-d");
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }

    public function deletePurchaseRequestItems($id) {
        $query = $this->db->delete("fms_check_voucher_details_tbl", ["voucherID" => $id]);
        return $query ? true : false;
    }

    public function savePurchaseRequestItems($data, $id = null)
    {
        if ($id) {
            $deletePurchaseRequestItems = $this->deletePurchaseRequestItems($id);
        }

        $query = $this->db->insert_batch("fms_check_voucher_details_tbl", $data);
        if ($query) {
            return "true|Successfully submitted";
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }

}
