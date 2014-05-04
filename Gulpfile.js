var gulp = require('gulp');

var concat = require('gulp-concat');
var concatSourcemap = require('gulp-concat-sourcemap');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');
var changed = require('gulp-changed');
var rename = require('gulp-rename');

var paths = {
  scripts: 'js/**/*.js',
  styles: 'scss/**/*.scss',
  images: 'img/**/*'
};

gulp.task('styles', function() {
    return gulp.src(paths.styles)
      .pipe(sass({
        errLogToConsole: true,
        sourceComments: 'map',
        outputStyle: 'expanded'
      }))
      .pipe(gulp.dest('assets/css'));
});

gulp.task('scripts', function() {
  return gulp.src(paths.scripts)
    .pipe(concatSourcemap('scripts.js', {
      sourcesContent: true
    }))
    .pipe(gulp.dest('assets/js'));
});

gulp.task('styles-build', function() {
  return gulp.src(paths.styles)
    .pipe(rename({suffix: '.min'}))
    .pipe(sass({
      errLogToConsole: true,
      outputStyle: 'compressed'
    }))
    .pipe(gulp.dest('assets/css'));
})

gulp.task('scripts-build', function() {
  return gulp.src(paths.scripts)
    .pipe(concat('scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('assets/js'));
});

gulp.task('images', function() {
 return gulp.src(paths.images)
    .pipe(imagemin({
      progressive: true,
      interlaced: true,
      optimizationLevel: 5
    }))
    .pipe(gulp.dest('assets/img'));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  var server = livereload();

  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.styles, ['styles']);
  gulp.watch(paths.images, ['images']);

  gulp.watch('assets/**').on('change', function(file) {
      server.changed(file.path);
  });
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['styles', 'scripts', 'images']);

// Run this before deploy
gulp.task('build', ['styles-build', 'scripts-build', 'images']);
