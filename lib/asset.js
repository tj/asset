
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
 * Install `assets` with `repo` object.
 *
 * @param {Array} assets
 * @param {Object} repo
 * @return {Installer}
 * @api public
 */

exports.install = function(assets, repo){
  var installer = new Installer(repo);
  assets.forEach(function(asset){
    installer.install(asset);
  });
  return installer;
};