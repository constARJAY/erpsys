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
            if (count($_FILES) > 0) {
                $keys = array_keys($_FILES["tableData"]["name"]);
                for($x=0; $x<count($keys); $x++) {
                    $fileKeyStr = $keys[$x];
                    $fileKeyArr = explode("|", $keys[$x]);
                    $fileKey    = $fileKeyArr[0];
                    $folder     = $fileKeyArr[1] ? $fileKeyArr[1] : "";
                    $fileName   = "";
                    $fileLength = count($_FILES["tableData"]["name"][$fileKeyStr]);
                    for($i=0; $i<$fileLength; $i++) {
                        $target_dir = "assets/upload-files/$folder/";
                        if (!is_dir($target_dir)) {
                            mkdir($target_dir);
                        }
                        $keyArr = explode(".", $_FILES["tableData"]["name"][$fileKeyStr][$i]);
                        $fileType = pathinfo(basename($_FILES["tableData"]["name"][$fileKeyStr][$i]),PATHINFO_EXTENSION);
                        $target_file = $target_dir.$i.time().'.'.$fileType;
            
                        if (move_uploaded_file($_FILES["tableData"]["tmp_name"][$fileKeyStr][$i], $target_file)) {
                            $temp = $i.time().'.'.$fileType;
                            $fileName = $fileName ? $fileName."|".$temp : $temp;
                            
                        }
                        $data[$fileKey] = $fileName;
                    }
                }
            }
        }
        // var_dump($data);
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
        if ($uploadedFiles) {
            foreach ($uploadedFiles as $fileKey => $fileValue) {
                $data[$fileKey] = $fileValue;
            }
        }

        if ($tableName) {
            if ($tableData && count($tableData) > 0) {
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
        if ($uploadedFiles) {
            foreach ($uploadedFiles as $fileKey => $fileValue) {
                $data[$fileKey] = $fileValue;
            }
        }
        
        if ($tableName && $whereFilter) {
            if ($tableData && count($tableData) > 0) {
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
