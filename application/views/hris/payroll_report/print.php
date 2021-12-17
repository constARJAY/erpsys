<?php

    $companyName = $companyAddress = $companyContact = "";
    $companyLogo = "default.png";

    if ($company) {
        $companyLogo    = $company->companyLogo ?? "";
        $companyName    = $company->companyName ?? "";
        $companyAddress = ($company->companyUnitNo ?? "") ." ". ($company->companyBuildingNo ?? "") ." ". ($company->companyStheetName ?? "") ." ". ($company->companySubdivisionName ?? "") ." ". ($company->companyBarangay ?? "") ." ". ($company->companyCity ?? "") ." ". ($company->companyProvince ?? "") ." ". ($company->companyRegion ?? "") ." ". ($company->companyZipcode ?? "") ." ". ($company->companyCounthy ?? "");
        $companyContact = ($company->companyTelephone ?? "") ." ". ($company->companyMobile ?? "");
    }

    $title = date("F d, Y", strtotime($payroll['header']->payrollStartDate))." - ".date('F d, Y', strtotime($payroll['header']->payrollEndDate));

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $title ?></title>

    <link rel="stylesheet" href="<?= base_url('assets/custom/css/hris/payroll-report-print.css') ?>">
</head> 
<body>


    <div class="container">

        <div class="card w-100">
            <div class="card-header">
                <img src="<?= base_url('assets/upload-files/company-logo/'.$companyLogo) ?>" alt="Logo">
                <div class="card-title">
                    <div class="company"><?= $companyName ?></div>
                    <div class="address"><?= $companyAddress ?></div>
                    <div class="contact"><?= $companyContact ?></div>
                    <div class="title"><?= $title ?></div>
                </div>
                <div class="document-number"><?= $code ?? '-' ?></div>
            </div>

            <div class="card-body">
                <div class="table-parent">
                    <table>
                        <thead>
                            <tr class="text-center">
                                <th style="width: 100px; height: 50px;">Employee Name</th>
                                <th style="width: 50px; height: 50px;">Basic Pay</th>
                                <th style="width: 50px; height: 50px;">Holiday Pay</th>
                                <th style="width: 50px; height: 50px;">Holiday Adjustment</th>
                                <th style="width: 50px; height: 50px;">Overtime</th>
                                <th style="width: 50px; height: 50px;">Overtime Adjustment</th>
                                <th style="width: 50px; height: 50px;">Night Differential</th>
                                <th style="width: 50px; height: 50px;">Night Differential Adjustment</th>
                                <th style="width: 50px; height: 50px;">Leave Pay</th>
                                <th style="width: 50px; height: 50px;">Allowance</th>
                                <th style="width: 50px; height: 50px;">Allowance Adjustment</th>
                                <th style="width: 50px; height: 50px;">Late/Undertime</th>
                                <th style="width: 50px; height: 50px;">Late/Undertime Adjustment</th>
                                <th style="width: 50px; height: 50px;">LWOP</th>
                                <th style="width: 50px; height: 50px;">Leave Adjustment</th>
                                <th style="width: 50px; height: 50px;">GROSS PAY</th>
                                <th style="width: 50px; height: 50px;">SSS</th>
                                <th style="width: 50px; height: 50px;">SSS Adjustment</th>
                                <th style="width: 50px; height: 50px;">PHIC</th>
                                <th style="width: 50px; height: 50px;">PHIC Adjustment</th>
                                <th style="width: 50px; height: 50px;">HDMF</th>
                                <th style="width: 50px; height: 50px;">HDMF Adjustment</th>
                                <th style="width: 50px; height: 50px;">Withholding Tax</th>
                                <th style="width: 50px; height: 50px;">Withholding Tax Adjustment</th>
                                <th style="width: 50px; height: 50px;">Loan</th>
                                <th style="width: 50px; height: 50px;">Loan Adjustment</th>
                                <th style="width: 50px; height: 50px;">Other Adjustment Adjustment</th>
                                <th style="width: 50px; height: 50px;">NET PAY</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php
                                if ($payroll && !empty($payroll['body']['items'])):
                                foreach ($payroll['body']['items'] as $key => $dt):
                            ?>
                            <tr>
                                <td>
                                    <div><?= $dt['fullname'] ?></div>
                                    <small><?= $dt['employeeCode'] ?></small>
                                </td>
                                <td class="text-right"><?= formatAmount($dt['basicSalary'], true) ?></td>
                                <td class="text-right"><?= formatAmount($dt['holidayPay'], true) ?></td>
                                <td class="text-right"><?= formatAmount($dt['holidayAdjustment'], true) ?></td>
                                <td class="text-right"><?= formatAmount($dt['overtimePay'], true) ?></td>
                                <td class="text-right"><?= formatAmount($dt['overtimeAdjustment'], true) ?></td>
                                <td class="text-right"><?= formatAmount($dt['nightDifferentialPay'], true) ?></td>
                                <td class="text-right"><?= formatAmount($dt['nightDifferentialAdjustment'], true) ?></td>
                                <td class="text-right"><?= formatAmount($dt['leavePay'], true) ?></td>
                                <td class="text-right"><?= formatAmount($dt['allowance'], true) ?></td>
                                <td class="text-right"><?= formatAmount($dt['allowanceAdjustment'], true) ?></td>
                                <td class="text-right"><?= formatAmount($dt['lateUndertimeDeduction'], true) ?></td>
                                <td class="text-right"><?= formatAmount($dt['lateUndertimeAdjustment'], true) ?></td>
                                <td class="text-right"><?= formatAmount($dt['lwopDeduction'], true) ?></td>
                                <td class="text-right"><?= formatAmount($dt['lwopAdjustment'], true) ?></td>
                                <td class="text-right"><?= formatAmount($dt['grossPay'], true) ?></td>
                                <td class="text-right"><?= formatAmount($dt['sssDeduction'], true) ?></td>
                                <td class="text-right"><?= formatAmount($dt['sssAdjustment'], true) ?></td>
                                <td class="text-right"><?= formatAmount($dt['phicDeduction'], true) ?></td>
                                <td class="text-right"><?= formatAmount($dt['phicAdjustment'], true) ?></td>
                                <td class="text-right"><?= formatAmount($dt['hdmfDeduction'], true) ?></td>
                                <td class="text-right"><?= formatAmount($dt['hdmfAdjustment'], true) ?></td>
                                <td class="text-right"><?= formatAmount($dt['withHoldingDeduction'], true) ?></td>
                                <td class="text-right"><?= formatAmount($dt['withHoldingAdjustment'], true) ?></td>
                                <td class="text-right"><?= formatAmount($dt['loanDeduction'], true) ?></td>
                                <td class="text-right"><?= formatAmount($dt['loanAdjustment'], true) ?></td>
                                <td class="text-right"><?= formatAmount($dt['otherAdjustment'], true) ?></td>
                                <td class="text-right"><?= formatAmount($dt['netPay'], true) ?></td>
                            </tr>
                            <?php
                                endforeach;
                                endif;
                            ?>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    <script>
        window.addEventListener('DOMContentLoaded', function() {
            window.print();    
        })
    </script>
</body>
</html>