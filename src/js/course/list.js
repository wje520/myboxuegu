require('../common/aside.js');
require('../common/header.js');

/**
 *
 */
$.get('/v6/course',function(data){
    if(data.code==200){
        var html=template('course-list-tpl',data.result);
        $("#course-list").html(html);
    }
});