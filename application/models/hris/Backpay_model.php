

<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Backpay_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
    }

    public function saveBackPayData($action, $data, $id = null,$method ="release") 
    {
        if($method != "release"){
            if ($action == "insert") {
                $query = $this->db->insert("hris_back_pay_tbl", $data);
            } else {
                $where = ["backPayID" => $id];
                $query = $this->db->update("hris_back_pay_tbl", $data, $where);
            }
    
            if ($query) {
                $insertID = $action == "insert" ? $this->db->insert_id() : $id;
                return "true|Successfully submitted|$insertID|".date("Y-m-d");
            }
        }else{
            return "true|Successfully submitted|$id|".date("Y-m-d");
        }
        
        return "false|System error: Please contact the system administrator for assistance!";
    }

    public function deletePurchaseRequestItems($id) {
        $query = $this->db->delete("hris_back_pay_details_tbl", ["backPayID" => $id]);
        return $query ? true : false;
    }

    public function saveBackPayRequestList($data, $id = null)
    {
        if ($id) {
            $deletePurchaseRequestItems = $this->deletePurchaseRequestItems($id);
        }

        $query = $this->db->insert_batch("hris_back_pay_details_tbl", $data);
        if ($query) {
            return "true|Successfully submitted";
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }

    public function changeReleaseStatus($backPayEmployeeID = false,$employeeID = 0){
        if($backPayEmployeeID){
            $date = new DateTime();
            $whereRelease = ["employeeID" => $backPayEmployeeID,
                    "payrollHoldStatus" => 0,
                    ];
            $dataRelease = ['updatedBy' => $employeeID,
                            'dateRelease' =>$date->format('Y-m-d H:i:s'),
                            'payrollHoldStatus' => 9
                            ];
            $query = $this->db->update("hris_salary_release_tbl", $dataRelease, $whereRelease);

            $whereBackPayRelease = ["backPayEmployeeID" => $backPayEmployeeID];
            $dataBackPayRelease = ["releaseStatus" => 9];
            $query = $this->db->update("hris_back_pay_tbl", $dataBackPayRelease, $whereBackPayRelease);
        }
    }   


}
