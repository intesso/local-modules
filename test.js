var assert = require('assert');
var libs = require('./index.js');

assert.doesNotThrow(function () {
    libs.appDirectory = __dirname + '/';
    libs('lib', 'components');
    require('lib-test');
    require('components-test');
}, 'could not require the required libraries with an absolute path.');
