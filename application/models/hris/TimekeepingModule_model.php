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
            foreach($period as $key => $prd) {
                $temp = [
                    "day"  => $prd->format("D"),
                    "date" => $prd->format("Y-m-d"),
                    "number" => $prd->format("d")
                ];
                $data[$key] = $temp;
            }
        }
        return $data;
    }

    public function getAllEmployees()
    {
        $sql = "SELECT * FROM hris_employee_list_tbl";
        $query = $this->db->query($sql);
        return $query ? $query->result_array() : [];
    }

    public function getEmployeeAttendance($employeeID = 0, $scheduleDate = "")
    {
        $sql    = "SELECT * FROM hris_employee_attendance_tbl WHERE employeeID = $employeeID AND scheduleDate = '$scheduleDate'";
        $query  = $this->db->query($sql);
        return $query ? $query->row() : false;
    }

    public function searchTimesheet($startDate= "", $endDate = "")
    {
        $data = [
            "header"     => "-",
            "columns"    => [],
            "attendance" => []
        ];
        if ($startDate && $endDate) {
            $headerDisplay = date("F d, Y", strtotime($startDate))." - ".date("F d, Y", strtotime($endDate));
            $dates     = $this->getColumnLabel($startDate, $endDate);
            $employees = $this->getAllEmployees();

            foreach($employees as $key => $emp) {
                $employeeID = $emp["employeeID"];
                $employeeFirstname = $emp["employeeFirstname"];
                $employeeLastname  = $emp["employeeLastname"];
                $createdAt = $emp["createdAt"];
                $fullname  = $employeeFirstname." ".$employeeLastname;
                $profile   = $emp["employeeProfile"] ?? "default.jpg";
                $code      = getFormCode("EMP", $createdAt, $employeeID);

                $totalHours = $basicHours = 0;
                $employeeAttendance = [];
                foreach($dates as $key2 => $dt) {
                    $day   = $dt["day"];
                    $date  = $dt["date"];
                    $attendance = $this->getEmployeeAttendance($employeeID, $date);
                    $checkDuration = 0;
                    $attendanceID  = 0;
                    if ($attendance) {
                        $attendanceID = $attendance->attendanceID;
                        $checkIn      = $attendance->checkIn;
                        $checkOut     = $attendance->checkOut;

                        $scheduleDuration = $attendance->scheduleDuration ?? 0;
                        $checkDuration    = $attendance->checkDuration ?? 0;

                        $totalHours += $scheduleDuration;
                        $basicHours += $checkDuration;
                    }
                    $temp = [
                        "attendanceID" => $attendanceID,
                        "hours" => $checkDuration,
                        "date"  => $date,
                    ];
                    $employeeAttendance[$key2] = $temp;
                }

                $temp = [
                    "employeeID" => $employeeID,
                    "code"       => $code,
                    "fullname"   => $fullname,
                    "profile"    => $profile,
                    "data"       => $employeeAttendance,
                    "totalHours" => $totalHours,
                    "basicHours" => $basicHours
                ];

                $data["attendance"][$key] = $temp;

            }

            $data["header"]  = $headerDisplay;
            $data["columns"] = $dates;
        }
        return $data;
    }


    // ----- UPLOAD TIMESHEET -----
    public function getStartEndDate($file = [])
    {
        $startDate = $endDate = "";
        if ($file && count($file) > 0) {
            $dates = [];
            foreach($file as $sht) {
                $scheduleDate = $sht["schedule"];
                if ($scheduleDate) {
                    $dates[] = date("Y-m-d", strtotime($scheduleDate));
                }
            }
            usort($dates, function($a, $b) {
                $date1 = strtotime($a);
                $date2 = strtotime($b);
                return $date1 < $date2 ? -1 : 1;
            });
            $startDate = $dates[0];
            $endDate   = $dates[count($dates) - 1];
        }
        return ["startDate" => $startDate, "endDate" => $endDate];
    }

    public function uploadTimesheet($file = [])
    {
        if ($file && count($file) > 0) {
            $startEndDate = $this->getStartEndDate($file);
            if ($startEndDate) {
                $startDate = $startEndDate["startDate"];
                $endDate   = $startEndDate["endDate"];
                return ["startDate" => $startDate, "endDate" => $endDate];
            }
        }
    }
    // ----- END UPLOAD TIMESHEET -----

}
