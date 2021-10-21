<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class EmployeeTaskboard_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
    }

    public function saveProjectBudget($timelineBuilderID = null, $allocatedBudget = null)
    {
        $sessionID = $this->session->has_userdata("adminSessionID") ? $this->session->userdata("adminSessionID") : 1;

        if ($timelineBuilderID && $allocatedBudget) {
            $data = [
                "timelineAllocatedBudget" => $allocatedBudget,
                "timelineBudgetStatus"    => 1, // ALLOCATED
                "timelineBuilderStatus"   => 7, // REASSESSMENT
                "allocatedBudgetBy"       => $sessionID,
                "updatedBy"               => $sessionID
            ];
            $query = $this->db->update("pms_timeline_builder_tbl", $data, ["timelineBuilderID" => $timelineBuilderID]);
            return $query ? "true|Successfully submitted|$timelineBuilderID|".date("Y-m-d") : "false|System error: Please contact the system administrator for assistance!";
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }

    // ----- GET TIMELINE CONTENT -----
    public function getProjectDetails($timelineBuilderID = 0)
    {
        $sql = "
        SELECT 
            ptbt.timelineBuilderID,
            ptbt.employeeID,
            ptbt.timelineTeamMember AS teamMember,
            ptbt.timelineBuilderStatus,
            ptbt.timelineManagementStatus,
            ptbt.projectCode,
            pplt.projectListName AS projectName,
            (SELECT categoryName FROM pms_category_tbl WHERE categoryID = pplt.categoryID) as projectCategory
        FROM 
            pms_timeline_builder_tbl AS ptbt
            LEFT JOIN pms_project_list_tbl AS pplt ON ptbt.projectID = pplt.projectListID
        WHERE 
            ptbt.timelineBuilderID = $timelineBuilderID";
        $query = $this->db->query($sql);
        return $query ? $query->row() : false;
    }

    public function getMilestoneList($milestoneBuilderID = 0,$timelineBuilderID = 0,$projectMilestoneName =false)
    {
       

        $output = [];
        $condition ="";

        if($projectMilestoneName){
            $condition =" AND projectMilestoneName = '$projectMilestoneName' ";
        }
        $sql    = "SELECT * FROM pms_milestone_list_tbl WHERE milestoneBuilderID = $milestoneBuilderID  $condition";
        $query  = $this->db->query($sql);
        $milestones = $query ? $query->result_array() : [];
        foreach ($milestones as $milestone) {
            $projectMilestoneID   = $milestone["projectMilestoneID"];
            $projectMilestoneName = $milestone["projectMilestoneName"];
            $temp = [
                "milestoneID"   => $projectMilestoneID,
                "milestoneBuilderID"   => $milestoneBuilderID,
                "timelineBuilderID"   => $timelineBuilderID,
                "milestoneName" => $projectMilestoneName,
                "tasks"              => $this->getTaskList($timelineBuilderID, $projectMilestoneID,$milestoneBuilderID)
            ];
            array_push($output, $temp);
        }

        // var_dump($sql);
        // // echo "<pre>";
        // // print_r($output);
        // exit;

        return $output;
    }

    public function getTimelineBoard($timelineBuilderID = 0, $taskID = 0)
    {
        $output = [];
        $sql    = "SELECT * FROM pms_timeline_management_tbl WHERE timelineBuilderID = $timelineBuilderID AND taskID = $taskID";
        $query  = $this->db->query($sql);
        $milestones = $query ? $query->result_array() : [];
        foreach ($milestones as $milestone) {
            $temp = [
                "timelineManagementID" => $milestone["timelineManagementID"],
                "milestoneID"          => $milestone["projectMilestoneID"],
                "manHours"             => $milestone["manHours"],
                "assignedEmployee"     => $milestone["assignedEmployee"]
            ];
            array_push($output, $temp);
        }
        return $output;
    }

    public function getTaskList($timelineBuilderID = 0, $projectMilestoneID = 0,$milestoneBuilderID =0)
    {
        $output = [];
        $sql    = 'SELECT  pmt.taskID,
                pet.taskBoardID,
                pmt.createdAt,  
                pet.timelineBuilderID,
                pet.projectMilestoneID,
                pet.milestoneBuilderID,
                pmt.taskName,
                pmt.allottedHours as manHours,
                pet.taskUsedHours,
                pmt.taskStartDate as defaultTaskStartDate,
                pmt.taskEndDate as defaultTaskEndDate, 
                pet.taskStartDates as newTaskStartDate,
                pet.taskEndDates as newTaskEndDate , 
                pet.taskPriority,
                pet.taskSeverity,
                pet.taskTimeLeft,
                pet.taskStatus,
                pet.taskNotes,
                pet.taskDescription,
                pet.extension, 
                pet.createdAt 
                FROM
                pms_timeline_task_list_tbl as pmt 
                LEFT JOIN  pms_timeline_management_tbl as ptm ON ptm.timelineBuilderID = pmt.timelineBuilderID AND ptm.taskID = pmt.taskID 
                LEFT JOIN pms_employeetaskoard_tbl as pet ON pet.taskID = pmt.taskID AND pet.timelineBuilderID = pmt.timelineBuilderID AND pet.projectMilestoneID = ptm.projectMilestoneID
                WHERE pmt.timelineBuilderID ='.$timelineBuilderID.' AND pmt.milestoneBuilderID='.$milestoneBuilderID.' AND ptm.projectMilestoneID = '.$projectMilestoneID;

             
       
        $query  = $this->db->query($sql);
        $tasks  = $query ? $query->result_array() : [];
        foreach ($tasks as $task) {
            $temp = [
                "taskCode"      => 'TSK-'.SUBSTR($task["createdAt"],2,3).''.STR_PAD($task["taskID"],5,0,STR_PAD_LEFT),
                "taskBoardID"        => $task["taskBoardID"] ? $task["taskBoardID"] : "" ,
                "taskID"        => $task["taskID"],
                "timelineBuilderID"  => $task["timelineBuilderID"] ? $task["timelineBuilderID"] : $timelineBuilderID,
                "projectMilestoneID" => $task["projectMilestoneID"] ? $task["projectMilestoneID"] : $projectMilestoneID,
                "milestoneBuilderID" => $task["milestoneBuilderID"] ? $task["milestoneBuilderID"] : $milestoneBuilderID,
                "taskName"      => $task["taskName"],
                "manHours"      => $task["manHours"],
                "usedHours"      => $task["taskUsedHours"] ? $task["taskUsedHours"] : 0 ,
                "taskStartDate" => $task["newTaskStartDate"] ? date("M d, Y", strtotime($task["newTaskStartDate"])) : date("M d, Y", strtotime($task["defaultTaskEndDate"])),
                "taskEndDate"   => $task["newTaskEndDate"] ? date("M d, Y", strtotime($task["newTaskEndDate"])) : date("M d, Y", strtotime($task["defaultTaskEndDate"])),
                "extension"   => $task["extension"] ? date("M d, Y", strtotime($task["extension"])) : date("M d, Y"),
                "taskPriority"  => $task["taskPriority"] ? $task["taskPriority"] : "",
                "taskSeverity"  => $task["taskSeverity"] ? $task["taskSeverity"] : "",
                "taskTimeLeft"  => $task["taskTimeLeft"] ? $task["taskTimeLeft"] : "",
                "taskStatus"  => $task["taskStatus"] ? $task["taskStatus"] : "",
                "taskNotes"  => $task["taskNotes"] ? $task["taskNotes"] : "",
                "taskDescription"  => $task["taskDescription"] ? $task["taskDescription"] : "",
                "milestoneTask" => $this->getTimelineBoard($timelineBuilderID, $task["taskID"]),
                "assignedEmployee"=>$this->getAssignEmployee($task["taskID"],$timelineBuilderID) ,
                "subTask"=>$this->getSubTaskList($task["timelineBuilderID"] ? $task["timelineBuilderID"] : $timelineBuilderID, 
                                                $task["projectMilestoneID"] ? $task["projectMilestoneID"] : $projectMilestoneID,
                                                $task["milestoneBuilderID"] ? $task["milestoneBuilderID"] : $milestoneBuilderID,
                                                $task["taskBoardID"],
                                                $task["taskID"])
            ];
            array_push($output, $temp);
        }
        return $output;
    }

    public function getSubTaskList($timelineBuilderID = 0, $projectMilestoneID = 0,$milestoneBuilderID =0,$taskBoardID =0,$taskID =0)
    {   
        $addCondition= '';
        if($taskBoardID){
            $addCondition = ' OR  (petd.taskBoardID = '.$taskBoardID .' )'; //AND petd.taskBoardID IS NOT NULL )';
        }
     
        $output = [];
        $sql    = 'SELECT DISTINCT petd.subtaskboardID,
        petd.taskID,
        petd.taskBoardID,
        petd.timelineBuilderID,
        petd.projectMilestoneID,
        petd.milestoneBuilderID,
        petd.subTaskName,
        petd.subTaskAssignee,
        petd.subTaskDescription,
        petd.subTaskManHours,
        petd.subTaskUsedHours,
        petd.subTaskStartDates,
        petd.subTaskEndDates, 
        petd.subTaskPriority,
        petd.subTaskSeverity,
        petd.subTaskTimeLeft,
        petd.subTaskStatus,
        petd.subTaskNotes, 
        petd.extension, 
        petd.createdAt,
        petd.createdBy
        FROM
        pms_employeetaskoard_tbl as pet 
        LEFT JOIN pms_employeetaskoard_details_tbl as petd ON petd.taskID = pet.taskID AND petd.timelineBuilderID = pet.timelineBuilderID AND petd.projectMilestoneID = pet.projectMilestoneID OR petd.taskBoardID = 0
        WHERE (petd.timelineBuilderID = '.$timelineBuilderID.' AND petd.milestoneBuilderID= '.$milestoneBuilderID.' AND petd.projectMilestoneID = '.$projectMilestoneID.' AND petd.taskID ='.$taskID.') '. $addCondition ;

             
       
        $query  = $this->db->query($sql);
        $subtasks  = $query ? $query->result_array() : [];
        foreach ($subtasks as $subtask) {
            $temp = [
                "taskBoardID"        => $subtask["taskBoardID"] ? $subtask["taskBoardID"] : "" ,
                "subtaskboardID"        => $subtask["subtaskboardID"] ? $subtask["subtaskboardID"] : "" ,
                "taskID"        => $subtask["taskID"],
                "timelineBuilderID"  => $subtask["timelineBuilderID"] ? $subtask["timelineBuilderID"] : $timelineBuilderID,
                "projectMilestoneID" => $subtask["projectMilestoneID"] ? $subtask["projectMilestoneID"] : $projectMilestoneID,
                "milestoneBuilderID" => $subtask["milestoneBuilderID"] ? $subtask["milestoneBuilderID"] : $milestoneBuilderID,
                "subTaskName"      => $subtask["subTaskName"],
                "subTaskAssignee"      => $subtask["subTaskAssignee"] ? $subtask["subTaskAssignee"] : "",
                "subTaskDescription"      =>  $subtask["subTaskDescription"] ? $subtask["subTaskDescription"] : "" ,
                "subTaskManHours"      =>  $subtask["subTaskManHours"] ? $subtask["subTaskManHours"] : 0 ,
                "subTaskUsedHours"      => $subtask["subTaskUsedHours"] ? $subtask["subTaskUsedHours"] : 0 ,
                "subTaskEndDates" =>  date("M d, Y", strtotime($subtask["subTaskEndDates"])),
                "subTaskStartDates"   => date("M d, Y", strtotime($subtask["subTaskStartDates"])),
                "extension"   =>  $subtask["extension"] ? date("F d, Y", strtotime($subtask["extension"])): date("M d, Y"),
                "subTaskPriority"  => $subtask["subTaskPriority"] ? $subtask["subTaskPriority"] : "",
                "subTaskSeverity"  => $subtask["subTaskSeverity"] ? $subtask["subTaskSeverity"] : "",
                "subTaskTimeLeft"  => $subtask["subTaskTimeLeft"] ? $subtask["subTaskTimeLeft"] : "",
                "subTaskStatus"  => $subtask["subTaskStatus"] ? $subtask["subTaskStatus"] : "",
                "subTaskNotes"  => $subtask["subTaskNotes"] ? $subtask["subTaskNotes"] : "",
                "createdAt"  => $subtask["createdAt"] ? $subtask["createdAt"] : "",
                "createdBy"  => $subtask["createdBy"] ? $subtask["createdBy"] : ""
               
            ];
            array_push($output, $temp);
        }
        return $output;
    }

    public function getAssignEmployee($taskID = 0, $timelineBuilderID = 0)
    {
        $output = [];
        $sql    = "SELECT * FROM pms_timeline_management_tbl WHERE timelineBuilderID = $timelineBuilderID AND taskID = $taskID GROUP BY assignedEmployee ";
        $query  = $this->db->query($sql);
        $tasks  = $query ? $query->result_array() : [];
        foreach ($tasks as $employee) {
            $temp = [
                "assignedEmployee"        => $employee["assignedEmployee"],
            ];
            array_push($output, $temp);
        }
        return $output;
    }

    public function getTimelinePhases($timelineBuilderID = 0, $phaseCode = false, $projectMilestoneName =false)
    {
        
        $output = [];
        $condition = "";
        if($phaseCode){
            $condition = " AND phaseCode = '$phaseCode' ";
        }

        $sql    = "
        SELECT 
            pttlt.milestoneBuilderID,
            phaseCode,
            phaseDescription
        FROM 
            pms_timeline_task_list_tbl AS pttlt
            LEFT JOIN pms_milestone_builder_tbl AS pmbt USING(milestoneBuilderID) 
        WHERE 
            timelineBuilderID = $timelineBuilderID  $condition
            GROUP BY milestoneBuilderID";
        $query = $this->db->query($sql);

        $phases = $query ? $query->result_array() : [];
        foreach ($phases as $phase) {
            $milestoneBuilderID = $phase["milestoneBuilderID"];
            $temp = [
                "milestoneBuilderID" => $milestoneBuilderID,
                "phaseCode"          => $phase["phaseCode"],
                "phaseDescription"   => $phase["phaseDescription"],
                "milestones"         => $this->getMilestoneList($milestoneBuilderID,$timelineBuilderID,$projectMilestoneName),
                // "tasks"              => $this->getTaskList($timelineBuilderID, $milestoneBuilderID),
            ];
            array_push($output, $temp);
        }
        return $output;
    }

    public function getTimelineContent($timelineBuilderID = 1,$phaseCode = false,$projectMilestoneName =false)
    {   
        

        $output = [];
        $projectDetails = $this->getProjectDetails($timelineBuilderID);
        if ($projectDetails) {
            $output["timelineBuilderID"] = $projectDetails->timelineBuilderID;
            $output["employeeID"]        = $projectDetails->employeeID;
            $output["teamMember"]        = $projectDetails->teamMember;
            $output["projectName"]       = $projectDetails->projectName;
            $output["projectCode"]       = $projectDetails->projectCode;
            $output["projectCategory"]       = $projectDetails->projectCategory;
            $output["timelineManagementStatus"] = $projectDetails->timelineManagementStatus;

            $output["phases"] = $this->getTimelinePhases($timelineBuilderID,$phaseCode,$projectMilestoneName);
        }
        return $output;
    }
    // ----- END GET TIMELINE CONTENT -----


    public function deleteProjectBoard($timelineBuilderID = 0)
    {
        $query = $this->db->delete("pms_timeline_management_tbl", ["timelineBuilderID" => $timelineBuilderID]);
        return $query ? true : false;
    }

    public function updateProjectBuilder($timelineBuilderID, $timelineManagementStatus)
    {
        $query = $this->db->update("pms_timeline_builder_tbl", ["timelineManagementStatus" => $timelineManagementStatus], ["timelineBuilderID" => $timelineBuilderID]);
        return $query ? true : false;
    }

    public function saveProjectBoard($timelineBuilderID = 0, $timelineManagementStatus = 0, $data = [])
    {
        $delete = $this->deleteProjectBoard($timelineBuilderID);
        $update = $this->updateProjectBuilder($timelineBuilderID, $timelineManagementStatus);
        if ($data && count($data) > 0) {
            $query = $this->db->insert_batch("pms_timeline_management_tbl", $data);
            return $query ? "true|Successfully submitted|$timelineBuilderID|".date("Y-m-d") : "false|System error: Please contact the system administrator for assistance!";
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }

    public function updateExtension($taskBoardID,$subtaskboardID,$extension) {
        $condition = '';
        $databaseTables = "";

        if($taskBoardID !=0){
            $condition = "taskBoardID = $taskBoardID";
            $databaseTables = "pms_employeetaskoard_tbl";
        }else{
            $condition = "subtaskboardID = $subtaskboardID";
            $databaseTables = "pms_employeetaskoard_details_tbl";

        }

        $query = $this->db->query("UPDATE $databaseTables
        SET extension = '$extension'
        WHERE  $condition");

          return $query ? true : "false|System error: Please contact the system administrator for assistance!";

      
    }

    public function autoSavedHeader($data,$taskBoardID,$label=null,$generateProejctData = ""){
    //    echo($taskBoardID);
        $get_insertID = [];
        if($generateProejctData == "save"){

            for($loop = 0; $loop<count($data); $loop++){

                $query = $this->db->insert("pms_employeetaskoard_tbl", $data[$loop]);
                $insertID = $this->db->insert_id();
               
               $get_insertID[$loop]= $insertID;
            //    $temp = [$loop];
            //    array_push($get_insertID ,$temp);
            }
            return $get_insertID;
        }else{
            if ($data && count($data) > 0) {
            
                if($taskBoardID){
                    $this->logHistory($label,$data, $taskBoardID,"");
                    // $query = $this->db->update('pms_employeetaskoard_tbl', $data, array('taskBoardID' => $taskBoardID));
                    $this->db->where('taskBoardID', $taskBoardID);
                    $query = $this->db->update('pms_employeetaskoard_tbl', $data);
                    $insertID = $taskBoardID;
                }else{
                    $query = $this->db->insert("pms_employeetaskoard_tbl", $data);
                    $insertID = $this->db->insert_id();
                    $this->logHistory($label,$data, $insertID,"");
                } 
                return $query ? $insertID : "false|System error: Please contact the system administrator for assistance!";
            }
        }

        
    }

    public function autoSavedSubtask($data,$subtaskboardID,$label=null) {

        if ($data && count($data) > 0) {
          
            if($subtaskboardID){
                $this->logHistory($label,$data,"",$subtaskboardID);
                // $query = $this->db->update('pms_employeetaskoard_tbl', $data, array('taskBoardID' => $taskBoardID));
                $this->db->where('subtaskboardID', $subtaskboardID);
                $query = $this->db->update('pms_employeetaskoard_details_tbl', $data);
                $insertID = $subtaskboardID;
            }else{
                $query = $this->db->insert("pms_employeetaskoard_details_tbl", $data);
                $insertID = $this->db->insert_id();
                $this->logHistory($label,$data,"",$insertID);
            } 

            return $query ? $insertID : "false|System error: Please contact the system administrator for assistance!";

        }
    }

    public function deleteSubtaskContent($subtaskboardID =""){

        $this->db->where('subtaskboardID', $subtaskboardID);
        $this->db->delete('pms_employeetaskoard_details_tbl');

        $this->db->where('subtaskboardID', $subtaskboardID);
        $this->db->delete('pms_employeetaskboard_log_tbl');

        $this->db->where('subtaskboardID', $subtaskboardID);
        $this->db->delete('pms_employeetaskboard_log_tbl');

        $queryImageSrc  = $this->db->query("SELECT imageName FROM pms_image_taskboard_tbl WHERE subtaskboardID =  '$subtaskboardID' ");

        $result  = $queryImageSrc->result_array();

        foreach($result as $value){
        unlink("assets/upload-files/taskboard-images/".$value["imageName"]);
        }
    
        $this->db->where('subtaskboardID', $subtaskboardID);
        $query = $this->db->delete('pms_image_taskboard_tbl');
     
     
        return $query ? true : "false|System error: Please contact the system administrator for assistance!";

    
}

    public function saveImageContent($img,$subtaskboardID,$taskBoardID,$label=null ) {
     
        $listID = [];
        if ($img && count($img) > 0) {
          
           
                for($count =0; $count<count($img);$count++){
                    $query = $this->db->query("INSERT INTO `pms_image_taskboard_tbl`( `imageName`, `subtaskboardID`,`taskBoardID`) VALUES ('$img[$count]','$subtaskboardID','$taskBoardID')");
                    $insertID = $this->db->insert_id();
                    $listID[$count]=$insertID;
                }
              
                $this->logHistory($label,"",$taskBoardID,$subtaskboardID);

            return $query ? $listID : "false|System error: Please contact the system administrator for assistance!";

        }
    }

    public function deleteImageContent($imageSrc,$label=null) {

            $queryGetID  = $this->db->query("SELECT taskboardID,subtaskboardID FROM pms_image_taskboard_tbl WHERE imageName =  '$imageSrc' ");

            $taskboardID = $queryGetID->row()->taskboardID;
            $subtaskboardID = $queryGetID->row()->subtaskboardID;

          $query = $this->db->delete('pms_image_taskboard_tbl', array('imageName' => $imageSrc));
          $this->logHistory($label,"",$taskboardID,$subtaskboardID);
            return $query ? true : "false|System error: Please contact the system administrator for assistance!";

        
    }

    public function updateImgComment($imageID,$imageComment,$label=null) {
        $condition = '';

        $queryGetID  = $this->db->query("SELECT taskboardID,subtaskboardID FROM pms_image_taskboard_tbl WHERE imageID = $imageID ");

        $taskboardID = $queryGetID->row()->taskboardID;
        $subtaskboardID = $queryGetID->row()->subtaskboardID;

        $query = $this->db->query("UPDATE pms_image_taskboard_tbl
        SET imageComment = '$imageComment'
        WHERE  imageID = $imageID");

        $this->logHistory($label,$imageComment ,$taskboardID,$subtaskboardID);

          return $query ? true : "false|System error: Please contact the system administrator for assistance!";

      
    }

    public function updateAssignee($subtaskboardID = null,$passListAssignee = null,$label=null) {

        if ($passListAssignee && count($passListAssignee) > 0) {
          
            
                $this->db->where('subtaskboardID', $subtaskboardID);
                $query = $this->db->update('pms_employeetaskoard_details_tbl', $passListAssignee);
                $insertID = $subtaskboardID;
                $this->logHistory($label,$passListAssignee,"",$subtaskboardID);

            return $query ? true : "false|System error: Please contact the system administrator for assistance!";

        }
    }

    public function updateEmployeeTaskStatus($data,$taskBoardID = 0,$subtaskboardID = 0,$employeeID=0) {

        $condition = $subtaskboardID ? "taskboardID = $taskBoardID AND subtaskboardID = $subtaskboardID AND" : "taskboardID = $taskBoardID AND subtaskboardID =0 AND";
        $this->db->query("DELETE FROM pms_employee_taskboard_status_tbl WHERE $condition   employeeID = $employeeID ");
  

        if($taskBoardID || $subtaskboardID){
            if (count($data) > 0) {
                $query = $this->db->insert('pms_employee_taskboard_status_tbl', $data);
                // $insertID = $subtaskboardID;
                // $this->logHistory($label,$passListAssignee,"",$subtaskboardID);
                return $query ? true : "false|System error: Please contact the system administrator for assistance!";
            }
        }
    }

    public function logHistory($label =null,$data=false, $taskboardID=null,$subtaskboardID = null){

       
       
        $value="";
        $databaseColumn="";
        $databaseTable ="";
        $action="changed";


        $employeeID = $this->session->userdata('adminSessionID');

        if($taskboardID){
            $databaseTable ="pms_employeetaskoard_tbl";

            if($label == "description"){
                 $value = $data["taskDescription"];
                 $databaseColumn = "taskDescription";
            }

            if($label == "used hours"){
                 $value = $data["taskUsedHours"];
                 $databaseColumn = "taskUsedHours";
            }

            if($label == "actual end date"){
                $value = $data["taskEndDates"];
                $databaseColumn = "taskEndDates";
           }

            if($label == "priority"){
                 $value = $data["taskPriority"];
                 $databaseColumn = "taskPriority";
            }

            if($label == "severity"){
                $value = $data["taskSeverity"];
                $databaseColumn = "taskSeverity";
           }

            if($label == "status"){
                 $value = $data["taskStatus"];
                 $databaseColumn = "taskStatus";
            }

            if($label == "notes"){
                $value = $data["taskNotes"];
                $databaseColumn = "taskNotes";
           }

           if($label == "attachment"){
           
            $databaseColumn = "subTaskNotes";
            $action="added";
            }

            if($label == "delete attachment"){
            $label ="attachment row";
            // $databaseColumn = "subTaskNotes";
            $action="deleted";
            }

            if($label == "comment"){
                $value = $data;
                // $databaseColumn = "taskNotes";
           }

            // $checkData = $this->db->query("SELECT $databaseColumn FROM $databaseTable  WHERE taskboardID = $taskboardID AND $databaseColumn  IS NOT NULL ");

            //     if($checkData -> num_rows()){
            //         $action="changed";
            //     }else{
            //         $action = "set";
            //     }

                $logData = array(
                    'taskboardID' => $taskboardID,
                    'object_label' => $label,
                    'action' => $action,
                    'object_value' => $value,
                    'createdBy' => $employeeID

                );
            
                $this->db->insert('pms_employeetaskboard_log_tbl', $logData); 
            

        }

        if($subtaskboardID){
            $databaseTable ="pms_employeetaskoard_details_tbl";

            if($label == "description"){
                 $value = $data["subTaskDescription"];
                 $databaseColumn = "subTaskDescription";
            }

            if($label == "assigned"){
                $value = $data["subTaskAssignee"];
                $databaseColumn = "subTaskAssignee";
           }

            if($label == "man hours"){
                $value = $data["subTaskManHours"];
                $databaseColumn = "subTaskManHours";
           }

            if($label == "used hours"){
                 $value = $data["subTaskUsedHours"];
                 $databaseColumn = "subTaskUsedHours";
            }

            if($label == "actual end date"){
                $value = $data["subTaskEndDates"];
                $databaseColumn = "subTaskEndDates";
           }

            if($label == "priority"){
                 $value = $data["subTaskPriority"];
                 $databaseColumn = "subTaskPriority";
            }

            if($label == "severity"){
                $value = $data["subTaskSeverity"];
                $databaseColumn = "subTaskSeverity";
           }

            if($label == "status"){
                 $value = $data["subTaskStatus"];
                 $databaseColumn = "subTaskStatus";
            }

            if($label == "notes"){
                $value = $data["subTaskNotes"];
                $databaseColumn = "subTaskNotes";
           }

           if($label == "attachment"){
           
            $databaseColumn = "subTaskNotes";
            $action="added";
            }

            if($label == "delete attachment"){
            $label ="attachment row";
            // $databaseColumn = "subTaskNotes";
            $action="deleted";
            }

            if($label == "comment"){
                $value = $data;
                // $databaseColumn = "taskNotes";
           }

            // $checkData = $this->db->query("SELECT $databaseColumn FROM $databaseTable  WHERE subtaskboardID = $subtaskboardID AND $databaseColumn  IS NOT NULL ");

            //     if($checkData -> num_rows()){
            //         $action="changed";
            //     }else{
            //         $action = "set";
            //     }

                $logData = array(
                    'subtaskboardID' => $subtaskboardID,
                    'object_label' => $label,
                    'action' => $action,
                    'object_value' => $value,
                    'createdBy' => $employeeID

                );
            
                $this->db->insert('pms_employeetaskboard_log_tbl', $logData); 
            

        }


        
    }


}


