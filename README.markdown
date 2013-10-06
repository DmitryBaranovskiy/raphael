# Raphaël: Cross-browser vector graphics the easy way. 

Visit the library website for more information: [http://raphaeljs.com](http://raphaeljs.com/)

## Quickstart guide

* `git clone https://github.com/DmitryBaranovskiy/raphael.git`
* `git submodule init && git submodule update && npm install`

## Dependencies
* [eve](https://github.com/adobe-webplatform/eve)
* [grunt](https://github.com/gruntjs/grunt)

## Loading
Check [Raphael-boilerplate](https://github.com/tomasAlabes/raphael-boilerplate) to see examples of loading.

Raphael can be loaded in a script tag or with AMD:

```js
define([ "path/to/raphael" ], function( Raphael ) {
  console.log( Raphael );
});
```

## Development

At the moment we have 4 milestones:

### v2.1.2
Milestone for bug fixes from contributors pull requests.
### v2.2.0
Milestone for enhancements from contributors pull requests.
### v2.2.1
Milestone with bug fixes added from issues created by community.
This fixes were not provided in the issues.
### v2.3.0
Milestone with enhancements suggested in issues but not provided by community at those issues.

We are organizing the current issues between this milestones, setting the grounds for people to contribute and start pushing code soon.

## Want to contribute?

All changes in code must go to `raphael.core`, `raphael.svg` or `raphael.vml`. `raphael.js` is a generated file.

After changing the core/vml/svg files, execute `grunt` in the dev folder to generate the minified version, commit and you are ready to make a pull request!
Remember that if you want to add a functionality it must be present in the vml and svg versions, **no svg-only features will be accepted.**

## Found an issue?

First search for similar issues to make sure you don't repeat an existing one.

Then please create a fiddle ([boilerplate](http://jsfiddle.net/SSJJT/)) recreating the bug so we can find out what the problem is more easily (or be a hero and find it yourself and send a pull request!). You can also use the [raphael playground](http://raphaeljs.com/playground.html) to reproduce your issues.

Remember to add all the info that can be useful such as

* error details
* steps to reproduce
* browser and its version
* any suggestion of what do you think the problem could be

## Collaborators

* [tomasAlabes](https://github.com/tomasAlabes)

## Related Projects

* [graphael](https://github.com/DmitryBaranovskiy/g.raphael/tree/master)
* [raphael.boilerplate](https://github.com/tomasAlabes/raphael-boilerplate)
* [backbone.raphael](https://github.com/tomasAlabes/backbone.raphael)
* [mapael](https://github.com/neveldo/jQuery-Mapael)


## Books

* [Learning Raphael JS Vector Graphics](http://shop.oreilly.com/product/9781782169161.do)
* [RaphaelJS](http://shop.oreilly.com/product/0636920029601.do)
* [Instant RaphaelJS Starter](http://shop.oreilly.com/product/9781782169857.do)

## Copyright and license

Copyright © 2008-2013 Dmitry Baranovskiy (http://raphaeljs.com) 

Copyright © 2008-2013 Sencha Labs (http://sencha.com)  

Licensed under the **MIT** (http://raphaeljs.com/license.html) license.