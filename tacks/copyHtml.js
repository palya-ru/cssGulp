const path = require('path')
const {src,dest} = require('gulp');
const browserSync = require('browser-sync');
const fileinclude = require('gulp-file-include');
const {DIST,SRC} = require('./../gulp.config');

function copyHtml(){
    return src(`${SRC}/*.html`)
        .pipe(fileinclude())
        .pipe(dest(DIST))
        .pipe(browserSync.stream());
}

module.exports = copyHtml;