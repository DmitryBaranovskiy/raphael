Raphael(function () {
    var hldr = document.getElementById("holder"),
        text = hldr.innerText.replace(/^\s+|\s+$/g, "");
    hldr.innerHTML = "";
    var R = Raphael("holder", 640, 480),
        txt = [],
        attr = {font: "50px Helvetica", opacity: 0.5};
    txt[0] = R.text(320, 240, text).attr(attr).attr({fill: "#0f0"});
    txt[1] = R.text(320, 240, text).attr(attr).attr({fill: "#f00"});
    txt[2] = R.text(320, 240, text).attr(attr).attr({fill: "#00f"});
    var mouse = null, rot = 0;
    document.onmousemove = function (e) {
        e = e || event;
        if (mouse == null) {
            mouse = e.clientX;
            return;
        }
        rot += e.clientX - mouse;
        txt[0].attr({transform: "r" + rot});
        txt[1].attr({transform: "r" + rot / 1.5});
        txt[2].attr({transform: "r" + rot / 2});
        mouse = e.pageX;
        R.safari();
    };
});