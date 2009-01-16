# Raphaël

Cross-browser vector graphics the easy way.

## What is it?

Raphaël is a small JavaScript library that should simplify your work with vector graphics on the web. If you want to create your own specific chart or image crop and rotate widget, for example, you can achieve it simply and easily with this library.

Raphaël uses the [SVG W3C Recommendation](http://www.w3.org/TR/SVG/) and [VML](http://msdn.microsoft.com/en-us/library/bb264280.aspx) (a mostly equivalent implementation for Internet Explorer) as a base for drawing graphics. This means every graphical object you create is also a DOM object, so you can attach JavaScript event handlers or modify them later. Raphaël’s goal is to provide an adapter that will make drawing vector art cross-browser compatible and easy to do.

Raphaël currently supports Firefox 3.0+, Safari 3.0+, Opera 9.5+ and Internet Explorer 6.0+.

## How to use it?

Download and include `raphael.js` (or, `raphael-packed.js` for a minimized version) into your HTML page. When it's loaded, use it as simply as:

    // Creates canvas 320 × 200 at 10, 50
    var paper = Raphael(10, 50, 320, 200);
    // Creates circle at x = 50, y = 40, with radius 10
    var circle = paper.circle(50, 40, 10);
    // Sets the fill attribute of the circle to red (#f00)
    circle.attr("fill", "#f00");
    // Sets the stroke attribute of the circle to white (#fff)
    circle.attr("stroke", "#fff");
    
## Reference

This section provides a function reference for the Raphaël JavaScript library.

### Main Function

#### Raphael

Creates a canvas object on which to draw. You must do this first, as all future calls to drawing methods from this instance will be bound to this canvas.

##### Parameters

1. container HTMLElement or string
2. width number
3. height number

or

1. x number
2. y number
3. width number
4. height number

##### Usage

    // Each of the following examples create a canvas that is 320px wide by 200px high
    // Canvas is created at the viewport's 10,50 coordinate
    var paper = Raphael(10, 50, 320, 200);
    // Canvas is created at the top left corner of the #notepad element (or its top right corner in dir="rtl" elements)
    var paper = Raphael(document.getElementById("notepad"), 320, 200);
    // Same as above
    var paper = Raphael("notepad", 320, 200);
    
### Element’s generic methods

Each object created on the canvas shares these same generic methods:

#### node

Gives you a reference to the DOM object, so you can assign event handlers or just mess around.

##### Usage

    var c = paper.circle(10, 10, 10); // draw a circle at coordinate 10,10 with radius of 10
    c.node.onclick = function () { c.attr("fill", "red"); };

#### rotate

Rotates the element by the given degree from either its 0,0 corner or its centre point.

##### Parameters

1. degree number Degree of rotation (0 – 360°)
2. isAbsolute boolean \[optional\] Specifies the rotation point. Use `true` to rotate the element around its center point. The default, `false`, rotates the element from its 0,0 coordinate.

##### Usage

    var c = paper.circle(10, 10, 10);
    c.rotate(45);        // rotation is relative
    c.rotate(45, true);  // rotation is absolute

#### translate

Moves the element around the canvas by the given distances.

##### Parameters

1. dx number Pixels of translation by X axis
2. dy number Pixels of translation by Y axis

##### Usage

    var c = paper.circle(10, 10, 10);
    c.translate(10, 10); // moves the circle down the canvas, in a diagonal line

#### scale

Resizes the element by the given multiplier.

##### Parameters

1. Xtimes number Amount to scale horizontally
2. Ytimes number Amount to scale vertically

##### Usage

    var c = paper.circle(10, 10, 10);
    c.scale(1.5, 1.5); // makes the circle 1.5 times larger
    c.scale(.5, .75);  // makes the circle half as wide, and 75% as high

#### attr

Sets the attributes of elements directly.

##### Parameters

1. attributeName string
2. value string

or

1. params object

###### Possible parameters

Please refer to the [SVG specification](http://www.w3.org/TR/SVG/) for an explanation of these parameters.

* cx number
* cy number
* dasharray string \[“-”, “.”, “-.”, “-..”, “. ”, “- ”, “--”, “- .”, “--.”, “--..”\]
* fill colour
* fill-opacity number
* font string
* font-family string
* font-size number
* font-weight string
* gradient object
* height number
* opacity number
* path pathString
* r number
* rotation number
* rx number
* ry number
* scale CSV
* stroke colour
* stroke-linecap string \[“butt”, “square”, “round”, “miter”\]
* stroke-linejoin string \[“butt”, “square”, “round”, “miter”\]
* stroke-miterlimit number
* stroke-opacity number
* stroke-width number
* translation CSV
* width number
* x number
* y number

##### Usage

    var c = paper.circle(10, 10, 10);
    c.attr("fill", "black");                              // using strings
    c.attr({fill: "#000", stroke: "#f00", opacity: 0.5}); // using params object

#### animate

Linearly changes an attribute from its current value to its specified value in the given amount of milliseconds.

##### Parameters

1. newAttrs object A parameters object of the animation results.
2. ms number The duration of the animation, given in milliseconds.
3. callback function \[optional\]

##### Usage

    var c = paper.circle(10, 10, 10);
    c.animate({cx: 20, r: 20}, 2000);

#### getBBox

Returns the dimensions of an element.

##### Usage

    var c = paper.circle(10, 10, 10);
    var width = c.getBBox().width;

#### toFront

Moves the element so it is the closest to the viewer’s eyes, on top of other elements.

##### Usage

    var c = paper.circle(10, 10, 10);
    c.toFront();

#### toBack

Moves the element so it is the furthest from the viewer’s eyes, behind other elements.

##### Usage

    var c = paper.circle(10, 10, 10);
    c.toBack();
    
#### insertBefore

Inserts current object before the given one

##### Usage

    var r = paper.rect(10, 10, 10, 10);
    var c = paper.circle(10, 10, 10);
    c.insertBefore(r);

#### insertAfter

Inserts current object after the given one

##### Usage

    var c = paper.circle(10, 10, 10);
    var r = paper.rect(10, 10, 10, 10);
    c.insertAfter(r);

### Graphic Primitives

#### circle

Draws a circle.

##### Parameters

1. x number X coordinate of the centre
2. y number Y coordinate of the centre
3. r number radius

##### Usage

    var c = paper.circle(10, 10, 10);

#### rect

Draws a rectangle.

##### Parameters

1. x number X coordinate of top left corner
2. y number Y coordinate of top left corner
3. width number
4. height number
5. r number \[optional\] radius for rounded corners, default is 0

##### Usage

    // regular rectangle
    var c = paper.rect(10, 10, 10, 10);
    // rectangle with rounded corners
    var c = paper.rect(10, 10, 100, 50, 10);

#### ellipse

Draws an ellipse.

##### Parameters

1. x number X coordinate of the centre
2. y number X coordinate of the centre
3. rx number Horisontal radius
4. ry number Vertical radius

##### Usage

    var c = paper.ellipse(100, 100, 30, 40);

#### image

Embeds an image into the SVG/VML canvas.

##### Parameters

1. src string URI of the source image
2. x number X coordinate position
3. y number Y coordinate position
4. width number Width of the image
5. height number Height of the image

##### Usage

    var c = paper.image("apple.png", 10, 10, 100, 100);

#### path

Initialises path drawing. Typically, this function returns an empty `path` object and to draw paths you use its built-in methods like `lineTo` and `curveTo`. However, you can also specify a path literally by supplying the path data as a second argument.

##### Parameters

1. params object Attributes for the resulting path as described in the `attr` reference.
2. pathString string \[optional\] Path data in [SVG path string format](http://www.w3.org/TR/SVG/paths.html#PathData).

##### Usage

    var c = paper.path({stroke: "#036"}).moveTo(10, 10).lineTo(50, 50); // draw a diagonal line
    var c = paper.path({stroke: "#036"}, "M 10 10 L 50 50");            // same

### Path Methods

#### absolutely

Sets a trigger to count all following units as absolute ones, unless said otherwise. (This is on by default.)

##### Usage

    var c = paper.path({stroke: "#036"}).absolutely()
        .moveTo(10, 10).lineTo(50, 50);

#### relatively

Sets a trigger to count all following units as relative ones, unless said otherwise.

##### Usage

    var c = paper.path({stroke: "#036"}).relatively()
        .moveTo(10, 10).lineTo(50, 50);

#### moveTo

Moves the drawing point to the given coordinates.

##### Parameters

1. x number X coordinate
2. y number Y coordinate

##### Usage

    // Begins drawing the path at coordinate 10,10
    var c = paper.path({stroke: "#036"}).moveTo(10, 10).lineTo(50, 50);

#### lineTo

Draws a straight line to the given coordinates.

##### Parameters

1. x number X coordinate
2. y number Y coordinate

##### Usage

    // Draws a line starting from 10,10 to 50,50
    var c = paper.path({stroke: "#036"}).moveTo(10, 10).lineTo(50, 50);

#### cplineTo

Draws a curved line to the given coordinates. The line will have horizontal anchors on start and on finish.

##### Parameters

1. x number
2. y number
3. width number

##### Usage

    var c = paper.path({stroke: "#036"}).moveTo(10, 10).cplineTo(50, 50);

#### curveTo

Draws a bicubic curve to the given coordinates.

##### Parameters

1. x1 number
2. y1 number
3. x2 number
4. y2 number
5. x3 number
6. y3 number

##### Usage

    var c = paper.path({stroke: "#036"}).moveTo(10, 10).curveTo(10, 15, 45, 45, 50, 50);

#### qcurveTo

Draws a quadratic curve to the given coordinates.

##### Parameters

1. x1 number
2. y1 number
3. x2 number
4. y2 number

##### Usage

    var c = paper.path({stroke: "#036"}).moveTo(10, 10).curveTo(10, 15, 45, 45, 50, 50);

#### addRoundedCorner

Draws a quarter of a circle from the current drawing point.

##### Parameters

1. r number
2. dir string Two-letter directional instruction, as described below.

Possible dir values

* dl: down left
* dr: down right
* ld: left down
* lu: left up
* rd: right down
* ru: right up
* ul: up left
* ur: up right

##### Usage

    var c = paper.path({stroke: "#036"}).moveTo(10, 10).addRoundedCorner(10, "rd");

#### andClose

Closes the path being drawn.

##### Usage

    var c = paper.path({stroke: "#036"}).moveTo(10, 10).andClose();

## License

[http://www.opensource.org/licenses/mit-license.php](http://www.opensource.org/licenses/mit-license.php)

Copyright (c) 2008 Dmitry Baranovskiy ([http://raphaeljs.com](http://raphaeljs.com/))
