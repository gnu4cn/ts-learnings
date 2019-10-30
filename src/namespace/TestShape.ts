/// <reference path="IShape.ts" />
/// <reference path="Triangle.ts" />
/// <reference path="Circle.ts" />

function drawAllShapes(shape: Drawing.IShape) {
    shape.draw();
}

drawAllShapes(new Drawing.Circle());
drawAllShapes(new Drawing.Triangle());
