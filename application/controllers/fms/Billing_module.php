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

class Billing_module extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model("fms/BillingModule_model", "billingmodule");
        isAllowed(99);
    }

    public function index()
    {
        $data["title"] = "Billing Module";

        $this->load->view("template/header",$data);
        $this->load->view("fms/billing_module/index");
        $this->load->view("template/footer");
    }

    public function getBillingContent()
    {
        $billingID = $this->input->post("billingID");
        echo json_encode($this->billingmodule->getBillingContent($billingID));
    }

    public function saveBilling()
    {
        $sessionID = $this->session->has_userdata("adminSessionID") ? $this->session->userdata("adminSessionID") : 1;

        $billingID         = $this->input->post("billingID") ?? null;
        $billingStatus     = $this->input->post("billingStatus");
        $submittedAt       = $this->input->post("submittedAt") == "true" ? date("Y-m-d h:i:s") : null;
        $employeeID        = $this->input->post("employeeID");
        $billingReason     = $this->input->post("billingReason");
        $clientID          = $this->input->post("clientID");
        $clientName        = $this->input->post("clientName");
        $clientAddress     = $this->input->post("clientAddress");
        $billingComment    = $this->input->post("billingComment");
        $billingSubtotal   = $this->input->post("billingSubtotal");
        $billingVatAmount  = $this->input->post("billingVatAmount") ?? 0;
        $billingGrandTotal = $this->input->post("billingGrandTotal");
        $activities        = $this->input->post("activities");

        $data = [
            "billingStatus"     => $billingStatus,
            "submittedAt"       => $submittedAt,
            "employeeID"        => $employeeID,
            "billingReason"     => $billingReason,
            "clientID"          => $clientID,
            "clientName"        => $clientName,
            "clientAddress"     => $clientAddress,
            "billingComment"    => $billingComment,
            "billingSubtotal"   => $billingSubtotal,
            "billingVatAmount"  => $billingVatAmount,
            "billingGrandTotal" => $billingGrandTotal,
            "createdBy"         => $sessionID,
            "updatedBy"         => $sessionID,
        ];

        echo json_encode($this->billingmodule->saveBilling($billingID, $data, $activities));
    }

    public function billingExcel($data)
    {
        $id          = $data["billingID"];
        $createdAt   = $data["createdAt"];
        $code        = getFormCode("BIL", $createdAt, $id);
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

        $spreadsheet->getActiveSheet()->getPageMargins()->setTop(1.60416666666667);
        $spreadsheet->getActiveSheet()->getPageMargins()->setRight(0.0104166666666667);
        $spreadsheet->getActiveSheet()->getPageMargins()->setLeft(0.0104166666666667);
        $spreadsheet->getActiveSheet()->getPageMargins()->setBottom(0.760416666666667);
        $spreadsheet->getActiveSheet()->getPageMargins()->setHeader(0.0104166666666667);
        $spreadsheet->getActiveSheet()->getPageMargins()->setFooter(0.0104166666666667);

        $spreadsheet->getActiveSheet()->getPageSetup()->setFitToWidth(0);
        $spreadsheet->getActiveSheet()->getPageSetup()->setFitToHeight(1);

        $spreadsheet->getActiveSheet()->getPageSetup()->setHorizontalCentered(true);

        $headerLogo = new \PhpOffice\PhpSpreadsheet\Worksheet\HeaderFooterDrawing();
        $footerLogo = new \PhpOffice\PhpSpreadsheet\Worksheet\HeaderFooterDrawing();

        $headerLogo->setName('Header logo');
        $headerLogo->setPath("assets/images/company-logo/excel-header.png");
        $headerLogo->setHeight(180);
        $spreadsheet->getActiveSheet()->getHeaderFooter()->addImage($headerLogo, \PhpOffice\PhpSpreadsheet\Worksheet\HeaderFooter::IMAGE_HEADER_CENTER);
        $spreadsheet->getActiveSheet()->getHeaderFooter()->setOddHeader('&C&G');
        
        $footerLogo->setName('Footer logo');
        $footerLogo->setPath("assets/images/company-logo/excel-footer.png");
        $footerLogo->setHeight(80);
        $spreadsheet->getActiveSheet()->getHeaderFooter()->addImage($footerLogo, \PhpOffice\PhpSpreadsheet\Worksheet\HeaderFooter::IMAGE_FOOTER_CENTER);
        $spreadsheet->getActiveSheet()->getHeaderFooter()->setOddFooter('&C&G');
        // ----- END PAGE SETUP -----


        $space = 14;
        $sheet->getColumnDimension('A')->setWidth(0.66 * $space);
        $sheet->getColumnDimension('B')->setWidth(0.66 * $space);
        $sheet->getColumnDimension('C')->setWidth(0.66 * $space);
        $sheet->getColumnDimension('D')->setWidth(0.66 * $space);
        $sheet->getColumnDimension('E')->setWidth(0.66 * $space);
        $sheet->getColumnDimension('F')->setWidth(0.66 * $space);
        $sheet->getColumnDimension('G')->setWidth(0.66 * $space);
        $sheet->getColumnDimension('H')->setWidth(0.36 * $space);
        $sheet->getColumnDimension('I')->setWidth(1.08 * $space);
        $sheet->getColumnDimension('J')->setWidth(1.55 * $space);

        $sheet->getRowDimension('1')->setRowHeight($space);
        $sheet->getRowDimension('2')->setRowHeight(0.34 * $space + $space);
        $sheet->getRowDimension('3')->setRowHeight($space);
        $sheet->getRowDimension('4')->setRowHeight($space);
        $sheet->getRowDimension('5')->setRowHeight($space);
        $sheet->getRowDimension('6')->setRowHeight($space);
        $sheet->getRowDimension('7')->setRowHeight($space);

        // ----- STYLES -----
        $documentNoStyle = [
            "font" => [
                "bold"  => true,
                "color" => array("rgb" => "FF0000"),
                "size"  => 10
            ],
            "alignment" => [
                "vertical"   => Alignment::VERTICAL_BOTTOM
            ],
        ];

        $titleStyle = [
            "font" => [
                "name"  => "Segoe UI Black",
                "bold"  => true,
                "color" => array("rgb" => "000000"),
                "size"  => 16
            ],
            "alignment" => [
                "vertical"   => Alignment::VERTICAL_CENTER,
                "horizontal" => Alignment::HORIZONTAL_CENTER
            ],
        ];

        $labelFillStyle = [
            "font" => [
                "color" => array("rgb" => "FFFFFF"), 
                "bold" => true,
            ],
            "alignment" => [
                "vertical"   => Alignment::VERTICAL_BOTTOM,
                "horizontal" => Alignment::HORIZONTAL_LEFT
            ],
            'fill' => [
                'fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                'startColor' => [
                    'argb' => 'FFC00000',
                ],
            ],
        ];

        $labelFillTableStyle = [
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
                    'argb' => 'FFC00000',
                ],
            ],
            'borders' => [
                'allBorders' => [
                    'borderStyle' => Border::BORDER_THIN,
                    'color' => ['argb' => 'FF000000'],
                ],
            ],
        ];

        $labelBold = [
            "font" => [
                "bold" => true,
            ],
            "alignment" => [
                "horizontal" => Alignment::HORIZONTAL_LEFT
            ]
        ];

        $wrapTextCenter = [
            "alignment" => [
                "vertical"   => Alignment::VERTICAL_CENTER,
                "horizontal" => Alignment::HORIZONTAL_CENTER,
                "wrapText"   => true
            ]
        ];

        $wrapTextLeft = [
            "alignment" => [
                "vertical"   => Alignment::VERTICAL_CENTER,
                "horizontal" => Alignment::HORIZONTAL_LEFT,
                "wrapText"   => true
            ]
        ];

        $allBorderStyle = [
            'borders' => [
                'allBorders' => [
                    'borderStyle' => Border::BORDER_THIN,
                    'color' => ['argb' => 'FF000000'],
                ],
            ],
        ];

        $amountFigureStyle = [
            "alignment" => [
                "vertical"   => Alignment::VERTICAL_CENTER,
                "horizontal" => Alignment::HORIZONTAL_RIGHT,
                "wrapText"   => true
            ],
        ];

        $totalDueStyle = [
            "font" => [
                "bold" => true,
                "underline" => 2,
            ],
            'borders' => [
                'top' => [
                    'borderStyle' => Border::BORDER_THIN,
                    'color' => ['argb' => 'FF000000'],
                ],
                'bottom' => [
                    'borderStyle' => Border::BORDER_THICK,
                    'color' => ['argb' => 'FF000000'],
                ],
            ],
        ];

        $borderBottomStyle = [
            'borders' => [
                'bottom' => [
                    'borderStyle' => Border::BORDER_THIN,
                    'color' => ['argb' => 'FF000000'],
                ],
            ],
        ];

        // ------ STYLE ABOVE IS CURRENTLY IN USED

    
        

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
        $sheet->mergeCells('A2:J2');
        $sheet->setCellValue('A2', "BILLING STATEMENT");
        $sheet->getStyle('A2')->applyFromArray($titleStyle);
        // ----- END TITLE -----


        // ----- HEADER -----
        $sheet->mergeCells('H4:I4');
        $sheet->setCellValue('H4', "Billing Statement No.: ");
        $sheet->mergeCells('H5:I5');
        $sheet->setCellValue('H5', "Date: ");

        $sheet->setCellValue('J4', getFormCode("BIL", $data["createdAt"], $id));
        $sheet->getStyle('J4')->applyFromArray($documentNoStyle);
        $sheet->setCellValue('J5', date("F d, Y", strtotime($data["createdAt"])));

        $sheet->mergeCells('A7:E7');
        $sheet->setCellValue('A7', "BILL TO: ");
        $sheet->getStyle('A7')->applyFromArray($labelFillStyle);
        $sheet->mergeCells('A8:E8');
        $sheet->setCellValue('A8', $data["clientName"]);
        $sheet->getStyle('A8')->applyFromArray($labelBold);
        $sheet->mergeCells('A9:E10');
        $sheet->setCellValue('A9', $data["clientAddress"]);
        $sheet->getStyle('A9')->applyFromArray($wrapTextCenter);
        $sheet->getStyle('A7:E10')->applyFromArray($allBorderStyle);
        // ----- END HEADER -----


        // ----- BODY -----
        $sheet->mergeCells('A13:H13');
        $sheet->setCellValue('A13', "DESCRIPTION");
        $sheet->setCellValue('I13', "UNIT");
        $sheet->setCellValue('J13', "AMOUNT");
        $sheet->getStyle('A13:J13')->applyFromArray($labelFillTableStyle);

        $rowNumber = 14;
        $activities = $data["activities"];
        $limit = count($activities);
        for ($i=0; $i<$limit; $i++) { 
            $activity = $quantity = $totalAmount = "";
            if ($i < count($activities)) {
                $activity = $activities[$i]["activity"] ?? "";
                $quantity = $activities[$i]["quantity"] ? formatAmount($activities[$i]["quantity"]) : "";
                $totalAmount = $activities[$i]["totalAmount"] ? formatAmount($activities[$i]["totalAmount"], true) : "";
            }

            $sheet->mergeCells("A$rowNumber:H$rowNumber");
            $sheet->setCellValue("A$rowNumber", "$activity");
            $sheet->setCellValue("I$rowNumber", "$quantity");
            $sheet->setCellValue("J$rowNumber", "$totalAmount");

            $sheet->getStyle("A$rowNumber")->applyFromArray($wrapTextLeft);
            $sheet->getStyle("I$rowNumber")->applyFromArray($wrapTextCenter);
            $sheet->getStyle("J$rowNumber")->applyFromArray($amountFigureStyle);
            $sheet->getStyle("A14:J$rowNumber")->applyFromArray($allBorderStyle);

            $sheet->getRowDimension("$rowNumber")->setRowHeight($space * 3);
            $rowNumber++;
        }
        // ----- END BODY -----

        // ----- FOOTER -----
        $sheet->setCellValue("I$rowNumber", "Subtotal");
        $sheet->setCellValue("J$rowNumber", formatAmount($data["billingSubtotal"], true));
        $sheet->getStyle("J$rowNumber")->applyFromArray($amountFigureStyle);
        $rowNumber++;
        $sheet->setCellValue("I$rowNumber", "12% VAT");
        $sheet->setCellValue("J$rowNumber", formatAmount($data["billingVatAmount"], true));
        $sheet->getStyle("J$rowNumber")->applyFromArray($amountFigureStyle);
        $rowNumber+=2;
        $sheet->setCellValue("I$rowNumber", "TOTAL Due");
        $sheet->getStyle("I$rowNumber")->applyFromArray($labelBold);
        $sheet->setCellValue("J$rowNumber", formatAmount($data["billingGrandTotal"], true));
        $sheet->getStyle("J$rowNumber")->applyFromArray($amountFigureStyle);
        $sheet->getStyle("I$rowNumber:J$rowNumber")->applyFromArray($totalDueStyle);
        
        $sheet->mergeCells("A$rowNumber:F$rowNumber");
        $sheet->setCellValue("A$rowNumber", "COMMENTS: ");
        $sheet->getStyle("A$rowNumber")->applyFromArray($labelFillTableStyle);
        $rowNumber++;
        $sheet->getRowDimension($rowNumber)->setRowHeight($space * 9);
        $sheet->mergeCells("A$rowNumber:F$rowNumber");
        $sheet->setCellValue("A$rowNumber", $data["billingReason"]);
        $sheet->getStyle("A$rowNumber:F$rowNumber")->applyFromArray($wrapTextLeft);
        $sheet->getStyle("A$rowNumber:F$rowNumber")->applyFromArray($allBorderStyle);
        $rowNumber+=2;
        
        $titleName = $data["preparedBy"];
        $position  = $data["designationName"];

        $richText = new RichText();
        $richText->createText('');
        $cellText = $richText->createTextRun($titleName);
        $cellText->getFont()->setBold(true);
        $richText->createText("\n$position");

        $sheet->mergeCells("A$rowNumber:E$rowNumber");
        $sheet->setCellValue("A$rowNumber", "Prepared By: ");
        $sheet->getStyle("A$rowNumber")->applyFromArray($labelBold);
        $rowNumber+=2;
        $sheet->getRowDimension($rowNumber)->setRowHeight($space * 2);
        $sheet->mergeCells("A$rowNumber:E$rowNumber");
        $sheet->getStyle("A$rowNumber:E$rowNumber")->applyFromArray($borderBottomStyle);
        $rowNumber++;
        $sheet->mergeCells("A$rowNumber:E$rowNumber");
        $sheet->setCellValue("A$rowNumber", $richText);
        $sheet->getStyle("A$rowNumber")->applyFromArray($wrapTextCenter);
        $sheet->getRowDimension($rowNumber)->setRowHeight($space * 2);
        $rowNumber+=2;
        $sheet->mergeCells("H$rowNumber:J$rowNumber");
        $sheet->setCellValue("H$rowNumber", "Received By: ");
        $sheet->getStyle("H$rowNumber")->applyFromArray($labelBold);
        $rowNumber+=2;
        $sheet->getRowDimension($rowNumber)->setRowHeight($space * 2);
        $sheet->mergeCells("H$rowNumber:J$rowNumber");
        $sheet->getStyle("H$rowNumber:J$rowNumber")->applyFromArray($borderBottomStyle);
        $rowNumber++;
        $sheet->mergeCells("H$rowNumber:J$rowNumber");
        $sheet->setCellValue("H$rowNumber", "Signature Over Printed Name/Date");
        $sheet->getStyle("H$rowNumber")->applyFromArray($wrapTextCenter);
        $rowNumber++;

        // ----- END FOOTER -----


        // ----- PRINTING AREA -----
        $spreadsheet->getActiveSheet()->getPageSetup()->setPrintArea("A1:J$rowNumber");
        // ----- END PRINTING AREA -----

        $writer = new Xlsx($spreadsheet);
        header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        header('Content-Disposition: attachment; filename="'. urlencode($fileName).'"');
        $writer->save('php://output');
    }

    public function downloadExcel()
    {
        $billingID = $this->input->get("id");
        if ($billingID) {
            $billingData = $this->billingmodule->getBillingContent($billingID);
            if ($billingData) {
                $this->billingExcel($billingData);
            }
        }
    }

}