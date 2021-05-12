<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Cost_estimate extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model("pms/CostEstimate_model", "costestimate");
        isAllowed(38);
    }

    public function index()
    {
        $data["title"] = "Cost Estimate Form";

        $this->load->view("template/header",$data);
        $this->load->view("pms/cost_estimate/index");
        $this->load->view("template/footer");
    }

    public function saveCostEstimate()
    {
        $action                     = $this->input->post("action");
        $method                     = $this->input->post("method");
        $costEstimateID             = $this->input->post("costEstimateID") ?? null;
        $reviseCostEstimateID       = $this->input->post("reviseCostEstimateID") ?? null;
        $employeeID                 = $this->input->post("employeeID");
        $projectID                  = $this->input->post("projectID") ?? null;
        $approversID                = $this->input->post("approversID") ?? null;
        $approversStatus            = $this->input->post("approversStatus") ?? null;
        $approversDate              = $this->input->post("approversDate") ?? null;
        $costEstimateStatus         = $this->input->post("costEstimateStatus");
        $costEstimateReason         = $this->input->post("costEstimateReason") ?? null;
        $costEstimateRemarks        = $this->input->post("costEstimateRemarks") ?? null;
        $submittedAt                = $this->input->post("submittedAt") ?? null;
        $createdBy                  = $this->input->post("createdBy");
        $updatedBy                  = $this->input->post("updatedBy");
        $createdAt                  = $this->input->post("createdAt");
        $items                      = $this->input->post("items") ?? null;

        $costEstimateData = [
            "reviseCostEstimateID" => $reviseCostEstimateID,
            "employeeID"              => $employeeID,
            "projectID"               => $projectID,
            "approversID"             => $approversID,
            "approversStatus"         => $approversStatus,
            "approversDate"           => $approversDate,
            "costEstimateStatus"      => $costEstimateStatus,
            "costEstimateReason"      => $costEstimateReason,
            "submittedAt"             => $submittedAt,
            "createdBy"               => $createdBy,
            "updatedBy"               => $updatedBy,
            "createdAt"               => $createdAt
        ];

        if ($action == "update") {
            unset($costEstimateData["reviseCostEstimateID"]);
            unset($costEstimateData["createdBy"]);
            unset($costEstimateData["createdAt"]);

            if ($method == "cancelform") {
                $costEstimateData = [
                    "costEstimateStatus" => 4,
                    "updatedBy"             => $updatedBy,
                ];
            } else if ($method == "approve") {
                $costEstimateData = [
                    "approversStatus"       => $approversStatus,
                    "approversDate"         => $approversDate,
                    "costEstimateStatus" => $costEstimateStatus,
                    "updatedBy"             => $updatedBy,
                ];
            } else if ($method == "deny") {
                $costEstimateData = [
                    "approversStatus"        => $approversStatus,
                    "approversDate"          => $approversDate,
                    "costEstimateStatus"  => 3,
                    "costEstimateRemarks" => $costEstimateRemarks,
                    "updatedBy"              => $updatedBy,
                ];
            }
        }

        $saveCostEstimateData = $this->costestimate->saveCostEstimateData($action, $costEstimateData, $costEstimateID);
        if ($saveCostEstimateData) {
            $result = explode("|", $saveCostEstimateData);

            if ($result[0] == "true") {
                $costEstimateID = $result[2];

                if ($items) {
                    $costEstimateItems = [];
                    foreach($items as $index => $item) {
                        $temp = [
                            "costEstimateID"        => $costEstimateID,
                            "itemID"                => $item["itemID"],
                            "itemName"	 	        => $item["itemName"],
                            "itemDescription"       => $item["itemDescription"],
                            "itemUom"	            => $item["itemUom"],
                            "designationID"         => $item["designationID"],
                            "designationName"       => $item["designationName"],
                            "designationTotalHours" => $item["designationTotalHours"],
                            "travelDescription"     => $item["travelDescription"],
                            "travelUnitOfMeasure"   => $item["travelUnitOfMeasure"],
                            "categoryType"          => $item["categoryType"],
                            "quantity"              => $item["quantity"],
                            "files"                 => array_key_exists("existingFile", $item) ? $item["existingFile"] : null,
                            "createdBy"             => $item["createdBy"],
                            "updatedBy"             => $item["updatedBy"],
                        ];
                        array_push($costEstimateItems, $temp);
                    }
                    
                    if (isset($_FILES["items"])) {
                        $length = count($_FILES["items"]["name"]);
                        $keys   = array_keys($_FILES["items"]["name"]);
                        for ($i=0; $i<$length; $i++) {
                            $uploadedFile = explode(".", $_FILES["items"]["name"][$keys[$i]]["file"]);

                            $index     = (int)$uploadedFile[0]; 
                            $extension = $uploadedFile[1];
                            $filename  = $i.time().'.'.$extension;

                            $folderDir = "assets/upload-files/request-items/";
                            if (!is_dir($folderDir)) {
                                mkdir($folderDir);
                            }
                            $targetDir = $folderDir.$filename;

                            if (move_uploaded_file($_FILES["items"]["tmp_name"][$index]["file"], $targetDir)) {
                                $costEstimateItems[$index]["files"] = $filename;
                            }
                            
                        } 

                        // ----- UPDATE ITEMS FILE -----
                        foreach ($costEstimateItems as $key => $prItem) {
                            if (!array_key_exists("files", $prItem)) {
                                $costEstimateItems[$key]["files"] = null;
                            }
                        }
                        // ----- END UPDATE ITEMS FILE -----
                    }
                    $saveCostEstimateItems = $this->costestimate->saveCostEstimateItems($costEstimateItems, $costEstimateID);
                }

            }
            
        }
        echo json_encode($saveCostEstimateData);
    }



}
?>