<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Billing_module extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model("fms/BillingModule_model", "billingmodule");
        isAllowed(99);
    }

    public function index()
    {
        $data["title"] = "Billing Module";

        $this->load->view("template/header",$data);
        $this->load->view("fms/billing_module/index");
        $this->load->view("template/footer");
    }

    public function getBillingContent()
    {
        $billingID = $this->input->post("billingID");
        echo json_encode($this->billingmodule->getBillingContent($billingID));
    }

    public function saveBilling()
    {
        $sessionID = $this->session->has_userdata("adminSessionID") ? $this->session->userdata("adminSessionID") : 1;

        $billingID         = $this->input->post("billingID") ?? null;
        $billingStatus     = $this->input->post("billingStatus");
        $submittedAt       = $this->input->post("submittedAt") == "true" ? date("Y-m-d h:i:s") : null;
        $employeeID        = $this->input->post("employeeID");
        $billingReason     = $this->input->post("billingReason");
        $clientID          = $this->input->post("clientID");
        $clientName        = $this->input->post("clientName");
        $clientAddress     = $this->input->post("clientAddress");
        $billingComment    = $this->input->post("billingComment");
        $billingSubtotal   = $this->input->post("billingSubtotal");
        $billingVatAmount  = $this->input->post("billingVatAmount") ?? 0;
        $billingGrandTotal = $this->input->post("billingGrandTotal");
        $activities        = $this->input->post("activities");

        $data = [
            "billingStatus"     => $billingStatus,
            "submittedAt"       => $submittedAt,
            "employeeID"        => $employeeID,
            "billingReason"     => $billingReason,
            "clientID"          => $clientID,
            "clientName"        => $clientName,
            "clientAddress"     => $clientAddress,
            "billingComment"    => $billingComment,
            "billingSubtotal"   => $billingSubtotal,
            "billingVatAmount"  => $billingVatAmount,
            "billingGrandTotal" => $billingGrandTotal,
            "createdBy"         => $sessionID,
            "updatedBy"         => $sessionID,
        ];

        echo json_encode($this->billingmodule->saveBilling($billingID, $data, $activities));
    }

}