/*!
 * Raphael Shadow Plugin 0.2
 *
 * Copyright (c) 2009 Dmitry Baranovskiy (http://raphaeljs.com)
 * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 */

Raphael.shadow = function (x, y, w, h, options) {
    // options format: {
    //     size: 0..1, shadow size
    //     color: "#000", placeholder colour
    //     stroke: "#000", placeholder stroke colour
    //     shadow: "#000", shadow colour
    //     r: 5, radius of placeholder rounded corners
    // }
    options = options || {};
    var t = ~~(size * .3 + .5),
        size = (options.size || 1) * 10,
        color = options.color || "#fff",
        stroke = options.stroke || color,
        shadowColor = options.shadow || "#000",
        R = options.r || 3,
        s = size,
        b = size * 2,
        r = b + s,
        rg = this.format("r{0}-{0}", shadowColor),
        rect = "rect",
        circ = "circle",
        none = "none";
    var res = this([
        x - s, y - t, w + (x = s) * 2, h + (y = t) + b,
        {type: rect, x: x - s, y: y - t, width: b + s, height: h + y + b, stroke: none, fill: this.format("180-{0}-{0}", shadowColor), opacity: 0, "clip-rect": [x - s + 1, y - t + r, b, h + y + b - r * 2 + .9]},
        {type: rect, x: x + w - b, y: y - t, width: b + s, height: h + y + b, stroke: none, fill: this.format("0-{0}-{0}", shadowColor), opacity: 0, "clip-rect": [x + w - s + 1, y - t + r, b, h + y + b - r * 2]},
        {type: rect, x: x + b - 1, y: y + h - s, width: w + b, height: b + s, stroke: none, fill: this.format("270-{0}-{0}", shadowColor), opacity: 0, "clip-rect": [x + b, y + h - s, w + b - r * 2, b + s]},
        {type: rect, x: x + s - 1, y: y - t, width: w + b, height: b + s, stroke: none, fill: this.format("90-{0}-{0}", shadowColor), opacity: 0, "clip-rect": [x + b, y - t, w + b - r * 2, s + t + 1]},
        {type: circ, cx: x + b, cy: y + h - s, r: r, stroke: none, fill: rg, opacity: 0, "clip-rect": [x - s, y + h - s + .999, r, r]},
        {type: circ, cx: x + w - b, cy: y + h - s, r: r, stroke: none, fill: rg, opacity: 0, "clip-rect": [x + w - b, y + h - s, r, r]},
        {type: circ, cx: x + b, cy: y - t + r, r: r, stroke: none, fill: rg, opacity: 0, "clip-rect": [x - s, y - t, r, r]},
        {type: circ, cx: x + w - b, cy: y - t + r, r: r , stroke: none, fill: rg, opacity: 0, "clip-rect": [x + w - b, y - t, r, r]},
        {type: rect, x: x, y: y, width: w, height: h, r: R, fill: color, stroke: stroke}
        ]);
    return res[0].paper;
};