

$(document).ready(function() {

    // ----- CLICK DETAILS -----
    $(document).on("click", ".btnDetails", function(e) {
        e.preventDefault();
        const notifID    = $(this).attr("id");
        const table      = $(this).attr("table");
        const controller = $(this).attr("controller");

        $.ajax({
            method: "POST",
            url: base_url+"system_notification/updateNotification",
            data: {notifID},
            success: function(data) {
                if (data) {
                    window.location.href = base_url+controller+"?view_id="+table;
                    // window.location.href = base_url+controller;
                }
            }
        })
    })
    // ----- END CLICK DETAILS -----


    // ----- GET NOTIFICATION -----
    function getSystemNotification(projectName, dateFrom, dateTo, tabName) {
        $.ajax({
            method: "POST",
            url: `${base_url}system_notification/getNotificationData`,
            data: {projectName, dateFrom, dateTo},
            dataType: "json",
            async: false,
            beforeSend: function() {
                $("#"+tabName).html(preloader);
            },
            success: function(data) {
                let html;
                if (data && data.length > 0) {
                    html = `
                    <div class="col-12">
                        <div class="card">
                            <div class="body">`;

                    data.map(notif => {
                        html += `
                        <div class="timeline-item ${notif['color']} border-bottom pb-2" date-is="${moment(notif['date']).format("MMM DD, YYYY hh:mm:ss A")}">
                            <div class="d-flex align-items-center">
                                <div>
                                    <img src="${base_url}assets/notification/${notif["icon"]}" width="50" height="50">
                                </div>
                                <div class="ml-3">
                                    <h6 class="font-weight-bold">${notif["title"]}</h6>
                                    <div>${notif["description"]}</div>
                                    <a href="${base_url}${notif['controller']}?view_id=${encryptString(notif['table'])}">Details</a>  
                                </div>
                            </div>
                        </div>  `;
                    })

                    html += `
                            </div>
                        </div>
                    </div>`;
                } else {
                    html = `
                    <div class="col-12">
                        <div class="card">
                            <div class="body">
                                <div class="py-5 w-100 h-100 d-flex justify-content-center align-items-center flex-column">
                                    <img src="${base_url}assets/modal/no-data.gif" style="max-width: 300px;
                                        width: auto;
                                        min-width: 100px;
                                        height: auto;" alt="No data available yet.">
                                    <span class="font-weight-bold">No data available yet.</span>
                                </div>
                            </div>
                        </div>
                    </div>`;
                }

                setTimeout(() => {
                    $("#"+tabName).html(html);
                }, 500);
            }
        })
    }

    function getNotification(dateFrom, dateTo) {
        const projectTabList = [
            {
                name: "all",
                tab:  "allTabContent"
            },
            {
                name: "Human Resources Information System",
                tab:  "hrisTabContent"
            },
            {
                name: "Project Management System",
                tab:  "pmsTabContent"
            },
            {
                name: "Finance Management System",
                tab:  "fmsTabContent"
            },
            {
                name: "Inventory Management System",
                tab:  "imsTabContent"
            },
        ];
        for(var i=0; i<projectTabList.length; i++) {
            const name = projectTabList[i].name;
            const tab  = projectTabList[i].tab;
            getSystemNotification(name, dateFrom, dateTo, tab);
        }

    }
    // ----- END GET NOTIFICATION -----


    // ----- DATE PICKER -----
    $('.daterange2').daterangepicker({
        autoUpdateInput: false,
        showDropdowns: true,
        autoApply: true,
        locale: {
            format: "MMMM DD, YYYY"
        },
    }, function(start, end) {
        $('#daterange2').val(start.format('MMMM DD, YYYY') + ' - ' + end.format('MMMM DD, YYYY'));
        let dateFrom = start.format("YYYY-MM-DD");
        let dateTo   = end.format("YYYY-MM-DD");
        getNotification(dateFrom, dateTo);
    });
    // ----- END DATE PICKER -----

})