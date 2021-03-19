// ----- SAVE FORM/DOCUMENT ----
async function saveFormData(action, method, data, isObject, swalTitle) {
    if (action && method && data && isObject) {
        let path = action == "insert" ? `${base_url}operations/insertTableData` : `${base_url}operations/updateTableData`;
        return !isObject ? await saveUpdateDeleteDatabaseFormData(data, path, false, swalTitle) : await saveUpdateDeleteDatabaseObject(data, path, false, swalTitle);
    } else {
        return "Failed to save document!";
    }
}
// ----- END SAVE FORM/DOCUMENT ----



// ----- FORM/DOCUMENT CONFIRMATION -----
function formConfirmation(
    method      = "", // save|cancelform|approve|reject|submit|cancel
    action      = "",
    title       = "", 
    modalID     = "", 
    containerID = "",
    data        = null, 
    isObject    = true, 
    callback    = false) {
    
    if (method && action && title && (modalID || containerID)) {
        method = method.toLowerCase();
        action = action.toLowerCase() == "update" ? "update" : "insert";

        $("#"+modalID).modal("hide");

        let swalText, swalImg;
        switch(method) {
            case "save":
                swalTitle = `SAVE ${title.toUpperCase()}`;
                swalText  = "Are you sure to save this document?";
                swalImg   = `${base_url}assets/modal/add.svg`;
                break;
            case "submit":
                swalTitle = `SUBMIT ${title.toUpperCase()}`;
                swalText  = "Are you sure to submit this document?";
                swalImg   = `${base_url}assets/modal/add.svg`;
                break;
            case "approve":
                swalTitle = `APPROVE ${title.toUpperCase()}`;
                swalText  = "Are you sure to approve this document?";
                swalImg   = `${base_url}assets/modal/add.svg`;
                break;
            case "reject":
                swalTitle = `REJECT ${title.toUpperCase()}`;
                swalText = "Are you sure to reject this document?";
                swalImg  = `${base_url}assets/modal/add.svg`;
                break;
            case "cancelform":
                swalTitle = `CANCEL ${title.toUpperCase()} DOCUMENT`;
                swalText  = "Are you sure to cancel this document?";
                swalImg   = `${base_url}assets/modal/add.svg`;
                break;
            default:
                swalTitle = `CANCEL ${title.toUpperCase()}`;
                swalText  = "Are you sure that you want to cancel this process?";
                swalImg   = `${base_url}assets/modal/add.svg`;
                break;
        }
        Swal.fire({
            title: swalTitle, 
            text: swalText,
            imageUrl: swalImg,
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: 'Custom image',
            showCancelButton: true,
            confirmButtonColor: '#28a745',
            cancelButtonColor: '#1A1A1A',
            cancelButtonText: 'No',
            confirmButtonText: 'Yes',
            allowOutsideClick: false
        }).then((result) => {
            if (result.isConfirmed) {

                if (method != "cancel") {
                    let saveData = saveFormData(action, method, data, isObject, swalTitle);
                    saveData.then(res => {  
                        if (res) {
                            callback && callback();
                        } else {
                            Swal.fire({
                                icon: 'danger',
                                title: "Failed!",
                                text: result[1],
                                showConfirmButton: false,
                                timer: 2000
                            })
                        }
                    })
                } else {
                    Swal.fire({
                        icon:  'success',
                        title: swalTitle,
                        showConfirmButton: false,
                        timer: 2000
                    });
                }

            } else {

                containerID && $("#"+containerID).show();
                $("#"+modalID).modal("show");
            }
        });
    } else {
        showNotification("danger", "Invalid arguments!");
    }

}
// ----- END FORM/DOCUMENT CONFIRMATION -----


// ----- CANCEL FORM -----
function cancelForm(
    method      = "",
    action      = "",
    title       = "",
    modalID     = "",
    containerID = "",
    data        = null,
    isObject    = true,
    callback    = false) {

    if (method && action && title && (modalID || containerID)) {

        $("#"+modalID).modal("hide");

        Swal.fire({
            title: `SAVE AS DRAFT`, 
            text: `Do you want to save your changes for filing this ${title.toLowerCase()}?`,
            imageUrl: `${base_url}assets/modal/add.svg`,
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: 'Custom image',
            showCancelButton: true,
            confirmButtonColor: '#28a745',
            cancelButtonColor: '#1A1A1A',
            cancelButtonText: 'No',
            confirmButtonText: 'Yes',
            allowOutsideClick: false
        }).then((result) => {
            if (result.isConfirmed) {
    
                const validate = validateForm(modalID);
                if (validate) {
    
                    let saveData = saveFormData(action, method, data, isObject,  `SAVE ${title.toUpperCase()}`);
                    saveData.then(res => {  
                        if (res) {
                            callback && callback();
                        } else {
                            Swal.fire({
                                icon: 'danger',
                                title: "Failed!",
                                text: result[1],
                                showConfirmButton: false,
                                timer: 2000
                            })
                        }
                    })
    
                } else {
                    $("#"+modalID).modal("show");
                }
    
            } else {
                $("#"+modalID).modal("hide");
            }
        });

    } else {
        showNotification("danger", "Invalid arguments");
    }

    
}
// ----- END CANCEL FORM -----


// ----- GET MODULE APPROVER -----
function getModuleApprover(moduleID = null) {
    // const getData = getTableData("gen_approval_setup_tbl", "")
    let approverID = "1|3|2";
    return approverID;
}
// ----- GET MODULE APPROVER -----


// ----- IS IM APPROVER -----
function isImApprover(moduleApprover = null) {
    if (moduleApprover) {
        const moduleApproverArr = moduleApprover.split("|");
        return moduleApproverArr.find(id => id === sessionID) ? true : false;
    }
    return false;
}
// ----- END IS IM APPROVER -----


// ----- CURRENT APPROVER -----
function isCurrentApprover(moduleApprover = null, approverDate = null) {
    if (moduleApprover && approverDate) {
        const index = approverDate ? approverDate.split("|").length+1 : 1;
        const moduleApproverArr = moduleApprover.split("|");
        const approver = moduleApproverArr[index-1];
        return approver === sessionID ? true : false;
    }
    return false;
}
// ----- END CURRENT APPROVER -----


// ----- BADGE STATUS -----
function getStatusStyle(status = 1) {
    switch(status) {
        case '1':
            return `<span class="badge badge-outline-info w-100">For Approval</span>`;
        case '2':
            return `<span class="badge badge-info w-100">Approved</span>`;
        case '3':
            return `<span class="badge badge-danger w-100">Rejected</span>`;
        case '4':
            return `<span class="badge badge-primary w-100">Cancelled</span>`;
        case '0':
        default:
            return `<span class="badge badge-warning w-100">Draft</span>`;
    }
}
// ----- END BADGE STATUS -----


// ----- FORM BUTTONS -----
// function getFormButton(status) {
//     switch(status) {
//         case 1:
//         case 2:
//         case 3:
//         case 4:
//             return `<button class="btn btn-view"><i class="fas fa-eye"></i> View</button>`;
//             return `<span class="badge badge-danger w-100">Rejected</span>`;
//             return `<span class="badge badge-info w-100">Approved</span>`;
//             return `<span class="badge badge-primary w-100">Cancelled</span>`;
//         case 0:
//         default:
//             return `<span class="badge badge-warning w-100">Draft</span>`;
//     }
// }
// ----- END FORM BUTTONS -----