<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Inventory_stock_in extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        //$this->load->library('phpqrcode/qrlib');
        $this->load->model("ims/InventoryStockIn_model", "inventorystockin");
        //$this->load->model("ims/PurchaseRequest_model", "purchaserequest");
        isAllowed(129);
    }

    // public function getStockIn($data)
    // {
    //     echo json_encode($data); 
    // }
    public function index()
    {
        $data["title"] = "Inventory Stock In";
        $data['data']=$this->inventorystockin->getStockIn();
        
        $this->load->view("template/header",$data);
        $this->load->view("ims/inventory_stock_in/index",$data);
        $this->load->view("template/footer");
        //$this->getStockIn($data); 
       
    }
   

    public function insertbarcode()
    {
       
        $itemID = $this->input->post("itemID");
        $itemName = $this->input->post("itemName") ;
        $brand = $this->input->post("brand");
        $classificationName = $this->input->post("classificationName");
        $categoryName = $this->input->post("categoryName");
        $barcode = $this->input->post("barcode");
        $recievedQuantity = $this->input->post("recievedQuantity");
        $serialnumber = $this->input->post("serialnumber");
        $inventoryStorageID = $this->input->post("inventoryStorageID");
        $inventoryStorageCode = $this->input->post("inventoryStorgeCode");
        $inventoryStorageOfficeName = $this->input->post("inventoryStorageOfficeName");
        $manufactureDate = $this->input->post("manufactureDate");
        $expirationdate = $this->input->post("expirationdate");
        $ReturnItemID = $this->input->post("ReturnItemID");
        $MaterialUsageID = $this->input->post("MaterialUsageID");
        $InventoryReceivingID = $this->input->post("InventoryReceivingID");
        $recordID = $this->input->post("recordID");
        $quantity = $this->input->post("quantity");
        $inventoryCode = $this->input->post("inventoryCode");
        $itemCode = $this->input->post("itemCode");
        $uom = $this->input->post("uom");
        $itemdata = array();
        for ($i=0; $i < count($itemID); $i++) {
			$itemdata[] = array(
                 
                     'InventoryReceivingID'		=>$InventoryReceivingID[$i],
                     'MaterialUsageID'		    =>$MaterialUsageID[$i],
                     'ReturnItemID'		        =>$ReturnItemID[$i],
                     'itemCode'		            =>$itemCode[$i],
                     'itemID'		            =>$itemID[$i],
                     'itemName'		            =>$itemName[$i],
                     'barcode'		            =>$barcode[$i],
                     'brand'                     =>$brand[$i],
                     'categoryName'              =>$categoryName[$i],
                     'classificationName'        =>$classificationName[$i],
                     'expirationdate'            =>$expirationdate[$i],
                     'inventoryCode'             =>$inventoryCode,
                     'inventoryStorageCode'      =>$inventoryStorageCode[$i],
                     'inventoryStorageID'        =>$inventoryStorageID[$i],
                     'inventoryStorageOfficeName'=>$inventoryStorageOfficeName[$i],
                     'manufactureDate'           =>$manufactureDate[$i],
                     'quantity'                  =>$quantity[$i],
                     'quantityForStockin'        =>$quantity[$i],
                     'serialNumber'              =>$serialnumber[$i],
                     'uom'                       =>$uom
            ); 
        }
        $assetdata = array();
        for ($i=0; $i < count($itemID); $i++) {
			$assetdata[] = array(
                 
                     'InventoryReceivingID'		=>$InventoryReceivingID[$i],
                     'MaterialUsageID'		    =>$MaterialUsageID[$i],
                     'ReturnItemID'		        =>$ReturnItemID[$i],
                     'assetCode'		        =>$itemCode[$i],
                     'assetID'		            =>$itemID[$i],
                     'assetName'		        =>$itemName[$i],
                     'barcode'		            =>$barcode[$i],
                     'brand'                     =>$brand[$i],
                     'categoryName'              =>$categoryName[$i],
                     'classificationName'        =>$classificationName[$i],
                     'expirationdate'            =>$expirationdate[$i],
                     'inventoryCode'             =>$inventoryCode,
                     'inventoryStorageCode'      =>$inventoryStorageCode[$i],
                     'inventoryStorageID'        =>$inventoryStorageID[$i],
                     'inventoryStorageOfficeName'=>$inventoryStorageOfficeName[$i],
                     'manufactureDate'           =>$manufactureDate[$i],
                     'quantity'                  =>$quantity[$i],
                     'quantityForStockin'        =>$quantity[$i],
                     'serialNumber'              =>$serialnumber[$i],
                     'uom'                       =>$uom
            );       
          
        }

                     
        $savereceivingreport = $this->inventorystockin->savestockin($itemdata, 	$assetdata, $barcode, $recordID);
        $result = explode("|", $savereceivingreport);
        if ($result[0] == "true") {
            $this->session->set_flashdata('success', $result[1]);
        }
        echo json_encode($savereceivingreport);

    }
    public function loadBarcodes()
    {
        $itemID = $this->input->post("itemID");
        echo json_encode($this->inventorystockin->getBarcodes($itemID));
    }
    public function printStockInBarcode()
		{
            
            $referenceCode = $this->input->post("referenceCode");
            $itemID = $this->input->post("itemID");
            $recordID = $this->input->post("recordID");
            $data["barcodes"] = $this->inventorystockin->getBarcodes($referenceCode,$itemID);
			//$data["barcodes"] = $this->input->post("data");
			$data["title"] = "PRINT BARCODES";
            $data["recordID"] = $recordID;
			return $this->load->view("ims/inventory_stock_in/print",$data);
		}

        // public function getStockinWarehouseByPO()
		// {
		// 	$purchaseOrderID = $this->input->post("purchaseOrderID");
		// 	$itemID = $this->input->post("itemID");
		// 	echo json_encode($this->inventorystockin->getrecievingreportByPO($purchaseOrderID, $itemID));
		// }

public function getvalue()
{
    $inventoryReceivingID = $this->input->post("id");
    echo json_encode($this->inventorystockin->getvalueData($inventoryReceivingID));
}
}

?>