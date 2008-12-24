/*
 * Raphael 0.5.12 - JavaScript Vector Library
 *
 * Copyright (c) 2008 Dmitry Baranovskiy (http://raphaeljs.com)
 * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 */
var Raphael = (function (type) {
        var r = function () {
            return r._create.apply(r, arguments);
        };
        r.version = "0.5.12";
        r.type = type;
        var C = {};
        function Matrix(m11, m12, m21, m22, dx, dy) {
            this.m = [
                [m11 || 1, m12 || 0, 0],
                [m21 || 0, m22 || 1, 0],
                [dx || 0, dy || 0, 1]
            ];
        }

        C._getX = C._getY = C._getW = C._getH = function (x) { return x; };

        if (type == "VML") {
            Matrix.prototype.toString = function () {
                return "progid:DXImageTransform.Microsoft.Matrix(M11=" + this.m[0][0] +
                    ", M12=" + this.m[1][0] + ", M21=" + this.m[0][1] + ", M22=" + this.m[1][1] +
                    ", Dx=" + this.m[2][0] + ", Dy=" + this.m[2][1] + ", sizingmethod='auto expand', filtertype='bilinear')";
            };
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
                setFillAndStroke(p, params);
                if (params.gradient) {
                    addGrdientFill(p, params.gradient);
                }
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
                p.redraw = function () {
                    this.Path = "";
                    var oldPath = this.path;
                    this.path = [];
                    for (var i = 0, ii = oldPath.length; i < ii; i++) {
                        if (oldPath[i].type != "end") {
                            this[oldPath[i].type + "To"].apply(this, oldPath[i].arg);
                        } else {
                            this.andClose();
                        }
                    }
                    return this;
                };
                p.moveTo = function (x, y) {
                    var d = this.isAbsolute?"m":"t";
                    var _getX = this.isAbsolute ? VML._getX : VML._getW;
                    var _getY = this.isAbsolute ? VML._getY : VML._getH;
                    d += Math.round(_getX(parseFloat(x, 10))) + " " + Math.round(_getY(parseFloat(y, 10)));
                    this[0].path = this.Path += d;
                    this.last.x = (this.isAbsolute ? 0 : this.last.x) + _getX(parseFloat(x, 10));
                    this.last.y = (this.isAbsolute ? 0 : this.last.y) + _getY(parseFloat(y, 10));
                    this.last.isAbsolute = this.isAbsolute;
                    this.path.push({type: "move", arg: [].slice.call(arguments, 0), pos: this.isAbsolute});
                    return this;
                };
                p.lineTo = function (x, y) {
                    var d = this.isAbsolute?"l":"r";
                    var _getX = this.isAbsolute ? VML._getX : VML._getW;
                    var _getY = this.isAbsolute ? VML._getY : VML._getH;
                    d += Math.round(_getX(parseFloat(x, 10))) + " " + Math.round(_getY(parseFloat(y, 10)));
                    this[0].path = this.Path += d;
                    this.last.x = (this.isAbsolute ? 0 : this.last.x) + _getX(parseFloat(x, 10));
                    this.last.y = (this.isAbsolute ? 0 : this.last.y) + _getY(parseFloat(y, 10));
                    this.last.isAbsolute = this.isAbsolute;
                    this.path.push({type: "line", arg: [].slice.call(arguments, 0), pos: this.isAbsolute});
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
                            Math.sqrt((rx * rx * ry * ry - rx * rx * y * y - ry * ry * x * x) / (rx * rx * y * y + ry * ry * x * x)),
                        cx = k * rx * y / ry + (x1 + x2) / 2,
                        cy = k * -ry * x / rx + (y1 + y2) / 2,
                        d = sweep_flag ? (this.isAbsolute?"wa":"wr") : (this.isAbsolute?"at":"ar"),
                        _getX = this.isAbsolute ? VML._getX : VML._getW,
                        _getY = this.isAbsolute ? VML._getY : VML._getH,
                        left = Math.round(cx - rx),
                        top = Math.round(cy - ry);
                    d += [left, top, Math.round(left + rx * 2), Math.round(top + ry * 2), Math.round(x1), Math.round(y1), Math.round(_getX(parseFloat(x2, 10))), Math.round(_getX(parseFloat(y2, 10)))].join(", ");
                    this[0].path = this.Path += d;
                    this.last.x = (this.isAbsolute ? 0 : this.last.x) + _getX(parseFloat(x2, 10));
                    this.last.y = (this.isAbsolute ? 0 : this.last.y) + _getY(parseFloat(y2, 10));
                    this.last.isAbsolute = this.isAbsolute;
                    this.path.push({type: "arc", arg: [].slice.call(arguments, 0), pos: this.isAbsolute});
                    return this;
                };
                p.cplineTo = function (x1, y1, w1) {
                    if (!w1) {
                        return this.lineTo(x1, y1);
                    } else {
                        var p = {};
                        p._getX = this.isAbsolute ? VML._getX : VML._getW;
                        p._getY = this.isAbsolute ? VML._getY : VML._getH;
                        var x = Math.round(p._getX(Math.round(parseFloat(x1, 10) * 100) / 100));
                        var y = Math.round(p._getY(Math.round(parseFloat(y1, 10) * 100) / 100));
                        var w = Math.round(VML._getW(Math.round(parseFloat(w1, 10) * 100) / 100));
                        var d = this.isAbsolute?"c":"v";
                        var attr = [Math.round(this.last.x) + w, Math.round(this.last.y), x - w, y, x, y];
                        d += attr.join(" ") + " ";
                        this.last.x = (this.isAbsolute ? 0 : this.last.x) + attr[4];
                        this.last.y = (this.isAbsolute ? 0 : this.last.y) + attr[5];
                        this.last.bx = attr[2];
                        this.last.by = attr[3];
                        this[0].path = this.Path += d;
                        this.path.push({type: "cpline", arg: [].slice.call(arguments, 0), pos: this.isAbsolute});
                        return this;
                    }
                };
                p.curveTo = function () {
                    var d = this.isAbsolute?"c":"v";
                    var _getX = this.isAbsolute ? VML._getX : VML._getW;
                    var _getY = this.isAbsolute ? VML._getY : VML._getH;
                    if (arguments.length == 6) {
                        this.last.bx = (this.isAbsolute ? 0 : this.last.x) + _getX(parseFloat(arguments[2], 10));
                        this.last.by = (this.isAbsolute ? 0 : this.last.y) + _getY(parseFloat(arguments[3], 10));
                        this.last.x = (this.isAbsolute ? 0 : this.last.x) + _getX(parseFloat(arguments[4], 10));
                        this.last.y = (this.isAbsolute ? 0 : this.last.y) + _getY(parseFloat(arguments[5], 10));
                        d += Math.round(_getX(parseFloat(arguments[0], 10))) + " " +
                             Math.round(_getY(parseFloat(arguments[1], 10))) + " " +
                             Math.round(_getX(parseFloat(arguments[2], 10))) + " " +
                             Math.round(_getY(parseFloat(arguments[3], 10))) + " " +
                             Math.round(_getX(parseFloat(arguments[4], 10))) + " " +
                             Math.round(_getY(parseFloat(arguments[5], 10))) + " ";
                        this.last.isAbsolute = this.isAbsolute;
                    }
                    if (arguments.length == 4) {
                        var bx = this.last.x * 2 - this.last.bx;
                        var by = this.last.y * 2 - this.last.by;
                        this.last.bx = (this.isAbsolute ? 0 : this.last.x) + _getX(parseFloat(arguments[0], 10));
                        this.last.by = (this.isAbsolute ? 0 : this.last.y) + _getY(parseFloat(arguments[1], 10));
                        this.last.x = (this.isAbsolute ? 0 : this.last.x) + _getX(parseFloat(arguments[2], 10));
                        this.last.y = (this.isAbsolute ? 0 : this.last.y) + _getY(parseFloat(arguments[3], 10));
                        d += [Math.round(bx), Math.round(by),
                             Math.round(_getX(parseFloat(arguments[0], 10))),
                             Math.round(_getY(parseFloat(arguments[1], 10))),
                             Math.round(_getX(parseFloat(arguments[2], 10))),
                             Math.round(_getY(parseFloat(arguments[3], 10)))].join(" ");
                    }
                    this[0].path = this.Path += d;
                    this.path.push({type: "curve", arg: [].slice.call(arguments, 0), pos: this.isAbsolute});
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
                    this[0].path = (this.Path += "x e");
                    return this;
                };
                if (typeof pathString == "string") {
                    p.absolutely();
                    C.pathfinder(p, pathString);
                }
                return p;
            };
            var setFillAndStroke = function (o, params) {
                var s = o[0].style;
                o.attrs = o.attrs || {};
                for (var par in params) {
                    o.attrs[par] = params[par];
                }
                params["font-family"] && (s.fontFamily = params["font-family"]);
                params["font-size"] && (s.fontSize = params["font-size"]);
                params["font"] && (s.font = params["font"]);
                params["font-weight"] && (s.fontWeight = params["font-weight"]);
                if (typeof params.opacity != "undefined" || typeof params["stroke-width"] != "undefined" || typeof params.fill != "undefined" || typeof params.stroke != "undefined") {
                    o = o.shape || o[0];
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
                this.rotate = function (deg) {
                    if (deg == undefined) {
                        return Rotation;
                    }
                    Rotation += deg;
                    this.Group.style.rotation = Rotation;
                    return this;
                };
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
                        w = attr.w;
                        h = attr.h;
                        break;
                    case "text":
                        this.textpath.v = ["m", Math.round(attr.x), ", ", Math.round(attr.y - 2), "l", Math.round(attr.x) + 1, ", ", Math.round(attr.y - 2)].join("");
                        return;
                    default:
                        return;
                }
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
                    return {x: this.X, y: this.Y};
                }
                this.X += x;
                this.Y += y;
                this.Group.style.left = this.X + "px";
                this.Group.style.top = this.Y + "px";
                return this;
            };
            // depricated
            Element.prototype.matrix = function (xx, xy, yx, yy, dx, dy) {
                tMatrix = new Matrix(xx, xy, yx, yy, dx, dy);
                this.Group.style.filter = tMatrix;
                return this;
            };
            Element.prototype.scale = function (x, y) {
                if (x == undefined && y == undefined) {
                    return ;
                    // TODO
                }
                y = y || x;
                if (x != 0 && !(x == 1 && y == 1)) {
                    var dirx = Math.round(x / Math.abs(x)),
                        diry = Math.round(y / Math.abs(y)),
                        s = this[0].style;
                    if (dirx != 1 || diry != 1) {
                        s.filter = new Matrix(dirx, 0, 0, diry, 0, 0);
                    }
                    var width = parseInt(s.width, 10) * x * dirx;
                    var height = parseInt(s.height, 10) * y * diry;
                    var left = parseInt(s.left, 10);
                    var top = parseInt(s.top, 10);
                    s.left = this.X = left + this.W / 2 - width / 2;
                    s.top = this.Y = top + this.H / 2 - height / 2;
                    s.width = this.W = width;
                    s.height = this.H = height;
                }
                return this;
            };
            Element.prototype.getBBox = function () {
                return {
                    x: this.Group.offsetLeft,
                    y: this.Group.offsetTop,
                    width: this.Group.offsetWidth,
                    height: this.Group.offsetHeight
                };
            };
            Element.prototype.remove = function () {
                this[0].parentNode.removeChild(this[0]);
                this.Group.parentNode.removeChild(this.Group);
                this.shape && this.shape.parentNode.removeChild(this.shape);
            };
            Element.prototype.attr = function () {
                if (arguments.length == 1 && typeof arguments[0] == "string") {
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
            var theCircle = function (vml, x, y, r) {
                var g = document.createElement("rvml:group");
                var o = document.createElement("rvml:oval");
                g.appendChild(o);
                vml.canvas.appendChild(g);
                var res = new Element(o, g, vml);
                setFillAndStroke(res, {stroke: "#000", fill: "none"});
                res.setBox({x: x - r, y: y - r, w: r * 2, h: r * 2});
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
                res.setBox({x: x, y: y, w: w, h: h});
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
                res.setBox({x: x - rx, y: y - ry, w: rx * 2, h: ry * 2});
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
                res.setBox({x: x, y: y, w: w, h: h});
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
                    r = C.canvas = document.createElement("rvml:group"),
                    cs = c.style, rs = r.style;
                C.width = width;
                C.height = height;
                width = width || "320px";
                height = height || "200px";
                cs.clip = "rect(0 " + width + " " + height + " 0)";
                cs.position = "absolute";
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
                if (container == 1) {
                    document.body.appendChild(c);
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
                        container.insertBefore(c, container.firstChild);
                    } else {
                        container.appendChild(c);
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
                C.canvas.parentNode.parentNode.removeChild(C.canvas.parentNode);
            };
        }
        if (type == "SVG") {
            Matrix.prototype.toString = function () {
                return "matrix(" + this.m[0][0] +
                    ", " + this.m[1][0] + ", " + this.m[0][1] + ", " + this.m[1][1] +
                    ", " + this.m[2][0] + ", " + this.m[2][1] + ")";
            };
            var thePath = function (params, pathString, SVG) {
                var el = document.createElementNS(SVG.svgns, "path");
                el.setAttribute("fill", "none");
                if (SVG.canvas) {
                    SVG.canvas.appendChild(el);
                }
                var p = new Element(el, SVG);
                if (params) {
                    setFillAndStroke(p, params);
                }
                p.isAbsolute = true;
                p.path = [];
                p.last = {x: 0, y: 0, bx: 0, by: 0};
                p.absolutely = function () {
                    this.isAbsolute = true;
                    return this;
                };
                p.relatively = function () {
                    this.isAbsolute = false;
                    return this;
                };
                p.redraw = function () {
                    this[0].setAttribute("d", "M0 0");
                    var oldPath = this.path;
                    this.path = [];
                    for (var i = 0, ii = oldPath.length; i < ii; i++) {
                        if (oldPath[i].type != "end") {
                            this[oldPath[i].type + "To"].apply(this, oldPath[i].arg);
                        } else {
                            this.andClose();
                        }
                    }
                    return this;
                };
                p.moveTo = function (x, y) {
                    var d = this.isAbsolute?"M":"m";
                    var _getX = this.isAbsolute ? SVG._getX : SVG._getW;
                    var _getY = this.isAbsolute ? SVG._getY : SVG._getH;
                    d += _getX(parseFloat(x, 10)) + " " + _getY(parseFloat(y, 10)) + " ";
                    var oldD = this[0].getAttribute("d") || "";
                    this[0].setAttribute("d", oldD + d);
                    this.last.x = (this.isAbsolute ? 0 : this.last.x) + SVG._getX(parseFloat(x, 10));
                    this.last.y = (this.isAbsolute ? 0 : this.last.y) + SVG._getY(parseFloat(y, 10));
                    this.path.push({type: "move", arg: arguments, pos: this.isAbsolute});
                    return this;
                };
                p.lineTo = function (x, y) {
                    this.last.x = (this.isAbsolute ? 0 : this.last.x) + SVG._getX(parseFloat(x, 10));
                    this.last.y = (this.isAbsolute ? 0 : this.last.y) + SVG._getY(parseFloat(y, 10));
                    var d = this.isAbsolute?"L":"l";
                    var _getX = this.isAbsolute ? SVG._getX : SVG._getW;
                    var _getY = this.isAbsolute ? SVG._getY : SVG._getH;
                    d += _getX(parseFloat(x, 10)) + " " + _getY(parseFloat(y, 10)) + " ";
                    var oldD = this[0].getAttribute("d") || "";
                    this[0].setAttribute("d", oldD + d);
                    this.path.push({type: "line", arg: arguments, pos: this.isAbsolute});
                    return this;
                };
                p.arcTo = function (rx, ry, large_arc_flag, sweep_flag, x, y) {
                    var d = this.isAbsolute ? "A" : "a";
                    var _getX = this.isAbsolute ? SVG._getX : SVG._getW;
                    var _getY = this.isAbsolute ? SVG._getY : SVG._getH;
                    d += [SVG._getW(parseFloat(rx, 10)), SVG._getH(parseFloat(ry, 10)), 0, large_arc_flag, sweep_flag, _getX(parseFloat(x, 10)), _getY(parseFloat(y, 10))].join(" ");
                    var oldD = this[0].getAttribute("d") || "";
                    this[0].setAttribute("d", oldD + d);
                    this.last.x = SVG._getX(parseFloat(x, 10));
                    this.last.y = SVG._getY(parseFloat(y, 10));
                    this.path.push({type: "arc", arg: arguments, pos: this.isAbsolute});
                    return this;
                };
                p.cplineTo = function (x1, y1, w1) {
                    if (!w1) {
                        return this.lineTo(x1, y1);
                    } else {
                        var p = {};
                        p._getX = this.isAbsolute ? SVG._getX : SVG._getW;
                        p._getY = this.isAbsolute ? SVG._getY : SVG._getH;
                        var x = p._getX(Math.round(parseFloat(x1, 10) * 100) / 100);
                        var y = p._getY(Math.round(parseFloat(y1, 10) * 100) / 100);
                        var w = SVG._getW(Math.round(parseFloat(w1, 10) * 100) / 100);
                        var d = this.isAbsolute?"C":"c";
                        var attr = [this.last.x + w, this.last.y, x - w, y, x, y];
                        for (var i = 0, ii = attr.length; i < ii; i++) {
                            d += attr[i] + " ";
                        }
                        this.last.x = (this.isAbsolute ? 0 : this.last.x) + attr[4];
                        this.last.y = (this.isAbsolute ? 0 : this.last.y) + attr[5];
                        this.last.bx = attr[2];
                        this.last.by = attr[3];
                        var oldD = this[0].getAttribute("d") || "";
                        this[0].setAttribute("d", oldD + d);
                        this.path.push({type: "cpline", arg: arguments, pos: this.isAbsolute});
                        return this;
                    }
                };
                p.curveTo = function () {
                    var p = {};
                    p._getX = this.isAbsolute ? SVG._getX : SVG._getW;
                    p._getY = this.isAbsolute ? SVG._getY : SVG._getH;
                    if (arguments.length == 6) {
                        var d = this.isAbsolute?"C":"c";
                        for (var i = 0, ii = arguments.length; i < ii; i++) {
                            d += p[(i % 2 == 0) ? "_getX" : "_getY"](Math.round(parseFloat(arguments[i], 10) * 100) / 100) + " ";
                        }
                        this.last.x = (this.isAbsolute ? 0 : this.last.x) + p._getX((parseFloat(arguments[4], 10) * 100) / 100);
                        this.last.y = (this.isAbsolute ? 0 : this.last.y) + p._getY((parseFloat(arguments[5], 10) * 100) / 100);
                        this.last.bx = p._getX((parseFloat(arguments[2], 10) * 100) / 100);
                        this.last.by = p._getY((parseFloat(arguments[3], 10) * 100) / 100);
                    } else {
                        if (arguments.length == 4) {
                            var d = this.isAbsolute?"S":"s";
                            for (var i = 0, ii = arguments.length; i < ii; i++) {
                                d += p[i % 2 == 0 ? "_getX" : "_getY"]((parseFloat(arguments[i], 10) * 100) / 100) + " ";
                            }
                        }
                        this.last.x = (this.isAbsolute ? 0 : this.last.x) + p._getX((parseFloat(arguments[2], 10) * 100) / 100);
                        this.last.y = (this.isAbsolute ? 0 : this.last.y) + p._getY((parseFloat(arguments[3], 10) * 100) / 100);
                        this.last.bx = p._getX((parseFloat(arguments[0], 10) * 100) / 100);
                        this.last.by = p._getY((parseFloat(arguments[1], 10) * 100) / 100);
                    }
                    var oldD = this[0].getAttribute("d") || "";
                    this[0].setAttribute("d", oldD + d);
                    this.path.push({type: "curve", arg: arguments, pos: this.isAbsolute});
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
                    this.path.push({type: "end"});
                    return this;
                };
                if (typeof pathString == "string") {
                    p.absolutely();
                    C.pathfinder(p, pathString);
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
                };
                for (var att in params) {
                    var value = params[att];
                    o.attrs[att] = value;
                    switch (att) {
                        case "rx":
                        case "cx":
                        case "x":
                            o[0].setAttribute(att, o.svg._getX(value));
                            updatePosition(o);
                            break;
                        case "ry":
                        case "cy":
                        case "y":
                            o[0].setAttribute(att, o.svg._getY(value));
                            updatePosition(o);
                            break;
                        case "width":
                            o[0].setAttribute(att, o.svg._getW(value));
                            break;
                        case "height":
                            o[0].setAttribute(att, o.svg._getH(value));
                            break;
                        case "gradient":
                            addGrdientFill(o[0], value, o.svg);
                            break;
                        case "stroke-dasharray":
                            value = dasharray[value.toLowerCase()];
                            if (value) {
                                var width = params["stroke-width"] || o.attr("stroke-width") || "1",
                                    butt = {round: width, square: width, butt: 0}[o.attr("stroke-linecap")] || 0,
                                    dashes = [];
                                for (var i = 0, ii = value.length; i < ii; i++) {
                                    dashes.push(value[i] * width + ((i % 2) ? 1 : -1) * butt);
                                }
                                value = dashes.join(",");
                                o[0].setAttribute(att, value);
                            }
                            break;
                        case "text":
                            if (o.type == "text") {
                                o[0].childNodes.length && o[0].removeChild(o[0].firstChild);
                                o[0].appendChild(document.createTextNode(value));
                            }
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
                                o[0].style.fill = "url(#" + el.id + ")";
                                o[0].setAttribute("fill", "url(#" + el.id + ")");
                                o.pattern = el;
                                updatePosition(o);
                                break;
                            }
                        default :
                            var cssrule = att.replace(/(\-.)/g, function (w) {
                                return w.substring(1).toUpperCase();
                            });
                            o[0].style[cssrule] = value;
                            // Need following line for Firefox
                            o[0].setAttribute(att, value);
                            break;
                    }
                }
            };
            var Element = function (node, svg) {
                var X = 0,
                    Y = 0,
                    Rotation = {deg: 0, x: 0, y: 0},
                    ScaleX = 1,
                    ScaleY = 1,
                    tMatrix = null;
                this[0] = node;
                this.node = node;
                this.svg = svg;
                this.attrs = this.attrs || {};
                this.transformations = []; // rotate, translate, scale, matrix
                this.rotate = function (deg) {
                    if (deg == undefined) {
                        return Rotation.deg;
                    }
                    var bbox = this.getBBox();
                    Rotation.deg += deg;
                    if (Rotation.deg) {
                        this.transformations[0] = ("rotate(" + Rotation.deg + " " + (bbox.x + bbox.width / 2) + " " + (bbox.y + bbox.height / 2) + ")");
                    } else {
                        this.transformations[0] = "";
                    }
                    this[0].setAttribute("transform", this.transformations.join(" "));
                    return this;
                };
                this.translate = function (x, y) {
                    if (x == undefined && y == undefined) {
                        return {x: X, y: Y};
                    }
                    X += x;
                    Y += y;
                    if (X || Y) {
                        this.transformations[1] = "translate(" + X + "," + Y + ")";
                    } else {
                        this.transformations[1] = "";
                    }
                    this[0].setAttribute("transform", this.transformations.join(" "));
                    return this;
                };
                this.scale = function (x, y) {
                    if (x == undefined && y == undefined) {
                        return {x: ScaleX, y: ScaleY};
                    }
                    y = y || x;
                    if (x != 0 && !(x == 1 && y == 1)) {
                        ScaleX *= x;
                        ScaleY *= y;
                        if (!(ScaleX == 1 && ScaleY == 1)) {
                            var bbox = this.getBBox(),
                                dx = bbox.x * (1 - ScaleX) + (bbox.width / 2 - bbox.width * ScaleX / 2),
                                dy = bbox.y * (1 - ScaleY) + (bbox.height / 2 - bbox.height * ScaleY / 2);
                            this.transformations[2] = new Matrix(ScaleX, 0, 0, ScaleY, dx, dy);
                        } else {
                            this.transformations[2] = "";
                        }
                        this[0].setAttribute("transform", this.transformations.join(" "));
                    }
                    return this;
                };
            };
            Element.prototype.hide = function () {
                this[0].style.display = "none";
                return this;
            };
            Element.prototype.show = function () {
                this[0].style.display = "block";
                return this;
            };
            // depricated
            Element.prototype.matrix = function (xx, xy, yx, yy, dx, dy) {
                this.transformations[3] = new Matrix(xx, xy, yx, yy, dx, dy);
                this[0].setAttribute("transform", this.transformations.join(" "));
                return this;
            };
            Element.prototype.remove = function () {
                this[0].parentNode.removeChild(this[0]);
            };
            Element.prototype.getBBox = function () {
                return this[0].getBBox();
            };
            Element.prototype.attr = function () {
                if (arguments.length == 1 && typeof arguments[0] == "string") {
                    return this[0].getAttribute(arguments[0]);
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
                this[0].parentNode.appendChild(this[0]);
                return this;
            };
            Element.prototype.toBack = function () {
                if (this[0].parentNode.firstChild != this[0]) {
                    this[0].parentNode.insertBefore(this[0], this[0].parentNode.firstChild);
                }
                return this;
            };
            var theCircle = function (svg, x, y, r) {
                var el = document.createElementNS(svg.svgns, "circle");
                el.setAttribute("cx", svg._getX(x));
                el.setAttribute("cy", svg._getY(y));
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
                el.setAttribute("x", svg._getX(x));
                el.setAttribute("y", svg._getY(y));
                el.setAttribute("width", svg._getW(w));
                el.setAttribute("height", svg._getH(h));
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
                el.setAttribute("cx", svg._getX(x));
                el.setAttribute("cy", svg._getY(y));
                el.setAttribute("rx", svg._getW(rx));
                el.setAttribute("ry", svg._getH(ry));
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
                el.setAttribute("x", svg._getX(x));
                el.setAttribute("y", svg._getY(y));
                el.setAttribute("width", svg._getW(w));
                el.setAttribute("height", svg._getH(h));
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
            C.linerect = function (x, y, w, h, r) {
                if (r && parseInt(r, 10)) {
                    return this.path({stroke: "#000"}).moveTo(x + r, y).lineTo(x + w - r, y).addRoundedCorner(r, "rd").lineTo(x + w, y + h - r).addRoundedCorner(r, "dl").lineTo(x + r, y + h).addRoundedCorner(r, "lu").lineTo(x, y + r).addRoundedCorner(r, "ur").andClose();
                }
                return this.path({stroke: "#000"}).moveTo(x, y).lineTo(x + w, y).lineTo(x + w, y + h).lineTo(x, y + h).andClose();
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
            C.setGrid = function (xmin, ymin, xmax, ymax, w, h) {
                var xc = (xmax - xmin) / w;
                var yc = (ymax - ymin) / h;
                this._getX = function (x) {
                    return xmin + x * xc;
                };
                this._getY = function (y) {
                    return ymin + y * yc;
                };
                this._getW = function (w) {
                    return w * xc;
                };
                this._getH = function (h) {
                    return h * yc;
                };
            };
            C.clearGrid = function () {
                this._getX = this._getY = this._getW = this._getH = function (x) { return x; };
            };
            C.safari = function () {
                if (r.type == "SVG") {
                    var rect = C.rect(-C.width, -C.height, C.width * 3, C.height * 3).attr({stroke: "none"});
                    setTimeout(function () {rect.remove();}, 0);
                }
            };
            Element.prototype.animateTo = function (x, y, ms, callback) {
                clearTimeout(this.animation_in_progress);
                if ("cx" in this.attrs || "x" in this.attrs) {
                    var is_round = ("cx" in this.attrs),
                        X = this.attrs.cx || this.attrs.x,
                        Y = this.attrs.cy || this.attrs.y;
                    if (x == X && y == Y) {
                        return this;
                    }
                    var dy = y - Y,
                        dx = x - X,
                        coeff = dy / dx,
                        plus = Y - coeff * X,
                        alpha = Math.atan(this.coeff);
                    this.xs = this.step * Math.cos(alpha);
                    if (x < X) {
                        this.xs = -this.xs;
                    }
                    var start = new Date(),
                        that = this;
                    (function () {
                        var time = (new Date()).getTime() - start.getTime();
                        if (time < ms) {
                            var x1 = X + time * dx / ms;
                            var y1 = x1 * coeff + plus;
                            that.attr(is_round ? {cx: x1, cy: y1} : {x: x1, y: y1});
                            that.animation_in_progress = setTimeout(arguments.callee, 1);
                            C.safari();
                        } else {
                            that.attr(is_round ? {cx: x, cy: y} : {x: x, y: y});
                            C.safari();
                            callback && callback.call(that);
                        }
                    })();
                }
                return this;
            };
            C.pathfinder = function (p, path) {
                var commands = {
                    M: function (x, y) {
                        this.moveTo(x, y);
                    },
                    m: function (x, y) {
                        this.moveTo(this.last.x + x, this.last.y + y);
                    },
                    C: function (x1, y1, x2, y2, x3, y3) {
                        this.curveTo(x1, y1, x2, y2, x3, y3);
                    },
                    c: function (x1, y1, x2, y2, x3, y3) {
                        this.curveTo(this.last.x + x1, this.last.y + y1, this.last.x + x2, this.last.y + y2, this.last.x + x3, this.last.y + y3);
                    },
                    S: function (x1, y1, x2, y2) {
                        p.curveTo(x1, y1, x2, y2);
                    },
                    s: function (x1, y1, x2, y2) {
                        this.curveTo(this.last.x + x1, this.last.y + y1, this.last.x + x2, this.last.y + y2);
                    },
                    L: function (x, y) {
                        p.lineTo(x, y);
                    },
                    l: function (x, y) {
                        this.lineTo(this.last.x + x, this.last.y + y);
                    },
                    H: function (x) {
                        this.lineTo(x, this.last.y);
                    },
                    h: function (x) {
                        this.lineTo(this.last.x + x, this.last.y);
                    },
                    V: function (y) {
                        this.lineTo(this.last.x, y);
                    },
                    v: function (y) {
                        this.lineTo(this.last.x, this.last.y + y);
                    },
                    A: function (rx, ry, xaxisrotation, largearcflag, sweepflag, x, y) {
                        this.arcTo(rx, ry, largearcflag, sweepflag, x, y);
                    },
                    a: function (rx, ry, xaxisrotation, largearcflag, sweepflag, x, y) {
                        this.arcTo(this.last.x + rx, this.last.y + ry, largearcflag, sweethisflag, this.last.x + x, this.last.y + y);
                    },
                    z: function () {
                        this.andClose();
                    }
                };
                path.replace(/([mzlhvcsqta])\s*((-?\d*\.?\d*\s*,?\s*)+)/ig, function (a, b, c) {
                    var params = [];
                    c.replace(/(-?\d*\.?\d*)\s*,?\s*/ig, function (a, b) {
                        b && params.push(+b);
                    });
                    while (params.length >= commands[b].length) {
                        commands[b].apply(p, params.splice(0, commands[b].length));
                        if (!commands[b].length) {
                            break;
                        };
                    }
                });
            };
            return r;
        } else {
            return function () {};
        }
    })((!(window.SVGPreserveAspectRatio && window.SVGPreserveAspectRatio.SVG_PRESERVEASPECTRATIO_XMINYMIN == 2)) ? "VML" : "SVG");


Raphael.vml = !(Raphael.svg = (Raphael.type == "SVG"));
if (Raphael.vml && window.CanvasRenderingContext2D) {
    Raphael.type = "Canvas only";
    Raphael.vml = Raphael.svg = false;
}
Raphael.toString = function () {
    return "Your browser supports " + this.type + ".\nYou are running " + unescape("Rapha%EBl%20") + this.version;
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