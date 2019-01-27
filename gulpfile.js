const gulp = require('gulp'),
  sass = require('gulp-sass'),
  livereload = require('gulp-livereload'),
  babel = require('gulp-babel');


  gulp.task('html', function() {
    return gulp.src('*.html')
      .pipe(livereload());
  });

gulp.task('sass', function () {
  return gulp.src('css/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('css'))
    .pipe(livereload());
});

gulp.task('js', function() {
  return gulp.src('js/src/scripts.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe( gulp.dest('js') )
    .pipe(livereload())
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('css/styles.scss', gulp.series('sass'));
  gulp.watch('js/src/*.js', gulp.series('js'));
  gulp.watch('**/*.html', gulp.series('html'));
});

gulp.task('webserver', function() {
  gulp.src(dest)
    .pipe(webserver({
      livereload: true,
      port: 3000,
      open: true
    }));
});

// removed webserver after gulp 4 upgrade - somehow messing with watch/sass compiling?
gulp.task('default', gulp.series('html', 'sass', 'js', 'watch'));