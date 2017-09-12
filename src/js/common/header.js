/**
 * Created by wje on 2017/9/10.
 */
//退出
/**
 * 注意ajax的引入语法
 */
$('#logout').on('click',function(){
    console.log(11);
    $.ajax({
        type:'post',
        url:'/v6/logout',
        success:function(data){
            //console.log(data);
            if(data.code==200){
                alert('退出成功');
                //前面的首页部分的域名可以省略
                location.href='/dist/html/user/login.html';
            }
        }
    });
});