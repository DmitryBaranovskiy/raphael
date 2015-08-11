// ┌────────────────────────────────────────────────────────────────────┐ \\
// │ Raphaël @@VERSION - JavaScript Vector Library                      │ \\
// ├────────────────────────────────────────────────────────────────────┤ \\
// │ Copyright © 2008-2012 Dmitry Baranovskiy (http://raphaeljs.com)    │ \\
// │ Copyright © 2008-2012 Sencha Labs (http://sencha.com)              │ \\
// ├────────────────────────────────────────────────────────────────────┤ \\
// │ Licensed under the MIT (http://raphaeljs.com/license.html) license.│ \\
// └────────────────────────────────────────────────────────────────────┘ \\

(function (glob, factory) {
    if (typeof define === "function" && define.amd) {
        define("raphael", ["dev/raphael.core.js", "raphael.svg", "raphael.vml"], function(Raphael) {
            return factory(Raphael);
        });
    } else if (typeof exports === "object") {
        var raphael = require("./dev/raphael.core");

        require("./dev/raphael.svg");
        require("./dev/raphael.vml");

        module.exports = factory(raphael);
    } else {
        glob.Raphael = factory(glob.Raphael);
    }
}(this, function (Raphael) {
    return Raphael.ninja();
}));