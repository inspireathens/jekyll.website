(function() {

    var groupsData = [{
        title: 'Performances',
        key: 'performance'
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

    var dayNames = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];

    $.getJSON("/assets/events/public/featured.json", function(week) {
        console.log(week);
        var container = $("#week_cnt");
        for (dayIndex in week) {
            var dayData = week[dayIndex];
            var dayContainer = $('<div class="row"></div>');

            var title = $('<div class="col-md-2 week_title"></div>');
            title.append('<h2>'+dayNames[dayData.day]+'</h2>');

            var detail = $('<div class="col-md-10"></div>');

            for (i in groupsData){
            	var groupData = groupsData[i];
                var group = $('<div class="col-md-3"></div>');
                group.append('<h3>'+groupData.title+'</h3>');

                var groupFeatured = dayData[groupData.key];  
               	var featuredFirst = groupFeatured[0];

               	if(featuredFirst){
                group.append('<div class="thumbnail"></div>').append('<img src="'+featuredFirst.image.source+'" class="portrait" alt="Image" />');
               	}
                detail.append(group);
            }

            dayContainer.append(title);
            dayContainer.append(detail);

            container.append(dayContainer);
            container.append('<br>');
        }
    });
})();
