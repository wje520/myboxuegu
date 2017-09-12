require('../common/aside.js');
require('../common/header.js')

var util=require('../common/util.js');   //针对要用到的函数，先保存加载的函数，在调

/**
  * 数据回显：
  * 1、先获取location.search中的cg_id值
  * 2、利用这个cg_id请求接口获取数据
  * 3、得到数据渲染后的模版，插入到页面指定位置
  * */
var cg_id=util.getSearch('cg_id');
$.get('/v6/category/edit',{cg_id:cg_id},function(data){
    var html=template('category-edit-tpl',data.result);

    $('.category-edit').html(html);
});

/*
  表单提交：
  * 1、因为数据要回显，所以form表单是异步动态插入到页面中的，必须配置插件的委托
  * 2、修改成功后给用户一个提示
  * 不需要给submit注册事件吗？
 */
$('#category-edit-form').ajaxForm({
    delegation:true,
    success:function(data){
        if(data.code==200){
            alert('编辑成功');
        }
    }
});