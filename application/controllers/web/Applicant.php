<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Applicant extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model("web/Applicant_model", "applicant");
    }

    public function index()
    {
        if(!$this->session->has_userdata('session_applicant_id')) redirect(base_url("web/login"));

        $data["title"] = "Applicant Dashboard";
        $this->load->view('template/header', $data);
        $this->load->view('web/applicant/index', $data);
        $this->load->view('template/footer', $data);
    }

    public function registration()
    {
        if($this->session->has_userdata('session_applicant_id')) redirect(base_url("web/applicant"));

        $data["title"] = "Applicant Registration";
        $this->load->view('template/header', $data);
        $this->load->view('web/applicant/registration', $data);
        $this->load->view('template/footer', $data);
    }

    public function registration_success(){
        if($this->session->flashdata('session_success_registration')){
            $data["title"] = "Registration Success";
            $this->load->view('template/header', $data);
            $this->load->view('web/applicant/registration_success', $data);
            $this->load->view('template/footer', $data);
        }else{
            redirect(base_url('web/login/'));
        }
    }

    public function saveApplicantData()
    {   
        // GENERAL
        $action      = $this->input->post("action");
        $applicantID = $this->input->post("applicantID");

        // INFORMATION
        $applicantProfile     = $this->input->post("applicantProfile");
        $applicantResume      = $this->input->post("applicantResume");
        $applicantFirstname   = $this->input->post("applicantFirstname");
        $applicantMiddlename  = $this->input->post("applicantMiddlename") ?? null;
        $applicantLastname    = $this->input->post("applicantLastname");
        $applicantBirthday    = $this->input->post("applicantBirthday");
        $applicantGender      = $this->input->post("applicantGender");
        $applicantCitizenship = $this->input->post("applicantCitizenship");
        $applicantCivilStatus = $this->input->post("applicantCivilStatus");
        $applicantRegion      = $this->input->post("applicantRegion");
        $applicantProvince    = $this->input->post("applicantProvince");
        $applicantCity        = $this->input->post("applicantCity");
        $applicantBarangay    = $this->input->post("applicantBarangay");
        $applicantUnit        = $this->input->post("applicantUnit");
        $applicantBuilding    = $this->input->post("applicantBuilding");
        $applicantStreet      = $this->input->post("applicantStreet");
        $applicantSubdivision = $this->input->post("applicantSubdivision");
        $applicantCountry     = $this->input->post("applicantCountry");
        $applicantZipCode     = $this->input->post("applicantZipCode");
        $applicantEmail       = $this->input->post("applicantEmail");
        $applicantMobile      = $this->input->post("applicantMobile");

        

        if($action=="insert"){
            $isExist = explode("|",$this->applicant->checkEmail($applicantEmail));

            if($isExist[0]=="false"){
                echo json_encode($isExist);
                exit;
            }
            
            $applicantStatus = 0;
        }else if($action=="update"){
            $applicantStatus = 1;
        }else{
            $applicantStatus = null;
        }

        if (isset($_FILES["file"])) {
            $uploadedFile = explode(".", $_FILES["file"]["name"]);
            $extension    = $uploadedFile[1];
            $filename     = time().'.'.$extension;

            $folderDir = "assets/upload-files/profile-images/";
            if (!is_dir($folderDir)) {
                mkdir($folderDir);
            }

            $targetDir = $folderDir.$filename;
            if (move_uploaded_file($_FILES["file"]["tmp_name"], $targetDir)) {
                $applicantProfile = $filename;
            }
        }
        if (isset($_FILES["resumeFile"])) {
            $uploadedFile = explode(".", $_FILES["resumeFile"]["name"]);
            $extension    = $uploadedFile[1];
            $filename     = $applicantEmail.'_resume.'.$extension;

            $folderDir = "assets/upload-files/resumes/";
            if (!is_dir($folderDir)) {
                mkdir($folderDir);
            }

            $targetDir = $folderDir.$filename;
            if (move_uploaded_file($_FILES["resumeFile"]["tmp_name"], $targetDir)) {
                $applicantResume = $filename;
            }
        }

        // ACCOUNT
        $applicantUsername          = $this->input->post("applicantUsername");
        $applicantPassword          = $this->input->post("applicantPassword");
        $applicantEncryptedPassword = $this->input->post("applicantEncryptedPassword");

        // PAYROLL
        $applicantTIN             = $this->input->post("applicantTIN") ?? null;
        $applicantSSS             = $this->input->post("applicantSSS") ?? null;
        $applicantPhilHealth      = $this->input->post("applicantPhilHealth") ?? null;
        $applicantPagibig         = $this->input->post("applicantPagibig") ?? null;
        
        // APPLICANT DATA
        $applicantData = [
            "applicantProfile"           => $applicantProfile,
            "applicantResume"            => $applicantResume,
            "applicantFirstname"         => $applicantFirstname,
            "applicantMiddlename"        => $applicantMiddlename,
            "applicantLastname"          => $applicantLastname,
            "applicantBirthday"          => $applicantBirthday,
            "applicantGender"            => $applicantGender,
            "applicantCitizenship"       => $applicantCitizenship,
            "applicantCivilStatus"       => $applicantCivilStatus,
            "applicantRegion"            => $applicantRegion,
            "applicantProvince"          => $applicantProvince,
            "applicantCity"              => $applicantCity,
            "applicantBarangay"          => $applicantBarangay,
            "applicantUnit"              => $applicantUnit,
            "applicantBuilding"          => $applicantBuilding,
            "applicantStreet"            => $applicantStreet,
            "applicantSubdivision"       => $applicantSubdivision,
            "applicantCountry"           => $applicantCountry,
            "applicantZipCode"           => $applicantZipCode,
            "applicantEmail"             => $applicantEmail,
            "applicantMobile"            => $applicantMobile,
            "applicantStatus"            => $applicantStatus,
            "applicantUsername"          => $applicantUsername,
            "applicantPassword"          => $applicantPassword,
            "applicantEncryptedPassword" => $applicantEncryptedPassword,
            "applicantTIN"               => $applicantTIN,
            "applicantSSS"               => $applicantSSS,
            "applicantPhilHealth"        => $applicantPhilHealth,
            "applicantPagibig"           => $applicantPagibig
        ];

        $saveApplicantData = explode("|",$this->applicant->saveApplicantData($applicantData, $action, $applicantID));

        if($saveApplicantData[0]=='true' && $action=="insert"){
            $this->send_activation($applicantEmail,$saveApplicantData[2]);
            $this->session->set_flashdata('session_success_registration', 'true');
        }

        echo json_encode($saveApplicantData);
    }

    public function send_activation($email_to, $applicantID){
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

        $code =  str_replace('/','slash',$this->encryption->encrypt($applicantID));

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

        $message = '<b><h2>Confirm Your Registration</h2></b>
                    <br>
                    <B>Welcome to Web Portal!</B>
                    <br>
                    <br>
                    Thank you for registering. To activate your account, please click the link below to confirm your account.
                    <br>
                    http://localhost/erpsys/web/applicant/activation/'.$code.'
                    <br>
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
        $this->email->subject('Web Portal - Activate Your Account');
        $this->email->message($message);
        
        if(!$this->email->send())
        {
            print_r($this->email->print_debugger());
        }
    }

    public function activation($code){
        $this->encryption->initialize(
            array(
                    'cipher' => 'aes-256',
                    'mode'   => 'ctr',
                    'key'    => '<a 32-character random string>'
            )
        );

        $this->encryption->initialize(array('driver' => 'mcrypt'));

        $applicantID = $this->encryption->decrypt(str_replace("slash","/",$code));

        $data["title"] = "Account Activation";
        
        if($applicantID==""){
            $this->load->view('template/header', $data);
            $this->load->view('web/applicant/activate_failed', $data);
            $this->load->view('template/footer', $data);
        }else{
            $result = $this->applicant->activate($applicantID);
            
            if($result=="success"){
                $this->load->view('template/header', $data);
                $this->load->view('web/applicant/activate_success', $data);
                $this->load->view('template/footer', $data);
            }else{
                $this->load->view('template/header', $data);
                $this->load->view('web/applicant/activate_failed', $data);
                $this->load->view('template/footer', $data);
            }
        }
    }
}
?>
