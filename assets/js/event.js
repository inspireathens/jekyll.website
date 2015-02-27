(function() {

    var prefix = "/assets/events/public/singles/";

    var evt = window.evt;

    evt.single = {};
    var single = evt.single;

    single.init = function(data) {
        console.log(data);

        var popup = $("#popup");
        popup.modal("show");

        //////////////////////
        // PREPARE LAYOUT   //
        //////////////////////

        var title = $("#popup_title");
        var body = $("#popup_body");
        body.text("");

        var thumb_link = $('<a data-toggle="lightbox"></a>');
        var thumb_img = $('<img class="ev_ptr" alt="Image" />');
        thumb_link.append(thumb_img);


        var name = $('<p class="ev_name">' + data.name + '</p>');
        var description = $('<p></p>');

        //////////////
        // TIME //
        //////////////

        var timeStart = $('<div></div>');
        var timeEnd = $('<div></div>');

        var time = $('<div class="ev_row"></div>').append(
            $('<i class="fa fa-clock-o"></i>')
        ).append(
            $('<div></div>').append(
                timeStart
            ).append(
                timeEnd
            )
        );

        //////////////
        // LOCATION //
        //////////////

        var locationVenue = $('<div></div>');
        var locationAddress = $('<div></div>');

        var location = $('<div class="ev_row"></div>').append(
            $('<i class="fa fa-location-arrow"></i>')
        ).append(
            $('<div></div>').append(
                locationVenue
            ).append(
                locationAddress
            )
        );

        /////////////////
        // ADD TO BODY //
        /////////////////

        body.
        append(name).
        append('<br>').
        append(
            $('<div class="tbn tbn_e"></div>').append(
                thumb_link
            )
        ).
        append('<br>').
        append(time).
        append(location).
        append('<br>').
        append(description);

        /////////////////
        // LOAD DATA   //
        /////////////////

        $.getJSON(prefix + data.id + ".json", function(obj) {

        	title.html('Public Event <a target="_blank" href="https://www.facebook.com/'+obj.id+'">(on facebook)</a>');

            name.html(obj.name);
            var img = getImage(obj.images);
            thumb_img.attr("src", img.source);
            thumb_link.attr("href", img.source);
            description.html(obj.description);

            //////////////
            // LOCATION //
            //////////////

            locationAddress.html(
                getAddress(obj.venue) +
                ' <a target="_blank" href="http://maps.google.com/maps?q=' +
                obj.venue.latitude +
                ',' +
                obj.venue.longitude +
                '">(view map)</a>'
            );

            locationVenue.html(
                obj.location +
                ' <a target="_blank" href="https://www.facebook.com/' + obj.owner.id + '">(view profile)</a>'
            );

            //////////
            // TIME //
            //////////

            if (obj.start_time) {
                timeStart.html("Starting: " + moment(obj.start_time).calendar());
            }
            if (obj.end_time) {
                timeEnd.html("Ending: " + moment(obj.end_time).calendar());
            }

        });
    }

    function getImage(images) {
        var max = {
            width: 0
        }
        for (z in images) {
            var image = images[z];
            if (image.width > 500 && image.width < 750) {
                return image;
            }
            if (image.width > max.width) {
                max = image;
            }
        }

        return max;
    }

    function getAddress(venue) {
        res = "";
        if (venue.street) {
            res += venue.street + ", ";
        }
        if (venue.zip) {
            res += venue.zip;
        }
        if (venue.city) {
            res += " " + venue.city;
        }
        return res;
    }

    function getClock() {
        return days[time.getDay()] + " " + time.getDate() + " of " + time.getMonth() + " " + time.getTime()
    }

})();
