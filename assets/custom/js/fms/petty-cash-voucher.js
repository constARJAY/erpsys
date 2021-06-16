$(document).ready(function() {
    const totalBudget = 10000.00;
    const allEmployeeData = getAllEmployeeData();
    
	const employeeData = (id) => {
		if (id) {
			let data = allEmployeeData.filter(employee => employee.employeeID == id);
			let { employeeID, fullname, designation, department } = data && data[0];
			return { employeeID, fullname, designation, department };
		}
		return {};
	}
    const pettyCashRequestData = getTableData(`fms_petty_cash_request_tbl AS fpcrt`,
                                                `fpcrt.*`,
                                                `pettyCashRequestStatus = 2 `);
    // ----- DATATABLES -----
	function initDataTables() {
		if ($.fn.DataTable.isDataTable("#tableMyForms")) {
			$("#tableMyForms").DataTable().destroy();
		}

		var table = $("#tableMyForms")
			.css({ "min-width": "100%" })
			.removeAttr("width")
			.DataTable({
				proccessing: false,
				serverSide: false,
				scrollX: true,
				sorting: [],
				scrollCollapse: true,
				columnDefs: [
					{ targets: 0,  width: 100 },
					{ targets: 1,  width: 150 },
					{ targets: 2,  width: 100 },
					{ targets: 3,  width: 100 },	
					{ targets: 4,  width: 150 },
					{ targets: 5,  width: 150 },
					{ targets: 6,  width: 150 },
					{ targets: 7,  width: 150 }
				],
			});
	}
	// ----- END DATATABLES -----

    // ----- MY FORMS CONTENT -----
	function myFormsContent() {
		$("#tableMyFormsParent").html(preloader);
        // (SELECT SUM(amount) FROM fms_petty_cash_request_details_tbl WHERE pettyCashRequestID = 'fpcrt.pettyCashRequestID') AS `
		
		let html = `
        <table class="table table-bordered table-striped table-hover" id="tableMyForms">
            <thead>
                <tr style="white-space: nowrap">
					<th>Document No.</th>
					<th>Requestor Name</th>
					<th>Position</th>
					<th>Department</th>
					<th>Date Created</th>
					<th>Requested Total</th>
					<th>Total</th>
					<th>Balance</th>
                </tr>
            </thead>
            <tbody>`;
        let overAllTotal = 0, overAllBalance = 0;
        pettyCashRequestData.map((item) => {
			let {
				pettyCashRequestID,
                createdBy,
                createdAt,
                updatedAt,
                pettyCashRequestAmount,
			} = item;
             // ----- GET EMPLOYEE DATA -----
                let {
                    fullname:    employeeFullname    = "",
                    department:  employeeDepartment  = "",
                    designation: employeeDesignation = "",
                } = employeeData(createdBy);
            // ----- END GET EMPLOYEE DATA -----
            var tempBalance = parseFloat(totalBudget) - parseFloat(pettyCashRequestAmount);
            var tempTotal   = parseFloat(totalBudget) - parseFloat(tempBalance);
            overAllTotal += tempTotal, 
            overAllBalance = parseFloat(totalBudget) - parseFloat(overAllTotal);
			html += `
			<tr class="btn-view" id="${encryptString(pettyCashRequestID)}">
				<td>${getFormCode("PCV", createdAt, pettyCashRequestID )}</td>
				<td>${employeeFullname}</td>
                <td>${employeeDesignation}</td>
                <td>${employeeDepartment}</td>
                <td>${moment(updatedAt).format("MMMM DD,YYYY")}</td>
                <td class="text-right">${formatAmount(pettyCashRequestAmount, true)}</td>
                <td class="text-right">${formatAmount(overAllTotal, true)}</td>
                <td class="text-right">${formatAmount(overAllBalance, true)}</td>
			</tr>`;
            
		});
		html += `
            </tbody>
        </table>`;

		return html;
	}
	// ----- END MY FORMS CONTENT -----

    // ----- PAGE CONTENT -----
    
	function pageContent() {
		$("#page_content").html(preloader);

			let html = `
            <div class="tab-content">
                <div role="tabpanel" class="tab-pane active" id="myFormsTab" aria-expanded="false">
                    <div class="table-responsive" id="tableMyFormsParent">
                        ${myFormsContent()}
                    </div>
                </div>
            </div>`;

        setTimeout(() => {
            $("#page_content").html(html);
            initDataTables();
            return html;
        }, 300);
	}
    

    pageContent();

    $(document).on("click",".btn-view", function(){
        $("#modal_petty_cash_request_content").html(preloader);
        $("#modal_petty_cash_request").modal("show");
        let pettyCashRequestID = decryptString($(this).attr("id"));
        let data = pettyCashRequestData.filter(items => items.pettyCashRequestID == pettyCashRequestID).map(items => {return items});
        let {
            createdBy ,
            createdAt
        } = data[0];
        // ----- GET EMPLOYEE DATA -----
        let {
            fullname:    employeeFullname    = "",
            department:  employeeDepartment  = "",
            designation: employeeDesignation = "",
        } = employeeData(createdBy);
        // ----- END GET EMPLOYEE DATA -----
        
        let voucherData        = getTableData(`fms_petty_cash_request_details_tbl`, ``, `pettyCashRequestID = ${pettyCashRequestID}`);
        let voucherDescription = ``, voucherAmount =``, voucherTotalAmount = 0, voucherDataLength = voucherData.length; 
        voucherData.map((items, index) => {
            var breakLine = voucherDataLength != index ? `<br>`:``;
            voucherDescription += `<span>${items.pettyCashRequestDetailsDescription}</span>${breakLine}`;
            voucherAmount      += `<span>${formatAmount(items.amount, true)}</span>${breakLine}`;
            voucherTotalAmount += parseFloat(items.amount)
        });

        let html =  `
                        <table class="table table-bordered custom-table" style="border: 4px solid black">
                            <thead>
                                <tr>
                                    <th style="width:200px;background:black">
                                        <div class="w-100">
                                            <img src='${base_url}assets/images/BC-WHITE.png' height="40"> 
                                        </div>
                                    </th>
                                    <th class="text-center"><h3 class="font-weight-bold">PETTY CASH VOUCHER</h3></th>
                                    <th class="text-center"><h3 class="font-weight-bold text-danger">${getFormCode("PCV", createdAt, pettyCashRequestID )}</h3></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colspan="2"><strong>Requestor:</strong> ${employeeFullname}</td>
                                    <td><strong>Date:</strong> ${moment().format("MMMM DD,YYYY")}</td>
                                </tr>
                                <tr>
                                    <td colspan="3"><strong>Position and Department:</strong> ${employeeDesignation} ${employeeDepartment}</td>
                                </tr>
                                <tr>
                                    <td colspan="2" class="text-center"><strong>Description</strong></td>
                                    <td class="text-center"><strong>Amount<strong></td>
                                </tr>
                                
                                <tr>
                                    <td colspan="2">${voucherDescription}</td>

                                    <td class="text-right">${voucherAmount}</td>   
                                </tr>

                                <tr>
                                    <td colspan="2" class="text-right"><strong>Total Amount Requested:</strong></td>
                                    <td class="text-right">${formatAmount(voucherTotalAmount, true)}</td>
                                </tr>
                                <tr>
                                    <td colspan="3">
                                        <div class="d-flex justify-content-between align-items-center">
                                                <div class="w-25 text-center" style="font-size: 90%;">
                                                    <strong class="text-center font-weight-bold">Requested By</strong>
                                                    <div class="w-100 text-center" style="border-bottom: 2px solid black">
                                                        ${employeeFullname}
                                                    </div>
                                                    <strong>Printed Name and Signature</strong>
                                                </div>
                                                <div class="w-25 text-center" style="font-size: 90%;">
                                                    <strong class="text-center font-weight-bold">Approved By</strong>
                                                    <div class="w-100 text-center" style="border-bottom: 2px solid black">
                                                        <br>
                                                    </div>
                                                    <strong>Immediate Head</strong>
                                                </div>
                                        </div>
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                        <div class="modal-footer">
                                <button 
                                    class="btn btn-info px-5 p-2" id="download_excel" pettyCashRequestID="${encryptString(pettyCashRequestID)}">
                                    <i class="fas fa-file-excel"></i>
                                    Excel
                                </button>
                                <button class="btn btn-cancel px-5 p-2 btnCancel" data-dismiss="modal"> <i class="fas fa-ban"></i> Cancel</button>
                        </div>
                    `;

        $("#modal_petty_cash_request_content").html(html);
    });



    $(document).on("click", "#download_excel", function(){
        const pettyCashRequestID = decryptString($(this).attr("pettyCashRequestID"));
		const url = `${base_url}fms/petty_cash_voucher/downloadExcel?id=${pettyCashRequestID}`;
		window.location.replace(url); 
    });
})


// --------------- END DATABASE RELATION ---------------

