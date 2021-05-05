<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Item_price_list extends CI_Controller {

    public function __construct(){
        parent::__construct();
        $this->load->model("ims/InventoryPriceList_model", "InventoryPriceList");
        isAllowed(127);
    }

    public function index(){
        $data["title"]  = "Item Price List";
        $this->load->view("template/header", $data);
        $this->load->view("ims/inventory_price_list/index");
        $this->load->view("template/footer");
    }  

    public function add_price_list(){
        $id     = $this->input->post("id");
        $items  = $this->input->post("items");
        foreach($items as $index => $itemRow){}
        $result = $this->InventoryPriceList->add_price_list($id,$items);
        echo json_encode($result);
    }

}
