require('../common/aside.js');
require('../common/header.js');
$.get('/v6/category',function(data){
        var html=template("category-list-tpl",data.result);
        //console.log(data.result);
        $('.table-bordered').append(html);
});