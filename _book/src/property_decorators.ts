import "reflect-metadata";

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
