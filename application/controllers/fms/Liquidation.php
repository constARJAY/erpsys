<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Liquidation extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
         $this->load->model("fms/Liquidation_model", "liquidation");
        isAllowed(132);
    }

    public function index()
    {
        $data["title"] = "Liquidation";

        $this->load->view("template/header",$data);
        $this->load->view("fms/liquidation/index");
        $this->load->view("template/footer");
    }

    public function saveLiquidation()
    {
        $action                                             = $this->input->post("action");
        $method                                             = $this->input->post("method");
        $liquidationID                                      = $this->input->post("liquidationID") ?? null;
        $pettyCashRequestID                                 = $this->input->post("pettyCashRequestID") ?? null;
        $reviseLiquidationID                                = $this->input->post("reviseLiquidationID") ?? null;
        $liquidationDate                                    = $this->input->post("liquidationDate") ?? null;
        $liquidationReferenceNumber                         = $this->input->post("liquidationReferenceNumber") ?? null;
        $liquidationAmount                                  = $this->input->post("liquidationAmount") ?? null;
        $liquidationExpenses                                = $this->input->post("liquidationExpenses") ?? null;
        $liquidationBudget                                  = $this->input->post("liquidationBudget") ?? null;
        $liquidationExcessOrShortage                        = $this->input->post("liquidationExcessOrShortage") ?? null;
        $liquidationDispositionofExcessOrShortage           = $this->input->post("liquidationDispositionofExcessOrShortage") ?? null;
        $employeeID                                         = $this->input->post("employeeID");
        $approversID                                        = $this->input->post("approversID") ?? null;
        $approversStatus                                    = $this->input->post("approversStatus") ?? null;
        $approversDate                                      = $this->input->post("approversDate") ?? null;
        $liquidationPurpose                                 = $this->input->post("liquidationPurpose");
        $liquidationStatus                                  = $this->input->post("liquidationStatus");
        $liquidationRemarks                                 = $this->input->post("liquidationRemarks") ?? null;
        $submittedAt                                        = $this->input->post("submittedAt") ?? null;
        $createdBy                                          = $this->input->post("createdBy");
        $updatedBy                                          = $this->input->post("updatedBy");
        $createdAt                                          = $this->input->post("createdAt");
        $items                                              = $this->input->post("items") ?? null;

        $liquidationData = [
            "reviseLiquidationID"                               => $reviseLiquidationID,
            "employeeID"                                        => $employeeID,
            "pettyCashRequestID"                                => $pettyCashRequestID,
            "liquidationDate"                                   => $liquidationDate,
            "liquidationReferenceNumber"                        => $liquidationReferenceNumber,
            "approversID"                                       => $approversID,
            "approversStatus"                                   => $approversStatus,
            "approversDate"                                     => $approversDate,
            "liquidationAmount"                                 => $liquidationAmount,
            "liquidationExpenses"                               => $liquidationExpenses,
            "liquidationBudget"                                 => $liquidationBudget,
            "liquidationExcessOrShortage"                       => $liquidationExcessOrShortage,
            "liquidationDispositionofExcessOrShortage"          => $liquidationDispositionofExcessOrShortage,
            "liquidationPurpose"                                => $liquidationPurpose,
            "liquidationStatus"                                 => $liquidationStatus,
            "liquidationRemarks"                                => $liquidationRemarks,
            "submittedAt"                                       => $submittedAt,
            "createdBy"                                         => $createdBy,
            "updatedBy"                                         => $updatedBy,
            "createdAt"                                         => $createdAt
        ];

        if ($action == "update") {
            unset($liquidationData["reviseLiquidationID"]);
            unset($liquidationData["createdBy"]);
            unset($liquidationData["createdAt"]);

            if ($method == "cancelform") {
                $liquidationData = [
                    "liquidationStatus" => 4,
                    "updatedBy"             => $updatedBy,
                ];
            } else if ($method == "approve") {
                $liquidationData = [
                    "approversStatus"       => $approversStatus,
                    "approversDate"         => $approversDate,
                    "liquidationStatus" => $liquidationStatus,
                    "updatedBy"             => $updatedBy,
                ];
              
            } else if ($method == "deny") {
                $liquidationData = [
                    "approversStatus"        => $approversStatus,
                    "approversDate"          => $approversDate,
                    "liquidationStatus"  => 3,
                    "liquidationRemarks" => $liquidationRemarks,
                    "updatedBy"              => $updatedBy,
                ];
            } else if ($method == "drop") {
                $liquidationData = [
                    "reviseLiquidationID" => $reviseLiquidationID,
                    "liquidationStatus"   => 5,
                    "updatedBy"               => $updatedBy,
                ]; 
            }
        }

        $saveliquidationData = $this->liquidation->saveliquidationData($action, $liquidationData, $liquidationID, $pettyCashRequestID);
        if ($saveliquidationData) {
            $result = explode("|", $saveliquidationData);

            if ($result[0] == "true") {
                $liquidationID = $result[2];

                if ($items) {
                    $liquidationItems = [];
                    foreach($items as $index => $item) {
                        $temp = [
                            // "requestItemID"     => $item["requestItemID"] != "null" ? $item["requestItemID"] : null,pettyCashRequestDetailsID
                            "liquidationID" => $liquidationID,
                           // "chartOfAccountID"  => $item["chartOfAccountID"] != "null" ? $item["chartOfAccountID"] : null,
                            "description"         => $item["description"] != "null" ? $item["description"] : null,
                            "amount"              => $item["amount"] != "null" ? $item["amount"] : null,
                            "vatSales"            => $item["vatSales"] != "null" ? $item["vatSales"] : null,
                            "vat"                 => $item["vat"] != "null" ? $item["vat"] : null,
                            "clientID"              => $item["clientID"] != "null" ? $item["clientID"] : null,
                            "srfNumber"           => $item["srfNumber"] != "null" ? $item["srfNumber"] : null,
                            "chartOfAccountID"    => $item["chartOfAccountID"] != "null" ? $item["chartOfAccountID"] : null,
                            "remark"              => $item["remark"] != "null" ? $item["remark"] : null,
                            "receiptNumber"       => $item["receiptNumber"] != "null" ? $item["receiptNumber"] : null,
                            "createdBy"         => $item["createdBy"],
                            "updatedBy"         => $item["updatedBy"],
                        ];
                        array_push($liquidationItems, $temp);
                    }

                    $saveLiquidationItems = $this->liquidation->saveLiquidationItems($action, $liquidationItems, $liquidationID);
                }

            }
            
        }
        echo json_encode($saveliquidationData);
    }



    // public function getTableData() 
    // {
    //     $tableName    = $this->input->post("tableName");
    //     $columnName   = $this->input->post("columnName"); 
    //     $searchFilter = $this->input->post("searchFilter");
    //     $orderBy      = $this->input->post("orderBy");
    //     echo json_encode($this->company_setup->getTableData($tableName, $columnName, $searchFilter, $orderBy));
    // }

    // public function updateTableData()
    // {
    //     $tableName   = $this->input->post("tableName") ? $this->input->post("tableName") : null;
    //     $tableData   = $this->input->post("tableData") ? $this->input->post("tableData") : false;
    //     $whereFilter = $this->input->post("whereFilter") ? $this->input->post("whereFilter") : false;
    //     $feedback    = $this->input->post("feedback")  ? $this->input->post("feedback") : null;
    //     $data = array();

    //     // $uploadedFiles = $this->getUploadedFiles();
    //     // if ($uploadedFiles) {
    //     //     foreach ($uploadedFiles as $fileKey => $fileValue) {
    //     //         $data[$fileKey] = $fileValue;
    //     //     }
    //     // }
        
    //     if ($tableName && $tableData && $whereFilter) {
    //         foreach ($tableData as $key => $value) {
    //             $data[$key] = $value;
    //         }
    //         echo json_encode($this->company_setup->updateTableData($tableName, $data, $whereFilter, $feedback));
    //     } else {
    //         echo json_encode("false|Invalid arguments");
    //     }
    // }

}
?>