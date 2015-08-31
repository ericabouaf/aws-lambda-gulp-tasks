
var gulp = require('gulp'),
    zip = require('gulp-zip'),
    del = require('del'),
    install = require('gulp-install'),
    awsLambda = require('node-aws-lambda'),
    path = require('path');

module.exports = function(gulp) {

  gulp.task('clean', function(cb) {
    return del(['./dist', './dist.zip'], cb);
  });

  gulp.task('js', function() {
    return gulp.src('index.js')
      .pipe(gulp.dest('dist/'));
  });

  gulp.task('node-mods', function() {
    return gulp.src('./package.json')
      .pipe(gulp.dest('dist/'))
      .pipe(install({production: true}));
  });

  gulp.task('zip', function() {
    return gulp.src(['dist/**/*', '!dist/package.json'])
      .pipe(zip('dist.zip'))
      .pipe(gulp.dest('./'));
  });

  gulp.task('upload', function(callback) {
    awsLambda.deploy('./dist.zip', require( path.join(process.cwd(), "lambda-config.js") ), callback);
  });

};
