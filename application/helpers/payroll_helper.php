<?php


    // ---------- ********** DURATION ********** ----------
    function getDuration($timeIn = "", $timeOut = "", $breakDuration = 0)
    {
        $duration = 0;
        if ($timeIn && $timeOut)
        {
            $timeIn  = strtotime($timeIn);
            $timeOut = strtotime($timeOut);

            $difference = ($timeOut - $timeIn) / 3600; // COMPUTE IN HOURS 
            $duration = $difference - $breakDuration;
            $duration = $duration > 0 ? $duration : 0;
        }
        return $duration;
    }


    function getProductionDuration($scheduleIn = "", $scheduleOut = "", $breakDuration = 0, $timeIn = "", $timeOut = "")
    {
        $duration = 0;
        if ($scheduleIn && $scheduleOut && $timeIn && $timeOut) 
        {
            $scheduleDuration = getDuration($scheduleIn, $scheduleOut);

            $timeInDuration = getDuration($scheduleIn, $timeIn);
            $finalTimeIn    = $timeInDuration > 0 ? $timeIn : $scheduleIn;

            $timeOutDuration = getDuration($scheduleOut, $timeOut);
            $finalTimeOut    = $timeOutDuration > 0 ? $scheduleOut : $timeOut;

            $duration = getDuration($finalTimeIn, $finalTimeOut, $breakDuration);
        }
        return $duration;
    }


    function getNightDifferentialDuration($date = "", $timeIn = "", $timeOut = "", $breakDuration = 0)
    {
        $duration = 0;
        if ($date && $timeIn && $timeOut) 
        {
            $ndStart = "$date 22:00:00";
            $ndEnd   = date("Y-m-d", strtotime("$date +1 day"))." 06:00:00";

            $inDifference = getDuration($ndStart, $timeOut);
            if ($inDifference > 0)
            {
                $iInDiff  = getDuration($ndStart, $timeIn);
                $iOutDiff = getDuration($ndEnd, $timeOut);

                $oTimeIn  = $iInDiff > 0 ? $timeIn : $ndStart;
                $oTimeOut = $iOutDiff > 0 ? $timeOut : $ndEnd;

                $duration = getDuration($oTimeIn, $oTimeOut);
            }
        }
        return $duration;
    }
    // ---------- ********** END DURATION ********** ----------




    // ---------- ********** TRUE / FALSE ********** ----------
    function validateDate($date, $format = 'Y-m-d H:i:s')
    {
        $d = DateTime::createFromFormat($format, $date);
        return $d && $d->format($format) == $date;
    }


    function isTimeInGreaterTimeOut($date = "", $timeIn = "", $timeOut = "")
    {
        $isGreater = false;
        if ($timeIn && $timeOut) 
        {
            $in   = $date ? strtotime($date." ".$timeIn) : strtotime($timeIn);
            $out  = $date ? strtotime($date." ".$timeOut) : strtotime($timeOut);
            $diff = $in - $out;
            $isGreater = $diff >= 0;
        }
        return $isGreater;
    }


    function isWithinSchedule($scheduleIn = "", $scheduleOut = "", $timePunch = "")
    {
        $CI =& get_instance();

        $isWithin = false;
        if ($scheduleIn && $scheduleOut && $timePunch)
        {
            $sql    = "SELECT IF(('$timePunch' BETWEEN '$scheduleIn' AND '$scheduleOut') OR ('$timePunch' >= '$scheduleIn'), 'TRUE', 'FALSE') AS isWithin";
            $query  = $CI->db->query($sql);
            $result = $query ? $query->row() : null;
            if ($result)
            {
                $isWithin = $result->isWithin == "TRUE";
            }
        }
        return $isWithin;
    }


    function getEmployeeSchedule($employeeID = 0)
    {
        $CI =& get_instance();

        $sql = "
        SELECT 
            hsst.* 
        FROM hris_employee_list_tbl AS helt
            LEFT JOIN hris_schedule_setup_tbl AS hsst USING(scheduleID)
        WHERE employeeID = $employeeID";
        $query = $CI->db->query($sql);
        $result = $query ? $query->row() : null;
        return $result;
    }


    function getEmployeeScheduleInOut($employeeID = 0, $date = "")
    {
        $scheduleIn    = "";
        $scheduleOut   = "";
        $breakDuration = 0;

        if ($employeeID && $date)
        {
            $day  = strtolower(date("l", strtotime($date)));
            $data = getEmployeeSchedule($employeeID);

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
    
                $isGreater = isTimeInGreaterTimeOut($date, $scheduleIn, $scheduleOut);
                if ($isGreater) {
                    $scheduleIn  = $date." ".$scheduleIn;
                    $scheduleOut = date('Y-m-d', strtotime($date.' +1 day'))." ".$scheduleOut;
                } else {
                    $scheduleIn  = $date." ".$scheduleIn;
                    $scheduleOut = $date." ".$scheduleOut;
                }
            }
        }

        return [
            "scheduleIn"    => $scheduleIn,
            "scheduleOut"   => $scheduleOut,
            "breakDuration" => $breakDuration
        ];
    }
    // ---------- ********** TRUE / FALSE ********** ----------





    // ---------- ********** PAYROLL ********* ---------
    function getPayrollDayRate($dayType = "", $isRestDay = false, $isLeave = false)
    {
        /**
         * DAY TYPE
         * - ordinary day
         * - special day
         * - regular holiday
         * - double holiday
         */

        $basicRate = $overtimeRate = $nightDiffRate = 0;

        if ($dayType == "ordinary day" || $isLeave)
        {
            $basicRate     = !$isRestDay ? 1.00 : 1.30;
            $overtimeRate  = !$isRestDay ? 1.25 : 1.30;
            $nightDiffRate = !$isRestDay ? 0.10 : 0.10;
        }
        else if ($dayType == "special holiday" || $dayType == "special working holiday" || $dayType == "special non-working holiday")
        {
            $basicRate     = !$isRestDay ? 1.30 : 1.50;
            $overtimeRate  = !$isRestDay ? 1.30 : 1.30;
            $nightDiffRate = !$isRestDay ? 0.10 : 0.10;
        }
        else if ($dayType == "regular holiday")
        {
            $basicRate     = !$isRestDay ? 2.00 : 2.60;
            $overtimeRate  = !$isRestDay ? 1.30 : 1.30;
            $nightDiffRate = !$isRestDay ? 0.10 : 0.10;
        }
        else if ($dayType == "double holiday")
        {
            $basicRate     = !$isRestDay ? 3.00 : 3.90;
            $overtimeRate  = !$isRestDay ? 1.30 : 1.30;
            $nightDiffRate = !$isRestDay ? 0.10 : 0.10;
        }

        return [
            "basicRate"     => $basicRate,
            "overtimeRate"  => $overtimeRate,
            "nightDiffRate" => $nightDiffRate,
        ];
    }


    function getPayrollDaySalary($hourlyRate = 0, $basicHours = 0, $overtimeHours = 0, $nightDiffHours = 0, $dayType = "", $isRestDay = false, $isLeave = false)
    {
        $basicPay = $overtimePay = $nightDiffPay = $totalPay = 0;

        if ($dayType)
        {
            $rate = getPayrollDayRate($dayType, $isRestDay, $isLeave);
            $basicRate     = $rate["basicRate"];
            $overtimeRate  = $rate["overtimeRate"];
            $nightDiffRate = $rate["nightDiffRate"];

            $basicPay     = $hourlyRate * $basicHours * $basicRate;
            $overtimePay  = $hourlyRate * $overtimeHours * $basicRate * $overtimeRate - ($hourlyRate * $overtimeHours);
            $nightDiffPay = $hourlyRate * $nightDiffHours * $basicRate * $nightDiffRate;
            $totalPay     = $basicPay + $overtimePay + $nightDiffPay;
        }

        return [
            "basicPay"     => $basicPay,
            "overtimePay"  => $overtimePay,
            "nightDiffPay" => $nightDiffPay,
            "totalPay"     => $totalPay
        ];
    }


    function getPayrollHourlyRate($employeeID = 0)
    {
        $CI =& get_instance();

        $sql   = "SELECT employeeHourlyRate AS hourlyRate FROM hris_employee_list_tbl WHERE employeeID = $employeeID";
        $query = $CI->db->query($sql);
        return $query ? $query->row()->hourlyRate : 0;
    }

    function getSssDeduction($grossPay = 0)
    {
        $CI =& get_instance();

        $employee = $employer = $total = 0;

        $sql    = "SELECT * FROM hris_sss_table_tbl WHERE $grossPay BETWEEN sssMinimumRange AND sssMaximumRange";
        $query  = $CI->db->query($sql);
        $result = $query ? $query->row() : null;
        if ($result)
        {
            $employeeContribution = $result->sssEmployeeContribution ?? 0;
            $employerContribution = $result->sssEmployeeContribution ?? 0;
            $ecContribution       = $result->sssECContribution ?? 0;

            $employee = $employeeContribution;
            $employer = $employerContribution + $ecContribution;
            $total    = $employee + $employer;
        }

        return [
            "employee" => $employee,
            "employer" => $employer,
            "total"    => $total,
        ];
    }


    function getPhicDeduction($grossPay = 0)
    {
        $CI =& get_instance();

        $employee = $employer = $total = 0;

        $sql    = "SELECT * FROM hris_philhealth_table_tbl WHERE $grossPay BETWEEN phMinimumRange AND phMaximumRange";
        $query  = $CI->db->query($sql);
        $result = $query ? $query->row() : null;
        if ($result)
        {
            $percentage = ($result->phPercentage ?? 0) / 100;

            $total    = $grossPay * $percentage;
            $employee = $total / 2;
            $employer = $total / 2;
        }

        return [
            "employee" => $employee,
            "employer" => $employer,
            "total"    => $total,
        ];
    }


    function getHdmfDeduction($grossPay = 0)
    {
        $employeePercent = 0.02;
        $employerPercent = $grossPay >= 0 && $grossPay <= 1500 ? 0.01 : 0.02;

        $employee = $grossPay * $employeePercent;
        $employer = $grossPay * $employerPercent;
        $total    = $employer + $employee;

        return [
            "employee" => 100, // $employee
            "employer" => 100, // $employer,
            "total"    => 200, // $total,
        ];
    }


    function getWithHoldingDeduction($grossPay = 0, $nonTaxable = 0)
    {
        $CI =& get_instance();

        $total = 0;

        $sql    = "SELECT * FROM hris_tax_table_tbl WHERE $grossPay BETWEEN taxMinimumRange AND taxMaximumRange";
        $query  = $CI->db->query($sql);
        $result = $query ? $query->row() : null;
        if ($result)
        {
            $additionalTax = $result->taxAdditionalTax;
            $percentage    = $result->taxPercentage / 100;
            $compensation  = $result->taxMinimumRange;

            $taxable = $grossPay - $nonTaxable;
            $excess  = $taxable - $compensation;

            $totalExcess = $excess * $percentage;

            $total = $totalExcess + $additionalTax;
        }
        return ["total" => $total];
    }


    function getGovernmentContribution($grossPay = 0)
    {
        $netPay = 0;

        $sss = getSssDeduction($grossPay);
        $employeeSssContribution = $sss['employee'] ?? 0;
        $employerSssContribution = $sss['employer'] ?? 0;
        $totalSssContribution    = $sss['total'] ?? 0;

        $phic = getPhicDeduction($grossPay);
        $employeePhicContribution = $phic['employee'] ?? 0;
        $employerPhicContribution = $phic['employer'] ?? 0;
        $totalPhicContribution    = $phic['total'] ?? 0;

        $hdmf = getHdmfDeduction($grossPay);
        $employeeHdmfContribution = $hdmf['employee'] ?? 0;
        $employerHdmfContribution = $hdmf['employer'] ?? 0;
        $totalHdmfContribution    = $hdmf['total'] ?? 0;
        
        $nonTaxable = $employeeSssContribution + $employeePhicContribution + $employeeHdmfContribution;

        $tax = getWithHoldingDeduction($grossPay, $nonTaxable);
        $totalTaxContribution = $tax['total'] ?? 0;

        $totalDeduction = $employeeSssContribution + $employeePhicContribution + $employeeHdmfContribution + $totalTaxContribution;
        $netPay = $grossPay - $totalDeduction;

        return [
            "sssDeduction"         => $employeeSssContribution,
            "sssEmployer"          => $employerSssContribution,
            "sssTotal"             => $totalSssContribution,
            "phicDeduction"        => $employeePhicContribution,
            "phicEmployer"         => $employerPhicContribution,
            "phicTotal"            => $totalPhicContribution,
            "hdmfDeduction"        => $employeeHdmfContribution,
            "hdmfEmployer"         => $employerHdmfContribution,
            "hdmfTotal"            => $totalHdmfContribution,
            "withHoldingDeduction" => $totalTaxContribution,
            "totalDeduction"       => $totalDeduction,
        ];
    }
    // ---------- ********** END PAYROLL ********* ---------







    // ---------- ********** CUTOFF ********** ----------
    function getCutOff() 
    {
        $CI =& get_instance();
        $sql = "
        SELECT 
            *,
            IF(firstCutOffPayOut, '1', '0') AS firstCutOff,
            IF(secondCutOffPayOut, '1', '0') AS secondCutOff,
            IF(thirdCutOffPayOut, '1', '0') AS thirdCutOff,
            IF(fourthCutOffPayOut, '1', '0') AS fourthCutOff
        FROM gen_system_setting_tbl";
        $query = $CI->db->query($sql);
        return $query ? $query->row() : null;
    }

    function getCutOffCount()
    {
        $count = 0;

        $cutoff = getCutOff();
        $firstCutOff  = $cutoff->firstCutOff ?? 0;
        $secondCutOff = $cutoff->secondCutOff ?? 0;
        $thirdCutOff  = $cutoff->fthirdutOff ?? 0;
        $fourthCutOff = $cutoff->fiourthutOff ?? 0;

        if ($firstCutOff == 1) $count++;
        if ($secondCutOff == 1) $count++;
        if ($thirdCutOff == 1) $count++;
        if ($fourthCutOff == 1) $count++;

        return $count;
    }
    // ---------- ********** END CUTOFF ********** ----------


    