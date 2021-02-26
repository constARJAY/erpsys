$(document).ready(function () {
    var imgHall = "<?php echo base_url('pages/admin-assets/images/halls/'); ?>";

    let selectedImages = [],
        existingImages = [];

    initCarousel();
    function initCarousel() {
        $('.carousel').carousel({
            interval: 2000,
            // ride: true
        });
    }

    $(document).on("click", ".carousel-control-prev", function() {
        const hall = $(this).data("hall");
        $(`.carousel[data-hall="${hall}"]`).carousel('prev');
    });

    $(document).on("click", ".carousel-control-next", function() {
        const hall = $(this).data("hall");
        $(`.carousel[data-hall="${hall}"]`).carousel('next');
    });

    $('#edit_hall_modal').on('shown.bs.modal', function(){
        $("#edit_hallname").focus(); 
    });   

    $('#add_hall_modal').on('hidden.bs.modal', function () {
        $('.bootstrap-select').removeClass('is-invalid');
    });

    $(document).on("click", ".bootstrap-select", function() {
        var select = $(this).prop('className').split(' ')[3];
        
        $("."+select).removeClass('has-error');
        $("."+select+'-error').html('');
        $("#"+select+'-error').css('display','none');

        $("#add_hallname").attr('hallfloorid',$("#"+select).val());
    })

    $(document).on("click", "#save", function() {
        $('.nav-tabs a[href="#add_regularRate_modal"]').tab('show');
    });

    $(document).on("click", "#update", function() {
        $('.nav-tabs a[href="#edit_regularRate_modal"]').tab('show');
    });

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

            $("#"+action+"_hall_modal").modal("hide");
            $("#confirmation-"+action+"_hall_modal").modal("show");
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

            $("#"+action+"_hall_modal").modal("hide");
            $("#confirmation-"+action+"_hall_modal").modal("show");
        }
    });

    // ---- DATATABLES ----
    hallTable();
    function hallTable() {
        $.ajax({
            url:    "hall/getHall",
            method: "POST",
            dataType: 'html',
            success: function(data) {
                $(".hallTable").html(data);
                initCarousel();
            }
        });
    }
    // ---- END DATATABLES ----

    // ----- RESET FORMS -----
    function resetForms() {
        const todos = ["add", "edit"];
        for(var i=0; i<todos.length; i++) {
            const todo = todos[i];
            let arrayElem = [
                todo+"_hallname",
                todo+"_hallavail",
                todo+"_floor",
                todo+"_halldesc",
                todo+"_halldetails",
                todo+"_hallproperty",
                todo+"_hallaccommodation",
                todo+"_hallbathroom",
                todo+"_hallbedroom",
                todo+"_monday",
                todo+"_tuesday",
                todo+"_wednesday",
                todo+"_thursday",
                todo+"_friday",
                todo+"_saturday",
                todo+"_sunday",
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

            $.each($("input[name='"+todo+"_holiday']"), function(){     
                $(this).prop('checked',false);
            }); 
        }

        $('.hallimage').val('');
        $('.nav-tabs a[href="#add_regularRate_modal"]').tab('show');
        $('.nav-tabs a[href="#edit_regularRate_modal"]').tab('show');
        $("#edit_status").attr("disabled",false);
        $("#edit_slider_status").removeClass('disabled');
        $("#add_status").prop("checked", 1);

        selectedImages = [], existingImages = [];
        $("#add_images, #edit_images").empty();
        $("#add_icons, #edit_icons").empty();
        $("#add_hallicon").val('');
        $("#edit_hallicon").val('');
    }
    // ----- END RESET FORMS -----

    // ---- CLOSE MODAL -----
    function closeModal() {
        $("#add_hall_modal").modal("hide");
        $("#edit_hall_modal").modal("hide");
        $("#confirmation-add_hall_modal").modal("hide");
        $("#confirmation-edit_hall_modal").modal("hide");
    }
    $(document).on("click", ".btn_close_modal", function() {
        resetForms();
    })
    // ---- END CLOSE MODAL -----

    // ----- GET HALL DATA -----
    function getHallData(todo) {
        var formData = new FormData();
        const hallname          = $("#"+todo+"_hallname").val();
        const hallavail         = $("#"+todo+"_hallavail").val();
        const floor             = $("#"+todo+"_floor").val();
        const halldesc          = $("#"+todo+"_halldesc").val();
        const halldetails       = $("#"+todo+"_halldetails").val();
        const hallproperty      = $("#"+todo+"_hallproperty").val();
        const hallaccommodation = $("#"+todo+"_hallaccommodation").val();
        const hallbathroom      = $("#"+todo+"_hallbathroom").val();
        const hallbedroom       = $("#"+todo+"_hallbedroom").val();
        const monday            = $("#"+todo+"_monday").val().split(",").join("");
        const tuesday           = $("#"+todo+"_tuesday").val().split(",").join("");
        const wednesday         = $("#"+todo+"_wednesday").val().split(",").join("");
        const thursday          = $("#"+todo+"_thursday").val().split(",").join("");
        const friday            = $("#"+todo+"_friday").val().split(",").join("");
        const saturday          = $("#"+todo+"_saturday").val().split(",").join("");
        const sunday            = $("#"+todo+"_sunday").val().split(",").join("");
        const status            = $("#"+todo+"_status").prop("checked") ? 1 : 0;
        var   hallamenities     = '';
        var   hallholiday       = '';

        $.each($("input[name='"+todo+"_amenity']:checked"), function(){     
            if(hallamenities==''){
                hallamenities+=$(this).data('id');
            }else{
                hallamenities+="|"+$(this).data('id');
            }   
        }); 

        $.each($("input[name='"+todo+"_holiday']:checked"), function(){     
            if(hallholiday==''){
                hallholiday+=$(this).data('id');
            }else{
                hallholiday+="|"+$(this).data('id');
            }
        }); 

        formData.append('hallname', hallname);
        formData.append('hallavail', hallavail);
        formData.append('floor', floor);
        formData.append('halldesc', halldesc);
        formData.append('halldetails', halldetails);
        formData.append('hallproperty', hallproperty);
        formData.append('hallaccommodation', hallaccommodation);
        formData.append('hallbathroom', hallbathroom);
        formData.append('hallbedroom', hallbedroom);
        formData.append('monday', monday);
        formData.append('tuesday', tuesday);
        formData.append('wednesday', wednesday);
        formData.append('thursday', thursday);
        formData.append('friday', friday);
        formData.append('saturday', saturday);
        formData.append('sunday', sunday);
        formData.append('status', status);
        formData.append('hallamenities', hallamenities);
        formData.append('hallholiday', hallholiday);
        // const data = {
        //     hallname, halldesc, halldetails, hallproperty, hallaccommodation, hallbathroom, hallbedroom, hallprice, hallamenities, status
        // };
        return formData;
    }
    // ----- END GET HALL DATA -----
    
    // ----- SAVE/UPDATE HALL -----
    function saveHallData(data) {
        $("#loader").show("400", function() {
            $.ajax({
                url:    "hall/saveHallData",
                method: "POST",
                data:data,
                contentType: false,
                processData: false,
                cache:false,
                async:false,
                dataType: 'json',
                success: function(data) {
                    let result = data.split("|");
                    
                    if (result[0] == "false") {
                        showNotification('danger',result[1]);
                    } else {
                        $("#loader").hide();
                        showNotification('success',result[1]);
                        closeModal();
                        resetForms();
                        hallTable();
                    }
                }
            });
        });
    }

    $(document).on("click", "#btn_save_confirmation_add", function() {
        const data = getHallData("add");
        selectedImages.forEach(image => {
            data.append('image[]', image); 
        })
        data.append('icon', $('#add_hallicon')[0].files[0]); 
        saveHallData(data);
    })

    $(document).on("click", ".btn_close_confirmation_add", function() {
        $("#confirmation-add_hall_modal").modal("hide");
        $("#add_hall_modal").modal("show");
    })

    $(document).on("click", ".btn_close_confirmation_edit", function() {
        $("#confirmation-edit_hall_modal").modal("hide");
        $("#edit_hall_modal").modal("show");
    });

    // ----- EDIT HALL -----
    $(document).on("click", ".btn_edit_hall", function() {
        const hallid            = $(this).attr("hallid");
        const hallcode          = $(this).attr("hallcode");
        const hallname          = $(this).attr("hallname");
        const hallavail         = $(this).attr("hallavail");
        const floor             = $(this).attr("floor");
        const halldesc          = $(this).attr("halldesc");
        const halldetails       = $(this).attr("halldetails");
        const hallproperty      = $(this).attr("hallproperty");
        const hallaccommodation = $(this).attr("hallaccommodation");
        const hallbathroom      = $(this).attr("hallbathroom");
        const hallbedroom       = $(this).attr("hallbedroom");
        const monday            = $(this).attr("monday");
        const tuesday           = $(this).attr("tuesday");
        const wednesday         = $(this).attr("wednesday");
        const thursday          = $(this).attr("thursday");
        const friday            = $(this).attr("friday");
        const saturday          = $(this).attr("saturday");
        const sunday            = $(this).attr("sunday");
        const hallimage         = $(this).attr("hallimage");
        const hallicon          = $(this).attr("hallicon");
        const hallamenities     = $(this).attr("hallamenities");
        const hallholiday       = $(this).attr("hallholiday");
        const status            = $(this).attr("status") == 1 ? true : false;

        const images = hallimage ? hallimage.split("|") : false;
        const icon   = hallicon ? hallicon : false;

        // SET IN ATTR
        $("#update").attr("hallid", hallid);
        $("#update").attr("hallcode", hallcode);
        $("#update").attr("hallname", hallname);
        $("#update").attr("hallavail", hallavail);
        $("#update").attr("floor", floor);
        $("#update").attr("halldesc", halldesc);
        $("#update").attr("halldetails", halldetails);
        $("#update").attr("hallproperty", hallproperty);
        $("#update").attr("hallaccommodation", hallaccommodation);
        $("#update").attr("hallbathroom", hallbathroom);
        $("#update").attr("hallbedroom", hallbedroom);        
        $("#update").attr("monday", monday);
        $("#update").attr("tuesday", tuesday);
        $("#update").attr("wednesday", wednesday);
        $("#update").attr("thursday", thursday);
        $("#update").attr("friday", friday);
        $("#update").attr("saturday", saturday);
        $("#update").attr("sunday", sunday);
        $("#update").attr("hallimage", hallimage);
        $("#update").attr("hallamenities", hallamenities);
        $("#update").attr("hallholiday", hallholiday);

        // DISPLAY
        $("#edit_hallname").val(hallname);
        $("#edit_halldesc").val(halldesc);
        $("#edit_hallavail").val(hallavail);
        $("#edit_floor").val(floor).trigger("change");
        $("#edit_halldetails").val(halldetails);
        $("#edit_hallproperty").val(hallproperty);
        $("#edit_hallaccommodation").val(hallaccommodation);
        $("#edit_hallbathroom").val(hallbathroom);
        $("#edit_hallbedroom").val(hallbedroom);
        $("#edit_monday").val(monday);
        $("#edit_tuesday").val(tuesday);
        $("#edit_wednesday").val(wednesday);
        $("#edit_thursday").val(thursday);
        $("#edit_friday").val(friday);
        $("#edit_saturday").val(saturday);
        $("#edit_sunday").val(sunday);

        var arrAmenity = hallamenities.split("|");

        for(var i=0;i<arrAmenity.length;i++){
            $.each($("input[name='edit_amenity']"), function(){   
                if(arrAmenity[i]==$(this).data('id')){
                    $(this).prop('checked',true);
                    return false;  
                }
            }); 
        }

        var arrHoliday = hallholiday.split("|");

        for(var i=0;i<arrHoliday.length;i++){
            $.each($("input[name='edit_holiday']"), function(){   
                if(arrHoliday[i]==$(this).data('id')){
                    $(this).prop('checked',true);
                    return false;  
                }
            }); 
        }

        if (images) {
            let html = "";
            images.forEach(image => {
                html += `
                <div class="col-md-4 col-sm-12 p-2 selectedimages" style="position: relative;">
                    <div class="close btnRemoveImage" 
                        saved="true" 
                        image="${image}"
                        style="
                            position: absolute;
                            top: 5;
                            left: 89%;
                            cursor: pointer;">x</div>
                    <img src="${base_url+"pages/admin-assets/images/halls/"+image}" style="width: 100%; height: 180px; max-width: auto;">
                </div>`;

                existingImages.push(image);
            });

            $("#edit_images").html(html);
        }
        imagesIndex();

        if (icon) {
            let html = `
                <div class="col-md-4 col-sm-12 p-2" style="position: relative;">
                    <img src="${base_url+"pages/admin-assets/images/halls/"+icon}" style="width: 100%; height: 180px; max-width: auto;">
                </div>`;
            $("#edit_icons").html(html);
        }
        
        $("#edit_status").prop("checked", status);
        // SHOW MODAL
        $("#edit_hall_modal").modal("show");
    })
    // ----- END EDIT HALL -----

    $(document).on("click", "#update", function() {
        const hallid            = $(this).attr("hallid");
        const hallcode          = $(this).attr("hallcode");
        const hallavail         = $(this).attr("hallavail");
        const floor             = $(this).attr("floor");
        const hallname          = $(this).attr("hallname");
        const halldetails       = $(this).attr("halldetails");
        const halldesc          = $(this).attr("halldesc");
        const hallproperty      = $(this).attr("hallproperty");
        const hallaccommodation = $(this).attr("hallaccommodation");
        const hallbathroom      = $(this).attr("hallbathroom");
        const hallbedroom       = $(this).attr("hallbedroom");
        const monday            = $(this).attr("monday");
        const tuesday           = $(this).attr("tuesday");
        const wednesday         = $(this).attr("wednesday");
        const thursday          = $(this).attr("thursday");
        const friday            = $(this).attr("friday");
        const saturday          = $(this).attr("saturday");
        const sunday            = $(this).attr("sunday");
        const hallimage         = $(this).attr("hallimage");
        var   hallamenities     = '';
        var   hallholiday       = '';

        $.each($("input[name='edit_amenity']:checked"), function(){     
            if(hallamenities==''){
                hallamenities+=$(this).data('id');
            }else{
                hallamenities+='|'+$(this).data('id');
            }   
        });

        $.each($("input[name='edit_holiday']:checked"), function(){     
            if(hallholiday==''){
                hallholiday+=$(this).data('id');
            }else{
                hallholiday+='|'+$(this).data('id');
            }
        });

        $("#btn_save_confirmation_edit").attr("hallid", hallid);
        $("#btn_save_confirmation_edit").attr("hallcode", hallcode);
        $("#btn_save_confirmation_edit").attr("hallavail", hallavail);
        $("#btn_save_confirmation_edit").attr("floor", floor);
        $("#btn_save_confirmation_edit").attr("hallname", hallname);
        $("#btn_save_confirmation_edit").attr("halldetails", halldetails);
        $("#btn_save_confirmation_edit").attr("halldesc", halldesc);
        $("#btn_save_confirmation_edit").attr("hallproperty", hallproperty);
        $("#btn_save_confirmation_edit").attr("hallaccommodation", hallaccommodation);
        $("#btn_save_confirmation_edit").attr("hallbathroom", hallbathroom);
        $("#btn_save_confirmation_edit").attr("hallbedroom", hallbedroom);
        $("#btn_save_confirmation_edit").attr("monday", monday);
        $("#btn_save_confirmation_edit").attr("tuesday", tuesday);
        $("#btn_save_confirmation_edit").attr("wednesday", wednesday);
        $("#btn_save_confirmation_edit").attr("thursday", thursday);
        $("#btn_save_confirmation_edit").attr("friday", friday);
        $("#btn_save_confirmation_edit").attr("saturday", saturday);
        $("#btn_save_confirmation_edit").attr("sunday", sunday);
        $("#btn_save_confirmation_edit").attr("hallimage", hallimage);
        $("#btn_save_confirmation_edit").attr("hallamenities", hallamenities);
        $("#btn_save_confirmation_edit").attr("hallholiday", hallholiday);
    }) 
    // ----- END SAVE/UPDATE HALL -----

    $(document).on("click", "#btn_save_confirmation_edit", function() {
        const hallid       = $(this).attr("hallid");
        const hallcode     = $(this).attr("hallcode");
        const hallimage    = $(this).attr("hallimage");
        const data         = getHallData("edit");

        data.append('hallid', hallid);
        data.append('hallcode', hallcode);
        data.append('hallimage', hallimage);
        selectedImages.forEach(image => {
            data.append('image[]', image); 
        })
        data.append("savedimages", existingImages.join("|"));
        data.append('icon', $('#edit_hallicon')[0].files[0]); 

        saveHallData(data);
    })


    // ----- SELECT HALL IMAGE -----
    function imagesIndex() {
        $(".selectedimages").each(function(i) {
            $(this).children().attr("index", i);
        })
    }

    $(document).on("change", ".hallicon", function(e) {
        const action    = $(this).attr("todo");
        const iconID   = action == "add" ? "add_hallicon" : "edit_hallicon";
        const contentID = action == "add" ? "add_icons" : "edit_icons";
        const objectURL = URL.createObjectURL(e.target.files[0]);
        let html = `
            <div class="col-md-4 col-sm-12 p-2" style="position: relative;">
                <img src="${objectURL}" style="width: 100%; height: 180px; max-width: auto;">
            </div><hr>`;
        html && $("#"+contentID).html(html);
    })

    $(document).on("change", ".hallimage", function(e) {
        const action    = $(this).attr("todo");
        const imageID   = action == "add" ? "add_hallimage" : "edit_hallimage";
        const contentID = action == "add" ? "add_images" : "edit_images";
        const images    = document.getElementById(imageID);
        const imagesLength = images.files.length;

        for(var i=0; i<imagesLength; i++) {
            let html = '';

            let img = new Image();
            let objectURL = URL.createObjectURL(e.target.files[i]);
            let imageFile = $('#'+imageID)[0].files[i];

            img.src = objectURL;
            img.onload = function() {
                let width  = this.width;  // 800px
                let height = this.height; // 540px

                if ((width < 1010 || width > 1030) || (height < 670 || height > 690)) {
                    showNotification("danger", "Invalid image size. <br><small>Height: 1010px-1030px<br>Width: 670px-690px</small>");
                } else {
                    html += `
                    <div class="col-md-4 col-sm-12 p-2 selectedimages" style="position: relative;">
                        <div class="close btnRemoveImage" 
                            style="
                                position: absolute;
                                top: 5;
                                left: 89%;
                                cursor: pointer;">x</div>
                        <img src="${objectURL}" style="width: 100%; height: 180px; max-width: auto;">
                    </div>`;

                    selectedImages.push(imageFile);
                }
                html && $("#"+contentID).append(html);
                imagesIndex();
            }
        }

        $(this).val("");
    })
    // ----- END SELECT HALL IMAGE -----


    // ----- DELETE SELECTED IMAGE -----
    $(document).on("click", ".btnRemoveImage", function() {
        const index = $(this).attr("index");
        const saved = $(this).attr("saved");
        const image = $(this).attr("image");
        if (saved) {
            const imageIndex = existingImages.indexOf(image);
            imageIndex != -1 && existingImages.splice(imageIndex, 1);
        } else {
            selectedImages = selectedImages.splice(index, 1);
        }
        $(this).parent().remove();
        imagesIndex();
    })
    // ----- END DELETE SELECTED IMAGE -----

});