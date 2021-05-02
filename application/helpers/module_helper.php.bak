<?php

    function isAllowed($moduleID, $displayModule = false)
    {
        $CI =& get_instance();
        $CI->load->helper('url', 'string', 'integer'); 

        $sessionUserAccount = getAdminSessionAccount();
        $designationID      = $sessionUserAccount->designationID;
        $sessionID          = $CI->session->has_userdata("adminSessionID") ? $CI->session->userdata("adminSessionID") : 0;
        
        if ($moduleID) {
            $sql = "SELECT permissionStatus FROM gen_roles_permission_tbl WHERE moduleID = $moduleID AND designationID = $designationID AND permissionStatus = 1";
            $sql2 = "SELECT readStatus FROM hris_employee_permission_tbl WHERE moduleID = $moduleID AND employeeID = $sessionID AND readStatus = 1";
        } else {
            redirect(base_url('denied'));
        }

        
        $query  = $CI->db->query($sql);
        // $query2 = $CI->db->query($sql2); // ----- WITH ACCESSBILITY -----
        if ($displayModule) {
            return $query->num_rows() > 0 ? true : false;
            // return $query->num_rows() > 0 && $query2->num_rows() > 0 ? true : false; // ----- WITH ACCESSBILITY -----
        } else {
            if ($query->num_rows() == 0) {
            // if ($query->num_rows() == 0 || $query2->num_rows() == 0) { // ----- WITH ACCESSBILITY -----
                redirect(base_url('denied'));
            }
        }
    }

    function getModuleContent()
    {
        $CI =& get_instance();
        $result = [];

        $sqlHeader = "SELECT * FROM gen_module_header_tbl WHERE moduleHeaderStatus = 1 ORDER BY moduleHeaderOrder";
        $queryHeader = $CI->db->query($sqlHeader);
        $resultHeader = $queryHeader ? $queryHeader->result_array() : [];
        if ($resultHeader) {
            foreach ($resultHeader as $header) {
                $headerID   = $header["moduleHeaderID"];
                $headerName = $header["moduleHeaderName"];

                $tempData = [
                    "header"     => $headerName,
                    "category"   => [],
                    "nocategory" => []
                ];

                $sqlCategory = "SELECT * FROM gen_module_category_tbl WHERE moduleCategoryStatus = 1 AND moduleHeaderID = $headerID ORDER BY moduleCategoryOrder";
                $queryCategory = $CI->db->query($sqlCategory);
                $resultCategory = $queryCategory ? $queryCategory->result_array() : [];

                if ($resultCategory) {
                    foreach ($resultCategory as $category) {
                        $categoryID   = $category["moduleCategoryID"];
                        $categoryName = $category["moduleCategoryName"];

                        $sqlConnectedModule = "SELECT * FROM gen_module_list_tbl WHERE moduleStatus = 1 AND moduleHeaderID = $headerID AND moduleCategoryID = $categoryID AND moduleCategoryID <> 0 ORDER BY moduleOrder";
                        $queryConnectedModule = $CI->db->query($sqlConnectedModule);
                        $resultConnectedModule = $queryConnectedModule ? $queryConnectedModule->result_array() : [];

                        if ($resultConnectedModule) {
                            $tempModule = [
                                "categoryName" => $categoryName,
                                "icon"         => $category["moduleCategoryIcon"],
                                "modules"      => []
                            ];
                            foreach ($resultConnectedModule as $module) {
                                $temp = [
                                    "name"       => $module["moduleName"],
                                    "controller" => $module["moduleController"],
                                ];
                                if (isAllowed($module["moduleID"], true)) {
                                    array_push($tempModule["modules"], $temp);
                                }
                            }
                            array_push($tempData["category"], $tempModule);
                        }
                    }
                }

                $sqlNotConnectedModule = "SELECT * FROM gen_module_list_tbl WHERE moduleStatus = 1 AND moduleHeaderID = $headerID AND (moduleCategoryID IS NULL OR moduleCategoryID = 0)";
                $queryNotConnectedModule = $CI->db->query($sqlNotConnectedModule);
                $resultNotConnectedModule = $queryNotConnectedModule ? $queryNotConnectedModule->result_array() : [];

                if ($resultNotConnectedModule) {
                    foreach ($resultNotConnectedModule as $module) {
                        $temp = [
                            "name"       => $module["moduleName"],
                            "controller" => $module["moduleController"],
                            "icon"       => $module["moduleIcon"] ? $module["moduleIcon"] : "default.svg",
                        ];
                        array_push($tempData["nocategory"], $temp);
                    }
                }
                array_push($result, $tempData);
            }
        }

        return $result;
    }