
/*!
 * asset - Installer
 * Copyright(c) 2011 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var EventEmitter = require('events').EventEmitter
  , fs = require('fs');

/**
 * Expose installer.
 */

module.exports = Installer;

/**
 * Initialize a new `Installer`.
 *
 * @param {Object} repo
 * @api private
 */

function Installer(repo) {
  this.assets = [];
  this.repo = repo;
  if (!repo) throw new Error('repository required');
  console.log(repo);
}

/**
 * Inherit from `EventEmitter.prototype`.
 */

Installer.prototype.__proto__ = EventEmitter.prototype;

/**
 * Install the given `asset`.
 *
 * @param {Object} asset
 * @api private 
 */

Installer.prototype.install = function(asset){
  if (!asset.name) throw new Error('asset name required');
};
