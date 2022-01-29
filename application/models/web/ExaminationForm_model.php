<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class ExaminationForm_model extends CI_Model {

    function getExaminationPoints($examinationID = 0)
    {
        $sql   = "SELECT examinationPoints FROM hris_examination_tbl WHERE examinationID = $examinationID";
        $query = $this->db->query($sql);
        return $query ? $query->row()->examinationPoints ?? 0 : 0;
    }

    function getExaminationPercent($applicantID = 0, $examinationID = 0)
    {
        $sql = "
        SELECT percentage 
        FROM hris_examination_setup_tbl
            LEFT JOIN web_applicant_list_tbl AS walt ON applicantDesignationID = designationID
        WHERE applicantID = $applicantID AND examinationID = $examinationID";
        $query = $this->db->query($sql);
        return $query ? $query->row()->percentage ?? 0 : 0;
    }

    function saveExam($examinationID = 0, $applicantID, $applicantAnswer, $examinationQAID,$getPoints,$totalPoints){

        $overPoints  = $this->getExaminationPoints($examinationID);    
        $percent     = ($totalPoints / $overPoints) * 100;
        $overPercent = $this->getExaminationPercent($applicantID, $examinationID);
        $data = array(
            'applicantID' => $applicantID,
            'totalPoints' => $totalPoints,
            'overPoints'  => $overPoints,
            'percent'     => $percent,
            'overPercent' => $overPercent,
        );
        $query = $this->db->insert("web_examination_form_tbl", $data);
        if ($query) {
            $insertID =  $this->db->insert_id();
    
            if($examinationQAID && !empty($examinationQAID)){
                $examDataDetails = [];
                foreach($examinationQAID as $index => $item) {
                    $list = [
                        "examFormID"      => $insertID,
                        "applicantAnswer" => $applicantAnswer[$index],
                        "applicantPoint"  => $getPoints[$index],
                        "examinationQaID" => $examinationQAID[$index]
                    ];
                    array_push($examDataDetails, $list);
                }

                $query = $this->db->insert_batch("web_examination_form_details_tbl", $examDataDetails);
                if ($query) {
                    return "true|Successfully submitted";
                }
            }
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }

    function updateApplicationExamStatus($data, $applicantID){
        $this->db->where('applicantID', $applicantID);
        $query = $this->db->update('web_applicant_list_tbl', $data);

        if ($query) {
            return "true|Successfully submitted";
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }
}

