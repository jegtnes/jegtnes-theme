var gulp = require('gulp');

var concat = require('gulp-concat');
var concatSourcemap = require('gulp-concat-sourcemap');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');
var changed = require('gulp-changed');
var rename = require('gulp-rename');
var cmq = require('gulp-combine-media-queries');
var uncss = require('gulp-uncss');
var cssmin = require('gulp-cssmin');
var zopfli = require("gulp-zopfli");
var download = require('download');
var clean = require('gulp-clean');
var xml2js = require('gulp-xml2js');

// Upon runnning styles-build, this will be populated with all blog posts too
// See tasks find-site-files, create-sitemap, and download-rss-feed
var filesToUncss = [
              'http://jegtnes.co.uk',
              'http://jegtnes.co.uk/styleguide',
              'http://jegtnes.co.uk/portfolio',
              'http://jegtnes.co.uk/contact'
            ];

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

gulp.task('styles-build', ['find-site-files'], function() {
  return gulp.src(paths.styles)
    .pipe(rename({suffix: '.min'}))
    .pipe(sass({
      errLogToConsole: true,
      outputStyle: 'compressed'
    }))
    .pipe(cmq({ log: true }))
    .pipe(uncss({
        html: filesToUncss
    }))
    .pipe(cssmin())
    .pipe(gulp.dest('assets/css'))
    .pipe(zopfli())
    .pipe(gulp.dest('assets/css'));
})

gulp.task('scripts-build', function() {
  return gulp.src(paths.scripts)
    .pipe(concat('scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('assets/js'))
    .pipe(zopfli())
    .pipe(gulp.dest('assets/js'));
});

gulp.task('images', function() {
  return gulp.src(paths.images)
    .pipe(imagemin({
      progressive: true,
      interlaced: true,
      optimizationLevel: 7
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

gulp.task('download-rss-feed', function(callback) {
  dl = download({
    url: 'http://jegtnes.co.uk/rss',
    name: 'rss.xml'
  }, './')

  dl.once('close', function() {
    callback();
  });
});

gulp.task('create-sitemap', ['download-rss-feed'], function() {
    return gulp.src('./rss.xml')
    .pipe(xml2js())
    .pipe(rename('rss.json'))
    .pipe(gulp.dest('./'));
});

gulp.task('find-site-files', ['create-sitemap'], function() {
  var json = require('./rss.json');
  json.rss.channel[0].item.forEach(function(value) {
    link = value.link[0]
    filesToUncss.push(link);
  })

  return gulp.src(['rss.json', 'rss.xml'], {read: false})
    .pipe(clean());
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['styles', 'scripts', 'images']);

// Run this before deploy
gulp.task('build', ['styles-build', 'scripts-build', 'images']);
