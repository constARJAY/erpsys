<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Inventory_stock_in extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model("ims/InventoryStockIn_model", "inventorystockin");
        //$this->load->model("ims/PurchaseRequest_model", "purchaserequest");
        isAllowed(129);
    }

    public function index()
    {
        $data["title"] = "Inventory Stock In";

        $this->load->view("template/header",$data);
        $this->load->view("ims/inventory_stock_in/index");
        $this->load->view("template/footer");
    }
    public function insertbarcode()
    {
        $itemID = $this->input->post("itemID");
        $receivedID = $this->input->post("receivedID");
        $itemName = $this->input->post("itemName");
        $barcode = $this->input->post("barcode");
        $recievedQuantity = $this->input->post("recievedQuantity");
        $serialnumber = $this->input->post("serialnumber");
        $inventoryStorageID = $this->input->post("inventoryStorageID");
        $manufactureDate = $this->input->post("manufactureDate");
        $expirationdate = $this->input->post("expirationdate");

        $savereceivingreport = $this->inventorystockin->savestockin($itemID, $receivedID,$itemName, $barcode, $recievedQuantity,$serialnumber,$inventoryStorageID,$manufactureDate,$expirationdate);
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
            
            $receivedID = $this->input->post("receivedID");
            $itemID = $this->input->post("itemID");
            $data["barcodes"] = $this->inventorystockin->getBarcodes($receivedID,$itemID);
			//$data["barcodes"] = $this->input->post("data");
			$data["title"] = "PRINT BARCODES";
			return $this->load->view("ims/inventory_stock_in/print",$data);
		}

        // public function getStockinWarehouseByPO()
		// {
		// 	$purchaseOrderID = $this->input->post("purchaseOrderID");
		// 	$itemID = $this->input->post("itemID");
		// 	echo json_encode($this->inventorystockin->getrecievingreportByPO($purchaseOrderID, $itemID));
		// }
}
?>