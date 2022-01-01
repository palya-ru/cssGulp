const { series,parallel } = require('gulp');
const styles = require('./tacks/style.js');
const cls = require('./tacks/rm.js');
const copyHtml = require('./tacks/copyHtml.js')
const serve = require('./tacks/serve.js');

exports.styles = styles;
exports.copyHtml = copyHtml;
exports.cls = cls;
exports.serve = serve;
exports.default = parallel(serve,styles,copyHtml);
exports.build = series(cls, parallel(styles,copyHtml))