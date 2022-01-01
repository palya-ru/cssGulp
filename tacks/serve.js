const {watch,series} = require('gulp');
const {DIST,SRC} = require('./../gulp.config');
const browserSync = require('browser-sync');

function serve(){
    const copyHtml = require('./copyHtml.js')
    const styles = require('./style.js');
    browserSync.init({
        server: {
            baseDir: DIST,
            serveStaticOptions: {
                extensions: ["html"]
            }
        }
    });
    watch(`${SRC}/*.html`, series(copyHtml));
    //watch(`${SRC}/img/**/*.*`, series("copy:img"));
    watch(`${SRC}/styles/**/*.scss`, series(styles));
    //watch("./src/img/icons/!*.svg", series("icons"));
}

module.exports = serve;