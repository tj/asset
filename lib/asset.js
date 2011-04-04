
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
    installer.install(asset);
  });
  return installer;
};