
var gulp = require('gulp');    // 得到 Gulp
var minifycss = require('gulp-minify-css');
var connect = require('gulp-connect');
var notify = require('gulp-notify');
var sass = require('gulp-ruby-sass');

//sasstocss
gulp.task('sasstocss',function(){
    return sass('sass/*')
        .on('error',function(err){
            console.log('Error!',err.message)
        })
        .pipe(gulp.dest('css/'))
        .pipe(notify({message:"html文件被改了"}))
        .pipe(connect.reload())
})

//css
gulp.task('css',function(){
    gulp.src('css/*.css')
        .pipe(minifycss())
        .pipe(gulp.dest('dist/css'))  // 存储的最终位置
})

//html
gulp.task('html',function(){
    gulp.src('html/*.html')
        .pipe(notify({message:"html文件被改了"}))
        .pipe(connect.reload())
})

//js



//connect
gulp.task('connect',function(){
    connect.server({
        root:'./',
        ip:"localhost",
        port:'8091', // 端口范围0-65535
        livereload:true
    })
})

// 监视文件改动watch(文件，[任务1，任务2，....])
gulp.task('auto',function(){
    //表示根目录下的html文件一旦有改动，就立即执行html任务
    gulp.watch('html/*.html',['html']);
    gulp.watch('sass/*.scss',['sasstocss','css'])
})


gulp.task('default',['css','connect','html','auto','sasstocss'])


