<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Purchase_order extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model("ims/PurchaseOrder_model", "purchaseorder");
        isAllowed(47);
    }

    public function index()
    {
        $data["title"] = "Purchase Order";

        $this->load->view("template/header",$data);
        $this->load->view("ims/purchase_order/index");
        $this->load->view("template/footer");
    }

    public function insertPurchaseOrder()
    {
        $sessionID = 
            $CI->session->has_userdata("otherSessionID") ? 
            $CI->session->userdata("otherSessionID") : 1;

        $purchaseOrderID   = $this->input->get("purchaseOrderID");
        $bidRecapID        = $this->input->get("bidRecapID");
        $categoryType      = $this->input->get("categoryType");
        $inventoryVendorID = $this->input->get("inventoryVendorID");

        $data = [];
        $inventoryVendor = $this->purchaseorder->getInventoryVendor($inventoryVendorID);
        if ($inventoryVendor) {
            $vendorName           = $inventoryVendor->vendorName;
            $vendorAddress        = $inventoryVendor->vendorAddress;
            $vendorContactDetails = $inventoryVendor->vendorContactDetails;
            $vendorContactPerson  = $inventoryVendor->vendorContactPerson;
            
            $requestItems = $this->purchaseorder->getOrderItems($purchaseOrderID, $inventoryVendorID, $categoryType);

            $total            = 0;
            $discount         = 0;
            $totalAmount      = 0;
            $vatSales         = 0;
            $vat              = 0;
            $totalVat         = 0;
            $lessEwt          = 0;
            $grandTotalAmount = 0;
            $requestItemsID   = [];
            if ($requestItems) {
                foreach ($requestItems as $requestItem) {
                    array_push($requestItemsID, $requestItem["requestItemID"]);
                    $total += $requestItem["totalCost"];
                }
            }

            $data = [
                "purchaseOrderID"    => $purchaseOrderID,
                "bidRecapID"           => $bidRecapID,
                "categoryType"         => $categoryType,
                "inventoryVendorID"    => $inventoryVendorID,
                "vendorName"           => $vendorName,
                "vendorAddress"        => $vendorAddress,
                "vendorContactDetails" => $vendorContactDetails,
                "vendorContactPerson"  => $vendorContactPerson,
                "total"                => $total,
                "discount"             => $discount,
                "totalAmount"          => $totalAmount,
                "vatSales"             => $vatSales,
                "vat"                  => $vat,
                "totalVat"             => $totalVat,
                "lessEwt"              => $lessEwt,
                "grandTotalAmount"     => $grandTotalAmount,
                "createdBy"            => $sessionID,
                "updatedBy"            => $sessionID
            ];
            $requestItemsID = implode(", ", $requestItemsID);
            $insertPurchaseOrder = $this->purchaseorder->insertPurchaseOrder($data, $requestItemsID);
            echo json_encode($insertPurchaseOrder);
        }
    }

    public function savePurchaseOrder()
    {
        $action                = $this->input->post("action");
        $method                = $this->input->post("method");
        $purchaseOrderID       = $this->input->post("purchaseOrderID") ?? null;
        $revisePurchaseOrderID = $this->input->post("revisePurchaseOrderID") ?? null;
        $paymentTerms          = $this->input->post("paymentTerms") ?? null;
        $deliveryDate          = $this->input->post("deliveryDate") ?? null;
        $total                 = $this->input->post("total") ?? null;
        $discount              = $this->input->post("discount") ?? null;
        $totalAmount           = $this->input->post("totalAmount") ?? null;
        $vatSales              = $this->input->post("vatSales") ?? null;
        $vat                   = $this->input->post("vat") ?? null;
        $totalVat              = $this->input->post("totalVat") ?? null;
        $lessEwt               = $this->input->post("lessEwt") ?? null;
        $grandTotalAmount      = $this->input->post("grandTotalAmount") ?? null;
        $approversID           = $this->input->post("approversID") ?? null;
        $approversStatus       = $this->input->post("approversStatus") ?? null;
        $approversDate         = $this->input->post("approversDate") ?? null;
        $purchaseOrderStatus   = $this->input->post("purchaseOrderStatus");
        $purchaseOrderRemarks  = $this->input->post("purchaseOrderRemarks");
        $submittedAt           = $this->input->post("submittedAt") ?? null;
        $updatedBy             = $this->input->post("updatedBy");
        $items                 = $this->input->post("items") ?? null;

        $purchaseOrderData = [
            "revisePurchaseOrderID" => $revisePurchaseOrderID,
            "paymentTerms"          => $paymentTerms,
            "deliveryDate"          => $deliveryDate,
            "total"                 => $total,
            "discount"              => $discount,
            "totalAmount"           => $totalAmount,
            "vatSales"              => $vatSales,
            "vat"                   => $vat,
            "totalVat"              => $totalVat,
            "lessEwt"               => $lessEwt,
            "grandTotalAmount"      => $grandTotalAmount,
            "approversID"           => $approversID,
            "approversStatus"       => $approversStatus,
            "approversDate"         => $approversDate,
            "purchaseOrderStatus"   => $purchaseOrderStatus,
            "submittedAt"           => $submittedAt,
            "updatedBy"             => $updatedBy,
        ];

        $purchaseRequestID = $inventoryVendorID = "";
        if ($revisePurchaseOrderID) {
            $getPurchaseOrder = $this->purchaseorder->getPurchaseOrder($revisePurchaseOrderID);
            if ($getPurchaseOrder) {
                $purchaseRequestID = $getPurchaseOrder->purchaseRequestID;
                $inventoryVendorID = $getPurchaseOrder->inventoryVendorID;
                $purchaseOrderData["employeeID"]           = $getPurchaseOrder->employeeID;
                $purchaseOrderData["purchaseRequestID"]    = $purchaseRequestID;
                $purchaseOrderData["bidRecapID"]           = $getPurchaseOrder->bidRecapID;
                $purchaseOrderData["categoryType"]         = $getPurchaseOrder->categoryType;
                $purchaseOrderData["inventoryVendorID"]    = $inventoryVendorID;
                $purchaseOrderData["vendorName"]           = $getPurchaseOrder->vendorName;
                $purchaseOrderData["vendorAddress"]        = $getPurchaseOrder->vendorAddress;
                $purchaseOrderData["vendorContactDetails"] = $getPurchaseOrder->vendorContactDetails;
                $purchaseOrderData["vendorContactPerson"]  = $getPurchaseOrder->vendorContactPerson;
            }
        }

        if ($action == "update") {
            unset($purchaseOrderData["revisePurchaseOrderID"]);

            if ($method == "cancelform") {
                $purchaseOrderData = [
                    "purchaseOrderStatus" => 4,
                    "updatedBy"           => $updatedBy,
                ];
            } else if ($method == "approve") {
                $purchaseOrderData = [
                    "approversStatus"       => $approversStatus,
                    "approversDate"         => $approversDate,
                    "purchaseOrderStatus"   => $purchaseOrderStatus,
                    "updatedBy"             => $updatedBy,
                ];
            } else if ($method == "deny") {
                $purchaseOrderData = [
                    "approversStatus"      => $approversStatus,
                    "approversDate"        => $approversDate,
                    "purchaseOrderStatus"  => 3,
                    "purchaseOrderRemarks" => $purchaseOrderRemarks,
                    "updatedBy"            => $updatedBy,
                ];
            }
        }

        $savePurchaseOrderData = $this->purchaseorder->savePurchaseOrderData($action, $purchaseOrderData, $purchaseOrderID);
        if ($savePurchaseOrderData) {
            $result = explode("|", $savePurchaseOrderData);

            if ($result[0] == "true") {
                $purchaseOrderID = $result[2];

                if ($items) {
                    $purchaseOrderItems = [];
                    foreach($items as $index => $item) {
                        $temp = [
                            "purchaseRequestID" => $purchaseRequestID,
                            "purchaseOrderID"   => $purchaseOrderID,
                            "inventoryVendorID" => $inventoryVendorID,
                            "itemID"            => $item["itemID"] != "null" ? $item["itemID"] : null,
                            "categoryType"      => $item["categoryType"],
                            "quantity"          => $item["quantity"],
                            "unitCost"          => $item["unitcost"],
                            "totalCost"         => $item["totalcost"],
                            "files"             => array_key_exists("existingFile", $item) ? $item["existingFile"] : null, 
                            "remarks"           => $item["remarks"] ? $item["remarks"] : null, 
                            "createdBy"         => $item["createdBy"],
                            "updatedBy"         => $item["updatedBy"],
                        ];
                        array_push($purchaseOrderItems, $temp);
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
                                $purchaseOrderItems[$index]["files"] = $filename;
                            }
                            
                        } 

                        // ----- UPDATE ITEMS FILE -----
                        foreach ($purchaseOrderItems as $key => $prItem) {
                            if (!array_key_exists("files", $prItem)) {
                                $purchaseOrderItems[$key]["files"] = null;
                            }
                        }
                        // ----- END UPDATE ITEMS FILE -----
                    }

                    $savePurchaseOrderItems = $this->purchaseorder->savePurchaseOrderItems($purchaseOrderItems, $purchaseOrderID);
                }

            }
            
        }
        echo json_encode($savePurchaseOrderData);
    }

}
