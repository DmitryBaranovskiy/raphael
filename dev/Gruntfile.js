"use strict";

module.exports = function(grunt) {

    var pkg = grunt.file.readJSON("package.json");

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: pkg,
        banner: grunt.file.read("copy.js").replace(/@VERSION/, pkg.version),
        // Task configuration.
        uglify: {
            options: {
                banner: "<%= banner %>"
            },
            dist: {
                src: "<%= concat.dist.dest %>",
                dest: "../raphael-min.js"
            }
        },
        replace: {
            dist: {
                options: {
                    patterns: [{
                        match: "VERSION",
                        replacement: "<%= pkg.version %>"
                    }]
                },
                files: [{
                    expand: true,
                    flatten: true,
                    src: "<%= concat.dist.dest %>",
                    dest: "../"
                }]
            }
        },
        concat: {
            dist: {
                dest: "../<%= pkg.name %>.js",
                src: [
                    "../eve/eve.js",
                    "raphael.core.js",
                    "raphael.svg.js",
                    "raphael.vml.js",
                    "raphael.amd.js"
                ]
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-replace");

    // Default task.
    grunt.registerTask("default", ["concat", "replace", "uglify"]);
};
