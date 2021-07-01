<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Petty_cash_replenishment extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model("fms/PettyCashReplenishment_model", "pettyrep");
        isAllowed(133);
    }

    public function index()
    {
        $data["title"] = "Petty Cash Replenishment Form";

        $this->load->view("template/header",$data);
        $this->load->view("fms/petty_cash_replenishment/index");
        $this->load->view("template/footer");
    }

    public function savePettyRep()
    {
        $action                 = $this->input->post("action");
        $method                 = $this->input->post("method");
        $pettyRepID             = $this->input->post("pettyRepID") ?? null;
        $pettyRepTotalBalance   = $this->input->post("pettyRepTotalBalance") ?? null;           
        $revisePettyRepID       = $this->input->post("revisePettyRepID") ?? null;
        $employeeID             = $this->input->post("employeeID");
        $approversID            = $this->input->post("approversID") ?? null;
        $approversStatus        = $this->input->post("approversStatus") ?? null;
        $approversDate          = $this->input->post("approversDate") ?? null;
        $pettyRepStatus         = $this->input->post("pettyRepStatus");
        $pettyRepRemarks        = $this->input->post("pettyRepRemarks") ?? NULL;
        $submittedAt            = $this->input->post("submittedAt") ?? NULL;
        $createdBy              = $this->input->post("createdBy");
        $updatedBy              = $this->input->post("updatedBy");
        $createdAt              = $this->input->post("createdAt");
        $request                = $this->input->post("request") ?? null;

        $pettyRepData = [
            "revisePettyRepID"      => $revisePettyRepID,
            "employeeID"            => $employeeID,
            "approversID"           => $approversID,
            "approversStatus"       => $approversStatus,
            "pettyRepTotalBalance"  => $pettyRepTotalBalance,
            "approversDate"         => $approversDate,
            "pettyRepStatus"        => $pettyRepStatus,
            "submittedAt"           => $submittedAt,
            "createdBy"             => $createdBy,
            "updatedBy"             => $updatedBy,
            "createdAt"             => $createdAt
        ];

        if ($action == "update") {
            unset($pettyRepData["revisePettyRepID"]);
            unset($pettyRepData["createdBy"]);
            unset($pettyRepData["createdAt"]);

            if ($method == "cancelform") {
                $pettyRepData = [
                    "pettyRepStatus" => 4,
                    "updatedBy"      => $updatedBy,
                ];
            } else if ($method == "approve") {
                $pettyRepData = [
                    "approversStatus" => $approversStatus,
                    "approversDate"   => $approversDate,
                    "pettyRepStatus"  => $pettyRepStatus,
                    "updatedBy"       => $updatedBy,
                ];
            } else if ($method == "deny") {
                $pettyRepData = [
                    "approversStatus"     => $approversStatus,
                    "approversDate"       => $approversDate,
                    "pettyRepStatus"      => 3,
                    "pettyRepRemarks"     => $pettyRepRemarks,
                    "updatedBy"           => $updatedBy,
                ];
            }   else if ($method == "drop") {
                $pettyRepData = [
                    "revisePettyRepID" => $revisePettyRepID,
                    "pettyRepStatus"   => 5,
                    "updatedBy"        => $updatedBy,
                ]; 
            }
        }

        $savePettyRepData = $this->pettyrep->savePettyRepData($action, $pettyRepData, $pettyRepID);
        if ($savePettyRepData) {
            $result = explode("|", $savePettyRepData);
            
            if ($result[0] == "true") {
        //       > submit
		//  *    > save
		//  *    > deny
		//  *    > approve
                if($method == "save" && $method == "drop" && $method == "cancelform"){
                    $pettyRepID = NULL;
                }else if($method == "approve" && $method == "deny"){
                    $pettyRepID = $result[2];
                }else{
                    $pettyRepID = $result[2];
                }
                

                if ($request) {
                    $pettyRepItems = [];
                    foreach($request as $index => $item) {
                        $temp = [
                            "financeRequestID" => $item["financeRequestID"],
                            "pettyRepID"       => $pettyRepID,
                        ];
                        array_push($pettyRepItems, $temp);
                    }
                    $savePettyRepIRequest = $this->pettyrep->savePettyRepIRequest($pettyRepItems, $pettyRepID);
                }

            }
            
        }
        echo json_encode($savePettyRepData);
    }




}
?>