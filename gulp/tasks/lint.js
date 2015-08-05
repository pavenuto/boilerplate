var gulp    = require('gulp');
var jshint  = require('gulp-jshint');
var plumber = require('gulp-plumber');

gulp.task('lint', function() {
    return gulp.src('src/js/*.js')
        .pipe(plumber())
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});