Raphael.fn.star = function (cx, cy, rout, rin, n) {
    rin = rin || rout * .5;
    n = +n < 3 || !n ? 5 : n;
    var points = ["M", cx, cy + rin, "L"],
        R;
    for (var i = 1; i < n * 2; i++) {
        R = i % 2 ? rout : rin;
        points = points.concat([+(cx + R * Math.sin(i * Math.PI / n)).toFixed(3), +(cy + R * Math.cos(i * Math.PI / n)).toFixed(3)]);
    }
    points.push("z");
    return this.path(points);
};
Raphael.fn.flower = function (cx, cy, rout, rin, n) {
    rin = rin || rout * .5;
    n = +n < 3 || !n ? 5 : n;
    var points = ["M", cx, cy + rin, "Q"],
        R;
    for (var i = 1; i < n * 2 + 1; i++) {
        R = i % 2 ? rout : rin;
        points = points.concat([+(cx + R * Math.sin(i * Math.PI / n)).toFixed(3), +(cy + R * Math.cos(i * Math.PI / n)).toFixed(3)]);
    }
    points.push("z");
    return this.path(points);
};
Raphael.fn.spike = function (cx, cy, rout, rin, n) {
    rin = rin || rout * .5;
    n = +n < 3 || !n ? 5 : n;
    var points = ["M", cx, cy - rout, "Q"],
        R;
    for (var i = 1; i < n * 2 + 1; i++) {
        R = i % 2 ? rin : rout;
        points = points.concat([cx + R * Math.sin(i * Math.PI / n - Math.PI), cy + R * Math.cos(i * Math.PI / n - Math.PI)]);
    }
    points.push("z");
    return this.path(points);
};
Raphael.fn.polygon = function (cx, cy, r, n) {
    n = +n < 3 || !n ? 5 : n;
    var points = ["M", cx, cy - r, "L"],
        R;
    for (var i = 1; i < n; i++) {
        points = points.concat([cx + r * Math.sin(i * Math.PI * 2 / n - Math.PI), cy + r * Math.cos(i * Math.PI * 2 / n - Math.PI)]);
    }
    points.push("z");
    return this.path(points);
};
Raphael.fn.line = function (x1, y1, x2, y2) {
    return this.path(["M", x1, y1, "L", x2, y2]);
};