/// <reference path="IShape.ts" />

namespace Drawing {
    export class Triangle implements IShape {
        public draw(): void{
            console.log("Triangle is drawn.");
        }
    }
}
