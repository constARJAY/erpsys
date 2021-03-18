$(function () {
    $('.jsdemo-notification-button button').on('click', function () {
        var placementFrom = $(this).data('placement-from');
        var placementAlign = $(this).data('placement-align');
        var animateEnter = $(this).data('animate-enter');
        var animateExit = $(this).data('animate-exit');
        var colorName = $(this).data('color-name');

        // showNotification(colorName, null, placementFrom, placementAlign, animateEnter, animateExit);
        showNotification(colorName, null);
    });
});

// function showNotification(colorName, text, placementFrom, placementAlign, animateEnter, animateExit) {
//     function showNotification(colorName,msg) {
//         var placementFrom='top';
//         var placementAlign='right';
//         var animateEnter='';
//         var animateExit='';
//         var text='';

//         text ='<div class="alert-icon">' + 
//                 '<i class="zmdi zmdi-shield-check"></i> ' + msg +
//               '</div>'; 

//     if (colorName === null || colorName === '') { colorName = ''; }    
//     if (animateEnter === null || animateEnter === '') { animateEnter = 'animated fadeInDown'; }
//     if (animateExit === null || animateExit === '') { animateExit = 'animated fadeOutUp'; }
//     var allowDismiss = true;
    
//     $.notify({
//         message: text
//     },
//         {
//             type: colorName,
//             allow_dismiss: allowDismiss,
//             newest_on_top: true,
//             delay: 0,
//             timer: 100000,
//             placement: {
//                 from: placementFrom,
//                 align: placementAlign
//             },
//             animate: {
//                 enter: animateEnter,
//                 exit: animateExit
//             },
//             template: '<div data-notify="container" class="bootstrap-notify-container alert alert-dismissible {0} ' + (allowDismiss ? "p-r-35" : "") + '" role="alert">' +
//             '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
//             '<span data-notify="icon"></span> ' +
//             '<span data-notify="title">{1}</span> ' +
//             '<span data-notify="message">{2}</span>' +
//             '<div class="progress" data-notify="progressbar">' +
//             '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
//             '</div>' +
//             '<a href="{3}" target="{4}" data-notify="url"></a>' +
//             '</div>'
//         });
// }
function showNotification(msgtype, msg) {
    var title_type = '';
    var icon_type  = '';

    if(msgtype=='danger'){
        title_type = 'ERROR!';
        icon_type  = 'fa fa-exclamation-circle';
    } else if (msgtype=='info') {
        title_type = 'NOTICE!';
        icon_type  = 'fa fa-exclamation-circle';
    } else{
        title_type = 'SUCCESS!';
        icon_type  = 'fa fa-check-circle';
    }

    $.notify({
        title: '<strong>'+title_type+'</strong><br>',
        message: msg,
        icon: icon_type
    },{
        type: msgtype
    });
}