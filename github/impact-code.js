var process = function (json) {
    var x = 0,
        r = Raphael("chart", 2350, 550),
        labels = {},
        textattr = {"font": '9px "Arial"', stroke: "none", fill: "#fff"},
        pathes = {},
        nmhldr = $("#name")[0],
        nmhldr2 = $("#name2")[0],
        lgnd = $("#legend")[0],
        usrnm = $("#username")[0],
        lgnd2 = $("#legend2")[0],
        usrnm2 = $("#username2")[0],
        plchldr = $("#placeholder")[0];
    function finishes() {
        for (var i in json.authors) {
            var start, end;
            for (var j = json.buckets.length - 1; j >= 0; j--) {
                var isin = false;
                for (var k = 0, kk = json.buckets[j].i.length; k < kk; k++) {
                    isin = isin || (json.buckets[j].i[k][0] == i);
                }
                if (isin) {
                    end = j;
                    break;
                }
            }
            for (var j = 0, jj = json.buckets.length; j < jj; j++) {
                var isin = false;
                for (var k = 0, kk = json.buckets[j].i.length; k < kk; k++) {
                    isin = isin || (json.buckets[j].i[k][0] == i);
                };
                if (isin) {
                    start = j;
                    break;
                }
            }
            for (var j = start, jj = end; j < jj; j++) {
                var isin = false;
                for (var k = 0, kk = json.buckets[j].i.length; k < kk; k++) {
                    isin = isin || (json.buckets[j].i[k][0] == i);
                }
                if (!isin) {
                    json.buckets[j].i.push([i, 0]);
                }
            }
        }
    }
    function block() {
        var p, h;
        finishes();
        for (var j = 0, jj = json.buckets.length; j < jj; j++) {
            var users = json.buckets[j].i;
            h = 0;
            for (var i = 0, ii = users.length; i < ii; i++) {
                p = pathes[users[i][0]];
                if (!p) {
                    p = pathes[users[i][0]] = {f:[], b:[]};
                }
                p.f.push([x, h, users[i][1]]);
                p.b.unshift([x, h += Math.max(Math.round(Math.log(users[i][1]) * 5), 1)]);
                h += 2;
            }
            var dt = new Date(json.buckets[j].d * 1000);
            var dtext = dt.getDate() + " " + ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"][dt.getMonth()] + " " + dt.getFullYear();
            r.text(x + 25, h + 10, dtext).attr({"font": '9px "Arial"', stroke: "none", fill: "#aaa"});
            x += 100;
        }
        var c = 0;
        for (var i in pathes) {
            labels[i] = r.set();
            var clr = Raphael.getColor();
            pathes[i].p = r.path().attr({fill: clr, stroke: clr});
            var path = "M".concat(pathes[i].f[0][0], ",", pathes[i].f[0][1], "L", pathes[i].f[0][0] + 50, ",", pathes[i].f[0][1]);
            var th = Math.round(pathes[i].f[0][1] + (pathes[i].b[pathes[i].b.length - 1][1] - pathes[i].f[0][1]) / 2 + 3);
            labels[i].push(r.text(pathes[i].f[0][0] + 25, th, pathes[i].f[0][2]).attr(textattr));
            var X = pathes[i].f[0][0] + 50,
                Y = pathes[i].f[0][1];
            for (var j = 1, jj = pathes[i].f.length; j < jj; j++) {
                path = path.concat("C", X + 20, ",", Y, ",");
                X = pathes[i].f[j][0];
                Y = pathes[i].f[j][1];
                path = path.concat(X - 20, ",", Y, ",", X, ",", Y, "L", X += 50, ",", Y);
                th = Math.round(Y + (pathes[i].b[pathes[i].b.length - 1 - j][1] - Y) / 2 + 3);
                if (th - 9 > Y) {
                    labels[i].push(r.text(X - 25, th, pathes[i].f[j][2]).attr(textattr));
                }
            }
            path = path.concat("L", pathes[i].b[0][0] + 50, ",", pathes[i].b[0][1], ",", pathes[i].b[0][0], ",", pathes[i].b[0][1]);
            for (var j = 1, jj = pathes[i].b.length; j < jj; j++) {
                path = path.concat("C", pathes[i].b[j][0] + 70, ",", pathes[i].b[j - 1][1], ",", pathes[i].b[j][0] + 70, ",", pathes[i].b[j][1], ",", pathes[i].b[j][0] + 50, ",", pathes[i].b[j][1], "L", pathes[i].b[j][0], ",", pathes[i].b[j][1]);
            }
            pathes[i].p.attr({path: path + "z"});
            labels[i].hide();
            var current = null;
            (function (i) {
                pathes[i].p.mouseover(function () {
                    if (current != null) {
                        labels[current].hide();
                    }
                    current = i;
                    labels[i].show();
                    pathes[i].p.toFront();
                    labels[i].toFront();
                    usrnm2.innerHTML = json.authors[i].n + " <em>(" + json.authors[i].c + " commits, " + json.authors[i].a + " additions, " + json.authors[i].d + " deletions)</em>";
                    lgnd2.style.backgroundColor = pathes[i].p.attr("fill");
                    nmhldr2.className = "";
                    plchldr.className = "hidden";
                });
            })(i);
        }
    }
    if (json.error) {
        alert("Project not found. Try again.");
    } else {
        block();
    }
};
$(function () {
    process(json);
});