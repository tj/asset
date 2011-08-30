
/*!
 * asset - Installer
 * Copyright(c) 2011 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var EventEmitter = require('events').EventEmitter
  , dirname = require('path').dirname
  , basename = require('path').basename
  , extname = require('path').extname
  , mkdir = require('mkdirp').mkdirp
  , request = require('request')
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
  this.queued = {};
}

/**
 * Inherit from `EventEmitter.prototype`.
 */

Installer.prototype.__proto__ = EventEmitter.prototype;

/**
 * Install the given `asset`.
 *
 * Asset:
 *
 *  - `name` name of the asset
 *  - `version` version of the asset
 *
 * @param {Object} asset
 * @api private 
 */

Installer.prototype.install = function(asset){
  var entry = this.lookup(asset);
  if (!entry) return this.emit('unknown', asset);
  asset.entry = entry;
  if (this.queued[asset.name]) return this.emit('queued', asset);
  this.emit('install', asset);
  this.queued[asset.name] = true;
  this.installDependencies(asset);

  // several files
  if (entry.files) {
    this.downloadFiles(asset, entry.files, this.dest);
  } else {
    this.download(asset, this.dest + '/' + entry.filename);
  }
};

/**
 * Lookup and normalize repo entry for `asset`.
 *
 * @param {Object} asset
 * @return {Object}
 * @api private
 */

Installer.prototype.lookup = function(asset){
  // invalid or not found
  if (!asset.name) throw new Error('asset name required');
  var entry = this.repo[asset.name];
  if (!entry) return;

  // normalize filename
  entry.filename = entry.filename || basename(entry.url);

  // normalize compressed url
  if (entry.compressed && !~entry.compressed.indexOf('://')) {
    entry.compressed = entry.url.replace(basename(entry.url), entry.compressed);
  }

  // default version
  if (!asset.version) asset.version = entry.version;

  // extension
  entry.ext = extname(entry.url);

  return entry;
};

/**
 * Install the given `asset` dependencies when present.
 *
 * @param {Object} asset
 * @api private
 */

Installer.prototype.installDependencies = function(asset){
  var version;
  for (var dep in asset.entry.dependencies) {
    version = asset.entry.dependencies[dep];
    dep = { name: dep, version: version };
    this.emit('dependency', asset, dep);
    this.install(dep);
  }
};

/**
 * Download the given `files` to `dest`.
 *
 * @param {Object} asset
 * @param {Array} files
 * @param {String} dest
 * @api private
 */

Installer.prototype.downloadFiles = function(asset, files, dest){
  var pending = files.length
   , self = this;

  files.forEach(function(file){
    self.downloadFile(asset, file, dest, function(err){
      if (err) return self.emit('error', err);
      --pending || self.emit('complete files', asset, files);
    });
  });
};

/**
 * Download the given `asset`'s `file` to `dest`.
 *
 * @param {Object} asset
 * @param {String} file
 * @param {String} dest
 * @param {Function} fn
 * @api private
 */

Installer.prototype.downloadFile = function(asset, file, dest, fn){
  var base = asset.entry.base.replace(/\{version\}/g, asset.version)
    , url = base + '/' + file
    , path = dest + '/' + file
    , dest = dest + '/' + dirname(file)
    , self = this;

  request({ url: url }, function(err, res, body){
    if (err) return fn(err);
    if (res.statusCode >= 300) {
      var err = new Error('failed to download ' + url);
      fn(err);
    } else {
      self.emit('file download', asset, path, res);
      mkdir(dest, 0755, function(err){
        if (err) return fn(err);
        fs.writeFile(path, body, function(err){
          if (err) return fn(err);
          self.emit('file write', asset, path);
          fn();
        });
      });
    }
  });
};

/**
 * Download the given `asset` to `path`.
 *
 * @param {Object} asset
 * @param {String} path
 * @api private
 */

Installer.prototype.download = function(asset, path){
  var self = this
    , version = asset.version
    , url = asset.entry[asset.compress ? 'compressed' : 'url'] || asset.entry.url
    , url = url.replace(/\{version\}/g, version)
    , path = path.replace(/\{version\}/g, version);

  // compressed
  if (asset.compress && asset.entry.compressed) {
    switch (asset.entry.ext) {
      case '.js':
        path = path.replace(/\.js$/, '.min.js');
        break;
    }
  }

  // request the data
  request({ url: url }, function(err, res, body){
    if (err) return self.emit('error', err);
    if (res.statusCode >= 300) {
      var err = new Error('failed to download ' + url);
      self.emit('error', err);
    } else {
      self.emit('download', asset, res);
      fs.writeFile(path, body, function(err){
        if (err) return self.emit('error', err);
        self.emit('complete', asset, path);
      });
    }
  });
};

