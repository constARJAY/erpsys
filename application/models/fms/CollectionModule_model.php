<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class CollectionModule_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
    }

    // ----- GET BILLING CONTENT -----
    public function getBillingActivity($collectionID = 0, $billingID = 0)
    {
        $collectionItems = [];
        if ($collectionID) {
            $sql   = "SELECT * FROM fms_collection_items_tbl WHERE collectionID = $collectionID";
            $query = $this->db->query($sql);
            $collectionItems = $query ? $query->result_array() : [];
        }

        $sql   = "
        SELECT 
            * 
        FROM 
            fms_billing_items_tbl 
        WHERE 
            billingID = $billingID AND 
            pendingAmount > 0";
        $query = $this->db->query($sql);
        $result = $query ? $query->result_array() : [];

        $data = [];
        foreach ($result as $res) {
            $billingItemID = $res["billingItemID"];
            $pendingAmount = $res["pendingAmount"];

            $temp = $res;
            foreach ($collectionItems as $col) {
                $colBillingItemID = $col["billingItemID"];
                if ($billingItemID == $colBillingItemID) {
                    $temp = $col;
                    $temp["pendingAmount"] = $pendingAmount;
                    $temp["inputAmount"]   = $col["amount"];
                }
            }
            array_push($data, $temp);
        }
        return $data;
    }

    public function getBillingContent($collectionID = 0, $clientID = 0, $dateFrom = '2021-05-12', $dateTo = '2021-05-12')
    {
        $data = [];
        if ($clientID && $dateFrom && $dateTo) {
            $sql = "
            SELECT 
                * 
            FROM 
                fms_billing_tbl 
            WHERE 
                clientID = $clientID AND 
                billingStatus = 1 AND
                isBillingDone = 0 AND
                submittedAt BETWEEN '$dateFrom 00:00:00' AND '$dateTo 23:59:59'";
            $query  = $this->db->query($sql);
            $result = $query ? $query->result_array() : [];

            
            foreach ($result as $res) {
                $temp = [
                    "billingID"        => $res["billingID"],
                    "billingVatAmount" => $res["billingVatAmount"],
                    "billingActivity"  => $this->getBillingActivity($collectionID, $res["billingID"]),
                ];
                array_push($data, $temp);
            }
        }
        return $data;
    }
    // ----- END GET BILLING CONTENT -----


    // ----- GET COLLECTION DATA -----
    public function getCollectionActivities($collectionID = 0) 
    {
        $sql    = "SELECT * FROM fms_collection_items_tbl WHERE collectionID = $collectionID";
        $query  = $this->db->query($sql);
        $result = $query ? $query->result_array() : [];
        return $result;
    }

    public function getCollectionContent($collectionID = 0)
    {
        $sql    = "
        SELECT 
            fbt.*,
            CONCAT(helt.employeeFirstname, ' ', helt.employeeLastname) AS preparedBy
        FROM 
            fms_collection_tbl AS fbt
            LEFT JOIN hris_employee_list_tbl AS helt ON fbt.employeeID = helt.employeeID
            WHERE fbt.collectionID = $collectionID";
        $query  = $this->db->query($sql);
        $result = $query ? $query->row() : false;

        $data = [];
        if ($result) {
            $data = [
                "collectionID"            => $result->collectionID,
                "createdAt"               => $result->createdAt,
                "employeeID"              => $result->employeeID,
                "collectionStatus"        => $result->collectionStatus,
                "submittedAt"             => $result->submittedAt,
                "collectionReason"        => $result->collectionReason,
                "clientID"                => $result->clientID,
                "clientCode"              => $result->clientCode,
                "clientName"              => $result->clientName,
                "clientContactNumber"     => $result->clientContactNumber,
                "clientAddress"           => $result->clientAddress,
                "collectionComment"       => $result->collectionComment,
                "collectionPaymentMethod" => $result->collectionPaymentMethod,
                "dateFrom"                => $result->dateFrom,
                "dateTo"                  => $result->dateTo,
                "collectionSubtotal"      => $result->collectionSubtotal,
                "collectionVatAmount"     => $result->collectionVatAmount,
                "collectionGrandTotal"    => $result->collectionGrandTotal,
                "activities" => [
                    "billingActivity" => $this->getCollectionActivities($collectionID),
                ]
            ];
        }
        return $data;
    }
    // ----- END GET COLLECTION DATA -----


    // ----- SAVE COLLECTION DATA -----
    public function deleteActivity($collectionID = 0)
    {
        $query = $this->db->delete("fms_collection_items_tbl", ["collectionID" => $collectionID]);
        return $query ? true : false;
    }

    public function insertActivity($data = [])
    {
        if ($data && count($data) > 0) {
            $query = $this->db->insert_batch("fms_collection_items_tbl", $data);
            return $query ? true : false;
        }
        return false;
    }

    public function getSpecificBillingActivity($billingItemID = 0)
    {
        $sql   = "SELECT * FROM fms_billing_items_tbl WHERE billingItemID = $billingItemID";
        $query = $this->db->query($sql);
        return $query ? $query->row() : false;
    }

    public function updateBillingActivity($billingItemID = 0, $amount = 0)
    {
        $billingActivity = $this->getSpecificBillingActivity($billingItemID);
        if ($billingActivity) {
            $pendingAmount = $billingActivity->pendingAmount;
            $newPendingAmount = $pendingAmount - $amount;
            $query = $this->db->update("fms_billing_items_tbl", ["pendingAmount" => $newPendingAmount], ["billingItemID" => $billingItemID]);
            return $query ? true : false;
        }
        return false;
    }

    public function updateBilling()
    {
        $sql    = "SELECT * FROM fms_billing_tbl";
        $query  = $this->db->query($sql);
        $result = $query ? $query->result_array() : [];
        foreach ($result as $res) {
            $billingID  = $res["billingID"];
            $sqlItem    = "SELECT SUM(pendingAmount) AS pending FROM fms_billing_items_tbl WHERE billingID = $billingID";
            $queryItem  = $this->db->query($sqlItem);
            $resultItem = $queryItem ? $queryItem->row() : false;
            if ($resultItem) {
                $pending = $resultItem->pending;
                if ($pending <= 0.00) {
                    $queryBill = $this->db->update("fms_billing_tbl", ["isBillingDone" => 1], ["billingID" => $billingID]);
                }
            }
        }
    }

    public function saveCollection($collectionID, $data, $activities)
    {
        $sessionID = $this->session->has_userdata("adminSessionID") ? $this->session->userdata("adminSessionID") : 1;

        if (!$collectionID) {
            $query = $this->db->insert("fms_collection_tbl", $data);
            $collectionID = $this->db->insert_id();
        } else {
            $query = $this->db->update("fms_collection_tbl", $data, ["collectionID" => $collectionID]);
            $deleteActivity = $this->deleteActivity($collectionID);
        }

        $collectionStatus = $data["collectionStatus"];
        $activityData = [];
        if ($activities && count($activities) > 0) {
            foreach ($activities as $activity) {
                $billingItemID  = $activity["billingItemID"];
                $amount         = $activity["amount"];
                if ($collectionStatus == 1) {
                    $updateActivity = $this->updateBillingActivity($billingItemID, $amount);
                }
    
                $temp = [
                    "collectionID"      => $collectionID,
                    "billingItemID"     => $billingItemID,
                    "activity"          => $activity["activity"],
                    "type"              => $activity["type"],
                    "checkNumber"       => $activity["checkNumber"],
                    "checkDate"         => $activity["checkDate"],
                    "depositoryAccount" => $activity["depositoryAccount"],
                    "termPayment"       => $activity["termPayment"],
                    "vatType"           => $activity["vatType"],
                    "vatAmount"         => $activity["vatAmount"],
                    "amount"            => $amount,
                    "remarks"           => $activity["remarks"],
                    "createdBy"         => $sessionID,
                    "updatedBy"         => $sessionID,
                ];
                array_push($activityData, $temp);
            }
            $insertActivity = $this->insertActivity($activityData);
            $updateBilling  = $this->updateBilling();
        }
        
        return $query ? "true|Successfully submitted|$collectionID|".date("Y-m-d") : "false|System error: Please contact the system administrator for assistance!";
    }
    // ----- END SAVE COLLECTION DATA -----

}
