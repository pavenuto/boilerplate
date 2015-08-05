var fs = require('fs');
var onlyScripts = require('./util/scriptFilter');
var tasks = fs.readdirSync('./gulp/tasks/').filter(onlyScripts);

tasks.forEach(function(task) {
  require('./tasks/' + task);
});


// Include gulp & browsersync
var gulp        = require('gulp');
var browsersync = require('browser-sync');


// Include gulp plugins
var jshint      = require('gulp-jshint');
var plumber     = require('gulp-plumber');
var stylus      = require('gulp-stylus');
var nib         = require('nib');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');
var rename      = require('gulp-rename');
var jade        = require('gulp-jade');
var changed     = require('gulp-changed');
var imagemin    = require('gulp-imagemin');


// Lint Task
gulp.task('lint', function() {
    return gulp.src('src/js/*.js')
        .pipe(plumber())
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Sass
gulp.task('css', function() {
   return gulp.src('src/css/*.styl')
      .pipe(plumber())
      .pipe(stylus({ use: [nib()] }))
      .pipe(gulp.dest('build/css'))
      .pipe(browsersync.reload({stream:true}));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
  return gulp.src('src/js/*.js')
    .pipe(plumber())
    .pipe(concat('all.js'))
    .pipe(gulp.dest('build/js'))
    .pipe(rename('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('build/js'))
    .pipe(browsersync.reload({stream:true}));
});

// HTML
gulp.task('markup', function() {
  return gulp.src(['./src/*.jade', '!./src/partials/**'])
    .pipe(jade({ pretty: true }))
    .pipe(gulp.dest('./build'))
    .pipe(browsersync.reload({stream:true}));
});

// Images
gulp.task('images', function() {
  return gulp.src('src/img/*.*')
    .pipe(changed('build/img')) // Ignore unchanged files
    .pipe(imagemin({ progressive: true })) // Optimize
    .pipe(gulp.dest('build/img'))
    .pipe(browsersync.reload({stream:true}));
});

// Server
gulp.task('serve', function() {
  browsersync({
    server: {
      baseDir: './build'
    },
    notify: false,
  });
});

// Watch Files For Changes
gulp.task('watch', ['serve'], function() {

  gulp.watch('src/js/*.js',    ['lint', 'scripts']);
  gulp.watch('src/css/*.styl', ['css']);
  gulp.watch('src/img/*.*',    ['images']);
  gulp.watch('src/**/*.jade',  ['markup']);

});



// Default task
gulp.task('default', ['lint', 'css', 'scripts', 'images','markup', 'serve', 'watch']);