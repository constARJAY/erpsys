<?php
defined('BASEPATH') OR exit('No direct script access allowed');

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

use PhpOffice\PhpSpreadsheet\Helper\Sample;
use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\RichText\RichText;
use PhpOffice\PhpSpreadsheet\Shared\Date;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Color;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Style\Font;
use PhpOffice\PhpSpreadsheet\Style\NumberFormat;
use PhpOffice\PhpSpreadsheet\Style\Protection;
use PhpOffice\PhpSpreadsheet\Worksheet\Drawing;
use PhpOffice\PhpSpreadsheet\Worksheet\PageSetup;
use PhpOffice\PhpSpreadsheet\Worksheet\ColumnDimension;
use PhpOffice\PhpSpreadsheet\Worksheet\HeaderFooterDrawing;
use PhpOffice\PhpSpreadsheet\Worksheet;

class Purchase_order extends CI_Controller {

    public function __construct()
    {
        parent::__construct();
        $this->load->model("ims/PurchaseOrder_model", "purchaseorder");
        isAllowed(47);
    }

    public function index()
    {
        $data["title"] = "Purchase Order";

        $this->load->view("template/header",$data);
        $this->load->view("ims/purchase_order/index");
        $this->load->view("template/footer");
    }

    public function saveSignedPurchaseOrder()
    {
        $purchaseOrderID = $this->input->post("purchaseOrderID");
        $employeeID      = $this->input->post("employeeID");
        if (isset($_FILES["files"])) {
            $uploadedFile = explode(".", $_FILES["files"]["name"]);
            $uploadName   = $uploadedFile[0];
            $extension    = $uploadedFile[1];
            $filename     = $uploadName.time().'.'.$extension;

            $folderDir = "assets/upload-files/purchase-order/";
            if (!is_dir($folderDir)) {
                mkdir($folderDir);
            }

            $targetDir = $folderDir.$filename;
            if (move_uploaded_file($_FILES["files"]["tmp_name"], $targetDir)) {
                
                $saveSignedPurchaseOrder = $this->purchaseorder->saveSignedPurchaseOrder($purchaseOrderID, $employeeID, $filename);
                echo json_encode($saveSignedPurchaseOrder);
            }
        }
    }

    public function saveChangeRequestForm()
    {
        $purchaseOrderID = $this->input->post("purchaseOrderID");
        echo json_encode($this->purchaseorder->saveChangeRequestForm($purchaseOrderID));
    }





    // ----- ***** EXCEL ***** -----
    public function downloadExcel(){
        $purchaseOrderID = $this->input->get("id");
        $data = $this->purchaseorder->getPurchaseOrderExcelData($purchaseOrderID);
        downloadExcel("Purchase Order", $data);
    }
    // ----- ***** END EXCEL ***** -----

}
