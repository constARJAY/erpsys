<?php

    function isGranted($moduleID = 0)
    {
        $CI =& get_instance();
        $sessionUserAccount = getAdminSessionAccount();
        $designationID      = $sessionUserAccount->designationID;
        $sessionID          = $CI->session->has_userdata("adminSessionID") ? $CI->session->userdata("adminSessionID") : false;

        $sql    = "SELECT permissionStatus FROM gen_roles_permission_tbl WHERE moduleID = $moduleID AND designationID = $designationID AND permissionStatus = 1";
        $sql2   = "SELECT readStatus FROM hris_employee_permission_tbl WHERE moduleID = $moduleID AND employeeID = $sessionID AND readStatus = 1";
        $query  = $CI->db->query($sql);
        $query2 = $CI->db->query($sql2);

        return [$query->num_rows(), $query2->num_rows()];
    }

    function isAllowed($moduleID = 0, $displayModule = false)
    {
        $CI =& get_instance();
        $CI->load->helper('url', 'string', 'integer'); 
        $sessionID = $CI->session->has_userdata("adminSessionID") ? $CI->session->userdata("adminSessionID") : false;
        
        if ($sessionID) {
            if ($moduleID) {
                $accessibility = isGranted($moduleID);
                if ($displayModule) {
                    return $accessibility[0] > 0 && $accessibility[1] > 0;
                } else {
                    if ($accessibility[0] == 0 || $accessibility[1] == 0) {
                        redirect(base_url('denied'));
                    }
                }
            } else {
                redirect(base_url('denied'));
            }
        } else {
            if ($moduleID) {
                $CI->session->set_userdata('request_url', current_url());
            }
            redirect(base_url("login"));
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

    function getModuleApprover($moduleID = null, $designationID = null)
    {
        $CI =& get_instance();
        if ($designationID && $moduleID) {
            $sql    = "SELECT userAccountID FROM gen_approval_setup_tbl WHERE designationID = $designationID AND moduleID = $moduleID";
            $query  = $CI->db->query($sql);
            $result = $query ? $query->row() : null;
            return $result ? $result->userAccountID : null;
        }
        return null;
    }