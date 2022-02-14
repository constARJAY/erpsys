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


    public function getUploadedMultipleFiles() 
    {
        $data = [];
        $columNames  = $this->input->post("uploadFileColumnName") ?? null;
        $oldFilename = $this->input->post("uploadFileOldFilename") ?? null;
        $folderName  = $this->input->post("uploadFileFolder") ?? "uploads";

        if ($columNames && !empty($columNames) && is_array($columNames)) {
            foreach($columNames as $index => $columnName) {
                $mixedFileName = $oldFilename[$index] ?? "";

                $uploadFiles = $_FILES["uploadFiles"]["name"][$index] ?? null;
                if ($uploadFiles) {
                    $countFiles = count($uploadFiles);
                    for ($i=0; $i<$countFiles; $i++) {
                        $fileName    = $_FILES["uploadFiles"]["name"][$index][$i];
                        $fileType    = $_FILES["uploadFiles"]["type"][$index][$i];
                        $fileTmpName = $_FILES["uploadFiles"]["tmp_name"][$index][$i];

                        $targetDir = "assets/upload-files/$folderName/";
                        if (!is_dir($targetDir)) {
                            mkdir($targetDir);
                        }

                        if (!file_exists($targetDir."index.html")) {
                            copy('assets/index.html', $targetDir."index.html");
                        }

                        $fileKeyArr  = explode(".", $fileName);
                        $fileKeyName = $fileKeyArr[0];
                        $fileKeyType = $fileKeyArr[1];

                        $targetFileName = $fileKeyName.$i.time().'.'.$fileKeyType;
                        $targetFile     = $targetDir.$targetFileName;
                        if (move_uploaded_file($fileTmpName, $targetFile)) {
                            $mixedFileName = $mixedFileName ? $mixedFileName."|".$targetFileName : $targetFileName;
                        }
                    }
                }

                $data[$columnName] = $mixedFileName;
            }
        }
        return $data;
    }


    public function saveLiquidation()
    {
        $action                               = $this->input->post("action");
        $method                               = $this->input->post("method");
        $liquidationID                        = $this->input->post("liquidationID");
        $reviseLiquidationID                  = $this->input->post("reviseLiquidationID");
        $employeeID                           = $this->input->post("employeeID");
        $liquidationPurpose                   = $this->input->post("liquidationPurpose");
        $liquidationTotalExpense              = $this->input->post("liquidationTotalExpense");
        $liquidationVatSales                  = $this->input->post("liquidationVatSales");
        $liquidationVat                       = $this->input->post("liquidationVat");
        $liquidationBudget                    = $this->input->post("liquidationBudget");
        $liquidationExcessShortage            = $this->input->post("liquidationExcessShortage");
        $liquidationDispositionExcessShortage = $this->input->post("liquidationDispositionExcessShortage");
        $approversID                          = $this->input->post("approversID");
        $approversStatus                      = $this->input->post("approversStatus");
        $approversDate                        = $this->input->post("approversDate");
        $liquidationStatus                    = $this->input->post("liquidationStatus");
        $liquidationRemarks                   = $this->input->post("liquidationRemarks");
        $submittedAt                          = $this->input->post("submittedAt");
        $createdBy                            = $this->input->post("createdBy");
        $updatedBy                            = $this->input->post("updatedBy");
        $createdAt                            = $this->input->post("createdAt");
        $items                                = $this->input->post("items") ?? [];

        $liquidationData = [                    
            "reviseLiquidationID"                  => $reviseLiquidationID,
            "employeeID"                           => $employeeID,
            "liquidationPurpose"                   => $liquidationPurpose,
            "liquidationTotalExpense"              => $liquidationTotalExpense,
            "liquidationVatSales"                  => $liquidationVatSales,
            "liquidationVat"                       => $liquidationVat,
            "liquidationBudget"                    => $liquidationBudget,
            "liquidationExcessShortage"            => $liquidationExcessShortage,
            "liquidationDispositionExcessShortage" => $liquidationDispositionExcessShortage,
            "approversID"                          => $approversID,
            "approversStatus"                      => $approversStatus,
            "approversDate"                        => $approversDate,
            "liquidationStatus"                    => $liquidationStatus,
            "liquidationRemarks"                   => $liquidationRemarks,
            "submittedAt"                          => $submittedAt,
            "createdBy"                            => $createdBy,
            "updatedBy"                            => $updatedBy,
            "createdAt"                            => $createdAt,                         
        ];

        $uploadedMultipleFiles = $this->getUploadedMultipleFiles();
        if ($uploadedMultipleFiles && !empty($uploadedMultipleFiles)) {
            foreach ($uploadedMultipleFiles as $fileKey => $fileValue) {
                unset($liquidationData[$fileKey]);
                $liquidationData[$fileKey] = $fileValue;
            }
        }

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
                    "approversStatus"   => $approversStatus,
                    "approversDate"     => $approversDate,
                    "liquidationStatus" => $liquidationStatus,
                    "updatedBy"         => $updatedBy,
                ];
              
            } else if ($method == "deny") {
                $liquidationData = [
                    "approversStatus"    => $approversStatus,
                    "approversDate"      => $approversDate,
                    "liquidationStatus"  => 3,
                    "liquidationRemarks" => $liquidationRemarks,
                    "updatedBy"          => $updatedBy,
                ];
            } else if ($method == "drop") {
                $liquidationData = [
                    "reviseLiquidationID" => $reviseLiquidationID,
                    "liquidationStatus"   => 5,
                    "updatedBy"           => $updatedBy,
                ]; 
            }
        }

        // ADD REVISE CODE
        if ($reviseLiquidationID) {
            $liquidation = $this->liquidation->getLiquidationData($reviseLiquidationID);
            if ($liquidation) {
                $liquidationData["reviseLiquidationCode"] = $liquidation->liquidationCode;
                $liquidationData["pettyCashRequestID"]    = $liquidation->pettyCashRequestID;
                $liquidationData["pettyCashRequestCode"]  = $liquidation->pettyCashRequestCode;
                $liquidationData["pettyCashVoucherID"]    = $liquidation->pettyCashVoucherID;
                $liquidationData["pettyCashVoucherCode"]  = $liquidation->pettyCashVoucherCode;
                $liquidationData["liquidationPurpose"]    = $liquidation->liquidationPurpose;
            }
        }

        $saveLiquidationData = $this->liquidation->saveLiquidationData($action, $liquidationData, $liquidationID);
        if ($saveLiquidationData) {
            $result = explode("|", $saveLiquidationData);

            if ($result[0] == "true") {
                $liquidationID = $result[2];

                if ($items && !empty($items)) {
                    $liquidationItems = [];
                    foreach($items as $index => $item) {
                        $temp = [
                            "liquidationID" => $liquidationID,
                            "description"   => $item["description"] ?? null,
                            "vatSales"      => $item["vatSales"] ?? null,
                            "vat"           => $item["vat"] ?? null,
                            "amount"        => $item["amount"] ?? null,
                            "client"        => $item["client"] ?? null,
                            "supplier"      => $item["supplier"] ?? null,
                            "invoice"       => $item["invoice"] ?? null,
                            "remarks"       => $item["remarks"] ?? null,
                            "createdBy"     => $updatedBy,
                            "updatedBy"     => $updatedBy,
                        ];
                        array_push($liquidationItems, $temp);
                    }

                    $saveLiquidationItems = $this->liquidation->saveLiquidationItems($action, $liquidationItems, $liquidationID);
                }


                // ----- UPDATE PETTY CASH VOUCHER -----
                if ($liquidationData['liquidationStatus'] == 2 || $liquidationData['liquidationStatus'] == '2') {
                    $this->liquidation->updatePettyCashVoucher($liquidationID);
                }
                // ----- END UPDATE PETTY CASH VOUCHER -----
            }
            
        }
        echo json_encode($saveLiquidationData);
    }

}
?>