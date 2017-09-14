require('../common/aside.js');
require('../common/header.js');
var util=require('../common/util.js');

var cs_id=util.getSearch('cs_id');
//数据回显
$.get('/v6/course/picture',{cs_id:cs_id},function(data){
    if(data.code==200){
        data.result.editIndex=2; //记录数据请求成功的索引为2
        var html=template('course-edit2-tpl',data.result);
        $("#course-edit2").append(html);
    }
});

