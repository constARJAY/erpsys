<?php
defined('BASEPATH') OR exit('No direct script access allowed');
date_default_timezone_set('Asia/Manila');

class TimekeepingModule_model extends CI_Model {


    // ---------- ********** SEARCH TIMESHEET ********** ----------
    public function getColumnLabel($startDate = "", $endDate = "")
    {
        $data = [];
        if ($startDate && $endDate) {
            $startDate = $startDate." 00:00:00";
            $endDate   = $endDate." 23:59:59";
            $period = new DatePeriod(
                new DateTime($startDate),
                new DateInterval('P1D'),
                new DateTime($endDate)
            );
            foreach($period as $prd) {
                $temp = [
                    "month"  => $prd->format("M"),
                    "day"    => $prd->format("D"),
                    "date"   => $prd->format("Y-m-d"),
                    "number" => $prd->format("d")
                ];
                $data[] = $temp;
            }
        }
        return $data;
    }


    public function getAllEmployees($timekeepingID = 0)
    {
        /*
            ===== EMPLOYEE STATUS =====
            { id: 0, value: "Resigned"     },
            { id: 1, value: "Active"       },
            { id: 2, value: "Probationary" },
            { id: 3, value: "AWOL"         },
            { id: 4, value: "Retired"      },
            { id: 5, value: "Suspended"    },
            { id: 6, value: "Terminated"   },
            ===== END EMPLOYEE STATUS =====
        */

        /******* NOTE: All employees are organic *******/


        if ($timekeepingID) {
            $sql1    = "SELECT employeeID FROM hris_timekeeping_items_tbl WHERE timekeepingID = $timekeepingID GROUP BY employeeID";
            $query1  = $this->db->query($sql1);
            $result1 = $query1 ? $query1->result_array() : [];

            $idArr = [];
            foreach($result1 as $res1) $idArr[] = $res1["employeeID"];
            $idStr = implode(",", $idArr);

            $sql = "SELECT * FROM hris_employee_list_tbl WHERE FIND_IN_SET(employeeID, '$idStr') AND scheduleID <> 0 AND employeeID <> 1";
        } else {
            $sql = "SELECT * FROM hris_employee_list_tbl WHERE employeeStatus IN (1,2,5,7) AND scheduleID <> 0 AND employeeID <> 1";
        }

        $query = $this->db->query($sql);
        return $query ? $query->result_array() : [];
    }


    public function getSpecificTimekeepingItem($timekeepingID = 0, $employeeID = 0, $scheduleDate = "")
    {
        if ($timekeepingID && $employeeID && $scheduleDate)
        {
            $sql = "
            SELECT 
                * 
            FROM hris_timekeeping_items_tbl
            WHERE timekeepingID = $timekeepingID
                AND employeeID = $employeeID
                AND scheduleDate = '$scheduleDate'";
            $query = $this->db->query($sql);
            return $query ? $query->row() : null;
        }
        return null;
    }


    public function getSpecificTimekeepingProduction($timekeepingItemID = 0)
    {
        if ($timekeepingItemID) 
        {
            $sql   = "SELECT * FROM hris_timekeeping_production_tbl WHERE timekeepingItemID = $timekeepingItemID";
            $query = $this->db->query($sql);
            return $query ? $query->row() : null;
        }
        return null;
    }


    public function getEmployeeAttendance($employeeID = 0, $scheduleDate = "")
    {
        $sql    = "SELECT * FROM hris_employee_attendance_tbl WHERE employeeID = $employeeID AND scheduleDate = '$scheduleDate'";
        $query  = $this->db->query($sql);
        return $query ? $query->row() : false;
    }


    public function getNoCheckInOut($employeeID = 0, $date = "", $checkIn = "", $checkOut = "", $status = 0)
    {
        $id           = "";
        $outCheckIn   = "";
        $outCheckOut  = "";
        $outReference = "";

        $sql = "
        SELECT  
            * 
        FROM hris_no_timein_timeout_tbl 
        WHERE employeeID = $employeeID AND 
            noTimeinTimeoutDate = '$date' AND 
            noTimeinTimeoutStatus = 2";
        $query  = $this->db->query($sql);
        $result = $query ? $query->row() : false;
        if ($result) {
            $timeIn    = $result->noTimeinTimeoutTimeIn;
            $timeOut   = $result->noTimeinTimeoutTimeOut;
            $id        = $result->noTimeinTimeoutID;
            $createdAt = $result->createdAt;
            $outReference = getFormCode("NTI", $createdAt, $id);

            /* 
                ===== NO TIME IN/OUT STATUS =====
                1. NO CHECK IN
                2. NO CHECK OUT
                3. BOTH - NO CHECK IN, CHECK OUT 
                ===== END NO TIME IN/OUT STATUS =====
            */

            if ($status == 1) 
            {
                $outCheckIn = "$date $timeIn";
            } 
            else if ($status == 2) 
            {
                $tCheckIn  = strtotime($checkIn);
                $tCheckOut = strtotime("$date $timeOut");
                $tDiff = $tCheckOut - $tCheckIn;
                if ($tDiff <= 0) 
                {
                    $outCheckOut = date("Y-m-d", strtotime($date." +1 day"))." $timeOut";
                } 
                else 
                {
                    $outCheckOut = "$date $timeOut";
                }
            } 
            else if ($status == 3) 
            {
                $outCheckIn  = "$date $timeIn";

                $tCheckIn  = strtotime("$date $timeIn");
                $tCheckOut = strtotime("$date $timeOut");
                $tDiff = $tCheckOut - $tCheckIn;
                if ($tDiff <= 0) 
                {
                    $outCheckOut = date("Y-m-d", strtolower($date." +1 day"))." $timeOut";
                } 
                else 
                {
                    $outCheckOut = "$date $timeOut";
                }
            }
        }

        if ($outCheckIn && $outCheckOut) 
        {
            $in  = count(explode(" ", $outCheckIn)) > 0 ? date("H:i", strtotime($outCheckIn)) : $outCheckIn;
            $out = count(explode(" ", $outCheckOut)) > 0 ? date("H:i", strtotime($outCheckOut)) : $outCheckOut;
            $isGraveyard = isTimeInGreaterTimeOut($date, $in, $out);
            $outCheckIn  = $date." ".$in;
            $outCheckOut = $isGraveyard ? date('Y-m-d', strtotime($date.' +1 day'))." ".$out : $date." ".$out;
        }

        return [ 
            "checkIn"   => $outCheckIn, 
            "checkOut"  => $outCheckOut, 
            "reference" => $outReference,
            "id"        => $id
        ];
    } 


    public function getOvertimeRequest($employeeID = 0, $date = "")
    {
        if ($employeeID && $date) {
            $id = $reference = $in = $out = "";
            $duration = $breakDuration = 0;

            $sql    = "SELECT * FROM hris_overtime_request_tbl WHERE employeeID = $employeeID AND overtimeRequestDate = '$date' AND overtimeRequestStatus = 2";
            $query  = $this->db->query($sql);
            $result = $query ? $query->row() : false;
            if ($result) {
                $id = $result->overtimeRequestID;
                $createdAt = $result->createdAt;

                $timeIn        = $result->overtimeRequestTimeIn;
                $timeOut       = $result->overtimeRequestTimeOut;
                $breakDuration = $result->overtimeRequestBreak; // Must have

                $reference = getFormCode("OTR", $createdAt, $id);
                $in        = "$date $timeIn";
                $out       = "$date $timeOut";
                $duration  = getDuration($in, $out, $breakDuration);

                $isGreater = isTimeInGreaterTimeOut("", $in, $out);
                if ($isGreater)
                {
                    $out = date("Y-m-d H:i:s", strtotime($out . '+ 1 day'));
                    $duration = getDuration($in, $out, $breakDuration);
                }
                $duration = $duration > 0 ? $duration : 0;

                return [
                    "id"        => $id,
                    "reference" => $reference,
                    "in"        => $in,
                    "out"       => $out,
                    "duration"  => $duration,
                    "break"     => $breakDuration,
                ];
            }
        }
        return false;
    }


    public function getLeaveRequest($employeeID = 0, $date = "", $scheduleIn = "", $scheduleOut = "", $scheduleDuration = 0)
    {
        if ($employeeID && $date) {
            $id = $reference = $type = $in = $out = "";
            $duration = 0;

            $sql = "
            SELECT 
                * 
            FROM hris_leave_request_tbl 
            WHERE employeeID = $employeeID 
                AND '$date' BETWEEN leaveRequestDateFrom AND leaveRequestDateTo 
                AND leaveRequestStatus = 2
                AND leaveStatus = 1";
            $query  = $this->db->query($sql);
            $result = $query ? $query->row() : false;
            if ($result) {
                $id        = $result->leaveRequestID;
                $createdAt = $result->createdAt;
                $type      = $result->leaveName;

                $leaveWorkingDay = $result->leaveWorkingDay; // 0 - Half Day | 1 - Whole Day 

                $reference = getFormCode("LRF", $createdAt, $id);
                $in  = $scheduleIn;
                $out = $scheduleOut;
                $duration = $scheduleDuration;
                if ($leaveWorkingDay == 0) {
                    $duration = $scheduleDuration / 2;
                }

                return [
                    "id"         => $id,
                    "reference"  => $reference,
                    "in"         => $in,
                    "out"        => $out,
                    "duration"   => $duration,
                    "type"       => $type,
                    "workingday" => $leaveWorkingDay,
                ];
            }
        }
        return false;
    }


    public function getAverageDate($scheduleIn = "", $scheduleOut = "", $scheduleBreakDuration = 0)
    {
        $sql    = "SELECT DATE_FORMAT(FROM_UNIXTIME((UNIX_TIMESTAMP('$scheduleIn') + (UNIX_TIMESTAMP('$scheduleOut') - UNIX_TIMESTAMP('$scheduleIn')) / 2)), '%Y-%m-%d %H:%i:%s') AS halfDay";
        $query  = $this->db->query($sql);
        $result = $query->row()->halfDay ?? false;
        if ($result)
        {
            $breakDuration = $scheduleBreakDuration > 0 ? $scheduleBreakDuration / 2 : $scheduleBreakDuration;
            $breakDuration *= 60;
            $sql2   = "SELECT TIMESTAMP('$result') - INTERVAL $breakDuration MINUTE AS halfDay";
            $query2 = $this->db->query($sql2);
            return $query2->row()->halfDay ?? "";
        }
        return "";
    }


    public function isMorningLeave($scheduleIn = "", $scheduleOut = "", $scheduleBreakDuration = 0, $checkIn = "")
    {
        $averageDate = $this->getAverageDate($scheduleIn, $scheduleOut, $scheduleBreakDuration);

        $sql    = "SELECT IF('$checkIn' > '$averageDate', 'FALSE', 'TRUE') AS isHalfDay";
        $query  = $this->db->query($sql);
        $result = $query->row()->isHalfDay;
        return $result == "FALSE";
    }


    public function getDayType($date = "")
    {
        $sql = "
        SELECT 
            LOWER(holidayType) AS holidayType 
        FROM hris_holiday_tbl 
        WHERE holidayDate = '$date'";
        $query = $this->db->query($sql);
        $result = $query->row();
        return $result ? $result->holidayType : "ordinary day";
    }


    public function getProduction($dayType = "", $restDay = true, $timeArray = [])
    {

        /**
         *  Ordinary Day             - OD
         *  Special Day              - SD
         *  Regular Holiday          - RH
         *  Double Holiday           - DH
         *  Basic Rate               - BR
         *  Basic Rest Day Rate      - BRR
         *  Overtime Rate            - OR
         *  Overtime Rest Day Rate   - ORR 
         *  Night Diff Rate          - NR
         *  Night Diff Rest Day Rate - NRR 
         * 
         *  ---------------------------------------------------
         *  |          |                 RATES                |
         *  | Day Type |---------------------------------------
         *  |          | BR  | BRR |  OR  | ORR |  NR  | NRR  |
         *  ---------------------------------------------------
         *  | OD       | 1.0 | 1.3 | 1.25 | 1.3 | 0.10 | 0.10 |
         *  ---------------------------------------------------
         *  | SD       | 1.3 | 1.5 | 1.30 | 1.3 | 0.10 | 0.10 |
         *  ---------------------------------------------------
         *  | RH       | 2.0 | 2.6 | 1.30 | 1.3 | 0.10 | 0.10 |
         *  ---------------------------------------------------
         *  | DH       | 3.0 | 3.9 | 1.30 | 1.3 | 0.10 | 0.10 |
         *  ---------------------------------------------------
         * 
         * 
         */

        // ORDINARY DAY
        $odBrHours  = $odOrHours  = $odNrHours  = $odOrNrHours  = 0; // BASIC
        $odBrrHours = $odOrrHours = $odNrrHours = $odOrNrrHours = 0; // REST DAY

        // SPECIAL DAY
        $sdBrHours  = $sdOrHours  = $sdNrHours  = $sdOrNrHours  = 0; // BASIC
        $sdBrrHours = $sdOrrHours = $sdNrrHours = $sdOrNrrHours = 0; // REST DAY

        // REGULAR HOLIDAY
        $rhBrHours  = $rhOrHours  = $rhNrHours  = $rhOrNrHours  = 0; // BASIC
        $rhBrrHours = $rhOrrHours = $rhNrrHours = $rhOrNrrHours = 0; // REST DAY

        // DOUBLE HOLIDAY
        $dhBrHours  = $dhOrHours  = $dhNrHours  = $dhOrNrHours  = 0; // BASIC
        $dhBrrHours = $dhOrrHours = $dhNrrHours = $dhOrNrrHours = 0; // REST DAY


        if ($dayType && $timeArray && !empty($timeArray)) 
        {
            foreach ($timeArray as $time) 
            {
                $date     = $time["date"]    ?? "";
                $type     = $time["type"]    ?? "";
                $timeIn   = $time["timeIn"]  ?? "";
                $timeOut  = $time["timeOut"] ?? "";
                $break    = $time["break"]   ?? 0;
                $duration = $time["duration"] ?? 0;

                $regularDuration = $overtimeDuration = 0;
                $basicNightDiff = $otNightDiff = 0;

                if ($type == "production")
                {
                    $regularDuration = getDuration($timeIn, $timeOut, $break);
                    $basicNightDiff  = getNightDifferentialDuration($date, $timeIn, $timeOut, $break);
                }
                
                if ($type == "overtime")
                {
                    $overtimeDuration = getDuration($timeIn, $timeOut, $break);
                    $otNightDiff      = getNightDifferentialDuration($date, $timeIn, $timeOut, $break);
                }

                if ($type == "leave")
                {
                    $regularDuration = $duration;
                }

                // $totalDuration = $regularDuration + $overtimeDuration;

                if ($dayType == "special holiday" || $dayType == "special working holiday" || $dayType == "special non-working holiday" && $type != "leave") // SD - SPECIAL DAY
                {
                    if (!$restDay) 
                    {
                        $sdBrHours   += $regularDuration;
                        $sdOrHours   += $overtimeDuration;
                        $sdNrHours   += $basicNightDiff;
                        $sdOrNrHours += $otNightDiff;
                    } 
                    else 
                    {
                        $sdBrrHours  += $regularDuration;
                        $sdOrrHours  += $overtimeDuration;
                        $sdNrrHours  += $basicNightDiff;
                        $sdOrNrHours += $otNightDiff;
                    }
                } 
                else if ($dayType == "regular holiday" && $type != "leave") // RH - REGULAR HOLIDAY
                {
                    if (!$restDay) 
                    {
                        $rhBrHours   += $regularDuration;
                        $rhOrHours   += $overtimeDuration;
                        $rhNrHours   += $basicNightDiff;
                        $rhOrNrHours += $otNightDiff;
                    } 
                    else 
                    {
                        $rhBrrHours  += $regularDuration;
                        $rhOrrHours  += $overtimeDuration;
                        $rhNrrHours  += $basicNightDiff;
                        $rhOrNrHours += $otNightDiff;
                    }
                } 
                else if ($dayType == "double holiday" && $type != "leave") // DH - DOUBLE HOLIDAY
                {
                    if (!$restDay) 
                    {
                        $dhBrHours   += $regularDuration;
                        $dhOrHours   += $overtimeDuration;
                        $dhNrHours   += $basicNightDiff;
                        $dhOrNrHours += $otNightDiff;
                    } 
                    else 
                    {
                        $dhBrrHours  += $regularDuration;
                        $dhOrrHours  += $overtimeDuration;
                        $dhNrrHours  += $basicNightDiff;
                        $dhOrNrHours += $otNightDiff;
                    }
                } 
                else // OD - ORDINARY DAY
                {
                    if (!$restDay || $type == "leave") 
                    {
                        $odBrHours   += $regularDuration;
                        $odOrHours   += $overtimeDuration;
                        $odNrHours   += $basicNightDiff;
                        $odOrNrHours += $otNightDiff;
                    } 
                    else 
                    {
                        $odBrrHours   += $regularDuration;
                        $odOrrHours   += $overtimeDuration;
                        $odNrrHours   += $basicNightDiff;
                        $odOrNrrHours += $otNightDiff;
                    }
                }
            }

        }

        return [
            "odBrHours"    => $odBrHours,
            "odOrHours"    => $odOrHours,
            "odNrHours"    => $odNrHours,
            "odBrrHours"   => $odBrrHours,
            "odOrrHours"   => $odOrrHours,
            "odNrrHours"   => $odNrrHours,
            "sdBrHours"    => $sdBrHours,
            "sdOrHours"    => $sdOrHours,
            "sdNrHours"    => $sdNrHours,
            "sdBrrHours"   => $sdBrrHours,
            "sdOrrHours"   => $sdOrrHours,
            "sdNrrHours"   => $sdNrrHours,
            "rhBrHours"    => $rhBrHours,
            "rhOrHours"    => $rhOrHours,
            "rhNrHours"    => $rhNrHours,
            "rhBrrHours"   => $rhBrrHours,
            "rhOrrHours"   => $rhOrrHours,
            "rhNrrHours"   => $rhNrrHours,
            "dhBrHours"    => $dhBrHours,
            "dhOrHours"    => $dhOrHours,
            "dhNrHours"    => $dhNrHours,
            "dhBrrHours"   => $dhBrrHours,
            "dhOrrHours"   => $dhOrrHours,
            "dhNrrHours"   => $dhNrrHours,
            "odOrNrHours"  => $odOrNrHours,
            "odOrNrrHours" => $odOrNrrHours,
            "sdOrNrHours"  => $sdOrNrHours,
            "sdOrNrrHours" => $sdOrNrrHours,
            "rhOrNrHours"  => $rhOrNrHours,
            "rhOrNrrHours" => $rhOrNrrHours,
            "dhOrNrHours"  => $dhOrNrHours,
            "dhOrNrrHours" => $dhOrNrrHours,
        ];
    }


    public function searchTimesheet($timekeepingID = 0, $startDate= "", $endDate = "", $file = [])
    {
        $data = [
            "header"     => "-",
            "columns"    => [],
            "attendance" => [],
            "errors"     => [],
            "success"    => [],
        ];

        $files = [];
        if ($file && count($file) > 0) 
        {
            $errors = $file[0] ?? [];
            $files  = $file[1] ?? [];
            foreach($errors as $error) $data["errors"][] = $error;
        }

        if ($startDate && $endDate) 
        {
            $headerDisplay = date("F d, Y", strtotime($startDate))." - ".date("F d, Y", strtotime($endDate));
            $dates = $this->getColumnLabel($startDate, $endDate);

            $data["header"]  = $headerDisplay;
            $data["columns"] = $dates;
            
            $employees = $this->getAllEmployees($timekeepingID);


            // ----- GET EMPLOYEE THAT NOT IN EMPLOYEE LIST -----
            foreach($files as $fl)
            {
                $flag    = false;
                $empID   = $fl["employeeID"];
                $empCode = $fl["employeeCode"];
                foreach($employees as $emp)
                {
                    $employeeCode = $emp["employeeCode"];
                    if ($empCode === $employeeCode) $flag = true;
                }
                
                if (!$flag)
                {
                    $error = "danger|Unable to find $empCode";
                    $data["errors"][] = $error;
                }
            }
            // ----- END GET EMPLOYEE THAT NOT IN EMPLOYEE LIST -----


            foreach($employees as $emp) 
            {
                $employeeID        = $emp["employeeID"];
                $employeeCode      = $emp["employeeCode"];
                $employeeFirstname = $emp["employeeFirstname"];
                $employeeLastname  = $emp["employeeLastname"];
                $createdAt         = $emp["createdAt"];
                $fullname          = $employeeFirstname." ".$employeeLastname;
                $profile           = $emp["employeeProfile"] ?? "default.jpg";

                $totalBasicHours    = 0;
                $totalOvertimeHours = 0;
                $grandTotalHours    = 0;
                $totalRestDay       = 0;
                $totalNoDays        = 0;
                
                // ----- GET THE DATE THAT ARE NOT BETWEEN THE SELECTED DATE RANGE -----
                $uploadedDates = [];
                if ($file && count($file) > 0 && $file[1] && count($file[1]) > 0) 
                {
                    $file_data = $file[1] ?? [];

                    foreach($file_data as $dt) 
                    {
                        $empCode = $dt["employeeCode"];
                        $files   = $dt["data"] ?? [];
                        if ($empCode === $employeeCode) 
                        {
                            $uploadedDates[] = $files[0];
                        }
                    }
                }

                $dateRange = [];
                foreach($dates as $dt) $dateRange[] = $dt["date"];

                foreach($uploadedDates as $upDt)
                {
                    $date = $upDt["schedule"] ?? "";
                    $row  = $upDt["row"] ?? 0;

                    if (!in_array($date, $dateRange))
                    {
                        $error = "Warning|Out of scope <b>$date</b> at line $row";
                        $data["errors"][] = $error;
                    }
                }
                // ----- GET THE DATE THAT ARE NOT BETWEEN THE SELECTED DATE RANGE -----


                $employeeAttendance = [];
                foreach($dates as $dt) 
                {
                    $day  = $dt["day"];
                    $date = $dt["date"];

                    $attendanceID          = "";
                    $scheduleIn            = "";
                    $scheduleOut           = "";
                    $scheduleDuration      = 0;
                    $scheduleBreakDuration = "";
                    $checkIn               = "";
                    $checkOut              = "";
                    $checkDuration         = 0;
                    $noInOutID             = "";
                    $noTimeIn              = "";
                    $noTimeOut             = "";
                    $noInOutReference      = ""; 
                    $overtimeID            = "";
                    $overtimeIn            = "";
                    $overtimeOut           = "";
                    $overtimeBreakDuration = 0;
                    $overtimeDuration      = 0;
                    $overtimeReference     = "";
                    $leaveID               = "";
                    $leaveType             = "";
                    $leaveIn               = "";
                    $leaveOut              = "";
                    $leaveDuration         = 0;
                    $leaveWorkingDay       = "";
                    $leaveReference        = "";
                    $isMorningLeave        = true;
                    $restDay               = false;
                    $status                = "";
                    $checkNightDiff        = "";
                    $overtimeNightDiff     = 0;
                    $nightDifferential     = 0;

                    $finalCheckIn = $finalCheckOut = "";

                    $basicHours    = 0;
                    $overtimeHours = 0;
                    $totalHours    = 0;

                    /* 
                        ----- ATTENDANCE STATUS -----
                        1. NO_TIME_IN
                        2. NO_TIME_OUT
                        3. REST_DAY
                        4. ABSENT
                        5. COMPLETE
                        6. LEAVE
                        7. NO_SCHEDULE
                        8. ONGOING
                        9. ABSENT_OVERTIME
                        ----- END ATTENDANCE STATUS -----
                    */

                    if ($timekeepingID) 
                    {
                        $timekeepingItem = $this->getSpecificTimekeepingItem($timekeepingID, $employeeID, $date);
                        if ($timekeepingItem)
                        {
                            $timekeepingItemID     = $timekeepingItem->timekeepingItemID;     
                            $timekeepingID         = $timekeepingItem->timekeepingID;         
                            $employeeID            = $timekeepingItem->employeeID;       
                            $scheduleDate          = $timekeepingItem->scheduleDate;          
                            $scheduleIn            = $timekeepingItem->scheduleIn;            
                            $scheduleOut           = $timekeepingItem->scheduleOut;           
                            $scheduleBreakDuration = $timekeepingItem->scheduleBreakDuration; 
                            $scheduleDuration      = $timekeepingItem->scheduleDuration;      
                            $restDay               = $timekeepingItem->restDay;               
                            $finalCheckIn          = $timekeepingItem->finalCheckIn;               
                            $finalCheckOut         = $timekeepingItem->finalCheckOut;               
                            $checkIn               = $timekeepingItem->checkIn;               
                            $checkOut              = $timekeepingItem->checkOut;              
                            $noInOutID             = $timekeepingItem->noInOutID;             
                            $noInOutReference      = $timekeepingItem->noInOutReference;      
                            $noTimeIn              = $timekeepingItem->noTimeIn;              
                            $noTimeOut             = $timekeepingItem->noTimeOut;             
                            $overtimeID            = $timekeepingItem->overtimeID;            
                            $overtimeReference     = $timekeepingItem->overtimeReference;     
                            $overtimeIn            = $timekeepingItem->overtimeIn;            
                            $overtimeOut           = $timekeepingItem->overtimeOut;           
                            $overtimeBreakDuration = $timekeepingItem->overtimeBreakDuration; 
                            $leaveID               = $timekeepingItem->leaveID;               
                            $leaveReference        = $timekeepingItem->leaveReference;        
                            $leaveType             = $timekeepingItem->leaveType;             
                            $leaveIn               = $timekeepingItem->leaveIn;               
                            $leaveOut              = $timekeepingItem->leaveOut;              
                            $leaveDuration         = $timekeepingItem->leaveDuration;         
                            $leaveWorkingDay       = $timekeepingItem->leaveWorkingDay;         
                            $checkDuration         = $timekeepingItem->checkDuration;         
                            $basicHours            = $timekeepingItem->basicHours;            
                            $overtimeHours         = $timekeepingItem->overtimeHours;         
                            $nightDifferential     = $timekeepingItem->nightDifferential;     
                            $totalHours            = $timekeepingItem->totalHours;            
                            $status                = $timekeepingItem->timekeepingItemStatus; 
                            $createdBy             = $timekeepingItem->createdBy;             
                            $updatedBy             = $timekeepingItem->updatedBy;             
                            $createdAt             = $timekeepingItem->createdAt;             
                            $updatedAt             = $timekeepingItem->updatedAt; 

                            $checkNightDiff    = getNightDifferentialDuration($date, $finalCheckIn, $finalCheckOut);
                            $overtimeNightDiff = getNightDifferentialDuration($date, $overtimeIn, $overtimeOut);
                            $nightDifferential = $checkNightDiff + $overtimeNightDiff;

                            // $production = $this->getSpecificTimekeepingProduction($timekeepingItemID);
                        }  
                    } 
                    else 
                    {
                        $attendance = $this->getEmployeeAttendance($employeeID, $date);

                        $status = "NO_SCHEDULE";
                        if ($attendance) 
                        {
                            $attendanceID          = $attendance->attendanceID;
                            $scheduleIn            = $attendance->scheduleIn;
                            $scheduleOut           = $attendance->scheduleOut;
                            $scheduleBreakDuration = $attendance->scheduleBreakDuration;
                            $scheduleDuration      = $attendance->scheduleDuration ?? 0;
                            $checkIn               = $attendance->checkIn;
                            $checkOut              = $attendance->checkOut;
                            $checkDuration         = $attendance->checkDuration ?? 0;

                            // GET THE CHECK IN
                            $isGreaterCheckIn = isTimeInGreaterTimeOut("", $checkIn, $scheduleIn);
                            $finalCheckIn     = $isGreaterCheckIn ? $checkIn : $scheduleIn;

                            // GET THE CHECK OUT
                            $isGreaterCheckOut = isTimeInGreaterTimeOut("", $checkOut, $scheduleOut);
                            $finalCheckOut     = $isGreaterCheckOut ? $scheduleOut : $checkOut;
    
                            if ($scheduleDuration == 0 || $scheduleDuration == NULL) 
                            {
                                $status = "REST_DAY";
                            } 
                            else 
                            {
                                $status = "NEGLIGENCE";
    
                                /* 
                                    ===== NO TIME IN/OUT STATUS =====
                                    1. NO CHECK IN
                                    2. NO CHECK OUT
                                    3. BOTH - NO CHECK IN, CHECK OUT 
                                    ===== END NO TIME IN/OUT STATUS =====
                                */
                                $negligence = 0;
                                if (!$checkIn && !$checkOut) 
                                {
                                    $negligence = 3; // BOTH 
                                } 
                                else if (!$checkIn && $checkOut) 
                                {
                                    $negligence = 1; // CHECK IN
                                } 
                                else if ($checkIn && !$checkOut) 
                                {
                                    $negligence = 2; // CHECK OUT
                                } 
    
                                if ($negligence != 0) 
                                {
                                    $checkInOut = $this->getNoCheckInOut($employeeID, $date, $checkIn, $checkOut, $negligence);
                                    $noTimeIn         = $checkInOut["checkIn"];
                                    $noTimeOut        = $checkInOut["checkOut"];
                                    $noInOutID        = $checkInOut["id"];
                                    $noInOutReference = $checkInOut["reference"];
    
                                    $tCheckIn      = $noTimeIn ? $noTimeIn : $checkIn;
                                    $tCheckOut     = $noTimeOut ? $noTimeOut : $checkOut;

                                    $tempCheckDuration = getDuration($tCheckIn, $tCheckOut);
                                    $tempBreakDuration = $tempCheckDuration > ($scheduleDuration / 2) ? $scheduleBreakDuration : 0;

                                    $checkDuration = getProductionDuration($scheduleIn, $scheduleOut, $tempBreakDuration, $tCheckIn, $tCheckOut);

                                    $isGreaterCheckIn = isTimeInGreaterTimeOut("", $tCheckIn, $scheduleIn);
                                    $finalCheckIn     = $isGreaterCheckIn ? $tCheckIn : $scheduleIn;

                                    $isGreaterCheckOut = isTimeInGreaterTimeOut("", $tCheckOut, $scheduleOut);
                                    $finalCheckOut     = $isGreaterCheckOut ? $scheduleOut : $tCheckOut;
                                }
                                // ===== END NO TIME IN/OUT =====
                            }
    
                            if ($status == "NEGLIGENCE") 
                            {
                                if (!($checkIn || $noTimeIn) && !($checkOut || $noTimeOut)) 
                                {
                                    $status = "ABSENT";
                                } 
                                else if (!($checkIn || $noTimeIn) && ($checkOut || $noTimeOut)) 
                                {
                                    $status = "NO_TIME_IN";
                                } 
                                else if (($checkIn || $noTimeIn) && !($checkOut || $noTimeOut)) 
                                {
                                    $status = "NO_TIME_OUT";
                                    if ($date == date("Y-m-d")) 
                                    {
                                        $status = "ONGOING";
                                    }
                                }
                                else 
                                {
                                    $status = "COMPLETE";
                                }
                            }
    
                            $overtimeRequest = $this->getOvertimeRequest($employeeID, $date);
                            if ($overtimeRequest) 
                            {
                                $overtimeID            = $overtimeRequest["id"];
                                $overtimeReference     = $overtimeRequest["reference"];
                                $overtimeIn            = $overtimeRequest["in"];
                                $overtimeOut           = $overtimeRequest["out"];
                                $overtimeDuration      = $overtimeRequest["duration"];
                                $overtimeBreakDuration = $overtimeRequest["break"];
                            }
    
                            $leaveRequest = $this->getLeaveRequest($employeeID, $date, $scheduleIn, $scheduleOut, $scheduleDuration, $checkIn);
                            if ($leaveRequest) 
                            {
                                $leaveID         = $leaveRequest["id"];
                                $leaveReference  = $leaveRequest["reference"];
                                $leaveType       = $leaveRequest["type"];
                                $leaveIn         = $leaveRequest["in"];
                                $leaveOut        = $leaveRequest["out"];
                                $leaveDuration   = $leaveRequest["duration"];
                                $leaveWorkingDay = $leaveRequest["workingday"];

                                $isMorningLeave = $this->isMorningLeave($scheduleIn, $scheduleOut, $scheduleBreakDuration, $finalCheckIn); // CHECK IF THE FIRST HALF OF DAY IS ON LEAVE
                            }
    
                            if ($status == "ABSENT") 
                            {
                                if ($leaveDuration > 0) 
                                {
                                    $status = "COMPLETE_LEAVE";
                                }
                                if ($overtimeDuration > 0) 
                                {
                                    $status = "ABSENT_OVERTIME";
                                }
                            } 
                            else if ($status == "REST_DAY" || $status == "NO_SCHEDULE") 
                            {
                                if ($overtimeDuration > 0)
                                {
                                    $status = "COMPLETE_REST_DAY";
                                }
                            }
    

                            if ($leaveDuration > 0) // On Leave
                            {
                                if ($leaveWorkingDay == 0) // Half Day
                                {
                                    
                                    $averageDate = $this->getAverageDate($scheduleIn, $scheduleOut, $scheduleBreakDuration);

                                    if ($isMorningLeave)
                                    {
                                        $checkDuration = getProductionDuration($averageDate, $scheduleOut, 0, $finalCheckIn, $finalCheckOut);
                                        $leaveOut = $averageDate;
                                    }
                                    else
                                    {
                                        $checkDuration = getProductionDuration($scheduleIn, $averageDate, 0, $finalCheckIn, $finalCheckOut);
                                        $leaveIn = $finalCheckIn;
                                    }

                                    $basicHours = $checkDuration + $leaveDuration;
                                }
                                else // Whole Day
                                {
                                    $basicHours = $leaveDuration;
                                }
                            }
                            else // Regular Day
                            {
                                $basicHours = $checkDuration;
                            }

                            $basicHours    = $basicHours > 0 ? $basicHours : 0;
                            $overtimeHours = $overtimeDuration > 0 ? $overtimeDuration : 0;
                            $totalHours    = $basicHours + $overtimeHours;                        
                        }
    
                        $checkNightDiff    = getNightDifferentialDuration($date, $finalCheckIn, $finalCheckOut);
                        $overtimeNightDiff = getNightDifferentialDuration($date, $overtimeIn, $overtimeOut);
                        $nightDifferential = $checkNightDiff + $overtimeNightDiff;

                        // ----- ***** DEPENDENCIES ***** -----
                        $restDay = $status == "REST_DAY" || $status == "NO_SCHEDULE";
                        $dayType = $this->getDayType($date);
                        // ----- ***** END DEPENDENCIES ***** -----
                    }


                    if ($file && count($file) > 0 && $file[1] && count($file[1]) > 0) 
                    {
                        $file_data = $file[1] ?? [];
                        foreach($file_data as $dt) 
                        {
                            $empID   = $dt["employeeID"];
                            $empCode = $dt["employeeCode"];
                            $files   = $dt["data"];
                            if ($empCode == $employeeCode) 
                            {
                                foreach($files as $indx => $fl) 
                                {
                                    $schedule            = $fl["schedule"];
                                    $row                 = $fl["row"];
                                    $fCheckIn            = $fl["timein"];
                                    $fCheckOut           = $fl["timeout"];
                                    $fCheckBreakDuration = $fl["breakduration"];
                                    
                                    if ($schedule == $date && $fCheckIn && $fCheckOut)
                                    {
                                        if ($scheduleDuration > 0)
                                        {
                                            $checkIn  = $fCheckIn;
                                            $checkOut = $fCheckOut;
    
                                            $noTimeIn         = "";
                                            $noTimeOut        = "";
                                            $noInOutID        = "";
                                            $noInOutReference = "";
    
                                            // ----- ***** DEPENDENCIES ***** -----
                                            $restDay = $status == "REST_DAY" || $status == "NO_SCHEDULE";
                                            $dayType = $this->getDayType($date);
                                            // ----- ***** END DEPENDENCIES ***** -----
    
                                            $status = "COMPLETE";
    
                                            $scheduleIn  = $restDay ? $checkIn : $scheduleIn;
                                            $scheduleOut = $restDay ? $checkOut : $scheduleOut;
                                            $scheduleBreakDuration = $restDay ? $fCheckBreakDuration : $scheduleBreakDuration;
            
                                            $checkDuration = getProductionDuration($scheduleIn, $scheduleOut, $scheduleBreakDuration, $checkIn, $checkOut, true);
    
                                            $basicHours = $checkDuration > 0 ? $checkDuration : 0;
                                            $totalHours = $basicHours + $overtimeHours; 
                                            
                                            $nightDiffBreak = $restDay ? $fCheckBreakDuration : $scheduleBreakDuration;
                                            $checkNightDiff    = getNightDifferentialDuration($date, $checkIn, $checkOut, $nightDiffBreak);
                                            $nightDifferential = $checkNightDiff + $overtimeNightDiff;
    
                                            $finalCheckIn  = $checkIn;
                                            $finalCheckOut = $checkOut;
    
                                            $msg = "Data successfully imported at line $row";
                                            $data["success"][] = $msg;
                                        }
                                        else
                                        {
                                            $error = "Warning|$empCode is on Rest Day <b>$date</b> at line $row";
                                            $data["errors"][] = $error;
                                        }
                                    }
                                }
                            }
                        }
                    }

                    $totalBasicHours    += $basicHours;
                    $totalOvertimeHours += $overtimeHours;
                    $grandTotalHours    += $totalHours;

                    if ($status == "REST_DAY" || $status == "NO_SCHEDULE") {
                        $totalRestDay += 1;
                    } 
                    if ($scheduleDuration > 0 || $status == "COMPLETE") {
                        $totalNoDays += 1;
                    }

                    $temp = [
                        "attendanceID"          => $attendanceID,
                        "scheduleDate"          => $date,
                        "scheduleIn"            => $scheduleIn,
                        "scheduleOut"           => $scheduleOut,
                        "scheduleBreakDuration" => $scheduleBreakDuration,
                        "scheduleDuration"      => $scheduleDuration,
                        "restDay"               => $restDay ? 1 : 0,
                        "finalCheckIn"          => $finalCheckIn,
                        "finalCheckOut"         => $finalCheckOut,
                        "checkIn"               => $checkIn,
                        "checkOut"              => $checkOut,
                        "noTimeIn"              => $noTimeIn,
                        "noTimeOut"             => $noTimeOut,
                        "noInOutID"             => $noInOutID,
                        "noInOutReference"      => $noInOutReference,
                        "overtimeID"            => $overtimeID,
                        "overtimeIn"            => $overtimeIn,
                        "overtimeOut"           => $overtimeOut,
                        "overtimeBreakDuration" => $overtimeBreakDuration,
                        "overtimeReference"     => $overtimeReference,
                        "leaveIn"               => $leaveIn,
                        "leaveOut"              => $leaveOut,
                        "leaveID"               => $leaveID,
                        "leaveReference"        => $leaveReference,
                        "leaveType"             => $leaveType,
                        "leaveWorkingDay"       => $leaveWorkingDay,
                        "leaveDuration"         => $leaveDuration,
                        "checkDuration"         => $checkDuration,
                        "basicHours"            => $basicHours,
                        "overtimeHours"         => $overtimeHours,
                        "nightDifferential"     => $nightDifferential,
                        "totalHours"            => $totalHours,
                        "status"                => $status,
                    ];
                    $employeeAttendance[] = $temp;
                }

                $temp = [
                    "employeeID"         => $employeeID,
                    "code"               => $employeeCode,
                    "fullname"           => $fullname,
                    "profile"            => $profile,
                    "data"               => $employeeAttendance,
                    "totalBasicHours"    => $totalBasicHours,
                    "totalOvertimeHours" => $totalOvertimeHours,
                    "grandTotalHours"    => $grandTotalHours,
                    "totalRestDay"       => $totalRestDay,
                    "totalNoDays"        => $totalNoDays,
                ];

                $data["attendance"][] = $temp;
            }
        }
        return $data;
    }
    // ---------- ********** END SEARCH TIMESHEET ********** ----------





    // ----- ********** SAVING TIMEKEEPING ********** -----
    public function saveTimekeepingData($action = "", $timekeepingData = [], $timekeepingID = 0)
    {
        if ($action == "insert") 
        {
            $query = $this->db->insert("hris_timekeeping_tbl", $timekeepingData);
        } 
        else 
        {
            $where = ["timekeepingID" => $timekeepingID];
            $query = $this->db->update("hris_timekeeping_tbl", $timekeepingData, $where);
        }

        if ($query) 
        {
            $insertID = $action == "insert" ? $this->db->insert_id() : $timekeepingID;
            $timekeepingCode = "";

            if ($action == "insert")
            {
                $timekeepingCode = getFormCode("TMK", date("Y-m-d"), $insertID);
                $this->db->update("hris_timekeeping_tbl", ["timekeepingCode" => $timekeepingCode], ["timekeepingID" => $insertID]);
            }

            return "true|Successfully submitted|$insertID|".date("Y-m-d");
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }

    public function deleteTimekeeping($timekeepingID = 0, $table = "")
    {
        $query  = $this->db->delete("hris_timekeeping_items_tbl", ["timekeepingID" => $timekeepingID]);
        $query2 = $this->db->delete("hris_timekeeping_production_tbl", ["timekeepingID" => $timekeepingID]);
        return $query && $query2 ? true : false;
    }

    public function saveTimekeepingItem($timekeepingID = 0, $timekeepingItem = [])
    {
        if ($timekeepingItem && count($timekeepingItem) > 0) 
        {
            $query = $this->db->insert("hris_timekeeping_items_tbl", $timekeepingItem);
            $insertID = $this->db->insert_id();
            return $query ? $insertID : false;
        }
        return false;
    }

    public function saveTimekeepingProduction($timekeepingID = 0, $timekeepingProduction = [])
    {
        if ($timekeepingProduction && count($timekeepingProduction) > 0) 
        {
            $query = $this->db->insert_batch("hris_timekeeping_production_tbl", $timekeepingProduction);
            return $query ? true : false;
        }
        return false;
    }
    // ----- ********** END SAVING TIMEKEEPING ********** -----





    // ----- ********** SAVE PAYROLL DATA ********** -----
    public function getTimekeepingData($timekeepingID = 0)
    {
        $sql   = "SELECT * FROM hris_timekeeping_tbl WHERE timekeepingID = $timekeepingID";
        $query = $this->db->query($sql);
        return $query ? $query->row() : null;
    }

    public function getTimekeepingItemsData($timekeepingID = 0)
    {
        $sql = "
        SELECT 
            htit.restDay, 
            htit.hourlyRate, 
            htit.timekeepingItemStatus AS status, 
            htit.scheduleDuration, 
            htit.scheduleBreakDuration,
            htpt.dayType,
            htit.checkDuration,
            htit.leaveDuration,
            (htit.leaveDuration * htit.hourlyRate) AS leavePay,
            (CASE
                WHEN(htit.scheduleDuration <> 0 AND (htit.lateDuration + htit.undertimeDuration) >= (htit.scheduleDuration / 2))
                    THEN htit.lateDuration + htit.undertimeDuration - htit.scheduleBreakDuration
                ELSE htit.lateDuration + htit.undertimeDuration 
            END) AS lateUndertimeHours,
            htpt.* 
        FROM hris_timekeeping_items_tbl AS htit
            LEFT JOIN hris_timekeeping_production_tbl AS htpt USING(timekeepingItemID)
        WHERE htit.timekeepingID = $timekeepingID";
        $query = $this->db->query($sql);
        return $query ? $query->result_array() : [];
    }

    public function insertPayrollProduction($timekeepingID = 0, $payrollID = 0)
    {
        $sessionID = $this->session->has_userdata("adminSessionID") ? $this->session->userdata("adminSessionID") : 0;

        $data = [];

        $timekeepingItems = $this->getTimekeepingItemsData($timekeepingID);
        if ($timekeepingItems && !empty($timekeepingItems))
        {
            foreach ($timekeepingItems as $item) {
                $timekeepingItemID  = $item['timekeepingItemID'];
                $employeeID         = $item['employeeID'];
                $hourlyRate         = $item['hourlyRate'];
                $scheduleDate       = $item['scheduleDate'];
                $scheduleDuration   = $item['scheduleDuration'];
                $dayType            = $item['dayType'];
                $restDay            = $item['restDay'] == 1;
                $status             = $item['status'] ?? "NO SCHEDULE";
                $isLeave            = $status == "COMPLETE_LEAVE";
                $lateUndertimeHours = $item["lateUndertimeHours"];
                $leaveHours         = $item['leaveDuration'];
                $leavePay           = $item["leavePay"];

                // BASIC HOURS
                $odBrHours  = $item['odBrHours'];
                $odBrrHours = $item['odBrrHours'];
                $sdBrHours  = $item['sdBrHours'];
                $sdBrrHours = $item['sdBrrHours'];
                $rhBrHours  = $item['rhBrHours'];
                $rhBrrHours = $item['rhBrrHours'];
                $dhBrHours  = $item['dhBrHours'];
                $dhBrrHours = $item['dhBrrHours'];

                // $basicHours = $odBrHours + $odBrrHours + $sdBrHours + $sdBrrHours + $rhBrHours + $rhBrrHours + $dhBrHours + $dhBrrHours;
                $basicHours = $item['checkDuration'];

                // OVERTIME HOURS
                $odOrHours  = $item['odOrHours'];
                $odOrrHours = $item['odOrrHours'];
                $sdOrHours  = $item['sdOrHours'];
                $sdOrrHours = $item['sdOrrHours'];
                $rhOrHours  = $item['rhOrHours'];
                $rhOrrHours = $item['rhOrrHours'];
                $dhOrHours  = $item['dhOrHours'];
                $dhOrrHours = $item['dhOrrHours'];

                $overtimeHours = $odOrHours + $odOrrHours + $sdOrHours + $sdOrrHours + $rhOrHours + $rhOrrHours + $dhOrHours + $dhOrrHours;

                // NIGHT DIFFERENTIAL HOURS
                $odNrHours  = $item['odNrHours'];
                $odNrrHours = $item['odNrrHours'];
                $sdNrHours  = $item['sdNrHours'];
                $sdNrrHours = $item['sdNrrHours'];
                $rhNrHours  = $item['rhNrHours'];
                $rhNrrHours = $item['rhNrrHours'];
                $dhNrHours  = $item['dhNrHours'];
                $dhNrrHours = $item['dhNrrHours'];

                // OVERTIME NIGHT DIFFERENTIAL HOURS 
                $odOrNrHours  = $item['odOrNrHours'];
                $odOrNrrHours = $item['odOrNrrHours'];
                $sdOrNrHours  = $item['sdOrNrHours'];
                $sdOrNrrHours = $item['sdOrNrrHours'];
                $rhOrNrHours  = $item['rhOrNrHours'];
                $rhOrNrrHours = $item['rhOrNrrHours'];
                $dhOrNrHours  = $item['dhOrNrHours'];
                $dhOrNrrHours = $item['dhOrNrrHours'];
                
                $nightDiffHours = $odNrHours + $odNrrHours + $sdNrHours + $sdNrrHours + $rhNrHours + $rhNrrHours + $dhNrHours + $dhNrrHours;
                $overtimeNightDifferentialHours = $odOrNrHours + $odOrNrrHours + $sdOrNrHours + $sdOrNrrHours + $rhOrNrHours + $rhOrNrrHours + $dhOrNrHours + $dhOrNrrHours;

                $rate = getPayrollDayRate($dayType, $restDay, $isLeave);
                $basicRate     = $rate["basicRate"];
                $overtimeRate  = $rate["overtimeRate"];
                $nightDiffRate = $rate["nightDiffRate"];

                $schedulePay = $hourlyRate * $scheduleDuration * 1;

                $salary = getPayrollDaySalary($hourlyRate, $basicHours, $overtimeHours, $nightDiffHours, $overtimeNightDifferentialHours, $dayType, $restDay, $isLeave);
                $basicPay     = $salary["basicPay"];
                $overtimePay  = $salary["overtimePay"];
                $nightDiffPay = $salary["nightDiffPay"];
                $totalPay     = $salary["totalPay"] + $leavePay;

                // REFLECT HOLIDAY PAY
                $isHoliday = $dayType != "ordinary day";
                $holidayPay = 0;
                if ($isHoliday && $basicPay > 0) 
                {
                    $productionPay = $hourlyRate * $basicHours;
                    $holidayPay    = $basicPay - $productionPay;
                    $basicPay      = $basicPay - $holidayPay;
                }

                $lateUndertimeDeduction = $hourlyRate * $lateUndertimeHours * $basicRate;

                $data[] = [
                    'payrollID'              => $payrollID,
                    'timekeepingID'          => $timekeepingID,
                    'timekeepingItemID'      => $timekeepingItemID,
                    'employeeID'             => $employeeID,
                    'hourlyRate'             => $hourlyRate,
                    'scheduleDate'           => $scheduleDate,
                    'scheduleDuration'       => $scheduleDuration,
                    'dayType'                => $dayType,
                    'restDay'                => $restDay,
                    'status'                 => $status,
                    'basicHours'             => $basicHours,
                    'leaveHours'             => $leaveHours,
                    'overtimeHours'          => $overtimeHours,
                    'nightDifferentialHours' => $nightDiffHours,
                    'overtimeNightDifferentialHours' => $nightDiffHours,
                    'lateUndertimeHours'     => $lateUndertimeHours,
                    'basicRate'              => $basicRate,
                    'overtimeRate'           => $overtimeRate,
                    'nightDifferentialRate'  => $nightDiffRate,
                    'basicPay'               => $basicPay,
                    'holidayPay'             => $holidayPay,
                    'leavePay'               => $leavePay,
                    'overtimePay'            => $overtimePay,
                    'nightDifferentialPay'   => $nightDiffPay,
                    'lateUndertimeDeduction' => $lateUndertimeDeduction,
                    'schedulePay'            => $schedulePay,
                    'totalPay'               => $totalPay,
                    'createdBy'              => $sessionID,
                    'updatedBy'              => $sessionID,
                    'createdAt'              => date('Y-m-d H:i:s')
                ];
            }
        }

        if ($data && !empty($data))
        {
            $query = $this->db->insert_batch("hris_payroll_production_tbl", $data);
            return $query ? true : false;
        }
        return false;
    }

    public function getPreviousGrossNetPay($payrollID = 0, $employeeID = 0, $cutOffCount = 0)
    {
        $sql = "
        SELECT 
            SUM(grossPay) AS grossPay,
            SUM(netPay) AS netPay
        FROM (SELECT * FROM hris_payroll_items_tbl AS hpit
        WHERE hpit.employeeID = $employeeID AND hpit.payrollID <> $payrollID
        ORDER BY hpit.updatedAt, hpit.payrollID DESC
        LIMIT $cutOffCount) AS summary";
        $query = $this->db->query($sql);
        return $query ? $query->row() : null;
    }

    public function getPayrollProduction($payrollID = 0)
    {
        $sql = "
        SELECT 
            employeeBasicSalary,
            timekeepingID,
            employeeID,
            hourlyRate,
            employeeAllowance AS allowance,
            MIN(scheduleDate) AS startDate,
            MAX(scheduleDate) AS endDate,
            SUM(status NOT IN('NO_SCHEDULE', 'REST_DAY')) AS workingDays,
            SUM(dayType <> 'ordinary day' AND scheduleDuration > 0) AS holidays,
            SUM(status = 'ABSENT' AND totalPay = 0) AS lwopDays,
            SUM(status = 'COMPLETE_LEAVE') AS paidLeaveDays,
            SUM(status IN('NO_SCHEDULE', 'REST_DAY') AND totalPay = 0) AS restDays,
            SUM(scheduleDuration) AS scheduleHours,
            SUM(basicHours) AS basicHours,
            SUM(overtimeHours) AS overtimeHours,
            SUM(nightDifferentialHours) AS nightDifferentialHours,
            SUM(lateUndertimeHours) AS lateUndertimeHours,
            SUM(CASE WHEN STATUS = 'ABSENT' THEN scheduleDuration ELSE 0 END) AS lwopHours,
            SUM(hourlyRate * scheduleDuration) AS basicSalary,
            SUM(CASE WHEN dayType = 'ordinary day' AND basicPay THEN basicPay ELSE 0 END) AS basicPay,
            SUM(CASE WHEN dayType <> 'ordinary day' AND holidayPay THEN holidayPay ELSE 0 END) AS holidayPay,
            SUM(overtimePay) AS overtimePay,
            SUM(nightDifferentialPay) AS nightDifferentialPay,
            SUM(leavePay) AS leavePay,
            SUM(lateUndertimeDeduction) AS lateUndertimeDeduction,
            SUM(CASE WHEN status = 'ABSENT' THEN (schedulePay) ELSE 0 END) AS lwopDeduction,
            SUM(totalPay) AS grossPay
        FROM hris_payroll_production_tbl AS hppt
            LEFT JOIN hris_employee_list_tbl AS helt USING(employeeID) 
        WHERE payrollID = $payrollID GROUP BY employeeID";
        $query = $this->db->query($sql);
        return $query ? $query->result_array() : [];
    }

    public function insertPayrollItems($payrollID = 0, $cutoff = 0)
    {
        $sessionID = $this->session->has_userdata("adminSessionID") ? $this->session->userdata("adminSessionID") : 0;
        $cutOffCount = getCutOffCount();

        $payrollProduction = $this->getPayrollProduction($payrollID);
        if ($payrollProduction && !empty($payrollProduction))
        {
            $data = [];
            foreach ($payrollProduction as $prod) {

                $employeeID = $prod['employeeID'];
                $allowance  = $prod['allowance'] / $cutOffCount;

                $monthlyRate            = $prod['employeeBasicSalary'];
                $workingDays            = $prod['workingDays'];
                $hourlyRate             = $prod['hourlyRate'];
                $basicSalary            = $monthlyRate / $cutOffCount;

                $basicPay               = $prod['basicPay'];
                $holidayPay             = $prod['holidayPay'];
                $overtimePay            = $prod['overtimePay'];
                $nightDifferentialPay   = $prod['nightDifferentialPay'];
                $leavePay               = $prod['leavePay'];
                $lateUndertimeDeduction = $prod['lateUndertimeDeduction'];
                $lwopDeduction          = $prod['lwopDeduction'];
                $lwopDeduction          = $lwopDeduction > $basicSalary ? $basicSalary : $lwopDeduction;

                $loan = getEmployeeLoan($employeeID, $cutoff);
                $loanBasis           = $loan['total'] ?? 0;
                $ammortizationID     = $loan['ammortizationID'] ?? '';
                $ammortizationName   = $loan['ammortizationName'] ?? '';
                $ammortizationAmount = $loan['ammortizationAmount'] ?? '';

                $grossPay = ($basicSalary + $holidayPay + $overtimePay + $nightDifferentialPay + $leavePay) - ($lateUndertimeDeduction + $lwopDeduction);

                $prevGrossPay = $prevNetPay = 0;

                $prevGrossNetPay = $this->getPreviousGrossNetPay($payrollID, $employeeID, $cutOffCount);
                if ($prevGrossNetPay)
                {
                    $prevGrossPay = $prevGrossNetPay->grossPay ?? 0;
                    $prevNetPay   = $prevGrossNetPay->netPay ?? 0;
                }

                $totalGrossPay = $prevGrossPay + $grossPay;
                $govermentContribution = getGovernmentContribution($totalGrossPay);
                $sssDeduction         = $govermentContribution['sssDeduction'] ?? 0;
                $sssEmployer          = $govermentContribution['sssEmployer'] ?? 0;
                $sssTotal             = $govermentContribution['sssTotal'] ?? 0;
                $phicDeduction        = $govermentContribution['phicDeduction'] ?? 0;
                $phicEmployer         = $govermentContribution['phicEmployer'] ?? 0;
                $phicTotal            = $govermentContribution['phicTotal'] ?? 0;
                $hdmfDeduction        = $govermentContribution['hdmfDeduction'] ?? 0;
                $hdmfEmployer         = $govermentContribution['hdmfEmployer'] ?? 0;
                $hdmfTotal            = $govermentContribution['hdmfTotal'] ?? 0;
                $loanDeduction        = $govermentContribution['loanDeduction'] ?? 0;
                $withHoldingDeduction = $govermentContribution['withHoldingDeduction'] ?? 0;
                $totalDeduction       = $govermentContribution['totalDeduction'] ?? 0;

                $netPay = ($grossPay + $allowance) - $loanDeduction;

                $data[] = [
                    'payrollID'              => $payrollID,
                    'timekeepingID'          => $prod['timekeepingID'],
                    'employeeID'             => $employeeID,
                    'hourlyRate'             => $hourlyRate,
                    'holdSalary'             => 0,
                    'deductMandates'         => 0,
                    'startDate'              => $prod['startDate'],
                    'endDate'                => $prod['endDate'],
                    'workingDays'            => $workingDays,
                    'holidays'               => $prod['holidays'],
                    'lwopDays'               => $prod['lwopDays'],
                    'paidLeaveDays'          => $prod['paidLeaveDays'],
                    'restDays'               => $prod['restDays'],
                    'scheduleHours'          => $prod['scheduleHours'],
                    'basicHours'             => $prod['basicHours'],
                    'overtimeHours'          => $prod['overtimeHours'],
                    'nightDifferentialHours' => $prod['nightDifferentialHours'],
                    'lateUndertimeHours'     => $prod['lateUndertimeHours'],
                    'lwopHours'              => $prod['lwopHours'],
                    'basicSalary'            => $basicSalary,
                    'basicPay'               => $basicPay,
                    'holidayPay'             => $holidayPay,
                    'overtimePay'            => $overtimePay,
                    'nightDifferentialPay'   => $nightDifferentialPay,
                    'allowance'              => $allowance,
                    'leavePay'               => $leavePay,
                    'lateUndertimeDeduction' => $lateUndertimeDeduction,
                    'lwopDeduction'          => $lwopDeduction,
                    'prevGrossPay'           => $prevGrossPay,
                    'grossPay'               => $grossPay,
                    'sssBasis'               => $sssDeduction,
                    'sssDeduction'           => 0,
                    'sssEmployer'            => $sssEmployer,
                    'sssTotal'               => $sssTotal,
                    'phicBasis'              => $phicDeduction,
                    'phicDeduction'          => 0,
                    'phicEmployer'           => $phicEmployer,
                    'phicTotal'              => $phicTotal,
                    'hdmfBasis'              => $hdmfDeduction,
                    'hdmfDeduction'          => 0,
                    'hdmfEmployer'           => $hdmfEmployer,
                    'hdmfTotal'              => $hdmfTotal,
                    'withHoldingBasis'       => 0,
                    'withHoldingDeduction'   => 0,
                    'totalDeduction'         => 0,
                    'loanBasis'              => $loanBasis,
                    'loanDeduction'          => 0,
                    'ammortizationID'        => $ammortizationID,
                    'ammortizationName'      => $ammortizationName,
                    'ammortizationAmount'    => $ammortizationAmount,
                    'prevNetPay'             => $prevNetPay,
                    'netPay'                 => $netPay,
                    'createdBy'              => $sessionID,
                    'updatedBy'              => $sessionID,
                    'createdAt'              => date('Y-m-d H:i:s')
                ];
            }

            if ($data && !empty($data))
            {
                $query = $this->db->insert_batch("hris_payroll_items_tbl", $data);
                return $query ? true : false;
            }
        }
        return false;
    }
    
    public function insertPayrollData($timekeepingID = 0)
    {
        $sessionID = $this->session->has_userdata("adminSessionID") ? $this->session->userdata("adminSessionID") : 0;

        if ($timekeepingID)
        {
            $timekeepingData = $this->getTimekeepingData($timekeepingID);
            if ($timekeepingData)
            {   
                $data = [
                    'timekeepingID'    => $timekeepingID,
                    'timekeepingCode'  => $timekeepingData->timekeepingCode,
                    'payrollStartDate' => $timekeepingData->timekeepingStartDate,
                    'payrollEndDate'   => $timekeepingData->timekeepingEndDate,
                    'cutOff'           => $timekeepingData->cutOff,
                    'payOut'           => $timekeepingData->payOut,
                    'employeeID'       => 0,
                    'payrollStatus'    => 0,
                    'createdBy'        => $sessionID,
                    'updatedBy'        => $sessionID,
                    'createdAt'        => date('Y-m-d H:i:s')
                ];
                $query = $this->db->insert("hris_payroll_tbl", $data);
                $payrollID = $this->db->insert_id();

                $payrollCode = getFormCode("PRL", date("Y-m-d"), $payrollID);
                $this->db->update("hris_payroll_tbl", ["payrollCode" => $payrollCode], ["payrollID" => $payrollID]);
    
                $insertPayrollProduction = $this->insertPayrollProduction($timekeepingID, $payrollID);
                $insertPayrollItems      = $this->insertPayrollItems($payrollID, $timekeepingData->cutOff);
                
                return $query ? true : false;
            }

        }
        return false;
    }
    // ----- ********** END SAVE PAYROLL DATA ********** -----





    // ----- ********** REPORTS ********** -----
    public function getCompanyProfile()
    {
        $sql   = "SELECT * FROM gen_company_profile_tbl LIMIT 1";
        $query = $this->db->query($sql);
        return $query ? $query->row() : null;
    }
    // ----- ********** END REPORTS ********** -----

}

    
