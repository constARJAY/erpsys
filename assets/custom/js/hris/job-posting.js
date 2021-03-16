$(document).ready(function(){

  // ----- DATATABLES -----
  function initDataTables() {
      if ($.fn.DataTable.isDataTable('#tableJobPosting')){
          $('#tableJobPosting').DataTable().destroy();
      }
      
      var table = $("#tableJobPosting").css({"min-width": "100%"}).removeAttr('width').DataTable({
          proccessing:    false,
          serverSide:     false,
          scrollX:        true,
          scrollCollapse: true,
          columnDefs: [
              { targets: 0, width: 100 },
              { targets: 1, width: 100 },
              { targets: 2, width: 100 },
              { targets: 3, width: 50 },
          ],
      });
  }
  initDataTables();
  // ----- END DATATABLES -----

  // ----- TABLE CONTENT -----
  function tableContent() {
      // Reset the unique datas
      uniqueData = []; 
      const data = getTableData("hris_job_posting_tbl","*","", "");

    //   $.ajax({
    //       url:      `${base_url}operations/getTableData`,
    //       method:   'POST',
    //       async:    false,
    //       dataType: 'json',
    //       data:     {tableName: "gen_operations_tbl"},
    //       beforeSend: function() {
    //           $("#table_content").html(preloader);
    //           // $("#inv_headerID").text("List of Inventory Item");
    //       },
    //       success: function(data) {
    //           console.log(data);
              let html = `
              <table class="table table-bordered table-striped table-hover" id="tableJobPosting">
                  <thead>
                  <tr class="text-center">
                      <th>Job Code</th>
                      <th>Company</th>
                      <th>Job Title</th>
                      <th>Job Description</th>
                      <th>Job Type</th>
                      <th>Job Category</th>
                      <th>Status</th>
                      <th>Action</th>
                  </tr>
                  </thead>
                  <tbody>`;

              data.map((item, index, array) => {
                  // ----- INSERT UNIQUE DATA TO uniqueData VARIABLE ----
                  let unique = {
                      id:       item.jobID, // Required
                      jobTitle: item.jobTitle,
                    //   email:    item.email,
                  }
                  uniqueData.push(unique);
                  // ----- END INSERT UNIQUE DATA TO uniqueData VARIABLE ----

                  html += `
                  <tr>
                      <td>${item.jobCode}</td>
                      <td>${item.jobCompany}</td>
                      <td>${item.jobTitle}</td>
                      <td>${item.jobDescription}</td>
                      <td>${item.jobType}</td>
                      <td>${item.jobCategory}</td>
                      <td><span class="badge badge-outline-success w-100">Active</span></td>
                      <td>
                          <button 
                              class="btn btn-edit btn-block btnEdit" 
                              id="${item.jobID}"
                              feedback="${item.jobTitle}">
                              <i class="fas fa-edit"></i>
                              Edit
                          </button>
                      </td>
                  </tr>`;
              })
              html += `</tbody>
              </table>`;

              setTimeout(() => {
                  $("#table_content").html(html);
                  initDataTables();
              }, 500);
    //       },
    //       error: function() {
    //           let html = `
    //               <div class="w-100 h5 text-center text-danger>
    //                   There was an error fetching data.
    //               </div>`;
    //           $("#table_content").html(html);
    //       }
    //   })
  }
  tableContent();
  // ----- END TABLE CONTENT -----

   // ----- MODAL CONTENT -----
   function modalContent(data = false) {
    let jobID              = data ? (data[0].jobID            ? data[0].jobID        : "") : "",
    jobCompany             = data ? (data[0].jobCompany       ? data[0].jobCompany   : "") : "",
    jobTitle                = data ? (data[0].jobTitle          ? data[0].jobTitle      : "") : "",
    jobDescription                = data ? (data[0].jobDescription          ? data[0].jobDescription      : "") : "",
    jobResponsibilities                = data ? (data[0].jobResponsibilities          ? data[0].jobResponsibilities      : "") : "",
    jobType                = data ? (data[0].jobType          ? data[0].jobType      : "") : "",
    jobCategory                = data ? (data[0].jobCategory          ? data[0].jobCategory      : "") : "",
    techSkillsQualification                = data ? (data[0].techSkillsQualification          ? data[0].techSkillsQualification      : "") : "",
    jobBenefits                = data ? (data[0].jobBenefits          ? data[0].jobBenefits      : "") : "",
    // jobLanguage                = data ? (data[0].jobLanguage          ? data[0].jobLanguage      : "") : "",
    jobLanguage    = data ? (data[0].jobLanguage ? data[0]["jobLanguage"].split("|") : []) : [],
    jobSlot                = data ? (data[0].jobSlot          ? data[0].jobSlot      : "") : "",
    salaryRangeSelect                = data ? (data[0].salaryRangeSelect          ? data[0].salaryRangeSelect      : "") : "",
    salaryRange      = data ? (data[0].salaryRange? data[0].salaryRange         : "") : "";
        
      let button = jobID ? `
      <button 
          class="btn btn-update " 
          id="btnUpdate" 
          rowID="${jobID}">
          <i class="fas fa-save"></i>
          Update
      </button>` : `
      <button 
          class="btn btn-save" 
          id="btnSave"><i class="fas fa-save"></i>
          Save
      </button>`;

      let html = `
      <div class="modal-body">

                  <div class="row">
                      <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12">
                          <div class="form-group">
                              <label>Company <span class="text-danger font-weight-bold">*</span></label>
                              <select 
                                  class="form-control select2 validate" 
                                  id="input_jobCompany" 
                                  name="jobCompany"
                                  autocomplete="off"
                                  required>
                                  <option disabled ${!data && "selected"} selected>Select Company</option>
                                  <option ${data && jobCompany == "BlackCoders Group Inc." && "selected"} value="BlackCoders Group Inc.">BlackCoders Group Inc.</option>
                                  <option ${data && jobCompany == "CMTLand Development Inc." && "selected"} value="CMTLand Development Inc.">CMTLand Development Inc.</option>
                                  <option ${data && jobCompany == "Gatchallan Tangalin Co.&CPA's" && "selected"} value="Gatchallan Tangalin Co.&CPA's">Gatchallan Tangalin Co.&CPA's</option>
                                  <option ${data && jobCompany == "CMTBuilders Inc." && "selected"} value="CMTBuilders Inc.">CMTBuilders Inc.</option>
                              </select>
                              <div class="invalid-feedback d-block" id="invalid-input_jobCompany"></div>
                          </div>
                      </div>

                      <div class="col-xl-8 col-lg-8 col-md-6 col-sm-12">
                          <div class="form-group">
                              <label>Job Title <span class="text-danger font-weight-bold">*</span></label>
                              <input 
                                  type="text" 
                                  class="form-control validate" 
                                  name="jobTitle" 
                                  id="input_jobTitle" 
                                  data-allowcharacters="[A-Z][a-z][0-9][-][(][)][,]['][&]" 
                                  minlength="2" 
                                  maxlength="50" 
                                  required 
                                  unique="${jobID}" 
                                  value="${jobTitle}"
                                  autocomplete="off">
                              <div class="invalid-feedback d-block" id="invalid-input_jobTitle"></div>
                          </div>
                      </div>

                      <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                          <div class="form-group">
                              <label>Job Description <span class="text-danger font-weight-bold">*</span></label>
                              <textarea 
                                  type="text" 
                                  class="form-control validate" 
                                  name="jobDescription" 
                                  id="input_jobDescription" 
                                  data-allowcharacters="[A-Z][a-z][0-9][ ][-][.][,][(][)]['][&]" 
                                  minlength="2" 
                                  maxlength="325" 
                                  rows="3"
                                  required 
                                  autocomplete="off">${jobDescription}</textarea>
                              <div class="invalid-feedback d-block" id="invalid-input_jobDescription"></div>
                          </div>
                      </div>
                      <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                          <div class="form-group">
                              <label>Job Responsibilities <span class="text-danger font-weight-bold">*</span></label>
                              <textarea 
                                  type="text" 
                                  class="form-control validate" 
                                  name="jobResponsibilities" 
                                  id="input_jobResponsibilities" 
                                  data-allowcharacters="[A-Z][a-z][0-9][ ][-][.][,][(][)]['][&]" 
                                  minlength="2" 
                                  maxlength="500" 
                                  rows="3"
                                  required 
                                  autocomplete="off">${jobResponsibilities}</textarea>
                              <div class="invalid-feedback d-block" id="invalid-input_jobResponsibilities"></div>
                          </div>
                      </div>
                      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                          <div class="form-group">
                              <label>Job Type <span class="text-danger font-weight-bold">*</span></label>
                              <select 
                                  class="form-control select2 validate" 
                                  id="input_jobType" 
                                  name="jobType"
                                  autocomplete="off"
                                  required>
                                  <option disabled ${!data && "selected"} selected>Select Type</option>
                                  <option ${data && jobType == "Full-Time" && "selected"} value="Full-Time">Full-Time</option>
                                  <option ${data && jobType == "Part-Time" && "selected"} value="Part-Time">Part-Time</option>
                                  <option ${data && jobType == "Contractual" && "selected"} value="Contractual">Contractual</option>
                                  <option ${data && jobType == "Temporary" && "selected"} value="Temporary">Temporary</option>
                                  <option ${data && jobType == "Internship" && "selected"} value="Internship">Internship</option>
                              </select>
                              <div class="invalid-feedback d-block" id="invalid-input_jobType"></div>
                          </div>
                      </div>

                      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                          <div class="form-group">
                              <label>Job Category <span class="text-danger font-weight-bold">*</span></label>
                              <select 
                                  class="form-control select2 validate" 
                                  id="input_jobCategory" 
                                  name="jobCategory"
                                  autocomplete="off"
                                  required>
                                  <option disabled ${!data && "selected"} selected>Select Category</option>
                                  <option ${data && jobCategory == "Accounting/Finance" && "selected"} value="Accounting/Finance">Accounting/Finance</option>
                                  <option ${data && jobCategory == "Admin/Human Resource" && "selected"} value="Admin/Human Resource">Admin/Human Resource</option>
                                  <option ${data && jobCategory == "Sales/Marketing" && "selected"} value="Sales/Marketing">Sales/Marketing</option>
                                  <option ${data && jobCategory == "Computer/Information Technology" && "selected"} value="Computer/Information Technology">Computer/Information Technology</option>
                                  <option ${data && jobCategory == "Engineering" && "selected"} value="Engineering">Engineering</option>
                                  <option ${data && jobCategory == "Building Construction" && "selected"} value="Building Construction">Building Construction</option>
                              </select>
                              <div class="invalid-feedback d-block" id="invalid-input_jobCategory"></div>
                          </div>
                      </div>
                      <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                          <div class="form-group">
                              <label>Technical Skills & Qualifications <span class="text-danger font-weight-bold">*</span></label>
                              <textarea 
                              type="text" 
                              class="form-control validate" 
                              name="techSkillsQualification" 
                              id="input_techSkillsQualification" 
                              data-allowcharacters="[A-Z][a-z][0-9][ ][-][.][,][(][)]['][&][*]" 
                              minlength="2" 
                              maxlength="500" 
                              rows="4"
                              required 
                              autocomplete="off">${techSkillsQualification}</textarea>
                              <div class="invalid-feedback d-block" id="invalid-input_techSkillsQualification"></div>
                          </div>
                      </div>
                      <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                        <div class="form-group">
                            <label>Benefits <span class="text-danger font-weight-bold">*</span></label>
                            <textarea 
                            type="text" 
                            class="form-control validate" 
                            name="jobBenefits" 
                            id="input_jobBenefits" 
                            data-allowcharacters="[A-Z][a-z][0-9][ ][-][.][,][(][)][*][&]" 
                            minlength="2" 
                            maxlength="500" 
                            rows="4"
                            required 
                            autocomplete="off">${jobBenefits}</textarea>
                            <div class="invalid-feedback d-block" id="invalid-input_jobBenefits"></div>
                        </div>
                    </div>
                      <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12">
                          <div class="form-group">
                              <label>Language <span class="text-danger font-weight-bold">*</span></label>
                              <select 
                                  class="form-control select2 validate" 
                                  id="input_jobLanguage" 
                                  name="jobLanguage"
                                  autocomplete="off"
                                  title="Select Language"
                                  required multiple>
                                  <option ${data && jobLanguage && jobLanguage.some(x => x == "Tagalog") ? "selected" : ""} value="Tagalog">Tagalog</option>
                                  <option ${data && jobLanguage && jobLanguage.some(x => x == "English") ? "selected" : ""} value="English">English</option>
                                  <option ${data && jobLanguage && jobLanguage.some(x => x == "Others") ? "selected" : ""} value="Others">Others</option>
                              </select>
                              <div class="invalid-feedback d-block" id="invalid-input_jobLanguage"></div>
                          </div>
                      </div>
                      <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12">
                          <div class="form-group">
                              <label>No. of Vacancies <span class="text-danger font-weight-bold">*</span></label>
                              <input 
                                  type="number" 
                                  class="form-control validate" 
                                  name="jobSlot" 
                                  id="input_jobSlot" 
                                  data-allowcharacters="[0-9]" 
                                  minlength="2" 
                                  maxlength="50" 
                                  required 
                                  value="${jobSlot}"
                                  autocomplete="off">
                              <div class="invalid-feedback d-block" id="invalid-input_jobSlot"></div>
                          </div>
                      </div>     
                      <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                          <div class="form-group">
                              <label>Salary Range <span class="text-danger font-weight-bold">*</span></label>
                              <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                <select 
                                class="form-control select2 validate" 
                                id="input_salaryRangeSelect" 
                                name="salaryRangeSelect"
                                autocomplete="off"
                                title="Select Range"
                                required>
                                <option ${data && salaryRangeSelect == "1" && "selected"} value="1">Above</option>
                                <option ${data && salaryRangeSelect == "2" && "selected"} value="2">Below</option>
                                <option ${data && salaryRangeSelect == "3" && "selected"} value="3">Average</option>
                            </select>
                                </div>
                                <input 
                                type="text" 
                                class="form-control amount text-right inputmask" 
                                name="salaryRange" 
                                id="input_salaryRange" 
                                data-allowcharacters="[0-9]" 
                                placeholder="0.00"
                                required 
                                value="${salaryRange}"
                                autocomplete="off">
                              </div>

                              <div class="invalid-feedback d-block" id="invalid-input_salaryRange"></div>
                          </div>
                      </div>
                  </div>
                  </div>

      <div class="modal-footer">
          ${button}
          <button class="btn btn-cancel btnCancel"><i class="fas fa-ban"></i> Cancel</button>
      </div>`;
  return html;
} 
  // ----- END MODAL CONTENT -----

  // ----- OPEN ADD MODAL -----
  $(document).on("click", "#btnAdd", function() {
      $("#modalJobPostingHeader").text("POST NEW JOB");
      $("#modalJobPosting").modal("show");
      $("#modalJobPostingContent").html(preloader);
      const content = modalContent();
      $("#modalJobPostingContent").html(content);
      initAll();
  });
  // ----- END OPEN ADD MODAL -----


  // ----- SAVE MODAL -----
  $(document).on("click", "#btnSave", function() {
  const validate = validateForm("modalJobPosting");
  if (validate) {

    let tableData           = getTableData("hris_job_posting_tbl","","","jobCode DESC");
    var currentDate         = new Date();
    let currentYear         = currentDate.getFullYear();
    let currentYearStr      = currentYear.toString();

        // Generate Number
        let tableDataCode       = tableData.length < 1 ? "" : parseInt(tableData[0]["jobCode"].slice(6)) + 1;

        let genCode  = tableData.length < 1 ? "JPG-"+currentYearStr.slice(2)+"-00001" : "JPG-"+currentYearStr.slice(2)+"-"+numberCodeSize(tableDataCode, "5");

// genCode("RQT",null,"tablename","columnName");
        let data = getFormData("modalJobPosting",true);
        data["tableData[jobCode]"]     = genCode;
        data["tableData[createdBy]"]     = "1";
        data["tableData[updatedBy]"]     = "1";
        data["tableName"]                = "hris_job_posting_tbl";
        data["feedback"]                 = genCode;
        sweetAlertConfirmation("add", "Job Posting","modalJobPosting", null, data);
      }
  });
  // ----- END SAVE MODAL -----

  // ----- OPEN EDIT MODAL -----
  $(document).on("click", ".btnEdit", function() {
      const id       = $(this).attr("id");
      const feedback = $(this).attr("feedback");
      $("#modalJobPostingHeader").text("VIEW JOB INFORMATION");
      $("#modalJobPosting").modal("show");

      // Display preloader while waiting for the completion of getting the data
      $("#modalJobPostingContent").html(preloader); 

      const tableData = getTableData("hris_job_posting_tbl", "*", "jobID="+id, "");
      if (tableData) {
          const content = modalContent(tableData);
          setTimeout(() => {
              $("#modalJobPostingContent").html(content);
              $("#btnSaveConfirmationEdit").attr("rowID", id);
              $("#btnSaveConfirmationEdit").attr("feedback", feedback);
              initAll();
          }, 500);
      }
  });
  // ----- END OPEN EDIT MODAL -----

  // ----- UPDATE MODAL -----
  $(document).on("click", "#btnUpdate", function() {

    const validate = validateForm("modalJobPosting");
    let rowID           = $(this).attr("rowID");
    let genCode         = getTableData("hris_job_posting_tbl","jobCode","jobID="+rowID,"jobCode DESC");
    if (validate) {

        let data = getFormData("modalJobPosting", true);
        data["tableData"]["updatedBy"]   =  "2";
        data["whereFilter"]              =  "jobID="+rowID;
        data["tableName"]                =  "hris_job_posting_tbl";
        data["feedback"]                 =   genCode[0]["jobCode"];
        console.log(data);
        sweetAlertConfirmation("update", "Job Posting","modalJobPosting", null , data);


    }

    //   const validate = validateForm("modalJobPosting");
    //   if (validate) {
    //   $("#modalJobPosting").modal("hide");
    //       Swal.fire({
    //           title: 'Are you sure?',
    //           text: "You want to save this?",
    //           imageUrl: `${base_url}assets/custom/isometric_image/save.png`,
    //           imageWidth: 200,
    //           imageHeight: 200,
    //           imageAlt: 'Custom image',
    //           showCancelButton: true,
    //           confirmButtonColor: '#28a745',
    //           cancelButtonColor: '#1A1A1A',
    //           confirmButtonText: 'Yes, save changes',
    //           allowOutsideClick: false
    //         }).then((result) => {
    //           if (result.isConfirmed) {
  
    //               // const accountID = $(this).attr("rowID");
    //               // const feedback  = $(this).attr("feedback");
      
    //               // let data = getFormData("modal_user_account");
    //               // data.append("tableName", "user_account_tbl");
    //               // data.append("whereFilter", "jobID="+accountID);
    //               // data.append("feedback", feedback);
      
    //               // /**
    //               //  * ----- DATA -----
    //               //  * 1. tableName
    //               //  * 2. tableData
    //               //  * 3. whereFilter
    //               //  * 4. feedback
    //               // */
      
    //               // const saveData = updateTableData(data);
    //               // if (saveData) {
    //               //    tableContent();
    //               // }
                  
    //           Swal.fire({
    //               icon: 'success',
    //               title: 'Successfully saved!',
    //               showConfirmButton: false,
    //               timer: 2000
    //           })
    //           }else{
    //               $("#modalJobPosting").modal("show");
    //           }
    //       });
              
    //       }
      });
      // ----- END UPDATE MODAL -----

  // ------- CANCEl MODAL-------- 
  $(document).on("click",".btnCancel", function(){
    let condition = emptyFormCondition("modalJobPosting");
    if(condition==true){
        sweetAlertConfirmation("", "Job Posting","modalJobPosting");
    }else{
        $("#modalJobPosting").modal("hide");
    }
    
});

  // -------- END CANCEL MODAL-----------
    
});