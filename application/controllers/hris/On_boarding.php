<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class On_boarding extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model("hris/EmployeeModule_model", "employeemodule");
        isAllowed(107);
        isReadAllowed(107);
    }

    public function index()
    {
        $data["title"] = "Onboarding";
        $this->employeemodule->updateLeaveCredit();
        $this->load->view("template/header", $data);
        $this->load->view("hris/on_boarding/index");
        $this->load->view("template/footer");
    }
    public function updateLeaveCredit()
    {
        echo json_encode($this->employeemodule->updateLeaveCredit());
    }

    public function generateEmployeePermission() 
    {
        echo json_encode($this->employeemodule->generateEmployeePermission());
    }

    public function generateFullAccess()
    {
        $id = $this->input->get("id");
        echo json_encode($this->employeemodule->generateFullAccess($id));
    }

    public function saveEmployeeData()
    {
        // SESSION ID
        $sessionID = $this->session->has_userdata("adminSessionID") ? $this->session->userdata("adminSessionID") : 1;

        // GENERAL
        $action     = $this->input->post("action");
        $createdBy  = $sessionID;
        $updatedBy  = $sessionID;
        $employeeID = $this->input->post("employeeID");

        // INFORMATION
        $employeeProfile     = $this->input->post("employeeProfile");
       // $employeeSignature   = $this->input->post("employeeSignature");
        $employeeFirstname   = $this->input->post("employeeFirstname");
        $employeeMiddlename  = $this->input->post("employeeMiddlename") ?? null;
        $employeeLastname    = $this->input->post("employeeLastname");
        $employeeBirthday    = $this->input->post("employeeBirthday");
        $employeeGender      = $this->input->post("employeeGender");
        $employeeCitizenship = $this->input->post("employeeCitizenship");
        $employeeCivilStatus = $this->input->post("employeeCivilStatus");
        $employeeHiredDate   = $this->input->post("employeeHiredDate");
        $employeeRegion      = $this->input->post("employeeRegion");
        $employeeProvince    = $this->input->post("employeeProvince");
        $employeeCity        = $this->input->post("employeeCity");
        $employeeBarangay    = $this->input->post("employeeBarangay");
        $employeeUnit        = $this->input->post("employeeUnit");
        $employeeBuilding    = $this->input->post("employeeBuilding");
        $employeeStreet      = $this->input->post("employeeStreet");
        $employeeSubdivision = $this->input->post("employeeSubdivision");
        $employeeCountry     = $this->input->post("employeeCountry");
        $employeeZipCode     = $this->input->post("employeeZipCode");
        $departmentID        = $this->input->post("departmentID");
        $designationID       = $this->input->post("designationID");
        $employeeEmail       = $this->input->post("employeeEmail");
        $employeeMobile      = $this->input->post("employeeMobile");
        //$employeeStatus      = $this->input->post("employeeStatus");
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
                $employeeProfile = $filename;
            }
        }
        // if (isset($_FILES["signatureFile"])) {
        //     $uploadedFile = explode(".", $_FILES["signatureFile"]["name"]);
        //     $extension    = $uploadedFile[1];
        //     $filename     = time().'.'.$extension;

        //     $folderDir = "assets/upload-files/signatures/";
        //     if (!is_dir($folderDir)) {
        //         mkdir($folderDir);
        //     }

        //     $targetDir = $folderDir.$filename;
        //     if (move_uploaded_file($_FILES["signatureFile"]["tmp_name"], $targetDir)) {
        //         $employeeSignature = $filename;
        //     }
        // }

        // ACCOUNT
       // $employeeUsername          = $this->input->post("employeeUsername");
        $employeePassword          = $this->input->post("employeePassword");
        $employeeEncryptedPassword = $this->input->post("employeeEncryptedPassword");

        // PAYROLL
        $employeeBasicSalary     = $this->input->post("employeeBasicSalary");
        $employeeDailyRate       = $this->input->post("employeeDailyRate");
        $employeeHourlyRate      = $this->input->post("employeeHourlyRate");
        $employeeAllowance       = $this->input->post("employeeAllowance");
        $bankID                  = $this->input->post("bankID") ?? null;
        $employeeBankAccountName = $this->input->post("employeeBankAccountName") ?? null;
        $employeeBankAccountNo   = $this->input->post("employeeBankAccountNo") ?? null;
        $employeeTIN             = $this->input->post("employeeTIN") ?? null;
        $employeeSSS             = $this->input->post("employeeSSS") ?? null;
        $employeePhilHealth      = $this->input->post("employeePhilHealth") ?? null;
        $employeePagibig         = $this->input->post("employeePagibig") ?? null;

        // LEAVE BALANCE
        $employeeRanking       = $this->input->post("employeeRanking");
        $employeeRankingCredit = $this->input->post("employeeRankingCredit");
        $leaveCredit           = $this->input->post("leaveCredit");

        // SCHEDULE
        $scheduleID = $this->input->post("scheduleID");

        // ACCESSIBILITY
        $accessibility = $this->input->post("accessibility");

        // DOCUMENTS
        $contractappraisalfilename = 
            $this->input->post("contractappraisalfilename") ?? [];
        $employeememorandafilename = 
            $this->input->post("employeememorandafilename") ?? [];
        $trainingdevelopmentfilename = 
            $this->input->post("trainingdevelopmentfilename") ?? [];
        $othersfilename = 
            $this->input->post("othersfilename") ?? [];
        
        // EMPLOYEE DATA
        $employeeData = [
            "employeeProfile"           => $employeeProfile,
            "employeeFirstname"         => $employeeFirstname,
            "employeeMiddlename"        => $employeeMiddlename,
            "employeeLastname"          => $employeeLastname,
            "employeeRanking"           => $employeeRanking,
            "employeeRankingCredit"     => $employeeRankingCredit,
            "employeeBirthday"          => $employeeBirthday,
            "employeeGender"            => $employeeGender,
            "employeeCitizenship"       => $employeeCitizenship,
            "employeeCivilStatus"       => $employeeCivilStatus,
            "employeeHiredDate"         => $employeeHiredDate,
            "employeeRegion"            => $employeeRegion,
            "employeeProvince"          => $employeeProvince,
            "employeeCity"              => $employeeCity,
            "employeeBarangay"          => $employeeBarangay,
            "employeeUnit"              => $employeeUnit,
            "employeeBuilding"          => $employeeBuilding,
            "employeeStreet"            => $employeeStreet,
            "employeeSubdivision"       => $employeeSubdivision,
            "employeeCountry"           => $employeeCountry,
            "employeeZipCode"           => $employeeZipCode,
            "departmentID"              => $departmentID,
            "designationID"             => $designationID,
            "employeeEmail"             => $employeeEmail,
            "employeeMobile"            => $employeeMobile,
            "employeeStatus"            => $employeeStatus,
            // "employeeUsername"          => $employeeUsername,
            "employeePassword"          => $employeePassword,
            "employeeEncryptedPassword" => $employeeEncryptedPassword,
            "employeeBasicSalary"       => $employeeBasicSalary,
            "employeeDailyRate"         => $employeeDailyRate,
            "employeeHourlyRate"        => $employeeHourlyRate,
            "employeeAllowance"         => $employeeAllowance,
            "bankID"                    => $bankID,
            "employeeBankAccountName"   => $employeeBankAccountName,
            "employeeBankAccountNo"     => $employeeBankAccountNo,
            "employeeTIN"               => $employeeTIN,
            "employeeSSS"               => $employeeSSS,
            "employeePhilHealth"        => $employeePhilHealth,
            "employeePagibig"           => $employeePagibig,
            "scheduleID"                => $scheduleID,
            "createdBy"                 => $createdBy,
            "updatedBy"                 => $updatedBy,
        ];

        if ($action == "update") {
            unset($employeeData["createdBy"]);
        }

        $saveEmployeeData = $this->employeemodule->saveEmployeeData($employeeData, $action, $employeeID);
        $result = explode("|", $saveEmployeeData);
        if ($result[0] == "true") {
            $employeeID = $result[2];

            // CONTRACT AND APPRAISAL DOCUMENTS
            $contractAppraisalFiles = [];
            if (isset($_FILES["contractappraisalfiles"])) {
                $fileLength = count($_FILES["contractappraisalfiles"]["name"]);
                for ($i=0; $i<$fileLength; $i++) {
                    $uploadedName = $_FILES["contractappraisalfiles"]["name"][$i];
                    $uploadedFile = explode(".", $_FILES["contractappraisalfiles"]["name"][$i]);
                    $filetypeArr  = explode("/", $_FILES["contractappraisalfiles"]["type"][$i]);
                    $filetype     = $filetypeArr[0];
                    $extension    = $uploadedFile[1];
                    $filename     = $uploadedFile[0]."ca".$i.time().'.'.$extension;

                    // ----- GET THE OLD DOCUMENT -----
                    if (in_array($contractappraisalfilename, [$filename])) {
                        unset($contractappraisalfilename[$filename]);
                    }
                    // ----- END GET THE OLD DOCUMENT -----

                    $folderDir = "assets/upload-files/documents/";
                    if (!is_dir($folderDir)) {
                        mkdir($folderDir);
                    }

                    $targetDir = $folderDir.$filename;
                    if (move_uploaded_file($_FILES["contractappraisalfiles"]["tmp_name"][$i], $targetDir)) {
                        $temp = [
                            "employeeID"   => $employeeID,
                            "documentType" => "Contract and Appraisal",
                            "filename"     => $filename,
                            "filetype"     => $filetype,
                            "createdBy"    => $sessionID,
                            "updatedBy"    => $sessionID,
                        ];
                        array_push($contractAppraisalFiles, $temp);
                    }
                }
            }

            // EMPLOYEE MEMORANDA
            $employeeMemorandaFiles = [];
            if (isset($_FILES["employeememorandafiles"])) {
                $fileLength = count($_FILES["employeememorandafiles"]["name"]);
                for ($i=0; $i<$fileLength; $i++) {
                    $uploadedName = $_FILES["employeememorandafiles"]["name"][$i];
                    $uploadedFile = explode(".", $_FILES["employeememorandafiles"]["name"][$i]);
                    $filetypeArr  = explode("/", $_FILES["employeememorandafiles"]["type"][$i]);
                    $filetype     = $filetypeArr[0];
                    $extension    = $uploadedFile[1];
                    $filename     = $uploadedFile[0]."em".$i.time().'.'.$extension;

                    // ----- GET THE OLD DOCUMENT -----
                    if (in_array($employeememorandafilename, [$filename])) {
                        unset($employeememorandafilename[$filename]);
                    }
                    // ----- END GET THE OLD DOCUMENT -----
 
                    $folderDir = "assets/upload-files/documents/";
                    if (!is_dir($folderDir)) {
                        mkdir($folderDir);
                    }

                    $targetDir = $folderDir.$filename;
                    if (move_uploaded_file($_FILES["employeememorandafiles"]["tmp_name"][$i], $targetDir)) {
                        $temp = [
                            "employeeID"   => $employeeID,
                            "documentType" => "Employee Memoranda",
                            "filename"     => $filename,
                            "filetype"     => $filetype,
                            "createdBy"    => $sessionID,
                            "updatedBy"    => $sessionID,
                        ];
                        array_push($employeeMemorandaFiles, $temp);
                    }
                }
            }

            // TRAINING DEVELOPMENT
            $trainingDevelopmentFiles = [];
            if (isset($_FILES["trainingdevelopmentfiles"])) {
                $fileLength = count($_FILES["trainingdevelopmentfiles"]["name"]);
                for ($i=0; $i<$fileLength; $i++) {
                    $uploadedName = $_FILES["trainingdevelopmentfiles"]["name"][$i];
                    $uploadedFile = explode(".", $_FILES["trainingdevelopmentfiles"]["name"][$i]);
                    $filetypeArr  = explode("/", $_FILES["trainingdevelopmentfiles"]["type"][$i]);
                    $filetype     = $filetypeArr[0];
                    $extension    = $uploadedFile[1];
                    $filename     = $uploadedFile[0]."td".$i.time().'.'.$extension;

                    // ----- GET THE OLD DOCUMENT -----
                    if (in_array($employeememorandafilename, [$filename])) {
                        unset($employeememorandafilename[$filename]);
                    }
                    // ----- END GET THE OLD DOCUMENT -----
 
                    $folderDir = "assets/upload-files/documents/";
                    if (!is_dir($folderDir)) {
                        mkdir($folderDir);
                    }

                    $targetDir = $folderDir.$filename;
                    if (move_uploaded_file($_FILES["trainingdevelopmentfiles"]["tmp_name"][$i], $targetDir)) {
                        $temp = [
                            "employeeID"   => $employeeID,
                            "documentType" => "Training and Development",
                            "filename"     => $filename,
                            "filetype"     => $filetype,
                            "createdBy"    => $sessionID,
                            "updatedBy"    => $sessionID,
                        ];
                        array_push($trainingDevelopmentFiles, $temp);
                    }
                }
            }

            // OTHERS
            $othersFiles = [];
            if (isset($_FILES["othersfiles"])) {
                $fileLength = count($_FILES["othersfiles"]["name"]);
                for ($i=0; $i<$fileLength; $i++) {
                    $uploadedName = $_FILES["othersfiles"]["name"][$i];
                    $uploadedFile = explode(".", $_FILES["othersfiles"]["name"][$i]);
                    $filetypeArr  = explode("/", $_FILES["othersfiles"]["type"][$i]);
                    $filetype     = $filetypeArr[0];
                    $extension    = $uploadedFile[1];
                    $filename     = $uploadedFile[0]."o".$i.time().'.'.$extension;

                    // ----- GET THE OLD DOCUMENT -----
                    if (in_array($employeememorandafilename, [$filename])) {
                        unset($employeememorandafilename[$filename]);
                    }
                    // ----- END GET THE OLD DOCUMENT -----
 
                    $folderDir = "assets/upload-files/documents/";
                    if (!is_dir($folderDir)) {
                        mkdir($folderDir);
                    }

                    $targetDir = $folderDir.$filename;
                    if (move_uploaded_file($_FILES["othersfiles"]["tmp_name"][$i], $targetDir)) {
                        $temp = [
                            "employeeID"   => $employeeID,
                            "documentType" => "Others",
                            "filename"     => $filename,
                            "filetype"     => $filetype,
                            "createdBy"    => $sessionID,
                            "updatedBy"    => $sessionID,
                        ];
                        array_push($othersFiles, $temp);
                    }
                }
            }

            $documentData = array_merge(
                $contractAppraisalFiles, 
                $employeeMemorandaFiles,
                $trainingDevelopmentFiles,
                $othersFiles
            );
            $oldDocumentData = array_merge(
                $contractappraisalfilename,
                $employeememorandafilename,
                $trainingdevelopmentfilename,
                $othersfilename
            );
            $saveDocument = $this->employeemodule->saveDocument($documentData, $oldDocumentData, $action, $employeeID);


            $leaveData = [];
            foreach ($leaveCredit as $index => $leave) {
                $temp = [
                    "employeeID"       => $employeeID,
                    "leaveID"          => $leave["leaveTypeID"],
                    "leaveCredit"      => $leave["leaveBalance"] ?? 0,
                    "leaveAccumulated" => $leave["leaveAccumulated"] ?? 0,
                    "createdBy"        => $createdBy,
                    "updatedBy"        => $updatedBy,
                ];
                array_push($leaveData, $temp);
            }
            $saveLeaveCredit = $this->employeemodule->saveLeaveCredit($leaveData, $action, $employeeID);

            $accessData = [];
            foreach ($accessibility as $index => $module) {
                $temp = [
                    "employeeID"   => $employeeID,
                    "moduleID"     => $module["moduleID"],
                    "createStatus" => $module["createStatus"],
                    "readStatus"   => $module["readStatus"],
                    "updateStatus" => $module["updateStatus"],
                    "deleteStatus" => $module["deleteStatus"],
                    "printStatus"  => $module["printStatus"],
                    "createdBy"    => $createdBy,
                    "updatedBy"    => $updatedBy,
                ];
                array_push($accessData, $temp);
            }

            if ($action == "update") {
                unset($leaveData["createdBy"]);
                unset($accessData["createdBy"]);
            }
            $saveAccessibility = $this->employeemodule->saveAccessibility($accessData, $action, $employeeID);

            if ($saveDocument && $saveLeaveCredit && $saveAccessibility) {
                echo json_encode($saveEmployeeData);
            } else {
                echo json_encode("false|System error: Please contact the system administrator for assistance!");
            }
        } else {
            echo json_encode($saveEmployeeData);
        }

    }

}
