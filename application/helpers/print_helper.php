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

    function stringToDecimal($strAmount = "0.00") {
        if ($strAmount && !strpos($strAmount, ",")) {
            $arrAmount = explode(".", $strAmount);
            if ($arrAmount && !empty($arrAmount) && count($arrAmount) > 1) {
                $centavos = $arrAmount[1];
                if ($centavos == "00") {
                    return $strAmount." ";
                }
            }
        }
        return $strAmount;
    }

    function purchaseOrderExcel($data = [])
    {
        if ($data && count($data) > 0)
        {
            $filename        = $data["filename"] ?? "download.xlsx";
            $hCode           = $data["code"] ?? "-";
            $hTitle          = $data["title"] ?? "-";
            $hCompanyName    = $data["header"]["companyName"] ?? "";
            $hAddress        = $data["header"]["address"] ?? "";
            $hContactDetails = $data["header"]["contactDetails"] ?? "";
            $hContactPerson  = $data["header"]["contactPerson"] ?? "";
            $hDate           = $data["header"]["date"] ?? "";
            $hRequestNo      = $data["header"]["requestNo"] ?? "";
            $hPaymentTerms   = $data["header"]["paymentTerms"] ?? "";
            $hDeliveryDate   = $data["header"]["deliveryDate"] ?? "";
            $fComments       = $data["footer"]["comments"] ?? "";
            $fWordAmount     = $data["footer"]["wordAmount"] ?? "";
            $fTotal          = $data["footer"]["costSummary"]["total"] ?? formatAmount(0, true);
            $fDiscount       = $data["footer"]["costSummary"]["discount"] ?? formatAmount(0);
            $fTotalAmount    = $data["footer"]["costSummary"]["totalAmount"] ?? formatAmount(0);
            $fVatableSales   = $data["footer"]["costSummary"]["vatSales"] ?? formatAmount(0);
            $fVat            = $data["footer"]["costSummary"]["vat"] ?? formatAmount(0);
            $fTotalVat       = $data["footer"]["costSummary"]["totalVat"] ?? formatAmount(0);
            $fLessEwt        = $data["footer"]["costSummary"]["lessEwt"] ?? formatAmount(0);
            $fGrandTotal     = $data["footer"]["costSummary"]["grandTotalAmount"] ?? formatAmount(0, true);

            $fTotal        = stringToDecimal($fTotal);
            $fDiscount     = stringToDecimal($fDiscount);
            $fTotalAmount  = stringToDecimal($fTotalAmount);
            $fVatableSales = stringToDecimal($fVatableSales);
            $fVat          = stringToDecimal($fVat);
            $fTotalVat     = stringToDecimal($fTotalVat);
            $fLessEwt      = stringToDecimal($fLessEwt);
            $fGrandTotal   = stringToDecimal($fGrandTotal);
            

            $spreadsheet = new Spreadsheet();
            $sheet       = $spreadsheet->getActiveSheet();

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


            // ----- COLUMN AND WIDTH SIZE -----
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
            // ----- END COLUMN AND WIDTH SIZE -----


            // ----- ***** STYLES ***** -----
            $boldStyle = [
                "font" => [
                    "bold" => true,
                ],
            ];

            $labelBoldStyle = [
                "font" => [
                    "bold" => true,
                ],
                "alignment" => [
                    "vertical"   => Alignment::VERTICAL_CENTER,
                    "horizontal" => Alignment::HORIZONTAL_LEFT
                ]
            ];

            $bottomBorderStyle = [
                'borders' => [
                    'bottom' => [
                        'borderStyle' => Border::BORDER_THIN,
                        'color' => ['argb' => 'FF000000'],
                    ],
                ],
            ];

            $wrapTextCenterStyle = [
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
            
            $titleCodeStyle = [
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

            $titleTextStyle = [
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

            $headerFillStyle = [
                "font" => [
                    "color" => array("rgb" => "FFFFFF"), 
                    "bold" => true,
                ],
                "alignment" => [
                    "vertical"   => Alignment::VERTICAL_BOTTOM,
                    "horizontal" => Alignment::HORIZONTAL_LEFT
                ],
                'fill' => [
                    'fillType'   => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                    'startColor' => [
                        'argb'   => 'FF161616',
                    ],
                ],
            ];

            $headerAddressStyle = [
                "alignment" => [
                    "vertical"   => Alignment::VERTICAL_CENTER,
                    "horizontal" => Alignment::HORIZONTAL_LEFT,
                    "wrapText"   => true
                ],
                "font" => [
                    "size"  => 8,
                ],
            ];

            $bodyColumnHeaderStyle = [
                "font" => [
                    "color" => array("rgb" => "FFFFFF"), 
                    "bold"  => true,
                ],
                "alignment" => [
                    "vertical"   => Alignment::VERTICAL_BOTTOM,
                    "horizontal" => Alignment::HORIZONTAL_CENTER
                ],
                'fill' => [
                    'fillType'   => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                    'startColor' => [
                        'argb'   => 'FF161616',
                    ],
                ],
            ];

            $footerAmountStyle = [
                "alignment" => [
                    "vertical"   => Alignment::VERTICAL_CENTER,
                    "horizontal" => Alignment::HORIZONTAL_RIGHT,
                    "wrapText"   => true
                ],
            ];

            $footerCommentStyle = [
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

            $footerAmountWordStyle = [
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

            $footerApproversStyle = [
                "font" => [
                    "size" => 8
                ],
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

            $footerAcknowledgedStyle = [
                "font" => [
                    "size" => 8
                ],
                "alignment" => [
                    "vertical"   => Alignment::VERTICAL_BOTTOM,
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
            // ----- ***** END STYLES ***** -----


            // ----- TITLE -----
            $sheet->mergeCells('B1:K1');
            $sheet->setCellValue('B1', $hCode);
            $sheet->getStyle('B1')->applyFromArray($titleCodeStyle);
            $sheet->mergeCells('B2:K2');
            $sheet->setCellValue('B2', $hTitle);
            $sheet->getStyle('B2')->applyFromArray($titleTextStyle);
            // ----- END TITLE -----


            // ----- HEADER -----
            $sheet->mergeCells('B3:C3');
            $sheet->setCellValue('B3', "Company Name: ");
            $sheet->mergeCells('D3:G3');
            $sheet->setCellValue('D3', $hCompanyName);
            $sheet->mergeCells('H3:I3');
            $sheet->setCellValue('H3', "Date: ");
            $sheet->mergeCells('J3:K3');
            $sheet->setCellValue('J3', $hDate);

            $sheet->mergeCells('B4:C4');
            $sheet->setCellValue('B4', "Address: ");
            $sheet->mergeCells('D4:G4');
            $sheet->setCellValue('D4', $hAddress);
            $sheet->mergeCells('H4:I4');
            $sheet->setCellValue('H4', "Reference No.: ");
            $sheet->mergeCells('J4:K4');
            $sheet->setCellValue('J4', $hRequestNo);
            $sheet->getRowDimension('4')->setRowHeight(34.31);

            $sheet->mergeCells('B5:C5');
            $sheet->setCellValue('B5', "Contact Details: ");
            $sheet->mergeCells('D5:G5');
            $sheet->setCellValue('D5', $hContactDetails);
            $sheet->mergeCells('H5:I5');
            $sheet->setCellValue('H5', "Payment Terms: ");
            $sheet->mergeCells('J5:K5');
            $sheet->setCellValue('J5', $hPaymentTerms);

            $sheet->mergeCells('B6:C6');
            $sheet->setCellValue('B6', "Contact Person: ");
            $sheet->mergeCells('D6:G6');
            $sheet->setCellValue('D6', $hContactPerson);
            $sheet->mergeCells('H6:I6');
            $sheet->setCellValue('H6', "Delivery Date: ");
            $sheet->mergeCells('J6:K6');
            $sheet->setCellValue('J6', $hDeliveryDate);

            $sheet->getStyle("B3:C6")->applyFromArray($headerFillStyle);
            $sheet->getStyle("H3:I6")->applyFromArray($headerFillStyle);
            $sheet->getStyle("B3:K6")->applyFromArray($allBorderStyle);
            $sheet->getStyle("D4")->applyFromArray($headerAddressStyle);
            // ----- END HEADER -----


            // ----- BODY -----
            
                // * COLUMN HEADER
                $sheet->setCellValue('B8', "Code");
                $sheet->mergeCells('C8:G8');
                $sheet->setCellValue('C8', "Item Description");
                $sheet->setCellValue('H8', "Qty");
                $sheet->setCellValue('I8', "Unit");
                $sheet->setCellValue('J8', "Unit Cost");
                $sheet->setCellValue('K8', "Total Amount");
                $sheet->getStyle("B8:K8")->applyFromArray($bodyColumnHeaderStyle);
                // * END COLUMN HEADER

                $row = 9;

                // * ITEMS 
                $items = $data["body"] ?? [];
                $limit = count($items) <= 10 ? 10 : count($items);

                if ($items && count($items) > 0)
                {
                    for ($i=0; $i<$limit; $i++)
                    {
                        $code = $description = $quantity = $unit = $unitCost = $totalAmount = "";
                        if ($i < count($items))
                        {
                            $code        = $items[$i]["code"] ?? "";
                            $description = $items[$i]["description"] ?? "";
                            $quantity    = $items[$i]["quantity"] ?? "";
                            $unit        = $items[$i]["unit"] ?? "";
                            $unitCost    = $items[$i]["unitCost"] ?? "";
                            $totalAmount = $items[$i]["totalAmount"] ?? "";
                        }
                        $sheet->setCellValue("B$row", $code);
                        $sheet->mergeCells("C$row:G$row");
                        $sheet->setCellValue("C$row", $description);
                        $sheet->setCellValue("H$row", $quantity);
                        $sheet->setCellValue("I$row", $unit);
                        $sheet->setCellValue("J$row", $unitCost);
                        $sheet->setCellValue("K$row", $totalAmount);

                        $sheet->getStyle("B$row")->applyFromArray($sideBorderStyle);
                        $sheet->getStyle("C$row")->applyFromArray($sideBorderStyle);
                        $sheet->getStyle("H$row")->applyFromArray($sideBorderStyle);
                        $sheet->getStyle("I$row")->applyFromArray($sideBorderStyle);
                        $sheet->getStyle("J$row")->applyFromArray($sideBorderStyle);
                        
                        $sheet->getStyle("H$row")->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER);
                        $sheet->getStyle("J$row")->getAlignment()->setHorizontal(Alignment::HORIZONTAL_RIGHT);
                        $sheet->getStyle("K$row")->getAlignment()->setHorizontal(Alignment::HORIZONTAL_RIGHT);
                        $sheet->getStyle("K$row")->getAlignment()->setHorizontal(Alignment::HORIZONTAL_RIGHT);
                        $sheet->getStyle("B$row:K$row")->getFont()->setSize(8);
                        
                        $sheet->getRowDimension("$row")->setRowHeight(17);
                        $row++;
                    }
                }
                $sheet->getStyle("B".($row-1).":K".($row-1))->applyFromArray($bottomBorderStyle);
                // * END ITEMS 

            // ----- END BODY -----


            // ----- FOOTER -----

                // * COMMENTS AND COST SUMMARY
                $sheet->mergeCells("B$row:I$row");
                $sheet->setCellValue("B$row", "COMMENTS/INSTRUCTION");
                $sheet->getStyle("B$row:I$row")->applyFromArray($headerFillStyle);
                $sheet->setCellValue("J$row", "Total");
                $sheet->getStyle("J$row")->applyFromArray($sideBorderStyle);
                $sheet->setCellValue("K$row", $fTotal);
                $sheet->getStyle("K$row")->applyFromArray($sideBorderStyle);
                $sheet->getStyle("K$row")->applyFromArray($footerAmountStyle);
                $sheet->getStyle("K$row")->applyFromArray($boldStyle);
                $sheet->getRowDimension("$row")->setRowHeight(15);
                $sheet->getStyle("J$row:J".($row+7))->applyFromArray($labelBoldStyle);
                $row++;

                $sheet->mergeCells("B$row:I".($row+3));
                $sheet->setCellValue("B$row", $fComments);
                $sheet->getStyle("B$row:I".($row+3))->applyFromArray($footerCommentStyle);
                $sheet->setCellValue("J$row", "Discount");
                $sheet->getStyle("J$row")->applyFromArray($sideBorderStyle);
                $sheet->setCellValue("K$row", $fDiscount);
                $sheet->getStyle("K$row")->applyFromArray($sideBorderStyle);
                $sheet->getStyle("K$row")->applyFromArray($footerAmountStyle);
                $sheet->getRowDimension("$row")->setRowHeight(15);
                $row++;

                $sheet->setCellValue("J$row", "Total Amount");
                $sheet->getStyle("J$row")->applyFromArray($sideBorderStyle);
                $sheet->setCellValue("K$row", $fTotalAmount);
                $sheet->getStyle("K$row")->applyFromArray($sideBorderStyle);
                $sheet->getStyle("K$row")->applyFromArray($footerAmountStyle);
                $sheet->getStyle("K$row")->applyFromArray($boldStyle);
                $sheet->getRowDimension("$row")->setRowHeight(15);
                $row++;

                $sheet->setCellValue("J$row", "Vatable Sales");
                $sheet->getStyle("J$row")->applyFromArray($sideBorderStyle);
                $sheet->setCellValue("K$row", $fVatableSales);
                $sheet->getStyle("K$row")->applyFromArray($sideBorderStyle);
                $sheet->getStyle("K$row")->applyFromArray($footerAmountStyle);
                $sheet->getRowDimension("$row")->setRowHeight(15);
                $row++;

                $sheet->setCellValue("J$row", "Vat 12%");
                $sheet->getStyle("J$row")->applyFromArray($sideBorderStyle);
                $sheet->setCellValue("K$row", $fVat);
                $sheet->getStyle("K$row")->applyFromArray($sideBorderStyle);
                $sheet->getStyle("K$row")->applyFromArray($footerAmountStyle);
                $sheet->getRowDimension("$row")->setRowHeight(15);
                $row++;

                $sheet->mergeCells("B$row:I$row");
                $sheet->setCellValue("B$row", "AMOUNT IN WORDS");
                $sheet->getStyle("B$row:I$row")->applyFromArray($headerFillStyle);
                $sheet->setCellValue("J$row", "Total");
                $sheet->getStyle("J$row")->applyFromArray($sideBorderStyle);
                $sheet->setCellValue("K$row", $fTotalVat);
                $sheet->getStyle("K$row")->applyFromArray($sideBorderStyle);
                $sheet->getStyle("K$row")->applyFromArray($footerAmountStyle);
                $sheet->getStyle("K$row")->applyFromArray($boldStyle);
                $sheet->getRowDimension("$row")->setRowHeight(15);
                $row++;

                $sheet->mergeCells("B$row:I".($row+1));
                $sheet->setCellValue("B$row", $fWordAmount);
                $sheet->getStyle("B$row:I".($row+1))->applyFromArray($footerAmountWordStyle);
                $sheet->setCellValue("J$row", "Less EWT");
                $sheet->getStyle("J$row")->applyFromArray($sideBorderStyle);
                $sheet->setCellValue("K$row", $fLessEwt);
                $sheet->getStyle("K$row")->applyFromArray($sideBorderStyle);
                $sheet->getStyle("K$row")->applyFromArray($footerAmountStyle);
                $sheet->getRowDimension("$row")->setRowHeight(15);
                $row++;
                $sheet->setCellValue("J$row", "Grand Total");
                $sheet->getStyle("J$row")->applyFromArray($sideBorderStyle);
                $sheet->setCellValue("K$row", $fGrandTotal);
                $sheet->getStyle("K$row")->applyFromArray($sideBorderStyle);
                $sheet->getStyle("K$row")->applyFromArray($footerAmountStyle);
                $sheet->getStyle("K$row")->applyFromArray($boldStyle);
                $sheet->getStyle("J$row:K$row")->applyFromArray($bottomBorderStyle);
                $sheet->getRowDimension("$row")->setRowHeight(15);
                $row++;
                // * COMMENTS AND COST SUMMARY

                // * APPROVERS
                $approvers = $data["footer"]["approvers"] ?? [];
                $countApprover = count($approvers);
                if ($countApprover == 1)
                {
                    $columns = [["B", "K"]];
                }
                else if ($countApprover == 3)
                {
                    $columns = [
                        ["B", "E"],
                        ["F", "H"],
                        ["I", "K"],
                    ];
                }
                else 
                {
                    $columns = [
                        ["B", "F"],
                        ["G", "K"]
                    ];
                }

                foreach($approvers as $index => $approver)
                {
                    if ($countApprover > 3)
                    {
                        if ($index % 2 == 0)
                        {
                            if ($index != 0) $row++;
                            $cell     = $columns[0][0].$row.":".$columns[0][1].$row;
                            $baseCell = $columns[0][0].$row;
                            if (($index+1) == $countApprover)
                            {
                                $cell     = "B$row:K$row";
                                $baseCell = "B$row";
                            }
                        }
                        else 
                        {
                            $cell     = $columns[1][0].$row.":".$columns[1][1].$row;
                            $baseCell = $columns[1][0].$row;
                        }
                    }
                    else 
                    {
                        $cell     = $columns[$index][0].$row.":".$columns[$index][1].$row;
                        $baseCell = $columns[$index][0].$row;
                        if ($countApprover == 2 && $index == ($countApprover - 1)) $row++;
                    }
                    $sheet->mergeCells($cell);

                    $title       = $approver["title"] ?? "";
                    $designation = $approver["designation"] ?? "";

                    $richText = new RichText();
                    $richText->createText('');
                    $cellText = $richText->createTextRun($title);
                    $cellText->getFont()->setBold(true);
                    $richText->createText("\n$designation");

                    $sheet->setCellValue($baseCell, $richText);
                    $sheet->getStyle($cell)->applyFromArray($footerApproversStyle);
                    $sheet->getRowDimension($row)->setRowHeight(17*2);
                }
                // * END APPROVERS

                $sheet->mergeCells("B$row:E$row");
                $sheet->setCellValue("B$row", "Acknowledged by: ");
                $sheet->getStyle("B$row:E$row")->applyFromArray($allBorderStyle);
                $sheet->mergeCells("F$row:H$row");
                $sheet->setCellValue("F$row", "Supplier's Signature: ");
                $sheet->getStyle("F$row:H$row")->applyFromArray($allBorderStyle);
                $sheet->mergeCells("I$row:K$row");
                $sheet->setCellValue("I$row", "Date: ");
                $sheet->getStyle("I$row:K$row")->applyFromArray($allBorderStyle);
                $sheet->getRowDimension("$row")->setRowHeight(17*2);
                $sheet->getStyle("B$row:K$row")->applyFromArray($footerAcknowledgedStyle);

            // ----- END FOOTER -----

            
            // ----- PRINTING AREA -----
            $spreadsheet->getActiveSheet()->getPageSetup()->setPrintArea("B1:K$row");
            // ----- END PRINTING AREA -----


            $writer = new Xlsx($spreadsheet);
            header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            header('Content-Disposition: attachment; filename="'. urlencode($filename).'"');
            $writer->save('php://output');
        }
    }


    function costEstimateExcel($data = [])
    {
       if ($data && count($data) > 0)
        {
            $filename   = $data["filename"] ?? "costEstimate.xlsx";
            $code       = $data["code"] ?? "BOM-21-00001";
            $title      = $data["title"] ?? "";

            $projectCode         = $data["project"]["code"] ?? "";
            $projectName         = $data["project"]["name"] ?? "";
            $projectLocation     = $data["project"]["location"] ?? "";
            $projectOwner        = $data["project"]["owner"] ?? "";
            $projectSubject      = $data["project"]["subject"] ?? "";
            $projectCostEstimate = $data["project"]["costEstimate"] ?? "";
            $projectTimeline     = $data["project"]["timeline"] ?? "";

            $phases   = $data["body"]["phases"] ?? [];
            $assets   = $data["body"]["assets"] ?? [];
            $vehicles = $data["body"]["vehicles"] ?? [];
            $others   = $data["body"]["others"] ?? [];

            $spreadsheet = new Spreadsheet();
            $sheet       = $spreadsheet->getActiveSheet();

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

                $spreadsheet->getDefaultStyle()->getFont()->setName('Calibri');
                $spreadsheet->getDefaultStyle()->getFont()->setSize(11);
                $spreadsheet->getDefaultStyle()->getAlignment()->setVertical(Alignment::VERTICAL_BOTTOM);
                $spreadsheet->getDefaultStyle()->getAlignment()->setHorizontal(Alignment::HORIZONTAL_LEFT);
                $spreadsheet->getActiveSheet()->getDefaultRowDimension()->setRowHeight(15);
            // ----- END SET PASSWORD -----


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
                $headerLogo->setHeight(230);
                $spreadsheet->getActiveSheet()->getHeaderFooter()->addImage($headerLogo, \PhpOffice\PhpSpreadsheet\Worksheet\HeaderFooter::IMAGE_HEADER_CENTER);
                $spreadsheet->getActiveSheet()->getHeaderFooter()->setOddHeader('&C&G');
                
                $footerLogo->setName('Footer logo');
                $footerLogo->setPath("assets/images/company-logo/excel-footer.png");
                $footerLogo->setHeight(100);
                $spreadsheet->getActiveSheet()->getHeaderFooter()->addImage($footerLogo, \PhpOffice\PhpSpreadsheet\Worksheet\HeaderFooter::IMAGE_FOOTER_CENTER);
                $spreadsheet->getActiveSheet()->getHeaderFooter()->setOddFooter('&C&G');
            // ----- END PAGE SETUP -----


            // ----- COLUMN AND WIDTH SIZE -----
                $defaultWidth = 0.71;

                $sheet->getColumnDimension('A')->setWidth(47 + $defaultWidth);
                $sheet->getColumnDimension('B')->setWidth(10.14 + $defaultWidth);
                $sheet->getColumnDimension('C')->setWidth(31 + $defaultWidth);
                $sheet->getColumnDimension('D')->setWidth(11 + $defaultWidth);
                $sheet->getColumnDimension('E')->setWidth(11 + $defaultWidth);
                $sheet->getColumnDimension('F')->setWidth(9.14 + $defaultWidth);
                $sheet->getColumnDimension('G')->setWidth(5.43 + $defaultWidth);
                $sheet->getColumnDimension('H')->setWidth(4.43 + $defaultWidth);
                $sheet->getColumnDimension('I')->setWidth(6.43 + $defaultWidth);
                $sheet->getColumnDimension('J')->setWidth(12.14 + $defaultWidth);

                $sheet->getRowDimension('1')->setRowHeight(21);
            // ----- END COLUMN AND WIDTH SIZE -----


            // ----- STYLES -----
                $titleCodeStyle = [
                    "font" => [
                        "bold"  => true,
                        "color" => array("rgb" => "fe0000"),
                        "size"  => 12
                    ],
                    "alignment" => [
                        "vertical"   => Alignment::VERTICAL_CENTER,
                        "horizontal" => Alignment::HORIZONTAL_RIGHT
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

                $defaultTextSizeStyle = [
                    "font" => [
                        "size"  => 9
                    ],
                ];

                $boldStyle = [
                    "font" => [
                        "bold" => true,
                    ],
                ];

                $wrapTextCenterStyle = [
                    "alignment" => [
                        "vertical"   => Alignment::VERTICAL_CENTER,
                        "horizontal" => Alignment::HORIZONTAL_CENTER,
                        "wrapText"   => true
                    ]
                ];

                $wrapTextLeftStyle = [
                    "alignment" => [
                        "vertical"   => Alignment::VERTICAL_CENTER,
                        "horizontal" => Alignment::HORIZONTAL_LEFT,
                        "wrapText"   => true
                    ]
                ];

                $wrapTextRightStyle = [
                    "alignment" => [
                        "vertical"   => Alignment::VERTICAL_CENTER,
                        "horizontal" => Alignment::HORIZONTAL_RIGHT,
                        "wrapText"   => true
                    ]
                ];

                $backgroundGreenStyle = [
                    "font" => [
                        "color" => array("rgb" => "000000"), 
                        "bold" => true,
                    ],
                    'fill' => [
                        'fillType'   => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                        'startColor' => [
                            'argb'   => 'FF00B050',
                        ],
                    ],
                ];

                $backgroundLightGreenStyle = [
                    "font" => [
                        "color" => array("rgb" => "000000"), 
                        "bold" => true,
                    ],
                    'fill' => [
                        'fillType'   => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                        'startColor' => [
                            'argb'   => 'FF92D050',
                        ],
                    ],
                ];

                $backgroundOrangeStyle = [
                    "font" => [
                        "color" => array("rgb" => "000000"), 
                        "bold" => true,
                    ],
                    "alignment" => [
                        "vertical"   => Alignment::VERTICAL_CENTER,
                        "horizontal" => Alignment::HORIZONTAL_CENTER,
                        "wrapText"   => true
                    ],
                    'fill' => [
                        'fillType'   => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                        'startColor' => [
                            'argb'   => 'FFFFC000',
                        ],
                    ],
                ];

                $backgroundYellowStyle = [
                    "font" => [
                        "color" => array("rgb" => "000000"), 
                        "bold" => true,
                    ],
                    "alignment" => [
                        "vertical"   => Alignment::VERTICAL_CENTER,
                        "horizontal" => Alignment::HORIZONTAL_CENTER,
                        "wrapText"   => true
                    ],
                    'fill' => [
                        'fillType'   => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                        'startColor' => [
                            'argb'   => 'FFFFFF00',
                        ],
                    ],
                ];
            // ----- END STYLES -----


            // ----- TITLE -----
                $sheet->mergeCells('A1:J1');
                $sheet->setCellValue('A1', $code);
                $sheet->getStyle('A1')->applyFromArray($titleCodeStyle);
            // ----- END TITLE -----


            // ----- PROJECT -----
                $sheet->setCellValue('A2', 'PROJECT CODE: ');
                $sheet->setCellValue('A3', 'PROJECT NAME: ');
                $sheet->setCellValue('A4', 'LOCATION: ');
                $sheet->setCellValue('A5', 'OWNER: ');
                $sheet->setCellValue('A6', 'SUBJECT: ');
                $sheet->setCellValue('A7', 'CE#: ');
                $sheet->getStyle('A2:A7')->applyFromArray($boldStyle);

                $sheet->mergeCells('B2:J2');
                $sheet->mergeCells('B3:J3');
                $sheet->mergeCells('B4:J4');
                $sheet->mergeCells('B5:J5');
                $sheet->mergeCells('B6:J6');
                $sheet->mergeCells('B7:J7');
                $sheet->mergeCells('B8:J8');

                $sheet->setCellValue('B2', $projectCode);
                $sheet->setCellValue('B3', $projectName);
                $sheet->setCellValue('B4', $projectLocation);
                $sheet->setCellValue('B5', $projectOwner);
                $sheet->setCellValue('B6', $projectSubject);
                $sheet->setCellValue('B7', $projectCostEstimate);

                $sheet->mergeCells('A8:J8');
            // ----- END PROJECT -----


            // ----- ITEMS -----
                $startRow = 9;
                $row = 9;

                // ----- COLUMN HEADER -----
                    $sheet->getRowDimension($row)->setRowHeight(15);
                    $sheet->setCellValue("A$row", 'SCOPE OF WORKS/ITEMS');
                    $sheet->setCellValue("B$row", 'ITEM CODE');
                    $sheet->setCellValue("C$row", 'DESCRIPTION');
                    $sheet->setCellValue("D$row", 'BRAND');
                    $sheet->setCellValue("E$row", 'SIZE');
                    $sheet->setCellValue("F$row", 'QUANTITY');
                    $sheet->setCellValue("G$row", 'UNIT');
                    $sheet->setCellValue("H$row", 'MH');
                    $sheet->setCellValue("I$row", 'OT MH');
                    $sheet->setCellValue("J$row", 'PERSONNEL');

                    $sheet->getStyle("A$row:J$row")->applyFromArray($backgroundOrangeStyle);
                    $sheet->getStyle("A$row")->applyFromArray($wrapTextLeftStyle);
                    $sheet->getStyle("C$row")->applyFromArray($wrapTextLeftStyle);
                    $sheet->getStyle("A$row:J$row")->applyFromArray($defaultTextSizeStyle);
                    $row++;
                // ----- END COLUMN HEADER -----


                // ----- PHASE ----
                    if ($phases && count($phases) > 0)
                    {
                        foreach($phases as $phase)
                        {
                            $phaseName       = $phase["name"] ?? "";
                            $phaseTotalCost  = $phase["totalCost"] ?? "";
                            $phaseTotalLabor = $phase["totalLabor"] ?? "";
                            $phaseMilestones = $phase["milestones"] ?? [];

                            $sheet->mergeCells("A$row:J$row");
                            
                            $sheet->setCellValue("A$row", $phaseName);

                            $sheet->getStyle("A$row:J$row")->applyFromArray($backgroundLightGreenStyle);
                            $row++;

                            // ----- MILESTONE ----
                            if ($phaseMilestones && count($phaseMilestones) > 0)
                            {
                                foreach($phaseMilestones as $milestone)
                                {
                                    $milestoneName       = $milestone["name"] ?? "";
                                    $milestoneTotalCost  = $milestone["totalCost"] ?? "";
                                    $milestoneTotalLabor = $milestone["totalLabor"] ?? "";
                                    $milestoneItems      = $milestone["items"] ?? [];
                                    $milestoneLabors     = $milestone["labors"] ?? [];

                                    $sheet->mergeCells("A$row:J$row");
                                    
                                    $sheet->setCellValue("A$row", $milestoneName);
    
                                    $sheet->getStyle("A$row:J$row")->applyFromArray($backgroundGreenStyle);
                                    $row++;

                                    // ----- ITEMS -----
                                    if (($milestoneItems && count($milestoneItems) > 0) || ($milestoneLabors && count($milestoneLabors) > 0))
                                    {
                                        foreach($milestoneItems as $index => $item)
                                        {
                                            $itemName        = $item["name"] ?? "";
                                            $itemCode        = $item["code"] ?? "";
                                            $itemDescription = $item["description"] ?? "";
                                            $itemBrand       = $item["brand"] ?? "";
                                            $itemSize        = $item["size"] ?? "";
                                            $itemQuantity    = $item["quantity"] ?? "";
                                            $itemUnit        = $item["unit"] ?? "";

                                            $sheet->setCellValue("A$row", $itemName);
                                            $sheet->setCellValue("B$row", $itemCode);
                                            $sheet->setCellValue("C$row", $itemDescription);
                                            $sheet->setCellValue("D$row", $itemBrand);
                                            $sheet->setCellValue("E$row", $itemSize);
                                            $sheet->setCellValue("F$row", $itemQuantity);
                                            $sheet->setCellValue("G$row", $itemUnit);

                                            $labors = $milestoneLabors[$index] ?? null;
                                            if ($labors)
                                            {
                                                $laborManHours         = $labors["manHours"] ?? "";
                                                $laborOvertimeManHours = $labors["overtimeManHours"] ?? "";
                                                $laborPersonnel        = $labors["personnel"] ?? "";

                                                $sheet->setCellValue("H$row", $laborManHours);
                                                $sheet->setCellValue("I$row", $laborOvertimeManHours);
                                                $sheet->setCellValue("J$row", $laborPersonnel);
                                            }
                
                                            $sheet->getStyle("D$row:J$row")->applyFromArray($wrapTextCenterStyle);
                                            $row++;
                                        }
                                    }
                                    // ----- END ITEMS -----
                                }
                            }
                            // ----- END MILESTONE ----


                        }
                    }
                // ----- END PHASE ----


                // ----- ASSETS -----
                    if ($assets && count($assets) > 0)
                    {
                        $sheet->mergeCells("A$row:M$row");
                        $row++;
                        $sheet->mergeCells("B$row:C$row");
                        $sheet->mergeCells("D$row:E$row");
                        $sheet->mergeCells("F$row:G$row");
                        $sheet->mergeCells("H$row:I$row");

                        $sheet->setCellValue("A$row", 'ASSET CODE');
                        $sheet->setCellValue("B$row", 'NAME');
                        $sheet->setCellValue("D$row", 'CLASSIFICATION');
                        $sheet->setCellValue("F$row", 'UNIT');
                        $sheet->setCellValue("H$row", 'QUANTITY');
                        $sheet->setCellValue("J$row", 'MAN HOURS');

                        $sheet->getStyle("A$row:J$row")->applyFromArray($backgroundOrangeStyle);
                        $sheet->getStyle("A$row:J$row")->applyFromArray($wrapTextLeftStyle);
                        $sheet->getStyle("A$row:J$row")->applyFromArray($defaultTextSizeStyle);
                        $sheet->getStyle("F$row:J$row")->applyFromArray($wrapTextCenterStyle);
                        $row++;

                        $sheet->mergeCells("A$row:J$row");
                    
                        $sheet->setCellValue("A$row", "ASSETS");

                        $sheet->getStyle("A$row")->applyFromArray($backgroundLightGreenStyle);
                        $row++;
                        
                        foreach($assets as $asset)
                        {
                            $assetCode           = $asset["code"] ?? "";
                            $assetName           = $asset["name"] ?? "";
                            $assetClassification = $asset["classification"] ?? "";
                            $assetUnit           = $asset["unit"] ?? "";
                            $assetQuantity       = $asset["quantity"] ?? "";
                            $assetManHours       = $asset["manHours"] ?? "";

                            $sheet->mergeCells("B$row:C$row");
                            $sheet->mergeCells("D$row:E$row");
                            $sheet->mergeCells("F$row:G$row");
                            $sheet->mergeCells("H$row:I$row");

                            $sheet->setCellValue("A$row", $assetCode);
                            $sheet->setCellValue("B$row", $assetName);
                            $sheet->setCellValue("D$row", $assetClassification);
                            $sheet->setCellValue("F$row", $assetUnit);
                            $sheet->setCellValue("H$row", $assetQuantity);
                            $sheet->setCellValue("J$row", $assetManHours);

                            $sheet->getStyle("G$row:M$row")->applyFromArray($wrapTextCenterStyle);
                            $row++;
                        }
                    }
                // ----- END ASSETS -----


                // ----- VEHICLES -----
                    if ($vehicles && count($vehicles) > 0)
                    {
                        $sheet->mergeCells("A$row:J$row");
                        $row++;
                        $sheet->mergeCells("B$row:C$row");
                        $sheet->mergeCells("D$row:E$row");
                        $sheet->mergeCells("F$row:H$row");
                        $sheet->mergeCells("I$row:J$row");

                        $sheet->setCellValue("A$row", 'VEHICLE CODE');
                        $sheet->setCellValue("B$row", 'NAME');
                        $sheet->setCellValue("D$row", 'AVERAGE FUEL TYPE');
                        $sheet->setCellValue("F$row", 'DISTANCE');
                        $sheet->setCellValue("I$row", 'MAN HOURS');

                        $sheet->getStyle("A$row:J$row")->applyFromArray($backgroundOrangeStyle);
                        $sheet->getStyle("A$row:J$row")->applyFromArray($defaultTextSizeStyle);
                        $sheet->getStyle("A$row:J$row")->applyFromArray($wrapTextLeftStyle);
                        $sheet->getStyle("D$row:J$row")->applyFromArray($wrapTextCenterStyle);
                        $row++;

                        $sheet->mergeCells("A$row:J$row");
                    
                        $sheet->setCellValue("A$row", "VEHICLE");

                        $sheet->getStyle("A$row")->applyFromArray($backgroundLightGreenStyle);
                        $row++;

                        foreach($vehicles as $vehicle)
                        {
                            $vehicleCode     = $vehicle["code"] ?? "";
                            $vehicleName     = $vehicle["name"] ?? "";
                            $vehicleFuel     = $vehicle["averageFuelType"] ?? "";
                            $vehicleDistance = $vehicle["distance"] ?? "";
                            $vehicleManHours = $vehicle["manHours"] ?? "";

                            $sheet->mergeCells("B$row:C$row");
                            $sheet->mergeCells("D$row:E$row");
                            $sheet->mergeCells("F$row:H$row");
                            $sheet->mergeCells("I$row:J$row");

                            $sheet->setCellValue("A$row", $vehicleCode);
                            $sheet->setCellValue("B$row", $vehicleName);
                            $sheet->setCellValue("D$row", $vehicleFuel);
                            $sheet->setCellValue("F$row", $vehicleDistance);
                            $sheet->setCellValue("I$row", $vehicleManHours);

                            $sheet->getStyle("D$row:J$row")->applyFromArray($wrapTextCenterStyle);

                            $row++;
                        }
                    }
                // ----- END VEHICLES -----


                // ----- OTHERS -----
                    if ($others && count($others) > 0)
                    {
                        $sheet->mergeCells("A$row:J$row");
                        $row++;
                        $sheet->mergeCells("B$row:J$row");

                        $sheet->setCellValue("A$row", 'CATEGORY');
                        $sheet->setCellValue("B$row", 'DESCRIPTION');

                        $sheet->getStyle("A$row:J$row")->applyFromArray($backgroundOrangeStyle);
                        $sheet->getStyle("A$row:J$row")->applyFromArray($defaultTextSizeStyle);
                        $sheet->getStyle("A$row:J$row")->applyFromArray($wrapTextLeftStyle);
                        $row++;

                        $sheet->mergeCells("A$row:J$row");
                    
                        $sheet->setCellValue("A$row", "OTHERS");

                        $sheet->getStyle("A$row")->applyFromArray($backgroundLightGreenStyle);
                        $row++;

                        foreach($others as $other)
                        {
                            $otherCategory    = $other["category"] ?? "";
                            $otherDescription = $other["description"] ?? "";

                            $sheet->mergeCells("B$row:J$row");

                            $sheet->setCellValue("A$row", $otherCategory);
                            $sheet->setCellValue("B$row", $otherDescription);

                            $row++;
                        }
                    }
                // ----- END OTHERS -----

                $sheet->getStyle("A1:J".($row - 1))->applyFromArray($allBorderStyle);
                $sheet->getStyle("A$startRow:J".($row - 1))->applyFromArray($defaultTextSizeStyle);

            // ----- END ITEMS -----


            // ----- PRINTING AREA -----
            $spreadsheet->getActiveSheet()->getPageSetup()->setPrintArea("A1:J$row");
            // ----- END PRINTING AREA -----


            $writer = new Xlsx($spreadsheet);
            header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            header('Content-Disposition: attachment; filename="'. urlencode($filename).'"');
            $writer->save('php://output');

        }
    }


    function billMaterialExcel($data = [])
    {
        if ($data && count($data) > 0)
        {
            $filename   = $data["filename"] ?? "billMaterials.xlsx";
            $code       = $data["code"] ?? "BOM-21-00001";
            $title      = $data["title"] ?? "";

            $projectCode         = $data["project"]["code"] ?? "";
            $projectName         = $data["project"]["name"] ?? "";
            $projectLocation     = $data["project"]["location"] ?? "";
            $projectOwner        = $data["project"]["owner"] ?? "";
            $projectSubject      = $data["project"]["subject"] ?? "";
            $projectCostEstimate = $data["project"]["costEstimate"] ?? "";
            $projectTimeline     = $data["project"]["timeline"] ?? "";

            $phases   = $data["body"]["phases"] ?? [];
            $assets   = $data["body"]["assets"] ?? [];
            $vehicles = $data["body"]["vehicles"] ?? [];
            $others   = $data["body"]["others"] ?? [];

            $costItems               = $data["footer"]["costSummary"]["items"] ?? [];
            $costItemTotalCost       = $data["footer"]["costSummary"]["itemTotalCost"] ?? "";
            $costOverhead            = $data["footer"]["costSummary"]["overhead"] ?? [];
            $costContingency         = $data["footer"]["costSummary"]["contigency"] ?? "";
            $costSubtotal            = $data["footer"]["costSummary"]["subtotal"] ?? "";
            $costMarkUp              = $data["footer"]["costSummary"]["markUp"] ?? "";
            $costContractPriceVATEX  = $data["footer"]["costSummary"]["contractPriceVATEX"] ?? "";
            $costVat                 = $data["footer"]["costSummary"]["vat"] ?? "";
            $costContractPriceVATINC = $data["footer"]["costSummary"]["contractPriceVATINC"] ?? "";

            $costItemTotalCost       = stringToDecimal($costItemTotalCost);
            $costContingency         = stringToDecimal($costContingency);
            $costSubtotal            = stringToDecimal($costSubtotal);
            $costMarkUp              = stringToDecimal($costMarkUp);
            $costContractPriceVATEX  = stringToDecimal($costContractPriceVATEX);
            $costVat                 = stringToDecimal($costVat);
            $costContractPriceVATINC = stringToDecimal($costContractPriceVATINC);

            $spreadsheet = new Spreadsheet();
            $sheet       = $spreadsheet->getActiveSheet();

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

                $spreadsheet->getDefaultStyle()->getFont()->setName('Calibri');
                $spreadsheet->getDefaultStyle()->getFont()->setSize(11);
                $spreadsheet->getDefaultStyle()->getAlignment()->setVertical(Alignment::VERTICAL_BOTTOM);
                $spreadsheet->getDefaultStyle()->getAlignment()->setHorizontal(Alignment::HORIZONTAL_LEFT);
                $spreadsheet->getActiveSheet()->getDefaultRowDimension()->setRowHeight(15);
            // ----- END SET PASSWORD -----


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
                $headerLogo->setHeight(300);
                $spreadsheet->getActiveSheet()->getHeaderFooter()->addImage($headerLogo, \PhpOffice\PhpSpreadsheet\Worksheet\HeaderFooter::IMAGE_HEADER_CENTER);
                $spreadsheet->getActiveSheet()->getHeaderFooter()->setOddHeader('&C&G');
                
                $footerLogo->setName('Footer logo');
                $footerLogo->setPath("assets/images/company-logo/excel-footer.png");
                $footerLogo->setHeight(150);
                $spreadsheet->getActiveSheet()->getHeaderFooter()->addImage($footerLogo, \PhpOffice\PhpSpreadsheet\Worksheet\HeaderFooter::IMAGE_FOOTER_CENTER);
                $spreadsheet->getActiveSheet()->getHeaderFooter()->setOddFooter('&C&G');
            // ----- END PAGE SETUP -----


            // ----- COLUMN AND WIDTH SIZE -----
                $defaultWidth = 0.71;

                $sheet->getColumnDimension('A')->setWidth(47 + $defaultWidth);
                $sheet->getColumnDimension('B')->setWidth(10.14 + $defaultWidth);
                $sheet->getColumnDimension('C')->setWidth(31 + $defaultWidth);
                $sheet->getColumnDimension('D')->setWidth(11 + $defaultWidth);
                $sheet->getColumnDimension('E')->setWidth(11 + $defaultWidth);
                $sheet->getColumnDimension('F')->setWidth(9.14 + $defaultWidth);
                $sheet->getColumnDimension('G')->setWidth(5.43 + $defaultWidth);
                $sheet->getColumnDimension('H')->setWidth(21.29 + $defaultWidth);
                $sheet->getColumnDimension('I')->setWidth(13.57 + $defaultWidth);
                $sheet->getColumnDimension('J')->setWidth(4.43 + $defaultWidth);
                $sheet->getColumnDimension('K')->setWidth(6.43 + $defaultWidth);
                $sheet->getColumnDimension('L')->setWidth(12.14 + $defaultWidth);
                $sheet->getColumnDimension('M')->setWidth(11.57 + $defaultWidth);

                $sheet->getRowDimension('1')->setRowHeight(21);
            // ----- END COLUMN AND WIDTH SIZE -----


            // ----- STYLES -----
                $titleCodeStyle = [
                    "font" => [
                        "bold"  => true,
                        "color" => array("rgb" => "fe0000"),
                        "size"  => 12
                    ],
                    "alignment" => [
                        "vertical"   => Alignment::VERTICAL_CENTER,
                        "horizontal" => Alignment::HORIZONTAL_RIGHT
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
    
                $topBorderStyle = [
                    'borders' => [
                        'top' => [
                            'borderStyle' => Border::BORDER_THIN,
                            'color' => ['argb' => 'FF000000'],
                        ],
                    ],
                ];

                $defaultTextSizeStyle = [
                    "font" => [
                        "size"  => 9
                    ],
                ];

                $boldStyle = [
                    "font" => [
                        "bold" => true,
                    ],
                ];

                $wrapTextCenterStyle = [
                    "alignment" => [
                        "vertical"   => Alignment::VERTICAL_CENTER,
                        "horizontal" => Alignment::HORIZONTAL_CENTER,
                        "wrapText"   => true
                    ]
                ];

                $wrapTextLeftStyle = [
                    "alignment" => [
                        "vertical"   => Alignment::VERTICAL_CENTER,
                        "horizontal" => Alignment::HORIZONTAL_LEFT,
                        "wrapText"   => true
                    ]
                ];

                $wrapTextRightStyle = [
                    "alignment" => [
                        "vertical"   => Alignment::VERTICAL_CENTER,
                        "horizontal" => Alignment::HORIZONTAL_RIGHT,
                        "wrapText"   => true
                    ]
                ];

                $backgroundGreenStyle = [
                    "font" => [
                        "color" => array("rgb" => "000000"), 
                        "bold" => true,
                    ],
                    'fill' => [
                        'fillType'   => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                        'startColor' => [
                            'argb'   => 'FF00B050',
                        ],
                    ],
                ];

                $backgroundLightGreenStyle = [
                    "font" => [
                        "color" => array("rgb" => "000000"), 
                        "bold" => true,
                    ],
                    'fill' => [
                        'fillType'   => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                        'startColor' => [
                            'argb'   => 'FF92D050',
                        ],
                    ],
                ];

                $backgroundOrangeStyle = [
                    "font" => [
                        "color" => array("rgb" => "000000"), 
                        "bold" => true,
                    ],
                    "alignment" => [
                        "vertical"   => Alignment::VERTICAL_CENTER,
                        "horizontal" => Alignment::HORIZONTAL_CENTER,
                        "wrapText"   => true
                    ],
                    'fill' => [
                        'fillType'   => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                        'startColor' => [
                            'argb'   => 'FFFFC000',
                        ],
                    ],
                ];

                $backgroundYellowStyle = [
                    "font" => [
                        "color" => array("rgb" => "000000"), 
                        "bold" => true,
                    ],
                    "alignment" => [
                        "vertical"   => Alignment::VERTICAL_CENTER,
                        "horizontal" => Alignment::HORIZONTAL_CENTER,
                        "wrapText"   => true
                    ],
                    'fill' => [
                        'fillType'   => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                        'startColor' => [
                            'argb'   => 'FFFFFF00',
                        ],
                    ],
                ];
            // ----- END STYLES -----


            // ----- TITLE -----
                $sheet->mergeCells('A1:M1');
                $sheet->setCellValue('A1', $code);
                $sheet->getStyle('A1')->applyFromArray($titleCodeStyle);
            // ----- END TITLE -----


            // ----- PROJECT -----
                $sheet->setCellValue('A2', 'PROJECT CODE: ');
                $sheet->setCellValue('A3', 'PROJECT NAME: ');
                $sheet->setCellValue('A4', 'LOCATION: ');
                $sheet->setCellValue('A5', 'OWNER: ');
                $sheet->setCellValue('A6', 'SUBJECT: ');
                $sheet->setCellValue('A7', 'BOM#: ');
                $sheet->getStyle('A2:A7')->applyFromArray($boldStyle);

                $sheet->mergeCells('B2:M2');
                $sheet->mergeCells('B3:M3');
                $sheet->mergeCells('B4:M4');
                $sheet->mergeCells('B5:M5');
                $sheet->mergeCells('B6:M6');
                $sheet->mergeCells('B7:M7');
                $sheet->mergeCells('B8:M8');

                $sheet->setCellValue('B2', $projectCode);
                $sheet->setCellValue('B3', $projectName);
                $sheet->setCellValue('B4', $projectLocation);
                $sheet->setCellValue('B5', $projectOwner);
                $sheet->setCellValue('B6', $projectSubject);
                $sheet->setCellValue('B7', $projectCostEstimate);

                $sheet->mergeCells('A8:M8');
            // ----- END PROJECT -----


            // ----- ITEMS -----
                $startRow = 9;
                $row = 9;

                // ----- COLUMN HEADER -----
                    $sheet->getRowDimension($row)->setRowHeight(15);
                    $sheet->setCellValue("A$row", 'SCOPE OF WORKS/ITEMS');
                    $sheet->setCellValue("B$row", 'ITEM CODE');
                    $sheet->setCellValue("C$row", 'DESCRIPTION');
                    $sheet->setCellValue("D$row", 'BRAND');
                    $sheet->setCellValue("E$row", 'SIZE');
                    $sheet->setCellValue("F$row", 'QUANTITY');
                    $sheet->setCellValue("G$row", 'UNIT');
                    $sheet->setCellValue("H$row", 'UNIT PRICE');
                    $sheet->setCellValue("I$row", 'TOTAL COST');
                    $sheet->setCellValue("J$row", 'MH');
                    $sheet->setCellValue("K$row", 'OT MH');
                    $sheet->setCellValue("L$row", 'PERSONNEL');
                    $sheet->setCellValue("M$row", 'LABOR');

                    $sheet->getStyle("A$row:G$row")->applyFromArray($backgroundOrangeStyle);
                    $sheet->getStyle("J$row:L$row")->applyFromArray($backgroundOrangeStyle);
                    $sheet->getStyle("H$row:I$row")->applyFromArray($backgroundYellowStyle);
                    $sheet->getStyle("M$row")->applyFromArray($backgroundYellowStyle);
                    $sheet->getStyle("A$row")->applyFromArray($wrapTextLeftStyle);
                    $sheet->getStyle("C$row")->applyFromArray($wrapTextLeftStyle);
                    $sheet->getStyle("A$row:M$row")->applyFromArray($defaultTextSizeStyle);
                    $row++;
                // ----- END COLUMN HEADER -----


                // ----- PHASE ----
                    if ($phases && count($phases) > 0)
                    {
                        foreach($phases as $phase)
                        {
                            $phaseName       = $phase["name"] ?? "";
                            $phaseTotalCost  = $phase["totalCost"] ?? "";
                            $phaseTotalLabor = $phase["totalLabor"] ?? "";
                            $phaseMilestones = $phase["milestones"] ?? [];

                            $sheet->mergeCells("A$row:H$row");
                            $sheet->mergeCells("J$row:M$row");
                            
                            $sheet->setCellValue("A$row", $phaseName);
                            $sheet->setCellValue("I$row", $phaseTotalCost);
                            $sheet->setCellValue("J$row", $phaseTotalLabor);

                            $sheet->getStyle("A$row:M$row")->applyFromArray($backgroundLightGreenStyle);
                            $sheet->getStyle("I$row:M$row")->applyFromArray($wrapTextRightStyle);
                            $row++;

                            // ----- MILESTONE ----
                            if ($phaseMilestones && count($phaseMilestones) > 0)
                            {
                                foreach($phaseMilestones as $milestone)
                                {
                                    $milestoneName       = $milestone["name"] ?? "";
                                    $milestoneTotalCost  = $milestone["totalCost"] ?? "";
                                    $milestoneTotalLabor = $milestone["totalLabor"] ?? "";
                                    $milestoneItems      = $milestone["items"] ?? [];
                                    $milestoneLabors     = $milestone["labors"] ?? [];

                                    $sheet->mergeCells("A$row:H$row");
                                    $sheet->mergeCells("J$row:M$row");
                                    
                                    $sheet->setCellValue("A$row", $milestoneName);
                                    $sheet->setCellValue("I$row", $milestoneTotalCost);
                                    $sheet->setCellValue("J$row", $milestoneTotalLabor);
    
                                    $sheet->getStyle("A$row:M$row")->applyFromArray($backgroundGreenStyle);
                                    $sheet->getStyle("I$row:M$row")->applyFromArray($wrapTextRightStyle);
                                    $row++;

                                    // ----- ITEMS -----
                                    if (($milestoneItems && count($milestoneItems) > 0) || ($milestoneLabors && count($milestoneLabors) > 0))
                                    {
                                        $startRow = $row;
                                        $countItems  = count($milestoneItems);
                                        $countLabors = count($milestoneLabors);

                                        if ($countItems > $countLabors) {
                                            foreach($milestoneItems as $index => $item)
                                            {
                                                $itemName        = $item["name"] ?? "";
                                                $itemCode        = $item["code"] ?? "";
                                                $itemDescription = $item["description"] ?? "";
                                                $itemBrand       = $item["brand"] ?? "";
                                                $itemSize        = $item["size"] ?? "";
                                                $itemQuantity    = $item["quantity"] ?? "";
                                                $itemUnit        = $item["unit"] ?? "";
                                                $itemUnitPrice   = $item["unitPrice"] ?? "";
                                                $itemTotalCost   = $item["totalCost"] ?? "";
    
                                                $sheet->setCellValue("A$row", $itemName);
                                                $sheet->setCellValue("B$row", $itemCode);
                                                $sheet->setCellValue("C$row", $itemDescription);
                                                $sheet->setCellValue("D$row", $itemBrand);
                                                $sheet->setCellValue("E$row", $itemSize);
                                                $sheet->setCellValue("F$row", $itemQuantity);
                                                $sheet->setCellValue("G$row", $itemUnit);
                                                $sheet->setCellValue("H$row", $itemUnitPrice);
                                                $sheet->setCellValue("I$row", $itemTotalCost);
    
                                                $labors = $milestoneLabors[$index] ?? null;
                                                if ($labors)
                                                {
                                                    $laborManHours         = $labors["manHours"] ?? "";
                                                    $laborOvertimeManHours = $labors["overtimeManHours"] ?? "";
                                                    $laborPersonnel        = $labors["personnel"] ?? "";
                                                    $laborTotalCost        = $labors["totalLabor"] ?? "";
    
                                                    $sheet->setCellValue("J$row", $laborManHours);
                                                    $sheet->setCellValue("K$row", $laborOvertimeManHours);
                                                    $sheet->setCellValue("L$row", $laborPersonnel);
                                                    $sheet->setCellValue("M$row", $laborTotalCost);
                                                }
                    
                                                $sheet->getStyle("D$row:G$row")->applyFromArray($wrapTextCenterStyle);
                                                $sheet->getStyle("H$row:I$row")->applyFromArray($wrapTextRightStyle);
                                                $sheet->getStyle("J$row:L$row")->applyFromArray($wrapTextCenterStyle);
                                                $sheet->getStyle("M$row")->applyFromArray($wrapTextRightStyle);
    
                                                $row++;
                                            }
                                        } else {
                                            foreach($milestoneLabors as $index => $labor)
                                            {
                                                $laborManHours         = $labor["manHours"] ?? "";
                                                $laborOvertimeManHours = $labor["overtimeManHours"] ?? "";
                                                $laborPersonnel        = $labor["personnel"] ?? "";
                                                $laborTotalCost        = $labor["totalLabor"] ?? "";

                                                $sheet->setCellValue("J$row", $laborManHours);
                                                $sheet->setCellValue("K$row", $laborOvertimeManHours);
                                                $sheet->setCellValue("L$row", $laborPersonnel);
                                                $sheet->setCellValue("M$row", $laborTotalCost);
    
                                                $items = $milestoneItems[$index] ?? null;
                                                if ($items)
                                                {
                                                    $itemName        = $items["name"] ?? "";
                                                    $itemCode        = $items["code"] ?? "";
                                                    $itemDescription = $items["description"] ?? "";
                                                    $itemBrand       = $items["brand"] ?? "";
                                                    $itemSize        = $items["size"] ?? "";
                                                    $itemQuantity    = $items["quantity"] ?? "";
                                                    $itemUnit        = $items["unit"] ?? "";
                                                    $itemUnitPrice   = $items["unitPrice"] ?? "";
                                                    $itemTotalCost   = $items["totalCost"] ?? "";
        
                                                    $sheet->setCellValue("A$row", $itemName);
                                                    $sheet->setCellValue("B$row", $itemCode);
                                                    $sheet->setCellValue("C$row", $itemDescription);
                                                    $sheet->setCellValue("D$row", $itemBrand);
                                                    $sheet->setCellValue("E$row", $itemSize);
                                                    $sheet->setCellValue("F$row", $itemQuantity);
                                                    $sheet->setCellValue("G$row", $itemUnit);
                                                    $sheet->setCellValue("H$row", $itemUnitPrice);
                                                    $sheet->setCellValue("I$row", $itemTotalCost);
                                                }
                    
                                                $sheet->getStyle("D$row:G$row")->applyFromArray($wrapTextCenterStyle);
                                                $sheet->getStyle("H$row:I$row")->applyFromArray($wrapTextRightStyle);
                                                $sheet->getStyle("J$row:L$row")->applyFromArray($wrapTextCenterStyle);
                                                $sheet->getStyle("M$row")->applyFromArray($wrapTextRightStyle);
    
                                                $row++;
                                            }
                                        }

                                    }
                                    // ----- END ITEMS -----
                                }
                            }
                            // ----- END MILESTONE ----


                        }
                    }
                // ----- END PHASE ----


                // ----- ASSETS -----
                    if ($assets && count($assets) > 0)
                    {
                        $sheet->mergeCells("A$row:M$row");
                        $row++;
                        $sheet->mergeCells("B$row:C$row");
                        $sheet->mergeCells("D$row:E$row");
                        $sheet->mergeCells("F$row:G$row");
                        $sheet->mergeCells("I$row:J$row");
                        $sheet->mergeCells("K$row:L$row");

                        $sheet->setCellValue("A$row", 'ASSET CODE');
                        $sheet->setCellValue("B$row", 'NAME');
                        $sheet->setCellValue("D$row", 'CLASSIFICATION');
                        $sheet->setCellValue("F$row", 'UNIT');
                        $sheet->setCellValue("H$row", 'QUANTITY');
                        $sheet->setCellValue("I$row", 'MAN HOURS');
                        $sheet->setCellValue("K$row", 'UNIT COST');
                        $sheet->setCellValue("M$row", 'TOTAL COST');

                        $sheet->getStyle("A$row:J$row")->applyFromArray($backgroundOrangeStyle);
                        $sheet->getStyle("K$row:M$row")->applyFromArray($backgroundYellowStyle);
                        $sheet->getStyle("A$row:M$row")->applyFromArray($wrapTextLeftStyle);
                        $sheet->getStyle("A$row:M$row")->applyFromArray($defaultTextSizeStyle);
                        $sheet->getStyle("F$row:M$row")->applyFromArray($wrapTextCenterStyle);
                        $row++;

                        $sheet->mergeCells("A$row:M$row");
                    
                        $sheet->setCellValue("A$row", "ASSETS");

                        $sheet->getStyle("A$row")->applyFromArray($backgroundLightGreenStyle);
                        $row++;
                        
                        foreach($assets as $asset)
                        {
                            $assetCode           = $asset["code"] ?? "";
                            $assetName           = $asset["name"] ?? "";
                            $assetClassification = $asset["classification"] ?? "";
                            $assetUnit           = $asset["unit"] ?? "";
                            $assetQuantity       = $asset["quantity"] ?? "";
                            $assetManHours       = $asset["manHours"] ?? "";
                            $assetUnitCost       = $asset["unitCost"] ?? "";
                            $assetTotalCost      = $asset["totalCost"] ?? "";

                            $sheet->mergeCells("B$row:C$row");
                            $sheet->mergeCells("D$row:E$row");
                            $sheet->mergeCells("F$row:G$row");
                            $sheet->mergeCells("I$row:J$row");
                            $sheet->mergeCells("K$row:L$row");

                            $sheet->setCellValue("A$row", $assetCode);
                            $sheet->setCellValue("B$row", $assetName);
                            $sheet->setCellValue("D$row", $assetClassification);
                            $sheet->setCellValue("F$row", $assetUnit);
                            $sheet->setCellValue("H$row", $assetQuantity);
                            $sheet->setCellValue("I$row", $assetManHours);
                            $sheet->setCellValue("K$row", $assetUnitCost);
                            $sheet->setCellValue("M$row", $assetTotalCost);

                            $sheet->getStyle("F$row:J$row")->applyFromArray($wrapTextCenterStyle);
                            $sheet->getStyle("K$row:M$row")->applyFromArray($wrapTextRightStyle);
                            $row++;
                        }
                    }
                // ----- END ASSETS -----


                // ----- VEHICLES -----
                    if ($vehicles && count($vehicles) > 0)
                    {
                        $sheet->mergeCells("A$row:M$row");
                        $row++;
                        $sheet->mergeCells("B$row:C$row");
                        $sheet->mergeCells("D$row:F$row");
                        $sheet->mergeCells("G$row:H$row");
                        $sheet->mergeCells("J$row:K$row");
                        $sheet->mergeCells("L$row:M$row");

                        $sheet->setCellValue("A$row", 'VEHICLE CODE');
                        $sheet->setCellValue("B$row", 'NAME');
                        $sheet->setCellValue("D$row", 'AVERAGE FUEL TYPE');
                        $sheet->setCellValue("F$row", 'DISTANCE');
                        $sheet->setCellValue("G$row", 'MAN HOURS');
                        $sheet->setCellValue("I$row", 'FUEL RATE');
                        $sheet->setCellValue("J$row", 'VEHICLE RATE');
                        $sheet->setCellValue("L$row", 'TOTAL COST');

                        $sheet->getStyle("A$row:I$row")->applyFromArray($backgroundOrangeStyle);
                        $sheet->getStyle("I$row:M$row")->applyFromArray($backgroundYellowStyle);
                        $sheet->getStyle("A$row:M$row")->applyFromArray($defaultTextSizeStyle);
                        $sheet->getStyle("A$row:M$row")->applyFromArray($wrapTextLeftStyle);
                        $sheet->getStyle("D$row:M$row")->applyFromArray($wrapTextCenterStyle);
                        $row++;

                        $sheet->mergeCells("A$row:M$row");
                    
                        $sheet->setCellValue("A$row", "VEHICLE");

                        $sheet->getStyle("A$row")->applyFromArray($backgroundLightGreenStyle);
                        $row++;

                        foreach($vehicles as $vehicle)
                        {
                            $vehicleCode      = $vehicle["code"] ?? "";
                            $vehicleName      = $vehicle["name"] ?? "";
                            $vehicleFuel      = $vehicle["averageFuelType"] ?? "";
                            $vehicleDistance  = $vehicle["distance"] ?? "";
                            $vehicleManHours  = $vehicle["manHours"] ?? "";
                            $vehicleFuelRate  = $vehicle["fuelRate"] ?? "";
                            $vehicleRate      = $vehicle["vehicleRate"] ?? "";
                            $vehicleTotalCost = $vehicle["totalCost"] ?? "";

                            $sheet->mergeCells("B$row:C$row");
                            $sheet->mergeCells("D$row:F$row");
                            $sheet->mergeCells("G$row:H$row");
                            $sheet->mergeCells("J$row:K$row");
                            $sheet->mergeCells("L$row:M$row");

                            $sheet->setCellValue("A$row", $vehicleCode);
                            $sheet->setCellValue("B$row", $vehicleName);
                            $sheet->setCellValue("D$row", $vehicleFuel);
                            $sheet->setCellValue("F$row", $vehicleDistance);
                            $sheet->setCellValue("G$row", $vehicleManHours);
                            $sheet->setCellValue("I$row", $vehicleFuelRate);
                            $sheet->setCellValue("J$row", $vehicleRate);
                            $sheet->setCellValue("L$row", $vehicleTotalCost);

                            $sheet->getStyle("D$row:H$row")->applyFromArray($wrapTextCenterStyle);
                            $sheet->getStyle("I$row:M$row")->applyFromArray($wrapTextRightStyle);

                            $row++;
                        }
                    }
                // ----- END VEHICLES -----


                // ----- OTHERS -----
                    if ($others && count($others) > 0)
                    {
                        $sheet->mergeCells("A$row:M$row");
                        $row++;
                        $sheet->mergeCells("B$row:K$row");
                        $sheet->mergeCells("L$row:M$row");

                        $sheet->setCellValue("A$row", 'CATEGORY');
                        $sheet->setCellValue("B$row", 'DESCRIPTION');
                        $sheet->setCellValue("L$row", 'TOTAL COST');

                        $sheet->getStyle("A$row:K$row")->applyFromArray($backgroundOrangeStyle);
                        $sheet->getStyle("L$row:M$row")->applyFromArray($backgroundYellowStyle);
                        $sheet->getStyle("A$row:M$row")->applyFromArray($defaultTextSizeStyle);
                        $sheet->getStyle("A$row:K$row")->applyFromArray($wrapTextLeftStyle);
                        $sheet->getStyle("L$row:M$row")->applyFromArray($wrapTextCenterStyle);
                        $row++;

                        $sheet->mergeCells("A$row:M$row");
                    
                        $sheet->setCellValue("A$row", "OTHERS");

                        $sheet->getStyle("A$row")->applyFromArray($backgroundLightGreenStyle);
                        $row++;

                        foreach($others as $other)
                        {
                            $otherCategory    = $other["category"] ?? "";
                            $otherDescription = $other["description"] ?? "";
                            $otherTotalCost   = $other["totalCost"] ?? "";

                            $sheet->mergeCells("B$row:K$row");
                            $sheet->mergeCells("L$row:M$row");

                            $sheet->setCellValue("A$row", $otherCategory);
                            $sheet->setCellValue("B$row", $otherDescription);
                            $sheet->setCellValue("L$row", $otherTotalCost);

                            $sheet->getStyle("L$row:M$row")->applyFromArray($wrapTextRightStyle);

                            $row++;
                        }
                    }
                // ----- END OTHERS -----

            // ----- END ITEMS -----


            $sheet->getStyle("A1:M".($row - 1))->applyFromArray($allBorderStyle);
            $sheet->getStyle("A$startRow:M".($row - 1))->applyFromArray($defaultTextSizeStyle);


            // ----- COST SUMMARY ----
                $sheet->mergeCells("A$row:M$row");
                $row++;
                $startCostSummaryRow = $row;

                if ($costItems && count($costItems) > 0)
                {
                    foreach($costItems as $item)
                    {
                        $sheet->mergeCells("I$row:K$row");
                        $sheet->mergeCells("L$row:M$row");

                        $costName      = $item["name"] ?? "";
                        $costTotalCost = $item["totalCost"] ?? "";
                        $costTotalCost = stringToDecimal($costTotalCost);
                        
                        $sheet->setCellValue("I$row", strtoupper($costName));
                        $sheet->setCellValue("L$row", $costTotalCost);

                        $sheet->getStyle("I$row:K$row")->applyFromArray($wrapTextLeftStyle);
                        $sheet->getStyle("L$row:M$row")->applyFromArray($wrapTextRightStyle);
                        $row++;
                    }
                    $sheet->mergeCells("I$row:K$row");
                    $sheet->mergeCells("L$row:M$row");

                    $sheet->setCellValue("I$row", "TOTAL COST");
                    $sheet->setCellValue("L$row", $costItemTotalCost);

                    $sheet->getStyle("I$row:K$row")->applyFromArray($wrapTextLeftStyle);
                    $sheet->getStyle("L$row:M$row")->applyFromArray($wrapTextRightStyle);
                    $sheet->getStyle("I$row:M$row")->applyFromArray($boldStyle);
                    $sheet->getStyle("I$row:M$row")->applyFromArray($topBorderStyle);
                    $row+=2;
                }

                if ($costOverhead && count($costOverhead) > 0)
                {
                    $sheet->mergeCells("I$row:M$row");
                    $sheet->setCellValue("I$row", "OVERHEAD");
                    $row++;

                    foreach($costOverhead as $item)
                    {
                        $sheet->mergeCells("I$row:K$row");
                        $sheet->mergeCells("L$row:M$row");

                        $overheadName      = $item["name"] ?? "";
                        $overheadTotalCost = $item["totalCost"] ?? "";
                        $overheadTotalCost = stringToDecimal($overheadTotalCost);
                        
                        $sheet->setCellValue("I$row", "          ".strtoupper($overheadName));
                        $sheet->setCellValue("L$row", $overheadTotalCost);

                        $sheet->getStyle("I$row:K$row")->applyFromArray($wrapTextLeftStyle);
                        $sheet->getStyle("L$row:M$row")->applyFromArray($wrapTextRightStyle);
                        $row++;
                    }
                }

                if ($costContingency)
                {
                    $sheet->mergeCells("I$row:K$row");
                    $sheet->mergeCells("L$row:M$row");

                    $sheet->setCellValue("I$row", "CONTINGENCY");
                    $sheet->setCellValue("L$row", $costContingency);

                    $sheet->getStyle("I$row:K$row")->applyFromArray($wrapTextLeftStyle);
                    $sheet->getStyle("L$row:M$row")->applyFromArray($wrapTextRightStyle);
                    $sheet->getStyle("I$row:M$row")->applyFromArray($bottomBorderStyle);
                    $row++;
                }

                if ($costSubtotal)
                {
                    $sheet->mergeCells("I$row:K$row");
                    $sheet->mergeCells("L$row:M$row");

                    $sheet->setCellValue("I$row", "SUBTOTAL");
                    $sheet->setCellValue("L$row", $costSubtotal);

                    $sheet->getStyle("I$row:K$row")->applyFromArray($wrapTextLeftStyle);
                    $sheet->getStyle("L$row:M$row")->applyFromArray($wrapTextRightStyle);
                    $sheet->getStyle("I$row:M$row")->applyFromArray($boldStyle);
                    $row++;
                }

                if ($costMarkUp)
                {
                    $sheet->mergeCells("I$row:K$row");
                    $sheet->mergeCells("L$row:M$row");

                    $sheet->setCellValue("I$row", "MARK UP");
                    $sheet->setCellValue("L$row", $costMarkUp);

                    $sheet->getStyle("I$row:K$row")->applyFromArray($wrapTextLeftStyle);
                    $sheet->getStyle("L$row:M$row")->applyFromArray($wrapTextRightStyle);
                    $sheet->getStyle("I$row:M$row")->applyFromArray($bottomBorderStyle);
                    $row++;
                }

                if ($costContractPriceVATEX)
                {
                    $sheet->mergeCells("I$row:K$row");
                    $sheet->mergeCells("L$row:M$row");

                    $sheet->setCellValue("I$row", "CONTRACT PRICE - VAT EX");
                    $sheet->setCellValue("L$row", $costContractPriceVATEX);

                    $sheet->getStyle("I$row:K$row")->applyFromArray($wrapTextLeftStyle);
                    $sheet->getStyle("L$row:M$row")->applyFromArray($wrapTextRightStyle);
                    $sheet->getStyle("I$row:M$row")->applyFromArray($boldStyle);
                    $row++;
                }

                if ($costVat)
                {
                    $sheet->mergeCells("I$row:K$row");
                    $sheet->mergeCells("L$row:M$row");

                    $sheet->setCellValue("I$row", "12% VAT");
                    $sheet->setCellValue("L$row", $costVat);

                    $sheet->getStyle("I$row:K$row")->applyFromArray($wrapTextLeftStyle);
                    $sheet->getStyle("L$row:M$row")->applyFromArray($wrapTextRightStyle);
                    $sheet->getStyle("I$row:M$row")->applyFromArray($bottomBorderStyle);
                    $row++;
                }

                if ($costContractPriceVATINC)
                {
                    $sheet->mergeCells("I$row:K$row");
                    $sheet->mergeCells("L$row:M$row");

                    $sheet->setCellValue("I$row", "CONTRACT PRICE - VAT INC");
                    $sheet->setCellValue("L$row", $costContractPriceVATINC);

                    $sheet->getStyle("I$row:K$row")->applyFromArray($wrapTextLeftStyle);
                    $sheet->getStyle("L$row:M$row")->applyFromArray($wrapTextRightStyle);
                    $sheet->getStyle("I$row:M$row")->applyFromArray($boldStyle);
                    $row++;
                }

                $sheet->getStyle("I$startCostSummaryRow:M$row")->getFont()->setSize(12);
            // ----- END COST SUMMARY ----


            // ----- PRINTING AREA -----
            $spreadsheet->getActiveSheet()->getPageSetup()->setPrintArea("A1:M$row");
            // ----- END PRINTING AREA -----


            $writer = new Xlsx($spreadsheet);
            header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            header('Content-Disposition: attachment; filename="'. urlencode($filename).'"');
            $writer->save('php://output');

        }
    }

    
    function costSheetExcel($data = [])
    {
        if ($data && count($data) > 0)
        {
            $filename        = $data["filename"] ?? "download.xlsx";
            $hCode           = $data["code"] ?? "-";
            $hTitle          = $data["title"] ?? "-";
            $hClientName     = $data["header"]["clientName"] ?? "";
            $hAddress        = $data["header"]["address"] ?? "";
            $hProjectCode    = $data["header"]["projectCode"] ?? "";
            $hDescription    = $data["header"]["description"] ?? "";
            $hDate           = $data["header"]["date"] ?? "";
            $hReferenceNo    = $data["header"]["referenceNo"] ?? "";
            $hProjectName    = $data["header"]["projectName"] ?? "";

            $bProjectPhase         = $data["body"]["projectPhase"] ?? [];
            $bAssetEquipment       = $data["body"]["assetEquipment"] ?? [];
            $bTravelTransportation = $data["body"]["travelTransportation"] ?? [];

            $fComments           = $data["footer"]["comments"] ?? "";
            $totalCost           = $data["footer"]["costSummary"]["totalCost"] ?? formatAmount(0, true);
            $overhead            = $data["footer"]["costSummary"]["overhead"] ?? formatAmount(0);
            $contingency         = $data["footer"]["costSummary"]["contingency"] ?? formatAmount(0);
            $subtotal            = $data["footer"]["costSummary"]["subtotal"] ?? formatAmount(0);
            $markup              = $data["footer"]["costSummary"]["markup"] ?? formatAmount(0);
            $contractPriceVatEx  = $data["footer"]["costSummary"]["contractPriceVatEx"] ?? formatAmount(0);
            $vat                 = $data["footer"]["costSummary"]["vat"] ?? formatAmount(0);
            $contractPriceVatInc = $data["footer"]["costSummary"]["contractPriceVatInc"] ?? formatAmount(0, true);

            $totalCost           = stringToDecimal($totalCost);
            $overhead            = stringToDecimal($overhead);
            $contingency         = stringToDecimal($contingency);
            $subtotal            = stringToDecimal($subtotal);
            $markup              = stringToDecimal($markup);
            $contractPriceVatEx  = stringToDecimal($contractPriceVatEx);
            $vat                 = stringToDecimal($vat);
            $contractPriceVatInc = stringToDecimal($contractPriceVatInc);

            $spreadsheet = new Spreadsheet();
            $sheet       = $spreadsheet->getActiveSheet();

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
                $headerLogo->setHeight(250);
                $spreadsheet->getActiveSheet()->getHeaderFooter()->addImage($headerLogo, \PhpOffice\PhpSpreadsheet\Worksheet\HeaderFooter::IMAGE_HEADER_CENTER);
                $spreadsheet->getActiveSheet()->getHeaderFooter()->setOddHeader('&C&G');
                
                $footerLogo->setName('Footer logo');
                $footerLogo->setPath("assets/images/company-logo/excel-footer.png");
                $footerLogo->setHeight(110);
                $spreadsheet->getActiveSheet()->getHeaderFooter()->addImage($footerLogo, \PhpOffice\PhpSpreadsheet\Worksheet\HeaderFooter::IMAGE_FOOTER_CENTER);
                $spreadsheet->getActiveSheet()->getHeaderFooter()->setOddFooter('&C&G');
            // ----- END PAGE SETUP -----


            // ----- COLUMN AND WIDTH SIZE -----
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
            // ----- END COLUMN AND WIDTH SIZE -----


            // ----- ***** STYLES ***** -----
                $boldStyle = [
                    "font" => [
                        "bold" => true,
                    ],
                ];

                $labelBoldStyle = [
                    "font" => [
                        "bold" => true,
                    ],
                    "alignment" => [
                        "vertical"   => Alignment::VERTICAL_CENTER,
                        "horizontal" => Alignment::HORIZONTAL_LEFT
                    ]
                ];

                $bottomBorderStyle = [
                    'borders' => [
                        'bottom' => [
                            'borderStyle' => Border::BORDER_THIN,
                            'color' => ['argb' => 'FF000000'],
                        ],
                    ],
                ];

                $wrapTextCenterStyle = [
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
                
                $titleCodeStyle = [
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

                $titleTextStyle = [
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

                $headerFillStyle = [
                    "font" => [
                        "color" => array("rgb" => "FFFFFF"), 
                        "bold" => true,
                    ],
                    "alignment" => [
                        "vertical"   => Alignment::VERTICAL_BOTTOM,
                        "horizontal" => Alignment::HORIZONTAL_LEFT
                    ],
                    'fill' => [
                        'fillType'   => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                        'startColor' => [
                            'argb'   => 'FF161616',
                        ],
                    ],
                ];

                $headerAddressStyle = [
                    "alignment" => [
                        "vertical"   => Alignment::VERTICAL_CENTER,
                        "horizontal" => Alignment::HORIZONTAL_LEFT,
                        "wrapText"   => true
                    ],
                    "font" => [
                        "size"  => 8,
                    ],
                ];

                $bodyColumnHeaderStyle = [
                    "font" => [
                        "color" => array("rgb" => "FFFFFF"), 
                        "bold"  => true,
                    ],
                    "alignment" => [
                        "vertical"   => Alignment::VERTICAL_BOTTOM,
                        "horizontal" => Alignment::HORIZONTAL_CENTER
                    ],
                    'fill' => [
                        'fillType'   => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                        'startColor' => [
                            'argb'   => 'FF161616',
                        ],
                    ],
                ];

                $footerAmountStyle = [
                    "alignment" => [
                        "vertical"   => Alignment::VERTICAL_CENTER,
                        "horizontal" => Alignment::HORIZONTAL_RIGHT,
                        "wrapText"   => true
                    ],
                ];

                $footerCommentStyle = [
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

                $footerAmountWordStyle = [
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

                $footerApproversStyle = [
                    "font" => [
                        "size" => 8
                    ],
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

                $footerAcknowledgedStyle = [
                    "font" => [
                        "size" => 10
                    ],
                    "alignment" => [
                        "vertical"   => Alignment::VERTICAL_BOTTOM,
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
            // ----- ***** END STYLES ***** -----


            // ----- TITLE -----
                $sheet->mergeCells('B1:K1');
                $sheet->setCellValue('B1', $hCode);
                $sheet->getStyle('B1')->applyFromArray($titleCodeStyle);
                $sheet->mergeCells('B2:K2');
                $sheet->setCellValue('B2', "COST SHEET");
                $sheet->getStyle('B2')->applyFromArray($titleTextStyle);
            // ----- END TITLE -----


            // ----- HEADER -----
                $sheet->mergeCells('B3:C3');
                $sheet->setCellValue('B3', "Client Name: ");
                $sheet->mergeCells('D3:G3');
                $sheet->setCellValue('D3', $hClientName);
                $sheet->mergeCells('H3:I3');
                $sheet->setCellValue('H3', "Date: ");
                $sheet->mergeCells('J3:K3');
                $sheet->setCellValue('J3', $hDate);

                $sheet->mergeCells('B4:C4');
                $sheet->setCellValue('B4', "Address: ");
                $sheet->mergeCells('D4:G4');
                $sheet->setCellValue('D4', $hAddress);
                $sheet->mergeCells('H4:I4');
                $sheet->setCellValue('H4', "Reference No.: ");
                $sheet->mergeCells('J4:K4');
                $sheet->setCellValue('J4', $hReferenceNo);
                $sheet->getRowDimension('4')->setRowHeight(34.31);

                $sheet->mergeCells('B5:C5');
                $sheet->setCellValue('B5', "Project Code: ");
                $sheet->mergeCells('D5:G5');
                $sheet->setCellValue('D5', $hProjectCode);
                $sheet->mergeCells('H5:I5');
                $sheet->setCellValue('H5', "Project Name: ");
                $sheet->mergeCells('J5:K5');
                $sheet->setCellValue('J5', $hProjectName);

                $sheet->mergeCells('B6:C6');
                $sheet->setCellValue('B6', "Description: ");
                $sheet->mergeCells('D6:K6');
                $sheet->setCellValue('D6', $hDescription);

                $sheet->getStyle("B3:C6")->applyFromArray($headerFillStyle);
                $sheet->getStyle("H3:I6")->applyFromArray($headerFillStyle);
                $sheet->getStyle("B3:K6")->applyFromArray($allBorderStyle);
                $sheet->getStyle("D4")->applyFromArray($headerAddressStyle);
            // ----- END HEADER -----


            // ----- BODY -----
                $row = 8;
                if ($bProjectPhase && count($bProjectPhase) > 0)
                {
                    $startRow = $row;
                    // * COLUMN HEADER
                    $sheet->mergeCells("B$row:K$row");
                    $sheet->setCellValue("B$row", "PROJET PHASE");
                    $row++;
                    $sheet->mergeCells("B$row:D$row");
                    $sheet->setCellValue("B$row", "PHASE");
                    $sheet->mergeCells("E$row:G$row");
                    $sheet->setCellValue("E$row", "MILESTONE");
                    $sheet->mergeCells("H$row:I$row");
                    $sheet->setCellValue("H$row", "ITEM");
                    $sheet->setCellValue("J$row", "LABOR");
                    $sheet->setCellValue("K$row", "TOTAL COST");
                    $sheet->getStyle("B".($row-1).":K$row")->applyFromArray($bodyColumnHeaderStyle);
                    $row++;
                    // * END COLUMN HEADER

                    foreach($bProjectPhase as $phase)
                    {
                        $phaseName  = $phase["phaseName"] ?? "";
                        $itemCost   = $phase["itemCost"] ?? "";
                        $laborCost  = $phase["laborCost"] ?? "";
                        $totalCost  = $phase["totalCost"] ?? "";
                        $milestones = $phase["milestone"] ?? [];

                        $sheet->mergeCells("B$row:D$row");
                        $sheet->setCellValue("B$row", $phaseName);
                        $sheet->mergeCells("E$row:G$row");
                        $sheet->setCellValue("E$row", "");
                        $sheet->mergeCells("H$row:I$row");
                        $sheet->setCellValue("H$row", $itemCost);
                        $sheet->setCellValue("J$row", $laborCost);
                        $sheet->setCellValue("K$row", $totalCost);
                        $row++;

                        if ($milestones && count($milestones) > 0)
                        {
                            foreach($milestones as $milestone)
                            {
                                $milestoneName = $milestone["name"] ?? "";
                                $item  = $milestone["item"] ?? "";
                                $labor = $milestone["labor"] ?? "";
                                $total = $milestone["totalCost"] ?? "";

                                $sheet->mergeCells("B$row:D$row");
                                $sheet->setCellValue("B$row", "");
                                $sheet->mergeCells("E$row:G$row");
                                $sheet->setCellValue("E$row", $milestoneName);
                                $sheet->mergeCells("H$row:I$row");
                                $sheet->setCellValue("H$row", $item);
                                $sheet->setCellValue("J$row", $labor);
                                $sheet->setCellValue("K$row", $total);
                                $row++;
                            }
                        }
                    }

                    $sheet->getStyle("B$startRow:K".($row-1))->applyFromArray($allBorderStyle);
                    $sheet->getStyle("H$startRow:K".($row-1))->applyFromArray($footerAmountStyle);
                }

                if ($bAssetEquipment && count($bAssetEquipment) > 0)
                {
                    $row++;
                    $startRow = $row;
                    // * COLUMN HEADER
                    $sheet->mergeCells("B$row:K$row");
                    $sheet->setCellValue("B$row", "ASSETS AND EQUIPMENT");
                    $sheet->getStyle("B$row:K$row")->applyFromArray($bodyColumnHeaderStyle);
                    $row++;
                    // * END COLUMN HEADER

                    foreach($bAssetEquipment as $asset)
                    {
                        $assetName = $asset["name"] ?? "";
                        $totalCost = $asset["totalCost"] ?? "";

                        $sheet->mergeCells("B$row:J$row");
                        $sheet->setCellValue("B$row", $assetName);
                        $sheet->setCellValue("K$row", $totalCost);
                        $row++;
                    }

                    $sheet->getStyle("B$startRow:K".($row-1))->applyFromArray($allBorderStyle);
                    $sheet->getStyle("K$startRow:K".($row-1))->applyFromArray($footerAmountStyle);
                }

                if ($bTravelTransportation && count($bTravelTransportation) > 0)
                {
                    $row++;
                    $startRow = $row;
                    // * COLUMN HEADER
                    $sheet->mergeCells("B$row:K$row");
                    $sheet->setCellValue("B$row", "TRAVEL AND TRANSPORTATION");
                    $sheet->getStyle("B$row:K$row")->applyFromArray($bodyColumnHeaderStyle);
                    $row++;
                    // * END COLUMN HEADER

                    foreach($bTravelTransportation as $asset)
                    {
                        $transportationName = $asset["name"] ?? "";
                        $totalCost          = $asset["totalCost"] ?? "";

                        $sheet->mergeCells("B$row:J$row");
                        $sheet->setCellValue("B$row", $transportationName);
                        $sheet->setCellValue("K$row", $totalCost);
                        $row++;
                    }
                    
                    $sheet->getStyle("B$startRow:K".($row-1))->applyFromArray($allBorderStyle);
                    $sheet->getStyle("K$startRow:K".($row-1))->applyFromArray($footerAmountStyle);
                }
            // ----- END BODY -----


            // ----- FOOTER -----
                if ($data["footer"]["costSummary"] && count($data["footer"]["costSummary"]) > 0)
                {
                    $row++;
                    $startRow = $row;
                    // * COMMENTS AND COST SUMMARY
                    $sheet->mergeCells("H$row:J$row");
                    $sheet->setCellValue("H$row", "TOTAL COST");
                    $sheet->setCellValue("K$row", $totalCost);
                    $sheet->getStyle("H$row:K$row")->applyFromArray($boldStyle);
                    $sheet->getStyle("H$row:K$row")->applyFromArray($bottomBorderStyle);
                    $row++;
                    
                    $sheet->mergeCells("H$row:J$row");
                    $sheet->setCellValue("H$row", "OVERHEAD");
                    $sheet->setCellValue("K$row", $overhead);
                    $row++;

                    $sheet->mergeCells("H$row:J$row");
                    $sheet->setCellValue("H$row", "CONTINGENCY");
                    $sheet->setCellValue("K$row", $contingency);
                    $row++;

                    $sheet->mergeCells("H$row:J$row");
                    $sheet->setCellValue("H$row", "SUBTOTAL");
                    $sheet->setCellValue("K$row", $subtotal);
                    $sheet->getStyle("H$row:K$row")->applyFromArray($boldStyle);
                    $sheet->getStyle("H$row:K$row")->applyFromArray($bottomBorderStyle);
                    $row++;

                    $sheet->mergeCells("H$row:J$row");
                    $sheet->setCellValue("H$row", "MARKUP");
                    $sheet->setCellValue("K$row", $markup);
                    $row++;

                    $sheet->mergeCells("H$row:J$row");
                    $sheet->setCellValue("H$row", "CONTRACT PRICE - VAT EX");
                    $sheet->setCellValue("K$row", $contractPriceVatEx);
                    $sheet->getStyle("H$row:K$row")->applyFromArray($boldStyle);
                    $sheet->getStyle("H$row:K$row")->applyFromArray($bottomBorderStyle);
                    $row++;

                    $sheet->mergeCells("H$row:J$row");
                    $sheet->setCellValue("H$row", "12% VAT");
                    $sheet->setCellValue("K$row", $vat);
                    $row++;

                    $sheet->mergeCells("H$row:J$row");
                    $sheet->setCellValue("H$row", "CONTRACT PRICE - VAT INC");
                    $sheet->setCellValue("K$row", $contractPriceVatInc);
                    $sheet->getStyle("H$row:K$row")->applyFromArray($boldStyle);
                    $sheet->getStyle("H$row:K$row")->applyFromArray($bottomBorderStyle);
                    $row++;

                    $sheet->getStyle("K$startRow:K$row")->applyFromArray($footerAmountStyle);
                    // * END COMMENTS AND COST SUMMARY
                }


                if ($data["footer"]["approvers"] && count($data["footer"]["approvers"]) > 0)
                {
                    // * APPROVERS
                    $approvers = $data["footer"]["approvers"] ?? [];
                    $countApprover = count($approvers);
                    if ($countApprover == 1)
                    {
                        $columns = [["B", "K"]];
                    }
                    else if ($countApprover == 3)
                    {
                        $columns = [
                            ["B", "E"],
                            ["F", "H"],
                            ["I", "K"],
                        ];
                    }
                    else 
                    {
                        $columns = [
                            ["B", "F"],
                            ["G", "K"]
                        ];
                    }

                    $row++;
                    foreach($approvers as $index => $approver)
                    {
                        if ($countApprover > 3)
                        {
                            if ($index % 2 == 0)
                            {
                                if ($index != 0) $row++;
                                $cell     = $columns[0][0].$row.":".$columns[0][1].$row;
                                $baseCell = $columns[0][0].$row;
                                if (($index+1) == $countApprover)
                                {
                                    $cell     = "B$row:K$row";
                                    $baseCell = "B$row";
                                }
                            }
                            else 
                            {
                                $cell     = $columns[1][0].$row.":".$columns[1][1].$row;
                                $baseCell = $columns[1][0].$row;
                            }
                        }
                        else 
                        {
                            $cell     = $columns[$index][0].$row.":".$columns[$index][1].$row;
                            $baseCell = $columns[$index][0].$row;
                            if ($countApprover == 2 && $index == ($countApprover - 1)) $row++;
                        }
                        $sheet->mergeCells($cell);

                        $title       = $approver["title"] ?? "";
                        $designation = $approver["designation"] ?? "";

                        $richText = new RichText();
                        $richText->createText('');
                        $cellText = $richText->createTextRun($title);
                        $cellText->getFont()->setBold(true);
                        $richText->createText("\n$designation");

                        $sheet->setCellValue($baseCell, $richText);
                        $sheet->getStyle($cell)->applyFromArray($footerApproversStyle);
                        $sheet->getRowDimension($row)->setRowHeight(17*2);
                    }
                    $row++;
                    // * END APPROVERS
                }

                $sheet->mergeCells("B$row:E$row");
                $sheet->setCellValue("B$row", "Acknowledged by: ");
                $sheet->getStyle("B$row:E$row")->applyFromArray($allBorderStyle);
                $sheet->mergeCells("F$row:H$row");
                $sheet->setCellValue("F$row", "Signature: ");
                $sheet->getStyle("F$row:H$row")->applyFromArray($allBorderStyle);
                $sheet->mergeCells("I$row:K$row");
                $sheet->setCellValue("I$row", "Date: ");
                $sheet->getStyle("I$row:K$row")->applyFromArray($allBorderStyle);
                $sheet->getRowDimension("$row")->setRowHeight(17*2);
                $sheet->getStyle("B$row:K$row")->applyFromArray($footerAcknowledgedStyle);

            // ----- END FOOTER -----

            
            // ----- PRINTING AREA -----
            $spreadsheet->getActiveSheet()->getPageSetup()->setPrintArea("B1:K$row");
            // ----- END PRINTING AREA -----


            $writer = new Xlsx($spreadsheet);
            header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            header('Content-Disposition: attachment; filename="'. urlencode($filename).'"');
            $writer->save('php://output');
        }
    }


    function downloadExcel($type = "", $data = [])
    {
        $CI =& get_instance();
        if ($data && count($data) > 0)
        {
            if (strtolower($type) == "purchase order")
            {
                purchaseOrderExcel($data);
            }
            else if (strtolower($type) == "bill of materials")
            {
                billMaterialExcel($data);
            }
            else if (strtolower($type) == "cost estimate")
            {
                costEstimateExcel($data);
            }
            else if (strtolower($type) == "cost sheet")
            {
                costSheetExcel($data);
            }
        }
    }