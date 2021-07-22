<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Milestone_builder extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model("pms/MilestoneBuilder_model", "milestone_builder");
        isAllowed(89);
    }

    public function index()
    {
        $data["title"] = "Project Milestone Masterfile";

        $this->load->view("template/header",$data);
        $this->load->view("pms/milestone_builder/index");
        $this->load->view("template/footer");
    }

    public function saveMilestoneBuilder()
    {
        $milestoneBuilderID  = $this->input->post("milestoneBuilderID") ?? null;
        $categoryID          = $this->input->post("categoryID");
        $phaseCode           = $this->input->post("phaseCode");
        $phaseDescription    = $this->input->post("phaseDescription");
        $createdBy           = $this->input->post("createdBy");
        $updatedBy           = $this->input->post("updatedBy");
        $list                = $this->input->post("list");
        if($milestoneBuilderID ){
            $milestoneBuilderData = [
                "categoryID"       => $categoryID,
                "phaseDescription" => $phaseDescription,
                "createdBy"        => $createdBy,
                "updatedBy"        => $updatedBy,
            ];
        }else{
            $milestoneBuilderData = [
                "categoryID"       => $categoryID,
                "phaseCode"        => $phaseCode,
                "phaseDescription" => $phaseDescription,
                "createdBy"        => $createdBy,
                "updatedBy"        => $updatedBy,
            ];
        }
        
        $saveMilestoneBuilderData = $this->milestone_builder->saveMilestoneBuilderData($milestoneBuilderData, $milestoneBuilderID);
        if ($saveMilestoneBuilderData) {
            $result = explode("|", $saveMilestoneBuilderData);

            if ($result[0] == "true") {

                if ($list) {
                    $milestoneBuilderList = [];
                    foreach($list as $index => $item) {
                        $temp = [
                            "milestoneBuilderID"    => $result[2],
                            "projectMilestoneID"    => $item["projectMilestoneID"],
                            "projectMilestoneName"  => $item["projectMilestoneName"],
                            "milestoneNotes"	 	=> $item["milestoneNotes"],
                            "createdBy"             => $createdBy,
                            "updatedBy"             => $updatedBy
                        ];
                        array_push($milestoneBuilderList, $temp);
                    }
                    $saveCostEstimateItems = $this->milestone_builder->saveMilestoneBuilderList($milestoneBuilderList, $milestoneBuilderID);
                }

            }
            echo json_encode($saveMilestoneBuilderData);
        }
        
    }

}
?>