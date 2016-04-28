'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');

var config = {
  BOOTSTRAP: 'src/bower_components/bootstrap-sass/assets/stylesheets',
  SRC_SASS: 'src/sass/**/*.scss',
  STYLES_OUTPUT: 'client/css'
}

gulp.task('css', function() {
  gulp.src('config.SRC_SASS')
      .pipe(plumber())
      .pipe(sass({
        includePaths: [config.BOOTSTRAP]
      }))
      .pipe(gulp.dest(config.STYLES_OUTPUT));
});

gulp.task('watch', function() {
  gulp.watch(config.SRC_SASS, ['css']);
});

gulp.task('default', ['css']);
