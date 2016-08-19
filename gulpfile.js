var gulp = require('gulp'),
  less = require('gulp-less');
//当发生异常时提示错误 确保本地安装gulp-notify和gulp-plumber
  notify = require('gulp-notify'),
  plumber = require('gulp-plumber'),
  changed = require('gulp-changed'),
  base64 = require('gulp-base64'),
  autoprefixer = require('gulp-autoprefixer'),
  minifycss = require('gulp-minify-css'),
  sourcemaps = require('gulp-sourcemaps'),
  browserSync = require('browser-sync'),
  rename = require('gulp-rename'),
  imagemin = require('gulp-imagemin')


gulp.task('less', function() {
  gulp.src('public/stylesheets/**/*.less')
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(sourcemaps.init())
    .pipe(less())
   .pipe(minifycss())
    .pipe(sourcemaps.write())
    .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: true, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove:false //是否去掉不必要的前缀 默认：true 
        }))
    .pipe(base64({
      baseDir: '/',
      extensions: ['svg', 'png', /\.jpg#datauri$/i],
      // exclude:    [/\.server\.(com|net)\/dynamic\//, '--live.jpg'],
      maxImageSize: 10 * 1024, // bytes 1MB=1024×1024Bytes
      debug: true
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('public/stylesheets/'));
});


gulp.task('browser-sync',function () {
  browserSync.init(null, {
    proxy: 'http://localhost:3000',
    files: ['public/**/*.*', 'views/**/*.*'],
    browser: 'google chrome',
    notify: false,
    port: 5000
  });
});



gulp.task('default', ['browser-sync'], function () {
  gulp.watch(['public/stylesheets/**/*.less'], ['less']);
});