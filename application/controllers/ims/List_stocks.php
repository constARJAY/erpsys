<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class List_stocks extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model("ims/ListStock_model", "list_stock");
        isAllowed(34);
    }

    public function index()
    {
        $data["title"] = "List of Stocks";

        $this->load->view("template/header",$data);
        $this->load->view("ims/list_stocks/index");
        $this->load->view("template/footer");
    }

    public function getliststocks()
    {
        $classificationID                  = $this->input->post("classificationID");
        $categoryID                        = $this->input->post("categoryID");
        // echo json_encode($this->list_stock->getListStock($classificationID, $categoryID));
        $result                            = $this->list_stock->getListStock($classificationID, $categoryID);
        $item                              = $result["item"];
        $asset                             = $result["assets"];
        // var_dump($result);
        $itemArr    = [];
        $assetArr   = [];

        for ($i=0; $i < count($item) ; $i++) { 
            $itemRow    = $item[$i];
            $itemID     = $itemRow["itemID"];
            $itemInfo   = $this->list_stock->getTableInfo($itemID); 
            
            $temp = [
               "Unused"                     => $itemRow["Unused"], 
               "available"                  => $itemRow["available"], 
               "brand"                      => $itemInfo->brandName,  
               "categoryName"               => $itemInfo->categoryName,  
               "classificationName"         => $itemInfo->classificationName,  
               "itemCode"                   => $itemInfo->itemCode,  
               "itemID"                     => $itemID, 
               "itemName"                   => $itemInfo->itemName,  
               "materiaWithdrawalQuantity"  => $itemRow["materiaWithdrawalQuantity"], 
               "reOrderLevel"               => $itemInfo->reOrderLevel, 
               "reserved"                   => $itemRow["reserved"], 
               "reservedItem"               => $itemRow["reservedItem"], 
               "stockIN"                    => $itemRow["stockIN"], 
               "stockOut"                   => $itemRow["stockOut"], 
               "totalQuantity"              => $itemRow["totalQuantity"], 
               "totalStockOut"              => $itemRow["totalStockOut"], 
               "uom"                        => $itemInfo->unitOfMeasurementID 
            ];
            array_push($itemArr, $temp);

        }

        for ($i=0; $i < count($asset) ; $i++) { 
            $assetRow   = $asset[$i];
            $assetID    = $assetRow["assetID"];
            $assetInfo  = $this->list_stock->getTableInfo($assetID, "asset"); 

            $temp = [
                "Transferred"               => $assetRow["Transferred"],
                "assetCode"                 => $assetInfo->assetCode,
                "assetID"                   => $assetID,
                "assetName"                 => $assetInfo->assetName,
                "available"                 => $assetRow["available"],
                "brand"                     => $assetInfo->brandName,
                "categoryName"              => $assetInfo->categoryName,
                "classificationName"        => $assetInfo->classificationName,
                "disposed"                  => $assetRow["disposed"],
                "equipmentBorrowing"        => $assetRow["equipmentBorrowing"],
                "materiaWithdrawalQuantity" => $assetRow["materiaWithdrawalQuantity"],
                "reOrderLevel"              => $assetInfo->reOrderLevel,
                "reserved"                  => $assetRow["reserved"],
                "reservedAsset"             => $assetRow["reservedAsset"],
                "returnQuantity"            => $assetRow["returnQuantity"],
                "stockIN"                   => $assetRow["stockIN"],
                "totalQuantity"             => $assetRow["totalQuantity"],
                "totalequipmentBorrowing"   => $assetRow["totalequipmentBorrowing"],
                "uom"                       => $assetInfo->unitOfMeasurementID,
            ];
            array_push($assetArr, $temp);

        }

        $returnData = [
                    "assets" => $assetArr,
                    "item"   => $itemArr
        ];

        echo json_encode($returnData);
        

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