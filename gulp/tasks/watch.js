var gulp        = require('gulp');
var browsersync = require('browser-sync');

gulp.task('jade:watch', ['markup'], browsersync.reload);

gulp.task('watch', ['serve'], function() {

  gulp.watch('src/js/*.js',    ['lint', 'scripts']);
  gulp.watch('src/css/*.styl', ['css']);
  gulp.watch('src/img/*.*',    ['images']);
  gulp.watch('src/**/*.jade',  ['jade:watch']);

});

