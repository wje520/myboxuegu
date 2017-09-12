
//引入公共模块的js
require('../common/aside.js');
require('../common/header.js');

/*
  列表数据展示：
  * 1、请求接口获取数据
  * 2、得到数据渲染后的模版，插入页面指定位置
  *
  * */
$.get('/v6/teacher',function(data){
    if(data.code==200){
        var html=template('teacher-list-tpl',data.result);
        $('#teacher-list-table').append(html);
    }
});

 /*
 讲师启用与注销：
 * 1、因为按钮是随着列表动态生成的，所以需要委托的方式绑定click事件
 * 2、点击时通过自定义属性拿到这个按钮身上的tc_id与tc_status请求接口
 * 3、状态修改成功后，要重新设置按钮的文本，按钮的自定义属性
  */

$(document).on('click','#btn-teacher-status',function(){
    //console.log(11);
    var _this=$(this);
    //console.log($(this).attr('tc_id'));     //undefined
    var data={
        tc_id:$(this).attr('data-id'),
        tc_status:$(this).attr('data-status')   //注意是填写属性名获取值
    };
    $.post('/v6/teacher/handle',data,function(data){
        //console.log(11);
        if(data.code==200){
            var newStatus=data.result.tc_status;
            _this.text(newStatus==0?'注销':'开启');  //0开启，1注销
            _this.attr('data-status',newStatus);
        }
    });
});


