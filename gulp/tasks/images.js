var gulp        = require('gulp');
var changed     = require('gulp-changed');
var imagemin    = require('gulp-imagemin');
var browsersync = require('browser-sync');

// Images
gulp.task('images', function() {
  return gulp.src('src/img/*.*')
    .pipe(changed('build/img')) // Ignore unchanged files
    .pipe(imagemin({ progressive: true })) // Optimize
    .pipe(gulp.dest('build/img'))
    .pipe(browsersync.reload({stream:true}));
});
