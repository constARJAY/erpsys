$(document).ready(function(){

    	//------ MODULE FUNCTION IS ALLOWED UPDATE-----
	
	const allowedUpdate = isUpdateAllowed(103);
	if(!allowedUpdate){
		$("#modalJobPostingContent").find("input, select, textarea").each(function(){
			$(this).attr("disabled",true);
		});
		$("#btnUpdate").hide();
	}

	//------ END MODULE FUNCTION IS ALLOWED UPDATE-----

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
            { targets: 0, width: 100  },
            { targets: 1, width: 150 },
            { targets: 2, width: 150 },
            { targets: 3, width: 350  },
            { targets: 4, width: 150  },
            { targets: 5, width: 150  },
            { targets: 6, width: 100  },
            { targets: 7, width: 80  }
          ],
      });
  }
  initDataTables();
  // ----- END DATATABLES -----

  // ----- TABLE CONTENT -----
  function tableContent() {
      // Reset the unique datas
      uniqueData = []; 
    //   const data = getTableData("hris_job_posting_tbl","*","", "");

      $.ajax({
          url:      `${base_url}operations/getTableData`,
          method:   'POST',
          async:    false,
          dataType: 'json',
          data:     {tableName: `hris_job_posting_tbl as jpt 
                    LEFT JOIN  pms_personnel_requisition_tbl AS ppr USING(requisitionID)
                    LEFT JOIN  hris_designation_tbl AS dsg ON dsg.designationID  = ppr.designationID 
                    LEFT JOIN  hris_department_tbl AS dept ON dept.departmentID  = ppr.departmentID`,
                    columnName:`jobID,
                    CONCAT('JPG-',SUBSTR(jpt.createdAt,3,2),"-",LPAD(jpt.jobID,5,0)) as jobCode,
                    requisitionCode,
                    designationName,
                    jobDescription,
                    personnelStatement,
              
                    CASE
                    WHEN personnelOption = '1' THEN 'Permanent'
                    WHEN personnelOption = '2' THEN 'Non-Permanent'
                    WHEN personnelOption = '3' THEN 'Other Justifications'
                    END as personnelOption,
              
                    departmentName,
                    personnelQualification,
                    jobBenefits,
                    jobSlot,
                    salaryPackage,
                    jobStatus,
                    jpt.createdAt` },
          beforeSend: function() {
              $("#table_content").html(preloader);
              // $("#inv_headerID").text("List of Inventory Item");
          },
          success: function(data) {
          
              let html = `
              <table class="table table-bordered table-striped table-hover" id="tableJobPosting">
                  <thead>
                  <tr>
                      <th>Job Code</th>
                      <th>Refrence No.</th>
                      <th>Job Title</th>
                      <th>Job Description</th>
                      <th>Job Type</th>
                      <th>Job Category</th>
                      <th>No. of Vacancy</th>
                      <th>Status</th>
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
                    if(item.jobStatus == 0){
                    var status=`<span class="badge badge-outline-success w-100">Open</span>`;
                    }   
                    if(item.jobStatus == 1){
                        var status=`<span class="badge badge-outline-danger w-100">Closed</span>`;
                    }
                    if(item.jobStatus == 2){
                        var status=`<span class="badge badge-outline-primary w-100">Drop</span>`;
                    }
                    if(item.jobStatus == 3){
                        var status=`<span class="badge badge-outline-warning w-100">Ongoing</span>`;
                    }
                    
                  html += `
                  <tr
                    class="btnEdit" 
                    id="${item.jobID}"
                    feedback="${item.jobTitle}">
                      <td>${item.jobCode}</td>
                      <td>${item.requisitionCode}</td>
                      <td>${item.designationName}</td>
                      <td style="white-space: normal;">${item.jobDescription}</td>
                      <td>${item.personnelOption}</td>
                      <td>${item.departmentName}</td>
                      <td class="text-center">${item.jobSlot}</td>
                      <td class="text-center">${status}</td>
                  </tr>`;
              })
              html += `</tbody>
              </table>`;

              setTimeout(() => {
                  $("#table_content").html(html);
                  initDataTables();
              }, 500);
          },
          error: function() {
              let html = `
                  <div class="w-100 h5 text-center text-danger>
                      There was an error fetching data.
                  </div>`;
              $("#table_content").html(html);
          }
      })
  }
  tableContent();
  // ----- END TABLE CONTENT -----

   // ----- MODAL CONTENT -----
   function modalContent(data = false) {
    let jobID               = data ? (data[0].jobID                     ? data[0].jobID                     : "") : "",
    requisitionCode              = data ? (data[0].requisitionCode                ? data[0].requisitionCode                : "") : "",
    designationName                = data ? (data[0].designationName                  ? data[0].designationName                  : "") : "",
    jobDescription          = data ? (data[0].jobDescription            ? data[0].jobDescription            : "") : "",
    personnelStatement     = data ? (data[0].personnelStatement       ? data[0].personnelStatement       : "") : "",
    personnelOption                 = data ? (data[0].personnelOption                   ? data[0].personnelOption                   : "") : "",
    departmentName             = data ? (data[0].departmentName               ? data[0].departmentName               : "") : "",
    personnelQualification = data ? (data[0].personnelQualification   ? data[0].personnelQualification   : "") : "",
    jobBenefits             = data ? (data[0].jobBenefits               ? data[0].jobBenefits               : "") : "",
    jobStatus               = data ? (data[0].jobStatus                 ? data[0].jobStatus                 : "") : "",
    jobSlot                 = data ? (data[0].jobSlot                   ? data[0].jobSlot                   : "") : "",
    salaryPackage             = data ? (data[0].salaryPackage               ? data[0].salaryPackage               : "") : "";
        
      let button = jobID &&  jobStatus!=2  ? `
      <button 
          class="btn btn-update " 
          id="btnUpdate" 
          rowID="${jobID}">
          <i class="fas fa-save"></i>
          Update
      </button>` : ``;

      let disabled = jobID &&  jobStatus!=2  ? `` : `disabled`;

      let html = `
      <div class="modal-body">

                  <div class="row">
                      <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12">
                          <div class="form-group">
                              <label>Reference No.</label>
                              <input 
                                  type="text" 
                                  class="form-control" 
                                  disabled
                                  value="${requisitionCode}">
                          </div>
                      </div>

                      <div class="col-xl-8 col-lg-8 col-md-6 col-sm-12">
                          <div class="form-group">
                              <label>Job Title</label>
                              <input 
                                type="text" 
                                class="form-control jobTitle" 
                                disabled
                                value="${designationName}">
                          </div>
                      </div>

                      <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                          <div class="form-group">
                              <label>Job Description <code>*</code></label>
                              <textarea 
                                  type="text" 
                                  class="form-control validate" 
                                  name="jobDescription" 
                                  id="input_jobDescription" 
                                  data-allowcharacters="[A-Z][a-z][0-9][ ][-][.][,][(][)]['][&]" 
                                  minlength="2" 
                                  maxlength="1735" 
                                  rows="8" 
                                  style="resize: none"
                                  required
                                  ${disabled}
                                  autocomplete="off">${jobDescription}</textarea>
                              <div class="invalid-feedback d-block" id="invalid-input_jobDescription"></div>
                          </div>
                      </div>
                      <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                          <div class="form-group">
                              <label>Brief Statement of Duties</label>
                              <textarea 
                                  type="text" 
                                  class="form-control" 
                                  rows="8"
                                  disabled
                                  style="resize: none"
                                  autocomplete="off">${personnelStatement}</textarea>
                          </div>
                      </div>
                       <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                          <div class="form-group">
                              <label>Qualifications Required</label>
                              <textarea 
                              type="text" 
                              class="form-control" 
                              rows="8"
                              disabled 
                              style="resize: none"
                              autocomplete="off">${personnelQualification}</textarea>
                          </div>
                      </div>
                      <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                        <div class="form-group">
                            <label>Benefits <code>*</code></label>
                            <textarea 
                            type="text" 
                            class="form-control validate" 
                            name="jobBenefits" 
                            id="input_jobBenefits" 
                            data-allowcharacters="[A-Z][a-z][0-9][ ][-][.][,][(][)][*][&]" 
                            minlength="2" 
                            maxlength="1735" 
                            rows="8"
                             required
                            style="resize: none"
                            ${disabled}
                            autocomplete="off">${jobBenefits}</textarea>
                            <div class="invalid-feedback d-block" id="invalid-input_jobBenefits"></div>
                        </div>
                    </div>  
                      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                          <div class="form-group">
                              <label>Job Type</label>
                              <input 
                              type="text" 
                              class="form-control" 
                              disabled
                              value="${personnelOption}">
                          </div>
                      </div>

                      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                          <div class="form-group">
                              <label>Job Category</label>
                              <input 
                              type="text" 
                              class="form-control" 
                              disabled
                              value="${departmentName}">
                          </div>
                      </div>
                     
                      <div class=" col-md-4  col-sm-12">
                          <div class="form-group">
                              <label>No. of Vacancies</label>
                              <input 
                                  type="number" 
                                  class="form-control" 
                                  value="${jobSlot}"
                                  disabled>
                          </div>
                      </div>     
                      <div class="col-md-4 col-sm-12">
                          <div class="form-group">
                              <label>Salary Package</label>
                              <div class="input-group w-100">
                                <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon1">₱</span>
                                </div>

                                <input 
                                    type="text" 
                                    class="form-control amount text-right" 
                                    placeholder="0.00"
                                    disabled 
                                    value="${salaryPackage}">

                              </div>
                          </div>
                      </div>

                      <div class="col-md-4 col-sm-12">
                            <div class="form-group">
                                <label>Status</label>
                                <select 
                                    class="form-control select2 validate" 
                                    autocomplete="off"
                                    style="width: 100%"
                                    disabled
                                    >
                                    <option 
                                        value="0" 
                                        ${data && jobStatus == "0" && "selected"} >Open</option>
                                    <option 
                                        value="1" 
                                        ${data && jobStatus == "1" && "selected"}>Closed</option>
                                    <option 
                                        value="2" 
                                        ${data && jobStatus == "2" && "selected"}>Drop</option>
                                     <option 
                                        value="2" 
                                        ${data && jobStatus == "3" && "selected"}>Ongoing</option>
                                </select>
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
//   $(document).on("click", "#btnAdd", function() {
//       $("#modalJobPostingHeader").text("ADD JOB VACANT");
//       $("#modalJobPosting").modal("show");
//       $("#modalJobPostingContent").html(preloader);
//       const content = modalContent();
//       $("#modalJobPostingContent").html(content);
//       initAll();
//   });
  // ----- END OPEN ADD MODAL -----


  // ----- SAVE MODAL -----
//   $(document).on("click", "#btnSave", function() {
//   const validate = validateForm("modalJobPosting");
//   if (validate) {

//     let data = getFormData("modalJobPosting", true);
//     data["tableData[jobCode]"] = generateCode("JPG", false, "hris_job_posting_tbl", "jobCode");
//     data["tableData[createdBy]"] = sessionID;
//     data["tableData[updatedBy]"] = sessionID;
//     data["tableName"]            = "hris_job_posting_tbl";
//     data["feedback"]             = $(".jobTitle").val();

//     sweetAlertConfirmation("add", "Vacant Position", "modalJobPosting", null, data, true, tableContent);
//       }
//   });
  // ----- END SAVE MODAL -----

  // ----- OPEN EDIT MODAL -----
  $(document).on("click", ".btnEdit", function() {
      const id       = $(this).attr("id");
      const feedback = $(this).attr("feedback");
      $("#modalJobPostingHeader").text("EDIT JOB VACANT");
      $("#modalJobPosting").modal("show");

      // Display preloader while waiting for the completion of getting the data
      $("#modalJobPostingContent").html(preloader); 

      const tableData = getTableData(`hris_job_posting_tbl 
      LEFT JOIN  pms_personnel_requisition_tbl AS ppr USING(requisitionID)
      LEFT JOIN  hris_designation_tbl AS dsg ON dsg.designationID  = ppr.designationID 
      LEFT JOIN  hris_department_tbl AS dept ON dept.departmentID  = ppr.departmentID `, `
      jobID,
      requisitionCode,
      designationName,
      jobDescription,
      personnelStatement,

      CASE
      WHEN personnelOption = 1 THEN "Permanent"
      WHEN personnelOption = 2 THEN "Non-Permanent"
      WHEN personnelOption = 3 THEN "Other Justifications"
      END as personnelOption,

      departmentName,
      personnelQualification,
      jobBenefits,
      jobSlot,
      salaryPackage,
      jobStatus



      `, "jobID="+id, "");
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
    let genCode         = getTableData("hris_job_posting_tbl","","jobID="+rowID);
    if (validate) {

        let data = getFormData("modalJobPosting", true);
			data["tableData[updatedBy]"] = sessionID;
			data["tableData[jobStatus]"] = 0;
			data["tableName"]            = "hris_job_posting_tbl";
			data["whereFilter"]          ="jobID="+rowID;
			data["feedback"]             = $(".jobTitle").val();

			sweetAlertConfirmation(
				"update",
				"Job Posting",
				"modalJobPosting",
				"",
				data,
				true,
				tableContent
			);
    }

    
      });
      // ----- END UPDATE MODAL -----

  // ------- CANCEl MODAL-------- 
  $(document).on("click", ".btnCancel", function () {
    let formEmpty = isFormEmpty("modalJobPosting");
    if (!formEmpty) {
        sweetAlertConfirmation(
            "cancel",
            "Job Posting",
            "modalJobPosting"
        );
    } else {
        $("#modalJobPosting").modal("hide");
    }
});

  // -------- END CANCEL MODAL-----------
    
});