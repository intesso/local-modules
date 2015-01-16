var assert = require('assert');
var libs = require('./index.js');

assert.doesNotThrow(function () {
    libs.appDirectory = __dirname + '/';
    libs('lib', 'components');
    require('test');
    require('lib-test');
    require('plugins/cache');
    require('plugins/cache/lru');
    require('components-test');
}, 'could not require the required libraries with an absolute path.');

console.log('test completed sucessfully');
