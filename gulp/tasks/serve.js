var gulp         = require('gulp');
var browsersync  = require('browser-sync');


gulp.task('serve', ['build'], function() {
  browsersync.init({
    server: {
      baseDir: './build'
    },
    notify: false,
    open: false
  });
});