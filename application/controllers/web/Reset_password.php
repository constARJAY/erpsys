<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Reset_password extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model("web/Applicant_model", "applicant");
    }

    public function index($code)
    {   
        if($this->session->has_userdata('session_applicant_id')) redirect(base_url("web/applicant"));
        $data["title"] = "Reset Password";

        $this->encryption->initialize(
            array(
                    'cipher' => 'aes-256',
                    'mode'   => 'ctr',
                    'key'    => '<a 32-character random string>'
            )
        );

        $this->encryption->initialize(array('driver' => 'mcrypt'));

        $value = $this->encryption->decrypt(str_replace("slash","/",$code));
        
        $value_array    = explode("|",$value);
        $applicantID    = $value_array[0];
        $applicantEmail = $value_array[1];
        $expire_stamp   = $value_array[2];
        $now_stamp      = date("Y-m-d H:i:s");

        $data["applicantID"]    = $applicantID;
        $data["applicantEmail"] = $applicantEmail;

        $isValidLink = $this->checkResetLink($applicantID);

        if($now_stamp > $expire_stamp || $isValidLink=="false"){
            if($now_stamp > $expire_stamp) $this->update_reset_link($applicantID);

            $data["title"] = "Link Expired";

            $this->load->view('template/header', $data);
            $this->load->view('web/reset_password/link_expired', $data);
            $this->load->view('template/footer', $data);
        }else{
            $this->load->view('template/header', $data);
            $this->load->view('web/reset_password/index', $data);
            $this->load->view('template/footer', $data);
        }
    }

    public function password_change()
    {
        $applicantID                = $this->input->post("applicantID");
        $applicantPassword          = $this->input->post("applicantPassword");
        $applicantEncryptedPassword = $this->input->post("applicantEncryptedPassword");

        $applicantData = [
            "applicantPassword"          => $applicantPassword,
            "applicantEncryptedPassword" => $applicantEncryptedPassword,
            "reset_link"                 => 0
        ];

        $saveApplicantData = explode("|",$this->applicant->saveApplicantData($applicantData, "update", $applicantID));

        echo json_encode($saveApplicantData);
    }

    public function checkResetLink($applicantID){
        $query = $this->db->query("SELECT applicantID FROM web_applicant_list_tbl WHERE applicantID=".$applicantID." AND reset_link=1");

        if($query->num_rows() > 0){
            return "true";
        }else{
            return "false";
        }
    }

    public function update_reset_link($applicantID){
        $data = ["reset_link" => 0];
        $query = $this->db->update("web_applicant_list_tbl", $data, ["applicantID" => $applicantID]);
    }
}

?>