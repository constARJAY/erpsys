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
        
        page-break-before:outside;
       
    }

.grid-container {
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 50px;
  background-color: #2196F3;
  padding: 0px;
}

.grid-container > div {
  background-color: rgba(255, 255, 255, 0.8);
  text-align: center;
  padding: 5px 0;
  font-size: 30px;
}

 
.grid-item {
   
  background-color: rgba(255, 255, 255, 0.8);
  padding: 0.1px;
  margin-top: 10px;
  margin-right: 20px;
  margin-left: 1px;
  font-size: 1px;
  height: 50px;
  text-align: center;
} 
.grid-item1 {
    page-break-before:outside;  
   background-color: rgba(255, 255, 255, 0.8);
   padding: 0.1px;
   margin-top: 20px;
   margin-bottom: 50px;
   margin-right: 70px;
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
.data{
    page-break-before:outside;   
}


html { font-size: 22px; }
body { padding: 1rem; }

.grid-item {
  background-color: dodgerblue;
  color: white;
  padding: 1rem;
  height: 4rem;
}

.grid-container {
    column-count: 1;
    line-height:20px;
height:40px;
  margin: 0 auto;
  display: grid;
  margin-right: -20px;
  margin-left: -20px;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}
@media (min-width: 600px) {
  .cards { grid-template-columns: repeat(2, 1fr); }
}
@media print {
    .pagebreak { page-break-before: always; } /* page-break-after works, as well */
}

</style>
</head>
<body onload="window.print();">
	<div style="margin: 0 2.5%">
        <br><hr><br>
        <div class='grid-container'>
        <?php
        if($recordID =="1"){
            $i =1;
            $count = 1; 
            // /$code = $barcodes["barcode"];
            // echo '<pre>';
            // $quantity = $barcodes["quantityForStockin"];
            // var_dump($quantity);
            // echo '</pre>';
           // print_r($quantity);
        //    $result = 1;
        //    $quantity = array();
            foreach($barcodes as $item){
                $barcode = $item['barcode'];
                $quantity = $item['quantityForStockin'];               
                for($i=1;$i<=$quantity;$i++){
                            echo"<div class='grid-item'>".bar128(stripcslashes($barcode))."</div>";  
                    }  
                }
          

                
    
            
        }else{
            foreach($barcodes as $asset){
                $barcode = $asset['barcode'];
                $quantity = $asset['quantityForStockin'];     

                for($i=1;$i<=$quantity;$i++){
                echo "
                        <div class='grid-item1'><img class='mr-1 forimagesize' src=".base_url().'/assets/upload-files/images/'.$barcode. ".png>
                         <p class='text-center coderecord'>".$barcode."</p>
                        
                        </div>";      
                }  
            }  
            
        }
        
              
        ?>
	</div>
</body>
</html>