(() => {
  'use strict';

  const gulp = require('gulp');
  const stylus = require('gulp-stylus');
  const pug = require('gulp-pug');
  // const rename = require('gulp-rename');
  // const debug = require('gulp-debug');

  const watch = require('gulp-watch');

  const plumber = require('gulp-plumber');

  const { log, colors } = require('gulp-util');

  const plumberfy = () =>
    plumber({
      errorHandler: function (error) {
        log(
          colors.cyan('Plumber') + colors.red(' found unhandled error:\n'),
          error.toString()
        );
        this.emit('end');
      }
    })

  const path = require('path');

  const base = __dirname;

  const stylFiles = 'task*/**/*.styl';
  const pugFiles = 'task*/**/*.pug';

  const taskFactory = (path, ext, transform) =>
    () =>
      gulp.src(path)
        .pipe(plumberfy())
        .pipe(transform())
        // .pipe(debug(ext))
        // .pipe(rename(
        //   path => {
        //     path.extname = ext;
        //   }
        // ))
        .pipe(gulp.dest(file => file.base))

  const taskStyl = taskFactory(stylFiles, '.css', stylus);
  const taskPug = taskFactory(pugFiles, '.html', pug);

  gulp.task('styl', taskStyl);
  gulp.task('pug', taskPug);

  gulp.task('watch', ['styl', 'pug'], cb => {
    watch(stylFiles, { cwd: './', verbose: true }, taskStyl);
    watch(pugFiles, { cwd: './', verbose: true }, taskPug);
    setTimeout(cb, 1);
  });

  gulp.task('default', ['styl', 'pug'], cb => setTimeout(cb, 1));

})();
