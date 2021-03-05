<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Modules extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model('Modules_model', "modules");
    }

    public function index()
    {
        $data["title"] = "Modules Masterfile";
        $this->load->view('template/header', $data);
        $this->load->view('modules/index', $data);
        $this->load->view('template/footer', $data);
    }

    public function getModuleContent()
    {
        $moduleContent = $this->modules->getModuleContent();
        foreach ($moduleContent as $content) {
            echo json_encode($content);
            echo "<br><br>";
        }
        // echo json_encode($moduleContent);
    }

}
