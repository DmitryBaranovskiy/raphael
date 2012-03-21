/* This is a fake, local version of AMD's define function. It makes files
built with the make script work without requiring a full AMD loader. If
you're using an AMD loader in your project, don't require the built files
(raphel.js and raphel.min.js). Use raphael.amd.js instead. */

/*global Raphael*/

var glob = (function () { return this; }());

var define = function (name, deps, factory) {
    if (name === 'eve') {
        glob.eve = factory();
        return glob.eve;
    }

    if (name === 'raphael.core') {
        return factory(glob.eve);
    }

    return factory(Raphael);

};