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


    var scrollRight = 240;
    var scrollLeft = 50;

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

        var list = $('<ul class="ev_list"></ul>');
        container.append(list);

        var days = week.slice(1);
        days.push(week[0]);

        days.forEach(function(dayData) {
            var title = $('<li class="week_title"></li>');
            var filters = $('<li></li>');
            var detailRow = $('<li></li>');

            ///////////
            // TITLE //
            ///////////

            var date = moment(dayData.date);
            title.append('<span class="ev_day">' + date.format("dddd") + ',</span>');
            title.append(' <span class="ev_date">' + date.format("MMMM Do") + '</span>');
            title.append(' <span>(' + date.fromNow() + ')</span>');

            /////////////
            // FILTERS //
            /////////////
            
            var filter_ftr = $('<button class="ev_active ev_featured ev_btn btn" type="button">Featured</button>');
            filter_ftr.click(activate);
            filters.append(filter_ftr);
            var filter_prf = $('<button class="ev_performance ev_btn btn" type="button">Performances <span class="badge">4</span></button>');
            filter_prf.click(activate);
            filters.append(filter_prf);
            var filter_wrk = $('<button class="ev_workshop ev_btn btn" type="button">Workshops <span class="badge">4</span></button>');
            filter_wrk.click(activate);
            filters.append(filter_wrk);
            var filter_dsc = $('<button class="ev_discussion ev_btn btn" type="button">Discussions <span class="badge">4</span></button>');
            filter_dsc.click(activate);
            filters.append(filter_dsc);
            var filter_oth = $('<button class="ev_other ev_btn btn" type="button">Other <span class="badge">4</span></button>');
            filter_oth.click(activate);
            filters.append(filter_oth);

            function activate(ev){
                var target = $( ev.target );
                filters.find('.ev_active').removeClass('ev_active');
                target.addClass('ev_active');
            }

            /////////////
            // DETAILS //
            /////////////

            var detailScroll = $('<div class="ev_scl"></div>');
            var detail = $('<ul class="ev_det"></ul>');

            groupsData.forEach(function(groupData) {
                var group = $('<li class="ev_box"></li>');
                var groupFeatured = dayData[groupData.key];
                var featuredFirst = groupFeatured[0];

                if (featuredFirst) {
                    var img = $('<img src="' + featuredFirst.image.source + '" class="ev_ptr" alt="Image" />');
                    group.append(
                        $('<div class="ev_label ev_' + groupData.key + '"></div>').append(
                            $(
                                '<div class="tbn tbn_f"></div>'
                            ).append(
                                img
                            )
                        ).append(
                            '<p>' + featuredFirst.name + '</p>'
                        )
                    ).click(function() {
                        evt.initLib(evt.lib.event, featuredFirst);
                    });
                }

                groupFeatured.forEach(function(featured) {
                    if (featured == featuredFirst) {
                        return;
                    }
                    var label = $('<div class="ev_label ev_' + groupData.key + '"></div>');
                    label.click(function() {
                        evt.initLib(evt.lib.event, featured);
                    });
                    group.append(label.append('<p>' + featured.name + '</p>'));

                });
                detail.append(group);
            });

            detailScroll.append(detail);

            detailRow.append(detailScroll);

            list.append(title);
            list.append(filters);
            list.append(detailRow);
        });

        $(window).resize(function() {
            var list = $('.ev_list');
            var width = $(window).width()
            if (width > 900) {
                width = 900;
                list.addClass('ev_borders');
            } else {
                list.removeClass('ev_borders');
            }
            list.width(width);
        });

        $(window).trigger('resize');

    });
})();
