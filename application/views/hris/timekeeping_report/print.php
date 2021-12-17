<?php

    $companyName = $companyAddress = $companyContact = "";
    $companyLogo = "default.png";

    if ($company) {
        $companyLogo    = $company->companyLogo ?? "";
        $companyName    = $company->companyName ?? "";
        $companyAddress = ($company->companyUnitNo ?? "") ." ". ($company->companyBuildingNo ?? "") ." ". ($company->companyStheetName ?? "") ." ". ($company->companySubdivisionName ?? "") ." ". ($company->companyBarangay ?? "") ." ". ($company->companyCity ?? "") ." ". ($company->companyProvince ?? "") ." ". ($company->companyRegion ?? "") ." ". ($company->companyZipcode ?? "") ." ". ($company->companyCounthy ?? "");
        $companyContact = ($company->companyTelephone ?? "") ." ". ($company->companyMobile ?? "");
    }

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $title ?></title>

    <link rel="stylesheet" href="<?= base_url('assets/custom/css/hris/timekeeping-report-print.css') ?>">
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
                    <div class="title"><?= $timekeeping['header'] ?? "-" ?></div>
                </div>
                <div class="document-number"><?= $code ?? '-' ?></div>
            </div>

            <div class="card-body">
                <div class="table-parent">
                    <table>
                        <thead>
                            <tr class="text-center">
                                <th>Employee Name</th>
                                <?php 
                                    if ($timekeeping && !empty($timekeeping['columns'])): 
                                    foreach ($timekeeping['columns'] as $key => $dt):
                                ?>
                                <th>
                                    <div><?= $dt['day'] ?? '-' ?></div>
                                    <span><?= $dt['number'] ?? '-' ?></span>
                                </th>
                                <?php
                                    endforeach; 
                                    endif; 
                                ?>
                                <th>Total Hours</th>
                                <th>Overtime Hours</th>
                                <th>Rest Day</th>
                                <th>No. of Working Days</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php
                                if ($timekeeping && !empty($timekeeping['attendance'])):
                                foreach ($timekeeping['attendance'] as $key => $dt):
                                    $data = $dt['data'] ?? [];
                            ?>
                                <tr>
                                    <td>
                                        <div><?= $dt['fullname'] ?? '-' ?></div>
                                        <small><?= $dt['code'] ?? '-' ?></small>
                                    </td>
                                    <?php
                                        if ($data && !empty($data)):
                                        foreach ($data as $att):
                                    ?>
                                    <td class="text-center"><?= $att['status'] != 'NO_SCHEDULE' || $att['status'] == 'REST_DAY' ? decimalToHours($att['totalHours']) : 'RD' ?></td>
                                    <?php 
                                        endforeach;
                                        endif;
                                    ?>
                                    <td class="text-center"><?= decimalToHours($dt['grandTotalHours']) ?></td>
                                    <td class="text-center"><?= decimalToHours($dt['totalOvertimeHours']) ?></td>
                                    <td class="text-center"><?= $dt['totalRestDay'] ?? '0' ?></td>
                                    <td class="text-center"><?= $dt['totalNoDays'] ?? '0' ?></td>
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