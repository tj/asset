
/*!
 * asset
 * Copyright(c) 2011 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var Installer = require('./installer'),
   hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * Library version.
 */

exports.version = '0.0.2';

/**
 * Install `assets` with `repo` object, and `dest` directory.
 *
 * @param {Array} assets
 * @param {Object} repo
 * @param {String} dest
 * @return {Installer}
 * @api public
 */

exports.install = function(assets, repo, dest){
  var installer = new Installer(repo, dest)
    , index = 0
    , length = assets.length;

  process.nextTick(function next(error) {
    if (error) {
      throw error;
    } else if (index != length) {
      if (index in assets) {
        installer.install(assets[index]);
      } else {
        index++;
        next();
      }
    }
  });
  return installer;
};

/**
 * Search `repo` for `query`, invoking `fn(name, entry)`
 * per matching entry.
 *
 * @param {Object} repo
 * @param {String} query
 * @param {Function} fn
 * @api public
 */

exports.search = function(repo, query, fn){
  var name
    , entry;

  for (name in repo) {
    if (!hasOwnProperty.call(repo, name) || (query && name.indexOf(query) < 0)) continue;
    fn(name, entry);
  }
};