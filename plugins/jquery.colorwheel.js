/*!
 * Color Wheel 0.1.0 - Raphael plugin
 *
 * Copyright (c) 2010 John Weir (http://famedriver.com) & Dmitry Baranovskiy (http://raphaeljs.com)
 * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 */
(function ($, R) {
    $.fn.colorwheel = function (size, initcolor) {
        if (R) {
            var offset = this.offset();
            return R.colorpicker(offset.left, offset.top, size, initcolor, this[0]);
        }
        return null;
    };
})(window.jQuery, window.Raphael);