const {src, task, dest, watch, series, parallel} = require('gulp');
const rm = require('gulp-rm');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const sassGlob = require('gulp-sass-glob');
const sourcemaps = require('gulp-sourcemaps');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync');
const imageMin = require('gulp-imagemin');
const svgo = require('gulp-svgo');
const svgSprite = require('gulp-svg-sprite');
const gulpIf = require('gulp-if');


sass.compiler = require('node-sass');

const env = process.env.NODE_ENV;

const {SRC, DIST, NORMALISE} = require('./gulp.config');

task('cls', () => {
    return src(`${DIST}/**/*`, {read: false}).pipe(rm());
});

task('styles', ()=>{
    return src([...NORMALISE,`${SRC}/styles/main.scss`])
        .pipe(gulpIf(env === 'dev', sourcemaps.init()))
        .pipe(concat('main.css'))
        .pipe(sassGlob())
        .pipe(sass().on('error', sass.logError))
        .pipe(gulpIf(env === 'prod', cleanCSS()))
        .pipe(gulpIf(env === 'dev', sourcemaps.write('.')))
        .pipe(dest(`${DIST}/styles`))
        .pipe(browserSync.stream());
});

task('copy:html', () => {
    return src(`${SRC}/*.html`)
        .pipe(dest(DIST))
        .pipe(browserSync.stream());
});

task('copy:img', () => {
    return src(`${SRC}/img/**/*.*`)
        .pipe(imageMin([
            imageMin.gifsicle({interlaced: true}),
            imageMin.mozjpeg({quality: 75, progressive: true}),
            imageMin.optipng({optimizationLevel: 5}),
            imageMin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false},
                    {
                        removeAttrs: {
                            attrs: ('stroke|style|width|height|data.*')
                        }
                        //attrs : ('fill|stroke|style|width|height|data.*')
                    }
                ]
            })
        ]))
        .pipe(dest(`${DIST}/img`))
});

task('icons', () => {
    return src(`${SRC}/img/icons/*.svg`)
        .pipe(svgo({
            plugins: [
                {
                    removeAttrs : {
                        attrs : ('stroke|style|width|height|data.*')
                        //attrs : ('fill|stroke|style|width|height|data.*')
                    }
                }
            ]
        }))
        .pipe(svgSprite({
            mode: {
                symbol : {
                    sprite: '../sprite.svg'
                }
            }
        }))
        .pipe(dest(`${DIST}/img/icons`));
});

task('watch', () => {
    browserSync.init({
        server: {
            baseDir: DIST,
            serveStaticOptions: {
                extensions: ["html"]
            }
        }
    });

    watch(`${SRC}/*.html`, series("copy:html"));
    watch(`${SRC}/img/**/*.*`, series("copy:img"));
    watch(`${SRC}/styles/**/*.scss`, series("styles"));
    //watch("./src/img/icons/*.svg", series("icons"));
});

task("default", parallel("watch", 'copy:html', "styles", "copy:img"));
task('build',
    series(
        'cls',
        parallel('copy:html', "styles", "copy:img"))
);

