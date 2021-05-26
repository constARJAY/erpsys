<?php
    get_instance()->load->helper('barcode_helper');
?>

<html>
<head>
<title><?= $title ?></title>
<style>
p.inline {display: inline-block;}
span { font-size: 13px;}
</style>
<style type="text/css" media="print">
    @page 
    {
        size: auto;   /* auto is the initial value */
        margin: 0mm;  /* this affects the margin in the printer settings */

    }
</style>
</head>
<body onload="window.print();">
	<div style="margin: 0 2.5%">
        <br><hr><br>
        <?php

        foreach($barcodes as $index => $co) { 
            for($i=1;$i<=$co["stockInQuantity"];$i++){
            echo "<p class='inline'>".bar128(stripcslashes($co["barcode"]))."</p>&nbsp&nbsp&nbsp&nbsp";
            }  
        }  
        echo "<br><hr><br>";
              
        ?>
	</div>
</body>
</html>