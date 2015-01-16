# local-modules
require local modules with absolute path

## problem
require local modules in node can be annoying with relative paths. e.g.

```javascript
    var cache = require('../../../plugins/cache');
```

detailed problem description and discussion as well as different solutions can be found here:

[better local require paths](https://gist.github.com/branneman/8048520)

## solution / hack
treat specific application folders like the `node_modules` folder, so that we can require stuff without ugly relative paths.

###install
`npm install local-modules --save`

###use

with the given project structure:
```
    .
    ├── index.js
    ├── package.json
    ├── components
    │   └── components-test
    │       └── index.js
    ├── lib
    │   ├── lib-test
    │   │   ├── package.json
    │   │   └── test.js
    │   └── plugins
    │       ├── cache
    │       │   ├── index.js
    │       │   └── lru
    │       │       └── index.js
    │       └── index.js
    └── node_modules
        └── test
            └── index.js

```

you can require this from the app directory:

```javascript
    // only call this once
    require('local-modules')('lib', 'components');

    // require from node_modules as usual
    require('test');

    // require from lib with absolute paths
    require('lib-test');
    require('plugins/cache');

    // require from components directory directly
    require('components-test');

```

or within the `lib/plugins/cache/lru/index.js` file, you can require this:
```javascript

    require('plugins');
    require('lib-test');
    require('components-test');

```

## test
tested so far with node 0.8, 0.10, 0.11
 1. clone the repo
 2. run `node test`

## inspiration
https://gist.github.com/branneman/8048520

## credits
 - @branneman   for the great article on this topic
 - @joelabair   for the cool hack