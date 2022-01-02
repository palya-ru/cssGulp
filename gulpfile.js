const { series,parallel } = require('gulp');
const styles = require('./tacks/style.js');
const cls = require('./tacks/rm.js');
const copyHtml = require('./tacks/copyHtml.js')
const serve = require('./tacks/serve.js');
const devJs = require('./tacks/js-dev.js');
const prodJs = require('./tacks/js-prod.js');
const copyIco = require('./tacks/copyIco.js');

exports.styles = styles;
exports.copyHtml = copyHtml;
exports.cls = cls;
exports.serve = serve;
exports.devJs = devJs;
exports.prodJs = prodJs;
exports.copyIco =  copyIco;
exports.default = parallel(serve,styles,copyHtml,devJs,copyIco);
exports.build = series(cls, parallel(styles,copyHtml,prodJs));