var gulp = require('gulp');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var sass = require('gulp-ruby-sass');

var paths = {
  scripts: 'js/**/*.js',
  styles: 'scss/style.scss',
  images: 'img/**/*'
};

gulp.task('scripts', function() {
  return gulp.src(paths.scripts)
    .pipe(concat('jegtnes.min.js'))
    .pipe(uglify({outSourceMap: true}))
    .pipe(gulp.dest('assets/js'));
});

gulp.task('styles', function() {
    return gulp.src(paths.styles)
      .pipe(sass({
        sourcemap: true,
        style: 'compressed'
      }))
      .pipe(gulp.dest('assets/css'));
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
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.styles, ['styles']);
  gulp.watch(paths.images, ['images']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['scripts', 'images', 'styles']);
