(function() {
    var lib_prx = "/assets/js/";
    window.evt = {};
    var evt = window.evt;

    evt.lib = {};
    evt.lib.event = {
        source: "event.js",
        name: "event"
    }

    evt.initLib = function(lib, data) {
        var name = lib.name;
        if (lib.loaded) {
            evt.single.init(data);
        } else {
            var req = $.getScript(lib_prx + lib.source);

            req.done(function() {
                evt.single.init(data);
                lib.loaded = true;
            });
            req.fail(function(jqxhr, settings, exception) {
                console.error(exception);
            });
        }

    }

    ///////////////////
    // GROUP DETAILS //
    ///////////////////

   
    var scrollRight = 20; 
    var scrollLeft = 150; 

    var groupsData = [{
        title: 'Performances',
        key: 'performance',
    }, {
        title: 'Workshops',
        key: 'workshop'
    }, {
        title: 'Discussions',
        key: 'discussion'
    }, {
        title: 'Other',
        key: 'other'
    }];

    var dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    $.getJSON("/assets/events/public/featured.json", function(week) {
        var container = $("#ev_container");

        var titles = $('<div id="ev_titles"></div>');
        var header = $('<div class="row"></div>').append(
            $('<div class="week_title"></div>')
        ).append(
            titles
        );

        for (i in groupsData) {
            var groupData = groupsData[i];
            var group = $('<div class="ev_box"></div>');
            group.append(
                $('<div class="ev_' + groupData.key + '"></div>').append('<h3>' + groupData.title + '</h3>')
            );
            titles.append(group);
        }

        //container.append(header);

        for (dayIndex in week) {
            var dayData = week[dayIndex];
            var row = $('<tr></tr>');
            var titleContainer = $('<td></td>');
            var detailContainer = $('<td></td>');
            row.append(titleContainer);
            row.append(detailContainer);

            var title = $('<div style="width:'+scrollLeft+'px" class="week_title"></div>');
            title.append('<h2>' + dayNames[dayData.day] + '</h2>');

            var detailScroll = $('<div class="ev_scl"></div>');
            var detail = $('<ul class="ev_det"></ul>');

            groupsData.forEach(function(groupData) {
                var group = $('<li class="ev_box"></li>');
                var groupFeatured = dayData[groupData.key];
                var featuredFirst = groupFeatured[0];

                if (featuredFirst) {
                    var img = $('<img src="' + featuredFirst.image.source + '" class="ev_ptr" alt="Image" />');
                    group.append(
                        $(
                            '<div class="tbn tbn_f ev_' + groupData.key + '"></div>'
                        ).append(
                            img
                        )
                    );
                    img.click(function() {
                        evt.initLib(evt.lib.event, featuredFirst);
                    });
                }

                groupFeatured.forEach(function(featured) {
                    var label = $('<div class="ev_label ev_' + groupData.key + '"></div>');
                    label.click(function() {
                        evt.initLib(evt.lib.event, featured);
                    });
                    group.append(label.append('<p>' + featured.name + '</p>'));

                });
                detail.append(group);
            });

            detailScroll.append(detail);

            titleContainer.append(title);
            detailContainer.append(detailScroll);

            container.append(row);
        }

        $(window).resize(function() {
            $('.ev_scl').width($(window).width() - (scrollLeft+scrollRight));
        });

        $(window).trigger('resize');

    });
})();
