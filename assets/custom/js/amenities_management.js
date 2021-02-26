$(document).ready(function () {

    $(".duration").inputmask("99\\h:99\\m", {
        placeholder: "00  00", 
    });

    $(".select2").select2({
        theme: "bootstrap"
    });

    function getClientTimeout(availability, duration, element) {
        setInterval(() => {
            let durationTime  = moment(duration);
            let currentTime   = moment();
            let remainingTime = moment.duration(durationTime.diff(currentTime));
            let remainingHours = 
                remainingTime.hours() >= 10 ? remainingTime.hours() : `0${remainingTime.hours()}`;
            let remainingMinutes = 
                remainingTime.minutes() >= 10 ? remainingTime.minutes() : `0${remainingTime.minutes()}`;
            let remainingSeconds = 
                remainingTime.seconds() >= 10 ? remainingTime.seconds() : `0${remainingTime.seconds()}`;
    
            let output;
            if (durationTime > currentTime) {
                output = 
                remainingHours != "00" ? 
                    `${remainingHours}h:${remainingMinutes}m:${remainingSeconds}s` :
                    (remainingMinutes != "00" ? `${remainingMinutes}m:${remainingSeconds}s` : 
                    `${remainingSeconds}s`);
                    // console.log(remainingSeconds);
            } else {
                remainingHours   = remainingHours.split("-");
                remainingHours   = remainingHours[1] >= 10 ? remainingHours[1] : `0${remainingHours[1]}`;
                remainingMinutes = remainingMinutes.split("-");
                remainingMinutes = remainingMinutes[1] >= 10 ? remainingMinutes[1] : `0${remainingMinutes[1]}`;
                remainingSeconds = remainingSeconds.split("-");
                remainingSeconds = remainingSeconds[1] >= 10 ? remainingSeconds[1] : `0${remainingSeconds[1]}`;

                output = 
                (remainingHours != "0undefined" && remainingHours != "00" && remainingMinutes != "00" && remainingMinutes != "0undefined" && remainingSeconds != "00" && remainingSeconds != "0undefined") ? 
                    `${remainingHours}h:${remainingMinutes}m:${remainingSeconds}s` :
                    ((remainingMinutes != "0undefined" && remainingMinutes != "00" && remainingSeconds != "00" && remainingSeconds != "0undefined") ? `${remainingMinutes}m:${remainingSeconds}s` : 
                    ((remainingSeconds != "00" && remainingSeconds != "0undefined") ? 
                    `${remainingSeconds}s` : "-"));

                    output != "-" && $("#"+element).addClass("text-danger");
            }
    
            availability == 0 ? $("#"+element).addClass("text-center").html(output) : $("#"+element).addClass("text-center").html("-");
        }, 1000);
    }

    function DataTablesAmenities() {
        if ($.fn.DataTable.isDataTable('#amenitiesManagementTable')){
            $('#amenitiesManagementTable').DataTable().destroy();
        }

        $("#amenitiesManagementTable").css({"min-width": "100%"}).removeAttr('width').DataTable({
            scrollX:        true,
            scrollCollapse: true,
            columnDefs: [
                { targets: 0, width: "10%" },
                { targets: 1, width: "15%" },
                { targets: 2, width: "15%" },
                { targets: 3, width: "10%" },
                { targets: 4, width: "10%" },
                { targets: 5, width: "10%" },
                { targets: 6, width: "10%" },
                { targets: 7, width: "10%" },
                { targets: 8, width: "10%" },
            ],
        });
    }

    // ----- DATATABLES/CHANGE SERVICE -----
    getAmenitiesManagementByService("0");
    function getAmenitiesManagementByService(amenitiesID) {

        // ----- DATABASE TABLE INFO -----
        const tablePrimaryKey    = "amenitiesID";
        const tableAmenitiesName = "amenitiesName";
        const tableFieldStatus   = "amenitiesStatus";
        // ----- END DATABASE TABLE INFO -----

        $.ajax({
            method:   "POST",
            url:      "amenities_management/getAmenitiesManagementByService",
            data:     {amenitiesID},
            dataType: "json",
            beforeSend: function() {
                $("#amenitiesManagementTable_parent").html(loadingAnimation);
            },
            success: function(data) {
                let html = `
                <table class="table table-striped table-bordered table-hover" id="amenitiesManagementTable">
                    <thead>
                        <tr>
                            <th>Employee No.</th>
                            <th>Employee Name</th>
                            <th>Service</th>
                            <th>Price</th>
                            <th>Price Type</th>
                            <th>Duration</th>
                            <th>Availability</th>
                            <th style="width:10%;">Status</th>
                            <th style="width:10%;">Action</th>
                        </tr>
                    </thead>
                    <tbody>`;
                    data.map((item) => {
                        getClientTimeout(item.amenitiesAvailability, item.clientTimeout, "duration"+item.amenities_managementID);

                        html += `
                        <tr>
                            <td>${item.accountCode}</td>
                            <td>${item.fullname}</td>
                            <td>${item[tableAmenitiesName]}</td>
                            <td>${formatCurrency(item.amenitiesPrice)}</td>
                            <td>${item.amenitiesPriceType}</td>
                            <td><div id="duration${item.amenities_managementID}"></div></td>
                            <td>${item.amenitiesAvailability == 1 ? '<span class="badge badge-success p-2 w-100">Available</span>' : '<span class="badge badge-dark p-2 w-100">Occupied</span>'}</td>
                            <td>${item.amenitiesStatus == 1 ? '<span class="badge badge-success p-2 w-100">Active</span>' : '<span class="badge badge-danger p-2 w-100">Inactive</span>'}</td>
                            <td>
                                <button 
                                class = "btn btn-primary p-1 w-100 btn_view_service" 
                                style = "font-size: 12px; font-weight: 600;" 
                                amenities_managementid = "${item.amenities_managementID}"
                                accountid = "${item.accountID}"
                                fullname = "${item.fullname}"
                                ${tablePrimaryKey} = "${item[tablePrimaryKey]}"
                                status = "${item.amenitiesStatus}"
                                availability = "${item.amenitiesAvailability}"
                                clientid="${item.clientID ? item.clientID : ''}"
                                clientquantity="${item.clientQuantity ? item.clientQuantity : ''}"
                                amenitiescode="${item.amenitiesCode}"
                                amenitiesname="${item.amenitiesName}"
                                amenitiesprice="${item.amenitiesPrice}"
                                amenitiespricetype="${item.amenitiesPriceType}"
                                timeout="${item.clientTimeout}"
                                duration="${item.clientDuration}"
                                transactionnumber="${item.transactionNumber}">
                                    <i class="zmdi zmdi-eye" style="font-size: 100%;"></i> View
                                </button>
                            </td>
                        </tr>
                        `;
                    })	

                html += `
                    </tbody>
                </table>`;

                setTimeout(() => {
                    $("#amenitiesManagementTable_parent").html(html);
                    DataTablesAmenities();
                }, 500);
            }
        })
        }

        $(document).on("change", "#select_service", function() {
            const service = $(this).val();
            getAmenitiesManagementByService(service);
        })
        // ----- END DATATABLES/CHANGE SERVICE -----
   

    // ----- CHECK INPUTS -----
    function checkInputs(form) {
        if (form == "manpower") {
            const accountID = $("#add_employee").val();
            const service   = $("#add_service").val();
            let countErrors = 0, 
                focusElem   = [];

            if (accountID) {
                $("#add_employee").parent().next().children().children().removeClass("has-error").addClass("no-error");
                $("#invalid-add_employee").html("");
            } else {
                $("#add_employee").parent().next().children().children().removeClass("no-error").addClass("has-error");
                $("#invalid-add_employee").html("Please input correct data");
                countErrors++;
                focusElem.push("add_employee");
            }

            if (service) {
                $("#add_service").parent().next().children().children().removeClass("has-error").addClass("no-error");
                $("#invalid-add_service").html("");
            } else {
                $("#add_service").parent().next().children().children().removeClass("no-error").addClass("has-error");
                $("#invalid-add_service").html("Please input correct data");
                countErrors++;
                focusElem.push("add_service");
            }

            $("#"+focusElem[0]).focus();
            return countErrors > 0 ? false : true;

        } else if (form == "service") {

            $("#editManPower").find("input, select").each(function() {
                const id = "#"+this.id;
                rjValidateInputs(id);
            })

            const accountID = $("#edit_employee").val();
            const service   = $("#edit_service").val();
            let countErrors = 0, 
                focusElem   = [];

            if (accountID) {
                $("#edit_employee").parent().next().children().children().removeClass("has-error").addClass("no-error");
                $("#invalid-edit_employee").html("");
            } else {
                $("#edit_employee").parent().next().children().children().removeClass("no-error").addClass("has-error");
                $("#invalid-edit_employee").html("Please input correct data");
                countErrors++;
                focusElem.push("edit_employee");
            }

            if (service) {
                $("#edit_service").parent().next().children().children().removeClass("has-error").addClass("no-error");
                $("#invalid-edit_service").html("");
            } else {
                $("#edit_service").parent().next().children().children().removeClass("no-error").addClass("has-error");
                $("#invalid-edit_service").html("Please input correct data");
                countErrors++;
                focusElem.push("edit_service");
            }

            $("#edit_client").parent().next().children().children().removeClass("has-error").addClass("no-error");
            $("#invalid-edit_client").html("");

            if ($("#edit_client").val() != "") {
                let quantity = +$("#edit_quantity").val();
                let duration = $("#edit_duration").val();
                if (quantity != "" && quantity > 0) {
                    quantity = quantity + 0;
                    $("#edit_quantity").val(quantity);
                    $("#edit_quantity").removeClass("is-invalid").addClass("is-valid");
                    $("#invalid-edit_quantity").html("");
                } else {
                    countErrors++;
                    focusElem.push("edit_quantity");
                    $("#edit_quantity").removeClass("is-valid").addClass("is-invalid");
                    $("#invalid-edit_quantity").html("Please input correct data");
                }

                if (duration != "") {
                    duration = duration.split(":");
                    let hrs  = duration[0].substr(0,2);
                    let mins = duration[1].substr(0,2);
                    if (hrs == "00" && mins == "00") {
                        $("#edit_duration").removeClass("is-valid").addClass("is-invalid");
                        $("#invalid-edit_duration").html("Please input correct data");
                    } else {
                        $("#edit_duration").removeClass("is-invalid").addClass("is-valid");
                        $("#invalid-edit_duration").html("");
                    }
                } else {
                    countErrors++;
                    focusElem.push("edit_duration");
                    $("#edit_duration").removeClass("is-valid").addClass("is-invalid");
                    $("#invalid-edit_duration").html("Please input correct data");
                }
            }

            // $("#"+focusElem[0]).focus();
            if ($("#editManPower").find(".is-invalid").length > 0) {
                $("#editManPower").find(".is-invalid")[0].focus();
                return false;
            }
            return true;
            // return countErrors > 0 ? false : true;

        }
    }
    // ----- END CHECK INPUTS -----


    // ----- HIDE MODALS -----
    function hideModals() {
        $("#addManPower").modal("hide");
        $("#confirmation-addManPower").modal("hide");
        $("#editManPower").modal("hide");
        $("#confirmation-editManPower").modal("hide");
    }
    // ----- END HIDE MODALS -----


    // ---- CLEAR INPUTS -----
    function clearInputs(form) {
        if (form == "manpower") {

            $("#add_employee").val("").trigger("change");
            $("#add_employeename").val("");
            $("#add_service").val("").trigger("change");
            $("#add_employee").parent().next().children().children().removeClass("has-error").removeClass("no-error");
            $("#add_service").parent().next().children().children().removeClass("has-error").removeClass("no-error");
            $("#invalid-add_employee").html("");
            $("#invalid-add_service").html("");

        } else if (form == "service") {

            resetForms("#editManPower");

            $("#edit_employee").val("").trigger("change");
            $("#edit_employeename").val("");
            $("#edit_service").val("").trigger("change");
            $("#edit_client").val("").trigger("change");
            $("#edit_quantity").val("");
            $("#edit_employee").parent().next().children().children().removeClass("has-error").removeClass("no-error");
            $("#edit_service").parent().next().children().children().removeClass("has-error").removeClass("no-error");
            $("#edit_client").parent().next().children().children().removeClass("has-error").removeClass("no-error");
            $("#invalid-edit_employee").html("");
            $("#invalid-edit_client").html("");
            $("#invalid-edit_quantity").html("");

            $("#edit_quantity").attr("disabled", true);

        }
    }
    // ---- END CLEAR INPUTS -----


    // ----- CLOSING ADD MANPOWER -----
    $(document).on("click", ".btn_close_manpower", function() {
        clearInputs("manpower");
        hideModals();
    })
    // ----- END CLOSING ADD MANPOWER -----


    // ----- CLOSING EDIT SERVICE -----
    $(document).on("click", ".btn_close_service", function() {
        clearInputs("service");
        hideModals();
    })
    // ----- END CLOSING EDIT SERVICE -----

    
    // ----- CLOSING CONFIRMATION ADD MANPOWER -----
    $(document).on("click", ".btn_close_confirmation_add", function() {
        $("#confirmation-addManPower").modal("hide");
        $("#addManPower").modal("show");
    })
    // ----- END CLOSING CONFIRMATION ADD MANPOWER -----


    // ----- CLOSING CONFIRMATION EDIT SERVICE -----
    $(document).on("click", ".btn_close_confirmation_edit", function() {
        $("#confirmation-editManPower").modal("hide");
        $("#editManPower").modal("show");
    })
    // ----- END CLOSING CONFIRMATION EDIT SERVICE -----


    // ----- SELECTING EMPLOYEE NO. -----
    function getUserAccount(accountID, todo) {
        $.ajax({
            method:   "POST",
            url:      "amenities_management/getUserAccount",
            data:     {accountID},
            dataType: "json",
            success: function(data) {
                if (data.length > 0) {
                    $("#"+todo+"_employeename").val(data[0]["accountFirstname"]+" "+data[0]["accountLastname"]);
                }
            }
        })
    }

    $(document).on("change", ".employeeno", function() {
        const accountID = $(this).val();
        const todo      = $(this).attr("todo");
        getUserAccount(accountID, todo);
    })
    // ----- END SELECTING EMPLOYEE NO. -----


    // ----- SAVE MAN POWER -----
    function saveManPower(data) {
        $.ajax({
            method:   "POST",
            url:      "amenities_management/saveManPower",
            data,
            dataType: "json",
            success: function(data) {
                let result = data.split("|");
                if (result[0] == "true") {
                    const service = $("#select_service").val();
                    getAmenitiesManagementByService(service);
                    clearInputs("service");
                    clearInputs("manpower");
                    hideModals();
                    showNotification("success", result[1]);
                } else {
                    // console.log(data);
                    showNotification("danger", result[1]);
                }
            }
        })
    }

    function getManPowerData() {
        const accountID    = $("#add_employee").val();
        const service      = $("#add_service").val();
        const availability = $("#add_availability").prop("checked") ? 1 : 0;
        const status       = $("#add_status").prop("checked") ? 1 : 0;
        const data = {accountID, amenitiesID: service, status, availability};
        return data;
    }

    $(document).on("click", "#btn_save_confirmation_add", function() {
        const data = getManPowerData();
        saveManPower(data);
    })
    // ----- END SAVE MAN POWER -----
    

    // ----- SAVE MAN POWER -----
    function saveServiceData(data) {
        $.ajax({
            method:   "POST",
            url:      "amenities_management/saveServiceData",
            data,
            dataType: "json",
            success: function(data) {
                let result = data.split("|");
                if (result[0] == "true") {
                    window.location.reload();
                } else {
                    // console.log(data);
                    showNotification("danger", result[1]);
                }
            }
        })
    }

    function getServiceData() {
        const accountID     = $("#edit_employee").val();
        const service       = $("#edit_service").val();
        const availability  = $("#edit_availability").prop("checked") ? 1 : 0;
        const status        = $("#edit_status").prop("checked") ? 1 : 0;
        const clientID      = $("#edit_client").val() != "" ? $("#edit_client").val() : null;
        const quantity      = $("#edit_quantity").val() != "" ? $("#edit_quantity").val() : null;
        let duration        = $("#edit_duration").val() != "" ? $("#edit_duration").val().split(":") : false;
        let durationHours   = duration ? (+duration[0].substr(0,2)) : false;
        let durationMinutes = duration ? (+duration[1].substr(0,2)) : false;
        let today           = new Date();
        let temp            = duration ? today.setHours((+today.getHours()) + durationHours, (+today.getMinutes()) + durationMinutes) : false;
        let clientTimeout   = temp ? moment(temp).format("YYYY-MM-DD HH:mm:ss") : null;

        const data = {
            accountID, 
            amenitiesID: service, 
            clientDuration: $("#edit_duration").val(), 
            clientTimeout, 
            status, 
            availability, 
            clientID, 
            clientQuantity: quantity
        };
        return data;
    }

    $(document).on("click", "#btn_save_confirmation_edit", function() {
        const amenitiesID            = $(this).attr("amenitiesid");
        const amenities_managementID = $(this).attr("amenities_managementid");
        const amenitiesPrice         = +$(this).attr("amenitiesprice");
        const amenitiesPriceType     = $(this).attr("amenitiespricetype");

        let data = getServiceData();

        let totalAmenitiesPrice = 0, perTypeQuantity = 0;
        if (amenitiesPriceType == "Per Person") {
            totalAmenitiesPrice += (amenitiesPrice * data.clientQuantity);
            perTypeQuantity     += data.clientQuantity;
        } else if (amenitiesPriceType == "Fixed Price") {
            totalAmenitiesPrice += amenitiesPrice;
            perTypeQuantity     += 1;
        } else if (amenitiesPriceType == "Per Night") {
            totalAmenitiesPrice += amenitiesPrice;
            var numDays = moment.duration(moment(clientTimeout).diff(moment()));
                numDays = numDays._data.days;
            perTypeQuantity += numDays;
        }
        
        data.amenitiesID            = amenitiesID;
        data.amenities_managementID = amenities_managementID;
        data.amenitiesPrice         = amenitiesPrice;
        data.amenitiesPriceType     = amenitiesPriceType;
        data.perTypeQuantity        = perTypeQuantity;
        data.totalAmenitiesPrice    = totalAmenitiesPrice;
        saveServiceData(data);
    })
    // ----- END SAVE MAN POWER -----
    


    // ----- ADD MAN POWER -----
    $(document).on("click", "#save", function(e) {
        e.preventDefault();
        const myInputs = checkInputs("manpower");
        if (myInputs) {
            $("#addManPower").modal("hide");
            $("#confirmation-addManPower").modal("show");
        }
    })
    // ----- END ADD MAN POWER -----


    // ----- EDIT MAN POWER -----
    $(document).on("click", "#update", function(e) {
        e.preventDefault();
        const myInputs = checkInputs("service");
        if (myInputs) {
            $("#editManPower").modal("hide");
            $("#confirmation-editManPower").modal("show");
        }
    })
    // ----- END EDIT MAN POWER -----


    // ----- RESERVATION -----
    function selectClientReservation(clientID) {
        $.ajax({
            method:   "POST",
            url:      "amenities_management/getClientReservation",
            data: {clientID},
            dataType: "json",
            success: function(data) {
                let html = `<option selected disabled>Select Customer Name</option>`;
                if (data.length > 0) {
                    data.map(item => {
                        html += `
                        <option value="${item.clientID}">${item.fullname}</option>`;
                    })
                }
                $("#selectReserveName").html(html);
            }
        })
    }

    function reservationTable(amenities_managementID) {
        $.ajax({
            method:   "POST",
            url:      "amenities_management/getAmenitiesReservation",
            data: {amenities_managementID},
            dataType: "json",
            beforeSend: function() {
                $("#reservationModalContent").html(loadingAnimation);
            },
            success: function(data) {
                let base_url = $("#base_url").val();
                let clientID = [];
                let html = `
                <table class="table table-bordered table-striped">
                    <thead>
                        <tr class="text-center">
                            <th style="width: 20%">#</th>
                            <th style="width: 60%">Name</th>
                            <th style="width: 20%">Action</th>
                        </tr>
                    </thead>
                    <tbody id="tableReservationBody">`;
                if (data.length > 0) {
                    data.map((item, index) => {
                        clientID.push(item.clientID);
                        html += `
                        <tr class="tableReservationData">
                            <td class="text-center">${++index}</td>
                            <td>${item.fullname}</td>
                            <td class="text-center"><button class="btn btn-danger btnDeleteReservation" amenities_managementid="${amenities_managementID}" amenities_reservationid="${item.amenities_reservationID}">DELETE</button></td>
                        </tr>`;
                    })
                } else {
                    html += `
                    <tr class="text-center" id="tableReservationNoData">
                        <td colspan="3">
                            No data available in table.
                        </td>
                    </tr>`;
                }
                html += `
                    </tbody>
                </table>`;

                // console.log(clientID);
                selectClientReservation(clientID);

                setTimeout(() => {
                    $("#reservationModalContent").html(html);
                }, 500);
            }
        })
    }

    $(document).on("click", ".btnDeleteReservation", function() {
        const amenities_managementID  = $(this).attr("amenities_managementid");
        const amenities_reservationID = $(this).attr("amenities_reservationid");
        $.ajax({
            method:   "POST",
            url:      "amenities_management/deleteReservation",
            data: {amenities_reservationID},
            dataType: "json",
            success: function(data) {
                if (data) {
                    reservationTable(amenities_managementID);
                } else {
                    showNotification("danger", "There was an error deleting reservaion.");
                }
            }
        })
    })

    $(document).on("click", "#btnAddReservation", function() {
        const amenities_managementID = $(this).attr("amenities_managementid");
        const clientID = $("#selectReserveName").val();
        if (clientID) {
            $("#selectReserveName").parent().next().children().children().removeClass("no-error").removeClass("has-error");
            $("#invalid-selectReserveName").html("");
            $.ajax({
                method:   "POST",
                url:      "amenities_management/saveReservation",
                data: {amenities_managementID, clientID},
                dataType: "json",
                success: function(data) {
                    if (data) {
                        reservationTable(amenities_managementID);
                    } else {
                        showNotification("danger", "There was an error saving reservaion.");
                    }
                }
            })
        } else {
            $("#selectReserveName").parent().next().children().children().removeClass("no-error").addClass("has-error");
            $("#invalid-selectReserveName").html("Please select customer first!");
        }
        
    })

    $(document).on("click", ".btn_back_reservation", function() {
        $("#selectReserveName").parent().next().children().children().removeClass("no-error").removeClass("has-error");
        $("#invalid-selectReserveName").html("");
        $("#reservationModal").modal("hide");
        $("#editManPower").modal("show");
    })

    $(document).on("click", "#btnReservation", function() {
        const amenities_managementID = $(this).attr("amenities_managementid");

        $("#editManPower").modal("hide");
        $("#reservationModal").modal("show");
        
        reservationTable(amenities_managementID)
    })
    // ----- END RESERVATION -----


    // ----- EDIT CUSTOMER -----
    $(document).on("change", "#edit_client", function() {
        if (this.value) {
            $("#edit_quantity").attr("disabled", false);
            $("#edit_duration").attr("disabled", false);
        } else {
            $("#edit_quantity").val("");
            $("#invalid-edit_quantity").html("");
            $("#edit_quantity").removeClass("is-invalid").removeClass("is-valid");
            $("#edit_quantity").attr("disabled", true);
            $("#edit_duration").val("");
            $("#invalid-edit_duration").html("");
            $("#edit_duration").removeClass("is-invalid").removeClass("is-valid");
            $("#edit_duration").attr("disabled", true);
        }
    })
    // ----- END EDIT CUSTOMER -----


    // ----- EDIT STATUS -----
    $(document).on("click", "#edit_status", function() {
        const status   = $(this).prop("checked") ? true : false;
        const clientID = $(this).attr("clientid");
        const availability = $("#edit_availability").prop("checked") ? true : false;

        $("#edit_client").parent().next().children().children().removeClass("no-error").removeClass("has-error");

        if (!availability && !status) {
            $("#edit_client").attr("disabled", true);
            $("#edit_duration").attr("disabled", true);
            $("#edit_quantity").attr("disabled", true);
            $("#edit_client").parent().next().children().children().removeClass("no-error").addClass("has-error");
            $(this).prop("checked", true);
            $("#invalid-edit_client").html("The selected manpower is currently occupied.");
        } else if (!availability && status) {
            $("#edit_client").attr("disabled", true);
            $("#edit_duration").attr("disabled", true);
            $("#edit_quantity").attr("disabled", true);
            $("#invalid-edit_client").html("");
        } else if (availability && !status) {
            if (!availability) {
                $("#edit_client").parent().next().children().children().removeClass("no-error").addClass("has-error");
                $(this).prop("checked", true);
                $("#invalid-edit_client").html("The selected manpower is currently occupied.");
            } else {
                $("#edit_client").parent().next().children().children().removeClass("no-error").removeClass("has-error");
                $("#edit_client").attr("disabled", true);
                $("#edit_duration").attr("disabled", true);
                $("#edit_quantity").attr("disabled", true);
                $("#edit_client").val("").trigger("change");
                $("#invalid-edit_client").html("");
            }
        } else if (availability && status) {
            $("#edit_client").attr("disabled", false);
            $("#edit_duration").attr("disabled", false);
            $("#edit_quantity").attr("disabled", false);
            $("#invalid-edit_client").html("");
        }

    })
    // ----- END EDIT STATUS -----


    // ----- EDIT AVAILABILITY -----
    $(document).on("click", "#edit_availability", function() {
        const availability = $(this).prop("checked") ? true : false;
        const clientID     = $("#edit_client").val();
        const status       = $("#edit_status").prop("checked") == 1 ? true : false;

        $("#edit_client").parent().next().children().children().removeClass("no-error").removeClass("has-error");

        if (!availability && !status) {
            $("#edit_client").attr("disabled", true);
            $("#edit_duration").attr("disabled", true);
            $("#edit_quantity").attr("disabled", true);
            $("#edit_client").parent().next().children().children().removeClass("no-error").addClass("has-error");
            $("#invalid-edit_client").html("The selected manpower is currently inactive.");
            $(this).prop("checked", true);
        } else if (!availability && status) {
            if (!clientID) {
                $("#edit_client").parent().next().children().children().removeClass("no-error").addClass("has-error");
                $("#invalid-edit_client").html("Please select a customer first!");
                $(this).prop("checked", true);
                $("#edit_client").attr("disabled", false);
                $("#edit_duration").attr("disabled", false);
                $("#edit_quantity").attr("disabled", false);
            } else {
                $("#edit_client").attr("disabled", true);
                $("#edit_duration").attr("disabled", true);
                $("#edit_quantity").attr("disabled", true);
                $("#edit_client").parent().next().children().children().removeClass("no-error").removeClass("has-error");
                $("#edit_duration").removeClass("is-invalid").removeClass("is-valid");
                $("#edit_quantity").removeClass("is-invalid").removeClass("is-valid");
                $("#invalid-edit_client").html("");
                $("#invalid-edit_duration").html("");
                $("#invalid-edit_quantity").html("");
            }
        } else if (availability && !status) {
            $("#edit_client").attr("disabled", true);
            $("#edit_duration").attr("disabled", true);
            $("#edit_quantity").attr("disabled", true);
            $("#edit_client").val("").trigger("change");
            $("#invalid-edit_client").html("");
        } else if (availability && status) {
            $("#edit_client").attr("disabled", false);
            $("#edit_duration").attr("disabled", false);
            $("#edit_quantity").attr("disabled", false);
            $("#invalid-edit_client").html("");
        }
    })
    // ----- END EDIT AVAILABILITY -----


    // ----- PRINT STAB -----
    $(document).on("click", "#btnPrint", function(e) {
        e.preventDefault();
        const amenitiescode     = $(this).attr("amenitiescode");
        const amenitiesname     = $(this).attr("amenitiesname");
        const fullname          = $(this).attr("fullname");
        const quantity          = $(this).attr("quantity");
        const transactionNumber = $(this).attr("transactionnumber");

        // console.log({amenitiescode, amenitiesname, fullname, quantity});

        $.ajax({
            method: "GET",
            url: "amenities_management/printStab",
            data: {amenitiescode, amenitiesname, fullname, quantity, transactionNumber},
            success: function(data) {
                var left  = ($(window).width()/2)-(900/2),
                    top   = ($(window).height()/2)-(600/2),
                    mywindow = window.open ("", "PRINT", "width=900, height=600, top="+top+", left="+left);

                mywindow.document.write(data);

                mywindow.document.close(); 
                mywindow.focus();
            }
        })
    })
    // ----- END PRINT STAB -----


    // ---- VIEW SERVICE -----
    $(document).on("click", ".btn_view_service", function() {
        const amenities_managementID = $(this).attr("amenities_managementid");
        const accountID              = $(this).attr("accountid");
        const fullname               = $(this).attr("fullname");
        const amenitiesID            = $(this).attr("amenitiesid");
        const status                 = $(this).attr("status") == 1 ? true : false;
        const availability           = $(this).attr("availability") == 1 ? true : false;
        const clientID               = $(this).attr("clientid");
        const quantity               = $(this).attr("clientquantity");
        const amentiesCode           = $(this).attr("amenitiescode");
        const amentiesName           = $(this).attr("amenitiesname");
        const duration               = $(this).attr("duration");
        const timeout                = $(this).attr("timeout");
        const amenitiesPrice         = $(this).attr("amenitiesprice");
        const amenitiesPriceType     = $(this).attr("amenitiespricetype");
        const transactionNumber      = $(this).attr("transactionnumber");

        const printButton = !availability ? `<button class="btn btn-primary" id="btnPrint" amenitiescode="${amentiesCode}" fullname="${fullname}" transactionnumber="${transactionNumber}" amenitiesname="${amentiesName}" quantity="${quantity}">PRINT STUB</button>` : "";

        $("#edit_status").attr("clientid", clientID);
        
        if (!availability && !status) {
            $("#edit_client").val("").trigger("change");
            $("#edit_quantity").val("");
            $("#edit_client").attr("disabled", true);
            $("#edit_duration").attr("disabled", true);
            $("#edit_quantity").attr("disabled", true);
        } else if (!availability && status) {
            clientID && $("#edit_client").val(clientID).trigger("change");
            $("#edit_quantity").val(quantity);
            $("#edit_client").attr("disabled", true);
            $("#edit_duration").attr("disabled", true);
            $("#edit_quantity").attr("disabled", true);

            $("#edit_employee").attr("disabled", true);
            $("#edit_service").attr("disabled", true)
        } else if (availability && !status) {
            $("#edit_client").val("").trigger("change");
            $("#edit_quantity").val("");
            $("#edit_client").attr("disabled", true);
            $("#edit_duration").attr("disabled", true);
            $("#edit_quantity").attr("disabled", true);
        } else if (availability && status) {
            clientID && $("#edit_client").val(clientID).trigger("change");
            $("#edit_quantity").val(quantity);
            $("#edit_client").attr("disabled", false);
            $("#edit_duration").attr("disabled", false);
            $("#edit_quantity").attr("disabled", false);
            if (!clientID) {
                $("#edit_duration").attr("disabled", true);
                $("#edit_quantity").attr("disabled", true);
            }
        }


        $("#edit_employee").val(accountID).trigger("change");
        $("#edit_employeename").val(fullname);
        $("#edit_duration").val(duration);
        $("#edit_service").val(amenitiesID).trigger("change");
        $("#edit_availability").prop("checked", availability);
        $("#edit_status").prop("checked", status);

        $("#editManPower").modal("show");

        $("#print_stab").html(printButton);

        $("#btn_save_confirmation_edit").attr("amenitiesprice", amenitiesPrice);
        $("#btn_save_confirmation_edit").attr("amenitiespricetype", amenitiesPriceType);
        $("#btn_save_confirmation_edit").attr("amenitiesid", amenitiesID);
        $("#btn_save_confirmation_edit").attr("amenities_managementid", amenities_managementID);
        $("#btnReservation").attr("amenities_managementid", amenities_managementID);
        $("#btnAddReservation").attr("amenities_managementid", amenities_managementID);
    })
    // ---- END VIEW SERVICE -----


});