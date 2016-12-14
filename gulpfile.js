var gulp          = require('gulp');
var notify        = require('gulp-notify');
var source        = require('vinyl-source-stream');
var browserify    = require('browserify');
var babelify      = require('babelify');
var ngAnnotate    = require('browserify-ngannotate');
var browserSync   = require('browser-sync').create();
var rename        = require('gulp-rename');
var templateCache = require('gulp-angular-templatecache');
var uglify        = require('gulp-uglify');
var merge         = require('merge-stream');
var connect = require('gulp-connect');
var image = require('gulp-image');
var sass = require('gulp-sass');


// Where our files are located
var jsFiles   = "src/js/**/*.js";
var viewFiles = "src/js/**/*.html";

var interceptErrors = function(error) {
  var args = Array.prototype.slice.call(arguments);

  // Send error to notification center with gulp-notify
  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>'
  }).apply(this, args);

  // Keep gulp from hanging on this task
  this.emit('end');
};


gulp.task('browserify', ['views'], function() {
  return browserify('./src/js/app.js')
      .transform(babelify, {presets: ["es2015"]})
      .transform(ngAnnotate)
      .bundle()
      .on('error', interceptErrors)
      //Pass desired output filename to vinyl-source-stream
      .pipe(source('main.js'))
      // Start piping stream to tasks!
      .pipe(gulp.dest('./build/'));
});

gulp.task('html', function() {
  return gulp.src("src/index.html")
      .on('error', interceptErrors)
      .pipe(gulp.dest('./build/'));
});


// Styles Task
// Uglifies
gulp.task('styles', function() {
  return gulp.src('src/scss/style.scss')
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest('build/css'))
});

// images
gulp.task('image', function () {
  gulp.src('src/assets/img/**/*')
    .pipe(image())
    .pipe(gulp.dest('build/assets/img'));
});

gulp.task('views', function() {
  return gulp.src(viewFiles)
      .pipe(templateCache({
        standalone: true
      }))
      .on('error', interceptErrors)
      .pipe(rename("app.templates.js"))
      .pipe(gulp.dest('./src/js/config/'));
});

gulp.task('serveprod', function() {
  connect.server({
    root: '/Users/simondegheselle/Documents/2016-2017/Web%20Apps/partitura/',
    port: process.env.PORT || 5000, // localhost:5000
    livereload: false
  });
});
// This task is used for building production ready
// minified JS/CSS files into the dist/ folder
gulp.task('build', ['html', 'styles', 'serveprod']);



gulp.task('default', ['html', 'styles', 'serveprod']);
