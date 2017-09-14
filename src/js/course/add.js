require('../common/aside.js');
require('../common/header.js');

/**
 *
 */
$("#course-add").ajaxForm(function(data){
    if(data.code==200){
        alert('课程添加成功');
    }
})