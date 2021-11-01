<?php

    function getUploadedFiles($postData, $fileData)
    {
        $data = [];
        if (is_array($fileData)) {
            if (count($fileData) > 0 && !empty($fileData["tableData"])) {
                $keys = array_keys($fileData["tableData"]["name"]);
                for($x=0; $x<count($keys); $x++) {
                    $mixedFileName = "";

                    $fileKeyStr = $keys[$x];
                    $fileKeyArrParent = explode("|", $keys[$x]);
                    $fileKey    = $fileKeyArrParent[0];
                    $folderName = $fileKeyArrParent[1] ? $fileKeyArrParent[1] : "";
                    $fileLength = count($fileData["tableData"]["name"][$fileKeyStr]);
                    for($i=0; $i<$fileLength; $i++) {
                        $fileName    = $fileData["tableData"]["name"][$fileKeyStr][$i];
                        $fileTmpName = $fileData["tableData"]["tmp_name"][$fileKeyStr][$i];

                        $targetDir = "assets/upload-files/$folderName/";
                        if (!is_dir($targetDir)) {
                            mkdir($targetDir);
                        }

                        if (!file_exists($targetDir."index.html")) {
                            copy('assets/index.html', $targetDir."index.html");
                        }

                        $fileKeyArr  = explode(".", explode("|", $fileName)[1] ?? "");
                        $fileKeyName = $fileKeyArr[0] ?? "";
                        $fileKeyType = $fileKeyArr[1] ?? "";

                        $targetFileName = $fileKeyName.$i.time().'.'.$fileKeyType;
                        $targetFile     = $targetDir.$targetFileName;
            
                        if (move_uploaded_file($fileTmpName, $targetFile)) {
                            $mixedFileName = $mixedFileName ? $mixedFileName."|".$targetFileName : $targetFileName;
                            
                        }
                        $data[$fileKey] = $mixedFileName;
                    }
                }
            }
        }
        return $data;
    }

    function getUploadedMultipleFiles($postData = [], $fileData = []) 
    {
        $data = [];
        $columNames  = $postData["uploadFileColumnName"] ?? null;
        $oldFilename = $postData["uploadFileOldFilename"] ?? null;
        $folderName  = $postData["uploadFileFolder"] ?? "uploads";

        if ($columNames && !empty($columNames) && is_array($columNames)) {
            foreach($columNames as $index => $columnName) {
                $mixedFileName = $oldFilename[$index] ?? "";

                $uploadFiles = $fileData["uploadFiles"]["name"][$index] ?? null;
                if ($uploadFiles) {
                    $countFiles = count($uploadFiles);
                    for ($i=0; $i<$countFiles; $i++) {
                        $fileName    = $fileData["uploadFiles"]["name"][$index][$i];
                        $fileType    = $fileData["uploadFiles"]["type"][$index][$i];
                        $fileTmpName = $fileData["uploadFiles"]["tmp_name"][$index][$i];

                        $targetDir = "assets/upload-files/$folderName/";
                        if (!is_dir($targetDir)) {
                            mkdir($targetDir);
                        }

                        if (!file_exists($targetDir."index.html")) {
                            copy('assets/index.html', $targetDir."index.html");
                        }

                        $fileKeyArr  = explode(".", $fileName);
                        $fileKeyName = $fileKeyArr[0];
                        $fileKeyType = $fileKeyArr[1];

                        $targetFileName = $fileKeyName.$i.time().'.'.$fileKeyType;
                        $targetFile     = $targetDir.$targetFileName;
                        if (move_uploaded_file($fileTmpName, $targetFile)) {
                            $mixedFileName = $mixedFileName ? $mixedFileName."|".$targetFileName : $targetFileName;
                        }
                    }
                }

                $data[$columnName] = $mixedFileName;
            }
        }
        return $data;
    }