var gulp        = require('gulp');
var jade        = require('gulp-jade');
var browsersync = require('browser-sync');

gulp.task('markup', function() {
  return gulp.src(['./src/*.jade', '!./src/partials/**'])
    .pipe(jade({ pretty: true }))
    .pipe(gulp.dest('./build'))
    .pipe(browsersync.reload({stream:true}));
});