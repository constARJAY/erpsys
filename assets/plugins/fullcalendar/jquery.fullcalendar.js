
!function($) {
    "use strict";

    // ---- UPDATE CALENDAR DATA -----
    function updateAvailabilityCalendar(data, flag = false) {
        data.flag = flag;
        $.ajax({
            url: "hotel_calendar/updateAvailabilityCalendar",
            method: "POST",
            data,
            dataType: "json",
            beforeSend: function() {
                $("#loader").show();
            },
            success: function(data) {
                let result = data.split("|");
                if (result[0] == "true") {
                    flag && window.location.reload();
                    showNotification("success", result[1]);
                } else {
                    showNotification("error", result[1]);
                }
                // data && window.location.reload();
            }
        }).done(function() {
            setTimeout(() => {
                $("#loader").hide();
            }, 500);
        })
    }
    // ---- END UPDATE CALENDAR DATA -----


    // ---- DELETE CALENDAR DATA -----
    function deleteAvailabilityCalendar(data) {
        $.ajax({
            url: "hotel_calendar/deleteAvailabilityCalendar",
            method: "POST",
            data,
            dataType: "json",
            beforeSend: function() {
                $("#loader").show();
            },
            success: function(data) {
                let result = data.split("|");
                if (result[0] == "true") {
                    // window.location.reload();
                    showNotification("success", result[1]);
                } else {
                    showNotification("error", result[1]);
                }
                // data && window.location.reload();
            }
        }).done(function() {
            setTimeout(() => {
                $("#loader").hide();
            }, 500);
        })
    }
    // ---- END DELETE CALENDAR DATA -----


    // ---- SAVE CALENDAR DATA ----
    function saveAvailabilityCalendar(data) {
        $.ajax({
            url: "hotel_calendar/saveAvailabilityCalendar",
            method: "POST",
            data,
            dataType: "json",
            beforeSend: function() {
                $("#loader").show();
            },
            success: function(data) {
                // console.log(data);
                // data && window.location.reload();
                let result = data.split("|");
                if (result[0] == "true") {
                    window.location.reload();
                } else {
                    showNotification("error", result[1]);
                }
            }
        }).done(function() {
            setTimeout(() => {
                $("#loader").hide();
            }, 500);
        })
    }
    // ---- END SAVE CALENDAR DATA ----


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
        const calendarID = calEvent.id;
        const eventName  = calEvent.title;
        const background = calEvent.className[0];
        const dateFrom   = moment(new Date(calEvent.start._d)).format("YYYY-MM-DD hh:mm:ss");
        const dateTo     = moment(new Date(calEvent._end._d)).format("YYYY-MM-DD hh:mm:ss");
        const eventDate  = moment(new Date(calEvent.start._d)).format("MMMM DD, YYYY")+" - "+moment(new Date(calEvent._end._d)).format("MMMM DD, YYYY");
        const data = { calendarID, eventName, background, dateFrom, dateTo };

        var $this = this;
            $this.$modal.modal({
                backdrop: 'static',
            });
            $this.$modal.find("#edit-eventname").val(eventName);
            $this.$modal.find("#edit-eventcolor").val(background).trigger("change");
            $this.$modal.find("#edit-eventdate").val(eventDate);
            $this.$modal.find('#save-event').hide();
            $this.$modal.find('#update-event').show();
            $this.$modal.find('#delete-event').show()
            $(document).on("click", "#delete-event", function () {
            // .end().find('#udpdate-event').show().end().find('#save-event').hide().end().find('#delete-event').unbind('click').click(function () {
                $this.$calendarObj.fullCalendar('removeEvents', function (ev) {
                    return (ev._id == calEvent._id);
                });
                deleteAvailabilityCalendar(data);
                $this.$modal.modal('hide');
            });
            $this.$modal.find('form').on('submit', function (e) {
                e.preventDefault();
                calEvent.title        = $this.$modal.find("#edit-eventname").val();
                calEvent.className[0] = $this.$modal.find("#edit-eventcolor").val();

                $this.$modal.modal('hide');
                $("#my_event").find("input, select").each(function() {
                    rjValidateInputs("#"+$(this).attr("id"));
                })

                if ($("#my_event").find(".is-invalid").length > 0) {
                    $("#my_event").find(".is-invalid")[0].focus();
                } else {
                    $this.$modal.modal('hide');

                    const calendarID = calEvent.id;
                    const eventName  = calEvent.title;
                    const background = calEvent.className[0];
                    const dateFrom   = $this.$modal.find("#save-event").attr("datefrom") ? $this.$modal.find("#save-event").attr("datefrom") : moment(new Date(calEvent.start._d)).format("YYYY-MM-DD")+" 08:00:00";
                    const dateTo     = $this.$modal.find("#save-event").attr("dateto") ? $this.$modal.find("#save-event").attr("dateto") : moment(new Date(calEvent._end._d)).format("YYYY-MM-DD")+" 19:00:00";
                    const data = { calendarID, eventName, background, dateFrom, dateTo };
                    $this.$calendarObj.fullCalendar('updateEvent', calEvent);
                    updateAvailabilityCalendar(data);
                }

                return false;
            });

            $this.$modal.find('.update-event').on('click', function(e) {
                e.preventDefault();
                calEvent.title        = $this.$modal.find("#edit-eventname").val();
                calEvent.className[0] = $this.$modal.find("#edit-eventcolor").val();
                $this.$modal.modal('hide');

                $("#my_event").find("input, select").each(function() {
                    rjValidateInputs("#"+$(this).attr("id"));
                })

                if ($("#my_event").find(".is-invalid").length > 0) {
                    $("#my_event").find(".is-invalid")[0].focus();
                } else {
                    $this.$modal.modal('hide');

                    const calendarID = calEvent.id;
                    const eventName  = calEvent.title;
                    const background = calEvent.className[0];
                    let dateFrom   = $this.$modal.find(".update-event").attr("datefrom") ? $this.$modal.find(".update-event").attr("datefrom") : moment(new Date(calEvent.start._d)).format("YYYY-MM-DD")+" 08:00:00";
                    let dateTo     = $this.$modal.find(".update-event").attr("dateto") ? $this.$modal.find(".update-event").attr("dateto") : moment(new Date(calEvent._end._d)).format("YYYY-MM-DD")+" 19:00:00";
                    const data = { calendarID, eventName, background, dateFrom, dateTo };
                    // $this.$calendarObj.fullCalendar('updateEvent', calEvent);
                    updateAvailabilityCalendar(data, true);
                }

                return false;
            });
            
    },
    /* on select */
    CalendarApp.prototype.onSelect = function (start, end, allDay) {
        const eventDate  = moment(new Date(start)).format("MMMM DD, YYYY")+" - "+moment(new Date(end)).subtract(1, "days").format("MMMM DD, YYYY");

        var $this = this;
            $this.$modal.modal({
                backdrop: 'static'
            });
            $this.$modal.find("#edit-eventdate").val(eventDate);
            $this.$modal.find('#delete-event').hide().end().find('.update-event').hide().end().find('#save-event').show().end().find('#save-event').unbind('click').click(function (e) {
                e.preventDefault();
                var title = $this.$modal.find("#edit-eventname").val();
                var categoryClass = $this.$modal.find("#edit-eventcolor").val();

                $("#my_event").find("input, select").each(function() {
                    rjValidateInputs("#"+$(this).attr("id"));
                })

                if ($("#my_event").find(".is-invalid").length > 0) {
                    $("#my_event").find(".is-invalid")[0].focus();
                } else {
                    $this.$modal.modal('hide');

                    let dateFrom = moment(new Date(start)).format("YYYY-MM-DD")+" 08:00:00";
                    let dateTo   = moment(new Date(end)).subtract(1, "days").format("YYYY-MM-DD")+" 19:00:00";
                    const data   = {
                        eventName:  title,
                        background: categoryClass,
                        dateFrom,
                        dateTo
                    };
                    saveAvailabilityCalendar(data);
                }
                return false;
            });
            $this.$calendarObj.fullCalendar('unselect');
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
            let calendarData = [];
            $.ajax({
                async:    false,
                // type:     "POST",
                // global:   false,
                url:      "hotel_calendar/getAvailabilityCalendar",
                // data:     true,
                dataType: "json",
                success: function(data) {
                    data.map(item => {
                        const eventName  = item.eventName;
                        const dateFrom   = new Date((item.dateFrom).toString()).getTime();
                        const dateTo     = new Date((item.dateTo).toString()).getTime();
                        const background = item.background;
                        const temp = {
                            id:        item.calendarID,
                            title:     eventName,
                            start:     dateFrom,
                            end:       dateTo,
                            className: background
                        }
                        calendarData.push(temp);
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
                const background = calEvent.className[0];
                let dateFrom   = moment(new Date(calEvent.start._d)).format("YYYY-MM-DD")+" 08:00:00";
                let dateTo     = moment(new Date(calEvent._end._d)).format("YYYY-MM-DD")+" 19:00:00";
                const data = { calendarID, eventName, background, dateFrom, dateTo };
                $this.$calendarObj.fullCalendar('updateEvent', calEvent);
                updateAvailabilityCalendar(data);
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