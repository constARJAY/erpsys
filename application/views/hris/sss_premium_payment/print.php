<style>
.border{
    border:1px solid black;
}
.border-2px{
    border: 2px solid black;
}
.border-left{
    border-left:1px solid black;    
}
.border-right{
    border-right:1px solid black;
}
.border-left-bottom{
    border-left: 1px solid black;
    border-bottom: 1px solid black;
}
.border-right-bottom{
    border-right:1px solid black;
    border-bottom:1px solid black;
}
.border-top-bottom{
    border-top:1px solid black;
    border-bottom:1px solid black;
}
.border-bottom{
    border-bottom:1px solid black;
}
.text-center{
    text-align:center;
}
.text-right{
    text-align:right;
}

</style>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?=$title?></title>
</head>
<body>
    
    <table style="width:100%;border-collapse: collapse;">
        <thead>
            <tr>
                <th colspan="2">
                            <img src="<?=base_url("assets/images/mandates-logo/sss.png")?>" height="50px" width="70px"  alt="SSS IMAGE" >
                            
                </th>
                <th colspan="6" style="font-size:70%; text-align:center">
                        <small><small>Republic of the Philipines</small></small><br>
                        <small>SOCIAL SECURITY SYSTEM</small><br>
                        <span>ELECTRONIC CONTRIBUTION <br> COLLECTION LIST</span>
                </th>
                <th colspan="2">
                        <table style="font-size:70%; width:100%; ">
                            <thead>
                                <tr>
                                    <th style="text-align:center;" class="border">SSS NUMBER</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style="text-align:center;" class="border"  >
                                        4123-7456-1234
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                </th>
            </tr>
        </thead>
        <tbody style="font-size:80%;">
            <tr>
                <td colspan="8" class="border">
                        <span>EMPLOYER/BUSINESS NAME</span><br>
                        <span><strong><?=$companyProfile["companyName"]?></strong></span>
                </td>
                <td colspan="2" class="border">
                        <span>Date Coverage</span><br>
                        <span><strong><?=$period?></strong></span>
                </td>
            </tr>
            <tr><td colspan="10" class="border-left border-right">EMPLOYER/BUSINESS ADDRESS</td></tr>
            <tr>
                <td colspan="2" class="border-left-bottom">
                        <span>Unit/Room No. Floor</span><br>
                        <span><strong><?=$companyProfile["companyUnitNo"]?></strong></span>
                </td>
                <td colspan="2" class="border-bottom">
                    <span>Building Name</span><br>
                    <span><strong><?=$companyProfile["companyBuildingNo"]?></strong></span> 
                </td>
                <td colspan="4" class="border-bottom">
                    <span>Lot. No., Block No., House No.</span><br>
                    <span><strong>-</strong></span>
                </td>
                <td colspan="2" class="border-right-bottom">
                    <span>Street Name</span><br>
                    <span><strong><?=$companyProfile["companyStreetName"]?></strong></span>
                </td>
            </tr>
            <tr>
                <td colspan="2" class="border-left-bottom">
                        <span>Subdivision</span><br>
                        <span><strong><?=$companyProfile["companySubdivisionName"]?></strong></span>
                </td>
                <td colspan="2" class="border-bottom">
                    <span>Barangay</span><br>
                    <span><strong><?=$companyProfile["companyBarangay"]?></strong></span> 
                </td>
                <td colspan="2" class="border-bottom">
                    <span>Municipality</span><br>
                    <span><strong><?=$companyProfile["companyCity"]?></strong></span> 
                </td>
                <td colspan="3" class="border-bottom">
                    <span>Province/State/Country(If abroad)</span><br>
                    <span><strong><?=$companyProfile["companyCountry"]?></strong></span>
                </td>
                <td colspan="1" class="border-right-bottom">
                    <span>Zip Code</span><br>
                    <span><strong><?=$companyProfile["companyZipcode"]?></strong></span>
                </td>
            </tr>
            <tr style="background-color:#0c6c9f; color:white;">
                <td colspan="1" class="border text-center">
                    No.
                </td>
                <td colspan="1" class="border text-center">
                    Name of Employee
                </td>
                <td colspan="1" class="border text-center">
                    SS Number
                </td>
                <td colspan="3" class="border text-center">
                    SS
                </td>
                <td colspan="1" class="border text-center">
                    EC
                </td>
                <td colspan="3" class="border text-center">
                   Total Contributions
                </td>
            </tr>
          
            
            <!-- EMPLOYEE DATA -->
            <?php 
                $totalDeduction = 0;
                $totalEmployer  = 0; 
                $grandTotal     = 0;
                foreach ($reportData as $key => $value):
                    $deduction  = $value["sssDeduction"] == "0.00" ? "0.00" : $value["sssDeduction"];
                    $employer   = $value["sssDeduction"] == "0.00" ? "0.00" : $value["sssEmployer"];
                    $total      = floatval($deduction) + floatval($employer);

                    $totalDeduction += floatval($deduction);
                    $totalEmployer  += floatval($employer); 
                    $grandTotal     += floatval($total);

            ?>
                <tr>
                    <td class="border text-center"><?php echo intval($key) + 1?></td>
                    <td class="border"><?=$value["employeeLastname"]?>, <?=$value["employeeFirstname"]?> <?=$value["employeeMiddlename"]?></td>
                    <td class="border text-center"><?=$value["employeeSSS"]?></td>
                    <td colspan="3" class="border text-right"><?=formatAmount($deduction, true)?></td>
                    <td colspan="1" class="border text-right"><?=formatAmount($employer, true)?> </td>
                    <td colspan="3" class="border text-right"><?=formatAmount($total, true)?></td>
                </tr>
            <?php endforeach;?>
            <!-- END EMPLOYEE DATA -->

            <tr>
                <td class="border" colspan="3">Sub-Total</td>
                <td colspan="3"  class="border text-right"><?=formatAmount($totalDeduction,true)?></td>
                <td class="border text-right"><?=formatAmount($totalEmployer, true)?></td>
                <td colspan="3"  class="border text-right"><?=formatAmount($grandTotal, true)?></td>
            </tr>
            <tr style="background-color:#0c6c9f;color:white;">
                <td class="border" colspan="9">Total Amount Due</td>
                <td class="border text-right"><?=formatAmount($grandTotal, true)?></td>
            </tr>

        </tbody>
    </table>
    <script>
        window.print();
    </script>
</body>
</html>

