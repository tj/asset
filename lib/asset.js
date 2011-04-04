
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
 * Install `assets`.
 *
 * @param {Array} assets
 * @return {Installer}
 * @api public
 */

exports.install = function(assets){
  var installer = new Installer;
  assets.forEach(function(asset){
    installer.install(asset);
  });
  return installer;
};