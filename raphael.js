/*
 * Raphael 0.6.4 - JavaScript Vector Library
 *
 * Copyright (c) 2008 – 2009 Dmitry Baranovskiy (http://raphaeljs.com)
 * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 */
var Raphael = (function (type) {
        var r = function () {
            return r._create.apply(r, arguments);
        };
        r.version = "0.6.4";
        r.type = type;
        var availableAttrs = {cx: 0, cy: 0, fill: "#fff", "fill-opacity": 1, font: '16px "Arial"', "font-family": '"Arial"', "font-size": "16", gradient: 0, height: 0, opacity: 1, path: "M0,0", r: 0, rotation: 0, rx: 0, ry: 0, scale: "1 1", stroke: "#000", "stroke-dasharray": "", "stroke-linecap": "butt", "stroke-linejoin": "butt", "stroke-miterlimit": 0, "stroke-opacity": 1, "stroke-width": 1, translation: "0 0", width: 0, x: 0, y: 0},
            availableAnimAttrs = {cx: "number", cy: "number", fill: "colour", "fill-opacity": "number", "font-size": "number", height: "number", opacity: "number", path: "path", r: "number", rotation: "number", rx: "number", ry: "number", scale: "csv", stroke: "colour", "stroke-opacity": "number", "stroke-width": "number", translation: "csv", width: "number", x: "number", y: "number"},
            C = {};

        if (type == "VML") {
            var thePath = function (params, pathString, VML) {
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
                    C.pathfinder(p, "" + pathString);
                }
                p.setBox();
                setFillAndStroke(p, params);
                if (params.gradient) {
                    addGrdientFill(p, params.gradient);
                }
                return p;
            };
            var setFillAndStroke = function (o, params) {
                var s = o[0].style;
                o.attrs = o.attrs || {};
                for (var par in params) {
                    o.attrs[par] = params[par];
                }
                if (params.path && o.type == "path") {
                    o.Path = "";
                    o.path = [];
                    C.pathfinder(o, params.path);
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
            var addGrdientFill = function (o, gradient) {
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
                        setFillAndStroke(this, params);
                        this.setBox(params);
                        if (params.gradient) {
                            addGrdientFill(this, params.gradient);
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
            var theCircle = function (vml, x, y, r) {
                var g = document.createElement("rvml:group");
                var o = document.createElement("rvml:oval");
                g.appendChild(o);
                vml.canvas.appendChild(g);
                var res = new Element(o, g, vml);
                setFillAndStroke(res, {stroke: "#000", fill: "none"});
                res.setBox({x: x - r, y: y - r, width: r * 2, height: r * 2});
                res.attrs.cx = x;
                res.attrs.cy = y;
                res.attrs.r = r;
                res.type = "circle";
                return res;
            };
            var theRect = function (vml, x, y, w, h, r) {
                var g = document.createElement("rvml:group");
                var o = document.createElement(r ? "rvml:roundrect" : "rvml:rect");
                if (r) {
                    o.arcsize = r / (Math.min(w, h));
                }
                g.appendChild(o);
                vml.canvas.appendChild(g);
                var res = new Element(o, g, vml);
                setFillAndStroke(res, {stroke: "#000"});
                res.setBox({x: x, y: y, width: w, height: h});
                res.attrs.x = x;
                res.attrs.y = y;
                res.attrs.w = w;
                res.attrs.h = h;
                res.attrs.r = r;
                res.type = "rect";
                return res;
            };
            var theEllipse = function (vml, x, y, rx, ry) {
                var g = document.createElement("rvml:group");
                var o = document.createElement("rvml:oval");
                g.appendChild(o);
                vml.canvas.appendChild(g);
                var res = new Element(o, g, vml);
                setFillAndStroke(res, {stroke: "#000"});
                res.setBox({x: x - rx, y: y - ry, width: rx * 2, height: ry * 2});
                res.attrs.cx = x;
                res.attrs.cy = y;
                res.attrs.rx = rx;
                res.attrs.ry = ry;
                res.type = "ellipse";
                return res;
            };
            var theImage = function (vml, src, x, y, w, h) {
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
            var theText = function (vml, x, y, text) {
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
                setFillAndStroke(res, {stroke: "none", fill: "#000"});
                return res;
            };
            var theGroup = function (vml) {
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
            r._create = function () {
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
                    r = C.canvas = document.createElement("rvml:group"),
                    cs = c.style, rs = r.style;
                C.width = width;
                C.height = height;
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
                for (var prop in C) {
                    container[prop] = C[prop];
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
            C.remove = function () {
                C.canvas.parentNode.parentNode.parentNode.removeChild(C.canvas.parentNode.parentNode);
            };
        }
        if (type == "SVG") {
            var thePath = function (params, pathString, SVG) {
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
                    C.pathfinder(p, p.attrs.path);
                }
                if (params) {
                    setFillAndStroke(p, params);
                }
                return p;
            };
            var addGrdientFill = function (o, gradient, SVG) {
                var el = document.createElementNS(SVG.svgns, gradient.type + "Gradient");
                el.id = "raphael-gradient-" + SVG.gradients++;
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
            var updatePosition = function (o) {
                if (o.pattern) {
                    var bbox = o.node.getBBox();
                    o.pattern.setAttribute("patternTransform", "translate(" + [bbox.x, bbox.y].join(",") + ")");
                }
            };
            var setFillAndStroke = function (o, params) {
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
                                C.pathfinder(o, value);
                            }
                        case "rx":
                        case "cx":
                        case "x":
                            o.node.setAttribute(att, value);
                            updatePosition(o);
                            break;
                        case "ry":
                        case "cy":
                        case "y":
                            o.node.setAttribute(att, value);
                            updatePosition(o);
                            break;
                        case "width":
                            o.node.setAttribute(att, value);
                            break;
                        case "height":
                            o.node.setAttribute(att, value);
                            break;
                        case "gradient":
                            addGrdientFill(o.node, value, o.svg);
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
                                el.id = "raphael-pattern-" + o.svg.gradients++;
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
                                    C.safari();
                                };
                                document.body.appendChild(img);
                                img.src = isURL[1];
                                o.svg.defs.appendChild(el);
                                o.node.style.fill = "url(#" + el.id + ")";
                                o.node.setAttribute("fill", "url(#" + el.id + ")");
                                o.pattern = el;
                                updatePosition(o);
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
                    setFillAndStroke(this, params);
                } else if (arguments.length == 1 && typeof arguments[0] == "object") {
                    setFillAndStroke(this, arguments[0]);
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
            var theCircle = function (svg, x, y, r) {
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
            var theRect = function (svg, x, y, w, h, r) {
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
            var theEllipse = function (svg, x, y, rx, ry) {
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
            var theImage = function (svg, src, x, y, w, h) {
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
            var theText = function (svg, x, y, text) {
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
            var theGroup = function (svg) {
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
            r._create = function () {
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
                C.canvas = document.createElementNS(C.svgns, "svg");
                C.canvas.setAttribute("width", width || 320);
                C.width = width || 320;
                C.canvas.setAttribute("height", height || 200);
                C.height = height || 200;
                if (container == 1) {
                    document.body.appendChild(C.canvas);
                    C.canvas.style.position = "absolute";
                    C.canvas.style.left = x + "px";
                    C.canvas.style.top = y + "px";
                } else {
                    if (container.firstChild) {
                        container.insertBefore(C.canvas, container.firstChild);
                    } else {
                        container.appendChild(C.canvas);
                    }
                }
                container = {
                    canvas: C.canvas,
                    clear: function () {
                        while (this.canvas.firstChild) {
                            this.canvas.removeChild(this.canvas.firstChild);
                        }
                        this.defs = document.createElementNS(C.svgns, "defs");
                        this.gradients = 0;
                        this.canvas.appendChild(this.defs);
                    }
                };
                for (var prop in C) {
                    if (prop != "create") {
                        container[prop] = C[prop];
                    }
                }
                container.clear();
                return container;
            };
            C.remove = function () {
                C.canvas.parentNode.removeChild(C.canvas);
            };
            C.svgns = "http://www.w3.org/2000/svg";
            C.xlink = "http://www.w3.org/1999/xlink";
        }
        if (type == "VML" || type == "SVG") {
            C.circle = function (x, y, r) {
                return theCircle(this, x, y, r);
            };
            C.rect = function (x, y, w, h, r) {
                return theRect(this, x, y, w, h, r);
            };
            C.ellipse = function (x, y, rx, ry) {
                return theEllipse(this, x, y, rx, ry);
            };
            C.path = function (params, pathString) {
                return thePath(params, pathString, this);
            };
            C.image = function (src, x, y, w, h) {
                return theImage(this, src, x, y, w, h);
            };
            C.text = function (x, y, text) {
                return theText(this, x, y, text);
            };
            C.group = function () {
                return theGroup(this);
            };
            C.drawGrid = function (x, y, w, h, wv, hv, color) {
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
            C.safari = function () {
                if (navigator.vendor == "Apple Computer, Inc.") {
                    var rect = C.rect(-C.width, -C.height, C.width * 3, C.height * 3).attr({stroke: "none"});
                    setTimeout(function () {rect.remove();}, 0);
                }
            };
            Element.prototype.stop = function () {
                clearTimeout(this.animation_in_progress);
            };
            Element.prototype.scale = function (x, y) {
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
            Element.prototype.animate = function (params, ms, callback) {
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
                        C.safari();
                    } else {
                        if (t.x || t.y) {
                            that.translate(-t.x, -t.y);
                        }
                        that.attr(params);
                        clearTimeout(that.animation_in_progress);
                        C.safari();
                        (typeof callback == "function") && callback.call(that);
                    }
                    prev = time;
                })();
                return this;
            };
            
            C.pathfinder = function (p, path) {
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
            return r;
        } else {
            return function () {};
        }
    })((!window.SVGAngle) ? "VML" : "SVG");


Raphael.vml = !(Raphael.svg = (Raphael.type == "SVG"));
if (Raphael.vml && window.CanvasRenderingContext2D) {
    Raphael.type = "Canvas only";
    Raphael.vml = Raphael.svg = false;
}
Raphael.toString = function () {
    return  "Your browser " + (this.vml ? "doesn't ": "") + "support" + (this.svg ? "s": "") +
            " SVG.\nYou are running " + unescape("Rapha%EBl%20") + this.version;
};
// generic utilities
Raphael.hsb2rgb = function (hue, saturation, brightness) {
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
Raphael.rgb2hsb = function (red, green, blue) {
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
Raphael.getRGB = function (colour) {
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
Raphael.getColor = function (value) {
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
Raphael.getColor.reset = function () {
    this.start = undefined;
};
Raphael.parsePathString = function (pathString) {
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
Raphael.pathDimensions = function (path) {
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
Raphael.pathToRelative = function (pathArray) {
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
Raphael.pathToAbsolute = function (pathArray) {
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
Raphael.pathEqualiser = function (path1, path2) {
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
