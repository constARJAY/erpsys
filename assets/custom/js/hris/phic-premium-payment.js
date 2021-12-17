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
                url: `phic_premium_payment/printReport`,
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
            { targets: 4, width:  100 },
            { targets: 5, width:  120 },
            { targets: 6, width:  120 },
            { targets: 7, width:  120 },

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
            let totalDeduction = dataValue["phicDeduction"] == "0.00" ? "0.00" : (parseFloat(dataValue["phicDeduction"]) + parseFloat(dataValue["phicEmployer"])); 
            totalEmployee       += parseFloat(dataValue["phicDeduction"] == "0.00" ? "0.00" : dataValue["phicDeduction"]);
            totalEmployer       += parseFloat(dataValue["phicDeduction"] == "0.00" ? "0.00" : dataValue["phicEmployer"]);
            totalContribution   += parseFloat(totalDeduction);

            tableRow += `   <tr>
                                <td>${parseFloat(dataIndex) + 1}</td>
                                <td>${dataValue["employeePhilHealth"]}</td>
                                <td>${dataValue["employeeLastname"]}</td>
                                <td>${dataValue["employeeFirstname"]}</td>
                                <td>${dataValue["employeeMiddlename"]}</td>
                                <td style="text-align:right">${formatAmount(dataValue["phicDeduction"] == "0.00" ? "0.00" : dataValue["phicDeduction"], true)}</td>
                                <td style="text-align:right">${formatAmount(dataValue["phicDeduction"] == "0.00" ? "0.00" : dataValue["phicEmployer"], true)}</td>
                                <td style="text-align:right"> </td>
                            </tr>`;
        });
        
    });

    html += `<table class="table table-bordered table-striped table-hover" id="this_report_table">
                        <thead>
                            <tr class="text-left">
                                <th>No.</th>
                                <th>PhilHealth No.</th>
                                <th>Surname</th>
                                <th>Given Name</th>
                                <th>Middle Name</th>
                                <th>PS</th>
                                <th>ES</th>
                                <th>Status/Remarks</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${!period ? "" : tableRow}


                            ${!period ? "" : 
                            `
                                <tr>
                                    <td colspan="5" class="text-left">Sub-total</td>
                                    <td style="text-align:right">${formatAmount(totalEmployee,true)}</td>
                                    <td style="text-align:right">${formatAmount(totalEmployer,true)}</td>
                                    <td style="text-align:right"> </td>
                                </tr>
                                <tr>
                                    <td colspan="5" class="text-left">GRAND TOTAL</td>
                                    <td colspan="2" style="text-align:right">${formatAmount(totalContribution,true)}</td>
                                    <td style="text-align:right"> </td>
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
    // let data        = {type:"phic"};
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