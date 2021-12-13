<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $title ?></title>

    <link rel="stylesheet" href="<?=base_url('assets/plugins/bootstrap/css/bootstrap.min.css')?>">

    <style>
        .label {
            background: black !important;
            font-weight: bold;
        }

        .ans {
            font-size: .9rem;
            color: black;
        }
    </style>
</head> 
<body>
    <div class="row">

        <?php if ($payslip && !empty($payslip)) : ?>
        <?php foreach($payslip as $pay) : ?>
        
            <div class="col-12 border" style="height: 50vh;">
                <table class="table table-bordered text-wrap" style="vertical-align: middle;">
                    <thead>
                        <tr class="py-0">
                            <th style="width: 11%"></th>
                            <th style="width: 11%"></th>
                            <th style="width: 11%"></th>
                            <th style="width: 11%"></th>
                            <th style="width: 11%"></th>
                            <th style="width: 11%"></th>
                            <th style="width: 11%"></th>
                            <th style="width: 11%"></th>
                            <th style="width: 11%"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- ----- HEADER ----- -->
                        <tr class="py-0">
                            <th class="label">Employee Code</th>
                            <td colspan="2" class="ans text-wrap">EMP-21-00001</td>
                            <th class="label">Pay Period</th>
                            <td colspan="2" class="ans text-wrap">November 01, 2021 - November 15, 2021</td>
                            <th class="label">Employee Status</th>
                            <td colspan="2" class="ans text-wrap">Active</td> 
                        </tr>
                        <tr class="py-0">
                            <th class="label">Employee Name</th>
                            <td colspan="2" class="ans text-wrap">Arjay P. Diangzon</td>
                            <th class="label">Pay Out</th>
                            <td colspan="2" class="ans text-wrap">November 18, 2021</td>
                            <th class="label">Department</th>
                            <td colspan="2" class="ans text-wrap">
                                <div>Operations</div>
                                <small>Junior Developer</small>
                            </td> 
                        </tr>
                        <!-- ----- HEADER ----- -->
                        <tr class="py-0">
                            <th colspan="2" class="label">SSS No.</th>
                            <td colspan="2" class="ans">123-123-123</td>
                            <th colspan="2" class="label">PhilHealth No.</th>
                            <td colspan="3" class="ans">123-1234-123</td>
                        </tr>
                        <tr class="py-0">
                            <th colspan="2" class="label">Pagibig No.</th>
                            <td colspan="2" class="ans">123-412-123</td>
                            <th colspan="2" class="label">TIN</th>
                            <td colspan="3" class="ans" colspan="2">123-123-123-123</td>
                        </tr>
                        <tr class="py-0">
                            <th class="text-center" colspan="3">EARNINGS</th>
                            <th class="text-center" colspan="3">DEDUCTIONS</th>
                            <th class="text-center" colspan="3">BALANCE</th>
                        </tr>
                        <tr class="py-0">
                            <!-- ----- EARNINGS ----- -->
                            <th>Category</th>
                            <th>Hours</th>
                            <th>Amount</th>
                            <!-- ----- END EARNINGS ----- -->

                            <!-- ----- DEDUCTION ----- -->
                            <th colspan="2">Category</th>
                            <th>Amount</th>
                            <!-- ----- END DEDUCTION ----- -->

                            <!-- ----- BALANCE ----- -->
                            <th colspan="2">Category</th>
                            <th>Amount</th>
                            <!-- ----- END BALANCE ----- -->
                        </tr>
                        <tr class="py-0">
                            <!-- ----- EARNINGS ----- -->
                            <td>Basic Pay</td>
                            <td></td>
                            <td></td>
                            <!-- ----- END EARNINGS ----- -->

                            <!-- ----- DEDUCTION ----- -->
                            <td colspan="2"></td>
                            <td></td>
                            <!-- ----- END DEDUCTION ----- -->

                            <!-- ----- BALANCE ----- -->
                            <td colspan="2"></td>
                            <td></td>
                            <!-- ----- END BALANCE ----- -->
                        </tr>
                        <tr class="py-0">
                            <!-- ----- EARNINGS ----- -->
                            <th colspan="2">GROSS PAY</th>
                            <th>P 15,210.10</th>
                            <!-- ----- END EARNINGS ----- -->

                            <!-- ----- DEDUCTION ----- -->
                            <th colspan="2">TOTAL DEDUCTION</th>
                            <th>P 15,210.10</th>
                            <!-- ----- END DEDUCTION ----- -->

                            <!-- ----- BALANCE ----- -->
                            <th colspan="2">TOTAL DEDUCTION</th>
                            <th>P 15,210.10</th>
                            <!-- ----- END BALANCE ----- -->
                        </tr>
                        <tr class="py-0">
                            <th colspan="2">Leave Type</th>
                            <th>Quantity</th>
                            <th>Used</th>
                            <th>Remaining</th>
                            <th colspan="2">HOURLY RATE</th>
                            <th colspan="2">P 12,102</th>
                        </tr>
                        <tr class="py-0">
                            <th colspan="2">Sick Leave</th>
                            <th>5</th>
                            <th>1</th>
                            <th>4</th>
                            <th colspan="2">BASIC RATE</th>
                            <th colspan="2">P 12,102</th>
                        </tr>
                        <tr class="py-0">
                            <th colspan="2">Vacation Leave</th>
                            <th>6</th>
                            <th>3</th>
                            <th>3</th>
                            <th colspan="2">NET PAY</th>
                            <th colspan="2">P 12,102</th>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr class="py-0">
                            <th style="width: 11%"></th>
                            <th style="width: 11%"></th>
                            <th style="width: 11%"></th>
                            <th style="width: 11%"></th>
                            <th style="width: 11%"></th>
                            <th style="width: 11%"></th>
                            <th style="width: 11%"></th>
                            <th style="width: 11%"></th>
                            <th style="width: 11%"></th>
                        </tr>
                    </tfoot>
                </table>
            </div>

        <?php endforeach; ?>
        <?php endif; ?>

    </div>

    <script>
        window.print();    
    </script>
</body>
</html>