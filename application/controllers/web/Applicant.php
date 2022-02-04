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
        $this->load->view('template/web_header', $data);
        $this->load->view('web/applicant/index', $data);
        $this->load->view('template/web_footer', $data);
    }

    public function registration()
    {
        if($this->session->has_userdata('session_applicant_id')) redirect(base_url("web/applicant"));

        $data["title"] = "Applicant Registration";
        $this->load->view('template/web_header', $data);
        $this->load->view('web/applicant/registration', $data);
        $this->load->view('template/web_footer', $data);
    }

    public function registration_success(){
        if($this->session->flashdata('session_success_registration')){
            $data["title"] = "Registration Success";
            $this->load->view('template/web_header', $data);
            $this->load->view('web/applicant/registration_success', $data);
            $this->load->view('template/web_footer', $data);
        }else{
            redirect(base_url('web/login/'));
        }
    }

    public function saveApplicantData()
    {   
        // GENERAL
        $sessionID   = $this->session->has_userdata('session_applicant_id');
        $action      = $this->input->post("action");
        $applicantID = $this->input->post("applicantID");

        // INFORMATION
        $applicantProfile     = $this->input->post("applicantProfile");
        $applicantResume            = $this->input->post("applicantResume");
        $applicantFirstname         = $this->input->post("applicantFirstname");
        $applicantMiddlename        = $this->input->post("applicantMiddlename") ?? null;
        $applicantLastname          = $this->input->post("applicantLastname");
        $applicantBirthday          = $this->input->post("applicantBirthday");
        $applicantGender            = $this->input->post("applicantGender");
        $applicantCitizenship       = $this->input->post("applicantCitizenship");
        $applicantCivilStatus       = $this->input->post("applicantCivilStatus");
        $applicantRegion            = $this->input->post("applicantRegion");
        $applicantProvince          = $this->input->post("applicantProvince");
        $applicantCity              = $this->input->post("applicantCity");
        $applicantBarangay          = $this->input->post("applicantBarangay");
        $applicantUnit              = $this->input->post("applicantUnit");
        $applicantBuilding          = $this->input->post("applicantBuilding");
        $applicantStreet            = $this->input->post("applicantStreet");
        $applicantSubdivision       = $this->input->post("applicantSubdivision");
        $applicantCountry           = $this->input->post("applicantCountry");
        $applicantZipCode           = $this->input->post("applicantZipCode");
        $applicantEmail             = $this->input->post("applicantEmail");
        $applicantMobile            = $this->input->post("applicantMobile");
        $applicantBirthPlace        = $this->input->post("applicantBirthPlace");
        
        $applicantTelephone         = $this->input->post("applicantTelephone");
        $applicantReligion          = $this->input->post("applicantReligion");
        $applicantContactPerson     = $this->input->post("applicantContactPerson");
        $applicantContactNumber     = $this->input->post("applicantContactNumber");

        $applicantFathersName        = $this->input->post("applicantFathersName");
        $applicantFathersAge         = $this->input->post("applicantFathersAge");
        $applicantMothersName        = $this->input->post("applicantMothersName");
        $applicantMothersAge         = $this->input->post("applicantMothersAge");
        $applicantSpouseName         = $this->input->post("applicantSpouseName");
        $applicantSpouseAge          = $this->input->post("applicantSpouseAge");

        // ARRAY
        $dependent                  = $this->input->post("dependent");
        $employment                 = $this->input->post("employment");
        $education                  = $this->input->post("education");
        $organization               = $this->input->post("organization");
        $exam                       = $this->input->post("exam");
        $seminar                    = $this->input->post("seminar");
        $characterRef               = $this->input->post("characterRef");





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
        $applicantPRC             = $this->input->post("applicantPRC") ?? null;
        $applicantPRCExpiration   = $this->input->post("applicantPRCExpiration") ?? null;
        $applicantNHNF            = $this->input->post("applicantNHNF") ?? null;
        $applicantPHIL            = $this->input->post("applicantPHIL") ?? null;
        
        // print_r($_POST);
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
            "applicantTelephone"         => $applicantTelephone,
            "applicantReligion"          => $applicantReligion,
            "applicantBirthPlace"        => $applicantBirthPlace,
            "applicantFathersName"       => $applicantFathersName,
            "applicantFathersAge"        => $applicantFathersAge,
            "applicantMothersName"       => $applicantMothersName,
            "applicantMothersAge"        => $applicantMothersAge,
            "applicantSpouseName"        => $applicantSpouseName,
            "applicantSpouseAge"         => $applicantSpouseAge,
            "applicantContactPerson"     => $applicantContactPerson,
            "applicantContactNumber"     => $applicantContactNumber,
            "applicantMobile"            => $applicantMobile,
            
            

            

            "applicantStatus"            => $applicantStatus,
            "applicantUsername"          => $applicantUsername,
            "applicantPassword"          => $applicantPassword,
            "applicantEncryptedPassword" => $applicantEncryptedPassword,

            "applicantTIN"               => $applicantTIN,
            "applicantSSS"               => $applicantSSS,
            "applicantPhilHealth"        => $applicantPhilHealth,
            "applicantPagibig"           => $applicantPagibig,
            "applicationPRC"             => $applicantPRC,
            "applicationPRCExpDate"      => $applicantPRCExpiration,
            "applicantNHNF"              => $applicantNHNF,
            "applicantPHIL"              => $applicantPHIL
        ];

        $saveApplicantData = explode("|",$this->applicant->saveApplicantData($applicantData, $action, $applicantID));

        if($dependent){
            $dependentArr = [];
            $flag         = 0;
            foreach ($dependent as $key => $dependent_data) {
              $dependentTemp = [
                "applicantID"       => $applicantID,
                "dependentName"     => $dependent_data["applicantDependentName"],
                "relationship"      => $dependent_data["applicantDependentRelationship"], 
                "birthday"          => $dependent_data["applicantDependentBirthday"],
                "createdBy"         => $sessionID,
                "updatedBy"         => $sessionID
              ];

              if($dependent_data["applicantDependentName"] != ""){
                  array_push($dependentArr, $dependentTemp);
                  $flag++;
              }
            }

            if($flag > 0){
                $this->applicant->insertBatch("web_applicant_dependent_tbl", $dependentArr, $applicantID);
            }
        }
        
        if($employment){
            $employmentArr = [];
            $flag          = 0;
            foreach ($employment as $key => $employment_data) {
                $employmentTemp = [
                    "applicantID"               => $applicantID,
                    "historyDaterange"          => $employment_data["employmentHistoryFromTo"],
                    "historyEmployerName"       => $employment_data["employmentHistoryEmployerName"],
                    "historyEmployerAddress"    => $employment_data["employmentHistoryAddress"],
                    "position"                  => $employment_data["employmentHistoryPosition"],
                    "reasonLeaving"             => $employment_data["employmentHistoryReason"],
                    "historySalary"             => $employment_data["employmentHistorySalary"],
                    "createdBy"                 => $applicantID,
                    "updatedBy"                 => $applicantID

                ];
                
                if($employment_data["employmentHistoryEmployerName"] != ""){
                    array_push($employmentArr, $employmentTemp);
                    $flag++;
                }
            }

            if($flag > 0){
                $this->applicant->insertBatch("web_applicant_employment_history_tbl", $employmentArr, $applicantID);
            }
        }

        if($education){
            $educationArr = [];
            $flag         = 0;
            foreach ($education as $key => $education_data) {
                $educationTemp = [
                    "applicantID"           => $applicantID,
                    "schoolYear"            => $education_data["educationalAttainmentSchoolYear"],
                    "schoolName"            => $education_data["educationalAttainmentSchoolName"],
                    "applicantCourse"       => $education_data["educationalAttainmentCourse"],
                    "applicantActivities"   => $education_data["educationalAttainmentActivities"],
                    "createdBy"             => $applicantID,
                    "updatedBy"             => $applicantID
                ];
                
                if($education_data["educationalAttainmentSchoolName"] != ""){
                    array_push($educationArr, $educationTemp);
                    $flag++;
                }
            }

            if($flag > 0){
                $this->applicant->insertBatch("web_application_educational_attainment_tbl", $educationArr, $applicantID);
            }
        }
        
        if($organization){
            $organizationArr = [];
            $flag            = 0;
            foreach ($organization as $key => $organization_data) {
                $organizationTemp = [
                    "applicantID"           => $applicantID,
                    "organizationJoinDate"  => $organization_data["organizationJoinedFromTo"],
                    "organizationName"      => $organization_data["organizationJoinedName"],
                    "organizationPosition"  => $organization_data["organizationJoinedPosition"],
                    "createdBy"             => $applicantID,
                    "updatedBy"             => $applicantID
                ];
                
                
                if($organization_data["organizationJoinedName"] != ""){
                    array_push($organizationArr, $organizationTemp);
                    $flag++;
                }
            }

            if($flag > 0){
                $this->applicant->insertBatch("web_applicant_organization_join_tbl", $organizationArr, $applicantID);
            }
        }
        
        if($exam){
            $examArr = [];
            $flag    = 0;
            foreach ($exam as $key => $exam_data) {
                $examTemp = [
                    "applicantID"           => $applicantID,
                    "examTakenDate"         => $exam_data["examTakenDate"],
                    "examTakenDescription"  => $exam_data["examTakenName"],
                    "examTakenResult"       => $exam_data["examTakenResult"],
                    "createdBy"             => $applicantID,
                    "updatedBy"             => $applicantID
                ];
                
                
                if($exam_data["examTakenName"] != ""){
                    array_push($examArr, $examTemp);
                    $flag++;
                }
            }
            if($flag > 0){
                $this->applicant->insertBatch("web_application_exam_taken_tbl", $examArr, $applicantID);
            }
        }

        if($seminar){
            $seminarArr = [];
            $flag    = 0;
            foreach ($seminar as $key => $seminar_data) {
                $seminarTemp = [
                    "applicantID"               => $applicantID,
                    "seminarTakenDate"          => $seminar_data["seminarTakenDate"],
                    "seminarTakenDescription"   => $seminar_data["seminarTakenName"],
                    "seminarTakenPosition"      => $seminar_data["seminarTakenResult"],
                    "createdBy"                 => $applicantID,
                    "updatedBy"                 => $applicantID
                ];
                
                
                if($seminar_data["seminarTakenName"] != ""){
                    array_push($seminarArr, $seminarTemp);
                    $flag++;
                }
            }
            if($flag > 0){
                $this->applicant->insertBatch("web_application_seminar_taken_tbl", $seminarArr, $applicantID);
            }
        }

        if($characterRef){
            $characterRefArr = [];
            $flag    = 0;
            foreach ($characterRef as $key => $characterRef_data) {
                $characterRefTemp = [
                    "applicantID"                   => $applicantID,
                    "characterReferenceName"        => $characterRef_data["characterReferenceName"],
                    "characterReferencePosition"    => $characterRef_data["characterReferencePosition"],
                    "characterReferenceCompany"     => $characterRef_data["characterReferenceCompany"],
                    "characterReferenceNumber"      => $characterRef_data["characterReferenceContactNo"],
                    "createdBy"                     => $applicantID,
                    "updatedBy"                     => $applicantID
                ];
                
                
                if($characterRef_data["characterReferenceName"] != ""){
                    array_push($characterRefArr, $characterRefTemp);
                    $flag++;
                }
            }

            if($flag > 0){
                $this->applicant->insertBatch("web_application_character_reference_tbl", $characterRefArr, $applicantID);
            }
        }


        if($saveApplicantData[0]=='true' && $action=="insert"){
            $this->send_activation($applicantEmail,$saveApplicantData[2]);
            $this->session->set_flashdata('session_success_registration', 'true');
        }

        echo json_encode($saveApplicantData);
    }

    public function send_activation($email_to, $applicantID){
        $from_user = 'bcgierpsys@gmail.com';
        $from_pass = 'Erpsys2o2!';

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
                    '.base_url().'/web/applicant/activation/'.$code.'
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
            $this->load->view('template/web_header', $data);
            $this->load->view('web/applicant/activate_failed', $data);
            $this->load->view('template/web_footer', $data);
        }else{
            $result = $this->applicant->activate($applicantID);
            
            if($result=="success"){
                $this->load->view('template/web_header', $data);
                $this->load->view('web/applicant/activate_success', $data);
                $this->load->view('template/web_footer', $data);
            }else{
                $this->load->view('template/web_header', $data);
                $this->load->view('web/applicant/activate_failed', $data);
                $this->load->view('template/web_footer', $data);
            }
        }
    }

    public function getProfileData(){
        $applicantID     = $this->input->post("applicantID");
        $result          = $this->applicant->getProfileData($applicantID);

        echo json_encode($result);
    }

    public function getExamResult(){
        $applicantID    = $this->input->post("applicantID");
        $result         = $this->applicant->getExamResult($applicantID);
        echo json_encode($result);
    }

}
?>
