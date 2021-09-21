<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Asset_price_list extends CI_Controller {

    public function __construct(){
        parent::__construct();
        $this->load->model("ims/InventoryPriceList_model", "InventoryPriceList");
        isAllowed(141);
    }

    public function index(){
        $data["title"]  = "Asset Price List";
        $this->load->view("template/header", $data);
        $this->load->view("ims/inventory_asset_price_list/index");
        $this->load->view("template/footer");
    }  

    public function add_price_list(){
        $id     = $this->input->post("id");
        $assets  = $this->input->post("assets");
        foreach($assets as $index => $assetRow){}
        $result = $this->InventoryPriceList->add_price_list($id,$assets, "asset");
        echo json_encode($result);
    }

}
