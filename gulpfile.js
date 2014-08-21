'use strict';

var jshint = require('gulp-jshint'),
  gulp = require('gulp'),
  gutil = require('gulp-util'),
  stylish = require('jshint-stylish'),
  nodemon = require('gulp-nodemon');


gulp.task('lint', function () {
  gulp.src(['app/**/*.js', 'server.js'])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter(stylish));
});

gulp.task('serve', function () {
  nodemon({
    script: 'server.js',
    ext: 'js',
    ignore: ['test/**/*.js'],
    execMap: {
      'js': 'node --harmony'
    }
  })
  .on('change', ['lint'])
  .on('restart', function () {
    console.log('restarted!');
  });
});

gulp.task('default', ['lint']);
