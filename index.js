'use strict';

var pt      = require('path');
var through = require('through2');
var File    = require('vinyl');

/**
 * @param {Object}   [options]
 * @param {Function} [options.fileName]
 * @param {Function} [options.globalVariable]
 * @param {Function} [options.nameFunction]
 */
module.exports = function templateCache(options) {
    options = options || {};

    options.fileName = options.fileName || 'templates.js';
    options.globalVariable = options.globalVariable || 'templateCache';
    options.nameFunction = options.nameFunction || nameFunction_default;

    var js = '(function() {\n';
    js += '    window[ ' + options.globalVariable + ' ] = {};\n';

    return through.obj(
        function transform(file, e, done) {
            if (file.isBuffer()) {
                js += '    ' + convertHtml(file.contents.toString(), file.relative, options);
            }
            done(null);
        },
        function flush(done) {
            js += '}());';

            //TODO: window[ options.globalVariable ] = ...;
            this.push(new File({
                path: options.fileName,
                contents: new Buffer(js)
            }));
            done(null);
        }
    );
}

function nameFunction_default(templatePath) {
    return templatePath;
}

function convertHtml(view, path, options) {
    var wrapped = "'" + view.replace(/'/g, "\\'").replace(/\n/g, '\\n') + "'";
    return 'window[ ' + options.globalVariable + ' ][ \'' +
        options.nameFunction(path).replace(/'/g, "\\'") + '\' ] = ' + wrapped + ';\n';
}
