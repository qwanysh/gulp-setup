'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const del = require('del');
const server = require('browser-sync').create();

const paths = {
  styles: {
    src: 'src/scss/**/*.scss',
    dest: 'dist/css',
  },
  scripts: {
    src: 'src/js/**/*.js',
    dest: 'dist/js',
  },
};

const clean = () => del(['dist']);

const compileStyles = () => {
  return gulp
    .src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(autoprefixer({ cascade: false }))
    .pipe(sourcemaps.write())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(server.stream());
};

const compileScripts = () => {
  return gulp
    .src(paths.scripts.src)
    .pipe(babel({ presets: ['@babel/preset-env'] }))
    .pipe(sourcemaps.init())
    .pipe(concat('bundle.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.scripts.dest));
};

const build = gulp.series(clean, compileStyles, compileScripts);

const serve = () => {
  build();

  server.init({ server: { baseDir: './' } });
  gulp.watch('./src/scss/**/*.scss', compileStyles);
  gulp.watch('./*.html').on('change', server.reload);
  gulp.watch('./src/js/**/*.js', compileScripts).on('change', server.reload);
};

exports.serve = serve;
exports.build = build;
