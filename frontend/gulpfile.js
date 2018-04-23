
const gulp = require('gulp')
const sass = require('gulp-sass')
const runSequence = require('run-sequence')
const plumber = require('gulp-plumber')
const browserify = require('browserify')
const cleanCSS = require('gulp-clean-css')
const source = require('vinyl-source-stream')
const buffer = require('vinyl-buffer')
const livereload = require('gulp-livereload')
const ngHtml2Js = require('browserify-ng-html2js')

// Build CSS
gulp.task('styles', function() {

    gulp.src('./critical.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest('./dest'))
        .pipe(livereload())

    return gulp.src('./app.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest('./dest'))
        .pipe(livereload())

})

// Build HTML
gulp.task('html', function() {
    return gulp.src('./index.html')
        .pipe(plumber())
        .pipe(gulp.dest('./dest'))
        .pipe(livereload())
})


// Builds the two JavaScript output files app.js and embed.js according to the current NODE_ENV
gulp.task('scripts', function() {
    return browserify('./index.js')
        .transform('babelify', {presets: ['es2015']})
        .transform(ngHtml2Js())
        .bundle()
        .pipe(source('index.js'))
        .pipe(buffer())
        .pipe(gulp.dest('./dest'))
        .pipe(livereload())
})

gulp.task('images', function() {
    return gulp.src('./icons/**/*')
        .pipe(gulp.dest('./dest/icons'))
})

// Runs all tasks according to the current NODE_ENV (development or production) for the selected apps
gulp.task('default', function() {

    runSequence(['styles', 'scripts', 'html', 'images'])

})


// Watches all project files (of the selected apps) and recompiles / retranspiles them on changes.
// Livereload is active if there is no parameter "--reload=false"
gulp.task('watch', function() {

    gulp.start('default')

    livereload.listen()

    gulp.watch(['./**/*.js', '!./dest/**/*'],    ['scripts'])
    gulp.watch(['./**/*.html', '!./dest/**/*'],  ['scripts'])
    gulp.watch(['./**/*.scss', '!./dest/**/*'],  ['styles'])
    gulp.watch(['./index.html', '!./dest/**/*'], ['html'])

})
