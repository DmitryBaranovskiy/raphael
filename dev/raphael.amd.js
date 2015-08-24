// ┌────────────────────────────────────────────────────────────────────┐ \\
// │ Raphaël @VERSION - JavaScript Vector Library                       │ \\
// ├────────────────────────────────────────────────────────────────────┤ \\
// │ Copyright © 2008-2012 Dmitry Baranovskiy (http://raphaeljs.com)    │ \\
// │ Copyright © 2008-2012 Sencha Labs (http://sencha.com)              │ \\
// ├────────────────────────────────────────────────────────────────────┤ \\
// │ Licensed under the MIT (http://raphaeljs.com/license.html) license.│ \\
// └────────────────────────────────────────────────────────────────────┘ \\

(function (glob, factory) {
    if (typeof define === "function" && define.amd) {
        define("raphael", ["raphael.core", "raphael.svg", "raphael.vml"], function(Raphael) {
            return (glob.Raphael = factory(Raphael));
        });
    } else if (typeof exports === "object") {
        var raphael = require("raphael.core");

        require("raphael.svg");
        require("raphael.vml");

        module.exports = factory(raphael);
    } else {
        glob.Raphael = factory(glob.Raphael);
    }
}(this, function (Raphael) {
    return Raphael.ninja();
}));