<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Collection_module extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model("fms/CollectionModule_model", "collectionmodule");
        isAllowed(100);
    }

    public function index()
    {
        $data["title"] = "Collection Module";

        $this->load->view("template/header",$data);
        $this->load->view("fms/collection_module/index");
        $this->load->view("template/footer");
    }

    public function getCollectionContent()
    {
        $collectionID = $this->input->post("collectionID");
        echo json_encode($this->collectionmodule->getCollectionContent($collectionID));
    }

    public function saveCollection()
    {
        $sessionID = $this->session->has_userdata("adminSessionID") ? $this->session->userdata("adminSessionID") : 1;

        $collectionID            = $this->input->post("collectionID") ?? null;
        $collectionStatus        = $this->input->post("collectionStatus");
        $submittedAt             = $this->input->post("submittedAt") == "true" ? date("Y-m-d H:i:s") : null;
        $employeeID              = $this->input->post("employeeID");
        $collectionReason        = $this->input->post("collectionReason");
        $clientID                = $this->input->post("clientID");
        $clientCode              = $this->input->post("clientCode");
        $clientName              = $this->input->post("clientName");
        $clientAddress           = $this->input->post("clientAddress");
        $clientContactNumber     = $this->input->post("clientContactNumber");
        $collectionPaymentMethod = $this->input->post("collectionPaymentMethod");
        $dateFrom                = $this->input->post("dateFrom");
        $dateTo                  = $this->input->post("dateTo");
        $collectionComment       = $this->input->post("collectionComment");
        $collectionSubtotal      = $this->input->post("collectionSubtotal");
        $collectionVatAmount     = $this->input->post("collectionVatAmount");
        $collectionGrandTotal    = $this->input->post("collectionGrandTotal");
        $activities              = $this->input->post("activities");

        $data = [
            "collectionStatus"        => $collectionStatus,
            "submittedAt"             => $submittedAt,
            "employeeID"              => $employeeID,
            "collectionReason"        => $collectionReason,
            "clientID"                => $clientID,
            "clientCode"              => $clientCode,
            "clientName"              => $clientName,
            "clientContactNumber"     => $clientContactNumber,
            "clientAddress"           => $clientAddress,
            "collectionPaymentMethod" => $collectionPaymentMethod,
            "dateFrom"                => $dateFrom,
            "dateTo"                  => $dateTo,
            "collectionComment"       => $collectionComment,
            "collectionSubtotal"      => $collectionSubtotal,
            "collectionVatAmount"     => $collectionVatAmount,
            "collectionGrandTotal"    => $collectionGrandTotal,
            "createdBy"               => $sessionID,
            "updatedBy"               => $sessionID,
        ];

        echo json_encode($this->collectionmodule->saveCollection($collectionID, $data, $activities));
    }

    public function getBillingContent()
    {
        $collectionID = $this->input->post("collectionID");
        $clientID     = $this->input->post("clientID");
        $dateFrom     = $this->input->post("dateFrom");
        $dateTo       = $this->input->post("dateTo");
        echo json_encode($this->collectionmodule->getBillingContent($collectionID, $clientID, $dateFrom, $dateTo));
    }

}