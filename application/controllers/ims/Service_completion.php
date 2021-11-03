<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Service_completion extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model("ims/ServiceOrder_model", "serviceorder");
        $this->load->model("ims/ServiceCompletion_model", "servicecompletion");
        isAllowed(128);
    }

    public function index()
    {
        $data["title"] = "Service Completion";

        $this->load->view("template/header",$data);
        $this->load->view("ims/service_completion/index");
        $this->load->view("template/footer");
    }

    public function saveServiceCompletion()
    {
        $action                    = $this->input->post("action");
        $method                    = $this->input->post("method");
        $serviceCompletionID       = $this->input->post("serviceCompletionID") ?? null;
        $serviceRequisitionID      = $this->input->post("serviceRequisitionID") ?? null;
        $serviceOrderID            = $this->input->post("serviceOrderID") ?? null;
        $reviseServiceCompletionID = $this->input->post("reviseServiceCompletionID") ?? null;
        $employeeID                = $this->input->post("employeeID") ?? null;
        $approversID               = $this->input->post("approversID") ?? null;
        $approversStatus           = $this->input->post("approversStatus") ?? null;
        $approversDate             = $this->input->post("approversDate") ?? null;
        $serviceCompletionStatus   = $this->input->post("serviceCompletionStatus");
        $serviceCompletionRemarks  = $this->input->post("serviceCompletionRemarks") ?? null;
        $submittedAt               = $this->input->post("submittedAt") ?? null;
        $createdBy                 = $this->input->post("updatedBy");
        $updatedBy                 = $this->input->post("updatedBy");
        $createdAt                 = $this->input->post("createdAt");
        $services                  = $this->input->post("services") ?? null;
        $scopes                    = $this->input->post("scopes") ?? null;

        $serviceCompletionData = [
            "reviseServiceCompletionID"  => $reviseServiceCompletionID,
            "serviceRequisitionID"       => $serviceRequisitionID,
            "serviceOrderID"             => $serviceOrderID,
            "employeeID"                 => $employeeID,
            "approversID"                => $approversID,
            "approversStatus"            => $approversStatus,
            "approversDate"              => $approversDate,
            "serviceCompletionStatus"    => $serviceCompletionStatus,
            "submittedAt"                => $submittedAt,
            "createdBy"                  => $createdBy,
            "updatedBy"                  => $updatedBy,
            "createdAt"                  => $createdAt
        ];

        $multipleFiles = getUploadedMultipleFiles($_POST, $_FILES);
        if ($multipleFiles && !empty($multipleFiles)) {
            foreach ($multipleFiles as $fileKey => $fileValue) {
                unset($serviceCompletionData[$fileKey]);
                $serviceCompletionData[$fileKey] = $fileValue;
            }
        }

        if ($action == "update") {
            unset($serviceCompletionData["reviseServiceCompletionID"]);
            unset($serviceCompletionData["createdBy"]);
            unset($serviceCompletionData["createdAt"]);

            if ($method == "cancelform") {
                $serviceCompletionData = [
                    "serviceCompletionStatus" => 4,
                    "updatedBy"               => $updatedBy,
                ];
            } else if ($method == "approve") {
                $serviceCompletionData = [
                    "approversStatus"         => $approversStatus,
                    "approversDate"           => $approversDate,
                    "serviceCompletionStatus" => $serviceCompletionStatus,
                    "updatedBy"               => $updatedBy,
                ];
            } else if ($method == "deny") {
                $serviceCompletionData = [
                    "approversStatus"          => $approversStatus,
                    "approversDate"            => $approversDate,
                    "serviceCompletionStatus"  => 3,
                    "serviceCompletionRemarks" => $serviceCompletionRemarks,
                    "updatedBy"                => $updatedBy,
                ];
            } else if ($method == "drop") {
                $serviceCompletionData = [
                    "reviseServiceCompletionID" => $reviseServiceCompletionID,
                    "serviceCompletionStatus"   => 5,
                    "updatedBy"                 => $updatedBy,
                ]; 
            } 
        }

        $saveServiceCompletionData = $this->servicecompletion->saveServiceCompletionData($action, $serviceCompletionData, $serviceCompletionID);

        if ($saveServiceCompletionData) {
            $result = explode("|", $saveServiceCompletionData);

            if ($result[0] == "true") {
                $serviceCompletionID = $result[2];

                if ($services && count($services) > 0) {
                    $deleteServices = $this->serviceorder->deleteServices($serviceRequisitionID, $serviceOrderID, $serviceCompletionID);
                    $deleteScopes   = $this->serviceorder->deleteScopes($serviceRequisitionID, $serviceOrderID, $serviceCompletionID);

                    foreach($services as $index => $item) {
                        $scopesData = [];
                        $requestServiceID = $item["requestServiceID"];
                        $service = [
                            "serviceRequisitionID" => $serviceRequisitionID,
                            "serviceOrderID"       => $serviceOrderID,
                            "serviceCompletionID"  => $serviceCompletionID,
                            "serviceID"            => $item["serviceID"],
                            "serviceName"          => $item["serviceName"],
                            "serviceDateFrom"      => $item["serviceDateFrom"],
                            "serviceDateTo"        => $item["serviceDateTo"],
                            "remarks"              => $item["remarks"],
                            "createdBy"            => $updatedBy,
                            "updatedBy"            => $updatedBy,
                        ];

                        $queryServiceID = $this->servicecompletion->saveServices($service);
                        if ($queryServiceID) {
                            if ($scopes && count($scopes) > 0) {
                                foreach ($scopes as $scope) {
                                    if ($requestServiceID == $scope["requestServiceID"]) {
    
                                        $scopeFilename = $scope["filename"] != "null" ? $scope["filename"] : null;
                                        $description   = $scope["description"] != "null" ? $scope["description"] : null;
                                        $quantity      = $scope["quantity"] != "null" ? $scope["quantity"] : null;
                                        $uom           = $scope["uom"] != "null" ? $scope["uom"] : null;
                                        $unitCost      = $scope["unitCost"] != "null" ? $scope["unitCost"] : null;
                                        $totalCost     = $scope["totalCost"] != "null" ? $scope["totalCost"] : null;
                                        $createdBy     = $updatedBy;
                
                                        if ($scopeFilename) {
                                            if (isset($_FILES["scopeFile"])) {
                                                $names     = $_FILES["scopeFile"]["name"];
                                                $tmp_names = $_FILES["scopeFile"]["tmp_name"];
                    
                                                $inArray = in_array($scopeFilename, $names);
                
                                                if ($inArray) {
                
                                                    foreach ($names as $i => $name) {
                                                        $filenameArr = explode(".", $name);
                                                        $filename = $filenameArr[0];
                                                        $filetype = $filenameArr[1];
                            
                                                        $scopeDBFilename = $filename.$i.time().".".$filetype;
                                                        $tmp_name = $tmp_names[$i];
                            
                                                        $folderDir = "assets/upload-files/request-services/";
                                                        if (!is_dir($folderDir)) {
                                                            mkdir($folderDir);
                                                        }
                            
                                                        $targetDir = $folderDir.$scopeDBFilename;
                
                                                        if ($name == $scopeFilename) {
                                                            if (move_uploaded_file($tmp_name, $targetDir)) {
                                                                $scopeData = [
                                                                    "serviceRequisitionID" => $serviceRequisitionID,
                                                                    "serviceOrderID"       => $serviceOrderID,
                                                                    "serviceCompletionID"  => $serviceCompletionID,
                                                                    "requestServiceID"     => $queryServiceID,
                                                                    "description"          => $description,
                                                                    "quantity"             => $quantity,
                                                                    "uom"                  => $uom,
                                                                    "unitCost"             => $unitCost,
                                                                    "totalCost"            => $totalCost,
                                                                    "file"                 => $scopeDBFilename,
                                                                    "createdBy"            => $updatedBy,
                                                                    "updatedBy"            => $updatedBy,
                                                                ];
                                                                array_push($scopesData, $scopeData);
                                                            }
                                                        }
                
                                                    }
                
                                                } else {
                                                    $scopeData = [
                                                        "serviceRequisitionID" => $serviceRequisitionID,
                                                        "serviceOrderID"       => $serviceOrderID,
                                                        "serviceCompletionID"  => $serviceCompletionID,
                                                        "requestServiceID"     => $queryServiceID,
                                                        "description"          => $description,
                                                        "quantity"             => $quantity,
                                                        "uom"                  => $uom,
                                                        "unitCost"             => $unitCost,
                                                        "totalCost"            => $totalCost,
                                                        "file"                 => $scopeFilename,
                                                        "createdBy"            => $updatedBy,
                                                        "updatedBy"            => $updatedBy,
                                                    ];
                                                    array_push($scopesData, $scopeData);
                                                }
                                            } else {
                                                $scopeData = [
                                                    "serviceRequisitionID" => $serviceRequisitionID,
                                                    "serviceOrderID"       => $serviceOrderID,
                                                    "serviceCompletionID"  => $serviceCompletionID,
                                                    "requestServiceID"     => $queryServiceID,
                                                    "description"          => $description,
                                                    "quantity"             => $quantity,
                                                    "uom"                  => $uom,
                                                    "unitCost"             => $unitCost,
                                                    "totalCost"            => $totalCost,
                                                    "file"                 => $scopeFilename,
                                                    "createdBy"            => $updatedBy,
                                                    "updatedBy"            => $updatedBy,
                                                ];
                                                array_push($scopesData, $scopeData);
                                            }
                                        } else {
                                            $scopeData = [
                                                "serviceRequisitionID" => $serviceRequisitionID,
                                                "serviceOrderID"       => $serviceOrderID,
                                                "serviceCompletionID"  => $serviceCompletionID,
                                                "requestServiceID"     => $queryServiceID,
                                                "description"          => $description,
                                                "quantity"             => $quantity,
                                                "uom"                  => $uom,
                                                "unitCost"             => $unitCost,
                                                "totalCost"            => $totalCost,
                                                "file"                 => "",
                                                "createdBy"            => $updatedBy,
                                                "updatedBy"            => $updatedBy,
                                            ];
                                            array_push($scopesData, $scopeData);
                                        }
                                        
                                    }
                                }
                            }
                            $saveScopes = $this->servicecompletion->saveScopes($scopesData);
                        }
                    }
                }
            }
            
        }
        echo json_encode($saveServiceCompletionData);
    }

}
?>