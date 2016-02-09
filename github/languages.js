$(window).load(function () {
    var data = [],
        labels = [],
        links = [],
        colors = [],
        sum = 0;
    $("#language_table tr").each(function () {
        var tds = $("td", this);
        if (tds.length) {
            var a = $("a", tds[0]);
            labels.push(a.text());
            links.push(a.attr("href"));
            data.push(parseFloat($(tds[1]).html(), 10));
            sum += data[data.length - 1];
            var color = Raphael.getColor();
            colors.push(color);
            $("span", tds[0]).css("background-color", color);
        }
    });

    var r = Raphael("chart", 300, 300);
    var d = 0;
    r.circle(150, 150, 60).attr({fill: "#fff", stroke: "none"});
    for (var i = data.length - 1; i >= 0; i--) {
        d += data[i];
        var a = 2 * Math.PI * d / sum;
        var t = Math.tan(a);
        var c = 1 / Math.tan(a);
        var p = r.path().attr({fill: colors[i], stroke: "#fff", opacity: 1}).moveTo(150, 150).lineTo(300, 150);
        if (a <= Math.PI * .25) {
            p.lineTo(300, 150 - 150 * t).andClose();
        } else if (a <= Math.PI * .75) {
            p.lineTo(300, 0).lineTo(150 + 150 * c, 0).andClose();
        } else if (a <= Math.PI * 1.25) {
            p.lineTo(300, 0).lineTo(0, 0).lineTo(0, 150 + 150 * t).andClose();
        } else if (a <= Math.PI * 1.75) {
            p.lineTo(300, 0).lineTo(0, 0).lineTo(0, 300).lineTo(150 - 150 * c, 300).andClose();
        } else {
            p.lineTo(300, 0).lineTo(0, 0).lineTo(0, 300).lineTo(300, 300).lineTo(300, 150 - 150 * t).andClose();
        }
        p.toBack();
        p[0].style.cursor = "pointer";
        text = r.text(150, 150 + 5, labels[i]).attr({"font": '19px "Arial"', "stroke-width": 0, fill: colors[i]}).hide();
        (function (text, i, p) {
            $(p[0]).hover(function () {
                text.show();
                var newclr = Raphael.rgb2hsb(colors[i]);
                newclr.b = 1;
                p.attr({"fill": Raphael.hsb2rgb(newclr).hex});
                r.safari();
            }, function () {
                text.hide();
                p.attr({"fill": colors[i]});
                r.safari();
            }).click(function () {
                document.location.href = links[i];
            });
        })(text, i, p);
    }
    var cover = r.path().attr({fill: "#fff", stroke: "none"}).moveTo(0, 0).lineTo(150, 0).lineTo(150, 2).addRoundedCorner(148, "ld").addRoundedCorner(148, "dr").addRoundedCorner(148, "ru").addRoundedCorner(148, "ul").lineTo(150, 0).lineTo(300, 0).lineTo(300, 300).lineTo(0, 300).andClose();
});