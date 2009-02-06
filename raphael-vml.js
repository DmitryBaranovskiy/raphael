/*
 * Raphael 0.7 - JavaScript Vector Library
 *
 * Copyright (c) 2008 – 2009 Dmitry Baranovskiy (http://raphaeljs.com)
 * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 */
(function (R) {
    if (R == null) {
        throw new Error("raphael-vml.js should not be included into HTML. It has to be loaded with raphael.js");
    }
    R.type = "VML";
    R.vml = !(R.svg = false);
    R._.thePath = function (params, pathString, VML) {
        var g = document.createElement("rvml:group"), gl = g.style;
        gl.position = "absolute";
        gl.left = 0;
        gl.top = 0;
        gl.width = VML.width + "px";
        gl.height = VML.height + "px";
        var el = document.createElement("rvml:shape"), ol = el.style;
        ol.width = VML.width + "px";
        ol.height = VML.height + "px";
        el.path = "";
        if (params["class"]) {
            el.className = params["class"];
        }
        el.coordsize = this.coordsize;
        el.coordorigin = this.coordorigin;
        g.appendChild(el);
        VML.canvas.appendChild(g);
        var p = new Element(el, g, VML);
        p.isAbsolute = true;
        p.type = "path";
        p.path = [];
        p.last = {x: 0, y: 0, bx: 0, by: 0, isAbsolute: true};
        p.Path = "";
        p.absolutely = function () {
            this.isAbsolute = true;
            return this;
        };
        p.relatively = function () {
            this.isAbsolute = false;
            return this;
        };
        p.moveTo = function (x, y) {
            var d = this.isAbsolute?"m":"t";
            d += Math.round(parseFloat(x, 10)) + " " + Math.round(parseFloat(y, 10));
            this.node.path = this.Path += d;
            this.last.x = (this.isAbsolute ? 0 : this.last.x) + parseFloat(x, 10);
            this.last.y = (this.isAbsolute ? 0 : this.last.y) + parseFloat(y, 10);
            this.last.isAbsolute = this.isAbsolute;
            this.attrs.path += (this.isAbsolute ? "M" : "m") + [x, y];
            return this;
        };
        p.lineTo = function (x, y) {
            var d = this.isAbsolute?"l":"r";
            d += Math.round(parseFloat(x, 10)) + " " + Math.round(parseFloat(y, 10));
            this[0].path = this.Path += d;
            this.last.x = (this.isAbsolute ? 0 : this.last.x) + parseFloat(x, 10);
            this.last.y = (this.isAbsolute ? 0 : this.last.y) + parseFloat(y, 10);
            this.last.isAbsolute = this.isAbsolute;
            this.attrs.path += (this.isAbsolute ? "L" : "l") + [x, y];
            return this;
        };
        p.arcTo = function (rx, ry, large_arc_flag, sweep_flag, x2, y2) {
            // for more information of where this math came from visit:
            // http://www.w3.org/TR/SVG11/implnote.html#ArcImplementationNotes
            x2 = (this.isAbsolute ? 0 : this.last.x) + x2;
            y2 = (this.isAbsolute ? 0 : this.last.y) + y2;
            var x1 = this.last.x,
                y1 = this.last.y,
                x = (x1 - x2) / 2,
                y = (y1 - y2) / 2,
                k = (large_arc_flag == sweep_flag ? -1 : 1) *
                    Math.sqrt(Math.abs(rx * rx * ry * ry - rx * rx * y * y - ry * ry * x * x) / (rx * rx * y * y + ry * ry * x * x)),
                cx = k * rx * y / ry + (x1 + x2) / 2,
                cy = k * -ry * x / rx + (y1 + y2) / 2,
                d = sweep_flag ? (this.isAbsolute ? "wa" : "wr") : (this.isAbsolute ? "at" : "ar"),
                left = Math.round(cx - rx),
                top = Math.round(cy - ry);
            d += [left, top, Math.round(left + rx * 2), Math.round(top + ry * 2), Math.round(x1), Math.round(y1), Math.round(parseFloat(x2, 10)), Math.round(parseFloat(y2, 10))].join(", ");
            this.node.path = this.Path += d;
            this.last.x = (this.isAbsolute ? 0 : this.last.x) + parseFloat(x2, 10);
            this.last.y = (this.isAbsolute ? 0 : this.last.y) + parseFloat(y2, 10);
            this.last.isAbsolute = this.isAbsolute;
            this.attrs.path += (this.isAbsolute ? "A" : "a") + [rx, ry, 0, large_arc_flag, sweep_flag, x2, y2];
            return this;
        };
        p.cplineTo = function (x1, y1, w1) {
            if (!w1) {
                return this.lineTo(x1, y1);
            } else {
                var x = Math.round(Math.round(parseFloat(x1, 10) * 100) / 100),
                    y = Math.round(Math.round(parseFloat(y1, 10) * 100) / 100),
                    w = Math.round(Math.round(parseFloat(w1, 10) * 100) / 100),
                    d = this.isAbsolute ? "c" : "v",
                    attr = [Math.round(this.last.x) + w, Math.round(this.last.y), x - w, y, x, y],
                    svgattr = [this.last.x + w1, this.last.y, x1 - w1, y1, x1, y1];
                d += attr.join(" ") + " ";
                this.last.x = (this.isAbsolute ? 0 : this.last.x) + attr[4];
                this.last.y = (this.isAbsolute ? 0 : this.last.y) + attr[5];
                this.last.bx = attr[2];
                this.last.by = attr[3];
                this.node.path = this.Path += d;
                this.attrs.path += (this.isAbsolute ? "C" : "c") + svgattr;
                return this;
            }
        };
        p.curveTo = function () {
            var d = this.isAbsolute ? "c" : "v";
            if (arguments.length == 6) {
                this.last.bx = (this.isAbsolute ? 0 : this.last.x) + parseFloat(arguments[2], 10);
                this.last.by = (this.isAbsolute ? 0 : this.last.y) + parseFloat(arguments[3], 10);
                this.last.x = (this.isAbsolute ? 0 : this.last.x) + parseFloat(arguments[4], 10);
                this.last.y = (this.isAbsolute ? 0 : this.last.y) + parseFloat(arguments[5], 10);
                d += [Math.round(parseFloat(arguments[0], 10)),
                     Math.round(parseFloat(arguments[1], 10)),
                     Math.round(parseFloat(arguments[2], 10)),
                     Math.round(parseFloat(arguments[3], 10)),
                     Math.round(parseFloat(arguments[4], 10)),
                     Math.round(parseFloat(arguments[5], 10))].join(" ") + " ";
                this.last.isAbsolute = this.isAbsolute;
                this.attrs.path += (this.isAbsolute ? "C" : "c") + Array.prototype.splice.call(arguments, 0, arguments.length);
            }
            if (arguments.length == 4) {
                var bx = this.last.x * 2 - this.last.bx;
                var by = this.last.y * 2 - this.last.by;
                this.last.bx = (this.isAbsolute ? 0 : this.last.x) + parseFloat(arguments[0], 10);
                this.last.by = (this.isAbsolute ? 0 : this.last.y) + parseFloat(arguments[1], 10);
                this.last.x = (this.isAbsolute ? 0 : this.last.x) + parseFloat(arguments[2], 10);
                this.last.y = (this.isAbsolute ? 0 : this.last.y) + parseFloat(arguments[3], 10);
                d += [Math.round(bx), Math.round(by),
                     Math.round(parseFloat(arguments[0], 10)),
                     Math.round(parseFloat(arguments[1], 10)),
                     Math.round(parseFloat(arguments[2], 10)),
                     Math.round(parseFloat(arguments[3], 10))].join(" ") + " ";
                 this.attrs.path += (this.isAbsolute ? "S" : "s") + Array.prototype.splice.call(arguments, 0, arguments.length);
            }
            this.node.path = this.Path += d;
            return this;
        };
        p.qcurveTo = function () {
            var d = "qb";
            if (arguments.length == 4) {
                this.last.qx = (this.isAbsolute ? 0 : this.last.x) + parseFloat(arguments[0], 10);
                this.last.qy = (this.isAbsolute ? 0 : this.last.y) + parseFloat(arguments[1], 10);
                this.last.x = (this.isAbsolute ? 0 : this.last.x) + parseFloat(arguments[2], 10);
                this.last.y = (this.isAbsolute ? 0 : this.last.y) + parseFloat(arguments[3], 10);
                d += [Math.round(this.last.qx),
                     Math.round(this.last.qy),
                     Math.round(this.last.x),
                     Math.round(this.last.y)].join(" ") + " ";
                this.last.isAbsolute = this.isAbsolute;
                this.attrs.path += (this.isAbsolute ? "Q" : "q") + Array.prototype.splice.call(arguments, 0, arguments.length);
            }
            if (arguments.length == 2) {
                this.last.qx = this.last.x * 2 - this.last.qx;
                this.last.qy = this.last.y * 2 - this.last.qy;
                this.last.x = (this.isAbsolute ? 0 : this.last.x) + parseFloat(arguments[2], 10);
                this.last.y = (this.isAbsolute ? 0 : this.last.y) + parseFloat(arguments[3], 10);
                d += [Math.round(this.last.qx),
                     Math.round(this.last.qy),
                     Math.round(this.last.x),
                     Math.round(this.last.y)].join(" ") + " ";
                 this.attrs.path += (this.isAbsolute ? "T" : "t") + Array.prototype.splice.call(arguments, 0, arguments.length);
            }
            this.node.path = this.Path += d;
            this.path.push({type: "qcurve", arg: [].slice.call(arguments, 0), pos: this.isAbsolute});
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
            actions[dir.charAt(0)]()[dir.charAt(1)]();
            rollback();
            return o;
        };
        p.andClose = function () {
            this.node.path = (this.Path += "x e");
            this.attrs.path += "z";
            return this;
        };
        if (pathString) {
            p.absolutely();
            p.attrs.path = "";
            R._.paper.pathfinder(p, "" + pathString);
        }
        p.setBox();
        R._.setFillAndStroke(p, params);
        if (params.gradient) {
            R._.addGrdientFill(p, params.gradient);
        }
        return p;
    };
    R._.setFillAndStroke = function (o, params) {
        var s = o[0].style;
        o.attrs = o.attrs || {};
        for (var par in params) {
            o.attrs[par] = params[par];
        }
        if (params.path && o.type == "path") {
            o.Path = "";
            o.path = [];
            R._.paper.pathfinder(o, params.path);
        }
        if (params.rotation != null) {
            o.Group.style.rotation = params.rotation;
        }
        if (params.translation) {
            var xy = params.translation.split(/[, ]+/);
            o.translate(xy[0], xy[1]);
        }
        if (params.scale) {
            var xy = params.scale.split(/[, ]+/);
            o.scale(xy[0], xy[1]);
        }
        if (o.type == "image" && params.opacity) {
            o.node.filterOpacity = " progid:DXImageTransform.Microsoft.Alpha(opacity=" + (params.opacity * 100) + ")";
            o.node.style.filter = (o.node.filterMatrix || "") + (o.node.filterOpacity || "");
        }
        params["font-family"] && (s.fontFamily = params["font-family"]);
        params["font-size"] && (s.fontSize = params["font-size"]);
        params["font"] && (s.font = params["font"]);
        params["font-weight"] && (s.fontWeight = params["font-weight"]);
        if (typeof params.opacity != "undefined" || typeof params["stroke-width"] != "undefined" || typeof params.fill != "undefined" || typeof params.stroke != "undefined") {
            o = o.shape || o.node;
            var fill = (o.getElementsByTagName("fill") && o.getElementsByTagName("fill")[0]) || document.createElement("rvml:fill");
            if ("fill-opacity" in params || "opacity" in params) {
                fill.opacity = ((params["fill-opacity"] + 1 || 2) - 1) * ((params.opacity + 1 || 2) - 1);
            }
            if (params.fill) {
                fill.on = true;
            }
            if (fill.on == undefined || params.fill == "none") {
                fill.on = false;
            }
            if (fill.on && params.fill) {
                var isURL = params.fill.match(/^url\(([^\)]+)\)$/i);
                if (isURL) {
                    fill.src = isURL[1];
                    fill.type = "tile";
                } else {
                    fill.color = params.fill;
                    fill.src = "";
                    fill.type = "solid";
                }
            }
            o.appendChild(fill);
            var stroke = (o.getElementsByTagName("stroke") && o.getElementsByTagName("stroke")[0]) || document.createElement("rvml:stroke");
            if ((params.stroke && params.stroke != "none") || params["stroke-width"] || params["stroke-opacity"] || params["stroke-dasharray"]) {
                stroke.on = true;
            }
            if (params.stroke == "none" || typeof stroke.on == "undefined") {
                stroke.on = false;
            }
            if (stroke.on && params.stroke) {
                stroke.color = params.stroke;
            }
            stroke.opacity = ((params["stroke-opacity"] + 1 || 2) - 1) * ((params.opacity + 1 || 2) - 1);
            params["stroke-linejoin"] && (stroke.joinstyle = params["stroke-linejoin"] || "miter");
            stroke.miterlimit = params["stroke-miterlimit"] || 8;
            params["stroke-linecap"] && (stroke.endcap = {butt: "flat", square: "square", round: "round"}[params["stroke-linecap"]] || "miter");
            params["stroke-width"] && (stroke.weight = (parseFloat(params["stroke-width"], 10) || 1) * 12 / 16);
            if (params["stroke-dasharray"]) {
                var dasharray = {
                    "-": "shortdash",
                    ".": "shortdot",
                    "-.": "shortdashdot",
                    "-..": "shortdashdotdot",
                    ". ": "dot",
                    "- ": "dash",
                    "--": "longdash",
                    "- .": "dashdot",
                    "--.": "longdashdot",
                    "--..": "longdashdotdot"
                };
                stroke.dashstyle = dasharray[params["stroke-dasharray"]] || "";
            }
            o.appendChild(stroke);
        }
    };
    R._.addGrdientFill = function (o, gradient) {
        o.attrs = o.attrs || {};
        o.attrs.gradient = gradient;
        o = o.shape || o[0];
        var fill = o.getElementsByTagName("fill");
        if (fill.length) {
            fill = fill[0];
        } else {
            fill = document.createElement("rvml:fill");
        }
        if (gradient.dots.length) {
            fill.on = true;
            fill.method = "none";
            fill.type = (gradient.type.toLowerCase() == "linear") ? "gradient" : "gradientTitle";
            if (typeof gradient.dots[0].color != "undefined") {
                fill.color = gradient.dots[0].color || "#000";
            }
            if (typeof gradient.dots[gradient.dots.length - 1].color != "undefined") {
                fill.color2 = gradient.dots[gradient.dots.length - 1].color || "#000";
            }
            var colors = [];
            for (var i = 0, ii = gradient.dots.length; i < ii; i++) {
                if (gradient.dots[i].offset) {
                    colors.push(gradient.dots[i].offset + " " + gradient.dots[i].color);
                }
            };
            var fillOpacity = gradient.dots[0].opacity || 1;
            var fillOpacity2 = gradient.dots[gradient.dots.length - 1].opacity || 1;
            if (colors) {
                fill.colors.value = colors.join(",");
                fillOpacity2 += fillOpacity;
                fillOpacity = fillOpacity2 - fillOpacity;
                fillOpacity2 -= fillOpacity;
            }
            fill.setAttribute("opacity", fillOpacity);
            fill.setAttribute("opacity2", fillOpacity2);
            if (gradient.vector) {
                var angle = Math.round(Math.atan((parseFloat(gradient.vector[3], 10) - parseFloat(gradient.vector[1], 10)) / (parseFloat(gradient.vector[2], 10) - parseFloat(gradient.vector[0], 10))) * 57.29) || 0;
                fill.angle = 270 - angle;
            }
            if (gradient.type.toLowerCase() == "radial") {
                fill.focus = "100%";
                fill.focusposition = "0.5 0.5";
            }
        }
    };
    var Element = function (node, group, vml) {
        var Rotation = 0,
            RotX = 0,
            RotY = 0,
            Scale = 1;
        this[0] = node;
        this.node = node;
        this.X = 0;
        this.Y = 0;
        this.attrs = {};
        this.Group = group;
        this.vml = vml;
        this._ = {
            tx: 0,
            ty: 0,
            rt: 0,
            sx: 1,
            sy: 1
        };
    };
    Element.prototype.rotate = function (deg, isAbsolute) {
        if (deg == undefined) {
            return this._.rt;
        }
        if (isAbsolute) {
            this._.rt = deg;
        } else {
            this._.rt += deg;
        }
        this.Group.style.rotation = this._.rt;
        return this;
    };
    Element.prototype.setBox = function (params) {
        var gs = this.Group.style,
            os = this[0].style;
        for (var i in params) {
            this.attrs[i] = params[i];
        }
        var attr = this.attrs, x, y, w, h;
        switch (this.type) {
            case "circle": 
                x = attr.cx - attr.r;
                y = attr.cy - attr.r;
                w = h = attr.r * 2;
                break;
            case "ellipse":
                x = attr.cx - attr.rx;
                y = attr.cy - attr.ry;
                w = attr.rx * 2;
                h = attr.ry * 2;
                break;
            case "rect":
            case "image":
                x = attr.x;
                y = attr.y;
                w = attr.width || 0;
                h = attr.height || 0;
                break;
            case "text":
                this.textpath.v = ["m", Math.round(attr.x), ", ", Math.round(attr.y - 2), "l", Math.round(attr.x) + 1, ", ", Math.round(attr.y - 2)].join("");
                return;
            case "path":
                if (!this.attrs.path) {
                    x = 0;
                    y = 0;
                    w = this.vml.width;
                    h = this.vml.height;
                } else {
                    var dim = Raphael.pathDimensions(this.attrs.path),
                    x = dim.x;
                    y = dim.y;
                    w = dim.width;
                    h = dim.height;
                }
                break;
            default:
                x = 0;
                y = 0;
                w = this.vml.width;
                h = this.vml.height;
                break;
        }
        if (this.type == "path") {
            var left = Math.round(this.vml.width / 2 - w / 2 - x),
                top = Math.round(this.vml.height / 2 - h / 2 - y);
            gs.left = - left + "px";
            gs.top = - top + "px";
            this.X = left;
            this.Y = top;
            this.W = w;
            this.H = h;
            os.top = top + "px";
            os.left = left + "px";
        } else {
            var left = this.vml.width / 2 - w / 2,
                top = this.vml.height / 2 - h / 2;
            gs.position = "absolute";
            gs.left = x - left + "px";
            gs.top = y - top + "px";
            this.X = x - left;
            this.Y = y - top;
            this.W = w;
            this.H = h;
            gs.width = this.vml.width + "px";
            gs.height = this.vml.height + "px";
            os.position = "absolute";
            os.top = top + "px";
            os.left = left + "px";
            os.width = w + "px";
            os.height = h + "px";
        }
    };
    Element.prototype.hide = function () {
        this.Group.style.display = "none";
        return this;
    };
    Element.prototype.show = function () {
        this.Group.style.display = "block";
        return this;
    };
    Element.prototype.translate = function (x, y) {
        if (x == undefined && y == undefined) {
            return {x: this._.tx, y: this._.ty};
        }
        this._.tx += +x;
        this._.ty += +y;
        if (this.type == "path") {
            var path = this.attrs.path;
            path = Raphael.pathToRelative(path);
            path[0][1] += +x;
            path[0][2] += +y;
            this.attr({path: path.join(" ")});
        }
        this.setBox({x: this._.tx, y: this._.ty});
        return this;
    };
    Element.prototype.getBBox = function () {
        return {
            x: this.X,
            y: this.Y,
            width: this.W,
            height: this.H
        };
    };
    Element.prototype.remove = function () {
        this[0].parentNode.removeChild(this[0]);
        this.Group.parentNode.removeChild(this.Group);
        this.shape && this.shape.parentNode.removeChild(this.shape);
    };
    Element.prototype.attr = function () {
        if (arguments.length == 1 && typeof arguments[0] == "string") {
            if (arguments[0] == "translation") {
                return this.translate();
            }
            return this.attrs[arguments[0]];
        }
        if (this.attrs && arguments.length == 1 && arguments[0] instanceof Array) {
            var values = {};
            for (var i = 0, ii = arguments[0].length; i < ii; i++) {
                values[arguments[0][i]] = this.attrs[arguments[0][i]];
            };
            return values;
        }
        if (this[0].tagName.toLowerCase() == "group") {
            var children = this[0].childNodes;
            this.attrs = this.attrs || {};
            if (arguments.length == 2) {
                this.attrs[arguments[0]] = arguments[1];
            } else if (arguments.length == 1 || typeof arguments[0] == "object") {
                for (var j in arguments[0]) {
                    this.attrs[j] = arguments[0][j];
                }
            }
            for (var i = 0, ii = children.length; i < ii; i++) {
                this.attr.apply(new item(children[i], this[0], this.vml), arguments);
            }
        } else {
            var params;
            if (arguments.length == 2) {
                params = {};
                params[arguments[0]] = arguments[1];
            }
            if (arguments.length == 1 && typeof arguments[0] == "object") {
                params = arguments[0];
            }
            if (params) {
                R._.setFillAndStroke(this, params);
                this.setBox(params);
                if (params.gradient) {
                    R._.addGrdientFill(this, params.gradient);
                }
                if (params.text && this.type == "text") {
                    this[0].string = params.text;
                }
                if (params.id) {
                    this[0].id = params.id;
                }
            }
        }
        return this;
    };
    Element.prototype.toFront = function () {
        this.Group.parentNode.appendChild(this.Group);
        return this;
    };
    Element.prototype.toBack = function () {
        if (this.Group.parentNode.firstChild != this.Group) {
            this.Group.parentNode.insertBefore(this.Group, this.Group.parentNode.firstChild);
        }
        return this;
    };
    Element.prototype.insertAfter = function (element) {
        if (element.Group.nextSibling) {
            element.Group.parentNode.insertBefore(this.Group, element.Group.nextSibling);
        } else {
            element.Group.parentNode.appendChild(this.Group);
        }
        return this;
    };
    Element.prototype.insertBefore = function (element) {
        element.Group.parentNode.insertBefore(this.Group, element.Group);
        return this;
    };
    for (var method in R._.element) {
        Element.prototype[method] = R._.element[method];
    }
    R._.theCircle = function (vml, x, y, r) {
        var g = document.createElement("rvml:group");
        var o = document.createElement("rvml:oval");
        g.appendChild(o);
        vml.canvas.appendChild(g);
        var res = new Element(o, g, vml);
        R._.setFillAndStroke(res, {stroke: "#000", fill: "none"});
        res.setBox({x: x - r, y: y - r, width: r * 2, height: r * 2});
        res.attrs.cx = x;
        res.attrs.cy = y;
        res.attrs.r = r;
        res.type = "circle";
        return res;
    };
    R._.theRect = function (vml, x, y, w, h, r) {
        var g = document.createElement("rvml:group");
        var o = document.createElement(r ? "rvml:roundrect" : "rvml:rect");
        if (r) {
            o.arcsize = r / (Math.min(w, h));
        }
        g.appendChild(o);
        vml.canvas.appendChild(g);
        var res = new Element(o, g, vml);
        R._.setFillAndStroke(res, {stroke: "#000"});
        res.setBox({x: x, y: y, width: w, height: h});
        res.attrs.x = x;
        res.attrs.y = y;
        res.attrs.w = w;
        res.attrs.h = h;
        res.attrs.r = r;
        res.type = "rect";
        return res;
    };
    R._.theEllipse = function (vml, x, y, rx, ry) {
        var g = document.createElement("rvml:group");
        var o = document.createElement("rvml:oval");
        g.appendChild(o);
        vml.canvas.appendChild(g);
        var res = new Element(o, g, vml);
        R._.setFillAndStroke(res, {stroke: "#000"});
        res.setBox({x: x - rx, y: y - ry, width: rx * 2, height: ry * 2});
        res.attrs.cx = x;
        res.attrs.cy = y;
        res.attrs.rx = rx;
        res.attrs.ry = ry;
        res.type = "ellipse";
        return res;
    };
    R._.theImage = function (vml, src, x, y, w, h) {
        var g = document.createElement("rvml:group");
        var o = document.createElement("rvml:image");
        o.src = src;
        g.appendChild(o);
        vml.canvas.appendChild(g);
        var res = new Element(o, g, vml);
        res.type = "image";
        res.setBox({x: x, y: y, width: w, height: h});
        res.attrs.x = x;
        res.attrs.y = y;
        res.attrs.w = w;
        res.attrs.h = h;
        return res;
    };
    R._.theText = function (vml, x, y, text) {
        // @TODO: setTheBox
        var g = document.createElement("rvml:group"), gs = g.style;
        var el = document.createElement("rvml:shape"), ol = el.style;
        var path = document.createElement("rvml:path"), ps = path.style;
        path.v = ["m", Math.round(x), ", ", Math.round(y - 2), "l", Math.round(x) + 1, ", ", Math.round(y - 2)].join("");
        path.textpathok = true;
        ol.width = vml.width;
        ol.height = vml.height;
        gs.position = "absolute";
        gs.left = 0;
        gs.top = 0;
        gs.width = vml.width;
        gs.height = vml.height;
        var o = document.createElement("rvml:textpath");
        o.string = text;
        o.on = true;
        o.coordsize = vml.coordsize;
        o.coordorigin = vml.coordorigin;
        el.appendChild(o);
        el.appendChild(path);
        g.appendChild(el);
        vml.canvas.appendChild(g);
        var res = new Element(o, g, vml);
        res.shape = el;
        res.textpath = path;
        res.type = "text";
        res.attrs.x = x;
        res.attrs.y = y;
        res.attrs.w = 1;
        res.attrs.h = 1;
        R._.setFillAndStroke(res, {stroke: "none", fill: "#000"});
        return res;
    };
    R._.theGroup = function (vml) {
        var el = document.createElement("rvml:group"), els = el.style;
        els.position = "absolute";
        els.left = 0;
        els.top = 0;
        els.width = vml.width;
        els.height = vml.height;
        if (vml.canvas) {
            vml.canvas.appendChild(el);
        }
        var res = new Element(el, el, vml);
        for (var f in vml) {
            if (f.charAt(0) != "_" && typeof vml[f] == "function") {
                res[f] = (function (f) {
                    return function () {
                        var e = vml[f].apply(vml, arguments);
                        el.appendChild(e[0].parentNode);
                        return e;
                    };
                })(f);
            }
        }
        res.type = "group";
        return res;
    };
    R._create = function () {
        // container, width, height
        // x, y, width, height
        var container, width, height;
        if (typeof arguments[0] == "string") {
            container = document.getElementById(arguments[0]);
            width = arguments[1];
            height = arguments[2];
        }
        if (typeof arguments[0] == "object") {
            container = arguments[0];
            width = arguments[1];
            height = arguments[2];
        }
        if (typeof arguments[0] == "number") {
            container = 1;
            x = arguments[0];
            y = arguments[1];
            width = arguments[2];
            height = arguments[3];
        }
        if (!container) {
            throw new Error("VML container not found.");
        }
        if (!document.namespaces["rvml"]) {
            document.namespaces.add("rvml","urn:schemas-microsoft-com:vml");
            document.createStyleSheet().addRule("rvml\\:*", "behavior:url(#default#VML)");
        }
        var c = document.createElement("div"),
            d = document.createElement("div"),
            r = R._.paper.canvas = document.createElement("rvml:group"),
            cs = c.style, rs = r.style;
        R._.paper.width = width;
        R._.paper.height = height;
        width = width || "320px";
        height = height || "200px";
        cs.clip = "rect(0 " + width + " " + height + " 0)";
        cs.top = "-2px";
        cs.left = "-2px";
        cs.position = "absolute";
        rs.position = "absolute";
        d.style.position = "relative";
        rs.width  = width;
        rs.height = height;
        r.coordsize = (width == "100%" ? width : parseFloat(width)) + " " + (height == "100%" ? height : parseFloat(height));
        r.coordorigin = "0 0";

        var b = document.createElement("rvml:rect"), bs = b.style;
        bs.left = bs.top = 0;
        bs.width  = rs.width;
        bs.height = rs.height;
        b.filled = b.stroked = "f";

        r.appendChild(b);
        c.appendChild(r);
        d.appendChild(c);
        if (container == 1) {
            document.body.appendChild(d);
            cs.position = "absolute";
            cs.left = x + "px";
            cs.top = y + "px";
            cs.width = width;
            cs.height = height;
            container = {
                style: {
                    width: width,
                    height: height
                }
            };
        } else {
            cs.width = container.style.width = width;
            cs.height = container.style.height = height;
            if (container.firstChild) {
                container.insertBefore(d, container.firstChild);
            } else {
                container.appendChild(d);
            }
        }
        for (var prop in R._.paper) {
            container[prop] = R._.paper[prop];
        }
        container.clear = function () {
            var todel = [];
            for (var i = 0, ii = r.childNodes.length; i < ii; i++) {
                if (r.childNodes[i] != b) {
                    todel.push(r.childNodes[i]);
                }
            }
            for (i = 0, ii = todel.length; i < ii; i++) {
                r.removeChild(todel[i]);
            }
        };
        return container;
    };
    R._.paper.remove = function () {
        this.canvas.parentNode.parentNode.parentNode.removeChild(this.canvas.parentNode.parentNode);
    };
    R._.paper.safari = function () {};
})(window.Raphael);
