# Raphaël

Cross-browser vector graphics the easy way.

## What is it?

Raphaël is a small JavaScript library that should simplify your work with vector graphics on the web. In case you want to create your own specific chart or image crop-n-rotate widget, you can simply achieve it with this library.

Raphaël uses SVG and VML as a base for graphics creation. Because of that every created object is a DOM object so you can attach JavaScript event handlers or modify objects later. Raphaël’s goal is to provide an adapter that will make drawing cross-browser and easy. Currently library supports Firefox 3.0+, Safari 3.0+, Opera 9.5+ and Internet Explorer 6.0+.

## How to use it?

Download and include raphael.js into your HTML page, then use it as simply as:

    // Creates canvas 320 × 200 at 10, 50
    var paper = Raphael(10, 50, 320, 200);
    // Creates circle at x = 50, y = 40, with radius 10
    var circle = paper.circle(50, 40, 10);
    // Sets the fill attribute of the circle to red (#f00)
    circle.attr("fill", "#f00");
    // Sets the stroke attribute of the circle to white (#fff)
    circle.attr("stroke", "#fff");
    
## Reference

### Main Function

#### Raphael

Function that creates a canvas on which to draw.

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

    // Creates canvas 320 × 200 at 10, 50
    var paper = Raphael(10, 50, 320, 200);
    var paper = Raphael(document.getElementById("notepad"), 320, 200);
    var paper = Raphael("notepad", 320, 200);
    
### Element’s generic methods

Each object created on the canvas share the same generic methods:

#### node

Gives you reference to DOM object, so you can assign event handlers or just randomly mess around.

##### Usage

    var c = paper.circle(10, 10, 10);
    c.node.onclick = function () { c.attr("fill", "red"); };

#### rotate

Rotates element by given degree around its center.

##### Parameters

1. degree number Degree of rotation (0 – 360°)
2. isAbsolute boolean [optional] Will rotation be relative or absolute

##### Usage

    var c = paper.circle(10, 10, 10);
    c.rotate(45);

#### translate

Moves element around the canvas by given dimensions.

##### Parameters

1. dx number Pixels of translation by X
2. dy number Pixels of translation by Y

##### Usage

    var c = paper.circle(10, 10, 10);
    c.translate(10, 10);

#### scale

Scales element by given amount of times.

##### Parameters

1. Xtimes number
2. Ytimes number

##### Usage

    var c = paper.circle(10, 10, 10);
    c.scale(1.5, 1.5);

#### attr

Sets attributes of elements.

##### Parameters

1. params object

or

1. attributeName string
2. value string

###### Possible parameters

* cx number
* cy number
* dasharray string [“-”, “.”, “-.”, “-..”, “. ”, “- ”, “--”, “- .”, “--.”, “--..”]
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
* stroke-linecap string [“butt”, “square”, “round”, “miter”]
* stroke-linejoin string [“butt”, “square”, “round”, “miter”]
* stroke-miterlimit number
* stroke-opacity number
* stroke-width number
* translation CSV
* width number
* x number
* y number

##### Usage

    var c = paper.circle(10, 10, 10);
    c.attr("fill", "black");
    c.attr({fill: "#000", stroke: "#f00", opacity: 0.5});

#### animate

Linearly changes attribute from current to specified in given amount of milliseconds.

##### Parameters

1. newAttrs object
2. ms number
3. callback function [optional]

##### Usage

    var c = paper.circle(10, 10, 10);
    c.animate({cx: 20, r: 20}, 2000);

#### getBBox

Returns dimensions of given element.

##### Usage

    var c = paper.circle(10, 10, 10);
    var width = c.getBBox().width;

#### toFront

Moves element to front in hierarchy.

##### Usage

    var c = paper.circle(10, 10, 10);
    c.toFront();

#### toBack

Moves element to back in hierarchy.

##### Usage

    var c = paper.circle(10, 10, 10);
    c.toBack();
    
### Graphic Primitives

#### circle

Creates circle.

##### Parameters

1. x number X coordinate of the centre
2. y number Y coordinate of the centre
3. r number radius

##### Usage

    var c = paper.circle(10, 10, 10);

#### rect

Creates rectangle.

##### Parameters

1. x number X coordinate of top left corner
2. y number Y coordinate of top left corner
3. width number
4. height number
5. r number [optional] radius for rounded corners, default is 0

##### Usage

    // regular rectangle
    var c = paper.rect(10, 10, 10, 10);
    // rounded rectangle
    var c = paper.rect(10, 10, 100, 50, 10);

#### ellipse

Creates an ellipse.

##### Parameters

1. x number X coordinate of the centre
2. y number X coordinate of the centre
3. rx number Horisontal radius
4. ry number Vertical radius

##### Usage

    var c = paper.ellipse(100, 100, 30, 40);

#### image

Embeds an image in SVG/VML area.

##### Parameters

1. src string
2. x number
3. y number
4. width number
5. height number

##### Usage

    var c = paper.image("apple.png", 10, 10, 100, 100);

#### path

Initialise path drawing. In general case this function returns empty path object. To draw path use built in methods like lineTo and curveTo.

##### Parameters

1. params object Similar to object for attr method
2. pathString string [optional] path in SVG path string format. See SVG documentation.

##### Usage

    var c = paper.path({stroke: "#036"}).moveTo(10, 10).lineTo(50, 50);

### Path Methods

#### absolutely

Sets trigger to count all following units as absolute ones, unless said otherwise. [on by default]

Usage

    var c = paper.path({stroke: "#036"}).absolutely()
        .moveTo(10, 10).lineTo(50, 50);

#### relatively

Sets trigger to count all following units as relative ones, unless said otherwise.

##### Usage

    var c = paper.path({stroke: "#036"}).relatively()
        .moveTo(10, 10).lineTo(50, 50);

#### moveTo

Moves drawing point to given coordinates.

##### Parameters

1. x number
2. y number

##### Usage

    var c = paper.path({stroke: "#036"}).moveTo(10, 10).lineTo(50, 50);

#### lineTo

Draws straight line to given coordinates.

##### Parameters

1. x number
2. y number

##### Usage

    var c = paper.path({stroke: "#036"}).moveTo(10, 10).lineTo(50, 50);

#### cplineTo

Draws curved line to given coordinates. Line will have horizontal anchors on start and on finish.

##### Parameters

1. x number
2. y number
3. width number

##### Usage

    var c = paper.path({stroke: "#036"}).moveTo(10, 10).cplineTo(50, 50);

#### curveTo

Draws bicubic curve to given coordinates.

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

Draws quadratic curve to given coordinates.

##### Parameters

1. x1 number
2. y1 number
3. x2 number
4. y2 number

##### Usage

    var c = paper.path({stroke: "#036"}).moveTo(10, 10).curveTo(10, 15, 45, 45, 50, 50);

#### addRoundedCorner

Draws quarter of circle form current point.

##### Parameters

1. r number
2. dir string two letters direction

Possible dir values

* lu: left up
* ld: left down
* ru: right up
* rd: right down
* ur: up right
* ul: up left
* dr: down right
* dl: down left

##### Usage

    var c = paper.path({stroke: "#036"}).moveTo(10, 10).addRoundedCorner(10, "rd");

#### andClose

Closes the path.

##### Usage

    var c = paper.path({stroke: "#036"}).moveTo(10, 10).andClose();

## License

http://www.opensource.org/licenses/mit-license.php

Copyright (c) 2008 Dmitry Baranovskiy (http://raphaeljs.com)