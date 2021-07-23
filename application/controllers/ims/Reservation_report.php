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

class Reservation_report extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model("ims/ReservationReport_model", "reservationreport");
        isAllowed(136);
    }

    public function index()
    {
        $data["title"] = "Reservation Report";

        $this->load->view("template/header",$data);
        $this->load->view("ims/reservation_report/index");
        $this->load->view("template/footer");
    }

    public function getReservationData()
    {
        $projectID = $this->input->post("projectID");
        $dateFrom = $this->input->post("dateFrom");
        $dateTo   = $this->input->post("dateTo");
        echo json_encode($this->reservationreport->getReservationData($projectID, $dateFrom, $dateTo));
    }

    public function reservationReportExcel($data, $dateFrom, $dateTo) {
        $dateFromFn  = str_replace("-", "", $dateFrom);
        $dateToFn    = str_replace("-", "", $dateTo);
        $dateFn      = $dateFromFn."-".$dateToFn;
        $dateDisplay = date("F d, Y", strtotime($dateFrom))." - ".date("F d, Y", strtotime($dateTo));
        $projectName = count($data) > 0 ? $data[0]["projectName"] : "-";
        $fileName    = "ReservationReport_$dateFn.xlsx";
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
        $spreadsheet->getActiveSheet()->getHeaderFooter()->setOddHeader('&C&G');
        
        $footerLogo->setName('Footer logo');
        $footerLogo->setPath("assets/images/company-logo/excel-footer.png");
        $footerLogo->setHeight(90);
        $spreadsheet->getActiveSheet()->getHeaderFooter()->addImage($footerLogo, \PhpOffice\PhpSpreadsheet\Worksheet\HeaderFooter::IMAGE_FOOTER_CENTER);
        $spreadsheet->getActiveSheet()->getHeaderFooter()->setOddFooter('&C&G');
        // ----- END PAGE SETUP -----


        // ----- COLUMN WIDTH -----
        $sheet->getColumnDimension('A')->setWidth(14);
        $sheet->getColumnDimension('B')->setWidth(30);
        $sheet->getColumnDimension('C')->setWidth(12);
        $sheet->getColumnDimension('D')->setWidth(12);
        $sheet->getColumnDimension('E')->setWidth(18);
        $sheet->getColumnDimension('F')->setWidth(18);
        $sheet->getColumnDimension('G')->setWidth(22);
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
        $sheet->mergeCells('A1:G1');
        $sheet->mergeCells('A2:G2');
        $sheet->mergeCells('A3:C3');
        $sheet->mergeCells('D3:G3');
        $sheet->mergeCells('A4:C4');
        $sheet->mergeCells('D4:G4');
        $sheet->setCellValue('A1', "Reservation Report");
        $sheet->setCellValue('A2', "BlackCoders Group Inc."); // CHANGE BASED ON COMPANY SETUP
        $sheet->setCellValue('A3', "Project Name");
        $sheet->setCellValue('D3', $projectName);
        $sheet->setCellValue('A4', "Date");
        $sheet->setCellValue('D4', $dateDisplay);
        $sheet->getStyle('A1:G1')->applyFromArray($titleStyle);
        $sheet->getStyle('A2:G2')->applyFromArray($boldStyle);
        $sheet->getStyle('A1:G4')->applyFromArray($allBorderStyle);
        $sheet->getStyle('A2:G4')->applyFromArray($subtitleStyle);
        $sheet->getStyle('A3:C4')->applyFromArray($rightAlignStyle);
        $sheet->getStyle('A3:C4')->applyFromArray($boldStyle);
        $sheet->getStyle('D3:G4')->applyFromArray($leftAlignStyle);
        // ----- END HEADER -----


        // ----- BODY -----
        $sheet->setCellValue('A6', "Project Code");
        $sheet->setCellValue('B6', "Project Name");
        $sheet->setCellValue('C6', "Item Name");
        $sheet->setCellValue('D6', "UOM");
        $sheet->setCellValue('E6', "Received Quantity");
        $sheet->setCellValue('F6', "Date Reserved");
        $sheet->setCellValue('G6', "Material Usage Code");
        $sheet->getStyle("A6:G6")->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER);
        $sheet->getStyle('A6:G6')->applyFromArray($boldStyle);

        $rowNumber = 7;
        $limit = count($data) <= 10 ? 10 : count($data);
        for ($i=0; $i<$limit; $i++) {
            $projectCode = $projectName = $itemName = $itemUom = $reservedQuantity = $dateReserved = $materialUsageCode = "";
            if ($i < count($data)) {
                $projectCode = $data[$i]["projectCode"] ?? "";
                $projectName = $data[$i]["projectName"] ?? "";
                $itemName    = $data[$i]["itemName"] ?? "";
                $itemUom     = $data[$i]["itemUom"] ?? "";
                $reservedQuantity  = $data[$i]["reservedQuantity"] ?? "";
                $dateReserved      = $data[$i]["dateReserved"] ? date("F d, Y", strtotime($data[$i]["dateReserved"])) : "";
                $materialUsageCode = $data[$i]["materialUsageCode"] ?? "";
            }
            $sheet->setCellValue("A$rowNumber", $projectCode);
            $sheet->setCellValue("B$rowNumber", $projectName);
            $sheet->setCellValue("C$rowNumber", $itemName);
            $sheet->setCellValue("D$rowNumber", $itemUom);
            $sheet->setCellValue("E$rowNumber", $reservedQuantity);
            $sheet->setCellValue("F$rowNumber", $dateReserved);
            $sheet->setCellValue("G$rowNumber", $materialUsageCode);

            $sheet->getStyle("A$rowNumber")->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER);
            $sheet->getStyle("D$rowNumber")->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER);
            $sheet->getStyle("E$rowNumber")->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER);
            $sheet->getStyle("F$rowNumber")->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER);
            $sheet->getStyle("G$rowNumber")->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER);

            $sheet->getRowDimension("$rowNumber")->setRowHeight(30);
            $rowNumber++;
        }
        $sheet->getStyle("A6:G$rowNumber")->applyFromArray($allBorderStyle);
        $sheet->getStyle("A6:G$rowNumber")->applyFromArray($wrapTextStyle);
        // ----- END BODY -----


        // ----- PRINTING AREA -----
        $spreadsheet->getActiveSheet()->getPageSetup()->setPrintArea("A1:G$rowNumber");
        // ----- END PRINTING AREA -----


        $writer = new Xlsx($spreadsheet);
        header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        header('Content-Disposition: attachment; filename="'. urlencode($fileName).'"');
        $writer->save('php://output');
    }

    public function downloadExcel() 
    {
        $projectID = $this->input->get("projectID");
        $dateFrom  = $this->input->get("dateFrom");
        $dateTo    = $this->input->get("dateTo");
        $reservationData = $this->reservationreport->getReservationData($projectID, $dateFrom, $dateTo);
        // if ($reservationData) {
            $this->reservationReportExcel($reservationData, $dateFrom, $dateTo);
        // }

    }

}
