$(document).ready(function() {

    function getNotification(dateFrom, dateTo) {
        $.ajax({
            method: "POST",
            url: "notification_management/getNotification",
            data: {dateFrom, dateTo},
            dataType: "json",
            beforeSend: function() {
                $("#allNotification").html(loadingAnimation);
                $("#roomNotification").html(loadingAnimation);
                $("#hallNotification").html(loadingAnimation);
            },
            success: function(data) {
                let defaultContent = `
                <div class="w-100 text-center">
                    <img src="${base_url}pages/admin-assets/modal/notification.png" class="img-fluid" width="300" height="500">
                    <h5 class="text-dark font-weight-bold">NO NOTIFICATION FOUND.</h5>
                </div>`;
                let allNotification  = "",
                    roomNotification = "",
                    hallNotification = "";
                let countAllNotif = 0, countRoomNotif = 0, countHallNotif = 0;
                if (data.length > 0) {
                    data.map(item => {

                        countAllNotif  += 1;
                        countRoomNotif += (item.type == "room" ? 1 : 0);
                        countHallNotif += (item.type == "hall" ? 1 : 0);

                        allNotification += `
                        <div class="col-lg-4 col-md-4 col-sm-12">
                            <div class="card">
                                <div class="card-header">
                                    <div class="d-flex justify-content-between">
                                        <div>
                                            <i class="fa fa-bell" aria-hidden="true"></i>
                                        </div>
                                        <div>
                                            <span>${item.updatedAt}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <b>${item.fullname}</b><br>
                                    <small>${item.title}</small><br><br>
                                    <div>${item.description}</div>
                                </div>
                            </div>
                        </div>`;

                        if (item.type == "room") {
                            roomNotification += `
                            <div class="col-lg-4 col-md-4 col-sm-12">
                                <div class="card">
                                    <div class="card-header">
                                        <div class="d-flex justify-content-between">
                                            <div>
                                                <i class="fa fa-bell" aria-hidden="true"></i>
                                            </div>
                                            <div>
                                                <span>${item.updatedAt}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card-body">
                                        <b>${item.fullname}</b><br>
                                        <small>${item.title}</small><br><br>
                                        <div>${item.description}</div>
                                    </div>
                                </div>
                            </div>`;
                        } else if (item.type == "hall") {
                            hallNotification += `
                            <div class="col-lg-4 col-md-4 col-sm-12">
                                <div class="card">
                                    <div class="card-header">
                                        <div class="d-flex justify-content-between">
                                            <div>
                                                <i class="fa fa-bell" aria-hidden="true"></i>
                                            </div>
                                            <div>
                                                <span>${item.updatedAt}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card-body">
                                        <b>${item.fullname}</b><br>
                                        <small>${item.title}</small><br><br>
                                        <div>${item.description}</div>
                                    </div>
                                </div>
                            </div>`;
                        }
                    })
                } else {
                    allNotification  = defaultContent,
                    roomNotification = defaultContent,
                    hallNotification = defaultContent;
                }
                setTimeout(() => {

                    allNotification  = countAllNotif > 0 ? allNotification : defaultContent;
                    roomNotification = countRoomNotif > 0 ? roomNotification : defaultContent;
                    hallNotification = countHallNotif > 0 ? hallNotification : defaultContent;

                    $("#allNotification").html(allNotification);
                    $("#roomNotification").html(roomNotification);
                    $("#hallNotification").html(hallNotification);
                }, 500);
            }
        })
    }

    // ----- DATE PICKER -----
    $('.daterange').daterangepicker({
        autoUpdateInput: false,
        showDropdowns: true,
        autoApply: true,
        maxDate: moment().format("MMMM DD, YYYY"),
        startDate: moment(),
        endDate: moment(),
        locale: {
            format: "MMMM DD, YYYY"
        },
    }, function(start, end) {
        $('#datePicker').val(start.format('MMMM DD, YYYY') + ' - ' + end.format('MMMM DD, YYYY'));
        let dateFrom = start.format("YYYY-MM-DD");
        let dateTo   = end.format("YYYY-MM-DD");
        getNotification(dateFrom, dateTo);
    });
    // ----- END DATE PICKER -----

})