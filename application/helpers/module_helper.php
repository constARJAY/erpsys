<?php

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

                        $sqlConnectedModule = "SELECT * FROM gen_module_list_tbl WHERE moduleStatus = 1 AND moduleHeaderID = $headerID AND moduleCategoryID = $categoryID";
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
                                array_push($tempModule["modules"], $temp);
                            }
                            array_push($tempData["category"], $tempModule);
                        }
                    }
                }

                $sqlNotConnectedModule = "SELECT * FROM gen_module_list_tbl WHERE moduleStatus = 1 AND moduleHeaderID = $headerID AND (moduleCategoryID IS NULL)";
                $queryNotConnectedModule = $CI->db->query($sqlNotConnectedModule);
                $resultNotConnectedModule = $queryNotConnectedModule ? $queryNotConnectedModule->result_array() : [];

                if ($resultNotConnectedModule) {
                    foreach ($resultNotConnectedModule as $module) {
                        $temp = [
                            "name"       => $module["moduleName"],
                            "controller" => $module["moduleController"],
                            "icon"       => $module["moduleIcon"],
                        ];
                        array_push($tempData["nocategory"], $temp);
                    }
                }
                array_push($result, $tempData);
            }
        }

        return $result;
    }