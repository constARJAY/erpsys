<?php

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


    function excelPageSetup($spreadsheet = null)
    {
        if ($spreadsheet)
        {
            // ----- DISABLE EDIT -----
            $spreadsheet->getActiveSheet()->getProtection()->setSheet(true);
            // ----- END DISABLE EDIT -----
    
    
            // ----- SET PASSWORD -----
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
            // ----- END SET PASSWORD -----
    
    
            // ----- PAGE SETUP -----
            $spreadsheet->getActiveSheet()
                ->getPageSetup()
                ->setOrientation(\PhpOffice\PhpSpreadsheet\Worksheet\PageSetup::ORIENTATION_LANDSCAPE);
            $spreadsheet->getActiveSheet()
                ->getPageSetup()
                ->setPaperSize(\PhpOffice\PhpSpreadsheet\Worksheet\PageSetup::PAPERSIZE_A4);
            // ----- END PAGE SETUP -----
    
    
            // $spreadsheet->getActiveSheet()->getPageMargins()->setTop(1.9541666666667);
            // $spreadsheet->getActiveSheet()->getPageMargins()->setRight(0.0104166666666667);
            // $spreadsheet->getActiveSheet()->getPageMargins()->setLeft(0.0104166666666667);
            // $spreadsheet->getActiveSheet()->getPageMargins()->setBottom(0.860416666666667);
            // $spreadsheet->getActiveSheet()->getPageMargins()->setHeader(0.0104166666666667);
            // $spreadsheet->getActiveSheet()->getPageMargins()->setFooter(0.0104166666666667);
    
            $spreadsheet->getActiveSheet()->getPageSetup()->setFitToWidth(1);
            $spreadsheet->getActiveSheet()->getPageSetup()->setFitToHeight(0);
    
            $spreadsheet->getActiveSheet()->getPageSetup()->setHorizontalCentered(true);
        }
        return $spreadsheet;
    }


    function excelStyles()
    {
        $fontBold = [
            "font" => [
                "bold" => true,
            ],
        ];

        $textCenter = [
            "alignment" => [
                "vertical"   => Alignment::VERTICAL_CENTER,
                "horizontal" => Alignment::HORIZONTAL_CENTER,
                "wrapText"   => true
            ]
        ];

        $textLeft = [
            "alignment" => [
                "vertical"   => Alignment::VERTICAL_CENTER,
                "horizontal" => Alignment::HORIZONTAL_LEFT,
                "wrapText"   => true
            ]
        ];

        $textRight = [
            "alignment" => [
                "vertical"   => Alignment::VERTICAL_CENTER,
                "horizontal" => Alignment::HORIZONTAL_RIGHT,
                "wrapText"   => true
            ]
        ];

        $borderAll = [
            'borders' => [
                'allBorders' => [
                    'borderStyle' => Border::BORDER_THIN,
                    'color' => ['argb' => 'FF000000'],
                ],
            ],
        ];


        $boldCenter = array_merge($fontBold, $textCenter);

        return [
            'fontBold'   => $fontBold,
            'textCenter' => $textCenter,
            'textLeft'   => $textLeft,
            'textRight'  => $textRight,
            'borderAll'  => $borderAll,

            'boldCenter'  => $boldCenter,
        ];
    }


    function excelPageHeader($spreadsheet = null, $column = 0, $company = null, $code = '')
    {
        if ($company && $company && !empty($company) && $code)
        {
            
        }
    }


    function getExcelColumn($column = 1, $row = 0)
    {
        $num = $column ? $column : 0;
        $letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

        $divider = floor($column / 26) ? (floor($column / 26)) - 1 : 0;
        if ($column >= 26) {
            $num = $column % 26 == 0 ? 0 : ($column % 26) - 1;
            return $row ? $letters[$divider].$letters[$num].$row : $letters[$divider].$letters[$num];
        }
        return $row ? $letters[$num].$row : $letters[$column];
    }


    function getTimekeepingReportExcel($data = null)
    {
        if ($data && !empty($data) && !empty($data['items']))
        {
            $spreadsheet = new Spreadsheet();
            $sheet       = $spreadsheet->getActiveSheet();
            excelPageSetup($spreadsheet);
            $styles = excelStyles();

            $display = $data['display'] ?? '-';
            $columnLength = count($data['columns']) + 5;

            $filename = (str_replace(" ", "", $display) ?? "timekeeping report"). ".xlsx";
            
            // ----- TITLE -----
            $sheet->mergeCells("A1:".getExcelColumn($columnLength, 1));
            $sheet->setCellValue("A1", "TIMEKEEPING REPORT");
            $sheet->mergeCells("A2:".getExcelColumn($columnLength, 2));
            $sheet->setCellValue("A2", $display);
            $sheet->getStyle("A1:".getExcelColumn($columnLength, 2))->applyFromArray($styles['boldCenter']);
            // ----- END TITLE -----


            // ----- TABLE -----
            $sheet->getColumnDimension('A')->setWidth(25);
            $sheet->getColumnDimension(getExcelColumn($columnLength-4))->setWidth(15);
            $sheet->getColumnDimension(getExcelColumn($columnLength-3))->setWidth(15);
            $sheet->getColumnDimension(getExcelColumn($columnLength-2))->setWidth(15);
            $sheet->getColumnDimension(getExcelColumn($columnLength-1))->setWidth(15);
            $sheet->getColumnDimension(getExcelColumn($columnLength))->setWidth(15);

            $row = $start = 4;
            $col = 0;
            $columnArray = $data['columns'] ?? [];

            for ($i=0; $i<=$columnLength; $i++) {
                $cell = getExcelColumn($i, $row);

                $text = '';
                if ($i == 0)                      $text = "Employee Name";
                else if ($i == ($columnLength-4)) $text = "Total Hours";
                else if ($i == ($columnLength-3)) $text = "Basic Hours";
                else if ($i == ($columnLength-2)) $text = "Overtime Hours";
                else if ($i == ($columnLength-1)) $text = "Rest Day";
                else if ($i == ($columnLength))   $text = "Number of Working Days";
                else {
                    $column = $columnArray[$col] ?? [];
                    if ($column && !empty($column)) {
                        $richText = new RichText();
                        $richText->createText('');
                        $cellText = $richText->createTextRun($column["month"]);
                        $richText->createText("\n".$column["number"]."\n".$column["day"]);
                        $text = $richText;
                        $col++;
                    }
                }
                $sheet->setCellValue($cell, $text);

                if ($i == 0) $sheet->getStyle($cell)->applyFromArray($styles["textLeft"]);
                else $sheet->getStyle($cell)->applyFromArray($styles["textCenter"]);
            }
            $sheet->getRowDimension("$row")->setRowHeight(45);
            $row++;

            $employeeArray = $data['employees'] ?? [];
            $itemArray     = $data['items'] ?? [];
            if ($employeeArray && !empty($employeeArray) && $itemArray && !empty($itemArray)) {
                foreach ($employeeArray as $emp) {
                    $col = 0;

                    $employeeID   = $emp["employeeID"] ?? "";
                    $fullname     = $emp["fullname"] ?? "";
                    $employeeCode = $emp["employeeCode"] ?? "";

                    $grandTotalHours    = 0;
                    $grandBasicHours    = 0;
                    $grandOvertimeHours = 0;
                    $grandRestDays      = 0;
                    $grandWorkingDays   = 0;

                    for ($i=0; $i<=$columnLength; $i++) {
                        $cell = getExcelColumn($i, $row);
        
                        $text = '';
                        if ($i == 0) {
                            $text = "Employee Name";
                            $richText = new RichText();
                            $richText->createText('');
                            $cellText = $richText->createTextRun($fullname);
                            $richText->createText("\n$employeeCode");
                            $text = $richText;
                        }                      
                        else if ($i == ($columnLength-4)) $text = decimalToHours($grandTotalHours);
                        else if ($i == ($columnLength-3)) $text = decimalToHours($grandBasicHours);
                        else if ($i == ($columnLength-2)) $text = decimalToHours($grandOvertimeHours);
                        else if ($i == ($columnLength-1)) $text = $grandRestDays;
                        else if ($i == ($columnLength))   $text = $grandWorkingDays;
                        else {
                            $scheduleDate = $columnArray[$col]['date'] ?? null;
                            if ($scheduleDate) {
                                foreach ($itemArray as $item) {
                                    $id            = $item['employeeID'] ?? '';
                                    $date          = $item['scheduleDate'] ?? '';
                                    $basicHours    = $item['basicHours'] ?? '0';
                                    $overtimeHours = $item['overtimeHours'] ?? '0';
                                    $totalHours    = $item['totalHours'] ?? '0';
                                    $status        = $item['timekeepingItemStatus'] ?? '';

                                    if ($scheduleDate == $date && $employeeID == $id) {
                                        if ($status == "NO_SCHEDULE" || $status == "REST_DAY") {
                                            $text = "RD";

                                            $grandRestDays += 1;
                                        } else {
                                            $text = decimalToHours($totalHours);

                                            $grandBasicHours    += (float) $basicHours;
                                            $grandOvertimeHours += (float) $overtimeHours;
                                            $grandTotalHours    += (float) $totalHours;
                                            $grandWorkingDays   += 1;
                                        }
                                        $col++;
                                        break;
                                    }
                                }
                            }
                        }
                        $sheet->setCellValue($cell, $text);

                        if ($i == 0) $sheet->getStyle($cell)->applyFromArray($styles["textLeft"]);
                        else $sheet->getStyle($cell)->applyFromArray($styles["textCenter"]);
                    }

                    $sheet->getStyle("A$start:".getExcelColumn($columnLength, $row))->applyFromArray($styles["borderAll"]);
                    $row++;
                }
            }
            // ----- END TABLE -----


            // ----- PRINTING AREA -----
            $spreadsheet->getActiveSheet()->getPageSetup()->setPrintArea("A1:".getExcelColumn($columnLength, $row));
            // ----- END PRINTING AREA -----

    
            $writer = new Xlsx($spreadsheet);
            header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            header('Content-Disposition: attachment; filename="'. urlencode($filename).'"');
            $writer->save('php://output');
        }
    }


    function getPayrollAdjustmentReportExcel($data = null)
    {
        if ($data && !empty($data))
        {
            $spreadsheet = new Spreadsheet();
            $sheet       = $spreadsheet->getActiveSheet();
            excelPageSetup($spreadsheet);
            $styles = excelStyles();

            $filename = "Payroll-Adjustment-Report.xlsx";
            
            // ----- TITLE -----
            $sheet->mergeCells("A1:E1");
            $sheet->setCellValue("A1", "PAYROLL ADJUSTMENT REPORT");
            $sheet->getStyle("A1")->applyFromArray($styles['boldCenter']);
            // ----- END TITLE -----


            // ----- TABLE -----
            $sheet->getColumnDimension('A')->setWidth(25);
            $sheet->getColumnDimension('B')->setWidth(40);
            $sheet->getColumnDimension('C')->setWidth(20);
            $sheet->getColumnDimension('D')->setWidth(20);
            $sheet->getColumnDimension('E')->setWidth(35);

            $sheet->setCellValue("A3", "Employee Name");
            $sheet->setCellValue("B3", "Reference");
            $sheet->setCellValue("C3", "Adjustment Type");
            $sheet->setCellValue("D3", "Amount");
            $sheet->setCellValue("E3", "Notes");
            $sheet->getStyle("A3:E3")->applyFromArray($styles['boldCenter']);

            $row = 4;
            foreach ($data as $item) {
                $employeeCode          = $item['employeeCode'];
                $fullname              = $item['fullname'];
                $payrollAdjustmentCode = $item['payrollAdjustmentCode'];
                $payrollPeriod         = $item['payrollPeriod'];
                $rowCount              = (float) $item['rowCount'];
                $adjustment            = $item['adjustment'];

                if ($rowCount <= 1) $sheet->getRowDimension("$row")->setRowHeight(30);

                $richText = new RichText();
                $richText->createText('');
                $cellText = $richText->createTextRun($fullname);
                $richText->createText("\n$employeeCode");
                $employeeName = $richText;

                $richText2 = new RichText();
                $richText2->createText('');
                $cellText2 = $richText2->createTextRun($payrollAdjustmentCode);
                $richText2->createText("\n$payrollPeriod");
                $reference = $richText2;

                $mergeCell = $row + ($rowCount - 1);
                $sheet->mergeCells("A$row:A$mergeCell");
                $sheet->mergeCells("B$row:B$mergeCell");

                $sheet->setCellValue("A$row", $employeeName);
                $sheet->setCellValue("B$row", $reference);

                $start = $row;
                foreach ($adjustment as $adj) {
                    $title   = $adj["title"];
                    $amount  = $adj["amount"];
                    $remarks = $adj["remarks"];

                    $sheet->setCellValue("C$start", $title);
                    $sheet->setCellValue("D$start", formatAmount($amount, true));
                    $sheet->setCellValue("E$start", $remarks);

                    $start++;
                }
                
                $row += $rowCount;
            }
            $sheet->getStyle("A4:E$row")->applyFromArray($styles['textLeft']);
            $sheet->getStyle("D4:D$row")->applyFromArray($styles['textRight']);
            $sheet->getStyle("A3:E".($row - 1))->applyFromArray($styles['borderAll']);
            // ----- END TABLE -----


            // ----- PRINTING AREA -----
            $spreadsheet->getActiveSheet()->getPageSetup()->setPrintArea("A1:E$row");
            // ----- END PRINTING AREA -----

    
            $writer = new Xlsx($spreadsheet);
            header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            header('Content-Disposition: attachment; filename="'. urlencode($filename).'"');
            $writer->save('php://output');
        }
    }