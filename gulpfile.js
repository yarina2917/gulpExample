const gulp = require('gulp');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();

function defaultTask(done) {
    console.log('Default task');
    done();
}

function printHello(done) {
    console.log('Hello');
    done();
}

function copy(done) {
    gulp.src('./src/scss/styles.scss')
        // .pipe(rename({suffix: '.min'}))
        .pipe(rename('main.scss'))
        .pipe(gulp.dest('./src/css'));
    done();
}

function cssStyle(done) {
    gulp.src('./src/scss/**/*.scss')
        // .pipe(sourcemaps.init())
        .pipe(sass())
        // .pipe(sass({
        //     errorLogToConsole: true,
        //     outputStyle: 'compressed'
        //  }))
        // .on('error', console.error.bind(console))
        // .pipe(postcss([ autoprefixer() ]))
        // .pipe(autoprefixer({cascade: false}))
        .pipe(rename({suffix: '.min'}))
        // .pipe(sourcemaps.write())
        .pipe(gulp.dest('./src/css'));
    done();
}

function watchScss() {
    gulp.watch('./src/scss/**/*', cssStyle);
    // gulp.watch('./src/js/**/*', jsTask);
}

function sync(done) {
    browserSync.init({
        server: {
            baseDir: './'
        },
        port: 3000
    });
    done();
}

// dependencies

// npm install --save-dev gulp-rename
// npm install --save-dev gulp-sass
// npm install --save-dev gulp-autoprefixer
// npm install --save-dev gulp-sourcemaps
// npm install --save-dev browser-sync

// Gulp version < 4

// gulp.task('default', defaultTask);
// gulp.task(printHello);

// Gulp version 4

// exports.default = defaultTask;
// exports.default = gulp.series(printHello,cssStyle);
exports.default = gulp.series(printHello, watchScss);
exports.printHello = printHello;
exports.copy = copy;
exports.cssStyle = cssStyle;
exports.sync = sync;

