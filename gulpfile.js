/**
 * Created by wje on 2017/9/8.
 */
var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var less = require('gulp-less');
var cleanCss = require('gulp-clean-css');
var uglify = require('gulp-uglify');

//����browserify
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

//����gulp-html-replace�������ȡҳ�湫������
var htmlReplace=require('gulp-html-replace');

//ѹ��html
gulp.task('html', function () {
    //����*��ʾ������ļ�
    gulp.src(['src/**/*.html', 'index.html'])
        //��ȡҳ�湫������  ����д��htmlmin֮ǰ
        //�����src����ǰ�治�ܼ�б�ܣ���������node����js
        .pipe(htmlReplace({
            style:gulp.src('src/html/common/style.html'),
            aside:gulp.src('src/html/common/aside.html'),
            header:gulp.src('src/html/common/header.html'),
            courseEditHeader:gulp.src('src/html/common/course/header.html'),//��ȡ�γ̱༭����ͷ���Ͳ����
            courseEditAside:gulp.src('src/html/common/course/aside.html')
        }))
        .pipe(htmlmin({
            collapseWhitespace: true,
            minifyJS: true,
            minifyCSS: true,
            removeComments: true
        }))
        .pipe(gulp.dest('dist'));
});

//����less�ļ���ѹ��
gulp.task('less', function () {
    gulp.src('src/less/index.less')
        .pipe(less())
        .pipe(cleanCss())
        //.pipe(rename({
        //    suffix: '.min'
        //}))
        .pipe(gulp.dest('dist/css'));
});


//�ϲ�jsLibs  �����������

var jsLibs = [
    'node_modules/art-template/lib/template-web.js',
    'node_modules/jquery/dist/jquery.js',
    'node_modules/bootstrap/dist/js/bootstrap.js',
    //����jquery-form��������
    'node_modules/jquery-form/dist/jquery.form.min.js'
];
gulp.task('jsLib', function () {
    gulp.src(jsLibs)
        //�ϲ����·����
        .pipe(concat('lib.js'))
        .pipe(gulp.dest('dist/js'))
});


//ѹ��js�ļ�
//gulp.task('js',function(){
//   gulp.src('src/js/*.js')
//       .pipe(uglify())
//       .pipe(rename({
//           suffix:'.min'
//       }))
//       .pipe(gulp.dest('dist/js'))
//});

//
//gulp.task('js', function () {
//    browserify('./src/js/index.js').bundle()   //���index.js
//        .pipe(source('index.js'))
//        .pipe(buffer())
//        .pipe(uglify())
//        .pipe(gulp.dest('dist/js'));
//
//});

var jsModules = [
    //��ҳ
    'src/js/index.js',
    //�û�
    'src/js/user/login.js',
    'src/js/user/repass.js',
    'src/js/user/profile.js',
    //��ʦ
    'src/js/teacher/add.js',
    'src/js/teacher/edit.js',
    'src/js/teacher/list.js',
    //�γ�
    'src/js/course/add.js',
    'src/js/course/edit1.js',
    'src/js/course/edit2.js',
    'src/js/course/edit3.js',
    'src/js/course/list.js',

    //ѧ�ƽ���
    'src/js/category/add.js',
    'src/js/category/edit.js',
    'src/js/category/list.js',

];


gulp.task('js', function () {
    jsModules.forEach(function (jsPath) {
        //split�������ַ����г�����
        var pathArr = jsPath.split('/');
        var jsName = pathArr.pop();
        pathArr.shift();
        browserify(jsPath,{debug:true}).bundle()   //���index.js
            .pipe(source(jsName))
            .pipe(buffer())
            .pipe(uglify())
            .pipe(gulp.dest('dist/' + pathArr.join('/')));

    });

});

//ͳһ���
gulp.task('build', function () {
    gulp.run(['html', 'less', 'jsLib', 'js']);
});


//watch�����ļ��仯
gulp.task('default', function () {

    gulp.watch('src/**/*.html', function () {
        gulp.run('html');
    });
    gulp.watch('src/less/index.less', function () {
        gulp.run('less');
    });
    gulp.watch('src/**/*.js', function () {
        gulp.run('js');
    });
});