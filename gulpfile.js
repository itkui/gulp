const { src, series, dest, parallel, watch } = require('gulp');
const $ = require('gulp-load-plugins')(); // gulp自动加载
/* const less = require('gulp-less');
const path = require('path');
const concat = require('gulp-concat');
const cleanCss = require('gulp-clean-css');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');
const livereload = require('gulp-livereload');
const connect = require('gulp-connect');
const open = require('gulp-open'); */

function compileCss() {
  return src('src/less/**/*.less').pipe($.less()).pipe(dest('src/css/'));
}

function concatCss() {
  return src('src/css/*.css')
    .pipe($.concat('build.css'))
    .pipe(
      $.cleanCss({
        compatibility: 'ie8',
      }),
    )
    .pipe($.rename({ suffix: '.min' }))
    .pipe(dest('dist/css'));
}

function concatJS() {
  return src('src/js/*.js')
    .pipe($.concat('build.js'))
    .pipe(
      $.rename({
        suffix: '.min',
      }),
    )
    .pipe(
      $.babel({
        presets: ['env'],
        plugins: ['@babel/plugin-proposal-object-rest-spread'],
      }),
    )
    .pipe($.uglify())
    .pipe(dest('dist/js'))
    .pipe($.livereload())
    .pipe($.connect.reload());
}

function compressHtml() {
  return src('src/*.html')
    .pipe($.htmlmin({ collapseWhitespace: true }))
    .pipe(dest('dist/'));
}

function watcher() {
  $.livereload.listen();
  watch('src/js/*.js', concatJS);
}

/* 热更新 */
function server() {
  $.connect.server({
    root: 'dist/',
    livereload: true,
    port: 3000,
  });

  watch('src/js/*.js', concatJS);

  $.open('http://localhost:3000');
}

exports.watcher = watcher;
exports.server = server;
exports.default = parallel(
  series(compileCss, concatCss),
  concatJS,
  compressHtml,
);
