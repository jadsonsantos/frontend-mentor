const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const pug = require('gulp-pug');


function builHtml() {
    return gulp.src('./src/views/*.pug')
        .pipe(pug({
            doctype: 'html',
            pretty: true
        }))
        .pipe(gulp.dest('./'))
}

gulp.task('pug', builHtml);

function compilaSass() {
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(gulp.dest('./css/'))
        .pipe(browserSync.stream())
}

gulp.task('sass', compilaSass);

function gulpJs() {
    return gulp.src('src/js/*.js')
        .pipe(gulp.dest('./dist/js/'))
        .pipe(browserSync.stream())
}

gulp.task('gulpJs', gulpJs);

gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('watch', function () {
    gulp.watch('./src/scss/**/*.scss', compilaSass);
    gulp.watch('./src/views/**/*.pug', builHtml);
    gulp.watch(['*.html']).on('change', browserSync.reload);
    gulp.watch('./src/js/**/*.js', gulpJs);
});

gulp.task('default', gulp.parallel('watch', 'browserSync', 'gulpJs'));