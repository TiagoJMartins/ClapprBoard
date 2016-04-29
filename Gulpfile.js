'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var util = require('gulp-util');
var debug = require('gulp-debug');

var config = {
  BOOTSTRAP: './src/bower_components/bootstrap-sass/assets/stylesheets/',
  SRC_SASS: './src/sass/**/*.scss',
  STYLES_OUTPUT: './client/css'
};

var sassOpts = {
        includePaths: [config.BOOTSTRAP]
};

gulp.task('css', function() {
  gulp.src(config.SRC_SASS)
      .pipe(debug({title: 'Files:', minimal: false}))
      .pipe(plumber())
      .pipe(sass(sassOpts))
      .pipe(gulp.dest(config.STYLES_OUTPUT)).on('error', util.log);
});

gulp.task('watch', function() {
  gulp.watch(config.SRC_SASS, ['css']);
});

gulp.task('default', ['css']);
