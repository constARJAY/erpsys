$(document).ready(function () {
    var imgRoom = "<?php echo base_url('pages/admin-assets/images/rooms/'); ?>";
    
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
        const roomtype = $(this).data("roomtype");
        $(`.carousel[data-roomtype="${roomtype}"]`).carousel('prev');
    });

    $(document).on("click", ".carousel-control-next", function() {
        const roomtype = $(this).data("roomtype");
        $(`.carousel[data-roomtype="${roomtype}"]`).carousel('next');
    });

    $('#edit_roomtype_modal').on('shown.bs.modal', function(){
        $("#edit_roomtypeshort").focus(); 
    });  

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

            $("#"+action+"_roomtype_modal").modal("hide");
            $("#confirmation-"+action+"_roomtype_modal").modal("show");
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

            $("#"+action+"_roomtype_modal").modal("hide");
            $("#confirmation-"+action+"_roomtype_modal").modal("show");
        }
    });

    // ---- DATATABLES ----
    roomtypeTable();
    function roomtypeTable() {
        $.ajax({
            url:    "room_type/getRoomType",
            method: "POST",
            dataType: 'html',
            success: function(data) {
                $(".roomTypeTable").html(data);
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
                todo+"_roomtypeshort",
                todo+"_roomtypename",
                todo+"_roomtypedesc",
                todo+"_roomtypedetails",
                todo+"_roomtypeproperty",
                todo+"_roomtypeaccommodation",
                todo+"_roomtypebathroom",
                todo+"_roomtypebedroom",
                todo+"_monday",
                todo+"_tuesday",
                todo+"_wednesday",
                todo+"_thursday",
                todo+"_friday",
                todo+"_saturday",
                todo+"_sunday"
            ];

            arrayElem.map(item => {
                $("#"+item).removeClass("is-valid").removeClass("is-invalid");
                $("."+item).removeClass("has-error");

                $("#"+item).val("");
                $("#"+item+'-error').remove();

                $("#invalid-"+item).html("");
            })

            $.each($("input[name='"+todo+"_amenity']"), function(){     
                $(this).prop('checked',false);
            }); 

            $.each($("input[name='"+todo+"_holiday']"), function(){     
                $(this).prop('checked',false);
            }); 
        }
        
        $('.roomimage').val('');
        $('.nav-tabs a[href="#add_regularRate_modal"]').tab('show');
        $('.nav-tabs a[href="#edit_regularRate_modal"]').tab('show');
        $("#edit_status").attr("disabled",false);
        $("#edit_slider_status").removeClass('disabled');
        $("#add_status").prop("checked", 1);

        selectedImages = [], existingImages = [];
        $("#add_images, #edit_images").empty();
        $("#add_roomicon").val('');
        $("#edit_roomicon").val('');
    }
    // ----- END RESET FORMS -----


    // ---- CLOSE MODAL -----
    function closeModal() {
        $("#add_roomtype_modal").modal("hide");
        $("#edit_roomtype_modal").modal("hide");
        $("#confirmation-add_roomtype_modal").modal("hide");
        $("#confirmation-edit_roomtype_modal").modal("hide");
    }
    $(document).on("click", ".btn_close_modal", function() {
        resetForms();
    })
    // ---- END CLOSE MODAL -----

    // ----- GET USER ACCOMMODATION TYPE DATA -----
    function getRoomtypeData(todo) {
        var formData = new FormData();
        const roomtypeshort         = $("#"+todo+"_roomtypeshort").val();
        const roomtypename          = $("#"+todo+"_roomtypename").val();
        const roomtypedesc          = $("#"+todo+"_roomtypedesc").val();
        const roomtypedetails       = $("#"+todo+"_roomtypedetails").val();
        const roomtypeproperty      = $("#"+todo+"_roomtypeproperty").val();
        const roomtypeaccommodation = $("#"+todo+"_roomtypeaccommodation").val();
        const roomtypebathroom      = $("#"+todo+"_roomtypebathroom").val();
        const roomtypebedroom       = $("#"+todo+"_roomtypebedroom").val();
        const monday                = $("#"+todo+"_monday").val().split(",").join("");
        const tuesday               = $("#"+todo+"_tuesday").val().split(",").join("");
        const wednesday             = $("#"+todo+"_wednesday").val().split(",").join("");
        const thursday              = $("#"+todo+"_thursday").val().split(",").join("");
        const friday                = $("#"+todo+"_friday").val().split(",").join("");
        const saturday              = $("#"+todo+"_saturday").val().split(",").join("");
        const sunday                = $("#"+todo+"_sunday").val().split(",").join("");
        const status                = $("#"+todo+"_status").prop("checked") ? 1 : 0;
        var   roomtypeamenities     = '';
        var   roomtypeholiday       = '';

        $.each($("input[name='"+todo+"_amenity']:checked"), function(){     
            if(roomtypeamenities==''){
                roomtypeamenities+=$(this).data('id');
            }else{
                roomtypeamenities+="|"+$(this).data('id');
            }   
        }); 

        $.each($("input[name='"+todo+"_holiday']:checked"), function(){     
            if(roomtypeholiday==''){
                roomtypeholiday+=$(this).data('id');
            }else{
                roomtypeholiday+="|"+$(this).data('id');
            }   
        }); 

        formData.append('roomtypeshort', roomtypeshort);
        formData.append('roomtypename', roomtypename);
        formData.append('roomtypedesc', roomtypedesc);
        formData.append('roomtypedetails', roomtypedetails);
        formData.append('roomtypeproperty', roomtypeproperty);
        formData.append('roomtypeaccommodation', roomtypeaccommodation);
        formData.append('roomtypebathroom', roomtypebathroom);
        formData.append('roomtypebedroom', roomtypebedroom);
        formData.append('monday', monday);
        formData.append('tuesday', tuesday);
        formData.append('wednesday', wednesday);
        formData.append('thursday', thursday);
        formData.append('friday', friday);
        formData.append('saturday', saturday);
        formData.append('sunday', sunday);
        formData.append('status', status);
        formData.append('roomtypeamenities', roomtypeamenities);
        formData.append('roomtypeholiday', roomtypeholiday);
        // const data = {
        //     roomtypename, roomtypedesc, roomtypedetails, roomtypeproperty, roomtypeaccommodation, roomtypebathroom, roomtypebedroom, roomtypeprice, roomtypeamenities, status
        // };
        return formData;
    }
    // ----- END GET ACCOMMODATION TYPE DATA -----
    
    // ----- SAVE/UPDATE ACCOMMODATION TYPE -----
    function saveRoomtypeData(data) {
        $("#loader").show("400", function() {
            $.ajax({
                url:    "room_type/saveRoomtypeData",
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
                        roomtypeTable();
                    }
                }
            })
        });
    }

    $(document).on("click", "#btn_save_confirmation_add", function() {
        const data = getRoomtypeData("add");
        selectedImages.forEach(image => {
            data.append('image[]', image); 
        })
        data.append('icon', $('#add_roomicon')[0].files[0]); 
        saveRoomtypeData(data);
    })

    $(document).on("click", ".btn_close_confirmation_add", function() {
        $("#confirmation-add_roomtype_modal").modal("hide");
        $("#add_roomtype_modal").modal("show");
    })

    $(document).on("click", ".btn_close_confirmation_edit", function() {
        $("#confirmation-edit_roomtype_modal").modal("hide");
        $("#edit_roomtype_modal").modal("show");
    })

    // ----- EDIT USER ACCOMMODATION TYPE -----
    $(document).on("click", ".btn_edit_roomtype", function() {
        const roomtypeid            = $(this).attr("roomtypeid");
        const roomtypecode          = $(this).attr("roomtypecode");
        const roomtypeshort         = $(this).attr("roomtypeshort");
        const roomtypename          = $(this).attr("roomtypename");
        const roomtypedesc          = $(this).attr("roomtypedesc");
        const roomtypedetails       = $(this).attr("roomtypedetails");
        const roomtypeproperty      = $(this).attr("roomtypeproperty");
        const roomtypeaccommodation = $(this).attr("roomtypeaccommodation");
        const roomtypebathroom      = $(this).attr("roomtypebathroom");
        const roomtypebedroom       = $(this).attr("roomtypebedroom");
        const monday                = $(this).attr("monday");
        const tuesday               = $(this).attr("tuesday");
        const wednesday             = $(this).attr("wednesday");
        const thursday              = $(this).attr("thursday");
        const friday                = $(this).attr("friday");
        const saturday              = $(this).attr("saturday");
        const sunday                = $(this).attr("sunday");
        const roomtypeimage         = $(this).attr("roomtypeimage");
        const roomtypeicon          = $(this).attr("roomtypeicon");
        const roomtypeamenities     = $(this).attr("roomtypeamenities");
        const roomtypeholiday       = $(this).attr("roomtypeholiday");
        const status                = $(this).attr("status") == 1 ? true : false;

        const images = roomtypeimage ? roomtypeimage.split("|") : false;
        const icon   = roomtypeicon ? roomtypeicon : false;

        // SET IN ATTR
        $("#edit_roomtypeshort").attr("roomtypeid", roomtypeid);
        $("#edit_roomtypename").attr("roomtypeid", roomtypeid);

        $("#update").attr("roomtypeid", roomtypeid);
        $("#update").attr("roomtypecode", roomtypecode);
        $("#update").attr("roomtypeshort", roomtypeshort);
        $("#update").attr("roomtypename", roomtypename);
        $("#update").attr("roomtypedesc", roomtypedesc);
        $("#update").attr("roomtypedetails", roomtypedetails);
        $("#update").attr("roomtypeproperty", roomtypeproperty);
        $("#update").attr("roomtypeaccommodation", roomtypeaccommodation);
        $("#update").attr("roomtypebathroom", roomtypebathroom);
        $("#update").attr("roomtypebedroom", roomtypebedroom);        
        $("#update").attr("monday", monday);
        $("#update").attr("tuesday", tuesday);
        $("#update").attr("wednesday", wednesday);
        $("#update").attr("thursday", thursday);
        $("#update").attr("friday", friday);
        $("#update").attr("saturday", saturday);
        $("#update").attr("sunday", sunday);
        $("#update").attr("roomtypeimage", roomtypeimage);
        $("#update").attr("roomtypeamenities", roomtypeamenities);
        $("#update").attr("roomtypeholiday", roomtypeholiday);

        // DISPLAY
        $("#edit_roomtypeshort").val(roomtypeshort);
        $("#edit_roomtypename").val(roomtypename);
        $("#edit_roomtypedesc").val(roomtypedesc);
        $("#edit_roomtypedetails").val(roomtypedetails);
        $("#edit_roomtypeproperty").val(roomtypeproperty);
        $("#edit_roomtypeaccommodation").val(roomtypeaccommodation);
        $("#edit_roomtypebathroom").val(roomtypebathroom);
        $("#edit_roomtypebedroom").val(roomtypebedroom);
        $("#edit_monday").val(monday);
        $("#edit_tuesday").val(tuesday);
        $("#edit_wednesday").val(wednesday);
        $("#edit_thursday").val(thursday);
        $("#edit_friday").val(friday);
        $("#edit_saturday").val(saturday);
        $("#edit_sunday").val(sunday);

        var arrAmenity = roomtypeamenities.split("|");

        for(var i=0;i<arrAmenity.length;i++){
            $.each($("input[name='edit_amenity']"), function(){   
                if(arrAmenity[i]==$(this).data('id')){
                    $(this).prop('checked',true);
                    return false;  
                }
            }); 
        }

        var arrHoliday = roomtypeholiday.split("|");

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
                    <img src="${base_url+"pages/admin-assets/images/rooms/"+image}" style="width: 100%; height: 180px; max-width: auto;">
                </div>`;

                existingImages.push(image);
            });

            $("#edit_images").html(html);
        }
        imagesIndex();

        if (icon) {
            let html = `
                <div class="col-md-4 col-sm-12 p-2" style="position: relative;">
                    <img src="${base_url+"pages/admin-assets/images/rooms/"+icon}" style="width: 100%; height: 180px; max-width: auto;">
                </div>`;
            $("#edit_icons").html(html);
        }
        
        $("#edit_status").prop("checked", status);
        // SHOW MODAL
        $("#edit_roomtype_modal").modal("show");
    })
    // ----- END EDIT USER ACCOMMODATION TYPE -----

    $(document).on("click", "#update", function() {
        const roomtypeid            = $(this).attr("roomtypeid");
        const roomtypecode          = $(this).attr("roomtypecode");
        const roomtypeshort         = $(this).attr("roomtypeshort");
        const roomtypename          = $(this).attr("roomtypename");
        const roomtypedetails       = $(this).attr("roomtypedetails");
        const roomtypedesc          = $(this).attr("roomtypedesc");
        const roomtypeproperty      = $(this).attr("roomtypeproperty");
        const roomtypeaccommodation = $(this).attr("roomtypeaccommodation");
        const roomtypebathroom      = $(this).attr("roomtypebathroom");
        const roomtypebedroom       = $(this).attr("roomtypebedroom");
        const monday                = $(this).attr("monday");
        const tuesday               = $(this).attr("tuesday");
        const wednesday             = $(this).attr("wednesday");
        const thursday              = $(this).attr("thursday");
        const friday                = $(this).attr("friday");
        const saturday              = $(this).attr("saturday");
        const sunday                = $(this).attr("sunday");
        const roomtypeimage          = $(this).attr("roomtypeimage");
        var   roomtypeamenities     = '';
        var   roomtypeholiday       = '';

        $.each($("input[name='edit_amenity']:checked"), function(){     
            if(roomtypeamenities==''){
                roomtypeamenities+=$(this).data('id');
            }else{
                roomtypeamenities+='|'+$(this).data('id');
            }   
        });

        $.each($("input[name='edit_holiday']:checked"), function(){     
            if(roomtypeholiday==''){
                roomtypeholiday+=$(this).data('id');
            }else{
                roomtypeholiday+='|'+$(this).data('id');
            }   
        });

        $("#btn_save_confirmation_edit").attr("roomtypeid", roomtypeid);
        $("#btn_save_confirmation_edit").attr("roomtypecode", roomtypecode);
        $("#btn_save_confirmation_edit").attr("roomtypeshort", roomtypeshort);
        $("#btn_save_confirmation_edit").attr("roomtypename", roomtypename);
        $("#btn_save_confirmation_edit").attr("roomtypedetails", roomtypedetails);
        $("#btn_save_confirmation_edit").attr("roomtypedesc", roomtypedesc);
        $("#btn_save_confirmation_edit").attr("roomtypeproperty", roomtypeproperty);
        $("#btn_save_confirmation_edit").attr("roomtypeaccommodation", roomtypeaccommodation);
        $("#btn_save_confirmation_edit").attr("roomtypebathroom", roomtypebathroom);
        $("#btn_save_confirmation_edit").attr("roomtypebedroom", roomtypebedroom);
        $("#btn_save_confirmation_edit").attr("monday", monday);
        $("#btn_save_confirmation_edit").attr("tuesday", tuesday);
        $("#btn_save_confirmation_edit").attr("wednesday", wednesday);
        $("#btn_save_confirmation_edit").attr("thursday", thursday);
        $("#btn_save_confirmation_edit").attr("friday", friday);
        $("#btn_save_confirmation_edit").attr("saturday", saturday);
        $("#btn_save_confirmation_edit").attr("sunday", sunday);
        $("#btn_save_confirmation_edit").attr("roomtypeimage", roomtypeimage);
        $("#btn_save_confirmation_edit").attr("roomtypeamenities", roomtypeamenities);
        $("#btn_save_confirmation_edit").attr("roomtypeholiday", roomtypeholiday);
    }) 
    // ----- END SAVE/UPDATE USER ACCOMMODATION TYPE -----

    $(document).on("click", "#btn_save_confirmation_edit", function() {
        const roomtypeid    = $(this).attr("roomtypeid");
        const roomtypecode  = $(this).attr("roomtypecode");
        const roomtypeimage = $(this).attr("roomtypeimage");
        const data          = getRoomtypeData("edit");

        data.append('roomtypeid', roomtypeid);
        data.append('roomtypecode', roomtypecode);
        data.append('roomtypeimage', roomtypeimage);
        selectedImages.forEach(image => {
            data.append('image[]', image); 
        })
        data.append("savedimages", existingImages.join("|"));
        data.append('icon', $('#edit_roomicon')[0].files[0]); 


        saveRoomtypeData(data);
    })


    // ----- SELECT ROOM IMAGE -----
    function imagesIndex() {
        $(".selectedimages").each(function(i) {
            $(this).children().attr("index", i);
        })
    }

    $(document).on("change", ".roomicon", function(e) {
        const action    = $(this).attr("todo");
        const iconID   = action == "add" ? "add_roomicon" : "edit_roomicon";
        const contentID = action == "add" ? "add_icons" : "edit_icons";
        const objectURL = URL.createObjectURL(e.target.files[0]);
        let html = `
            <div class="col-md-4 col-sm-12 p-2" style="position: relative;">
                <img src="${objectURL}" style="width: 100%; height: 180px; max-width: auto;">
            </div><hr>`;
        html && $("#"+contentID).html(html);
    })

    $(document).on("change", ".roomimage", function(e) {
        const action    = $(this).attr("todo");
        const imageID   = action == "add" ? "add_roomimage" : "edit_roomimage";
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
    // ----- END SELECT ROOM IMAGE -----


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