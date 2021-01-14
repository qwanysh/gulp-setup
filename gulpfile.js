'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
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

const compileScripts = () => {
  return gulp
    .src('./src/js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(concat('bundle.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/js'));
};

const build = gulp.parallel(compileStyles, compileScripts);

const serve = () => {
  build();

  browserSync.init({ server: { baseDir: './' } });
  gulp.watch('./src/scss/**/*.scss', compileStyles);
  gulp.watch('./*.html').on('change', browserSync.reload);
  gulp
    .watch('./src/js/**/*.js', compileScripts)
    .on('change', browserSync.reload);
};

exports.serve = serve;
exports.build = build;
