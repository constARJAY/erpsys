// START OF DOCUMENT READY
$(document).ready(function(){
    $('#roomType').select2({theme: "bootstrap"});
    room_management_datepicker();
});
//  START   FILTERING EVENTS OF ROOMTYPE AND DATEPICKER
$(document).on("change", "#roomType", function(){
    var roomType =   $("#roomType").val();
    // alert(roomType);
    list_of_rooms(roomType);
});

$(document).on("change", "#roomManagement_datePicker", function(){
    var roomType  =   $("#roomType").val();
    // alert(roomType);
    list_of_rooms(roomType);
});
//  END     FILTERING EVENTS OF ROOMTYPE AND DATEPICKER




/** START ++++++++++++++++++++++++++++++++++++++  EXTRA SCRIPTS  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
    $(document).on("click", ".check_availability", function(){
        var roomListID  =   $(this).data("roomlistid");
        $.ajax({
            url:"room_management/check_availability",
            method:"POST",
            data:{roomListID},
            dataType:"json",
            beforeSend:function(){
                $("#add_password").prop("disabled", false);
                $("#tab_roomInformation").addClass("active").removeClass("doneTab");
                $("#roomInformation").addClass("in active");
                $("#guestInformation").removeClass("in active");
                $("#verification").removeClass("in active");
                $("#setRoomCard").removeClass("in active");
                
                $("#tab_guestInformation").removeClass("doneTab");
                $("#tab_guestInformation").removeClass("active");
                $("#tab_verification").removeClass("active");
                
                $("#tab_checkOutPayment").removeClass("active");
                
                $("#customerRegistrationForm").find("input").removeClass("is-invalid");
                $("#customerRegistrationForm").find("input").removeClass("is-valid");

                $("#roomRegistrationForm").find("input").val("").removeClass("validated is-valid");
                $("#roomRegistrationForm").find("input").val("").removeClass("validated is-invalid");

                $("#roomRegistrationForm").find("input").val("").removeClass("validated is-valid");
                $("#add_initialAmount-ext_services").val("0.00").removeClass("validated is-valid");;
                $("#customerRegistrationForm").find("input").val("").removeClass("validated is-valid");;
                $("#initialPayment").find("input").val("").removeClass("validated is-valid");
                $("#initialPayment").find("input").removeClass("validated is-invalid");
                $("#add_initialAmount").removeClass("validated is-valid");
            },
            success:function(data){
                // console.log("++++++++++++++++");
                // console.log(data);
                $("#hidden_roomListID").val(data[1][0]["roomListID"]);
                $("#hidden_roomTypeID").val(data[1][0]["roomTypeID"]);
                room_reservation_datepicker(data[0]);
                $(".span_roomType").text(data[1][0]["roomTypeName"]);
                $(".span_roomNumber").text(data[1][0]["roomTypeShortname"]+"-"+data[1][0]["roomCode"]);
                var roomPrice   =   data[4]["roomPrice"].split("|");
                $("#span_roomPrice").text("Starts from "+formatCurrency(roomPrice[0]));
                // console.log(data);
                var included_amenities  =   "";
                var extra_amenities     =   "";
                data[2].map(included=>{
                    included_amenities  +=  `
                                            <div class="col-4 py-1" style="font-size:95%;">
                                                <i class="icon-check text-success"></i>&nbsp;${included["amenitiesName"]}
                                            </div>
                                            `;
                });
                data[3].map(excluded=>{
                    extra_amenities     +=  `
                                            <div class="col-6 py-1" style="font-size:95%;">
                                                <div class="d-flex justify-content-between" >
                                                    <span>
                                                        <input type="checkbox" class="extraServices" id="extraServices" value="${excluded["amenitiesName"]}|${excluded["amenitiesPrice"]}|${excluded["updatedAt"]}|${excluded["amenitiesID"]}"> 
                                                        ${excluded["amenitiesName"]}
                                                    </span>
                                                    <span>${formatCurrency(excluded["amenitiesPrice"])}</span>
                                                </div>
                                            </div>
                                            `;
                });
                $(".included_amenities").html(included_amenities);
                $(".extra_amenities").html(extra_amenities);

                $("#addReservation-modal").modal("show");
            }
        });
    });




    $(document).on("change", "#roomReservation_datepicker", function(){
        
        // There is already an existing reservation on the selected date range.
        var dateRange   =   $(this).val();
        var roomListID  =   $("#hidden_roomListID").val();
        var data        =   {dateRange, roomListID};
            $.ajax({
                url:"room_management/check_availability_part2",
                method:"POST",
                data,
                dataType:"json",
                beforeSend:function(){},
                success:function(data){
                    console.log(data);
                    // DECLAIRING GLOBAL VARIABLE
                        var reservation_detailedRoomPrice = "";
                        var totalRoomPrice_array =    [];
                    $("#roomReservation_datepicker").removeClass("is-invalid").addClass("is-valid"); // HAHAHAHAHAHAH MALI TO HAHAHAHAH
                    // 
                    // console.log(data);
                    data[0].map((items, index)=>{
                        for(i = 0; i < data[1].length; i++){
                            for(j = 0; j <= data[1][i].length; j++){
                                if(items.includes(data[1][i][j])){
                                    $("#roomReservation_datepicker").addClass("is-invalid").removeClass("is-valid");
                                    $("#roomReservation_datepicker").next().text("There is already an existing reservation on the selected date range.");
                                    break;
                                }
                            } //First Children of Parent Loop
                        }  //Parent Loop	
                    });

                    
                    data[2].map((roomPriceItems, roomPriceIndex) =>{
                        
                        var roomPrice           = roomPriceItems.split("|");
                        var holidayCondition    = roomPrice.pop() == "YES" ? "text-primary": "text-dark";
                        var priceOfRoom         = roomPrice[1];
                        reservation_detailedRoomPrice += `
                                                        <div class="col-12 text-left d-flex justify-content-between" >
                                                            <span class="px-1 d-flex justify-content-start ${holidayCondition}">${roomPrice[0]}</span>
                                                            <span class="px-2 d-flex justify-content-end">${formatCurrency(priceOfRoom)}</span>
                                                        </div>
                                                        `;
                        totalRoomPrice_array.push(parseFloat(priceOfRoom.replace(" ","")));
                                                        
                    });
                    // console.log(totalRoomPrice_array);
                    var totalRoomPrice   = totalRoomPrice_array.reduce((a, b) => a + b, 0);
                    
                    $("#span_totalRoomPrice").text(formatCurrency(totalRoomPrice));
                    $("#add_initialAmount_room").val(formatCurrency(totalRoomPrice));

                    $(".reservation_detailedRoomPrice").html(reservation_detailedRoomPrice);


                }
            });
    });

    $(document).on("click", ".extraServices", function(){
        const theValue 			=	$(this).val().split("|");
        const description 		=	theValue[0];
        const amount			=	parseFloat(theValue[1]);
        const pre_totalExtAmt   =   $("#add_initialAmount-ext_services").val().replace("₱","");
        const totalExtAmt       =   parseFloat(pre_totalExtAmt.replace(",",""));
            if($(this).prop("checked") == true){
                total = totalExtAmt + amount;
            }else{
                total = totalExtAmt - amount;
            }
            $("#add_initialAmount-ext_services").val(formatCurrency(total));

    });
    // FORM SEARCH EMAIL AND USERNAME
        $(document).on("change", "#add_username", function(){
            var theValue   =  $(this).val();
            search_guest_information(theValue);
        });

        $(document).on("change", "#add_email", function(){
            var theValue   =  $(this).val();
            search_guest_information(theValue);
        });
    // For Coupon validation
    $(document).on("keyup", "#add_couponCode", function(e){
        // ORIGINAL PRICES
        var add_initialAmount_room              =   $("#add_initialAmount_room").val();
        var add_initialAmount_ext_services2     =   $("#add_initialAmount_ext_services2").val();
        // ORIGINAL PRICES
        var coupon              =   $(this).val();
        var modal_roomListID    =   $("#hidden_roomListID").val();
        var availExtraServices  = "";
        var additionalAmenitiesID =   [];
        $("#roomRegistrationForm input:checked").each(function(){
                // Airport Pick-up|1500.00|2021-01-06 03:23:26|6 -> SAMPLE VALUE
                    var checkBoxValue       =   this.value;
                    var wholeValue          =   checkBoxValue.split("|");
                    additionalAmenitiesID.push(wholeValue.pop());
        });
        var string_additionalAmenitiesID = additionalAmenitiesID.toString();
        var data                =   {   coupon,
                                        modal_roomListID,
                                        string_additionalAmenitiesID,
                                        add_initialAmount_room,
                                        add_initialAmount_ext_services2
                                    };
        if(coupon == ""){
            $(this).removeClass("is-invalid");
        }else{
            $.ajax({
                url:"room_management/search_coupon",
                method:"POST",
                data,
                dataType:"json",
                success:function(data){
                        add_initialAmount_room              =   data[2]["orig_add_initialAmount_room"];
                        add_initialAmount_ext_services2     =   data[2]["orig_add_initialAmount_ext_services2"];
                        var add_initialAmount_total_amount  =   parseFloat(add_initialAmount_room) + parseFloat(add_initialAmount_ext_services2);   
                //    console.log(data);
                   if(data[0]["couponType"] != false){
                        

                       if(data[0]["couponType"] == "roomTypeID"){
                                var roomTypeDetails  = data[1]["roomTypeValue"].split("|");
                                var add_couponRate   = roomTypeDetails[1] == 1 ? roomTypeDetails[1]+"%" : formatCurrency(roomTypeDetails[1]);
                                    if(roomTypeDetails[1] == 1){
                                        var percentage = parseFloat(roomTypeDetails[2]) / 100;
                                        var difference = percentage * add_initialAmount_room;
                                        console.log("+_+_+_+_");
                                        console.log(difference);
                                    }else{
                                            var difference = roomTypeDetails[1];
                                    }
                                    
                                var add_couponAmount  = difference;
                                console.log(add_initialAmount_total_amount+" "+add_couponAmount);
                                var add_initialAmount_room  = parseFloat(add_initialAmount_total_amount) - parseFloat(add_couponAmount);
                                $("#add_initialAmount_total_amount").val(formatCurrency(add_initialAmount_room));
                       }else{
                           
                        // ["1|25.00", "5|25.00", ""]

                                var availExtraServices = "";
                                var add_initialAmount_ext_services2 =   [];
                                var totalDifference     =   [];
                                $("#roomRegistrationForm input:checked").each(function(index){
                                    var checkBoxValue       =   this.value;
                                    var wholeValue          =   checkBoxValue.split("|");
                                    if(data[1][index] != ""){
                                        
                                        var amenitiesDetails    = data[1][index].split("|");
                                        var percentage          = parseFloat(amenitiesDetails[1]) / 100;
                                        var origPrice           = wholeValue[1].replace("₱","");
                                        
                                        var difference          = percentage * parseFloat(origPrice.replace(",",""));
                                        var couponValue         = parseFloat(origPrice.replace(",","")) - difference;
                                        // console.log("ORIG PRICE:"+origPrice+"|"+amenitiesDetails[1]+"|"+data[index]);
                                        var amenitiesDisplay    = `<del style="font-size:70%">${formatCurrency(wholeValue[1])}</del> <br> ${formatCurrency(couponValue)}`;
                                        totalDifference.push(parseFloat(difference));
                                        add_initialAmount_ext_services2.push(parseFloat(couponValue));

                                    }else{
                                         var amenitiesDisplay   =   formatCurrency(wholeValue[1]);
                                         add_initialAmount_ext_services2.push(parseFloat(wholeValue[1]));
                                    }
                                    
                                    availExtraServices	    +=	`<div class="col-12 text-left d-flex justify-content-between theData">
                                                                        <span class="font-weight-bold px-1 d-flex justify-content-start align-items-center">${wholeValue[0]}: </span>
                                                                        <span class="px-2 text-right">
                                                                            ${amenitiesDisplay}
                                                                        </span> 
                                                                </div>`;
                                    
                                    
                                });
                                
                                var split_couponRate            = data[1][0].split("|");
                                var add_couponRate              = split_couponRate[1] +"%";
                                var add_couponAmount            = formatCurrency(arraySum(totalDifference));
                                var totalExtraServicesPrice     = parseFloat(add_initialAmount_total_amount) - parseFloat(add_initialAmount_ext_services2);

                                $("#add_initialAmount_total_amount").val(formatCurrency(totalExtraServicesPrice));
                                $("#availExtraServices").html(availExtraServices);
                       }
                       
                       $("#add_couponRate").val(add_couponRate);
                       $("#add_couponAmount").val(add_couponAmount);
                   }else{
                       var add_couponRate                   = "";
                       var add_couponAmount                 = "";
                       $("#add_initialAmount_total_amount").val(formatCurrency(add_initialAmount_total_amount));

                        var availExtraServices = "";
                        var add_initialAmount_ext_services2 =   [];
                        $("#roomRegistrationForm input:checked").each(function(){
                            var checkBoxValue       =   this.value;
                            var wholeValue          =   checkBoxValue.split("|");
                            availExtraServices	    +=	`<div class="col-12 text-left d-flex justify-content-between theData">
                                                                <span class="font-weight-bold px-1 d-flex justify-content-start">${wholeValue[0]}: </span><span class="px-2 d-flex justify-content-end">${formatCurrency(wholeValue[1])}</span> 
                                                        </div>`;
                            add_initialAmount_ext_services2.push(parseFloat(wholeValue[1]));
                        });

                        var totalExtraServicesPrice   = add_initialAmount_ext_services2.reduce((a, b) => a + b, 0);
                        $("#add_initialAmount_ext_services2").val(formatCurrency(totalExtraServicesPrice));
                        $("#availExtraServices").html(availExtraServices);
                   }
                   
                   // SET VALUE
                    $("#add_couponRate").val(add_couponRate);
                    $("#add_couponAmount").val(add_couponAmount);
                    // $("#add_initialAmount_room").val(add_initialAmount_room);
                    // $("#add_initialAmount_ext_services2").val(add_initialAmount_ext_services2);
                    
                }
            });
        }
    });
    //  Initial Amount Keyup
    $(document).on("keyup","#add_initialAmount", function(){
        // inputPriceFormat("add_initialAmount");
    });
    
    $(document).on("keyup","#add_amountTendered",function(){
        inputPriceFormat("add_amountTendered");
    });

    

    // START ADDING PENALTY FEE
        $(document).on("click", "#addPenaltyFee", function(){
            var numItems = $('.additionalFeeDiv').length;
            const mainFeeDivision 		= 	`
                                        <div class="row mt-1 additionalFeeDiv penaltyDiv${numItems}" >
                                            <div class="col-6 px-2">
                                                <input type="text" id="penaltyDesc" class="form-control validate" data-allowcharacters="[0-9][a-z][A-Z][,][.][ ]" placeholder="Penalty Description">
                                            </div>
                                            <div class="col-5 px-0">
                                                <div class="input-group">
                                                    <div class="input-group-prepend">
                                                        <span class="input-group-text"><span
                                                                class="font-weight-bold">₱</span></span>
                                                    </div>
                                                    <input type="text" id="penaltyFee" class="form-control currency validate text-right" data-allowcharacters="[0-9][,][.]" placeholder="Penalty Price">
                                                </div>
                                            </div>
                                            <div class="col-1 px-0 d-flex justify-content-center align-items-center">
															<i class="text-danger zmdi zmdi-minus-circle zmdi-hc-2x remove_penalty" data-penaltyrow="${numItems}"></i>
											</div>
                                        </div>
                                            `;
            $("#mainFeeDivision").append(mainFeeDivision);
            currency();

        });
    // END ADDING PENALTY FEE
    // START REMOVE PENALTY FEE
    $(document).on("click",".remove_penalty", function(){
        var thisID  =   $(this).data("penaltyrow");
        $(".penaltyDiv"+thisID).hide(1500,function(){
            $(".penaltyDiv"+thisID).remove();
        });
        
    });
    // END   REMOVE PENALTY FEE

    
    // Viewing Reservation
    $(document).on("click", ".view_reservation", function(){
        var guestInfo    =   $(this).data("transaction");
        $("#viewReservation-modal").modal("show");
        $.ajax({
            url:"room_management/get_guest_reservation",
            method:"POST",
            data:{guestInfo},
            dataType:"json",
            beforeSend(){
                $("#view_tab_guestInformation").addClass("active").removeClass("doneTab");
                $("#view_tab_verification").removeClass("doneTab active");
                $("#view_tab_checkOutPayment").removeClass("doneTab active");
                $("#view_guestInformation").addClass("in active");
                $("#view_reservationInformation").removeClass("in active");
                $("#view_checkOutPayment").removeClass("in active");

            },
            success:function(data){
                console.log(data);
                var total_additional_services = "";
                var total_guest_payment = "";
                    
                    data[0].map(clientInformation=>{
                        $("#hidden_roomListID").val(clientInformation["mainRoomListID"]);
                        $(".transaction_number").text(clientInformation["transactionNumber"]);
                        $(".view_spanGuestName").text(clientInformation["fullname"]);
                        $(".view_spanGuestAddress").text(clientInformation["fullAddress"]);
                        $(".view_spanGuestEmail").text(clientInformation["accountEmail"]);
                        $(".view_spanCheckIn").text(moment(clientInformation["clientCheckIn"] ).format("MMMM D, YYYY hh:mma"));
                        $(".view_spanCheckOut").text(moment(clientInformation["clientInitialCheckOut"]).format("MMMM D, YYYY hh:mma"));
                        $(".view_spanAdult").text(clientInformation["clientGuestAdult"]);
                        $(".view_spanChildren").text(clientInformation["clientGuestChildren"]);
                        $(".view_spanInfant").text(clientInformation["clientGuestInfant"]);

                        $(".view_span_roomType").text(clientInformation["roomTypeName"]);
                        $(".view_span_roomNumber").text(clientInformation["roomTypeShortname"]+"-"+clientInformation["roomCode"]);
                        

                        var view_availExtraServices = "";
                        var additional_services = [];
                        var clientExtraPreferences  =  clientInformation["clientExtraPreferences"].split("|"); 
                        clientExtraPreferences.map((items, index) =>{
                            var extraPreferencesDesc  = clientInformation["clientExtraPreferencesDesc"].split("|");
                            var extraPreferencesPrice = clientInformation["clientExtraPreferencesPrice"].split("|");
                            view_availExtraServices +=  `
                                                        <div class="d-flex justify-content-between align-items-baseline">
                                                            <label for="" class="font-weight-bold text-dark mb-0">${extraPreferencesDesc[index]}</label>
                                                            <span>${formatCurrency(extraPreferencesPrice[index])}</span>
                                                        </div>
                                                       `;
                            additional_services.push(extraPreferencesPrice[index]);
                        });
                        // 
                        $(".view_availExtraServices").html(view_availExtraServices);
                        total_additional_services += arraySum(additional_services);
                        $(".total_additional_services").text(formatCurrency(total_additional_services));
                        var guest_payment = parseFloat(clientInformation["clientTotalCouponValue"]) + parseFloat(clientInformation["clientInitialPayment"]);
                        total_guest_payment += guest_payment;
                        $(".total_guest_payment").text(formatCurrency(total_guest_payment));
                        var couponDescription = clientInformation["clientCouponID"] == ""  ? "-" : clientInformation["clientCouponID"] +"("+ clientInformation["clientCouponValue"] +")";
                        $(".availed_coupon").text(couponDescription);
                        $(".coupon_amount").text(formatCurrency(clientInformation["clientTotalCouponValue"]));
                        $(".down_payment").text(formatCurrency(clientInformation["clientInitialPayment"]));

                        
                        // For Checkin and Reserve Button
                        var preferredGuestCheckIn       =   clientInformation["clientCheckIn"];
                        var guest_checkIn               =   new Date(preferredGuestCheckIn);
                        var dateToday                   =   new Date();
                            console.log(preferredGuestCheckIn);
                            console.log("+-+-+");
                            console.log(guest_checkIn);
                            console.log("+-+-+");
                            console.log(dateToday);
                        if(guest_checkIn >= dateToday){
                            var view_reservationfooter = clientInformation["clientStatus"] == "2" ? `<button type="button" class="btn btn-primary shadow-none px-4 p-2 w-50 mx-2" id="guest_continue">
                                CONTINUE</button>` : `<span class="text-danger font-weight-bold"><i class="text-danger">* </i>Kindly wait until the time of the guest's check-in.</span>`;
                            
                            // var reservationVerification_footer  =    `
                            //                                         <button type="button" class="btn btn-primary shadow-none px-4 p-2 w-50 mx-2" id="guest_reservation">
                            //                                             RESERVE
                            //                                         </button>
                            //                                     `;
                        }else{
                            var view_reservationfooter = clientInformation["clientStatus"] == "1" ? `<button type="button" class="btn btn-primary shadow-none px-4 p-2 w-50 mx-2" data-guestid="${clientInformation["mainClientID"]}" id="guest_checkin">
                                CHECK IN</button>` : `<button type="button" class="btn btn-primary shadow-none px-4 p-2 w-50 mx-2" id="guest_continue">
                                CONTINUE</button>`

                            // var reservationVerification_footer  =    `
                            //                                             <button type="button" class="btn btn-primary shadow-none px-4 p-2 w-50 mx-2" id="guest_checkIn">
                            //                                                 CHECK IN
                            //                                             </button> 
                            //                                         `;
                        }

                        $(".view_reservationfooter").html(view_reservationfooter);
                        $(".checkout_confirmation_footer").html(`
                                                                 <button type="button" class="btn btn-primary shadow-none " id="btn_save_confirmation_checkout" data-transactionid="${clientInformation["mainClientID"]}"> YES </button>
                                                                 <button type="button" class="btn btn-danger shadow-none btn_close_confirmation_checkout" data-process="2"> NO</button>
                                                                `);




                    });

                    var view_reservation_detailedRoomPrice = "";
                    var totalRoomPrice = [];
                    console.log(data[1]);
                    // if(items["penaltyDesc"] == undefined){
                    // penaltyFee.push(items["penaltyFee"])
                    // }else{
                    //     penaltyDesc.push(items["penaltyDesc"]);
                    // }
                        if(data[1].length > 1){
                          data[1].pop();
                        }

                    data[1].map(roomPriceList =>{
                        var roomPrice   = roomPriceList.split("|");

                        // console.log(roomPrice);
                        var holidayText = roomPrice[2] == "NO" ? "text-dark" : "text-primary"
                        view_reservation_detailedRoomPrice +=   `<div class="d-flex justify-content-between align-items-baseline">
                                                                    <span style="font-size: .92rem" class="text-dark mb-0 text-left  ${holidayText}">${roomPrice[0]}</span>
                                                                    <span style="font-size: .92rem" class="${holidayText}">${formatCurrency(roomPrice[1])}</span>
                                                                </div>
                                                                `;  
                        $(".view_reservation_detailedRoomPrice").html(view_reservation_detailedRoomPrice);
                        totalRoomPrice.push(roomPrice[1]);
                    });
                    var view_span_totalRoomPrice = arraySum(totalRoomPrice);
                   
                    $(".view_span_totalRoomPrice").text(formatCurrency(view_span_totalRoomPrice));

                    // Running Balance 
                    // console.log(view_span_totalRoomPrice);
                    // console.log(total_additional_services);
                    // console.log(total_guest_payment);
                    //     var running_balance  = (parseFloat(view_span_totalRoomPrice) + parseFloat(total_additional_services) - parseFloat(total_guest_payment));
                    //     $(".running_balance").text(formatCurrency(running_balance));

            }
        });
    });
    

    


/** END   ++++++++++++++++++++++++++++++++++++++  EXTRA SCRIPTS  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */











/** START ++++++++++++++++++++++++++++++++++++++  PROCESS IN RESERVATION  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
    //Room information Part
        $(document).on("click", "#roomInformationNext", function(){
            currency();
            $("#accountInformationPrev").removeClass("active");
            if($("#roomReservation_datepicker").hasClass("is-invalid")){
                $("#roomReservation_datepicker").addClass("is-invalid").removeClass("is-valid");
                $("#roomReservation_datepicker").next().text("There is already an existing reservation on the selected date range.");
            }else{
                // For form validation
                var theForm = $("#roomRegistrationForm").find("input:empty");
                    theForm.each(function () {
                        rjValidateInputs("#"+this.id);
                        if ((this.value== "" || $("#" + this.id).hasClass("is-invalid")) ) {
                            $("#" + this.id).addClass("is-invalid").removeClass("is-valid");
                            $("#"+this.id).next().text("This field is Required");
                        } else {
                            $("#" + this.id).addClass("is-valid").removeClass("is-invalid");
                        }
                    });
                var theCondition = $("#roomRegistrationForm").find(".is-invalid").first().focus();
                if(theCondition.length > 0){
                    $("#roomRegistrationForm").find(".is-invalid").first().focus();
                }else{
                    $("#tab_roomInformation").removeClass("active").addClass("doneTab");
                    $("#roomInformation").removeClass("in active");
                    $("#tab_guestInformation").addClass("active").removeClass("doneTab");
                    $("#guestInformation").addClass("in active");

                    $("#spanAdult").text($("#add_adult").val());
                    $("#spanChildren").text($("#add_children").val());
                    $("#spanInfant").text($("#add_infant").val());
                    var dateRange = $("#roomReservation_datepicker").val().split("-");
                    var guesCheckIn     = dateRange.shift();
                    $("#spanCheckIn").text(guesCheckIn+" 02:00PM");
                    $("#spanCheckOut").text(dateRange.pop()+" 12:00PM");
                    
                    var availExtraServices = "";
                    var add_initialAmount_ext_services2 =   [];
                    $("#roomRegistrationForm input:checked").each(function(){
                        var checkBoxValue       =   this.value;
                        var wholeValue          =   checkBoxValue.split("|");
                        availExtraServices	    +=	`<div class="col-12 text-left d-flex justify-content-between theData">
                                                            <span class="font-weight-bold px-1 d-flex justify-content-start">${wholeValue[0]}: </span>
                                                            <span class="px-2 d-flex justify-content-end">${formatCurrency(wholeValue[1])}</span> 
                                                     </div>`;
                        add_initialAmount_ext_services2.push(parseFloat(wholeValue[1]));
                    });

                    var totalExtraServicesPrice   = add_initialAmount_ext_services2.reduce((a, b) => a + b, 0);
                    $("#add_initialAmount_ext_services2").val(formatCurrency(totalExtraServicesPrice));
                    $("#availExtraServices").html(availExtraServices);

                    // For Checkin and Reserve Button
                    var preferredGuestCheckIn       =   guesCheckIn.replace(",", "");
                    var standardCheckIn             =   standardCheckInCheckOut().split("|");
                    var guest_checkIn               =   new Date(preferredGuestCheckIn+" "+standardCheckIn.shift());
                    // alert(guest_checkIn);//Charles
                    var dateToday                   =   new Date();
                        console.log(preferredGuestCheckIn);
                        console.log("+-+-+");
                        console.log(guest_checkIn);
                        console.log("+-+-+");
                        console.log(dateToday);
                    if(guest_checkIn >= dateToday){
                        var reservationVerification_footer  =    `
                                                                <button type="button" class="btn btn-primary shadow-none px-4 p-2 w-50 mx-2" id="guest_reservation">
                                                                    RESERVE
                                                                </button>
                                                             `;
                    }else{
                        var reservationVerification_footer  =    `
                                                                    <button type="button" class="btn btn-primary shadow-none px-4 p-2 w-50 mx-2" id="guest_checkIn">
                                                                        CHECK IN
                                                                    </button> 
                                                                `;
                    }
                    
                    $(".reservationVerification_footer").html(reservationVerification_footer);


                }

            }
        });
    // Account Information Part
        $(document).on("click", "#accountInformationNext", function(){
            var theForm = $("#customerRegistrationForm").find("input:empty");
                theForm.each(function () {
                rjValidateInputs("#"+this.id);
                    if ((this.value== "" || $("#" + this.id).hasClass("is-invalid")) && this.id != "add_unitNum") {
                        $("#" + this.id).addClass("is-invalid").removeClass("is-valid");
                        $("#"+this.id).next(".invalid-feedback").text("This field is Required");
                    } else {
                        $("#" + this.id).addClass("is-valid").removeClass("is-invalid");
                    }
                });
                var theCondition = $("#customerRegistrationForm").find(".is-invalid").first().focus();
                if(theCondition.length > 0){
                    $("#customerRegistrationForm").find(".is-invalid").first().focus();
                }else{
                    add_guestAccount();
                }   
        });
    //Reservation Verification
        $(document).on("click", "#guest_reservation", function(){
            var add_initialAmount_total_amount = $("#add_initialAmount_total_amount").val().replace("₱","");
            var add_initialAmount              = $("#add_initialAmount").val().replace(",","");
           if($("#add_initialAmount").hasClass("is-invalid")){
                $("#add_initialAmount").focus();
           }else{
                 $.ajax({
                url: "admin/down_payment",
                dataType:"json",
                beforeSend:function(){ },
                success:function(data){
                var percentage =  parseFloat(data[0]["downpayment_percentage"])  / 100;
                var percentageTobePaid  = parseFloat(add_initialAmount_total_amount.replace(",",""))  * percentage;
    
                        if(percentageTobePaid > add_initialAmount || $("#add_initialAmount").val()== ""){
                            $("#add_initialAmount").addClass("is-invalid").removeClass("is-valid");
                            $("#add_initialAmount").next().text("Please pay atleast "+ data[0]["downpayment_percentage"] + "%"+ " " +formatCurrency(percentageTobePaid));
                        }else{ 
                            
                                $("#addReservation-modal").modal("hide");
                                $("#confirmation-add_schedule_modal").modal("show");
                                var confirmation_body   =   `
                                                                                <h2 class="text-primary text-center confirmation_header_title">ADD RESERVATION</h2>
                                                                                <p class="text-center my-2">Are you sure you want to add new schedule?</p>
                                                                                <form action="reservation_approval">
                                                                                        <input type="text" class="form-control validate" data-allowcharacters="[a-z][A-Z][0-9][*][-][_][@][.]" id="approval_checkin_username" placeholder="Enter Username">
                                                                                    <br>
                                                                                        <input type="password" class="form-control validate" data-allowcharacters="[a-z][A-Z][0-9][*][-][_][@][.]" id="approval_checkin_password" placeholder="Enter Password">
                                                                                    <br>
                                                                                    <div class="validate_reservation"></div>
                                                                                </form>
                                                            `;
                                $(".confirmation_body").html(confirmation_body);
                                var confirmation_footer =   `
                                                                <button type="button" class="btn btn-primary shadow-none" id="btn_save_confirmation_add" data-todo="1"> YES</button>
                                                                <button type="button" class="btn btn-danger shadow-none btn_close_confirmation_add" data-process="1"> NO</button>
                                                            `;
                                $(".confirmation_footer").html(confirmation_footer);
                        } // if else end
                    }
                        });
           } 

           







            
        });

    // Checkin Verifivation
        $(document).on("click", "#guest_checkIn", function(){
            var add_initialAmount_total_amount = $("#add_initialAmount_total_amount").val().replace("₱","");
            var add_initialAmount              = $("#add_initialAmount").val().replace(",","");
        
                $.ajax({
                    url: "admin/down_payment",
                    dataType:"json",
                    beforeSend:function(){ },
                    success:function(data){
                    var percentage =  parseFloat(data[0]["downpayment_percentage"])  / 100;
                    var percentageTobePaid  = parseFloat(add_initialAmount_total_amount.replace(",",""))  * percentage;

                            if(percentageTobePaid > add_initialAmount ){
                                $("#add_initialAmount").addClass("is-invalid").removeClass("is-valid");
                                $("#add_initialAmount").next().text("Please pay atleast "+ data[0]["downpayment_percentage"] + "%"+ " " +formatCurrency(percentageTobePaid));
                            }else{
                                var roomListID  =   $("#hidden_roomListID").val();
                                $.ajax({
                                    url:"room_management/show_key_card",
                                    method:"POST",
                                    data:{roomListID},
                                    dataType:"json",
                                    beforeSend:function(){},
                                    success:function(data){
                                            if(data != "FALSE"){
                                                console.log(data);

                                                $("#addReservation-modal").modal("hide");
                                                $("#confirmation-add_schedule_modal").modal("show");
                                                var cardList = "";
                                                data.map(items=>{
                                                    cardList += `<option value="${items["cardID"]}">${items["cardCode"]}</option>` 
                                                });
                                                var confirmation_body   =   `
                                                                                <h2 class="text-primary text-center confirmation_header_title">Guest Check In</h2>
                                                                                <p class="text-center my-2">Are you sure you want to add guest check in?</p>
                                                                                <form action="reservation_approval">
                                                                                        <input type="text" class="form-control validate" data-allowcharacters="[a-z][A-Z][0-9][*][-][_][@][.]" id="approval_checkin_username" placeholder="Enter Username">
                                                                                    <br>
                                                                                        <input type="password" class="form-control validate" data-allowcharacters="[a-z][A-Z][0-9][*][-][_][@][.]" id="approval_checkin_password" placeholder="Enter Password">
                                                                                    <br>
                                                                                    <div class="validate_reservation"></div>
                                                                                    <div class="room_card_verification">
                                                                                    <select class="form-control" id="card_access">
                                                                                        ${cardList}
                                                                                    </select>
                                                                                    </div>
                                                                                </form>
                                                                            `;
                                                $(".confirmation_body").html(confirmation_body);
                                                var confirmation_footer =   `
                                                                                <button type="button" class="btn btn-primary shadow-none" id="btn_save_confirmation_add" data-todo="2"> YES</button>
                                                                                <button type="button" class="btn btn-danger shadow-none btn_close_confirmation_add" data-process="1">NO</button>
                                                                            `;
                                                $(".confirmation_footer").html(confirmation_footer);
                                            }else{
                                                console.log(data);
                                            }
                                        }
                                });

                            } // if else end
                    }
                });
        });

    // Confirmation for Reservation
    $(document).on("click", "#btn_save_confirmation_add", function(){
        var theCondition                =   $(this).data("todo") == 1? "reserve" : "checkin";
        var approval_checkin_username   =   $("#approval_checkin_username").val();
        var approval_checkin_password   =   $("#approval_checkin_password").val();
        // card_access
        $.ajax({
          url:"room_management/validate_reservation",
          method:"POST",
          data:{approval_checkin_username,approval_checkin_password},
          dataType:"json",
          beforeSend:function(){},
          success:function(data){
              if(data != "FALSE"){
                if($(".btn_close_confirmation_add").data("process") == 2){
                    checkInVerification($("#btn_save_confirmation_add").data("guestid"));
                    
                }else{
                    reservationVerification(theCondition, data);
                }
                
              }else{
                  var validate_reservation = `  <div class="alert alert-danger" role="alert">
                                                   <p class="mb-0">Invalid username and password.</p>
                                                </div>`
                   $(".validate_reservation").html(validate_reservation);
              }
            
          }
        });
        
        // $("#addReservation-modal").modal("hide");
        // $("#confirmation-add_schedule_modal").modal("show");
        // 



    });

    $(document).on("click",".btn_close_confirmation_add", function(){
        var condition = $(this).data("process");
        $("#confirmation-add_schedule_modal").modal("hide");
        
        if(condition == 2){
            $("#viewReservation-modal").modal("show");
        }else{
            $("#addReservation-modal").modal("show");
        }
        
    });




    
    // VIEW RESERVATION CHECKIN
    $(document).on("click","#guest_checkin", function(){
        var guestID = $(this).data("guestid");  
        
        var roomListID  =   $("#hidden_roomListID").val();
        $.ajax({
            url:"room_management/show_key_card",
            method:"POST",
            data:{roomListID},
            dataType:"json",
            beforeSend:function(){},
            success:function(data){
                    if(data != "FALSE"){
                        console.log(data);
                                                $("#addReservation-modal").modal("hide");
                                                $("#confirmation-add_schedule_modal").modal("show");
                                                var cardList = "";
                                                data.map(items=>{
                                                    cardList += `<option value="${items["cardID"]}">${items["cardCode"]}</option>` 
                                                });
                                                var confirmation_body   =   `
                                                                                <h2 class="text-primary text-center confirmation_header_title">ADD RESERVATION</h2>
                                                                                <p class="text-center my-2">Are you sure you want to add new schedule?</p>
                                                                                <form action="reservation_approval">
                                                                                        <input type="text" class="form-control validate" data-allowcharacters="[a-z][A-Z][0-9][*][-][_][@][.]" id="approval_checkin_username" placeholder="Enter Username">
                                                                                    <br>
                                                                                        <input type="password" class="form-control validate" data-allowcharacters="[a-z][A-Z][0-9][*][-][_][@][.]" id="approval_checkin_password" placeholder="Enter Password">
                                                                                    <br>
                                                                                    <div class="validate_reservation"></div>
                                                                                    <div class="room_card_verification">
                                                                                    <select class="form-control" id="card_access">
                                                                                        ${cardList}
                                                                                    </select>
                                                                                    </div>
                                                                                </form>
                                                                            `;
                                                $(".confirmation_body").html(confirmation_body);
                                                var confirmation_footer =   `
                                                                                <button type="button" class="btn btn-primary shadow-none" id="btn_save_confirmation_add" data-todo="2" data-guestid="${guestID}"> YES</button>
                                                                                <button type="button" class="btn btn-danger shadow-none btn_close_confirmation_add" data-process="2">NO</button>
                                                                            `;
                                                $(".confirmation_footer").html(confirmation_footer);
                        
                                                $("#viewReservation-modal").modal("hide");
                                                $("#confirmation-add_schedule_modal").modal("hide");                      
                    }else{
                        $("#addReservation-modal").modal("hide");
                        $("#viewReservation-modal").modal("hide");
                        $("#confirmation-add_schedule_modal").modal("hide");
                        
                        showNotification("danger","Please contact the hotel administrator to place a key card to the selected room. ");
                        console.log(data);
                    }
                }
        });

        

    });








    // Continue Button 
    $(document).on("click", "#guest_continue", function(){
        $("#view_reservationInformationPrev").removeClass("active");
        var penalty = getValueForm("additionalFeeDiv");
        if(penalty.length > 0){
            var penaltyDesc = [];
            var penaltyFee  = [];
            penalty.map(items=>{
                if(items["penaltyDesc"] == undefined){
                    penaltyFee.push(items["penaltyFee"].replace(",",""));
                }else{
                    penaltyDesc.push(items["penaltyDesc"]);
                }
            });
    
            var mainSpanFeeDivision  = "";
                penaltyDesc.map((penaltyDescItems, penaltyDescIndex) =>{
                    mainSpanFeeDivision +=   `   
                                            <div class="row mt-1 penaltySpanFeeDiv">
                                                    <div class="col-6 text-left">
                                                        <span class="font-weight-bold">${penaltyDescItems}</span>
                                                    </div>
                                                    <div class="col-6 text-right">
                                                            <span>${formatCurrency(penaltyFee[penaltyDescIndex])}</span>
                                                    </div>
                                            </div>
                                            `;
                });
            var total_penalty_fee = arraySum(penaltyFee);
           
        }else{
            var mainSpanFeeDivision =   `  <div class="row mt-1 penaltySpanFeeDiv">
                                                    <div class="col-12 text-left">
                                                        <span class="font-weight-bold"> No penalty</span>
                                                    </div>
                                            </div>
                                        `;
            var total_penalty_fee = "0";
        }
        console.log(penaltyFee);
        $(".mainSpanFeeDivision").html(mainSpanFeeDivision);
        $(".total_penalty_fee").text(formatCurrency(total_penalty_fee));
        // Room Price
        var view_span_totalRoomPrice    = $(".view_span_totalRoomPrice").text().replace("₱","");
        var totalRoomPrice              = parseFloat(view_span_totalRoomPrice.replace(",",""));
        // Extra Preferrences
        var total_additional_services   = $(".total_additional_services").text().replace("₱","");
        var additional_services         = parseFloat(total_additional_services.replace(",",""));
        // Penalty Fee
        var total_penalty_fee           = $(".total_penalty_fee").text().replace("₱","");
        var penalty_fee                 = parseFloat(total_penalty_fee.replace(",",""));
        // Guest Payment
        var total_guest_payment         = $(".total_guest_payment").text().replace("₱","");
        var guest_payment               = parseFloat(total_guest_payment.replace(",",""));



        var running_balance             = (totalRoomPrice + additional_services + penalty_fee) - guest_payment;

        $(".running_balance").text(formatCurrency(running_balance));    




        $("#view_tab_guestInformation").addClass("doneTab").removeClass("active");
        $("#view_tab_verification").addClass("active").removeClass("doneTab");
        $("#view_tab_checkOutPayment").removeClass("doneTab active");

        $("#view_guestInformation").removeClass("in active");
        $("#view_reservationInformation").addClass("in active");
        $("#view_checkOutPayment").removeClass("in active");
    });

    // CHECK OUT 
    $(document).on("click", "#guest_checkout", function(){
       var running_balance      =   $(".running_balance").text().replace("₱","");
       var add_amountTendered   =   parseFloat($("#add_amountTendered").val().replace(",",""));
       $("#view_checkOutPaymentPrev").removeClass("active");
       if((parseFloat(running_balance.replace(",","")) > add_amountTendered ) || $("#add_amountTendered").val() == ""){
            $("#add_amountTendered").next().text("Invalid Amount");
            $("#add_amountTendered").addClass("is-invalid").removeClass("is-valid");
       }else{
            $("#view_tab_guestInformation").addClass("doneTab").removeClass("active");
            $("#view_tab_verification").addClass("doneTab").removeClass("active");
            $("#view_tab_checkOutPayment").addClass("active").removeClass("doneTab");
            $("#view_guestInformation").removeClass("in active");
            $("#view_reservationInformation").removeClass("in active");
            $("#view_checkOutPayment").addClass("in active");
            // /
            $(".final_payment").text(formatCurrency(add_amountTendered));
            // Getting Grand total of Guest Payment
            var total_guest_payment         =   $(".total_guest_payment").text().replace("₱","");
            var total_guest_paymentInt      =   parseFloat(total_guest_payment.replace(",",""));
            var grand_total_guest_payment   =   total_guest_paymentInt + add_amountTendered ;
            $(".grand_total_guest_payment").text(formatCurrency(grand_total_guest_payment));
            // Getting Grand Total
            var view_span_totalRoomPrice    =   $(".view_span_totalRoomPrice").text().replace("₱","");
            var view_span_totalRoomPriceInt =   parseFloat(view_span_totalRoomPrice.replace(",",""));

            var total_additional_services       =   $(".total_additional_services").text().replace("₱","");
            var total_additional_servicesInt    =   parseFloat(total_additional_services.replace(",","") );

            var total_penalty_fee               =   $(".total_penalty_fee").text().replace("₱","");
            var total_penalty_feeInt            =   parseFloat(total_penalty_fee.replace(",",""));


            var grandTotal                      =   view_span_totalRoomPriceInt + total_additional_servicesInt + total_penalty_feeInt;
            $(".grand_total").text(formatCurrency(grandTotal));
            // Getting Guest Change
            var guest_change                    =   grand_total_guest_payment - grandTotal;
            $(".guest_change").text(formatCurrency(guest_change));


            $("#add_amountTendered").removeClass("is-invalid").addClass("is-valid");
       }
    });

    // CONFIRM CHECKOUT
    $(document).on("click", "#confirm_checkout", function(){

        var confirmation_body   =   `
                                                        <h2 class="text-primary text-center confirmation_header_title">CHECK OUT GUEST</h2>
                                                        <p class="text-center my-2">Are you sure you want to check out guest?</p>
                                                    `;
                        $(".confirmation_body").html(confirmation_body);
                        var confirmation_footer =   `
                                        <button type="button" class="btn btn-primary shadow-none" id="btn_save_confirmation_checkout"> YES</button>
                                        <button type="button" class="btn btn-danger shadow-none btn_close_confirmation_add" data-process="2">NO</button>
                                    `;
                        $(".confirmation_footer").html(confirmation_footer);



        $("#viewReservation-modal").modal("hide");
        $("#confirmation-guest_checkout").modal("show");
    });

    // ADD CONFIRM CHECKOUT
    $(document).on("click", "#btn_save_confirmation_checkout", function(){
        var clientID                =   $(this).data("transactionid");
        var penalty = getValueForm("additionalFeeDiv");
        var penaltyDesc = [];
        var penaltyFee  = [];
            penalty.map(items=>{
                if(items["penaltyDesc"] == undefined){
                    penaltyFee.push(items["penaltyFee"])
                }else{
                    penaltyDesc.push(items["penaltyDesc"]);
                }
            });
        var clientPenaltyDesc       = penaltyDesc.join("|");
        var clientPenaltyPrice      = penaltyFee.join("|");    
        var clientTotalPenaltyFee   = arraySum(penaltyFee);
        var clientTotalPrice        = $(".grand_total").text().replace("₱","");
        var clientPayment           = $(".grand_total_guest_payment").text().replace("₱","");
        var clientPaymentChange     = $(".guest_change").text().replace("₱","");
        var data                    = { clientID,
                                        clientPenaltyDesc,
                                        clientPenaltyPrice,    
                                        clientTotalPenaltyFee   : clientTotalPenaltyFee.toFixed(2),
                                        clientTotalPrice        : clientTotalPrice.replace(",",""),
                                        clientPayment           : clientPayment.replace(",",""),
                                        clientPaymentChange     : clientPaymentChange.replace(",","")
                                      }
        $.ajax({
            url:"room_management/add_guest_checkout",
            method:"POST",
            data,
            dataType:"json",
            beforeSend:function(){
                
            },
            success:function(data){
                // console.log(data);
                if(data != "FALSE"){
                    list_of_rooms();
                    showNotification("success","Guest Check out successfully");
                    $(".confirmation").modal("hide");
                }else{  
                    showNotification("danger","System Error: Please Contact your IT-Administrator Immediately");
                }
            }   
        });

    });
    // CLOSE CONFIRM CHECKOUT
    $(document).on("click",".btn_close_confirmation_checkout", function(){
        $("#confirmation-guest_checkout").modal("hide");
        $("#viewReservation-modal").modal("show");
    });
        
        
/** END  ++++++++++++++++++++++++++++++++++++++  PROCESS IN RESERVATION  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

































/** START ++++++++++++++++++++++++++++++++++++++  FUNNCTIONS  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
    function scheduleList_tbl_datatable(){
        if ($.fn.DataTable.isDataTable('#userAccountTable')){
            $('.scheduleList_tbl').DataTable().destroy();
        }
        $(".scheduleList_tbl").DataTable();

    }

    function room_management_datepicker(){
        $('#roomManagement_datePicker').daterangepicker({
            autoApply: true,
            opens: "center",
            autoApply:true,
            startDate: moment(),
            endDate: moment().add(30, 'days'),
            locale: {
                format: 'MMMM DD, YYYY'
            }
        });
    }

    function room_reservation_datepicker(disabledDays){
        $('#roomReservation_datepicker').daterangepicker('remove');

        $('#roomReservation_datepicker').daterangepicker({
            autoApply: true,
            opens:  "center",
            minDate: moment(),
            startDate: moment(),
            endDate: moment().add(1, 'days'),
            locale: {
                format: 'MMMM DD YYYY'
            },
            isInvalidDate: function (date) {
                for(i = 0; i < disabledDays.length; i++){
                    for(j = 0; j < disabledDays[i].length; j++){
                        if (date.format('MMMM DD YYYY') == disabledDays[i][j]) {
                            return true; 
                        }
                    }
                }
            }
        });


        
    }

    function list_of_rooms(roomTypeID){
        $.ajax({
            url:"room_management/list_of_room",
            method:"POST",
            data:{roomTypeID},
            dataType:"json",
            beforeSend:function(){
                var roomRows = `<div class="loader w-100 p-5 text-center">
			                    <div class="mt-3"><i class="zmdi zmdi-rotate-right zmdi-hc-spin zmdi-hc-3x text-primary"></i>
			                    <br>
			                    <p class="text-primary">Please wait...</p>
			                </div>`;
			    $("#room-rows").html(roomRows);
                // divLoader("room-rows","Loading");
                resetModals();
            },
            success:function(data){
            var  roomRows = ""; 
            //    console.log(data);
                
                data.map(items=>{
                    var dateRange       =   $("#roomManagement_datePicker").val();
                    var roomType        =   items["roomTypeID"];
                    var roomListID      =   items["roomListID"];
                    var secondData      =   {dateRange,roomType,roomListID};
                    
                        $.ajax({
                            url:"room_management/get_schedule",
                            method:"POST",
                            data:secondData,
                            dataType:"json",
                            beforeSend:function(){},
                            success:function(scheduleData){
                                var schedule_list = "";
                                scheduleData.map(scheduleItems=>{
                                    // console.log(scheduleItems);
                                    switch(scheduleItems["clientStatus"]){
                                        case "1":
                                            var scheduleStatus = `<span class="badge badge-warning">Reserved</span>`;
                                            var scheduleButton = `<button class="btn btn-primary px-2 py-0 view_reservation" data-transaction="${scheduleItems["mainClientID"]}" style=" font-size: 95%;">
                                                                    View <i class="fa fa-eye" aria-hidden="true"></i>
                                                                  </button>`;
                                             break;
                                        case "2":
                                            var scheduleStatus = `<span class="badge badge-secondary">Occupied</span>`;
                                            var scheduleButton = `<button class="btn btn-primary px-2 py-0 view_reservation" data-transaction="${scheduleItems["mainClientID"]}" style=" font-size: 95%;">
                                                                    View <i class="fa fa-eye" aria-hidden="true"></i>
                                                                  </button>`;
                                            break;
                                        case "3":
                                            var scheduleStatus = `<span class="badge badge-danger">Reschedule</span>`;
                                             break;
                                        case "4":
                                            var scheduleStatus = `<span class="badge badge-danger">Cancel</span>`;
                                             break;
                                        default:
                                            var scheduleStatus = `<span class="badge badge-success">Checkout</span>`;
                                            var scheduleButton = `<button class="btn btn-primary px-2 py-0 view_checkedout" data-transaction="${scheduleItems["mainClientID"]}" style=" font-size: 95%;">
                                                                    View <i class="fa fa-eye" aria-hidden="true"></i>
                                                                  </button>`;
                                    }
                                    


                                    schedule_list   +=   `
                                                        <tr>
                                                            <td>${scheduleItems["transactionNumber"]}</td>
                                                            <td>${scheduleItems["fullname"]}</td>
                                                            <td>${moment(new Date(scheduleItems["clientCheckIn"])).format("MMMM DD, YYYY hh:mma")}</td>
                                                            <td>${moment(new Date(scheduleItems["clientInitialCheckOut"])).format("MMMM DD, YYYY hh:mma")}</td>
                                                            <td class="text-center">${scheduleStatus}</td>
                                                            <td class="text-center">${scheduleButton}</td>
                                                        </tr>
                                                        `;
                                    
                                });
                                roomRows += `
                                                <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                                    <div class="card bg-light border mt-3" id="roomManagementBody"
                                                        style="border-radius: 5px;">
                                                        <div class="card-header text-center">
                                                            <h4><strong class="text-primary">${items["roomNameCombination"]}</strong></h4>
                                                            <p>(${items["roomTypeName"]})</p>
                                                                <div class="row mt-3">
                                                                <!--
                                                                    <div class="col-4">
                                                                        <input type="checkbox" class="filtering_checkbox"  data-roomlistid="${items["roomListID"]}">
                                                                        <label>Checked Out</label>
                                                                    </div>
                                                                    <div class="col-4">
                                                                        <input type="checkbox" class="filtering_checkbox" id="show_occupied${items["roomListID"]}"  data-roomlistid="${items["roomListID"]}" checked>
                                                                        <label>Occupied</label>
                                                                    </div>
                                                                    <div class="col-4">
                                                                        <input type="checkbox" class="filtering_checkbox" id="show_schedule${items["roomListID"]}"  data-roomlistid="${items["roomListID"]}" checked>
                                                                        <label>Scheduled</label>
                                                                    </div>
                                                                    <div class="col-3">
                                                                        <input type="checkbox" class="filtering_checkbox" id="show_available${items["roomListID"]}"  data-roomlistid="${items["roomListID"]}" checked>
                                                                        <label>Available</label>
                                                                    </div> --->
                                                                </div>
                                                        </div>

                                                        <div class="card-body">
                                                            <div class="table-responsive" style="font-size:80%;">
                                                                <table class="table table-bordered table-striped table-hover scheduleList_tbl" id="scheduleList_tbl_${items["roomListID"]}">
                                                                    <thead class="bg-primary text-white">
                                                                        <tr>
                                                                            <th>Transaction No.</th>
                                                                            <th>Guest Name</th>
                                                                            <th>Check In</th>
                                                                            <th>Check Out</th>
                                                                            <th style="width:10%;">Status</th>
                                                                            <th style="width:10%;">Action</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        ${schedule_list}
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                        
                                                        <div class="card-footer d-flex justify-content-center">
                                                            <button class="btn btn-primary px-5 py-2 check_availability" data-roomlistid="${items["roomListID"]}">Check Availability</button>
                                                        </div>



                                                    </div>
                                            </div>`;
                                $("#room-rows").html(roomRows);
                                scheduleList_tbl_datatable();
                                
                            }
                        });
                    
                });
                


                
            }
        });
    }

    function search_guest_information(theValue){

        if(theValue == "NONE" || theValue == ""){
            $("#add_firstName").val("");
            $("#add_lastName").val("");
            $("#add_unitNum").val("");
            $("#add_building").val("");
            $("#add_street").val("");
            $("#add_subdivision").val("");
            $("#add_barangay").val("");
            $("#add_city").val("");
            $("#add_province").val("");
            $("#add_country").val("");
            $("#add_zipcode").val("");
            $("#add_contact").val("");
            $("#add_email").val("");
            $("#add_username").val("");
            $("#add_password").val("").prop('disabled', false);
            $("#mask-password").html('<i class="show-password fa fa-fw fa-eye" id="password-field"></i>');

            var button = `<button type="button" class="btn btn-primary text-light shadow-none px-4 p-2" id="accountInformationNext" data-guestid="0">
                                    NEXT
                                   </button>`;
            $(".guestInformationDiv").html(button);
        }else{
            $.ajax({
                url: "room_management/guest_information",
                method:"POST",
                data: {theValue},
                dataType:"json",
                success:function(data){
                    $("#add_firstName").val(data[0]["accountFirstname"]);
                    $("#add_lastName").val(data[0]["accountLastname"]);
                    $("#add_unitNum").val(data[0]["accountUnitNumber"]);
                    $("#add_building").val(data[0]["accountBuilding"]);
                    $("#add_street").val(data[0]["accountStreetName"]);
                    $("#add_subdivision").val(data[0]["accountSubdivision"]);
                    $("#add_barangay").val(data[0]["accountBarangay"]);
                    $("#add_city").val(data[0]["accountCity"]);
                    $("#add_province").val(data[0]["accountProvince"]);
                    $("#add_country").val(data[0]["accountCountry"]);
                    $("#add_zipcode").val(data[0]["accountZipCode"]);
                    $("#add_contact").val(data[0]["accountContactNumber"]);
                    $("#add_email").val(data[0]["accountEmail"]);
                    $("#add_username").val(data[0]["accountUsername"]);
                    $("#add_password").val(data[0]["accountPassword"]).prop('disabled', true);
                    
                    $("#mask-password").html('<i class="fa fa-fw fa-eye"></i>');
                    var button = `
                                <button type="button" class="btn btn-outline-primary shadow-none px-4 p-2"
                                id="accountInformationPrev" data-toggle="tab" href="#roomInformation">
                                    PREVIOUS</button>
                                <button type="button" class="btn btn-primary text-light shadow-none px-4 p-2" id="accountInformationNext" data-guestid="${data[0]["accountID"]}">
                                    NEXT
                                </button>`;
					$(".guestInformationDiv").html(button);
					// console.log("AGUY "+data);
                }
            });
        }
        
    }

    function add_guestAccount(){
        if($("#accountInformationNext").data("guestid") == 0){
            var add_firstName       = $("#add_firstName").val();
            var add_lastName        = $("#add_lastName").val();
            var add_unitNum         = $("#add_unitNum").val();
            var add_building        = $("#add_building").val();
            var add_street          = $("#add_street").val();
            var add_subdivision     = $("#add_subdivision").val();
            var add_barangay        = $("#add_barangay").val();
            var add_city            = $("#add_city").val();
            var add_province        = $("#add_province").val();
            var add_country         = $("#add_country").val();
            var add_zipcode         = $("#add_zipcode").val();
            var add_contact         = $("#add_contact").val();
            var add_email           = $("#add_email").val();
            var add_username        = $("#add_username").val();  
            var add_password        = $("#add_password").val();
            var data                = { "add_firstName"       : add_firstName,
                                        "add_lastName"        : add_lastName,
                                        "add_unitNum"         : add_unitNum,
                                        "add_building"        : add_building,
                                        "add_street"          : add_street,
                                        "add_subdivision"     : add_subdivision,
                                        "add_barangay"        : add_barangay,
                                        "add_city"            : add_city,
                                        "add_province"        : add_province,
                                        "add_country"         : add_country,
                                        "add_zipcode"         : add_zipcode,
                                        "add_contact"         : add_contact,
                                        "add_email"           : add_email,
                                        "add_username"        : add_username,  
                                        "add_password"        : add_password
                                        };
            $.ajax({
                url:"room_management/add_customer_account",
                method:"POST",
                data,
                dataType:"json",
                beforeSend:function(){
                    var guestInformationDiv =  ` <button type="button" class="btn btn-outline-primary shadow-none px-4 p-2" id="accountInformationPrev" data-toggle="tab" href="#roomInformation">
                                                    PREVIOUS
                                                </button>
                                                <button type="button" class="btn btn-primary text-light shadow-none px-4 p-2 disabled" data-guestid="0">
                                                    NEXT
                                                </button>`;
                    $(".guestInformationDiv").html(guestInformationDiv); 
                },
                success:function(data){
                        if(data != "FALSE"){
                            var condition   = data.split("|");
                            var guestid     = condition.pop();
                                console.log("GUEST ID"+ data+" GUEST ID "+guestid);
                            var guestInformationDiv =  ` <button type="button" class="btn btn-outline-primary shadow-none px-4 p-2" id="accountInformationPrev" data-toggle="tab" href="#roomInformation">
                                        PREVIOUS
                                    </button>
                                    <button type="button" class="btn btn-primary text-light shadow-none px-4 p-2" id="accountInformationNext" data-guestid="${guestid}">
                                        NEXT
                                    </button>`;
                            $(".guestInformationDiv").html(guestInformationDiv); 

                        }else{
                                showNotification("danger", "System Error:(GUEST) Please contact your IT-Administrator");
                        }
                }
            });
        }else{
            $("#tab_guestInformation").removeClass("active").addClass("doneTab");
            $("#guestInformation").removeClass("in active");
            $("#tab_verification").addClass("active").removeClass("doneTab");
            $("#verification").addClass("in active");

            var guestFullname     = $("#add_firstName").val()+" "+ $("#add_lastName").val();
            var guestFullAddress  = $("#add_unitNum").val()+" "+ $("#add_building").val()+" "+ $("#add_street").val()+" "+ $("#add_subdivision").val()+" "+ $("#add_barangay").val()+" "+ $("#add_city").val()+" "+ $("#add_province").val()+" "+ $("#add_country").val()+" "+ $("#add_zipcode").val();
            var guestEmail        = $("#add_email").val();
            $("#guestSpanName").text(guestFullname);
            $("#spanGuestAddress").text(guestFullAddress);
            $("#spanGuestEmail").text(guestEmail);

            var pesoReplace_add_initialAmount_room = $("#add_initialAmount_room").val().replace("₱","");
            var comaReplace_add_initialAmount_room = pesoReplace_add_initialAmount_room.replace(",","");
            var add_initialAmount_room          = parseFloat(comaReplace_add_initialAmount_room);

            var pesoReplace_add_initialAmount_ext_services2 = $("#add_initialAmount_ext_services2").val().replace("₱","");
            var comaReplace_add_initialAmount_ext_services2 = pesoReplace_add_initialAmount_ext_services2.replace(",","");
            var add_initialAmount_ext_services2             = parseFloat(comaReplace_add_initialAmount_ext_services2);
            var add_initialAmount_total_amount = add_initialAmount_room + add_initialAmount_ext_services2;
            $("#add_initialAmount_total_amount").val(formatCurrency(add_initialAmount_total_amount));
        }
    }

    function reservationVerification(condition, adminID){
        // Get the standard Checkin CheckOut
        var standardCheckinCheckout    =   standardCheckInCheckOut().split("|");


        var clientStatus        = condition == "reserve" ? "1" : "2";
        // guest Information
        var add_guestID         =   $("#accountInformationNext").data("guestid");  
        
            var card_access         =   $("#card_access").val();
            var roomListID          =   $("#hidden_roomListID").val();
            var roomTypeID          =   $("#hidden_roomTypeID").val();
            var preferredDateRange  =   $("#roomReservation_datepicker").val().split("-");
            var checkIn             =   preferredDateRange.shift() + standardCheckinCheckout.shift();
            var checkOut            =   preferredDateRange.pop() + standardCheckinCheckout.pop();
            var add_adult           =   $("#add_adult").val();
            var add_children        =   $("#add_children").val();
            var add_infant          =   $("#add_infant").val();
            var roomRegistration    =   getValueForm("roomRegistrationForm");
            //  START FOR EXTRA SERVICES
                var extraServicesValue      =   [];
                roomRegistration.map(extraServices=>{
                    extraServices["extraServices"] === undefined ? null : extraServicesValue.push(extraServices["extraServices"]) ;
                });
                var extraServicesDesc    =   [];
                var extraServicesAmt     =   [];
                var extraServicesAt      =   [];
                var extraServicesID      =   [];
                extraServicesValue.map(items=>{
                    var  theValue = items.split("|");
                            extraServicesDesc.push(theValue[0]);
                            extraServicesAmt.push(theValue[1]);
                            extraServicesAt.push(theValue[2]);
                            extraServicesID.push(theValue[3]);
                });
                extServicesDesc     = extraServicesDesc.join("|");
                extServicesAmt      = extraServicesAmt.join("|");
                extServicesAt       = extraServicesAt.join("|");
                extServicesID       = extraServicesID.join("|");
            var totalExtServices    =  $("#add_initialAmount-ext_services").val();
            var couponCode          =  ($("#add_couponCode").hasClass("is-invalid") || $("#add_couponCode").val() == "") ? "" :  $("#add_couponCode").val();
            var couponCodeRate      = couponCode == "" ? "" : $("#add_couponRate").val();
            var couponAmount        = couponCode == "" ? "" : $("#add_couponAmount").val();


            //  END FOR EXTRA SERVICES
            guest_reservation = {   
                                    "adminID"                           : adminID,
                                    "card_access"                       : card_access,
                                    "accountID"                         : add_guestID,
                                    "roomTypeID"                        : roomTypeID,
                                    "roomListID"                        : roomListID,
                                    "checkIn"                           : checkIn,
                                    "checkOut"                          : checkOut,
                                    "add_adult"                         : add_adult,
                                    "add_children"                      : add_children,
                                    "add_infant"                        : add_infant,
                                    "extServicesDesc"                   : extServicesDesc,
                                    "extServicesAmt"                    : extServicesAmt, 
                                    "extServicesAt"                     : extServicesAt,
                                    "extServicesID"                     : extServicesID, 
                                    "add_couponCode"                    : couponCode,
                                    "add_couponRate"                    : couponCodeRate,
                                    "add_couponAmount"                  : couponAmount,
                                    "add_initialAmount"                 : $("#add_initialAmount").val(),
                                    "add_initialAmount_room"            : $("#add_initialAmount_room").val(),
                                    "add_initialAmount_ext_services"    : $("#add_initialAmount_ext_services2").val(),
                                    "add_initialAmount_total_amount"    : $("#add_initialAmount_total_amount").val(),
                                    "clientStatus"                      : clientStatus
                                }
            $.ajax({
                url:"room_management/add_guest_schedule",
                method:"POST",
                data:guest_reservation,
                dataType:"json",
                success:function(data){
                    // console.log(data);
                        var condition = data.split("|");
                        if(condition[0] != "FALSE"){
                            var successMessage  = condition[1] == "1"? "New reservation added": "Successfully Check In";
                            showNotification("success", successMessage);
                            list_of_rooms(condition[2]);
                            $("#roomType").val(condition[2]);
                            // $("#roomType").val("'"+condition[2]+"'").trigger("change");
                            $("#confirmation-add_schedule_modal").modal("hide"); 
                        }else{
                            showNotification("danger", condition.pop());
                        }
                    // console.log(data);
                }
            });

    }   

    function checkInVerification(guestID){
        var card_access         =   $("#card_access").val();
        $.ajax({
            url:"room_management/check_in",
            method:"POST",
            data:{guestID,card_access},
            dataType:"json",
            success:function(data){
                console.log(data);
                if(data != "FALSE"){
                    showNotification("success","Guest Check in Successfully");
                    list_of_rooms(data);
                    $("#confirmation-add_schedule_modal").modal("hide");
                }else{
                    showNotification("danger","System Error: Please contact your IT-Administrator Immediately");
                    console.log(data);
                }   
            }
        });
    }




   function resetModals(){
       $("#addReservation-modal").html(`
       <div class="modal-dialog modal-dialog-centered modal-min modal-xl" role="document">
       <div class="modal-content">
           <div class="modal-header bg-primary text-light">
               <h5 class="page-title font-weight-bold">ADD RESERVATION FORMS</h5>
               <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                   <span class="text-light" aria-hidden="true">×</span>
               </button>
           </div>
           <div class="modal-body pb-3 text-center">
               <!-- Nav tabs -->
               <ul class="nav nav-tabs nav-justified" role="tablist" style="border:none">
                   <li class="nav-item mx-2">
                       <a class="nav-link active" data-toggle="tab" id="tab_roomInformation" href="#roomInformation">
                           <i class="zmdi zmdi-view-web"></i> Room Information 
                       </a>
                   </li>
                   <li class="nav-item mx-2">
                       <a class="nav-link disabled" data-toggle="tab" id="tab_guestInformation" href="#guestInformation"> 
                           <i class="zmdi zmdi-assignment-account"></i> Account Information 
                       </a>
                   </li>
                   <li class="nav-item mx-2">	
                       <a class="nav-link disabled" data-toggle="tab" id="tab_verification" href="#initialPayment">
                           <i class="zmdi zmdi-money-box"></i> Verification 
                       </a>
                   </li>
                   <li class="nav-item mx-2">
                       <a class="nav-link disabled" data-toggle="tab" id="tab_checkOutPayment" href="">
                           <i class="zmdi zmdi-badge-check"></i> Approval &amp; Assignment
                       </a>
                   </li>
               </ul>

               <!-- Tab panes -->
               <div class="tab-content mt-3 add_schedule_modal">
                   <div role="tabpanel" class="tab-pane p-3 in active" id="roomInformation">
                           <form id="roomRegistrationForm">
                                       <div class="row">
                                           <div class="col-md-6">
                                               <div class="form-group text-left">
                                                   <input type="hidden" id="hidden_roomListID" value="3">
                                                   <input type="hidden" id="hidden_roomTypeID" value="3">
                                                   <label>Preferred Date <strong class="text-danger">*</strong></label>
                                                   <input type="button" class="form-control validate is-invalid" id="roomReservation_datepicker" value="January 20 2021 - January 21 2021">
                                                   <div class="invalid-feedback">There is already an existing reservation on the selected date range.</div>
                                               </div>
                                           </div>
                                           <div class="col-md-2">
                                               <div class="form-group text-left">
                                                   <label>Adult <strong class="text-danger">*</strong></label>
                                                   <input type="text" class="form-control validate" minlength="1" maxlength="2" value="1" data-allowcharacters="[0-9]" id="add_adult">
                                                   <div class="invalid-feedback">This field is Required</div>
                                               </div>
                                           </div>
                                           <div class="col-md-2">
                                               <div class="form-group text-left">
                                                   <label>Children <strong class="text-danger">*</strong></label>
                                                   <input type="text" class="form-control validate" minlength="1" maxlength="2" value="" data-allowcharacters="[0-9]" id="add_children">
                                                   <div class="invalid-feedback">This field is Required</div>
                                               </div>
                                           </div>
                                           <div class="col-md-2">
                                               <div class="form-group text-left">
                                                   <label>Infant <strong class="text-danger">*</strong></label>
                                                   <input type="text" class="form-control validate" minlength="1" maxlength="2" value="" data-allowcharacters="[0-9]" id="add_infant">
                                                   <div class="invalid-feedback">This field is Required</div>
                                               </div>
                                           </div>
                                           <div class="col-6">
                                               <div class="form-group text-left">
                                                   <h5 class="text-primary">Avail Room</h5>
                                                   <div class="col-12 text-left d-flex justify-content-between">
                                                       <span class="font-weight-bold px-1 d-flex justify-content-start">Room Type:
                                                       </span> 
                                                       <span class="px-2 d-flex justify-content-end span_roomType" id="">Superior Twin</span>
                                                   </div>
                                                   <div class="col-12 text-left d-flex justify-content-between">
                                                       <span class="font-weight-bold px-1 d-flex justify-content-start">Room Number:
                                                       </span>
                                                       <span class="px-2 d-flex justify-content-end span_roomNumber" id="">ST-RM-401</span>
                                                   </div>
                                                   <div class="col-12 text-left d-flex justify-content-between">
                                                       <span class="font-weight-bold px-1 d-flex justify-content-start">Room Price:
                                                       </span>
                                                       <span class="px-2 d-flex justify-content-end" id="span_roomPrice">Starts from ₱50.00</span>
                                                   </div>
                                                   <h5 class="text-primary mt-1">Amenities Included</h5>
                                                   <div class="row included_amenities">
                                           <div class="col-4 py-1" style="font-size:95%;">
                                               <i class="icon-check text-success"></i>&nbsp;Aircondition
                                           </div>
                                           
                                           <div class="col-4 py-1" style="font-size:95%;">
                                               <i class="icon-check text-success"></i>&nbsp;Premium Beddings
                                           </div>
                                           
                                           <div class="col-4 py-1" style="font-size:95%;">
                                               <i class="icon-check text-success"></i>&nbsp;Smoke-free Rooms
                                           </div>
                                           
                                           <div class="col-4 py-1" style="font-size:95%;">
                                               <i class="icon-check text-success"></i>&nbsp;Wi-Fi
                                           </div>
                                           </div>
                                               </div>
                                           </div>
                                           <div class="col-6">
                                               <div class="form-group text-left">
                                                   <h5 class="text-primary">Extra Services</h5>
                                                   <div class="row extra_amenities" style="font-size:95%;">
                                           <div class="col-6 py-1" style="font-size:95%;">
                                               <div class="d-flex justify-content-between">
                                                   <span>
                                                       <input type="checkbox" class="extraServices" id="extraServices" value="Unlimited Breakfast|550.00|2021-01-06 03:03:34|1"> 
                                                       Unlimited Breakfast
                                                   </span>
                                                   <span>₱550.00</span>
                                               </div>
                                           </div>
                                           
                                           <div class="col-6 py-1" style="font-size:95%;">
                                               <div class="d-flex justify-content-between">
                                                   <span>
                                                       <input type="checkbox" class="extraServices" id="extraServices" value="Jacuzzi|254.00|2021-01-11 09:00:05|2"> 
                                                       Jacuzzi
                                                   </span>
                                                   <span>₱254.00</span>
                                               </div>
                                           </div>
                                           
                                           <div class="col-6 py-1" style="font-size:95%;">
                                               <div class="d-flex justify-content-between">
                                                   <span>
                                                       <input type="checkbox" class="extraServices" id="extraServices" value="Entertainment Set|2500.50|2021-01-06 03:07:30|3"> 
                                                       Entertainment Set
                                                   </span>
                                                   <span>₱2,500.50</span>
                                               </div>
                                           </div>
                                           
                                           <div class="col-6 py-1" style="font-size:95%;">
                                               <div class="d-flex justify-content-between">
                                                   <span>
                                                       <input type="checkbox" class="extraServices" id="extraServices" value="Door-to-Door Pick-up|3500.00|2021-01-06 03:19:29|5"> 
                                                       Door-to-Door Pick-up
                                                   </span>
                                                   <span>₱3,500.00</span>
                                               </div>
                                           </div>
                                           
                                           <div class="col-6 py-1" style="font-size:95%;">
                                               <div class="d-flex justify-content-between">
                                                   <span>
                                                       <input type="checkbox" class="extraServices" id="extraServices" value="Airport Pick-up|1500.00|2021-01-06 03:23:26|6"> 
                                                       Airport Pick-up
                                                   </span>
                                                   <span>₱1,500.00</span>
                                               </div>
                                           </div>
                                           
                                           <div class="col-6 py-1" style="font-size:95%;">
                                               <div class="d-flex justify-content-between">
                                                   <span>
                                                       <input type="checkbox" class="extraServices" id="extraServices" value="Spa and Massage|550.00|2021-01-06 03:24:50|7"> 
                                                       Spa and Massage
                                                   </span>
                                                   <span>₱550.00</span>
                                               </div>
                                           </div>
                                           
                                           <div class="col-6 py-1" style="font-size:95%;">
                                               <div class="d-flex justify-content-between">
                                                   <span>
                                                       <input type="checkbox" class="extraServices" id="extraServices" value="Island Hopping|4500.00|2021-01-06 03:26:06|8"> 
                                                       Island Hopping
                                                   </span>
                                                   <span>₱4,500.00</span>
                                               </div>
                                           </div>
                                           
                                           <div class="col-6 py-1" style="font-size:95%;">
                                               <div class="d-flex justify-content-between">
                                                   <span>
                                                       <input type="checkbox" class="extraServices" id="extraServices" value="Bar|535.00|2021-01-06 03:26:19|9"> 
                                                       Bar
                                                   </span>
                                                   <span>₱535.00</span>
                                               </div>
                                           </div>
                                           
                                           <div class="col-6 py-1" style="font-size:95%;">
                                               <div class="d-flex justify-content-between">
                                                   <span>
                                                       <input type="checkbox" class="extraServices" id="extraServices" value="Overnight Parking|155.00|2021-01-06 03:28:04|11"> 
                                                       Overnight Parking
                                                   </span>
                                                   <span>₱155.00</span>
                                               </div>
                                           </div>
                                           
                                           <div class="col-6 py-1" style="font-size:95%;">
                                               <div class="d-flex justify-content-between">
                                                   <span>
                                                       <input type="checkbox" class="extraServices" id="extraServices" value="Kayaking|436.00|2021-01-06 03:28:16|12"> 
                                                       Kayaking
                                                   </span>
                                                   <span>₱436.00</span>
                                               </div>
                                           </div>
                                           
                                           <div class="col-6 py-1" style="font-size:95%;">
                                               <div class="d-flex justify-content-between">
                                                   <span>
                                                       <input type="checkbox" class="extraServices" id="extraServices" value="Fire Dance Performance|1300.00|2021-01-08 00:51:16|16"> 
                                                       Fire Dance Performance
                                                   </span>
                                                   <span>₱1,300.00</span>
                                               </div>
                                           </div>
                                           </div>
                                                   <div class="row">
                                                       <div class="col-6">
                                                           <!--- <button type="button" class="btn btn-primary w-100" id="updateExtraAmenities">
                                                                                               Submit
                                                                                           </button>  --->
                                                       </div>
                                                       <div class="col-6">
                                                           <div class="input-group">
                                                               <div class="input-group-prepend">
                                                                   <span class="input-group-text"><span class="font-weight-bold">₱</span></span>
                                                               </div>
                                                               <input type="text" value="0.00" autocomplete="off" class="form-control text-right" id="add_initialAmount-ext_services" readonly="">
                                                           </div>
                                                       </div>
                                                   </div>
                                               </div>
                                           </div>
                                       </div>
                           </form>
                               <div class="border-top pt-3 d-flex justify-content-end" id="roomInformationFooter">
                                   <button type="button" class="btn btn-primary text-light shadow-none px-4 p-2" id="roomInformationNext">
                                       NEXT</button>
                               </div>
                   </div>
                   <div role="tabpanel" class="tab-pane p-3" id="guestInformation">
                       <form id="customerRegistrationForm">
                           <div class="row">
                               <div class="col-md-6">
                                   <div class="form-group">
                                       <label>First Name <strong class="text-danger">*</strong></label>
                                       <input type="text" class="form-control validate" required="" data-allowcharacters="[a-z][A-Z][.][,]['][ ]" minlength="2" maxlength="50" autocomplete="off" id="add_firstName">
                                       <div class="invalid-feedback text-left">This field is Required</div>
                                   </div>
                               </div>
                               <div class="col-md-6">
                                   <div class="form-group">
                                       <label>Last Name <strong class="text-danger">*</strong></label>
                                       <input type="text" class="form-control validate" required="" data-allowcharacters="[a-z][A-Z][.][,]['][ ]" minlength="2" maxlength="50" autocomplete="off" id="add_lastName">
                                       <div class="invalid-feedback text-left">This field is Required</div>
                                   </div>
                               </div>
                               <div class="col-md-3">
                                   <div class="form-group">
                                       <label>Unit No.</label>
                                       <input type="text" autocomplete="off" class="form-control validate" required="" data-allowcharacters="[a-z][A-Z][.][-][#][0-9][ ]" minlength="2" maxlength="50" id="add_unitNum">
                                   </div>
                               </div>
                               <div class="col-md-3">
                                   <div class="form-group">
                                       <label>House No./ Building <strong class="text-danger">*</strong></label>
                                       <input type="text" autocomplete="off" class="form-control validate" required="" data-allowcharacters="[a-z][A-Z][.][-][#][0-9][ ]" minlength="2" maxlength="50" id="add_building">
                                       <div class="invalid-feedback text-left">This field is Required</div>
                                   </div>
                               </div>
                               <div class="col-md-3">
                                   <div class="form-group">
                                       <label>Street <strong class="text-danger">*</strong></label>
                                       <input type="text" autocomplete="off" class="form-control validate" required="" data-allowcharacters="[a-z][A-Z][.][-][#][0-9][ ]" minlength="2" maxlength="50" id="add_street">
                                       <div class="invalid-feedback text-left">This field is Required</div>
                                   </div>
                               </div>
                               <div class="col-md-3">
                                   <div class="form-group">
                                       <label>Subdivision <strong class="text-danger">*</strong></label>
                                       <input type="text" autocomplete="off" class="form-control validate" required="" data-allowcharacters="[a-z][A-Z][.][-][#][0-9][ ]" minlength="2" maxlength="50" id="add_subdivision">
                                       <div class="invalid-feedback text-left">This field is Required</div>
                                   </div>
                               </div>
                               <div class="col-md-3">
                                   <div class="form-group">
                                       <label>Barangay <strong class="text-danger">*</strong></label>
                                       <input type="text" autocomplete="off" class="form-control validate" required="" data-allowcharacters="[a-z][A-Z][.][-][#][0-9][ ]" minlength="2" maxlength="50" id="add_barangay">
                                       <div class="invalid-feedback text-left">This field is Required</div>
                                   </div>
                               </div>
                               <div class="col-md-3">
                                   <div class="form-group">
                                       <label>City/Municipality <strong class="text-danger">*</strong></label>
                                       <input type="text" autocomplete="off" class="form-control validate" required="" data-allowcharacters="[a-z][A-Z][ ][-]" minlength="2" maxlength="50" id="add_city">
                                       <div class="invalid-feedback text-left">This field is Required</div>
                                   </div>
                               </div>
                               <div class="col-md-3">
                                   <div class="form-group">
                                       <label>Province <strong class="text-danger">*</strong></label>
                                       <input type="text" autocomplete="off" class="form-control validate" required="" data-allowcharacters="[a-z][A-Z][ ][-]" minlength="2" maxlength="50" id="add_province">
                                       <div class="invalid-feedback text-left">This field is Required</div>
                                   </div>
                               </div>

                               <div class="col-md-3">
                                   <div class="form-group">
                                       <label>Country <strong class="text-danger">*</strong></label>
                                       <input type="text" autocomplete="off" class="form-control validate" required="" data-allowcharacters="[a-z][A-Z][ ][-]" minlength="2" maxlength="50" id="add_country">
                                       <div class="invalid-feedback text-left">This field is Required</div>
                                   </div>
                               </div>
                               <div class="col-md-4">
                                   <div class="form-group">
                                       <label>Zip Code <strong class="text-danger">*</strong></label>
                                       <input type="text" autocomplete="off" class="form-control validate" required="" data-allowcharacters="[0-9]" minlength="4" maxlength="4" id="add_zipcode">
                                       <div class="invalid-feedback text-left">This field is Required</div>
                                   </div>
                               </div>
                               <div class="col-md-4">
                                   <div class="form-group">
                                       <label>Contact Number <strong class="text-danger">*</strong></label>
                                       <input type="text" autocomplete="off" class="form-control validate mobile-number" data-allowcharacters="[0-9][-]" id="add_contact" minlength="13" maxlength="13">
                                       <div class="invalid-feedback text-left">This field is Required</div>
                                   </div>
                               </div>
                               <div class="col-md-4">
                                   <div class="form-group">
                                       <label>Email <strong class="text-danger">*</strong></label>
                                       <input type="text" class="form-control validate" required data-allowcharacters="[a-z][A-Z][0-9][.][,][!][#][-][_][ ][@]" list="guestEmail" placeholder="Search Guest Email" id="add_email" autocomplete="off" maxlength="75">
                                       <div class="invalid-feedback text-left">This field is Required</div>
                                       
                                   </div>
                               </div>
                               <div class="col-md-6">
                                   <div class="form-group">
                                       <label>Username <strong class="text-danger">*</strong></label>
                                       <input type="text" class="form-control validate" required data-allowcharacters="[a-z][A-Z][0-9][.][,][!][#][-][_][ ][@]" list="guestUsername" placeholder="Search Guest Username" autocomplete="off" id="add_username" minlength="5" maxlength="50">
                                       <div class="invalid-feedback text-left">This field is Required</div>
                                   </div>
                               </div>
                               <div class="col-md-6">
                                   <!-- <div class="form-group">
                                       <label>Password <strong class="text-danger">*</strong></label>
                                       <input type="password" class="form-control password" id="add_password">
                                       <div class="invalid-feedback text-left">Warning</div>
                                   </div> -->
                                   <label>Password <strong class="text-danger">*</strong></label>
                                   <div class="input-group mb-3">
                                       <input type="password" class="form-control validate" required data-allowcharacters="[a-z][A-Z][0-9][!][#][*][()][_][-][.]" id="add_password" minlength="5" maxlength="50">
                                       <div class="input-group-append">
                                           <span id="mask-password" class="input-group-text">
                                               <i class="show-password fa fa-fw fa-eye" id="password-field"></i>
                                           </span>
                                       </div>
                                       <div class="invalid-feedback text-left">This field is Required</div>
                                   </div>

                               </div>
                           </div>
                       </form>
                       <div class="account_information_footer modal-footer">
                           <div class="w-100 text-right guestInformationDiv">
                               <button type="button" class="btn btn-outline-primary shadow-none px-4 p-2" id="accountInformationPrev" data-toggle="tab" href="#roomInformation">PREVIOUS</button>
                               <button type="button" class="btn btn-primary text-light shadow-none px-4 p-2" id="accountInformationNext" data-guestid="0">
                                   NEXT</button>
                           </div>
                       </div>
                   </div>
                   <div role="tabpanel" class="tab-pane p-3" id="verification">
                       <form id="initialPayment">
                           <div class="row">
                               <div class="col-12">
                                   <div class="row">
                                       <div class="col-6 text-left">
                                           <h5 class="text-primary">Guest Name</h5>
                                           <p class="h6" id="guestSpanName"></p>
                                           <span class="px-2"><small><span id="spanGuestAddress"></span></small></span><br>
                                           <span class="px-2"><small><span id="spanGuestEmail"></span></small></span>
                                       </div>
                                       <div class="col-6 text-right">
                                           <span><strong class="text-primary">Check In : </strong> <span id="spanCheckIn"></span></span>
                                           <br>
                                           <span><strong class="text-primary">Check Out: </strong> <span id="spanCheckOut"></span></span><br>
                                           <!-- <span><strong class="text-primary">Guest</strong></span><br> -->
                                           <span class="font-weight-bold text-primary">Adult: <small class="text-dark px-1" id="spanAdult"></small></span>
                                           <span class="font-weight-bold text-primary">Children: <small class="text-dark px-1" id="spanChildren"></small></span>
                                           <span class="font-weight-bold text-primary">Infant: <small class="text-dark px-1" id="spanInfant"></small></span>
                                       </div>
                                       <div class="col-12"><hr></div>
                                       <div class="col-4 text-left">
                                           <h5 class="text-primary">Avail Room</h5>
                                           <div class="col-12 text-left d-flex justify-content-between">
                                               <span class="font-weight-bold px-1 d-flex justify-content-start">Room Type:</span>
                                               <span class="px-2 d-flex justify-content-end span_roomType">Superior Twin</span>
                                           </div>
                                           <div class="col-12 text-left d-flex justify-content-between">
                                               <span class="font-weight-bold px-1 d-flex justify-content-start">Room Number:</span>
                                               <span class="px-2 d-flex justify-content-end span_roomNumber">ST-RM-401</span>
                                           </div>
                                           <div class="col-12 text-left d-flex justify-content-between">
                                               <span class="font-weight-bold px-1 d-flex justify-content-start">Room Price: </span>
                                               <span class="px-2 d-flex justify-content-end" id="span_totalRoomPrice">₱50.00</span>
                                           </div>
                                           <div class="reservation_detailedRoomPrice ml-2" style="font-size:90%;">
                                                       <div class="col-12 text-left d-flex justify-content-between">
                                                           <span class="px-1 d-flex justify-content-start text-primary">January 20 2021</span>
                                                           <span class="px-2 d-flex justify-content-end">50.00</span>
                                                       </div>
                                                       </div>
                                           
                                       </div>
                                       <div class="col-4 text-left">
                                           <h5 class="text-primary">Avail Extra Services</h5>
                                           <div id="availExtraServices" class="row">
                                               
                                           </div>
                                       </div>
                                       <div class="col-4 text-left">
                                           <div class="row">
                                               <h5 class="text-primary">Guest Payment</h5>
                                               <div class="col-md-12 text-left">
                                                   <div class="row">
                                                       <div class="input-group col-6">
                                                           <input type="text" autocomplete="off" class="form-control text-right validate" data-allowcharacters="[a-z][A-Z][0-9][.][-]['][()][)][,][!][ ]" id="add_couponCode" placeholder="Coupon Code">
                                                           <div class="invalid-feedback"></div>
                                                       </div>
                                                       <div class="input-group col-6">
                                                           <input type="text" autocomplete="off" class="form-control text-right" data-allowcharacters="[0-9][.]" id="add_couponRate" placeholder="Coupon Rate" readonly="">
                                                       </div>
                                                   </div>
                                                   <div class="input-group mt-2">
                                                           <div class="input-group-prepend">
                                                               <span class="input-group-text"><span class="font-weight-bold">₱</span></span>
                                                           </div>
                                                           <input type="text" autocomplete="off" class="form-control text-right validate" data-allowcharacters="[0-9][.]" id="add_couponAmount" value="₱0.00" placeholder="Coupon Amount" readonly="">
                                                           
                                                   </div>
                                                   <div class="input-group mt-2">
                                                       <div class="input-group-prepend">
                                                           <span class="input-group-text"><span class="font-weight-bold">₱</span></span>
                                                       </div>
                                                       <input type="text" autocomplete="off" class="form-control text-right currency validate" data-allowcharacters="[0-9][.]" id="add_initialAmount" placeholder="Initial Amount Tendered" required="">
                                                       <div class="invalid-feedback text-right"></div>
                                                       
                                                   </div>
                                               </div>
                                           </div>
                                       </div>
                                   </div>
                               </div>
                           </div>
                       
                           <div class="footer">
                               <div class="row mt-2">
                                   <div class="col-md-4 text-left">
                                       <label for="add_initialAmount">Room Rate Amount</label>
                                       <div class="input-group">
                                           <div class="input-group-prepend">
                                               <span class="input-group-text"><span class="font-weight-bold">₱</span></span>
                                           </div>
                                           <input type="text" autocomplete="off" class="form-control text-right" value="" id="add_initialAmount_room" readonly="">
                                       </div>
                                   </div>
                                   <div class="col-md-4 text-left">
                                       <label for="add_initialAmount">Total Amount of Additional Services</label>
                                       <div class="input-group">
                                           <div class="input-group-prepend">
                                               <span class="input-group-text"><span class="font-weight-bold">₱</span></span>
                                           </div>
                                           <input type="text" autocomplete="off" class="form-control text-right" id="add_initialAmount_ext_services2" readonly="">
                                       </div>
                                   </div>
                                   <div class="col-md-4 text-left">
                                       <label for="add_initialAmount">Running Balance</label>
                                       <div class="input-group">
                                           <div class="input-group-prepend">
                                               <span class="input-group-text"><span class="font-weight-bold">₱</span></span>
                                           </div>
                                           <input type="text" autocomplete="off" class="form-control text-right" id="add_initialAmount_total_amount" readonly="">
                                       </div>
                                   </div>
                               </div>
                               <div class="row mt-3 border-top pt-3 d-flex justify-content-between align-items-end">
                                   <div class="col-0 col-sm-0 col-md-6 col-lg-6 col-xl-8 text-left" style="font-size:90%;">
                                       <span><i class="text-danger">* </i>All colored dates are refered as holidays</span>
                                   </div>
                                   <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 d-flex justify-content-end align-items-end reservationVerification_footer">
                                           <!-- <button type="button" class="btn btn-secondary shadow-none px-4 p-2 w-50 mx-2" id="guest_reservation">
                                               RESERVE</button>
                                           <button type="button" class="btn btn-primary shadow-none px-4 p-2 w-50 mx-2" id="guest_checkIn">
                                               CHECK IN</button> -->
                                   </div>
                               </div>
                           </div>
                       </form>
                   </div>
                   <div role="tabpanel" class="tab-pane p-3" id="setRoomCard">
                       <form id="initialPayment">
                           <div class="row">
                               <div class="col-12">
                                   <div class="row">
                                       <div class="col-6 text-left">
                                           <h5 class="text-primary">Guest Name</h5>
                                           <p class="h6" id="guestSpanName"></p>
                                           <span class="px-2"><small><span id="spanGuestAddress"></span></small></span><br>
                                           <span class="px-2"><small><span id="spanGuestEmail"></span></small></span>
                                       </div>
                                       <div class="col-6 text-right">
                                           <span><strong class="text-primary">Check In : </strong> <span id="spanCheckIn"></span></span>
                                           <br>
                                           <span><strong class="text-primary">Check Out: </strong> <span id="spanCheckOut"></span></span><br>
                                           <!-- <span><strong class="text-primary">Guest</strong></span><br> -->
                                           <span class="font-weight-bold text-primary">Adult: <small class="text-dark px-1" id="spanAdult"></small></span>
                                           <span class="font-weight-bold text-primary">Children: <small class="text-dark px-1" id="spanChildren"></small></span>
                                           <span class="font-weight-bold text-primary">Infant: <small class="text-dark px-1" id="spanInfant"></small></span>
                                       </div>
                                       <div class="col-12"><hr></div>
                                       <div class="col-4 text-left">
                                           <h5 class="text-primary">Avail Room</h5>
                                           <div class="col-12 text-left d-flex justify-content-between">
                                               <span class="font-weight-bold px-1 d-flex justify-content-start">Room Type:</span>
                                               <span class="px-2 d-flex justify-content-end span_roomType">Superior Twin</span>
                                           </div>
                                           <div class="col-12 text-left d-flex justify-content-between">
                                               <span class="font-weight-bold px-1 d-flex justify-content-start">Room Number:</span>
                                               <span class="px-2 d-flex justify-content-end span_roomNumber">ST-RM-401</span>
                                           </div>
                                           <div class="col-12 text-left d-flex justify-content-between">
                                               <span class="font-weight-bold px-1 d-flex justify-content-start">Room Price: </span>
                                               <span class="px-2 d-flex justify-content-end" id="span_totalRoomPrice"> P 20,200.00</span>
                                           </div>
                                           <div class="reservation_detailedRoomPrice ml-2" style="font-size:90%;">
                                                       <div class="col-12 text-left d-flex justify-content-between">
                                                           <span class="px-1 d-flex justify-content-start text-primary">January 20 2021</span>
                                                           <span class="px-2 d-flex justify-content-end">50.00</span>
                                                       </div>
                                                       </div>
                                           
                                           
                                       </div>
                                       <div class="col-4 text-left">
                                           <h5 class="text-primary">Avail Extra Services</h5>
                                           <div id="availExtraServices" class="row">
                                               
                                           </div>
                                       </div>
                                       <div class="col-4 text-left">
                                           <div class="row">
                                               <h5 class="text-primary">Other Actions</h5>
                                               <div class="col-md-12 text-left">
                                                   <div class="row">
                                                       <div class="input-group col-6">
                                                           <input type="text" autocomplete="off" class="form-control text-right" data-allowcharacters="[a-z][A-Z][0-9][.][-]['][()][)][,][!][ ]" id="add_couponCode" placeholder="Coupon Code">
                                                           <div class="invalid-feedback"></div>
                                                       </div>
                                                       <div class="input-group col-6">
                                                           <input type="text" autocomplete="off" class="form-control text-right" data-allowcharacters="[0-9][.]" id="add_couponRate" placeholder="Coupon Rate" readonly="">
                                                       </div>
                                                   </div>
                                                   <div class="input-group mt-2">
                                                       <div class="input-group-prepend">
                                                           <span class="input-group-text"><span class="font-weight-bold">₱</span></span>
                                                       </div>
                                                       <input type="text" autocomplete="off" class="form-control text-right validate" data-allowcharacters="[0-9][.]" id="add_initialAmount" placeholder="Initial Amount Tendered">
                                                       
                                                   </div>
                                               </div>
                                           </div>
                                       </div>
                                   </div>
                               </div>
                           </div>
                       
                           <div class="footer">
                               <div class="row mt-2">
                                   <div class="col-md-4 text-left">
                                       <label for="add_initialAmount">Room Rate Amount</label>
                                       <div class="input-group">
                                           <div class="input-group-prepend">
                                               <span class="input-group-text"><span class="font-weight-bold">₱</span></span>
                                           </div>
                                           <input type="text" autocomplete="off" class="form-control text-right" value="" id="add_initialAmount_room" readonly="">
                                       </div>
                                   </div>
                                   <div class="col-md-4 text-left">
                                       <label for="add_initialAmount">Total Amount of Additional Services</label>
                                       <div class="input-group">
                                           <div class="input-group-prepend">
                                               <span class="input-group-text"><span class="font-weight-bold">₱</span></span>
                                           </div>
                                           <input type="text" autocomplete="off" class="form-control text-right" id="add_initialAmount_ext_services2" readonly="">
                                       </div>
                                   </div>
                                   <div class="col-md-4 text-left">
                                       <label for="add_initialAmount">Total Amount </label>
                                       <div class="input-group">
                                           <div class="input-group-prepend">
                                               <span class="input-group-text"><span class="font-weight-bold">₱</span></span>
                                           </div>
                                           <input type="text" autocomplete="off" class="form-control text-right" id="add_initialAmount_total_amount" readonly="">
                                       </div>
                                   </div>
                               </div>
                               <div class="row mt-3 border-top pt-3 d-flex justify-content-between align-items-end">
                                   <div class="col-0 col-sm-0 col-md-6 col-lg-6 col-xl-8 text-left" style="font-size:90%;">
                                       <span><i class="text-danger">* </i>All colored dates are refered as holidays</span>
                                   </div>
                                   <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 d-flex justify-content-end align-items-end reservationVerification_footer">
                                               <button type="button" class="btn btn-outline-primary shadow-none px-4 p-2" data-toggle="tab" href="#initialPayment">
                                                   PREVIOUS
                                               </button>
                                               <button type="button" class="btn btn-primary text-light shadow-none px-4 p-2" data-guestid="0">
                                                   CONFIRM
                                               </button>
                                   </div>
                               </div>
                           </div>
                       </form>
                   </div>
               </div>

           </div>
       </div>
   </div>
       
                                        `);
   }


   
/** END ++++++++++++++++++++++++++++++++++++++  FUNNCTIONS  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */


$(document).on("click", ".view_checkedout", function() {

    const clientID = $(this).data("transaction");
    const type = 1;

    $("#btnPrintInvoice").attr("clientid", clientID);
    $("#btnPrintInvoice").attr("type", type);

    $("#checkoutInvoiceModal").modal("show");

    $.ajax({
        method: "POST",
        url: base_url + "checkout_invoice/getSpecificCheckoutInvoice",
        data: {clientID, type},
        dataType: "JSON",
        async: false,
        beforeSend: function() {
            $("#checkoutInvoiceModalBody").html(loadingAnimation);
        },
        success: function(data) {
            $("#btnPrintInvoice").attr("disabled", false);
            let html = `
            <div class="header">
                <div class="row">
                    <div class="col-md-7 col-sm-12 text-left">
                        <h5 class="font-weight-bold text-primary">Guest Information</h5>
                        <h6>${data.fullname}</h6>
                        <div>${data.address ? data.address : "-"}</div>
                        <div>${data.email ? data.email : "-"}</div>
                    </div>
                    <div class="col-md-5 col-sm-12">
                        <div>&nbsp;</div>
                        <div class="d-flex justify-content-between align-items-baseline">
                            <label for="" class="font-weight-bold text-primary text-left my-0">Check In:</label>
                            <span class="text-right">${data.checkIn ? data.checkIn : "-"}</span>
                        </div>
                        <div class="d-flex justify-content-between align-items-baseline">
                            <label for="" class="font-weight-bold text-primary text-left my-0">Check Out:</label>
                            <span class="text-right">${data.checkOut ? data.checkOut : "-"}</span>
                        </div>
                        <div class="d-flex justify-content-between align-items-baseline">
                            <div class="d-flex justify-content-between">
                                <label for="" class="font-weight-bold text-primary text-left my-0">Adult: </label>
                                <span class="text-right ml-1">${data.adult ? data.adult : "0"}</span>
                            </div>
                            <div class="d-flex justify-content-between">
                                <label for="" class="font-weight-bold text-primary text-left my-0">Children: </label>
                                <span class="text-right ml-1">${data.children ? data.children : "0"}</span>
                            </div>
                            <div class="d-flex justify-content-between">
                                <label for="" class="font-weight-bold text-primary text-left my-0">Infant: </label>
                                <span class="text-right ml-1">${data.infant ? data.infant : "0"}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr>

            <div class="body">
                <div class="row">

                    <div class="col-md-6 col-sm-12">
                        <h5 class="font-weight-bold text-primary">${type == 1 ? "Room Information" : "Hall Information"}</h5>
                        <div class="ml-2">

                            <div class="ml-2">
                            <div class="row">`;

                data["amenities"].map(item => {
                    html += `
                        <div class="col-md-6 col-sm-12">
                            <span style="font-size: .92rem" class="text-dark mb-0 text-left"><i class="icon-check text-success"></i> ${item.description}</span>
                        </div>
                    `;
                });
                                
                html += `   </div>
                            </div>

                            <div class="d-flex justify-content-between align-items-baseline">
                                <label for="" class="font-weight-bold text-dark mb-0">${type == 1 ? "Accommodation Type" : "Hall Name"}</label>
                                <span>${data.name}</span>
                            </div>
                            <div class="d-flex justify-content-between align-items-baseline">
                                <label for="" class="font-weight-bold text-dark mb-0">${type == 1 ? "Room Number" : "Hall Number"}</label>
                                <span>${data.code}</span>
                            </div>
                            <div class="d-flex justify-content-between align-items-baseline">
                                <label for="" class="font-weight-bold text-dark mb-0">${type == 1 ? "Room Price" : "Hall Price"}</label>
                            </div>
                            <div class="ml-3">`;

                data["pricing"].map(item => {
                    html += `
                    <div class="d-flex justify-content-between align-items-baseline">
                        <span style="font-size: .92rem" class="text-dark mb-0 text-left">${item.date}</span>
                        <span style="font-size: .92rem">${item.price}</span>
                    </div>
                    `;
                });

                html += `       </div>
                            <div class="d-flex justify-content-between align-items-baseline border-top mt-1 pt-1" style="font-size: 1.04rem; font-weight: bold;">
                                <label for="" class="font-weight-bold text-dark mb-0">Subtotal</label>
                                <span>${data.roomPrice}</span>
                            </div>
                        </div>
                        <br>
                        <h5 class="font-weight-bold text-primary">Additional Service/s</h5>
                        <div class="ml-2">`;

            let services = data["services"];
            if (services.length > 0) {
                services.forEach(item => {
                    html += `
                        <div class="d-flex justify-content-between align-items-baseline">
                            <label for="" class="font-weight-bold text-dark mb-0">${item.description}</label>
                            <span>${item.price}</span>
                        </div>`;
                });   
            } else {
                html += `
                    <div class="d-flex justify-content-between align-items-baseline">
                        <label for="" class="font-weight-bold text-dark mb-0">No additional services</label>
                    </div>`;
            }
            
            html += `
            <div class="d-flex justify-content-between align-items-baseline border-top mt-1 pt-1" style="font-size: 1.04rem; font-weight: bold;">
                <label for="" class="font-weight-bold text-dark mb-0">Subtotal</label>
                <span>${data.totalAdditionalPrice}</span>
            </div>`;
                        
            html += `   
                        </div>
                    </div>

                    <div class="col-md-6 col-sm-12">`;

            if (data["couponID"] != "-" && data["availCoupon"] != "-") {
                html += `
                <h5 class="font-weight-bold text-primary">Availed Coupon</h5>
                    <div class="ml-2">
                        <div class="d-flex justify-content-between align-items-baseline">
                            <span style="font-size: .92rem" class="font-weight-bold text-dark mb-0 text-left">${data.availCoupon}</span>
                            <span style="font-size: .92rem">${data.couponValue}</span>
                    </div>
                </div>`;
            } else {
                html += `
                <h5 class="font-weight-bold text-primary">Availed Coupon</h5>
                    <div class="ml-2">
                        <div class="d-flex justify-content-between align-items-baseline">
                        <span style="font-size: .92rem" class="text-dark mb-0 text-left">No coupon</span>
                    </div>
                </div>`;
            }

                html += `
                    <div class="d-flex justify-content-between align-items-baseline border-top mt-1 pt-1" style="font-size: 1.04rem; font-weight: bold;">
                        <label for="" class="font-weight-bold text-dark mb-0">Subtotal</label>
                        <span>${data.totalCouponValue}</span>
                    </div>
                    <br>
                    <h5 class="font-weight-bold text-primary">Penalty Fee/s</h5>
                    <div class="ml-2">`;

            if (data["penalties"].length > 0) {
                data["penalties"].map(item => {
                    html += `
                    <div class="d-flex justify-content-between align-items-baseline">
                        <span style="font-size: .92rem" class="font-weight-bold text-dark mb-0 text-left">${item.description}</span>
                        <span style="font-size: .92rem">${item.price}</span>
                    </div>`;
                });
                html += `
                    `;
            } else {
                html += `
                <div class="d-flex justify-content-between align-items-baseline">
                    <span style="font-size: .92rem" class="text-dark mb-0 text-left">No penalty</span>
                </div>`;
            }

            html += `
            <div class="d-flex justify-content-between align-items-baseline border-top mt-1 pt-1" style="font-size: 1.04rem; font-weight: bold;">
                <label for="" class="font-weight-bold text-dark mb-0">Subtotal</label>
                <span>${data.totalPenaltyPrice}</span>
            </div>`;
                            
            html += `   </div>
                        <br>
                        <h5 class="font-weight-bold text-primary">Guest Payment</h5>
                        <div class="ml-2">
                            <div class="d-flex justify-content-between align-items-baseline">
                                <label for="" class="font-weight-bold text-dark mb-0">Mode of Payment</label>
                                <span>${data.paymentMode}</span>
                            </div>
                            <!-- ---- FOR ENHANCEMENT VERSION 2 ---- -->
                            <!-- <div class="d-flex justify-content-between align-items-baseline">
                                <label for="" class="font-weight-bold text-dark mb-0">Reference Number</label>
                                <span>${data.referenceNumber ? data.referenceNumber : "-"}</span>
                            </div> -->
                            <!-- ---- END FOR ENHANCEMENT VERSION 2 ---- -->
                            <div class="d-flex justify-content-between align-items-baseline">
                                <label for="" class="font-weight-bold text-dark mb-0">Initial Payment</label>
                                <span>${data.initialPayment ? data.initialPayment : "0"}</span>
                            </div>
                            <div class="d-flex justify-content-between align-items-baseline">
                                <label for="" class="font-weight-bold text-dark mb-0">Checkout Payment</label>
                                <span>${data.checkoutPayment ? data.checkoutPayment : "0"}</span>
                            </div>
                            <div class="d-flex justify-content-between align-items-baseline border-top mt-1 pt-1" style="font-size: 1.04rem; font-weight: bold;">
                                <label for="" class="font-weight-bold text-dark mb-0">Subtotal</label>
                                <span>${data.totalPayment}</span>
                            </div>
                        </div>

                        <br>
                        <h5 class="font-weight-bold text-primary">Payment Summary</h5>
                        <div class="ml-2">
                            <div class="d-flex justify-content-between align-items-baseline">
                                <label for="" class="font-weight-bold text-dark mb-0">Total Amount</label>
                                <span>${data.totalAvailedAmount ? data.totalAvailedAmount : "0"}</span>
                            </div>
                            <div class="d-flex justify-content-between align-items-baseline">
                                <label for="" class="font-weight-bold text-dark mb-0">Total VAT</label>
                                <span>${data.totalVAT ? data.totalVAT : "0"}</span>
                            </div>
                            <div class="d-flex justify-content-between align-items-baseline">
                                <label for="" class="font-weight-bold text-dark mb-0">Total Penalty Fee</label>
                                <span>${data.totalPenaltyPrice ? data.totalPenaltyPrice : "0"}</span>
                            </div>
                            <div class="d-flex justify-content-between align-items-baseline border-top mt-1 pt-2 border-bottom mb-1 pb-0" style="font-size: 1.05rem; font-weight: bold;">
                                <label for="" class="font-weight-bold text-dark mb-0">Grand Total Amount</label>
                                <span>${data.grandTotalPrice ? data.grandTotalPrice : "0"}</span>
                            </div>
                            <div class="d-flex justify-content-between align-items-baseline border-top pt-4">
                                <label for="" class="font-weight-bold text-dark mb-0">Total Coupon Value</label>
                                <span>${data.totalCouponValue ? data.totalCouponValue : "0"}</span>
                            </div>
                            <div class="d-flex justify-content-between align-items-baseline">
                                <label for="" class="font-weight-bold text-dark mb-0">Total Guest Payment</label>
                                <span>${data.totalPayment ? data.totalPayment : "0"}</span>
                            </div>
                            <div class="d-flex justify-content-between align-items-baseline border-top mt-1 pt-1">
                                <label for="" class="font-weight-bold text-dark mb-0">Total Change</label>
                                <span>${data.totalChanged ? data.totalChanged : "0"}</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>`;

            setTimeout(() => {
                $("#checkoutInvoiceModalBody").html(html);
            }, 500);
        },
        error: function(err) {
            $("#btnPrintInvoice").attr("disabled", true);

            let html = `
            <div class="w-100 text-danger text-center font-weight-bold">
                ${err.statusText}
            </div>`;
            setTimeout(() => {
                $("#checkoutInvoiceModalBody").html(html);
            }, 500);
        }
    })

})

// ----- PRINT INVOICE -----
$(document).on("click", "#btnPrintInvoice", function() {
    const clientID     = $(this).attr("clientid");
    const type         = $(this).attr("type");

    $.ajax({
        method: "GET",
        url: "checkout_invoice/printCheckoutInvoice",
        data: {type, clientID, management: true},
        success: function(data) {
            var left  = ($(window).width()/2)-(900/2),
                top   = ($(window).height()/2)-(600/2),
                mywindow = window.open ("", "PRINT", "width=900, height=600, top="+top+", left="+left);

            mywindow.document.write(data);

            mywindow.document.close(); 
            mywindow.focus();
        }
    })
})
// ----- END PRINT INVOICE -----