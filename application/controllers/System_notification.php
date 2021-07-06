<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class System_notification extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        // isAllowed(3);
    }

    public function index()
    {
        $sessionID = $this->session->has_userdata("adminSessionID") ? $this->session->userdata("adminSessionID") : 1;

        $query = $this->db->update("gen_system_notification_tbl", ["markRead" => 1], 
        [
            "notificationID !=" => 0,
            "employeeID"        => $sessionID,
        ]);

        $data["title"] = "System Notification";
        $this->load->view('template/header', $data);
        $this->load->view('gen/system_notification/index', $data);
        $this->load->view('template/footer', $data);
    }

    public function getNotificationData()
    {
        $projectName = $this->input->post("projectName");
        $dateFrom    = $this->input->post("dateFrom") ? $this->input->post("dateFrom").' 00:00:00' : "";
        $dateTo      = $this->input->post("dateTo") ? $this->input->post("dateTo").' 23:59:59' : "";

        $data = getNotificationData($projectName, "", $dateFrom, $dateTo);
        echo json_encode($data);
    }

    public function updateNotification()
    {
        $sessionID = $this->session->has_userdata("adminSessionID") ? $this->session->userdata("adminSessionID") : 1;

        $notifID = $this->input->post("notifID");
        if ($notifID) {
            $data = [
                "updatedBy" => $sessionID,
                "markRead"  => 1,
            ];
            $query = $this->db->update("gen_system_notification_tbl", $data, ["notificationID" => $notifID]);
            $result = $query ? true : false;
            echo $result;
        } else {
            echo false;
        }
    }

    public function getCountForApproval()
    {
        $tableName    = $this->input->post("tableName") ?? "pms_cost_estimate_tbl";
        $columnStatus = $this->input->post("columnStatus") ?? "costEstimateStatus";
        $employeeID   = $this->input->post("employeeID") ?? 2;
        echo getCountForApproval($tableName, $columnStatus, $employeeID);
    }

}
