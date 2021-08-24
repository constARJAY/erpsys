$(document).ready(function() {

    // ----- EXAMINATION TYPE -----
    const EXAMINATION_TYPE = [
        "Identification",
        "Multiple Choice",
        "True or False",
        "Essay"
    ]
    // ----- END EXAMINATION TYPE -----


    // ----- GET EXAMINATION TYPE OPTIONS -----
    function getExaminationTypeOptions(examinationType = "") {
        let html = "";
        EXAMINATION_TYPE.map(type => {
            html += `
            <option value="${type}"
                ${examinationType == type ? "selected" : ""}>${type}</option>`;
        })
        return html;
    }
    // ----- END GET EXAMINATION TYPE OPTIONS -----


    // ----- GET NON-FORMATTED AMOUNT -----
    function getNonFormattedAmount(amount = "₱0.00") {
        amount = amount+"";
		return +amount.replaceAll(",", "").replaceAll("₱", "")?.trim();
	}
    // ----- END GET NON-FORMATTED AMOUNT -----


    // ----- GET EXAMINATION DATA -----
    function getExaminationData(examinationID = null) {
        let where = examinationID ? `examinationID = ${examinationID}` : "";
        let data  = getTableData(
            `hris_examination_tbl AS het`, 
            `het.*, (SELECT COUNT(*) FROM hris_examination_qa_tbl WHERE examinationID=het.examinationID) AS count`, 
            where);
        return data;
    }
    // ----- END GET EXAMINATION DATA -----


    // ----- GET EXAMINATION TABLE -----
    function examinationTable() {
        const examinationData = getExaminationData();

        let examinationHTML = "";
        if (examinationData.length > 0) {
            examinationData.map((exam, index) => {
                const { examinationID, examinationName, examinationType, examinationStatus, count } = exam;
    
                const hasData = count && count > 0;
    
                let unique = {
                    id: examinationID,
                    examinationName
                };
                uniqueData.push(unique);
                let statusClass = examinationStatus == 1 ? "badge-success bg-success" : "badge-danger bg-danger";
    
                examinationHTML += `
                <tr class="exam-name-menu examName" 
                    style="height: 50px;" 
                    examinationID="${examinationID}"
                    examinationName="${examinationName}"
                    examinationType="${examinationType}">
                    <td style="cursor: pointer; 
                            position: relative;">
                        <div class="d-flex justify-content-start align-items-center ml-1">
                            <span class="badge ${statusClass} rounded-circle" style="height: 10px; width: 10px;">&nbsp;</span>
                            <div class="ml-2 name d-flex flex-column justify-content-center">
                                <span>${examinationName}</span>
                                <small>${examinationType}</small>
                            </div>
                        </div>
                        <div style="position: absolute;
                                        right: 0;
                                        top: 0;
                                        margin-top: 15px;
                                        margin-right: 10px;">
                            <i class="fas fa-pencil btnEditExam" 
                                examinationID="${examinationID}"
                                hasData="${hasData}"></i>
                        </div>
                    </td>
                </tr>`;
            })
        } else {
            examinationHTML = `
            <tr>
                <td class="text-center">No available data.</td>
            </tr>`;
        }

        let html = `
        <table class="table table-bordered">
            <thead class="bg-primary text-white">
                <tr><th>EXAMINATION</th></tr>
            </thead>
            <tbody>
                ${examinationHTML}
            </tbody>
        </table>`;

        $("#examinationNameContent").html(preloader);
        setTimeout(() => {
            $("#examinationNameContent").html(html);
        }, 300);

        return html;
    }
    // ----- END GET EXAMINATION TABLE -----


    // ----- GET EXAM QUESTIONS DATA -----
    function getExamQuestionsData(examinationID = "", examinationType = "") {
        let result = [];
        $.ajax({
            url:      "examination/getExamQuestionsData",
            method:   "POST",
            data:     { examinationID, examinationType },
            async:    false,
            dataType: "json",
            success: function(data) {
                result = data;
            }
        });
        return result;
    }
    // ----- END GET EXAM QUESTIONS DATA -----


    // ----- QUESTIONAIRE TABLE -----
    function questionaireTable(examinationID = null, examinationType = "") {
        let html = "";
        if (examinationID) {

            let footerHTML = `
            <div class="w-100 d-flex justify-content-between align-items-center py-2">
				<div>
                    <button type="button" 
                        class="btn btn-primary btnAddQuestionRow" 
                        id="btnAddQuestionRow"
                        examinationType="${examinationType}">
                        <i class="fas fa-plus-circle"></i> Add Row
                    </button>
                </div>
                <div>
                    <span class="font-weight-bold">Total Points: </span>
                    <span class="totalPoints" id="totalPoints">${formatAmount(100)}</span>
                </div>
			</div>
            <div class="w-100 py-2 text-right">
                <button class="btn btn-save px-5 py-2"
                    id="btnSaveQuestion"
                    examinationID="${examinationID}"
                    examinationType="${examinationType}"
                    disabled>
                    <i class="fas fa-save"></i> Save
                </button>
            </div>`;

            let itemsHTML = "";
            const items = getExamQuestionsData(examinationID, examinationType);
            if (items.length > 0) {
                items.map((item, index) => {
                    itemsHTML += getQuestionRow(examinationType, item);
                })
            } else {
                itemsHTML = `
                <tr id="noData"><td>
                    <div class="w-100 text-center mb-5">
                        <img src="${base_url}assets/modal/no-data.gif"
                            style="max-width: 300px;
                            width: auto;
                            min-width: 100px;
                            height: auto;"
                            alt="No available data.">
                        <h4>No available data.</h4>
                    </div>
                </td></tr>`;
            }

            html = `
            <table class="table table-bordered">
                <thead class="bg-primary text-white">
                    <tr><th>LIST OF QUESTIONS</th></tr>
                </thead>
                <tbody id="tbodyQuestions">
                    ${itemsHTML}
                </tbody>
            </table>
            ${footerHTML}`;
        } else {
            html = `
            <div class="w-100 text-center mb-5">
                <img src="${base_url}assets/modal/please-select.gif"
                    style="max-width: 300px;
                    width: auto;
                    min-width: 100px;
                    height: auto;"
                    alt="Please Select Examination">
                <div class="h4">Please Select Examination</div>
            </div>`;
        }

        $("#examinationQuestionContent").html(preloader);
        setTimeout(() => {
            $("#examinationQuestionContent").html(html);
            updateTableQuestions();
            updateTotalPoints();
            updateSaveButton();
            initAll();
        }, 300);

        return html;
    }
    // ----- END QUESTIONAIRE TABLE -----


    // ----- PAGE CONTENT -----
    function pageContent() {
        $(`#page_content`).html(preloader);
        let html = `
        <div class="row p-3">
            <div class="col-md-4 col-sm-12">
                <div class="table-responsive" id="examinationNameContent">${examinationTable()}</div>
            </div>
            <div class="col-md-8 col-sm-12">
                <div class="w-100" id="examinationQuestionContent">${questionaireTable()}</div>
            </div>
        </div>`;
        setTimeout(() => {
            $(`#page_content`).html(html);
        }, 300);
    }
    pageContent();
    // ----- END PAGE CONTENT -----


    // ----- GET EXAMINATION FORM CONTENT -----
    function getExaminationFormContent(data = false, hasData = false) {
        const {
            examinationID          = "",
            examinationName        = "",
            examinationDescription = "",
            examinationType        = "",
            examinationPicture     = "",
            examinationStatus      = 1
        } = data && data[0];

        let isometrics = examinationPicture ? `
        <div class="d-flex justify-content-between align-items-center py-2">
            <a href="${base_url}assets/upload-files/examination/${examinationPicture}"
                target="_blank"
                alt="Isometrics">${examinationPicture}</a>
            <span class="btnRemoveFile" style="cursor: pointer"><i class="fas fa-close"></i></span>
        </div>` : "";

        let button = examinationID ? `
        <button 
            class="btn btn-update px-5 p-2" 
            id="btnUpdateExam" 
            examinationID="${examinationID}">
            <i class="fas fa-save"></i>
            Update
        </button>` : `
        <button 
            class="btn btn-save px-5 p-2" 
            id="btnSaveExam"><i class="fas fa-save"></i>
            Save
        </button>`;

        let html = `
        <div class="modal-body">
            <div class="row">
                <div class="col-12">
                    <div class="form-group">
                        <label>Exam Title <code>*</code></label>
                        <input type="text"
                            class="form-control validate"
                            data-allowcharacters="[a-z][A-Z][0-9][.][,][?][!][/][;][:]['][''][-][_][(][)][%][&][*][ ]"
                            minlength="2"
                            maxlength="150"
                            name="examinationName"
                            id="examinationName"
                            autocomplete="off"
                            value="${examinationName}"
                            unique="${examinationID}"
                            title="Examination"
                            required>
                        <div class="d-block invalid-feedback"></div>
                    </div>
                </div>
                <div class="col-12">
                    <div class="form-group">
                        <label>Exam Description <code>*</code></label>
                        <textarea
                            class="form-control validate"
                            data-allowcharacters="[a-z][A-Z][0-9][.][,][?][!][/][;][:]['][''][-][_][(][)][%][&][*][ ]"
                            minlength="2"
                            maxlength="1735"
                            name="examinationDescription"
                            id="examinationDescription"
                            rows="3"
                            style="resize: none;"
                            autocomplete="off"
                            required>${examinationDescription}</textarea>
                        <div class="d-block invalid-feedback"></div>
                    </div>
                </div>
                <div class="col-12">
                    <div class="form-group">
                        <label>Exam Type <code>*</code></label>
                        <select class="form-control validate select2"
                            name="examinationType"
                            id="examinationType"
                            examinationID="${examinationID}"
                            oldValue="${examinationType}"
                            hasData="${hasData}"
                            required>
                            <option selected disabled>Please select an examination type</option>
                            ${getExaminationTypeOptions(examinationType)}
                        </select>
                        <div class="d-block invalid-feedback"></div>
                    </div>
                </div>
                <div class="col-12">
                    <div class="form-group">
                        <label>Isometrics <code>*</code></label>
                        <div id="displayIsometrics">${isometrics}</div>
                        <input type="file"
                            class="form-control validate"
                            accept="image/*"
                            name="examinationPicture|examination"
                            id="examinationPicture"
                            data="${examinationPicture}"
                            ${!examinationPicture ? "required" : ""}>
                        <div class="d-block invalid-feedback"></div>
                    </div>
                </div>
                <div class="col-12">
                    <div class="form-group">
                        <label>Examination Status <code>*</code></label>
                        <select class="form-control validate select2"
                            name="examinationStatus"
                            id="examinationStatus">
                            <option selected disabled>Select Examination Status</option>
                            <option value="1" 
                                ${examinationStatus == 1 ? "selected" : ""}>Active</option>
                            <option value="0"
                                ${examinationStatus == 0 ? "selected" : ""}>Inactive</option>
                        </select>
                        <div class="d-block invalid-feedback"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            ${button}
            <button class="btn btn-cancel px-5 p-2 btnCancel">
                <i class="fas fa-ban"></i> Cancel
            </button>
        </div>`;
        return html;
    }
    // ----- END GET EXAMINATION FORM CONTENT -----


    // ----- GET CHOICES -----
    function getChoices(examinationType = "", choices = []) {
        let html = "";
        if (examinationType == "Multiple Choice") {
            const keyIDArr = ["A", "B", "C", "D"];
            keyIDArr.map(ky => {
                let choice = choices.filter(chc => chc.keyID == ky);
                const { description = "" } = choice.length > 0 && choice[0];

                html += `
                <div class="form-group">
                    <div class="input-group">
                        <div class="input-group-prepend align-self-center pr-2 font-weight-bold">${ky}.</div>
                        <input type="text"
                            class="form-control-plaintext text-dark border-bottom validate"
                            data-allowcharacters="[a-z][A-Z][0-9][.][,][?][!][/][;][:]['][''][-][_][(][)][%][&][*][ ]"
                            minlength="2"
                            maxlength="150"
                            name="choice${ky}"
                            value="${description}"
                            autocomplete="off"
                            required>
                    </div>
                    <div class="d-block invalid-feedback"></div>
                </div>`;
            })
        } else if (examinationType == "True or False") {
            html += `
            <div class="form-group">
                <div class="radio inlineblock mr-3">
                    <input type="radio" trueorfalse="true" id="True" class="with-gap" value="True" disabled>
                    <span for="True">True</span>
                </div>                                
                <div class="radio inlineblock">
                    <input type="radio" trueorfalse="true" id="Female" class="with-gap" value="False" disabled>
                    <span for="Female">False</sp>
                </div>
            </div>`;
        }
        return html;
    }
    // ----- END GET CHOICES -----


    // ----- GET MULTIPLE CHOICE QUESTION -----
    function getMultipleChoiceQuestion(data = false, isAdd = false) {
        const { 
            examinationType = "", 
            question = "", 
            answer   = "", 
            choices  = [], 
            points   = 0 
        } = data;
        const noSavedAnswer = !isAdd && !answer;

        let html = "";
        if (!data || examinationType == "Multiple Choice") {
            html = `
            <tr><td>
            <div class="py-3 px-2">
                <div class="question py-2">
                    <div class="d-flex justify-content-between align-items-start">
                        <div class="d-flex">
                            <span class="pr-2 font-weight-bold rowIndex"></span>
                            <span class="font-weight-bold">Question <code>*</code></span>
                        </div>
                        <div class="d-flex">
                            <div class="form-group">
                                <label class="c_checkbox">
                                    <input type="checkbox"
                                        name="noAnswer"
                                        examinationType="Multiple Choice"
                                        ${noSavedAnswer ? "checked" : ""}>
                                    <span class="checkmark"></span>
                                    <span class="ml-2 font-weight-bold">No Answer</span>
                                </label>
                            </div>
                            <span class="px-2">|</span>
                            <div>
                                <span class="btnDeleteQuestion"
                                    style="cursor: pointer;">
                                    <i class="fas fa-trash-alt text-danger"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <input type="text"
                            class="form-control validate"
                            name="question"
                            data-allowcharacters="[a-z][A-Z][0-9][.][,][?][!][/][;][:]['][''][-][_][(][)][%][&][*][ ]"
                            minlength="2"
                            maxlength="1735"
                            value="${question}"
                            autocomplete="off"
                            required>
                        <div class="d-block invalid-feedback"></div>
                    </div>
                </div>
                <div class="choices py-2">
                    ${getChoices("Multiple Choice", choices)}
                </div>
                <div class="answer py-2">
                    <div class="row">
                        <div class="offset-md-7 col-md-5 col-sm-12">
                            <div class="row">
                                <div class="col-md-6 col-sm-12">
                                    <div class="row">
                                        <div class="col-md-5 col-sm-5 px-0 align-self-center font-weight-bold text-right">Answer: </div>
                                        <div class="col-md-7 col-sm-7">
                                            <select class="form-control select2 text-center validate"
                                                style="width: 100%"
                                                name="answer"
                                                id="answer"
                                                ${noSavedAnswer ? "disabled" : ""}
                                                required>
                                                <option selected disabled>${noSavedAnswer ? "" : "Select Answer"}</option>
                                                <option value="A"
                                                    ${answer == "A" ? "selected" : ""}>A</option>
                                                <option value="B"
                                                    ${answer == "B" ? "selected" : ""}>B</option>
                                                <option value="C"
                                                    ${answer == "C" ? "selected" : ""}>C</option>
                                                <option value="D"
                                                    ${answer == "D" ? "selected" : ""}>D</option>
                                            </select>
                                            <div class="d-block invalid-feedback"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-sm-12">
                                    <div class="row">
                                        <div class="col-md-5 col-sm-5 px-0 align-self-center font-weight-bold text-right">Points: </div>
                                        <div class="col-md-7 col-sm-7">
                                            <input type="text"
                                                class="form-control text-center input-points"
                                                min="0"
                                                max="100"
                                                minlength="1"
                                                maxlength="6"
                                                name="points"
                                                id="points"
                                                value="${points}"
                                                required>
                                            <div class="d-block invalid-feedback"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </td></tr>`;
        }
        return html;
    }
    // ----- END GET MULTIPLE CHOICE QUESTION -----


    // ----- GET IDENTIFICATION QUESTION -----
    function getIdentificationQuestion(data = false, isAdd = false) {
        const { 
            examinationType = "", 
            question = "", 
            answer   = "", 
            choices  = [], 
            points   = 0 
        } = data;
        const noSavedAnswer = !isAdd && !answer;

        let html = "";
        if (!data || examinationType == "Identification") {
            html = `
            <tr><td>
            <div class="py-3 px-2">
                <div class="question pt-2">
                    <div class="d-flex justify-content-between align-items-start">
                        <div class="d-flex">
                            <span class="pr-2 font-weight-bold rowIndex"></span>
                            <span class="font-weight-bold">Question <code>*</code></span>
                        </div>
                        <div class="d-flex">
                            <div class="form-group">
                                <label class="c_checkbox">
                                    <input type="checkbox"
                                        name="noAnswer"
                                        examinationType="Identification"
                                        ${noSavedAnswer ? "checked" : ""}>
                                    <span class="checkmark"></span>
                                    <span class="ml-2 font-weight-bold">No Answer</span>
                                </label>
                            </div>
                            <span class="px-2">|</span>
                            <div>
                                <span class="btnDeleteQuestion"
                                    style="cursor: pointer;">
                                    <i class="fas fa-trash-alt text-danger"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <input type="text"
                            class="form-control validate"
                            name="question"
                            data-allowcharacters="[a-z][A-Z][0-9][.][,][?][!][/][;][:]['][''][-][_][(][)][%][&][*][ ]"
                            minlength="2"
                            maxlength="1735"
                            value="${question}"
                            autocomplete="off"
                            required>
                        <div class="d-block invalid-feedback"></div>
                    </div>
                </div>
                <div class="choices">
                    ${getChoices("Identification", choices)}
                </div>
                <div class="answer pb-2">
                    <div class="row">
                        <div class="col-12">
                            <div class="form-group">
                                <label class="font-weight-bold">Answer ${!noSavedAnswer ? "<code>*</code>" : ""}</label>
                                <input type="text"
                                    name="answer"
                                    id="answer"
                                    class="form-control validate"
                                    data-allowcharacters="[a-z][A-Z][0-9][.][,][?][!][/][;][:]['][''][-][_][(][)][%][&][*][ ]"
                                    minlength="2"
                                    maxlength="1735"
                                    value="${answer}"
                                    ${noSavedAnswer ? "disabled" : ""}
                                    autocomplete="off"
                                    required>
                                <div class="d-block invalid-feedback"></div>
                            </div>
                        </div>
                        <div class="offset-md-7 col-md-5 col-sm-12">
                            <div class="row">
                                <div class="col-md-6 col-sm-12"></div>
                                <div class="col-md-6 col-sm-12">
                                    <div class="row">
                                        <div class="col-md-5 col-sm-5 px-0 align-self-center font-weight-bold text-right">Points: </div>
                                        <div class="col-md-7 col-sm-7">
                                            <input type="text"
                                                class="form-control text-center input-points"
                                                min="0"
                                                max="100"
                                                minlength="1"
                                                maxlength="6"
                                                name="points"
                                                id="points"
                                                value="${points}"
                                                required>
                                            <div class="d-block invalid-feedback"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </td></tr>`;
        }
        return html;
    }
    // ----- END GET IDENTIFICATION QUESTION -----


    // ----- GET ESSAY QUESTION -----
    function getEssayQuestion(data = false, isAdd = false) {
        const { 
            examinationType = "", 
            question = "", 
            answer   = "", 
            choices  = [], 
            points   = 0 
        } = data;
        const noSavedAnswer = !isAdd && !answer;

        let html = "";
        if (!data || examinationType == "Essay") {
            html = `
            <tr><td>
            <div class="py-3 px-2">
                <div class="question pt-2">
                    <div class="d-flex justify-content-between align-items-start">
                        <div class="d-flex">
                            <span class="pr-2 font-weight-bold rowIndex"></span>
                            <span class="font-weight-bold">Question <code>*</code></span>
                        </div>
                        <div class="d-flex">
                            <div class="form-group">
                                <label class="c_checkbox">
                                    <input type="checkbox"
                                        name="noAnswer"
                                        examinationType="Essay"
                                        ${noSavedAnswer ? "checked" : ""}>
                                    <span class="checkmark"></span>
                                    <span class="ml-2 font-weight-bold">No Answer</span>
                                </label>
                            </div>
                            <span class="px-2">|</span>
                            <div>
                                <span class="btnDeleteQuestion"
                                    style="cursor: pointer;">
                                    <i class="fas fa-trash-alt text-danger"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <input type="text"
                            class="form-control validate"
                            name="question"
                            data-allowcharacters="[a-z][A-Z][0-9][.][,][?][!][/][;][:]['][''][-][_][(][)][%][&][*][ ]"
                            minlength="2"
                            maxlength="1735"
                            value="${question}"
                            autocomplete="off"
                            required>
                        <div class="d-block invalid-feedback"></div>
                    </div>
                </div>
                <div class="choices">
                    ${getChoices("Essay", choices)}
                </div>
                <div class="answer pb-2">
                    <div class="row">
                        <div class="col-12">
                            <div class="form-group">
                                <label class="font-weight-bold">Answer ${!noSavedAnswer ? "<code>*</code>" : ""}</label>
                                <textarea class="form-control validate"
                                    name="answer"
                                    id="answer"
                                    data-allowcharacters="[a-z][A-Z][0-9][.][,][?][!][/][;][:]['][''][-][_][(][)][%][&][*][ ]"
                                    minlength="2"
                                    maxlength="11735"
                                    ${noSavedAnswer ? "disabled" : ""}
                                    autocomplete="off"
                                    rows="10"
                                    style="resize: none"
                                    required>${answer}</textarea>
                                <div class="d-block invalid-feedback"></div>
                            </div>
                        </div>
                        <div class="offset-md-7 col-md-5 col-sm-12">
                            <div class="row">
                                <div class="col-md-6 col-sm-12"></div>
                                <div class="col-md-6 col-sm-12">
                                    <div class="row">
                                        <div class="col-md-5 col-sm-5 px-0 align-self-center font-weight-bold text-right">Points: </div>
                                        <div class="col-md-7 col-sm-7">
                                            <input type="text"
                                                class="form-control text-center input-points"
                                                min="0"
                                                max="100"
                                                minlength="1"
                                                maxlength="6"
                                                name="points"
                                                id="points"
                                                value="${points}"
                                                required>
                                            <div class="d-block invalid-feedback"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </td></tr>`;
        }
        return html;
    }
    // ----- END GET ESSAY QUESTION -----


    // ----- GET TRUE FALSE QUESTION -----
    function getTrueFalseQuestion(data = false, isAdd = false) {
        const { 
            examinationType = "", 
            question = "", 
            answer   = "", 
            choices  = [], 
            points   = 0 
        } = data;
        const noSavedAnswer = !isAdd && !answer;

        let html = "";
        if (!data || examinationType == "True or False") {
            html = `
            <tr><td>
            <div class="py-3 px-2">
                <div class="question py-2">
                    <div class="d-flex justify-content-between align-items-start">
                        <div class="d-flex">
                            <span class="pr-2 font-weight-bold rowIndex"></span>
                            <span class="font-weight-bold">Question <code>*</code></span>
                        </div>
                        <div class="d-flex">
                            <div class="form-group">
                                <label class="c_checkbox">
                                    <input type="checkbox"
                                        name="noAnswer"
                                        examinationType="True or False"
                                        ${noSavedAnswer ? "checked" : ""}>
                                    <span class="checkmark"></span>
                                    <span class="ml-2 font-weight-bold">No Answer</span>
                                </label>
                            </div>
                            <span class="px-2">|</span>
                            <div>
                                <span class="btnDeleteQuestion"
                                    style="cursor: pointer;">
                                    <i class="fas fa-trash-alt text-danger"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <input type="text"
                            class="form-control validate"
                            name="question"
                            data-allowcharacters="[a-z][A-Z][0-9][.][,][?][!][/][;][:]['][''][-][_][(][)][%][&][*][ ]"
                            minlength="2"
                            maxlength="1735"
                            value="${question}"
                            autocomplete="off"
                            required>
                        <div class="d-block invalid-feedback"></div>
                    </div>
                </div>
                <div class="choices py-2">
                    ${getChoices("True or False", choices)}
                </div>
                <div class="answer py-2">
                    <div class="row">
                        <div class="offset-md-7 col-md-5 col-sm-12">
                            <div class="row">
                                <div class="col-md-6 col-sm-12">
                                    <div class="row">
                                        <div class="col-md-5 col-sm-5 px-0 align-self-center font-weight-bold text-right">Answer: </div>
                                        <div class="col-md-7 col-sm-7">
                                            <select class="form-control select2 text-center validate"
                                                style="width: 100%"
                                                name="answer"
                                                id="answer"
                                                ${noSavedAnswer ? "disabled" : ""}
                                                required>
                                                <option selected disabled>${noSavedAnswer ? "" : "Select Answer"}</option>
                                                <option value="True"
                                                    ${answer == "True" ? "selected" : ""}>True</option>
                                                <option value="False"
                                                    ${answer == "False" ? "selected" : ""}>False</option>
                                            </select>
                                            <div class="d-block invalid-feedback"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-sm-12">
                                    <div class="row">
                                        <div class="col-md-5 col-sm-5 px-0 align-self-center font-weight-bold text-right">Points: </div>
                                        <div class="col-md-7 col-sm-7">
                                            <input type="text"
                                                class="form-control text-center input-points"
                                                min="0"
                                                max="100"
                                                minlength="1"
                                                maxlength="6"
                                                name="points"
                                                id="points"
                                                value="${points}"
                                                required>
                                            <div class="d-block invalid-feedback"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </td></tr>`;
        } 
        return html;
    }
    // ----- END GET TRUE FALSE QUESTION -----


    // ----- GET QUESTION ROW -----
    function getQuestionRow(examinationType = "", data = false, isAdd = false) {
        let html = "";
        if (examinationType == "Identification") {
            html = getIdentificationQuestion(data, isAdd);
        } else if (examinationType == "Multiple Choice") {
            html = getMultipleChoiceQuestion(data, isAdd);
        } else if (examinationType == "Essay") {
            html = getEssayQuestion(data, isAdd);
        } else if (examinationType == "True or False") {
            html = getTrueFalseQuestion(data, isAdd);
        }
        return html;
    }
    // ----- END GET QUESTION ROW -----


    // ----- UPDATE TABLE QUESTIONS -----
    function updateTableQuestions() {
        $(`#tbodyQuestions tr`).each(function(index) {
            const number = index + 1;
            $(`.rowIndex`, this).text(`${number}.`);

            $(this).attr("index", number);

            $(`[name="question"]`, this).each(function(idx) {
                $(this).attr("id", `question${number}${idx}`);
            })

            $(`[name="choiceA"]`, this).each(function(idx) {
                $(this).attr("id", `choiceA${number}${idx}`);
            })

            $(`[name="choiceB"]`, this).each(function(idx) {
                $(this).attr("id", `choiceB${number}${idx}`);
            })

            $(`[name="choiceC"]`, this).each(function(idx) {
                $(this).attr("id", `choiceC${number}${idx}`);
            })

            $(`[name="choiceD"]`, this).each(function(idx) {
                $(this).attr("id", `choiceD${number}${idx}`);
            })

            $(`[name="answer"]`, this).each(function(idx) {
                $(this).attr("id", `answer${number}${idx}`);
            })

            $(`[name="points"]`, this).each(function(idx) {
                $(this).attr("id", `points${number}${idx}`);
            })

            $(`[trueorfalse="true"]`, this).attr("name", `answerTF${number}`);
        })
    }
    // ----- END UPDATE TABLE QUESTIONS -----


    // ----- UPDATE TOTAL POINTS -----
    function updateTotalPoints() {
        let totalPoints = 0;
        $(`[name="points"]`).each(function() {
            let points = $(this).val() || 0;
                points = getNonFormattedAmount(points);
            totalPoints += points;
        })
        $("#totalPoints").text(formatAmount(totalPoints));
        return totalPoints;
    }
    // ----- END UPDATE TOTAL POINTS -----


    // ----- GET QUESTIONS DATA -----
    function getQuestionsData(examinationType = "") {
        let data = [];

        $(`#tbodyQuestions tr`).each(function() {
            const question = $(`[name="question"]`, this).val()?.trim();
            const answer   = $(`[name="answer"]`, this).val();
            const points   = getNonFormattedAmount($(`[name="points"]`, this).val());

            let temp = {
                question, answer, points
            }

            if (examinationType == "Multiple Choice") {
                const choiceA = $(`[name="choiceA"]`, this).val()?.trim();
                const choiceB = $(`[name="choiceB"]`, this).val()?.trim();
                const choiceC = $(`[name="choiceC"]`, this).val()?.trim();
                const choiceD = $(`[name="choiceD"]`, this).val()?.trim();

                temp.choices = [
                    {
                        keyID:       "A",
                        description: choiceA,
                    },
                    {
                        keyID:       "B",
                        description: choiceB,
                    },
                    {
                        keyID:       "C",
                        description: choiceC,
                    },
                    {
                        keyID:       "D",
                        description: choiceD,
                    },
                ];
                
            } else if (examinationType == "Identification") {

            }

            data.push(temp);
        })

        
        return data;
    }
    // ----- END GET QUESTIONS DATA -----


    // ----- REMOVE IS-VALID IN TABLE -----
	function removeIsValid(element = "table") {
		$(element).find(".validated, .is-valid, .no-error").removeClass("validated")
		.removeClass("is-valid").removeClass("no-error");
	}
	// ----- END REMOVE IS-VALID IN TABLE -----


    // ----- UPDATE SAVE BUTTON -----
    function updateSaveButton() {
        const hasQuestion = $(`#tbodyQuestions tr`).length > 0;
        const noData = $(`#tbodyQuestions tr#noData`).length == 1;
        if (hasQuestion && !noData) {
            $(`#btnSaveQuestion`).removeAttr("disabled");
        } else {
            $(`#btnSaveQuestion`).attr("disabled", true);
        }
    }
    // ----- END UPDATE SAVE BUTTON -----


    // ----- SELECT ISOMETRICS -----
    $(document).on("change", "#examinationPicture", function() {
        const data = $(this).attr("data");

        $(this).removeClass("is-valid").removeClass("is-invalid");
        $parent = $(this).closest(".form-group");
        $parent.find(".invalid-feedback").text("");

        const filename = this.files[0].name;
		const filesize = this.files[0].size/1024/1024; // Size in MB
        const filetype = this.files[0].type;
		if (filesize > 10) {
			$(this).val("");
            !data && $("#displayIsometrics").empty();
			showNotification("danger", "File size must be less than or equal to 10mb");
		} else if (filetype.indexOf("image") == -1) {
            $(this).val("");
            !data && $("#displayIsometrics").empty();
            showNotification("danger", "Invalid file type");
        } else {
            $(this).attr("data", filename);
            $(this).removeAttr("required");
			let html = `
			<div class="d-flex justify-content-between align-items-center py-2">
				<span class="filename">${filename}</span>
				<span class="btnRemoveFile" style="cursor: pointer"><i class="fas fa-close"></i></span>
			</div>`;
			$("#displayIsometrics").html(html);
		}
    })
    // ----- END SELECT ISOMETRICS -----


    // ----- REMOVE ISOMETRICS -----
    $(document).on("click", ".btnRemoveFile", function() {
        $("#displayIsometrics").empty();
        $("#examinationPicture").val("");
        $("#examinationPicture").attr("required", true);
        $("#examinationPicture").removeAttr("data");
    })
    // ----- END REMOVE ISOMETRICS -----


    // ----- ADD EXAM -----
    $(document).on("click", `#btnAddExam`, function() {
        let content = getExaminationFormContent();

        $("#modal_examination .page-title").text("ADD EXAMINATION");
        $("#modal_examination").modal("show");
        $("#modal_examination_content").html(preloader);
        $("#modal_examination_content").html(content);
        initAll();
    })
    // ----- END ADD EXAM -----


    // ----- EDIT EXAM -----
    $(document).on("click", `.btnEditExam`, function() {
        const examinationID = $(this).attr("examinationID");
        let hasData = $(this).attr("hasData") == "true";

        $("#modal_examination .page-title").text("EDIT EXAMINATION");
        $("#modal_examination").modal("show");
        $("#modal_examination_content").html(preloader);
        let data    = getExaminationData(examinationID);
        let content = getExaminationFormContent(data, hasData);
        setTimeout(() => {
            $("#modal_examination_content").html(content);
            initAll();
        }, 300);
    })
    // ----- END EDIT EXAM -----


    // ----- CANCEL EXAM -----
    $(document).on("click", `.btnCancel`, function() {
        let formEmpty = isFormEmpty("modal_examination");
		if (!formEmpty) {
			sweetAlertConfirmation(
				"cancel",
				"Examination",
				"modal_examination"
			);
		} else {
			$("#modal_examination").modal("hide");
		}
    })
    // ----- END CANCEL EXAM -----


    // ----- SAVE EXAM -----
    $(document).on("click", "#btnSaveExam", function() {
        const validate = validateForm("modal_examination");
        if (validate) {
            let data = getFormData("modal_examination");
            data.append(`tableData[createdBy]`, sessionID);
            data.append(`tableData[updatedBy]`, sessionID);
            data.append("tableName", "hris_examination_tbl");
            data.append("feedback", $(`[name="examinationName"]`).val()?.trim());

            sweetAlertConfirmation(
                "add", 
                "Examination", 
                "modal_examination", 
                null, 
                data, 
                false, 
                pageContent);
        }
    })
    // ----- END SAVE EXAM -----


    // ----- UPDATE EXAM -----
    $(document).on("click", "#btnUpdateExam", function() {
        const examinationID = $(this).attr("examinationID");
        const validate = validateForm("modal_examination");
        if (validate) {
            let data = getFormData("modal_examination");
            data.append(`tableData[updatedBy]`, sessionID);
            data.append("tableName", "hris_examination_tbl");
            data.append("whereFilter", `examinationID=${examinationID}`);
            data.append("feedback", $(`[name="examinationName"]`).val()?.trim());

            sweetAlertConfirmation(
                "update", 
                "Examination", 
                "modal_examination", 
                null, 
                data, 
                false, 
                pageContent);
        }
    })
    // ----- END UPDATE EXAM -----


    // ----- SELECT EXAM -----
    $(document).on("click", ".examName", function () {
		const examinationID   = $(this).attr("examinationID");
		const examinationType = $(this).attr("examinationType");
		
        $(`#examinationNameContent`).find(`tr.active-menu`).removeClass(`active-menu`);
        $(`#examinationNameContent`).find(`tr[examinationID="${examinationID}"]`).addClass(`active-menu`);
        questionaireTable(examinationID, examinationType);
	});
    // ----- END SELECT EXAM -----


    // ----- ADD QUESTION ROW -----
    $(document).on("click", `#btnAddQuestionRow`, function() {
        const examinationType = $(this).attr("examinationType");
        const row    = getQuestionRow(examinationType, false, true);
        const noData = $(`#tbodyQuestions tr#noData`).length == 1;
        if (noData) $("#tbodyQuestions").html(row);
        else $("#tbodyQuestions").append(row);
        $(`[name="question"]`).last().focus();
        updateTableQuestions();
        updateSaveButton();
        initSelect2();
        initPoints();
    })
    // ----- END ADD QUESTION ROW -----


    // ----- DELETE QUESTION ROW -----
    $(document).on("click", `.btnDeleteQuestion`, function() {
        const tableRow = $(this).closest("tr");
        Swal.fire({
            title:              "DELETE QUESTION",
            text:               "Are you sure that you want to delete the question for this examination?",
            imageUrl:           `${base_url}assets/modal/delete.svg`,
            imageWidth:         200,
            imageHeight:        200,
            imageAlt:           "Custom image",
            showCancelButton:   true,
            confirmButtonColor: "#dc3545",
            cancelButtonColor:  "#1a1a1a",
            cancelButtonText:   "No",
            confirmButtonText:  "Yes"
        }).then((result) => {
            if (result.isConfirmed) {
                tableRow.fadeOut(500, function (){
                    $(this).closest("tr").remove();
                    updateTableQuestions();
                    updateTotalPoints();
                    updateSaveButton();

                    if ($(`#tbodyQuestions tr`).length == 0) {
                        let html = `
                        <tr id="noData"><td>
                            <div class="w-100 text-center mb-5">
                                <img src="${base_url}assets/modal/no-data.gif"
                                    style="max-width: 300px;
                                    width: auto;
                                    min-width: 100px;
                                    height: auto;"
                                    alt="No available data.">
                                <h4>No available data.</h4>
                            </div>
                        </td></tr>`;
                        $("#tbodyQuestions").html(html);
                    }
                });
            }
        });
    })
    // ----- END DELETE QUESTION ROW -----


    // ----- NO ANSWER -----
    $(document).on("change", `[name="noAnswer"]`, function() {
        $tableRow = $(this).closest("tr");

        const isChecked = this.checked;
        if (isChecked) {
            $tableRow.find(`[name="points"]`).val(0).trigger("keyup");
            $tableRow.find(`[name="answer"]`).removeAttr("required");
            $tableRow.find(`[name="answer"]`).attr("disabled", true);
            $tableRow.find(`[name="answer"]`).parent().find("label").html("Answer");
            $tableRow.find(`[name="answer"]`).val("").trigger("change");
            $tableRow.find(`[name="answer"]`).val("").trigger("keyup");
        } else {
            $tableRow.find(`[name="answer"]`).attr("required", true);
            $tableRow.find(`[name="answer"]`).removeAttr("disabled");
            $tableRow.find(`[name="answer"]`).parent().find("label").html(`Answer <code>*</code>`);
        }
    })
    // ----- END NO ANSWER -----


    // ----- CHANGE POINTS -----
    $(document).on("keyup", `[name="points"]`, function() {
        updateTotalPoints();
    })
    // ----- END CHANGE POINTS -----


    // ----- SAVE QUESTIONS -----
    $(document).on("click", "#btnSaveQuestion", function() {
        const examinationID   = $(this).attr("examinationID");
        const examinationType = $(this).attr("examinationType");
        const validate = validateForm("tbodyQuestions");
        removeIsValid();
        if (validate) {
            saveExamination("save", examinationID, examinationType);
        }
    })
    // ----- END SAVE QUESTIONS -----


    // ----- CHANGE EXAM TYPE -----
    $(document).on("change", `[name="examinationType"]`, function() {
        const examinationType = $(this).val();
        const oldValue        = $(this).attr("oldValue");
        const hasData         = $(this).attr("hasData") == "true";

        let newValue = examinationType;
        if (hasData) {
            $("#modal_examination").modal("hide");
            const confirmation = getConfirmation("examtype");
            confirmation.then(res => {
                if (res.isConfirmed) {
                    $(this).attr("oldValue", examinationType);
                } else {
                    $(this).attr("oldValue", oldValue);
                    newValue = oldValue;
                }

                $(this).val(newValue).trigger("change");
                $("#modal_examination").modal("show");
            })
        }

        if (newValue == oldValue) {
            $(this).attr("hasData", "true");
        } else {
            $(this).attr("hasData", "false");
        }
    })
    // ----- END CHANGE EXAM TYPE -----




    // ----- GET CONFIRMATION -----
    function getConfirmation(method = "save") {
        const title = "Examination";
        let swalText, swalImg;
    
        $("#modal_purchase_request").text().length > 0 && $("#modal_purchase_request").modal("hide");
    
        switch (method) {
            case "save":
                swalTitle = `SAVE ${title.toUpperCase()}`;
                swalText  = "Are you sure that you want to save this examination to the system?";
                swalImg   = `${base_url}assets/modal/draft.svg`;
                break;
            case "examtype":
                swalTitle = `UPDATE EXAM TYPE`;
                swalText  = "Are you sure that you want to update the exam type of this examination? All data will be removed and this exam will start from scratch.";
                swalImg   = `${base_url}assets/modal/update.svg`;
                break;
            case "submit":
                swalTitle = `SUBMIT ${title.toUpperCase()}`;
                swalText  = "Are you sure to submit this document?";
                swalImg   = `${base_url}assets/modal/add.svg`;
                break;
            case "approve":
                swalTitle = `APPROVE ${title.toUpperCase()}`;
                swalText  = "Are you sure to approve this document?";
                swalImg   = `${base_url}assets/modal/approve.svg`;
                break;
            case "deny":
                swalTitle = `DENY ${title.toUpperCase()}`;
                swalText  = "Are you sure to deny this document?";
                swalImg   = `${base_url}assets/modal/reject.svg`;
                break;
            case "cancelform":
                swalTitle = `CANCEL ${title.toUpperCase()}`;
                swalText  = "Are you sure to cancel this document?";
                swalImg   = `${base_url}assets/modal/cancel.svg`;
                break;
            case "drop":
                swalTitle = `DROP ${title.toUpperCase()}`;
                swalText  = "Are you sure to drop this document?";
                swalImg   = `${base_url}assets/modal/drop.svg`;
                break;
            default:
                swalTitle = `CANCEL ${title.toUpperCase()}`;
                swalText  = "Are you sure that you want to cancel this process?";
                swalImg   = `${base_url}assets/modal/cancel.svg`;
                break;
        }
        return Swal.fire({
            title:              swalTitle,
            text:               swalText,
            imageUrl:           swalImg,
            imageWidth:         200,
            imageHeight:        200,
            imageAlt:           "Custom image",
            showCancelButton:   true,
            confirmButtonColor: "#dc3545",
            cancelButtonColor:  "#1a1a1a",
            cancelButtonText:   "No",
            confirmButtonText:  "Yes"
        })
    }
    // ----- END GET CONFIRMATION -----


    // ----- SAVE EXAMINATION -----
    function saveExamination(method = "save", examinationID, examinationType) {
        const confirmation = getConfirmation(method);
		confirmation.then(res => {
			if (res.isConfirmed) {

                const examinationName = $(`.examName[examinationID="${examinationID}"]`).attr("examinationName");
                const totalPoints = getNonFormattedAmount($("#totalPoints").text());
                let data = {
                    examinationID, 
                    examinationType, 
                    examinationName, 
                    totalPoints,
                    questions: getQuestionsData(examinationType)
                };

				$.ajax({
					method:      "POST",
					url:         `examination/saveExamination`,
					data,
					async:       false,
					dataType:    "json",
					beforeSend: function() {
						$("#loader").show();
					},
					success: function(data) {
						let result = data.split("|");
		
						let isSuccess   = result[0];
						let message     = result[1];
						let insertedID  = result[2];
						let dateCreated = result[3];
		
						if (isSuccess == "true") {
							setTimeout(() => {
								$("#loader").hide();
								closeModals();
								Swal.fire({
									icon:              "success",
									title:             `${message} saved successfully!`,
									showConfirmButton: false,
									timer:             2000,
								});
							}, 500);
						} else {
							setTimeout(() => {
								$("#loader").hide();
								Swal.fire({
									icon:              "danger",
									title:             message,
									showConfirmButton: false,
									timer:             2000,
								});
							}, 500);
						}
					},
					error: function() {
						setTimeout(() => {
							$("#loader").hide();
							showNotification("danger", "System error: Please contact the system administrator for assistance!");
						}, 500);
					}
				}).done(function() {
					setTimeout(() => {
						$("#loader").hide();
                        $(`.examName[examinationID="${examinationID}"]`).trigger("click");
					}, 500);
				})
			} else {

			}
		});
    }
    // ----- END SAVE EXAMINATION -----


})