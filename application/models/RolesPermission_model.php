<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class RolesPermission_model extends CI_Model {

    public function __construct()
    {
        parent::__construct();
    }

    public function truncateTable()
    {
        $sql = "TRUNCATE TABLE gen_roles_permission_tbl";
        $query = $this->db->query($sql);
        return $query ? true : false;
    }

    public function getUserRole()
    {
        $sql = "SELECT * FROM gen_user_role_tbl";
        $query = $this->db->query($sql);
        return $query ? $query->result_array() : false;
    }

    public function getModules()
    {
        $sql = "SELECT * FROM gen_module_list_tbl";
        $query = $this->db->query($sql);
        return $query ? $query->result_array() : false;
    }

    public function generateRolesPermission()
    {
        $truncateTable = $this->truncateTable();
        if ($truncateTable) {
            $getUserRole = $this->getUserRole();
            if ($getUserRole) {
                $getModules = $this->getModules();
                if ($getModules) {
                    $data = [];
                    foreach ($getUserRole as $role) {
                        $roleID = $role["roleID"];
                        foreach ($getModules as $module) {
                            $moduleID = $module["moduleID"];
                            $status = $roleID == 1 ? 1 : 0; 
                            $temp = [
                                "roleID"           => $roleID,
                                "moduleID"         => $moduleID,
                                "permissionStatus" => $status
                            ];
                            array_push($data, $temp);
                        }
                    }
                    $query = $this->db->insert_batch("gen_roles_permission_tbl", $data);
                    return $query ? "Roles and permission generated successfully" : "Failed to generate roles and permission";
                } else {
                    return "Failed to get modules";
                }
            } else {
                return "Failed to get user role";
            }
        } else {
            return "Failed to truncate table";
        }
    }

}
