'use strict';

// gulp and gulp plugins
var gulp         = require('gulp');
var clean        = require('gulp-clean');
var cssmin       = require('gulp-minify-css');
var htmlmin      = require('gulp-minify-html');
var uglify       = require('gulp-uglify');
var imagemin     = require('gulp-imagemin');
var replace      = require('gulp-batch-replace');
var rename       = require('gulp-rename');
var shell        = require('gulp-shell');
var spritesmith  = require('gulp.spritesmith');
var gutil        = require('gulp-util');
var concat       = require('gulp-concat');
var addsrc       = require('gulp-add-src');
var gulpif       = require('gulp-if');
var watch        = require('gulp-watch');
var sass         = require('gulp-sass');
var flatten      = require('gulp-flatten');
var htmlReplace  = require('gulp-html-replace');

var src_js_lib_path     = 'src/lib/js/';
var src_css_lib_path    = 'src/lib/css/';
var src_scss_path       = 'src/scss/';
var build_html_path     = 'build/html/';
var build_js_path       = 'build/js/';
var build_css_path      = 'build/css/';

gulp.task('default', function () {
    var gulpTasks = Object.keys(gulp.tasks);
    var colors    = gutil.colors;
    var log       = gutil.log;

    colors.enabled = true;
    colors.supportsColor = true;

    log(colors.cyan('-- All Tasks --'));
    for (var i = 0; i < gulpTasks.length; i++) {
        log('*  ', colors.green(gulpTasks[i]));
    }
});

gulp.task('clean', function(){
    return  gulp.src([src_js_lib_path, src_css_lib_path, 'build/*'], {read: false})
                .pipe(clean());
});

gulp.task('prepare', ['clean'], function () {
    gulp.src([
        './bower_components/bootstrap/dist/css/bootstrap.min.css',
        './bower_components/datatables/media/css/jquery.dataTables.min.css',
        './bower_components/datetimepicker/jquery.datetimepicker.css'
        ])
        .pipe(gulp.dest(src_css_lib_path));

    gulp.src([
            './bower_components/jquery/dist/jquery.min.js',
            './bower_components/jquery.lazyload/jquery.lazyload.js',
            './bower_components/bootstrap/dist/js/bootstrap.min.js',
            './bower_components/i18next/i18next.js',
            './bower_components/jquery-placeholder/jquery.placeholder.js',
            './bower_components/datatables/media/js/jquery.dataTables.js',
            './bower_components/datetimepicker/jquery.datetimepicker.js',
            './bower_components/html5shiv/dist/html5shiv.min.js',
            './bower_components/respond/dest/respond.min.js'
        ])
        .pipe(gulp.dest(src_js_lib_path));

    return gulp.src([
            './bower_components/jquery-1.9.1/jquery.min.js'
        ])
        .pipe(rename('jquery.1.9.1.min.js'))
        .pipe(gulp.dest(src_js_lib_path));
});


gulp.task('build-cquery', function(){
    gulp.src([
            'src/lib/js/jquery.min.js',
            'src/lib/js/i18next.js',
            'src/lib/js/jquery.placeholder.js',
            'src/lib/js/jquery.dataTables.js',
            'src/lib/js/jquery.datetimepicker.js',
            'src/js/modules/*.js',
            'src/js/cquery.js'
        ])
        .pipe(concat('cquery.min.js'))
        .pipe(gulp.dest('build/js'));

    gulp.src([
            'src/scss/mixins.scss',
            'src/scss/reset.scss',
            'src/scss/modules/*.scss',
            'src/scss/datatables.scss',
            'src/scss/cquery.scss'
        ])
        .pipe(sass())
        .pipe(flatten())
        .pipe(addsrc.prepend(['src/lib/css/jquery.dataTables.min.css', 'src/lib/css/jquery.datetimepicker.css']))
        .pipe(concat('cquery.min.css'))
        .pipe(gulp.dest('build/css/'));

    gulp.src('src/html/cquery.html')
        .pipe(htmlReplace({
            'css': '../css/cquery.min.css',
            'js': '../js/cquery.min.js'
        }))
        .pipe(gulp.dest(build_html_path));
});

gulp.task('build-share', function () {
    gulp.src([
            'src/lib/js/jquery.1.9.1.min.js',
            'src/lib/js/html5shiv.min.js',
            'src/lib/js/respond.min.js'
        ])
        .pipe(concat('lowie.min.js'))
        .pipe(gulp.dest('build/js'));

    gulp.src(['src/data/i18n/*.json'])
        .pipe(gulp.dest('build/data/i18n/'));

    gulp.src(['src/img/*'])
        .pipe(gulp.dest('build/img/'));
});

gulp.task('build', function(){
    gulp.start('build-share', 'build-cquery');
});

gulp.task('watch', function(){
    gulp.watch('src/html/*', ['build']);
    gulp.watch(['src/js/**/*.js'], ['build']);
    gulp.watch(['src/scss/**/*.scss'], ['build']);
    gulp.watch('src/img/*', ['build']);
    gulp.watch('src/data/i18n/*', ['build']);
});
