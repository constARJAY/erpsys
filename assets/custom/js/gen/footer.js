$(document).ready(function() {
			
    function getAllModules(data) {
        let html = "";
        data.map(item => {
            html += `<option>${item.moduleName}</option>`;
        })
        $("#moduleList").html(html);
    }
    const moduleTableData = getTableData("gen_module_list_tbl", "", "moduleStatus = 1");
    const moduleData = moduleTableData.map(item => item.moduleName);
    getAllModules(moduleTableData);

    $(document).on("keypress", "#searchModule", function(e) {
        const moduleName = $(this).val();
        if (e.which == 13) {
            if (moduleData.includes(moduleName)) {
                // alert(moduleName);
                const getController = getTableData("gen_module_list_tbl", "moduleController", "moduleName = BINARY '"+moduleName+"'");
                const controllerName = getController[0]["moduleController"].toLowerCase();
                window.location.href = controllerName;
            } else {
                showNotification("danger", `${moduleName} module not found.`)
            }
        }
    })

    // ----- VIEW NOTIFICATION -----
    $(document).on("click", ".btnViewNotification", function(e) {
        e.preventDefault();
        const notifID    = $(this).attr("id");
        const controller = $(this).attr("controller");

        $.ajax({
            method: "POST",
            url: base_url+"system_notification/updateNotification",
            data: {notifID},
            success: function(data) {
                if (data) {
                    window.location.href = base_url+controller;
                }
            }
        })
    })
    // ----- END VIEW NOTIFICATION -----

})