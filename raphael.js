/*
 * Raphaël 2.0.0 - JavaScript Vector Library
 *
 * Copyright (c) 2011 Dmitry Baranovskiy (http://raphaeljs.com)
 * Copyright (c) 2011 Sencha Labs (http://sencha.com)
 * Licensed under the MIT (http://raphaeljs.com/license.html) license.
 */
(function () {
    /*\
     * Raphael
     [ method ]
     **
     * Creates a canvas object on which to draw.
     * You must do this first, as all future calls to drawing methods
     * from this instance will be bound to this canvas.
     > Parameters
     **
     - container (HTMLElement|string) DOM element or its ID which is going to be a parent for drawing surface
     - width (number)
     - height (number)
     * or
     - x (number)
     - y (number)
     - width (number)
     - height (number)
     * or
     - all (array) (first 3 or 4 elements in the array are equal to [containerID, width, height] or [x, y, width, height]. The rest are element descriptions in format {type: type, <attributes>})
     * or
     - onReadyCallback (function) function that is going to be called on DOM ready event. You can also subscribe to this event via Eve’s “DOMLoad” event. In this case method returns `undefined`.
     = (object) @Paper
     > Usage
     | // Each of the following examples create a canvas
     | // that is 320px wide by 200px high.
     | // Canvas is created at the viewport’s 10,50 coordinate.
     | var paper = Raphael(10, 50, 320, 200);
     | // Canvas is created at the top left corner of the #notepad element
     | // (or its top right corner in dir="rtl" elements)
     | var paper = Raphael(document.getElementById("notepad"), 320, 200);
     | // Same as above
     | var paper = Raphael("notepad", 320, 200);
     | // Image dump
     | var set = Raphael(["notepad", 320, 200, {
     |     type: "rect",
     |     x: 10,
     |     y: 10,
     |     width: 25,
     |     height: 25,
     |     stroke: "#f00"
     | }, {
     |     type: "text",
     |     x: 30,
     |     y: 40,
     |     text: "Dump"
     | }]);
    \*/
    function R(first) {
        if (R.is(first, "function")) {
            return eve.on("DOMload", first);
        } else if (R.is(first, array)) {
            var a = first,
                cnv = create[apply](R, a.splice(0, 3 + R.is(a[0], nu))),
                res = cnv.set(),
                i = 0,
                ii = a.length,
                j;
            for (; i < ii; i++) {
                j = a[i] || {};
                elements[has](j.type) && res.push(cnv[j.type]().attr(j));
            }
            return res;
        }
        return create[apply](R, arguments);
    }
    R.version = "2.0.0";
    var separator = /[, ]+/,
        elements = {circle: 1, rect: 1, path: 1, ellipse: 1, text: 1, image: 1},
        formatrg = /\{(\d+)\}/g,
        proto = "prototype",
        has = "hasOwnProperty",
        g = {
            doc: document,
            win: window
        },
        oldRaphael = {
            was: Object.prototype[has].call(g.win, "Raphael"),
            is: g.win.Raphael
        },
        Paper = function () {},
        paperproto,
        appendChild = "appendChild",
        apply = "apply",
        concat = "concat",
        supportsTouch = "createTouch" in g.doc,
        E = "",
        S = " ",
        Str = String,
        split = "split",
        events = "click dblclick mousedown mousemove mouseout mouseover mouseup touchstart touchmove touchend orientationchange touchcancel gesturestart gesturechange gestureend".split(S),
        touchMap = {
            mousedown: "touchstart",
            mousemove: "touchmove",
            mouseup: "touchend"
        },
        lowerCase = Str.prototype.toLowerCase,
        math = Math,
        mmax = math.max,
        mmin = math.min,
        abs = math.abs,
        pow = math.pow,
        PI = math.PI,
        nu = "number",
        string = "string",
        array = "array",
        toString = "toString",
        fillString = "fill",
        objectToString = Object.prototype.toString,
        paper = {},
        push = "push",
        ISURL = /^url\(['"]?([^\)]+?)['"]?\)$/i,
        colourRegExp = /^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\))\s*$/i,
        isnan = {"NaN": 1, "Infinity": 1, "-Infinity": 1},
        bezierrg = /^(?:cubic-)?bezier\(([^,]+),([^,]+),([^,]+),([^\)]+)\)/,
        round = math.round,
        setAttribute = "setAttribute",
        toFloat = parseFloat,
        toInt = parseInt,
        ms = " progid:DXImageTransform.Microsoft",
        upperCase = Str.prototype.toUpperCase,
        availableAttrs = {"arrow-end": "none", "arrow-start": "none", blur: 0, "clip-rect": "0 0 1e9 1e9", cursor: "default", cx: 0, cy: 0, fill: "#fff", "fill-opacity": 1, font: '10px "Arial"', "font-family": '"Arial"', "font-size": "10", "font-style": "normal", "font-weight": 400, gradient: 0, height: 0, href: "http://raphaeljs.com/", opacity: 1, path: "M0,0", r: 0, rx: 0, ry: 0, src: "", stroke: "#000", "stroke-dasharray": "", "stroke-linecap": "butt", "stroke-linejoin": "butt", "stroke-miterlimit": 0, "stroke-opacity": 1, "stroke-width": 1, target: "_blank", "text-anchor": "middle", title: "Raphael", transform: "", width: 0, x: 0, y: 0},
        availableAnimAttrs = {blur: nu, "clip-rect": "csv", cx: nu, cy: nu, fill: "colour", "fill-opacity": nu, "font-size": nu, height: nu, opacity: nu, path: "path", r: nu, rx: nu, ry: nu, stroke: "colour", "stroke-opacity": nu, "stroke-width": nu, transform: "transform", width: nu, x: nu, y: nu},
        commaSpaces = /\s*,\s*/,
        hsrg = {hs: 1, rg: 1},
        p2s = /,?([achlmqrstvxz]),?/gi,
        pathCommand = /([achlmqstvz])[\s,]*((-?\d*\.?\d*(?:e[-+]?\d+)?\s*,?\s*)+)/ig,
        tCommand = /([rstm])[\s,]*((-?\d*\.?\d*(?:e[-+]?\d+)?\s*,?\s*)+)/ig,
        pathValues = /(-?\d*\.?\d*(?:e[-+]?\d+)?)\s*,?\s*/ig,
        radial_gradient = /^r(?:\(([^,]+?)\s*,\s*([^\)]+?)\))?/,
        sortByKey = function (a, b) {
            return a.key - b.key;
        },
        sortByNumber = function (a, b) {
            return a - b;
        },
        fun = function () {},
        pipe = function (x) {
            return x;
        },
        rectPath = function (x, y, w, h, r) {
            if (r) {
                return [["M", x + r, y], ["l", w - r * 2, 0], ["a", r, r, 0, 0, 1, r, r], ["l", 0, h - r * 2], ["a", r, r, 0, 0, 1, -r, r], ["l", r * 2 - w, 0], ["a", r, r, 0, 0, 1, -r, -r], ["l", 0, r * 2 - h], ["a", r, r, 0, 0, 1, r, -r], ["z"]];
            }
            return [["M", x, y], ["l", w, 0], ["l", 0, h], ["l", -w, 0], ["z"]];
        },
        ellipsePath = function (x, y, rx, ry) {
            if (ry == null) {
                ry = rx;
            }
            return [["M", x, y], ["m", 0, -ry], ["a", rx, ry, 0, 1, 1, 0, 2 * ry], ["a", rx, ry, 0, 1, 1, 0, -2 * ry], ["z"]];
        },
        getPath = {
            path: function (el) {
                return el.attr("path");
            },
            circle: function (el) {
                var a = el.attrs;
                return ellipsePath(a.cx, a.cy, a.r);
            },
            ellipse: function (el) {
                var a = el.attrs;
                return ellipsePath(a.cx, a.cy, a.rx, a.ry);
            },
            rect: function (el) {
                var a = el.attrs;
                return rectPath(a.x, a.y, a.width, a.height, a.r);
            },
            image: function (el) {
                var a = el.attrs;
                return rectPath(a.x, a.y, a.width, a.height);
            },
            text: function (el) {
                var bbox = el._getBBox();
                return rectPath(bbox.x, bbox.y, bbox.width, bbox.height);
            }
        },
        mapPath = function (path, matrix) {
            if (!matrix) {
                return path;
            }
            var x, y, i, j, pathi;
            path = path2curve(path);
            for (i = 0, ii = path.length; i < ii; i++) {
                pathi = path[i];
                for (j = 1, jj = pathi.length; j < jj; j += 2) {
                    x = matrix.x(pathi[j], pathi[j + 1]);
                    y = matrix.y(pathi[j], pathi[j + 1]);
                    pathi[j] = x;
                    pathi[j + 1] = y;
                }
            }
            return path;
        };

    /*\
     * Raphael.type
     [ property (string) ]
     **
     * Can be “SVG”, “VML” or empty, depending on browser support.
    \*/
    R.type = (g.win.SVGAngle || g.doc.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") ? "SVG" : "VML");
    if (R.type == "VML") {
        var d = g.doc.createElement("div"),
            b;
        d.innerHTML = '<v:shape adj="1"/>';
        b = d.firstChild;
        b.style.behavior = "url(#default#VML)";
        if (!(b && typeof b.adj == "object")) {
            return R.type = E;
        }
        d = null;
    }
    /*\
     * Raphael.svg
     [ property (boolean) ]
     **
     * `true` if browser supports SVG.
    \*/
    /*\
     * Raphael.vml
     [ property (boolean) ]
     **
     * `true` if browser supports VML.
    \*/
    R.svg = !(R.vml = R.type == "VML");
    paperproto = Paper.prototype = R.prototype;
    /*\
     * Paper.customAttributes
     [ property (object) ]
     **
     * If you have a set of attributes that you would like to represent
     * as a function of some number you can do it easily with custom attributes:
     > Usage
     | paper.customAttributes.hue = function (num) {
     |     num = num % 1;
     |     return {fill: "hsb(" + num + ", .75, 1)"};
     | };
     | // Custom attribute “hue” will change fill
     | // to be given hue with fixed saturation and brightness.
     | // Now you can use it like this:
     | var c = paper.circle(10, 10, 10).attr({hue: .45});
     | // or even like this:
     | c.animate({hue: 1}, 1e3);
     | 
     | // You could also create custom attribute
     | // with multiple parameters:
     | paper.customAttributes.hsb = function (h, s, b) {
     |     return {fill: "hsb(" + [h, s, b].join(",") + ")"};
     | };
     | c.attr({hsb: ".5 .8 1"});
     | c.animate({hsb: "1 0 .5"}, 1e3);
    \*/
    paperproto.customAttributes = {};
    R._id = 0;
    R._oid = 0;
    /*\
     * Raphael.fn
     [ property (object) ]
     **
     * You can add your own method to the canvas. For example if you want to draw a pie chart,
     * you can create your own pie chart function and ship it as a Raphaël plugin. To do this
     * you need to extend the `Raphael.fn` object. Please note that you can create your own namespaces
     * inside the `fn` object — methods will be run in the context of canvas anyway. You should alter
     * the `fn` object before a Raphaël instance is created, otherwise it will take no effect.
     > Usage
     | Raphael.fn.arrow = function (x1, y1, x2, y2, size) {
     |     return this.path( ... );
     | };
     | // or create namespace
     | Raphael.fn.mystuff = {
     |     arrow: function () {…},
     |     star: function () {…},
     |     // etc…
     | };
     | var paper = Raphael(10, 10, 630, 480);
     | // then use it
     | paper.arrow(10, 10, 30, 30, 5).attr({fill: "#f00"});
     | paper.mystuff.arrow();
     | paper.mystuff.star();
    \*/
    R.fn = {};
    /*\
     * Raphael.is
     [ method ]
     **
     * Handfull replacement for `typeof` operator.
     > Parameters
     - o (…) any object or primitive
     - type (string) name of the type, i.e. “string”, “function”, “number”, etc.
     = (boolean) is given value is of given type
    \*/
    R.is = function (o, type) {
        type = lowerCase.call(type);
        if (type == "finite") {
            return !isnan[has](+o);
        }
        return  (type == "null" && o === null) ||
                (type == typeof o) ||
                (type == "object" && o === Object(o)) ||
                (type == "array" && Array.isArray && Array.isArray(o)) ||
                objectToString.call(o).slice(8, -1).toLowerCase() == type;
    };
    /*\
     * Raphael.angle
     [ method ]
     **
     * Returns angle between two or three points
     > Parameters
     - x1 (number) x coord of first point
     - y1 (number) y coord of first point
     - x2 (number) x coord of second point
     - y2 (number) y coord of second point
     - x3 (number) #optional x coord of third point
     - y3 (number) #optional y coord of third point
     = (number) angle in degrees.
    \*/
    R.angle = function (x1, y1, x2, y2, x3, y3) {
        if (x3 == null) {
            var x = x1 - x2,
                y = y1 - y2;
            if (!x && !y) {
                return 0;
            }
            return (180 + math.atan2(-y, -x) * 180 / PI + 360) % 360;
        } else {
            return R.angle(x1, y1, x3, y3) - R.angle(x2, y2, x3, y3);
        }
    };
    /*\
     * Raphael.rad
     [ method ]
     **
     * Transform angle to radians
     > Parameters
     - deg (number) angle in degrees
     = (number) angle in radians.
    \*/
    R.rad = function (deg) {
        return deg % 360 * PI / 180;
    };
    /*\
     * Raphael.deg
     [ method ]
     **
     * Transform angle to degrees
     > Parameters
     - deg (number) angle in radians
     = (number) angle in degrees.
    \*/
    R.deg = function (rad) {
        return rad * 180 / PI % 360;
    };
    /*\
     * Raphael.snapTo
     [ method ]
     **
     * Snaps given value to given grid.
     > Parameters
     - values (array|number) given array of values or step of the grid
     - value (number) value to adjust
     - tolerance (number) #optional tolerance for snapping. Default is `10`.
     = (number) adjusted value.
    \*/
    R.snapTo = function (values, value, tolerance) {
        tolerance = R.is(tolerance, "finite") ? tolerance : 10;
        if (R.is(values, array)) {
            var i = values.length;
            while (i--) if (abs(values[i] - value) <= tolerance) {
                return values[i];
            }
        } else {
            values = +values;
            var rem = value % values;
            if (rem < tolerance) {
                return value - rem;
            }
            if (rem > values - tolerance) {
                return value - rem + values;
            }
        }
        return value;
    };
    
    var createUUID = (function (uuidRegEx, uuidReplacer) {
        return function () {
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(uuidRegEx, uuidReplacer).toUpperCase();
        };
    })(/[xy]/g, function (c) {
        var r = math.random() * 16 | 0,
            v = c == "x" ? r : (r & 3 | 8);
        return v.toString(16);
    });

    /*\
     * Raphael.setWindow
     [ method ]
     **
     * Used when you need to draw in `&lt;iframe>`. Switched window to the iframe one.
     > Parameters
     - newwin (window) new window object
    \*/
    R.setWindow = function (newwin) {
        eve("setWindow", R, g.win, newwin);
        g.win = newwin;
        g.doc = g.win.document;
        if (initWin) {
            initWin(g.win);
        }
    };
    // colour utilities
    var toHex = function (color) {
        if (R.vml) {
            // http://dean.edwards.name/weblog/2009/10/convert-any-colour-value-to-hex-in-msie/
            var trim = /^\s+|\s+$/g;
            var bod;
            try {
                var docum = new ActiveXObject("htmlfile");
                docum.write("<body>");
                docum.close();
                bod = docum.body;
            } catch(e) {
                bod = createPopup().document.body;
            }
            var range = bod.createTextRange();
            toHex = cacher(function (color) {
                try {
                    bod.style.color = Str(color).replace(trim, E);
                    var value = range.queryCommandValue("ForeColor");
                    value = ((value & 255) << 16) | (value & 65280) | ((value & 16711680) >>> 16);
                    return "#" + ("000000" + value.toString(16)).slice(-6);
                } catch(e) {
                    return "none";
                }
            });
        } else {
            var i = g.doc.createElement("i");
            i.title = "Rapha\xebl Colour Picker";
            i.style.display = "none";
            g.doc.body.appendChild(i);
            toHex = cacher(function (color) {
                i.style.color = color;
                return g.doc.defaultView.getComputedStyle(i, E).getPropertyValue("color");
            });
        }
        return toHex(color);
    },
    hsbtoString = function () {
        return "hsb(" + [this.h, this.s, this.b] + ")";
    },
    hsltoString = function () {
        return "hsl(" + [this.h, this.s, this.l] + ")";
    },
    rgbtoString = function () {
        return this.hex;
    },
    prepareRGB = function (r, g, b) {
        if (g == null && R.is(r, "object") && "r" in r && "g" in r && "b" in r) {
            b = r.b;
            g = r.g;
            r = r.r;
        }
        if (g == null && R.is(r, string)) {
            var clr = R.getRGB(r);
            r = clr.r;
            g = clr.g;
            b = clr.b;
        }
        if (r > 1 || g > 1 || b > 1) {
            r /= 255;
            g /= 255;
            b /= 255;
        }
        
        return [r, g, b];
    },
    packageRGB = function (r, g, b, o) {
        r *= 255;
        g *= 255;
        b *= 255;
        var rgb = {
            r: r,
            g: g,
            b: b,
            hex: R.rgb(r, g, b),
            toString: rgbtoString
        };
        R.is(o, "finite") && (rgb.opacity = o);
        return rgb;
    };
    /*\
     * Raphael.hsb2rgb
     [ method ]
     **
     * Converts HSB values to RGB object.
     > Parameters
     - h (number) hue
     - s (number) saturation
     - v (number) value or brightness
     = (object) RGB object in format:
     o {
     o     r (number) red,
     o     g (number) green,
     o     b (number) blue,
     o     hex (string) color in HTML/CSS format: #••••••
     o }
    \*/
    R.hsb2rgb = function (h, s, v, o) {
        if (this.is(h, "object") && "h" in h && "s" in h && "b" in h) {
            v = h.b;
            s = h.s;
            h = h.h;
            o = h.o;
        }
        h *= 360;
        var R, G, B, X, C;
        h = (h % 360) / 60;
        C = v * s;
        X = C * (1 - abs(h % 2 - 1));
        R = G = B = v - C;

        h = ~~h;
        R += [C, X, 0, 0, X, C][h];
        G += [X, C, C, X, 0, 0][h];
        B += [0, 0, X, C, C, X][h];
        return packageRGB(R, G, B, o);
    };
    /*\
     * Raphael.hsl2rgb
     [ method ]
     **
     * Converts HSL values to RGB object.
     > Parameters
     - h (number) hue
     - s (number) saturation
     - l (number) luminosity
     = (object) RGB object in format:
     o {
     o     r (number) red,
     o     g (number) green,
     o     b (number) blue,
     o     hex (string) color in HTML/CSS format: #••••••
     o }
    \*/
    R.hsl2rgb = function (h, s, l, o) {
        if (this.is(h, "object") && "h" in h && "s" in h && "l" in h) {
            l = h.l;
            s = h.s;
            h = h.h;
        }
        if (h > 1 || s > 1 || l > 1) {
            h /= 360;
            s /= 100;
            l /= 100;
        }
        h *= 360;
        var R, G, B, X, C;
        h = (h % 360) / 60;
        C = 2 * s * (l < .5 ? l : 1 - l);
        X = C * (1 - abs(h % 2 - 1));
        R = G = B = l - C / 2;

        h = ~~h;
        R += [C, X, 0, 0, X, C][h];
        G += [X, C, C, X, 0, 0][h];
        B += [0, 0, X, C, C, X][h];
        return packageRGB(R, G, B, o);
    };
    /*\
     * Raphael.rgb2hsb
     [ method ]
     **
     * Converts RGB values to HSB object.
     > Parameters
     - r (number) red
     - g (number) green
     - b (number) blue
     = (object) HSB object in format:
     o {
     o     h (number) hue
     o     s (number) saturation
     o     b (number) brightness
     o }
    \*/
    R.rgb2hsb = function (r, g, b) {
        b = prepareRGB(r, g, b);
        r = b[0];
        g = b[1];
        b = b[2];

        var H, S, V, C;
        V = mmax(r, g, b);
        C = V - mmin(r, g, b);
        H = (C == 0 ? null :
             V == r ? (g - b) / C :
             V == g ? (b - r) / C + 2 :
                      (r - g) / C + 4);
        H = (H % 6) * 60;
        S = C == 0 ? 0 : C / V;
        return {h: H, s: S, b: V, toString: hsbtoString};
    };
    /*\
     * Raphael.rgb2hsl
     [ method ]
     **
     * Converts RGB values to HSL object.
     > Parameters
     - r (number) red
     - g (number) green
     - b (number) blue
     = (object) HSL object in format:
     o {
     o     h (number) hue
     o     s (number) saturation
     o     l (number) luminosity
     o }
    \*/
    R.rgb2hsl = function (r, g, b) {
        b = prepareRGB(r, g, b);
        r = b[0];
        g = b[1];
        b = b[2];

        var H, S, L, M, m, C;
        M = mmax(r, g, b);
        m = mmin(r, g, b);
        C = M - m;
        H = (C == 0 ? null :
             M == r ? (g - b) / C :
             M == g ? (b - r) / C + 2 :
                      (r - g) / C + 4);
        H = (H % 6) * 60;
        L = (M + m) / 2;
        S = (C == 0 ? 0 :
             L < .5 ? C / (2 * L) :
                      C / (2 - 2 * L));
        return {h: H, s: S, l: L, toString: hsltoString};
    };
    R._path2string = function () {
        return this.join(",").replace(p2s, "$1");
    };
    function cacher(f, scope, postprocessor) {
        function newf() {
            var arg = Array.prototype.slice.call(arguments, 0),
                args = arg.join("\u2400"),
                cache = newf.cache = newf.cache || {},
                count = newf.count = newf.count || [];
            if (cache[has](args)) {
                return postprocessor ? postprocessor(cache[args]) : cache[args];
            }
            count.length >= 1e3 && delete cache[count.shift()];
            count.push(args);
            cache[args] = f[apply](scope, arg);
            return postprocessor ? postprocessor(cache[args]) : cache[args];
        }
        return newf;
    }

    function preload(src, f) {
        var img = g.doc.createElement("img");
        img.style.cssText = "position:absolute;left:-9999em;top-9999em";
        img.onload = function () {
            f.call(this);
            this.onload = null;
            g.doc.body.removeChild(this);
        };
        img.onerror = function () {
            g.doc.body.removeChild(this);
        };
        g.doc.body.appendChild(img);
        img.src = src;
    }

    /*\
     * Raphael.getRGB
     [ method ]
     **
     * Parses colour string as RGB object
     > Parameters
     - colour (string) colour string in one of formats:
     # <ul>
     #     <li>Colour name (“<code>red</code>”, “<code>green</code>”, “<code>cornflowerblue</code>”, etc)</li>
     #     <li>#••• — shortened HTML colour: (“<code>#000</code>”, “<code>#fc0</code>”, etc)</li>
     #     <li>#•••••• — full length HTML colour: (“<code>#000000</code>”, “<code>#bd2300</code>”)</li>
     #     <li>rgb(•••, •••, •••) — red, green and blue channels’ values: (“<code>rgb(200,&nbsp;100,&nbsp;0)</code>”)</li>
     #     <li>rgb(•••%, •••%, •••%) — same as above, but in %: (“<code>rgb(100%,&nbsp;175%,&nbsp;0%)</code>”)</li>
     #     <li>hsb(•••, •••, •••) — hue, saturation and brightness values: (“<code>hsb(0.5,&nbsp;0.25,&nbsp;1)</code>”)</li>
     #     <li>hsb(•••%, •••%, •••%) — same as above, but in %</li>
     #     <li>hsl(•••, •••, •••) — same as hsb</li>
     #     <li>hsl(•••%, •••%, •••%) — same as hsb</li>
     # </ul>
     = (object) RGB object in format:
     o {
     o     r (number) red,
     o     g (number) green,
     o     b (number) blue
     o     hex (string) color in HTML/CSS format: #••••••,
     o     error (boolean) true if string can’t be parsed
     o }
    \*/
    R.getRGB = cacher(function (colour) {
        if (!colour || !!((colour = Str(colour)).indexOf("-") + 1)) {
            return {r: -1, g: -1, b: -1, hex: "none", error: 1};
        }
        if (colour == "none") {
            return {r: -1, g: -1, b: -1, hex: "none"};
        }
        !(hsrg[has](colour.toLowerCase().substring(0, 2)) || colour.charAt() == "#") && (colour = toHex(colour));
        var res,
            red,
            green,
            blue,
            opacity,
            t,
            values,
            rgb = colour.match(colourRegExp);
        if (rgb) {
            if (rgb[2]) {
                blue = toInt(rgb[2].substring(5), 16);
                green = toInt(rgb[2].substring(3, 5), 16);
                red = toInt(rgb[2].substring(1, 3), 16);
            }
            if (rgb[3]) {
                blue = toInt((t = rgb[3].charAt(3)) + t, 16);
                green = toInt((t = rgb[3].charAt(2)) + t, 16);
                red = toInt((t = rgb[3].charAt(1)) + t, 16);
            }
            if (rgb[4]) {
                values = rgb[4].split(commaSpaces);
                red = toFloat(values[0]);
                values[0].slice(-1) == "%" && (red *= 2.55);
                green = toFloat(values[1]);
                values[1].slice(-1) == "%" && (green *= 2.55);
                blue = toFloat(values[2]);
                values[2].slice(-1) == "%" && (blue *= 2.55);
                rgb[1].toLowerCase().slice(0, 4) == "rgba" && (opacity = toFloat(values[3]));
                values[3] && values[3].slice(-1) == "%" && (opacity /= 100);
            }
            if (rgb[5]) {
                values = rgb[5].split(commaSpaces);
                red = toFloat(values[0]);
                values[0].slice(-1) == "%" && (red *= 2.55);
                green = toFloat(values[1]);
                values[1].slice(-1) == "%" && (green *= 2.55);
                blue = toFloat(values[2]);
                values[2].slice(-1) == "%" && (blue *= 2.55);
                (values[0].slice(-3) == "deg" || values[0].slice(-1) == "\xb0") && (red /= 360);
                rgb[1].toLowerCase().slice(0, 4) == "hsba" && (opacity = toFloat(values[3]));
                values[3] && values[3].slice(-1) == "%" && (opacity /= 100);
                return R.hsb2rgb(red, green, blue, opacity);
            }
            if (rgb[6]) {
                values = rgb[6].split(commaSpaces);
                red = toFloat(values[0]);
                values[0].slice(-1) == "%" && (red *= 2.55);
                green = toFloat(values[1]);
                values[1].slice(-1) == "%" && (green *= 2.55);
                blue = toFloat(values[2]);
                values[2].slice(-1) == "%" && (blue *= 2.55);
                (values[0].slice(-3) == "deg" || values[0].slice(-1) == "\xb0") && (red /= 360);
                rgb[1].toLowerCase().slice(0, 4) == "hsla" && (opacity = toFloat(values[3]));
                values[3] && values[3].slice(-1) == "%" && (opacity /= 100);
                return R.hsl2rgb(red, green, blue, opacity);
            }
            rgb = {r: red, g: green, b: blue};
            rgb.hex = "#" + (16777216 | blue | (green << 8) | (red << 16)).toString(16).slice(1);
            R.is(opacity, "finite") && (rgb.opacity = opacity);
            return rgb;
        }
        return {r: -1, g: -1, b: -1, hex: "none", error: 1};
    }, R);
    /*\
     * Raphael.hsb
     [ method ]
     **
     * Converts HSB values to hex representation of the colour.
     > Parameters
     - h (number) hue
     - s (number) saturation
     - b (number) value or brightness
     = (string) hex representation of the colour.
    \*/
    R.hsb = cacher(function (h, s, b) {
        return R.hsb2rgb(h, s, b).hex;
    });
    /*\
     * Raphael.hsl
     [ method ]
     **
     * Converts HSL values to hex representation of the colour.
     > Parameters
     - h (number) hue
     - s (number) saturation
     - l (number) luminosity
     = (string) hex representation of the colour.
    \*/
    R.hsl = cacher(function (h, s, l) {
        return R.hsl2rgb(h, s, l).hex;
    });
    /*\
     * Raphael.rgb
     [ method ]
     **
     * Converts RGB values to hex representation of the colour.
     > Parameters
     - r (number) red
     - g (number) green
     - b (number) blue
     = (string) hex representation of the colour.
    \*/
    R.rgb = cacher(function (r, g, b) {
        return "#" + (16777216 | b | (g << 8) | (r << 16)).toString(16).slice(1);
    });
    /*\
     * Raphael.getColor
     [ method ]
     **
     * On each call returns next colour in the spectrum. To reset it back to red call @Raphael.getColor.reset
     > Parameters
     - value (number) #optional brightness, default is `0.75`
     = (string) hex representation of the colour.
    \*/
    R.getColor = function (value) {
        var start = this.getColor.start = this.getColor.start || {h: 0, s: 1, b: value || .75},
            rgb = this.hsb2rgb(start.h, start.s, start.b);
        start.h += .075;
        if (start.h > 1) {
            start.h = 0;
            start.s -= .2;
            start.s <= 0 && (this.getColor.start = {h: 0, s: 1, b: start.b});
        }
        return rgb.hex;
    };
    /*\
     * Raphael.getColor.reset
     [ method ]
     **
     * Resets spectrum position for @Raphael.getColor back to red.
    \*/
    R.getColor.reset = function () {
        delete this.start;
    };

    /*\
     * Raphael.parsePathString
     [ method ]
     **
     * Utility method
     **
     * Parses given path string into an array of arrays of path segments.
     > Parameters
     - pathString (string|array) path string or array of segments (in the last case it will be returned straight away)
     = (array) array of segments.
    \*/
    R.parsePathString = cacher(function (pathString) {
        if (!pathString) {
            return null;
        }
        var paramCounts = {a: 7, c: 6, h: 1, l: 2, m: 2, q: 4, s: 4, t: 2, v: 1, z: 0},
            data = [];
        if (R.is(pathString, array) && R.is(pathString[0], array)) { // rough assumption
            data = pathClone(pathString);
        }
        if (!data.length) {
            Str(pathString).replace(pathCommand, function (a, b, c) {
                var params = [],
                    name = lowerCase.call(b);
                c.replace(pathValues, function (a, b) {
                    b && params.push(+b);
                });
                if (name == "m" && params.length > 2) {
                    data.push([b][concat](params.splice(0, 2)));
                    name = "l";
                    b = b == "m" ? "l" : "L";
                }
                while (params.length >= paramCounts[name]) {
                    data.push([b][concat](params.splice(0, paramCounts[name])));
                    if (!paramCounts[name]) {
                        break;
                    }
                }
            });
        }
        data.toString = R._path2string;
        return data;
    });
    /*\
     * Raphael.parseTransformString
     [ method ]
     **
     * Utility method
     **
     * Parses given path string into an array of transformations.
     > Parameters
     - TString (string|array) transform string or array of transformations (in the last case it will be returned straight away)
     = (array) array of transformations.
    \*/
    R.parseTransformString = cacher(function (TString) {
        if (!TString) {
            return null;
        }
        var paramCounts = {r: 3, s: 4, t: 2, m: 6},
            data = [];
        if (R.is(TString, array) && R.is(TString[0], array)) { // rough assumption
            data = pathClone(TString);
        }
        if (!data.length) {
            Str(TString).replace(tCommand, function (a, b, c) {
                var params = [],
                    name = lowerCase.call(b);
                c.replace(pathValues, function (a, b) {
                    b && params.push(+b);
                });
                data.push([name][concat](params));
            });
        }
        data.toString = R._path2string;
        return data;
    });
    /*\
     * Raphael.findDotsAtSegment
     [ method ]
     **
     * Utility method
     **
     * Find dot coordinates on the given cubic bezier curve at the given t.
     > Parameters
     - p1x (number) x of the first point of the curve
     - p1y (number) y of the first point of the curve
     - c1x (number) x of the first anchor of the curve
     - c1y (number) y of the first anchor of the curve
     - c2x (number) x of the second anchor of the curve
     - c2y (number) y of the second anchor of the curve
     - p2x (number) x of the second point of the curve
     - p2y (number) y of the second point of the curve
     - t (number) position on the curve (0..1)
     = (object) point information in format:
     o {
     o     x: (number) x coordinate of the point
     o     y: (number) y coordinate of the point
     o     m: {
     o         x: (number) x coordinate of the left anchor
     o         y: (number) y coordinate of the left anchor
     o     }
     o     n: {
     o         x: (number) x coordinate of the right anchor
     o         y: (number) y coordinate of the right anchor
     o     }
     o     start: {
     o         x: (number) x coordinate of the start of the curve
     o         y: (number) y coordinate of the start of the curve
     o     }
     o     end: {
     o         x: (number) x coordinate of the end of the curve
     o         y: (number) y coordinate of the end of the curve
     o     }
     o     alpha: (number) angle of the curve derivative at the point
     o }
    \*/
    R.findDotsAtSegment = function (p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t) {
        var t1 = 1 - t,
            x = pow(t1, 3) * p1x + pow(t1, 2) * 3 * t * c1x + t1 * 3 * t * t * c2x + pow(t, 3) * p2x,
            y = pow(t1, 3) * p1y + pow(t1, 2) * 3 * t * c1y + t1 * 3 * t * t * c2y + pow(t, 3) * p2y,
            mx = p1x + 2 * t * (c1x - p1x) + t * t * (c2x - 2 * c1x + p1x),
            my = p1y + 2 * t * (c1y - p1y) + t * t * (c2y - 2 * c1y + p1y),
            nx = c1x + 2 * t * (c2x - c1x) + t * t * (p2x - 2 * c2x + c1x),
            ny = c1y + 2 * t * (c2y - c1y) + t * t * (p2y - 2 * c2y + c1y),
            ax = (1 - t) * p1x + t * c1x,
            ay = (1 - t) * p1y + t * c1y,
            cx = (1 - t) * c2x + t * p2x,
            cy = (1 - t) * c2y + t * p2y,
            alpha = (90 - math.atan2(mx - nx, my - ny) * 180 / PI);
        (mx > nx || my < ny) && (alpha += 180);
        return {x: x, y: y, m: {x: mx, y: my}, n: {x: nx, y: ny}, start: {x: ax, y: ay}, end: {x: cx, y: cy}, alpha: alpha};
    };
    var pathDimensions = cacher(function (path) {
        if (!path) {
            return {x: 0, y: 0, width: 0, height: 0};
        }
        path = path2curve(path);
        var x = 0, 
            y = 0,
            X = [],
            Y = [],
            p;
        for (var i = 0, ii = path.length; i < ii; i++) {
            p = path[i];
            if (p[0] == "M") {
                x = p[1];
                y = p[2];
                X.push(x);
                Y.push(y);
            } else {
                var dim = curveDim(x, y, p[1], p[2], p[3], p[4], p[5], p[6]);
                X = X[concat](dim.min.x, dim.max.x);
                Y = Y[concat](dim.min.y, dim.max.y);
                x = p[5];
                y = p[6];
            }
        }
        var xmin = mmin[apply](0, X),
            ymin = mmin[apply](0, Y);
        return {
            x: xmin,
            y: ymin,
            width: mmax[apply](0, X) - xmin,
            height: mmax[apply](0, Y) - ymin
        };
    }),
        pathClone = function (pathArray) {
            var res = [];
            if (!R.is(pathArray, array) || !R.is(pathArray && pathArray[0], array)) { // rough assumption
                pathArray = R.parsePathString(pathArray);
            }
            for (var i = 0, ii = pathArray.length; i < ii; i++) {
                res[i] = [];
                for (var j = 0, jj = pathArray[i].length; j < jj; j++) {
                    res[i][j] = pathArray[i][j];
                }
            }
            res.toString = R._path2string;
            return res;
        },
        pathToRelative = cacher(function (pathArray) {
            if (!R.is(pathArray, array) || !R.is(pathArray && pathArray[0], array)) { // rough assumption
                pathArray = R.parsePathString(pathArray);
            }
            var res = [],
                x = 0,
                y = 0,
                mx = 0,
                my = 0,
                start = 0;
            if (pathArray[0][0] == "M") {
                x = pathArray[0][1];
                y = pathArray[0][2];
                mx = x;
                my = y;
                start++;
                res.push(["M", x, y]);
            }
            for (var i = start, ii = pathArray.length; i < ii; i++) {
                var r = res[i] = [],
                    pa = pathArray[i];
                if (pa[0] != lowerCase.call(pa[0])) {
                    r[0] = lowerCase.call(pa[0]);
                    switch (r[0]) {
                        case "a":
                            r[1] = pa[1];
                            r[2] = pa[2];
                            r[3] = pa[3];
                            r[4] = pa[4];
                            r[5] = pa[5];
                            r[6] = +(pa[6] - x).toFixed(3);
                            r[7] = +(pa[7] - y).toFixed(3);
                            break;
                        case "v":
                            r[1] = +(pa[1] - y).toFixed(3);
                            break;
                        case "m":
                            mx = pa[1];
                            my = pa[2];
                        default:
                            for (var j = 1, jj = pa.length; j < jj; j++) {
                                r[j] = +(pa[j] - ((j % 2) ? x : y)).toFixed(3);
                            }
                    }
                } else {
                    r = res[i] = [];
                    if (pa[0] == "m") {
                        mx = pa[1] + x;
                        my = pa[2] + y;
                    }
                    for (var k = 0, kk = pa.length; k < kk; k++) {
                        res[i][k] = pa[k];
                    }
                }
                var len = res[i].length;
                switch (res[i][0]) {
                    case "z":
                        x = mx;
                        y = my;
                        break;
                    case "h":
                        x += +res[i][len - 1];
                        break;
                    case "v":
                        y += +res[i][len - 1];
                        break;
                    default:
                        x += +res[i][len - 2];
                        y += +res[i][len - 1];
                }
            }
            res.toString = R._path2string;
            return res;
        }, 0, pathClone),
        pathToAbsolute = cacher(function (pathArray) {
            if (!R.is(pathArray, array) || !R.is(pathArray && pathArray[0], array)) { // rough assumption
                pathArray = R.parsePathString(pathArray);
            }
            var res = [],
                x = 0,
                y = 0,
                mx = 0,
                my = 0,
                start = 0;
            if (pathArray[0][0] == "M") {
                x = +pathArray[0][1];
                y = +pathArray[0][2];
                mx = x;
                my = y;
                start++;
                res[0] = ["M", x, y];
            }
            for (var i = start, ii = pathArray.length; i < ii; i++) {
                var r = res[i] = [],
                    pa = pathArray[i];
                if (pa[0] != upperCase.call(pa[0])) {
                    r[0] = upperCase.call(pa[0]);
                    switch (r[0]) {
                        case "A":
                            r[1] = pa[1];
                            r[2] = pa[2];
                            r[3] = pa[3];
                            r[4] = pa[4];
                            r[5] = pa[5];
                            r[6] = +(pa[6] + x);
                            r[7] = +(pa[7] + y);
                            break;
                        case "V":
                            r[1] = +pa[1] + y;
                            break;
                        case "H":
                            r[1] = +pa[1] + x;
                            break;
                        case "M":
                            mx = +pa[1] + x;
                            my = +pa[2] + y;
                        default:
                            for (var j = 1, jj = pa.length; j < jj; j++) {
                                r[j] = +pa[j] + ((j % 2) ? x : y);
                            }
                    }
                } else {
                    for (var k = 0, kk = pa.length; k < kk; k++) {
                        res[i][k] = pa[k];
                    }
                }
                switch (r[0]) {
                    case "Z":
                        x = mx;
                        y = my;
                        break;
                    case "H":
                        x = r[1];
                        break;
                    case "V":
                        y = r[1];
                        break;
                    case "M":
                        mx = res[i][res[i].length - 2];
                        my = res[i][res[i].length - 1];
                    default:
                        x = res[i][res[i].length - 2];
                        y = res[i][res[i].length - 1];
                }
            }
            res.toString = R._path2string;
            return res;
        }, null, pathClone),
        l2c = function (x1, y1, x2, y2) {
            return [x1, y1, x2, y2, x2, y2];
        },
        q2c = function (x1, y1, ax, ay, x2, y2) {
            var _13 = 1 / 3,
                _23 = 2 / 3;
            return [
                    _13 * x1 + _23 * ax,
                    _13 * y1 + _23 * ay,
                    _13 * x2 + _23 * ax,
                    _13 * y2 + _23 * ay,
                    x2,
                    y2
                ];
        },
        a2c = function (x1, y1, rx, ry, angle, large_arc_flag, sweep_flag, x2, y2, recursive) {
            // for more information of where this math came from visit:
            // http://www.w3.org/TR/SVG11/implnote.html#ArcImplementationNotes
            var _120 = PI * 120 / 180,
                rad = PI / 180 * (+angle || 0),
                res = [],
                xy,
                rotate = cacher(function (x, y, rad) {
                    var X = x * math.cos(rad) - y * math.sin(rad),
                        Y = x * math.sin(rad) + y * math.cos(rad);
                    return {x: X, y: Y};
                });
            if (!recursive) {
                xy = rotate(x1, y1, -rad);
                x1 = xy.x;
                y1 = xy.y;
                xy = rotate(x2, y2, -rad);
                x2 = xy.x;
                y2 = xy.y;
                var cos = math.cos(PI / 180 * angle),
                    sin = math.sin(PI / 180 * angle),
                    x = (x1 - x2) / 2,
                    y = (y1 - y2) / 2;
                var h = (x * x) / (rx * rx) + (y * y) / (ry * ry);
                if (h > 1) {
                    h = math.sqrt(h);
                    rx = h * rx;
                    ry = h * ry;
                }
                var rx2 = rx * rx,
                    ry2 = ry * ry,
                    k = (large_arc_flag == sweep_flag ? -1 : 1) *
                        math.sqrt(abs((rx2 * ry2 - rx2 * y * y - ry2 * x * x) / (rx2 * y * y + ry2 * x * x))),
                    cx = k * rx * y / ry + (x1 + x2) / 2,
                    cy = k * -ry * x / rx + (y1 + y2) / 2,
                    f1 = math.asin(((y1 - cy) / ry).toFixed(9)),
                    f2 = math.asin(((y2 - cy) / ry).toFixed(9));

                f1 = x1 < cx ? PI - f1 : f1;
                f2 = x2 < cx ? PI - f2 : f2;
                f1 < 0 && (f1 = PI * 2 + f1);
                f2 < 0 && (f2 = PI * 2 + f2);
                if (sweep_flag && f1 > f2) {
                    f1 = f1 - PI * 2;
                }
                if (!sweep_flag && f2 > f1) {
                    f2 = f2 - PI * 2;
                }
            } else {
                f1 = recursive[0];
                f2 = recursive[1];
                cx = recursive[2];
                cy = recursive[3];
            }
            var df = f2 - f1;
            if (abs(df) > _120) {
                var f2old = f2,
                    x2old = x2,
                    y2old = y2;
                f2 = f1 + _120 * (sweep_flag && f2 > f1 ? 1 : -1);
                x2 = cx + rx * math.cos(f2);
                y2 = cy + ry * math.sin(f2);
                res = a2c(x2, y2, rx, ry, angle, 0, sweep_flag, x2old, y2old, [f2, f2old, cx, cy]);
            }
            df = f2 - f1;
            var c1 = math.cos(f1),
                s1 = math.sin(f1),
                c2 = math.cos(f2),
                s2 = math.sin(f2),
                t = math.tan(df / 4),
                hx = 4 / 3 * rx * t,
                hy = 4 / 3 * ry * t,
                m1 = [x1, y1],
                m2 = [x1 + hx * s1, y1 - hy * c1],
                m3 = [x2 + hx * s2, y2 - hy * c2],
                m4 = [x2, y2];
            m2[0] = 2 * m1[0] - m2[0];
            m2[1] = 2 * m1[1] - m2[1];
            if (recursive) {
                return [m2, m3, m4][concat](res);
            } else {
                res = [m2, m3, m4][concat](res).join().split(",");
                var newres = [];
                for (var i = 0, ii = res.length; i < ii; i++) {
                    newres[i] = i % 2 ? rotate(res[i - 1], res[i], rad).y : rotate(res[i], res[i + 1], rad).x;
                }
                return newres;
            }
        },
        findDotAtSegment = function (p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t) {
            var t1 = 1 - t;
            return {
                x: pow(t1, 3) * p1x + pow(t1, 2) * 3 * t * c1x + t1 * 3 * t * t * c2x + pow(t, 3) * p2x,
                y: pow(t1, 3) * p1y + pow(t1, 2) * 3 * t * c1y + t1 * 3 * t * t * c2y + pow(t, 3) * p2y
            };
        },
        curveDim = cacher(function (p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y) {
            var a = (c2x - 2 * c1x + p1x) - (p2x - 2 * c2x + c1x),
                b = 2 * (c1x - p1x) - 2 * (c2x - c1x),
                c = p1x - c1x,
                t1 = (-b + math.sqrt(b * b - 4 * a * c)) / 2 / a,
                t2 = (-b - math.sqrt(b * b - 4 * a * c)) / 2 / a,
                y = [p1y, p2y],
                x = [p1x, p2x],
                dot;
            abs(t1) > "1e12" && (t1 = .5);
            abs(t2) > "1e12" && (t2 = .5);
            if (t1 > 0 && t1 < 1) {
                dot = findDotAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t1);
                x.push(dot.x);
                y.push(dot.y);
            }
            if (t2 > 0 && t2 < 1) {
                dot = findDotAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t2);
                x.push(dot.x);
                y.push(dot.y);
            }
            a = (c2y - 2 * c1y + p1y) - (p2y - 2 * c2y + c1y);
            b = 2 * (c1y - p1y) - 2 * (c2y - c1y);
            c = p1y - c1y;
            t1 = (-b + math.sqrt(b * b - 4 * a * c)) / 2 / a;
            t2 = (-b - math.sqrt(b * b - 4 * a * c)) / 2 / a;
            abs(t1) > "1e12" && (t1 = .5);
            abs(t2) > "1e12" && (t2 = .5);
            if (t1 > 0 && t1 < 1) {
                dot = findDotAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t1);
                x.push(dot.x);
                y.push(dot.y);
            }
            if (t2 > 0 && t2 < 1) {
                dot = findDotAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t2);
                x.push(dot.x);
                y.push(dot.y);
            }
            return {
                min: {x: mmin[apply](0, x), y: mmin[apply](0, y)},
                max: {x: mmax[apply](0, x), y: mmax[apply](0, y)}
            };
        }),
        path2curve = cacher(function (path, path2) {
            var p = pathToAbsolute(path),
                p2 = path2 && pathToAbsolute(path2),
                attrs = {x: 0, y: 0, bx: 0, by: 0, X: 0, Y: 0, qx: null, qy: null},
                attrs2 = {x: 0, y: 0, bx: 0, by: 0, X: 0, Y: 0, qx: null, qy: null},
                processPath = function (path, d) {
                    var nx, ny;
                    if (!path) {
                        return ["C", d.x, d.y, d.x, d.y, d.x, d.y];
                    }
                    !(path[0] in {T:1, Q:1}) && (d.qx = d.qy = null);
                    switch (path[0]) {
                        case "M":
                            d.X = path[1];
                            d.Y = path[2];
                            break;
                        case "A":
                            path = ["C"][concat](a2c[apply](0, [d.x, d.y][concat](path.slice(1))));
                            break;
                        case "S":
                            nx = d.x + (d.x - (d.bx || d.x));
                            ny = d.y + (d.y - (d.by || d.y));
                            path = ["C", nx, ny][concat](path.slice(1));
                            break;
                        case "T":
                            d.qx = d.x + (d.x - (d.qx || d.x));
                            d.qy = d.y + (d.y - (d.qy || d.y));
                            path = ["C"][concat](q2c(d.x, d.y, d.qx, d.qy, path[1], path[2]));
                            break;
                        case "Q":
                            d.qx = path[1];
                            d.qy = path[2];
                            path = ["C"][concat](q2c(d.x, d.y, path[1], path[2], path[3], path[4]));
                            break;
                        case "L":
                            path = ["C"][concat](l2c(d.x, d.y, path[1], path[2]));
                            break;
                        case "H":
                            path = ["C"][concat](l2c(d.x, d.y, path[1], d.y));
                            break;
                        case "V":
                            path = ["C"][concat](l2c(d.x, d.y, d.x, path[1]));
                            break;
                        case "Z":
                            path = ["C"][concat](l2c(d.x, d.y, d.X, d.Y));
                            break;
                    }
                    return path;
                },
                fixArc = function (pp, i) {
                    if (pp[i].length > 7) {
                        pp[i].shift();
                        var pi = pp[i];
                        while (pi.length) {
                            pp.splice(i++, 0, ["C"][concat](pi.splice(0, 6)));
                        }
                        pp.splice(i, 1);
                        ii = mmax(p.length, p2 && p2.length || 0);
                    }
                },
                fixM = function (path1, path2, a1, a2, i) {
                    if (path1 && path2 && path1[i][0] == "M" && path2[i][0] != "M") {
                        path2.splice(i, 0, ["M", a2.x, a2.y]);
                        a1.bx = 0;
                        a1.by = 0;
                        a1.x = path1[i][1];
                        a1.y = path1[i][2];
                        ii = mmax(p.length, p2 && p2.length || 0);
                    }
                };
            for (var i = 0, ii = mmax(p.length, p2 && p2.length || 0); i < ii; i++) {
                p[i] = processPath(p[i], attrs);
                fixArc(p, i);
                p2 && (p2[i] = processPath(p2[i], attrs2));
                p2 && fixArc(p2, i);
                fixM(p, p2, attrs, attrs2, i);
                fixM(p2, p, attrs2, attrs, i);
                var seg = p[i],
                    seg2 = p2 && p2[i],
                    seglen = seg.length,
                    seg2len = p2 && seg2.length;
                attrs.x = seg[seglen - 2];
                attrs.y = seg[seglen - 1];
                attrs.bx = toFloat(seg[seglen - 4]) || attrs.x;
                attrs.by = toFloat(seg[seglen - 3]) || attrs.y;
                attrs2.bx = p2 && (toFloat(seg2[seg2len - 4]) || attrs2.x);
                attrs2.by = p2 && (toFloat(seg2[seg2len - 3]) || attrs2.y);
                attrs2.x = p2 && seg2[seg2len - 2];
                attrs2.y = p2 && seg2[seg2len - 1];
            }
            return p2 ? [p, p2] : p;
        }, null, pathClone),
        parseDots = cacher(function (gradient) {
            var dots = [];
            for (var i = 0, ii = gradient.length; i < ii; i++) {
                var dot = {},
                    par = gradient[i].match(/^([^:]*):?([\d\.]*)/);
                dot.color = R.getRGB(par[1]);
                if (dot.color.error) {
                    return null;
                }
                dot.color = dot.color.hex;
                par[2] && (dot.offset = par[2] + "%");
                dots.push(dot);
            }
            for (i = 1, ii = dots.length - 1; i < ii; i++) {
                if (!dots[i].offset) {
                    var start = toFloat(dots[i - 1].offset || 0),
                        end = 0;
                    for (var j = i + 1; j < ii; j++) {
                        if (dots[j].offset) {
                            end = dots[j].offset;
                            break;
                        }
                    }
                    if (!end) {
                        end = 100;
                        j = ii;
                    }
                    end = toFloat(end);
                    var d = (end - start) / (j - i + 1);
                    for (; i < j; i++) {
                        start += d;
                        dots[i].offset = start + "%";
                    }
                }
            }
            return dots;
        }),
        getContainer = function (x, y, w, h) {
            var container;
            container = h == null && !R.is(x, "object") ? g.doc.getElementById(x) : x;
            if (container == null) {
                return;
            }
            if (container.tagName) {
                if (y == null) {
                    return {
                        container: container,
                        width: container.style.pixelWidth || container.offsetWidth,
                        height: container.style.pixelHeight || container.offsetHeight
                    };
                } else {
                    return {container: container, width: y, height: w};
                }
            }
            return {container: 1, x: x, y: y, width: w, height: h};
        },
        plugins = function (con, add) {
            var that = this;
            for (var prop in add) {
                if (add[has](prop) && !(prop in con)) {
                    switch (typeof add[prop]) {
                        case "function":
                            (function (f) {
                                con[prop] = con === that ? f : function () { return f[apply](that, arguments); };
                            })(add[prop]);
                        break;
                        case "object":
                            con[prop] = con[prop] || {};
                            plugins.call(this, con[prop], add[prop]);
                        break;
                        default:
                            con[prop] = add[prop];
                        break;
                    }
                }
            }
        },
        tear = function (el, paper) {
            el == paper.top && (paper.top = el.prev);
            el == paper.bottom && (paper.bottom = el.next);
            el.next && (el.next.prev = el.prev);
            el.prev && (el.prev.next = el.next);
        },
        tofront = function (el, paper) {
            if (paper.top === el) {
                return;
            }
            tear(el, paper);
            el.next = null;
            el.prev = paper.top;
            paper.top.next = el;
            paper.top = el;
        },
        toback = function (el, paper) {
            if (paper.bottom === el) {
                return;
            }
            tear(el, paper);
            el.next = paper.bottom;
            el.prev = null;
            paper.bottom.prev = el;
            paper.bottom = el;
        },
        insertafter = function (el, el2, paper) {
            tear(el, paper);
            el2 == paper.top && (paper.top = el);
            el2.next && (el2.next.prev = el);
            el.next = el2.next;
            el.prev = el2;
            el2.next = el;
        },
        insertbefore = function (el, el2, paper) {
            tear(el, paper);
            el2 == paper.bottom && (paper.bottom = el);
            el2.prev && (el2.prev.next = el);
            el.prev = el2.prev;
            el2.prev = el;
            el.next = el2;
        },
        removed = function (methodname) {
            return function () {
                throw new Error("Rapha\xebl: you are calling to method \u201c" + methodname + "\u201d of removed object");
            };
        },
        extractTransform = function (el, tstr) {
            if (tstr == null) {
                return el._.transform;
            }
            tstr = Str(tstr).replace(/\.{3}|\u2026/g, el._.transform || E);
            var tdata = R.parseTransformString(tstr),
                deg = 0,
                dx = 0,
                dy = 0,
                sx = 1,
                sy = 1,
                _ = el._,
                m = new Matrix;
            _.transform = tdata || [];
            if (tdata) {
                for (var i = 0, ii = tdata.length; i < ii; i++) {
                    var t = tdata[i],
                        tlen = t.length,
                        bb;
                    t[0] = Str(t[0]).toLowerCase();
                    if (t[0] == "t" && tlen == 3) {
                        m.translate(t[1], t[2]);
                    } else if (t[0] == "r") {
                        if (tlen == 2) {
                            bb = bb || el.getBBox(1);
                            m.rotate(t[1], bb.x + bb.width / 2, bb.y + bb.height / 2);
                            deg += t[1];
                        } else if (tlen == 4) {
                            m.rotate(t[1], t[2], t[3]);
                            deg += t[1];
                        }
                    } else if (t[0] == "s") {
                        if (tlen == 2 || tlen == 3) {
                            bb = bb || el.getBBox(1);
                            m.scale(t[1], t[tlen - 1], bb.x + bb.width / 2, bb.y + bb.height / 2);
                            sx *= t[1];
                            sy *= t[tlen - 1];
                        } else if (tlen == 5) {
                            m.scale(t[1], t[2], t[3], t[4]);
                            sx *= t[1];
                            sy *= t[2];
                        }
                    } else if (t[0] == "m" && tlen == 7) {
                        m.add(t[1], t[2], t[3], t[4], t[5], t[6]);
                    }
                    _.dirtyT = 1;
                    el.matrix = m;
                }
            }

            el.matrix = m;

            _.sx = sx;
            _.sy = sy;
            _.deg = deg;
            _.dx = dx = m.m[0][2];
            _.dy = dy = m.m[1][2];

            if (sx == 1 && sy == 1 && !deg && _.bbox) {
                _.bbox.x += +dx;
                _.bbox.y += +dy;
            } else {
                _.dirtyT = 1;
            }
        },
        getEmpty = function (item) {
            switch (item[0]) {
                case "t": return ["t", 0, 0];
                case "m": return ["m", 1, 0, 0, 1, 0, 0];
                case "r": if (item.length == 4) {
                    return ["r", 0, item[2], item[3]];
                } else {
                    return ["r", 0];
                }
                case "s": if (item.length == 5) {
                    return ["s", 1, 1, item[3], item[4]];
                } else if (item.length == 3) {
                    return ["s", 1, 1];
                } else {
                    return ["s", 1];
                }
            }
        },
        equaliseTransform = function (t1, t2) {
            t1 = R.parseTransformString(t1) || [];
            t2 = R.parseTransformString(t2) || [];
            var maxlength = mmax(t1.length, t2.length),
                from = [],
                to = [],
                i = 0, j, jj,
                tt1, tt2;
            for (; i < maxlength; i++) {
                tt1 = t1[i] || getEmpty(t2[i]);
                tt2 = t2[i] || getEmpty(tt1);
                if (    (tt1[0] != tt2[0]) ||
                        (tt1[0] == "r" && (tt1[2] != tt2[2] || tt1[3] != tt2[3])) ||
                        (tt1[0] == "s" && (tt1[3] != tt2[3] || tt1[4] != tt2[4]))
                    ) {
                    return;
                }
                from[i] = [];
                to[i] = [];
                for (j = 0, jj = mmax(tt1.length, tt2.length); j < jj; j++) {
                    j in tt1 && (from[i][j] = tt1[j]);
                    j in tt2 && (to[i][j] = tt2[j]);
                }
            }
            return {
                from: from,
                to: to
            };
        };
    /*\
     * Raphael.pathToRelative
     [ method ]
     **
     * Utility method
     **
     * Converts path to relative form
     > Parameters
     - pathString (string|array) path string or array of segments
     = (array) array of segments.
    \*/
    R.pathToRelative = pathToRelative;
    /*\
     * Raphael.path2curve
     [ method ]
     **
     * Utility method
     **
     * Converts path to a new path where all segments are cubic bezier curves.
     > Parameters
     - pathString (string|array) path string or array of segments
     = (array) array of segments.
    \*/
    R.path2curve = path2curve;
    // Matrix
    // var m = document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGMatrix();
    function Matrix(a, b, c, d, e, f) {
        if (a != null) {
            this.m = [[a, c, e], [b, d, f], [0, 0, 1]];
        } else {
            this.m = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
        }
    }
    var matrixproto = Matrix.prototype;
    matrixproto.add = function (a, b, c, d, e, f) {
        var out = [[], [], []],
            matrix = [[a, c, e], [b, d, f], [0, 0, 1]],
            x, y, z, res;

        for (x = 0; x < 3; x++) {
            for (y = 0; y < 3; y++) {
                res = 0;
                for (z = 0; z < 3; z++) {
                    res += this.m[x][z] * matrix[z][y];
                }
                out[x][y] = res;
            }
        }
        this.m = out;
    };
    matrixproto.invert = function () {
        var a = this.m[0][0],
            b = this.m[1][0],
            c = this.m[0][1],
            d = this.m[1][1],
            e = this.m[0][2],
            f = this.m[1][2],
            x = a * d - b * c;
        return new Matrix(d / x, -b / x, -c / x, a / x, (c * f - d * e) / x, (b * e - a * f) / x);
    };
    matrixproto.clone = function () {
        var a = this.m[0][0],
            b = this.m[1][0],
            c = this.m[0][1],
            d = this.m[1][1],
            e = this.m[0][2],
            f = this.m[1][2];
        return new Matrix(a, b, c, d, e, f);
    };
    matrixproto.translate = function (x, y) {
        this.add(1, 0, 0, 1, x, y);
    };
    matrixproto.scale = function (x, y, cx, cy) {
        y == null && (y = x);
        this.add(1, 0, 0, 1, cx, cy);
        this.add(x, 0, 0, y, 0, 0);
        this.add(1, 0, 0, 1, -cx, -cy);
    };
    matrixproto.rotate = function (a, x, y) {
        a = R.rad(a);
        var cos = +math.cos(a).toFixed(9),
            sin = +math.sin(a).toFixed(9);
        this.add(cos, sin, -sin, cos, x, y);
        this.add(1, 0, 0, 1, -x, -y);
    };
    matrixproto.x = function (x, y) {
        return x * this.m[0][0] + y * this.m[0][1] + this.m[0][2];
    };
    matrixproto.y = function (x, y) {
        return x * this.m[1][0] + y * this.m[1][1] + this.m[1][2];
    };
    matrixproto.get = function (i, j) {
        return +this.m[i][j].toFixed(4);
    };
    matrixproto.toString = function () {
        return R.svg ?
            "matrix(" + [this.get(0, 0), this.get(1, 0), this.get(0, 1), this.get(1, 1), this.get(0, 2), this.get(1, 2)].join() + ")" :
            [this.get(0, 0), this.get(0, 1), this.get(1, 0), this.get(1, 1), 0, 0].join();
    };
    matrixproto.toFilter = function () {
        return "progid:DXImageTransform.Microsoft.Matrix(M11=" + this.get(0, 0) +
            ", M12=" + this.get(0, 1) + ", M21=" + this.get(1, 0) + ", M22=" + this.get(1, 1) +
            ", Dx=" + this.get(0, 2) + ", Dy=" + this.get(1, 2) + ", sizingmedthod='auto expand')";
    };
    matrixproto.offset = function () {
        return [this.m[0][2].toFixed(4), this.m[1][2].toFixed(4)];
    };

    R.Matrix = Matrix;

    // SVG
    if (R.svg) {
        var xlink = "http://www.w3.org/1999/xlink",
            markers = {
                block: "M5,0 0,2.5 5,5z",
                classic: "M5,0 0,2.5 5,5 3.5,3 3.5,2z",
                diamond: "M2.5,0 5,2.5 2.5,5 0,2.5z",
                open: "M6,1 1,3.5 6,6",
                oval: "M2.5,0A2.5,2.5,0,0,1,2.5,5 2.5,2.5,0,0,1,2.5,0z"
            },
            markerCounter = {};
        R.toString = function () {
            return  "Your browser supports SVG.\nYou are running Rapha\xebl " + this.version;
        };
        var $ = function (el, attr) {
            if (attr) {
                if (typeof el == "string") {
                    el = $(el);
                }
                for (var key in attr) if (attr[has](key)) {
                    if (key.substring(0, 6) == "xlink:") {
                        el.setAttributeNS(xlink, key.substring(6), Str(attr[key]));
                    } else {
                        el[setAttribute](key, Str(attr[key]));
                    }
                }
            } else {
                el = g.doc.createElementNS("http://www.w3.org/2000/svg", el);
                el.style && (el.style.webkitTapHighlightColor = "rgba(0,0,0,0)");
            }
            return el;
        },
        thePath = function (pathString, SVG) {
            var el = $("path");
            SVG.canvas && SVG.canvas.appendChild(el);
            var p = new Element(el, SVG);
            p.type = "path";
            setFillAndStroke(p, {fill: "none", stroke: "#000", path: pathString});
            return p;
        },
        gradients = {},
        rgGrad = /^url\(#(.*)\)$/,
        removeGradientFill = function (node, paper) {
            var oid = node.getAttribute(fillString);
            oid = oid && oid.match(rgGrad);
            if (oid && !--gradients[oid[1]]) {
                delete gradients[oid[1]];
                paper.defs.removeChild(g.doc.getElementById(oid[1]));
            }
        },
        addGradientFill = function (element, gradient) {
            var type = "linear",
                id = element.id + gradient,
                fx = .5, fy = .5,
                o = element.node,
                SVG = element.paper,
                s = o.style,
                el = g.doc.getElementById(id);
            if (!el) {
                gradient = Str(gradient).replace(radial_gradient, function (all, _fx, _fy) {
                    type = "radial";
                    if (_fx && _fy) {
                        fx = toFloat(_fx);
                        fy = toFloat(_fy);
                        var dir = ((fy > .5) * 2 - 1);
                        pow(fx - .5, 2) + pow(fy - .5, 2) > .25 &&
                            (fy = math.sqrt(.25 - pow(fx - .5, 2)) * dir + .5) &&
                            fy != .5 &&
                            (fy = fy.toFixed(5) - 1e-5 * dir);
                    }
                    return E;
                });
                gradient = gradient.split(/\s*\-\s*/);
                if (type == "linear") {
                    var angle = gradient.shift();
                    angle = -toFloat(angle);
                    if (isNaN(angle)) {
                        return null;
                    }
                    var vector = [0, 0, math.cos(R.rad(angle)), math.sin(R.rad(angle))],
                        max = 1 / (mmax(abs(vector[2]), abs(vector[3])) || 1);
                    vector[2] *= max;
                    vector[3] *= max;
                    if (vector[2] < 0) {
                        vector[0] = -vector[2];
                        vector[2] = 0;
                    }
                    if (vector[3] < 0) {
                        vector[1] = -vector[3];
                        vector[3] = 0;
                    }
                }
                var dots = parseDots(gradient);
                if (!dots) {
                    return null;
                }
                if (element.gradient) {
                    SVG.defs.removeChild(element.gradient);
                    delete element.gradient;
                }

                el = $(type + "Gradient", {id: id});
                element.gradient = el;
                $(el, type == "radial" ? {
                    fx: fx,
                    fy: fy
                } : {
                    x1: vector[0],
                    y1: vector[1],
                    x2: vector[2],
                    y2: vector[3],
                    gradientTransform: element.matrix.invert()
                });
                SVG.defs.appendChild(el);
                for (var i = 0, ii = dots.length; i < ii; i++) {
                    el.appendChild($("stop", {
                        offset: dots[i].offset ? dots[i].offset : i ? "100%" : "0%",
                        "stop-color": dots[i].color || "#fff"
                    }));
                }
            }
            $(o, {
                fill: "url(#" + id + ")",
                opacity: 1,
                "fill-opacity": 1
            });
            s.fill = E;
            s.opacity = 1;
            s.fillOpacity = 1;
            return 1;
        },
        updatePosition = function (o) {
            var bbox = o.getBBox(1);
            $(o.pattern, {patternTransform: o.matrix.invert() + " translate(" + bbox.x + "," + bbox.y + ")"});
        },
        addArrow = function (o, value, isEnd) {
            if (o.type == "path") {
                var values = Str(value).toLowerCase().split("-"),
                    p = o.paper,
                    se = isEnd ? "end" : "start",
                    node = o.node,
                    attrs = o.attrs,
                    stroke = attrs["stroke-width"],
                    i = values.length,
                    type = "classic",
                    from,
                    to,
                    dx,
                    refX,
                    attr,
                    w = 3,
                    h = 3,
                    t = 5;
                while (i--) {
                    switch (values[i]) {
                        case "block":
                        case "classic":
                        case "oval":
                        case "diamond":
                        case "open":
                        case "none":
                            type = values[i];
                            break;
                        case "wide": h = 5; break;
                        case "narrow": h = 2; break;
                        case "long": w = 5; break;
                        case "short": w = 2; break;
                    }
                }
                if (type == "open") {
                    w += 2;
                    h += 2;
                    t += 2;
                    dx = 1;
                    refX = isEnd ? 4 : 1;
                    attr = {
                        fill: "none",
                        stroke: attrs.stroke
                    };
                } else {
                    refX = dx = w / 2;
                    attr = {
                        fill: attrs.stroke,
                        stroke: "none"
                    };
                }
                if (o._.arrows) {
                    if (isEnd) {
                        o._.arrows.endPath && markerCounter[o._.arrows.endPath]--;
                        o._.arrows.endMarker && markerCounter[o._.arrows.endMarker]--;
                    } else {
                        o._.arrows.startPath && markerCounter[o._.arrows.startPath]--;
                        o._.arrows.startMarker && markerCounter[o._.arrows.startMarker]--;
                    }
                } else {
                    o._.arrows = {};
                }
                if (type != "none") {
                    var pathId = "raphael-marker-" + type,
                        markerId = "raphael-marker-" + se + type + w + h;
                    if (!g.doc.getElementById(pathId)) {
                        p.defs.appendChild($($("path"), {
                            "stroke-linecap": "round",
                            d: markers[type],
                            id: pathId
                        }));
                        markerCounter[pathId] = 1;
                    } else {
                        markerCounter[pathId]++;
                    }
                    var marker = g.doc.getElementById(markerId),
                        use;
                    if (!marker) {
                        marker = $($("marker"), {
                            id: markerId,
                            markerHeight: h,
                            markerWidth: w,
                            orient: "auto",
                            refX: refX,
                            refY: h / 2
                        });
                        use = $($("use"), {
                            "xlink:href": "#" + pathId,
                            transform: (isEnd ? " rotate(180 " + w / 2 + " " + h / 2 + ") " : S) + "scale(" + w / t + "," + h / t + ")",
                            "stroke-width": 1 / ((w / t + h / t) / 2)
                        });
                        marker.appendChild(use);
                        p.defs.appendChild(marker);
                        markerCounter[markerId] = 1;
                    } else {
                        markerCounter[markerId]++;
                        use = marker.getElementsByTagName("use")[0];
                    }
                    $(use, attr);
                    var delta = dx * (type != "diamond" && type != "oval");
                    if (isEnd) {
                        from = o._.arrows.startdx * stroke || 0;
                        to = R.getTotalLength(attrs.path) - delta * stroke;
                    } else {
                        from = delta * stroke;
                        to = R.getTotalLength(attrs.path) - (o._.arrows.enddx * stroke || 0);
                    }
                    attr = {};
                    attr["marker-" + se] = "url(#" + markerId + ")";
                    if (to || from) {
                        attr.d = Raphael.getSubpath(attrs.path, from, to);
                    }
                    $(node, attr);
                    o._.arrows[se + "Path"] = pathId;
                    o._.arrows[se + "Marker"] = markerId;
                    o._.arrows[se + "dx"] = delta;
                    o._.arrows[se + "Type"] = type;
                    o._.arrows[se + "String"] = value;
                } else {
                    if (isEnd) {
                        from = o._.arrows.startdx * stroke || 0;
                        to = R.getTotalLength(attrs.path) - from;
                    } else {
                        from = 0;
                        to = R.getTotalLength(attrs.path) - (o._.arrows.enddx * stroke || 0);
                    }
                    o._.arrows[se + "Path"] && $(node, {d: Raphael.getSubpath(attrs.path, from, to)});
                    delete o._.arrows[se + "Path"];
                    delete o._.arrows[se + "Marker"];
                    delete o._.arrows[se + "dx"];
                    delete o._.arrows[se + "Type"];
                    delete o._.arrows[se + "String"];
                }
                for (attr in markerCounter) if (markerCounter[has](attr) && !markerCounter[attr]) {
                    var item = g.doc.getElementById(attr);
                    item && item.parentNode.removeChild(item);
                }
            }
        },
        setFillAndStroke = function (o, params) {
            var dasharray = {
                    "": [0],
                    "none": [0],
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
                node = o.node,
                attrs = o.attrs,
                addDashes = function (o, value) {
                    value = dasharray[lowerCase.call(value)];
                    if (value) {
                        var width = o.attrs["stroke-width"] || "1",
                            butt = {round: width, square: width, butt: 0}[o.attrs["stroke-linecap"] || params["stroke-linecap"]] || 0,
                            dashes = [],
                            i = value.length;
                        while (i--) {
                            dashes[i] = value[i] * width + ((i % 2) ? 1 : -1) * butt;
                        }
                        $(node, {"stroke-dasharray": dashes.join(",")});
                    }
                };
            for (var att in params) {
                if (params[has](att)) {
                    if (!availableAttrs[has](att)) {
                        continue;
                    }
                    var value = params[att];
                    attrs[att] = value;
                    switch (att) {
                        case "blur":
                            o.blur(value);
                            break;
                        case "href":
                        case "title":
                        case "target":
                            var pn = node.parentNode;
                            if (lowerCase.call(pn.tagName) != "a") {
                                var hl = $("a");
                                pn.insertBefore(hl, node);
                                hl.appendChild(node);
                                pn = hl;
                            }
                            if (att == "target" && value == "blank") {
                                pn.setAttributeNS(xlink, "show", "new");
                            } else {
                                pn.setAttributeNS(xlink, att, value);
                            }
                            break;
                        case "cursor":
                            node.style.cursor = value;
                            break;
                        case "transform":
                            o.transform(value);
                            break;
                        case "arrow-start":
                            addArrow(o, value);
                            break;
                        case "arrow-end":
                            addArrow(o, value, 1);
                            break;
                        case "clip-rect":
                            var rect = Str(value).split(separator);
                            if (rect.length == 4) {
                                o.clip && o.clip.parentNode.parentNode.removeChild(o.clip.parentNode);
                                var el = $("clipPath"),
                                    rc = $("rect");
                                el.id = createUUID();
                                $(rc, {
                                    x: rect[0],
                                    y: rect[1],
                                    width: rect[2],
                                    height: rect[3]
                                });
                                el.appendChild(rc);
                                o.paper.defs.appendChild(el);
                                $(node, {"clip-path": "url(#" + el.id + ")"});
                                o.clip = rc;
                            }
                            if (!value) {
                                var clip = g.doc.getElementById(node.getAttribute("clip-path").replace(/(^url\(#|\)$)/g, E));
                                clip && clip.parentNode.removeChild(clip);
                                $(node, {"clip-path": E});
                                delete o.clip;
                            }
                        break;
                        case "path":
                            if (o.type == "path") {
                                $(node, {d: value ? attrs.path = pathToAbsolute(value) : "M0,0"});
                                o._.dirty = 1;
                                if (o._.arrows) {
                                    "startString" in o._.arrows && addArrow(o, o._.arrows.startString);
                                    "endString" in o._.arrows && addArrow(o, o._.arrows.endString, 1);
                                }
                            }
                            break;
                        case "width":
                            node[setAttribute](att, value);
                            o._.dirty = 1;
                            if (attrs.fx) {
                                att = "x";
                                value = attrs.x;
                            } else {
                                break;
                            }
                        case "x":
                            if (attrs.fx) {
                                value = -attrs.x - (attrs.width || 0);
                            }
                        case "rx":
                            if (att == "rx" && o.type == "rect") {
                                break;
                            }
                        case "cx":
                            node[setAttribute](att, value);
                            o.pattern && updatePosition(o);
                            o._.dirty = 1;
                            break;
                        case "height":
                            node[setAttribute](att, value);
                            o._.dirty = 1;
                            if (attrs.fy) {
                                att = "y";
                                value = attrs.y;
                            } else {
                                break;
                            }
                        case "y":
                            if (attrs.fy) {
                                value = -attrs.y - (attrs.height || 0);
                            }
                        case "ry":
                            if (att == "ry" && o.type == "rect") {
                                break;
                            }
                        case "cy":
                            node[setAttribute](att, value);
                            o.pattern && updatePosition(o);
                            o._.dirty = 1;
                            break;
                        case "r":
                            if (o.type == "rect") {
                                $(node, {rx: value, ry: value});
                            } else {
                                node[setAttribute](att, value);
                            }
                            o._.dirty = 1;
                            break;
                        case "src":
                            if (o.type == "image") {
                                node.setAttributeNS(xlink, "href", value);
                            }
                            break;
                        case "stroke-width":
                            if (o._.sx != 1 || o._.sy != 1) {
                                value /= mmax(abs(o._.sx), abs(o._.sy)) || 1;
                            }
                            if (o.paper._vbSize) {
                                value *= o.paper._vbSize;
                            }
                            node[setAttribute](att, value);
                            if (attrs["stroke-dasharray"]) {
                                addDashes(o, attrs["stroke-dasharray"]);
                            }
                            if (o._.arrows) {
                                "startString" in o._.arrows && addArrow(o, o._.arrows.startString);
                                "endString" in o._.arrows && addArrow(o, o._.arrows.endString, 1);
                            }
                            break;
                        case "stroke-dasharray":
                            addDashes(o, value);
                            break;
                        case fillString:
                            var isURL = Str(value).match(ISURL);
                            if (isURL) {
                                el = $("pattern");
                                var ig = $("image");
                                el.id = createUUID();
                                $(el, {x: 0, y: 0, patternUnits: "userSpaceOnUse", height: 1, width: 1});
                                $(ig, {x: 0, y: 0, "xlink:href": isURL[1]});
                                el.appendChild(ig);

                                (function (el) {
                                    preload(isURL[1], function () {
                                        var w = this.offsetWidth,
                                            h = this.offsetHeight;
                                        $(el, {width: w, height: h});
                                        $(ig, {width: w, height: h});
                                        o.paper.safari();
                                    });
                                })(el);
                                o.paper.defs.appendChild(el);
                                node.style.fill = "url(#" + el.id + ")";
                                $(node, {fill: "url(#" + el.id + ")"});
                                o.pattern = el;
                                o.pattern && updatePosition(o);
                                break;
                            }
                            var clr = R.getRGB(value);
                            if (!clr.error) {
                                delete params.gradient;
                                delete attrs.gradient;
                                !R.is(attrs.opacity, "undefined") &&
                                    R.is(params.opacity, "undefined") &&
                                    $(node, {opacity: attrs.opacity});
                                !R.is(attrs["fill-opacity"], "undefined") &&
                                    R.is(params["fill-opacity"], "undefined") &&
                                    $(node, {"fill-opacity": attrs["fill-opacity"]});
                            } else if ((o.type == "circle" || o.type == "ellipse" || Str(value).charAt() != "r") && addGradientFill(o, value)) {
                                if ("opacity" in attrs || "fill-opacity" in attrs) {
                                    var gradient = g.doc.getElementById(node.getAttribute(fillString).replace(/^url\(#|\)$/g, E));
                                    if (gradient) {
                                        var stops = gradient.getElementsByTagName("stop");
                                        $(stops[stops.length - 1], {"stop-opacity": ("opacity" in attrs ? attrs.opacity : 1) * ("fill-opacity" in attrs ? attrs["fill-opacity"] : 1)});
                                    }
                                }
                                attrs.gradient = value;
                                attrs.fill = "none";
                                break;
                            }
                            clr[has]("opacity") && $(node, {"fill-opacity": clr.opacity > 1 ? clr.opacity / 100 : clr.opacity});
                        case "stroke":
                            clr = R.getRGB(value);
                            node[setAttribute](att, clr.hex);
                            att == "stroke" && clr[has]("opacity") && $(node, {"stroke-opacity": clr.opacity > 1 ? clr.opacity / 100 : clr.opacity});
                            if (att == "stroke" && o._.arrows) {
                                "startString" in o._.arrows && addArrow(o, o._.arrows.startString);
                                "endString" in o._.arrows && addArrow(o, o._.arrows.endString, 1);
                            }
                            break;
                        case "gradient":
                            (o.type == "circle" || o.type == "ellipse" || Str(value).charAt() != "r") && addGradientFill(o, value);
                            break;
                        case "opacity":
                            if (attrs.gradient && !attrs[has]("stroke-opacity")) {
                                $(node, {"stroke-opacity": value > 1 ? value / 100 : value});
                            }
                            // fall
                        case "fill-opacity":
                            if (attrs.gradient) {
                                gradient = g.doc.getElementById(node.getAttribute(fillString).replace(/^url\(#|\)$/g, E));
                                if (gradient) {
                                    stops = gradient.getElementsByTagName("stop");
                                    $(stops[stops.length - 1], {"stop-opacity": value});
                                }
                                break;
                            }
                        default:
                            att == "font-size" && (value = toInt(value, 10) + "px");
                            var cssrule = att.replace(/(\-.)/g, function (w) {
                                return upperCase.call(w.substring(1));
                            });
                            node.style[cssrule] = value;
                            o._.dirty = 1;
                            node[setAttribute](att, value);
                            break;
                    }
                }
            }

            tuneText(o, params);
        },
        leading = 1.2,
        tuneText = function (el, params) {
            if (el.type != "text" || !(params[has]("text") || params[has]("font") || params[has]("font-size") || params[has]("x") || params[has]("y"))) {
                return;
            }
            var a = el.attrs,
                node = el.node,
                fontSize = node.firstChild ? toInt(g.doc.defaultView.getComputedStyle(node.firstChild, E).getPropertyValue("font-size"), 10) : 10;
 
            if (params[has]("text")) {
                a.text = params.text;
                while (node.firstChild) {
                    node.removeChild(node.firstChild);
                }
                var texts = Str(params.text).split("\n"),
                    tspans = [],
                    tspan;
                for (var i = 0, ii = texts.length; i < ii; i++) if (texts[i]) {
                    tspan = $("tspan");
                    i && $(tspan, {dy: fontSize * leading, x: a.x});
                    tspan.appendChild(g.doc.createTextNode(texts[i]));
                    node.appendChild(tspan);
                    tspans[i] = tspan;
                }
            } else {
                tspans = node.getElementsByTagName("tspan");
                for (i = 0, ii = tspans.length; i < ii; i++) {
                    i && $(tspans[i], {dy: fontSize * leading, x: a.x});
                }
            }
            $(node, {y: a.y});
            el._.dirty = 1;
            var bb = el._getBBox(),
                dif = a.y - (bb.y + bb.height / 2);
            dif && R.is(dif, "finite") && $(tspans[0], {dy: a.y + dif});
        },
        Element = function (node, svg) {
            var X = 0,
                Y = 0;
            /*\
             * Element.node
             [ property (object) ]
             **
             * Gives you a reference to the DOM object, so you can assign event handlers or just mess around.
             > Usage
             | // draw a circle at coordinate 10,10 with radius of 10
             | var c = paper.circle(10, 10, 10);
             | c.node.onclick = function () {
             |     c.attr("fill", "red");
             | };
            \*/
            this[0] = this.node = node;
            /*\
             * Element.raphael
             [ property (object) ]
             **
             * Internal reference to @Raphael object. In case it is not available.
             > Usage
             | Raphael.el.red = function () {
             |     var hsb = this.paper.raphael.rgb2hsb(this.attr("fill"));
             |     hsb.h = 1;
             |     this.attr({fill: this.paper.raphael.hsb2rgb(hsb).hex});
             | }
            \*/
            node.raphael = true;
            /*\
             * Element.id
             [ property (number) ]
             **
             * Unique id of the element. Especially usesful when you want to listen to events of the element, 
             * because all events are fired in format `<module>.<action>.<id>`. Also useful for @Paper.getById method.
            \*/
            this.id = R._oid++;
            node.raphaelid = this.id;
            this.matrix = new Matrix;
            this.realPath = null;
            /*\
             * Element.paper
             [ property (object) ]
             **
             * Internal reference to “paper” where object drawn. Mainly for use in plugins and element extensions.
             > Usage
             | Raphael.el.cross = function () {
             |     this.attr({fill: "red"});
             |     this.paper.path("M10,10L50,50M50,10L10,50")
             |         .attr({stroke: "red"});
             | }
            \*/
            this.paper = svg;
            this.attrs = this.attrs || {};
            this._ = {
                transform: [],
                sx: 1,
                sy: 1,
                deg: 0,
                dx: 0,
                dy: 0,
                dirty: 1
            };
            !svg.bottom && (svg.bottom = this);
            /*\
             * Element.prev
             [ property (object) ]
             **
             * Reference to the previous element in the hierarchy.
            \*/
            this.prev = svg.top;
            svg.top && (svg.top.next = this);
            svg.top = this;
            /*\
             * Element.next
             [ property (object) ]
             **
             * Reference to the next element in the hierarchy.
            \*/
            this.next = null;
        },
        elproto = Element.prototype;
        /*\
         * Element.rotate
         [ method ]
         **
         * Adds rotation by given angle around given point to the list of
         * transformations of the element.
         > Parameters
         - deg (number) angle in degrees
         - cx (number) #optional x coordinate of the centre of rotation
         - cy (number) #optional y coordinate of the centre of rotation
         * If cx & cy aren’t specified centre of the shape is used as a point of rotation.
         = (object) @Element
        \*/
        elproto.rotate = function (deg, cx, cy) {
            if (this.removed) {
                return this;
            }
            deg = Str(deg).split(separator);
            if (deg.length - 1) {
                cx = toFloat(deg[1]);
                cy = toFloat(deg[2]);
            }
            deg = toFloat(deg[0]);
            (cy == null) && (cx = cy);
            if (cx == null || cy == null) {
                var bbox = this.getBBox(1);
                cx = bbox.x + bbox.width / 2;
                cy = bbox.y + bbox.height / 2;
            }
            this.transform(this._.transform.concat([["r", deg, cx, cy]]));
            return this;
        };
        /*\
         * Element.scale
         [ method ]
         **
         * Adds scale by given amount relative to given point to the list of
         * transformations of the element.
         > Parameters
         - sx (number) horisontal scale amount
         - sy (number) vertical scale amount
         - cx (number) #optional x coordinate of the centre of scale
         - cy (number) #optional y coordinate of the centre of scale
         * If cx & cy aren’t specified centre of the shape is used instead.
         = (object) @Element
        \*/
        elproto.scale = function (sx, sy, cx, cy) {
            if (this.removed) {
                return this;
            }
            sx = Str(sx).split(separator);
            if (sx.length - 1) {
                sy = toFloat(sx[1]);
                cx = toFloat(sx[2]);
                cy = toFloat(sx[3]);
            }
            sx = toFloat(sx[0]);
            (sy == null) && (sy = sx);
            (cy == null) && (cx = cy);
            if (cx == null || cy == null) {
                var bbox = this.getBBox(1);
            }
            cx = cx == null ? bbox.x + bbox.width / 2 : cx;
            cy = cy == null ? bbox.y + bbox.height / 2 : cy;
            this.transform(this._.transform.concat([["s", sx, sy, cx, cy]]));
            return this;
        };
        /*\
         * Element.translate
         [ method ]
         **
         * Adds translation by given amount to the list of transformations of the element.
         > Parameters
         - dx (number) horisontal shift
         - dy (number) vertical shift
         = (object) @Element
        \*/
        elproto.translate = function (dx, dy) {
            if (this.removed) {
                return this;
            }
            dx = Str(dx).split(separator);
            if (dx.length - 1) {
                dy = toFloat(dx[1]);
            }
            dx = toFloat(dx[0]) || 0;
            dy = +dy || 0;
            this.transform(this._.transform.concat([["t", dx, dy]]));
            return this;
        };
        /*\
         * Element.transform
         [ method ]
         **
         * Adds transformation to the element which is separate to other attributes,
         * i.e. translation doesn’t change `x` or `y` of the rectange. The format
         * of transformation string is similar to the path string syntax:
         | "t100,100r30,100,100s2,2,100,100r45s1.5"
         * Each letter is a command. There are four commands: `t` is for translate, `r` is for rotate, `s` is for
         * scale and `m` is for matrix.
         *
         * So, the example line above could be read like “translate by 100, 100; rotate 30° around 100, 100; scale twice around 100, 100;
         * rotate 45° around centre; scale 1.5 times relative to centre”. As you can see rotate and scale commands have origin
         * coordinates as optional parameters, the default is the centre point of the element.
         * Matrix accepts six parameters.
         > Usage
         | var el = paper.rect(10, 20, 300, 200);
         | // translate 100, 100, rotate 45°, translate -100, 0
         | el.transform("t100,100r45t-100,0");
         | // if you want you can append or prepend transformations
         | el.transform("...t50,50");
         | el.transform("s2...");
         | // or even wrap
         | el.transform("t50,50...t-50-50");
         | // to reset transformation call method with empty string
         | el.transform("");
         | // to get current value call it without parameters
         | console.log(el.transform());
         > Parameters
         - tstr (string) #optional transformation string
         * If tstr isn’t specified
         = (string) current transformation string
         * else
         = (object) @Element
        \*/
        elproto.transform = function (tstr) {
            var _ = this._;
            if (!tstr) {
                return _.transform;
            }
            extractTransform(this, tstr);

            this.clip && $(this.clip, {transform: this.matrix.invert()});
            // this.gradient && $(this.gradient, {gradientTransform: this.matrix.invert()});
            this.pattern && updatePosition(this);
            this.node && $(this.node, {transform: this.matrix});
            
            if (_.sx != 1 || _.sy != 1) {
                var sw = this.attrs[has]("stroke-width") ? this.attrs["stroke-width"] : 1;
                this.attr({"stroke-width": sw});
            }

            return this;
        };
        /*\
         * Element.hide
         [ method ]
         **
         * Makes element invisible. See @Element.show.
         = (object) @Element
        \*/
        elproto.hide = function () {
            !this.removed && this.paper.safari(this.node.style.display = "none");
            return this;
        };
        /*\
         * Element.show
         [ method ]
         **
         * Makes element visible. See @Element.hide.
         = (object) @Element
        \*/
        elproto.show = function () {
            !this.removed && this.paper.safari(this.node.style.display = "");
            return this;
        };
        /*\
         * Element.remove
         [ method ]
         **
         * Removes element form the paper.
        \*/
        elproto.remove = function () {
            if (this.removed) {
                return;
            }
            eve.unbind("*.*." + this.id);
            tear(this, this.paper);
            this.node.parentNode.removeChild(this.node);
            for (var i in this) {
                delete this[i];
            }
            this.removed = true;
        };
        elproto._getBBox = function () {
            if (this.node.style.display == "none") {
                this.show();
                var hide = true;
            }
            var bbox = {};
            try {
                bbox = this.node.getBBox();
            } catch(e) {
                // Firefox 3.0.x plays badly here
            } finally {
                bbox = bbox || {};
            }
            hide && this.hide();
            return bbox;
        };
        /*\
         * Element.attr
         [ method ]
         **
         * Sets the attributes of the element.
         > Parameters
         - attrName (string) attribute’s name
         - value (string) value
         * or
         - params (object) object of name/value pairs
         * or
         - attrName (string) attribute’s name
         * or
         - attrNames (array) in this case method returns array of current values for given attribute names
         = (object) @Element if attrsName & value or params are passed in.
         = (...) value of the attribute if only attrsName is passed in.
         = (array) array of values of the attribute if attrsNames is passed in.
         = (object) object of attributes if nothing is passed in.
         > Possible parameters
         # <p>Please refer to the <a href="http://www.w3.org/TR/SVG/" title="The W3C Recommendation for the SVG language describes these properties in detail.">SVG specification</a> for an explanation of these parameters.</p>
         o arrow-end (string) arrowhead on the end of the path. The format for string is `<type>[-<width>[-<length>]]`. Possible types: `classic`, `block`, `open`, `oval`, `diamond`, `none`, width: `wide`, `narrow`, `midium`, length: `long`, `short`, `midium`.
         o clip-rect (string) comma or space separated values: x, y, width and height
         o cursor (string) CSS type of the cursor
         o cx (number)
         o cy (number)
         o fill (string) colour, gradient or image
         o fill-opacity (number)
         o font (string)
         o font-family (string)
         o font-size (number) font size in pixels
         o font-weight (string)
         o height (number)
         o href (string) URL, if specified element behaves as hyperlink
         o opacity (number)
         o path (string) SVG path string format
         o r (number)
         o rx (number)
         o ry (number)
         o src (string) image URL, only works for @Element.image element
         o stroke (string) stroke colour
         o stroke-dasharray (string) [“”, “`-`”, “`.`”, “`-.`”, “`-..`”, “`. `”, “`- `”, “`--`”, “`- .`”, “`--.`”, “`--..`”]
         o stroke-linecap (string) [“`butt`”, “`square`”, “`round`”]
         o stroke-linejoin (string) [“`bevel`”, “`round`”, “`miter`”]
         o stroke-miterlimit (number)
         o stroke-opacity (number)
         o stroke-width (number) stroke width in pixels, default is '1'
         o target (string) used with href
         o text (string) contents of the text element. Use `\n` for multiline text
         o text-anchor (string) [“`start`”, “`middle`”, “`end`”], default is “`middle`”
         o title (string) will create tooltip with a given text
         o transform (string) see @Element.transform
         o width (number)
         o x (number)
         o y (number)
         > Gradients
         * Linear gradient format: “`‹angle›-‹colour›[-‹colour›[:‹offset›]]*-‹colour›`”, example: “`90-#fff-#000`” – 90°
         * gradient from white to black or “`0-#fff-#f00:20-#000`” – 0° gradient from white via red (at 20%) to black.
         *
         * radial gradient: “`r[(‹fx›, ‹fy›)]‹colour›[-‹colour›[:‹offset›]]*-‹colour›`”, example: “`r#fff-#000`” –
         * gradient from white to black or “`r(0.25, 0.75)#fff-#000`” – gradient from white to black with focus point
         * at 0.25, 0.75. Focus point coordinates are in 0..1 range. Radial gradients can only be applied to circles and ellipses.
         > Path String
         # <p>Please refer to <a href="http://www.w3.org/TR/SVG/paths.html#PathData" title="Details of a path’s data attribute’s format are described in the SVG specification.">SVG documentation regarding path string</a>. Raphaël fully supports it.</p>
         > Colour Parsing
         # <ul>
         #     <li>Colour name (“<code>red</code>”, “<code>green</code>”, “<code>cornflowerblue</code>”, etc)</li>
         #     <li>#••• — shortened HTML colour: (“<code>#000</code>”, “<code>#fc0</code>”, etc)</li>
         #     <li>#•••••• — full length HTML colour: (“<code>#000000</code>”, “<code>#bd2300</code>”)</li>
         #     <li>rgb(•••, •••, •••) — red, green and blue channels’ values: (“<code>rgb(200,&nbsp;100,&nbsp;0)</code>”)</li>
         #     <li>rgb(•••%, •••%, •••%) — same as above, but in %: (“<code>rgb(100%,&nbsp;175%,&nbsp;0%)</code>”)</li>
         #     <li>rgba(•••, •••, •••, •••) — red, green and blue channels’ values: (“<code>rgba(200,&nbsp;100,&nbsp;0, .5)</code>”)</li>
         #     <li>rgba(•••%, •••%, •••%, •••%) — same as above, but in %: (“<code>rgba(100%,&nbsp;175%,&nbsp;0%, 50%)</code>”)</li>
         #     <li>hsb(•••, •••, •••) — hue, saturation and brightness values: (“<code>hsb(0.5,&nbsp;0.25,&nbsp;1)</code>”)</li>
         #     <li>hsb(•••%, •••%, •••%) — same as above, but in %</li>
         #     <li>hsba(•••, •••, •••, •••) — same as above, but with opacity</li>
         #     <li>hsl(•••, •••, •••) — almost the same as hsb, see <a href="http://en.wikipedia.org/wiki/HSL_and_HSV" title="HSL and HSV - Wikipedia, the free encyclopedia">Wikipedia page</a></li>
         #     <li>hsl(•••%, •••%, •••%) — same as above, but in %</li>
         #     <li>hsla(•••, •••, •••) — same as above, but with opacity</li>
         #     <li>Optionally for hsb and hsl you could specify hue as a degree: “<code>hsl(240deg,&nbsp;1,&nbsp;.5)</code>” or, if you want to go fancy, “<code>hsl(240°,&nbsp;1,&nbsp;.5)</code>”</li>
         # </ul>
        \*/
        elproto.attr = function (name, value) {
            if (this.removed) {
                return this;
            }
            if (name == null) {
                var res = {};
                for (var i in this.attrs) if (this.attrs[has](i)) {
                    res[i] = this.attrs[i];
                }
                res.gradient && res.fill == "none" && (res.fill = res.gradient) && delete res.gradient;
                res.transform = this._.transform;
                return res;
            }
            if (value == null && R.is(name, string)) {
                if (name == fillString && this.attrs.fill == "none" && this.attrs.gradient) {
                    return this.attrs.gradient;
                }
                if (name == "transform") {
                    return this._.transform;
                }
                if (name in this.attrs) {
                    return this.attrs[name];
                } else if (R.is(this.paper.customAttributes[name], "function")) {
                    return this.paper.customAttributes[name].def;
                } else {
                    return availableAttrs[name];
                }
            }
            if (value == null && R.is(name, array)) {
                var values = {};
                for (var j = 0, jj = name.length; j < jj; j++) {
                    values[name[j]] = this.attr(name[j]);
                }
                return values;
            }
            if (value != null) {
                var params = {};
                params[name] = value;
            } else if (name != null && R.is(name, "object")) {
                params = name;
            }
            for (var key in this.paper.customAttributes) if (this.paper.customAttributes[has](key) && params[has](key) && R.is(this.paper.customAttributes[key], "function")) {
                var par = this.paper.customAttributes[key].apply(this, [][concat](params[key]));
                this.attrs[key] = params[key];
                for (var subkey in par) if (par[has](subkey)) {
                    params[subkey] = par[subkey];
                }
            }
            setFillAndStroke(this, params);
            return this;
        };
        /*\
         * Element.toFront
         [ method ]
         **
         * Moves the element so it is the closest to the viewer’s eyes, on top of other elements.
         = (object) @Element
        \*/
        elproto.toFront = function () {
            if (this.removed) {
                return this;
            }
            this.node.parentNode.appendChild(this.node);
            var svg = this.paper;
            svg.top != this && tofront(this, svg);
            return this;
        };
        /*\
         * Element.toBack
         [ method ]
         **
         * Moves the element so it is the furthest from the viewer’s eyes, behind other elements.
         = (object) @Element
        \*/
        elproto.toBack = function () {
            if (this.removed) {
                return this;
            }
            if (this.node.parentNode.firstChild != this.node) {
                this.node.parentNode.insertBefore(this.node, this.node.parentNode.firstChild);
                toback(this, this.paper);
                var svg = this.paper;
            }
            return this;
        };
        /*\
         * Element.insertAfter
         [ method ]
         **
         * Inserts current object after the given one.
         = (object) @Element
        \*/
        elproto.insertAfter = function (element) {
            if (this.removed) {
                return this;
            }
            var node = element.node || element[element.length - 1].node;
            if (node.nextSibling) {
                node.parentNode.insertBefore(this.node, node.nextSibling);
            } else {
                node.parentNode.appendChild(this.node);
            }
            insertafter(this, element, this.paper);
            return this;
        };
        /*\
         * Element.insertBefore
         [ method ]
         **
         * Inserts current object before the given one.
         = (object) @Element
        \*/
        elproto.insertBefore = function (element) {
            if (this.removed) {
                return this;
            }
            var node = element.node || element[0].node;
            node.parentNode.insertBefore(this.node, node);
            insertbefore(this, element, this.paper);
            return this;
        };
        elproto.blur = function (size) {
            // Experimental. No Safari support. Use it on your own risk.
            var t = this;
            if (+size !== 0) {
                var fltr = $("filter"),
                    blur = $("feGaussianBlur");
                t.attrs.blur = size;
                fltr.id = createUUID();
                $(blur, {stdDeviation: +size || 1.5});
                fltr.appendChild(blur);
                t.paper.defs.appendChild(fltr);
                t._blur = fltr;
                $(t.node, {filter: "url(#" + fltr.id + ")"});
            } else {
                if (t._blur) {
                    t._blur.parentNode.removeChild(t._blur);
                    delete t._blur;
                    delete t.attrs.blur;
                }
                t.node.removeAttribute("filter");
            }
        };
        var theCircle = function (svg, x, y, r) {
            var el = $("circle");
            svg.canvas && svg.canvas.appendChild(el);
            var res = new Element(el, svg);
            res.attrs = {cx: x, cy: y, r: r, fill: "none", stroke: "#000"};
            res.type = "circle";
            $(el, res.attrs);
            return res;
        },
        theRect = function (svg, x, y, w, h, r) {
            var el = $("rect");
            svg.canvas && svg.canvas.appendChild(el);
            var res = new Element(el, svg);
            res.attrs = {x: x, y: y, width: w, height: h, r: r || 0, rx: r || 0, ry: r || 0, fill: "none", stroke: "#000"};
            res.type = "rect";
            $(el, res.attrs);
            return res;
        },
        theEllipse = function (svg, x, y, rx, ry) {
            var el = $("ellipse");
            svg.canvas && svg.canvas.appendChild(el);
            var res = new Element(el, svg);
            res.attrs = {cx: x, cy: y, rx: rx, ry: ry, fill: "none", stroke: "#000"};
            res.type = "ellipse";
            $(el, res.attrs);
            return res;
        },
        theImage = function (svg, src, x, y, w, h) {
            var el = $("image");
            $(el, {x: x, y: y, width: w, height: h, preserveAspectRatio: "none"});
            el.setAttributeNS(xlink, "href", src);
            svg.canvas && svg.canvas.appendChild(el);
            var res = new Element(el, svg);
            res.attrs = {x: x, y: y, width: w, height: h, src: src};
            res.type = "image";
            return res;
        },
        theText = function (svg, x, y, text) {
            var el = $("text");
            $(el, {x: x, y: y, "text-anchor": "middle"});
            svg.canvas && svg.canvas.appendChild(el);
            var res = new Element(el, svg);
            res.attrs = {x: x, y: y, "text-anchor": "middle", text: text, font: availableAttrs.font, stroke: "none", fill: "#000"};
            res.type = "text";
            setFillAndStroke(res, res.attrs);
            return res;
        },
        setSize = function (width, height) {
            this.width = width || this.width;
            this.height = height || this.height;
            this.canvas[setAttribute]("width", this.width);
            this.canvas[setAttribute]("height", this.height);
            if (this._viewBox) {
                this.setViewBox.apply(this, this._viewBox);
            }
            return this;
        },
        create = function () {
            var con = getContainer[apply](0, arguments),
                container = con && con.container,
                x = con.x,
                y = con.y,
                width = con.width,
                height = con.height;
            if (!container) {
                throw new Error("SVG container not found.");
            }
            var cnvs = $("svg"),
                css = "overflow:hidden;";
            x = x || 0;
            y = y || 0;
            width = width || 512;
            height = height || 342;
            $(cnvs, {
                height: height,
                version: 1.1,
                width: width,
                xmlns: "http://www.w3.org/2000/svg"
            });
            if (container == 1) {
                cnvs.style.cssText = css + "position:absolute;left:" + x + "px;top:" + y + "px";
                g.doc.body.appendChild(cnvs);
            } else {
                cnvs.style.cssText = css;
                if (container.firstChild) {
                    container.insertBefore(cnvs, container.firstChild);
                } else {
                    container.appendChild(cnvs);
                }
            }
            container = new Paper;
            container.width = width;
            container.height = height;
            container.canvas = cnvs;
            plugins.call(container, container, R.fn);
            container.clear();
            return container;
        },
        setViewBox = function (x, y, w, h, fit) {
            eve("setViewBox", this, this._viewBox, [x, y, w, h, fit]);
            var size = mmax(w / this.width, h / this.height),
                top = this.top,
                aspectRatio = fit ? "meet" : "xMinYMin",
                vb,
                sw;
            if (x == null) {
                if (this._vbSize) {
                    size = 1;
                }
                delete this._vbSize;
                vb = "0 0 " + this.width + S + this.height;
            } else {
                this._vbSize = size;
                vb = x + S + y + S + w + S + h;
            }
            $(this.canvas, {
                viewBox: vb,
                preserveAspectRatio: aspectRatio
            });
            while (size && top) {
                sw = "stroke-width" in top.attrs ? top.attrs["stroke-width"] : 1;
                top.attr({"stroke-width": sw});
                top._.dirty = 1;
                top._.dirtyT = 1;
                top = top.prev;
            }
            this._viewBox = [x, y, w, h, !!fit];
            return this;
        };
        /*\
         * Paper.clear
         [ method ]
         **
         * Clears the paper, i.e. removes all the elements.
        \*/
        paperproto.clear = function () {
            eve("clear", this);
            var c = this.canvas;
            while (c.firstChild) {
                c.removeChild(c.firstChild);
            }
            this.bottom = this.top = null;
            (this.desc = $("desc")).appendChild(g.doc.createTextNode("Created with Rapha\xebl " + R.version));
            c.appendChild(this.desc);
            c.appendChild(this.defs = $("defs"));
        };
        /*\
         * Paper.remove
         [ method ]
         **
         * Removes the paper from the DOM.
        \*/
        paperproto.remove = function () {
            eve("remove", this);
            this.canvas.parentNode && this.canvas.parentNode.removeChild(this.canvas);
            for (var i in this) {
                this[i] = removed(i);
            }
        };
    }

    // VML
    if (R.vml) {
        var map = {M: "m", L: "l", C: "c", Z: "x", m: "t", l: "r", c: "v", z: "x"},
            bites = /([clmz]),?([^clmz]*)/gi,
            blurregexp = / progid:\S+Blur\([^\)]+\)/g,
            val = /-?[^,\s-]+/g,
            cssDot = "position:absolute;left:0;top:0;width:1px;height:1px",
            zoom = 21600,
            pathTypes = {path: 1, rect: 1},
            ovalTypes = {circle: 1, ellipse: 1},
            path2vml = function (path) {
                var total =  /[ahqstv]/ig,
                    command = pathToAbsolute;
                Str(path).match(total) && (command = path2curve);
                total = /[clmz]/g;
                if (command == pathToAbsolute && !Str(path).match(total)) {
                    var res = Str(path).replace(bites, function (all, command, args) {
                        var vals = [],
                            isMove = lowerCase.call(command) == "m",
                            res = map[command];
                        args.replace(val, function (value) {
                            if (isMove && vals.length == 2) {
                                res += vals + map[command == "m" ? "l" : "L"];
                                vals = [];
                            }
                            vals.push(round(value * zoom));
                        });
                        return res + vals;
                    });
                    return res;
                }
                var pa = command(path), p, r;
                res = [];
                for (var i = 0, ii = pa.length; i < ii; i++) {
                    p = pa[i];
                    r = lowerCase.call(pa[i][0]);
                    r == "z" && (r = "x");
                    for (var j = 1, jj = p.length; j < jj; j++) {
                        r += round(p[j] * zoom) + (j != jj - 1 ? "," : E);
                    }
                    res.push(r);
                }
                return res.join(S);
            },
            compensation = function (deg, dx, dy) {
                var m = new Matrix;
                m.rotate(-deg, .5, .5);
                return {
                    dx: m.x(dx, dy),
                    dy: m.y(dx, dy)
                };
            },
            setCoords = function (p) {
                var _ = p._,
                    sx = _.sx,
                    sy = _.sy,
                    deg = _.deg,
                    dx = _.dx,
                    dy = _.dy,
                    fillpos = _.fillpos,
                    o = p.node,
                    s = o.style,
                    y = 1,
                    m = p.matrix,
                    flip = "",
                    dxdy,
                    kx = zoom / sx,
                    ky = zoom / sy;
                s.visibility = "hidden";
                o.coordsize = abs(kx) + S + abs(ky);
                s.rotation = deg * (sx * sy < 0 ? -1 : 1);
                if (deg) {
                    var c = compensation(deg, dx, dy);
                    dx = c.dx;
                    dy = c.dy;
                }
                sx < 0 && (flip += "x");
                sy < 0 && (flip += " y") && (y = -1);
                s.flip = flip;
                o.coordorigin = (dx * -kx) + S + (dy * -ky);
                if (fillpos || _.fillsize) {
                    var fill = o.getElementsByTagName(fillString);
                    fill = fill && fill[0];
                    o.removeChild(fill);
                    if (fillpos) {
                        c = compensation(deg, m.x(fillpos[0], fillpos[1]), m.y(fillpos[0], fillpos[1]));
                        fill.position = c.dx * y + S + c.dy * y;
                    }
                    if (_.fillsize) {
                        fill.size = _.fillsize[0] * abs(sx) + S + _.fillsize[1] * abs(sy);
                    }
                    o.appendChild(fill);
                }
                s.visibility = "visible";
            };
        R.toString = function () {
            return  "Your browser doesn\u2019t support SVG. Falling down to VML.\nYou are running Rapha\xebl " + this.version;
        };
        addArrow = function (o, value, isEnd) {
            var values = Str(value).toLowerCase().split("-"),
                se = isEnd ? "end" : "start",
                i = values.length,
                type = "classic",
                w = "medium",
                h = "medium";
            while (i--) {
                switch (values[i]) {
                    case "block":
                    case "classic":
                    case "oval":
                    case "diamond":
                    case "open":
                    case "none":
                        type = values[i];
                        break;
                    case "wide":
                    case "narrow": h = values[i]; break;
                    case "long":
                    case "short": w = values[i]; break;
                }
            }
            var stroke = o.node.getElementsByTagName("stroke")[0];
            stroke[se + "arrow"] = type;
            stroke[se + "arrowlength"] = w;
            stroke[se + "arrowwidth"] = h;
        };
        setFillAndStroke = function (o, params) {
            o.paper.canvas.style.display = "none";
            o.attrs = o.attrs || {};
            var node = o.node,
                a = o.attrs,
                s = node.style,
                xy,
                newpath = pathTypes[o.type] && (params.x != a.x || params.y != a.y || params.width != a.width || params.height != a.height || params.cx != a.cx || params.cy != a.cy || params.rx != a.rx || params.ry != a.ry || params.r != a.r),
                isOval = ovalTypes[o.type] && (a.cx != params.cx || a.cy != params.cy || a.r != params.r || a.rx != params.rx || a.ry != params.ry),
                res = o;


            for (var par in params) if (params[has](par)) {
                a[par] = params[par];
            }
            if (newpath) {
                a.path = getPath[o.type](o);
                o._.dirty = 1;
            }
            params.href && (node.href = params.href);
            params.title && (node.title = params.title);
            params.target && (node.target = params.target);
            params.cursor && (s.cursor = params.cursor);
            "blur" in params && o.blur(params.blur);
            "transform" in params && o.transform(params.transform);
            if (params.path && o.type == "path" || newpath) {
                node.path = path2vml(a.path);
            }
            if (isOval) {
                var cx = a.cx,
                    cy = a.cy,
                    rx = a.rx || a.r || 0,
                    ry = a.ry || a.r || 0;
                node.path = R.format("ar{0},{1},{2},{3},{4},{1},{4},{1}x", round((cx - rx) * zoom), round((cy - ry) * zoom), round((cx + rx) * zoom), round((cy + ry) * zoom), round(cx * zoom));
            }
            if ("clip-rect" in params) {
                var rect = Str(params["clip-rect"]).split(separator);
                if (rect.length == 4) {
                    rect[2] = +rect[2] + (+rect[0]);
                    rect[3] = +rect[3] + (+rect[1]);
                    var div = node.clipRect || g.doc.createElement("div"),
                        dstyle = div.style,
                        group = node.parentNode;
                    dstyle.clip = R.format("rect({1}px {2}px {3}px {0}px)", rect);
                    if (!node.clipRect) {
                        dstyle.position = "absolute";
                        dstyle.top = 0;
                        dstyle.left = 0;
                        dstyle.width = o.paper.width + "px";
                        dstyle.height = o.paper.height + "px";
                        group.parentNode.insertBefore(div, group);
                        div.appendChild(group);
                        node.clipRect = div;
                    }
                }
                if (!params["clip-rect"]) {
                    node.clipRect && (node.clipRect.style.clip = E);
                }
            }
            if (o.textpath) {
                var textpathStyle = o.textpath.style;
                params.font && (textpathStyle.font = params.font);
                params["font-family"] && (textpathStyle.fontFamily = '"' + params["font-family"].split(",")[0].replace(/^['"]+|['"]+$/g, E) + '"');
                params["font-size"] && (textpathStyle.fontSize = params["font-size"]);
                params["font-weight"] && (textpathStyle.fontWeight = params["font-weight"]);
                params["font-style"] && (textpathStyle.fontStyle = params["font-style"]);
            }
            if ("arrow-start" in params) {
                addArrow(res, params["arrow-start"]);
            }
            if ("arrow-end" in params) {
                addArrow(res, params["arrow-end"], 1);
            }
            if (params.opacity != null || 
                params["stroke-width"] != null ||
                params.fill != null ||
                params.src != null ||
                params.stroke != null ||
                params["stroke-width"] != null ||
                params["stroke-opacity"] != null ||
                params["fill-opacity"] != null ||
                params["stroke-dasharray"] != null ||
                params["stroke-miterlimit"] != null ||
                params["stroke-linejoin"] != null ||
                params["stroke-linecap"] != null) {
                var fill = node.getElementsByTagName(fillString),
                    newfill = false;
                fill = fill && fill[0];
                !fill && (newfill = fill = createNode(fillString));
                if (o.type == "image" && params.src) {
                    fill.src = params.src;
                }
                if ("fill-opacity" in params || "opacity" in params) {
                    var opacity = ((+a["fill-opacity"] + 1 || 2) - 1) * ((+a.opacity + 1 || 2) - 1) * ((+R.getRGB(params.fill).o + 1 || 2) - 1);
                    opacity = mmin(mmax(opacity, 0), 1);
                    fill.opacity = opacity;
                }
                params.fill && (fill.on = true);
                if (fill.on == null || params.fill == "none" || params.fill === null) {
                    fill.on = false;
                }
                if (fill.on && params.fill) {
                    var isURL = params.fill.match(ISURL);
                    if (isURL) {
                        fill.parentNode == node && node.removeChild(fill);
                        fill.rotate = true;
                        fill.src = isURL[1];
                        fill.type = "tile";
                        var bbox = o.getBBox(1);
                        fill.position = bbox.x + S + bbox.y;
                        o._.fillpos = [bbox.x, bbox.y];

                        preload(isURL[1], function () {
                            o._.fillsize = [this.offsetWidth, this.offsetHeight];
                        });
                    } else {
                        fill.color = R.getRGB(params.fill).hex;
                        fill.src = E;
                        fill.type = "solid";
                        if (R.getRGB(params.fill).error && (res.type in {circle: 1, ellipse: 1} || Str(params.fill).charAt() != "r") && addGradientFill(res, params.fill, fill)) {
                            a.fill = "none";
                            a.gradient = params.fill;
                            fill.rotate = false;
                        }
                    }
                }
                node.appendChild(fill);
                var stroke = (node.getElementsByTagName("stroke") && node.getElementsByTagName("stroke")[0]),
                newstroke = false;
                !stroke && (newstroke = stroke = createNode("stroke"));
                if ((params.stroke && params.stroke != "none") ||
                    params["stroke-width"] ||
                    params["stroke-opacity"] != null ||
                    params["stroke-dasharray"] ||
                    params["stroke-miterlimit"] ||
                    params["stroke-linejoin"] ||
                    params["stroke-linecap"]) {
                    stroke.on = true;
                }
                (params.stroke == "none" || params.stroke === null || stroke.on == null || params.stroke == 0 || params["stroke-width"] == 0) && (stroke.on = false);
                var strokeColor = R.getRGB(params.stroke);
                stroke.on && params.stroke && (stroke.color = strokeColor.hex);
                opacity = ((+a["stroke-opacity"] + 1 || 2) - 1) * ((+a.opacity + 1 || 2) - 1) * ((+strokeColor.o + 1 || 2) - 1);
                var width = (toFloat(params["stroke-width"]) || 1) * .75;
                opacity = mmin(mmax(opacity, 0), 1);
                params["stroke-width"] == null && (width = a["stroke-width"]);
                params["stroke-width"] && (stroke.weight = width);
                width && width < 1 && (opacity *= width) && (stroke.weight = 1);
                stroke.opacity = opacity;
                
                params["stroke-linejoin"] && (stroke.joinstyle = params["stroke-linejoin"] || "miter");
                stroke.miterlimit = params["stroke-miterlimit"] || 8;
                params["stroke-linecap"] && (stroke.endcap = params["stroke-linecap"] == "butt" ? "flat" : params["stroke-linecap"] == "square" ? "square" : "round");
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
                    stroke.dashstyle = dasharray[has](params["stroke-dasharray"]) ? dasharray[params["stroke-dasharray"]] : E;
                }
                newstroke && node.appendChild(stroke);
            }
            if (res.type == "text") {
                res.paper.canvas.style.display = E;
                var span = res.paper.span,
                    m = 100,
                    fontSize = a.font && a.font.match(/\d+(?:\.\d*)?(?=px)/);
                s = span.style;
                a.font && (s.font = a.font);
                a["font-family"] && (s.fontFamily = a["font-family"]);
                a["font-weight"] && (s.fontWeight = a["font-weight"]);
                a["font-style"] && (s.fontStyle = a["font-style"]);
                fontSize = toFloat(fontSize ? fontSize[0] : a["font-size"]);
                s.fontSize = fontSize * m + "px";
                res.textpath.string && (span.innerHTML = Str(res.textpath.string).replace(/</g, "&#60;").replace(/&/g, "&#38;").replace(/\n/g, "<br>"));
                var brect = span.getBoundingClientRect();
                res.W = a.w = (brect.right - brect.left) / m;
                res.H = a.h = (brect.bottom - brect.top) / m;
                res.paper.canvas.style.display = "none";
                res.X = a.x;
                res.Y = a.y + res.H / 2;

                ("x" in params || "y" in params) && (res.path.v = R.format("m{0},{1}l{2},{1}", round(a.x * zoom), round(a.y * zoom), round(a.x * zoom) + 1));
                var dirtyattrs = ["x", "y", "text", "font", "font-family", "font-weight", "font-style", "font-size"];
                for (var d = 0, dd = dirtyattrs.length; d < dd; d++) if (dirtyattrs[d] in params) {
                    res._.dirty = 1;
                    break;
                }
                
                // text-anchor emulation
                switch (a["text-anchor"]) {
                    case "start":
                        res.textpath.style["v-text-align"] = "left";
                        res.bbx = res.W / 2;
                    break;
                    case "end":
                        res.textpath.style["v-text-align"] = "right";
                        res.bbx = -res.W / 2;
                    break;
                    default:
                        res.textpath.style["v-text-align"] = "center";
                        res.bbx = 0;
                    break;
                }
                res.textpath.style["v-text-kern"] = true;
            }
            res.paper.canvas.style.display = E;
        };
        addGradientFill = function (o, gradient, fill) {
            o.attrs = o.attrs || {};
            var attrs = o.attrs,
                type = "linear",
                fxfy = ".5 .5";
            o.attrs.gradient = gradient;
            gradient = Str(gradient).replace(radial_gradient, function (all, fx, fy) {
                type = "radial";
                if (fx && fy) {
                    fx = toFloat(fx);
                    fy = toFloat(fy);
                    pow(fx - .5, 2) + pow(fy - .5, 2) > .25 && (fy = math.sqrt(.25 - pow(fx - .5, 2)) * ((fy > .5) * 2 - 1) + .5);
                    fxfy = fx + S + fy;
                }
                return E;
            });
            gradient = gradient.split(/\s*\-\s*/);
            if (type == "linear") {
                var angle = gradient.shift();
                angle = -toFloat(angle);
                if (isNaN(angle)) {
                    return null;
                }
            }
            var dots = parseDots(gradient);
            if (!dots) {
                return null;
            }
            o = o.shape || o.node;
            if (dots.length) {
                o.removeChild(fill);
                fill.on = true;
                fill.method = "none";
                fill.color = dots[0].color;
                fill.color2 = dots[dots.length - 1].color;
                var clrs = [];
                for (var i = 0, ii = dots.length; i < ii; i++) {
                    dots[i].offset && clrs.push(dots[i].offset + S + dots[i].color);
                }
                fill.colors && (fill.colors.value = clrs.length ? clrs.join() : "0% " + fill.color);
                if (type == "radial") {
                    fill.type = "gradientTitle";
                    fill.focus = "100%";
                    fill.focussize = "0 0";
                    fill.focusposition = fxfy;
                    fill.angle = 0;
                } else {
                    // fill.rotate= true;
                    fill.type = "gradient";
                    fill.angle = (270 - angle) % 360;
                }
                o.appendChild(fill);
                // alert(fill.outerHTML);
            }
            return 1;
        };
        Element = function (node, vml) {
            this[0] = this.node = node;
            node.raphael = true;
            this.id = R._oid++;
            node.raphaelid = this.id;
            this.X = 0;
            this.Y = 0;
            this.attrs = {};
            this.paper = vml;
            this.matrix = new Matrix;
            this._ = {
                transform: [],
                sx: 1,
                sy: 1,
                dx: 0,
                dy: 0,
                deg: 0,
                dirty: 1,
                dirtyT: 1
            };
            !vml.bottom && (vml.bottom = this);
            this.prev = vml.top;
            vml.top && (vml.top.next = this);
            vml.top = this;
            this.next = null;
        };
        elproto = Element.prototype;
        elproto.transform = function (tstr) {
            if (tstr == null) {
                return this._.transform;
            }
            extractTransform(this, tstr);
            var matrix = this.matrix.clone(),
                skew = this.skew;
            matrix.translate(-.5, -.5);
            if (this.type == "image") {
                if (Str(tstr).indexOf("m") + 1) {
                    this.node.style.filter = matrix.toFilter();
                    var bb = this.getBBox(),
                        bbt = this.getBBox(1),
                        im = matrix.invert(),
                        dx = im.x(bb.x, bb.y) - im.x(bbt.x, bbt.y),
                        dy = im.y(bb.x, bb.y) - im.y(bbt.x, bbt.y);
                    // skew.offset = dx + S + dy;
                    // this.node.getElementsByTagName(fillString)[0].position = skew.offset;
                } else {
                    this.node.style.filter = E;
                    setCoords(this);
                }
            } else {
                    // o = this.node,
                    // _ = this._,
                    // fillpos = _.fillpos,
                    // deg,
                    // matrix = this.matrix;
                    // fill = o.getElementsByTagName(fillString)[0],
                    // angle = fill.angle;

                this.node.style.filter = E;
                skew.matrix = matrix;
                skew.offset = matrix.offset();
                
                // if (0&&angle) {
                //     angle = R.rad(270 - angle);
                //     var dx = 100 * math.cos(angle),
                //         dy = 100 * math.sin(angle),
                //         zx = matrix.x(0, 0),
                //         zy = matrix.y(0, 0),
                //         mx = matrix.x(dx, dy),
                //         my = matrix.y(dx, dy);
                //     angle = R.angle(zx, zy, mx, my);
                //     fill.angle = (270 - angle) % 360;
                // }
            }
            return this;
        };
        elproto.rotate = function (deg, cx, cy) {
            if (this.removed) {
                return this;
            }
            if (deg == null) {
                return;
            }
            deg = Str(deg).split(separator);
            if (deg.length - 1) {
                cx = toFloat(deg[1]);
                cy = toFloat(deg[2]);
            }
            deg = toFloat(deg[0]);
            (cy == null) && (cx = cy);
            if (cx == null || cy == null) {
                var bbox = this.getBBox(1);
                cx = bbox.x + bbox.width / 2;
                cy = bbox.y + bbox.height / 2;
            }
            this._.dirtyT = 1;
            this.transform(this._.transform.concat([["r", deg, cx, cy]]));
            return this;
        };
        elproto.translate = function (dx, dy) {
            if (this.removed) {
                return this;
            }
            dx = Str(dx).split(separator);
            if (dx.length - 1) {
                dy = toFloat(dx[1]);
            }
            dx = toFloat(dx[0]) || 0;
            dy = +dy || 0;
            if (this._.bbox) {
                this._.bbox.x += dx;
                this._.bbox.y += dy;
            }
            this.transform(this._.transform.concat([["t", dx, dy]]));
            return this;
        };
        elproto.scale = function (sx, sy, cx, cy) {
            if (this.removed) {
                return this;
            }
            sx = Str(sx).split(separator);
            if (sx.length - 1) {
                sy = toFloat(sx[1]);
                cx = toFloat(sx[2]);
                cy = toFloat(sx[3]);
                isNaN(cx) && (cx = null);
                isNaN(cy) && (cy = null);
            }
            sx = toFloat(sx[0]);
            (sy == null) && (sy = sx);
            (cy == null) && (cx = cy);
            if (cx == null || cy == null) {
                var bbox = this.getBBox(1);
            }
            cx = cx == null ? bbox.x + bbox.width / 2 : cx;
            cy = cy == null ? bbox.y + bbox.height / 2 : cy;
            
            this.transform(this._.transform.concat([["s", sx, sy, cx, cy]]));
            this._.dirtyT = 1;
            return this;
        };
        elproto.hide = function () {
            !this.removed && (this.node.style.display = "none");
            return this;
        };
        elproto.show = function () {
            !this.removed && (this.node.style.display = E);
            return this;
        };
        elproto._getBBox = function () {
            if (this.removed) {
                return {};
            }
            if (this.type == "text") {
                return {
                    x: this.X + (this.bbx || 0) - this.W / 2,
                    y: this.Y - this.H,
                    width: this.W,
                    height: this.H
                };
            } else {
                return pathDimensions(this.attrs.path);
            }
        };
        elproto.remove = function () {
            if (this.removed) {
                return;
            }
            eve.unbind("*.*." + this.id);
            tear(this, this.paper);
            this.node.parentNode.removeChild(this.node);
            this.shape && this.shape.parentNode.removeChild(this.shape);
            for (var i in this) {
                delete this[i];
            }
            this.removed = true;
        };
        elproto.attr = function (name, value) {
            if (this.removed) {
                return this;
            }
            if (name == null) {
                var res = {};
                for (var i in this.attrs) if (this.attrs[has](i)) {
                    res[i] = this.attrs[i];
                }
                res.gradient && res.fill == "none" && (res.fill = res.gradient) && delete res.gradient;
                return res;
            }
            if (value == null && R.is(name, "string")) {
                if (name == fillString && this.attrs.fill == "none" && this.attrs.gradient) {
                    return this.attrs.gradient;
                }
                if (name in this.attrs) {
                    return this.attrs[name];
                } else if (R.is(this.paper.customAttributes[name], "function")) {
                    return this.paper.customAttributes[name].def;
                } else {
                    return availableAttrs[name];
                }
            }
            if (this.attrs && value == null && R.is(name, array)) {
                var ii, values = {};
                for (i = 0, ii = name.length; i < ii; i++) {
                    values[name[i]] = this.attr(name[i]);
                }
                return values;
            }
            var params;
            if (value != null) {
                params = {};
                params[name] = value;
            }
            value == null && R.is(name, "object") && (params = name);
            for (var key in params) {
                eve("attr." + key + "." + this.id, this, params[key]);
            }
            if (params) {
                for (key in this.paper.customAttributes) if (this.paper.customAttributes[has](key) && params[has](key) && R.is(this.paper.customAttributes[key], "function")) {
                    var par = this.paper.customAttributes[key].apply(this, [][concat](params[key]));
                    this.attrs[key] = params[key];
                    for (var subkey in par) if (par[has](subkey)) {
                        params[subkey] = par[subkey];
                    }
                }
                // this.paper.canvas.style.display = "none";
                if (params.text && this.type == "text") {
                    this.textpath.string = params.text;
                }
                setFillAndStroke(this, params);
                // this.paper.canvas.style.display = E;
            }
            return this;
        };
        elproto.toFront = function () {
            !this.removed && this.node.parentNode.appendChild(this.node);
            this.paper.top != this && tofront(this, this.paper);
            return this;
        };
        elproto.toBack = function () {
            if (this.removed) {
                return this;
            }
            if (this.node.parentNode.firstChild != this.node) {
                this.node.parentNode.insertBefore(this.node, this.node.parentNode.firstChild);
                toback(this, this.paper);
            }
            return this;
        };
        elproto.insertAfter = function (element) {
            if (this.removed) {
                return this;
            }
            if (element.constructor == Set) {
                element = element[element.length - 1];
            }
            if (element.node.nextSibling) {
                element.node.parentNode.insertBefore(this.node, element.node.nextSibling);
            } else {
                element.node.parentNode.appendChild(this.node);
            }
            insertafter(this, element, this.paper);
            return this;
        };
        elproto.insertBefore = function (element) {
            if (this.removed) {
                return this;
            }
            if (element.constructor == Set) {
                element = element[0];
            }
            element.node.parentNode.insertBefore(this.node, element.node);
            insertbefore(this, element, this.paper);
            return this;
        };
        elproto.blur = function (size) {
            var s = this.node.runtimeStyle,
                f = s.filter;
            f = f.replace(blurregexp, E);
            if (+size !== 0) {
                this.attrs.blur = size;
                s.filter = f + S + ms + ".Blur(pixelradius=" + (+size || 1.5) + ")";
                s.margin = R.format("-{0}px 0 0 -{0}px", round(+size || 1.5));
            } else {
                s.filter = f;
                s.margin = 0;
                delete this.attrs.blur;
            }
        };

        thePath = function (pathString, vml) {
            var el = createNode("shape");
            el.style.cssText = cssDot;
            el.coordsize = zoom + S + zoom;
            el.coordorigin = vml.coordorigin;
            var p = new Element(el, vml),
                attr = {fill: "none", stroke: "#000"};
            pathString && (attr.path = pathString);
            p.type = "path";
            p.path = [];
            p.Path = E;
            setFillAndStroke(p, attr);
            vml.canvas.appendChild(el);
            var skew = createNode("skew");
            skew.on = true;
            el.appendChild(skew);
            p.skew = skew;
            p.transform(E);
            return p;
        };
        theRect = function (vml, x, y, w, h, r) {
            var path = rectPath(x, y, w, h, r),
                res = vml.path(path),
                a = res.attrs;
            res.X = a.x = x;
            res.Y = a.y = y;
            res.W = a.width = w;
            res.H = a.height = h;
            a.r = r;
            a.path = path;
            res.type = "rect";
            return res;
        };
        theEllipse = function (vml, x, y, rx, ry) {
            var res = vml.path(),
                a = res.attrs;
            res.X = x - rx;
            res.Y = y - ry;
            res.W = rx * 2;
            res.H = ry * 2;
            res.type = "ellipse";
            setFillAndStroke(res, {
                cx: x,
                cy: y,
                rx: rx,
                ry: ry
            });
            return res;
        };
        theCircle = function (vml, x, y, r) {
            var res = vml.path(),
                a = res.attrs;
            res.X = x - r;
            res.Y = y - r;
            res.W = res.H = r * 2;
            res.type = "circle";
            setFillAndStroke(res, {
                cx: x,
                cy: y,
                r: r
            });
            return res;
        };
        theImage = function (vml, src, x, y, w, h) {
            var path = rectPath(x, y, w, h),
                res = vml.path(path).attr({stroke: "none"}),
                a = res.attrs,
                node = res.node,
                fill = node.getElementsByTagName(fillString)[0];
            a.src = src;
            res.X = a.x = x;
            res.Y = a.y = y;
            res.W = a.width = w;
            res.H = a.height = h;
            a.path = path;
            res.type = "image";
            fill.parentNode == node && node.removeChild(fill);
            fill.rotate = true;
            fill.src = src;
            fill.type = "tile";
            res._.fillpos = [x, y];
            res._.fillsize = [w, h];
            node.appendChild(fill);
            setCoords(res);
            return res;
        };
        theText = function (vml, x, y, text) {
            var el = createNode("shape"),
                path = createNode("path"),
                o = createNode("textpath");
            x = x || 0;
            y = y || 0;
            text = text || "";
            path.v = R.format("m{0},{1}l{2},{1}", round(x * zoom), round(y * zoom), round(x * zoom) + 1);
            path.textpathok = true;
            o.string = Str(text);
            o.on = true;
            el.style.cssText = "position:absolute;left:0;top:0;width:1;height:1";
            el.coordsize = zoom + S + zoom;
            el.coordorigin = "0 0";
            var p = new Element(el, vml),
                attr = {fill: "#000", stroke: "none", font: availableAttrs.font, text: text};
            p.shape = el;
            p.path = path;
            p.textpath = o;
            p.type = "text";
            p.attrs.text = Str(text);
            p.attrs.x = x;
            p.attrs.y = y;
            p.attrs.w = 1;
            p.attrs.h = 1;
            setFillAndStroke(p, attr);
            el.appendChild(o);
            el.appendChild(path);
            vml.canvas.appendChild(el);
            var skew = createNode("skew");
            skew.on = true;
            el.appendChild(skew);
            p.skew = skew;
            p.transform(E);
            return p;
        };
        setSize = function (width, height) {
            var cs = this.canvas.style;
            this.width = width;
            this.height = height;
            width == +width && (width += "px");
            height == +height && (height += "px");
            cs.width = width;
            cs.height = height;
            cs.clip = "rect(0 " + width + " " + height + " 0)";
            if (this._viewBox) {
                setViewBox.apply(this, this._viewBox);
            }
            return this;
        };
        setViewBox = function (x, y, w, h, fit) {
            eve("setViewBox", this, this._viewBox, [x, y, w, h, fit]);
            var width = this.width,
                height = this.height,
                size = 1e3 * mmax(w / width, h / height),
                H, W;
            if (fit) {
                H = height / h;
                W = width / w;
                if (w * H < width) {
                    x -= (width - w * H) / 2 / H;
                }
                if (h * W < height) {
                    y -= (height - h * W) / 2 / W;
                }
            }
            this._viewBox = [x, y, w, h, !!fit];
            this.forEach(function (el) {
                el.transform("...");
            });
            return this;
        };
        var createNode,
            initWin = function (win) {
                var doc = win.document;
                doc.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)");
                try {
                    !doc.namespaces.rvml && doc.namespaces.add("rvml", "urn:schemas-microsoft-com:vml");
                    createNode = function (tagName) {
                        return doc.createElement('<rvml:' + tagName + ' class="rvml">');
                    };
                } catch (e) {
                    createNode = function (tagName) {
                        return doc.createElement('<' + tagName + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">');
                    };
                }
            };
        initWin(g.win);
        create = function () {
            var con = getContainer[apply](0, arguments),
                container = con.container,
                height = con.height,
                s,
                width = con.width,
                x = con.x,
                y = con.y;
            if (!container) {
                throw new Error("VML container not found.");
            }
            var res = new Paper,
                c = res.canvas = g.doc.createElement("div"),
                cs = c.style;
            x = x || 0;
            y = y || 0;
            width = width || 512;
            height = height || 342;
            res.width = width;
            res.height = height;
            width == +width && (width += "px");
            height == +height && (height += "px");
            res.coordsize = zoom * 1e3 + S + zoom * 1e3;
            res.coordorigin = "0 0";
            res.span = g.doc.createElement("span");
            res.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;";
            c.appendChild(res.span);
            cs.cssText = R.format("top:0;left:0;width:{0};height:{1};display:inline-block;position:relative;clip:rect(0 {0} {1} 0);overflow:hidden", width, height);
            if (container == 1) {
                g.doc.body.appendChild(c);
                cs.left = x + "px";
                cs.top = y + "px";
                cs.position = "absolute";
            } else {
                if (container.firstChild) {
                    container.insertBefore(c, container.firstChild);
                } else {
                    container.appendChild(c);
                }
            }
            plugins.call(res, res, R.fn);
            return res;
        };
        paperproto.clear = function () {
            eve("clear", this);
            this.canvas.innerHTML = E;
            this.span = g.doc.createElement("span");
            this.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;";
            this.canvas.appendChild(this.span);
            this.bottom = this.top = null;
        };
        paperproto.remove = function () {
            eve("remove", this);
            this.canvas.parentNode.removeChild(this.canvas);
            for (var i in this) {
                this[i] = removed(i);
            }
            return true;
        };
    }
 
    // WebKit rendering bug workaround method
    var version = navigator.userAgent.match(/Version\/(.*?)\s/) || navigator.userAgent.match(/Chrome\/(\d+)/);
    if ((navigator.vendor == "Apple Computer, Inc.") && (version && version[1] < 4 || navigator.platform.slice(0, 2) == "iP") ||
        (navigator.vendor == "Google Inc." && version && version[1] < 8)) {
        /*\
         * Paper.safari
         [ method ]
         **
         * There is an inconvenient rendering bug in Safari (WebKit):
         * sometimes the rendering should be forced.
         * This method should help with dealing with this bug.
        \*/
        paperproto.safari = function () {
            var rect = this.rect(-99, -99, this.width + 99, this.height + 99).attr({stroke: "none"});
            setTimeout(function () {rect.remove();});
        };
    } else {
        paperproto.safari = fun;
    }
 
    // Events
    var preventDefault = function () {
        this.returnValue = false;
    },
    preventTouch = function () {
        return this.originalEvent.preventDefault();
    },
    stopPropagation = function () {
        this.cancelBubble = true;
    },
    stopTouch = function () {
        return this.originalEvent.stopPropagation();
    },
    addEvent = (function () {
        if (g.doc.addEventListener) {
            return function (obj, type, fn, element) {
                var realName = supportsTouch && touchMap[type] ? touchMap[type] : type;
                var f = function (e) {
                    if (supportsTouch && touchMap[has](type)) {
                        for (var i = 0, ii = e.targetTouches && e.targetTouches.length; i < ii; i++) {
                            if (e.targetTouches[i].target == obj) {
                                var olde = e;
                                e = e.targetTouches[i];
                                e.originalEvent = olde;
                                e.preventDefault = preventTouch;
                                e.stopPropagation = stopTouch;
                                break;
                            }
                        }
                    }
                    return fn.call(element, e);
                };
                obj.addEventListener(realName, f, false);
                return function () {
                    obj.removeEventListener(realName, f, false);
                    return true;
                };
            };
        } else if (g.doc.attachEvent) {
            return function (obj, type, fn, element) {
                var f = function (e) {
                    e = e || g.win.event;
                    e.preventDefault = e.preventDefault || preventDefault;
                    e.stopPropagation = e.stopPropagation || stopPropagation;
                    return fn.call(element, e);
                };
                obj.attachEvent("on" + type, f);
                var detacher = function () {
                    obj.detachEvent("on" + type, f);
                    return true;
                };
                return detacher;
            };
        }
    })(),
    drag = [],
    dragMove = function (e) {
        var x = e.clientX,
            y = e.clientY,
            scrollY = g.doc.documentElement.scrollTop || g.doc.body.scrollTop,
            scrollX = g.doc.documentElement.scrollLeft || g.doc.body.scrollLeft,
            dragi,
            j = drag.length;
        while (j--) {
            dragi = drag[j];
            if (supportsTouch) {
                var i = e.touches.length,
                    touch;
                while (i--) {
                    touch = e.touches[i];
                    if (touch.identifier == dragi.el._drag.id) {
                        x = touch.clientX;
                        y = touch.clientY;
                        (e.originalEvent ? e.originalEvent : e).preventDefault();
                        break;
                    }
                }
            } else {
                e.preventDefault();
            }
            var node = dragi.el.node,
                o,
                next = node.nextSibling,
                parent = node.parentNode,
                display = node.style.display;
            g.win.opera && parent.removeChild(node);
            node.style.display = "none";
            o = dragi.el.paper.getElementByPoint(x, y);
            node.style.display = display;
            g.win.opera && (next ? parent.insertBefore(node, next) : parent.appendChild(node));
            o && eve("drag.over." + dragi.el.id, dragi.el, o);
            x += scrollX;
            y += scrollY;
            eve("drag.move." + dragi.el.id, dragi.move_scope || dragi.el, x - dragi.el._drag.x, y - dragi.el._drag.y, x, y, e);
        }
    },
    dragUp = function (e) {
        R.unmousemove(dragMove).unmouseup(dragUp);
        var i = drag.length,
            dragi;
        while (i--) {
            dragi = drag[i];
            dragi.el._drag = {};
            eve("drag.end." + dragi.el.id, dragi.end_scope || dragi.start_scope || dragi.move_scope || dragi.el, e);
        }
        drag = [];
    };
    for (var i = events.length; i--;) {
        (function (eventName) {
            R[eventName] = Element.prototype[eventName] = function (fn, scope) {
                if (R.is(fn, "function")) {
                    this.events = this.events || [];
                    this.events.push({name: eventName, f: fn, unbind: addEvent(this.shape || this.node || g.doc, eventName, fn, scope || this)});
                }
                return this;
            };
            R["un" + eventName] = Element.prototype["un" + eventName] = function (fn) {
                var events = this.events,
                    l = events.length;
                while (l--) if (events[l].name == eventName && events[l].f == fn) {
                    events[l].unbind();
                    events.splice(l, 1);
                    !events.length && delete this.events;
                    return this;
                }
                return this;
            };
        })(events[i]);
    }
    /*\
     * Element.hover
     [ method ]
     **
     * Adds event handlers for hover for the element.
     > Parameters
     - f_in (function) handler for hover in
     - f_out (function) handler for hover out
     - icontext (object) #optional context for hover in handler
     - ocontext (object) #optional context for hover out handler
     = (object) @Element
    \*/
    elproto.hover = function (f_in, f_out, scope_in, scope_out) {
        return this.mouseover(f_in, scope_in).mouseout(f_out, scope_out || scope_in);
    };
    /*\
     * Element.unhover
     [ method ]
     **
     * Removes event handlers for hover for the element.
     > Parameters
     - f_in (function) handler for hover in
     - f_out (function) handler for hover out
     = (object) @Element
    \*/
    elproto.unhover = function (f_in, f_out) {
        return this.unmouseover(f_in).unmouseout(f_out);
    };
    /*\
     * Element.drag
     [ method ]
     **
     * Adds event handlers for drag of the element.
     > Parameters
     - onmove (function) handler for moving
     - onstart (function) handler for drag start
     - onend (function) handler for drag end
     - mcontext (object) #optional context for moving handler
     - scontext (object) #optional context for drag start handler
     - econtext (object) #optional context for drag end handler
     * Additionaly following `drag` events will be triggered: `drag.start.<id>` on start, 
     * `drag.end.<id>` on end and `drag.move.<id>` on every move. When element will be dragged over another element 
     * `drag.over.<id>` will be fired as well.
     *
     * Start event and start handler will be called in specified context or in context of the element with following parameters:
     o x (number) x position of the mouse
     o y (number) y position of the mouse
     o event (object) DOM event object
     * Move event and move handler will be called in specified context or in context of the element with following parameters:
     o dx (number) shift by x from the start point
     o dy (number) shift by y from the start point
     o x (number) x position of the mouse
     o y (number) y position of the mouse
     o event (object) DOM event object
     * End event and end handler will be called in specified context or in context of the element with following parameters:
     o event (object) DOM event object
     = (object) @Element
    \*/
    elproto.drag = function (onmove, onstart, onend, move_scope, start_scope, end_scope) {
        function start(e) {
            (e.originalEvent || e).preventDefault();
            var scrollY = g.doc.documentElement.scrollTop || g.doc.body.scrollTop,
                scrollX = g.doc.documentElement.scrollLeft || g.doc.body.scrollLeft;
            this._drag.x = e.clientX + scrollX;
            this._drag.y = e.clientY + scrollY;
            this._drag.id = e.identifier;
            !drag.length && R.mousemove(dragMove).mouseup(dragUp);
            drag.push({el: this, move_scope: move_scope, start_scope: start_scope, end_scope: end_scope});
            onstart && eve.on("drag.start." + this.id, onstart);
            onmove && eve.on("drag.move." + this.id, onmove);
            onend && eve.on("drag.end." + this.id, onend);
            eve("drag.start." + this.id, start_scope || move_scope || this, e.clientX + scrollX, e.clientY + scrollY, e);
        }
        this._drag = {};
        this.mousedown(start);
        return this;
    };
    /*\
     * Element.onDragOver
     [ method ]
     **
     * Shortcut for assigning event handler for `drag.over.<id>` event, where id is id of the element (see @Element.id).
     > Parameters
     - f (function) handler for event
    \*/
    elproto.onDragOver = function (f) {
        f ? eve.on("drag.over." + this.id, f) : eve.unbind("drag.over." + this.id);
    };
    /*\
     * Element.undrag
     [ method ]
     **
     * Removes all drag event handlers from given element.
    \*/
    elproto.undrag = function () {
        var i = drag.length;
        while (i--) if (drag[i].el == this) {
            R.unmousedown(drag[i].start);
            drag.splice(i++, 1);
            eve.unbind("drag.*." + this.id);
        }
        !drag.length && R.unmousemove(dragMove).unmouseup(dragUp);
    };
    /*\
     * Paper.circle
     [ method ]
     **
     * Draws a circle.
     **
     > Parameters
     **
     - x (number) x coordinate of the centre
     - y (number) y coordinate of the centre
     - r (number) radius
     = (object) Raphaël element object with type “circle”
     **
     > Usage
     | var c = paper.circle(50, 50, 40);
    \*/
    paperproto.circle = function (x, y, r) {
        return theCircle(this, x || 0, y || 0, r || 0);
    };
    /*\
     * Paper.rect
     [ method ]
     *
     * Draws a rectangle.
     **
     > Parameters
     **
     - x (number) x coordinate of the top left corner
     - y (number) y coordinate of the top left corner
     - width (number) width
     - height (number) height
     - r (number) #optional radius for rounded corners, default is 0
     = (object) Raphaël element object with type “rect”
     **
     > Usage
     | // regular rectangle
     | var c = paper.rect(10, 10, 50, 50);
     | // rectangle with rounded corners
     | var c = paper.rect(40, 40, 50, 50, 10);
    \*/
    paperproto.rect = function (x, y, w, h, r) {
        return theRect(this, x || 0, y || 0, w || 0, h || 0, r || 0);
    };
    /*\
     * Paper.ellipse
     [ method ]
     **
     * Draws an ellipse.
     **
     > Parameters
     **
     - x (number) x coordinate of the centre
     - y (number) y coordinate of the centre
     - rx (number) horizontal radius
     - ry (number) vertical radius
     = (object) Raphaël element object with type “ellipse”
     **
     > Usage
     | var c = paper.ellipse(50, 50, 40, 20);
    \*/
    paperproto.ellipse = function (x, y, rx, ry) {
        return theEllipse(this, x || 0, y || 0, rx || 0, ry || 0);
    };
    /*\
     * Paper.path
     [ method ]
     **
     * Creates a path element by given path data string.
     **
     > Parameters
     **
     - pathString (string) path data in SVG path string format.
     = (object) Raphaël element object with type “ellipse”
     # Details of a path's data attribute's format are described in the <a href="http://www.w3.org/TR/SVG/paths.html#PathData">SVG specification</a>.
     **
     > Usage
     | var c = paper.path("M10 10L90 90");
     | // draw a diagonal line:
     | // move to 10,10, line to 90,90
    \*/
    paperproto.path = function (pathString) {
        pathString && !R.is(pathString, string) && !R.is(pathString[0], array) && (pathString += E);
        return thePath(R.format[apply](R, arguments), this);
    };
    /*\
     * Paper.image
     [ method ]
     **
     * Embeds an image into the surface.
     **
     > Parameters
     **
     - src (string) URI of the source image
     - x (number) x coordinate position
     - y (number) y coordinate position
     - width (number) width of the image
     - height (number) height of the image
     = (object) Raphaël element object with type “image”
     **
     > Usage
     | var c = paper.image("apple.png", 10, 10, 80, 80);
    \*/
    paperproto.image = function (src, x, y, w, h) {
        return theImage(this, src || "about:blank", x || 0, y || 0, w || 0, h || 0);
    };
    /*\
     * Paper.text
     [ method ]
     **
     * Draws a text string. If you need line breaks, put “\n” in the string.
     **
     > Parameters
     **
     - x (number) x coordinate position
     - y (number) y coordinate position
     - text (string) The text string to draw
     = (object) Raphaël element object with type “text”
     **
     > Usage
     | var t = paper.text(50, 50, "Raphaël\nkicks\nbutt!");
    \*/
    paperproto.text = function (x, y, text) {
        return theText(this, x || 0, y || 0, Str(text));
    };
    /*\
     * Paper.set
     [ method ]
     **
     * Creates array-like object to keep and operate several elements at once.
     * Warning: it doesn’t create any elements for itself in the page, it just groups existing elements.
     * Sets act as pseudo elements — all methods available to an element can be used on a set.
     = (object) array-like object that represents set of elements
     **
     > Usage
     | var st = paper.set();
     | st.push(
     |     paper.circle(10, 10, 5),
     |     paper.circle(30, 10, 5)
     | );
     | st.attr({fill: "red"});
    \*/
    paperproto.set = function (itemsArray) {
        arguments.length > 1 && (itemsArray = Array.prototype.splice.call(arguments, 0, arguments.length));
        return new Set(itemsArray);
    };
    /*\
     * Paper.setSize
     [ method ]
     **
     * If you need to change dimensions of the canvas call this method
     **
     > Parameters
     **
     - width (number) new width of the canvas
     - height (number) new height of the canvas
     > Usage
     | var st = paper.set();
     | st.push(
     |     paper.circle(10, 10, 5),
     |     paper.circle(30, 10, 5)
     | );
     | st.attr({fill: "red"});
    \*/
    paperproto.setSize = setSize;
    /*\
     * Paper.setViewBox
     [ method ]
     **
     * Sets the view box of the paper. Practically it gives you ability to zoom and pan whole paper surface by 
     * specifying new boundaries.
     **
     > Parameters
     **
     x, y, w, h, fit
     - x (number) new x position, default is `0`
     - y (number) new y position, default is `0`
     - w (number) new width of the canvas
     - h (number) new height of the canvas
     - fit (boolean) `true` if you want graphics to fit into new boundary box
    \*/
    paperproto.setViewBox = setViewBox;
    /*\
     * Paper.top
     [ property ]
     **
     * Points to the topmost element on the paper
    \*/
    /*\
     * Paper.bottom
     [ property ]
     **
     * Points to the bottom element on the paper
    \*/
    paperproto.top = paperproto.bottom = null;
    /*\
     * Paper.raphael
     [ property ]
     **
     * Points to the @Raphael object/function
    \*/
    paperproto.raphael = R;
    var getOffset = function (elem) {
        var box = elem.getBoundingClientRect(),
            doc = elem.ownerDocument,
            body = doc.body,
            docElem = doc.documentElement,
            clientTop = docElem.clientTop || body.clientTop || 0, clientLeft = docElem.clientLeft || body.clientLeft || 0,
            top  = box.top  + (g.win.pageYOffset || docElem.scrollTop || body.scrollTop ) - clientTop,
            left = box.left + (g.win.pageXOffset || docElem.scrollLeft || body.scrollLeft) - clientLeft;
        return {
            y: top,
            x: left
        };
    };
    /*\
     * Paper.getElementByPoint
     [ method ]
     **
     * Returns you topmost element under given point.
     **
     = (object) Raphaël element object
     > Parameters
     **
     - x (number) x coordinate from the top left corner of the window
     - y (number) y coordinate from the top left corner of the window
     > Usage
     | paper.getElementByPoint(mouseX, mouseY).attr({stroke: "#f00"});
    \*/
    paperproto.getElementByPoint = function (x, y) {
        var paper = this,
            svg = paper.canvas,
            target = g.doc.elementFromPoint(x, y);
        if (g.win.opera && target.tagName == "svg") {
            var so = getOffset(svg),
                sr = svg.createSVGRect();
            sr.x = x - so.x;
            sr.y = y - so.y;
            sr.width = sr.height = 1;
            var hits = svg.getIntersectionList(sr, null);
            if (hits.length) {
                target = hits[hits.length - 1];
            }
        }
        if (!target) {
            return null;
        }
        while (target.parentNode && target != svg.parentNode && !target.raphael) {
            target = target.parentNode;
        }
        target == paper.canvas.parentNode && (target = svg);
        target = target && target.raphael ? paper.getById(target.raphaelid) : null;
        return target;
    };
    /*\
     * Paper.getById
     [ method ]
     **
     * Returns you element by its internal ID.
     **
     > Parameters
     **
     - id (number) id
     = (object) Raphaël element object
    \*/
    paperproto.getById = function (id) {
        var bot = this.bottom;
        while (bot) {
            if (bot.id == id) {
                return bot;
            }
            bot = bot.next;
        }
        return null;
    };
    /*\
     * Paper.forEach
     [ method ]
     **
     * Executes given function for each element on the paper
     *
     * If callback function returns `false` it will stop loop running.
     **
     > Parameters
     **
     - callback (function) function to run
     - thisArg (object) context object for the callback
     = (object) Paper object
    \*/
    paperproto.forEach = function (callback, thisArg) {
        var bot = this.bottom;
        while (bot) {
            if (callback.call(thisArg, bot) === false) {
                return this;
            }
            bot = bot.next;
        }
        return this;
    };
    function x_y() {
        return this.x + S + this.y;
    }
    function x_y_w_h() {
        return this.x + S + this.y + S + this.width + "\xd7" + this.height;
    }
    /*\
     * Element.getBBox
     [ method ]
     **
     * Return bounding box for a given element
     **
     > Parameters
     **
     - isWithoutTransform (boolean) flag, `true` if you want to have bounding box before transformations. Default is `false`.
     = (object) Bounding box object:
     o {
     o     x: (number) top left corner x
     o     y: (number) top left corner y
     o     width: (number) width
     o     height: (number) height
     o }
    \*/
    elproto.getBBox = function (isWithoutTransform) {
        if (this.removed) {
            return {};
        }
        var _ = this._;
        if (isWithoutTransform) {
            if (_.dirty || !_.bboxwt) {
                this.realPath = getPath[this.type](this);
                _.bboxwt = pathDimensions(this.realPath);
                _.bboxwt.toString = x_y_w_h;
                _.dirty = 0;
            }
            return _.bboxwt;
        }
        if (_.dirty || _.dirtyT || !_.bbox) {
            if (_.dirty || !this.realPath) {
                _.bboxwt = 0;
                this.realPath = getPath[this.type](this);
            }
            _.bbox = pathDimensions(mapPath(this.realPath, this.matrix));
            _.bbox.toString = x_y_w_h;
            _.dirty = _.dirtyT = 0;
        }
        return _.bbox;
    };
    /*\
     * Element.clone
     [ method ]
     **
     = (object) clone of a given element
     **
    \*/
    elproto.clone = function () {
        if (this.removed) {
            return null;
        }
        var attr = this.attr();
        delete attr.scale;
        delete attr.translation;
        return this.paper[this.type]().attr(attr);
    };
    /*\
     * Element.glow
     [ method ]
     **
     * Return set of elements that create glow-like effect around given element. See @Paper.set.
     *
     * Note: Glow is not connected to the element. If you change element attributes it won’t adjust itself.
     **
     = (object) @Paper.set of elements that represents glow
    \*/
    elproto.glow = function (glow) {
        if (this.type == "text") {
            return null;
        }
        glow = glow || {};
        var s = {
            width: glow.width || 10,
            fill: glow.fill || false,
            opacity: glow.opacity || .5,
            offsetx: glow.offsetx || 0,
            offsety: glow.offsety || 0,
            color: glow.color || "#000"
        },
            c = s.width / 2,
            r = this.paper,
            out = r.set(),
            path = this.realPath || getPath[this.type](this);
        path = this.matrix ? mapPath(path, this.matrix) : path;
        for (var i = 1; i < c + 1; i++) {
            out.push(r.path(path).attr({stroke: s.color, fill: s.fill ? s.color : "none", "stroke-linejoin": "round", "stroke-linecap": "round", "stroke-width": +(s.width / c * i).toFixed(3), opacity: +(s.opacity / c).toFixed(3)}));
        }
        return out.insertBefore(this).translate(s.offsetx, s.offsety);
    };
    var curveslengths = {},
    getPointAtSegmentLength = function (p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, length) {
        var len = 0,
            precision = 100,
            name = [p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y].join(),
            cache = curveslengths[name],
            old, dot;
        !cache && (curveslengths[name] = cache = {data: []});
        cache.timer && clearTimeout(cache.timer);
        cache.timer = setTimeout(function () {delete curveslengths[name];}, 2e3);
        if (length != null && !cache.precision) {
            var total = getPointAtSegmentLength(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y);
            cache.precision = ~~total * 10;
            cache.data = [];
        }
        precision = cache.precision || precision;
        for (var i = 0; i < precision + 1; i++) {
            if (cache.data[i * precision]) {
                dot = cache.data[i * precision];
            } else {
                dot = R.findDotsAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, i / precision);
                cache.data[i * precision] = dot;
            }
            i && (len += pow(pow(old.x - dot.x, 2) + pow(old.y - dot.y, 2), .5));
            if (length != null && len >= length) {
                return dot;
            }
            old = dot;
        }
        if (length == null) {
            return len;
        }
    },
    getLengthFactory = function (istotal, subpath) {
        return function (path, length, onlystart) {
            path = path2curve(path);
            var x, y, p, l, sp = "", subpaths = {}, point,
                len = 0;
            for (var i = 0, ii = path.length; i < ii; i++) {
                p = path[i];
                if (p[0] == "M") {
                    x = +p[1];
                    y = +p[2];
                } else {
                    l = getPointAtSegmentLength(x, y, p[1], p[2], p[3], p[4], p[5], p[6]);
                    if (len + l > length) {
                        if (subpath && !subpaths.start) {
                            point = getPointAtSegmentLength(x, y, p[1], p[2], p[3], p[4], p[5], p[6], length - len);
                            sp += ["C" + point.start.x, point.start.y, point.m.x, point.m.y, point.x, point.y];
                            if (onlystart) {return sp;}
                            subpaths.start = sp;
                            sp = ["M" + point.x, point.y + "C" + point.n.x, point.n.y, point.end.x, point.end.y, p[5], p[6]].join();
                            len += l;
                            x = +p[5];
                            y = +p[6];
                            continue;
                        }
                        if (!istotal && !subpath) {
                            point = getPointAtSegmentLength(x, y, p[1], p[2], p[3], p[4], p[5], p[6], length - len);
                            return {x: point.x, y: point.y, alpha: point.alpha};
                        }
                    }
                    len += l;
                    x = +p[5];
                    y = +p[6];
                }
                sp += p.shift() + p;
            }
            subpaths.end = sp;
            point = istotal ? len : subpath ? subpaths : R.findDotsAtSegment(x, y, p[1], p[2], p[3], p[4], p[5], p[6], 1);
            point.alpha && (point = {x: point.x, y: point.y, alpha: point.alpha});
            return point;
        };
    };
    var getTotalLength = getLengthFactory(1),
        getPointAtLength = getLengthFactory(),
        getSubpathsAtLength = getLengthFactory(0, 1);
    /*\
     * Raphael.getTotalLength
     [ method ]
     **
     * Returns length of the given path in pixels.
     **
     > Parameters
     **
     - path (string) SVG path string.
     **
     = (number) length.
    \*/
    R.getTotalLength = getTotalLength;
    /*\
     * Raphael.getPointAtLength
     [ method ]
     **
     * Return coordinates of the point located at the given length on the given path.
     **
     > Parameters
     **
     - path (string) SVG path string
     - length (number)
     **
     = (object) representation of the point:
     o {
     o     x: (number) x coordinate
     o     y: (number) y coordinate
     o     alpha: (number) angle of derivative
     o }
    \*/
    R.getPointAtLength = getPointAtLength;
    /*\
     * Raphael.getSubpath
     [ method ]
     **
     * Return subpath of a given path from given length to given length.
     **
     > Parameters
     **
     - path (string) SVG path string
     - from (number) position of the start of the segment
     - to (number) position of the end of the segment
     **
     = (string) pathstring for the segment
    \*/
    R.getSubpath = function (path, from, to) {
        if (abs(this.getTotalLength(path) - to) < 1e-6) {
            return getSubpathsAtLength(path, from).end;
        }
        var a = getSubpathsAtLength(path, to, 1);
        return from ? getSubpathsAtLength(a, from).end : a;
    };
    /*\
     * Element.getTotalLength
     [ method ]
     **
     * Returns length of the path in pixels. Only works for element of “path” type.
     = (number) length.
    \*/
    elproto.getTotalLength = function () {
        if (this.type != "path") {return;}
        if (this.node.getTotalLength) {
            return this.node.getTotalLength();
        }
        return getTotalLength(this.attrs.path);
    };
    /*\
     * Element.getPointAtLength
     [ method ]
     **
     * Return coordinates of the point located at the given length on the given path. Only works for element of “path” type.
     **
     > Parameters
     **
     - length (number)
     **
     = (object) representation of the point:
     o {
     o     x: (number) x coordinate
     o     y: (number) y coordinate
     o     alpha: (number) angle of derivative
     o }
    \*/
    elproto.getPointAtLength = function (length) {
        if (this.type != "path") {return;}
        return getPointAtLength(this.attrs.path, length);
    };
    /*\
     * Element.getSubpath
     [ method ]
     **
     * Return subpath of a given element from given length to given length. Only works for element of “path” type.
     **
     > Parameters
     **
     - from (number) position of the start of the segment
     - to (number) position of the end of the segment
     **
     = (string) pathstring for the segment
    \*/
    elproto.getSubpath = function (from, to) {
        if (this.type != "path") {return;}
        return R.getSubpath(this.attrs.path, from, to);
    };
    /*\
     * Raphael.easing_formulas
     [ property ]
     **
     * Object that contains easing formulas for animation. You could extend it with your own. By default it has following list of easing:
     # <ul>
     #     <li>“linear”</li>
     #     <li>“&lt;” or “easeIn” or “ease-in”</li>
     #     <li>“>” or “easeOut” or “ease-out”</li>
     #     <li>“&lt;>” or “easeInOut” or “ease-in-out”</li>
     #     <li>“backIn” or “back-in”</li>
     #     <li>“backOut” or “back-out”</li>
     #     <li>“elastic”</li>
     #     <li>“bounce”</li>
     # </ul>
     # <p>See also <a href="http://raphaeljs.com/easing.html">Easing demo</a>.</p>
    \*/
    var ef = R.easing_formulas = {
        linear: function (n) {
            return n;
        },
        "<": function (n) {
            return pow(n, 1.7);
        },
        ">": function (n) {
            return pow(n, .48);
        },
        "<>": function (n) {
            var q = .48 - n / 1.04,
                Q = math.sqrt(.1734 + q * q),
                x = Q - q,
                X = pow(abs(x), 1 / 3) * (x < 0 ? -1 : 1),
                y = -Q - q,
                Y = pow(abs(y), 1 / 3) * (y < 0 ? -1 : 1),
                t = X + Y + .5;
            return (1 - t) * 3 * t * t + t * t * t;
        },
        backIn: function (n) {
            var s = 1.70158;
            return n * n * ((s + 1) * n - s);
        },
        backOut: function (n) {
            n = n - 1;
            var s = 1.70158;
            return n * n * ((s + 1) * n + s) + 1;
        },
        elastic: function (n) {
            if (n == !!n) {
                return n;
            }
            return pow(2, -10 * n) * math.sin((n - .075) * (2 * PI) / .3) + 1;
        },
        bounce: function (n) {
            var s = 7.5625,
                p = 2.75,
                l;
            if (n < (1 / p)) {
                l = s * n * n;
            } else {
                if (n < (2 / p)) {
                    n -= (1.5 / p);
                    l = s * n * n + .75;
                } else {
                    if (n < (2.5 / p)) {
                        n -= (2.25 / p);
                        l = s * n * n + .9375;
                    } else {
                        n -= (2.625 / p);
                        l = s * n * n + .984375;
                    }
                }
            }
            return l;
        }
    };
    ef.easeIn = ef["ease-in"] = ef["<"];
    ef.easeOut = ef["ease-out"] = ef[">"];
    ef.easeInOut = ef["ease-in-out"] = ef["<>"];
    ef["back-in"] = ef.backIn;
    ef["back-out"] = ef.backOut;

    var animationElements = [],
        requestAnimFrame = window.requestAnimationFrame       ||
                           window.webkitRequestAnimationFrame ||
                           window.mozRequestAnimationFrame    ||
                           window.oRequestAnimationFrame      ||
                           window.msRequestAnimationFrame     ||
                           function (callback) {
                               setTimeout(callback, 16);
                           },
        animation = function () {
            var Now = +new Date,
                l = 0;
            for (; l < animationElements.length; l++) {
                var e = animationElements[l];
                if (e.el.removed || e.paused) {
                    continue;
                }
                var time = Now - e.start,
                    ms = e.ms,
                    easing = e.easing,
                    from = e.from,
                    diff = e.diff,
                    to = e.to,
                    t = e.t,
                    that = e.el,
                    set = {},
                    now;
                if (e.initstatus) {
                    time = (e.initstatus * e.anim.top - e.prev) / (e.percent - e.prev) * ms;
                    e.status = e.initstatus;
                    delete e.initstatus;
                    e.stop && animationElements.splice(l--, 1);
                } else {
                    e.status = (e.prev + (e.percent - e.prev) * (time / ms)) / e.anim.top;
                }
                if (time < 0) {
                    continue;
                }
                if (time < ms) {
                    var pos = easing(time / ms);
                    for (var attr in from) if (from[has](attr)) {
                        switch (availableAnimAttrs[attr]) {
                            case nu:
                                now = +from[attr] + pos * ms * diff[attr];
                                break;
                            case "colour":
                                now = "rgb(" + [
                                    upto255(round(from[attr].r + pos * ms * diff[attr].r)),
                                    upto255(round(from[attr].g + pos * ms * diff[attr].g)),
                                    upto255(round(from[attr].b + pos * ms * diff[attr].b))
                                ].join(",") + ")";
                                break;
                            case "path":
                                now = [];
                                for (var i = 0, ii = from[attr].length; i < ii; i++) {
                                    now[i] = [from[attr][i][0]];
                                    for (var j = 1, jj = from[attr][i].length; j < jj; j++) {
                                        now[i][j] = +from[attr][i][j] + pos * ms * diff[attr][i][j];
                                    }
                                    now[i] = now[i].join(S);
                                }
                                now = now.join(S);
                                break;
                            case "transform":
                                if (diff[attr].real) {
                                    now = [];
                                    for (i = 0, ii = from[attr].length; i < ii; i++) {
                                        now[i] = [from[attr][i][0]];
                                        for (j = 1, jj = from[attr][i].length; j < jj; j++) {
                                            now[i][j] = from[attr][i][j] + pos * ms * diff[attr][i][j];
                                        }
                                    }
                                } else {
                                    var get = function (i) {
                                        return +from[attr][i] + pos * ms * diff[attr][i];
                                    };
                                    // now = [["r", get(2), 0, 0], ["t", get(3), get(4)], ["s", get(0), get(1), 0, 0]];
                                    now = [["m", get(0), get(1), get(2), get(3), get(4), get(5)]];
                                }
                                break;
                            case "csv":
                                if (attr == "clip-rect") {
                                    now = [];
                                    i = 4;
                                    while (i--) {
                                        now[i] = +from[attr][i] + pos * ms * diff[attr][i];
                                    }
                                }
                                break;
                            default:
                                var from2 = [].concat(from[attr]);
                                now = [];
                                i = that.paper.customAttributes[attr].length;
                                while (i--) {
                                    now[i] = +from2[i] + pos * ms * diff[attr][i];
                                }
                                break;
                        }
                        set[attr] = now;
                    }
                    that.attr(set);
                    (function (id, that, anim) {
                        setTimeout(function () {
                            eve("anim.frame." + id, that, anim);
                        });
                    })(that.id, that, e.anim);
                } else {
                    (function(f, el, a) {
                        setTimeout(function() {
                            eve("anim.finish." + el.id, el, a);
                            R.is(f, "function") && f.call(el);
                        });
                    })(e.callback, that, e.anim);
                    if (--e.repeat) {
                        that.attr(e.origin);
                        e.start = Now;
                    } else {
                        that.attr(to);
                        animationElements.splice(l--, 1);
                    }
                    if (e.next && !e.stop) {
                        runAnimation(e.anim, e.el, e.next, null, e.totalOrigin);
                    }
                }
            }
            R.svg && that && that.paper && that.paper.safari();
            animationElements.length && requestAnimFrame(animation);
        },
        upto255 = function (color) {
            return mmax(mmin(color, 255), 0);
        };
    /*\
     * Element.animateWith
     [ method ]
     **
     * Acts similar to @Element.animate, but ensure that given animation runs in sync with another given element.
     **
     > Parameters
     **
     - params (object) final attributes for the element, see also @Element.attr
     - ms (number) number of milliseconds for animation to run
     - easing (string) #optional easing type. Accept on of @Raphael.easing_formulas or CSS format: `cubic&#x2010;bezier(XX,&#160;XX,&#160;XX,&#160;XX)`
     - callback (function) #optional callback function. Will be called at the end of animation.
     * or
     - animation (object) animation object, see @Raphael.animation
     **
     = (object) original element
    \*/
    elproto.animateWith = function (element, params, ms, easing, callback) {
        for (var i = 0, ii = animationElements.length; i < ii; i++) {
            if (animationElements[i].el.id == element.id) {
                params.start = animationElements[i].timestamp;
                break;
            }
        }
        return this.animate(params, ms, easing, callback);
    };
    function CubicBezierAtTime(t, p1x, p1y, p2x, p2y, duration) {
        var cx = 3 * p1x,
            bx = 3 * (p2x - p1x) - cx,
            ax = 1 - cx - bx,
            cy = 3 * p1y,
            by = 3 * (p2y - p1y) - cy,
            ay = 1 - cy - by;
        function sampleCurveX(t) {
            return ((ax * t + bx) * t + cx) * t;
        }
        function solve(x, epsilon) {
            var t = solveCurveX(x, epsilon);
            return ((ay * t + by) * t + cy) * t;
        }
        function solveCurveX(x, epsilon) {
            var t0, t1, t2, x2, d2, i;
            for(t2 = x, i = 0; i < 8; i++) {
                x2 = sampleCurveX(t2) - x;
                if (abs(x2) < epsilon) {
                    return t2;
                }
                d2 = (3 * ax * t2 + 2 * bx) * t2 + cx;
                if (abs(d2) < 1e-6) {
                    break;
                }
                t2 = t2 - x2 / d2;
            }
            t0 = 0;
            t1 = 1;
            t2 = x;
            if (t2 < t0) {
                return t0;
            }
            if (t2 > t1) {
                return t1;
            }
            while (t0 < t1) {
                x2 = sampleCurveX(t2);
                if (abs(x2 - x) < epsilon) {
                    return t2;
                }
                if (x > x2) {
                    t0 = t2;
                } else {
                    t1 = t2;
                }
                t2 = (t1 - t0) / 2 + t0;
            }
            return t2;
        }
        return solve(t, 1 / (200 * duration));
    }
    elproto.onAnimation = function (f) {
        f ? eve.on("anim.frame." + this.id, f) : eve.unbind("anim.frame." + this.id);
        return this;
    };
    function Animation(anim, ms) {
        var percents = [];
        this.anim = anim;
        this.ms = ms;
        this.times = 1;
        if (this.anim) {
            for (var attr in this.anim) if (this.anim[has](attr)) {
                percents.push(+attr);
            }
            percents.sort(sortByNumber);
        }
        this.top = percents[percents.length - 1];
        this.percents = percents;
    }
    /*\
     * Animation.delay
     [ method ]
     **
     * Creates a copy of existing animation object with given delay.
     **
     > Parameters
     **
     - delay (number) number of ms to pass between animation start and actual animation
     **
     = (object) new altered Animation object
    \*/
    Animation.prototype.delay = function (delay) {
        var a = new Animation(this.anim, this.ms);
        a.times = this.times;
        a.del = +delay || 0;
        return a;
    };
    /*\
     * Animation.repeat
     [ method ]
     **
     * Creates a copy of existing animation object with given repetition.
     **
     > Parameters
     **
     - repeat (number) number iterations of animation. For infinite animation pass `Infinity`
     **
     = (object) new altered Animation object
    \*/
    Animation.prototype.repeat = function (times) { 
        var a = new Animation(this.anim, this.ms);
        a.del = this.del;
        a.times = math.floor(mmax(times, 0)) || 1;
        return a;
    };
    function runAnimation(anim, element, percent, status, totalOrigin) {
        percent = toFloat(percent);
        var params,
            isInAnim,
            isInAnimSet,
            percents = [],
            next,
            prev,
            timestamp,
            ms = anim.ms,
            from = {},
            to = {},
            diff = {};
        if (status) {
            for (i = 0, ii = animationElements.length; i < ii; i++) {
                var e = animationElements[i];
                if (e.el.id == element.id && e.anim == anim) {
                    if (e.percent != percent) {
                        animationElements.splice(i, 1);
                        isInAnimSet = 1;
                    } else {
                        isInAnim = e;
                    }
                    element.attr(e.totalOrigin);
                    break;
                }
            }
        } else {
            status = 0 / 0;
        }
        for (var i = 0, ii = anim.percents.length; i < ii; i++) {
            if (anim.percents[i] == percent || anim.percents[i] > status * anim.top) {
                percent = anim.percents[i];
                prev = anim.percents[i - 1] || 0;
                ms = ms / anim.top * (percent - prev);
                next = anim.percents[i + 1];
                params = anim.anim[percent];
                break;
            } else if (status) {
                element.attr(anim.anim[anim.percents[i]]);
            }
        }
        if (!params) {
            return;
        }
        if (!isInAnim) {
            for (attr in params) if (params[has](attr)) {
                if (availableAnimAttrs[has](attr) || element.paper.customAttributes[has](attr)) {
                    from[attr] = element.attr(attr);
                    (from[attr] == null) && (from[attr] = availableAttrs[attr]);
                    to[attr] = params[attr];
                    switch (availableAnimAttrs[attr]) {
                        case nu:
                            diff[attr] = (to[attr] - from[attr]) / ms;
                            break;
                        case "colour":
                            from[attr] = R.getRGB(from[attr]);
                            var toColour = R.getRGB(to[attr]);
                            diff[attr] = {
                                r: (toColour.r - from[attr].r) / ms,
                                g: (toColour.g - from[attr].g) / ms,
                                b: (toColour.b - from[attr].b) / ms
                            };
                            break;
                        case "path":
                            var pathes = path2curve(from[attr], to[attr]),
                                toPath = pathes[1];
                            from[attr] = pathes[0];
                            diff[attr] = [];
                            for (i = 0, ii = from[attr].length; i < ii; i++) {
                                diff[attr][i] = [0];
                                for (var j = 1, jj = from[attr][i].length; j < jj; j++) {
                                    diff[attr][i][j] = (toPath[i][j] - from[attr][i][j]) / ms;
                                }
                            }
                            break;
                        case "transform":
                            var _ = element._,
                                eq = equaliseTransform(_[attr], to[attr]);
                            if (eq) {
                                from[attr] = eq.from;
                                to[attr] = eq.to;
                                diff[attr] = [];
                                diff[attr].real = true;
                                for (i = 0, ii = from[attr].length; i < ii; i++) {
                                    diff[attr][i] = [from[attr][i][0]];
                                    for (j = 1, jj = from[attr][i].length; j < jj; j++) {
                                        diff[attr][i][j] = (to[attr][i][j] - from[attr][i][j]) / ms;
                                    }
                                }
                            } else {
                                var m = (element.matrix || new Matrix).m,
                                    to2 = {_:{transform: _.transform}, getBBox: function () { return element.getBBox(); }};
                                from[attr] = [
                                    m[0][0],
                                    m[1][0],
                                    m[0][1],
                                    m[1][1],
                                    m[0][2],
                                    m[1][2]
                                ];
                                extractTransform(to2, to[attr]);
                                to[attr] = to2._.transform;
                                diff[attr] = [
                                    (to2.matrix.m[0][0] - m[0][0]) / ms,
                                    (to2.matrix.m[1][0] - m[1][0]) / ms,
                                    (to2.matrix.m[0][1] - m[0][1]) / ms,
                                    (to2.matrix.m[1][1] - m[1][1]) / ms,
                                    (to2.matrix.m[0][2] - m[0][2]) / ms,
                                    (to2.matrix.m[1][2] - m[1][2]) / ms
                                ];
                                // from[attr] = [_.sx, _.sy, _.deg, _.dx, _.dy];
                                // var to2 = {_:{}, getBBox: function () { return element.getBBox(); }};
                                // extractTransform(to2, to[attr]);
                                // diff[attr] = [
                                //     (to2._.sx - _.sx) / ms,
                                //     (to2._.sy - _.sy) / ms,
                                //     (to2._.deg - _.deg) / ms,
                                //     (to2._.dx - _.dx) / ms,
                                //     (to2._.dy - _.dy) / ms
                                // ];
                            }
                            break;
                        case "csv":
                            var values = Str(params[attr]).split(separator),
                                from2 = Str(from[attr]).split(separator);
                            if (attr == "clip-rect") {
                                from[attr] = from2;
                                diff[attr] = [];
                                i = from2.length;
                                while (i--) {
                                    diff[attr][i] = (values[i] - from[attr][i]) / ms;
                                }
                            }
                            to[attr] = values;
                            break;
                        default:
                            values = [].concat(params[attr]);
                            from2 = [].concat(from[attr]);
                            diff[attr] = [];
                            i = element.paper.customAttributes[attr].length;
                            while (i--) {
                                diff[attr][i] = ((values[i] || 0) - (from2[i] || 0)) / ms;
                            }
                            break;
                    }
                }
            }
            var easing = params.easing,
                easyeasy = R.easing_formulas[easing];
            if (!easyeasy) {
                easyeasy = Str(easing).match(bezierrg);
                if (easyeasy && easyeasy.length == 5) {
                    var curve = easyeasy;
                    easyeasy = function (t) {
                        return CubicBezierAtTime(t, +curve[1], +curve[2], +curve[3], +curve[4], ms);
                    };
                } else {
                    easyeasy = pipe;
                }
            }
            timestamp = params.start || anim.start || +new Date;
            e = {
                anim: anim,
                percent: percent,
                timestamp: timestamp,
                start: timestamp + (anim.del || 0),
                status: 0,
                initstatus: status || 0,
                stop: false,
                ms: ms,
                easing: easyeasy,
                from: from,
                diff: diff,
                to: to,
                el: element,
                callback: params.callback,
                prev: prev,
                next: next,
                repeat: anim.times,
                origin: element.attr(),
                totalOrigin: totalOrigin
            };
            animationElements.push(e);
            if (status && !isInAnim) {
                e.stop = true;
                e.start = new Date - ms * status;
                if (animationElements.length == 1) {
                    return animation();
                }
            }
            animationElements.length == 1 && requestAnimFrame(animation);
        } else {
            isInAnim.initstatus = status;
            isInAnim.start = new Date - isInAnim.ms * status;
        }
        eve("anim.start." + element.id, element, anim);
    }
    /*\
     * Raphael.animation
     [ method ]
     **
     * Creates an animation object that can be passed to the @Element.animate or @Element.animateWith methods.
     * See also @Animation.delay and @Animation.repeat methods.
     **
     > Parameters
     **
     - params (object) final attributes for the element, see also @Element.attr
     - ms (number) number of milliseconds for animation to run
     - easing (string) #optional easing type. Accept one of @Raphael.easing_formulas or CSS format: `cubic&#x2010;bezier(XX,&#160;XX,&#160;XX,&#160;XX)`
     - callback (function) #optional callback function. Will be called at the end of animation.
     **
     = (object) @Animation
    \*/
    R.animation = function (params, ms, easing, callback) {
        if (R.is(easing, "function") || !easing) {
            callback = callback || easing || null;
            easing = null;
        }
        params = Object(params);
        ms = +ms || 0;
        var p = {},
            json,
            attr;
        for (attr in params) if (params[has](attr) && toFloat(attr) != attr) {
            json = true;
            p[attr] = params[attr];
        }
        if (!json) {
            return new Animation(params, ms);
        } else {
            easing && (p.easing = easing);
            callback && (p.callback = callback);
            return new Animation({100: p}, ms);
        }
    };
    /*\
     * Element.animate
     [ method ]
     **
     * Creates and starts animation for given element.
     **
     > Parameters
     **
     - params (object) final attributes for the element, see also @Element.attr
     - ms (number) number of milliseconds for animation to run
     - easing (string) #optional easing type. Accept one of @Raphael.easing_formulas or CSS format: `cubic&#x2010;bezier(XX,&#160;XX,&#160;XX,&#160;XX)`
     - callback (function) #optional callback function. Will be called at the end of animation.
     * or
     - animation (object) animation object, see @Raphael.animation
     **
     = (object) original element
    \*/
    elproto.animate = function (params, ms, easing, callback) {
        var element = this;
        if (element.removed) {
            callback && callback.call(element);
            return element;
        }
        var anim = params instanceof Animation ? params : R.animation(params, ms, easing, callback);
        runAnimation(anim, element, anim.percents[0], null, element.attr());
        return element;
    };
    /*\
     * Element.setTime
     [ method ]
     **
     * Sets the status of animation of the element in milliseconds. Similar to @Element.status method.
     **
     > Parameters
     **
     - anim (object) animation object
     - value (number) number of milliseconds from the beginning of the animation
     **
     = (object) original element if `value` is specified
     * Note, that during animation following events are triggered:
     *
     * On each animation frame event `anim.frame.<id>`, on start `anim.start.<id>` and on end `anim.finish.<id>`.
    \*/
    elproto.setTime = function (anim, value) {
        if (anim && value != null) {
            this.status(anim, mmin(value, anim.ms) / anim.ms);
        }
        return this;
    };
    /*\
     * Element.status
     [ method ]
     **
     * Gets or sets the status of animation of the element.
     **
     > Parameters
     **
     - anim (object) #optional animation object
     - value (number) #optional 0 – 1. If specified, method works like a setter and sets the status of a given animation to the value. This will cause animation to jump to the given position.
     **
     = (number) status
     * or
     = (array) status if `anim` is not specified. Array of objects in format:
     o {
     o     anim: (object) animation object
     o     status: (number) status
     o }
     * or
     = (object) original element if `value` is specified
    \*/
    elproto.status = function (anim, value) {
        var out = [],
            i = 0,
            len,
            e;
        if (value != null) {
            runAnimation(anim, this, -1, mmin(value, 1));
            return this;
        } else {
            len = animationElements.length;
            for (; i < len; i++) {
                e = animationElements[i];
                if (e.el.id == this.id && (!anim || e.anim == anim)) {
                    if (anim) {
                        return e.status;
                    }
                    out.push({anim: e.anim, status: e.status});
                }
            }
            if (anim) {
                return 0;
            }
            return out;
        }
    };
    /*\
     * Element.pause
     [ method ]
     **
     * Stops animation of the element with ability to resume it later on.
     **
     > Parameters
     **
     - anim (object) #optional animation object
     **
     = (object) original element
    \*/
    elproto.pause = function (anim) {
        for (var i = 0; i < animationElements.length; i++) if (animationElements[i].el.id == this.id && (!anim || animationElements[i].anim == anim)) {
            if (eve("anim.pause." + this.id, this, animationElements[i].anim) !== false) {
                animationElements[i].paused = true;
            }
        }
        return this;
    };
    /*\
     * Element.resume
     [ method ]
     **
     * Resumes animation if it was paused with @Element.pause method.
     **
     > Parameters
     **
     - anim (object) #optional animation object
     **
     = (object) original element
    \*/
    elproto.resume = function (anim) {
        for (var i = 0; i < animationElements.length; i++) if (animationElements[i].el.id == this.id && (!anim || animationElements[i].anim == anim)) {
            var e = animationElements[i];
            if (eve("anim.resume." + this.id, this, e.anim) !== false) {
                delete e.paused;
                this.status(e.anim, e.status);
            }
        }
        return this;
    };
    /*\
     * Element.stop
     [ method ]
     **
     * Stops animation of the element.
     **
     > Parameters
     **
     - anim (object) #optional animation object
     **
     = (object) original element
    \*/
    elproto.stop = function (anim) {
        for (var i = 0; i < animationElements.length; i++) if (animationElements[i].el.id == this.id && (!anim || animationElements[i].anim == anim)) {
            if (eve("anim.stop." + this.id, this, animationElements[i].anim) !== false) {
                animationElements.splice(i--, 1);
            }
        }
        return this;
    };
    elproto.toString = function () {
        return "Rapha\xebl\u2019s object";
    };

    // Set
    var Set = function (items) {
        this.items = [];
        this.length = 0;
        this.type = "set";
        if (items) {
            for (var i = 0, ii = items.length; i < ii; i++) {
                if (items[i] && (items[i].constructor == Element || items[i].constructor == Set)) {
                    this[this.items.length] = this.items[this.items.length] = items[i];
                    this.length++;
                }
            }
        }
    },
    setproto = Set.prototype;
    /*\
     * Set.push
     [ method ]
     **
     * Adds each argument to the current set.
     = (object) original element
    \*/
    setproto.push = function () {
        var item,
            len;
        for (var i = 0, ii = arguments.length; i < ii; i++) {
            item = arguments[i];
            if (item && (item.constructor == Element || item.constructor == Set)) {
                len = this.items.length;
                this[len] = this.items[len] = item;
                this.length++;
            }
        }
        return this;
    };
    /*\
     * Set.pop
     [ method ]
     **
     * Removes last element and returns it.
     = (object) element
    \*/
    setproto.pop = function () {
        this.length && delete this[this.length--];
        return this.items.pop();
    };
    /*\
     * Set.forEach
     [ method ]
     **
     * Executes given function for each element in the set.
     *
     * If function returns `false` it will stop loop running.
     **
     > Parameters
     **
     - callback (function) function to run
     - thisArg (object) context object for the callback
     = (object) Set object
    \*/
    setproto.forEach = function (callback, thisArg) {
        for (var i = 0, ii = this.items.length; i < ii; i++) {
            if (callback.call(thisArg, this.items[i]) === false) {
                return this;
            }
        }
        return this;
    };
    for (var method in elproto) if (elproto[has](method)) {
        setproto[method] = (function (methodname) {
            return function () {
                var arg = arguments;
                return this.forEach(function (el) {
                    el[methodname][apply](el, arg);
                });
            };
        })(method);
    }
    setproto.attr = function (name, value) {
        if (name && R.is(name, array) && R.is(name[0], "object")) {
            for (var j = 0, jj = name.length; j < jj; j++) {
                this.items[j].attr(name[j]);
            }
        } else {
            for (var i = 0, ii = this.items.length; i < ii; i++) {
                this.items[i].attr(name, value);
            }
        }
        return this;
    };
    setproto.animate = function (params, ms, easing, callback) {
        (R.is(easing, "function") || !easing) && (callback = easing || null);
        var len = this.items.length,
            i = len,
            item,
            set = this,
            collector;
        callback && (collector = function () {
            !--len && callback.call(set);
        });
        easing = R.is(easing, string) ? easing : collector;
        var anim = params instanceof Animation ? params : R.animation(params, ms, easing, collector);
        item = this.items[--i].animate(anim);
        while (i--) {
            this.items[i] && !this.items[i].removed && this.items[i].animateWith(item, anim);
        }
        return this;
    };
    setproto.insertAfter = function (el) {
        var i = this.items.length;
        while (i--) {
            this.items[i].insertAfter(el);
        }
        return this;
    };
    setproto.getBBox = function () {
        var x = [],
            y = [],
            w = [],
            h = [];
        for (var i = this.items.length; i--;) if (!this.items[i].removed) {
            var box = this.items[i].getBBox();
            x.push(box.x);
            y.push(box.y);
            w.push(box.x + box.width);
            h.push(box.y + box.height);
        }
        x = mmin[apply](0, x);
        y = mmin[apply](0, y);
        return {
            x: x,
            y: y,
            width: mmax[apply](0, w) - x,
            height: mmax[apply](0, h) - y
        };
    };
    setproto.clone = function (s) {
        s = new Set;
        for (var i = 0, ii = this.items.length; i < ii; i++) {
            s.push(this.items[i].clone());
        }
        return s;
    };
    setproto.toString = function () {
        return "Rapha\xebl\u2018s set";
    };

    R.registerFont = function (font) {
        if (!font.face) {
            return font;
        }
        this.fonts = this.fonts || {};
        var fontcopy = {
                w: font.w,
                face: {},
                glyphs: {}
            },
            family = font.face["font-family"];
        for (var prop in font.face) if (font.face[has](prop)) {
            fontcopy.face[prop] = font.face[prop];
        }
        if (this.fonts[family]) {
            this.fonts[family].push(fontcopy);
        } else {
            this.fonts[family] = [fontcopy];
        }
        if (!font.svg) {
            fontcopy.face["units-per-em"] = toInt(font.face["units-per-em"], 10);
            for (var glyph in font.glyphs) if (font.glyphs[has](glyph)) {
                var path = font.glyphs[glyph];
                fontcopy.glyphs[glyph] = {
                    w: path.w,
                    k: {},
                    d: path.d && "M" + path.d.replace(/[mlcxtrv]/g, function (command) {
                            return {l: "L", c: "C", x: "z", t: "m", r: "l", v: "c"}[command] || "M";
                        }) + "z"
                };
                if (path.k) {
                    for (var k in path.k) if (path[has](k)) {
                        fontcopy.glyphs[glyph].k[k] = path.k[k];
                    }
                }
            }
        }
        return font;
    };
    paperproto.getFont = function (family, weight, style, stretch) {
        stretch = stretch || "normal";
        style = style || "normal";
        weight = +weight || {normal: 400, bold: 700, lighter: 300, bolder: 800}[weight] || 400;
        if (!R.fonts) {
            return;
        }
        var font = R.fonts[family];
        if (!font) {
            var name = new RegExp("(^|\\s)" + family.replace(/[^\w\d\s+!~.:_-]/g, E) + "(\\s|$)", "i");
            for (var fontName in R.fonts) if (R.fonts[has](fontName)) {
                if (name.test(fontName)) {
                    font = R.fonts[fontName];
                    break;
                }
            }
        }
        var thefont;
        if (font) {
            for (var i = 0, ii = font.length; i < ii; i++) {
                thefont = font[i];
                if (thefont.face["font-weight"] == weight && (thefont.face["font-style"] == style || !thefont.face["font-style"]) && thefont.face["font-stretch"] == stretch) {
                    break;
                }
            }
        }
        return thefont;
    };
    paperproto.print = function (x, y, string, font, size, origin, letter_spacing) {
        origin = origin || "middle"; // baseline|middle
        letter_spacing = mmax(mmin(letter_spacing || 0, 1), -1);
        var out = this.set(),
            letters = Str(string).split(E),
            shift = 0,
            path = E,
            scale;
        R.is(font, string) && (font = this.getFont(font));
        if (font) {
            scale = (size || 16) / font.face["units-per-em"];
            var bb = font.face.bbox.split(separator),
                top = +bb[0],
                height = +bb[1] + (origin == "baseline" ? bb[3] - bb[1] + (+font.face.descent) : (bb[3] - bb[1]) / 2);
            for (var i = 0, ii = letters.length; i < ii; i++) {
                var prev = i && font.glyphs[letters[i - 1]] || {},
                    curr = font.glyphs[letters[i]];
                shift += i ? (prev.w || font.w) + (prev.k && prev.k[letters[i]] || 0) + (font.w * letter_spacing) : 0;
                curr && curr.d && out.push(this.path(curr.d).attr({fill: "#000", stroke: "none", transform: [["t", shift, 0]]}));
            }
            out.scale(scale, scale, top, height).translate(x - top, y - height);
        }
        return out;
    };

    R.format = function (token, params) {
        var args = R.is(params, array) ? [0][concat](params) : arguments;
        token && R.is(token, string) && args.length - 1 && (token = token.replace(formatrg, function (str, i) {
            return args[++i] == null ? E : args[i];
        }));
        return token || E;
    };
    R.ninja = function () {
        oldRaphael.was ? (g.win.Raphael = oldRaphael.is) : delete Raphael;
        return R;
    };
    /*\
     * Raphael.el
     [ property (object) ]
     **
     * You can add your own method to elements. This is usefull when you want to hack default functionality or
     * want to wrap some common transformation or attributes in one method. In difference to canvas methods,
     * you can redefine element method at any time. Expending element methods wouldn’t affect set.
     > Usage
     | Raphael.el.red = function () {
     |     this.attr({fill: "#f00"});
     | };
     | // then use it
     | paper.circle(100, 100, 20).red();
    \*/
    R.el = elproto;
    R.st = setproto;
    // Firefox <3.6 fix: http://webreflection.blogspot.com/2009/11/195-chars-to-help-lazy-loading.html
    (function (doc, loaded, f) {
        if (doc.readyState == null && doc.addEventListener){
            doc.addEventListener(loaded, f = function () {
                doc.removeEventListener(loaded, f, false);
                doc.readyState = "complete";
            }, false);
            doc.readyState = "loading";
        }
        function isLoaded() {
            (/in/).test(doc.readyState) ? setTimeout(isLoaded, 9) : eve("DOMload");
        }
        isLoaded();
    })(document, "DOMContentLoaded");

    oldRaphael.was ? (g.win.Raphael = R) : (Raphael = R);

    /*
     * Eve 0.2.1 - JavaScript Events Library
     *
     * Copyright (c) 2010 Dmitry Baranovskiy (http://dmitry.baranovskiy.com/)
     * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
     */

    var eve = R.eve = (function () {
        var version = "0.2.1",
            has = "hasOwnProperty",
            separator = /[\.\/]/,
            wildcard = "*",
            events = {n: {}},
            eve = function (name, scope) {
                var e = events,
                    args = Array.prototype.slice.call(arguments, 2),
                    listeners = eve.listeners(name),
                    errors = [];
                for (var i = 0, ii = listeners.length; i < ii; i++) {
                    try {
                        listeners[i].apply(scope, args);
                    } catch (ex) {
                        errors.push({error: ex && ex.message || ex, func: listeners[i]});
                    }
                }
                if (errors.length) {
                    return errors;
                }
            };
        eve.listeners = function (name) {
            var names = name.split(separator),
                e = events,
                item,
                items,
                k,
                i,
                ii,
                j,
                jj,
                nes,
                es = [e],
                out = [];
            for (i = 0, ii = names.length; i < ii; i++) {
                nes = [];
                for (j = 0, jj = es.length; j < jj; j++) {
                    e = es[j].n;
                    items = [e[names[i]], e[wildcard]];
                    k = 2;
                    while (k--) {
                        item = items[k];
                        if (item) {
                            nes.push(item);
                            out = out.concat(item.f || []);
                        }
                    }
                }
                es = nes;
            }
            return out;
        };
        eve.on = function (name, f) {
            var names = name.split(separator),
                e = events;
            for (var i = 0, ii = names.length; i < ii; i++) {
                e = e.n;
                !e[names[i]] && (e[names[i]] = {n: {}});
                e = e[names[i]];
            }
            e.f = e.f || [];
            for (i = 0, ii = e.f.length; i < ii; i++) if (e.f[i] == f) {
                return false;
            }
            e.f.push(f);
        };
        eve.unbind = function (name, f) {
            var names = name.split(separator),
                e,
                key,
                splice,
                cur = [events];
            for (var i = 0, ii = names.length; i < ii; i++) {
                for (var j = 0; j < cur.length; j += splice.length - 2) {
                    splice = [j, 1];
                    e = cur[j].n;
                    if (names[i] != wildcard) {
                        if (e[names[i]]) {
                            splice.push(e[names[i]]);
                        }
                    } else {
                        for (key in e) if (e[has](key)) {
                            splice.push(e[key]);
                        }
                    }
                    cur.splice.apply(cur, splice);
                }
            }
            for (i = 0, ii = cur.length; i < ii; i++) {
                e = cur[i];
                while (e.n) {
                    if (f) {
                        if (e.f) {
                            for (i = 0, ii = e.f.length; i < ii; i++) if (e.f[i] == f) {
                                e.f.splice(i, 1);
                                break;
                            }
                            !e.f.length && delete e.f;
                        }
                        for (key in e.n) if (e.n[has](key) && e.n[key].f) {
                            var funcs = e.n[key].f;
                            for (i = 0, ii = funcs.length; i < ii; i++) if (funcs[i] == f) {
                                funcs.splice(i, 1);
                                break;
                            }
                            !funcs.length && delete e.n[key].f;
                        }
                    } else {
                        delete e.f;
                        for (key in e.n) if (e.n[has](key) && e.n[key].f) {
                            delete e.n[key].f;
                        }
                    }
                    e = e.n;
                }
            }
            return true;
        };
        eve.version = version;
        eve.toString = function () {
            return "You are running Eve " + version;
        };
        return eve;
    })();
})();