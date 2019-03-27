'use strict';
import "reflect-metadata";

// 访问器装饰器，Accessor Decorator
class Point {
    private _x: number;
    private _y: number;
    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    @configurable(false)
    get x() { return this._x; }

    @configurable(false)
    get y() { return this._y; }
}

function configurable(value: boolean) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        descriptor.configurable = value;
    };
}

// 属性装饰器，property decorator
class Greeter {
    @format("Hello, %s")
    greeting: string;

    constructor (message: string) {
        this.greeting = message;
    }

    greet () {
        let formatString = getFormat(this, "greeting");
        return formatString.replace("%s", this.greeting);
    }
}

let formatMetadataKey: Symbol;

function format (formatString: string) {
    return Reflect.metadata(formatMetadataKey, formatString);
}

function getFormat (target: any, propertyKey: string) {
    return Reflect.getMetadata(formatMetadataKey, target, propertyKey);
}

let g = new Greeter("彭海林");
console.log(g.greet());
