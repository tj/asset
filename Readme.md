
# Asset

  Asset manager for lazy people (think homebrew for assets).

## Installation

    $ npm install asset

## Usage

      Usage: asset [command] [options]

      Commands:

        install <name ...>   installs the given asset <name ...>
        search  [query]      search available assets with optional [query]

      Options:

        -o, --out <dir>   output directory defaulting to ./public
        -V, --version     output program version
        -h, --help        display help information

## Examples

### Installing Several Assets

 By default asset installs to `./public`.

      $ asset raphael jquery

       install : raphael@1.4.7
       install : jquery@1.5.2
      download : jquery@1.5.2
      complete : jquery@1.5.2 public/jquery.js
      download : raphael@1.4.7
      complete : raphael@1.4.7 public/raphael.js
      

### Install Destination

  Tweak the output directory with `-o, --out <dir>`.

      $ asset raphael g.raphael g.pie -o public/javascripts

       install : raphael@1.4.7
       install : g.raphael@0.4.1
       install : g.pie@0.4.1
      download : raphael@1.4.7
      complete : raphael@1.4.7 public/javascripts/raphael.js
      download : g.raphael@0.4.1
      complete : g.raphael@0.4.1 public/javascripts/g.raphael.js
      download : g.pie@0.4.1
      complete : g.pie@0.4.1 public/javascripts/g.pie.js

### Dependency Resolution

  Asset currently supports extremely basic dependency mapping, for example below is the output of installing `g.pie`, which depends on `g.raphael`, which in turn depends on `raphael` itself.

    $ asset g.pie

          install : g.pie@0.4.1
       dependency : g.raphael@0.4.1
          install : g.raphael@0.4.1
       dependency : raphael@1.4.7
          install : raphael@1.4.7
         download : raphael@1.4.7
         complete : raphael@1.4.7 public/raphael.js
         download : g.raphael@0.4.1
         complete : g.raphael@0.4.1 public/g.raphael.js
         download : g.pie@0.4.1
         complete : g.pie@0.4.1 public/g.pie.js


### Installation Destination

  To install a specific version, we can use the `@` character:
  
      $ asset jquery@1.5.0

### Search Repository

 We can search the repository with an optional query, listing
 available assets and their default versions:
 
     $ asset raphael

      install : raphael@1.4.7
     download : raphael@1.4.7
     complete : raphael@1.4.7 public/raphael.js

### Configuration

 By default options must be passed via the CLI, however `asset` will also check the `./.asset` and `~/.asset` JSON configuration files, so for example a project may set `{ "out": "public/javascripts" }` if we are mainly working with javascript, however the CLI options will always take precedence.

### The Repository

 By default the repo bundled with `asset` is used, however the `~/.assets` configuration file is checked first. Perhaps down the road if/when asset becomes more flexible a repo will be hosted, for now simply fork the project edit `./assets.json`, and send a pull request.

## License 

(The MIT License)

Copyright (c) 2011 TJ Holowaychuk &lt;tj@vision-media.ca&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.