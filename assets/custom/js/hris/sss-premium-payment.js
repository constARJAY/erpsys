$(document).ready(function(){
    // initDataTables();
    tableContent();
    
    $(document).on("change","#monthly_report", function(){
        let thisEvent   = $(this);
        let thisValue   = thisEvent.val();
        tableContent(thisValue);
    });

    $(document).on("click", "#printReport", function(){
        let thisEvent   = $(this);
        let period      = thisEvent.attr("period");
        if(period){
            $.ajax({
                method: "POST",
                url: `sss_premium_payment/printReport`,
                data: {period},
                success: function (data) {
                    let left = ($(window).width() / 2) - (900 / 2),
                        top  = ($(window).height() / 2) - (600 / 2),
                        mywindow = window.open("", "PRINT", "width=900, height=600, top=" + top + ", left=" + left);
                        mywindow.document.write(data);
    
                        mywindow.document.close();
                        mywindow.focus();
                }
            })
        }


    });
});



function initDataTables() {
    if ($.fn.DataTable.isDataTable('#this_report_table')){
        $('#this_report_table').DataTable().destroy();
    }
    
    var table = $("#this_report_table").css({"min-width": "100%"}).removeAttr('width').DataTable({
        proccessing:    false,
        serverSide:     false,
        scrollX:        true,
        scrollCollapse: true,
        lengthMenu: [ 50, 75, 100, 150],
        columnDefs: [
            { targets: 0, width:  120 },
            { targets: 1, width:  100 },
            { targets: 2, width:  100 },
            { targets: 3, width:  100 },
            { targets: 4, width:  120 },
            { targets: 5, width:  120 }

        ],
    });
}


function tableContent(period = false){
    $("#table_content").html(preloader); 
    let printBtn = `<button class="btn btn-info px-4 py-2" id="printReport" period="${period}">
                        <i class="fas fa-file-excel"></i>  Print
                    </button>`;
    let html = ``, tableRow = ``;
    let tableData = getReportData();
    let totalEmployee       = 0;
    let totalEmployer       = 0;
    let totalContribution   = 0;
    tableData.filter(value => value.month == period).map((value,index)=>{
        
        value["data"].map((dataValue, dataIndex)=>{
            let totalDeduction = dataValue["sssDeduction"] == "0.00" ? "0.00" : (parseFloat(dataValue["sssDeduction"]) + parseFloat(dataValue["sssEmployer"])); 
            totalEmployee       += parseFloat(dataValue["sssDeduction"] == "0.00" ? "0.00" : dataValue["sssDeduction"]);
            totalEmployer       += parseFloat(dataValue["sssDeduction"] == "0.00" ? "0.00" : dataValue["sssEmployer"]);
            totalContribution   += parseFloat(totalDeduction);

            tableRow += `   <tr>
                                <td>${parseFloat(dataIndex) + 1}</td>
                                <td>${dataValue["employeeLastname"]}, ${dataValue["employeeFirstname"]} ${dataValue["employeeMiddlename"]}</td>
                                <td>${dataValue["employeeSSS"]}</td>
                                <td style="text-align:right">${formatAmount(dataValue["sssDeduction"] == "0.00" ? "0.00" : dataValue["sssDeduction"], true)}</td>
                                <td style="text-align:right">${formatAmount(dataValue["sssDeduction"] == "0.00" ? "0.00" : dataValue["sssEmployer"], true)}</td>
                                <td style="text-align:right">${formatAmount(totalDeduction,true)}</td>
                            </tr>`;
        });
        
    });

    html += `<table class="table table-bordered table-striped table-hover" id="this_report_table">
                        <thead>
                            <tr class="text-left">
                                <th>No.</th>
                                <th>Name of Employee</th>
                                <th>SS Number</th>
                                <th>SS</th>
                                <th>EC</th>
                                <th>Total Contribution</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${!period ? "" : tableRow}


                            ${!period ? "" : 
                            `
                                <tr>
                                    <td colspan="3" class="text-left">Sub-total</td>
                                    <td style="text-align:right">${formatAmount(totalEmployee,true)}</td>
                                    <td style="text-align:right">${formatAmount(totalEmployer,true)}</td>
                                    <td style="text-align:right">${formatAmount(totalContribution,true)}</td>
                                </tr>
                                <tr>
                                    <td colspan="5"> Total Amount Due </td>
                                    <td style="text-align:right"> ${formatAmount(totalContribution,true)} </td>
                                </tr>
                            `}
                        </tbody>
             </table>           
            `;
    setTimeout(() => {
        if(period){
            $("#printDiv").html(printBtn);
        }
            $("#table_content").html(html); 
        initDataTables();
    }, 120);
}



function getReportData(){
    let returnData  = "";
    // let data        = {type:"sss"};
    $.ajax({
        url:      `${base_url}operations/premiumPaymentReport`,
        method:   'POST',
        async:    false,
        dataType: 'json',
        beforeSend: function() {
            $("#table_content").html(preloader);
        },

        success: function(data) {
          returnData = data;
        },

        error: function() {
            let html = `
                <div class="w-100 h5 text-center text-danger>
                    There was an error fetching data.
                </div>`;
            $("#table_content").html(html);
        }
    });


    return returnData;
}