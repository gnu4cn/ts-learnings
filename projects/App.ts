/// <reference path="references/IShape.ts" />
/// <reference path="references/Triangle.ts" />
/// <reference path="references/Circle.ts" />

function drawAllShapes(shape: Drawing.IShape) {
    shape.draw();
}

drawAllShapes(new Drawing.Circle());
drawAllShapes(new Drawing.Triangle());
