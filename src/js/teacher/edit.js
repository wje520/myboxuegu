require('../common/aside.js');
require('../common/header.js');
var util=require('../common/util.js');

//数据回显
var tc_id=util.getSearch('tc_id');
$.get('/v6/teacher/edit',{tc_id:tc_id},function(data){     //此时不在form表单写 重新编辑的时候才在form表单发起请求
    if(data.code==200){
        var html=template('teacher-edit-tpl',data.result);
        $("#teacher-edit").html(html);
    }
});
//修改讲师+表单提交
$("#teacher-edit-form").ajaxForm({
    delegation:true,
    success:function(data){
        if(data.code==200){
            alert('编辑讲师成功');
        }
    }
});
