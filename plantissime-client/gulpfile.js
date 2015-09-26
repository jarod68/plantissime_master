var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var del = require('del');

var paths = {
  scripts: ['js/**/*.js'],
};

gulp.task('clean', function(cb) {
  // You can use multiple globbing patterns as you would with `gulp.src`
  del(['build'], cb);
});

gulp.task('build', ['clean'], function() {
  return gulp.src(paths.scripts)
    //.pipe(uglify())
    .pipe(concat('plantissime.min.js'))
    .pipe(gulp.dest('build'));
});

gulp.task('default', ['build']);