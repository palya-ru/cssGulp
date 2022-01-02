const {src,dest} = require('gulp');
const rm = require('gulp-rm');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const sassGlob = require('gulp-sass-glob');
const sourcemaps = require('gulp-sourcemaps');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync');
const gulpIf = require('gulp-if');

const {SRC, DIST, NORMALISE} = require('./../gulp.config');
const env = process.env.NODE_ENV;

function styles(){
    return src([/*...NORMALISE,*/`${SRC}/styles/main.scss`])
        .pipe(gulpIf(env === 'dev', sourcemaps.init()))
        .pipe(concat('main.css'))
        .pipe(sassGlob())
        .pipe(sass().on('error', sass.logError))
        .pipe(gulpIf(env === 'prod', cleanCSS()))
        .pipe(gulpIf(env === 'dev', sourcemaps.write('.')))
        .pipe(dest(`${DIST}/styles`))
        .pipe(browserSync.stream());
}
module.exports = styles;