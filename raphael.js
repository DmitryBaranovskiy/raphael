/*
 * Raphael 0.7 - JavaScript Vector Library
 *
 * Copyright (c) 2008 – 2009 Dmitry Baranovskiy (http://raphaeljs.com)
 * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 */
function Raphael() {
    return Raphael._create.apply(Raphael, arguments);
};


(function (R) {
    R.version = "0.7";
    R.idGenerator = 0;
    R._ = {
        paper: {},
        element: {}
    };
    var availableAttrs = {cx: 0, cy: 0, fill: "#fff", "fill-opacity": 1, font: '16px "Arial"', "font-family": '"Arial"', "font-size": "16", gradient: 0, height: 0, opacity: 1, path: "M0,0", r: 0, rotation: 0, rx: 0, ry: 0, scale: "1 1", stroke: "#000", "stroke-dasharray": "", "stroke-linecap": "butt", "stroke-linejoin": "butt", "stroke-miterlimit": 0, "stroke-opacity": 1, "stroke-width": 1, translation: "0 0", width: 0, x: 0, y: 0},
        availableAnimAttrs = {cx: "number", cy: "number", fill: "colour", "fill-opacity": "number", "font-size": "number", height: "number", opacity: "number", path: "path", r: "number", rotation: "number", rx: "number", ry: "number", scale: "csv", stroke: "colour", "stroke-opacity": "number", "stroke-width": "number", translation: "csv", width: "number", x: "number", y: "number"};
    R._.paper.circle = function (x, y, r) {
        return R._.theCircle(this, x, y, r);
    };
    R._.paper.rect = function (x, y, w, h, r) {
        return R._.theRect(this, x, y, w, h, r);
    };
    R._.paper.ellipse = function (x, y, rx, ry) {
        return R._.theEllipse(this, x, y, rx, ry);
    };
    R._.paper.path = function (params, pathString) {
        return R._.thePath(params, pathString, this);
    };
    R._.paper.image = function (src, x, y, w, h) {
        return R._.theImage(this, src, x, y, w, h);
    };
    R._.paper.text = function (x, y, text) {
        return R._.theText(this, x, y, text);
    };
    R._.paper.group = function () {
        return this;
    };
    R._.paper.drawGrid = function (x, y, w, h, wv, hv, color) {
        color = color || "#000";
        var p = this.path({stroke: color, "stroke-width": 1})
                .moveTo(x, y).lineTo(x + w, y).lineTo(x + w, y + h).lineTo(x, y + h).lineTo(x, y),
            rowHeight = h / hv,
            columnWidth = w / wv;
        for (var i = 1; i < hv; i++) {
            p.moveTo(x, y + i * rowHeight).lineTo(x + w, y + i * rowHeight);
        }
        for (var i = 1; i < wv; i++) {
            p.moveTo(x + i * columnWidth, y).lineTo(x + i * columnWidth, y + h);
        }
        return p;
    };
    R._.element.stop = function () {
        clearTimeout(this.animation_in_progress);
    };
    R._.element.scale = function (x, y) {
        if (x == undefined && y == undefined) {
            return {x: this._.sx, y: this._.sy};
        }
        y = y || x;
        var dx, dy, cx, cy;
        if (x != 0 && !(x == 1 && y == 1)) {
            var dirx = Math.round(x / Math.abs(x)),
                diry = Math.round(y / Math.abs(y)),
                s = this.node.style;
            dx = this.attr("x");
            dy = this.attr("y");
            cx = this.attr("cx");
            cy = this.attr("cy");
            if (dirx != 1 || diry != 1) {
                if (this.transformations) {
                    this.transformations[2] = "scale(" + [dirx, diry] + ")";
                    this.node.setAttribute("transform", this.transformations.join(" "));
                    dx = (dirx < 0) ? -this.attr("x") - this.attrs.width * x * dirx / this._.sx : this.attr("x");
                    dy = (diry < 0) ? -this.attr("y") - this.attrs.height * y * diry / this._.sy : this.attr("y");
                    cx = this.attr("cx") * dirx;
                    cy = this.attr("cy") * diry;
                } else {
                    this.node.filterMatrix = " progid:DXImageTransform.Microsoft.Matrix(M11=" + dirx +
                        ", M12=0, M21=0, M22=" + diry +
                        ", Dx=0, Dy=0, sizingmethod='auto expand', filtertype='bilinear')";
                    s.filter = (this.node.filterMatrix || "") + (this.node.filterOpacity || "");
                }
            } else {
                if (this.transformations) {
                    this.transformations[2] = "";
                    this.node.setAttribute("transform", this.transformations.join(" "));
                } else {
                    this.node.filterMatrix = "";
                    s.filter = (this.node.filterMatrix || "") + (this.node.filterOpacity || "");
                }
            }
            switch (this.type) {
                case "rect":
                case "image":
                    this.attr({
                        width: this.attrs.width * x * dirx / this._.sx,
                        height: this.attrs.height * y * diry / this._.sy,
                        x: dx,
                        y: dy
                    });
                    break;
                case "circle":
                case "ellipse":
                    this.attr({
                        rx: this.attrs.rx * x * dirx / this._.sx,
                        ry: this.attrs.ry * y * diry / this._.sy,
                        r: this.attrs.r * x * diry / this._.sx,
                        cx: cx,
                        cy: cy
                    });
                    break;
                case "path":
                    var path = Raphael.pathToRelative(Raphael.parsePathString(this.attr("path"))), 
                        skip = true,
                        dim = Raphael.pathDimensions(this.attrs.path),
                        dx = -dim.width * (x - 1) / 2,
                        dy = -dim.height * (y - 1) / 2;
                    for (var i = 0, ii = path.length; i < ii; i++) {
                        if (path[i][0].toUpperCase() == "M" && skip) {
                            continue;
                        } else {
                            skip = false;
                        }
                        if (path[i][0].toUpperCase() == "A") {
                            path[i][path[i].length - 2] *= x * dirx;
                            path[i][path[i].length - 1] *= y * diry;
                        } else {
                            for (var j = 1, jj = path[i].length; j < jj; j++) {
                                path[i][j] *= (j % 2) ? x * dirx / this._.sx : y * diry / this._.sy;
                            }
                        }
                    }
                    var dim2 = Raphael.pathDimensions(path),
                        dx = dim.x + dim.width / 2 - dim2.x - dim2.width / 2,
                        dy = dim.y + dim.height / 2 - dim2.y - dim2.height / 2;
                    path = Raphael.pathToRelative(path);
                    path[0][1] += dx;
                    path[0][2] += dy;
                    
                    this.attr({path: path.join(" ")});
            }
        }
        this._.sx = x;
        this._.sy = y;
        return this;
    };
    R._.element.animate = function (params, ms, callback) {
        clearTimeout(this.animation_in_progress);
        var from = {}, to = {}, diff = {}, t = {x: 0, y: 0};
        for (var attr in params) {
            if (attr in availableAnimAttrs) {
                from[attr] = this.attr(attr);
                if (typeof from[attr] == "undefined") {
                    from[attr] = availableAttrs[attr];
                }
                to[attr] = params[attr];
                switch (availableAnimAttrs[attr]) {
                    case "number":
                        diff[attr] = (to[attr] - from[attr]) / ms;
                        break;
                    case "colour":
                        from[attr] = Raphael.getRGB(from[attr]);
                        var toColour = Raphael.getRGB(to[attr]);
                        diff[attr] = {
                            r: (toColour.r - from[attr].r) / ms,
                            g: (toColour.g - from[attr].g) / ms,
                            b: (toColour.b - from[attr].b) / ms
                        };
                        break;
                    case "path":
                        var pathes = Raphael.pathEqualiser(from[attr], to[attr]);
                        from[attr] = pathes[0];
                        to[attr] = pathes[1];
                        diff[attr] = [];
                        for (var i = 0, ii = from[attr].length; i < ii; i++) {
                            diff[attr][i] = [0];
                            for (var j = 1, jj = from[attr][i].length; j < jj; j++) {
                                diff[attr][i][j] = (to[attr][i][j] - from[attr][i][j]) / ms;
                            }
                        }
                        break;
                    case "csv":
                        var values = params[attr].split(/[, ]+/);
                        if (attr == "translation") {
                            from[attr] = [0, 0];
                            diff[attr] = [values[0] / ms, values[1] / ms];
                        } else {
                            from[attr] = from[attr].split(/[, ]+/);
                            diff[attr] = [(values[0] - from[attr][0]) / ms, (values[1] - from[attr][0]) / ms];
                        }
                        to[attr] = values;
                }
            }
        }
        var start = new Date(),
            prev = 0,
            that = this;
        (function () {
            var time = (new Date()).getTime() - start.getTime(),
                set = {},
                now;
            if (time < ms) {
                for (var attr in from) {
                    switch (availableAnimAttrs[attr]) {
                        case "number":
                            now = +from[attr] + time * diff[attr];
                            break;
                        case "colour":
                            now = "rgb(" + [
                                Math.round(from[attr].r + time * diff[attr].r),
                                Math.round(from[attr].g + time * diff[attr].g),
                                Math.round(from[attr].b + time * diff[attr].b)
                            ].join(",") + ")";
                            break;
                        case "path":
                            now = [];
                            for (var i = 0, ii = from[attr].length; i < ii; i++) {
                                now[i] = [from[attr][i][0]];
                                for (var j = 1, jj = from[attr][i].length; j < jj; j++) {
                                    now[i][j] = from[attr][i][j] + time * diff[attr][i][j];
                                }
                                now[i] = now[i].join(" ");
                            }
                            now = now.join(" ");
                            break;
                        case "csv":
                            if (attr == "translation") {
                                var x = diff[attr][0] * (time - prev),
                                    y = diff[attr][1] * (time - prev);
                                t.x += x;
                                t.y += y;
                                now = [x, y].join(" ");
                            } else {
                                now = [+from[attr][0] + time * diff[attr][0], +from[attr][1] + time * diff[attr][1]].join(" ");
                            }
                            break;
                    }
                    if (attr == "font-size") {
                        set[attr] = now + "px";
                    } else {
                        set[attr] = now;
                    }
                }
                that.attr(set);
                that.animation_in_progress = setTimeout(arguments.callee, 0);
                R._.paper.safari();
            } else {
                if (t.x || t.y) {
                    that.translate(-t.x, -t.y);
                }
                that.attr(params);
                clearTimeout(that.animation_in_progress);
                R._.paper.safari();
                (typeof callback == "function") && callback.call(that);
            }
            prev = time;
        })();
        return this;
    };
    R._.paper.pathfinder = function (p, path) {
        var commands = {
            M: function (x, y) {
                this.moveTo(x, y);
            },
            C: function (x1, y1, x2, y2, x3, y3) {
                this.curveTo(x1, y1, x2, y2, x3, y3);
            },
            Q: function (x1, y1, x2, y2) {
                this.qcurveTo(x1, y1, x2, y2);
            },
            T: function (x, y) {
                this.qcurveTo(x, y);
            },
            S: function (x1, y1, x2, y2) {
                p.curveTo(x1, y1, x2, y2);
            },
            L: function (x, y) {
                p.lineTo(x, y);
            },
            H: function (x) {
                this.lineTo(x, this.last.y);
            },
            V: function (y) {
                this.lineTo(this.last.x, y);
            },
            A: function (rx, ry, xaxisrotation, largearcflag, sweepflag, x, y) {
                this.arcTo(rx, ry, largearcflag, sweepflag, x, y);
            },
            Z: function () {
                this.andClose();
            }
        };

        path = Raphael.pathToAbsolute(path);
        for (var i = 0, ii = path.length; i < ii; i++) {
            var b = path[i].shift();
            commands[b].apply(p, path[i]);
        }
    };

    R.toString = function () {
        return  "Your browser " + (this.vml ? "doesn't ": "") + "support" + (this.svg ? "s": "") +
                " SVG.\nYou are running " + unescape("Rapha%EBl%20") + this.version;
    };
    // generic utilities
    R.hsb2rgb = function (hue, saturation, brightness) {
        if (typeof hue == "object" && "h" in hue && "s" in hue && "b" in hue) {
            brightness = hue.b;
            saturation = hue.s;
            hue = hue.h;
        }
        var red,
            green,
            blue;
        if (brightness == 0) {
            return {r: 0, g: 0, b: 0, hex: "#000"};
        } else {
            var i = Math.floor(hue * 6),
                f = (hue * 6) - i,
                p = brightness * (1 - saturation),
                q = brightness * (1 - (saturation * f)),
                t = brightness * (1 - (saturation * (1 - f)));
            [
                function () {red = brightness; green = t; blue = p;},
                function () {red = q; green = brightness; blue = p;},
                function () {red = p; green = brightness; blue = t;},
                function () {red = p; green = q; blue = brightness;},
                function () {red = t; green = p; blue = brightness;},
                function () {red = brightness; green = p; blue = q;},
                function () {red = brightness; green = t; blue = p;}
            ][i]();
        }
        var rgb = {r: red, g: green, b: blue};
        red *= 255;
        green *= 255;
        blue *= 255;
        var r = Math.round(red).toString(16);
        if (r.length == 1) {
            r = "0" + r;
        }
        var g = Math.round(green).toString(16);
        if (g.length == 1) {
            g = "0" + g;
        }
        var b = Math.round(blue).toString(16);
        if (b.length == 1) {
            b = "0" + b;
        }
        rgb.hex = "#" + r + g + b;
        return rgb;
    };
    R.rgb2hsb = function (red, green, blue) {
        if (typeof red == "object" && "r" in red && "g" in red && "b" in red) {
            blue = red.b;
            green = red.g;
            red = red.r;
        }
        if (typeof red == "string" && red.charAt(0) == "#") {
            if (red.length == 4) {
                blue = parseInt(red.substring(3), 16);
                green = parseInt(red.substring(2, 3), 16);
                red = parseInt(red.substring(1, 2), 16);
            } else {
                blue = parseInt(red.substring(5), 16);
                green = parseInt(red.substring(3, 5), 16);
                red = parseInt(red.substring(1, 3), 16);
            }
        }
        if (red > 1 || green > 1 || blue > 1) {
            red /= 255;
            green /= 255;
            blue /= 255;
        }
        var max = Math.max(red, green, blue),
            min = Math.min(red, green, blue),
            hue,
            saturation,
            brightness = max;
        if (min == max) {
            return {h: 0, s: 0, b: max};
        } else {
            var delta = (max - min);
            saturation = delta / max;
            if (red == max) {
                hue = (green - blue) / delta;
            } else if (green == max) {
                hue = 2 + ((blue - red) / delta);
            } else {
                hue = 4 + ((red - green) / delta);
            }
            hue /= 6;
            if (hue < 0) {
                hue += 1;
            }
            if (hue > 1) {
                hue -= 1;
            }
        }
        return {h: hue, s: saturation, b: brightness};
    };
    R.getRGB = function (colour) {
        var red, green, blue,
            rgb = colour.match(/^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgb\(\s*(\d+,\s*\d+,\s*\d+)\s*\)|rgb\(\s*(\d+%,\s*\d+%,\s*\d+%)\s*\)|hsb\(\s*(\d+,\s*\d+,\s*\d+)\s*\)|hsb\(\s*(\d+%,\s*\d+%,\s*\d+%)\s*\))\s*$/i);
        if (rgb) {
            if (rgb[2]) {
                blue = parseInt(rgb[2].substring(5), 16);
                green = parseInt(rgb[2].substring(3, 5), 16);
                red = parseInt(rgb[2].substring(1, 3), 16);
            }
            if (rgb[3]) {
                blue = parseInt(rgb[3].substring(3) + rgb[3].substring(3), 16);
                green = parseInt(rgb[3].substring(2, 3) + rgb[3].substring(2, 3), 16);
                red = parseInt(rgb[3].substring(1, 2) + rgb[3].substring(1, 2), 16);
            }
            if (rgb[4]) {
                rgb = rgb[4].split(/\s*,\s*/);
                red = parseInt(rgb[0], 10);
                green = parseInt(rgb[1], 10);
                blue = parseInt(rgb[2], 10);
            }
            if (rgb[5]) {
                rgb = rgb[5].split(/\s*,\s*/);
                red = parseInt(rgb[0], 10) * 2.55;
                green = parseInt(rgb[1], 10) * 2.55;
                blue = parseInt(rgb[2], 10) * 2.55;
            }
            if (rgb[6]) {
                rgb = rgb[6].split(/\s*,\s*/);
                red = parseInt(rgb[0], 10);
                green = parseInt(rgb[1], 10);
                blue = parseInt(rgb[2], 10);
                return this.hsb2rgb(red, green, blue);
            }
            if (rgb[7]) {
                rgb = rgb[7].split(/\s*,\s*/);
                red = parseInt(rgb[0], 10) * 2.55;
                green = parseInt(rgb[1], 10) * 2.55;
                blue = parseInt(rgb[2], 10) * 2.55;
                return this.hsb2rgb(red, green, blue);
            }
            var rgb = {r: red, g: green, b: blue};
            var r = Math.round(red).toString(16);
            (r.length == 1) && (r = "0" + r);
            var g = Math.round(green).toString(16);
            (g.length == 1) && (g = "0" + g);
            var b = Math.round(blue).toString(16);
            (b.length == 1) && (b = "0" + b);
            rgb.hex = "#" + r + g + b;
            return rgb;
        }
    };
    R.getColor = function (value) {
        var start = arguments.callee.start = arguments.callee.start || {h: 0, s: 1, b: value || .75};
        var rgb = this.hsb2rgb(start.h, start.s, start.b);
        start.h += .075;
        if (start.h > 1) {
            start.h = 0;
            start.s -= .2;
            if (start.s <= 0) {
                arguments.callee.start = {h: 0, s: 1, b: start.b};
            }
        }
        return rgb.hex;
    };
    R.getColor.reset = function () {
        this.start = undefined;
    };
    R.parsePathString = function (pathString) {
        var paramCounts = {a: 7, c: 6, h: 1, l: 2, m: 2, q: 4, s: 4, t: 2, v: 1, z: 0},
            data = [],
            toString = function () {
                var res = "";
                for (var i = 0, ii = this.length; i < ii; i++) {
                    res += this[i][0] + this[i].join(",").substring(2);
                }
                return res;
            };
        if (pathString.toString.toString() == toString.toString()) {
            return pathString;
        }
        pathString.replace(/([achlmqstvz])[\s,]*((-?\d*\.?\d*\s*,?\s*)+)/ig, function (a, b, c) {
            var params = [], name = b.toLowerCase();
            c.replace(/(-?\d*\.?\d*)\s*,?\s*/ig, function (a, b) {
                b && params.push(+b);
            });
            while (params.length >= paramCounts[name]) {
                data.push([b].concat(params.splice(0, paramCounts[name])));
                if (!paramCounts[name]) {
                    break;
                };
            }
        });
        data.toString = toString;
        return data;
    };
    R.pathDimensions = function (path) {
        var pathArray = path;
        if (typeof path == "string") {
            pathArray = this.parsePathString(path);
        }
        pathArray = this.pathToAbsolute(pathArray);
        var x = [], y = [], length = 0;
        for (var i = 0, ii = pathArray.length; i < ii; i++) {
            switch (pathArray[i][0]) {
                case "Z":
                    break;
                case "A":
                    x.push(pathArray[i][pathArray[i].length - 2]);
                    y.push(pathArray[i][pathArray[i].length - 1]);
                    break;
                default:
                    for (var j = 1, jj = pathArray[i].length; j < jj; j++) {
                        if (j % 2) {
                            x.push(pathArray[i][j]);
                        } else {
                            y.push(pathArray[i][j]);
                        }
                    }
            }
        }
        var minx = Math.min.apply(Math, x),
            miny = Math.min.apply(Math, y);
        return {
            x: minx,
            y: miny,
            width: Math.max.apply(Math, x) - minx,
            height: Math.max.apply(Math, y) - miny,
            X: x,
            Y: y
        };
    };
    R.pathToRelative = function (pathArray) {
        var res = [];
        if (typeof pathArray == "string") {
            pathArray = this.parsePathString(pathArray);
        }
        var x = 0, y = 0, start = 0;
        if (pathArray[0][0] == "M") {
            x = pathArray[0][1];
            y = pathArray[0][2];
            start++;
            res.push(pathArray[0]);
        }
        for (var i = start, ii = pathArray.length; i < ii; i++) {
            res[i] = [];
            if (pathArray[i][0] != pathArray[i][0].toLowerCase()) {
                res[i][0] = pathArray[i][0].toLowerCase();
                switch (res[i][0]) {
                    case "a":
                        res[i][1] = pathArray[i][1];
                        res[i][2] = pathArray[i][2];
                        res[i][3] = 0;
                        res[i][4] = pathArray[i][4];
                        res[i][5] = pathArray[i][5];
                        res[i][6] = +(pathArray[i][6] - x).toFixed(3);
                        res[i][7] = +(pathArray[i][7] - y).toFixed(3);
                        break;
                    case "v":
                        res[i][1] = +(pathArray[i][1] - y).toFixed(3);
                        break;
                    default:
                        for (var j = 1, jj = pathArray[i].length; j < jj; j++) {
                            res[i][j] = +(pathArray[i][j] - ((j % 2) ? x : y)).toFixed(3);
                        }
                }
            } else {
                res[i] = pathArray[i];
            }
            switch (res[i][0]) {
                case "z":
                    break;
                case "h": 
                    x += res[i][res[i].length - 1];
                    break;
                case "v":
                    y += res[i][res[i].length - 1];
                    break;
                default:
                    x += res[i][res[i].length - 2];
                    y += res[i][res[i].length - 1];
            }
        }
        res.toString = pathArray.toString;
        return res;
    };
    R.pathToAbsolute = function (pathArray) {
        var res = [];
        if (typeof pathArray == "string") {
            pathArray = this.parsePathString(pathArray);
        }
        var x = 0, y = 0, start = 0;
        if (pathArray[0][0] == "M") {
            x = +pathArray[0][1];
            y = +pathArray[0][2];
            start++;
            res[0] = pathArray[0];
        }
        for (var i = start, ii = pathArray.length; i < ii; i++) {
            res[i] = [];
            if (pathArray[i][0] != pathArray[i][0].toUpperCase()) {
                res[i][0] = pathArray[i][0].toUpperCase();
                switch (res[i][0]) {
                    case "A":
                        res[i][1] = pathArray[i][1];
                        res[i][2] = pathArray[i][2];
                        res[i][3] = 0;
                        res[i][4] = pathArray[i][4];
                        res[i][5] = pathArray[i][5];
                        res[i][6] = +(pathArray[i][6] + x).toFixed(3);
                        res[i][7] = +(pathArray[i][7] + y).toFixed(3);
                        break;
                    case "V":
                        res[i][1] = +pathArray[i][1] + y;
                        break;
                    default:
                        for (var j = 1, jj = pathArray[i].length; j < jj; j++) {
                            res[i][j] = +pathArray[i][j] + ((j % 2) ? x : y);
                        }
                }
            } else {
                res[i] = pathArray[i];
            }
            switch (res[i][0]) {
                case "Z":
                    break;
                case "H": 
                    x = res[i][1];
                    break;
                case "V":
                    y = res[i][1];
                    break;
                default:
                    x = res[i][res[i].length - 2];
                    y = res[i][res[i].length - 1];
            }
        }
        res.toString = pathArray.toString;
        return res;
    };
    R.pathEqualiser = function (path1, path2) {
        var data = [this.pathToAbsolute(this.parsePathString(path1)), this.pathToAbsolute(this.parsePathString(path2))],
            attrs = [{x: 0, y: 0, bx: 0, by: 0, X: 0, Y: 0}, {x: 0, y: 0, bx: 0, by: 0, X: 0, Y: 0}],
            processPath = function (path, d) {
                if (!path) {
                    return ["U"];
                }
                switch (path[0]) {
                    case "M":
                        d.X = path[1];
                        d.Y = path[2];
                        break;
                    case "S":
                        var nx = d.x + (d.x - (d.bx || d.x));
                        var ny = d.y + (d.y - (d.by || d.y));
                        path = ["C", nx, ny, path[1], path[2], path[3], path[4]];
                        break;
                    case "T":
                        var nx = d.x + (d.x - (d.bx || d.x));
                        var ny = d.y + (d.y - (d.by || d.y));
                        path = ["Q", nx, ny, path[1], path[2]];
                        break;
                    case "H":
                        path = ["L", path[1], d.y];
                        break;
                    case "V":
                        path = ["L", d.x, path[1]];
                        break;
                    case "Z":
                        path = ["L", d.X, d.Y];
                        break;
                }
                return path;
            },
            edgeCases = function (a, b, i) {
                if (data[a][i][0] == "M" && data[b][i][0] != "M") {
                    data[b].splice(i, 0, ["M", attrs[b].x, attrs[b].y]);
                    attrs[a].bx = data[a][i][data[a][i].length - 4] || 0;
                    attrs[a].by = data[a][i][data[a][i].length - 3] || 0;
                    attrs[a].x = data[a][i][data[a][i].length - 2];
                    attrs[a].y = data[a][i][data[a][i].length - 1];
                    return true;
                } else if (data[a][i][0] == "L" && data[b][i][0] == "C") {
                    data[a][i] = ["C", attrs[a].x, attrs[a].y, data[a][i][1], data[a][i][2], data[a][i][1], data[a][i][2]];
                } else if (data[a][i][0] == "L" && data[b][i][0] == "Q") {
                    data[a][i] = ["Q", data[a][i][1], data[a][i][2], data[a][i][1], data[a][i][2]];
                } else if (data[a][i][0] == "Q" && data[b][i][0] == "C") {
                    var x = data[b][i][data[b][i].length - 2];
                    var y = data[b][i][data[b][i].length - 1];
                    data[b].splice(i + 1, 0, ["Q", x, y, x, y]);
                    data[a].splice(i, 0, ["C", attrs[a].x, attrs[a].y, attrs[a].x, attrs[a].y, attrs[a].x, attrs[a].y]);
                    i++;
                    attrs[b].bx = data[b][i][data[b][i].length - 4] || 0;
                    attrs[b].by = data[b][i][data[b][i].length - 3] || 0;
                    attrs[b].x = data[b][i][data[b][i].length - 2];
                    attrs[b].y = data[b][i][data[b][i].length - 1];
                    return true;
                } else if (data[a][i][0] == "A" && data[b][i][0] == "C") {
                    var x = data[b][i][data[b][i].length - 2];
                    var y = data[b][i][data[b][i].length - 1];
                    data[b].splice(i + 1, 0, ["A", 0, 0, data[a][i][3], data[a][i][4], data[a][i][5], x, y]);
                    data[a].splice(i, 0, ["C", attrs[a].x, attrs[a].y, attrs[a].x, attrs[a].y, attrs[a].x, attrs[a].y]);
                    i++;
                    attrs[b].bx = data[b][i][data[b][i].length - 4] || 0;
                    attrs[b].by = data[b][i][data[b][i].length - 3] || 0;
                    attrs[b].x = data[b][i][data[b][i].length - 2];
                    attrs[b].y = data[b][i][data[b][i].length - 1];
                    return true;
                } else if (data[a][i][0] == "U") {
                    data[a][i][0] = data[b][i][0];
                    for (var j = 1, jj = data[b][i].length; j < jj; j++) {
                        data[a][i][j] = (j % 2) ? attrs[a].x : attrs[a].y;
                    }
                }
                return false;
            };
        for (var i = 0; i < Math.max(data[0].length, data[1].length); i++) {
            data[0][i] = processPath(data[0][i], attrs[0]);
            data[1][i] = processPath(data[1][i], attrs[1]);
            if (data[0][i][0] != data[1][i][0] && (edgeCases(0, 1, i) || edgeCases(1, 0, i))) {
                continue;
            }
            attrs[0].bx = data[0][i][data[0][i].length - 4] || 0;
            attrs[0].by = data[0][i][data[0][i].length - 3] || 0;
            attrs[0].x = data[0][i][data[0][i].length - 2];
            attrs[0].y = data[0][i][data[0][i].length - 1];
            attrs[1].bx = data[1][i][data[1][i].length - 4] || 0;
            attrs[1].by = data[1][i][data[1][i].length - 3] || 0;
            attrs[1].x = data[1][i][data[1][i].length - 2];
            attrs[1].y = data[1][i][data[1][i].length - 1];
        }
        return data;
    };

    var script = document.getElementsByTagName("script"),
        newscript = document.createElement("script");
    script = script[script.length - 1];
    newscript.type = "text/javascript";
    newscript.src = window.SVGAngle ? "raphael-svg.js" : "raphael-vml.js";
    script.parentNode.appendChild(newscript);
})(Raphael);
