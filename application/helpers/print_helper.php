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

    function purchaseOrderExcel($data = [])
    {
        // $data = [
        //     "filename" => "purchaseOrder.xlsx",
        //     "code"     => "PO-21-00001",
        //     "title"    => "PURCHASE ORDER",
        //     "header" => 
        //     [
        //         "companyName"    => "BlackCoders Group Inc.",
        //         "address"        => "Unit 1701, Antel Global Corporate Center, Dona Julia Vargas Avenue, Ortigas Center, Pasig City",
        //         "contactDetails" => "0956 428 3181 / 0961 727 7951",
        //         "contactPerson"  => "Arjay P. Diangzon",
        //         "date"           => date("F d, Y"),
        //         "requestNo"      => "REQ-21-00001",
        //         "paymentTerms"   => "Cash",
        //         "deliveryDate"   => "Pick up June 16, 2021"
        //     ],
        //     "body" => [
        //         [
        //             "code"        => "ITM-21-00001",
        //             "description" => "Sample Description",
        //             "quantity"    => "10",
        //             "unit"        => "pieces",
        //             "unitCost"    => formatAmount(1500, true),
        //             "totalAmount" => formatAmount(15000, true),
        //         ],
        //         [
        //             "code"        => "ITM-21-00001",
        //             "description" => "Sample Description",
        //             "quantity"    => "10",
        //             "unit"        => "pieces",
        //             "unitCost"    => formatAmount(1500, true),
        //             "totalAmount" => formatAmount(15000, true),
        //         ],
        //         [
        //             "code"        => "ITM-21-00001",
        //             "description" => "Sample Description",
        //             "quantity"    => "10",
        //             "unit"        => "pieces",
        //             "unitCost"    => formatAmount(1500, true),
        //             "totalAmount" => formatAmount(15000, true),
        //         ],
        //         [
        //             "code"        => "ITM-21-00001",
        //             "description" => "Sample Description",
        //             "quantity"    => "10",
        //             "unit"        => "pieces",
        //             "unitCost"    => formatAmount(1500, true),
        //             "totalAmount" => formatAmount(15000, true),
        //         ],
        //         [
        //             "code"        => "ITM-21-00001",
        //             "description" => "Sample Description",
        //             "quantity"    => "10",
        //             "unit"        => "pieces",
        //             "unitCost"    => formatAmount(1500, true),
        //             "totalAmount" => formatAmount(15000, true),
        //         ],
        //         [
        //             "code"        => "ITM-21-00001",
        //             "description" => "Sample Description",
        //             "quantity"    => "10",
        //             "unit"        => "pieces",
        //             "unitCost"    => formatAmount(1500, true),
        //             "totalAmount" => formatAmount(15000, true),
        //         ],
        //     ],
        //     "footer" => [
        //         "comments"   => "1. Purchase Order must appear in all documents.\n2. The price of the Goods and/or Services stated in this purchase order shall be the price agreed upon in writing by the Company and the Supplier.\n3. Goods are subject to inspection upon arrival Goods must conform to description and specification set above, otherwise this will be return at the supplier's expenses.\n4. Original Invoice and/or Delivery receipt are left with Receiving Clerk to facilitate payment.",
        //         "wordAmount" => "THREE THOUSAND THREE HUNDRED EIGTHEEN PESOS AND TWENTY FIVE CENTAVOS",
        //         "costSummary" => [
        //             "total"        => formatAmount(1500, true),
        //             "discount"     => formatAmount(100),
        //             "totalAmount"  => formatAmount(1400),
        //             "vatSales"     => formatAmount(500),
        //             "vat"          => formatAmount(900),
        //             "totalVat"     => formatAmount(1400),
        //             "lessEwt"      => formatAmount(0),
        //             "grandTotalAmount" => formatAmount(1400, true)
        //         ],
        //         "approvers" => [
        //             [
        //                 "title"       => "Prepared By: Arjay P. Diangzon",
        //                 "designation" => "Operations",
        //                 "signature"   => ""
        //             ],
        //             [
        //                 "title"       => "Checked By: Arjay P. Diangzon",
        //                 "designation" => "Operations",
        //                 "signature"   => ""
        //             ],
        //             [
        //                 "title"       => "Approved By: Arjay P. Diangzon",
        //                 "designation" => "Operations",
        //                 "signature"   => ""
        //             ],
        //         ]
        //     ]
        // ];

        if ($data)
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

            $wrapTextCenter = [
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

            $footerAcknowledgeStyle = [
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

                $sheet->mergeCells("B$row:E$row");
                $sheet->setCellValue("B$row", "Acknowledge by: ");
                $sheet->getStyle("B$row:E$row")->applyFromArray($allBorderStyle);
                $sheet->mergeCells("F$row:H$row");
                $sheet->setCellValue("F$row", "Supplier's Signature: ");
                $sheet->getStyle("F$row:H$row")->applyFromArray($allBorderStyle);
                $sheet->mergeCells("I$row:K$row");
                $sheet->setCellValue("I$row", "Date: ");
                $sheet->getStyle("I$row:K$row")->applyFromArray($allBorderStyle);
                $sheet->getRowDimension("$row")->setRowHeight(17*2);
                $sheet->getStyle("B$row:K$row")->applyFromArray($footerAcknowledgeStyle);

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

        if ($type == "Purchase Order" && $data && count($data) > 0)
        {
            purchaseOrderExcel($data);
        }
    }