<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Service_completion extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model("ims/ServiceOrder_model", "serviceorder");
        $this->load->model("ims/ServiceCompletion_model", "servicecompletion");
        isAllowed(46);
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
        $reviseServiceCompletionID = $this->input->post("reviseServiceCompletionID") ?? null;
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
            "approversID"                => $approversID,
            "approversStatus"            => $approversStatus,
            "approversDate"              => $approversDate,
            "serviceCompletionStatus"    => $serviceCompletionStatus,
            "submittedAt"                => $submittedAt,
            "createdBy"                  => $createdBy,
            "updatedBy"                  => $updatedBy,
            "createdAt"                  => $createdAt
        ];

        if ($reviseServiceCompletionID) {
            $scData = $this->servicecompletion->getServiceCompletion($reviseServiceCompletionID);
            $serviceCompletionData["serviceRequisitionID"] = $scData->serviceRequisitionID;
            $serviceCompletionData["serviceOrderID"]       = $scData->serviceOrderID;
            $serviceCompletionData["employeeID"]           = $scData->employeeID;
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
            }
        }

        $saveServiceCompletionData = $this->servicecompletion->saveServiceCompletionData($action, $serviceCompletionData, $serviceCompletionID);

        if ($saveServiceCompletionData && ($method == "submit" || $method == "save")) {
            $result = explode("|", $saveServiceCompletionData);

            if ($result[0] == "true") {
                $serviceCompletionID = $result[2];

                $servicesData = $scopesData = [];
                if ($services) {
                    foreach($services as $index => $item) {
                        $service = [
                            "requestServiceID" => $item["requestServiceID"],
                            "serviceDateFrom"  => $item["serviceDateFrom"],
                            "serviceDateTo"    => $item["serviceDateTo"],
                            "updatedBy"        => $updatedBy,
                        ];
                        array_push($servicesData, $service);

                    }
                }

                if ($scopes) {
                    foreach ($scopes as $scope) {
                        $requestServiceID = $scope["requestServiceID"];
                        $scopeID          = $scope["scopeID"];
                        $scopeFilename    = $scope["filename"] != "null" ? $scope["filename"] : null;

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
                                                    "requestServiceID" => $requestServiceID,
                                                    "scopeID"          => $scopeID,
                                                    "file"             => $scopeDBFilename,
                                                    "updatedBy"        => $updatedBy,
                                                ];
                                                array_push($scopesData, $scopeData);
                                            }
                                        }

                                    }

                                } else {
                                    $scopeData = [
                                        "requestServiceID" => $requestServiceID,
                                        "scopeID"          => $scopeID,
                                        "file"             => $scopeFilename,
                                        "updatedBy"        => $updatedBy,
                                    ];
                                    array_push($scopesData, $scopeData);
                                }
                            } else {
                                $scopeData = [
                                    "requestServiceID" => $requestServiceID,
                                    "scopeID"          => $scopeID,
                                    "file"             => $scopeFilename,
                                    "updatedBy"        => $updatedBy,
                                ];
                                array_push($scopesData, $scopeData);
                            }
                        } else {
                            $scopeData = [
                                "requestServiceID" => $requestServiceID,
                                "scopeID"          => $scopeID,
                                "file"             => "",
                                "updatedBy"        => $updatedBy,
                            ];
                            array_push($scopesData, $scopeData);
                        }
                        
                    }
                }

                $updateServices = $this->servicecompletion->updateServices($servicesData, $scopesData, $action, $serviceCompletionID);
            }
            
        }
        echo json_encode($saveServiceCompletionData);
    }

}
?>