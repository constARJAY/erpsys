
!function($) {
    const base_url = $("#base_url").val();
    "use strict";
    var CalendarApp = function() {
        this.$body = $("body")
        this.$calendar = $('#calendar'),
        this.$event = ('#calendar-events div.calendar-events'),
        this.$categoryForm = $('#add_new_event form'),
        this.$extEvents = $('#calendar-events'),
        this.$modal = $('#my_event'),
        this.$saveCategoryBtn = $('.save-category'),
        this.$calendarObj = null
    };

    /* on drop */
    CalendarApp.prototype.onDrop = function (eventObj, date) { 
        var $this = this;
            // retrieve the dropped element's stored Event Object
            var originalEventObject = eventObj.data('eventObject');
            var $categoryClass = eventObj.attr('data-class');
            // we need to copy it, so that multiple events don't have a reference to the same object
            var copiedEventObject = $.extend({}, originalEventObject);
            // assign it the date that was reported
            copiedEventObject.start = date;
            if ($categoryClass)
                copiedEventObject['className'] = [$categoryClass];
            // render the event on the calendar
            $this.$calendar.fullCalendar('renderEvent', copiedEventObject, true);
            // is the "remove after drop" checkbox checked?
            if ($('#drop-remove').is(':checked')) {
                // if so, remove the element from the "Draggable Events" list
                eventObj.remove();
            }
    },

    /* on click on event */
    CalendarApp.prototype.onEventClick =  function (calEvent, jsEvent, view) {
        $(".my_event_header").text("EDIT EVENT");
        $("#my_event").modal("show");
        console.log(calEvent);
        $("#my_event_content").html(preloader);
            const calendarID =  calEvent.id;
            const eventName  = calEvent.title;
            const background = calEvent.className[0];
            const dateFrom   = moment(new Date(calEvent.start._d));
            const dateTo     = moment(new Date(calEvent.end._d));
            const eventDate  = moment(new Date(calEvent.start._d)).format("MMMM DD, YYYY")+" - "+moment(new Date(calEvent.end._d)).format("MMMM DD, YYYY");
            const modalButtons = `<button type="button" class="btn btn-primary update-event submit-btn" data-calendarid="${calendarID}">UPDATE EVENT</button>
                                  <button type="button" class="btn btn-danger delete-event submit-btn">DELETE</button>`;
            // modalButtons = `<button type="button" class="btn btn-primary save-event submit-btn">CREATE EVENT</button>
            //                 <button type="button" class="btn btn-danger delete-event submit-btn" id="btn-cancel">CANCEL</button>`;
        const   my_event_content = `<div class="modal-body">
                                        <div class="form-group">
                                            <label>Event Name <span class="text-danger">*</span></label>
                                            <input class="form-control validate" data-allowcharacters="[A-Z][a-z][0-9][ ][.][,][_][-]" name="eventCalendarName" type="text" id="edit-eventname" value="${eventName}" minlength="2" maxlength="30" required autocomplete="off">
                                            <div class="invalid-feedback d-block" id="invalid-edit-eventname"></div>
                                        </div>
                                        <div class="form-group">
                                            <label for="">Color <span class="text-danger">*</span></label>
                                            <select class="form-control validate" name="eventCalendarBackground" id="edit-eventcolor" required>
                                                <option value="" selected disabled>Select Color</option>
                                                <option value="bg-red">Red</option>
                                                <option value="bg-yellow">Yellow</option>
                                                <option value="bg-green">Green</option>
                                                <option value="bg-orange">Orange</option>
                                                <option value="bg-blue">Blue</option>
                                                <option value="bg-violet">Violet</option>
                                            </select>
                                            <div class="invalid-feedback d-block" id="invalid-edit-eventcolor"></div>
                                        </div>
                                        <div class="form-group" id="edit-eventdate_parent">
                                            <label>Event Date <span class="text-danger">*</span></label>
                                            <input class="form-control validate calendarDateRangerPicker text-left" data-allowcharacters="[A-Z][a-z][0-9][,][ ]" type="button" value="${eventDate}" id="edit-eventdate" required autocomplete="off">
                                            <div class="invalid-feedback d-block" id="invalid-edit-eventdate"></div>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <div class="w-100 text-right">
                                            ${modalButtons}
                                        </div>
                                    </div>`;
        setTimeout(function(){$("#my_event_content").html(my_event_content);calendarDateRangerPicker();$("#edit-eventcolor").val(background).trigger("change");},500)
        var $this = this;
        $(document).on("click", ".delete-event", function () {
            $this.$calendarObj.fullCalendar('removeEvents', function (ev) {
                return (ev._id == calEvent._id);
            });
            const data     = getFormData("my_event_content", true);
            data["tableData"]["updatedBy"]   =  sessionID;
            data["whereFilter"]              =  "eventCalendarID ="+calendarID;
            data["tableName"]                =  "hris_event_calendar_tbl";
            data["feedback"]                 =  eventName;
            deleteTableData(data, true, false, "Delete "+eventName.toUpperCase()+ " successfully");
            $this.$modal.modal('hide');
        });
        $(document).on("click", ".update-event", function (e) {
            let condition  = validateForm("my_event_content");
            if(condition == true){
                let thisCalendarID    = $(this).data("calendarid");
                e.preventDefault();
                calEvent.title        = $this.$modal.find("#edit-eventname").val();
                calEvent.className[0] = $this.$modal.find("#edit-eventcolor").val();
                $this.$modal.modal('hide');

                    const eventName  = $("#edit-eventname").val();
                    const background = $("#edit-eventcolor").val();
                    const newDate    = $(".calendarDateRangerPicker").val().split("-");
                    let dateFrom     = moment(new Date(newDate[0])).format("YYYY-MM-DD");
                    let dateTo       = moment(new Date(newDate[1])).format("YYYY-MM-DD");
                    const data     = getFormData("my_event_content", true);
                    data["tableData"]["eventCalendarName"]          = eventName;
                    data["tableData"]["eventCalendarBackground"]    = background;
                    data["tableData"]["eventCalendarDateFrom"]      = dateFrom;
                    data["tableData"]["eventCalendarDateTo"]        = dateTo;
                    data["tableData"]["updatedBy"]   =  sessionID;
                    data["whereFilter"]              =  "eventCalendarID ="+thisCalendarID;
                    data["tableName"]                =  "hris_event_calendar_tbl";
                    data["feedback"]                 =  eventName;
                    sweetAlertConfirmation("update", "Award","my_event", null, data, true, callCalendar);
            }
        });
            
    },

    /* on select */
    CalendarApp.prototype.onSelect = function (start, end, allDay) {
        $(".my_event_header").text("ADD EVENT");
        $("#my_event").modal("show");
        $("#my_event_content").html(preloader);
        const eventDate  = moment(new Date(start)).format("MMMM DD, YYYY")+" - "+moment(new Date(end)).subtract(1, "days").format("MMMM DD, YYYY");
        addingEvent(eventDate);
    },

    CalendarApp.prototype.enableDrag = function() {
        //init events
        $(this.$event).each(function () {
            // it doesn't need to have a start or end
            var eventObject = {
                title: $.trim($(this).text()) // use the element's text as the event title
            };
            // store the Event Object in the DOM element so we can get to it later
            $(this).data('eventObject', eventObject);
            // make the event draggable using jQuery UI
            $(this).draggable({
                zIndex: 999,
                revert: true,      // will cause the event to go back to its
                revertDuration: 0  //  original position after the drag
            });
        });
    }

    /* Initializing */
    CalendarApp.prototype.init = function() {
        this.enableDrag();

        /*  Initialize the calendar  */
        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();
        var form = '';
        var today = new Date($.now());


        // ----- GETTING DATA FROM DATABASE -----
        const getAvailabilityCalendar = function() {
            let path = `${base_url}operations/getTableData`;
            let data = {tableName:"hris_event_calendar_tbl"};
            let calendarData = [
                    // {
                    //     id: 23,
                    //     title: 'All Day Event',
                    //     start: '2021-03-05',
                    //     end: '2021-03-07',
                    //     className: 'bg-primary'
                    // }
                ];
            $.ajax({async:false,type:"POST",data, url: path, dataType: "json",
                    success: function(data) {
                            data.map(item => {
                                let eventName  = item.eventCalendarName;
                                let dateFrom   = item.eventCalendarDateFrom;
                                let dateTo     = moment(item.eventCalendarDateTo).add('days', 1);;
                                let background = item.eventCalendarBackground;
                                let tempData   = {
                                                    id:        item.eventCalendarID,
                                                    title:     eventName,
                                                    start:     dateFrom,
                                                    end:       dateTo,
                                                    className: background
                                                }
                                calendarData.push(tempData);
                            })
                        }
                    })
            return calendarData;
        }();
        // ----- END GETTING DATA FROM DATABASE -----


        var $this = this;
        $this.$calendarObj = $this.$calendar.fullCalendar({
            slotDuration: '00:15:00', /* If we want to split day time each 15minutes */
            minTime: '08:00:00',
            maxTime: '19:00:00',  
            displayEventTime: false,
            defaultView: 'month',  
            handleWindowResize: true,  
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month'
            },
            events: getAvailabilityCalendar,
            editable: true,
            droppable: true, // this allows things to be dropped onto the calendar !!!
            eventLimit: true, // allow "more" link when too many events
            selectable: true,
            drop: function(date) { $this.onDrop($(this), date); },
            select: function (start, end, allDay) { $this.onSelect(start, end, allDay); },
            eventClick: function(calEvent, jsEvent, view) { $this.onEventClick(calEvent, jsEvent, view); },
            eventDrop: function(calEvent, jsEvent, view) {
                const calendarID = calEvent.id;
                const eventName  = calEvent.title;
                const background = getTableData("hris_event_calendar_tbl","eventCalendarBackground","eventCalendarID="+calendarID);
                let dateFrom        = moment(new Date(calEvent.start._d)).format("YYYY-MM-DD");
                let dateTo          = moment(new Date(calEvent.end._d)).format("YYYY-MM-DD");
                
                const data     = getFormData("my_event_content", true);

                data["tableData"]["eventCalendarName"]          = eventName;
                data["tableData"]["eventCalendarBackground"]    = background[0]["eventCalendarBackground"];
                data["tableData"]["eventCalendarDateFrom"]      = dateFrom;
                data["tableData"]["eventCalendarDateTo"]        = dateTo;
                data["tableData"]["updatedBy"]   =  sessionID;
                data["whereFilter"]              =  "eventCalendarID ="+calendarID;
                data["tableName"]                =  "hris_event_calendar_tbl";
                data["feedback"]                 =  eventName;
                updateTableData(data, true, false, "Add new "+eventName.toUpperCase()+ " successfully saved!");
                $this.$calendarObj.fullCalendar('updateEvent', calEvent);
            }

        });

        //on new event
        this.$saveCategoryBtn.on('click', function(){
            var categoryName = $this.$categoryForm.find("input[name='category-name']").val();
            var categoryColor = $this.$categoryForm.find("select[name='category-color']").val();
            if (categoryName !== null && categoryName.length != 0) {
                $this.$extEvents.append('<div class="calendar-events" data-class="bg-' + categoryColor + '" style="position: relative;"><i class="fa fa-circle text-' + categoryColor + '"></i>' + categoryName + '</div>')
                $this.enableDrag();
            }

        });
    },

   //init CalendarApp
    $.CalendarApp = new CalendarApp, $.CalendarApp.Constructor = CalendarApp
    
}(window.jQuery),

//initializing CalendarApp
function($) {
    "use strict";
    $.CalendarApp.init();
}(window.jQuery);


$(document).on("click", "#add_event", function(){
    $(".my_event_header").text("ADD EVENT");
    $("#my_event").modal("show");
    $("#my_event_content").html(preloader);
    addingEvent();
});



function callCalendar(){
    window.location.replace('event_calendar');
    $.CalendarApp.init();
}

function calendarDateRangerPicker(){
    $(".calendarDateRangerPicker").daterangepicker({
        autoUpdateInput: false,
        showDropdowns: true,
        autoApply: true,
        locale: {
            format: "MMMM DD, YYYY"
        },
        // maxDate: moment(new Date).format("MMMM DD, YYYY"),
    }, function(start, end) {
        let thisValue = start.format('MMMM DD, YYYY')+ " - "+end.format('MMMM DD, YYYY');
        $("#edit-eventdate").val(thisValue);
    });
}

function addingEvent(data = null){
    let eventDate = data == null ? moment().format("MMMM DD, YYYY")+ " - "+ moment().format("MMMM DD, YYYY"): data;  
    let  modalButtons           = ` <button type="button" class="btn btn-primary save-event submit-btn">CREATE EVENT</button>
    <button type="button" class="btn btn-danger delete-event submit-btn" id="btn-cancel">CANCEL</button>`;
    const   my_event_content    = ` <div class="modal-body">
        <div class="form-group">
            <label>Event Name <span class="text-danger">*</span></label>
            <input class="form-control validate" data-allowcharacters="[A-Z][a-z][0-9][ ][.][,][_][-]" name="eventCalendarName" type="text" id="edit-eventname" value="" minlength="2" maxlength="30" required autocomplete="off">
            <div class="invalid-feedback d-block" id="invalid-edit-eventname"></div>
        </div>
        <div class="form-group">
            <label for="">Color <span class="text-danger">*</span></label>
            <select class="form-control validate" name="eventCalendarBackground" id="edit-eventcolor" required>
                <option value="" selected disabled>Select Color</option>
                <option value="bg-red">Red</option>
                <option value="bg-yellow">Yellow</option>
                <option value="bg-green">Green</option>
                <option value="bg-orange">Orange</option>
                <option value="bg-blue">Blue</option>
                <option value="bg-violet">Violet</option>
            </select>
            <div class="invalid-feedback d-block" id="invalid-edit-eventcolor"></div>
        </div>
        <div class="form-group" id="edit-eventdate_parent">
            <label>Event Date <span class="text-danger">*</span></label>
            <input class="form-control validate calendarDateRangerPicker text-left" data-allowcharacters="[A-Z][a-z][0-9][,][ ]" type="button" value="${eventDate}" id="edit-eventdate" required autocomplete="off">
            <div class="invalid-feedback d-block" id="invalid-edit-eventdate"></div>
        </div>
    </div>
    <div class="modal-footer">
        <div class="w-100 text-right">
            ${modalButtons}
        </div>
        </div>`;
    setTimeout(function(){$("#my_event_content").html(my_event_content);calendarDateRangerPicker();},500);
        
}

$(document).on("click", ".save-event", function (e) {
    let condition  = validateForm("my_event_content");
    if(condition == true){
        e.preventDefault();
            const eventName  = $("#edit-eventname").val();
            const background = $("#edit-eventcolor").val();
            const newDate    = $(".calendarDateRangerPicker").val().split("-");
            let dateFrom     = moment(new Date(newDate[0])).format("YYYY-MM-DD");
            let dateTo       = moment(new Date(newDate[1])).format("YYYY-MM-DD");
            const data       = getFormData("my_event_content", true);
            data["tableData"]["eventCalendarName"]          = eventName;
            data["tableData"]["eventCalendarBackground"]    = background;
            data["tableData"]["eventCalendarDateFrom"]      = dateFrom;
            data["tableData"]["eventCalendarDateTo"]        = dateTo;
            data["tableData"]["updatedBy"]   =  sessionID;
            data["tableName"]                =  "hris_event_calendar_tbl";
            data["feedback"]                 =  eventName;
            sweetAlertConfirmation("add", "Event","my_event", null, data, true, callCalendar);
    }
});