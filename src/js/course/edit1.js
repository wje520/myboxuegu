require('../common/aside.js');
require('../common/header.js');
var util = require('../common/util.js');

//数据回显
//请求参数：cs_id
var cs_id = util.getSearch('cs_id');
$.get('/v6/course/basic', {cs_id: cs_id}, function (data) {
    //console.log(11);
    if (data.code == 200) {
        data.result.editIndex=1;  //记录数据请求成功的索引为1
        var html = template('course-edit1-tpl', data.result);
        $("#course-edit1").append(html);
    }
});

/**
 * 学科二级联动：
 * 1、因为整个数据回显是动态构建的，所以通过委托的方式监听父级学科select的change事件
 * 2、事件发生时获取所选顶级学科cg_id，调用接口获取对应的子级学科列表
 * 3、拿到数据后动态生成新的子级option进行替换
 * */
$(document).on('change', '#cg-top-select', function () {    //注意是给select注册change事件，不是给option，否则以下的会没有作用
    console.log(11);
    var cgTopVal = $(this).val();    //获取顶级学科的cg_id

    $.get('/v6/category/child', {cg_id:cgTopVal}, function (data) {
        var html = '';
        var childList = data.result;        //子级分类中后台返回的result是数组，需要遍历
        if (data.code == 200) {
            for (var i = 0; i < childList.length; i++) {
                html+='<option value="'+childList[i].cg_id+'">'+childList[i].cg_name+'</option>'   //字符串拼接动态生成option
            }

        }
        $("#cg-childs-select").html(html);
        console.log($("#cg-childs-select").html(html));
    });
});
/**
 * 表单提交：
 * 1、使用ajaxForm方法的委托方式表单转ajax
 * 2、编辑成功后给出提示，然后跳转到编辑第二步页面(跳转时需要继续把cs_id传递过去)
 * */
$("#course-edit1-form").ajaxForm({
    delegation:true,
    success:function(data){
        if(data.code==200){
            alert("基本信息编辑成功");
            location.href='/dist/html/course/edit2.html?cs_id='+cs_id;   //在数据回显时已经获取到cs_idl
        }

    }
});