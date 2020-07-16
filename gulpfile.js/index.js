const { src, dest, series, task } = require('gulp');
const less = require('gulp-less');
const path = require('path');
const concat = require('gulp-concat');
const cleanCss = require('gulp-clean-css');
const rename = require('gulp-rename');

function compileCss() {
  return src('/src/less/**/*.less').pipe(less()).pipe(dest('/src/css/'));
}

function concatCss() {
  return src('/src/css/*.css')
    .pipe(concat('build.js'))
    .pipe(
      cleanCss({
        compatibility: 'ie8',
      }),
    )
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest('/dist/css'));
}

exports.default = series(compileCss, concatCss);
