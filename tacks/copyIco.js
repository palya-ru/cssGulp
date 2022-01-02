const {src,dest} = require('gulp');
const {SRC, DIST} = require('./../gulp.config.js');

function copyIco(){
    return src(`${SRC}/favicon.ico`)
        .pipe(dest(DIST))
}
module.exports = copyIco;