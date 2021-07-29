<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Examination_model extends CI_Model {

    public function updateExamination($examinationID = 0, $totalPoints = 0)
    {
        $data  = ["examinationPoints" => $totalPoints];
        $where = ["examinationID" => $examinationID];
        $query = $this->db->update("hris_examination_tbl", $data, $where);
        return $query ? true : false;
    }

    public function getExamQuestions($examinationID = 0, $examinationType = "")
    {
        $sql   = "SELECT * FROM hris_examination_qa_tbl WHERE examinationID = $examinationID AND examinationType = BINARY('$examinationType')";
        $query = $this->db->query($sql);
        return $query ? $query->result_array() : [];
    }

    public function getExamChoices($examinationID = 0, $examinationQaID = 0)
    {
        $sql = "
        SELECT 
            keyID, description 
        FROM 
            hris_examination_choices_tbl 
        WHERE 
            examinationID = $examinationID AND 
            examinationQaID = $examinationQaID";
        $query = $this->db->query($sql);
        return $query ? $query->result_array() : [];
    }

    public function getExamQuestionsData($examinationID = 0, $examinationType = "")
    {
        $data = [];   
        $questions = $this->getExamQuestions($examinationID, $examinationType);
        foreach($questions as $qstn) {
            $examinationQaID = $qstn["examinationQaID"];
            $examinationType = $qstn["examinationType"];
            $question = $qstn["question"];
            $answer   = $qstn["answer"];
            $points   = $qstn["points"];
            $choices = $this->getExamChoices($examinationID, $examinationQaID);
            $temp = [
                "examinationType" => $examinationType,
                "question" => $question,
                "choices"  => $choices,
                "answer"   => $answer,
                "points"   => $points,
            ];
            array_push($data, $temp);
        }
        return $data;
    }

    public function deleteExamQuestions($examinationID = 0)
    {
        $where  = ["examinationID" => $examinationID];
        $query1 = $this->db->delete("hris_examination_qa_tbl", $where);
        $query2 = $this->db->delete("hris_examination_choices_tbl", $where);
        return $query1 && $query2;
    }

    public function insertExamQuestions($question = [])
    {
        $query = $this->db->insert("hris_examination_qa_tbl", $question);
        return $query ? $this->db->insert_id() : false;
    }

    public function insertQuestionChoices($choices = [])
    {
        if (count($choices) > 0) {
            $query = $this->db->insert_batch("hris_examination_choices_tbl", $choices);
            return $query ? true : false;
        }
        return false;
    }

    public function updateExamQuestions($examinationID = 0, $examinationType = "", $questions = [])
    {
        $sessionID = $this->session->has_userdata('adminSessionID') ? $this->session->userdata('adminSessionID') : 0;

        $deleteExamQuestions = $this->deleteExamQuestions($examinationID);
        if ($deleteExamQuestions) {
            foreach($questions as $qstn) {
                $question = $qstn["question"];
                $answer   = $qstn["answer"];
                $points   = $qstn["points"];
                $choices  = $qstn["choices"] ?? [];

                $question = [
                    "examinationID"   => $examinationID,
                    "examinationType" => $examinationType,
                    "question"        => $question,
                    "answer"          => $answer,
                    "points"          => $points,
                    "createdBy"       => $sessionID,
                    "updatedBy"       => $sessionID,
                ];
                
                $insertExamQuestions = $this->insertExamQuestions($question);
                if ($insertExamQuestions) {
                    $examinationQaID = $insertExamQuestions;
                    $choice = [];
                    foreach($choices as $chc) {
                        $keyID       = $chc["keyID"];
                        $description = $chc["description"];

                        $temp = [
                            "examinationID"   => $examinationID,
                            "examinationQaID" => $examinationQaID,
                            "keyID"           => $keyID,
                            "description"     => $description,
                            "createdBy"       => $sessionID,
                            "updatedBy"       => $sessionID,
                        ];
                        array_push($choice, $temp);
                    }
                    $insertQuestionChoices = $this->insertQuestionChoices($choice);
                }
            }
            return true;
        }
        return false;
    }

    public function saveExamination($examinationID = 0, $examinationName = null, $examinationType = null, $totalPoints = 0, $questions = [])
    {
        $updateExamination = $this->updateExamination($examinationID, $totalPoints);
        if ($updateExamination) {
            $updateExamQuestions = $this->updateExamQuestions($examinationID, $examinationType, $questions);
            if ($updateExamQuestions) {
                return "true|$examinationName|$examinationID|".date("Y-m-d");
            }
            return "false|System error: Please contact the system administrator for assistance!";
        }
        return "false|System error: Please contact the system administrator for assistance!";
    }

}
