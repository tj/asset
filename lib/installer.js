
/*!
 * asset - Installer
 * Copyright(c) 2011 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var EventEmitter = require('events').EventEmitter
  , basename = require('path').basename
  , http = require('http')
  , https = require('https')
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

function Installer(repo, dest) {
  this.assets = [];
  this.repo = repo;
  this.dest = dest;
  if (!repo) throw new Error('repository required');
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
  var entry = this.repo[asset.name];
  if (!entry) return this.emit('unknown', asset);
  asset.entry = entry;
  entry.filename = entry.filename || basename(entry.url);
  this.emit('start', asset);
  this.download(asset, this.dest + '/' + entry.filename);
};

/**
 * Download the given `asset` to `path`.
 *
 * @param {Object} asset
 * @param {String} path
 */

Installer.prototype.download = function(asset, path){
  
};

