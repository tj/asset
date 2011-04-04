
/*!
 * asset - Installer
 * Copyright(c) 2011 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

/**
 * Expose installer.
 */

module.exports = Installer;

/**
 * Initialize a new `Installer`.
 *
 * @api private
 */

function Installer() {
  this.assets = [];
}