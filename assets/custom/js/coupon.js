$(document).ready(function () {
    $("input[name='opttype']").change(function(){
        opt  = $(this).val();
        todo = $(this).attr('todo');

        // ACCOMMODATION TYPE
        if(opt=='radroomtype'){
            $.each($("input[name='"+todo+"_amenity']"), function(){     
                $(this).prop('checked',false);
            });

            $("#"+todo+"_roomtype").prop('required',true);

            $("button[data-id='"+todo+"_roomtype']").removeClass('disabled');
            $("button[data-id='"+todo+"_coupontype']").removeClass('disabled');
            $('.listamenities').addClass('disableddiv');

            if(todo=='edit'){
                var arrRoom = $("#update").attr("roomtype").split("|");
                $("#edit_roomtype").val(arrRoom).trigger("change");
            }
        }

        // AMENITIES
        else{
            $("#"+todo+"_roomtype").val('').trigger("change");
            $("li.selected").removeClass('selected');

            $("#"+todo+"_roomtype").removeAttr('required');
            $("#"+todo+"_coupontype").val('1').trigger("change");
            $("#"+todo+"_couponvalue").val('1');

            $("button[data-id='"+todo+"_roomtype']").addClass('disabled');
            $("button[data-id='"+todo+"_coupontype']").addClass('disabled');
            $('.listamenities').removeClass('disableddiv');

            if(todo=='edit'){
                var arrAmenity = $("#update").attr("couponamenities").split("|");
                for(var i=0;i<arrAmenity.length;i++){
                    $.each($("input[name='edit_amenity']"), function(){   
                        if(arrAmenity[i]==$(this).data('id')){
                            $(this).prop('checked',true);
                            return false;  
                        }
                    }); 
                }
            }
        }

        $('#'+todo+'_couponvalue').val('');
    });

    $(document).on("change", "select.add_coupontype", function(e) {
        var couponType = $(this).val();
        var outputHtml = '';

        if(couponType=='1'){
            outputHtml = '<div class="input-group-prepend">' + 
                            '<span class="input-group-text">%</span>' +
                        '</div>' +
                        '<input type="text" class="text-right form-control currency couponvalue" value="0.00" min="1" max="100"  placeholder="0.00" name="add_couponvalue" id="add_couponvalue" todo="add" autocomplete="off" required></input>';

        }else{
            outputHtml = '<div class="input-group-prepend">' + 
                            '<span class="input-group-text">₱</span>' +
                        '</div>' +
                        '<input type="text" class="text-right form-control currency couponvalue" value="0.00" min="1" placeholder="0.00" name="add_couponvalue" id="add_couponvalue" todo="add" autocomplete="off" required></input>';
        }
        
        $('.show_add_couponvalue').html(outputHtml);

        $(".currency").inputmask({
            alias:           'decimal', 
            groupSeparator:  ',', 
            autoGroup:       true, 
            digits:          2, 
            digitsOptional:  false, 
            prefix:          ' ', 
            placeholder:     '0.00', 
            showMaskOnHover: false, 
            rightAlign:      false, 
            showMaskOnFocus: false
        });
    });

    $(document).on("change", "select.edit_coupontype", function(e) {
        var couponType = $(this).val();
        var outputHtml = '';

        if(couponType=='1'){
            outputHtml = '<div class="input-group-prepend">' + 
                            '<span class="input-group-text">%</span>' +
                        '</div>' +
                        '<input type="text" class="text-right form-control currency couponvalue" value="0.00" min="1" max="100"  placeholder="0.00" name="edit_couponvalue" id="edit_couponvalue" todo="edit" autocomplete="off" required></input>';

        }else{
            outputHtml = '<div class="input-group-prepend">' + 
                            '<span class="input-group-text">₱</span>' +
                        '</div>' +
                        '<input type="text" class="text-right form-control currency couponvalue" value="0.00" min="1" placeholder="0.00" name="edit_couponvalue" id="edit_couponvalue" todo="edit" autocomplete="off" required></input>';
        }
        
        $('.show_edit_couponvalue').html(outputHtml);

        $(".currency").inputmask({
            alias:           'decimal', 
            groupSeparator:  ',', 
            autoGroup:       true, 
            digits:          2, 
            digitsOptional:  false, 
            prefix:          ' ', 
            placeholder:     '0.00', 
            showMaskOnHover: false, 
            rightAlign:      false, 
            showMaskOnFocus: false
        });
    });

    $('#add_coupon_modal').on('show.bs.modal', function () {
        $('.add_coupontype').trigger("change");
    });

    $('#edit_coupon_modal').on('shown.bs.modal', function(){
        $("#edit_couponname").focus(); 
    });
    
    $('#add_coupon_modal').on('hidden.bs.modal', function () {
        $('.bootstrap-select').removeClass('is-invalid');
    });

    $(document).on("click", ".bootstrap-select", function() {
        var select = $(this).prop('className').split(' ')[3];

        $("."+select).removeClass('has-error');
        $("."+select+'-error').html('');
        $("#"+select+'-error').css('display','none');

        $("#update").attr('roomtype',$("#"+select).val());
    })

    $(document).on("changed.bs.select", "#add_roomtype", function() {
        var select = $(this).prop('className').split(' ')[1];

        $("."+select).removeClass('has-error');
        $("."+select+'-error').html('');
        $("#"+select+'-error').css('display','none');

        $("#update").attr('roomtype',$("#"+select).val());
    })

    $('#add_validation').validate({
        highlight: function (input) {
            $(input).parents('.input-group').addClass('has-danger');
            $(input).addClass('is-invalid');
        },
        unhighlight: function (input) {
            $(input).parents('.input-group').removeClass('has-danger');
            $(input).removeClass('is-invalid');
        },
        errorPlacement: function (error, element) {
            $(element).parents('.form-group').append(error);
        },
        submitHandler: function(form) {
            const action = $($(this)[0].submitButton).data('action');  

            $("#"+action+"_coupon_modal").modal("hide");
            $("#confirmation-"+action+"_coupon_modal").modal("show");
        }
    });

    $('#edit_validation').validate({
        highlight: function (input) {
            $(input).parents('.input-group').addClass('has-danger');
            $(input).addClass('is-invalid');
        },
        unhighlight: function (input) {
            $(input).parents('.input-group').removeClass('has-danger');
            $(input).removeClass('is-invalid');
        },
        errorPlacement: function (error, element) {
            $(element).parents('.form-group').append(error);
        },
        submitHandler: function(form) {
            const action = $($(this)[0].submitButton).data('action');  

            $("#"+action+"_coupon_modal").modal("hide");
            $("#confirmation-"+action+"_coupon_modal").modal("show");
        }
    });

    // ---- DATATABLES ----
    couponTable();
    function couponTable() {
        if ($.fn.DataTable.isDataTable('#couponTable')){
            $('#couponTable').DataTable().destroy();
        }
        
        var table = $("#couponTable").css({"min-width": "100%"}).removeAttr('width').DataTable({
            proccessing:   false,
            serverSide:    false,
            scrollX:        true,
            scrollCollapse: true,
            columnDefs: [
                { targets: 0, width: '10%' },
                { targets: 1, width: '15%' },
                { targets: 2, width: '15%' },
                { targets: 3, width: '20%' },
                { targets: 4, width: '10%' },
                { "className": "align-right", targets: 5, width: '10%' },
                { targets: 6, width: '10%' },
                { targets: 7, width: '10%' },
            ],
            ajax: {
                url:         "coupon/getCoupon",
                cache:       false,
                method:      "POST",
                contentType: "application/json; charset=utf-8",
                dataType:    "json",
                dataSrc: function (response) {
                    return response;
                },
            },
        });
    }
    // ---- END DATATABLES ----

    // ----- RESET FORMS -----
    function resetForms() {
        const todos = ["add", "edit"];
        for(var i=0; i<todos.length; i++) {
            const todo = todos[i];
            let arrayElem = [
                todo+"_couponname",
                todo+"_coupondesc",
                todo+"_couponpromocode",
                todo+"_roomtype",
                todo+"_coupontype",
                todo+"_couponvalue",
                todo+"_couponprice",
                todo+"_couponpricetype",
            ];

            arrayElem.map(item => {
                $("#"+item).removeClass("is-valid").removeClass("is-invalid");
                $("."+item).removeClass("has-error");

                $("#"+item).val("");
                $("#"+item+'-error').remove();

                $("select").selectpicker('refresh');
                $("#invalid-"+item).html("");
            })

            $.each($("input[name='"+todo+"_amenity']"), function(){     
                $(this).prop('checked',false);
            }); 

            if(todo=='add'){
                $("#add_radroomtype").prop("checked", true).change();
                $("#add_couponrange").val(moment().format('LL') + ' - ' + moment().add(24, 'hour').format('LL'));
                $("#add_couponrange").data('daterangepicker').startDate = moment().startOf('hour');
                $("#add_couponrange").data('daterangepicker').endDate = moment().startOf('hour').add(24, 'hour');
                $("#add_couponrange").data('daterangepicker').updateView();
                $("#add_couponrange").data('daterangepicker').updateCalendars();
            }
        }

        $("#edit_status").attr("disabled",false);
        $("#edit_slider_status").removeClass('disabled');
        $("#add_status").prop("checked", 1);
    }
    // ----- END RESET FORMS -----


    // ---- CLOSE MODAL -----
    function closeModal() {
        $("#add_coupon_modal").modal("hide");
        $("#edit_coupon_modal").modal("hide");
        $("#confirmation-add_coupon_modal").modal("hide");
        $("#confirmation-edit_coupon_modal").modal("hide");
    }
    $(document).on("click", ".btn_close_modal", function() {
        resetForms();
    })
    // ---- END CLOSE MODAL -----

    // ----- GET USER COUPON DATA -----
    function getCouponData(todo) {
        const couponname        = $("#"+todo+"_couponname").val();
        const coupondesc        = $("#"+todo+"_coupondesc").val();
        const couponrange       = $("#"+todo+"_couponrange").val();
        const couponpromocode   = $("#"+todo+"_couponpromocode").val();
        const roomtype          = $("#"+todo+"_roomtype").val().join('|');
        const coupontype        = $("#"+todo+"_coupontype").val();
        const couponvalue       = $("#"+todo+"_couponvalue").val().split(",").join("");
        const couponpricetype   = $("#"+todo+"_couponpricetype").val();
        const couponprice       = $("#"+todo+"_couponprice").val().split(",").join("");
        const status            = $("#"+todo+"_status").prop("checked") ? 1 : 0;
        var   couponamenities   = '';

        $.each($("input[name='"+todo+"_amenity']:checked"), function(){     
            if(couponamenities==''){
                couponamenities+=$(this).data('id');
            }else{
                couponamenities+="|"+$(this).data('id');
            }   
        }); 

        const data = {
            couponname, coupondesc, couponrange, couponpromocode, roomtype, coupontype, couponvalue, couponpricetype, couponprice, couponamenities, status
        };
        return data;
    }
    // ----- END GET COUPON DATA -----
    
    // ----- SAVE/UPDATE COUPON -----
    function saveCouponData(data) {

        $.ajax({
            url:    "coupon/saveCouponData",
            method: "POST",
            data,
            dataType: 'json',
            success: function(data) {
                let result = data.split("|");
                
                if (result[0] == "false") {
                    showNotification('danger',result[1]);
                } else {
                    showNotification('success',result[1]);
                    closeModal();
                    resetForms();
                    couponTable();
                }
            }
        })
    }

    $(document).on("click", "#btn_save_confirmation_add", function() {
        const data = getCouponData("add");
        saveCouponData(data);
    })

    $(document).on("click", ".btn_close_confirmation_add", function() {
        $("#confirmation-add_coupon_modal").modal("hide");
        $("#add_coupon_modal").modal("show");
    })

    $(document).on("click", ".btn_close_confirmation_edit", function() {
        $("#confirmation-edit_coupon_modal").modal("hide");
        $("#edit_coupon_modal").modal("show");
    })

    // ----- EDIT USER COUPON -----
    $(document).on("click", ".btn_edit_coupon", function() {
        const couponid          = $(this).attr("couponid");
        const couponcode        = $(this).attr("couponcode");
        const couponname        = $(this).attr("couponname");
        const coupondesc        = $(this).attr("coupondesc");
        const couponfrom        = $(this).attr("couponfrom");
        const couponto          = $(this).attr("couponto");
        const couponpromocode   = $(this).attr("couponpromocode");
        const roomtype          = $(this).attr("roomtype");
        const coupontype        = $(this).attr("coupontype");
        const couponvalue       = $(this).attr("couponvalue");
        const couponpricetype   = $(this).attr("couponpricetype");
        const couponprice       = $(this).attr("couponprice");
        const couponamenities   = $(this).attr("couponamenities");
        const status            = $(this).attr("status") == 1 ? true : false;
        
        // SET IN ATTR
        $("#update").attr("couponid", couponid);
        $("#update").attr("couponcode", couponcode);
        $("#update").attr("couponname", couponname);
        $("#update").attr("coupondesc", coupondesc);
        $("#update").attr("couponfrom", couponfrom);
        $("#update").attr("couponto", couponto);
        $("#update").attr("couponpromocode", couponpromocode);
        $("#update").attr("roomtype", roomtype);
        $("#update").attr("coupontype", coupontype);
        $("#update").attr("couponvalue", couponvalue);
        $("#update").attr("couponpricetype", couponpricetype);
        $("#update").attr("couponprice", couponprice);
        $("#update").attr("couponamenities", couponamenities);

        // DISPLAY
        if(roomtype!=''){
            $("#edit_radroomtype").prop("checked", true).change();
        }else{
            $("#edit_radamenities").prop("checked", true).change();
        }

        $("#edit_couponname").val(couponname);
        $("#edit_coupondesc").val(coupondesc);

        $("#edit_couponrange").val(moment(couponfrom).format('LL') + " - " + moment(couponto).format('LL'));
        $("#edit_couponrange").data('daterangepicker').startDate = moment(couponfrom, "YYYY-MM-DD" );
        $("#edit_couponrange").data('daterangepicker').endDate = moment(couponto, "YYYY-MM-DD" );
        $( "#edit_couponrange" ).data('daterangepicker').updateView();
        $( "#edit_couponrange" ).data('daterangepicker').updateCalendars();

        $("#edit_couponpromocode").val(couponpromocode);
        $("#edit_coupontype").val(coupontype).trigger("change");
        $("#edit_couponvalue").val(couponvalue);
        $("#edit_couponpricetype").val(couponpricetype).trigger("change");
        $("#edit_couponprice").val(couponprice);
        
        var arrRoom = roomtype.split("|");
        $("#edit_roomtype").val(arrRoom).trigger("change");

        var arrAmenity = couponamenities.split("|");

        for(var i=0;i<arrAmenity.length;i++){
            $.each($("input[name='edit_amenity']"), function(){   
                if(arrAmenity[i]==$(this).data('id')){
                    $(this).prop('checked',true);
                    return false;  
                }
            }); 
        }
        
        $("#edit_status").prop("checked", status);

        // SHOW MODAL
        $("#edit_coupon_modal").modal("show");
    })
    // ----- END EDIT USER COUPON -----

    $(document).on("click", "#update", function() {
        const couponid          = $(this).attr("couponid");
        const couponcode        = $(this).attr("couponcode");
        const couponname        = $(this).attr("couponname");
        const coupondesc        = $(this).attr("coupondesc");
        const couponrange       = $(this).attr("couponrange");
        const couponpromocode   = $(this).attr("couponpromocode");
        const roomtype          = $(this).attr("roomtype");
        const coupontype        = $(this).attr("coupontype");
        const couponvalue       = $(this).attr("couponvalue");
        const couponpricetype   = $(this).attr("couponpricetype");
        const couponprice       = $(this).attr("couponprice");
        var   couponamenities   = '';

        $.each($("input[name='edit_amenity']:checked"), function(){     
            if(couponamenities==''){
                couponamenities+=$(this).data('id');
            }else{
                couponamenities+="|"+$(this).data('id');
            }   
        }); 

        $("#btn_save_confirmation_edit").attr("couponid", couponid);
        $("#btn_save_confirmation_edit").attr("couponcode", couponcode);
        $("#btn_save_confirmation_edit").attr("couponname", couponname);
        $("#btn_save_confirmation_edit").attr("coupondesc", coupondesc);
        $("#btn_save_confirmation_edit").attr("couponrange", couponrange);
        $("#btn_save_confirmation_edit").attr("couponpromocode", couponpromocode);
        $("#btn_save_confirmation_edit").attr("roomtype", roomtype);
        $("#btn_save_confirmation_edit").attr("coupontype", coupontype);
        $("#btn_save_confirmation_edit").attr("couponvalue", couponvalue);
        $("#btn_save_confirmation_edit").attr("couponpricetype", couponpricetype);
        $("#btn_save_confirmation_edit").attr("couponprice", couponprice);
        $("#btn_save_confirmation_edit").attr("couponamenities", couponamenities);
    }) 
    // ----- END SAVE/UPDATE USER COUPON -----

    $(document).on("click", "#btn_save_confirmation_edit", function() {
        const couponid          = $(this).attr("couponid");
        const couponcode        = $(this).attr("couponcode");
        const data              = getCouponData("edit");

        data.couponid        = couponid;
        data.couponcode      = couponcode;
        saveCouponData(data);
    })
});