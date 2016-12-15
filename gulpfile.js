var gulp = require('gulp');
var notify = require('gulp-notify');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var babelify = require('babelify');
var ngAnnotate = require('browserify-ngannotate');
var browserSync = require('browser-sync').create();
var rename = require('gulp-rename');
var templateCache = require('gulp-angular-templatecache');
var uglify = require('gulp-uglify');
var merge = require('merge-stream');
var image = require('gulp-image');
var sass = require('gulp-sass');
var connect = require('gulp-connect');

var karma = require('gulp-karma');




// Where our files are located
var jsFiles = "src/js/**/*.js";
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
        .transform(babelify, {
            presets: ["es2015"]
        })
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
gulp.task('image', function() {
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

// This task is used for building production ready
// minified JS/CSS files into the dist/ folder
gulp.task('build', ['html', 'styles', 'browserify'], function() {
    var html = gulp.src("build/index.html")
        .pipe(gulp.dest('./dist/'));

    var js = gulp.src("build/main.js")
        .pipe(uglify())
        .pipe(gulp.dest('./dist/'));

    return merge(html, js);
});

gulp.task('test', function() {
  // Be sure to return the stream
  // NOTE: Using the fake './foobar' so as to run the files
  // listed in karma.conf.js INSTEAD of what was passed to
  // gulp.src !
  return gulp.src('./foobar')
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run'
    }))
    .on('error', function(err) {
      // Make sure failed tests cause gulp to exit non-zero
      console.log(err);
      this.emit('end'); //instead of erroring the stream, end it
    });
});

gulp.task('serve', function() {
    connect.server({
        root: 'build',
        port: process.env.PORT || 5000,
        livereload: process.env.NODE_ENV === 'development' || process.env.NODE_ENV === undefined ? true : false,
    });
});

gulp.task('default', ['html', 'styles', 'serve']);
