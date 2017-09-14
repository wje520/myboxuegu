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

//加载browserify
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

//引入gulp-html-replace插件，抽取页面公共部分
var htmlReplace=require('gulp-html-replace');

//压缩html
gulp.task('html', function () {
    //两个*表示任意的文件
    gulp.src(['src/**/*.html', 'index.html'])
        //抽取页面公共部分  必须写在htmlmin之前
        //这里的src里面前面不能加斜杠，这是属于node不是js
        .pipe(htmlReplace({
            style:gulp.src('src/html/common/style.html'),
            aside:gulp.src('src/html/common/aside.html'),
            header:gulp.src('src/html/common/header.html'),
            courseEditHeader:gulp.src('src/html/common/course/header.html'),//提取课程编辑公共头部和侧边栏
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

//编译less文件并压缩
gulp.task('less', function () {
    gulp.src('src/less/index.less')
        .pipe(less())
        .pipe(cleanCss())
        //.pipe(rename({
        //    suffix: '.min'
        //}))
        .pipe(gulp.dest('dist/css'));
});


//合并jsLibs  打包第三方包

var jsLibs = [
    'node_modules/art-template/lib/template-web.js',
    'node_modules/jquery/dist/jquery.js',
    'node_modules/bootstrap/dist/js/bootstrap.js',
    //增加jquery-form第三方包
    'node_modules/jquery-form/dist/jquery.form.min.js'
];
gulp.task('jsLib', function () {
    gulp.src(jsLibs)
        //合并后的路径名
        .pipe(concat('lib.js'))
        .pipe(gulp.dest('dist/js'))
});


//压缩js文件
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
//    browserify('./src/js/index.js').bundle()   //打包index.js
//        .pipe(source('index.js'))
//        .pipe(buffer())
//        .pipe(uglify())
//        .pipe(gulp.dest('dist/js'));
//
//});

var jsModules = [
    //首页
    'src/js/index.js',
    //用户
    'src/js/user/login.js',
    'src/js/user/repass.js',
    'src/js/user/profile.js',
    //讲师
    'src/js/teacher/add.js',
    'src/js/teacher/edit.js',
    'src/js/teacher/list.js',
    //课程
    'src/js/course/add.js',
    'src/js/course/edit1.js',
    'src/js/course/edit2.js',
    'src/js/course/edit3.js',
    'src/js/course/list.js',

    //学科介绍
    'src/js/category/add.js',
    'src/js/category/edit.js',
    'src/js/category/list.js',

];


gulp.task('js', function () {
    jsModules.forEach(function (jsPath) {
        //split方法把字符串切成数组
        var pathArr = jsPath.split('/');
        var jsName = pathArr.pop();
        pathArr.shift();
        browserify(jsPath,{debug:true}).bundle()   //打包index.js
            .pipe(source(jsName))
            .pipe(buffer())
            .pipe(uglify())
            .pipe(gulp.dest('dist/' + pathArr.join('/')));

    });

});

//统一打包
gulp.task('build', function () {
    gulp.run(['html', 'less', 'jsLib', 'js']);
});


//watch监听文件变化
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