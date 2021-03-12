<?php
    function getAdminSessionAccount() {
        $CI=&get_instance();
        $adminSessionID = $CI->session->has_userdata("adminSessionID") ? $CI->session->userdata("adminSessionID") : 1;
        $sql = "SELECT * FROM gen_user_account_tbl WHERE userAccountID = $adminSessionID";
        $query = $CI->db->query($sql);

        return $query->row();
    }

    function getOtherSessionAccount() {
        $CI             =    &get_instance();
        $otherSessionID =   $CI->session->has_userdata("otherSessionID") ? $CI->session->userdata("otherSessionID") : 1;
        $sql            =   "SELECT * FROM gen_user_account_tbl WHERE userAccountID = $otherSessionID";
        $query          =   $CI->db->query($sql);
        return $query->row();
    }


?>