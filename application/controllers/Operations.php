<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Operations extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model("Operations_model", "operations");
    }

    public function index()
    {
        $data["title"] = "Operations";

        $this->load->view("template/header", $data);
        $this->load->view("gen/operations/index", $data);
        $this->load->view("template/footer", $data);
    }

    public function getTableData() 
    {
        $tableName    = $this->input->post("tableName");
        $columnName   = $this->input->post("columnName"); 
        $searchFilter = $this->input->post("searchFilter");
        $orderBy      = $this->input->post("orderBy");
        $groupBy      = $this->input->post("groupBy");
        $others       = $this->input->post("others");
        echo json_encode($this->operations->getTableData($tableName, $columnName, $searchFilter, $orderBy, $groupBy, $others));
    }

    public function getTableDataLength() 
    {
        $tableName    = $this->input->post("tableName");
        $columnName   = $this->input->post("columnName"); 
        $searchFilter = $this->input->post("searchFilter");
        $orderBy      = $this->input->post("orderBy");
        $groupBy      = $this->input->post("groupBy");
        $others       = $this->input->post("others");
        echo ($this->operations->getTableDataLength($tableName, $columnName, $searchFilter, $orderBy, $groupBy, $others));
    }

    public function getUploadedFiles()
    {
        $data = [];
        if (is_array($_FILES)) {
            if (count($_FILES) > 0 && !empty($_FILES["tableData"])) {
                $keys = array_keys($_FILES["tableData"]["name"]);
                for($x=0; $x<count($keys); $x++) {
                    $mixedFileName = "";

                    $fileKeyStr = $keys[$x];
                    $fileKeyArrParent = explode("|", $keys[$x]);
                    $fileKey    = $fileKeyArrParent[0];
                    $folderName = $fileKeyArrParent[1] ? $fileKeyArrParent[1] : "";
                    $fileLength = count($_FILES["tableData"]["name"][$fileKeyStr]);
                    for($i=0; $i<$fileLength; $i++) {
                        $fileName    = $_FILES["tableData"]["name"][$fileKeyStr][$i];
                        $fileTmpName = $_FILES["tableData"]["tmp_name"][$fileKeyStr][$i];

                        $targetDir = "assets/upload-files/$folderName/";
                        if (!is_dir($targetDir)) {
                            mkdir($targetDir);
                        }

                        if (!file_exists($targetDir."index.html")) {
                            copy('assets/index.html', $targetDir."index.html");
                        }

                        $fileKeyArr  = explode(".", explode("|", $fileName)[1] ?? "");
                        $fileKeyName = $fileKeyArr[0] ?? "";
                        $fileKeyType = $fileKeyArr[1] ?? "";

                        $targetFileName = $fileKeyName.$i.time().'.'.$fileKeyType;
                        $targetFile     = $targetDir.$targetFileName;
            
                        if (move_uploaded_file($fileTmpName, $targetFile)) {
                            $mixedFileName = $mixedFileName ? $mixedFileName."|".$targetFileName : $targetFileName;
                            
                        }
                        $data[$fileKey] = $mixedFileName;
                    }
                }
            }
        }
        return $data;
    }

    public function getUploadedMultipleFiles() 
    {
        $data = [];
        $columNames  = $this->input->post("uploadFileColumnName") ?? null;
        $oldFilename = $this->input->post("uploadFileOldFilename") ?? null;
        $folderName  = $this->input->post("uploadFileFolder") ?? "uploads";

        if ($columNames && !empty($columNames) && is_array($columNames)) {
            foreach($columNames as $index => $columnName) {
                $mixedFileName = $oldFilename[$index] ?? "";

                $uploadFiles = $_FILES["uploadFiles"]["name"][$index] ?? null;
                if ($uploadFiles) {
                    $countFiles = count($uploadFiles);
                    for ($i=0; $i<$countFiles; $i++) {
                        $fileName    = $_FILES["uploadFiles"]["name"][$index][$i];
                        $fileType    = $_FILES["uploadFiles"]["type"][$index][$i];
                        $fileTmpName = $_FILES["uploadFiles"]["tmp_name"][$index][$i];

                        $targetDir = "assets/upload-files/$folderName/";
                        if (!is_dir($targetDir)) {
                            mkdir($targetDir);
                        }

                        if (!file_exists($targetDir."index.html")) {
                            copy('assets/index.html', $targetDir."index.html");
                        }

                        $fileKeyArr  = explode(".", $fileName);
                        $fileKeyName = $fileKeyArr[0];
                        $fileKeyType = $fileKeyArr[1];

                        $targetFileName = $fileKeyName.$i.time().'.'.$fileKeyType;
                        $targetFile     = $targetDir.$targetFileName;
                        if (move_uploaded_file($fileTmpName, $targetFile)) {
                            $mixedFileName = $mixedFileName ? $mixedFileName."|".$targetFileName : $targetFileName;
                        }
                    }
                }

                $data[$columnName] = $mixedFileName;
            }
        }
        return $data;
    }

    public function insertTableData() 
    {
        $tableName = $this->input->post("tableName") ? $this->input->post("tableName") : null;
        $tableData = $this->input->post("tableData") ? $this->input->post("tableData") : false;
        $feedback  = $this->input->post("feedback")  ? $this->input->post("feedback") : null;
        $method    = $this->input->post("method")  ? $this->input->post("method") : false;
        $data = array();

        $uploadedFiles = $this->getUploadedFiles();
        if ($uploadedFiles && !empty($uploadedFiles)) {
            foreach ($uploadedFiles as $fileKey => $fileValue) {
                unset($data[$fileKey]);
                $data[$fileKey] = $fileValue;
            }
        }

        $uploadedMultipleFiles = $this->getUploadedMultipleFiles();
        if ($uploadedMultipleFiles && !empty($uploadedMultipleFiles)) {
            foreach ($uploadedMultipleFiles as $fileKey2 => $fileValue2) {
                unset($data[$fileKey2]);
                $data[$fileKey2] = $fileValue2;
            }
        }

        if ($tableName) {
            if ($tableData && !empty($tableData)) {
                foreach ($tableData as $key => $value) {
                    $data[$key] = $value;
                }
            }
            echo json_encode($this->operations->insertTableData($tableName, $data, $feedback, $method));
        } else {
            echo json_encode("false|Invalid arguments");
        }
    }

    public function insertNotificationData()
    {
        $employeeID              = $this->input->post("employeeID") ? $this->input->post("employeeID") : false;
        $moduleID                = $this->input->post("moduleID") ? $this->input->post("moduleID") : false;
        $tableID                 = $this->input->post("tableID") ? $this->input->post("tableID") : false;
        $notificationTitle       = $this->input->post("notificationTitle") ? $this->input->post("notificationTitle") : false;
        $notificationDescription = $this->input->post("notificationDescription") ? $this->input->post("notificationDescription") : false;
        $notificationType        = $this->input->post("notificationType") ? $this->input->post("notificationType") : false;
        echo json_encode(insertNotificationData($employeeID, $moduleID, $tableID, $notificationTitle, $notificationDescription, $notificationType));
    }

    public function updateTableData()
    {
        $tableName   = $this->input->post("tableName") ? $this->input->post("tableName") : null;
        $tableData   = $this->input->post("tableData") ? $this->input->post("tableData") : false;
        $whereFilter = $this->input->post("whereFilter") ? $this->input->post("whereFilter") : false;
        $feedback    = $this->input->post("feedback")  ? $this->input->post("feedback") : null;
        $method      = $this->input->post("method")  ? $this->input->post("method") : false;
        $data = array();

        $uploadedFiles = $this->getUploadedFiles();
        if ($uploadedFiles && !empty($uploadedFiles)) {
            foreach ($uploadedFiles as $fileKey => $fileValue) {
                unset($data[$fileKey]);
                $data[$fileKey] = $fileValue;
            }
        }

        $uploadedMultipleFiles = $this->getUploadedMultipleFiles();
        if ($uploadedMultipleFiles && !empty($uploadedMultipleFiles)) {
            foreach ($uploadedMultipleFiles as $fileKey2 => $fileValue2) {
                unset($data[$fileKey2]);
                $data[$fileKey2] = $fileValue2;
            }
        }
        
        if ($tableName && $whereFilter) {
            if ($tableData && !empty($tableData)) {
                foreach ($tableData as $key => $value) {
                    $data[$key] = $value;
                }
            }
            echo json_encode($this->operations->updateTableData($tableName, $data, $whereFilter, $feedback, $method));
        } else {
            echo json_encode("false|Invalid arguments");
        }
    }

    public function deleteTableData()
    {
        $tableName   = $this->input->post("tableName") ? $this->input->post("tableName") : null;
        $whereFilter = $this->input->post("whereFilter") ? $this->input->post("whereFilter") : false;
        $feedback    = $this->input->post("feedback")  ? $this->input->post("feedback") : null;

        if ($tableName && $whereFilter) {
            echo json_encode($this->operations->deleteTableData($tableName, $whereFilter, $feedback));
        } else {
            echo json_encode("false|Invalid arguments");
        }
    }

    public function database()
    {
        $sql = $this->input->post("sql");
        echo json_encode($this->operations->database($sql));
    }

    public function getUnionTableData()
    {
        $unionData = $this->input->post("unionData");
        echo json_encode($this->operations->unionData($unionData));
    }

}
