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
Raphael.fn.drawGrid = function (x, y, w, h, wv, hv, color) {
    color = color || "#000";
    var path = ["M", x, y, "L", x + w, y, x + w, y + h, x, y + h, x, y],
        rowHeight = h / hv,
        columnWidth = w / wv;
    for (var i = 1; i < hv; i++) {
        path = path.concat(["M", x, y + i * rowHeight, "L", x + w, y + i * rowHeight]);
    }
    for (var i = 1; i < wv; i++) {
        path = path.concat(["M", x + i * columnWidth, y, "L", x + i * columnWidth, y + h]);
    }
    return this.path(path.join(",")).attr({stroke: color});
};
Raphael.fn.square = function (cx, cy, r) {
    r = r * .7;
    return this.rect(cx - r, cy - r, 2 * r, 2 * r);
};
Raphael.fn.triangle = function (cx, cy, r) {
    r *= 1.75;
    return this.path("M".concat(cx, ",", cy, "m0-", r * .58, "l", r * .5, ",", r * .87, "-", r, ",0z"));
};
Raphael.fn.diamond = function (cx, cy, r) {
    return this.path(["M", cx, cy - r, "l", r, r, -r, r, -r, -r, r, -r, "z"]);
};
Raphael.fn.cross = function (cx, cy, r) {
    r = r / 2.5;
    return this.path("M".concat(cx - r, ",", cy, "l", [-r, -r, r, -r, r, r, r, -r, r, r, -r, r, r, r, -r, r, -r, -r, -r, r, -r, -r, "z"]));
};
Raphael.fn.plus = function (cx, cy, r) {
    r = r / 2;
    return this.path("M".concat(cx - r / 2, ",", cy - r / 2, "l", [0, -r, r, 0, 0, r, r, 0, 0, r, -r, 0, 0, r, -r, 0, 0, -r, -r, 0, 0, -r, "z"]));
};
Raphael.fn.arrow = function (cx, cy, r, angle) {
    return this.path("M".concat(cx - r * .7, ",", cy - r * .4, "l", [r * .6, 0, 0, -r * .4, r, r * .8, -r, r * .8, 0, -r * .4, -r * .6, 0], "z")).rotate(angle || 0);
};
Raphael.fn.i = function (cx, cy, r) {
    return this.path("M13.052,15.376c0,0.198-0.466,0.66-1.397,1.388c-0.932,0.728-1.773,1.092-2.526,1.092c-0.518,0-0.895-0.133-1.129-0.398s-0.352-0.564-0.352-0.897c0-0.209,0.031-0.404,0.092-0.583c0.062-0.179,0.13-0.361,0.204-0.546l1.758-3.646c0.099-0.209,0.169-0.379,0.213-0.509c0.043-0.129,0.064-0.244,0.064-0.342s-0.019-0.169-0.055-0.213c-0.037-0.043-0.087-0.064-0.148-0.064c-0.16,0-0.472,0.244-0.935,0.731c-0.462,0.487-0.737,0.731-0.823,0.731c-0.099,0-0.198-0.068-0.296-0.204s-0.148-0.222-0.148-0.259c0-0.123,0.117-0.324,0.352-0.602c0.234-0.277,0.531-0.57,0.888-0.879C9.135,9.892,9.521,9.627,9.971,9.38c0.45-0.247,0.848-0.37,1.194-0.37c0.555,0,0.972,0.158,1.249,0.472c0.278,0.314,0.417,0.694,0.417,1.138c0,0.185-0.019,0.382-0.056,0.592c-0.037,0.209-0.117,0.425-0.24,0.647l-1.407,3.09c-0.111,0.259-0.191,0.469-0.241,0.629c-0.049,0.161-0.074,0.271-0.074,0.333c0,0.074,0.019,0.121,0.055,0.139c0.037,0.018,0.074,0.027,0.111,0.027c0.271,0,0.589-0.194,0.953-0.583c0.364-0.389,0.595-0.583,0.694-0.583c0.086,0,0.179,0.064,0.278,0.194C13.002,15.237,13.052,15.327,13.052,15.376z M14.477,5.827c0,0.457-0.164,0.852-0.49,1.185c-0.327,0.333-0.725,0.5-1.194,0.5c-0.457,0-0.851-0.167-1.185-0.5c-0.333-0.333-0.5-0.728-0.5-1.185c0-0.456,0.167-0.851,0.5-1.184c0.333-0.333,0.728-0.5,1.185-0.5c0.469,0,0.867,0.167,1.194,0.5C14.313,4.976,14.477,5.371,14.477,5.827z").translate(cx - 11, cy - 11).scale((r || 20) / 20);
};