<?php
class Consolidated_document extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model("Operations_model", "operations");
        $this->load->model("pms/BillMaterial_model", "billmaterial");
        // isAllowed(39);
    }

    public function index(){
        $data["title"]  = "Consolidated Documents";
        $this->load->view("template/header",$data);
        $this->load->view("pms/consolidated_document/index");
        $this->load->view("template/footer");
    }

    public function getConsolidateArray(){
        $thisMethod     = $this;
        $excelType      = $this->input->get("exeltype")   ?? null;
        $countArray     = $this->input->get("datacount");
        $data           = [];
        $category       = $excelType != "cost_estimate" ? "Bill of Materials" : "Cost Estimate";
       
        for ($i=0; $i < $countArray; $i++) { 
            // $timelineBuilderID  = $documentsID[$i]["timelineBuilderID"];
            // $costEstimateID     = $documentsID[$i]["costEstimateID"];
            // $billMaterialID     = $documentsID[$i]["billMaterialID"];
            $timelineBuilderID  = $thisMethod->input->get("ptbid".$i);
            $costEstimateID     = $thisMethod->input->get("ceid".$i);
            $billMaterialID     = $thisMethod->input->get("bomid".$i);
            $tempData = $this->billmaterial->getExcelData($timelineBuilderID, $costEstimateID, $billMaterialID , $category);
            array_push($data, $tempData);
        }
        
        $consolidateData    =   $this->consolidateArray($data, $excelType);
        // echo json_encode($consolidateData);
        downloadExcel($category, $consolidateData);
    }

    public function consolidateArray($data = false, $category = false){
        $shortcutDocument   = $category == "cost_estimate" ? "CEF" : "BOM";
        $consolidateData    =   [
            "filename"  => "CON-".$shortcutDocument."-21-GTC-PRJ-00001.xlsx",
            "code"      => "CON-".$shortcutDocument."-21-GTC-PRJ-00001",
            "title"     => "CONSOLIDATED ".strtoupper($category),
            "project"   => [],
            "body"      => [
                            "phases"    => [],
                            "assets"    => [],
                            "vehicles"  => [],
                            "others"    => []
                           ],
            "footer"    => []
        ];

        $footerItemTotalCost        = 0;
        $footerLaborTotalCost       = 0;
    
        $footerEquipmentTotalCost   = 0;
        $footerTravelTotalCost      = 0;
        
        for ($i=0; $i < count($data) ; $i++) {
            // GLOBAL VARIABLE ON THIS LOOP
            $dataResult         = $data[$i];
            $bodyArray          = $dataResult["body"];
            $footerArray        = $dataResult["footer"];
            $bodyPhasesArray    = $bodyArray["phases"];
            $bodyAssetsArray    = $bodyArray["assets"]      ?? [];
            $bodyVehiclesArray  = $bodyArray["vehicles"]    ?? [];
            $bodyOthersArray    = $bodyArray["others"]      ?? [];
            
            // END GLOBAL VARIABLE ON THIS LOOP
            
            $consolidateData["project"] = [
                "code"         => $dataResult["project"]["code"],
                "name"         => $dataResult["project"]["name"],
                "location"     => $dataResult["project"]["location"],
                "owner"        => $dataResult["project"]["owner"],
                "subject"      => strtoupper($category)." –  Biday Satellite Warehouse and TemFacil",
                "costEstimate" => "CON-".$shortcutDocument."-21-GTC-PRJ-00001.xlsx",
                "timeline"     => ""
            ];

            // CONSOLIDATE ARRAY OF PHASES
                for ($j=0; $j < count($bodyPhasesArray) ; $j++) { 
                   array_push($consolidateData["body"]["phases"], $bodyPhasesArray[$j]);
                }
            // END CONSOLIDATE ARRAY OF PHASES

            // CONSOLIDATE ARRAY OF ASSETS
                for ($j=0; $j < count($bodyAssetsArray) ; $j++) { 
                    array_push($consolidateData["body"]["assets"], $bodyAssetsArray[$j]);
                }
            // END CONSOLIDATE ARRAY OF ASSETS

            // CONSOLIDATE ARRAY OF VEHICLES
                for ($j=0; $j < count($bodyVehiclesArray) ; $j++) { 
                    array_push($consolidateData["body"]["vehicles"], $bodyVehiclesArray[$j]);
                }
            // END CONSOLIDATE ARRAY OF VEHICLES

            // CONSOLIDATE ARRAY OF OTHERS
                for ($j=0; $j < count($bodyOthersArray) ; $j++) { 
                    array_push($consolidateData["body"]["others"], $bodyOthersArray[$j]);
                }
            // END CONSOLIDATE ARRAY OF OTHERS
            
            // FOOTER COMPUTATION
               $footerItemTotalCost         += floatval($footerArray["costSummary"]["items"][0]["totalCost"]);
               $footerLaborTotalCost        += floatval($footerArray["costSummary"]["items"][1]["totalCost"]);

               $footerEquipmentTotalCost    += floatval($footerArray["costSummary"]["overhead"][0]["totalCost"]);
               $footerTravelTotalCost       += floatval($footerArray["costSummary"]["overhead"][1]["totalCost"]);
            // END FOOTER COMPUTATION

        }
        

        $footerTempArray        =   [
            "costSummary" => [
                "items" => [
                    [
                        "name" => "Materials",
                        "totalCost" => $category == "cost_estimate" ? "" : $footerItemTotalCost
                    ],
                    [
                        "name" => "Labor",
                        "totalCost" => $category == "cost_estimate" ? "" : $footerLaborTotalCost
                    ],
                ],
                "itemTotalCost" => $category == "cost_estimate" ? "" : (floatval($footerItemTotalCost) + floatval($footerLaborTotalCost)),
                "overhead" => [
                    [
                        "name" => "Equipment",
                        "totalCost" => $category == "cost_estimate" ? "" : $footerEquipmentTotalCost
                    ],
                    [
                        "name" => "Travel",
                        "totalCost" => $category == "cost_estimate" ? "" : $footerTravelTotalCost
                    ],
                ],
                "contigency"          => "",
                "subtotal"            => $category == "cost_estimate" ? "" : (floatval($footerItemTotalCost) + floatval($footerLaborTotalCost)) + (floatval($footerEquipmentTotalCost) + floatval($footerTravelTotalCost)),
                "markUp"              => "",
                "contractPriceVATEX"  => "",
                "vat"                 => "",
                "contractPriceVATINC" => ""
            ]
        ];


        array_push($consolidateData["footer"], $footerTempArray);

        return $consolidateData;

    }



}

?>