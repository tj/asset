
/*!
 * asset
 * Copyright(c) 2011 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var Installer = require('./installer');

/**
 * Library version.
 */

exports.version = '0.4.13';

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
  var installer = new Installer(repo, dest);
  assets.forEach(function(asset){
    process.nextTick(function(){
      installer.install(asset);
    });
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
  var names = Object.keys(repo);
  names.forEach(function(name){
    var entry = repo[name]
      , match = !query
        || ~name.indexOf(query)
        || ~entry.tags.indexOf(query);
    if (match) fn(name, entry);
  });
};