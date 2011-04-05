
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
  EventEmitter.call(this);
  this.assets = [];
  this.repo = repo;
  this.dest = dest;
  if (!repo) throw new Error('repository required');
}

/**
 * Inherit from `EventEmitter.prototype`.
 */

Installer.prototype = Object.create(EventEmitter.prototype, {
  'constructor': {
    'value': Installer,
    'enumerable': false
  },

  /**
   * Install the given `asset`.
   *
   * @param {Object} asset
   * @api private 
   */

  'install': {
    'value': function(asset){
      if (!asset.name) throw new Error('asset name required');
      var entry = this.repo[asset.name];
      if (!entry) return this.emit('unknown', asset);
      asset.entry = entry;
      entry.filename = entry.filename || basename(entry.url);
      if (!asset.version) asset.version = entry.version;
      asset.fullname = asset.name + '@' + asset.version;
      this.emit('start', asset);
      this.download(asset, this.dest + '/' + entry.filename);
    },
    'enumerable': false
  },

  /**
   * Download the given `asset` to `path`.
   *
   * @param {Object} asset
   * @param {String} path
   */

  'download': {
    'value': function(asset, path){
      var self = this
        , version = asset.version
        , url = asset.entry.url.replace('{version}', version);

      request({ url: url }, function(err, res, body){
        if (err) return self.emit('error', err);
        var status = res.statusCode;
        if (status >= 300) {
          var err = new Error('failed to download ' + url);
          self.emit('error', err);
        } else {
          self.emit('download', asset, res);
          fs.writeFile(path, body, function(err){
            if (err) return self.emit('error', err);
            self.emit('write', asset, path);
          });
        }
      });
    }
  }
});