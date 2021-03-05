<?php

    function getModuleContent()
    {
        $CI =& get_instance();
        $result = [];

        // ----- headerModules -----
        $sql   = "SELECT * FROM module_list_tbl WHERE moduleStatus = 1 GROUP BY moduleHeader";
        $query = $CI->db->query($sql);
        $headerModules = $query ? $query->result_array() : [];
        // ----- END headerModules -----

        foreach ($headerModules as $headerModule) {
            $moduleHeader = $headerModule["moduleHeader"];
            $temp = [
                "header" => $moduleHeader,
                "modules" => []
            ];

            // ----- getCategoryModules -----
            $sql   = "SELECT * FROM module_list_tbl WHERE moduleHeader = '$moduleHeader' AND moduleStatus = 1 GROUP BY moduleCategory";
            $query = $CI->db->query($sql);
            $categoryModules = $query ? $query->result_array() : [];
            // ----- END getCategoryModules -----

            foreach ($categoryModules as $categoryModule) {
                $moduleCategory = $categoryModule["moduleCategory"] ? $categoryModule["moduleCategory"] : "";
                $moduleIcon = $categoryModule["moduleIcon"] ? $categoryModule["moduleIcon"] : "default-icon.svg";
                $modules = [
                    "names"    => [],
                    "category" => $moduleCategory,
                    "icon"     => $moduleIcon
                ];

                // ----- getAllModules -----
                $category = !$moduleCategory ? "AND (moduleCategory IS NULL OR moduleCategory = '')" : "AND moduleCategory = '$moduleCategory'";
                $sql   = "SELECT * FROM module_list_tbl WHERE moduleHeader = '$moduleHeader'  $category AND moduleStatus = 1";
                $query = $CI->db->query($sql);
                $allModules = $query ? $query->result_array() : [];
                // ----- END getAllModules -----

                foreach ($allModules as $module) {
                    $moduleID   = $module["moduleID"];
                    $moduleName = $module["moduleName"];
                    $moduleController = $module["moduleController"];
                    array_push($modules["names"], [
                        "id"         => $moduleID,
                        "name"       => $moduleName,
                        "controller" => $moduleController
                    ]);
                }
                array_push($temp["modules"], $modules);
            }
            array_push($result, $temp);
        }
        return array_reverse($result);
    }