<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Approval_setup extends CI_Controller {

    public function __construct(){
        parent::__construct();
        $this->load->model("Operations_model", "operations");
        $this->load->model("ApprovalSetup_model", "approval_setup");
        // $this->load->model("ApprovalSetup_model", "ApprovalSetup_model");
        isAllowed(1);
    }

    public function index(){
        // $data["title"] = "Login | ".$this->db->getTableData("company_setup_tbl", "companyName", "", "");
        $data["title"]              = "Approval Setup";
        $data["module_list"]        = $this->operations->getTableData("gen_module_list_tbl", "", "moduleApprover != 0");
        $this->load->view("template/header", $data);
        $this->load->view("gen/approval_setup/index", $data);
        $this->load->view("template/footer");
    }

    public function update_attach_designation(){
        // {moduleID: "13", designationID: "1|2|5|7", userAccountID: "0,0,0,0"}
        $moduleID       =   $this->input->post("moduleID");
        $designationID  =   $this->input->post("designationID");
        $userAccountID  =   $this->input->post("approvalUsers");
        $data           =   [ "moduleID"=>$moduleID, "designationID" => $designationID, "userAccountID" =>$userAccountID];
        $result         =   $this->approval_setup->updateAttachDesignation($data);
        if($result){
            $this->approval_setup->updateUndefined();  
        }
        echo json_encode($result);
    }


  
    

    

    

}
?>

