
/*!
 * asset - utils
 * Copyright (c) 2010 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var exec = require('child_process').exec;

/**
 * Mkdir -p.
 *
 * @param {String} path
 * @param {Function} fn
 */

exports.mkdir = function(path, fn) {
 exec('mkdir -p ' + path, fn);
};