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

class Month_process_report extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model("hris/MonthProcessReport_model", "monthprocess");
        isAllowed(95);
    }

    public function index()
    {
        $data["title"] = "13th Month Report";

        $this->load->view("template/header",$data);
        $this->load->view("hris/monthprocessreport/index");
        $this->load->view("template/footer");
    }

    public function saveMonthProcess()
    { 

        // echo "<pre>";
        // print_r($_POST);
        // exit;


        $action                     = $this->input->post("action");
        $method                     = $this->input->post("method");
        $monthID                  = $this->input->post("monthID") ?? null;
        $revisemonthID            = $this->input->post("revisemonthID") ?? null;
        $employeeID                 = $this->input->post("employeeID");
        $monthDescription               = $this->input->post("monthDescription");
        $monthDateStart               = $this->input->post("monthDateStart");
        $monthDateEnd               = $this->input->post("monthDateEnd");
        $approversID                = $this->input->post("approversID") ?? null;
        $approversStatus            = $this->input->post("approversStatus") ?? null;
        $approversDate              = $this->input->post("approversDate") ?? null;
        $monthStatus              = $this->input->post("monthStatus");
        $monthRemarks             = $this->input->post("monthRemarks") ?? null;
        $submittedAt                = $this->input->post("submittedAt") ?? null;
        $createdBy                  = $this->input->post("createdBy");
        $updatedBy                  = $this->input->post("updatedBy");
        $createdAt                  = $this->input->post("createdAt");
        $items                      = $this->input->post("items") ?? null;


        $MonthProcessData = [
            "revisemonthID"             => $revisemonthID,
            "employeeID"                 => $employeeID,
            "monthDescription"           => $monthDescription,
            "monthDateStart"             => $monthDateStart,
            "monthDateEnd"               => $monthDateEnd,
            "approversID"                => $approversID,
            "approversStatus"            => $approversStatus,
            "approversDate"              => $approversDate,
            "monthStatus"              => $monthStatus,
            "monthRemarks"             => $monthRemarks,
            "submittedAt"                => $submittedAt,
            "createdBy"                  => $createdBy,
            "updatedBy"                  => $updatedBy,
            "createdAt"                  => $createdAt
        ];

        if ($action == "update") {
            unset($MonthProcessData["revisemonthID"]);
            unset($MonthProcessData["createdBy"]);
            unset($MonthProcessData["createdAt"]);

            if ($method == "cancelform") {
                $MonthProcessData = [
                    "monthStatus" => 4,
                    "updatedBy"                => $updatedBy,
                ];
            } else if ($method == "approve") {
                $MonthProcessData = [
                    "approversStatus"          => $approversStatus,
                    "approversDate"            => $approversDate,
                    "monthStatus" => $monthStatus,
                    "updatedBy"                => $updatedBy,
                ];
            } else if ($method == "deny") {
                $MonthProcessData = [
                    "approversStatus"           => $approversStatus,
                    "approversDate"             => $approversDate,
                    "monthStatus"  => 3,
                    "monthRemarks" => $monthRemarks,
                    "updatedBy"                 => $updatedBy,
                ];
            } else if ($method == "drop") {
                $MonthProcessData = [
                    "revisemonthID" => $revisemonthID,
                    "monthStatus"   => 5,
                    "updatedBy"               => $updatedBy,
                ]; 
            } 
            else if ($method == "release") {
                $MonthProcessData = [
                    "revisemonthID" => $revisemonthID,
                    "monthStatus"   => 2,
                    "monthReleaseStatus"   => 9,
                    "updatedBy"               => $updatedBy,
                ]; 
            } 
         
        }
       
            $saveMonthProcessData = $this->monthprocess->saveMonthProcessData($action, $MonthProcessData, $monthID,$method);

            if ($saveMonthProcessData && ($method == "submit" || $method == "save")) {
                $result = explode("|", $saveMonthProcessData);

                if ($result[0] == "true") {
                    $monthID = $result[2];

                    $gross = '';
                    if ($items) {
                        $monthProcessList = [];
                        foreach($items as $index => $item) {

                            $temp = [
                                "monthID" => $monthID,
                                "monthEmployeeID"             => $item["monthEmployeeID"],
                                "basicSalary"              => $item["monthbasicSalary"],
                                "totalGrossPay"              => $item["totalGrossPay"],
                                "monthHoldStatus"              => $item["monthHoldStatus"],
                                "monthTotalPayAmount"              => $item["monthTotalPayAmount"],
                                "createdBy"            => $employeeID,
                                "createdAt"             => date('Y-m-d h:i:s')
                            ];
                            array_push($monthProcessList, $temp);

                            if(!empty($item["gross"])){
                                $gross = $item["gross"];
    
                                $saveServices = $this->monthprocess->saveGrossData($gross, $monthID); 
                                }    

                        }

                        $savePurchTransferstItems = $this->monthprocess->saveMonthProcessList($monthProcessList, $monthID);
                    }

                }
                
            }

        if($monthStatus == 2 ){
            // if ($result[0] == "true") {
            //     $monthID = $result[2];

                $sessionID = $this->session->has_userdata("adminSessionID") ? $this->session->userdata("adminSessionID") : 0;
            
                $getHoldMonthProcessData = $this->monthprocess->getHoldMonthProcessData($monthID);

                $holdData = [];
                foreach($getHoldMonthProcessData as $key => $value){
                    $temphold = [
                        "monthID" => $value["monthID"],
                        "monthCode" => $value["monthCode"],
                        "monthDetailsID" => $value["monthDetailsID"],
                        "payrollHoldStatus" => $value["payrollHoldStatus"],
                        "employeeID"    => $value["monthEmployeeID"],
                        "netPay" => $value["netPay"],
                        "createdAt" => date('Y-m-d h:i:s'),
                        "createdBy" =>  $sessionID,
                    ];

                    array_push($holdData, $temphold);
                }
                $saveSalaryHoldList = $this->monthprocess->saveSalaryHoldList($holdData);
            // }
        }


        
        // if($method == "release"){

        //     $changeStatusInRelease = $this->monthprocess->changeReleaseStatus($monthprocessEmployeeID,$employeeID);

        // }
        echo json_encode($saveMonthProcessData);
    }

    public function reportExcel($data, $dateFrom, $dateTo) {
        $dateFromFn  = str_replace("-", "", $dateFrom);
        $dateToFn    = str_replace("-", "", $dateTo);
        $dateFn      = $dateFromFn."-".$dateToFn;
        $dateDisplay = date("F d, Y", strtotime($dateFrom))." - ".date("F d, Y", strtotime($dateTo));
        // $projectName = count($data) > 0 ? $data[0]["projectName"] : "-";
        $fileName    = "13thMonthReport_$dateFn.xlsx";
        // $fileName    = "Sample.xls";
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
        $headerLogo->setHeight(190);
        $spreadsheet->getActiveSheet()->getHeaderFooter()->addImage($headerLogo, \PhpOffice\PhpSpreadsheet\Worksheet\HeaderFooter::IMAGE_HEADER_CENTER);
        $spreadsheet->getActiveSheet()->getHeaderFooter()->setOddHeader('&C&H');
        
        $footerLogo->setName('Footer logo');
        $footerLogo->setPath("assets/images/company-logo/excel-footer.png");
        $footerLogo->setHeight(90);
        $spreadsheet->getActiveSheet()->getHeaderFooter()->addImage($footerLogo, \PhpOffice\PhpSpreadsheet\Worksheet\HeaderFooter::IMAGE_FOOTER_CENTER);
        $spreadsheet->getActiveSheet()->getHeaderFooter()->setOddFooter('&C&H');
        // ----- END PAGE SETUP -----


        // ----- COLUMN WIDTH -----
        $sheet->getColumnDimension('A')->setWidth(30);
        $sheet->getColumnDimension('B')->setWidth(30);
        $sheet->getColumnDimension('C')->setWidth(30);
        $sheet->getColumnDimension('D')->setWidth(30);
        $sheet->getColumnDimension('E')->setWidth(18);
        $sheet->getColumnDimension('F')->setWidth(18);
        $sheet->getColumnDimension('G')->setWidth(18);
        $sheet->getColumnDimension('H')->setWidth(18);
        // ----- END COLUMN WIDTH -----


        // ----- STYLES -----
        $titleStyle = [
            "font" => [
                "bold"  => true,
                "color" => array("rgb" => "800000"),
                "size"  => 14
            ],
            "alignment" => [
                "vertical"   => Alignment::VERTICAL_BOTTOM,
                "horizontal" => Alignment::HORIZONTAL_CENTER,
                "wrapText"   => true
            ],
        ];

        $subtitleStyle = [
            "font" => [
                // "bold"  => true,
                "color" => array("rgb" => "000000"),
                "size"  => 10
            ],
            "alignment" => [
                "vertical"   => Alignment::VERTICAL_BOTTOM,
                "horizontal" => Alignment::HORIZONTAL_CENTER,
                "wrapText"   => true
            ],
        ];

        $boldStyle = [
            "font" => [
                "bold" => true,
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

        $rightAlignStyle = [
            "alignment" => [
                "vertical"   => Alignment::VERTICAL_CENTER,
                "horizontal" => Alignment::HORIZONTAL_RIGHT,
                "wrapText"   => true
            ],
        ];

        $leftAlignStyle = [
            "alignment" => [
                "vertical"   => Alignment::VERTICAL_CENTER,
                "horizontal" => Alignment::HORIZONTAL_LEFT,
                "wrapText"   => true
            ],
        ];

        $wrapTextStyle = [
            "alignment" => [
                "wrapText"   => true
            ],
        ];
        // ----- END STYLES -----


        // ----- HEADER -----
        $sheet->mergeCells('A1:H1');
        $sheet->mergeCells('A2:H2');
        $sheet->mergeCells('A3:C3');
        $sheet->mergeCells('D3:H3');
        $sheet->mergeCells('A4:C4');
        $sheet->mergeCells('D4:H4');
        $sheet->setCellValue('A1', "13thMonth Report");
        $sheet->setCellValue('A2', "BlackCoders Group Inc."); // CHANGE BASED ON COMPANY SETUP
        $sheet->setCellValue('A3', "Date Period");
        $sheet->setCellValue('D3', $dateDisplay);
        // $sheet->setCellValue('A4', "Date");
        // $sheet->setCellValue('D4', $dateDisplay);
        $sheet->getStyle('A1:H1')->applyFromArray($titleStyle);
        $sheet->getStyle('A2:H2')->applyFromArray($boldStyle);
        $sheet->getStyle('A1:H4')->applyFromArray($allBorderStyle);
        $sheet->getStyle('A2:H4')->applyFromArray($subtitleStyle);
        $sheet->getStyle('A3:C4')->applyFromArray($rightAlignStyle);
        $sheet->getStyle('A3:C4')->applyFromArray($boldStyle);
        $sheet->getStyle('D3:H4')->applyFromArray($leftAlignStyle);
        // ----- END HEADER -----


        // ----- BODY -----
        $sheet->setCellValue('A6', "Employee Code");
        $sheet->setCellValue('B6', "Employee Name");
        $sheet->setCellValue('C6', "Department");
        $sheet->setCellValue('D6', "Designation");
        $sheet->setCellValue('E6', "Basic Salary");
        $sheet->setCellValue('F6', "Gross Pay");
        $sheet->setCellValue('G6', "Total 13th Month");
        $sheet->setCellValue('H6', "Status");
        $sheet->getStyle("A6:H6")->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER);
        $sheet->getStyle('A6:H6')->applyFromArray($boldStyle);

        $rowNumber = 7;
        $limit = count($data) <= 10 ? 10 : count($data);
        for ($i=0; $i<$limit; $i++) {
            $employeeCode = $employeeName = $department = $designation = $basicSalary = $grossPay = $totalMonthPay = $monthHoldStatus = "";
            if ($i < count($data)) {
                $employeeCode = $data[$i]["employeeCode"] ?? "";
                $employeeName = $data[$i]["fullname"] ?? "";
                $department    = $data[$i]["departmentName"] ?? "";
                $designation     = $data[$i]["designationName"] ?? "";
                $basicSalary  = $data[$i]["basicSalary"] == 0 ? "₱"."0.00 " : "₱".number_format($data[$i]["basicSalary"],2);
                $grossPay      = $data[$i]["totalGrossPay"] == 0 ? "₱"."0.00 " : "₱".number_format($data[$i]["totalGrossPay"],2);
                $totalMonthPay = $data[$i]["monthTotalPayAmount"] == 0 ? "₱"."0.00 ": "₱".number_format($data[$i]["monthTotalPayAmount"],2);
                $monthHoldStatus = $data[$i]["monthHoldStatus"] == 0 ? "Hold" : "Pending";
            }
            $sheet->setCellValue("A$rowNumber", $employeeCode);
            $sheet->setCellValue("B$rowNumber", $employeeName);
            $sheet->setCellValue("C$rowNumber", $department);
            $sheet->setCellValue("D$rowNumber", $designation);
            $sheet->setCellValue("E$rowNumber", $basicSalary);
            $sheet->setCellValue("F$rowNumber", $grossPay);
            $sheet->setCellValue("G$rowNumber", $totalMonthPay);
            $sheet->setCellValue("H$rowNumber", $monthHoldStatus);

            $sheet->getStyle("A$rowNumber")->getAlignment()->setHorizontal(Alignment::HORIZONTAL_LEFT);
            $sheet->getStyle("A$rowNumber")->getAlignment()->setHorizontal(Alignment::HORIZONTAL_LEFT);
            $sheet->getStyle("A$rowNumber")->getAlignment()->setHorizontal(Alignment::HORIZONTAL_LEFT);
            $sheet->getStyle("D$rowNumber")->getAlignment()->setHorizontal(Alignment::HORIZONTAL_LEFT);
            $sheet->getStyle("E$rowNumber")->getAlignment()->setHorizontal(Alignment::HORIZONTAL_RIGHT);
            $sheet->getStyle("F$rowNumber")->getAlignment()->setHorizontal(Alignment::HORIZONTAL_RIGHT);
            $sheet->getStyle("G$rowNumber")->getAlignment()->setHorizontal(Alignment::HORIZONTAL_RIGHT);
            $sheet->getStyle("H$rowNumber")->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER);

            $sheet->getRowDimension("$rowNumber")->setRowHeight(30);
            $rowNumber++;
        }
        $sheet->getStyle("A6:H$rowNumber")->applyFromArray($allBorderStyle);
        $sheet->getStyle("A6:H$rowNumber")->applyFromArray($wrapTextStyle);
        // ----- END BODY -----


        // ----- PRINTING AREA -----
        $spreadsheet->getActiveSheet()->getPageSetup()->setPrintArea("A1:H$rowNumber");
        // ----- END PRINTING AREA -----

        ob_end_clean();
        $writer = new Xlsx($spreadsheet);
        header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        header('Content-Disposition: attachment; filename="'. urlencode($fileName).'"');
        $writer->save('php://output');

    }

    public function downloadExcel() 
    {
        $monthID = $this->input->get("monthID");
        $dateFrom  = $this->input->get("dateFrom");
        $dateTo    = $this->input->get("dateTo");
        $monthData = $this->monthprocess->getMonthData($monthID);
        // if ($monthData) {
            $this->reportExcel($monthData, $dateFrom, $dateTo);
        // }

    }

}
?>