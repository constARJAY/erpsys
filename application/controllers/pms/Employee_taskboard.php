<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Employee_taskboard extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model("pms/EmployeeTaskboard_model", "employee_taskboard");
        isAllowed(51);
    }

    public function index()
    {
        $data["title"] = "Employee Taskboard";

        $this->load->view("template/header",$data);
        $this->load->view("pms/employee_taskboard/index");
        $this->load->view("template/footer");
    }

    public function getTimelineContent()
    {
        $timelineBuilderID = $this->input->post("timelineBuilderID");
        $phaseCode = $this->input->post("phaseCode");
        $projectMilestoneName = $this->input->post("projectMilestoneName");
        
        echo json_encode($this->employee_taskboard->getTimelineContent($timelineBuilderID, $phaseCode,$projectMilestoneName));
        // echo json_encode($this->employee_taskboard->getTimelineContent(1));
    }

    public function saveProjectBoard()
    {
        $sessionID = $this->session->has_userdata("adminSessionID") ? $this->session->userdata("adminSessionID") : 1;

        $timelineBuilderID        = $this->input->post("timelineBuilderID");
        $timelineManagementStatus = $this->input->post("timelineManagementStatus");
        $tasks = $this->input->post("tasks");

        $data = [];
        foreach ($tasks as $task) {
            $temp = [
                "timelineBuilderID"        => $timelineBuilderID,
                "taskID"                   => $task["taskID"],
                "projectMilestoneID"       => $task["projectMilestoneID"],
                "manHours"                 => $task["manHours"],
                "assignedEmployee"         => $task["assignEmployee"],
                "createdBy"                => $sessionID,
                "updatedBy"                => $sessionID
            ];
            array_push($data, $temp);
        }
        echo json_encode($this->employee_taskboard->saveProjectBoard($timelineBuilderID, $timelineManagementStatus, $data));
    }
    public function autoSavedHeader(){

      // echo "<pre>";
      // print_r($this->input->post("task"));
      // exit;

       $array_task = $this->input->post("task");
       $label = $this->input->post("label");
       $generateProejctData = $this->input->post("generateProejctData");
       $data = [];
       $taskBoardID ="";
      foreach($array_task as $value){
        $taskID = $value["taskID"];
        if($generateProejctData != "save"){$taskBoardID = $value["taskBoardID"];}
        $projectMilestoneID = $value["projectMilestoneID"];
        $timelineBuilderID = $value["timelineBuilderID"];
        $milestoneBuilderID = $value["milestoneBuilderID"];
        $taskName = $value["taskName"];
        $taskUsedHours = $value["taskUsedHours"];
        $taskStartDates = $value["taskStartDates"];
        $taskEndDates = $value["taskEndDates"];
        $taskPriority = $value["taskPriority"];
        $taskSeverity = $value["taskSeverity"];
        $taskTimeLeft = $value["taskTimeLeft"];
        $taskStatus = $value["taskStatus"];
        $taskNotes = $value["taskNotes"];
        $taskDescription = $value["taskDescription"];

        if($generateProejctData == "save"){
          $temp = [
            "taskID"        => $taskID,
            "projectMilestoneID"        => $projectMilestoneID,
            "timelineBuilderID"        => $timelineBuilderID,
            "milestoneBuilderID"        => $milestoneBuilderID,
            "taskName"                   => $taskName,
            "taskUsedHours"       => $taskUsedHours,
            "taskStartDates"                 => $taskStartDates,
            "taskEndDates"         => $taskEndDates,
            "taskPriority"                => $taskPriority,
            "taskSeverity"                => $taskSeverity,
            "taskTimeLeft"                => $taskTimeLeft,
            "taskStatus"                => $taskStatus,
            "taskNotes"                => $taskNotes,
            "taskDescription"                => $taskDescription
          ];

          array_push($data, $temp);
        }else{
          $data = array(
            "taskID"        => $taskID,
            "projectMilestoneID"        => $projectMilestoneID,
            "timelineBuilderID"        => $timelineBuilderID,
            "milestoneBuilderID"        => $milestoneBuilderID,
            "taskName"                   => $taskName,
            "taskUsedHours"       => $taskUsedHours,
            "taskStartDates"                 => $taskStartDates,
            "taskEndDates"         => $taskEndDates,
            "taskPriority"                => $taskPriority,
            "taskSeverity"                => $taskSeverity,
            "taskTimeLeft"                => $taskTimeLeft,
            "taskStatus"                => $taskStatus,
            "taskNotes"                => $taskNotes,
            "taskDescription"                => $taskDescription
          );
        }
      
      }
        
      $data = $this->employee_taskboard->autoSavedHeader($data,$taskBoardID,$label, $generateProejctData);
      
      echo json_encode($data);
    }

    public function autoSavedSubtask(){
        $array_task = $this->input->post("subtask");
        $label = $this->input->post("label");
        $data = [];
        $subtaskboardID ="";
        foreach($array_task as $value){
         $taskID = $value["taskID"];
         $taskBoardID = $value["taskBoardID"];
         $subtaskboardID = $value["subtaskboardID"];
         $projectMilestoneID = $value["projectMilestoneID"];
         $timelineBuilderID = $value["timelineBuilderID"];
         $milestoneBuilderID = $value["milestoneBuilderID"];
         $subtaskName = $value["subtaskName"];
         $subTaskDescription = $value["subTaskDescription"];
         $subTaskManHours = $value["subTaskManHours"];
         $subTaskUsedHours = $value["subTaskUsedHours"];
         $subTaskStartDates = $value["subTaskStartDates"];
         $subTaskEndDates = $value["subTaskEndDates"];
         $subTaskPriority = $value["subTaskPriority"];
         $subTaskSeverity = $value["subTaskSeverity"];
         $subTaskTimeLeft = $value["subTaskTimeLeft"];
         $subTaskStatus = $value["subTaskStatus"];
         $subTaskNotes = $value["subTaskNotes"];
         $createdby = $value["createdBy"];
 
         if($label == ""){

              $data = array(
                "taskID"        => $taskID,
                "taskBoardID"        => $taskBoardID,
                "projectMilestoneID"        => $projectMilestoneID,
                "timelineBuilderID"                   => $timelineBuilderID,
                "milestoneBuilderID"       => $milestoneBuilderID,
                "subTaskName"                 => $subtaskName,
                "subTaskDescription"         => $subTaskDescription,
                "subTaskManHours"         => $subTaskManHours,
                "subTaskUsedHours"                => $subTaskUsedHours,
                "subTaskStartDates"                => $subTaskStartDates,
                "subTaskEndDates"                => $subTaskEndDates,
                "subTaskPriority"                => $subTaskPriority,
                "subTaskSeverity"                => $subTaskSeverity,
                "subTaskTimeLeft"                => $subTaskTimeLeft,
                "subTaskStatus"                => $subTaskStatus,
                "subTaskNotes"                => $subTaskNotes,
                "createdBy"                => $createdby
            );

         }else{
              $data = array(
                "taskID"        => $taskID,
                "taskBoardID"        => $taskBoardID,
                "projectMilestoneID"        => $projectMilestoneID,
                "timelineBuilderID"                   => $timelineBuilderID,
                "milestoneBuilderID"       => $milestoneBuilderID,
                "subTaskName"                 => $subtaskName,
                "subTaskDescription"         => $subTaskDescription,
                "subTaskManHours"         => $subTaskManHours,
                "subTaskUsedHours"                => $subTaskUsedHours,
                "subTaskStartDates"                => $subTaskStartDates,
                "subTaskEndDates"                => $subTaskEndDates,
                "subTaskPriority"                => $subTaskPriority,
                "subTaskSeverity"                => $subTaskSeverity,
                "subTaskTimeLeft"                => $subTaskTimeLeft,
                "subTaskStatus"                => $subTaskStatus,
                "subTaskNotes"                => $subTaskNotes
            );
         }
            
         
           
       
          
        }
         
        // echo "<pre>";
        // print_r($_POST);
        // exit;
         
        $data = $this->employee_taskboard->autoSavedSubtask($data,$subtaskboardID,$label);
 
          echo json_encode($data);
     }

     public function deleteSubtaskContent(){
      $subtaskboardID           = $this->input->post('subtaskboardID');
      // unlink("assets/upload-files/taskboard-images/".$imageSrc);

      $data = $this->employee_taskboard->deleteSubtaskContent($subtaskboardID);

        echo json_encode($data);
   }

     public function updateExtension(){

      $taskBoardID           = $this->input->post('taskBoardID');
      $subtaskboardID           = $this->input->post('subtaskboardID');
      $extension           = $this->input->post('extension');

      $data = $this->employee_taskboard->updateExtension($taskBoardID,$subtaskboardID,$extension);

        echo json_encode($data);
   }

     public function saveImageContent(){

        $label= "attachment";

        $taskBoardID           = $this->input->post('taskBoardID');
        $subtaskboardID           = $this->input->post('subtaskboardID');

        $selectedID  = $taskBoardID ? $taskBoardID : $subtaskboardID ;
       
        $img =[];
      
            for ($i = 0; $i < count($_FILES['uploadImgArray']['name']); $i++){
               $file_extension_extract         = explode(".",$_FILES['uploadImgArray']['name'][$i]);
              $extension = end($file_extension_extract);
               $img[$i]                  = "ST-".date('y')."-".$selectedID."-".strtotime("now").$i.'.'.$extension;
            }
       
            //start of upload multiple image
           
            $number_of_files_uploaded = count($_FILES['uploadImgArray']['name']);
        
            // Faking upload calls to $_FILE
            for ($i = 0; $i < $number_of_files_uploaded; $i++) :
              
              $_FILES['userfile']['name']     = $_FILES['uploadImgArray']['name'][$i];
              $_FILES['userfile']['type']     = $_FILES['uploadImgArray']['type'][$i];
              $_FILES['userfile']['tmp_name'] = $_FILES['uploadImgArray']['tmp_name'][$i];
              $_FILES['userfile']['error']    = $_FILES['uploadImgArray']['error'][$i];
              $_FILES['userfile']['size']     = $_FILES['uploadImgArray']['size'][$i];
              $new_filename                =  "ST-".date('y')."-".$selectedID."-".strtotime("now").$i;
              $config = array(
                'file_name'     =>$new_filename,
                'allowed_types' => 'jpg|jpeg|png',
                'overwrite'     => true,
                
                /* real path to upload folder ALWAYS */
                'upload_path' => "assets/upload-files/taskboard-images/"
              );
        
                $this->load->library('upload',$config);
             
         
                $this->upload->initialize($config);
        
              if ( ! $this->upload->do_upload()) :
                $error = array('error' => $this->upload->display_errors());
                 // $this->load->view('upload_form', $error);
              else :
                $final_files_data[] = $this->upload->data();
                // Continue processing the uploaded data
              endif;
              endfor;
            //end of upload multiple image
          
          
        

      
         
        $data = $this->employee_taskboard->saveImageContent($img,$subtaskboardID,$taskBoardID,$label);
 
          echo json_encode(array(
            'data'=>$data,
            'newImageName'=>$img));
     }

     public function deleteImageContent(){
      $label ="delete attachment";
      $imageSrc           = $this->input->post('imageSrc');
      unlink("assets/upload-files/taskboard-images/".$imageSrc);

      $data = $this->employee_taskboard->deleteImageContent($imageSrc,$label);

        echo json_encode($data);
   }

   public function updateImgComment(){
      $label ="comment";
      $imageID           = $this->input->post('imageID');
      $imageComment           = $this->input->post('imageComment');

      $data = $this->employee_taskboard->updateImgComment($imageID,$imageComment,$label);

        echo json_encode($data);
  }

  public function updateAssignee(){

   
    $subtaskboardID          =  $this->input->post('subtaskboardID');
    $label           = $this->input->post('label');
    $listAssignee           = $this->input->post('listAssignee');
    $explode                = explode(",",$listAssignee);

    $AssigneeConvertArray =[];

    for ($i = 0; $i < count($explode); $i++)  {
      $AssigneeConvertArray[$i] =  $explode[$i];
    }

    $passListAssignee = implode("|",$AssigneeConvertArray);

      $sendData = array(
        "subTaskAssignee"        => $passListAssignee
    );

    $data = $this->employee_taskboard->updateAssignee($subtaskboardID,$sendData,$label);

      echo json_encode($data);
}

public function updateEmployeeTaskStatus(){

  //  echo "<pre>";
  //  print_r($_POST);
  //  exit;
  $taskBoardID          =  $this->input->post('taskBoardID');
  $subtaskboardID          =  $this->input->post('subtaskboardID');
  $timelineBuilderID          =  $this->input->post('timelineBuilderID');
  $projectMilestoneID          =  $this->input->post('projectMilestoneID');
  $taskID          =  $this->input->post('taskID');
  $employeeID          =  $this->input->post('employeeID');
  $employeeTaskStatus          =  $this->input->post('employeeTaskStatus');
  $sessionID          =  $this->input->post('sessionID');


  $data = array(
    "taskboardID" => $taskBoardID,
    "subtaskboardID" => $subtaskboardID,
    "timelineBuilderID" => $timelineBuilderID,
    "projectMilestoneID" => $projectMilestoneID,
    "taskID" =>$taskID,
    "employeeID" =>$employeeID,
    "employeeTaskStatus" =>$employeeTaskStatus,
    "createdBy" =>$sessionID,
  );

  $data = $this->employee_taskboard->updateEmployeeTaskStatus($data,$taskBoardID,$subtaskboardID,$employeeID);

    echo json_encode($data);
}

}