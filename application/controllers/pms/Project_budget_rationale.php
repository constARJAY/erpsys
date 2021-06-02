<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Project_budget_rationale extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model("pms/BillMaterial_model", "billmaterial");
        isAllowed(39);
    }

    public function index(){
        $data["title"] = "Project Budget Rationale Form";

        $this->load->view("template/header",$data);
        $this->load->view("pms/bill_material/index");
        $this->load->view("template/footer");
    }

    public function saveBillMaterial()
    {
        $action                     = $this->input->post("action");
        $method                     = $this->input->post("method");
        $billMaterialID             = $this->input->post("billMaterialID") ?? null;
        $costEstimateID             = $this->input->post("costEstimateID") ?? null;
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
        $items                      = $this->input->post("items") ?? null;

        $billMaterialData = [
            "reviseBillMaterialID"  => $reviseBillMaterialID,
            "employeeID"              => $employeeID,
            "projectID"               => $projectID,
            "referenceCode"           => $costEstimateID,
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
                    "billMaterialStatus" => $billMaterialStatus,
                    "updatedBy"             => $updatedBy,
                ];
            } else if ($method == "deny") {
                $billMaterialData = [
                    "approversStatus"        => $approversStatus,
                    "approversDate"          => $approversDate,
                    "billMaterialStatus"  => 3,
                    "billMaterialRemarks" => $billMaterialRemarks,
                    "updatedBy"              => $updatedBy,
                ];
            } else if ($method == "drop") {
                $billMaterialData = [
                    "reviseBillMaterialID" => $reviseBillMaterialID,
                    "billMaterialStatus"   => 5,
                    "updatedBy"            => $updatedBy,
                ]; 
            }
        }

        $saveBillMaterialData = $this->billmaterial->saveBillMaterial($action, $billMaterialData, $billMaterialID);
        if ($saveBillMaterialData) {
            $result = explode("|", $saveBillMaterialData);

            if ($result[0] == "true") {
                $billMaterialID= $result[2];

                if ($items) {
                    $billMaterialItems = [];
                    foreach($items as $index => $item) {
                        $temp = [
                            "requestItemID"         => $item["requestItemID"],
                            "billMaterialID"        => $billMaterialID,
                            "costEstimateID"        => $costEstimateID,
                            "designationID"         => $item["designationID"],
                            "designationName"       => $item["designationName"],
                            "designationTotalHours" => $item["designationTotalHours"],
                            "itemID"                => $item["itemID"],
                            "itemName"              => $item["itemName"],
                            "itemUom"               => $item["itemUom"],
                            "itemDescription"       => $item["itemDescription"],
                            "travelDescription"     => $item["travelDescription"],
                            "categoryType"          => $item["categoryType"],
                            "quantity"              => $item["quantity"],
                            "unitCost"              => $item["unitCost"],
                            "totalCost"             => $item["totalCost"],
                            "createdBy"             => $item["createdBy"],
                            "updatedBy"             => $item["updatedBy"],
                        ];
                        array_push($billMaterialItems, $temp);
                    }
                    $saveBillMaterialItems = $this->billmaterial->saveBillMaterialItems($billMaterialItems, $billMaterialID);
                }

            }
            
        }
        echo json_encode($saveBillMaterialData);
    }


}
?>