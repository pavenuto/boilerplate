var gulp        = require('gulp');
var browsersync = require('browser-sync');
var stylus      = require('gulp-stylus');
var nib         = require('nib');
var plumber     = require('gulp-plumber');

gulp.task('css', function() {
   return gulp.src('src/css/*.styl')
      .pipe(plumber())
      .pipe(stylus({ use: [nib()] }))
      .pipe(gulp.dest('build/css'))
      .pipe(browsersync.reload({stream:true}));
});