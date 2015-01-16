/**
 * Sets the NODE_PATH to the required local directories, e.g. 'lib'.
 * This module lets you define directories that are treated like the 'node_modules' directory,
 * where you can require modules without the need for relative require paths.
 *
 * Note: this is a hack, since it uses private node function.
 * Tested with: node 0.8, 0.10, 0.11
 *
 * @param args {Array|string}
 * @returns {*|String|string}
 */
module.exports = exports = function (args) {

    // make arguments array
    if (!(args instanceof Array)) args = Array.prototype.slice.call(arguments);

    // resolve the paths
    var path = require('path');
    var delimiter = (path.delimiter) ? path.delimiter : ':';
    var libs = args.map(function (arg) {
        return path.resolve(exports.appDirectory + arg);
    });

    // hacky: include the required NODE_PATHs.
    var p = libs.join(delimiter);
    process.env['NODE_PATH'] = p;
    require('module').Module._initPaths();
    return process.env.NODE_PATH;

}

/**
 * application directory.
 * @type {string}
 */
exports.appDirectory = __dirname + '/../../';