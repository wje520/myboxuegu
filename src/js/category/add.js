require('../common/aside.js');
require('../common/header.js');

/**功能：添加学科
 * 1、slect下拉列表数据渲染
 * 顶级学科数据的获取通过后台接口获取，并将获取的数据用模板渲染
 */
$.get('/v6/category/top',function(data){
    if(data.code==200){
     var value=template('select-top-tpl',data.result);
        $('#category-top-select').html(value);
    }
});
/**
 * 2、添加学科
 */
$("#category-add-form").ajaxForm(
    function(data){
        if(data.code==200){
            alert('添加学科成功')
        }
    }
);