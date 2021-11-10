<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Roles_permission extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model("RolesPermission_model", "rolespermission");
    }

    public function index()
    {
        $sessionID = $this->session->has_userdata("adminSessionID") ? $this->session->userdata("adminSessionID") : false;
        if ($sessionID && $sessionID != 1) {
            isAllowed(2);
        }

        $data["title"] = "Roles and Permission";
        $this->load->view('template/header', $data);
        $this->load->view('gen/roles_permission/index', $data);
        $this->load->view('template/footer', $data);
    }

    public function generateRolesPermission()
    {
        echo json_encode($this->rolespermission->generateRolesPermission());
    }

    public function generateNewRolesPermission()
    {
        $roleID = $this->input->post("roleID");
        echo json_encode($this->rolespermission->generateNewRolesPermission($roleID));
    }
    
    public function addModuleRolesPermission()
    {
        $postModuleID = $this->input->post("moduleID");
        $getModuleID  = $this->input->get("moduleID");
        $moduleID     = $postModuleID ?? $getModuleID;
        echo json_encode($this->rolespermission->addModuleRolesPermission($moduleID));
    }

    public function getModuleContent()
    {
        echo json_encode(getModuleContent());
    }

}
