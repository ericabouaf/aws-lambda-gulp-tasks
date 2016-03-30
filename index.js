
var gulp = require('gulp'),
    zip = require('gulp-zip'),
    del = require('del'),
    install = require('gulp-install'),
    awsLambda = require('node-aws-lambda'),
    path = require('path'),
    replace = require('gulp-replace'),
    gulpif = require('gulp-if');

module.exports = function(gulp, options) {

  gulp.task('clean', function(cb) {
    return del(['./dist', './dist.zip'], cb);
  });

  gulp.task('js', function() {
    return gulp.src('index.js')
      .pipe(gulp.dest('dist/'));
  });

  gulp.task('node-mods', function() {
    return gulp.src('./package.json')
      .pipe(gulpif(options && options.fixRelativePackages, replace(/file:\.\.([\\/]+)/g, 'file:..$1..$1')))
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
