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
            pplt.projectListCode AS projectCode,
            pplt.projectListName AS projectName
        FROM 
            pms_timeline_builder_tbl AS ptbt
            LEFT JOIN pms_project_list_tbl AS pplt ON ptbt.projectID = pplt.projectListID
        WHERE 
            ptbt.timelineBuilderID = $timelineBuilderID";
        $query = $this->db->query($sql);
        return $query ? $query->row() : false;
    }

    public function getMilestoneList($milestoneBuilderID = 0,$timelineBuilderID = 0)
    {
        $output = [];
        $sql    = "SELECT * FROM pms_milestone_list_tbl WHERE milestoneBuilderID = $milestoneBuilderID";
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
                "taskStartDate" => $task["newTaskStartDate"] ? date("M d, Y", strtotime($task["newTaskStartDate"])) : date("M d, Y", strtotime($task["defaultTaskStartDate"])),
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
        petd.createdAt 
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
                "createdAt"  => $subtask["createdAt"] ? $subtask["createdAt"] : ""
               
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

    public function getTimelinePhases($timelineBuilderID = 0)
    {
        $output = [];
        $sql    = "
        SELECT 
            pttlt.milestoneBuilderID,
            phaseCode,
            phaseDescription
        FROM 
            pms_timeline_task_list_tbl AS pttlt
            LEFT JOIN pms_milestone_builder_tbl AS pmbt USING(milestoneBuilderID) 
        WHERE 
            timelineBuilderID = $timelineBuilderID 
            GROUP BY milestoneBuilderID";
        $query = $this->db->query($sql);

        $phases = $query ? $query->result_array() : [];
        foreach ($phases as $phase) {
            $milestoneBuilderID = $phase["milestoneBuilderID"];
            $temp = [
                "milestoneBuilderID" => $milestoneBuilderID,
                "phaseCode"          => $phase["phaseCode"],
                "phaseDescription"   => $phase["phaseDescription"],
                "milestones"         => $this->getMilestoneList($milestoneBuilderID,$timelineBuilderID),
                // "tasks"              => $this->getTaskList($timelineBuilderID, $milestoneBuilderID),
            ];
            array_push($output, $temp);
        }
        return $output;
    }

    public function getTimelineContent($timelineBuilderID = 1)
    {
        $output = [];
        $projectDetails = $this->getProjectDetails($timelineBuilderID);
        if ($projectDetails) {
            $output["timelineBuilderID"] = $projectDetails->timelineBuilderID;
            $output["employeeID"]        = $projectDetails->employeeID;
            $output["teamMember"]        = $projectDetails->teamMember;
            $output["projectName"]       = $projectDetails->projectName;
            $output["projectCode"]       = $projectDetails->projectCode;
            $output["timelineManagementStatus"] = $projectDetails->timelineManagementStatus;

            $output["phases"] = $this->getTimelinePhases($timelineBuilderID);
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

    public function autoSavedHeader($data,$taskBoardID,$label=null){
    //    echo($taskBoardID);

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

    public function saveImageContent($img,$subtaskboardID,$taskBoardID ) {

        $listID = [];
        if ($img && count($img) > 0) {
          
           
                for($count =0; $count<count($img);$count++){
                    $query = $this->db->query("INSERT INTO `pms_image_taskboard_tbl`( `imageName`, `subtaskboardID`,`taskBoardID`) VALUES ('$img[$count]','$subtaskboardID','$taskBoardID')");
                    $insertID = $this->db->insert_id();
                    $listID[$count]=$insertID;
                }
              
           

            return $query ? $listID : "false|System error: Please contact the system administrator for assistance!";

        }
    }

    public function deleteImageContent($imageSrc) {

          $query = $this->db->delete('pms_image_taskboard_tbl', array('imageName' => $imageSrc));

            return $query ? true : "false|System error: Please contact the system administrator for assistance!";

        
    }

    public function updateImgComment($imageID,$imageComment) {
        $condition = '';

        $query = $this->db->query("UPDATE pms_image_taskboard_tbl
        SET imageComment = '$imageComment'
        WHERE  imageID = $imageID");

          return $query ? true : "false|System error: Please contact the system administrator for assistance!";

      
    }

    public function updateAssignee($subtaskboardID = null,$passListAssignee = null) {

        if ($passListAssignee && count($passListAssignee) > 0) {
          
            
                $this->db->where('subtaskboardID', $subtaskboardID);
                $query = $this->db->update('pms_employeetaskoard_details_tbl', $passListAssignee);
                $insertID = $subtaskboardID;
          

            return $query ? true : "false|System error: Please contact the system administrator for assistance!";

        }
    }

    public function logHistory($label =null,$data=false, $taskboardID=null,$subtaskboardID = null){

       
        $value="";
        $databaseColumn="";
        $databaseTable ="";
        $action="";


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

            $checkData = $this->db->query("SELECT $databaseColumn FROM $databaseTable  WHERE taskboardID = $taskboardID AND $databaseColumn  IS NOT NULL ");

                if($checkData -> num_rows()){
                    $action="changed";
                }else{
                    $action = "set";
                }

                $logData = array(
                    'taskboardID' => $taskboardID,
                    'object_label' => $label,
                    'action' => $action,
                    'object_value' => $value,
                    'createdBy' => $employeeID

                );
            
                $this->db->insert('pms_employeetaskboard_log_tbl', $logData); 
            

        }


        
    }


}


