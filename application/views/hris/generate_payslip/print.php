<?php

    $companyName = $companyAddress = $companyContact = "";
    $companyLogo = "default.png";
    $printedBy   = $fullname[0] ? $fullname[0]["fullname"] : "Mark Gil Nieto";

    $date           = date_create();
    $dateTimeToday  = date_format($date,"F d, Y h:i:A");

    if ($company) {
        $companyName    = $company->companyName ?? "";
        $companyLogo    = $company->companyLogo ?? "";
        $companyAddress = ($company->companyUnitNo ?? "") ." ". ($company->companyBuildingNo ?? "") ." ". ($company->companyStreetName ?? "") ." ". ($company->companySubdivisionName ?? "") ." ". (ucwords(strtolower($company->companyBarangay)) ?? "") ." ". (ucwords(strtolower($company->companyCity)) ?? "") ." ". (ucwords(strtolower($company->companyProvince)) ?? "") ." ". ($company->companyZipcode ?? "") ." ". ($company->companyCountry ?? "");
        $companyContact = ($company->companyTelephone ?? "") ." / ". ($company->companyMobile ?? "");
    }

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PRINT PAYSLIP</title>
    <link rel="stylesheet" href="<?= base_url('assets/custom/css/hris/generate-payslip-print.css') ?>">
</head> 
<body style="font-family:Arial;font-size:80%;">
    
    

    <div class="container">

        

        <?php if($payslip && !empty($payslip)): ?>
        <?php foreach($payslip as $index => $pay): ?>
        <?php
            $employeeCode           = $pay["employeeCode"] ?? "-";
            $employeeName           = $pay["fullname"] ?? "-";
            $departmentName         = $pay["departmentName"] ?? "-";
            $designationName        = $pay["designationName"] ?? "-";
            $payPeriod              = $pay["payPeriod"] ?? "-";
            $payOut                 = $pay["payOut"] ?? "-";
            $employeeSSS            = $pay["employeeSSS"] ?? "-";
            $employeePhilHealth     = $pay["employeePhilHealth"] ?? "-";
            $employeePagibig        = $pay["employeePagibig"] ?? "-";
            $employeeTIN            = $pay["employeeTIN"] ?? "-";
            $basicPay               = $pay["basicPay"] ?? "0";
            $holidayPay             = $pay["holidayPay"] ?? "0";
            $overtimePay            = $pay["overtimePay"] ?? "0";
            $nightDifferentialPay   = $pay["nightDifferentialPay"] ?? "0";
            $allowance              = $pay["allowance"] ?? "0";
            $leavePay               = $pay["leavePay"] ?? "0";
            $otherEarning           = $pay["otherEarning"] ?? "0";
            $totalEarning           = $pay["totalEarning"] ?? "0";
            $lateUndertimeDeduction = $pay["lateUndertimeDeduction"] ?? "0";
            $lwopDeduction          = $pay["lwopDeduction"] ?? "0";
            $sssDeduction           = $pay["sssDeduction"] ?? "0";
            $phicDeduction          = $pay["phicDeduction"] ?? "0";
            $hdmfDeduction          = $pay["hdmfDeduction"] ?? "0";
            $taxDeduction           = $pay["withHoldingDeduction"] ?? "0";
            $otherDeduction         = $pay["otherDeduction"] ?? "0";
            $totalDeduction         = $pay["totalDeduction"] ?? "0";
            $basicSalary            = $pay["basicSalary"] ?? "0";
            $grossPay               = $pay["grossPay"] ?? "0";
            $netPay                 = $pay["netPay"] ?? "0";
            $slTotal                = $pay["slTotal"] ?? "0";
            $slUsed                 = $pay["slUsed"] ?? "0";
            $slRemaining            = $pay["slRemaining"] ?? "0";
            $vlTotal                = $pay["vlTotal"] ?? "0";
            $vlUsed                 = $pay["vlUsed"] ?? "0";
            $vlRemaining            = $pay["vlRemaining"] ?? "0";

            $ammortizationName      = $pay['ammortizationName'] ?? '';
            $ammortizationAmount    = $pay['ammortizationAmount'] ?? '';
            $ammortizationNameArr   = explode('|', $ammortizationName);
            $ammortizationAmountArr = explode('|', $ammortizationAmount);
        ?>
        <div class="card w-100 <?= (($index+1) != count($payslip) && ((($index+1) % 2) == 1) ? 'line-break' : '') ?>">
            <div class="card-header">
                <div class="card-title">
                    <div class="company"><?= $companyName ?></div>
                    <div class="address" style="font-size: .7rem;"><?= $companyAddress ?></div>
                    <div class="contact" style="font-size: .8rem;"><?= $companyContact ?></div>
                </div>
                <img src="<?= base_url('assets/upload-files/company-logo/' . $companyLogo) ?>" alt="Logo">
            </div>

            <div class="card-body">
                <!-- -----HEADER ----- -->
                <div class="table-parent">
                    <table class="table-header">
                        <tr>
                            <td>
                                <div>
                                    <b>Employee Name: </b>
                                    <div><?= $employeeCode.' - '.$employeeName ?></div>
                                </div>
                            </td>
                            <td>
                                <div>
                                    <b>Department: </b>
                                    <div><?= $departmentName.' - '.$designationName ?></div>
                                </div>
                            </td>
                            <td>
                                <div>
                                    <b>Pay Period: </b>
                                    <div><?= $payPeriod ?></div>
                                </div>
                            </td>
                            <td>
                                <div>
                                    <b>Pay Out: </b>
                                    <div><?= $payOut ?></div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div>
                                    <b>SSS Number: </b> 
                                    <div><?= $employeeSSS ?></div>
                                </div>
                            </td>
                            <td>
                                <div>
                                    <b>PhilHealth Number: </b> 
                                    <div><?= $employeePhilHealth ?></div>
                                </div>
                            </td>
                            <td>
                                <div>
                                    <b>Pag-IBIG Number: </b> 
                                    <div><?= $employeePagibig ?></div>
                                </div>
                            </td>
                            <td>
                                <div>
                                    <b>TIN: </b> 
                                    <div><?= $employeeTIN ?></div>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                <!-- -----END HEADER ----- -->

                <!-- ----- BODY ----- -->
                <div class="d-flex" style="margin-top: 0px">
                    <table class="table-body">
                        <tr class="text-center">
                            <th colspan="2">EARNINGS</th>
                        </tr>
                        <tr>
                            <th class="text-left">Basic Pay</th>
                            <td class="text-right"><?= formatAmount($basicSalary, true) ?></td>
                        </tr>
                        <tr>
                            <th class="text-left">Holiday Pay</th>
                            <td class="text-right"><?= formatAmount($holidayPay, true) ?></td>
                        </tr>
                        <tr>
                            <th class="text-left">Overtime</th>
                            <td class="text-right"><?= formatAmount($overtimePay, true) ?></td>
                        </tr>
                        <tr>
                            <th class="text-left">Night Differential</th>
                            <td class="text-right"><?= formatAmount($nightDifferentialPay, true) ?></td>
                        </tr>
                        <tr>
                            <th class="text-left">Paid Leave</th>
                            <td class="text-right"><?= formatAmount($leavePay, true) ?></td>
                        </tr>
                        <tr>
                            <th class="text-left">Allowance</th>
                            <td class="text-right"><?= formatAmount($allowance, true) ?></td>
                        </tr>
                        <tr>
                            <th class="text-left">Others</th>
                            <td class="text-right"><?= formatAmount($otherEarning, true) ?></td>
                        </tr>
                        <tr>
                            <th class="text-left">TOTAL EARNINGS</th>
                            <td class="text-right"><?= formatAmount($totalEarning, true) ?></td>
                        </tr>
                    </table>

                    <table class="table-body table-body-centered">
                        <tr class="text-center">
                            <th colspan="2">DEDUCTION</th>
                        </tr>
                        <tr>
                            <th class="text-left">Late/Undertime</th>
                            <td class="text-right"><?= formatAmount($lateUndertimeDeduction, true) ?></td>
                        </tr>
                        <tr>
                            <th class="text-left">LWOP</th>
                            <td class="text-right"><?= formatAmount($lwopDeduction, true) ?></td>
                        </tr>
                        <tr>
                            <th class="text-left">SSS</th>
                            <td class="text-right"><?= formatAmount($sssDeduction, true) ?></td>
                        </tr>
                        <tr>
                            <th class="text-left">PhilHealth</th>
                            <td class="text-right"><?= formatAmount($phicDeduction, true) ?></td>
                        </tr>
                        <tr>
                            <th class="text-left">Pag-IBIG</th>
                            <td class="text-right"><?= formatAmount($hdmfDeduction, true) ?></td>
                        </tr>
                        <tr>
                            <th class="text-left">Withholding Tax</th>
                            <td class="text-right"><?= formatAmount($taxDeduction, true) ?></td>
                        </tr>
                        <tr>
                            <th class="text-left">Others</th>
                            <td class="text-right"><?= formatAmount($otherDeduction, true) ?></td>
                        </tr>
                        <tr>
                            <th class="text-left">TOTAL DEDUCTION</th>
                            <td class="text-right"><?= formatAmount($totalDeduction, true) ?></td>
                        </tr>
                    </table>

                    <table class="table-body">
                        <tr class="text-center">
                            <th colspan="2">BALANCE</th>
                        </tr>
                        <?php
                            $totalBalance = 0;
                            if ($ammortizationNameArr && !empty($ammortizationNameArr)):
                            for ($i=0; $i<=6; $i++):
                                $name       = $ammortizationNameArr[$i] ?? '&nbsp;';
                                $tempAmount = $ammortizationAmountArr[$i] ?? '';
                                $amount     = $tempAmount ? formatAmount($tempAmount, true) : '&nbsp;';

                                $tempAmount2 = (float) $tempAmount;
                                $totalBalance += $tempAmount2;
                        ?>
                        <tr>
                            <th class="text-left"><?= $name ?></th>
                            <td class="text-right"><?= $amount ?></td>
                        </tr>
                        <?php
                            endfor;
                            endif;
                        ?>
                        <!-- <tr>
                            <th class="text-left">&nbsp;</th>
                            <td class="text-right">&nbsp;</td>
                        </tr>
                        <tr>
                            <th class="text-left">&nbsp;</th>
                            <td class="text-right">&nbsp;</td>
                        </tr>
                        <tr>
                            <th class="text-left">&nbsp;</th>
                            <td class="text-right">&nbsp;</td>
                        </tr>
                        <tr>
                            <th class="text-left">&nbsp;</th>
                            <td class="text-right">&nbsp;</td>
                        </tr>
                        <tr>
                            <th class="text-left">&nbsp;</th>
                            <td class="text-right">&nbsp;</td>
                        </tr>
                        <tr>
                            <th class="text-left">&nbsp;</th>
                            <td class="text-right">&nbsp;</td>
                        </tr> -->
                        <tr>
                            <th class="text-left">TOTAL BALANCE</th>
                            <td class="text-right"><?= formatAmount($totalBalance, true) ?></td>
                        </tr>
                    </table>
                </div>
                <!-- ----- BODY ----- -->

                <!-- ----- FOOTER ----- -->
                <div class="d-flex" style="margin-top: 0px">
                    <table class="table-footer table-footer-left text-center">
                        <tr>
                            <th>Leave Type</th>
                            <th>Quantity</th>
                            <th>Used</th>
                            <th>Remaining</th>
                        </tr>
                        <tr>
                            <td>Sick Leave</td>
                            <td><?= $slTotal ?></td>
                            <td><?= $slUsed ?></td>
                            <td><?= $slRemaining ?></td>
                        </tr>
                        <tr>
                            <td>Vaction Leave</td>
                            <td><?= $vlTotal ?></td>
                            <td><?= $vlUsed ?></td>
                            <td><?= $vlRemaining ?></td>
                        </tr>
                    </table>

                    <table class="table-footer table-footer-right">
                        <tr>
                            <th class="text-left">BASIC SALARY</th>
                            <td class="text-right font-weight-bold"><?= formatAmount($basicSalary, true) ?></td>
                        </tr>
                        <tr>
                            <th class="text-left">GROSS PAY</th>
                            <td class="text-right font-weight-bold"><?= formatAmount($grossPay, true) ?></td>
                        </tr>
                        <tr>
                            <th class="text-left">NET PAY</th>
                            <td class="text-right font-weight-bold netpay"><?= formatAmount($netPay, true) ?></td>
                        </tr>
                    </table>
                </div>
                <!-- ----- END FOOTER ----- -->
                <div class="w-100" style="margin-top:10px;">
                    <span>Generated By: </span><br>
                    <small><strong><?=$printedBy?></strong></small>-
                    <small><?=$dateTimeToday?></small>
                </div>

                <div class="demo-wrap text-center" style="top: 0; left: 0">
                    <?php for ($i=0; $i < 32 ; $i++): ?>
                        <img class="demo-bg" src="<?=base_url()?>assets/upload-files/company-logo/<?=$companyLogo;?>" alt="company logo">   
                    <?php endfor;?>
                    
                </div>
            </div>
        </div>
        <?php endforeach; ?>
        <?php endif; ?>
    </div>

    
    

    <script>
        window.addEventListener('DOMContentLoaded', function() {
            window.print();    
        })
    </script>
</body>
</html>