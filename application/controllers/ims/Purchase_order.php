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

        $purchaseRequestID = $this->input->get("purchaseRequestID");
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
            
            $requestItems = $this->purchaseorder->getRequestItems($purchaseRequestID, $inventoryVendorID, $categoryType);

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
                "purchaseRequestID"    => $purchaseRequestID,
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

}
