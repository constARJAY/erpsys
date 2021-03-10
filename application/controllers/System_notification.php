<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class System_notification extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
    }

    public function index()
    {
        $data["title"] = "System Notification";
        $this->load->view('template/header', $data);
        $this->load->view('gen/system_notification/index', $data);
        $this->load->view('template/footer', $data);
    }

    public function getAllNotificationData()
    {
        // insertNotificationData("gen_system_notification_tbl", [
        //     "moduleID"                => 3,
        //     "notificationTitle"       => "Charles Verdadero",
        //     "notificationDescription" => "Extended Contract",
        //     "notificationType"        => 3,
        //     "createdBy"               => 1
        // ]);

        $data = getNotificationData("Inventory Management System");
        echo json_encode($data);
    }

}
