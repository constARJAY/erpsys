$(document).ready(function(){
    listOfRoomsSchedule();
});

// FILTERING ONCHANGE FUNCTIONS
$(document).on("change", "#datePickerRoom, #roomTypeFilter", function(){
    showRoomsSchedule();
});
$(document).on("change", "#hallTypeFilter, #datePickerHall", function(){
    showHallsSchedule();
});


// CONFIRMATION BUTTONS
    // /Decline
$(document).on("click", "#room_declineBtn", function(){
    var clientID    =   $(this).data("id");
    var data        =   {clientID};
    guestReservation(data, "decline-reservation");
    // $("#decline-reservation").modal("show");
});
    // /Confirm
$(document).on("click", "#room_confirmBtn", function(){
    var clientID    =   $(this).data("id");
    var checkIn     =   $(this).data("checkin");
    var checkOut    =   $(this).data("checkout");
    var data        =   {clientID, checkIn, checkOut };
    guestReservation(data,"confirm-reservation");
    
    
});


$(document).on("click", "#btn_save_confirm_reservation", function(){
    var clientID        =  $(this).data("clientid");
    var roomListID      =  $("#assignedRoomList").val();
    $.ajax({
        url:"reservation_management/confirm_reservation",
        method:"POST",
        data:{clientID,roomListID},
        dataType:"json",
        beforeSend:function(){
            var confirm_footer = `<div class="loader w-100 p-5 text-center">
                                        <div class="mt-3"><i class="zmdi zmdi-rotate-right zmdi-hc-spin text-primary"></i>
                                        <br>
                                        <p class="text-primary">Please wait...</p>
                                    </div>`;
           $(".confirm_footer").html(confirm_footer);
        },
        success:function(data){
            $("#confirm-reservation").modal("hide");
            showNotification("success","New reservation Added");
            showRoomsSchedule();
        }
    });
    // alert(clientID+" | "+roomListID)
});

$(document).on("click", "#btn_save_decline_reservation", function(){
    var clientID        =  $(this).data("clientid");
    $.ajax({
        url:"reservation_management/decline_reservation",
        method:"POST",
        data:{clientID},
        dataType:"json",
        beforeSend:function(){
            var decline_footer = `<div class="loader w-100 p-5 text-center">
                                        <div class="mt-3"><i class="zmdi zmdi-rotate-right zmdi-hc-spin text-primary"></i>
                                        <br>
                                        <p class="text-primary">Please wait...</p>
                                    </div>`;
           $(".decline_footer").html(decline_footer);
        },
        success:function(data){
            if(data != false){
                $("#decline-reservation").modal("hide");
                showNotification("success","New reservation Added");
                showRoomsSchedule();
            }else{
                $("#decline-reservation").modal("hide");
                showNotification("danger","System Error: Please Cotact your administrator Immedietly");
                showRoomsSchedule();
            }
            
        }
    });
});


/** LIST OF FUNCTIONS */
// DATE RANGE SCRIPT
function listOfRoomsSchedule(){
    $.ajax({
        url:"reservation_management/filter_filtering",
        method:"post",
        data:{"thisValue": "1"},
        dataType:"json",
        beforeSend:function(){
           var list_of_schedule = `<div class="loader w-100 p-5 text-center">
                                   <div class="mt-3"><i class="zmdi zmdi-rotate-right zmdi-hc-spin zmdi-hc-3x text-primary"></i>
                                   <br>
                                   <p class="text-primary">Please wait...</p>
                               </div>`;
           $(".list_of_schedule").html(list_of_schedule);
        },
        success:function(data){
            var option    = "";
            data.map(items=>{
                option += `<option value="${items["roomTypeID"]}">${items["roomTypeName"]}</option>`;
            })    
            var filtering = `   <div class="col-6">
                                    <div class="input-group">
                                        <select class="form-control select2" id="roomTypeFilter">
                                            <option value="0">All Rooms</option>
                                            ${option}
                                        </select>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="input-group">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"><i class="zmdi zmdi-calendar"></i></span>
                                        </div>
                                        <input type="text" class="form-control" id="datePickerRoom"
                                            placeholder="Please choose a time..." data-dtp="dtp_6ITRg">
                                    </div>
                                </div>
                            `;
            $(".filtering").html(filtering);
            datePickerRoom();
        }
    });
}


function datePickerRoom(){
    $('#datePickerRoom').daterangepicker({
        // timePicker: true,
        startDate: moment().startOf('hour'),
        endDate: moment().startOf('hour').add(32, 'hour'),
        locale: {
            format: 'MMMM DD, YYYY'
        }
    });
}

function datePickerHall(){
    $('#datePickerHall').daterangepicker({
        // timePicker: true,
        startDate: moment().startOf('hour'),
        endDate: moment().startOf('hour').add(32, 'hour'),
        locale: {
            format: 'MMMM DD, YYYY'
        }
    });
}


// SHOWING ROOM DATA 
function showRoomsSchedule(){
    var roomTypeID  = $("#roomTypeFilter").val();
    var theDate     = $("#datePickerRoom").val().split("-");
    var startDate   = theDate.shift();
    var endDate     = theDate.pop();
    // console.log(startDate+"-"+endDate+" | "+roomTypeID);
    var data        =  {"roomTypeID":roomTypeID,"startDate":startDate,"endDate":endDate};
    
    $.ajax({
        url:"reservation_management/list_room_schedule",
        method:"post",
        data,
        dataType:"json",
        beforeSend:function(){
           var list_of_schedule = `<div class="loader w-100 p-5 text-center">
                                   <div class="mt-3"><i class="zmdi zmdi-rotate-right zmdi-hc-spin zmdi-hc-3x text-primary"></i>
                                   <br>
                                   <p class="text-primary">Please wait...</p>
                               </div>`;
           $(".list_of_schedule").html(list_of_schedule);
        },
        success:function(data){
            console.log(data);
            var list_of_schedule    =   "";
            if(data.length < 1){
                list_of_schedule        +=   `<div class="col-12">
                                                        <div class="card bg-light border mt-3" style="border-radius: 5px;">
                                                            <div class="card-header text-center">
                                                                <h4 class="font-weight-bold text-primary">No reservation found.</h4>
                                                            </div>
                                                        </div>
                                                </div>`;
            }else{
                data.map(items=>{
                    if(items["roomListID"] < 1){
                        switch(items["clientStatus"]) {
                            case "1":
                              var clientStatus = "";
                              var buttons             =   `     <button class="btn btn-danger btn-sm" id="room_declineBtn" data-id="${items["clientID"]}"><i class="zmdi zmdi-close"></i> </button>
                                                                <button class="btn btn-success btn-sm" id="room_confirmBtn" data-id="${items["clientID"]}" data-checkin="${moment(items["clientCheckIn"]).format("YYYY-MM-DD")  }" data-checkout="${moment(items["clientInitialCheckOut"]).format("YYYY-MM-DD")}"     ><i class="zmdi zmdi-check text-light"></i> </button>`;
                              break;
                            case "2":
                              var clientStatus = "<span class='font-weight-bold text-success'>Check In</span>";
                              var buttons             = "";
                              break;
                            case "3":
                              var clientStatus = "<span class='font-weight-bold text-warning'>Rescheduled</span>";
                              var buttons             = "";
                              break;
                            case "4":
                              var clientStatus = "<span class='font-weight-bold text-danger'>Cancelled</span>";
                              var buttons             = "";
                              break;

                            default:
                              var clientStatus = "<span class='font-weight-bold text-success'>Check Out</span>";
                              var buttons             = "";
                          }
                        list_of_schedule        +=   `  <div class="col-3">
                                                        <div class="card bg-light border mt-3" style="border-radius: 5px;">
                                                            <div class="card-header">
                                                                <h4 class="font-weight-bold text-primary">${items["roomTypeName"]}</h4>
                                                            </div>
                                                            <div class="card-body">
                                                                <div class="mb-2 d-flex justify-content-between align-items-center" style="font-size:80%">
                                                                    <div><strong>Check In:</strong> ${moment(items["clientCheckIn"]).format("MMMM DD, YYYY")}</div>
                                                                    <div><strong>Check Out:</strong> ${moment(items["clientInitialCheckOut"]).format("MMMM DD, YYYY")}</div>
                                                                </div>
                                                                <h6><small class="font-weight-bold">Name: </small> ${items["accountFirstname"]} ${items["accountLastname"]} </h6>
                                                                <span><small class="font-weight-bold">Email: </small> ${items["accountEmail"]}</span>
                                                                <br>
                                                                <span><small class="font-weight-bold">Guest: </small> ${items["clientGuestAdult"]} Adult, ${items["clientGuestChildren"]} Children, ${items["clientGuestInfant"]} Infant</span>
                                                                <br>
                                                                <span><small class="font-weight-bold">Contact Number: </small> ${items["accountContactNumber"]}</span>
                                                                <br>
                                                                <span><small class="font-weight-bold">Mode of payment: </small> ${items["clientPaymentMode"].charAt(0).toUpperCase() + items["clientPaymentMode"].slice(1).toLowerCase()}</span>
                                                                <div class="px-2 text-right d-flex justify-content-between align-items-center">
                                                                        <div>
                                                                            ${clientStatus}
                                                                        </div>
                                                                        <div>
                                                                            ${buttons}
                                                                        </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                         </div>`;
                    }
                });
            }
            $(".list_of_schedule").html(list_of_schedule);
           console.log(data);
        }
    });
}

// SHOWING HALLS DATA
function showHallsSchedule(){
    var hallListID  = $("#hallTypeFilter").val();
    var theDate     = $("#datePickerHall").val().split("-");
    var startDate   = theDate.shift();
    var endDate     = theDate.pop();
    // console.log(startDate+"-"+endDate+" | "+roomTypeID);
    var data        =  {"hallListID":hallListID,"startDate":startDate,"endDate":endDate};
    $.ajax({
        url:"reservation_management/list_hall_schedule",
        method:"post",
        data,
        dataType:"json",
        beforeSend:function(){
           var list_of_schedule = `<div class="loader w-100 p-5 text-center">
                                   <div class="mt-3"><i class="zmdi zmdi-rotate-right zmdi-hc-spin zmdi-hc-3x text-primary"></i>
                                   <br>
                                   <p class="text-primary">Please wait...</p>
                               </div>`;
           $(".list_of_schedule").html(list_of_schedule);
        },
        success:function(data){
            var list_of_schedule = `<div class="loader w-100 p-5 text-center">
                                   <div class="mt-3"><i class="zmdi zmdi-rotate-right zmdi-hc-spin zmdi-hc-3x text-primary"></i>
                                   <br>
                                   <p class="text-primary">Select Room Type</p>
                               </div>`;
           $(".list_of_schedule").html(list_of_schedule);
           console.log(data);
        }
    });
}

function guestReservation(data, modal){
    $.ajax({
        url:"reservation_management/fetch_client_reservation",
        method:"POST",
        data,
        dataType:"json",
        beforeSend:function(){

        },
        success:function(data){
            console.log(data);
            
            if(modal != "confirm-reservation"){
                data[0].map(items=>{
                    $(".customerName").text(items["accountFirstname"]+" "+items["accountLastname"]);
                    $(".customerEmail").text(items["accountEmail"]);
                    var declined_footer  = ` <button type="button" class="btn btn-primary shadow-none" data-dismiss="modal" data-clientid="${items["clientID"]}" id="btn_save_decline_reservation"> YES</button>
                                             <button type="button" class="btn btn-danger shadow-none btn_close_confirm_reservation" data-dismiss="modal" aria-label="Close"> NO</button>`;
                    $(".declined_footer").html(declined_footer);
                });
            }else{
                data[0].map(items=>{
                    $(".customerName").text(items["accountFirstname"]+" "+items["accountLastname"]);
                    $(".customerEmail").text(items["accountEmail"]);
                    var confirm_footer  = ` <button type="button" class="btn btn-primary shadow-none" data-dismiss="modal" data-clientid="${items["clientID"]}" id="btn_save_confirm_reservation"> YES</button>
                                            <button type="button" class="btn btn-danger shadow-none btn_close_confirm_reservation" data-dismiss="modal" aria-label="Close"> NO</button>`;
                    $(".confirm_footer").html(confirm_footer);
                });
                var assignedRoomList = '<select id="assignedRoomList" class="form-control text-center">';           
                if(data[1].length < 1){
                    assignedRoomList += '<option value="0">No Room Available</option>';
                }else{
                    assignedRoomList += '<option value="0">Assign a room </option>';
                    data[1].map(roomList=>{
                        assignedRoomList += '<option value="'+roomList["roomListID"]+'"> '+roomList["roomTypeShortname"]+'-'+roomList["roomCode"]+'</option>';
                    });
                }
                assignedRoomList += '</select>';
                $(".assignedRoomList").html(assignedRoomList);
            }
            
            $("#"+modal).modal("show");
        }
    });
}

