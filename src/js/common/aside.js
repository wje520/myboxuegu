/**
 * Created by wje on 2017/9/10.
 */
//侧边栏功能

//功能1、获取登录的用户信息  查看application  查看键值
var userinfoStr=localStorage.getItem('userinfo');
//把字符串转成对象
var userinfo=JSON.parse(userinfoStr);
//显示于侧边栏    查看application  获取键值
$('.aside img').attr('src',userinfo.tc_avatar);    //添加src属性
$('.aside h4').text(userinfo.tc_name);

//功能2：子列表的显示和隐藏
$('.navs a').on('click',function(){
    //console.log(11);
    $(this).next('ul').slideToggle();
});
//功能3:根据访问的页面给对应的标题添加焦点：

//* 1、首先获取页面location.pathname
//* 2、获取全部的导航a标签，先统一取出active类名
//* 3、然后利用这个值和导航a标签的href去匹配得到对应的a标签，添加active类名焦点样式
//* 4、最后在焦点a标签的父级元素，让它show
//* */

var path=location.pathname;
//console.log(location);
//排他法
$('.navs a').removeClass('active');
//这里加双引号是因为路径是带双引号的
$('.navs a[href="'+path+'"]').addClass('active').parents('ul').show();