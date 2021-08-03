<?php
    function getAdminSessionAccount() {
        $CI=&get_instance();
        $adminSessionID = $CI->session->has_userdata("adminSessionID") ? $CI->session->userdata("adminSessionID") : 1;
        $sql = "SELECT * FROM hris_employee_list_tbl JOIN hris_designation_tbl USING(designationID) WHERE employeeID = $adminSessionID";
        $query = $CI->db->query($sql);

        return $query->row();
    }

    function getOtherSessionAccount() {
        $CI             =    &get_instance();
        $otherSessionID =   $CI->session->has_userdata("otherSessionID") ? $CI->session->userdata("otherSessionID") : 1;
        $sql            =   "SELECT * FROM hris_employee_list_tbl WHERE employeeID = $otherSessionID";
        $query          =   $CI->db->query($sql);
        return $query->row();
    }

    // ----- EMPLOYEE PERMISSIONS -----
    function getEmployeePermission($moduleID, $method)
    {
        $CI =& get_instance();
        $sessionID = $CI->session->has_userdata("adminSessionID") ? $CI->session->userdata("adminSessionID") : 1;

        if ($moduleID && $method) {
            $sql = "SELECT createStatus, readStatus, updateStatus, deleteStatus, printStatus FROM hris_employee_permission_tbl WHERE moduleID = $moduleID AND employeeID = $sessionID";
            $query = $CI->db->query($sql);
            if ($query && $query->num_rows() > 0) {
                $data = $query->result_array();
                switch ($method) {
                    case 'create':
                        return $data[0]["createStatus"] == 1 ? true : false;
                    case 'read':
                        return $data[0]["readStatus"]   == 1 ? true : false;
                    case 'update':
                        return $data[0]["updateStatus"] == 1 ? true : false;
                    case 'delete':
                        return $data[0]["deleteStatus"] == 1 ? true : false;
                    case 'print':
                        return $data[0]["printStatus"]  == 1 ? true : false;
                    default:
                        return false;
                }
            }
        }
        return false;
    }

    function isCreateAllowed($moduleID)
    {
        return getEmployeePermission($moduleID, "create");
    }

    function isReadAllowed($moduleID)
    {
        $CI =& get_instance();
        $CI->load->helper('url'); 
        $result = getEmployeePermission($moduleID, "read");
        if (!$result) {
            redirect(base_url('denied'));
        }
        return $result;
    }

    function isUpdateAllowed($moduleID)
    {
        return getEmployeePermission($moduleID, "update");
    }

    function isDeleteAllowed($moduleID)
    {
        return getEmployeePermission($moduleID, "delete");
    }

    function isPrintAllowed($moduleID)
    {
        return getEmployeePermission($moduleID, "print");
    }
    // ----- END EMPLOYEE PERMISSIONS -----


    function getFormCode($str = null, $date = null, $id = 0) {
        if ($str && $date) {
            $codeID = $id ? strval($id) : "0";
            $codeID = strlen($codeID) < 5 ? str_repeat("0", 5 - strlen($codeID)).$codeID : $codeID;
            $codeDate = date("y", strtotime($date));
            $code = $str."-".$codeDate."-".$codeID;
            return $code;
        }
        return null;
    }

    function generateSubtaskCode($str = null,  $id = 0) {
        if ($str && $date) {
            $codeID = $id ? strval($id) : "0";
            $codeID = strlen($codeID) < 5 ? str_repeat("0", 5 - strlen($codeID)).$codeID : $codeID;
            $code = $str."-".$codeID;
            return $code;
        }
        return null;
    }

?>