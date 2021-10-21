<?php
    get_instance()->load->helper('barcode_helper');
?>
<html>
<head>
<title><?= $title ?></title>
<style type="text/css" media="print">
 @page 
    {
        size: auto;   /* auto is the initial value */
        margin: 0mm;  /* this affects the margin in the printer settings */

    }

.grid-container {
  display: grid;
  grid-template-columns: auto auto auto;
  background-color: #2196F3;
  padding: 10px;
}


.grid-item {
  background-color: rgba(255, 255, 255, 0.8);
  padding: 1px;
  font-size: 30px;
  text-align: center;
}
.coderecord{
    font-size: 12px;
    margin-top: -20px;

}
.forimagesize{
    height: 200px;
    width: 200px;
    
}

</style>
</head>
<body onload="window.print();">
	<div style="margin: 0 2.5%">
        <br><hr><br>
        <div class='grid-container'>
        <?php
        if($recordID =="1"){
            foreach($barcodes as $index => $co) {
                for($i=1;$i<=$co["quantityForStockin"];$i++){
                echo"
                        <div class='grid-item'>".bar128(stripcslashes($co["barcode"]))."</div>";      
                }  
            }  

            echo "</hr></div>";
        }else{
            foreach($barcodes as $index => $co) {
                for($i=1;$i<=$co["quantityForStockin"];$i++){
                echo "
                        <div class='grid-item'><img class='mr-1 forimagesize' src=".base_url().'/assets/upload-files/images/'.$co["barcode"]. ".png>
                         <p class='text-center coderecord'>".$co["barcode"]."</p>
                        
                        </div>";      
                }  
            }  
            echo "<hr>";
        }
        
              
        ?>
	</div>
</body>
</html>