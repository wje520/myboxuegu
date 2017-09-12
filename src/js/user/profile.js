
require('../common/aside.js');
require('../common/header.js');


/**
 * 数据回显
 */
//方式1
//$.ajax({
//    type:'get',
//    url:'/v6/teacher/profile',
//    success:function(data){
//        if(data.code==200){
//            var html=template('teacher-profile-tpl',data.result);
//            $('.teacher-profile').html(html);
//        }
//    }
//});
//方式2：http get请求
$.get('/v6/teacher/profile',function(data){
    if(data.code==200){
        var html=template('teacher-profile-tpl',data.result);
        $('.teacher-profile').html(html);
    }
})

/**
 *  表单表交：
 * 1、因为表单要进行数据回显，所以是动态异步创建出来的。
 * 我们这里要通过插件的ajaxForm监听表单提交事件必须使用委托的方式，插件提供了delegation选项配置为true即可。
 * 2、修改成功后给个用户提示
 */
$("#teacher-profile-form").ajaxForm({
    delegation:true,
    success:function(data){
        if(data.code==200){
            alert('个人信息修改成功');
        }
    }
})