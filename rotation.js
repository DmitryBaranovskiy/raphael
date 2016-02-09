$(function () {
    var src = $("#bee")[0].src;
    $("#holder").html("");
    var R = Raphael("holder", 640, 480),
        img = R.image(src, 160, 120, 320, 240),
        mouse;
    $(document).mousemove(function (e) {
        if (mouse) {
            img.rotate(e.pageX - mouse);
        }
        mouse = e.pageX;
        R.safari();
    });
    // iPhone support
    if (window.orientation) {
        var a = 0;
        document.ongesturechange = function (e) {
            var r = e.rotation % 360 - a;
            a += r;
            img.rotate(r);
        };
        document.ongestureend = function () {
            a = 0;
        };
    }
});