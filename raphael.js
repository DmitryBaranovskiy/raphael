function Raphael() {
    return (function (r, args) {
        r.version = "0.5.4b";
        var C = {};
        function Matrix(m11, m12, m21, m22, dx, dy) {
            this.m = [
                [m11 || 1, m12 || 0, 0],
                [m21 || 0, m22 || 1, 0],
                [dx || 0, dy || 0, 1],
            ];
        }

        C._getX = C._getY = C._getW = C._getH = function (x) { return x; };

        if (r.vml) {
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
                    };
                };
                p.moveTo = function (x, y) {
                    var d = this.isAbsolute?"m":"t";
                    var _getX = this.isAbsolute ? VML._getX : VML._getW;
                    var _getY = this.isAbsolute ? VML._getY : VML._getH;
                    d += Math.round(_getX(parseFloat(x, 10))) + " " + Math.round(_getY(parseFloat(y, 10)));
                    this[0].path = this.Path += d;
                    this.last.x = Math.round(_getX(parseFloat(x, 10)));
                    this.last.y = Math.round(_getY(parseFloat(y, 10)));
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
                    this.last.x = Math.round(_getX(parseFloat(x, 10)));
                    this.last.y = Math.round(_getY(parseFloat(y, 10)));
                    this.last.isAbsolute = this.isAbsolute;
                    this.path.push({type: "line", arg: [].slice.call(arguments, 0), pos: this.isAbsolute});
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
                        var attr = [this.last.x + w, this.last.y, x - w, y, x, y];
                        d += attr.join(" ") + " ";
                        this.last.x = attr[4];
                        this.last.y = attr[5];
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
                        this.last.x = Math.round(_getX(parseFloat(arguments[4], 10)));
                        this.last.y = Math.round(_getY(parseFloat(arguments[5], 10)));
                        this.last.bx = Math.round(_getX(parseFloat(arguments[2], 10)));
                        this.last.by = Math.round(_getY(parseFloat(arguments[3], 10)));
                        d += Math.round(_getX(parseFloat(arguments[0], 10))) + " " + Math.round(_getY(parseFloat(arguments[1], 10))) + " " +
                             Math.round(_getX(parseFloat(arguments[2], 10))) + " " + Math.round(_getY(parseFloat(arguments[3], 10))) + " " +
                             Math.round(_getX(parseFloat(arguments[4], 10))) + " " + Math.round(_getY(parseFloat(arguments[5], 10))) + " ";
                        this.last.isAbsolute = this.isAbsolute;
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
                    pathString = pathString.replace(/([mzlhvcsqta])/ig, ",$1,").replace(/([^,])\-/ig, "$1,-");
                    path = pathString.split(",");
                    var i = 1, ii = path.length;
                    while (i < ii) {
                        switch (path[i]) {
                            case "M":
                                p.absolutely().moveTo(path[++i], path[++i]);
                                break;
                            case "m":
                                p.relatively().moveTo(path[++i], path[++i]);
                                break;
                            case "C":
                                p.absolutely().curveTo(path[++i], path[++i], path[++i], path[++i], path[++i], path[++i]);
                                break;
                            case "c":
                                p.relatively().curveTo(path[++i], path[++i], path[++i], path[++i], path[++i], path[++i]);
                                break;
                            case "L":
                                p.absolutely().lineTo(path[++i], path[++i]);
                                break;
                            case "l":
                                p.relatively().lineTo(path[++i], path[++i]);
                                break;
                            case "H":
                                p.absolutely().lineTo(path[++i], 0);
                                break;
                            case "h":
                                p.relatively().lineTo(path[++i], 0);
                                break;
                            case "V":
                                p.absolutely().lineTo(0, path[++i]);
                                break;
                            case "v":
                                p.relatively().lineTo(0, path[++i]);
                                break;
                            case "Z":
                            case "z":
                                p.andClose();
                                break;
                        }
                        i++;
                    }
                }
                return p;
            };
            var setFillAndStroke = function (o, params) {
                o[0].attrs = o[0].attrs || {};
                for (var par in params) {
                    o[0].attrs[par] = params[par];
                }
                params["font-family"] && (o[0].style.fontFamily = params["font-family"]);
                params["font-size"] && (o[0].style.fontSize = params["font-size"]);
                params["font"] && (o[0].style.font = params["font"]);
                params["font-weight"] && (o[0].style.fontWeight = params["font-weight"]);
                if (typeof params.opacity != "undefined" || typeof params["stroke-width"] != "undefined" || typeof params.fill != "undefined" || typeof params.stroke != "undefined") {
                    o = o.shape || o[0];
                    var fill = (o.getElementsByTagName("fill") && o.getElementsByTagName("fill")[0]) || document.createElement("rvml:fill");
                    if ("fill-opacity" in params || "opacity" in params) {
                        fill.opacity = ((params["fill-opacity"] + 1 || 2) - 1) * ((params.opacity + 1 || 2) - 1);
                    }
                    params.fill && (fill.on = true);
                    if (fill.on) {
                        fill.color = params.fill;
                    }
                    if (params.fill == "none") {
                        fill.on = false;
                    }
                    o.appendChild(fill);
                    var stroke = (o.getElementsByTagName("stroke") && o.getElementsByTagName("stroke")[0]) || document.createElement("rvml:stroke");
                    stroke.on = !!(params.stroke || params["stroke-width"] || params["stroke-opacity"] || params["stroke-dasharray"]);
                    if (stroke.on) {
                        stroke.color = params.stroke;
                    }
                    stroke.opacity = ((params["stroke-opacity"] + 1 || 2) - 1) * ((params.opacity + 1 || 2) - 1);
                    stroke.joinstyle = params["stroke-linejoin"] || "miter";
                    stroke.miterlimit = params["stroke-miterlimit"] || 8;
                    stroke.endcap = {butt: "flat", square: "square", round: "round"}[params["stroke-linecap"] || "miter"];
                    stroke.weight = parseFloat(params["stroke-width"], 10) + "px" || "1px";
                    if (params["stroke-dasharray"]) {
                        var dashes = params["stroke-dasharray"].replace(" ", ",").split(","),
                            dashesn = [],
                            str = parseFloat(stroke.weight, 10);
                        for (var i = 0, ii = dashes.length; i < ii; i++) {
                            var res = dashes[i] / str;
                            if (!isNaN(res)) {
                                dashesn.push(res);
                            }
                        };
                        stroke.dashstyle = dashesn.join(" ");
                    }
                    o.appendChild(stroke);
                }
            };
            var addGrdientFill = function (o, gradient) {
                o[0].attrs = o[0].attrs || {};
                o[0].attrs.gradient = gradient;
                o = o.shape || o[0];
                var fill = o.getElementsByTagName("fill");
                if (fill.length) {
                    fill = fill[0];
                } else {
                    fill = document.createElement("rvml:fill");
                }
                if (gradient.dots.length) {
                    fill.on = true;
                    fill.type = (gradient.type.toLowerCase() == "linear") ? "gradient" : "gradientradial";
                    if (typeof gradient.dots[0].color != "undefined") {
                        fill.color = gradient.dots[0].color || "#000";
                    }
                    if (typeof gradient.dots[0].opacity != "undefined") {
                        fill.opacity = gradient.dots[0].opacity;
                    }
                    if (typeof gradient.dots[gradient.dots.length - 1].opacity != "undefined") {
                        fill.opacity2 = gradient.dots[gradient.dots.length - 1].opacity;
                    }
                    if (typeof gradient.dots[gradient.dots.length - 1].color != "undefined") {
                        fill.color2 = gradient.dots[gradient.dots.length - 1].color || "#000";
                    }
                    var colors = "";
                    for (var i = 1, ii = gradient.dots.length - 1; i < ii; i++) {
                        colors += gradient.dots[i].offset + " " + gradient.dots[i].color;
                        if (i != ii - 1) {
                            colors += ",";
                        }
                    };
                    if (colors) {
                        fill.colors = colors;
                    }
                    if (gradient.vector) {
                        var angle = Math.round(Math.atan((parseInt(gradient.vector[3], 10) - parseInt(gradient.vector[1], 10)) / (parseInt(gradient.vector[2], 10) - parseInt(gradient.vector[0], 10))) * 57.29) + 180;
                        fill.angle = angle + 90;
                    }
                    if (gradient.type.toLowerCase() == "radial") {
                        fill.focusposition = "0.5, 0.5";
                        fill.focussize = "0, 0";
                        fill.method = "none";
                    }
                }
            };
            var setTheBox = function (vml, o, x, y, w, h) {
                o.origin = o.origin || {x: x, y: y, w: w, h: h};
                var left = vml.width / 2 - o.origin.w / 2,
                    top = vml.height / 2 - o.origin.h / 2,
                    gs = o.Group.style,
                    os = o[0].style;
                gs.position = "absolute";
                gs.left = o.origin.x - left + "px";
                gs.top = o.origin.y - top + "px";
                o.X = o.origin.x - left;
                o.Y = o.origin.y - top;
                o.W = w;
                o.H = h;
                gs.width = vml.width + "px";
                gs.height = vml.height + "px";
                os.position = "absolute";
                os.top = top + "px";
                os.left = left + "px";
                os.width = w + "px";
                os.height = h + "px";
            };
            var Element = function (node, group, vml) {
                var Rotation = 0,
                    RotX = 0,
                    RotY = 0,
                    Scale = 1;
                this[0] = node;
                this.X = 0;
                this.Y = 0;
                arguments.callee.name = "Element";
                this[0].attrs = {};
                this.Group = group;
                this.hide = function () {
                    this[0].style.display = "none";
                };
                this.show = function () {
                    this[0].style.display = "block";
                };
                this.rotate = function (deg) {
                    Rotation += deg;
                    this.Group.style.rotation = Rotation;
                    return this;
                };
                this.translate = function (x, y) {
                    this.X += x;
                    this.Y += y;
                    this.Group.style.left = this.X + "px";
                    this.Group.style.top = this.Y + "px";
                    return this;
                };
                // depricated
                this.matrix = function (xx, xy, yx, yy, dx, dy) {
                    tMatrix = new Matrix(xx, xy, yx, yy, dx, dy);
                    this.Group.style.filter = tMatrix;
                    return this;
                };
                this.scale = function (x, y) {
                    y = y || x;
                    if (x != 0 && !(x == 1 && y == 1)) {
                        var dirx = Math.round(x / Math.abs(x)),
                            diry = Math.round(y / Math.abs(y));
                        if (dirx != 1 || diry != 1) {
                            this[0].style.filter = new Matrix(dirx, 0, 0, diry, 0, 0);
                        }
                        var width = parseInt(this[0].style.width, 10) * x * dirx;
                        var height = parseInt(this[0].style.height, 10) * y * diry;
                        var left = parseInt(this[0].style.left, 10);
                        var top = parseInt(this[0].style.top, 10);
                        this[0].style.left = this.X = left + this.W / 2 - width / 2;
                        this[0].style.top = this.Y = top + this.H / 2 - height / 2;
                        this[0].style.width = this.W = width;
                        this[0].style.height = this.H = height;
                    }
                    return this;
                };
                this.getBBox = function () {
                    return {
                        x: this.Group.offsetLeft,
                        y: this.Group.offsetTop,
                        width: this.Group.offsetWidth,
                        height: this.Group.offsetHeight
                    };
                };
                this.remove = function () {
                    this[0].parentNode.removeChild(this[0]);
                    this.Group.parentNode.removeChild(this.Group);
                    this.shape && this.shape.parentNode.removeChild(this.shape);
                };
                this.attr = function () {
                    if (arguments.length == 1 && typeof arguments[0] == "string") {
                        return this[0].attrs[arguments[0]];
                    }
                    if (this[0].attrs && arguments.length == 1 && arguments[0] instanceof Array) {
                        var values = {};
                        for (var i = 0, ii = arguments[0].length; i < ii; i++) {
                            values[arguments[0][i]] = this[0].attrs[arguments[0][i]];
                        };
                        return values;
                    }
                    if (this[0].tagName.toLowerCase() == "group") {
                        var children = this[0].childNodes;
                        this[0].attrs = this[0].attrs || {};
                        if (arguments.length == 2) {
                            this[0].attrs[arguments[0]] = arguments[1];
                        } else if (arguments.length = 1 || typeof arguments[0] == "object") {
                            for (var j in arguments[0]) {
                                this[0].attrs[j] = arguments[0][j];
                            }
                        }
                        for (var i = 0, ii = children.length; i < ii; i++) {
                            this.attr.apply(new item(children[i], this[0], vml), arguments);
                        }
                    } else {
                        if (arguments.length == 2) {
                            var att = arguments[0],
                                value = arguments[1];
                            switch (att) {
                                case "r":
                                    this[0].style.width = this[0].style.height = value * 2 + "px";
                                    this[0].style.left = vml._getX(this.cx) - value + "px";
                                    this[0].style.top = vml._getY(this.cy) - value + "px";
                                    this.r = value;
                                    break;
                                case "rx":
                                    this[0].style.width = value * 2 + "px";
                                    this[0].style.left = vml._getX(this.cx) - value + "px";
                                    this.rx = value;
                                    break;
                                case "ry":
                                    this[0].style.height = value * 2 + "px";
                                    this[0].style.top = vml._getY(this.cy) - value + "px";
                                    this.ry = value;
                                    break;
                                case "cx":
                                    if (this.r || this.rx) {
                                        this[0].style.left = vml._getX(value) - (this.r || vml._getW(this.rx)) + "px";
                                        this.cx = value;
                                    }
                                    break;
                                case "x":
                                    this[0].style.left = vml._getX(value) + "px";
                                    break;
                                case "cy":
                                    if (this.r || this.ry) {
                                        this[0].style.top = vml._getY(value) - (this.r || vml._getH(this.ry)) + "px";
                                        this.cy = value;
                                    }
                                    break;
                                case "y":
                                    this[0].style.top = vml._getY(value) + "px";
                                    break;
                                case "fill":
                                case "fill-opacity":
                                case "joinstyle":
                                case "opacity":
                                case "stroke":
                                case "stroke-dasharray":
                                case "stroke-opacity":
                                case "stroke-width":
                                    var params = {};
                                    params[att] = value;
                                    setFillAndStroke(this, params);
                                    break;
                                case "font":
                                case "font-family":
                                case "font-size":
                                case "font-weight":
                                case "height":
                                case "width":
                                    this[0].style[att] = value;
                                    break;
                                case "id":
                                    this[0].id = value;
                                    break;
                                case "text":
                                    if (this.type == "text") {
                                        this[0].string = value;
                                    }
                                    break;
                                case "gradient":
                                    addGrdientFill(this, value);
                            }
                        }
                        if (arguments.length == 1 && typeof arguments[0] == "object") {
                            var params = arguments[0];
                            setFillAndStroke(this, params);
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
                this.toFront = function () {
                    this.Group.parentNode.appendChild(this.Group);
                };
                this.toBack = function () {
                    if (this.Group.parentNode.firstChild != this.Group) {
                        this.Group.parentNode.insertBefore(this.Group, this.Group.parentNode.firstChild);
                    }
                };
            };
            var theCircle = function (vml, x, y, r) {
                var g = document.createElement("rvml:group");
                var o = document.createElement("rvml:oval");
                g.appendChild(o);
                vml.canvas.appendChild(g);
                var res = new Element(o, g, vml);
                setFillAndStroke(res, {stroke: "#000"});
                setTheBox(vml, res, x - r, y - r, r * 2, r * 2);
                o.attrs.cx = x;
                o.attrs.cy = y;
                o.attrs.r = r;
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
                setTheBox(vml, res, x, y, w, h);
                o.attrs.x = x;
                o.attrs.y = y;
                o.attrs.w = w;
                o.attrs.h = h;
                o.attrs.r = r;
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
                setTheBox(vml, res, x - rx, y - ry, rx * 2, ry * 2);
                o.attrs.cx = x;
                o.attrs.cy = y;
                o.attrs.rx = rx;
                o.attrs.ry = ry;
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
                setTheBox(vml, res, x, y, w, h);
                res.type = "image";
                return res;
            };
            var theText = function (vml, x, y, text) {
                // @TODO: setTheBox
                var g = document.createElement("rvml:group"), gs = g.style;
                var el = document.createElement("rvml:shape"), ol = el.style;
                var path = document.createElement("rvml:path"), ps = path.style;
                path.v = ["m", Math.round(x), ", ", Math.round(y), "l", Math.round(x) + 1, ", ", Math.round(y)].join("");
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
                // g.appendChild(el);
                vml.canvas.appendChild(el);
                var res = new Element(o, el, vml);
                res.shape = el;
                res.type = "text";
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
                    throw new Error("VML container not found.");
                }
                document.namespaces.add("rvml","urn:schemas-microsoft-com:vml");
                document.createStyleSheet().addRule("rvml\\:*", "behavior:url(#default#VML)");
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
        }
        if (r.svg) {
            Matrix.prototype.toString = function () {
                return "matrix(" + this.m[0][0] +
                    ", " + this.m[1][0] + ", " + this.m[0][1] + ", " + this.m[1][1] +
                    ", " + this.m[2][0] + ", " + this.m[2][1] + ")";
            };
            var thePath = function (params, pathString, SVG) {
                var el = document.createElementNS(SVG.svgns, "path");
                el.setAttribute("fill", "none");
                if (params) {
                    for (var attr in params) {
                        if (params.gradient) {
                            addGrdientFill(el, params.gradient, SVG);
                        } else {
                            el.setAttribute(attr, params[attr]);
                        }
                    }
                }
                if (SVG.canvas) {
                    SVG.canvas.appendChild(el);
                }
                var p = new Element(el, SVG);
                for (var attr in params) {
                    p.attrs[attr] = params[attr];
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
                    };
                };
                p.moveTo = function (x, y) {
                    var d = this.isAbsolute?"M":"m";
                    var _getX = this.isAbsolute ? SVG._getX : SVG._getW;
                    var _getY = this.isAbsolute ? SVG._getY : SVG._getH;
                    d += _getX(parseFloat(x, 10)) + " " + _getY(parseFloat(y, 10)) + " ";
                    var oldD = this[0].getAttribute("d") || "";
                    this[0].setAttribute("d", oldD + d);
                    this.last.x = SVG._getX(parseFloat(x, 10));
                    this.last.y = SVG._getY(parseFloat(y, 10));
                    this.path.push({type: "move", arg: arguments, pos: this.isAbsolute});
                    return this;
                };
                p.lineTo = function (x, y) {
                    var d = this.isAbsolute?"L":"l";
                    var _getX = this.isAbsolute ? SVG._getX : SVG._getW;
                    var _getY = this.isAbsolute ? SVG._getY : SVG._getH;
                    d += _getX(parseFloat(x, 10)) + " " + _getY(parseFloat(y, 10)) + " ";
                    var oldD = this[0].getAttribute("d") || "";
                    this[0].setAttribute("d", oldD + d);
                    this.last.x = SVG._getX(parseFloat(x, 10));
                    this.last.y = SVG._getY(parseFloat(y, 10));
                    this.path.push({type: "line", arg: arguments, pos: this.isAbsolute});
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
                        this.last.x = attr[4];
                        this.last.y = attr[5];
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
                        this.last.x = p._getX((parseFloat(arguments[4], 10) * 100) / 100);
                        this.last.y = p._getY((parseFloat(arguments[5], 10) * 100) / 100);
                        this.last.bx = p._getX((parseFloat(arguments[2], 10) * 100) / 100);
                        this.last.by = p._getY((parseFloat(arguments[3], 10) * 100) / 100);
                    } else {
                        if (arguments.length == 4) {
                            var d = this.isAbsolute?"S":"s";
                            for (var i = 0, ii = arguments.length; i < ii; i++) {
                                d += p[i % 2 == 0 ? "_getX" : "_getY"]((parseFloat(arguments[i], 10) * 100) / 100) + " ";
                            }
                        }
                        this.last.x = p._getX((parseFloat(arguments[2], 10) * 100) / 100);
                        this.last.y = p._getY((parseFloat(arguments[3], 10) * 100) / 100);
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
                    pathString = pathString.replace(/([mzlhvcsqta])/ig, ",$1,").replace(/([^,])\-/ig, "$1,-");
                    path = pathString.split(",");
                    var i = 1, ii = path.length;
                    while (i < ii) {
                        switch (path[i]) {
                            case "M":
                                p.absolutely().moveTo(path[++i], path[++i]);
                                break;
                            case "m":
                                p.relatively().moveTo(path[++i], path[++i]);
                                break;
                            case "C":
                                p.absolutely().curveTo(path[++i], path[++i], path[++i], path[++i], path[++i], path[++i]);
                                break;
                            case "c":
                                p.relatively().curveTo(path[++i], path[++i], path[++i], path[++i], path[++i], path[++i]);
                                break;
                            case "s":
                                p.relatively().curveTo(path[++i], path[++i], path[++i], path[++i]);
                                break;
                            case "S":
                                p.absolutely().curveTo(path[++i], path[++i], path[++i], path[++i]);
                                break;
                            case "L":
                                p.absolutely().lineTo(path[++i], path[++i]);
                                break;
                            case "l":
                                p.relatively().lineTo(path[++i], path[++i]);
                                break;
                            case "H":
                                p.absolutely().lineTo(path[++i], 0);
                                break;
                            case "h":
                                p.relatively().lineTo(path[++i], 0);
                                break;
                            case "V":
                                p.absolutely().lineTo(0, path[++i]);
                                break;
                            case "v":
                                p.relatively().lineTo(0, path[++i]);
                                break;
                            case "z":
                                p.andClose();
                                break;
                        }
                        i++;
                    }
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
            var Element = function (node, svg) {
                var X = 0,
                    Y = 0,
                    Rotation = {deg: 0, x: 0, y: 0},
                    Scale = 1,
                    tMatrix = null;
                this[0] = node;
                this.attrs = this.attrs || {};
                this.transformations = [];
                this.hide = function () {
                    this[0].style.display = "none";
                };
                this.show = function () {
                    this[0].style.display = "block";
                };
                this.rotate = function (deg) {
                    var bbox = this.getBBox();
                    this.transformations.push("rotate(" + deg + " " + (bbox.x + bbox.width / 2) + " " + (bbox.y + bbox.height / 2) + ")");
                    this[0].setAttribute("transform", this.transformations.join(" "));
                    return this;
                };
                this.translate = function (x, y) {
                    this.transformations.push("translate(" + x + "," + y + ")");
                    this[0].setAttribute("transform", this.transformations.join(" "));
                    return this;
                };
                this.scale = function (x, y) {
                    y = y || x;
                    if (x != 0 && !(x == 1 && y == 1)) {
                        var bbox = this.getBBox(),
                            dx = bbox.x * (1 - x) + (bbox.width / 2 - bbox.width * x / 2),
                            dy = bbox.y * (1 - y) + (bbox.height / 2 - bbox.height * y / 2);
                        this.transformations.push(new Matrix(x, 0, 0, y, dx, dy));
                        this[0].setAttribute("transform", this.transformations.join(" "));
                    }
                    return this;
                };
                this.matrix = function (xx, xy, yx, yy, dx, dy) {
                    this.transformations.push(new Matrix(xx, xy, yx, yy, dx, dy));
                    this[0].setAttribute("transform", this.transformations.join(" "));
                    return this;
                };
                this.remove = function () {
                    this[0].parentNode.removeChild(this[0]);
                };
                this.getBBox = function () {
                    return this[0].getBBox();
                };
                this.attr = function () {
                    if (arguments.length == 1 && typeof arguments[0] == "string") {
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
                        var att = arguments[0],
                            value = arguments[1];
                        this[att] = value;
                        this.attrs[att] = value;
                        switch (att) {
                            case "rx":
                            case "cx":
                            case "x":
                                this[0].setAttribute(att, svg._getX(value));
                                break;
                            case "ry":
                            case "cy":
                            case "y":
                                this[0].setAttribute(att, svg._getY(value));
                                break;
                            case "width":
                                this[0].setAttribute(att, svg._getW(value));
                                break;
                            case "height":
                                this[0].setAttribute(att, svg._getH(value));
                                break;
                            case "gradient":
                                addGrdientFill(this[0], params.gradient, svg);
                                break;
                            case "stroke-dasharray":
                                this[0].setAttribute(att, value.replace(" ", ","));
                                break;
                            case "text":
                                if (this.type == "text") {
                                    this[0].removeChild(this[0].firstChild);
                                    this[0].appendChild(document.createTextNode(value));
                                }
                                break;
                            default :
                                var cssrule = att.replace(/(\-.)/g, function (w) {
                                    return w.substring(1).toUpperCase();
                                });
                                this[0].style[cssrule] = value;
                                // Need following line for Firefox
                                this[0].setAttribute(att, value);
                        }
                    } else if (arguments.length = 1 && typeof arguments[0] == "object") {
                        var params = arguments[0];
                        for (var attr in params) {
                            this.attrs[attr] = params[attr];
                            if (attr == "stroke-dasharray") {
                                this[0].setAttribute(attr, params[attr].replace(" ", ","));
                            } else if (attr == "text" && this.type == "text") {
                                this[0].removeChild(this[0].firstChild);
                                this[0].appendChild(document.createTextNode(params[attr]));
                            } else {
                                var cssrule = attr.replace(/(\-.)/g, function (w) {
                                    return w.substring(1).toUpperCase();
                                });
                                this[0].style[cssrule] = params[attr];
                                // Need following line for Firefox
                                this[0].setAttribute(attr, params[attr]);
                            }
                        }
                        if (params.gradient) {
                            this[0].attrs.gradient = params.gradient;
                            addGrdientFill(this[0], params.gradient, svg);
                        }
                    }
                    return this;
                };
                this.toFront = function () {
                    this[0].parentNode.appendChild(this[0]);
                };
                this.toBack = function () {
                    if (this[0].parentNode.firstChild != this[0]) {
                        this[0].parentNode.insertBefore(this[0], this[0].parentNode.firstChild);
                    }
                };
            };
            var theCircle = function (svg, x, y, r) {
                var el = document.createElementNS(svg.svgns, "circle");
                el.setAttribute("cx", svg._getX(x));
                el.setAttribute("cy", svg._getY(y));
                el.setAttribute("r", r);
                el.setAttribute("fill", "none");
                el.setAttribute("stroke", "#000");
                el.attrs = el.attrs || {};
                el.attrs.cx = x;
                el.attrs.cy = y;
                el.attrs.r = r;
                el.attrs.stroke = "#000";
                if (svg.canvas) {
                    svg.canvas.appendChild(el);
                }
                var res = new Element(el, svg);
                res.type = "circle";
                return res;
            };
            var theRect = function (svg, x, y, w, h, r) {
                var el = document.createElementNS(svg.svgns, "rect");
                el.setAttribute("x", svg._getX(x));
                el.setAttribute("y", svg._getY(y));
                el.setAttribute("width", svg._getW(w));
                el.setAttribute("height", svg._getH(h));
                el.attrs = el.attrs || {};
                el.attrs.x = x;
                el.attrs.y = y;
                el.attrs.width = w;
                el.attrs.height = h;
                if (r) {
                    el.setAttribute("rx", r);
                    el.setAttribute("ry", r);
                    el.attrs.rx = el.attrs.ry = r;
                }
                el.setAttribute("fill", "none");
                el.setAttribute("stroke", "#000");
                el.attrs.stroke = "#000";
                if (svg.canvas) {
                    svg.canvas.appendChild(el);
                }
                var res = new Element(el, svg);
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
                el.attrs = el.attrs || {};
                el.attrs.cx = x;
                el.attrs.cy = y;
                el.attrs.rx = rx;
                el.attrs.ry = ry;
                el.attrs.stroke = "#000";
                if (svg.canvas) {
                    svg.canvas.appendChild(el);
                }
                var res = new Element(el, svg);
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
                res.type = "image";
                return res;
            };
            var theText = function (svg, x, y, text) {
                var el = document.createElementNS(svg.svgns, "text");
                el.setAttribute("x", x);
                el.setAttribute("y", y);
                el.setAttribute("text-anchor", "middle");
                el.setAttribute("fill", "#000");
                el.attrs = el.attrs || {};
                el.attrs.x = x;
                el.attrs.y = y;
                el.attrs.fill = "#000";
                if (text) {
                    el.appendChild(document.createTextNode(text));
                }
                if (svg.canvas) {
                    svg.canvas.appendChild(el);
                }
                var res = new Element(el, svg);
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
            C.svgns = "http://www.w3.org/2000/svg";
            C.xlink = "http://www.w3.org/1999/xlink";
        }
        if (r.vml || r.svg) {
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
                var res = this.group();
                var params = {stroke: color, "stroke-width": "1px", "stroke-opacity": .3};
                res.rect(x, y, w, h).attr(params);
                for (var i = 1; i < hv; i++) {
                    var p = res.path(params);
                    p.moveTo(x, y + i * Math.round(h / hv)).lineTo(x + w, y + i * Math.round(h / hv));
                }
                for (var i = 1; i < wv; i++) {
                    res.path(params).moveTo(x + i * Math.round(w / wv), y).lineTo(x + i * Math.round(w / wv), y + h);
                }
                return res;
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
                if (this.type == "SVG") {
                    var rect = C.rect(0, 0, C.width, C.height).attr("stroke-width", 0);
                    setTimeout(function () {rect.remove();}, 0);
                }
            };
            Raphael = function () {
                return r._create.apply(r, arguments);
            };
            return r._create.apply(r, args);
        } else {
            return null;
        }
    })(arguments.callee, arguments);
}


Raphael.type = (!(window.SVGPreserveAspectRatio && window.SVGPreserveAspectRatio.SVG_PRESERVEASPECTRATIO_XMINYMIN == 2) && !(window.CanvasRenderingContext2D)) ? "VML" : "SVG";
Raphael.vml = !(Raphael.svg = (Raphael.type == "SVG"));
if (!(window.SVGPreserveAspectRatio && window.SVGPreserveAspectRatio.SVG_PRESERVEASPECTRATIO_XMINYMIN == 2) && window.CanvasRenderingContext2D) {
    Raphael.type = "Canvas only";
    Raphael.vml = Raphael.svg = false;
}
Raphael.toString = function () {
    return "You browser supports " + this.type;
};