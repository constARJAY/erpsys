<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Denied extends CI_Controller {

    public function index()
    {
        $this->load->view("errors/denied");
    }

}

/* End of file Denied.php */
