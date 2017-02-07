"use strict";

module.exports = function(grunt) {

    var pkg = grunt.file.readJSON("package.json");

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: pkg,
        banner: grunt.file.read("dev/banner.txt").replace(/@VERSION/, pkg.version),
        // Task configuration.
        uglify: {
            options: {
                banner: "<%= banner %>"
            },
            dist: {
                src: "<%= concat.dist.dest %>",
                dest: "<%= pkg.name %>-min.js"
            },
            nodeps: {
                src: "<%= concat.nodeps.dest %>",
                dest: "<%= pkg.name %>-nodeps-min.js"
            },
            novml: {
                src: "<%= concat.novml.dest %>",
                dest: "<%= pkg.name %>-novml-min.js"
            },
            nodeps_novml: {
                src: "<%= concat.nodeps_novml.dest %>",
                dest: "<%= pkg.name %>-nodeps-novml-min.js"
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
                    src: [
                        "<%= concat.dist.dest %>",
                        "<%= concat.nodeps.dest %>",
                        "<%= concat.novml.dest %>",
                        "<%= concat.nodeps_novml.dest %>"
                    ],
                    dest: "./"
                }]
            }
        },
        concat: {
            dist: {
                dest: "<%= pkg.name %>.js",
                src: [
                    "dev/eve.js",
                    "dev/raphael.core.js",
                    "dev/raphael.svg.js",
                    "dev/raphael.vml.js",
                    "dev/raphael.amd.js"
                ]
            },
            nodeps: {
                dest: "<%= pkg.name %>-nodeps.js",
                src: [
                    "dev/raphael.core.js",
                    "dev/raphael.svg.js",
                    "dev/raphael.vml.js",
                    "dev/raphael.amd.js"
                ]
            },
            novml: {
                dest: "<%= pkg.name %>-novml.js",
                src: [
                    "dev/eve.js",
                    "dev/raphael.core.js",
                    "dev/raphael.svg.js",
                    "dev/raphael.amd.novml.js"
                ]
            },
            nodeps_novml: {
                dest: "<%= pkg.name %>-nodeps-novml.js",
                src: [
                    "dev/raphael.core.js",
                    "dev/raphael.svg.js",
                    "dev/raphael.amd.novml.js"
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
