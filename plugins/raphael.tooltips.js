Raphael.fn.tag = function (x, y, text, angle, r) {
    angle = angle || 0;
    r = r == null ? 5 : r;
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
        angle = 360 - angle;
        this.rotate(angle, x, y);
        angle > 90 && angle < 270 && this[1].attr({x: x - r - d - bb.width / 2, y: y}).rotate(180, x, y);
        return this;
    };
    return res.update();
};
Raphael.fn.popup = function (x, y, text, dir, size) {
    //TODO: perhaps center the text in the middle of the main box?
    //if size and font-size dont' get along, it can look a little wierd
    var res = this.set(),
        dirs = {down: 0, left: 1, up: 2, right: 3},
        mmax = Math.max;
    dir = dir == null ? 2 : typeof dirs[dir] != 'undefined' ? dirs[dir] : 2;
    size = size || 5;
    res.push(this.path().attr({fill: "#000", stroke: "#000"}));
    res.push(this.text(x, y, text).attr({fill: "#fff", font: "12px Arial, sans-serif", "font-family": "Helvetica, Arial"}));
    res.update = function (X, Y, withAnimation) {
        X = X || x;
        Y = Y || y;
        var bb = this[1].getBBox(),
            w = bb.width / 2,
            h = bb.height / 2,
            dx = [0, w + size * 2, 0, -w - size * 2],
            dy = [-h * 2 - size * 3, -h - size, 0, -h - size],
            p = ["M", X - dx[dir], Y - dy[dir], "l", -size, (dir == 2) * -size, -mmax(w - size, 0), 0, "a", size, size, 0, 0, 1, -size, -size,
                "l", 0, -mmax(h - size, 0), (dir == 3) * -size, -size, (dir == 3) * size, -size, 0, -mmax(h - size, 0), "a", size, size, 0, 0, 1, size, -size,
                "l", mmax(w - size, 0), 0, size, !dir * -size, size, !dir * size, mmax(w - size, 0), 0, "a", size, size, 0, 0, 1, size, size,
                "l", 0, mmax(h - size, 0), (dir == 1) * size, size, (dir == 1) * -size, size, 0, mmax(h - size, 0), "a", size, size, 0, 0, 1, -size, size,
                "l", -mmax(w - size, 0), 0, "z"].join(","),
            xy = [{x: X, y: Y + size * 2 + h}, {x: X - size * 2 - w, y: Y}, {x: X, y: Y - size * 2 - h}, {x: X + size * 2 + w, y: Y}][dir];
        xy.path = p;
        if (withAnimation) {
            this.animate(xy, 500, ">");
        } else {
            this.attr(xy);
        }
        return this;
    };
    return res.update(x, y);
};
Raphael.fn.flag = function (x, y, text, angle) {
    angle = angle || 0;
    var res = this.set(),
        d = 3;
    res.push(this.path().attr({fill: "#000", stroke: "#000"}));
    res.push(this.text(x, y, text).attr({fill: "#fff", font: "12px Arial, sans-serif", "font-family": "Helvetica, Arial"}));
    res.update = function (x, y) {
        this.rotate(0, x, y);
        var bb = this[1].getBBox(),
            h = bb.height / 2;
        this[0].attr({path: ["M", x, y, "l", h + d, -h - d, bb.width + 2 * d, 0, 0, bb.height + 2 * d, -bb.width - 2 * d, 0, "z"].join(",")});
        this[1].attr({x: x + h + d + bb.width / 2, y: y});
        angle = 360 - angle;
        this.rotate(angle, x, y);
        angle > 90 && angle < 270 && this[1].attr({x: x - h - d - bb.width / 2, y: y}).rotate(180, x, y);
        return this;
    };
    return res.update(x, y);
};
Raphael.fn.label = function (x, y, text) {
    var res = this.set();
    res.push(this.rect(x, y, 10, 10).attr({stroke: "none", fill: "#000"}));
    res.push(this.text(x, y, text).attr({fill: "#fff", font: "12px Arial, sans-serif"}));
    res.update = function () {
        var bb = this[1].getBBox(),
            r = Math.min(bb.width + 10, bb.height + 10) / 2;
        this[0].attr({x: bb.x - r / 2, y: bb.y - r / 2, width: bb.width + r, height: bb.height + r, r: r});
        return this;
    };
    return res.update();
};
Raphael.fn.drop = function (x, y, text, size, angle) {
    size = size || 30;
    angle = angle || 0;
    var res = this.set();
    res.push(this.path(["M", x, y, "l", size, 0, "A", size * .4, size * .4, 0, 1, 0, x + size * .7, y - size * .7, "z"]).attr({fill: "#000", stroke: "none"}).rotate(22.5 - angle, x, y));
    angle = (angle + 90) * Math.PI / 180;
    res.push(this.text(x + size * Math.sin(angle), y + size * Math.cos(angle), text).attr({font: "12px Arial, sans-serif", "font-size": size * 12 / 30, fill: "#fff"}));
    res.drop = res[0];
    res.text = res[1];
    return res;
};
Raphael.fn.blob = function (x, y, text, size, angle) {
    angle = (+angle + 1 ? angle : 45) + 90;
    size = size || 12;
    var rad = Math.PI / 180,
        fontSize = size * 12 / 12;
    var res = this.set();
    res.push(this.path().attr({fill: "#000", stroke: "none"}));
    res.push(this.text(x + size * Math.sin((angle) * rad), y + size * Math.cos((angle) * rad) - fontSize / 2, text).attr({font: "12px Arial, sans-serif", "font-size": fontSize, fill: "#fff"}));
    res.update = function (X, Y, withAnimation) {
        X = X || x;
        Y = Y || y;
        var bb = this[1].getBBox(),
            w = Math.max(bb.width + fontSize, size * 25 / 12),
            h = Math.max(bb.height + fontSize, size * 25 / 12),
            x2 = X + size * Math.sin((angle - 22.5) * rad),
            y2 = Y + size * Math.cos((angle - 22.5) * rad),
            x1 = X + size * Math.sin((angle + 22.5) * rad),
            y1 = Y + size * Math.cos((angle + 22.5) * rad),
            dx = (x1 - x2) / 2,
            dy = (y1 - y2) / 2,
            rx = w / 2,
            ry = h / 2,
            k = -Math.sqrt(Math.abs(rx * rx * ry * ry - rx * rx * dy * dy - ry * ry * dx * dx) / (rx * rx * dy * dy + ry * ry * dx * dx)),
            cx = k * rx * dy / ry + (x1 + x2) / 2,
            cy = k * -ry * dx / rx + (y1 + y2) / 2;
        if (withAnimation) {
            this.animate({x: cx, y: cy, path: ["M", x, y, "L", x1, y1, "A", rx, ry, 0, 1, 1, x2, y2, "z"].join(",")}, 500, ">");
        } else {
            this.attr({x: cx, y: cy, path: ["M", x, y, "L", x1, y1, "A", rx, ry, 0, 1, 1, x2, y2, "z"].join(",")});
        }
        return this;
    };
    return res.update(x, y);
};
