'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();

const compileStyles = () => {
  const options = {
    outputStyle: 'compressed',
  };

  return gulp
    .src('./src/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass(options).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());
};

const serve = () => {
  browserSync.init({
    server: { baseDir: './' },
  });
  gulp.watch('./src/scss/**/*.scss', compileStyles);
  gulp.watch('./*.html').on('change', browserSync.reload);
};

exports.serve = serve;
