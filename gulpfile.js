const gulp = require('gulp'),
map = require('map-stream'),
compass = require( 'gulp-for-compass' ),
browserSync = require('browser-sync'),
reload = browserSync.reload,
uglyfly = require('gulp-uglyfly'),
cleanCSS = require('gulp-clean-css'),
jshint = require('gulp-jshint');

gulp.task('compass', function(){
	gulp.src('sass/*.scss')
	.pipe(compass({
		sassDir: 'sass/',
		cssDir: 'css/',
		}))
	.pipe(gulp.dest('css/'));
	})


gulp.task('serve', function() {
  browserSync({
    server: {
      baseDir: 'app'
    }
    });

  gulp.watch(['*.html', 'styles/**/*.css', 'scripts/**/*.js'], {cwd: 'app'}, reload);
  });

gulp.task('compress-js', function() {
  gulp.src('app/*.js')
  .pipe(uglyfly())
  .pipe(gulp.dest('dist'))
  });


gulp.task('minify-css', function() {
  return gulp.src('css/*.css')
  .pipe(cleanCSS({compatibility: 'ie8'}))
  .pipe(gulp.dest('dist'));
  });


const myReporter = map(function (file, cb) {
  if (file.jshint.success) {
    return cb(null, file);
  }

  console.log('JSHINT fail in', file.path);
  file.jshint.results.forEach(function (result) {
    if (!result.error) {
      return;
    }

    const err = result.error
    console.log(`  line ${err.line}, col ${err.character}, code ${err.code}, ${err.reason}`);
    });

  cb(null, file);
  });

gulp.task('lint', function() {
  return gulp.src('app/*.js')
  .pipe(jshint())
  .pipe(myReporter);
  });

gulp.task('watch', function(){
  gulp.watch('sass/*.scss', ['compass']);
  })

gulp.task('default', function() {
  // place code for your default task here
  });