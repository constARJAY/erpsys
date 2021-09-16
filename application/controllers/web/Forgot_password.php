<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Forgot_password extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        if($this->session->has_userdata('session_applicant_id')) redirect(base_url("web/applicant"));
    }

    public function index()
    {
        $data["title"] = "Forgot Password";
        $this->load->view('template/header', $data);
        $this->load->view('web/forgot_password/index', $data);
        $this->load->view('template/footer', $data);
    }

    public function validate_email($email_to){
        $query = $this->db->query("SELECT applicantID, applicantFirstname FROM web_applicant_list_tbl WHERE applicantEmail='".$email_to."'");

        if($query->num_rows() > 0){
            return "true|".$query->row()->applicantID."|".$query->row()->applicantFirstname;
        }else{
            return "false";
        }
    }

    public function update_reset_link($applicantID){
        $data = ["reset_link" => 1];
        $query = $this->db->update("web_applicant_list_tbl", $data, ["applicantID" => $applicantID]);
    }

    public function send_reset_link(){
        $email_to     = $this->input->post("email_to");
        $value        = explode("|",$this->validate_email($email_to));

        if($value[0]=="false"){
            echo json_encode('not_exist');
            exit;
        }
        
        $applicantID  = $value[1];
        $name         = $value[2];
        $expire_stamp = date('Y-m-d H:i:s', strtotime("+5 min"));

        $string_to_encrypt = $applicantID."|".$email_to."|".$expire_stamp;

        $from_user = 'robinjamin.gelilio.gtc@gmail.com';
        $from_pass = 'blackcoders';

        $this->encryption->initialize(
            array(
                    'cipher' => 'aes-256',
                    'mode'   => 'ctr',
                    'key'    => '<a 32-character random string>'
            )
        );

        $this->encryption->initialize(array('driver' => 'mcrypt'));

        $code =  str_replace('/','slash',$this->encryption->encrypt($string_to_encrypt));
        
        $config = Array(
                'protocol'  => 'smtp',
                'smtp_host' => 'ssl://smtp.gmail.com',
                'smtp_port' => 465,
                'smtp_user' => $from_user,
                'smtp_pass' => $from_pass,
                'mailtype'  => 'html',
                'charset'   => 'iso-8859-1',
                'wordwrap'  => TRUE
                );

        $message = '<B>Hi '.$name.',</B>
                    <br>
                    <br>
                    Forgot your password?
                    <br>
                    We received a request to reset the password for your account.
                    <br>
                    <br>
                    To reset your password, click on the link below:
                    <br>
                    <a href="http://localhost/erpsys/web/reset_password/index/'.$code.'">http://localhost/erpsys/web/reset_password/index/'.$code.'</a>
                    <br>
                    <br>
                    <b>This link will expire 5 minutes after this email was sent.</b>
                    <br>
                    <br>
                    Developer Team,
                    <br>
                    This is an automated message, please do not reply.';
        
        $this->load->library('email', $config);
        $this->email->set_mailtype("html");
        $this->email->set_newline("\r\n");
        $this->email->from($from_user,'WEB PORTAL');
        $this->email->to($email_to);
        $this->email->subject('Web Portal - Reset Password');
        $this->email->message($message);
        
        if(!$this->email->send())
        {
            echo json_encode('error');
            print_r($this->email->print_debugger());
        }else{
            $this->update_reset_link($applicantID);
            echo json_encode('success');
        }
    }
}

?>