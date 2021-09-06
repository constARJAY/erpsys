<?php
// defined('BASEPATH') OR exit('No direct script access allowed');

// class Check_voucher extends CI_Controller {

//     public function __construct()
//     {
//         parent::__construct();
//         $this->load->model("fms/CheckVoucher_model", "check_voucher");
//         isAllowed(96);
//     }

//     public function index()
//     {
//         $data["title"] = "Check Voucher";

//         $this->load->view("template/header",$data);
//         $this->load->view("fms/check_voucher/index");
//         $this->load->view("template/footer");
//     }

//     public function saveCheckVoucher()
//     {
//         $action                     = $this->input->post("action");
//         $method                     = $this->input->post("method");
//         $voucherID                  = $this->input->post("voucherID") ?? null;
//         $reviseVoucherID            = $this->input->post("reviseVoucherID") ?? null;
//         $employeeID                 = $this->input->post("employeeID");
     
//         $paymentRequestID                  = $this->input->post("paymentRequestID") ?? null;
//         $voucherTinPayee               = $this->input->post("voucherTinPayee");
//         $voucherDescription               = $this->input->post("voucherDescription");
//         $voucherBudgetSource               = $this->input->post("voucherBudgetSource");
//         $checkNo                    = $this->input->post("checkNo");
//         $approversID                = $this->input->post("approversID") ?? null;
//         $approversStatus            = $this->input->post("approversStatus") ?? null;
//         $approversDate              = $this->input->post("approversDate") ?? null;
//         $voucherStatus              = $this->input->post("voucherStatus");
//         $voucherRemarks             = $this->input->post("voucherRemarks") ?? null;
//         $submittedAt                = $this->input->post("submittedAt") ?? null;
//         $createdBy                  = $this->input->post("createdBy");
//         $updatedBy                  = $this->input->post("updatedBy");
//         $createdAt                  = $this->input->post("createdAt");
//         $items                      = $this->input->post("items") ?? null;

        


//         $financeCheckVoucherData = [
//             "reviseVoucherID"           => $reviseVoucherID,
//             "employeeID"                 => $employeeID,
//             "paymentRequestID"                 => $paymentRequestID,
//             "voucherTinPayee"            => $voucherTinPayee,
//             "voucherDescription"               => $voucherDescription,
//             "voucherBudgetSource"               => $voucherBudgetSource,
//             "checkNo"                    => $checkNo,
//             "approversID"                => $approversID,
//             "approversStatus"            => $approversStatus,
//             "approversDate"              => $approversDate,
//             "voucherStatus"              => $voucherStatus,
//             "voucherRemarks"             => $voucherRemarks,
//             "submittedAt"                => $submittedAt,
//             "createdBy"                  => $createdBy,
//             "updatedBy"                  => $updatedBy,
//             "createdAt"                  => $createdAt
//         ];

//         if ($action == "update") {
//             unset($financeCheckVoucherData["reviseVoucherID"]);
//             unset($financeCheckVoucherData["createdBy"]);
//             unset($financeCheckVoucherData["createdAt"]);

//             if ($method == "cancelform") {
//                 $financeCheckVoucherData = [
//                     "voucherStatus" => 4,
//                     "updatedBy"                => $updatedBy,
//                 ];
//             } else if ($method == "approve") {
//                 $financeCheckVoucherData = [
//                     "approversStatus"          => $approversStatus,
//                     "approversDate"            => $approversDate,
//                     "voucherStatus" => $voucherStatus,
//                     "updatedBy"                => $updatedBy,
//                 ];
//             } else if ($method == "deny") {
//                 $financeCheckVoucherData = [
//                     "approversStatus"           => $approversStatus,
//                     "approversDate"             => $approversDate,
//                     "voucherStatus"  => 3,
//                     "voucherRemarks" => $voucherRemarks,
//                     "updatedBy"                 => $updatedBy,
//                 ];
//             } else if ($method == "drop") {
//                 $financeCheckVoucherData = [
//                     "reviseVoucherID" => $reviseVoucherID,
//                     "voucherStatus"   => 5,
//                     "updatedBy"               => $updatedBy,
//                 ]; 
//             } 
         
//         }
//         // print_r($_POST);
//         // exit;
//         $savefinanceCheckVoucherData = $this->check_voucher->saveCheckVoucherData($action, $financeCheckVoucherData, $voucherID);

//         if ($savefinanceCheckVoucherData && ($method == "submit" || $method == "save")) {
//             $result = explode("|", $savefinanceCheckVoucherData);

//             if ($result[0] == "true") {
//                 $voucherID = $result[2];

//                 if ($items) {
//                     foreach($items as $index => $item) {
//                         $service = [
//                             "voucherID" => $voucherID,
//                             "paymentRequestID"        => $item["paymentRequestID"] != "null" ? $item["paymentRequestID"] : null,
//                             "chartOfAccountID"               => $item["chartOfAccountID"] != "null" ? $item["chartOfAccountID"] : null,
//                             "accountCode"             => $item["accountCode"],
//                             "accountName"              => $item["accountName"],
//                             "debit"              => $item["debit"],
//                             "credit"              => $item["credit"],
//                             "balance"              => $item["balance"],
//                             // "createdBy"            => $updatedBy,
//                             // "updatedBy"            => $updatedBy,
//                         ];
//                         // $scopes = $item["scopes"];
                        
//                         $saveServices = $this->check_voucher->saveServices($service, $voucherID);
//                     }
        
//                 }

//             }
            
//         }
//         echo json_encode($savefinanceCheckVoucherData);
//     }

// }
?>

<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Check_voucher extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model("fms/CheckVoucher_model", "check_voucher");
        isAllowed(96);
    }

    public function index()
    {
        $data["title"] = "Check Voucher";

        $this->load->view("template/header",$data);
        $this->load->view("fms/check_voucher/index");
        $this->load->view("template/footer");
    }

    public function saveCheckVoucher()
    {
        $action                     = $this->input->post("action");
        $method                     = $this->input->post("method");
        $voucherID                  = $this->input->post("voucherID") ?? null;
        $reviseVoucherID            = $this->input->post("reviseVoucherID") ?? null;
        $employeeID                 = $this->input->post("employeeID");
     
        $paymentRequestID                  = $this->input->post("paymentRequestID") ?? null;
        $pettyRepID                  = $this->input->post("pettyRepID") ?? null;
        $purchaseOrderID                  = $this->input->post("purchaseOrderID") ?? null;
        $chartOfAccountID                  = $this->input->post("chartOfAccountID") ?? null;
        $voucherTinPayee               = $this->input->post("voucherTinPayee");
        $voucherDescription               = $this->input->post("voucherDescription");
        $voucherBudgetSource               = $this->input->post("voucherBudgetSource");
        $checkNo                    = $this->input->post("checkNo");
        $voucherAmount                    = $this->input->post("voucherAmount");
        $approversID                = $this->input->post("approversID") ?? null;
        $approversStatus            = $this->input->post("approversStatus") ?? null;
        $approversDate              = $this->input->post("approversDate") ?? null;
        $voucherStatus              = $this->input->post("voucherStatus");
        $voucherRemarks             = $this->input->post("voucherRemarks") ?? null;
        $submittedAt                = $this->input->post("submittedAt") ?? null;
        $createdBy                  = $this->input->post("createdBy");
        $updatedBy                  = $this->input->post("updatedBy");
        $createdAt                  = $this->input->post("createdAt");
        $items                      = $this->input->post("items") ?? null;


        $financeCheckVoucherData = [
            "reviseVoucherID"           => $reviseVoucherID,
            "employeeID"                 => $employeeID,
            "paymentRequestID"                 => $paymentRequestID,
            "pettyRepID"                 => $pettyRepID,
            "purchaseOrderID"                 => $purchaseOrderID,
            "chartOfAccountID"                 => $chartOfAccountID,
            "voucherTinPayee"            => $voucherTinPayee,
            "voucherDescription"               => $voucherDescription,
            "voucherBudgetSource"               => $voucherBudgetSource,
            "checkNo"                    => $checkNo,
            "voucherAmount"                    => $voucherAmount,
            "approversID"                => $approversID,
            "approversStatus"            => $approversStatus,
            "approversDate"              => $approversDate,
            "voucherStatus"              => $voucherStatus,
            "voucherRemarks"             => $voucherRemarks,
            "submittedAt"                => $submittedAt,
            "createdBy"                  => $createdBy,
            "updatedBy"                  => $updatedBy,
            "createdAt"                  => $createdAt
        ];

        if ($action == "update") {
            unset($financeCheckVoucherData["reviseVoucherID"]);
            unset($financeCheckVoucherData["createdBy"]);
            unset($financeCheckVoucherData["createdAt"]);

            if ($method == "cancelform") {
                $financeCheckVoucherData = [
                    "voucherStatus" => 4,
                    "updatedBy"                => $updatedBy,
                ];
            } else if ($method == "approve") {
                $financeCheckVoucherData = [
                    "approversStatus"          => $approversStatus,
                    "approversDate"            => $approversDate,
                    "voucherStatus" => $voucherStatus,
                    "updatedBy"                => $updatedBy,
                ];
            } else if ($method == "deny") {
                $financeCheckVoucherData = [
                    "approversStatus"           => $approversStatus,
                    "approversDate"             => $approversDate,
                    "voucherStatus"  => 3,
                    "voucherRemarks" => $voucherRemarks,
                    "updatedBy"                 => $updatedBy,
                ];
            } else if ($method == "drop") {
                $financeCheckVoucherData = [
                    "reviseVoucherID" => $reviseVoucherID,
                    "voucherStatus"   => 5,
                    "updatedBy"               => $updatedBy,
                ]; 
            } 
         
        }

        $savefinanceCheckVoucherData = $this->check_voucher->saveCheckVoucherData($action, $financeCheckVoucherData, $voucherID);

        if ($savefinanceCheckVoucherData && ($method == "submit" || $method == "save")) {
            $result = explode("|", $savefinanceCheckVoucherData);

            if ($result[0] == "true") {
                $voucherID = $result[2];

                if ($items) {
                    $purchaseRequestItems = [];
                    foreach($items as $index => $item) {
                        $temp = [
                            "voucherID" => $voucherID,
                            "paymentRequestID"        => $item["paymentRequestID"] != "null" ? $item["paymentRequestID"] : null,
                            "chartOfAccountID"               => $item["chartOfAccountID"] != "null" ? $item["chartOfAccountID"] : null,
                            "accountCode"             => $item["accountCode"],
                            "accountName"              => $item["accountName"],
                            "debit"              => $item["debit"],
                            "credit"              => $item["credit"],
                            "balance"              => $item["balance"],
                            // "createdBy"            => $updatedBy,
                            // "updatedBy"            => $updatedBy,
                        ];
                        array_push($purchaseRequestItems, $temp);

                    }

                    $savePurchTransferstItems = $this->check_voucher->savePurchaseRequestItems($purchaseRequestItems, $voucherID);
                }

            }
            
        }
        echo json_encode($savefinanceCheckVoucherData);
    }

}
?>