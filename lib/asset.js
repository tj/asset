
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

exports.version = '0.0.1';

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

exports.search = function(repo, query, fn){
  var names = Object.keys(repo)
    , len = names.length
    , entry
    , name;

  for (var i = 0; i < len; ++i) {
    name = names[i]
    entry = repo[name];
    if (query && !~name.indexOf(query)) continue;
    fn(name, entry);
  }
};