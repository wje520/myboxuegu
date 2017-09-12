require('../common/aside.js');
require('../common/header.js');

$('#teacher-add-form').ajaxForm(
    function(data) {
        if (data.code == 200) {
            alert('添加讲师成功');
        }
    }
);