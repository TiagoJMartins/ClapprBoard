'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var util = require('gulp-util');
var debug = require('gulp-debug');
var csso = require('gulp-csso');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var templateChache = require('gulp-angular-templatecache');

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
      .pipe(csso())
      .pipe(gulp.dest(config.STYLES_OUTPUT)).on('error', util.log);
});

gulp.task('compress', function() {
  gulp.src(['client/vendor/angular.min.js',
            'client/vendor/*.js',
            'client/app/app.js',
            'client/js/*.js',
            'client/app/services/*.js',
            'client/app/controllers/*.js',
            'client/app/filters/*.js',
            'client/app/directives/*.js'
          ])
            .pipe(plumber())
            .pipe(concat('bundle.min.js'))
            //.pipe(uglify())
            .pipe(gulp.dest('client'));
});

gulp.task('templates', function() {
  gulp.src('client/app/views/**/*.html')
      .pipe(plumber())
      .pipe(templateChache({root: 'views', module: 'MainApp'}))
      .pipe(gulp.dest('client'));
});

gulp.task('watch', function() {
  gulp.watch(config.SRC_SASS, ['css']);
  gulp.watch('client/app/views/**/*.html', ['templates']);
  gulp.watch(['client/**/*.js', '!client/bundle.min.js', '!client/templates.js', '!client/vendor'], ['compress']);
});

gulp.task('default', ['css', 'compress', 'watch']);
