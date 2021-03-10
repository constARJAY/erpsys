<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Modules_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
    }

    public function getHeaderModules()
    {
        $sql = "SELECT * FROM gen_module_list_tbl WHERE moduleStatus = 1 GROUP BY moduleHeader";
        $query = $this->db->query($sql);
        return $query ? $query->result_array() : [];
    }

    public function getCategoryModules($moduleHeader)
    {
        $sql = "SELECT * FROM gen_module_list_tbl WHERE moduleHeader = '$moduleHeader' AND moduleStatus = 1 GROUP BY moduleCategory";
        $query = $this->db->query($sql);
        return $query ? $query->result_array() : [];
    }

    public function getAllModules($moduleHeader, $moduleCategory)
    {
        $category = !$moduleCategory ? "AND (moduleCategory IS NULL OR moduleCategory = '')" : "AND moduleCategory = '$moduleCategory'";
        $sql = "SELECT * FROM gen_module_list_tbl WHERE moduleHeader = '$moduleHeader' $category AND moduleStatus = 1";
        $query = $this->db->query($sql);
        return $query ? $query->result_array() : [];
    }

    public function getModuleContent()
    {
        $result = [];
        $headerModules = $this->getHeaderModules();
        foreach ($headerModules as $headerModule) {
            $moduleHeader = $headerModule["moduleHeader"];
            $temp = [
                "header" => $moduleHeader,
                "modules" => []
            ];
            $categoryModules = $this->getCategoryModules($moduleHeader);
            foreach ($categoryModules as $categoryModule) {
                $moduleCategory = $categoryModule["moduleCategory"] ? $categoryModule["moduleCategory"] : "";
                $modules = [
                    "category" => $moduleCategory,
                    "names"    => []
                ];
                $allModules = $this->getAllModules($moduleHeader, $moduleCategory);
                foreach ($allModules as $module) {
                    $moduleName = $module["moduleName"];
                    array_push($modules["names"], $moduleName);
                }
                array_push($temp["modules"], $modules);
            }
            array_push($result, $temp);
        }
        return $result;
    }

}
