Raphael.fn.tag = function (x, y, text, angle, r) {
    angle = angle || 0;
    r = r == null ? 5 : r;
    text = text == null ? "$9.99" : text;
    var R = .5522 * r,
        res = this.set(),
        d = 3;
    res.push(this.path().attr({fill: "#000", stroke: "#000"}));
    res.push(this.text(x, y, text).attr({fill: "#fff", font: "12px Arial, sans-serif", "font-family": "Helvetica, Arial"}));
    res.update = function () {
        this.rotate(0, x, y);
        var bb = this[1].getBBox();
        if (bb.height >= r * 2) {
            this[0].attr({path: ["M", x, y + r, "a", r, r, 0, 1, 1, 0, -r * 2, r, r, 0, 1, 1, 0, r * 2, "m", 0, -r * 2 -d, "a", r + d, r + d, 0, 1, 0, 0, (r + d) * 2, "L", x + r + d, y + bb.height / 2 + d, "l", bb.width + 2 * d, 0, 0, -bb.height - 2 * d, -bb.width - 2 * d, 0, "L", x, y - r - d].join(",")});
        } else {
            var dx = Math.sqrt(Math.pow(r + d, 2) - Math.pow(bb.height / 2 + d, 2));
            this[0].attr({path: ["M", x, y + r, "c", -R, 0, -r, R - r, -r, -r, 0, -R, r - R, -r, r, -r, R, 0, r, r - R, r, r, 0, R, R - r, r, -r, r, "M", x + dx, y - bb.height / 2 - d, "a", r + d, r + d, 0, 1, 0, 0, bb.height + 2 * d, "l", r + d - dx + bb.width + 2 * d, 0, 0, -bb.height - 2 * d, "L", x + dx, y - bb.height / 2 - d].join(",")});
        }
        this[1].attr({x: x + r + d + bb.width / 2, y: y});
        angle = (360 - angle) % 360;
        this.rotate(angle, x, y);
        angle > 90 && angle < 270 && this[1].attr({x: x - r - d - bb.width / 2, y: y, rotation: [180 + angle, x, y]});
        return this;
    };
    res.update();
    return res;
};
