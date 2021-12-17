<?php

    $companyName = $companyAddress = $companyContact = "";
    $companyLogo = "default.png";

    if ($company) {
        $companyName    = $company->companyName ?? "";
        $companyLogo    = $company->companyLogo ?? "";
        $companyAddress = ($company->companyUnitNo ?? "") ." ". ($company->companyBuildingNo ?? "") ." ". ($company->companyStreetName ?? "") ." ". ($company->companySubdivisionName ?? "") ." ". ($company->companyBarangay ?? "") ." ". ($company->companyCity ?? "") ." ". ($company->companyProvince ?? "") ." ". ($company->companyRegion ?? "") ." ". ($company->companyZipcode ?? "") ." ". ($company->companyCountry ?? "");
        $companyContact = ($company->companyTelephone ?? "") ." ". ($company->companyMobile ?? "");
    }

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PRINT PAYSLIP</title>

    <!-- <link rel="stylesheet" href="<?=base_url('assets/plugins/bootstrap/css/bootstrap.min.css')?>"> -->

    <link rel="stylesheet" href="<?= base_url('assets/custom/css/hris/generate-payslip-print.css') ?>">
</head> 
<body>


    <div class="container">

        <!--
        <div class="card w-100 line-break">
            <div class="card-header">
                <div class="card-title">
                    <div class="company">BlackCoders</div>
                    <div class="address">1701 Antel Global Corp. Barangay San Antonio Pasig City</div>
                    <div class="contact">(23) 234-1234-23</div>
                </div>
                <img src="<?= base_url('assets/images/BC-BLACK.png') ?>" alt="Logo">
            </div>

            <div class="card-body">
                <div class="table-parent">
                    <table class="table-header">
                        <tr>
                            <td>
                                <div>
                                    <b>Employee Name: </b>
                                    <div>EMP-21-00001 - Charles Vincent Verdadero</div>
                                </div>
                            </td>
                            <td>
                                <div>
                                    <b>Department: </b>
                                    <div>Operations - Junior Developer II</div>
                                </div>
                            </td>
                            <td>
                                <div>
                                    <b>Pay Period: </b>
                                    <div>November 06, 2021 - November 20, 2021</div>
                                </div>
                            </td>
                            <td>
                                <div>
                                    <b>Pay Out: </b>
                                    <div>November 30, 2021</div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div>
                                    <b>SSS Number: </b> 
                                    <div>123-1234-123</div>
                                </div>
                            </td>
                            <td>
                                <div>
                                    <b>PhilHealth Number: </b> 
                                    <div>123-1234-123</div>
                                </div>
                            </td>
                            <td>
                                <div>
                                    <b>Pag-IBIG Number: </b> 
                                    <div>123-1234-123</div>
                                </div>
                            </td>
                            <td>
                                <div>
                                    <b>TIN: </b> 
                                    <div>123-1234-123</div>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                
                <div class="d-flex" style="margin-top: 3px">
                    <table class="table-body">
                        <tr class="text-center">
                            <th colspan="2">EARNINGS</th>
                        </tr>
                        <tr>
                            <th class="text-left">Basic Pay</th>
                            <td class="text-right">15,234.23</td>
                        </tr>
                        <tr>
                            <th class="text-left">Holiday Pay</th>
                            <td class="text-right">15,234.23</td>
                        </tr>
                        <tr>
                            <th class="text-left">Overtime</th>
                            <td class="text-right">15,234.23</td>
                        </tr>
                        <tr>
                            <th class="text-left">Night Differential</th>
                            <td class="text-right">15,234.23</td>
                        </tr>
                        <tr>
                            <th class="text-left">Paid Leave</th>
                            <td class="text-right">15,203.23</td>
                        </tr>
                        <tr>
                            <th class="text-left">Allowance</th>
                            <td class="text-right">15,234.23</td>
                        </tr>
                        <tr>
                            <th class="text-left">TOTAL EARNINGS</th>
                            <td class="text-right">15,234.23</td>
                        </tr>
                    </table>
                    <table class="table-body">
                        <tr class="text-center">
                            <th colspan="2">DEDUCTION</th>
                        </tr>
                        <tr>
                            <th class="text-left">Late/Undertime</th>
                            <td class="text-right">1,234.43</td>
                        </tr>
                        <tr>
                            <th class="text-left">LWOP</th>
                            <td class="text-right">1,234.43</td>
                        </tr>
                        <tr>
                            <th class="text-left">SSS</th>
                            <td class="text-right">1,234.43</td>
                        </tr>
                        <tr>
                            <th class="text-left">PhilHealth</th>
                            <td class="text-right">1,234.43</td>
                        </tr>
                        <tr>
                            <th class="text-left">Pag-IBIG</th>
                            <td class="text-right">1,234.43</td>
                        </tr>
                        <tr>
                            <th class="text-left">With-holding Tax</th>
                            <td class="text-right">1,234.43</td>
                        </tr>
                        <tr>
                            <th class="text-left">TOTAL DEDUCTION</th>
                            <td class="text-right">15,234.23</td>
                        </tr>
                    </table>
                    <table class="table-body">
                        <tr class="text-center">
                            <th colspan="2">BALANCE</th>
                        </tr>
                        <tr>
                            <th class="text-left">Car Loan</th>
                            <td class="text-right">1,234.43</td>
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
                        </tr>
                        <tr>
                            <th class="text-left">TOTAL BALANCE</th>
                            <td class="text-right">15,234.23</td>
                        </tr>
                    </table>
                </div>

                <div class="d-flex" style="margin-top: 3px">
                    <table class="table-footer text-center">
                        <tr>
                            <th>Leave Type</th>
                            <th>Quantity</th>
                            <th>Used</th>
                            <th>Remaining</th>
                        </tr>
                        <tr>
                            <td>Sick Leave</td>
                            <td>5</td>
                            <td>1</td>
                            <td>4</td>
                        </tr>
                        <tr>
                            <td>Vaction Leave</td>
                            <td>5</td>
                            <td>1</td>
                            <td>4</td>
                        </tr>
                    </table>
                    <table class="table-footer">
                        <tr>
                            <th class="text-left">BASIC PAY</th>
                            <td class="text-right font-weight-bold">15,200.43</td>
                        </tr>
                        <tr>
                            <th class="text-left">GROSS PAY</th>
                            <td class="text-right font-weight-bold">15,200.43</td>
                        </tr>
                        <tr>
                            <th class="text-left">NET PAY</th>
                            <td class="text-right font-weight-bold netpay">15,200.43</td>
                        </tr>
                    </table>
                </div>

            </div>

            <div class="line-break"></div>
        </div>
        -->

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
            $totalEarning           = $pay["totalEarning"] ?? "0";
            $lateUndertimeDeduction = $pay["lateUndertimeDeduction"] ?? "0";
            $lwopDeduction          = $pay["lwopDeduction"] ?? "0";
            $sssDeduction           = $pay["sssDeduction"] ?? "0";
            $phicDeduction          = $pay["phicDeduction"] ?? "0";
            $hdmfDeduction          = $pay["hdmfDeduction"] ?? "0";
            $taxDeduction           = $pay["withHoldingDeduction"] ?? "0";
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
        ?>
        <div class="card w-100 <?= (($index+1) != count($payslip) && ((($index+1) % 2) == 1) ? 'line-break' : '') ?>">
            <div class="card-header">
                <div class="card-title">
                    <div class="company"><?= $companyName ?></div>
                    <div class="address" style="font-size: .7rem;"><?= $companyAddress ?></div>
                    <div class="contact" style="font-size: .8rem;"><?= $companyContact ?></div>
                </div>
                <img src="<?= base_url('assets/images/' . $companyLogo) ?>" alt="Logo">
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
                <div class="d-flex" style="margin-top: 10px">
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
                            <th class="text-left">TOTAL EARNINGS</th>
                            <td class="text-right"><?= formatAmount($totalEarning, true) ?></td>
                        </tr>
                    </table>
                    <table class="table-body">
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
                            <th class="text-left">TOTAL DEDUCTION</th>
                            <td class="text-right"><?= formatAmount($totalDeduction, true) ?></td>
                        </tr>
                    </table>
                    <table class="table-body">
                        <tr class="text-center">
                            <th colspan="2">BALANCE</th>
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
                        </tr>
                        <tr>
                            <th class="text-left">&nbsp;</th>
                            <td class="text-right">&nbsp;</td>
                        </tr>
                        <tr>
                            <th class="text-left">TOTAL BALANCE</th>
                            <td class="text-right"><?= formatAmount(0, true) ?></td>
                        </tr>
                    </table>
                </div>
                <!-- ----- BODY ----- -->

                <!-- ----- FOOTER ----- -->
                <div class="d-flex" style="margin-top: 10px">
                    <table class="table-footer text-center">
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
                    <table class="table-footer">
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