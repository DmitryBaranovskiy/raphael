# Raphaël: Cross-browser vector graphics the easy way.

Visit the library website for more information: [http://raphaeljs.com](http://raphaeljs.com/)

## Quickstart guide

You need to have NPM installed to build the library.

* `git clone https://github.com/DmitryBaranovskiy/raphael.git`
* `npm install && ./node_modules/grunt-cli/bin/grunt` or just `npm install && grunt` if you have grunt already installed

## Dependencies
* [eve](https://github.com/adobe-webplatform/eve)

You have the `raphael/raphael-min.js` files that has `eve` bundled inside, and `raphael-nodeps/raphael-nodeps-min.js` 
where `eve` must be loaded by you first (you can try with the one in the `dev/` folder).
For AMD loading like Browserify, you can use raphael.amd.js.

## Where to start
Check [Raphael-boilerplate](https://github.com/tomasAlabes/raphael-boilerplate) to see examples of loading.

Raphael can be loaded in a script tag or with AMD:

```js
define([ "path/to/raphael" ], function( Raphael ) {
  console.log( Raphael );
});
```

## Development

Versions will be released as we gather and test new PRs. Each version should have a correspondent branch.
As there are not automated tests, we will use the feedback from the users for the fixes.

You can use the `raphaelTest.html` to try things, you need to start a server in the root dir to start testing things there.
Something like running `python -m SimpleHTTPServer` in the `raphael` directory and hitting `http://localhost:8000/dev/raphaelTest.html` with the browser.


## Collaborators

* [tomasAlabes](https://github.com/tomasAlabes)

## Related Projects

* [graphael](https://github.com/DmitryBaranovskiy/g.raphael/tree/master)
* [raphael.boilerplate](https://github.com/tomasAlabes/raphael-boilerplate)
* [backbone.raphael](https://github.com/tomasAlabes/backbone.raphael)
* [mapael](https://github.com/neveldo/jQuery-Mapael)
* [snap](https://github.com/adobe-webplatform/Snap.svg)


## Books

* [Learning Raphael JS Vector Graphics](http://shop.oreilly.com/product/9781782169161.do)
* [RaphaelJS](http://shop.oreilly.com/product/0636920029601.do)
* [Instant RaphaelJS Starter](http://shop.oreilly.com/product/9781782169857.do)

## Copyright and license

Copyright © 2008-2013 Dmitry Baranovskiy (http://raphaeljs.com)

Copyright © 2008-2013 Sencha Labs (http://sencha.com)

Licensed under the **MIT** (http://raphaeljs.com/license.html) license.
