/*
 * Tooltips on Element prototype
 */
Raphael.el.popup = function (x, y, dir, size) {
    var dirs = { down: 0, left: 1, up: 2, right: 3 },
        mmax = Math.max,
        bb, w, h, dx, dy, p, xy;

    dir = dir == null ? 2 : typeof dirs[dir] != 'undefined' ? dirs[dir] : 2;
    size = size || 5;
    bb = this.getBBox(),
    x = Math.round(x) || Math.round(bb.x);
    y = Math.round(y) || Math.round(bb.y);
    w = Math.round(bb.width / 2),
    h = Math.round(bb.height / 2),
    dx = [0, w + size * 2, 0, -w - size * 2],
    dy = [-h * 2 - size * 3, -h - size, 0, -h - size],
    p = [
        "M", x - dx[dir], y - dy[dir],
        "l", -size, (dir == 2) * -size, -mmax(w - size, 0), 0,
        "a", size, size, 0, 0, 1, -size, -size,
        "l", 0, -mmax(h - size, 0), (dir == 3) * -size, -size, (dir == 3) * size, -size, 0, -mmax(h - size, 0),
        "a", size, size, 0, 0, 1, size, -size,
        "l", mmax(w - size, 0), 0, size, !dir * -size, size, !dir * size, mmax(w - size, 0), 0,
        "a", size, size, 0, 0, 1, size, size,
        "l", 0, mmax(h - size, 0), (dir == 1) * size, size, (dir == 1) * -size, size, 0, mmax(h - size, 0),
        "a", size, size, 0, 0, 1, -size, size,
        "l", -mmax(w - size, 0), 0,
        "z"
    ].join(","),
    xy = [
        { x: x, y: y + size * 2 + h },
        { x: x - size * 2 - w, y: y },
        { x: x, y: y - size * 2 - h },
        { x: x + size * 2 + w, y: y }
    ][dir];

    this.translate(xy.x - w - bb.x, xy.y - h - bb.y);
    return this.paper.path(p).attr({ fill: "#000", stroke: "none" }).insertBefore(this.node ? this : this[0]);
};

Raphael.el.tag = function (x, y, angle, r) {
    var d = 3,
        p = this.paper.path().attr({ fill: '#000', stroke: '#000' }),
        bb = this.getBBox(),
        dx, R, center, tmp;

    switch (this.type) {
        case 'text':
        case 'circle':
        case 'ellipse': center = true; break;
        default: center = false;
    }

    angle = angle || 0;
    x = x || (center ? bb.x + bb.width / 2 : bb.x);
    y = y || (center ? bb.y + bb.height / 2 : bb.y);
    r = r == null ? 5 : r;
    R = .5522 * r;

    if (bb.height >= r * 2) {
        p.attr({
            path: [
                "M", x, y + r,
                "a", r, r, 0, 1, 1, 0, -r * 2, r, r, 0, 1, 1, 0, r * 2,
                "m", 0, -r * 2 -d,
                "a", r + d, r + d, 0, 1, 0, 0, (r + d) * 2,
                "L", x + r + d, y + bb.height / 2 + d,
                "l", bb.width + 2 * d, 0, 0, -bb.height - 2 * d, -bb.width - 2 * d, 0,
                "L", x, y - r - d
            ].join(",")
        });
    } else {
        dx = Math.sqrt(Math.pow(r + d, 2) - Math.pow(bb.height / 2 + d, 2));
        p.attr({
            path: [
                "M", x, y + r,
                "c", -R, 0, -r, R - r, -r, -r, 0, -R, r - R, -r, r, -r, R, 0, r, r - R, r, r, 0, R, R - r, r, -r, r,
                "M", x + dx, y - bb.height / 2 - d,
                "a", r + d, r + d, 0, 1, 0, 0, bb.height + 2 * d,
                "l", r + d - dx + bb.width + 2 * d, 0, 0, -bb.height - 2 * d,
                "L", x + dx, y - bb.height / 2 - d
            ].join(",")
        });
    }

    this.attr(this.attrs.x ? 'x' : 'cx', x + r + d + (!center ? this.type == 'text' ? bb.width : 0 : bb.width / 2)).attr('y', center ? y : y - bb.height / 2);
    angle = 360 - angle;
    this.rotate(angle, x, y);
    p.rotate(angle, x, y);
    angle > 90 && angle < 270 && this.attr(this.attrs.x ? 'x' : 'cx', x - r - d - (!center ? bb.width : bb.width / 2)).rotate(180, x, y);

    return p.insertBefore(this.node ? this : this[0]);
};

Raphael.el.flag = function (x, y, angle) {
    var d = 3,
        p = this.paper.path().attr({ fill: '#000', stroke: '#000' }),
        bb = this.getBBox(),
        h = bb.height / 2,
        center;

    switch (this.type) {
        case 'text':
        case 'circle':
        case 'ellipse': center = true; break;
        default: center = false;
    }

    angle = angle || 0;
    x = x || (center ? bb.x + bb.width / 2 : bb.x);
    y = y || (center ? bb.y + bb.height / 2: bb.y);

    p.attr({
        path: [
            "M", x, y,
            "l", h + d, -h - d, bb.width + 2 * d, 0, 0, bb.height + 2 * d, -bb.width - 2 * d, 0,
            "z"
        ].join(",")
    });

    this.attr(this.attrs.x ? 'x' : 'cx', x + h + d + (!center ? this.type == 'text' ? bb.width : 0 : bb.width / 2)).attr('y', center ? y : y - bb.height / 2);
    angle = 360 - angle;
    this.rotate(angle, x, y);
    p.rotate(angle, x, y);
    angle > 90 && angle < 270 && this.attr(this.attrs.x ? 'x' : 'cx', x - h - d - (!center ? bb.width : bb.width / 2)).rotate(180, x, y);

    return p.insertBefore(this.node ? this : this[0]);
};

Raphael.el.label = function () {
    var bb = this.getBBox(),
        r = Math.min(20, bb.width + 10, bb.height + 10) / 2;

    return this.paper.rect(bb.x - r / 2, bb.y - r / 2, bb.width + r, bb.height + r, r).attr({ stroke: 'none', fill: '#000' }).insertBefore(this.node ? this : this[0]);
};

/*
 * Tooltips on Paper prototype
 */
//label alias on the paper instance to create an easy text label
Raphael.fn.label = function (x, y, text) {
    var set = this.set();

    text = this.text(x, y, text).attr({ fill: '#fff', font: '12px Arial, sans-serif' });
    return set.push(text.label(), text);
};

//Popup alias on the paper instance to create an easy text popup
Raphael.fn.popup = function (x, y, text, dir, size) {
    var set = this.set();

    text = this.text(x, y, text).attr({ fill: '#fff', font: '12px Arial, sans-serif', 'font-family': 'Helvetica, Arial' });
    return set.push(text.popup(x, y, dir, size), text);
};

//tag alias on the paper instance to create an easy text tag
Raphael.fn.tag = function (x, y, text, angle, r) {
    var set = this.set();

    text = this.text(x, y, text).attr({ fill: '#fff', font: '12px Arial, sans-serif', 'font-family': 'Helvetica, Arial' });
    return set.push(text.tag(x, y, angle, r), text);
};

//flag alias on the paper instance to create an easy text flag
Raphael.fn.flag = function (x, y, text, angle) {
    var set = this.set();

    text = this.text(x, y, text).attr({fill: '#fff', font: '12px Arial, sans-serif', 'font-family': 'Helvetica, Arial'});
    return set.push(text.flag(x, y, angle), text);
};

Raphael.fn.drop = function (x, y, text, angle) {
    var set = this.set();

    text = this.text(x, y, text).attr({ fill: '#fff', font: '12px Arial, sans-serif', 'font-family': 'Helvetica, Arial' });
    return set.push(text.drop(x, y, angle), text);
};

//drop tooltip. can only be done with text at the moment, just like old graphel
Raphael.el.drop = function (x, y, angle) {
    var bb = this.getBBox(),
        center, size, p;

    switch (this.type) {
        case 'text':
        case 'circle':
        case 'ellipse': center = true; break;
        default: center = false;
    }

    angle = angle || 0;

    x = x || bb.x;
    y = y || bb.y;
    size = Math.max(bb.width, bb.height) + Math.min(bb.width, bb.height),
    p = this.paper.path([
        "M", x, y,
        "l", size, 0,
        "A", size * .4, size * .4, 0, 1, 0, x + size * .7, y - size * .7,
        "z"
    ]).attr({fill: "#000", stroke: "none"}).rotate(22.5 - angle, x, y);

    angle = (angle + 90) * Math.PI / 180;
    this.attr({ x: (x + size * Math.sin(angle)) - (center ? 0 : bb.width / 2), y: (y + size * Math.cos(angle)) - (center ? 0 : bb.height / 2) });

    return p.insertBefore(this.node ? this : this[0]);
};

//blob tooltip. can only be done with text at the moment, just like old graphael
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
