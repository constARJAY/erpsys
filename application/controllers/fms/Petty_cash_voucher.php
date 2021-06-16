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
use PhpOffice\PhpSpreadsheet\Worksheet;

class Petty_cash_voucher extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model("fms/PettyCashVoucher_model", "purchaseorder");
        $this->load->model("Operations_model", "operations");
        isAllowed(14);
    }

    public function index()
    {
        $data["title"] = "Petty Cash Voucher";

        $this->load->view("template/header",$data);
        $this->load->view("fms/petty_cash_voucher/index");
        $this->load->view("template/footer");
    }

    public function downloadExcel(){
        $pettyCashRequestID = $this->input->get("id");
        // $this->pettyCashRequestExcel($pettyCashRequestID);
        if ($pettyCashRequestID) {
            $pettyCashRequestData = $this->operations->getTableData('fms_petty_cash_request_tbl', '', "pettyCashRequestID = '$pettyCashRequestID' ", '', '', '');
            if ($pettyCashRequestData) {
                $this->pettyCashRequestExcel($pettyCashRequestData[0]);
                // print_r($pettyCashRequestData[0]);
            }
        }
    }

    public function pettyCashRequestExcel($data) {
        $pettyCashRequestID         = $data["pettyCashRequestID"];
        if($data){

            str_replace(" ","","Hello world!");
            $code        = getFormCode("PCV", $data["createdAt"], $data["pettyCashRequestID"]);
            $createdBy   = $data["createdBy"];
            $employeeData= $this->operations->getTableData('hris_employee_list_tbl AS helt
                                                            LEFT JOIN hris_department_tbl USING(departmentID)
                                                            LEFT JOIN hris_designation_tbl USING(designationID)', 
                                                            `employeeID, CONCAT(employeeFirstname, ' ', employeeLastname) AS fullname,
                                                            departmentName AS department, designationName AS designation`, "employeeID = '$createdBy' ", '', '', '');
           
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
            $spreadsheet->getDefaultStyle()->getFont()->setSize(9);
            $spreadsheet->getDefaultStyle()->getAlignment()->setVertical(Alignment::VERTICAL_BOTTOM);
            $spreadsheet->getDefaultStyle()->getAlignment()->setHorizontal(Alignment::HORIZONTAL_LEFT);
            $spreadsheet->getActiveSheet()->getDefaultRowDimension()->setRowHeight(16);
    
            $sheet->getRowDimension('1')->setRowHeight(39);
            $sheet->getRowDimension('2')->setRowHeight(20);
            
            // ----- STYLES -----
            $pettyCashVoucherHeader = [
                "font" => [
                    "bold"  => true,
                    "color" => array("rgb" => "000000"),
                    "size"  => 14
                ],
                "alignment" => [
                    "vertical"   => Alignment::VERTICAL_CENTER,
                    "horizontal" => Alignment::HORIZONTAL_CENTER
                ],
                'borders' => [
                    'allBorders' => [
                        'borderStyle' => Border::BORDER_MEDIUM,
                        'color' => ['argb' => 'FF000000'],
                    ],
                ],
                
            ];
            $pettyCashVoucherCode = [
                "font" => [
                    "bold"  => true,
                    "color" => array("rgb" => "FF0000"),
                    "size"  => 12
                ],
                "alignment" => [
                    "vertical"   => Alignment::VERTICAL_CENTER,
                    "horizontal" => Alignment::HORIZONTAL_CENTER
                ],
                'borders' => [
                    'allBorders' => [
                        'borderStyle' => Border::BORDER_MEDIUM,
                        'color' => ['argb' => 'FF000000'],
                    ],
                ],
            ];
    
            $rowStyle = [
                'borders' => [
                    'allBorders' => [
                        'borderStyle' => Border::BORDER_MEDIUM,
                        'color' => ['argb' => 'FF000000'],
                    ],
                ],
            ];
    
            $boldTextStyle = [
                "font" => [
                    "bold"  => true,
                    "color" => array("rgb" => "000000"),
                    "size"  => 10
                ],
                // "alignment" => [
                //     "vertical"   => Alignment::VERTICAL_CENTER,
                //     // "horizontal" => Alignment::HORIZONTAL_CENTER
                // ],
            ];
    
            $normalTextStyle = [
                "font" => [
                    "bold"  => false,
                    "color" => array("rgb" => "000000"),
                    "size"  => 10
                ],
                "alignment" => [
                    "vertical"   => Alignment::VERTICAL_CENTER,
                    // "horizontal" => Alignment::HORIZONTAL_CENTER
                ],
            ];
    
            $rightTextStyle = [
                "font" => [
                    "bold"  => false,
                    "color" => array("rgb" => "000000"),
                    "size"  => 10
                ],
                "alignment" => [
                    "vertical"   => Alignment::VERTICAL_CENTER,
                    "horizontal" => Alignment::HORIZONTAL_RIGHT
                ],
            ];
    
            $centerTextStyle = [
                "font" => [
                    "bold"  => false,
                    "color" => array("rgb" => "000000"),
                    "size"  => 10
                ],
                "alignment" => [
                    "vertical"   => Alignment::VERTICAL_CENTER,
                    "horizontal" => Alignment::HORIZONTAL_CENTER
                ],
            ];
    
            $spreadsheet
            ->getActiveSheet()
            ->getStyle('A1:C1')
            ->getFill()
            ->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID)
            ->getStartColor()
            ->setARGB('000000');
            
            $drawing = new Drawing();
            $drawing->setDescription('Header Logo');
            $drawing->setPath("assets/images/BC-WHITE.png");
            $drawing->setCoordinates('A1');
            $drawing->getShadow()->setVisible(true);
            $drawing->setWidthAndHeight(350, 39);
            $drawing->setResizeProportional(true);
            $drawing->setWorksheet($spreadsheet->getActiveSheet());
    
            // ----- TITLE -----
            $sheet->mergeCells('D1:H1');
            $sheet->setCellValue('D1',"PETTY CASH VOUCHER");
            $sheet->getStyle('D1:H1')->applyFromArray($pettyCashVoucherHeader);
    
            $sheet->mergeCells('I1:K1');
            $sheet->setCellValue('I1',$code);
            $sheet->getStyle('I1:K1')->applyFromArray($pettyCashVoucherCode);
    
            $sheet->mergeCells('A2:H2');
            $sheet->setCellValue('A2',"Requestor: ".$employeeData[0]["employeeFirstname"]." ".$employeeData[0]["employeeLastname"]);
            $sheet->getStyle('A2:H2')->applyFromArray($boldTextStyle);
            $sheet->getStyle('A2:H2')->applyFromArray($rowStyle);
    
            $updatedAt = strtotime($data["createdAt"]);
            $sheet->mergeCells('I2:K2');
            $sheet->setCellValue('I2',"Date: ".date('F d, Y', $updatedAt));
            $sheet->getStyle('I2:K2')->applyFromArray($boldTextStyle);
            $sheet->getStyle('I2:K2')->applyFromArray($rowStyle);
    
            $sheet->mergeCells('A3:K3');
            $sheet->setCellValue('A3',"Position and Department: ".$employeeData[0]["designationName"]." ".$employeeData[0]["departmentName"]);
            $sheet->getStyle('A3:K3')->applyFromArray($boldTextStyle);
            $sheet->getStyle('A3:K3')->applyFromArray($rowStyle);
    
            $sheet->mergeCells('A4:H4');
            $sheet->setCellValue('A4',"Description");
            $sheet->getStyle('A4:H4')->applyFromArray($pettyCashVoucherHeader);
            $sheet->getStyle('A4:H4')->applyFromArray($boldTextStyle);
    
            $sheet->mergeCells('I4:K4');
            $sheet->setCellValue('I4',"Amount");
            $sheet->getStyle('I4:K4')->applyFromArray($pettyCashVoucherHeader);
            $sheet->getStyle('I4:K4')->applyFromArray($boldTextStyle);
    
            // AND FOR THE BODY AND DESCRIPTION
            $rowNumber  = 5;


            $pettyCashRequestDetails = $this->operations->getTableData('fms_petty_cash_request_details_tbl', '',
                                                                        "pettyCashRequestID = '$pettyCashRequestID' ", '', '', '');                                                  
            $limit      = count($pettyCashRequestDetails);
            $totalAmountRequested = 0;
            for ($i = 0; $i < $limit; $i++) { 
                $sheet->mergeCells("A$rowNumber:H$rowNumber");
                $sheet->setCellValue("A$rowNumber",$pettyCashRequestDetails[$i]["pettyCashRequestDetailsDescription"]);
                $sheet->getStyle("A$rowNumber:H$rowNumber")->applyFromArray($normalTextStyle);
    
                $sheet->mergeCells("I$rowNumber:K$rowNumber");
                $sheet->setCellValue("I$rowNumber", formatAmount($pettyCashRequestDetails[$i]["amount"] ?? 0.00, true));
                $sheet->getStyle("I$rowNumber:K$rowNumber")->applyFromArray($rightTextStyle);
                $totalAmountRequested += floatval($pettyCashRequestDetails[$i]["amount"]);
                $rowNumber++;
            }
            
            $sheet->mergeCells("A$rowNumber:H$rowNumber");
            $sheet->setCellValue("A$rowNumber","Total Amount Requested");
            $sheet->getStyle("A$rowNumber:H$rowNumber")->applyFromArray($rowStyle);
            $sheet->getStyle("A$rowNumber:H$rowNumber")->applyFromArray($rightTextStyle);
            $sheet->getStyle("A$rowNumber:E$rowNumber")->applyFromArray($boldTextStyle);
            
            $sheet->mergeCells("I$rowNumber:K$rowNumber");
            $sheet->setCellValue("I$rowNumber",formatAmount($totalAmountRequested ?? 0.00, true));
            $sheet->getStyle("I$rowNumber:K$rowNumber")->applyFromArray($rowStyle);
            $sheet->getStyle("I$rowNumber:K$rowNumber")->applyFromArray($rightTextStyle);
            $sheet->getStyle("A$rowNumber:E$rowNumber")->applyFromArray($boldTextStyle);
    
            $rowNumber++;
    
            $sheet->getRowDimension($rowNumber)->setRowHeight(15);
    
            $sheet->mergeCells("A$rowNumber:E$rowNumber");
            $sheet->setCellValue("A$rowNumber","Requested By");
            $sheet->getStyle("A$rowNumber:E$rowNumber")->applyFromArray($boldTextStyle);
            $sheet->getStyle("A$rowNumber:K$rowNumber")->applyFromArray($centerTextStyle);
    
            $sheet->mergeCells("G$rowNumber:K$rowNumber");
            $sheet->setCellValue("G$rowNumber","Approve By");
            $sheet->getStyle("G$rowNumber:K$rowNumber")->applyFromArray($boldTextStyle);
            $sheet->getStyle("G$rowNumber:K$rowNumber")->applyFromArray($centerTextStyle);
    
            
            
            $rowNumber++;
    
            $sheet->getRowDimension($rowNumber)->setRowHeight(20);
    
            $sheet->mergeCells("A$rowNumber:E$rowNumber");
            $sheet->setCellValue("A$rowNumber",$employeeData[0]["employeeFirstname"]." ".$employeeData[0]["employeeLastname"]);
            $sheet->getStyle("A$rowNumber:E$rowNumber")->applyFromArray($normalTextStyle);
            $sheet->getStyle("A$rowNumber:E$rowNumber")->applyFromArray($centerTextStyle);
    
            $sheet->mergeCells("G$rowNumber:K$rowNumber");
            $sheet->setCellValue("G$rowNumber"," ");
            $sheet->getStyle("G$rowNumber:K$rowNumber")->applyFromArray($normalTextStyle);
            $sheet->getStyle("G$rowNumber:K$rowNumber")->applyFromArray($centerTextStyle);
    
            $rowNumber++;
            
            $sheet->getRowDimension($rowNumber)->setRowHeight(1);
    
            $sheet->mergeCells("A$rowNumber:E$rowNumber");
            $sheet->getStyle("A$rowNumber:E$rowNumber")->applyFromArray($pettyCashVoucherHeader);
    
            $sheet->mergeCells("G$rowNumber:K$rowNumber");
            $sheet->getStyle("G$rowNumber:K$rowNumber")->applyFromArray($pettyCashVoucherHeader);
    
            $rowNumber++;
    
            $sheet->mergeCells("A$rowNumber:E$rowNumber");
            $sheet->setCellValue("A$rowNumber","Printed Name and Signature");
            $sheet->getStyle("A$rowNumber:E$rowNumber")->applyFromArray($normalTextStyle);
            $sheet->getStyle("A$rowNumber:E$rowNumber")->applyFromArray($centerTextStyle);
    
            $sheet->mergeCells("G$rowNumber:K$rowNumber");
            $sheet->setCellValue("G$rowNumber","Immediate Head");
            $sheet->getStyle("G$rowNumber:K$rowNumber")->applyFromArray($normalTextStyle);
            $sheet->getStyle("G$rowNumber:K$rowNumber")->applyFromArray($centerTextStyle);
    
            $fileName    = "$code.xlsx";
            $writer = new Xlsx($spreadsheet);
            header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            header('Content-Disposition: attachment; filename="'. urlencode($fileName).'"');
            $writer->save('php://output');
        }
    }

    


}
?>