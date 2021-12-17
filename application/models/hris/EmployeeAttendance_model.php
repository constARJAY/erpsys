<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class EmployeeAttendance_model extends CI_Model {

    public function getAllEmployees()
    {
        /**
         * ----- STATUS -----
         * 0. Resigned
         * 1. Active
         * 2. Probationary
         * 3. AWOL
         * 4. Retired
         * 5. Suspended
         * 6. Terminated
         */

        $sql = "SELECT * FROM hris_employee_list_tbl WHERE employeeStatus IN (1,2,5) AND scheduleID <> 0";
        $query = $this->db->query($sql);
        return $query ? $query->result_array() : [];
    }




    // ----- ***** EMPLOYEE SCHEDULE ***** -----
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

    public function getScheduleInOut($data = false, $date = "", $day = "")
    {
        $scheduleIn    = null;
        $scheduleOut   = null; 
        $breakDuration = 0;
        if ($data) {
            if ($day == "monday" && $data->mondayStatus == 1) {
                $scheduleIn    = $data->mondayFrom;
                $scheduleOut   = $data->mondayTo;
                $breakDuration = $data->mondayBreakDuration;
            } else if ($day == "tuesday" && $data->tuesdayStatus == 1) {
                $scheduleIn    = $data->tuesdayFrom;
                $scheduleOut   = $data->tuesdayTo;
                $breakDuration = $data->tuesdayBreakDuration;
            } else if ($day == "wednesday" && $data->wednesdayStatus == 1) {
                $scheduleIn    = $data->wednesdayFrom;
                $scheduleOut   = $data->wednesdayTo;
                $breakDuration = $data->wednesdayBreakDuration;
            } else if ($day == "thursday" && $data->thursdayStatus == 1) {
                $scheduleIn    = $data->thursdayFrom;
                $scheduleOut   = $data->thursdayTo;
                $breakDuration = $data->thursdayBreakDuration;
            } else if ($day == "friday" && $data->fridayStatus == 1) {
                $scheduleIn    = $data->fridayFrom;
                $scheduleOut   = $data->fridayTo;
                $breakDuration = $data->fridayBreakDuration;
            } else if ($day == "saturday" && $data->saturdayStatus == 1) {
                $scheduleIn    = $data->saturdayFrom;
                $scheduleOut   = $data->saturdayTo;
                $breakDuration = $data->saturdayBreakDuration;
            } else if ($day == "sunday" && $data->sundayStatus == 1) {
                $scheduleIn    = $data->sundayFrom;
                $scheduleOut   = $data->sundayTo;
                $breakDuration = $data->sundayBreakDuration;
            } 

            $isGraveyard = $this->isInGreaterThanOut($date, $scheduleIn, $scheduleOut);
            if ($isGraveyard) {
                $scheduleIn = $date." ".$scheduleIn;
                $scheduleOut = date('Y-m-d', strtotime($date.' +1 day'))." ".$scheduleOut;
            } else {
                $scheduleIn  = $date." ".$scheduleIn;
                $scheduleOut = $date." ".$scheduleOut;
            }
        }
        return [
            "scheduleIn"    => $scheduleIn,
            "scheduleOut"   => $scheduleOut,
            "breakDuration" => $breakDuration
        ];
    }


    // ----- GET CHANGE SCHEDULE -----
    public function getChangeSchedule($employeeID = 0, $date = "",  $scheduleIn = "", $scheduleOut = "", $breakDuration = 0)
    {
        $data = [
            "scheduleIn"    => $scheduleIn,
            "scheduleOut"   => $scheduleOut,
            "breakDuration" => $breakDuration
        ];

        if ($employeeID && $date)
        {
            $sql = "SELECT * FROM hris_change_schedule_tbl WHERE employeeID = $employeeID AND changeScheduleDate = '$date' AND changeScheduleStatus = 2";
            $query = $this->db->query($sql);
            $result = $query ? $query->row() : null;
            if ($result)
            {
                $timeIn  = $result->changeScheduleTimeIn ?? "00:00:00";
                $timeOut = $result->changeScheduleTimeOut ?? "00:00:00";

                $changeScheduleIn  = $date." ".$timeIn;
                $changeScheduleOut = $date." ".$timeOut;

                $data = [
                    "scheduleIn"    => $changeScheduleIn,
                    "scheduleOut"   => $changeScheduleOut,
                    "breakDuration" => $breakDuration
                ];
            }
        }
        return $data;
    }
    // ----- END GET CHANGE SCHEDULE -----


    public function getSchedule($employeeID = 0, $scheduleID = 0, $date = "")
    {
        $data = [
            "scheduleIn"    => null,
            "scheduleOut"   => null,
            "breakDuration" => null
        ];

        $day = strtolower(date("l", strtotime($date)));
        $sql = "SELECT * FROM hris_schedule_setup_tbl WHERE scheduleID = $scheduleID";
        $query = $this->db->query($sql);
        $result = $query ? $query->row() : false;
        if ($result) 
        {
            $data = $this->getScheduleInOut($result, $date, $day);

            if ($data && !empty($data))
            {
                $scheduleIn    = $data["scheduleIn"];
                $scheduleOut   = $data["scheduleOut"];
                $breakDuration = $data["breakDuration"];

                $data = $this->getChangeSchedule($employeeID, $date, $scheduleIn, $scheduleOut, $breakDuration);
            }

        }
        return $data;
    }

    public function getScheduleDateTime($employeeID = 0, $date = "")
    {
        $data = [
            "scheduleIn"    => null,
            "scheduleOut"   => null,
            "breakDuration" => null
        ];
        $sql    = "SELECT scheduleID FROM hris_employee_list_tbl WHERE employeeID = $employeeID";
        $query  = $this->db->query($sql);
        $result = $query ? $query->row() : false;
        if ($result) {
            $scheduleID = $result->scheduleID;
            $data = $this->getSchedule($employeeID, $scheduleID, $date);
        }
        return $data;
    }
    // ----- ***** END EMPLOYEE SCHEDULE ***** -----





    // ----- ***** SYNC EMPLOYEE ATTTENDANCE ***** -----

    /* 
     *    NOTE: In iclock_transaction table, the column "mobile" is used in syncing the data.
     *    VALUES:
     *    1) NULL = Not sync yet
     *    2) 1    = Synced
     * 
     *    ----- PUNCH STATE STATUS -----
     *    0 - Check In
     *    1 - Check Out
     *    4 - Break In
     *    5 - Break Out
     */

    public function getCheckDuration($scheduleIn = "", $scheduleOut = "", $scheduleBreakDuration = 0, $checkIn = "", $checkOut = "")
    {
        if ($scheduleIn && $scheduleOut && $checkIn && $checkOut) {
            $scheduleIn  = strtotime($scheduleIn);
            $scheduleOut = strtotime($scheduleOut);
            $checkIn     = strtotime($checkIn);
            $checkOut    = strtotime($checkOut);

            $timeInDiff  = $scheduleIn - $checkIn;
            $timeOutDiff = $scheduleOut - $checkOut;

            $in  = $timeInDiff > 0 ? $scheduleIn : $checkIn;
            $out = $timeOutDiff > 0 ? $checkOut : $scheduleOut;

            $diff = $out - $in;

            $scheduleDuration = ($scheduleOut - $scheduleIn) / 3600;
            $duration = ($diff / 3600); // COMPUTE IN HOURS 

            if ($duration >= $scheduleDuration || $duration >= ($scheduleDuration - $scheduleBreakDuration)) {
                $duration = (float) $duration - (float) $scheduleBreakDuration; 
            } else if ($duration <= 0) {
                $duration = 0;
            }
            return $duration;
        }
        return 0;
    }

    public function getBreakDuration($employeeID = 0, $scheduleIn = "", $checkOut = "")
    {
        $db2 = $this->load->database("biotime", TRUE);

        if ($employeeID && $scheduleIn && $checkOut) {
            $sql = "
            SELECT 
                SUM(breakDuration) AS duration 
            FROM 
                hris_attendance_break_tbl 
            WHERE 
                employeeID = $employeeID
                AND (breakIn >= '$scheduleIn' AND breakOut <= '$checkOut')";
            $query = $db2->query($sql);
            $result = $query ? $query->row() : false;
            return $result ? ($result->duration ?? 0.00) : 0;
        }
        return 0;
    }

    public function getOvertimeDuration($overtimeIn = "", $overtimeOut = "")
    {
        if ($overtimeIn && $overtimeOut) {
            $overtimeIn  = strtotime($overtimeIn);
            $overtimeOut = strtotime($overtimeOut);

            $diff = $overtimeOut - $overtimeIn;
            $duration = ($diff / 3600); // COMPUTE IN HOURS 
            return $duration;
        }
        return 0;
    }

    public function getEmployeeCheckIn($emp_code = 1, $scheduleIn = "", $scheduleOut = "")
    {
        $db2 = $this->load->database("biotime", TRUE);

        $sql = "
        SELECT 
            punch_time 
        FROM 
            iclock_transaction 
        WHERE 
            punch_state = 0 AND 
            emp_code = '$emp_code' AND 
            punch_time BETWEEN '$scheduleIn' AND '$scheduleOut' AND 
            mobile IS NULL 
        ORDER BY punch_time ASC LIMIT 1";
        $query  = $db2->query($sql);
        $result = $query ? $query->row() : false;
        return $result ? $result->punch_time : null;
    }

    public function getEmployeeCheckOut($emp_code = 1, $scheduleIn = "", $scheduleOut = "")
    {
        $db2 = $this->load->database("biotime", TRUE);

        $sql = "
        SELECT 
            punch_time 
        FROM 
            iclock_transaction 
        WHERE 
            punch_state = 1 AND 
            emp_code = '$emp_code' AND 
            punch_time BETWEEN '$scheduleIn' AND '$scheduleOut' AND 
            mobile IS NULL 
        ORDER BY punch_time DESC LIMIT 1";
        $query  = $db2->query($sql);
        $result = $query ? $query->row() : false;
        return $result ? $result->punch_time : null;
    }

    public function getAttendanceTransactionDate()
    {
        $db2 = $this->load->database("biotime", TRUE);

        $sql   = "SELECT DATE(punch_time) AS punch_time FROM iclock_transaction WHERE mobile IS NULL GROUP BY DATE(punch_time)";
        $query = $db2->query($sql);
        return $query ? $query->result_array() : [];
    }

    public function isEmployeeAttendanceExists($employeeID = 0, $scheduleDate = "", $scheduleIn = "", $scheduleOut = "")
    {
        $sql    = "SELECT * FROM hris_employee_attendance_tbl WHERE employeeID = $employeeID AND scheduleDate = '$scheduleDate'";
        $query  = $this->db->query($sql);
        $result = $query ? $query->result_array() : [];
        return count($result) > 0;
    }

    public function insertEmployeeAttendance()
    {
        $sessionID = $this->session->has_userdata("adminSessionID") ? $this->session->userdata("adminSessionID") : 0;

        $data = [];
        $employees = $this->getAllEmployees();
        foreach($employees as $emp) {
            $emp_code = $emp["employeeID"];

            $transactionDates = $this->getAttendanceTransactionDate();
            $todayDate = [
                [ "punch_time" => date("Y-m-d") ]
            ];
            $dates = array_merge($transactionDates, $todayDate);
            $newDates = [];
            foreach($dates as $dt) array_push($newDates, $dt["punch_time"]); // INSERT DATE ONLY IN ARRAY
            $newDates = array_unique($newDates);
            foreach($newDates as $date) {
                $scheduleDateTime = $this->getScheduleDateTime($emp_code, $date);
                if ($scheduleDateTime) {
                    $scheduleIn    = $scheduleDateTime["scheduleIn"];
                    $scheduleOut   = $scheduleDateTime["scheduleOut"];
                    $breakDuration = $scheduleDateTime["breakDuration"];

                    $scheduleDuration = 0;
                    if ($scheduleIn && $scheduleOut) {
                        if ($scheduleIn == $scheduleOut) {
                            $breakDuration    = 0;
                            $scheduleDuration = 0;
                        } else {
                            $dateSched1 = strtotime($scheduleIn);
                            $dateSched2 = strtotime($scheduleOut);
                            $scheduleDuration = ($dateSched2 - $dateSched1) / 3600;
                            $scheduleDuration = $scheduleDuration - $breakDuration;
                        }
                    }

                    $isExisting = $this->isEmployeeAttendanceExists($emp_code, $date, $scheduleIn, $scheduleOut);
                    if (!$isExisting) {
                        $temp = [
                            "employeeID"            => $emp_code,
                            "scheduleDate"          => $date,
                            "scheduleIn"            => $scheduleIn,
                            "scheduleOut"           => $scheduleOut,
                            "scheduleBreakDuration" => $breakDuration,
                            "scheduleDuration"      => $scheduleDuration,
                            "createdBy"             => $sessionID,
                            "updatedBy"             => $sessionID
                        ];
                        array_push($data, $temp);
                    }
                }
            }
        }
        if (count($data) > 0) {
            $query = $this->db->insert_batch("hris_employee_attendance_tbl", $data);
            return $query ? true : false;
        }
        return true;
    }

    public function getAttendanceTransactionByEmployee()
    {
        $db2 = $this->load->database("biotime", TRUE);

        $sql   = "SELECT emp_code FROM iclock_transaction WHERE mobile IS NULL GROUP BY emp_code";
        $query = $db2->query($sql);
        return $query ? $query->result_array() : [];
    }

    public function getEmployeeAttendance($employeeID = 0, $scheduleDate = "")
    {
        $sql = "SELECT * FROM hris_employee_attendance_tbl WHERE employeeID = $employeeID AND scheduleDate = '$scheduleDate'";
        $query = $this->db->query($sql);
        return $query ? $query->row() : null;
    }

    public function updateEmployeeCheckInOut($employeeID = 0, $scheduleDate = "", $checkIn = "", $checkOut = "")
    {
        if ($employeeID && $scheduleDate) {
            $inCheckIn = $inCheckOut = NULL;
            $employeeAttendance = $this->getEmployeeAttendance($employeeID, $scheduleDate);
            if ($employeeAttendance) {
                $scheduleIn    = $employeeAttendance->scheduleIn;
                $scheduleOut   = $employeeAttendance->scheduleOut;
                $scheduleBreakDuration = $employeeAttendance->scheduleBreakDuration;
                $savedCheckIn  = $employeeAttendance->checkIn ?? $checkIn;
                $savedCheckOut = $checkOut ? $checkOut : $employeeAttendance->checkOut;

                $inCheckIn  = $savedCheckIn ?? null;
                $inCheckOut = $savedCheckOut ?? null;
                
                $isInGreaterOutCheck = $this->isInGreaterThanOut(false, $inCheckIn, $inCheckOut);
                if ($isInGreaterOutCheck) {
                    $isWithin = isWithinSchedule($scheduleIn, $scheduleOut, $inCheckOut);
                    if ($isWithin) {
                        $inCheckOut = $checkOut;
                    }
                }
                
                $duration = $this->getCheckDuration($scheduleIn, $scheduleOut, $scheduleBreakDuration, $inCheckIn, $inCheckOut);
    
                $data = [
                    "checkIn"       => $inCheckIn,
                    "checkOut"      => $inCheckOut,
                    "checkDuration" => $duration
                ];
                $query = $this->db->update("hris_employee_attendance_tbl", 
                    $data, 
                    [
                        "employeeID"   => $employeeID, 
                        "scheduleDate" => $scheduleDate
                    ]);
                return $query ? true : false;
            }
        }
        return false;
    }

    public function updateEmployeeLateUndertime($employeeID = 0, $scheduleDate = "", $checkIn = "", $checkOut = "")
    {
        if ($employeeID && $scheduleDate) 
        {
            $inCheckIn = $inCheckOut = NULL;
            $employeeAttendance = $this->getEmployeeAttendance($employeeID, $scheduleDate);
            if ($employeeAttendance) 
            {
                $scheduleIn            = $employeeAttendance->scheduleIn;
                $scheduleOut           = $employeeAttendance->scheduleOut;
                $scheduleBreakDuration = $employeeAttendance->scheduleBreakDuration;
                $scheduleDuration      = $employeeAttendance->scheduleDuration ?? 0;
                $savedCheckIn          = $employeeAttendance->checkIn ?? $checkIn;
                $savedCheckOut         = $savedCheckIn ? $checkOut ?? $employeeAttendance->checkOut : null;

                $inCheckIn  = $savedCheckIn ?? null;
                $inCheckOut = $savedCheckOut ?? null;

                if ($scheduleDuration > 0)
                {
                    $lateDuration = $undertimeDuration = 0;
                    if ($inCheckIn) 
                    {
                        $lateDuration = $this->getDuration($scheduleIn, $inCheckIn);
                        $lateDuration = $lateDuration > 0 ? $lateDuration : 0;
                    }
                    if ($inCheckOut) 
                    {
                        $undertimeDuration = $this->getDuration($inCheckOut, $scheduleOut);
                        $undertimeDuration = $undertimeDuration > 0 ? $undertimeDuration : 0;
                    }
    
                    $data = [
                        "lateDuration"      => $lateDuration,
                        "undertimeDuration" => $undertimeDuration
                    ];
                    $query = $this->db->update("hris_employee_attendance_tbl", 
                        $data, 
                        [
                            "employeeID"   => $employeeID, 
                            "scheduleDate" => $scheduleDate
                        ]);
                    return $query ? true : false;
                }

            }
        }
        return false;
    }

    public function updateEmployeeUndertime($employeeID = 0, $scheduleDate = "", $checkIn = "", $checkOut = "")
    {
        
    }

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

    public function updateEmployeeOvertimeInOut($employeeID = 0, $scheduleDate = "", $checkIn = "", $checkOut = "")
    {
        if ($employeeID && $scheduleDate && $checkOut) 
        {
            $overtimeIn = $overtimeOut = null;
            $overtimeDuration = 0;

            $employeeAttendance = $this->getEmployeeAttendance($employeeID, $scheduleDate);
            if ($employeeAttendance) 
            {
                $scheduleIn  = $employeeAttendance->scheduleIn;
                $scheduleOut = $employeeAttendance->scheduleOut;

                if ($scheduleIn != $scheduleOut) 
                {
                    $duration = $this->getDuration($scheduleOut, $checkOut);
                    if ($duration > 0) 
                    {
                        $overtimeIn  = $scheduleOut;
                        $overtimeOut = $checkOut;
                        $overtimeDuration = $this->getDuration($overtimeIn, $overtimeOut);
    
                        $data = [
                            "overtimeIn"       => $overtimeIn,
                            "overtimeOut"      => $overtimeOut,
                            "overtimeDuration" => $overtimeDuration,
                        ];
                        $query = $this->db->update(
                            "hris_employee_attendance_tbl",
                            $data,
                            ["employeeID" => $employeeID, "scheduleDate" => $scheduleDate]);
                        return $query ? true : false;
                    }
                }
            }
            
        }
        return false;
    }


    public function updateBiotimeAttendance()
    {
        $db2 = $this->load->database("biotime", TRUE);

        $data  = ["mobile" => 1];
        $where = ["mobile" => NULL];
        $query = $db2->update("iclock_transaction", $data, $where);
        return $query ? true : false;
    }

    public function syncEmployeeAttendance()
    {
        $db2 = $this->load->database("biotime", TRUE);

        $insertEmployeeAttendance = $this->insertEmployeeAttendance();
        $employeeTransactions     = $this->getAttendanceTransactionByEmployee();

        $transactionDates = $this->getAttendanceTransactionDate();
        $todayDate = [
            [ "punch_time" => date("Y-m-d") ]
        ];
        $dates = array_merge($transactionDates, $todayDate);
        $newDates = [];
        foreach($dates as $dt) array_push($newDates, $dt["punch_time"]); // INSERT DATE ONLY 
        $newDates = array_unique($newDates);

        foreach($employeeTransactions as $empTrans) {
            $emp_code = $empTrans["emp_code"];
            foreach($newDates as $index => $date) {

                $employeeSchedule = getEmployeeScheduleInOut($emp_code, $date);
                $scheduleIn    = "$date 00:00:00";
                $scheduleOut   = "$date 23:59:59";
                $breakDuration = $employeeSchedule["breakDuration"] ?? 0;
                if (($index+1) != count($newDates))
                {
                    $tempDate = date('Y-m-d', strtotime($date.' +1 day'));
                    $employeeSchedule2 = getEmployeeScheduleInOut($emp_code, $tempDate);
                    $scheduleOut = $employeeSchedule2["scheduleIn"] ?? "";
                }

                $checkIn  = $this->getEmployeeCheckIn($emp_code, $scheduleIn, $scheduleOut);
                $checkOut = $this->getEmployeeCheckOut($emp_code, $scheduleIn, $scheduleOut);
                
                $updateEmployeeCheckInOut    = $this->updateEmployeeCheckInOut($emp_code, $date, $checkIn, $checkOut);
                $updateEmployeeOvertimeInOut = $this->updateEmployeeOvertimeInOut($emp_code, $date, $checkIn, $checkOut);
                $updateEmployeeLateUndertime = $this->updateEmployeeLateUndertime($emp_code, $date, $checkIn, $checkOut);
            }
        }      
        $updateBiotimeAttendance = $this->updateBiotimeAttendance();
        return $updateBiotimeAttendance;

    }
    // ----- ***** END SYNC EMPLOYEE ATTTENDANCE ***** -----





    // ----- ***** SYNC EMPLOYEE TO DEVICE ***** -----
    public function isBiotimeEmployeeExists($emp_code = "")
    {
        $db2 = $this->load->database("biotime", TRUE);

        $sql    = "SELECT * FROM personnel_employee WHERE emp_code = '$emp_code' LIMIT 1";
        $query  = $db2->query($sql);
        $result = $query ? $query->result_array() : [];
        return count($result) > 0;
    }

    public function isBiotimeAreaExists($employee_id = 0, $area_id = 0)
    {
        $db2 = $this->load->database("biotime", TRUE);

        if ($employee_id) {
            $sql    = "SELECT * FROM personnel_employee_area WHERE employee_id = $employee_id AND area_id = $area_id";
            $query  = $db2->query($sql);
            $result = $query ? $query->result_array() : [];
            return count($result) > 0;
        }
        return false;
    }

    public function insertBiotimeEmployeeArea($employee_id = 0, $area_id = 2)
    {
        $db2 = $this->load->database("biotime", TRUE);

        if ($employee_id) {
            $isExisting = $this->isBiotimeAreaExists($employee_id, $area_id);
            if (!$isExisting) {
                $data = [
                    "employee_id" => $employee_id,
                    "area_id"     => $area_id
                ];
                $query = $db2->insert("personnel_employee_area", $data);
                return $query ? true : false;
            }
        }
        return true;
    }

    public function getBiotimeEmployeeID($emp_code = "")
    {
        $db2 = $this->load->database("biotime", TRUE);

        if ($emp_code) {
            $sql = "SELECT id FROM personnel_employee WHERE emp_code = '$emp_code' LIMIT 1";
            $query = $db2->query($sql);
            $result = $query ? $query->row() : false;
            return $result ? $result->id : 0; 
        }
        return 0;
    }

    public function updateBiotimeEmployee($id = 0, $data = [])
    {
        $db2 = $this->load->database("biotime", TRUE);
        if ($data) {
            $query = $db2->update("personnel_employee", $data, ["id" => $id]);
            return $query ? true : false;
        }
        return false;
    }

    public function insertBiotimeEmployee($data = [])
    {
        $db2 = $this->load->database("biotime", TRUE);

        if ($data) {
            $emp_code   = $data["emp_code"];
            $first_name = $data["first_name"];
            $last_name  = $data["last_name"];

            $isExisting = $this->isBiotimeEmployeeExists($emp_code);
            if ($isExisting) {
                $id = $this->getBiotimeEmployeeID($emp_code);
                $updateBiotimeEmployee = $this->updateBiotimeEmployee($id, $data);
                if ($updateBiotimeEmployee) {
                    $insertBiotimeEmployeeArea = $this->insertBiotimeEmployeeArea($id);
                    return $insertBiotimeEmployeeArea;
                }
                return false;
            } else {
                $query = $db2->insert("personnel_employee", $data);
                if ($query) {
                    $id = $db2->insert_id();
                    $insertBiotimeEmployeeArea = $this->insertBiotimeEmployeeArea($id);
                    return $insertBiotimeEmployeeArea;
                }
                return false;
            }
        }
        return false;
    }

    public function syncEmployeeToBiotime()
    {
        $employees = $this->getAllEmployees();
        $empCount  = count($employees);
        $flagCount = 0;
        foreach($employees as $emp) {
            $create_time    = date('Y-m-d H:i:s');
            $change_time    = date('Y-m-d H:i:s');
            $emp_code       = $emp["employeeID"];
            $first_name     = $emp["employeeFirstname"];
            $last_name      = $emp["employeeLastname"];
            $self_password  = 'pbkdf2_sha256$36000$cFSu8ACw8E25$jJdIlpUgosia6mD5nAWvGTk8F2oKu9YYIIObLuzoYdo=';
            $dev_privilege  = 0;
            $hire_date      = $emp["employeeHiredDate"];
            $verify_mode    = -1;
            $is_admin       = 0;
            $emp_type       = 1;
            $enable_payroll = 1;
            $deleted        = 0;
            $reserved       = 0;
            $del_tag        = 0;
            $app_status     = 0;
            $app_role       = 1;
            $is_active      = 1;
            $department_id  = 1;
            $position_id    = 1;
            $data = [
                "create_time"    => $create_time,
                "change_time"    => $change_time,
                "emp_code"       => $emp_code,
                "first_name"     => $first_name,
                "last_name"      => $last_name,
                "self_password"  => $self_password,
                "dev_privilege"  => $dev_privilege,
                "hire_date"      => $hire_date,
                "verify_mode"    => $verify_mode,
                // "is_admin"       => $is_admin,
                "emp_type"       => $emp_type,
                "enable_payroll" => $enable_payroll,
                // "deleted"        => $deleted,
                // "reserved"       => $reserved,
                // "del_tag"        => $del_tag,
                "app_status"     => $app_status,
                "app_role"       => $app_role,
                "is_active"      => $is_active,
                "department_id"  => $department_id,
                "position_id"    => $position_id,
            ];
            $insertBiotimeEmployee = $this->insertBiotimeEmployee($data);
            $flagCount = $insertBiotimeEmployee ? $flagCount + 1 : $flagCount;
        }
        return $empCount == $flagCount;
    }
    // ----- ***** END SYNC EMPLOYEE TO DEVICE ***** -----





    // ----- ***** GET TIMESHEET ***** -----
    public function getTimesheetData($employeeID = 0)
    {
        $this->syncEmployeeAttendance();

        $scheduleDate = date("Y-m-d");
        $employeeAttendance = $this->getEmployeeAttendance($employeeID, $scheduleDate);
        if ($employeeAttendance) {
            $scheduleIn  = $employeeAttendance->scheduleIn;
            $scheduleOut = $employeeAttendance->scheduleOut;
            $scheduleDuration = (strtotime($scheduleOut) - strtotime($scheduleIn)) / 3600;
            $checkIn  = $employeeAttendance->checkIn;
            $checkOut = $employeeAttendance->checkOut;
            $checkDuration = $employeeAttendance->checkDuration ?? 0;
            $overtimeDuration = $employeeAttendance->overtimeDuration ?? 0;
            $checkInDate  = $checkIn ? date("l, F d, Y h:i:s A", strtotime($checkIn)) : null;
            $checkOutDate = $checkOut ? date("l, F d, Y h:i:s A", strtotime($checkOut)) : null;

            $timeOut = $checkOut ?? $scheduleOut;

            $breakDuration = $this->getBreakDuration($employeeID, $scheduleIn, $timeOut);

            $totalDuration = $checkDuration + $overtimeDuration;
            
            $data = [
                "dateToday"        => date("F d, Y"),
                "scheduleIn"       => $scheduleIn,
                "scheduleOut"      => $scheduleOut,
                "scheduleDuration" => $scheduleDuration,
                "checkIn"          => $checkIn,
                "checkOut"         => $checkOut,
                "checkDuration"    => $checkDuration,
                "checkInDate"      => $checkInDate,
                "checkOutDate"     => $checkOutDate,
                "breakDuration"    => $breakDuration,
                "overtimeDuration" => $overtimeDuration,
            ];
            return $data;
        }
        return [];
    }
    // ----- ***** END GET TIMESHEET ***** -----




    // ----- ***** GET STATISTICS DATA ***** -----
    public function getTodayStatisticsData($employeeID = 0, $scheduleDate = "")
    {
        if ($employeeID && $scheduleDate) {
            $employeeAttendance = $this->getEmployeeAttendance($employeeID, $scheduleDate);
            if ($employeeAttendance) {
                $checkIn  = $employeeAttendance->checkIn ?? null;
                $checkOut = $employeeAttendance->checkOut ?? null;
                $checkDuration    = $employeeAttendance->checkDuration ?? 0;
                $scheduleDuration = $employeeAttendance->scheduleDuration ?? 0;
    
                $data = [
                    "checkIn"  => $checkIn,
                    "checkOut" => $checkOut,
                    "duration" => $checkDuration,
                    "schedule" => $scheduleDuration
                ];
                return $data;
            }
        }
        return [];
    }

    public function getEmployeeWeekAttendance($employeeID = 0, $startDate = "", $endDate = "")
    {
        if ($employeeID && $startDate && $endDate) {
            $sql = "
            SELECT 
                SUM(checkDuration) AS duration,
                SUM(scheduleDuration) AS schedule
            FROM 
                hris_employee_attendance_tbl 
            WHERE
                employeeID = $employeeID AND
                scheduleDate BETWEEN '$startDate' AND '$endDate'";
            $query  = $this->db->query($sql);
            $result = $query ? $query->row() : null;
            if ($result) {
                $duration = $result->duration;
                $schedule = $result->schedule;
                $scheduleBased = 40;
                $data = [
                    "startDate" => $startDate,
                    "endDate"   => $endDate,
                    "duration"  => $duration,
                    "schedule"  => $scheduleBased,
                ];
                return $data;
            }
        }
        return null;
    }

    public function getWeekStatisticsData($employeeID = 0, $scheduleDate = "")
    {
        if ($employeeID && $scheduleDate) {
            $dayStartWeek = date("Y-m-d", strtotime("monday this week", strtotime($scheduleDate)));
            $dayEndWeek   = date("Y-m-d", strtotime("sunday this week", strtotime($scheduleDate)));
            $data = $this->getEmployeeWeekAttendance($employeeID, $dayStartWeek, $dayEndWeek);
            return $data;
        }
        return null;
    }

    public function getEmployeeMonthAttendance($employeeID = 0, $startDate = "", $endDate = "")
    {
        if ($employeeID && $startDate && $endDate) {
            $sql = "
            SELECT 
                SUM(checkDuration) AS duration,
                SUM(scheduleDuration) AS schedule
            FROM 
                hris_employee_attendance_tbl 
            WHERE
                employeeID = $employeeID AND
                scheduleDate BETWEEN '$startDate' AND '$endDate'";
            $query  = $this->db->query($sql);
            $result = $query ? $query->row() : null;
            if ($result) {
                $duration = $result->duration;
                $schedule = $result->schedule;
                $scheduleBased = 160;
                $data = [
                    "startDate" => $startDate,
                    "endDate"   => $endDate,
                    "duration"  => $duration,
                    "schedule"  => $scheduleBased,
                ];
                return $data;
            }
        }
        return 0;
    }

    public function getMonthStatisticsData($employeeID = 0, $scheduleDate = "")
    {
        if ($employeeID && $scheduleDate) {
            $dayStartMonth = date("Y-m-d", strtotime("first day of this month"));
            $dayEndtMonth  = date("Y-m-d", strtotime("last day of this month"));
            $data = $this->getEmployeeMonthAttendance($employeeID, $dayStartMonth, $dayEndtMonth);
            return $data;
        }
        return null;
    }

    public function getEmployeeOvertimeAttendance($employeeID = 0, $startDate = "", $endDate = "")
    {
        if ($employeeID && $startDate && $endDate) {
            $sql = "
            SELECT 
                SUM(overtimeDuration) AS duration
            FROM 
                hris_employee_attendance_tbl 
            WHERE
                employeeID = $employeeID AND
                scheduleDate BETWEEN '$startDate' AND '$endDate'";
            $query  = $this->db->query($sql);
            $result = $query ? $query->row() : null;
            if ($result) {
                $duration = $result->duration;
                $scheduleBased = 160;
                $data = [
                    "startDate" => $startDate,
                    "endDate"   => $endDate,
                    "duration"  => $duration,
                    "schedule"  => $scheduleBased,
                ];
                return $data;
            }
        }
        return 0;
    }

    public function getOvertimeStatisticsData($employeeID = 0, $scheduleDate = "")
    {
        if ($employeeID && $scheduleDate) {
            $dayStartMonth = date("Y-m-d", strtotime("first day of this month"));
            $dayEndtMonth  = date("Y-m-d", strtotime("last day of this month"));
            $data = $this->getEmployeeOvertimeAttendance($employeeID, $dayStartMonth, $dayEndtMonth);
            return $data;
        }
        return null;
    }

    public function getStatisticsData($employeeID = 0)
    {
        $scheduleDate = date("Y-m-d");
        $data = [
            "today" => $this->getTodayStatisticsData($employeeID, $scheduleDate),
            "week"  => $this->getWeekStatisticsData($employeeID, $scheduleDate),
            "month" => $this->getMonthStatisticsData($employeeID, $scheduleDate),
            "overtime" => $this->getOvertimeStatisticsData($employeeID, $scheduleDate)
        ];
        return $data;
    }
    // ----- ***** END GET STATISTICS DATA ***** -----




    // ----- ***** GET TODAY ACTIVITY DATA ***** -----
    public function getActivityData($employeeID = 0, $startDate = "", $endDate = "")
    {
        $db2 = $this->load->database("biotime", TRUE);
        
        if ($employeeID) {
            $scheduleDate = date("Y-m-d");

            if ($startDate && $endDate) {
                $startDate = $startDate." 00:00:00";
                $endDate   = $endDate." 23:59:59";
            } else {
                $startDate = $scheduleDate." 00:00:00";
                $endDate   = $scheduleDate." 23:59:59";
            }

            $sql = "
            SELECT
                DATE_FORMAT(punch_time, '%W, %M %d, %Y') AS punchDate,
                DATE_FORMAT(punch_time, '%r') AS punchTime,
                (CASE
                    WHEN punch_state = 0 THEN 'Check In at'
                    WHEN punch_state = 1 THEN 'Check Out at'
                    WHEN punch_state = 4 THEN 'Break In at'
                    WHEN punch_state = 5 THEN 'Break Out at'
                    ELSE 'Invalid Punch Status'
                END) AS punchStatus
            FROM
                iclock_transaction
            WHERE 
                emp_code = '$employeeID' AND
                punch_time BETWEEN '$startDate' AND '$endDate'
            ORDER BY punch_time DESC";
            $query = $db2->query($sql);
            return $query ? $query->result_array() : [];
        }
        return null;
    }
    // ----- ***** END GET TODAY ACTIVITY DATA ***** -----





    // ----- ***** GET EMPLOYEE ATTENDANCE DATA **** -----
    public function getNoTimeInOutRequest($employeeID = 0, $scheduleDate = "")
    {
        $id = ""; $reference = "";
        if ($employeeID && $scheduleDate) {
            $sql = "SELECT noTimeinTimeoutID AS ID, createdAt FROM hris_no_timein_timeout_tbl WHERE employeeID = $employeeID AND noTimeinTimeoutDate = '$scheduleDate' AND noTimeinTimeoutStatus = 2";
            $query = $this->db->query($sql);
            $result = $query ? $query->row() : false;
            if ($result) {
                $id = $result->ID;
                $createdAt = $result->createdAt;
                $reference = getFormCode("NTI", $createdAt, $id);
            }
        }
        return ["id" => $id, "reference" => $reference];
    }

    public function getOvertimeRequest($employeeID = 0, $scheduleDate = "")
    {
        $id = ""; $reference = "";
        if ($employeeID && $scheduleDate) {
            $sql = "SELECT overtimeRequestID AS ID, createdAt FROM hris_overtime_request_tbl WHERE employeeID = $employeeID AND overtimeRequestDate = '$scheduleDate' AND overtimeRequestStatus = 2";
            $query = $this->db->query($sql);
            $result = $query ? $query->row() : false;
            if ($result) {
                $id = $result->ID;
                $createdAt = $result->createdAt;
                $reference = getFormCode("OTR", $createdAt, $id);
            }
        }
        return ["id" => $id, "reference" => $reference];
    }

    public function getEmployeeAttendanceData($employeeID = 0, $startDate = "", $endDate = "")
    {
        $this->syncEmployeeAttendance();

        $data = [];
        if ($employeeID) {
            $startDate  = $startDate ? $startDate : date("Y-m-d");
            $endDate    = $endDate ? $endDate : date("Y-m-d");
            $dateFilter = "scheduleDate BETWEEN '$startDate' AND '$endDate'";
            $sql = "
            SELECT
                *,
                DATE_FORMAT(scheduleDate, '%a') AS scheduleDay,
                (IF(scheduleIn <> scheduleOut, CONCAT(DATE_FORMAT(scheduleIn, '%r'), ' - ', DATE_FORMAT(scheduleOut, '%r')), 'No Schedule')) AS scheduleTime
            FROM
                hris_employee_attendance_tbl
            WHERE
                employeeID = $employeeID AND $dateFilter
            ORDER BY scheduleDate DESC";
            $query = $this->db->query($sql);
            $result = $query ? $query->result_array() : [];
            foreach($result as $res) {
                $scheduleDate = $res["scheduleDate"];
                $scheduleIn   = $res["scheduleIn"];
                $scheduleOut  = $res["scheduleOut"];
                $checkOut     = $res["checkOut"];
                $timeOut      = $checkOut ?? $scheduleOut;

                $breakDuration       = $this->getBreakDuration($employeeID, $scheduleIn, $timeOut);
                $noTimeInOutRequest  = $this->getNoTimeInOutRequest($employeeID, $scheduleDate);
                $checkReference      = $noTimeInOutRequest["reference"];
                $checkReferenceID    = $noTimeInOutRequest["id"];
                $overtimeRequest     = $this->getOvertimeRequest($employeeID, $scheduleDate);
                $overtimeReference   = $overtimeRequest["reference"];
                $overtimeReferenceID = $overtimeRequest["id"];

                $checkDuration    = $res["checkDuration"];
                $overtimeDuration = $res["overtimeDuration"];
                $totalDuration    = $checkDuration + $overtimeDuration;

                $temp = [
                    "attendanceID"          => $res["attendanceID"],
                    "scheduleDate"          => $scheduleDate,
                    "scheduleIn"            => $scheduleIn,
                    "scheduleOut"           => $scheduleOut,
                    "scheduleBreakDuration" => $res["scheduleBreakDuration"],
                    "scheduleDay"           => $res["scheduleDay"],
                    "scheduleTime"          => $res["scheduleTime"],
                    "scheduleDuration"      => $res["scheduleDuration"],
                    "checkIn"               => $res["checkIn"],
                    "checkOut"              => $res["checkOut"],
                    "checkReference"        => $checkReference,
                    "checkReferenceID"      => $checkReferenceID,
                    "checkDuration"         => $totalDuration,
                    "breakDuration"         => $breakDuration,
                    "overtimeIn"            => $res["overtimeIn"],
                    "overtimeOut"           => $res["overtimeOut"],
                    "overtimeDuration"      => $res["overtimeDuration"],
                    "overtimeReference"     => $overtimeReference,
                    "overtimeReferenceID"   => $overtimeReferenceID,
                ];
                array_push($data, $temp);
            }
        }
        return $data;
    }
    // ----- ***** END GET EMPLOYEE ATTENDANCE DATA **** -----





    // ----- ***** GET EMPLOYEE ATTENDANCE MODULE DATA ***** -----
    public function getEmployeeAttendanceModuleData($employeeID = 0)
    {
        $data = [
            "timesheet"  => $this->getTimesheetData($employeeID),
            "statistics" => $this->getStatisticsData($employeeID),
            "activity"   => $this->getActivityData($employeeID),
            "attendance" => $this->getEmployeeAttendanceData($employeeID)
        ];
        return $data;
    }
    // ----- ***** END GET EMPLOYEE ATTENDANCE MODULE DATA ***** -----





    // ----- ***** GET EMPLOYEE NOT IN DEVICE ***** -----
    public function getEmployeeNotInDevice()
    {
        $db2 = $this->load->database("biotime", TRUE);

        $sql    = "SELECT GROUP_CONCAT(emp_code) AS id FROM personnel_employee WHERE update_time IS NULL";
        $query  = $db2->query($sql);
        $result = $query ? $query->row() : false;
        $id     = $result ? $result->id : "";

        $sql2   = "SELECT * FROM hris_employee_list_tbl WHERE FIND_IN_SET(employeeID, '$id') AND employeeStatus IN (1,2,5) AND scheduleID <> 0";
        $query2 = $this->db->query($sql2);
        return $query2 ? $query2->result_array() : [];
    }
    // ----- ***** END GET EMPLOYEE NOT IN DEVICE ***** -----

}
