Raphael.el.isAbsolute = true;
Raphael.el.absolutely = function () {
    if (this.type != "path") {
        return this;
    }
    this.isAbsolute = true;
    return this;
};
Raphael.el.relatively = function () {
    if (this.type != "path") {
        return this;
    }
    this.isAbsolute = false;
    return this;
};
Raphael.el.moveTo = function (x, y) {
    if (this.type != "path") {
        return this;
    }
    var d = this.isAbsolute ? "M" : "m";
    d += +parseFloat(x).toFixed(3) + " " + (+parseFloat(y).toFixed(3)) + " ";
    this.attr({path: this.attrs.path + d});
    return this;
};
Raphael.el.lineTo = function (x, y) {
    if (this.type != "path") {
        return this;
    }
    var d = this.isAbsolute ? "L" : "l";
    d += +parseFloat(x).toFixed(3) + " " + (+parseFloat(y).toFixed(3)) + " ";
    this.attr({path: this.attrs.path + d});
    return this;
};
Raphael.el.arcTo = function (rx, ry, large_arc_flag, sweep_flag, x, y) {
    if (this.type != "path") {
        return this;
    }
    var d = this.isAbsolute ? "A" : "a";
    d += [+parseFloat(rx).toFixed(3), +parseFloat(ry).toFixed(3), 0, large_arc_flag, sweep_flag, +parseFloat(x).toFixed(3), +parseFloat(y).toFixed(3)].join(" ");
    this.attr({path: this.attrs.path + d});
    return this;
};
Raphael.el.curveTo = function () {
    if (this.type != "path") {
        return this;
    }
    var args = Array.prototype.splice.call(arguments, 0, arguments.length),
        d = [0, 0, 0, 0, "s", 0, "c"][args.length] || "";
    if (this.isAbsolute) {
        d = d.toUpperCase();
    }
    this.attr({path: this.attrs.path + d + args});
    return this;
};
Raphael.el.qcurveTo = function () {
    if (this.type != "path") {
        return this;
    }
    var d = [0, 1, "t", 3, "q"][arguments.length],
        args = Array.prototype.splice.call(arguments, 0, arguments.length);
    if (this.isAbsolute) {
        d = d.toUpperCase();
    }
    this.attr({path: this.attrs.path + d + args});
    return this;
};
Raphael.el.addRoundedCorner = function (r, dir) {
    if (this.type != "path") {
        return this;
    }
    var rollback = this.isAbsolute,
        o = this;
    if (rollback) {
        this.relatively();
        rollback = function () {
            o.absolutely();
        };
    } else {
        rollback = function () {};
    }
    this.arcTo(r, r, 0, {"lu": 1, "rd": 1, "ur": 1, "dl": 1}[dir] || 0, r * (!!(dir.indexOf("r") + 1) * 2 - 1), r * (!!(dir.indexOf("d") + 1) * 2 - 1));
    rollback();
    return this;
};
Raphael.el.andClose = function () {
    if (this.type != "path") {
        return this;
    }
    this.attr({path: this.attrs.path + "z"});
    return this;
};