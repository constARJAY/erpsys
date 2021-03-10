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
        $data["title"] = "Roles and Permission";
        $this->load->view('template/header', $data);
        $this->load->view('gen/roles_permission/index', $data);
        $this->load->view('template/footer', $data);
    }

    public function generateRolesPermission()
    {
        echo json_encode($this->rolespermission->generateRolesPermission());
    }

}
