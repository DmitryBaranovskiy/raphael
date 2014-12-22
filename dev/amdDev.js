'use strict';

require.config({
    paths: {
        raphael: '../raphael'
    }
});

require(['raphael'], function(Raphael) {
    var paper = Raphael(0, 0, 640, 720, "container");


});