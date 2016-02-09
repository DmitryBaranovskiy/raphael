'use strict';

require.config({
    paths: {
        raphael: '../raphael'
        //you will need eve if you use the nodeps version
        /*eve: '../bower_components/eve/eve'*/
    }
});

require(['raphael'], function(Raphael) {
    var paper = Raphael(0, 0, 640, 720, "container");
    paper.circle(100, 100, 100).attr({'fill':'270-#FAE56B:0-#E56B6B:100'}); //example

    // Work here
});
