<?php
class Cost_sheet extends CI_Controller{
 
    public function __construct()
    {
        parent::__construct();
        $this->load->model("pms/BillMaterial_model", "billmaterial");
        $this->load->model("ims/MaterialRequest_model", "materialrequest");
        // isAllowed(39);
    }
    
    public function index()
    {
        $data["title"] = "Cost Sheet";
        $this->load->view("template/header",$data);
        $this->load->view("fms/cost_sheet/index");
        $this->load->view("template/footer");
    }

    public function saveCostSheet(){
        $action                     = $this->input->post("action");
        $method                     = $this->input->post("method");

        $costSheetID                = $this->input->post("costSheetID");
        $reviseCostSheetID 	        = $this->input->post("reviseCostSheetID")       == "null" || !$this->input->post("reviseCostSheetID")   ?  NULL : $this->input->post("reviseCostSheetID");
        $reviseCostSheetCode 	    = $this->input->post("reviseCostSheetCode")     == "null" || !$this->input->post("reviseCostSheetCode") ?  NULL : $this->input->post("reviseCostSheetCode");
        $costSheetGrandTotal 	    = $this->input->post("costSheetGrandTotal")     == "null" ?  NULL : $this->input->post("costSheetGrandTotal");
        $contingencyPercentage 	    = $this->input->post("contingencyPercentage")   == "null" ?  NULL : $this->input->post("contingencyPercentage");
        $markupPercentage 	        = $this->input->post("markupPercentage")        == "null" ?  NULL : $this->input->post("markupPercentage");
        $equipmentPercentage 	    = $this->input->post("equipmentPercentage")     == "null" ?  NULL : $this->input->post("equipmentPercentage");


        $approversID                = $this->input->post("approversID")     ?? null;
        $approversStatus            = $this->input->post("approversStatus") ?? null;
        $approversDate              = $this->input->post("approversDate")   ?? null;

        $costSheetStatus            = $this->input->post("costSheetStatus");
        $costSheetReason            = $this->input->post("costSheetReason")   ?? null;
        $costSheetRemarks           = $this->input->post("costSheetRemarks")  ?? null;

        $employeeID 		        = $this->input->post("employeeID")  ?? null;
        $submittedAt                = $this->input->post("submittedAt") ?? null;
        $createdBy                  = $this->input->post("createdBy")   ?? null;
        $updatedBy                  = $this->input->post("updatedBy")   ?? null;
        $createdAt                  = $this->input->post("createdAt")   ?? null;
        
        $costSheetData = [
            "reviseCostSheetID" 	   => $reviseCostSheetID,
            "reviseCostSheetCode" 	   => $reviseCostSheetCode,
            "costSheetGrandTotal" 	   => $costSheetGrandTotal,
            "contingencyPercentage"    => $contingencyPercentage,
            "markupPercentage" 	       => $markupPercentage,
            "equipmentPercentage" 	   => $equipmentPercentage,
    
            "approversID"              => $approversID    ,
            "approversStatus"          => $approversStatus,
            "approversDate"            => $approversDate  ,
    
            "costSheetStatus"          => $costSheetStatus,
            "costSheetReason"          => $costSheetReason,
            "costSheetRemarks"         => $costSheetRemarks,
    
            "employeeID" 		       => $employeeID,
            "submittedAt"              => $submittedAt,
            "createdBy"                => $createdBy,
            "updatedBy"                => $updatedBy,
            "createdAt"                => $createdAt,
        ];

        if ($action == "update") {
            $getBOM    =   $this->billmaterial->getCostSheetData($costSheetID);
            unset($costSheetData["reviseCostSheetID"]);
            unset($costSheetData["reviseCostSheetCode"]);
            unset($costSheetData["createdBy"]);
            unset($costSheetData["createdAt"]);

            if ($method == "cancelform") {
                
                $costSheetData = [
                    "costSheetStatus"    => 4,
                    "submittedAt"           => $getBOM->submittedAt,
                    "updatedBy"             => $updatedBy,
                    
                ];
            } else if ($method == "approve") {
                $costSheetData = [
                    "submittedAt"           => $getBOM->submittedAt,
                    "approversStatus"       => $approversStatus,
                    "approversDate"         => $approversDate,
                    "costSheetStatus"    => $costSheetStatus,
                    "updatedBy"             => $updatedBy,
                ];
                
            } else if ($method == "deny") {
                $costSheetData = [
                    "submittedAt"            => $getBOM->submittedAt,
                    "approversStatus"        => $approversStatus,
                    "approversDate"          => $approversDate,
                    "costSheetStatus"     => 3,
                    "costSheetRemarks"    => $costSheetRemarks,
                    "updatedBy"              => $updatedBy,
                ];
            } else if ($method == "drop") {
                $costSheetData = [
                    "submittedAt"               => $getBOM->submittedAt,
                    "reviseCostSheetID"      => $reviseCostSheetID,
                    "costSheetStatus"        => 5,
                    "updatedBy"                 => $updatedBy,
                ]; 
            }
        }

        $saveCostSheetData = $this->billmaterial->saveCostSheetData($action, $costSheetData, $costSheetID);
    
        echo json_encode($saveCostSheetData);
    }

    public function getPhaseAndMilestoneData(){
        $timelineBuilderID       = $this->input->post("timelineBuilderID");
        $costEstimateID          = $this->input->post("costEstimateID");
        $costSheetID          = $this->input->post("costSheetID");
        $costSheetCondition   = $this->billmaterial->existCostSheet($costEstimateID, $costSheetID) ? $costSheetID : "";
        $result                  = "false|System error: Please contact the system administrator for assistance!";
      
         if($timelineBuilderID){
                 $result = $this->billmaterial->getPhaseAndMilestoneData($timelineBuilderID, $costEstimateID, $costSheetCondition);
         }
         echo json_encode($result);
     }

     public function downloadExcel(){
        $timelineBuilderID       = $this->input->get("ptbid");
        $costEstimateID          = $this->input->get("ceid");
        $costSheetID          = $this->input->get("bomid");
        $data                    = $this->billmaterial->getExcelData($timelineBuilderID, $costEstimateID, $costSheetID);
        downloadExcel("Bill of Materials", $data);
    }

}
?>