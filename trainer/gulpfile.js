var gulp = require('gulp');
var connect = require('gulp-connect');
var PATHS = {
    src: 'src/**/*.ts',
    html: 'src/**/*.html',
    css: 'src/**/*.css'
};

gulp.task('clean', function(done) {
    var del = require('del');
    del(['dist'], done);
});

gulp.task('ts2js', function() {
    var typescript = require('gulp-typescript');
    var sourcemaps = require('gulp-sourcemaps');
    var tsResult = gulp.src(PATHS.src)
        .pipe(sourcemaps.init())
        .pipe(typescript({
            noImplicitAny: true,
            module: 'system',
            target: 'ES5',
            moduleResolution: 'node',
            emitDecoratorMetadata: true,
            experimentalDecorators: true
        }));

    return tsResult.js
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload());
});

gulp.task('play', ['ts2js'], function() {
    var http = require('http');
    var open = require('open');
    var watch = require('gulp-watch');



    var port = 9000,
        app;

    connect.server({
        root: __dirname,
        port: port,
        livereload: true,
        fallback: 'index.html'
    });
    open('http://localhost:' + port + '/index.html');

    gulp.watch(PATHS.src, ['ts2js']);
    watch(PATHS.html).pipe(connect.reload());
    watch(PATHS.css).pipe(connect.reload());
});