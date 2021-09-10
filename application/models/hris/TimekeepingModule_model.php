<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class TimekeepingModule_model extends CI_Model {

    /**
     * ----- REFERENCE -----
     * Ordinary Day                -> Od   | 100% - 1.0
     * Sunday or Rest Day          -> Rd   | 130% - 1.3
     * Special Day or   
     * Special Working/Non-Working -> Sd   | 130% - 1.3
     * Regular Holiday             -> Rh   | 200% - 2.0
     * Double Holiday              -> Dh   | 300% - 3.0
     * Night Shift                 -> Ns   | 110% - 1.1
     * Overtime                    -> Ot   | 125% - 1.25
     * SD falling on RD            -> SdRd | 150% - 1.50
     * RH falling on RD            -> RhRd | 260% - 2.60
     * DH falling on RD            -> DhRd | 390% - 3.90
     * ----- END REFERENCE -----
     */

    public function getEmployeeAttendance($employeeID = 0, $scheduleDate = "")
    {
        $sql    = "SELECT * FROM hris_employee_attendance_tbl WHERE employeeID = $employeeID AND scheduleDate = '$scheduleDate'";
        $query  = $this->db->query($sql);
        return $query ? $query->row() : false;
    }
    
    public function isInGreaterThanOut($date = "", $scheduleIn = "", $scheduleOut = "")
    {
        if ($scheduleIn && $scheduleOut) {
            $in  = $date ? strtotime($date." ".$scheduleIn) : strtotime($scheduleIn);
            $out = $date ? strtotime($date." ".$scheduleOut) : strtotime($scheduleOut);
            $diff = $in - $out;
            return $diff >= 0;
        }
        return false;
    }

    public function getCheckDuration($scheduleIn = "", $scheduleOut = "", $scheduleBreakDuration = "", $checkIn = "", $checkOut = "", $isFromFile = false)
    {
        if ($scheduleIn && $scheduleOut && $scheduleBreakDuration && $checkIn && $checkOut) {

            $nScheduleIn  = strtotime($scheduleIn);
            $nScheduleOut = strtotime($scheduleOut);
            $nCheckIn     = strtotime($checkIn);
            $nCheckOut    = strtotime($checkOut);

            $timeInDiff  = $nScheduleIn - $nCheckIn;
            $timeOutDiff = $nScheduleOut - $nCheckOut;

            $in  = $timeInDiff > 0 ? $nScheduleIn : $nCheckIn;
            $out = $timeOutDiff > 0 ? $nCheckOut : $nScheduleOut;

            $duration = ($out - $in) / 3600; // COMPUTE IN HOURS 
            $scheduleDuration = ($nScheduleOut - $nScheduleIn) / 3600;

            if ($duration >= $scheduleDuration || $duration >= ($scheduleDuration - $scheduleBreakDuration) || $isFromFile) {
                $duration = $duration - $scheduleBreakDuration; 
            } else if ($duration <= 0) {
                $duration = 0;
            }
            return $duration;
        }
        return 0;
    }

    

    

    public function getNightDifferentialDuration($date = "", $timeIn = "", $timeOut = "", $breakDuration = 0)
    {
        $duration = 0;
        if ($date && $timeIn && $timeOut) {
            $ND_START_TIME = $date." 22:00:00";
            $ND_END_TIME   = date("Y-m-d", strtotime($date.' +1 day'))." 06:00:00";

            $nTimeStart = strtotime($ND_START_TIME);
            $nTimeEnd   = strtotime($ND_END_TIME);
            $nTimeIn    = strtotime($timeIn);
            $nTimeOut   = strtotime($timeOut);
            
            $inDiff = ($nTimeOut - $nTimeStart) / 3600;

            if ($inDiff > 0) {
                $nInDiff  = ($nTimeIn - $nTimeStart) / 3600;
                $nOutDiff = ($nTimeEnd - $nTimeOut) / 3600;

                $oTimeIn  = $nInDiff > 0 ? $timeIn : $ND_START_TIME;
                $oTimeOut = $nOutDiff > 0 ? $timeOut : $ND_END_TIME;

                $tempDuration  = (strtotime($oTimeOut) - strtotime($oTimeIn)) / 3600;
                $tempDuration2 = $tempDuration - $breakDuration;
                $duration      = $tempDuration2 > 0 ? $tempDuration2 : 0;
            }
        }
        return $duration;
    }

    // ----- ********** GETTING HOURS OF WORK ********** -----
    public function getDuration($timeIn = "", $timeOut = "")
    {
        if ($timeIn && $timeOut) {
            $timeIn  = strtotime($timeIn);
            $timeOut = strtotime($timeOut);

            $diff = $timeOut - $timeIn;
            $duration = ($diff / 3600); // COMPUTE IN HOURS 
            return $duration;
        }
        return 0;
    }

    public function getProduction($dayType = "", $restDay = true, $basicHours = 0, $overtimeHours = 0, $checkNightDiff = 0, $overtimeNightDiff = 0, $totalHours = 0)
    {
        // ORDINARY DAY
        $OdHours       = 0;
        $OdOtHours     = 0;
        $OdNsHours     = 0;
        $OdNsOtHours   = 0;
        $OdRdHours     = 0;
        $OdRdOtHours   = 0;
        $OdRdNsHours   = 0;
        $OdRdNsOtHours = 0;

        // SPECIAL DAY | SPECIAL HOLIDAY
        // $SdHours       = 0;
        // $SdOtHours     = 0;
        // $SdNsHours     = 0;
        // $SdNsOtHours   = 0;
        $SdRdHours     = 0;
        $SdRdOtHours   = 0;
        $SdRdNsHours   = 0;
        $SdRdNsOtHours = 0;

        // REGULAR HOLIDAY
        // $RhHours       = 0;
        // $RhOtHours     = 0;
        // $RhNsHours     = 0;
        // $RhNsOtHours   = 0;
        $RhRdHours     = 0;
        $RhRdOtHours   = 0;
        $RhRdNsHours   = 0;
        $RhRdNsOtHours = 0;

        // DOUBLE HOLIDAY
        // $DhHours       = 0;
        // $DhOtHours     = 0;
        // $DhNsHours     = 0;
        // $DhNsOtHours   = 0;
        $DhRdHours     = 0;
        $DhRdOtHours   = 0;
        $DhRdNsHours   = 0;
        $DhRdNsOtHours = 0;

        if ($dayType) 
        {
            if ($dayType == "special holiday" || $dayType == "special working holiday" || $dayType == "special non-working holiday") // SD - SPECIAL DAY
            {
                $SdRdNsOtHours = $overtimeNightDiff;
                $SdRdNsHours   = $checkNightDiff;
                $SdRdOtHours   = $overtimeHours;
                $SdRdHours     = $basicHours - $SdRdNsHours;
            } 
            else if ($dayType == "regular holiday") // RH - REGULAR HOLIDAY
            {
                $RhRdNsOtHours = $overtimeNightDiff;
                $RhRdNsHours   = $checkNightDiff;
                $RhRdOtHours   = $overtimeHours;
                $RhRdHours     = $basicHours - $RhRdNsHours;
            } 
            else if ($dayType == "double holiday") // DH - DOUBLE HOLIDAY
            {
                $DhRdNsOtHours = $overtimeNightDiff;
                $DhRdNsHours   = $checkNightDiff;
                $DhRdOtHours   = $overtimeHours;
                $DhRdHours     = $basicHours - $DhRdNsHours;
            } 
            else // OD - ORDINARY DAY
            {
                if ($restDay) 
                {
                    $OdRdNsOtHours = $overtimeNightDiff;
                    $OdRdNsHours   = $checkNightDiff;
                    $OdRdOtHours   = $overtimeHours;
                    $OdRdHours     = $basicHours - $OdRdNsHours;
                } 
                else 
                {
                    $OdNsOtHours   = $overtimeNightDiff;
                    $OdNsHours     = $checkNightDiff;
                    $OdOtHours     = $overtimeHours;
                    $OdHours       = $basicHours - $OdNsHours;
                }
            }
        }

        return [
            "OdHours"       => $OdHours,       
            "OdOtHours"     => $OdOtHours,     
            "OdNsHours"     => $OdNsHours,     
            "OdNsOtHours"   => $OdNsOtHours,   
            "OdRdHours"     => $OdRdHours,     
            "OdRdOtHours"   => $OdRdOtHours,   
            "OdRdNsHours"   => $OdRdNsHours,   
            "OdRdNsOtHours" => $OdRdNsOtHours,   
            "SdRdHours"     => $SdRdHours,     
            "SdRdOtHours"   => $SdRdOtHours,   
            "SdRdNsHours"   => $SdRdNsHours,   
            "SdRdNsOtHours" => $SdRdNsOtHours, 
            "RhRdHours"     => $RhRdHours,     
            "RhRdOtHours"   => $RhRdOtHours,   
            "RhRdNsHours"   => $RhRdNsHours,   
            "RhRdNsOtHours" => $RhRdNsOtHours,  
            "DhRdHours"     => $DhRdHours,     
            "DhRdOtHours"   => $DhRdOtHours,   
            "DhRdNsHours"   => $DhRdNsHours,   
            "DhRdNsOtHours" => $DhRdNsOtHours, 
        ];
    }
    // ----- ********** END GETTING HOURS OF WORK ********** -----





    // ----- ********** SEARCH TIMESHEET ********** -----
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

        if ($timekeepingID) {
            $sql1 = "SELECT employeeID FROM hris_timekeeping_items_tbl WHERE timekeepingID = $timekeepingID GROUP BY employeeID";
            $query1 = $this->db->query($sql1);
            $result1 = $query1 ? $query1->result_array() : [];
            $idArr = [];
            foreach($result1 as $res1) $idArr[] = $res1["employeeID"];
            $idStr = implode(",", $idArr);
            $sql = "
            SELECT * FROM hris_employee_list_tbl
            WHERE FIND_IN_SET(employeeID, '$idStr')";
        } else {
            $sql = "
            SELECT * FROM hris_employee_list_tbl 
            WHERE employeeStatus NOT IN(0,3,4,6,7)";

        }

        $query = $this->db->query($sql);
        return $query ? $query->result_array() : [];
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
        FROM 
            hris_no_timein_timeout_tbl 
        WHERE 
            employeeID = $employeeID AND 
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
                if ($tDiff <= 0) {
                    $outCheckOut = date("Y-m-d", strtotime($date." +1 day"))." $timeOut";
                } else {
                    $outCheckOut = "$date $timeOut";
                }
            } 
            else if ($status == 3) 
            {
                $outCheckIn  = "$date $timeIn";

                $tCheckIn  = strtotime("$date $timeIn");
                $tCheckOut = strtotime("$date $timeOut");
                $tDiff = $tCheckOut - $tCheckIn;
                if ($tDiff <= 0) {
                    $outCheckOut = date("Y-m-d", strtolower($date." +1 day"))." $timeOut";
                } else {
                    $outCheckOut = "$date $timeOut";
                }
            }
        }

        if ($outCheckIn && $outCheckOut) 
        {
            $in  = count(explode(" ", $outCheckIn)) > 0 ? date("H:i", strtotime($outCheckIn)) : $outCheckIn;
            $out = count(explode(" ", $outCheckOut)) > 0 ? date("H:i", strtotime($outCheckOut)) : $outCheckOut;
            $isGraveyard = $this->isInGreaterThanOut($date, $in, $out);
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

            $sql = "SELECT * FROM hris_overtime_request_tbl WHERE employeeID = $employeeID AND overtimeRequestDate = '$date' AND overtimeRequestStatus = 2";
            $query = $this->db->query($sql);
            $result = $query ? $query->row() : false;
            if ($result) {
                $id = $result->overtimeRequestID;
                $createdAt = $result->createdAt;

                $timeIn  = $result->overtimeRequestTimeIn;
                $timeOut = $result->overtimeRequestTimeOut;
                $reference = getFormCode("OTR", $createdAt, $id);
                $in  = date("Y-m-d")." $timeIn";
                $out = date("Y-m-d")." $timeOut";
                $duration = $this->getDuration($in, $out);

                $breakDuration = 1;
                $duration = $duration > $breakDuration ? $duration - $breakDuration : $duration;

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
            FROM 
                hris_leave_request_tbl 
            WHERE 
                employeeID = $employeeID AND 
                '$date' BETWEEN leaveRequestDateFrom AND leaveRequestDateTo AND
                leaveRequestStatus = 2";
            $query = $this->db->query($sql);
            $result = $query ? $query->row() : false;
            if ($result) {
                $id        = $result->leaveRequestID;
                $createdAt = $result->createdAt;
                $type      = $result->leaveName;

                $reference = getFormCode("LRF", $createdAt, $id);
                $in  = $scheduleIn;
                $out = $scheduleOut;
                $duration = $scheduleDuration;

                return [
                    "id"        => $id,
                    "reference" => $reference,
                    "in"        => $in,
                    "out"       => $out,
                    "duration"  => $duration,
                    "type"      => $type
                ];
            }
        }
        return false;
    }

    public function getDayType($date = "")
    {
        $sql = "
        SELECT 
            LOWER(holidayType) AS holidayType 
        FROM 
            hris_holiday_tbl 
        WHERE 
            holidayDate = '$date'";
        $query = $this->db->query($sql);
        $result = $query->row();
        return $result ? $result->holidayType : "ordinary day";
    }

    public function getTimekeepingProduction($timekeepingItemID = 0)
    {
        if ($timekeepingItemID) 
        {
            $sql = "SELECT * FROM hris_timekeeping_production_tbl WHERE timekeepingItemID = $timekeepingItemID";
            $query = $this->db->query($sql);
            return $query ? $query->row() : null;
        }
        return null;
    }

    public function getTimekeepingItem($timekeepingID = 0, $employeeID = 0, $scheduleDate = "")
    {
        if ($timekeepingID && $employeeID && $scheduleDate)
        {
            $sql = "
            SELECT 
                * 
            FROM
                hris_timekeeping_items_tbl
            WHERE
                timekeepingID = $timekeepingID
                AND employeeID = $employeeID
                AND scheduleDate = '$scheduleDate'";
            $query = $this->db->query($sql);
            return $query ? $query->row() : null;
        }
        return null;
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
        if ($file && count($file) > 0 && $file[0] && count($file[0]) > 0) 
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
                    $employeeID = $emp["employeeID"];
                    if ($empID == $employeeID) $flag = true;
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
                $employeeFirstname = $emp["employeeFirstname"];
                $employeeLastname  = $emp["employeeLastname"];
                $createdAt         = $emp["createdAt"];
                $fullname          = $employeeFirstname." ".$employeeLastname;
                $profile           = $emp["employeeProfile"] ?? "default.jpg";
                $code              = getFormCode("EMP", $createdAt, $employeeID);

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
                        $empID = $dt["employeeID"];
                        $files = $dt["data"] ?? [];
                        if ($empID == $employeeID) 
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
                        $error = "Warning|There is a value ignored at line $row";
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
                    $leaveReference        = "";

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
                        $timekeepingItem = $this->getTimekeepingItem($timekeepingID, $employeeID, $date);
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

                            $checkNightDiff    = $this->getNightDifferentialDuration($date, $checkIn, $checkOut);
                            $overtimeNightDiff = $this->getNightDifferentialDuration($date, $overtimeIn, $overtimeOut);
                            $nightDifferential = $checkNightDiff + $overtimeNightDiff;

                            $production = $this->getTimekeepingProduction($timekeepingItemID);
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
                                    $checkDuration = $this->getCheckDuration($scheduleIn, $scheduleOut, $scheduleBreakDuration, $tCheckIn, $tCheckOut);
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
    
                            $leaveRequest = $this->getLeaveRequest($employeeID, $date, $scheduleIn, $scheduleOut, $scheduleDuration);
                            if ($leaveRequest) 
                            {
                                $leaveID        = $leaveRequest["id"];
                                $leaveReference = $leaveRequest["reference"];
                                $leaveType      = $leaveRequest["type"];
                                $leaveIn        = $leaveRequest["in"];
                                $leaveOut       = $leaveRequest["out"];
                                $leaveDuration  = $leaveRequest["duration"];
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
    
                            $basicHours    = $checkDuration > 0 ? $checkDuration : $leaveDuration;
                            $overtimeHours = $overtimeDuration;
                            $totalHours    = $basicHours + $overtimeHours;                        
                        }
    
                        $checkNightDiff    = $this->getNightDifferentialDuration($date, $checkIn, $checkOut);
                        $overtimeNightDiff = $this->getNightDifferentialDuration($date, $overtimeIn, $overtimeOut);
                        $nightDifferential = $checkNightDiff + $overtimeNightDiff;

                        // ----- ***** DEPENDENCIES ***** -----
                        $restDay = $status == "REST_DAY" || $status == "NO_SCHEDULE";
                        $dayType = $this->getDayType($date);
                        // ----- ***** END DEPENDENCIES ***** -----

                        $production = $this->getProduction($dayType, $restDay, $basicHours, $overtimeHours, $checkNightDiff, $overtimeNightDiff, $totalHours);
                    }


                    if ($file && count($file) > 0 && $file[1] && count($file[1]) > 0) 
                    {
                        $file_data = $file[1] ?? [];
                        foreach($file_data as $dt) 
                        {
                            $empID = $dt["employeeID"];
                            $files = $dt["data"];
                            if ($empID == $employeeID) 
                            {
                                foreach($files as $indx => $fl) 
                                {
                                    $schedule  = $fl["schedule"];
                                    $row       = $fl["row"];
                                    $fCheckIn  = $fl["timein"];
                                    $fCheckOut = $fl["timeout"];
                                    $fCheckBreakDuration = $fl["breakduration"];
                                    
                                    if ($schedule == $date && $fCheckIn && $fCheckOut)
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
        
                                        $checkDuration = $this->getCheckDuration($scheduleIn, $scheduleOut, $scheduleBreakDuration, $checkIn, $checkOut, true);

                                        $basicHours = $checkDuration;
                                        $totalHours = $basicHours + $overtimeHours; 
                                        
                                        $checkNightDiff    = $this->getNightDifferentialDuration($date, $scheduleIn, $scheduleOut);
                                        $nightDifferential = $checkNightDiff + $overtimeNightDiff;

                                        $production = $this->getProduction($dayType, $restDay, $basicHours, $overtimeHours, $checkNightDiff, $overtimeNightDiff, $totalHours);

                                        $msg = "Data successfully imported at line $row";
                                        $data["success"][] = $msg;
                                        // break;
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
                    if ($totalHours > 0 || $status == "COMPLETE") {
                        $totalNoDays += 1;
                    }

                    $temp = [
                        "attendanceID"          => $attendanceID,
                        "scheduleDate"          => $date,
                        "scheduleIn"            => $scheduleIn,
                        "scheduleOut"           => $scheduleOut,
                        "scheduleBreakDuration" => $scheduleBreakDuration,
                        "scheduleDuration"      => $scheduleDuration,
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
                        "leaveDuration"         => $leaveDuration,
                        "checkDuration"         => $checkDuration,
                        "basicHours"            => $basicHours,
                        "overtimeHours"         => $overtimeHours,
                        "nightDifferential"     => $nightDifferential,
                        "totalHours"            => $totalHours,
                        "status"                => $status,

                        "production" => $production
                    ];
                    $employeeAttendance[] = $temp;
                }

                $temp = [
                    "employeeID"         => $employeeID,
                    "code"               => $code,
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
    // ----- ********** END SEARCH TIMESHEET ********** -----






    



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

}
