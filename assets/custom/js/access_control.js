$(document).ready(function(){
    cardTable();
});


$(document).on("click", "#editCard", function(){
   var cardID   =   $(this).data("id");
   $.ajax({
       url:"access_control/card_view",
       method:"POST",
       data:{cardID},
       dataType:"json",
       success:function(data){
           $("#edit_card_modal").modal("show");
            // console.log(data);
            if(data[0]["cardStatus"]== 1){
                status  =   `
                            <select name="" class="form-control w-100" id="cardStatus">
                                <option value="1" selected>Active</option>
                                <option value="2">Damaged</option>
                                <option value="3">Lost</option>
                            </select>
                            `;
            }else{
                if(data[0]["cardStatus"] == 2){
                    status  =   `
                        <select name="" class="form-control w-100" id="cardStatus">
                            <option value="1">Active</option>
                            <option value="2" selected>Damaged</option>
                            <option value="3">Lost</option>
                        </select>
                        `;
                }else{
                    status  =   `
                        <select name="" class="form-control w-100" id="cardStatus">
                            <option value="1">Active</option>
                            <option value="2" selected>Damaged</option>
                            <option value="3" selected>Lost</option>
                        </select>
                        `;
                }
            }
           
            var edit_card_div = `
                            <form class='form_advanced_validation' id='edit_validation' method="POST">
                                <div class="modal-body">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="form-group form-float">
                                                <label>Room Type</label>
                                                <div class="input-group mb-3">
                                                    <div class="input-group-prepend">
                                                    <!-- <span class="input-group-text">@</span> -->
                                                    </div>
                                                    <input type="text" class="form-control" readonly value="${data[0]["roomTypeName"]}">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group form-float">
                                                <label>Room Number</label>
                                                <div class="input-group mb-3">
                                                    <div class="input-group-prepend">
                                                    <!-- <span class="input-group-text">@</span> -->
                                                    </div>
                                                    <input type="text" class="form-control" readonly value="${data[0]["roomCode"]}">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group form-float">
                                                <label>Card Code</label>
                                                <div class="input-group mb-3">
                                                    <div class="input-group-prepend">
                                                    <!-- <span class="input-group-text">@</span> -->
                                                    </div>
                                                    <input type="text" class="form-control" readonly value="${data[0]["cardCode"]}">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="form-group form-float">
                                                <label>Card ID</label>
                                                <div class="input-group mb-3">
                                                    <div class="input-group-prepend">
                                                    <!-- <span class="input-group-text">@</span> -->
                                                    </div>
                                                    <input type="text" class="form-control" readonly value="${data[0]["cardDesc"]}">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="form-group form-float">
                                                <label>Card Status</label>
                                                ${status}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="modal-footer">
                                    <button type="button" class="btn btn-primary px-5 p-2 font-weight-bold" data-action='edit' data-cardid="${data[0]["cardID"]}" id='update'>UPDATE</button>
                                    <button type="button" class="btn btn-outline-primary waves-effect px-5 p-2 font-weight-bold btn_close_modal" data-dismiss="modal">CANCEL</button>
                                </div>
                            </form>
                                `;
            $("#edit_card_div").html(edit_card_div);
       }
   });
});


$(document).on("click", "#update", function(){
    $("#edit_card_modal").modal("hide");
    $("#confirmation-edit_room_modal").modal("show");
});
$(document).on("click", "#btn_close_confirmation_edit", function(){
    $("#edit_card_modal").modal("show");
    $("#confirmation-edit_room_modal").modal("hide");
});

$(document).on("click", "#btn_save_confirmation_edit", function(){
    var cardID  =   $("#update").data("cardid");
    var status  =   $("#cardStatus").val();
    data = {
        "cardID": cardID,
        "status": status
    };
    $.ajax({
        url:"access_control/update_card",
        method:"post",
        data,
        dataType:"json",
        success:function(data){
            var condition  = data.split("|");
            if(condition.shift() == "FALSE"){
                showNotification("danger", condition.pop());
            }else{
                cardTable();
                showNotification("success", condition.pop());
                $("#edit_card_div").html("");
                $("#edit_card_modal").modal("hide");
                $("#confirmation-edit_room_modal").modal("hide");
            }
        }
    });
});

function cardTable(){
    if ($.fn.DataTable.isDataTable('#cardTable')){
        $('#cardTable').DataTable().destroy();
    }
    var table = $("#cardTable").css({"min-width": "100%"}).removeAttr('width').DataTable({
        proccessing:   false,
        serverSide:    false,
        scrollX:        true,
        scrollCollapse: true,
        columnDefs: [
            { targets: 0, width: 100 },
            { targets: 1, width: 100 },
            { targets: 2, width: 100 },
            { targets: 3, width: 100 },
            { targets: 4, width: 20 },
            { targets: 5, width: 20 }
        ],
        ajax: {
            url:         "access_control/card_table",
            cache:       false,
            method:      "POST",
            contentType: "application/json; charset=utf-8",
            dataType:    "json",
            dataSrc: function (data) {
                return data;
            },
        },
    });
}
