<?php 
    // function getApprover($moduleID){
    //     $CI=&get_instance();
	// 	$query      = $CI->db->query("SELECT approvalUserAccounts FROM `gen_approval_tbl` WHERE moduleID = '$moduleID' "); 
    //     $result     = $query->num_rows() < 1 ? "undefined" : $query->result_array();
    //     $returnData = $result == "undefined" ? "undefined" : $result[0]["approvalUserAccounts"];
	// 	return $returnData;     
    // }
    // PARAMETER : table_name, action, 
    // $sessionID = $CI->session->has_userdata('adminSessionID') ? $CI->session->userdata('adminSessionID') : 0;


    function insertAudit(   $action     = "insert", 
                            $tableName  = "login_tbl", 
                            $fileCode   = false,
                            $oldData    = false, 
                            $newData    = false,
                            $extParam   = false)
        {
        $CI             =& get_instance();
        $sessionID      = $CI->session->has_userdata('adminSessionID') ? $CI->session->userdata('adminSessionID') : 0;
        $userQuery      = $CI->db->query("SELECT CONCAT(employeeLastname,', ',employeeFirstname,' ',employeeMiddlename) AS fullname FROM hris_employee_list_tbl WHERE employeeID = '$sessionID'");
        $userResult     = $userQuery->row() ?? false;
        if ($userResult) 
        {
            $fullname       = $userResult->fullname;
            $auditColumn    = null;
            $auditOldData   = null;
            $auditNewData   = null;
            $moduleName     = "MODULE NAME";
            $dateToday      = date_create();
    
            
            switch ($tableName) {
                case 'hris_award_tbl':
                        $moduleName     = "Award Masterfile";
                        $moduleID       = "27";
                    break;
                case 'ims_inventory_item_tbl':
                    $moduleName     = "Inventory Item Masterfile";
                    $moduleID       = "4";
                    break;
                case 'ims_inventory_classification_tbl':
                    $moduleName     = "Inventory Classification Masterfile";
                    $moduleID       = "6";
                    break;
                case 'ims_inventory_condition_tbl':
                    $moduleName     = "Inventory Condition Masterfile";
                    $moduleID       = "9";
                    break;
                case 'pms_category_tbl':
                    $moduleName     = "Project Category Masterfile";
                    $moduleID       = "13";
                    break;
                case 'hris_designation_tbl':
                    $moduleName     = "Designation Masterfile";
                    $moduleID       = "14";
                    break;
                case 'hris_leave_tbl':
                    $moduleName     = "Leave Type Masterfile";
                    $moduleID       = "21";
                    break;
                case 'hris_branch_tbl':
                    $moduleName     = "Branch Masterfile";
                    $moduleID       = "25";
                    break;
                case 'ims_services_tbl':
                    $moduleName     = "Service Masterfile";
                    $moduleID       = "131";
                    break;
                case 'ims_inventory_vehicle_tbl':
                    $moduleName     = "Vehicle Masterfile";
                    $moduleID       = "135";
                    break;
                case 'ims_uom_tbl':
                    $moduleName     = "Unit of Measurement Masterfile";
                    $moduleID       = "130";
                    break;
                case 'pms_project_milestone_tbl':
                    $moduleName     = "Project Milestone Masterfile";
                    $moduleID       = "10";
                    break;
                case 'fms_bank_tbl':
                    $moduleName     = "Bank Masterfile";
                    $moduleID       = "14";
                    break;
                case 'hris_department_tbl':
                    $moduleName     = "Department Masterfile";
                    $moduleID       = "18";
                    break;
                case 'hris_loan_tbl':
                    $moduleName     = "Loan Type Masterfile";
                    $moduleID       = "22";
                    break;
                case 'hris_qualification_tbl':
                    $moduleName     = "Qualification Masterfile";
                    $moduleID       = "26";
                    break;
                case 'ims_inventory_asset_tbl':
                    $moduleName     = "Inventory Asset Masterfile";
                    $moduleID       = "140";
                    break;
                case 'ims_inventory_storage_tbl':
                    $moduleName     = "Inventory Storage Masterfile";
                    $moduleID       = "7";
                    break;
                case 'pms_project_list_tbl':
                    $moduleName     = "Project List Masterfile";
                    $moduleID       = "11";
                    break;
                case 'fms_chart_of_accounts_tbl':
                    $moduleName     = "Chart of Account";
                    $moduleID       = "15";
                    break;
                case 'hris_requirement_tbl':
                    $moduleName     = "Requirement Masterfile";
                    $moduleID       = "19";
                    break;
                case 'hris_code_conduct_category_tbl':
                    $moduleName     = "Code of Conduct Category";
                    $moduleID       = "23";
                    break;
                case 'hris_training_development_setup_tbl':
                    $moduleName     = "Training and Development Masterfile";
                    $moduleID       = "31";
                    break;
                case 'ims_inventory_category_tbl':
                    $moduleName     = "Inventory Category Masterfile";
                    $moduleID       = "5";
                    break;
                case 'ims_inventory_vendor_tbl':
                    $moduleName     = "Inventory Vendor Masterfile";
                    $moduleID       = "8";
                    break;
                case 'pms_client_tbl':
                    $moduleName     = "Client Masterfile";
                    $moduleID       = "12";
                    break;
                case 'hris_holiday_tbl':
                    $moduleName     = "Holiday Masterfile";
                    $moduleID       = "20";
                    break;
                case 'hris_code_conduct_section_tbl':
                    $moduleName     = "Code of Conduct Section";
                    $moduleID       = "24";
                    break;
                case 'hris_examination_tbl':
                    $moduleName     = "Examination Masterfile";
                    $moduleID       = "32";
                    break;
                case 'fms_liquidation_tbl':
                    $moduleName     = "Liquidation Form";
                    $moduleID       = "132";
                    break;
                case 'pms_bill_material_tbl':
                    $moduleName     = "Bill of Material Form";
                    $moduleID       = "39";
                    break;
                case 'pms_cost_estimate_tbl':
                    $moduleName     = "Cost Estimate Form";
                    $moduleID       = "38";
                    break;
                case 'pms_milestone_builder_tbl':
                    $moduleName     = "Milestone Builder";
                    $moduleID       = "89";
                    break;
                case 'pms_personnel_requisition_tbl':
                    $moduleName     = "Personnel Requisition form";
                    $moduleID       = "50";          
                    break; 
                case 'pms_timeline_builder_tbl':
                    $moduleName     = "Project Timeline Builder";
                    $moduleID       = "90";
                    break;
                case 'pms_sign_off_tbl':
                    $moduleName     = "Sign Off";
                    $moduleID       = "52";
                    break;
                case 'hris_employee_list_tbl':
                    $moduleName     = "Personnel Module";
                    $moduleID       = "114";
                    break;
                case 'ims_bid_recap_tbl':
                    $moduleName     = "Bid Recap";
                    $moduleID       = "40";
                    break;
                case 'ims_change_request_tbl':
                    $moduleName     = "Change Request";
                    $moduleID       = "138";
                    break;
                case 'ims_inventory_disposal_tbl':
                    $moduleName     = "Disposal";
                    $moduleID       = "36";
                    break;
                case 'ims_equipment_borrowing_tbl':
                    $moduleName     = "Equipment Borrowing";
                    $moduleID       = "43";
                    break;
                case 'ims_inventory_incident_tbl':
                    $moduleName     = "Inventory Incident";
                    $moduleID       = "44";
                    break;
                case 'ims_inventory_price_list_tbl':
                        if($extParam == "item"){
                            $moduleName     = "Item Price List";
                            $moduleID       = "127";
                        }else{
                            $moduleName     = "Asset Price List";
                            $moduleID       = "141"; 
                        }
                    break;
                case 'ims_inventory_receiving_tbl':
                    $moduleName     = "Inventory Receiving";
                    $moduleID       = "33";
                    break;
                case 'ims_stock_in_item_tbl':
                    $moduleName     = "Inventory Stock In";
                    $moduleID       = "129";
                    break;
                case 'ims_inventory_validation_tbl':
                    $moduleName     = "Inventory Validation";
                    $moduleID       = "126";
                    break;
                case 'ims_material_request_tbl':
                    $moduleName     = "Material Request";
                    $moduleID       = "137";
                    break;
                case 'ims_material_usage_tbl':
                    $moduleName     = "Material Usage";
                    $moduleID       = "45";
                    break;
                case 'ims_material_withdrawal_tbl':
                    $moduleName     = "Material Withdrawal";
                    $moduleID       = "42";
                    break;
                case 'ims_purchase_order_tbl':
                    $moduleName     = "Purchase Order";
                    $moduleID       = "47";
                    break;
                case 'ims_purchase_request_tbl':
                    $moduleName     = "Purchase Request";
                    $moduleID       = "46";
                    break;
                case 'ims_return_item_tbl':
                    $moduleName     = "Return Item";
                    $moduleID       = "35";
                    break;
                case 'ims_service_completion_tbl':
                    $moduleName     = "Service Completion";
                    $moduleID       = "128";
                    break;
                case 'ims_stock_out_tbl':
                    $moduleName     = "Inventory Stock Out";
                    $moduleID       = "139";
                    break;
                case 'ims_transfer_request_tbl':
                    $moduleName     = "Inventory Transfer";
                    $moduleID       = "37";
                    break;
                default:
                    $moduleName     = "Login";
                    $moduleID       = "0";
                    break;
            }
    
            switch ($action) {
                case 'insert':
                    $auditDescription  = $fullname." added the ".$fileCode." in ".$moduleName;
                    break;
                case 'update':
                        $tempAuditColumn    = [];
                        $tempAuditOldData   = [];
                        $tempAuditNewData   = [];
                        $arrayDif           = array_diff_assoc($newData,$oldData);
                        
                        foreach ($arrayDif as $key => $value) {
                            array_push($tempAuditColumn, $key);
                            array_push($tempAuditOldData, $oldData[$key]);
                            array_push($tempAuditNewData, $newData[$key]);
                        }
    
                        $auditColumn    = join("|",$tempAuditColumn);
                        $auditOldData   = join("|",$tempAuditOldData);
                        $auditNewData   = join("|",$tempAuditNewData);
    
                        $auditDescription   = $fullname." updated the ".$fileCode." in ".$moduleName;
                    break;
    
                case 'login':
                            $auditDescription  = $fullname." successfully logged in";
                    break;
                default:
                            $auditDescription  = $fullname." logged out";
                    break;
            }
    
            $data       = [
                "moduleID"          => $moduleID,
                "moduleName"        => $moduleName,
                "auditType"         => $action,
                "tableName"         => $tableName,
                "auditDescription"  => $auditDescription,
                "auditColumn"       => $auditColumn,
                "auditOldData"      => $auditOldData,
                "auditNewData"      => $auditNewData,
                "accountablePerson" => $fullname,
                "createdAt"         => date_format($dateToday, "Y-m-d H:i:s")
            ];
    
            $query = $CI->db->insert("gen_audit_tbl", $data);
            return $query ? true : false;
        }
        return false;
    }



    function getBreakOpposeData($inEmployeeID = 0){
        $CI         =& get_instance();
        $db2        = $CI->load->database("biotime", TRUE);
        $date       = date_create();
        $dateToday  = date_format($date,"Y/m/d");
        $dayToday   = date_format($date,"d"); 
        $monthToday = date_format($date,"m");

        $where = $inEmployeeID ? "AND helt.employeeID = $inEmployeeID" : "";

        $data   = [];
        $sql    = "SELECT
                    helt.employeeID AS employeeID, helt.employeeCode AS employeeCode, CONCAT(employeeLastname,', ', employeeFirstname,' ',employeeMiddlename) AS fullname, departmentName, designationName,
                    scheduleBreakDuration
                    FROM hris_employee_list_tbl AS helt 
                        LEFT JOIN hris_department_tbl AS hdept USING(departmentID)
                        LEFT JOIN hris_designation_tbl AS hdest ON hdept.departmentID = hdest.departmentID
                        LEFT JOIN hris_employee_attendance_tbl AS heat ON helt.employeeID = heat.employeeID
                    WHERE heat.scheduleDate = DATE(NOW()) $where GROUP BY helt.employeeID";
        $query  = $CI->db->query($sql);

        foreach ($query->result_array() as $key => $value) {
            $employeeID = $value["employeeID"];

            $sql2   = "SELECT SUM(breakDuration) AS breakDuration 
                            FROM hris_attendance_break_tbl 
                        WHERE employeeID = '$employeeID' AND MONTH(breakIn) = MONTH(NOW()) AND DAY(breakIn) = DAY(NOW())";
            $query2   = $db2->query($sql2);
            $result2  = $query2 ? $query2->row() : null;

            if ($result2) {
                $breakDuration  = $result2 ? $result2->breakDuration : 0;
                if(floatval($breakDuration) > floatval($value["scheduleBreakDuration"]) && $employeeID != "1"  ){
                    $temp = [
                        "employeeCode"      => $value["employeeCode"],
                        "fullname"          => $value["fullname"],
                        "designationName"   => $value["designationName"],
                        "departmentName"    => $value["departmentName"],
                        "breakDuration"     => $breakDuration
                    ];
                    array_push($data, $temp);
                }
            }
            
        }

        return $data;
        // $sql    = "SELECT GROUP_CONCAT(emp_code) AS id FROM personnel_employee WHERE update_time IS NULL";
        // $query  = $db2->query($sql);
        // $result = $query ? $query->row() : false;
        // $id     = $result ? $result->id : "";

        // $sql2   = "SELECT * FROM hris_employee_list_tbl WHERE FIND_IN_SET(employeeID, '$id') AND employeeStatus IN (1,2,5) AND scheduleID <> 0";
        // $query2 = $this->db->query($sql2);
        // return $query2 ? $query2->result_array() : [];

        // Employee Code

        // Employee Name

        // - Department 
        // - Designation

        // Duration




        
    }




?>