const gulp = require('gulp');
const jade = require('gulp-jade');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const babel = require('gulp-babel');

//gulp-jade
gulp.task('jade', function () {
    // var YOUR_LOCALS = {};

    return gulp.src('./source/**/*.jade')
        .pipe(plumber())
        .pipe(jade({
            // locals: YOUR_LOCALS
            // jade: jade,
            pretty: true
        }))
        .pipe(gulp.dest('./public/'))
});

//gulp-sass
gulp.task('sass', function () {
    return gulp.src('./source/scss/**/*.scss')
        .pipe(plumber())
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/css'));
});

//watch
gulp.task('watch', function () {
    gulp.watch('./source/**/*.jade', gulp.series('jade'));
    gulp.watch('./source/scss/**/*.scss', gulp.series('sass'));
    gulp.watch('./source/js/**/*.js', gulp.series('babel'));
});

//gulp-babel
gulp.task('babel', () =>
    gulp.src('source/js/**/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest('./public/js'))
);

// default
gulp.task('default', gulp.series('jade', 'sass', 'babel', 'watch'))

