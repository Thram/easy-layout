'use strict';

var gulp        = require('gulp'),
    argv        = require('yargs').argv,
    sass        = require('gulp-sass'),
    dom         = require('gulp-dom'),
    prefixer    = require('gulp-autoprefixer'),
    sourcemaps  = require('gulp-sourcemaps'),
    del         = require('del'),
    open        = require('gulp-open'),
    fileinclude = require('gulp-file-include'),
    sync        = require('gulp-sync')(gulp).sync,
    concat      = require('gulp-concat'),
    rename      = require('gulp-rename'),
    uglify      = require('gulp-uglify');

var folders = {
  src : __dirname + '/src',
  dest: __dirname + '/dist'
};

var page        = argv.p || argv.page || 'kitchen_sink',
    openBrowser = (argv.o || argv.open) !== undefined || false,
    layout      = argv.l || argv.layout || 'desktop';

folders.assets  = folders.src + '/assets';
folders.layouts = folders.src + '/layouts';
folders.styles  = folders.src + '/stylesheets';
folders.scripts = folders.src + '/scripts';

gulp.task('clean', function (cb) {
  return del([folders.dest + '*'], cb);

});

gulp.task('scripts', function () {
  return gulp.src([folders.scripts + '/**/*.js'])
    //.pipe(concat('concat.js'))
    //.pipe(rename('app.js'))
    //.pipe(uglify())
    .pipe(gulp.dest(folders.dest + '/js'));
});

gulp.task('sass', function () {
  return gulp.src(folders.styles + '/app.scss')
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(prefixer({browsers: ['last 3 versions', 'ie >= 9']}))
    .pipe(sourcemaps.write({sourceRoot: '/stylesheets'}))
    .pipe(gulp.dest(folders.dest + '/css'));
});

gulp.task('assets', function () {
  return gulp.src(folders.assets + '/**/*')
    .pipe(gulp.dest(folders.dest + '/assets'));
});

gulp.task('watch', function (cb) {
  gulp.watch(folders.scripts + '/**/*.js', ['scripts']);
  gulp.watch(folders.layouts + '/**/*.html', ['wrapper', 'include']);
  gulp.watch(folders.styles + '/**/*.scss', ['sass']);
});

gulp.task('open', function (cb) {
  if (openBrowser) {
    return gulp.src(folders.dest + '/index.html')
      .pipe(open());
  } else {
    return cb();
  }

});

gulp.task('wrapper', function () {
  return gulp.src(folders.layouts + '/wrapper.html')
    .pipe(fileinclude({
      basepath: folders.layouts + '/views/' + page + '.html'
    }))
    .pipe(fileinclude({
      prefix: '##'
    }))
    .pipe(dom(function () {
      this.querySelectorAll('body')[0].className = 'view-' + page;
      return this;
    }))
    .pipe(gulp.dest(folders.dest));
});

gulp.task('include', function () {
  return gulp.src(folders.layouts + '/index.html')
    .pipe(dom(function () {
      this.querySelectorAll('iframe')[0].className = layout + '-layout';
      return this;
    }))
    .pipe(gulp.dest(folders.dest));
});

gulp.task('build', sync(['clean', 'sass', 'scripts', 'wrapper', 'include', 'assets']));
gulp.task('default', sync(['build', 'open', 'watch']));