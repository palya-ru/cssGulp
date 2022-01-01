const {src,dest} = require('gulp');
const browserSync = require('browser-sync');
const {DIST,SRC} = require('./../gulp.config');

function copyHtml(){
    return src(`${SRC}/*.html`)
        .pipe(dest(DIST))
        .pipe(browserSync.stream());
}

module.exports = copyHtml;