//登录
$('#login-form').ajaxForm({
    //成功返回的参数写其他也可以，比如result？
    success: function (data) {
        //console.log(data);
        if (data.code == 200) {
            alert('登录成功');
            //先本地存储用户展示信息 localStorage--指定以字符串的形式存储数据
            localStorage.setItem('userinfo', JSON.stringify(data.result));


            location.href = '/dist';

            //window.href='/dist';

            //记录浏览器缓存

        } else {
            alert('登录失败');
        }
    },
    error: function () {
        alert('登录失败');
    }
});

//回显历史登陆用户的头像，没有就展示一个默认头像
var userinfo = JSON.parse(localStorage.getItem('userinfo'))||{};
var tc_avatar = userinfo.tc_avatar || '/public/img/default.png';
$('.avatar img').attr('src', tc_avatar);


