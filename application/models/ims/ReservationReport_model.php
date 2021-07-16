<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class ReservationReport_model extends CI_Model {

    public function getReservationData($timelineBuilderID, $dateFrom, $dateTo)
    {
        $data = [
            [
                "id" => 1,
                "projectCode" => "PRJ-21-00001",
                "projectName" => "BlackBox Accounting System",
                "itemName" => "Towel",
                "itemUom" => "piece",
                "reservedQuantity" => 5,
                "dateReserved" => "2021-05-12",
                "materialUsageCode" => "MTR-21-00001"
            ],
            [
                "id" => 2,
                "projectCode" => "PRJ-21-00001",
                "projectName" => "BlackBox Accounting System",
                "itemName" => "Towel",
                "itemUom" => "piece",
                "reservedQuantity" => 5,
                "dateReserved" => "2021-05-12",
                "materialUsageCode" => "MTR-21-00001"
            ],
            [
                "id" => 3,
                "projectCode" => "PRJ-21-00001",
                "projectName" => "BlackBox Accounting System",
                "itemName" => "Towel",
                "itemUom" => "piece",
                "reservedQuantity" => 5,
                "dateReserved" => "2021-05-12",
                "materialUsageCode" => "MTR-21-00001"
            ],
            [
                "id" => 4,
                "projectCode" => "PRJ-21-00001",
                "projectName" => "BlackBox Accounting System",
                "itemName" => "Towel",
                "itemUom" => "piece",
                "reservedQuantity" => 5,
                "dateReserved" => "2021-05-12",
                "materialUsageCode" => "MTR-21-00001"
            ],
            [
                "id" => 5,
                "projectCode" => "PRJ-21-00001",
                "projectName" => "BlackBox Accounting System",
                "itemName" => "Towel",
                "itemUom" => "piece",
                "reservedQuantity" => 5,
                "dateReserved" => "2021-05-12",
                "materialUsageCode" => "MTR-21-00001"
            ],
        ];
        return $data;
    }

}
