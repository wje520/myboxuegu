require('../common/aside.js');
require('../common/header.js');

/**
  修改密码：
  * 1、这里我们要在表单提交前做一个校验
  * 2、需要使更灵活的ajaxSubmit方法，我们额外手动监听下表单事件
  * */

//这里的submit是事件，阻止表单提交就return false
$("#teacher-repass-form").on('submit',function(){
    if($("#input-pass").val()!=$("#input-pass-repeat").val()){
        alert("两次密码输入不一致，请重新输入");
        return false;  // 阻止表单的自动提交
    }

    // 这个方法只负责获取表单中的值，发送ajax请求，并不负责表单事件的监听与阻止，所以要自己添加
    // 即时调即时发送请求，调用这个方法就相当于调用$.ajax
    // 之前的那个方法比较强大，但是不灵活，这个相对弱一点，但是比较灵活。
    $("#teacher-repass-form").ajaxSubmit({
        success:function(data){
            if(data.code==200){
                alert('密码修改成功');
            }
        }

    });
    return false;  //阻止表单的自动提交
});

