<?php
defined('BASEPATH') OR exit('No direct script access allowed');
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

use PhpOffice\PhpSpreadsheet\Helper\Sample;
use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\RichText\RichText;
use PhpOffice\PhpSpreadsheet\Shared\Date;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Color;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Style\Font;
use PhpOffice\PhpSpreadsheet\Style\NumberFormat;
use PhpOffice\PhpSpreadsheet\Style\Protection;
use PhpOffice\PhpSpreadsheet\Worksheet\Drawing;
use PhpOffice\PhpSpreadsheet\Worksheet\PageSetup;
use PhpOffice\PhpSpreadsheet\Worksheet\ColumnDimension;
use PhpOffice\PhpSpreadsheet\Worksheet\HeaderFooterDrawing;
use PhpOffice\PhpSpreadsheet\Worksheet;

class Project_budget_rationale extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model("pms/BillMaterial_model", "billmaterial");
        isAllowed(39);
    }

    public function index(){
        $data["title"] = "Project Budget Rationale Form";

        $this->load->view("template/header",$data);
        $this->load->view("pms/bill_material/index");
        $this->load->view("template/footer");
    }

    public function saveBillMaterial(){
        $action                     = $this->input->post("action");
        $method                     = $this->input->post("method");
        $billMaterialID             = $this->input->post("billMaterialID") ?? null;
        $costEstimateID             = $this->input->post("costEstimateID") ?? null;

        $costEstimateID             = $this->input->post("costEstimateID") ?? null;
        $costEstimateCode           = $this->input->post("costEstimateCode") ?? null;
        $timelineBuilderID          = $this->input->post("timelineBuilderID") ?? null;
        $projectCode                = $this->input->post("projectCode") ?? null;
        $projectName                = $this->input->post("projectName") ?? null;
        $projectCategory            = $this->input->post("projectCategory") ?? null;
        $clientName                 = $this->input->post("clientName") ?? null;
        $clientAddress              = $this->input->post("clientAddress") ?? null;

        $reviseBillMaterialID       = $this->input->post("reviseBillMaterialID") ?? null;
        $employeeID                 = $this->input->post("employeeID");
        $projectID                  = $this->input->post("projectID") ?? null;
        $approversID                = $this->input->post("approversID") ?? null;
        $approversStatus            = $this->input->post("approversStatus") ?? null;
        $approversDate              = $this->input->post("approversDate") ?? null;
        $billMaterialStatus         = $this->input->post("billMaterialStatus");
        $billMaterialReason         = $this->input->post("billMaterialReason") ?? null;
        $billMaterialRemarks        = $this->input->post("billMaterialRemarks") ?? null;
        $submittedAt                = $this->input->post("submittedAt") ?? null;
        $createdBy                  = $this->input->post("createdBy");
        $updatedBy                  = $this->input->post("updatedBy");
        $createdAt                  = $this->input->post("createdAt");

        $projectPhase               = $this->input->post("projectPhaseData") ?? null;
        $material                   = $this->input->post("materialData") ?? null;
        $manpower                   = $this->input->post("manpowerData") ?? null;
        $travel                     = $this->input->post("travelData") ?? null;

        $billMaterialData = [
            "reviseBillMaterialID"    => $reviseBillMaterialID,
            "employeeID"              => $employeeID,
            "costEstimateID"          => $costEstimateID,
            "costEstimateCode"        => $costEstimateCode,
            "timelineBuilderID"       => $timelineBuilderID,
            "projectCode"             => $projectCode,
            "projectName"             => $projectName,
            "projectCategory"         => $projectCategory,
            "clientName"              => $clientName,
            "clientAddress"           => $clientAddress,
            "approversID"             => $approversID,
            "approversStatus"         => $approversStatus,
            "approversDate"           => $approversDate,
            "billMaterialStatus"      => $billMaterialStatus,
            "billMaterialReason"      => $billMaterialReason,
            "submittedAt"             => $submittedAt,
            "createdBy"               => $createdBy,
            "updatedBy"               => $updatedBy,
            "createdAt"               => $createdAt
        ];

        if ($action == "update") {
            unset($billMaterialData["reviseBillMaterialID"]);
            unset($billMaterialData["createdBy"]);
            unset($billMaterialData["createdAt"]);

            if ($method == "cancelform") {
                $billMaterialData = [
                    "billMaterialStatus" => 4,
                    "updatedBy"             => $updatedBy,
                ];
            } else if ($method == "approve") {
                $billMaterialData = [
                    "approversStatus"       => $approversStatus,
                    "approversDate"         => $approversDate,
                    "billMaterialStatus" => $billMaterialStatus,
                    "updatedBy"             => $updatedBy,
                ];
            } else if ($method == "deny") {
                $billMaterialData = [
                    "approversStatus"        => $approversStatus,
                    "approversDate"          => $approversDate,
                    "billMaterialStatus"  => 3,
                    "billMaterialRemarks" => $billMaterialRemarks,
                    "updatedBy"              => $updatedBy,
                ];
            } else if ($method == "drop") {
                $billMaterialData = [
                    "reviseBillMaterialID" => $reviseBillMaterialID,
                    "billMaterialStatus"   => 5,
                    "updatedBy"            => $updatedBy,
                ]; 
            }
        }

        $saveBillMaterialData = $this->billmaterial->saveBillMaterial($action, $billMaterialData, $billMaterialID);
        if ($saveBillMaterialData) {
            $result = explode("|", $saveBillMaterialData);

            if ($result[0] == "true") {
                $billMaterialID= $result[2];

                if ($projectPhase) {
                    $projectPhaseData = [];
                    foreach($projectPhase as $index => $item) {
                        $temp = [
                            "billMaterialID"                => $billMaterialID,
                            "costEstimateID"                => $costEstimateID,
                            "categoryType"                  => "Project Phase",
                            "milestoneBuilderID"            => $item["projectPhaseID"],
                            "phaseDescription"	            => $item["projectPhaseDescription"],
                            "milestoneListID"               => $item["milestoneID"],
                            "projectMilestoneID"            => $item["milestoneID"],
                            "projectMilestoneName"	        => $item["milestoneName"],
                            "itemID"                        => $item["milestoneItemID"],
                            "itemCode"                      => $item["milestoneItemCode"],
                            "itemName"                      => $item["milestoneItemName"],
                            "itemClassification"            => $item["milestoneItemClassification"],
                            "quantity"                      => $item["milestoneItemQuantity"],
                            "itemUom"                       => $item["milestoneItemUom"],
                            "brandName"                     => $item["milestoneItemBrandName"],
                            "unitCost"                      => $item["milestoneItemUnitCost"],
                            "totalCost"                     => $item["milestoneItemTotalCost"],
                            "updatedBy"                     => $updatedBy,
                            "createdBy"                     => $createdBy
                        ];
                        array_push($projectPhaseData, $temp);
                    }
                    $this->billmaterial->saveBillMaterialProjectPhase($projectPhaseData, $billMaterialID);
                }

                if ($material) {
                    $materialData = [];
                    foreach($material as $index => $item) {
                        $temp = [
                            "billMaterialID"        => $billMaterialID,
                            "costEstimateID"        => $costEstimateID,
                            "categoryType"          => "Materials and Equipment",
                            "itemCode"              => $item["materialItemCode"],
                            "itemID"	 	        => $item["materialItemID"],
                            "itemName"              => $item["materialItemName"],
                            "itemClassification"    => $item["materialItemClassification"],
                            "quantity"              => $item["materialItemQuantity"],
                            "itemUom"               => $item["materialItemUom"],
                            "brandName"             => $item["materialItemBrandName"],
                            "unitCost"              => $item["materialItemUnitCost"],
                            "totalCost"             => $item["materialItemTotalCost"],
                            "updatedBy"             => $updatedBy,
                            "createdBy"             => $createdBy
                        ];
                        array_push($materialData, $temp);
                    }
                    $this->billmaterial->saveBillMaterialMaterial($materialData, $billMaterialID);
                }

                if ($manpower) {
                    $manpowerData = [];
                    foreach($manpower as $index => $item) {
                        $temp = [
                            "billMaterialID"            => $billMaterialID,
                            "costEstimateID"            => $costEstimateID,
                            "designationID"             => $item["designationID"],
                            "designationCode"	 	    => $item["designationCode"],
                            "designation"               => $item["designation"],
                            "designationQuantity"       => $item["designationQuantity"],
                            "designationTotalManHours"  => $item["designationTotalManHours"],
                            "unitCost"                  => $item["designationUnitCost"],
                            "totalCost"                 => $item["designationTotalCost"],
                            "updatedBy"                 => $updatedBy,
                            "createdBy"                 => $createdBy
                        ];
                        array_push($manpowerData, $temp);
                    }
                    $this->billmaterial->saveBillMaterialManpower($manpowerData, $billMaterialID);
                }

                if ($travel) {
                    $travelData = [];
                    foreach($travel as $index => $item) {
                        if($item["travelType"] == "vehicle" || $item["travelType"] == "Vehicle" ){
                            $travelTypeTotalCost = floatval($item["travelTypeUnitCost"]) * floatval($item["vehicleLiters"]);
                        }else{
                            $travelTypeTotalCost = $item["travelTypeTotalCost"];
                        }
                        
                        $temp = [
                            "billMaterialID"            => $billMaterialID,
                            "costEstimateID"            => $costEstimateID,
                            "travelType"                => $item["travelType"],
                            "vehicleID"                 => $item["vehicleID"] ?? null,
                            "vehicleCode"	 	        => $item["vehicleCode"] ?? null,
                            "vehicleName"               => $item["vehicleName"] ?? null,
                            "vehiclePlateNumber"        => $item["vehiclePlateNumber"] ?? null,
                            "vehicleFuelConsumption"    => $item["vehicleFuelConsumption"] ?? null,
                            "vehicleGasType"            => $item["vehicleGasType"] ?? null,
                            "vehicleDistance"           => $item["vehicleDistance"] ?? null,
                            "vehicleLiters"             => $item["vehicleLiters"] ?? null,
                            "travelTypeDescription"     => $item["travelTypeDescription"] ?? null,
                            "unitCost"                  => $item["travelTypeUnitCost"] ?? null,
                            "totalCost"                 => $travelTypeTotalCost ?? null,
                            "updatedBy"                 => $updatedBy,
                            "createdBy"                 => $createdBy
                        ];
                        array_push($travelData, $temp);
                    }
                    
                    $this->billmaterial->saveBillMaterialTravel($travelData, $billMaterialID);
                }
            }
            
        }
        echo json_encode($saveBillMaterialData);
    }

    public function getDataDivision(){
        $billMaterialID       = $this->input->post("billMaterialID") ?? null;
        $costEstimateID       = $this->input->post("costEstimateID") ?? null;
        $result               = $this->billmaterial->getDataDivision($costEstimateID, $billMaterialID);
        echo json_encode($result);
    }

    public function billMaterialExcel($data) {
        // $id          = $data["billMaterialID"];
        // $createdAt   = $data["createdAt"];
        $code        = $data["billMaterialCode"];
        $fileName    = "$code.xlsx";
        $spreadsheet = new Spreadsheet();
        $sheet       = $spreadsheet->getActiveSheet();

        // DISABLE EDIT
        $spreadsheet->getActiveSheet()->getProtection()->setSheet(true);

        
        // SET PASSWORD
        $protection = $spreadsheet->getActiveSheet()->getProtection();
        $protection->setPassword('BCGI');
        $protection->setSheet(true);
        $protection->setSort(true);
        $protection->setInsertRows(true);
        $protection->setFormatCells(true);

        $spreadsheet->getDefaultStyle()->getFont()->setName('Segoe UI');
        $spreadsheet->getDefaultStyle()->getFont()->setSize(10);
        $spreadsheet->getDefaultStyle()->getAlignment()->setVertical(Alignment::VERTICAL_BOTTOM);
        $spreadsheet->getDefaultStyle()->getAlignment()->setHorizontal(Alignment::HORIZONTAL_LEFT);
        $spreadsheet->getActiveSheet()->getDefaultRowDimension()->setRowHeight(17);


        // ----- PAGE SETUP -----
            $spreadsheet->getActiveSheet()
                ->getPageSetup()
                ->setOrientation(\PhpOffice\PhpSpreadsheet\Worksheet\PageSetup::ORIENTATION_PORTRAIT);
            $spreadsheet->getActiveSheet()
                ->getPageSetup()
                ->setPaperSize(\PhpOffice\PhpSpreadsheet\Worksheet\PageSetup::PAPERSIZE_A4);

            $spreadsheet->getActiveSheet()->getPageMargins()->setTop(1.9541666666667);
            $spreadsheet->getActiveSheet()->getPageMargins()->setRight(0.0104166666666667);
            $spreadsheet->getActiveSheet()->getPageMargins()->setLeft(0.0104166666666667);
            $spreadsheet->getActiveSheet()->getPageMargins()->setBottom(0.860416666666667);
            $spreadsheet->getActiveSheet()->getPageMargins()->setHeader(0.0104166666666667);
            $spreadsheet->getActiveSheet()->getPageMargins()->setFooter(0.0104166666666667);

            $spreadsheet->getActiveSheet()->getPageSetup()->setFitToWidth(1);
            $spreadsheet->getActiveSheet()->getPageSetup()->setFitToHeight(0);

            $spreadsheet->getActiveSheet()->getPageSetup()->setHorizontalCentered(true);

            $headerLogo = new \PhpOffice\PhpSpreadsheet\Worksheet\HeaderFooterDrawing();
            $footerLogo = new \PhpOffice\PhpSpreadsheet\Worksheet\HeaderFooterDrawing();

            $headerLogo->setName('Header logo');
            $headerLogo->setPath("assets/images/company-logo/excel-header.png");
            $headerLogo->setHeight(165);
            $spreadsheet->getActiveSheet()->getHeaderFooter()->addImage($headerLogo, \PhpOffice\PhpSpreadsheet\Worksheet\HeaderFooter::IMAGE_HEADER_CENTER);
            $spreadsheet->getActiveSheet()->getHeaderFooter()->setOddHeader('&C&G');
            
            $footerLogo->setName('Footer logo');
            $footerLogo->setPath("assets/images/company-logo/excel-footer.png");
            $footerLogo->setHeight(80);
            $spreadsheet->getActiveSheet()->getHeaderFooter()->addImage($footerLogo, \PhpOffice\PhpSpreadsheet\Worksheet\HeaderFooter::IMAGE_FOOTER_CENTER);
            $spreadsheet->getActiveSheet()->getHeaderFooter()->setOddFooter('&C&G');
        // ----- END PAGE SETUP -----


        $sheet->getColumnDimension('A')->setWidth(2);
        $sheet->getColumnDimension('B')->setWidth(13);
        $sheet->getColumnDimension('C')->setWidth(9);
        $sheet->getColumnDimension('D')->setWidth(9);
        $sheet->getColumnDimension('E')->setWidth(9);
        $sheet->getColumnDimension('F')->setWidth(9);
        $sheet->getColumnDimension('G')->setWidth(10);
        $sheet->getColumnDimension('H')->setWidth(10);
        $sheet->getColumnDimension('I')->setWidth(8);
        $sheet->getColumnDimension('J')->setWidth(15);
        $sheet->getColumnDimension('K')->setWidth(15);
        $sheet->getColumnDimension('L')->setWidth(2);

        $sheet->getRowDimension('1')->setRowHeight(19);
        $sheet->getRowDimension('2')->setRowHeight(17);
        $sheet->getRowDimension('3')->setRowHeight(17);
        $sheet->getRowDimension('4')->setRowHeight(17);
        $sheet->getRowDimension('5')->setRowHeight(17);
        $sheet->getRowDimension('6')->setRowHeight(17);
        $sheet->getRowDimension('7')->setRowHeight(17);
        


        // ----- STYLES -----
        $documentNoStyle = [
            "font" => [
                "bold"  => true,
                "color" => array("rgb" => "fe0000"),
                "size"  => 10
            ],
            "alignment" => [
                "vertical"   => Alignment::VERTICAL_CENTER,
                "horizontal" => Alignment::HORIZONTAL_RIGHT
            ],
        ];

        $amountStyle = [
            "font" => [
                "size"  => 10
            ],
            "alignment" => [
                "vertical"   => Alignment::VERTICAL_CENTER,
                "horizontal" => Alignment::HORIZONTAL_RIGHT
            ],
        ];

        $titleStyle = [
            "font" => [
                "bold"  => true,
                "color" => array("rgb" => "800000"),
                "size"  => 14
            ],
            "alignment" => [
                "vertical"   => Alignment::VERTICAL_BOTTOM,
                "horizontal" => Alignment::HORIZONTAL_CENTER
            ],
        ];

        $labelFillStyle = [
            "font" => [
                "color" => array("rgb" => "FFFFFF"), 
                "bold" => true,
            ],
            "alignment" => [
                "vertical"   => Alignment::VERTICAL_CENTER,
                "horizontal" => Alignment::HORIZONTAL_CENTER
            ],
            'fill' => [
                'fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                'startColor' => [
                    'argb' => 'FF161616',
                ],
            ],
        ];

        $columnFillStyle = [
            "font" => [
                "color" => array("rgb" => "FFFFFF"), 
                "bold" => true,
                "size" => 8
            ],
            "alignment" => [
                "vertical"   => Alignment::VERTICAL_CENTER,
                "horizontal" => Alignment::HORIZONTAL_CENTER
            ],
            'fill' => [
                'fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                'startColor' => [
                    'argb' => 'FF161616',
                ],
            ],
        ];

        $columnRowFillStyle = [
            "font" => [
                "size" => 8
            ],
            "alignment" => [
                "wrapText"   => true,
                "vertical"   => Alignment::VERTICAL_CENTER,
                "horizontal" => Alignment::HORIZONTAL_LEFT
            ]
        ];

        $labelBoldStyle = [
            "font" => [
                "bold" => true,
                "color" => array("rgb" => "FFFFFF"), 
                "size" => 10
                
            ],
            "alignment" => [
                "vertical"   => Alignment::VERTICAL_CENTER,
                "horizontal" => Alignment::HORIZONTAL_LEFT
            ],
            'fill' => [
                'fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                'startColor' => [
                    'argb' => 'FF161616',
                ],
            ],
        ];

        $wrapTextCenter = [
            "font" => [
                "size" => 9
            ],
            "alignment" => [
                "vertical"   => Alignment::VERTICAL_CENTER,
                "horizontal" => Alignment::HORIZONTAL_LEFT,
                "wrapText"   => true
            ]
        ];

        $commentInstructionStyle = [
            "font" => [
                "size" => 7
            ],
            "alignment" => [
                "vertical"   => Alignment::VERTICAL_TOP,
                "horizontal" => Alignment::HORIZONTAL_LEFT,
                "wrapText"   => true
            ],
            'borders' => [
                'allBorders' => [
                    'borderStyle' => Border::BORDER_THIN,
                    'color' => ['argb' => 'FF000000'],
                ],
            ],
        ];

        $approversStyle = [
            "alignment" => [
                "vertical"   => Alignment::VERTICAL_CENTER,
                "horizontal" => Alignment::HORIZONTAL_LEFT,
                "wrapText"   => true
            ],
            'borders' => [
                'allBorders' => [
                    'borderStyle' => Border::BORDER_THIN,
                    'color' => ['argb' => 'FF000000'],
                ],
            ],
        ];

        $amountWordStyle = [
            "alignment" => [
                "vertical"   => Alignment::VERTICAL_CENTER,
                "horizontal" => Alignment::HORIZONTAL_CENTER,
                "wrapText"   => true
            ],
            'borders' => [
                'allBorders' => [
                    'borderStyle' => Border::BORDER_THIN,
                    'color' => ['argb' => 'FF000000'],
                ],
            ],
        ];

        $boldStyle = [
            "font" => [
                "bold" => true,
            ],
        ];

        $amountFigureStyle = [
            "alignment" => [
                "vertical"   => Alignment::VERTICAL_CENTER,
                "horizontal" => Alignment::HORIZONTAL_RIGHT,
                "wrapText"   => true
            ],
        ];

        $allBorderStyle = [
            'borders' => [
                'allBorders' => [
                    'borderStyle' => Border::BORDER_THIN,
                    'color' => ['argb' => 'FF000000'],
                ],
            ],
        ];

        $borderBottomThin = [
            'borders' => [
                'bottom' => [
                    'borderStyle' => Border::BORDER_THIN,
                    'color' => ['argb' => 'FF000000'],
                ],
            ],
        ];

        $borderBottomSolid = [
            'borders' => [
                'bottom' => [
                    'borderStyle' => Border::BORDER_THICK,
                    'color' => ['argb' => 'FF000000'],
                ],
            ],
        ];


        $sideBorderStyle = [
            'borders' => [
                'left' => [
                    'borderStyle' => Border::BORDER_THIN,
                    'color' => ['argb' => 'FF000000'],
                ],
                'right' => [
                    'borderStyle' => Border::BORDER_THIN,
                    'color' => ['argb' => 'FF000000'],
                ],
            ],
        ];

        $bottomBorderStyle = [
            'borders' => [
                'bottom' => [
                    'borderStyle' => Border::BORDER_THIN,
                    'color' => ['argb' => 'FF000000'],
                ],
            ],
        ];


        // ----- END STYLES -----


        // ----- TITLE -----
        $sheet->mergeCells('B1:K1');
        $sheet->setCellValue('B1', $code);
        $sheet->getStyle('B1')->applyFromArray($documentNoStyle);
        $sheet->mergeCells('B2:K2');
        $sheet->setCellValue('B2', "PROJECT BUDGET RATIONALE");
        $sheet->getStyle('B2')->applyFromArray($titleStyle);
        // ----- END TITLE -----

        // ----- HEADER -----
            $sheet->mergeCells('B3:C3');
            $sheet->setCellValue('B3', "Client Name:");
            $sheet->mergeCells('D3:G3');
            $sheet->setCellValue('D3', $data["clientName"]);
            $sheet->mergeCells('H3:I3');
            $sheet->setCellValue('H3', "Date:");
            $sheet->mergeCells('J3:K3');
            $sheet->setCellValue('J3', $data["dateAproved"]);

            $sheet->mergeCells('B4:C4');
            $sheet->setCellValue('B4', "Address: ");
            $sheet->mergeCells('D4:G4');
            $sheet->setCellValue('D4', $data["clientAddress"]);

            $sheet->mergeCells('H4:I4');
            $sheet->setCellValue('H4', "Reference No.:");
            $sheet->mergeCells('J4:K4');
            $sheet->setCellValue('J4', $data["costEstimateCode"]);
            $sheet->getRowDimension('4')->setRowHeight(34.31);

            $sheet->mergeCells('B5:C5');
            $sheet->setCellValue('B5', "Project Code: ");
            $sheet->mergeCells('D5:G5');
            $sheet->setCellValue('D5', $data["projectCode"]);
            $sheet->mergeCells('H5:I5');
            $sheet->setCellValue('H5', "Project Name: ");
            $sheet->mergeCells('J5:K5');
            $sheet->setCellValue('J5', $data["projectName"]);

            $sheet->mergeCells('B6:C6');
            $sheet->setCellValue('B6', "Description: ");
            $sheet->mergeCells('D6:K6');
            $sheet->setCellValue('D6', $data["billMaterialReason"]);

            $sheet->getStyle("B3:C6")->applyFromArray($labelFillStyle);
            $sheet->getStyle("H3:I5")->applyFromArray($labelFillStyle);
            $sheet->getStyle("B3:K6")->applyFromArray($allBorderStyle);
            $sheet->getStyle("D4")->applyFromArray($wrapTextCenter);
            $sheet->getStyle("D6")->applyFromArray($wrapTextCenter);
        // ----- END HEADER -----
            $rowNumber = 7;
            
        // BODY CONTENT
            $phaseData      = $data["phase"];
            $materialData   = $data["material"];
            $travel         = $data["travel"];

            if(count($phaseData) > 0){
                $sheet->mergeCells("B".$rowNumber.":"."K".$rowNumber);
                $firstCell = "B".$rowNumber;
                $rowNumber ++;

                $sheet->mergeCells("B".$rowNumber.":"."K".$rowNumber);
                $sheet->setCellValue('B'.$rowNumber, "PROJECT PHASE");
                $sheet->getStyle('B'.$rowNumber)->applyFromArray($labelFillStyle);
                $rowNumber++;

                $sheet->mergeCells("B".$rowNumber.":D".$rowNumber);
                $sheet->setCellValue('B'.$rowNumber, "PHASE");
                $sheet->getStyle('B'.$rowNumber)->applyFromArray($columnFillStyle);

                $sheet->mergeCells("E".$rowNumber.":F".$rowNumber);
                $sheet->setCellValue('E'.$rowNumber, "MILESTONE");
                $sheet->getStyle('E'.$rowNumber)->applyFromArray($columnFillStyle);

                $sheet->mergeCells("G".$rowNumber.":H".$rowNumber);
                $sheet->setCellValue('G'.$rowNumber, "MATERIAL");
                $sheet->getStyle('G'.$rowNumber)->applyFromArray($columnFillStyle);

                $sheet->mergeCells("I".$rowNumber.":J".$rowNumber);
                $sheet->setCellValue('I'.$rowNumber, "LABOR");
                $sheet->getStyle('I'.$rowNumber)->applyFromArray($columnFillStyle);

                $sheet->setCellValue('K'.$rowNumber, "TOTAL COST");
                $sheet->getStyle('K'.$rowNumber)->applyFromArray($columnFillStyle);
                

                $rowNumber++;

                for($x = 0; $x < count($phaseData); $x++){
                    $arrData = $phaseData[$x];
                    $phaseName                  = $arrData["phaseName"];
                    $materialTotalCost          = $arrData["materialTotalCost"];
                    $laborTotalCost             = $arrData["laborTotalCost"];
                    $projectPhaseTotalCost      = $arrData["totalCost"];
                    $milestoneData              = $arrData["milestone"];

                    $sheet->getRowDimension("$rowNumber")->setRowHeight(10*2);
                    $sheet->mergeCells("B".$rowNumber.":D".$rowNumber);
                    $sheet->setCellValue('B'.$rowNumber, $phaseName);

                    $sheet->mergeCells("E".$rowNumber.":F".$rowNumber);
                    $sheet->setCellValue('E'.$rowNumber, "");

                    $sheet->mergeCells("G".$rowNumber.":H".$rowNumber);
                    $sheet->setCellValue('G'.$rowNumber, $materialTotalCost ? formatAmount($materialTotalCost, true): "-");
                    $sheet->getStyle('G'.$rowNumber)->applyFromArray($amountStyle);

                    $sheet->mergeCells("I".$rowNumber.":J".$rowNumber);
                    $sheet->setCellValue('I'.$rowNumber, $laborTotalCost ? formatAmount($laborTotalCost, true) : "-");
                    $sheet->getStyle('I'.$rowNumber)->applyFromArray($amountStyle);

                    $sheet->setCellValue('K'.$rowNumber, $projectPhaseTotalCost ? formatAmount($projectPhaseTotalCost) : "-");
                    $sheet->getStyle('K'.$rowNumber)->applyFromArray($amountStyle);
                    
                    $rowNumber ++;
                        
                    for ($y=0; $y < count($milestoneData) ; $y++) { 
                        $sheet->getRowDimension("$rowNumber")->setRowHeight(17*2);
                        $milestoneArrData = $milestoneData[$y];
                        $sheet->mergeCells("B".$rowNumber.":D".$rowNumber);
                        $sheet->setCellValue('B'.$rowNumber, "");

                        $sheet->mergeCells("E".$rowNumber.":F".$rowNumber);
                        $sheet->setCellValue('E'.$rowNumber, $milestoneArrData["milestoneName"]);
                        $sheet->getStyle('E'.$rowNumber)->applyFromArray($columnRowFillStyle);


                        $sheet->mergeCells("G".$rowNumber.":H".$rowNumber);
                        $sheet->setCellValue('G'.$rowNumber, $milestoneArrData["materialTotal"] ? formatAmount($milestoneArrData["materialTotal"], true) : "-");
                        $sheet->getStyle('G'.$rowNumber)->applyFromArray($amountStyle);

                        $sheet->mergeCells("I".$rowNumber.":J".$rowNumber);
                        $sheet->setCellValue('I'.$rowNumber, $milestoneArrData["laborTotal"] ? formatAmount($milestoneArrData["laborTotal"], true) : "-");
                        $sheet->getStyle('I'.$rowNumber)->applyFromArray($amountStyle);
                       

                        $sheet->setCellValue('K'.$rowNumber, $milestoneArrData["totalCost"] ? formatAmount($milestoneArrData["totalCost"],true) : "-");
                        $sheet->getStyle('K'.$rowNumber)->applyFromArray($amountStyle);

                        $rowNumber ++;
                    }   
                }
                $lastCell = "K".$rowNumber;
                $sheet->getStyle($firstCell.":".$lastCell)->applyFromArray($allBorderStyle);


                
            }
            
            if(count($materialData) > 0){
                $sheet->mergeCells("B".$rowNumber.":"."K".$rowNumber);
                $rowNumber ++;

                $firstCell = "B".$rowNumber;
                $sheet->mergeCells("B".$rowNumber.":"."K".$rowNumber);
                $sheet->setCellValue('B'.$rowNumber, "MATERIAL AND EQUIPMENT");
                $sheet->getStyle('B'.$rowNumber)->applyFromArray($labelFillStyle);
                $rowNumber++;


                for ($x  = 0; $x < count($materialData) ; $x++) { 
                    $arrData = $materialData[$x];
                    $sheet->getRowDimension("$rowNumber")->setRowHeight(10*2);

                    $sheet->mergeCells("B".$rowNumber.":J".$rowNumber);
                    $sheet->setCellValue('B'.$rowNumber, $arrData["materialName"]);
                    // $sheet->getStyle('B'.$rowNumber)->applyFromArray($columnRowFillStyle);
                    
                    $sheet->setCellValue('K'.$rowNumber, $arrData["totalCost"] ? formatAmount($arrData["totalCost"], true) : "-");
                    $sheet->getStyle('K'.$rowNumber)->applyFromArray($amountStyle);

                    $rowNumber ++;
                }
                $lastCell = "K".$rowNumber;
                $sheet->getStyle($firstCell.":".$lastCell)->applyFromArray($allBorderStyle);
            }

            if(count($travel) > 0){
                $sheet->mergeCells("B".$rowNumber.":"."K".$rowNumber);
                $rowNumber ++;

                $firstCell = "B".$rowNumber;
                $sheet->mergeCells("B".$rowNumber.":"."K".$rowNumber);
                $sheet->setCellValue('B'.$rowNumber, "TRAVEL AND TRANSPORTATION");
                $sheet->getStyle('B'.$rowNumber)->applyFromArray($labelFillStyle);
                $rowNumber++;


                    for ($x  = 0; $x < count($travel) ; $x++) { 
                        $arrData = $travel[$x];
                        $sheet->getRowDimension("$rowNumber")->setRowHeight(10*2);

                        $sheet->mergeCells("B".$rowNumber.":J".$rowNumber);
                        $sheet->setCellValue('B'.$rowNumber, $arrData["travelType"]);
                        // $sheet->getStyle('B'.$rowNumber)->applyFromArray($columnRowFillStyle);
                        $sheet->setCellValue('K'.$rowNumber, $arrData["travelTotalCost"] ? formatAmount($arrData["travelTotalCost"], true)  : "-");
                        $sheet->getStyle('K'.$rowNumber)->applyFromArray($amountStyle);
                        $rowNumber ++;
                    }
                $lastCell = "K".(floatval($rowNumber) - 1);
                $sheet->getStyle($firstCell.":".$lastCell)->applyFromArray($allBorderStyle);
            }

                $sheet->mergeCells("B".$rowNumber.":"."K".$rowNumber);
                $rowNumber ++;

            // LIST OF TOTATLS
                $listOfTotalsFirstCell = $rowNumber;

                $sheet->mergeCells("H".$rowNumber.":J".$rowNumber);
                $sheet->setCellValue('H'.$rowNumber, "TOTAL COST");
                $sheet->getStyle('H'.$rowNumber)->applyFromArray($boldStyle);

                $sheet->setCellValue('K'.$rowNumber, formatAmount($data["totalCost"], true));
                $sheet->getStyle('K'.$rowNumber)->applyFromArray($amountStyle);
                $sheet->getStyle('K'.$rowNumber)->applyFromArray($boldStyle);
                $rowNumber ++;

                $sheet->mergeCells("H".$rowNumber.":J".$rowNumber);
                $sheet->setCellValue('H'.$rowNumber, "OVERHEAD");

                $sheet->setCellValue('K'.$rowNumber, formatAmount($data["overhead"], true));
                $sheet->getStyle('K'.$rowNumber)->applyFromArray($amountStyle);
                $rowNumber ++;

                $sheet->mergeCells("H".$rowNumber.":J".$rowNumber);
                $sheet->setCellValue('H'.$rowNumber, "CONTINGENCY");
            
                $sheet->setCellValue('K'.$rowNumber, formatAmount($data["contingency"], true));

                $sheet->getStyle("H".$rowNumber.":J".$rowNumber)->applyFromArray($borderBottomThin);
                $sheet->getStyle('K'.$rowNumber)->applyFromArray($borderBottomThin);
                $sheet->getStyle('K'.$rowNumber)->applyFromArray($amountStyle);
                $rowNumber ++;

                $sheet->mergeCells("H".$rowNumber.":J".$rowNumber);
                $sheet->setCellValue('H'.$rowNumber, "SUBTOTAL");
                $sheet->getStyle('H'.$rowNumber)->applyFromArray($boldStyle);

                $sheet->setCellValue('K'.$rowNumber, formatAmount($data["subTotal"], true));
                $sheet->getStyle('K'.$rowNumber)->applyFromArray($amountStyle);
                $sheet->getStyle('K'.$rowNumber)->applyFromArray($boldStyle);
                $rowNumber ++;

                $sheet->mergeCells("H".$rowNumber.":J".$rowNumber);
                $sheet->setCellValue('H'.$rowNumber, "MARKUP");

                $sheet->setCellValue('K'.$rowNumber, formatAmount($data["markup"], true));
                $sheet->getStyle("H".$rowNumber.":J".$rowNumber)->applyFromArray($borderBottomThin);
                $sheet->getStyle('K'.$rowNumber)->applyFromArray($borderBottomThin);
                $sheet->getStyle('K'.$rowNumber)->applyFromArray($amountStyle);
                $rowNumber ++;

                $sheet->mergeCells("H".$rowNumber.":J".$rowNumber);
                $sheet->setCellValue('H'.$rowNumber, "CONTRACT PRICE - VAT EX");
                $sheet->getStyle('H'.$rowNumber)->applyFromArray($boldStyle);

                $sheet->setCellValue('K'.$rowNumber, formatAmount($data["contractPriceVATex"], true));
                $sheet->getStyle('K'.$rowNumber)->applyFromArray($boldStyle);
                $sheet->getStyle('K'.$rowNumber)->applyFromArray($amountStyle);
                $rowNumber ++;

                $sheet->mergeCells("H".$rowNumber.":J".$rowNumber);
                $sheet->setCellValue('H'.$rowNumber, "12% VAT");

                $sheet->setCellValue('K'.$rowNumber, formatAmount($data["vat"], true));
                $sheet->getStyle("H".$rowNumber.":J".$rowNumber)->applyFromArray($borderBottomThin);
                $sheet->getStyle('K'.$rowNumber)->applyFromArray($borderBottomThin);
                $sheet->getStyle('K'.$rowNumber)->applyFromArray($amountStyle);
                $rowNumber ++;

                $listOfTotalsLastCell = $rowNumber;

                $sheet->mergeCells("H".$rowNumber.":J".$rowNumber);
                $sheet->setCellValue('H'.$rowNumber, "CONTRACT PRICE - VAT INC");
                $sheet->getStyle('H'.$rowNumber)->applyFromArray($boldStyle);

                $sheet->setCellValue('K'.$rowNumber, formatAmount($data["contractPriceVATinc"], true));

                $sheet->getStyle("H".$rowNumber.":J".$rowNumber)->applyFromArray($borderBottomSolid);
                $sheet->getStyle('K'.$rowNumber)->applyFromArray($borderBottomSolid);
                $sheet->getStyle('K'.$rowNumber)->applyFromArray($amountStyle);
                $sheet->getStyle('K'.$rowNumber)->applyFromArray($boldStyle);
                
                $rowNumber ++;

                

                $sheet->mergeCells("B".$listOfTotalsFirstCell.":G".$listOfTotalsLastCell);
                // $sheet->getStyle("B".$listOfTotalsFirstCell.":K".$listOfTotalsLastCell)->applyFromArray($allBorderStyle);
            // END LIST OF TOTATLS
            
            $sheet->mergeCells("B".$rowNumber.":"."K".$rowNumber);
            $rowNumber ++;


        // ----- FOOTER -----
            $employees      = $data["employees"];
            $countEmployees = count($employees);
            if ($countEmployees == 1 ) {
                $columns = [["B", "K"]];
            } else if ($countEmployees == 3) {
                $columns = [["B", "E"], ["F", "H"], ["I", "K"]];
            } else {
                $columns = [["B", "F"], ["G", "K"]];
            }

            foreach ($employees as $index => $employee) {
                if ($countEmployees > 3) {
                    if ($index % 2 == 0) {
                        if ($index != 0) $rowNumber++;
                        $cell     = $columns[0][0].$rowNumber.":".$columns[0][1].$rowNumber;
                        $baseCell = $columns[0][0].$rowNumber;
                        if (($index+1) == $countEmployees) {
                            $cell     = "B".$rowNumber.":K".$rowNumber;
                            $baseCell = "B".$rowNumber;
                        }
                    } else {
                        $cell     = $columns[1][0].$rowNumber.":".$columns[1][1].$rowNumber;
                        $baseCell = $columns[1][0].$rowNumber;
                    }
                } else {
                    $cell     = $columns[$index][0].$rowNumber.":".$columns[$index][1].$rowNumber;
                    $baseCell = $columns[$index][0].$rowNumber;
                }

                $sheet->mergeCells($cell);
                
                $titleName = $employee["title"].": ".$employee["name"];
                $position  = $employee["position"];

                $richText = new RichText();
                $richText->createText('');
                $cellText = $richText->createTextRun($titleName);
                $cellText->getFont()->setBold(true);
                $richText->createText("\n$position");

                $sheet->setCellValue($baseCell, $richText);
                $sheet->getStyle($cell)->applyFromArray($approversStyle);
                $sheet->getRowDimension($rowNumber)->setRowHeight(17*2);
            }
        $rowNumber++;

            $sheet->mergeCells("B$rowNumber:E$rowNumber");
            $sheet->setCellValue("B$rowNumber", "Acknowledged by: ");
            $sheet->getStyle("B$rowNumber:E$rowNumber")->applyFromArray($allBorderStyle);
            $sheet->mergeCells("F$rowNumber:H$rowNumber");
            $sheet->setCellValue("F$rowNumber", "Signature: ");
            $sheet->getStyle("F$rowNumber:H$rowNumber")->applyFromArray($allBorderStyle);
            $sheet->mergeCells("I$rowNumber:K$rowNumber");
            $sheet->setCellValue("I$rowNumber", "Date: ");
            $sheet->getStyle("I$rowNumber:K$rowNumber")->applyFromArray($allBorderStyle);
            $sheet->getRowDimension("$rowNumber")->setRowHeight(17*2);
            $sheet->getStyle("B$rowNumber:K$rowNumber")->getFont()->setBold(true);
        // ----- END FOOTER -----





        // ----- PRINTING AREA -----
            $spreadsheet->getActiveSheet()->getPageSetup()->setPrintArea("B1:K".$rowNumber);
        // ----- END PRINTING AREA -----

        $writer = new Xlsx($spreadsheet);
        header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        header('Content-Disposition: attachment; filename="'. urlencode($fileName).'"');
        $writer->save('php://output');
    }

    public function downloadExcel(){
        $billMaterialID = $this->input->get("id");
        if ($billMaterialID) {
            $billMaterialData = $this->billmaterial->getBillMaterialData($billMaterialID);
            if ($billMaterialData) {
                $this->billMaterialExcel($billMaterialData);
                // print_r($billMaterialData);
            }
        }
    }



}
?>