/*
 * Raphael 0.7 - JavaScript Vector Library
 *
 * Copyright (c) 2008 – 2009 Dmitry Baranovskiy (http://raphaeljs.com)
 * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 */
(function (R) {
    if (R == null) {
        throw new Error("raphael-svg.js should not be included into HTML. It has to be loaded with raphael.js");
    }
    R.type = "SVG";
    R.vml = false;
    R.svg = true;
    R._.thePath = function (params, pathString, SVG) {
        var el = document.createElementNS(SVG.svgns, "path");
        el.setAttribute("fill", "none");
        if (SVG.canvas) {
            SVG.canvas.appendChild(el);
        }
        var p = new Element(el, SVG);
        p.isAbsolute = true;
        p.type = "path";
        p.last = {x: 0, y: 0, bx: 0, by: 0};
        p.absolutely = function () {
            this.isAbsolute = true;
            return this;
        };
        p.relatively = function () {
            this.isAbsolute = false;
            return this;
        };
        p.moveTo = function (x, y) {
            var d = this.isAbsolute?"M":"m";
            d += parseFloat(x, 10).toFixed(3) + " " + parseFloat(y, 10).toFixed(3) + " ";
            var oldD = this[0].getAttribute("d") || "";
            (oldD == "M0,0") && (oldD = "");
            this[0].setAttribute("d", oldD + d);
            this.last.x = (this.isAbsolute ? 0 : this.last.x) + parseFloat(x, 10);
            this.last.y = (this.isAbsolute ? 0 : this.last.y) + parseFloat(y, 10);
            this.attrs.path = oldD + d;
            return this;
        };
        p.lineTo = function (x, y) {
            this.last.x = (this.isAbsolute ? 0 : this.last.x) + parseFloat(x, 10);
            this.last.y = (this.isAbsolute ? 0 : this.last.y) + parseFloat(y, 10);
            var d = this.isAbsolute?"L":"l";
            d += parseFloat(x, 10).toFixed(3) + " " + parseFloat(y, 10).toFixed(3) + " ";
            var oldD = this[0].getAttribute("d") || "";
            this[0].setAttribute("d", oldD + d);
            this.attrs.path = oldD + d;
            return this;
        };
        p.arcTo = function (rx, ry, large_arc_flag, sweep_flag, x, y) {
            var d = this.isAbsolute ? "A" : "a";
            d += [parseFloat(rx, 10).toFixed(3), parseFloat(ry, 10).toFixed(3), 0, large_arc_flag, sweep_flag, parseFloat(x, 10).toFixed(3), parseFloat(y, 10).toFixed(3)].join(" ");
            var oldD = this[0].getAttribute("d") || "";
            this[0].setAttribute("d", oldD + d);
            this.last.x = parseFloat(x, 10);
            this.last.y = parseFloat(y, 10);
            this.attrs.path = oldD + d;
            return this;
        };
        p.cplineTo = function (x1, y1, w1) {
            if (!w1) {
                return this.lineTo(x1, y1);
            } else {
                var p = {};
                var x = parseFloat(x1, 10);
                var y = parseFloat(y1, 10);
                var w = parseFloat(w1, 10);
                var d = this.isAbsolute?"C":"c";
                var attr = [+this.last.x + w, +this.last.y, x - w, y, x, y];
                for (var i = 0, ii = attr.length; i < ii; i++) {
                    d += attr[i].toFixed(3) + " ";
                }
                this.last.x = (this.isAbsolute ? 0 : this.last.x) + attr[4];
                this.last.y = (this.isAbsolute ? 0 : this.last.y) + attr[5];
                this.last.bx = attr[2];
                this.last.by = attr[3];
                var oldD = this[0].getAttribute("d") || "";
                this[0].setAttribute("d", oldD + d);
                this.attrs.path = oldD + d;
                return this;
            }
        };
        p.curveTo = function () {
            var p = {},
                command = [0, 1, 2, 3, "s", 5, "c"];

            var d = command[arguments.length];
            if (this.isAbsolute) {
                d = d.toUpperCase();
            }
            for (var i = 0, ii = arguments.length; i < ii; i++) {
                d += parseFloat(arguments[i], 10).toFixed(3) + " ";
            }
            this.last.x = (this.isAbsolute ? 0 : this.last.x) + parseFloat(arguments[arguments.length - 2], 10);
            this.last.y = (this.isAbsolute ? 0 : this.last.y) + parseFloat(arguments[arguments.length - 1], 10);
            this.last.bx = parseFloat(arguments[arguments.length - 4], 10);
            this.last.by = parseFloat(arguments[arguments.length - 3], 10);
            var oldD = this.node.getAttribute("d") || "";
            this.node.setAttribute("d", oldD + d);
            this.attrs.path = oldD + d;
            return this;
        };
        p.qcurveTo = function () {
            var p = {},
                command = [0, 1, "t", 3, "q"];

            var d = command[arguments.length];
            if (this.isAbsolute) {
                d = d.toUpperCase();
            }
            for (var i = 0, ii = arguments.length; i < ii; i++) {
                d += parseFloat(arguments[i], 10).toFixed(3) + " ";
            }
            this.last.x = (this.isAbsolute ? 0 : this.last.x) + parseFloat(arguments[arguments.length - 2], 10);
            this.last.y = (this.isAbsolute ? 0 : this.last.y) + parseFloat(arguments[arguments.length - 1], 10);
            if (arguments.length != 2) {
                this.last.qx = parseFloat(arguments[arguments.length - 4], 10);
                this.last.qy = parseFloat(arguments[arguments.length - 3], 10);
            }
            var oldD = this.node.getAttribute("d") || "";
            this.node.setAttribute("d", oldD + d);
            this.attrs.path = oldD + d;
            return this;
        };
        p.addRoundedCorner = function (r, dir) {
            var R = .5522 * r, rollback = this.isAbsolute, o = this;
            if (rollback) {
                this.relatively();
                rollback = function () {
                    o.absolutely();
                };
            } else {
                rollback = function () {};
            }
            var actions = {
                l: function () {
                    return {
                        u: function () {
                            o.curveTo(-R, 0, -r, -(r - R), -r, -r);
                        },
                        d: function () {
                            o.curveTo(-R, 0, -r, r - R, -r, r);
                        }
                    };
                },
                r: function () {
                    return {
                        u: function () {
                            o.curveTo(R, 0, r, -(r - R), r, -r);
                        },
                        d: function () {
                            o.curveTo(R, 0, r, r - R, r, r);
                        }
                    };
                },
                u: function () {
                    return {
                        r: function () {
                            o.curveTo(0, -R, -(R - r), -r, r, -r);
                        },
                        l: function () {
                            o.curveTo(0, -R, R - r, -r, -r, -r);
                        }
                    };
                },
                d: function () {
                    return {
                        r: function () {
                            o.curveTo(0, R, -(R - r), r, r, r);
                        },
                        l: function () {
                            o.curveTo(0, R, R - r, r, -r, r);
                        }
                    };
                }
            };
            actions[dir[0]]()[dir[1]]();
            rollback();
            return o;
        };
        p.andClose = function () {
            var oldD = this[0].getAttribute("d") || "";
            this[0].setAttribute("d", oldD + "Z ");
            this.attrs.path = oldD + "Z ";
            return this;
        };
        if (pathString) {
            p.attrs.path = "" + pathString;
            p.absolutely();
            R._.paper.pathfinder(p, p.attrs.path);
        }
        if (params) {
            R._.setFillAndStroke(p, params);
        }
        return p;
    };
    R._.addGrdientFill = function (o, gradient, SVG) {
        var el = document.createElementNS(SVG.svgns, gradient.type + "Gradient");
        el.id = "raphael-gradient-" + Raphael.idGenerator++;
        if (gradient.vector && gradient.vector.length) {
            el.setAttribute("x1", gradient.vector[0]);
            el.setAttribute("y1", gradient.vector[1]);
            el.setAttribute("x2", gradient.vector[2]);
            el.setAttribute("y2", gradient.vector[3]);
        }
        SVG.defs.appendChild(el);
        for (var i = 0, ii = gradient.dots.length; i < ii; i++) {
            var stop = document.createElementNS(SVG.svgns, "stop");
            stop.setAttribute("offset", gradient.dots[i].offset ? gradient.dots[i].offset : (i == 0) ? "0%" : "100%");
            stop.setAttribute("stop-color", gradient.dots[i].color || "#fff");
            if (typeof gradient.dots[i].opacity != "undefined") {
                stop.setAttribute("stop-opacity", gradient.dots[i].opacity);
            }
            el.appendChild(stop);
        };
        o.setAttribute("fill", "url(#" + el.id + ")");
    };
    R._.updatePosition = function (o) {
        if (o.pattern) {
            var bbox = o.node.getBBox();
            o.pattern.setAttribute("patternTransform", "translate(" + [bbox.x, bbox.y].join(",") + ")");
        }
    };
    R._.setFillAndStroke = function (o, params) {
        var dasharray = {
            "-": [3, 1],
            ".": [1, 1],
            "-.": [3, 1, 1, 1],
            "-..": [3, 1, 1, 1, 1, 1],
            ". ": [1, 3],
            "- ": [4, 3],
            "--": [8, 3],
            "- .": [4, 3, 1, 3],
            "--.": [8, 3, 1, 3],
            "--..": [8, 3, 1, 3, 1, 3]
        },
        addDashes = function (o, value) {
            value = dasharray[value.toString().toLowerCase()];
            if (value) {
                var width = o.attrs["stroke-width"] || "1",
                    butt = {round: width, square: width, butt: 0}[o.attrs["stroke-linecap"] || params["stroke-linecap"]] || 0,
                    dashes = [];
                for (var i = 0, ii = value.length; i < ii; i++) {
                    dashes.push(value[i] * width + ((i % 2) ? 1 : -1) * butt);
                }
                value = dashes.join(",");
                o.node.setAttribute("stroke-dasharray", value);
            }
        };
        for (var att in params) {
            var value = params[att];
            o.attrs[att] = value;
            switch (att) {
                case "path":
                    if (o.type == "path") {
                        o.node.setAttribute("d", "M0,0");
                        R._.paper.pathfinder(o, value);
                    }
                case "rx":
                case "cx":
                case "x":
                    o.node.setAttribute(att, value);
                    R._.updatePosition(o);
                    break;
                case "ry":
                case "cy":
                case "y":
                    o.node.setAttribute(att, value);
                    R._.updatePosition(o);
                    break;
                case "width":
                    o.node.setAttribute(att, value);
                    break;
                case "height":
                    o.node.setAttribute(att, value);
                    break;
                case "gradient":
                    R._.addGrdientFill(o.node, value, o.svg);
                    break;
                case "stroke-width":
                    o.node.style.strokeWidth = value;
                    // Need following line for Firefox
                    o.node.setAttribute(att, value);
                    if (o.attrs["stroke-dasharray"]) {
                        addDashes(o, o.attrs["stroke-dasharray"]);
                    }
                    break;
                case "stroke-dasharray":
                    addDashes(o, value);
                    break;
                case "text":
                    if (o.type == "text") {
                        o.node.childNodes.length && o.node.removeChild(o.node.firstChild);
                        o.node.appendChild(document.createTextNode(value));
                    }
                    break;
                case "rotation":
                    o.rotate(value, true);
                    break;
                case "translation":
                    var xy = value.split(/[, ]+/);
                    o.translate(xy[0], xy[1]);
                    break;
                case "scale":
                    var xy = value.split(/[, ]+/);
                    o.scale(xy[0], xy[1]);
                    break;
                case "fill":
                    var isURL = value.match(/^url\(([^\)]+)\)$/i);
                    if (isURL) {
                        var el = document.createElementNS(o.svg.svgns, "pattern");
                        var ig = document.createElementNS(o.svg.svgns, "image");
                        el.id = "raphael-pattern-" + Raphael.idGenerator++;
                        el.setAttribute("x", 0);
                        el.setAttribute("y", 0);
                        el.setAttribute("patternUnits", "userSpaceOnUse");
                        ig.setAttribute("x", 0);
                        ig.setAttribute("y", 0);
                        ig.setAttributeNS(o.svg.xlink, "href", isURL[1]);
                        el.appendChild(ig);

                        var img = document.createElement("img");
                        img.style.position = "absolute";
                        img.style.top = "-9999em";
                        img.style.left = "-9999em";
                        img.onload = function () {
                            el.setAttribute("width", this.offsetWidth);
                            el.setAttribute("height", this.offsetHeight);
                            ig.setAttribute("width", this.offsetWidth);
                            ig.setAttribute("height", this.offsetHeight);
                            document.body.removeChild(this);
                            R._.paper.safari();
                        };
                        document.body.appendChild(img);
                        img.src = isURL[1];
                        o.svg.defs.appendChild(el);
                        o.node.style.fill = "url(#" + el.id + ")";
                        o.node.setAttribute("fill", "url(#" + el.id + ")");
                        o.pattern = el;
                        R._.updatePosition(o);
                        break;
                    }
                default :
                    var cssrule = att.replace(/(\-.)/g, function (w) {
                        return w.substring(1).toUpperCase();
                    });
                    o.node.style[cssrule] = value;
                    // Need following line for Firefox
                    o.node.setAttribute(att, value);
                    break;
            }
        }
    };
    var Element = function (node, svg) {
        var X = 0,
            Y = 0;
        this[0] = node;
        this.node = node;
        this.svg = svg;
        this.attrs = this.attrs || {};
        this.transformations = []; // rotate, translate, scale
        this._ = {
            tx: 0,
            ty: 0,
            rt: {deg: 0, x: 0, y: 0},
            sx: 1,
            sy: 1
        };
    };
    Element.prototype.translate = function (x, y) {
        if (x == undefined && y == undefined) {
            return {x: this._.tx, y: this._.ty};
        }
        this._.tx += +x;
        this._.ty += +y;
        switch (this.type) {
            case "circle":
            case "ellipse":
                this.attr({cx: this.attrs.cx + x, cy: this.attrs.cy + y});
                break;
            case "rect":
            case "image":
            case "text":
                this.attr({x: this.attrs.x + x, y: this.attrs.y + y});
                break;
            case "path":
                var path = Raphael.pathToRelative(this.attrs.path);
                path[0][1] += +x;
                path[0][2] += +y;
                this.attr({path: path.join(" ")});
            break;
        }
        return this;
    };
    Element.prototype.rotate = function (deg, isAbsolute) {
        if (deg == undefined) {
            return this._.rt.deg;
        }
        var bbox = this.getBBox();
        if (isAbsolute) {
            this._.rt.deg = deg;
        } else {
            this._.rt.deg += deg;
        }

        if (this._.rt.deg) {
            this.transformations[0] = ("rotate(" + this._.rt.deg + " " + (bbox.x + bbox.width / 2) + " " + (bbox.y + bbox.height / 2) + ")");
        } else {
            this.transformations[0] = "";
        }
        this.node.setAttribute("transform", this.transformations.join(" "));
        return this;
    };
    Element.prototype.hide = function () {
        this.node.style.display = "none";
        return this;
    };
    Element.prototype.show = function () {
        this.node.style.display = "block";
        return this;
    };
    Element.prototype.remove = function () {
        this.node.parentNode.removeChild(this.node);
    };
    Element.prototype.getBBox = function () {
        return this.node.getBBox();
    };
    Element.prototype.attr = function () {
        if (arguments.length == 1 && typeof arguments[0] == "string") {
            if (arguments[0] == "translation") {
                return this.translate();
            }
            return this.attrs[arguments[0]];
        }
        if (arguments.length == 1 && arguments[0] instanceof Array) {
            var values = {};
            for (var j in arguments[0]) {
                values[arguments[0][j]] = this.attrs[arguments[0][j]];
            }
            return values;
        }
        if (arguments.length == 2) {
            var params = {};
            params[arguments[0]] = arguments[1];
            R._.setFillAndStroke(this, params);
        } else if (arguments.length == 1 && typeof arguments[0] == "object") {
            R._.setFillAndStroke(this, arguments[0]);
        }
        return this;
    };
    Element.prototype.toFront = function () {
        this.node.parentNode.appendChild(this.node);
        return this;
    };
    Element.prototype.toBack = function () {
        if (this.node.parentNode.firstChild != this.node) {
            this.node.parentNode.insertBefore(this.node, this.node.parentNode.firstChild);
        }
        return this;
    };
    Element.prototype.insertAfter = function (element) {
        if (element.node.nextSibling) {
            element.node.parentNode.insertBefore(this.node, element.node.nextSibling);
        } else {
            element.node.parentNode.appendChild(this.node);
        }
        return this;
    };
    Element.prototype.insertBefore = function (element) {
        element.node.parentNode.insertBefore(this.node, element.node);
        return this;
    };
    for (var method in R._.element) {
        Element.prototype[method] = R._.element[method];
    }
    R._.theCircle = function (svg, x, y, r) {
        var el = document.createElementNS(svg.svgns, "circle");
        el.setAttribute("cx", x);
        el.setAttribute("cy", y);
        el.setAttribute("r", r);
        el.setAttribute("fill", "none");
        el.setAttribute("stroke", "#000");
        if (svg.canvas) {
            svg.canvas.appendChild(el);
        }
        var res = new Element(el, svg);
        res.attrs = res.attrs || {};
        res.attrs.cx = x;
        res.attrs.cy = y;
        res.attrs.r = r;
        res.attrs.stroke = "#000";
        res.type = "circle";
        return res;
    };
    R._.theRect = function (svg, x, y, w, h, r) {
        var el = document.createElementNS(svg.svgns, "rect");
        el.setAttribute("x", x);
        el.setAttribute("y", y);
        el.setAttribute("width", w);
        el.setAttribute("height", h);
        if (r) {
            el.setAttribute("rx", r);
            el.setAttribute("ry", r);
        }
        el.setAttribute("fill", "none");
        el.setAttribute("stroke", "#000");
        if (svg.canvas) {
            svg.canvas.appendChild(el);
        }
        var res = new Element(el, svg);
        res.attrs = res.attrs || {};
        res.attrs.x = x;
        res.attrs.y = y;
        res.attrs.width = w;
        res.attrs.height = h;
        res.attrs.stroke = "#000";
        if (r) {
            res.attrs.rx = res.attrs.ry = r;
        }
        res.type = "rect";
        return res;
    };
    R._.theEllipse = function (svg, x, y, rx, ry) {
        var el = document.createElementNS(svg.svgns, "ellipse");
        el.setAttribute("cx", x);
        el.setAttribute("cy", y);
        el.setAttribute("rx", rx);
        el.setAttribute("ry", ry);
        el.setAttribute("fill", "none");
        el.setAttribute("stroke", "#000");
        if (svg.canvas) {
            svg.canvas.appendChild(el);
        }
        var res = new Element(el, svg);
        res.attrs = res.attrs || {};
        res.attrs.cx = x;
        res.attrs.cy = y;
        res.attrs.rx = rx;
        res.attrs.ry = ry;
        res.attrs.stroke = "#000";
        res.type = "ellipse";
        return res;
    };
    R._.theImage = function (svg, src, x, y, w, h) {
        var el = document.createElementNS(svg.svgns, "image");
        el.setAttribute("x", x);
        el.setAttribute("y", y);
        el.setAttribute("width", w);
        el.setAttribute("height", h);
        el.setAttribute("preserveAspectRatio", "none");
        el.setAttributeNS(svg.xlink, "href", src);
        if (svg.canvas) {
            svg.canvas.appendChild(el);
        }
        var res = new Element(el, svg);
        res.attrs = res.attrs || {};
        res.attrs.x = x;
        res.attrs.y = y;
        res.attrs.width = w;
        res.attrs.height = h;
        res.type = "image";
        return res;
    };
    R._.theText = function (svg, x, y, text) {
        var el = document.createElementNS(svg.svgns, "text");
        el.setAttribute("x", x);
        el.setAttribute("y", y);
        el.setAttribute("text-anchor", "middle");
        el.setAttribute("fill", "#000");
        if (text) {
            el.appendChild(document.createTextNode(text));
        }
        if (svg.canvas) {
            svg.canvas.appendChild(el);
        }
        var res = new Element(el, svg);
        res.attrs = res.attrs || {};
        res.attrs.x = x;
        res.attrs.y = y;
        res.attrs.fill = "#000";
        res.type = "text";
        return res;
    };
    R._.theGroup = function (svg) {
        var el = document.createElementNS(svg.svgns, "g");
        if (svg.canvas) {
            svg.canvas.appendChild(el);
        }
        var i = new Element(el, svg);
        for (var f in svg) {
            if (f[0] != "_" && typeof svg[f] == "function") {
                i[f] = (function (f) {
                    return function () {
                        var e = svg[f].apply(svg, arguments);
                        el.appendChild(e[0]);
                        return e;
                    };
                })(f);
            }
        }
        i.type = "group";
        return i;
    };
    R._create = function () {
        // container, width, height
        // x, y, width, height
        if (typeof arguments[0] == "string") {
            var container = document.getElementById(arguments[0]);
            var width = arguments[1];
            var height = arguments[2];
        }
        if (typeof arguments[0] == "object") {
            var container = arguments[0];
            var width = arguments[1];
            var height = arguments[2];
        }
        if (typeof arguments[0] == "number") {
            var container = 1,
                x = arguments[0],
                y = arguments[1],
                width = arguments[2],
                height = arguments[3];
        }
        if (!container) {
            throw new Error("SVG container not found.");
        }
        R._.paper.canvas = document.createElementNS(R._.paper.svgns, "svg");
        R._.paper.canvas.setAttribute("width", width || 320);
        R._.paper.width = width || 320;
        R._.paper.canvas.setAttribute("height", height || 200);
        R._.paper.height = height || 200;
        if (container == 1) {
            document.body.appendChild(R._.paper.canvas);
            R._.paper.canvas.style.position = "absolute";
            R._.paper.canvas.style.left = x + "px";
            R._.paper.canvas.style.top = y + "px";
        } else {
            if (container.firstChild) {
                container.insertBefore(R._.paper.canvas, container.firstChild);
            } else {
                container.appendChild(R._.paper.canvas);
            }
        }
        container = {
            canvas: R._.paper.canvas,
            clear: function () {
                while (this.canvas.firstChild) {
                    this.canvas.removeChild(this.canvas.firstChild);
                }
                this.defs = document.createElementNS(R._.paper.svgns, "defs");
                this.canvas.appendChild(this.defs);
            }
        };
        for (var prop in R._.paper) {
            if (prop != "create") {
                container[prop] = R._.paper[prop];
            }
        }
        container.clear();
        return container;
    };
    R._.paper.remove = function () {
        this.canvas.parentNode.removeChild(this.canvas);
    };
    R._.paper.svgns = "http://www.w3.org/2000/svg";
    R._.paper.xlink = "http://www.w3.org/1999/xlink";
    R._.paper.safari = function () {
        if (navigator.vendor == "Apple Computer, Inc.") {
            var rect = this.rect(-this.width, -this.height, this.width * 3, this.height * 3).attr({stroke: "none"});
            setTimeout(function () {rect.remove();}, 0);
        }
    };
})(window.Raphael);
