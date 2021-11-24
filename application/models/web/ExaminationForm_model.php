<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class ExaminationForm_model extends CI_Model {

    function saveExam($applicantID, $applicantAnswer, $examinationQAID,$getPoints,$totalPoints,$percent){

                    
        $data = array(
            'applicantID' => $applicantID,
            'totalPoints' => $totalPoints,
            'percent'     => $percent
        );

         $this->db->insert("web_examination_form_tbl", $data);

        $insertID =  $this->db->insert_id();

        if($examinationQAID){
            $examDataDetails = [];
                    foreach($examinationQAID as $index => $item) {
                        $list = [
                            "examFormID" => $insertID,
                            "applicantAnswer"        => $applicantAnswer[$index],
                            "applicantPoint"               => $getPoints[$index],
                            "examinationQaID"       => $examinationQAID[$index]
                        ];
                        array_push($examDataDetails, $list);

                    }

                    $query = $this->db->insert_batch("web_examination_form_details_tbl", $examDataDetails);
                    if ($query) {
                        return "true|Successfully submitted";
                    }
                    return "false|System error: Please contact the system administrator for assistance!";
        }
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

