$(function () {
    $('#form_validation').validate({
        rules: {
            'checkbox': {
                required: true
            },
            'gender': {
                required: true
            }
        },
        highlight: function (input) {
            $(input).parents('.form-line').addClass('error');
        },
        unhighlight: function (input) {
            $(input).parents('.form-line').removeClass('error');
        },
        errorPlacement: function (error, element) {
            $(element).parents('.form-group').append(error);
        }
    });

    //Advanced Form Validation
    $('.form_advanced_validation').validate({
        rules: {
            'date': {
                customdate: true
            },
            'creditcard': {
                creditcard: true
            },
            'currency': {
                currency: true
            },
            'departmentname': {
                departmentname: true
            },
            'designationname': {
                designationname: true
            },
            'floornum': {
                floornum: true
            },
            'hallavail': {
                hallavail: true
            },
            'roomtypeshort': {
                roomtypeshort: true
            },
            'roomtypename': {
                roomtypename: true
            },
            'amenitiesname': {
                amenitiesname: true
            }
        },
        highlight: function (input) {
            $(input).parents('.form-line').addClass('error');
        },
        unhighlight: function (input) {
            $(input).parents('.form-line').removeClass('error');
        },
        errorPlacement: function (error, element) {
            $(element).parents('.form-group').append(error);
        }
    });

    //Custom Validations ===============================================================================
    //Date
    $.validator.addMethod('customdate', function (value, element) {
        return value.match(/^\d\d\d\d?-\d\d?-\d\d$/);
    },
        'Please enter a date in the format YYYY-MM-DD.'
    );

    //Credit card
    $.validator.addMethod('creditcard', function (value, element) {
        return value.match(/^\d\d\d\d?-\d\d\d\d?-\d\d\d\d?-\d\d\d\d$/);
    },
        'Please enter a credit card in the format XXXX-XXXX-XXXX-XXXX.'
    );

    //Credit card
    $.validator.addMethod('currency', function (value, element) {
        if(parseFloat($(element).val())==0 && $(element).prop('required')) return false;
        else return true;
        
    },
        'This field is required.'
    );

    //Duplicate department record
    $.validator.addMethod('departmentname', function (value, element) {
        var departmentID   = $(element).attr('departmentid');
        var departmentName = $(element).val();
        var bool='';

        $.ajax({
            url:    "user_department/checkDuplicate",
            method: "POST",
            data: { departmentID:departmentID,
                    departmentName:departmentName
            },
            dataType: 'text',
            async:false,
            success: function(data) {
                if(data=='0') bool = true;
                else bool = false;
            },
            error: function(request, textStatus, error) {
                console.log(textStatus);
            }
        });
        return bool;
    },
        'Department name already exists!'
    );

    //Duplicate holiday record
    $.validator.addMethod('holidayname', function (value, element) {
        var holidayID   = $(element).attr('holidayid');
        var holidayName = $(element).val();
        var bool='';

        $.ajax({
            url:    "holiday/checkDuplicate",
            method: "POST",
            data: { holidayID:holidayID,
                    holidayName:holidayName
            },
            dataType: 'text',
            async:false,
            success: function(data) {
                if(data=='0') bool = true;
                else bool = false;
            },
            error: function(request, textStatus, error) {
                console.log(textStatus);
            }
        });
        return bool;
    },
        'Holiday name already exists!'
    );

    //Duplicate designationname record
    $.validator.addMethod('designationname', function (value, element) {
        var departmentID    = $(element).attr('departmentid');
        var designationID   = $(element).attr('designationid');
        var designationName = $(element).val();
        var bool='';
        if(departmentID){
            $.ajax({
                url:    "user_designation/checkDuplicate",
                method: "POST",
                data: { departmentID:departmentID,
                        designationID:designationID,
                        designationName:designationName
                },
                dataType: 'text',
                async:false,
                success: function(data) {
                    if(data=='0') bool = true;
                    else bool = false;
                },
                error: function(request, textStatus, error) {
                    console.log(textStatus);
                }
            });
            return bool;
        }else{
            return true;
        }
    },
        'Designation name already exists on the selected department!'
    );

    //Duplicate roomtypeshort record
    $.validator.addMethod('roomtypeshort', function (value, element) {
        
        var roomTypeID        = $(element).attr('roomtypeid');
        var roomtypeShortname = $(element).val();
        var bool='';
        
        $.ajax({
            url:    "room_type/checkDuplicateShortname",
            method: "POST",
            data: { roomtypeID:roomTypeID,
                    roomtypeShortname:roomtypeShortname
            },
            dataType: 'text',
            async:false,
            success: function(data) {
                if(data=='0') bool = true;
                else bool = false;
            },
            error: function(request, textStatus, error) {
                console.log(textStatus);
            }
        });
        return bool;
        
    },
        'Accommodation type code already exists!'
    );

    //Duplicate roomTypeName record
    $.validator.addMethod('roomtypename', function (value, element) {
        var roomTypeID   = $(element).attr('roomtypeid');
        var roomtypeName = $(element).val();
        var bool='';
        
        $.ajax({
            url:    "room_type/checkDuplicateName",
            method: "POST",
            data: { roomtypeID:roomTypeID,
                    roomtypeName:roomtypeName
            },
            dataType: 'text',
            async:false,
            success: function(data) {
                if(data=='0') bool = true;
                else bool = false;
            },
            error: function(request, textStatus, error) {
                console.log(textStatus);
            }
        });
        return bool;
        
    },
        'Accommodation type name already exists!'
    );

    //Duplicate hallname record
    $.validator.addMethod('hallname', function (value, element) {
        var hallListID  = $(element).attr('hallid');
        var hallFloorID = $(element).attr('hallfloorid');
        var hallName    = $(element).val();
        var bool='';

        if(hallFloorID){
            $.ajax({
                url:    "hall/checkDuplicate",
                method: "POST",
                data: { hallFloorID:hallFloorID,
                        hallListID:hallListID,
                        hallName:hallName
                },
                dataType: 'text',
                async:false,
                success: function(data) {
                    if(data=='0') bool = true;
                    else bool = false;
                },
                error: function(request, textStatus, error) {
                    console.log(textStatus);
                }
            });
            return bool;
        }else{
            return true;
        }
    },
        'Hall name already exists on the selected floor!'
    );

     //Duplicate floor record
     $.validator.addMethod('floornum', function (value, element) {
        var floorID   = $(element).attr('floorid');
        var floorNum  = $(element).val();
        var bool='';

        $.ajax({
            url:    "floor/checkDuplicate",
            method: "POST",
            data: { floorID:floorID,
                    floorNum:floorNum
            },
            dataType: 'text',
            async:false,
            success: function(data) {
                if(data=='0') bool = true;
                else bool = false;
            },
            error: function(request, textStatus, error) {
                console.log(textStatus);
            }
        });
        return bool;
    },
        'Floor number already exists!'
    );

    //Duplicate hallavail record
    $.validator.addMethod('hallavail', function (value, element) {
        var hallavail = $(element).val();
        var hour = hallavail.split(':')[0];
        var minutes = hallavail.split(':')[1];
        var bool='';

        if(parseInt(hour)==0 && parseInt(minutes)==0){
            return false;
        }

        if(parseInt(hour) > 24){
            return false;
        }

        if(parseInt(hour)==24 && parseInt(minutes)>0){
            return false;
        }

        if(parseInt(minutes) > 59){
            return false;
        }

        return true;
    },
        'Hall availabilty must be within 24:00 hours!'
    );

    //Duplicate department record
    $.validator.addMethod('amenitiesname', function (value, element) {
        var amenitiesID   = $(element).attr('amenitiesid');
        var amenitiesName = $(element).val();
        var bool='';

        $.ajax({
            url:    "amenities/checkDuplicate",
            method: "POST",
            data: { amenitiesID:amenitiesID,
                    amenitiesName:amenitiesName
            },
            dataType: 'text',
            async:false,
            success: function(data) {
                if(data=='0') bool = true;
                else bool = false;
            },
            error: function(request, textStatus, error) {
                console.log(textStatus);
            }
        });
        return bool;
    },
        'Amenity name already exists!'
    );
    //==================================================================================================
});