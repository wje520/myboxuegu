/**
 * Created by wje on 2017/9/11.
 */

/**
 *  解析location.search：把问号后面的字符串转成对象，传1个参数返回指定key的值，不传参数返回解析成对象后的值。
 1、首先把头部的?去掉
 2、通过&符号劈成一组组key=val这样的字符串组成的数
 3、然后在通过=号把一组组字符串劈开获取key与val，存储到一个对象中
 4、判断没有传参返回这个对象，传了返回对象中指定key的值
 */

function getSearch(key) {
    var searchStr = location.search.slice(1);
    var searchArr = searchStr.split("&"); //拆分多个字段
    var searchObj = {};
    for (var i = 0; i < searchArr.length; i++) {
        var tempArr = searchArr[i].split('=');
        searchObj[tempArr[0]] = tempArr[1];
    }
    return key != null ? searchObj[key] : searchObj;
}

/**
 * function view(){};
   function view2(){};
   暴露的方式：
   module.exports = {
    view: view,
    view2: view2
    }
  所以以下两种写法是一样的
 加载：var util=require('../common/util.js');
 调用：var cg_id=util.getSearch('cg_id');
 */
//module.exports[getSearch] = getSearch;

module.exports={
    getSearch:getSearch
}