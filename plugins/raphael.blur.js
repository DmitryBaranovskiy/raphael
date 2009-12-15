/*!
 * Raphael Blur Plugin 0.1
 *
 * Copyright (c) 2009 Dmitry Baranovskiy (http://raphaeljs.com)
 * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 */

if (Raphael.vml) {
    Raphael.el.blur = function (size) {
        var s = this.node.style,
            f = s.filter;
        f = f.replace(/ progid:\S+Blur\([^\)]+\)/g, "");
        if (size != "none") {
            s.filter = f + " progid:DXImageTransform.Microsoft.Blur(pixelradius=" + (+size || 1.5) + ")";
            s.margin = Raphael.format("-{0}px 0 0 -{0}px", Math.round(+size || 1.5));
        } else {
            s.filter = f;
            s.margin = 0;
        }
    };
} else {
    Raphael.el.blur = function (size) {
        // Experimental. No WebKit support.
        if (size != "none") {
            var fltr = $("filter"),
                blur = $("feGaussianBlur");
            fltr.id = "r" + (Raphael.idGenerator++).toString(36);
            $(blur, {stdDeviation: +size || 1.5});
            fltr.appendChild(blur);
            this.paper.defs.appendChild(fltr);
            this._blur = fltr;
            $(this.node, {filter: "url(#" + fltr.id + ")"});
        } else {
            if (this._blur) {
                this._blur.parentNode.removeChild(this._blur);
                delete this._blur;
            }
            this.node.removeAttribute("filter");
        }
    };
}