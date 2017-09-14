require('../common/aside.js');
require('../common/header.js');

var util=require('../common/util.js');
var cs_id=util.getSearch('cs_id');
//数据回显
$.get('/v6/course/lesson',{cs_id:cs_id},function(data){
    if(data.code){
        var html=template('course-edit-tpl',data.result);
        $("#course-edit3").append(html);
    }
});