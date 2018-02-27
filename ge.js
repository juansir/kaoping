var gulp = require('gulp');    // Get Gulp
var uglify = require('gulp-uglify');    // Get uglify module
var minifyCss = require('gulp-minify-css');    // Get minify-css module
var imageMin = require('gulp-imagemin');    // Get imagemin module
var less = require('gulp-less');    // Get less module
var sass = require('gulp-ruby-sass');    // Get ruby-sass module
var jshint = require('gulp-jshint');    // Get jshint module
var notify = require('gulp-notify');    // Get notify module
var connect = require('gulp-connect');  //auto refresh component
var sourcemaps = require('gulp-sourcemaps');

//// Compile less files, run 'gulp less' in command line
//gulp.task('less', function() {
//  // set less source folder
//  gulp.src('less/**/*.less')
//      // compile less to css
//      .pipe(less())
//      // save the compiled files to dest folder
//      .pipe(gulp.dest('css'));
//});

// Compile sass files, run 'gulp sass' in command line
gulp.task('sass', function() {
    return sass('sass/')
    .on('error', function(err) {
        console.error('Error!', err.message);
    })
//  .pipe(sass())
    // save the compressed files to dest folder
    .pipe(gulp.dest('css'))
    .pipe(connect.reload());
});

// Compress JS files, run 'gulp script' in command line
gulp.task('script', function() {
    // set JS source folder
    gulp.src('pages/**/**/*.js')
        // Check the JS code convention
        .pipe(jshint())
        // compress files
//      .pipe(uglify())
        // save the compressed files to dest folder
//      .pipe(gulp.dest('dist/js'))
        // Sent notification
        .pipe(connect.reload())
        .pipe(notify({ message: 'js task complete' }));
});

// Compress CSS files, run 'gulp css' in command line
gulp.task('css', function() {  // 定义一个gulp命令或称之为任务，叫做css
    // set CSS source folder
    gulp.src('css/**/*.css') // 设置css草稿目录
        // compress files
        .pipe(minifyCss())  // 做了一件事情:压缩css
        // save the compressed files to dest folder
        .pipe(gulp.dest('dist/css')); // 告诉gulp输出到哪
});

// Compress images, run 'gulp image' in command line
gulp.task('img', function() {
    // set image folder
    gulp.src('images/**/*.*')
        // Compress images
        .pipe(imageMin({
            progressive: true
        }))
        // save the compressed files to dest folder
        .pipe(gulp.dest('dist/img'));
});

gulp.task('connect',function(){ // 定义一个任务：connect
    connect.server({   // 这是配置一个web服务器
        root:'./',   // 网站根目录设置，一般就./ 就行了
        port:"8080",
        ip:'localhost',  // ip设置，本机调试就自己ip或localhost，浏览器和本代码不在一台电脑就写本机的ip
        livereload:true,  // 这个参数很重要，表示启动了实时刷新，就是我们代码只要改动，浏览器自动刷新！！！
        fallback: 'index.html'
    })
})
gulp.task('html', function(){
	console.log("html is modfied~")
	gulp.src('*.html')
      .pipe(connect.reload())
      // Sent notification
	  .pipe(notify({ message: 'reload for html changed' }));
});
gulp.task('html2', function(){
	console.log("html is modfied~")
	gulp.src('pages/**/**/*.html')
      .pipe(connect.reload())
      // Sent notification
	  .pipe(notify({ message: 'template html changed' }));
});
// Listening the changes, run 'gulp auto' in command line
gulp.task('auto', function() {
    // Listen to the changes in less source folder, run 'less' task when change happens
//  gulp.watch('less/**/*.less', ['less']);
    // Listen to the changes in sass source folder, run 'sass' task when change happens
    gulp.watch('sass/*.scss', ['sass']);
    // Listen to the changes in JS source folder, run 'script' task when change happens
    gulp.watch('js/**/*.js', ['script']);
    // Listen to the changes in CSS source folder, run 'css' task when change happens
    gulp.watch('css/**/*.css', ['css']);
    // Listen to the changes in image folder, run 'image' task when change happens
    gulp.watch('image/**/*.*', ['img']);
    // Listen to the changes in templates source folder, log event when change happens
    gulp.watch('*.html', ['html']);
    gulp.watch('pages/**/**/*.html', ['html2']);
    
});
//,function(event){
//  		console.log('Event type: ' + event.type); // added, changed, or deleted
//  		console.log('Event path: ' + event.path); // The path of the modified file
//  }
// Define the default task, run 'gulp' in command line, it will run both 'script' and 'auto' tasks
gulp.task('default', ['sass', 'script', 'css', 'img', 'connect', 'auto']);

