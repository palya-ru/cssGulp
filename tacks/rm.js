const {src} = require('gulp');
const rm = require('gulp-rm');
const {DIST} = require('./../gulp.config');
function cls(){
    return src(`${DIST}/**/*`, {read: false}).pipe(rm());
}

module.exports = cls;