
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
 * Cache.
 */

var cache = {};

/**
 * Mkdir -p.
 *
 * @param {String} path
 * @param {Function} fn
 */

exports.mkdir = function(path, fn) {
  if (path == '.' || cache[path]) return fn();
  exec('mkdir -p ' + path, function(err){
    cache[path] = true;
    fn(err);
  });
};