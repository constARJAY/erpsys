<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Service_completion extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
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
        $createdBy                 = $this->input->post("createdBy");
        $updatedBy                 = $this->input->post("updatedBy");
        $createdAt                 = $this->input->post("createdAt");
        $services                  = $this->input->post("services") ?? null;
        $scopes                    = $this->input->post("scopeID") ?? null;

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

        // $saveServiceCompletionData = $this->servicecompletion->saveServiceCompletionData($action, $serviceCompletionData, $serviceCompletionID);

        // if ($saveServiceCompletionData && ($method == "submit" || $method == "save")) {
        //     $result = explode("|", $saveServiceCompletionData);

        //     if ($result[0] == "true") {
        //         $serviceCompletionID = $result[2];

                $servicesData = $scopesData = [];
                if ($services) {
                    foreach($services as $index => $item) {
                        $service = [
                            "serviceID"       => $item["serviceID"],
                            "serviceDateFrom" => $item["serviceDateFrom"],
                            "serviceDateTo"   => $item["serviceDateTo"],
                            "updatedBy"       => $updatedBy,
                        ];
                        array_push($servicesData, $service);

                    }
                }

                if ($scopes) {
                    foreach($scopes as $index => $scopeID) {
                        if (isset($_FILES["scopeFile"])) {
                            echo json_encode($_FILES["scopeFile"]);
                            $names     = $_FILES["scopeFile"]["name"];
                            $tmp_names = $_FILES["scopeFile"]["tmp_name"];
                            foreach ($names as $i => $name) {
                                $filenameArr = explode(".", $name);
                                $filename = $filenameArr[0];
                                $filetype = $filenameArr[1];

                                $scopeFilename = $filename.$index.time().".".$filetype;
                                $tmp_name = $tmp_names[$i];

                                $folderDir = "assets/upload-files/request-services/";
                                if (!is_dir($folderDir)) {
                                    mkdir($folderDir);
                                }

                                $targetDir = $folderDir.$scopeFilename;
                                if (move_uploaded_file($tmp_name, $targetDir)) {
                                    $scope = [
                                        "scopeID"   => $scopeID,
                                        "file"      => $scopeFilename,
                                        "updatedBy" => $updatedBy,
                                    ];
                                    array_push($scopesData, $scope);
                                }
                            }
                        }
                    }
                }
                
        //         $saveServices = $this->servicecompletion->saveServices($service, $scopes, $serviceCompletionID);
        //     }
            
        // }
        // echo json_encode($saveServiceCompletionData);
    }

}
?>