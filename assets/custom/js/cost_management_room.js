$(document).ready(function() {

    // ----- AMENITIES TABLE -----
    function getTotalExpense() {
        const tableName = "room_list_tbl";
        const tablePK = $("#roomno").attr("roomid");
        $.ajax({
            method: "POST",
            url: "../cost_management/getTotalExpense",
            data: {tableName, tablePK},
            dataType: "json",
            success: function(data) {
                const expense        = data["totalExpense"] ? data["totalExpense"] : 0;
                const mondayPrice    = +$("#mondayPrice").val();
                const tuesdayPrice   = +$("#tuesdayPrice").val();
                const wednesdayPrice = +$("#wednesdayPrice").val();
                const thursdayPrice  = +$("#thursdayPrice").val();
                const fridayPrice    = +$("#fridayPrice").val();
                const saturdayPrice  = +$("#saturdayPrice").val();
                const sundayPrice    = +$("#sundayPrice").val();

                let html = `
                <div class="col-md-3 col-sm-12 my-2 mb-5">
                    <h5 class="font-weight-bold">Monday</h5>
                    <div class="d-flex justify-content-between align-items-end">
                        <span class="font-weight-bold text-left">Price:</span> 
                        <span class="text-right">${formatCurrency(mondayPrice)}</span>
                    </div>
                    <div class="d-flex justify-content-between align-items-end pb-2">
                        <span class="font-weight-bold text-left">Total Expense:</span> 
                        <span class="text-right">${formatCurrency(expense)}</span>
                    </div>
                    <div class="d-flex justify-content-between align-items-end border-top pt-2">
                        <span class="font-weight-bold text-left">Total Profit:</span> 
                        <span class="text-right">
                        <span class="text-right">${formatCurrency((expense - mondayPrice))}</span>
                    </div>
                </div>
                <div class="col-md-3 col-sm-12 my-2 mb-5">
                    <h5 class="font-weight-bold">Tuesday</h5>
                    <div class="d-flex justify-content-between align-items-end">
                        <span class="font-weight-bold text-left">Price:</span> 
                        <span class="text-right">${formatCurrency(tuesdayPrice)}</span>
                    </div>
                    <div class="d-flex justify-content-between align-items-end pb-2">
                        <span class="font-weight-bold text-left">Total Expense:</span> 
                        <span class="text-right">${formatCurrency(expense)}</span>
                    </div>
                    <div class="d-flex justify-content-between align-items-end border-top pt-2">
                        <span class="font-weight-bold text-left">Total Profit:</span> 
                        <span class="text-right">
                        <span class="text-right">${formatCurrency((tuesdayPrice-expense))}</span>
                    </div>
                </div>
                <div class="col-md-3 col-sm-12 my-2 mb-5">
                    <h5 class="font-weight-bold">Wednesday</h5>
                    <div class="d-flex justify-content-between align-items-end">
                        <span class="font-weight-bold text-left">Price:</span> 
                        <span class="text-right">${formatCurrency(wednesdayPrice)}</span>
                    </div>
                    <div class="d-flex justify-content-between align-items-end pb-2">
                        <span class="font-weight-bold text-left">Total Expense:</span> 
                        <span class="text-right">${formatCurrency(expense)}</span>
                    </div>
                    <div class="d-flex justify-content-between align-items-end border-top pt-2">
                        <span class="font-weight-bold text-left">Total Profit:</span> 
                        <span class="text-right">
                        <span class="text-right">${formatCurrency((wednesdayPrice-expense))}</span>
                    </div>
                </div>
                <div class="col-md-3 col-sm-12 my-2 mb-5">
                    <h5 class="font-weight-bold">Thursday</h5>
                    <div class="d-flex justify-content-between align-items-end">
                        <span class="font-weight-bold text-left">Price:</span> 
                        <span class="text-right">${formatCurrency(thursdayPrice)}</span>
                    </div>
                    <div class="d-flex justify-content-between align-items-end pb-2">
                        <span class="font-weight-bold text-left">Total Expense:</span> 
                        <span class="text-right">${formatCurrency(expense)}</span>
                    </div>
                    <div class="d-flex justify-content-between align-items-end border-top pt-2">
                        <span class="font-weight-bold text-left">Total Profit:</span> 
                        <span class="text-right">
                        <span class="text-right">${formatCurrency((thursdayPrice-expense))}</span>
                    </div>
                </div>
                <div class="col-md-3 col-sm-12 my-2 mb-5">
                    <h5 class="font-weight-bold">Friday</h5>
                    <div class="d-flex justify-content-between align-items-end">
                        <span class="font-weight-bold text-left">Price:</span> 
                        <span class="text-right">${formatCurrency(fridayPrice)}</span>
                    </div>
                    <div class="d-flex justify-content-between align-items-end pb-2">
                        <span class="font-weight-bold text-left">Total Expense:</span> 
                        <span class="text-right">${formatCurrency(expense)}</span>
                    </div>
                    <div class="d-flex justify-content-between align-items-end border-top pt-2">
                        <span class="font-weight-bold text-left">Total Profit:</span> 
                        <span class="text-right">
                        <span class="text-right">${formatCurrency((fridayPrice-expense))}</span>
                    </div>
                </div>
                <div class="col-md-3 col-sm-12 my-2 mb-5">
                    <h5 class="font-weight-bold">Saturday</h5>
                    <div class="d-flex justify-content-between align-items-end">
                        <span class="font-weight-bold text-left">Price:</span> 
                        <span class="text-right">${formatCurrency(saturdayPrice)}</span>
                    </div>
                    <div class="d-flex justify-content-between align-items-end pb-2">
                        <span class="font-weight-bold text-left">Total Expense:</span> 
                        <span class="text-right">${formatCurrency(expense)}</span>
                    </div>
                    <div class="d-flex justify-content-between align-items-end border-top pt-2">
                        <span class="font-weight-bold text-left">Total Profit:</span> 
                        <span class="text-right">
                        <span class="text-right">${formatCurrency((saturdayPrice-expense))}</span>
                    </div>
                </div>
                <div class="col-md-3 col-sm-12 my-2 mb-5">
                    <h5 class="font-weight-bold">Sunday</h5>
                    <div class="d-flex justify-content-between align-items-end">
                        <span class="font-weight-bold text-left">Price:</span> 
                        <span class="text-right">${formatCurrency(sundayPrice)}</span>
                    </div>
                    <div class="d-flex justify-content-between align-items-end pb-2">
                        <span class="font-weight-bold text-left">Total Expense:</span> 
                        <span class="text-right">${formatCurrency(expense)}</span>
                    </div>
                    <div class="d-flex justify-content-between align-items-end border-top pt-2">
                        <span class="font-weight-bold text-left">Total Profit:</span> 
                        <span class="text-right">
                        <span class="text-right">${formatCurrency((sundayPrice-expense))}</span>
                    </div>
                </div>`;

                
                $("#cost_summary").html(html);
            }
        })
    }

    getCostManagement();
    function getCostManagement() {
        // ---- GETTING AMENITIES DATA -----
        const getCostManagementData = function() {
            const tableName = "room_list_tbl";
            const tablePK = $("#roomno").attr("roomid");
            let costManagementData = [];
            $.ajax({
                method:   "get",
                url:      "../cost_management/getCostManagementData",
                async:    false,
                data:     {tableName, tablePK},
                dataType: "json",
                success: function(data) {
                    data.map(item => {
                        costManagementData.push(item);
                    })
                }
            })
            return costManagementData;
        }();
        // ---- END GETTING AMENITIES DATA -----
        
        let html = `
        <table class="table table-hover table-striped table-bordered" id="costManagementTable">
            <thead>
                <tr>
                    <th>No.</th>
                    <th>Expense Code</th>
                    <th>Expense Name</th>
                    <th>Expense Description</th>
                    <th>UOM</th>
                    <th>Rate</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>`;

        getCostManagementData.map((item, index) => {
            let status = item.expenseStatus == '1' ? `<span class="badge badge-success w-100 p-2">Active</span>` : `<span class="badge badge-danger w-100 p-2">Inactive</span>`;
            let attr = item.type == "preferences" ? "disabled" : "";
            let button = `
            <button
                class="btn_edit btn btn-primary w-100 p-1"
                cm_id              = "${item.cost_managementID}"
                expensecode        = "${item.expenseCode}"
                expensename        = "${item.expenseName}"
                expensedescription = "${item.expenseDescription}"
                expenseuom         = "${item.expenseUoM}"
                expenserate        = "${item.expenseRate}"
                expensestatus      = "${item.expenseStatus}" ${attr}>Edit</button>`

            html += `
            <tr>
                <td>${++index}</td>
                <td>${item.expenseCode}</td>
                <td>${item.expenseName}</td>
                <td>${item.expenseDescription ? item.expenseDescription : "-"}</td>
                <td>${item.expenseUoM ? item.expenseUoM : "-"}</td>
                <td class="text-right">${formatCurrency(item.expenseRate)}</td>
                <td>${status}</td>
                <td>${button}</td>
            </tr>`;
        })

        html += `</tbody>
        </table>`;

        $("#costManagementTable_parent").html(html);
        $("#costManagementTable").DataTable();

        // ---- GETTING CODES -----
        const getExpenseTableCodes = function() {
            const tableName = "room_list_tbl";
            let expendeCodes = ``;
            $.ajax({
                method:   "post",
                url:      "../cost_management/getExpenseTableCodes",
                async:    false,
                data:     {tableName},
                dataType: "json",
                success: function(data) {
                    data.map(item => {
                        expendeCodes += `<option>${item.expenseCode}</option>`;
                    })
                }
            })
            return expendeCodes;
        }();
        // ---- END GETTING CODES -----
        $("datalist#expenseCodeList").html(getExpenseTableCodes);
    }
    // ----- END AMENITIES TABLE -----


    // ---- CHECK INPUTS -----
    function checkInputs(todo) {
        const arrayElem = [
            "#"+todo+"_expenseCode",
            "#"+todo+"_expenseName",
            "#"+todo+"_expenseDescription",
            "#"+todo+"_expenseUoM",
            "#"+todo+"_expenseRate"
        ];

        arrayElem.map(item => {
            rjValidateInputs(item);
        })

        if ($("#"+todo+"Expense_modal").find(".is-invalid").length > 0) {
            $("#"+todo+"Expense_modal").find(".is-invalid")[0].focus();
            return false;
        } else {
            return true;
        }
    }
    // ---- END CHECK INPUTS -----


    // ----- RESET FORM -----
    function resetForm() {
        const todos = ["add", "edit"];

        for(var i=0; i<todos.length; i++) {
            const arrayElem = [
                todos[i]+"_expenseCode",
                todos[i]+"_expenseName",
                todos[i]+"_expenseDescription",
                todos[i]+"_expenseUoM",
                todos[i]+"_expenseRate"
            ];

            arrayElem.map(item => {
                $("#"+item).removeClass("is-invalid").removeClass("is-valid");
                $("#"+item).val("");
                $("#invalid-"+item).html("");
            })
        }
    }
    // ----- END RESET FORM -----


    // ----- HIDE MODALS -----
    function hideModal() {
        $("#addExpense_modal").modal("hide");
        $("#confirmation-addExpense_modal").modal("hide");
        $("#editExpense_modal").modal("hide");
        $("#confirmation-editExpense_modal").modal("hide");
        resetForm();
    }
    // ----- END HIDE MODALS -----


    // ---- CLOSE ADD/EDIT FORM -----
    $(document).on("click", ".btn_close_add_expense, .btn_close_edit_expense", function() {
        resetForm();
    })
    // ---- END CLOSE ADD/EDIT FORM -----


    // ----- GET EXPENSE DATA -----
    function getExpenseData(todo) {
        const expenseCode        = $("#"+todo+"_expenseCode").val();
        const expenseName        = $("#"+todo+"_expenseName").val();
        const expenseDescription = $("#"+todo+"_expenseDescription").val();
        const expenseUoM         = $("#"+todo+"_expenseUoM").val();
        const expenseRate        = $("#"+todo+"_expenseRate").val().split(",").join("");
        const expenseStatus      = $("#"+todo+"_expenseStatus").prop("checked") ? 1 : 0;
        return {
            expenseCode, expenseName, expenseDescription, expenseUoM, expenseRate, expenseStatus
        }
    }
    // ----- END GET EXPENSE DATA -----


    // ---- SAVE ADD/EDIT EXPENSE -----
    function saveExpenseData(data) {
        $.ajax({
            method: "POST",
            url: "../cost_management/saveExpenseData",
            data,
            dataType: "json",
            beforeSend: function() {
                $("#loader").show();
            },
            success: function(data) {
                let result = data.split("|");
                if (result[0] == "true") {
                    hideModal();
                    getCostManagement();
                    getTotalExpense();
                    showNotification("success", result[1]);
                } else {
                    showNotification("danger", result[1]);
                }
            }
        }).done(function() {
            setTimeout(() => {
                $("#loader").hide();
            }, 500);
        })
    }

    $(document).on("click", "#btn_save_confirmation_add", function() {
        let data = getExpenseData("add");
            data.tableName = "room_list_tbl";
            data.tablePK   = $("#roomno").attr("roomid");
        saveExpenseData(data);
    })

    $(document).on("click", ".btn_close_confirmation_add", function() {
        $("#confirmation-addExpense_modal").modal("hide");
        $("#addExpense_modal").modal("show");
    })

    $(document).on("click", "#save", function() {
        const myInputs = checkInputs("add");
        if (myInputs) {
            $("#addExpense_modal").modal("hide");
            $("#confirmation-addExpense_modal").modal("show");
        }
    })

    $(document).on("click", "#btn_save_confirmation_edit", function() {
        let data = getExpenseData("edit");
            data.tableName = "room_list_tbl";
            data.tablePK   = $("#roomno").attr("roomid");
            data.cost_managementID = $(this).attr("cm_id");
        saveExpenseData(data);
    })

    $(document).on("click", ".btn_close_confirmation_edit", function() {
        $("#confirmation-editExpense_modal").modal("hide");
        $("#editExpense_modal").modal("show");
    })

    $(document).on("click", "#update", function() {
        const myInputs = checkInputs("edit");
        if (myInputs) {
            $("#editExpense_modal").modal("hide");
            $("#confirmation-editExpense_modal").modal("show");
        }
    })

    
    $(document).on("click", ".btn_edit", function() {
        $("#editExpense_modal").modal("show");
        const cm_id              = $(this).attr("cm_id");
        const expenseCode        = $(this).attr("expensecode");
        const expenseName        = $(this).attr("expensename");
        const expenseDescription = $(this).attr("expensedescription") == "null" ? "" : $(this).attr("expensedescription");
        const expenseUoM         = $(this).attr("expenseuom");
        const expenseRate        = $(this).attr("expenserate");
        const expenseStatus      = $(this).attr("expensestatus") == "1" ? true : false;

        $("#edit_expenseCode").val(expenseCode);
        $("#edit_expenseName").val(expenseName);
        $("#edit_expenseDescription").val(expenseDescription);
        $("#edit_expenseUoM").val(expenseUoM);
        $("#edit_expenseRate").val(expenseRate);
        $("#edit_expenseStatus").prop("checked", expenseStatus);


        $("#btn_save_confirmation_edit").attr("cm_id", cm_id);
    })
    // ---- END SAVE ADD/EDIT EXPENSE -----


    // ----- CHANGING CODE -----
    function getCostManagementByCode(code, todo) {
        $.ajax({
            method:   "post",
            url:      "../cost_management/getCostManagementByCode",
            async:    false,
            data:     {expenseCode: code, tableName: "room_list_tbl"},
            dataType: "json",
            success: function(data) {
                data.map(item => {
                    $("#"+todo+"_expenseName").val(item.expenseName);
                    $("#"+todo+"_expenseDescription").val(item.expenseDescription);
                    $("#"+todo+"_expenseUoM").val(item.expenseUoM);
                    $("#"+todo+"_expenseRate").val(item.expenseRate);
                })
            }
        })
    }

    $(document).on("change", ".code", function() {
        const code = $(this).val();
        const todo = $(this).attr("todo");
        getCostManagementByCode(code, todo);
    })
    // ----- END CHANGING CODE -----


})