
<?php
class Bill_material extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model("pms/BillMaterial_model", "billmaterial");
        $this->load->model("ims/MaterialRequest_model", "materialrequest");
        isAllowed(39);
    }

    public function index()
    {
        $data["title"] = "Bill Material";
        $this->load->view("template/header",$data);
        $this->load->view("pms/bill_material/index");
        $this->load->view("template/footer");
    }

    public function saveBillMaterial(){
        $action                     = $this->input->post("action");
        $method                     = $this->input->post("method");

        $billMaterialID             = $this->input->post("billMaterialID");
        $reviseBillMaterialID 	    = $this->input->post("reviseBillMaterialID")        == "null" ?  NULL : $this->input->post("reviseBillMaterialID");
        $reviseBillMaterialCode 	= $this->input->post("reviseBillMaterialCode")      == "null" ?  NULL : $this->input->post("reviseBillMaterialCode");
        $billMaterialGrandTotal 	= $this->input->post("billMaterialGrandTotal")      == "null" ?  NULL : $this->input->post("billMaterialGrandTotal");

        $approversID                = $this->input->post("approversID")     ?? null;
        $approversStatus            = $this->input->post("approversStatus") ?? null;
        $approversDate              = $this->input->post("approversDate")   ?? null;

        $billMaterialStatus         = $this->input->post("billMaterialStatus");
        $billMaterialReason         = $this->input->post("billMaterialReason")   ?? null;
        $billMaterialRemarks        = $this->input->post("billMaterialRemarks")  ?? null;

        $employeeID 		        = $this->input->post("employeeID")  ?? null;
        $submittedAt                = $this->input->post("submittedAt") ?? null;
        $createdBy                  = $this->input->post("createdBy")   ?? null;
        $updatedBy                  = $this->input->post("updatedBy")   ?? null;
        $createdAt                  = $this->input->post("createdAt")   ?? null;
        $items                      = $this->input->post("items")       ?? null;
        $assets                     = $this->input->post("assets")      ?? null;
        $vehicles                   = $this->input->post("vehicles")    ?? null;
        $others                     = $this->input->post("others")      ?? null;
        $billMaterialData = [
            "employeeID"                => $employeeID,
            "billMaterialID"            => $billMaterialID,
            "reviseBillMaterialID"      => $reviseBillMaterialID,
            "reviseBillMaterialCode"    => $reviseBillMaterialCode,
            "approversID"               => $approversID,
            "approversStatus"           => $approversStatus,
            "approversDate"             => $approversDate,
            "billMaterialStatus"        => $billMaterialStatus,
            "billMaterialReason"        => $billMaterialReason,
            "billMaterialGrandTotal"    => $billMaterialGrandTotal,
            "submittedAt"               => $submittedAt,
            "createdBy"                 => $createdBy,
            "updatedBy"                 => $updatedBy,
            "createdAt"                 => $createdAt
        ];

        if ($action == "update") {
            unset($billMaterialData["reviseBillMaterialID"]);
             unset($billMaterialData["reviseBillMaterialCode"]);
            unset($billMaterialData["createdBy"]);
            unset($billMaterialData["createdAt"]);

            if ($method == "cancelform") {
                $billMaterialData = [
                    "billMaterialStatus"    => 4,
                    "updatedBy"             => $updatedBy,
                ];
            } else if ($method == "approve") {
                $billMaterialData = [
                    "approversStatus"       => $approversStatus,
                    "approversDate"         => $approversDate,
                    "billMaterialStatus"    => $billMaterialStatus,
                    "updatedBy"             => $updatedBy,
                ];
                
            } else if ($method == "deny") {
                $billMaterialData = [
                    "approversStatus"        => $approversStatus,
                    "approversDate"          => $approversDate,
                    "billMaterialStatus"     => 3,
                    "billMaterialRemarks"    => $billMaterialRemarks,
                    "updatedBy"              => $updatedBy,
                ];
            } else if ($method == "drop") {
                $billMaterialData = [
                    "reviseBillMaterialID"      => $reviseBillMaterialID,
                    "billMaterialStatus"        => 5,
                    "updatedBy"                 => $updatedBy,
                ]; 
            }
        }

        $saveBillMaterialData = $this->billmaterial->saveBillMaterialData($action, $billMaterialData, $billMaterialID);
            if($billMaterialStatus == "2"){
                $billMaterialResultData = $this->billmaterial->getBillMaterialData($billMaterialID);
                    $materialRequestData = [
                        "employeeID"                => $billMaterialResultData->createdBy,
                        "costEstimateID" 		    => $billMaterialResultData->costEstimateID,
                        "costEstimateCode" 			=> $billMaterialResultData->costEstimateCode,
                        "billMaterialID" 			=> $billMaterialResultData->billMaterialID,
                        "billMaterialCode"			=> $billMaterialResultData->billMaterialCode,
                        "timelineBuilderID" 		=> $billMaterialResultData->timelineBuilderID,
                        "projectCode"   			=> $billMaterialResultData->projectCode,
                        "projectName"   			=> $billMaterialResultData->projectName,
                        "projectCategory" 			=> $billMaterialResultData->projectCategory,
                        "clientCode"    		    => $billMaterialResultData->clientCode,
                        "clientName"    		    => $billMaterialResultData->clientName,
                        "clientAddress" 		    => $billMaterialResultData->clientAddress,
                        "dateNeeded" 				=> $billMaterialResultData->dateNeeded,
                        "materialRequestReason"     => $billMaterialResultData->billMaterialReason,
                        "submittedAt"               => $billMaterialResultData->submittedAt,
                        "createdBy"                 => $billMaterialResultData->createdBy,
                        "updatedBy"                 => $billMaterialResultData->createdBy
                    ];
                $this->materialrequest->saveMaterialRequestData("insert", $materialRequestData);
            }
        if($saveBillMaterialData){
            $error      = 0;
            $errorMsg   = "false|System error: Please contact the system administrator for assistance!";
            $result = explode("|", $saveBillMaterialData);
            if($result[0]== "true"){
                $billMaterialID = $result[2];

                // if($billMaterialStatus == "2"){
                //     $this->billmaterial->insertToIVR($billMaterialID);
                // }
                
                if($items){
                    $bilMaterialItems = [];
                    for ($i=0; $i < count($items) ; $i++) { 
                        foreach ($items[$i] as $index => $item) {
                            $itemInfo   =   $this->billmaterial->getTableRowDetails("item",$item["requestItemID"]);
                            $temp = [
                                    "billMaterialID"            =>  $billMaterialID,
                                    "costEstimateID"            =>  $itemInfo->costEstimateID,
                                    "milestoneBuilderID"        =>  $itemInfo->milestoneBuilderID,
                                    "phaseDescription"          =>  $itemInfo->phaseDescription,
                                    "milestoneListID"           =>  $itemInfo->milestoneListID,
                                    "projectMilestoneID"        =>  $itemInfo->projectMilestoneID,
                                    "projectMilestoneName"      =>  $itemInfo->projectMilestoneName,
                                    "itemID"                    =>  $itemInfo->itemID ,
                                    "itemCode"                  =>  $itemInfo->itemCode,
                                    "itemBrandName"             =>  $itemInfo->itemBrandName,
                                    "itemName"                  =>  $itemInfo->itemName,
                                    "itemClassification"        =>  $itemInfo->itemClassification,
                                    "itemCategory"              =>  $itemInfo->itemCategory,
                                    "itemUom"                   =>  $itemInfo->itemUom,
                                    "itemDescription"           =>  $itemInfo->itemDescription,
                                    "files"                     =>  $itemInfo->files,
                                    "remarks"                   =>  $itemInfo->remarks,
                                    "requestQuantity"           =>  $itemInfo->requestQuantity,
                                    "unitCost"                  =>  $item["unitCost"],
                                    "totalCost"                 =>  $item["totalCost"],
                                    "createdBy"                 =>  $updatedBy,
                                    "updatedBy"                 =>  $updatedBy
                            ];
                            array_push($bilMaterialItems, $temp);
                        }
                    }
                    $saveCostEstimateItems = $this->billmaterial->saveInventoryRequest("item", $bilMaterialItems, $itemInfo->costEstimateID, $billMaterialID);
                    
                    $error += intval(!$saveCostEstimateItems ? 1 : 0);
                }

                if($assets){
                    $billMaterialAssets = [];
                    foreach ($assets as $index => $asset) {
                        $assetInfo   =   $this->billmaterial->getTableRowDetails("asset",$asset["requestAssetID"]);
                        $temp = [
                                "billMaterialID"            =>  $billMaterialID,
                                "costEstimateID"            =>  $assetInfo->costEstimateID,
                                "assetID"                   =>  $assetInfo->assetID ,
                                "assetCode"                 =>  $assetInfo->assetCode,
                                "assetBrandName"            =>  $assetInfo->assetBrandName,
                                "assetName"                 =>  $assetInfo->assetName,
                                "assetClassification"       =>  $assetInfo->assetClassification,
                                "assetCategory"             =>  $assetInfo->assetCategory,
                                "assetUom"                  =>  $assetInfo->assetUom,
                                "assetDescription"          =>  $assetInfo->assetDescription,
                                "files"                     =>  $assetInfo->files,
                                "remarks"                   =>  $assetInfo->remarks,
                                "requestQuantity"           =>  $assetInfo->requestQuantity,
                                "requestManHours"           =>  $assetInfo->requestManHours,
                                "hourlyRate"                =>  $asset["hourlyRate"],
                                "unitCost"                  =>  $asset["unitCost"],
                                "totalCost"                 =>  $asset["totalCost"],
                                "createdBy"                 =>  $updatedBy,
                                "updatedBy"                 =>  $updatedBy
                        ];
                        array_push($billMaterialAssets, $temp);
                    }
                    $saveCostEstimateAssets = $this->billmaterial->saveInventoryRequest("asset", $billMaterialAssets, $assetInfo->costEstimateID, $billMaterialID);
                    $error += intval(!$saveCostEstimateAssets ? 1 : 0);
                }

                if($vehicles){
                    $billMaterialVehicle = [];
                    foreach ($vehicles as $index => $vehicle) {
                        $vehicleInfo   =   $this->billmaterial->getTravelRequestRow($vehicle["travelRequestID"]);
                        $temp = [
                                "billMaterialID"            =>  $billMaterialID,
                                "costEstimateID"            =>  $vehicleInfo->costEstimateID,
                                "billMaterialCode"          =>  "BOM-".date_format(date_create($createdAt),"y")."-".str_pad($billMaterialID, 5, "0", STR_PAD_LEFT),
                                "costEstimateCode"          =>  $vehicleInfo->costEstimateCode,
                                "vehicleID"                 =>  $vehicleInfo->vehicleID,
                                "travelType"                =>  $vehicleInfo->travelType,
                                "vehicleCode"               =>  $vehicleInfo->vehicleCode,
                                "vehiclePlateNumber"        =>  $vehicleInfo->vehiclePlateNumber,
                                "vehicleName"               =>  $vehicleInfo->vehicleName,
                                "vehicleFuelType"           =>  $vehicleInfo->vehicleFuelType,
                                "vehicleDistance"           =>  $vehicleInfo->vehicleDistance,
                                "vehicleFuelConsumption"    =>  $vehicleInfo->vehicleFuelConsumption,
                                "vehicleManHours"           =>  $vehicleInfo->vehicleManHours,
                                "vehicleStartDate"          =>  $vehicleInfo->vehicleStartDate,
                                "vehicleEndDate"            =>  $vehicleInfo->vehicleEndDate,
                                "vehicleLiters"             => $vehicle["vehicleLiters"],
                                "unitCost"                  => $vehicle["unitCost"],
                                "totalCost"                 => $vehicle["totalCost"],
                                "createdBy"                 =>  $updatedBy,
                                "updatedBy"                 =>  $updatedBy,
                        ];
                        array_push($billMaterialVehicle, $temp);
                    }
                    $saveCostEstimateVehicle = $this->billmaterial->saveTravelRequest("vehicle", $billMaterialVehicle, $vehicleInfo->costEstimateID, $billMaterialID);
                    $error += intval(!$saveCostEstimateVehicle ? 1 : 0);
                }

                if($others){
                    $billMaterialOther = [];
                    foreach ($others as $index => $other) {
                        $otherInfo   =   $this->billmaterial->getTravelRequestRow($other["travelRequestID"]);
                        $temp = [
                                "billMaterialID"            =>  $billMaterialID,
                                "costEstimateID"            =>  $otherInfo->costEstimateID,
                                "billMaterialCode"          =>  "BOM-".date_format(date_create($createdAt),"y")."-".str_pad($billMaterialID, 5, "0", STR_PAD_LEFT),
                                "costEstimateCode"          =>  $otherInfo->costEstimateCode,
                                "travelType"                =>  $otherInfo->travelType,
                                "travelTypeDescription"     =>  $otherInfo->travelTypeDescription,
                                "totalCost"                 =>  $other["totalCost"],
                                "createdBy"                 =>  $updatedBy,
                                "updatedBy"                 =>  $updatedBy,
                        ];
                        array_push($billMaterialOther, $temp);
                    }
                    $saveCostEstimateOther = $this->billmaterial->saveTravelRequest("other", $billMaterialOther, $otherInfo->costEstimateID);
                    $error += intval(!$saveCostEstimateOther ? 1 : 0);
                }
                


                
            }
        }

        echo json_encode($error < 1 ? $saveBillMaterialData : $errorMsg);
    }


    public function getPhaseAndMilestoneData(){
       $timelineBuilderID       = $this->input->post("timelineBuilderID");
       $costEstimateID          = $this->input->post("costEstimateID");
       $billMaterialID          = $this->input->post("billMaterialID");
       $billMaterialCondition   = $this->billmaterial->existBillMaterial($costEstimateID, $billMaterialID) ? $billMaterialID : "";
       $result                  = "false|System error: Please contact the system administrator for assistance!";
     
        if($timelineBuilderID){
                $result = $this->billmaterial->getPhaseAndMilestoneData($timelineBuilderID, $costEstimateID, $billMaterialCondition);
        }
        echo json_encode($result);
    }

    

    public function downloadExcel(){
        $billMaterialID = $this->input->get("id");
        if ($billMaterialID) {
            $getMaterialData =  $this->billmaterial->getBillMaterialData($billMaterialID);
            $billMaterialData = $this->billmaterial->getPhaseAndMilestoneData($getMaterialData->timelineBuilderID, $getMaterialData->costEstimateID, $billMaterialID);
            $this->billMaterialExcel($billMaterialData);
        }
    }

    public function billMaterialExcel($data) {
        $code        = "BOM-21-00002";
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
        $sheet->setCellValue('B2', "BILL OF MATERIAL");
        $sheet->getStyle('B2')->applyFromArray($titleStyle);
        // ----- END TITLE -----

        // ----- HEADER -----
            $sheet->mergeCells('B3:C3');
            $sheet->setCellValue('B3', "Client Name:");
            $sheet->mergeCells('D3:G3');
            $sheet->setCellValue('D3', "clientName");
            $sheet->mergeCells('H3:I3');
            $sheet->setCellValue('H3', "Date:");
            $sheet->mergeCells('J3:K3');
            $sheet->setCellValue('J3', "dateAproved");

            $sheet->mergeCells('B4:C4');
            $sheet->setCellValue('B4', "Address: ");
            $sheet->mergeCells('D4:G4');
            $sheet->setCellValue('D4', "clientAddress");

            $sheet->mergeCells('H4:I4');
            $sheet->setCellValue('H4', "Reference No.:");
            $sheet->mergeCells('J4:K4');
            $sheet->setCellValue('J4', "costEstimateCode");
            $sheet->getRowDimension('4')->setRowHeight(34.31);

            $sheet->mergeCells('B5:C5');
            $sheet->setCellValue('B5', "Project Code: ");
            $sheet->mergeCells('D5:G5');
            $sheet->setCellValue('D5', "projectCode");
            $sheet->mergeCells('H5:I5');
            $sheet->setCellValue('H5', "Project Name: ");
            $sheet->mergeCells('J5:K5');
            $sheet->setCellValue('J5', "projectName");

            $sheet->mergeCells('B6:C6');
            $sheet->setCellValue('B6', "Description: ");
            $sheet->mergeCells('D6:K6');
            $sheet->setCellValue('D6', "billMaterialReason");

            $sheet->getStyle("B3:C6")->applyFromArray($labelFillStyle);
            $sheet->getStyle("H3:I5")->applyFromArray($labelFillStyle);
            $sheet->getStyle("B3:K6")->applyFromArray($allBorderStyle);
            $sheet->getStyle("D4")->applyFromArray($wrapTextCenter);
            $sheet->getStyle("D6")->applyFromArray($wrapTextCenter);
        // ----- END HEADER -----
            $rowNumber = 7;
            
        // BODY CONTENT

        // ----- PRINTING AREA -----
            $spreadsheet->getActiveSheet()->getPageSetup()->setPrintArea("B1:K".$rowNumber);
        // ----- END PRINTING AREA -----

        $writer = new Xlsx($spreadsheet);
        header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        header('Content-Disposition: attachment; filename="'. urlencode($fileName).'"');
        $writer->save('php://output');
    }




}
?>