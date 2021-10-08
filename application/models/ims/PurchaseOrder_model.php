<?php
defined('BASEPATH') OR exit('No direct script access allowed');
date_default_timezone_set('Asia/Manila');

class PurchaseOrder_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
    }

    public function saveSignedPurchaseOrder($purchaseOrderID = 0, $employeeID = 0, $filename = "")
    {
        $query = $this->db->update(
                "ims_purchase_order_tbl", 
                [
                    "employeeID"            => $employeeID,
                    "purchaseOrderSignedPO" => $filename,
                    "purchaseOrderStatus"   => 2,
                    "submittedAt"           => date("Y-m-d H:i:s")
                ],
                ["purchaseOrderID" => $purchaseOrderID]
            );
        if ($query) {
            $this->db->query("CALL proc_get_purchase_order_approve($purchaseOrderID)");
            return "true|$filename|$purchaseOrderID|".date("Y-m-d");
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }

    public function getPurchaseOrderData($purchaseOrderID = 0)
    {
        $sql = "
        SELECT 
            ipot.*, iprt.approversID, iprt.employeeID as preparedBy
        FROM 
            ims_purchase_order_tbl AS ipot 
            LEFT JOIN ims_purchase_request_tbl AS iprt USING(purchaseRequestID)
        WHERE ipot.purchaseOrderID = $purchaseOrderID";
        $query = $this->db->query($sql);
        return $query ? $query->row() : null;
    }

    public function getRequestItemAssets($classification = "", $purchaseOrderID = 0)
    {
        if ($classification && $purchaseOrderID)
        {
            $table = $classification == "Items" ? "ims_request_items_tbl" : "ims_request_assets_tbl";
            $sql = "SELECT * FROM $table WHERE purchaseOrderID = $purchaseOrderID AND inventoryReceivingID IS NULL";
            $query = $this->db->query($sql);
            return $query ? $query->result_array() : [];
        }
        return [];
    }

    public function insertRequestItemAssets($classification = "", $purchaseOrderID = 0, $changeRequestID = 0)
    {
        if ($classification && $purchaseOrderID)
        {
            $table = $classification == "Items" ? "ims_request_items_tbl" : "ims_request_assets_tbl";

            $data = [];
            $requestItemAssets = $this->getRequestItemAssets($classification, $purchaseOrderID);
            if ($classification == "Items")
            {
                foreach($requestItemAssets as $item)
                {
                    $data[] = [
                        'costEstimateID'          => $item['costEstimateID'],
                        'billMaterialID'          => $item['billMaterialID'],
                        'materialRequestID'       => $item['materialRequestID'],
                        'inventoryValidationID'   => $item['inventoryValidationID'],
                        'changeRequestID'         => $changeRequestID,
                        'inventoryReceivingID'    => $item['inventoryReceivingID'],
                        'candidateVendorID'       => $item['candidateVendorID'],
                        'candidateSelectedVendor' => $item['candidateSelectedVendor'],
                        'candidateVendorName'     => $item['candidateVendorName'],
                        'candidateVendorPrice'    => $item['candidateVendorPrice'],
                        'inventoryVendorID'       => $item['inventoryVendorID'],
                        'inventoryVendorCode'     => $item['inventoryVendorCode'],
                        'inventoryVendorName'     => $item['inventoryVendorName'],
                        'milestoneBuilderID'      => $item['milestoneBuilderID'],
                        'phaseDescription'        => $item['phaseDescription'],
                        'milestoneListID'         => $item['milestoneListID'],
                        'projectMilestoneID'      => $item['projectMilestoneID'],
                        'projectMilestoneName'    => $item['projectMilestoneName'],
                        'itemID'                  => $item['itemID'],
                        'itemCode'                => $item['itemCode'],
                        'itemBrandName'           => $item['itemBrandName'],
                        'itemName'                => $item['itemName'],
                        'itemClassification'      => $item['itemClassification'],
                        'itemCategory'            => $item['itemCategory'],
                        'itemUom'                 => $item['itemUom'],
                        'itemDescription'         => $item['itemDescription'],
                        'files'                   => $item['files'],
                        'remarks'                 => $item['remarks'],
                        'availableStocks'         => $item['availableStocks'],
                        'requestQuantity'         => $item['requestQuantity'],
                        'reservedItem'            => $item['reservedItem'],
                        'forPurchase'             => $item['forPurchase'],
                        'unitCost'                => $item['unitCost'],
                        'totalCost'               => $item['totalCost'],
                        'finalQuoteRemarks'       => $item['finalQuoteRemarks'],
                        'createdBy'               => $item['createdBy'],
                        'updatedBy'               => $item['updatedBy'],
                    ];
                }
            }
            else if ($classification == "Assets")
            {
                foreach($requestItemAssets as $asset)
                {
                    $data[] = [
                        'costEstimateID'          => $asset['costEstimateID'],
                        'billMaterialID'          => $asset['billMaterialID'],
                        'materialRequestID'       => $asset['materialRequestID'],
                        'inventoryValidationID'   => $asset['inventoryValidationID'],
                        'changeRequestID'         => $changeRequestID,
                        'inventoryReceivingID'    => $asset['inventoryReceivingID'],
                        'candidateVendorID'       => $asset['candidateVendorID'],
                        'candidateSelectedVendor' => $asset['candidateSelectedVendor'],
                        'candidateVendorName'     => $asset['candidateVendorName'],
                        'candidateVendorPrice'    => $asset['candidateVendorPrice'],
                        'inventoryVendorID'       => $asset['inventoryVendorID'],
                        'inventoryVendorCode'     => $asset['inventoryVendorCode'],
                        'inventoryVendorName'     => $asset['inventoryVendorName'],
                        'milestoneBuilderID'      => $asset['milestoneBuilderID'],
                        'phaseDescription'        => $asset['phaseDescription'],
                        'milestoneListID'         => $asset['milestoneListID'],
                        'projectMilestoneID'      => $asset['projectMilestoneID'],
                        'projectMilestoneName'    => $asset['projectMilestoneName'],
                        'assetID'                 => $asset['assetID'],
                        'assetCode'               => $asset['assetCode'],
                        'assetBrandName'          => $asset['assetBrandName'],
                        'assetName'               => $asset['assetName'],
                        'assetClassification'     => $asset['assetClassification'],
                        'assetCategory'           => $asset['assetCategory'],
                        'assetUom'                => $asset['assetUom'],
                        'assetDescription'        => $asset['assetDescription'],
                        'files'                   => $asset['files'],
                        'remarks'                 => $asset['remarks'],
                        'availableStocks'         => $asset['availableStocks'],
                        'requestQuantity'         => $asset['requestQuantity'],
                        'reservedAsset'           => $asset['reservedAsset'],
                        'forPurchase'             => $asset['forPurchase'],
                        'requestManHours'         => $asset['requestManHours'],
                        'dateNeeded'              => $asset['dateNeeded'],
                        'dateReturn'              => $asset['dateReturn'],
                        'actualDateReturn'        => $asset['actualDateReturn'],
                        'hourlyRate'              => $asset['hourlyRate'],
                        'unitCost'                => $asset['unitCost'],
                        'totalCost'               => $asset['totalCost'],
                        'finalQuoteRemarks'       => $asset['finalQuoteRemarks'],
                        'createdBy'               => $asset['createdBy'],
                        'updatedBy'               => $asset['updatedBy'],
                    ];
                }
            }

            if ($data && count($data) > 0)
            {
                $query = $this->db->insert_batch($table, $data);
                return $query ? true : false;
            }
        }
        return true;
    }

    public function saveChangeRequestForm($purchaseOrderID = 0)
    {
        $sessionID = $this->session->has_userdata('adminSessionID') ? $this->session->userdata('adminSessionID') : 0;

        $updatePurchaseOrder = $this->db->update(
            "ims_purchase_order_tbl",
            [
                "purchaseOrderStatus" => 4,
                "employeeID"          => $sessionID
            ],
            ["purchaseOrderID" => $purchaseOrderID]
        );

        $purchaseOrderData = $this->getPurchaseOrderData($purchaseOrderID);
        if ($purchaseOrderData)
        {
            $classification = $purchaseOrderData->purchaseOrderClassification;
            $data = [
                'costEstimateID'          => $purchaseOrderData->costEstimateID,
                'costEstimateCode'        => $purchaseOrderData->costEstimateCode,
                'billMaterialID'          => $purchaseOrderData->billMaterialID,
                'billMaterialCode'        => $purchaseOrderData->billMaterialCode,
                'materialRequestID'       => $purchaseOrderData->materialRequestID,
                'materialRequestCode'     => $purchaseOrderData->materialRequestCode,
                'inventoryValidationID'   => $purchaseOrderData->inventoryValidationID,
                'inventoryValidationCode' => $purchaseOrderData->inventoryValidationCode,
                'bidRecapID'              => $purchaseOrderData->bidRecapID,
                'bidRecapCode'            => $purchaseOrderData->bidRecapCode,
                'purchaseRequestID'       => $purchaseOrderData->purchaseRequestID,
                'purchaseRequestCode'     => $purchaseOrderData->purchaseRequestCode,
                'purchaseOrderID'         => $purchaseOrderData->purchaseOrderID,
                'purchaseOrderCode'       => $purchaseOrderData->purchaseOrderCode,
                'timelineBuilderID'       => $purchaseOrderData->timelineBuilderID,
                'projectCode'             => $purchaseOrderData->projectCode,
                'projectName'             => $purchaseOrderData->projectName,
                'projectCategory'         => $purchaseOrderData->projectCategory,
                'clientCode'              => $purchaseOrderData->clientCode,
                'clientName'              => $purchaseOrderData->clientName,
                'clientAddress'           => $purchaseOrderData->clientAddress,
                'employeeID'              => $purchaseOrderData->employeeID,
                'inventoryVendorID'       => $purchaseOrderData->inventoryVendorID,
                'vendorCode'              => $purchaseOrderData->vendorCode,
                'vendorName'              => $purchaseOrderData->vendorName,
                'vendorContactPerson'     => $purchaseOrderData->vendorContactPerson,
                'vendorContactDetails'    => $purchaseOrderData->vendorContactDetails,
                'vendorAddress'           => $purchaseOrderData->vendorAddress,
                'changeRequestClassification' => $classification,
                'purchaseOrderReason'     => $purchaseOrderData->purchaseOrderReason,
                'dateNeeded'              => $purchaseOrderData->dateNeeded,
                'changeRequestStatus'     => 0,
                'changeRequestRemarks'    => $purchaseOrderData->purchaseOrderRemarks,
                'createdBy'               => $purchaseOrderData->employeeID,
                'updatedBy'               => $purchaseOrderData->updatedBy,
                'createdAt'               => date('Y-m-d H:i:s'),
                'updatedAt'               => date('Y-m-d H:i:s'),
            ];
            $query = $this->db->insert("ims_change_request_tbl", $data);
            $changeRequestCode = "";
            if ($query)
            {
                $changeRequestID = $this->db->insert_id();
                $changeRequestCode = getFormCode("CRF", date("Y-m-d"), $changeRequestID);
                $updateCode = $this->db->update(
                    "ims_change_request_tbl", 
                    ["changeRequestCode" => $changeRequestCode], 
                    ["changeRequestID" => $changeRequestID]);

                if ($updateCode)
                {
                    $insertRequestItemAsset = $this->insertRequestItemAssets($classification, $purchaseOrderID, $changeRequestID);
                }
            }
            return "true|$changeRequestCode|$changeRequestID|".date("Y-m-d");
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }




    // ----- ***** PURCHASE ORDER EXCEL DATA ***** -----
    public function updatePrintCountPurchaseOrder($purchaseOrderID = 0)
    {
        $sql = "SELECT printCount FROM ims_purchase_order_tbl WHERE purchaseOrderID = $purchaseOrderID";
        $query = $this->db->query($sql);
        $result = $query ? $query->row() : null;
        if ($result)
        {
            $printCount = $result->printCount ?? 0;
            $data = ["printCount" => ($printCount + 1)];
            $this->db->update("ims_purchase_order_tbl", $data, ["purchaseOrderID" => $purchaseOrderID]);
        }
        return true;
    }

    public function getEmployeeData($employeeID = 0)
    {
        $sql = "
        SELECT 
            CONCAT(hris_employee_list_tbl.employeeFirstname, ' ', hris_employee_list_tbl.employeeLastname) AS fullname,
            hris_designation_tbl.designationName AS designation
        FROM hris_employee_list_tbl LEFT JOIN hris_designation_tbl USING(designationID) 
        WHERE employeeID = $employeeID";
        $query = $this->db->query($sql);
        return $query ? $query->row() : null;
    }

    public function getPurchaseOrderExcelData($purchaseOrderID = 0)
    {
        $data = [];
        if ($purchaseOrderID)
        {
            $updatePurchaseOrder = $this->updatePrintCountPurchaseOrder($purchaseOrderID);

            $purchaseOrderData = $this->getPurchaseOrderData($purchaseOrderID);
            if ($purchaseOrderData)
            {
                $approversID = $purchaseOrderData->approversID;
                $preparedBy  = $purchaseOrderData->preparedBy;

                $data["filename"] = $purchaseOrderData->purchaseOrderCode.".xlsx";
                $data["code"]     = $purchaseOrderData->purchaseOrderCode;
                $data["title"]    = "PURCHASE ORDER";
                $data["header"]   = [
                    "companyName"    => $purchaseOrderData->vendorName,
                    "address"        => $purchaseOrderData->vendorAddress,
                    "contactDetails" => $purchaseOrderData->vendorContactDetails,
                    "contactPerson"  => $purchaseOrderData->vendorContactPerson,
                    "date"           => date("F d, Y", strtotime($purchaseOrderData->createdAt)),
                    "requestNo"      => $purchaseOrderData->purchaseRequestCode,
                    "paymentTerms"   => $purchaseOrderData->paymentTerms,
                    "deliveryDate"   => date("F d, Y", strtotime($purchaseOrderData->shippingDate))
                ];
                $classification    = $purchaseOrderData->purchaseOrderClassification;
                $requestItemAssets = $this->getRequestItemAssets($classification, $purchaseOrderID);

                if ($requestItemAssets && count($requestItemAssets) > 0)
                {
                    $body = [];
                    foreach($requestItemAssets as $itemAsset)
                    {
                        if ($classification == "Items")
                        {
                            $body[] = [
                                "code"        => $itemAsset["itemCode"],
                                "description" => $itemAsset["itemName"]." - ".$itemAsset["itemBrandName"],
                                "quantity"    => formatAmount($itemAsset["forPurchase"] ?? 0),
                                "unit"        => $itemAsset["itemUom"],
                                "unitCost"    => formatAmount(($itemAsset["unitCost"] ?? 0), true),
                                "totalAmount" => formatAmount(($itemAsset["totalCost"] ?? 0), true)
                            ];
                        }
                        else if ($classification == "Assets")
                        {
                            $body[] = [
                                "code"        => $itemAsset["assetCode"],
                                "description" => $itemAsset["assetName"]." - ".$itemAsset["assetBrandName"],
                                "quantity"    => formatAmount($itemAsset["forPurchase"] ?? 0),
                                "unit"        => $itemAsset["assetUom"],
                                "unitCost"    => formatAmount(($itemAsset["unitCost"] ?? 0), true),
                                "totalAmount" => formatAmount(($itemAsset["totalCost"] ?? 0), true)
                            ];
                        }
                    }
                    $data["body"] = $body;
                }

                $footer = [
                    "comments"   => "1. Purchase Order must appear in all documents.\n2. The price of the Goods and/or Services stated in this purchase order shall be the price agreed upon in writing by the Company and the Supplier.\n3. Goods are subject to inspection upon arrival Goods must conform to description and specification set above, otherwise this will be return at the supplier's expenses.\n4. Original Invoice and/or Delivery receipt are left with Receiving Clerk to facilitate payment.",
                    "wordAmount" => convertNumberToWords($purchaseOrderData->grandTotalAmount),
                    "grandTotal" => $purchaseOrderData->grandTotalAmount ?? 0
                ];
                $discount = formatAmount(($purchaseOrderData->discount ?? 0), true);
                if ($purchaseOrderData->discountType == "percent") {
                    $discount = formatAmount(($purchaseOrderData->discount ?? 0))." %";
                }
                $footer["costSummary"] = [
                    "total"       => formatAmount(($purchaseOrderData->total ?? 0), true),
                    "discount"    => $discount,
                    "totalAmount" => formatAmount($purchaseOrderData->totalAmount ?? 0),
                    "vatSales"    => formatAmount($purchaseOrderData->vatSales ?? 0),
                    "vat"         => formatAmount($purchaseOrderData->vat ?? 0),
                    "totalVat"    => formatAmount($purchaseOrderData->totalVat ?? 0),
                    "lessEwt"     => formatAmount($purchaseOrderData->lessEwt ?? 0),
                    "grandTotalAmount" => formatAmount(($purchaseOrderData->grandTotalAmount ?? 0), true)
                ];

                $approvers = [];
                if ($preparedBy)
                {
                    $employeeData = $this->getEmployeeData($preparedBy);
                    if ($employeeData)
                    {
                        $approvers[] = [
                            "designation" => $employeeData->designation,
                            "title"       => "Prepared By: ".$employeeData->fullname
                        ];
                    }
                }

                if ($approversID)
                {
                    $approversArr = explode("|", $approversID) ?? [];
                    $countApprover = count($approversArr);
                    if ($approversArr && $countApprover > 0)
                    {
                        foreach($approversArr as $index => $approver)
                        {
                            $employeeData = $this->getEmployeeData($approver);

                            if ($employeeData)
                            {
                                $title = ($index+1) == $countApprover ? "Approved By: " : "Checked By: ";
                                $approvers[] = [
                                    "title"       => $title.$employeeData->fullname,
                                    "designation" => $employeeData->designation,
                                ];
                            }
                        }
                    }
                }
                $footer["approvers"] = $approvers;
                $data["footer"]      = $footer;
            }
        }
        return $data;
    }
    // ----- ***** END PURCHASE ORDER EXCEL DATA ***** -----


}
