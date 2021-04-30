<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Bill_material extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model("pms/BillMaterial_model", "billmaterial");
        isAllowed(39);
    }

    public function index()
    {
        $data["title"] = "Bill Of Material Form";

        $this->load->view("template/header",$data);
        $this->load->view("pms/bill_material/index");
        $this->load->view("template/footer");
    }

    public function saveBillMaterial(){
        $action                     = $this->input->post("action");
        $method                     = $this->input->post("method");
        $billMaterialID             = $this->input->post("billMaterialID") ?? null;
        $referenceCode              = $this->input->post("referenceCode") ?? null;
        $reviseBillMaterialID       = $this->input->post("reviseBillMaterialID") ?? null;
        $employeeID                 = $this->input->post("employeeID");
        $projectID                  = $this->input->post("projectID") ?? null;
        $approversID                = $this->input->post("approversID") ?? null;
        $approversStatus            = $this->input->post("approversStatus") ?? null;
        $approversDate              = $this->input->post("approversDate") ?? null;
        $billMaterialStatus         = $this->input->post("billMaterialStatus");
        $billMaterialReason         = $this->input->post("billMaterialReason") ?? null;
        $billMaterialRemarks        = $this->input->post("billMaterialRemarks") ?? null;
        $submittedAt                = $this->input->post("submittedAt") ?? null;
        $createdBy                  = $this->input->post("createdBy");
        $updatedBy                  = $this->input->post("updatedBy");
        $createdAt                  = $this->input->post("createdAt");
        $updateItems                = $this->input->post("updateItems") ?? null;
        $insertItems                = $this->input->post("insertItems") ?? null;

        $billMaterialData = [
            "reviseBillMaterialID" => $reviseBillMaterialID,
            "employeeID"              => $employeeID,
            "referenceCode"           => $referenceCode,
            "projectID"               => $projectID,
            "approversID"             => $approversID,
            "approversStatus"         => $approversStatus,
            "approversDate"           => $approversDate,
            "billMaterialStatus"      => $billMaterialStatus,
            "billMaterialReason"      => $billMaterialReason,
            "submittedAt"             => $submittedAt,
            "createdBy"               => $createdBy,
            "updatedBy"               => $updatedBy,
            "createdAt"               => $createdAt
        ];

        if ($action == "update") {
            unset($billMaterialData["reviseBillMaterialID"]);
            unset($billMaterialData["createdBy"]);
            unset($billMaterialData["createdAt"]);

            if ($method == "cancelform") {
                $billMaterialData = [
                    "billMaterialStatus" => 4,
                    "updatedBy"             => $updatedBy,
                ];
            } else if ($method == "approve") {
                $billMaterialData = [
                    "approversStatus"       => $approversStatus,
                    "approversDate"         => $approversDate,
                    "billMaterialStatus"    => $billMaterialStatus,
                    "updatedBy"             => $updatedBy,
                ];
            } else if ($method == "deny") {
                $billMaterialData = [
                    "approversStatus"        => $approversStatus,
                    "approversDate"          => $approversDate,
                    "billMaterialStatus"     => 3,
                    "billMaterialRemarks"    => $billMaterialRemarks,
                    "updatedBy"              => $updatedBy,
                ];
            }
        }

        $saveBillMaterialData = $this->billmaterial->saveBillMaterialData($action, $billMaterialData, $billMaterialID);
        if ($saveBillMaterialData) {
            $result = explode("|", $saveBillMaterialData);

            if ($result[0] == "true") {
                $billMaterialID = $result[2];
                $updateItems ? $this->billmaterial->updateBillMaterialItems($updateItems) :"";
                $insertItems ? $this->billmaterial->insertBillMaterialItems($insertItems) :"";
            }
            
        }
        echo json_encode($saveBillMaterialData);
    }

    public function saveCanvassingData(){
        $id     = $this->input->post("billMaterialID");
        $result = $this->billmaterial->saveCanvassingData($id);
        echo json_encode($result);
    }


}
?>