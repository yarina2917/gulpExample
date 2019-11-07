const gulp = require('gulp');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();

const files = {
    jsPath: './src/js/**/*.js',
    jsOutput: './build/js',
    cssPath: './src/scss/**/*.scss',
    cssOutput: './build/css'
};

function defaultTask(done) {
    console.log('Default task');
    done();
}

function printHello(done) {
    console.log('Hello');
    done();
}

function copy() {
    return gulp.src('./src/img/1.jpg')
        .pipe(rename('2.jpg'))
        .pipe(gulp.dest('./src/img'));
}

// styles

function cssTask() {
    return gulp.src(files.cssPath)
        // .pipe(sourcemaps.init())
        .pipe(sass())
        // .pipe(sass({outputStyle: 'compressed'})
        // .on('error', sass.logError))
        // .pipe(autoprefixer({cascade: false}))
        .pipe(rename({suffix: '.min'}))
        // .pipe(sourcemaps.write())
        .pipe(gulp.dest(files.cssOutput))
        // .pipe(browserSync.stream())
}

// JS

function jsTask(){
    return gulp.src(files.jsPath)
        .pipe(concat('all.js'))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest(files.jsOutput))
        // .pipe(browserSync.stream())
}

// watch

function watchTask() {
    gulp.watch([files.cssPath, files.jsPath], gulp.parallel(cssTask, jsTask));
}

function sync() {
    return browserSync.init({
        server: {
            baseDir: './'
        },
        port: 3000
    });
}

// dependencies

// npm install --save-dev gulp-rename
// npm install --save-dev gulp-sass
// npm install --save-dev gulp-autoprefixer
// npm install --save-dev gulp-sourcemaps
// npm install --save-dev gulp-concat
// npm install --save-dev gulp-uglify
// npm install --save-dev browser-sync
// npm install --save-dev gulp-babel @babel/core @babel/preset-env

// Gulp version < 4

// gulp.task('default', defaultTask);
// gulp.task(printHello);

// Gulp version 4

// exports.default = defaultTask;
exports.printHello = printHello;

// exports.default = gulp.series(printHello, cssStyle);
exports.default = gulp.parallel(watchTask, sync);
exports.copy = copy;
exports.cssTask = cssTask;
exports.jsTask = jsTask;
exports.sync = sync;

