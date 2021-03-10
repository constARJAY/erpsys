<?php
    date_default_timezone_set("Asia/Manila");

    function insertNotificationData($tableName = null, $data = [])
    {
        $CI =& get_instance();
        if ($tableName && $data) {

            /**
             * ----- DATA -----
             * 1. moduleID                  = (int)    e.g. 1
             * 2. notificationTitle         = (string) e.g. Inventory Item
             * 3. notificationDescription   = (string) e.g. Hammer - Low Stocks 
             * 4. notificationType          = (int)    e.g. 1
             *      Basis:  1 - Highest Prio (red)
             *              2 - Medium Prio (info)
             *              3 - Low Prio (gray)
             *              4 - Information (blue)
             *              5 - Pending (yellow)
             *              6 - Warning (orange)
             *              7 - Approved (green)
             * 5. createdBy
             * ----- END DATA -----
             */
            
            $query = $CI->db->insert($tableName, $data);
            return $query ? true : false;
        } else {
            return false;
        }
    }

    function getCountUnreadNotification()
    {
        $CI =& get_instance();
        $sql = "SELECT * FROM gen_system_notification_tbl WHERE markRead = 0";
        $query = $CI->db->query($sql);
        return $query ? $query->num_rows() : 0;
    }

    function getNotificationData($projectName = "all", $read = "", $dateFrom = "", $dateTo = "")
    {
        $CI =& get_instance();
        $readFilter = $read != "" ? "markRead = $read" : "1=1";
        if ($dateFrom != "" && $dateTo != "") {
            $sql = "SELECT * FROM gen_system_notification_tbl WHERE createdAt BETWEEN '$dateFrom' AND '$dateTo' AND $readFilter";
        } else {
            $sql = "SELECT * FROM gen_system_notification_tbl WHERE $readFilter";   
        }
        $query = $CI->db->query($sql);
        $data = $query ? $query->result_array() : [];
        $output = [];
        foreach($data as $notif) {
            $notifID     = $notif["notificationID"];
            $title       = $notif["notificationTitle"];
            $description = $notif["notificationDescription"];
            $type        = $notif["notificationType"];
            $moduleID    = $notif["moduleID"];
            $createdAt   = date("Y-m-d H:i:s", strtotime($notif["createdAt"]));

            $icon = $color = $controller = $project = $time = "";
            switch($type) {
                case "1": $icon = "exclamation-red.svg";    $color = "red";    break;
                case "2": $icon = "exclamation-info.svg";   $color = "info";   break;
                case "3": $icon = "exclamation-gray.svg";   $color = "gray";   break;
                case "4": $icon = "information-blue.svg";   $color = "blue";   break;
                case "5": $icon = "exclamation-yellow.svg"; $color = "yellow"; break;
                case "6": $icon = "exclamation-orange.svg"; $color = "orange"; break;
                default:  $icon = "exclamation-info.svg";   $color = "info";   break;
            }

            $sql = "SELECT moduleController, projectName FROM gen_module_list_tbl WHERE moduleID = $moduleID";
            $query = $CI->db->query($sql);
            $result = $query ? $query->result_array() : false;
            $controller = $result ? strtolower($result[0]["moduleController"]) : "javascript:void(0)";
            $projectList = $result ? explode("|", $result[0]["projectName"]) : "";

            $date = date("F d, Y", strtotime($notif["createdAt"]));

            $date1 = new DateTime();
            $data2 = new DateTime($createdAt); 
            $interval = $date1->diff($data2);
            $year   = abs($interval->format("%y"));
            $month  = abs($interval->format("%m"));
            $day    = abs($interval->format("%a"));
            $hour   = abs($interval->format("%H"));
            $minute = abs($interval->format("%i"));
            $second = abs($interval->format("%s"));
            $elapsed  = $interval->format('%y years %m months %a days %H hours %i minutes %s seconds');
            if ($year > 0) {
                $time = $year."yr ago";
            } else if ($year == 0 && $month > 0) {
                $time = $month."mo ago";
            } else if ($year == 0 && $month == 0 && $day > 0) {
                $time = $day."day ago";
            } else if ($year == 0 && $month == 0 && $day == 0 && $hour > 0) {
                $time = $hour."hr ago";
            } else if ($year == 0 && $month == 0 && $day == 0 && $hour == 0 && $minute > 0) {
                $time = $minute."min ago";
            } else {
                $time = "Just now";
            }

            $temp = [
                "id"          => $notifID,
                "project"     => implode("|", $projectList),
                "icon"        => $icon,
                "color"       => $color,
                "title"       => $title,
                "description" => $description,
                "controller"  => $controller,
                "time"        => $time,
                "date"        => $date,
                "elapsed"     => $data2
            ];

            if ($projectName == "all") {
                array_push($output, $temp);
            } else {
                if (in_array($projectName, $projectList)) {
                    array_push($output, $temp);
                }
            }

        }
        return $output;
    }
    