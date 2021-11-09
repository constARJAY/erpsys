
<?php
    get_instance()->load->helper('barcode_helper');
?>
<html>
  <head>
    <title><?= $title ?></title>
    <style>
     body {
       /* width: 230mm;
       height: 100%; */
       /* margin: 0 auto !important;
       padding: 0; */
       /* font-size: 12pt;
       background: rgb(204,204,204);  */
     }
/* 
     * {
      box-sizing: border-box;
    } */
    
     .container{
      float: none !important;
     }
     @page {
       size: A4;
       margin: 0 auto;
     }

     @media print {
       html, body {
     	width: 210mm;
     	height: 297mm;        
       }

       .pagebreak {
        clear: both;
        page-break-before: always;
    }
  
     }
   
     img{
           height: 199px;
            width: 199spx;
       }
    

  </style>
    <link rel="stylesheet" href="<?=base_url('assets/plugins/bootstrap/css/bootstrap.min.css')?>">

  </head>
  <body>
       <?php
       if($recordID =="1"){
        $i =1;
        $counter1 = 1; 
       ?>

      <div class="container" >
  			<div class="row clearfix">
          <?php foreach($barcodes as $item){
            $barcode = $item['barcode'];
            $qrPieces = $item['quantityForStockin'];

            for($countQr =0;$countQr<$qrPieces;$countQr++){
          ?>
            <div class="col-6" style="margin-top:30px;<?php if(($counter1 == 37  || $counter1 == 38) ){  echo 'margin-bottom: 30px;'; } else{ echo 'margin-bottom: 26px;';}  ?>" >
             <?php echo bar128(stripcslashes($barcode));
             
             if($counter1 == 38) {$counter1 =1;}
                else{$counter1++;}
             ?>
            </div>
            <?php }} ?>
  			</div>

       <?php }else{?>
       

      <div class="container">
  			<div class="row clearfix">
          <?php
            $counter2 =1;
            foreach($barcodes as $item){
             $barcode = $item['barcode'];
             $barcodePieces = $item['quantityForStockin'];

             for($countBarcode =0;$countBarcode<$barcodePieces;$countBarcode++){
          ?>
            <div class="col-4"   style="<?php if(($counter2 == 16  || $counter2 == 17 || $counter2 == 18) ){  echo 'margin-bottom:49px;'; } else{ echo 'margin-bottom:40px;';}  ?>" >
              <div > <!-- style="border: 1px dashed black;" -->
               <?php echo " <img src=".base_url().'/assets/upload-files/images/'.$barcode. ".png
                  class='rounded mx-auto d-block'>
                <center>".$barcode."</center>";

                if($counter2 == 18) {$counter2 =1;}
                else{$counter2++;}
                ?>
            </div>
            </div>
            <?php }} ?>
  			</div>
      </div>

      <?php }?>


  </body>
</html>