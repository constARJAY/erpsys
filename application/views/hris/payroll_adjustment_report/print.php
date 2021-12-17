<?php

    $companyName = $companyAddress = $companyContact = "";
    $companyLogo = "default.png";

    if ($company) {
        $companyLogo    = $company->companyLogo ?? "";
        $companyName    = $company->companyName ?? "";
        $companyAddress = ($company->companyUnitNo ?? "") ." ". ($company->companyBuildingNo ?? "") ." ". ($company->companyStheetName ?? "") ." ". ($company->companySubdivisionName ?? "") ." ". ($company->companyBarangay ?? "") ." ". ($company->companyCity ?? "") ." ". ($company->companyProvince ?? "") ." ". ($company->companyRegion ?? "") ." ". ($company->companyZipcode ?? "") ." ". ($company->companyCounthy ?? "");
        $companyContact = ($company->companyTelephone ?? "") ." ". ($company->companyMobile ?? "");
    }

    $title = date("F d, Y", strtotime($payrolladjustment['header']->payrollStartDate))." - ".date('F d, Y', strtotime($payrolladjustment['header']->payrollEndDate));

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $title ?></title>

    <link rel="stylesheet" href="<?= base_url('assets/custom/css/hris/payroll-adjustment-report-print.css') ?>">
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
                                <th style="width: 20%;">Employee Name</th>
                                <th style="width: 20%;">Adjustment Type</th>
                                <th style="width: 20%;">Amount</th>
                                <th style="width: 40%;">Notes</th>
                            </tr>
                        </thead>
                        <tbody>
                        <?php
                            if ($payrolladjustment && !empty($payrolladjustment['body']['items'])):
                            foreach ($payrolladjustment['body']['items'] as $key => $dt):
                                $rowspan = $dt['rowCount'];

                                $columns = [
                                    'basicAdjustment', 
                                    'holidayAdjustment', 
                                    'overtimeAdjustment', 
                                    'nightDifferentialAdjustment', 
                                    'allowanceAdjustment', 
                                    'lateUndertimeAdjustment', 
                                    'lwopAdjustment', 
                                    'sssAdjustment', 
                                    'phicAdjustment', 
                                    'hdmfAdjustment', 
                                    'withHoldingAdjustment', 
                                    'loanAdjustment', 
                                    'otherAdjustment'
                                ];

                                $remarks = [
                                    'basicRemarks', 
                                    'holidayRemarks', 
                                    'overtimeRemarks', 
                                    'nightDifferentialRemarks', 
                                    'allowanceRemarks', 
                                    'lateUndertimeRemarks', 
                                    'lwopRemarks', 
                                    'sssRemarks', 
                                    'phicRemarks', 
                                    'hdmfRemarks', 
                                    'withHoldingRemarks', 
                                    'loanRemarks', 
                                    'otherRemarks'
                                ];

                                $labels = [
                                    'Basic',
                                    'Holiday',
                                    'Overtime',
                                    'Night Differential',
                                    'Allowance',
                                    'Late/Undertime',
                                    'LWOP',
                                    'SSS',
                                    'PHIC',
                                    'HDMF',
                                    'Withholding Tax',
                                    'Loan',
                                    'Others'
                                ];

                                $displayFlag = true;
                                foreach ($columns as $i => $col):
                                if (!empty($dt["$col"]) && (float) $dt["$col"] != 0):
                                    $displayname = $displayFlag ? "<td rowspan='$rowspan'><div>". $dt['fullname'] ."</div><small>". $dt['employeeCode'] ."</small></td>" : '';
                                    $displayFlag = false;
                        ?>
                            <tr>
                                <?= $displayname ?>
                                <td><?= $labels[$i] ?></td>
                                <td class="text-right"><?= formatAmount($dt["$col"], true) ?></td>
                                <td><?= $dt["$remarks[$i]"] ?></td>
                            </tr>
                        <?php
                                endif;
                                endforeach;
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