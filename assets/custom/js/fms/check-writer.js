$(document).ready(function(){

    //------ MODULE FUNCTION IS ALLOWED UPDATE-----
	
	const allowedUpdate = isUpdateAllowed(5);
	if(!allowedUpdate){
		$("#modal_inventory_category_content").find("input, select, textarea").each(function(){
			$(this).attr("disabled",true);
		});
		$("#btnUpdate").hide();
	}

	//------ END MODULE FUNCTION IS ALLOWED UPDATE-----

    // ----- DATATABLES -----
    function initDataTables() {
        if ($.fn.DataTable.isDataTable('#tableInventoryCategory')){
            $('#tableInventoryCategory').DataTable().destroy();
        }
        
        var table = $("#tableInventoryCategory").css({"min-width": "100%"}).removeAttr('width').DataTable({
            proccessing:    false,
            serverSide:     false,
            scrollX:        true,
            scrollCollapse: true,
            columnDefs: [
                { targets: 0, width: 50 },
                { targets: 1, width: 150 },
                { targets: 2, width: 150 },
                { targets: 3, width: 150 },
                { targets: 4, width: 150 },
                { targets: 5, width: 100 },
                { targets: 6, width: 100 },
                { targets: 7, width: 50 },
            ],
        });
    }
    initDataTables();
    // ----- END DATATABLES -----


    // ----- TABLE CONTENT -----
    function tableContent() {
        // Reset the unique datas
        uniqueData = []; 

        $.ajax({
            url:      `${base_url}operations/getTableData`,
            method:   'POST',
            async:    false,
            dataType: 'json',
            data:     {tableName: `fms_check_voucher_tbl AS fcv 
                                    INNER JOIN fms_payment_request_tbl AS fpr ON fpr.paymentID = fcv.paymentID
                                    INNER JOIN fms_petty_cash_replenishment_tbl AS fpc ON fpc.pettyRepID  = fpr.pettyRepID
                                    INNER JOIN fms_chart_of_accounts_tbl AS fco ON fco.chartOfAccountID  = fcv.voucherBudgetSource
                                    INNER JOIN hris_employee_list_tbl AS emp ON emp.employeeID = fpc.requestorID `,
                       columnName:`CONCAT('CV-',SUBSTR(fcv.createdAt,3,2),'-',LPAD(fcv.voucherID, 5, '0')) as checkvoucherCode,
                                   CONCAT(emp.employeeFirstname, ' ', emp.employeeLastname) AS fullname,
                                    fco.accountName,
                                    CONCAT('PYRF-',SUBSTR(fpr.createdAt,3,2),'-',LPAD(fpr.paymentID, 5, '0')) as paymentCode,
                                    fcv.checkNo,
                                    fcv.voucherAmount`,
                        searchFilter: "voucherStatus='2'"},

            beforeSend: function() {
                $("#table_content").html(preloader);
            },
            success: function(data) {
                console.log(data);
                let html = `
                <table class="table table-bordered table-striped table-hover nowrap" id="tableInventoryCategory">
                    <thead>
                    <tr>
                        <th>No.</th>
                        <th>Check No.</th>
                        <th>Amount</th>
                        <th>Requestor</th>
                        <th>Budget Source</th>
                        <th>Payment No.</th>
                        <th>Check Voucher No.</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>`;
                var counter =1;
                data.map((check, index, array) => {

                    html += `
                    <tr>
                        <td>${counter++}</td>
                        <td>${check.checkNo}</td>
                        <td class="text-right">${formatAmount(check.voucherAmount,true)}</td>
                        <td class="text-center">${check.fullname}</td>
                        <td class="text-center">${check.accountName}</td>
                        <td class="text-center">${check.paymentCode}</td>
                        <td class="text-center">${check.checkvoucherCode}</td>
                        <td class="text-center"><button class="btn btn-secondary btnPrint px-5 p-2" 
                        amount = "${check.voucherAmount}"
                        requestor = "${check.fullname}">
                        <i class="fas fa-print"></i>
                        Print
                        </button></td>
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
    
    $(document).on("click",".btnPrint",function(){
       
        get_location = $(this).parents('tr');
        // var checkAmount = 9999999999;
        var checkAmount = $(this).attr("amount");
        // var checkName  = "Wilson D. Parajas";
        var checkName  = $(this).attr("requestor");
        var checkAmountConvert =$(this).attr("amount");
        // var checkAmountConvert =9999999999;
    
        var today =  moment().format('MMMM DD, YYYY');
    
       
    
        $.ajax({
              url       : `Check_writer/convertnumberintowords`,
              method    : "POST",
              data      : {checkAmountConvert:  checkAmountConvert},
              async     : true,
              dataType  : 'json',
              success   : function(data){
               
                document.getElementById("today").innerHTML = today;
                document.getElementById("cheque_name").innerHTML = checkName;
                document.getElementById("cheque_amount").innerHTML = formatAmount(checkAmount);
                $("#word").text(titleCase(data));
                
    
                var divContents = document.getElementById("cheque").innerHTML; 
                var a = window.open('url', 'print', 'height=900, width=900','screenX=1500');  
                a.document.write(divContents); 
                a.print();
               
              }
        });
        
      });
});