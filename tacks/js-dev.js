const {src, dest} = require('gulp');
const webpack = require("webpack-stream");
const browserSync = require("browser-sync");
const {DIST,SRC} = require('./../gulp.config');


function devJs(){
    return src(`${SRC}/js/main.js`)
        .pipe(webpack({
            mode: 'development',
            output: {
                filename: 'script.js'
            },
            watch: false,
            devtool: "source-map",
            module: {
                rules: [
                    {
                        test: /\.m?js$/,
                        exclude: /(node_modules|bower_components)/,
                        use: {
                            loader: 'babel-loader',
                            options: {
                                presets: [['@babel/preset-env', {
                                    debug: true,
                                    corejs: 3,
                                    useBuiltIns: "usage"
                                }]]
                            }
                        }
                    }
                ]
            }
        }))
        .pipe(dest(`${DIST}/js`))
        .pipe(browserSync.stream());
}

module.exports = devJs;