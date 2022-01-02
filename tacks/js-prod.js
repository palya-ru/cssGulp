const {src, dest} = require('gulp');
const webpack = require("webpack-stream");
const {DIST,SRC} = require('./../gulp.config');


function prodJs(){
    return src(`${SRC}/js/main.js`)
        .pipe(webpack({
            mode: 'production',
            output: {
                filename: 'script.js'
            },
            module: {
                rules: [
                    {
                        test: /\.m?js$/,
                        exclude: /(node_modules|bower_components)/,
                        use: {
                            loader: 'babel-loader',
                            options: {
                                presets: [['@babel/preset-env', {
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
}
module.exports = prodJs;