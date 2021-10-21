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
        $projectCount   =  str_pad(intval($this->input->get("projectcount")) + 1, 5, "0", STR_PAD_LEFT);
        $data           = [];
        $category       = $excelType != "cost_estimate" ? "Bill of Materials" : "Cost Estimate";
       
        for ($i=0; $i < $countArray; $i++) { 
            // $timelineBuilderID  = $documentsID[$i]["timelineBuilderID"];
            // $costEstimateID     = $documentsID[$i]["costEstimateID"];
            // $billMaterialID     = $documentsID[$i]["billMaterialID"];
            $timelineBuilderID  = $thisMethod->input->get("ptbid".$i);
            $costEstimateID     = $thisMethod->input->get("ceid".$i);
            $billMaterialID     = $thisMethod->input->get("bomid".$i);
            $tempData           = $this->billmaterial->getExcelData($timelineBuilderID, $costEstimateID, $billMaterialID , $category);
            array_push($data, $tempData);
        }
        
        $consolidateData    =   $this->consolidateArray($data, $excelType, $projectCount);
        // echo json_encode($consolidateData);
        downloadExcel($category, $consolidateData);
    }

    public function consolidateArray($data = false, $category = false, $projectCount = 1){
        $shortcutDocument   = $category == "cost_estimate" ? "CEF" : "BOM";
        $subject            = $shortcutDocument == "CEF" ? "Cost Estimate" : "Bill of Materials";
        $clientCode         = "";
        $tempProjectCode            = [];
        $tempDocumentNumber         = [];
        for ($i=0; $i < count($data) ; $i++) {
            $dataResult         = $data[$i];
            $exlodeProjectCode  = explode("-", $dataResult["project"]["code"]);
            $clientCode         = $exlodeProjectCode[1];
            array_push($tempDocumentNumber, $dataResult["project"]["costEstimate"]);
            array_push($tempProjectCode, $dataResult["project"]["code"]);
        }

        $consolidateData    =   [
            "filename"  => "CON-".$shortcutDocument."-".date("y")."-".$clientCode."-".$projectCount.".xlsx",
            "code"      => "CON-".$shortcutDocument."-".date("y")."-".$clientCode."-".$projectCount,
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
                "code"         => join(", ", $tempProjectCode),
                "name"         => $dataResult["project"]["name"],
                "location"     => $dataResult["project"]["location"],
                "owner"        => $dataResult["project"]["owner"],
                "subject"      => $subject." – ".str_replace('BILL OF MATERIALS - ', '', $dataResult["project"]["subject"]),
                "costEstimate" => join(", ", $tempDocumentNumber ),
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
               $footerItemTotalCost         += floatval(  str_replace(',', '', $footerArray["costSummary"]["items"][0]["totalCost"]) );
               $footerLaborTotalCost        += floatval( str_replace(',', '', $footerArray["costSummary"]["items"][1]["totalCost"]) );

               $footerEquipmentTotalCost    += floatval(str_replace(',', '',$footerArray["costSummary"]["overhead"][0]["totalCost"]));
               $footerTravelTotalCost       += floatval(str_replace(',', '',$footerArray["costSummary"]["overhead"][1]["totalCost"]));
            // END FOOTER COMPUTATION

        }

        // $consolidateData["project"]["costEstimate"] = $tempDocumentNumber.join(", "); 
            
        $footerTempArray        =   [
            "costSummary" => [
                "items" => [
                    [
                        "name" => "Materials",
                        "totalCost" => $category == "cost_estimate" ? "" : formatAmount($footerItemTotalCost, true)
                    ],
                    [
                        "name" => "Labor",
                        "totalCost" => $category == "cost_estimate" ? "" : formatAmount($footerLaborTotalCost)
                    ],
                ],
                "itemTotalCost" => $category == "cost_estimate" ? "" : formatAmount((floatval($footerItemTotalCost) + floatval($footerLaborTotalCost)) ),
                "overhead" => [
                    [
                        "name" => "Equipment",
                        "totalCost" => $category == "cost_estimate" ? "" : formatAmount($footerEquipmentTotalCost)
                    ],
                    [
                        "name" => "Travel",
                        "totalCost" => $category == "cost_estimate" ? "" : formatAmount($footerTravelTotalCost)
                    ],
                ],
                "contigency"          => "",
                "subtotal"            => $category == "cost_estimate" ? "" : formatAmount((floatval($footerItemTotalCost) + floatval($footerLaborTotalCost)) + (floatval($footerEquipmentTotalCost) + floatval($footerTravelTotalCost)) ,true),
                "markUp"              => "",
                "contractPriceVATEX"  => "",
                "vat"                 => "",
                "contractPriceVATINC" => ""
            ]
        ];


        $consolidateData["footer"] = $footerTempArray;

        return $consolidateData;

    }



}

?>