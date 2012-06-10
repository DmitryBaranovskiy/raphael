#!/usr/bin/env node

/*
To use this script, must have: 
- uglify.js (npm install uglify)
- eve/eve.js (get it from https://github.com/DmitryBaranovskiy/eve) 
*/


var setup = {
        input: {
            core: "raphael.core.js",
            svg: "raphael.svg.js",
            vml: "raphael.vml.js",
            eve: "eve/eve.js",
            copy: "copy.js",
            fakeDefine: "fakedefine.js"
        },
        output: {
            "raphael-min.js": function () {
                return this.copy + "\n" + minify(this.fakeDefine + "\n\n" + this.eve + this.core + this.svg + this.vml);
            },
            "raphael.js": function () {
                return this.copy + "\n" + this.fakeDefine + "\n\n" + this.eve + "\n\n" + this.core + "\n\n" + this.svg + "\n\n" + this.vml;
            },
            "raphael.pro-min.js": function () {
                return this.copy + "\n" + minify(this.fakeDefine + "\n\n" + this.eve + this.core + this.svg);
            },
            "raphael.pro.js": function () {
                return this.copy + "\n" + this.fakeDefine + "\n\n" + this.eve + "\n\n" + this.core + "\n\n" + this.svg ;
            }
        }
    },
    ujs = require("uglify-js"),
    jsp = ujs.parser,
    pro = ujs.uglify,
    fs = require("fs"),
    rxdr = /\/\*\\[\s\S]+?\\\*\//g;

function minify(code) {
    return pro.gen_code(pro.ast_squeeze(pro.ast_mangle(jsp.parse(code))));
}

var files = {};
for (var file in setup.input) {

    files[file] = String(fs.readFileSync(setup.input[file], "utf8")).replace(rxdr, "").replace(/^define\(/m, "define('" + setup.input[file].replace('.js', '') + "', ");
}
for (file in setup.output) {
    var before = "(function () {\n\n";
    var after = "\n\n}());";
    (function (file) {
        fs.writeFile(file, before + setup.output[file].call(files) + after, function () {
            console.log("Saved to \033[32m" + file + "\033[0m\n");
        });
    })(file);
}