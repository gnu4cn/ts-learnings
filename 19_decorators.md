# 装饰器

**Decorators**

## 简介

随着TypeScript及ES6中类的引入，就有了一些需要对类与类的成员进行批注与修改等额外特性的场景（With the introduction of Classes in TypeScript and ES6, there now exist certain scennarios that require additional features to support annotating or modifying classes and class members）。装饰器这一特性，就提供了一种将类声明与成员的批注与元编程语法加入进来的方式。装饰器特性，是一项JavaScript的[第二阶段提议](https://github.com/tc39/proposal-decorators)，且是TypeScript的一项实验特性。

> 注意：装饰器是一项实验特性，在以后的版本发布中可能改变。

要开启装饰器的实验性支持，就必须在命令行或`tsconfig.json`中开启编译器的`experimentalDecorators`选项：

**命令行**：

```bash
tsc --target ES5 --experimentalDecorators
```

**tsconfig.json**

```json
{
    "compilerOptions": {
        "target": "ES5",
        "experimentalDecorators": true
    }
}
```

## 关于装饰器（Decorators）

*装饰器* 是一类特殊的声明，可被附加到[类的声明](#class-decorators)、[方法](#method-decorators)、[访问器](#accessor-decorators)、[属性](#property-decorators)或者[参数](#parameter-decorators)。装饰器采用`@expression`形式，其中的`expression`求值后必须是一个函数，在运行时该函数将以被装饰的声明有关的信息，被调用到（Decorators use the form `@expression`, where `expression` must evaluate to a function that will be called at runtime with information about the decorated declaration）。

比如，对于给定的装饰器`@sealed`，那么就可能向下面这样写该`sealed`函数：

```typescript
function sealed(target) {
    // ... 对`target`进行一些操作 ...
}
```

> 注意：在下面的[类装饰器](#class-decorators)中，可以看到更详细的示例

### 装饰器工厂（Decorator Factories）
<a href="decorator-factories"></a>

可通过编写一个装饰器工厂，来对装饰器作用于声明的方式进行定制。 *装饰器工厂* 就是一个返回由装饰器在运行时调用的表达式的函数（If you want to customize how a decorator is applied to a declaration, we can write a decorator factory. A *Decorator Factory* is simply a function that returns the expression that will be called by the decorator at runtime）。

可以下面的形式，来编写一个装饰器工厂：

```typescript
function color (value: string) { // 这是装饰器工厂
    return function (target) { // 这是装饰器
        // 以`target`与`value`来完成一些操作
    }
}
```

> 注意，在下面的[方法装饰器](#method-decorators)部分，可见到装饰工厂的更详细示例。

### 装饰器的复合（Decorator Composition）

对某个声明，可应用多个装饰器，如下面的示例中那样：

+ 在同一行：

    ```typescript
    @f @g x
    ```

+ 在多行上：
    
    ```typescript
    @f
    @g
    x
    ```

当有多个装饰器应用到单个声明时，它们的执行与[数学中的复合函数](http://en.wikipedia.org/wiki/Function_composition)类似。在这个模型中，当将`f`与`g`进行复合时，`(f∘ g)(x)`复合结果与`f(g(x))`等价。

因此，TypeScript中在对单一声明上的多个装饰器进行执行时，将完成以下步骤：

1. 各个装饰器的表达式将自顶向下执行。

2. 随后的结果作为函数被自底向上进行调用。

当使用了[装饰器工厂](#decorator-factories)，就可以在下面的示例中观察到这种执行顺序：

```typescript
function f() {
    console.log("f(): evaluated");

    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("f(): called");
    }
}

function g() {
    console.log("g(): evaluated");

    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("g(): called");
    }
}

class C {
    @f()
    @g()
    method() {}
}
```

其将把下面的输出打印到控制台：

```bash
f(): evaluated
g(): evaluated
g(): called
f(): called
```

### 装饰器求值（Decorator Evaluation）

对于将装饰器如何应用到类内部的各种声明，有着以下可遵循的定义良好的顺序：

1. 对于各个实例成员， *参数装饰器*，接着分别是 *方法*、*访问器* 或者 *属性装饰器* 将被应用（ *Parameter Decorators*, followed by *Method*, *Accessor*, or *Property Decorators* are applied for each instance member）。

2. 对于各个静态成员， *参数装饰器*，接着分别是 *方法*、*访问器* 或者 *属性装饰器* 将被应用（ *Parameter Decorators*, followed by *Method*, *Accessor*, or *Property Decorators* are applied for each static member）。

3. 对于构造器，将应用参数装饰器（ *Parameter Decorators* are applied for the constructor）。

4. 对于类，将应用 *类装饰器* （ *Class Decorators* are applied for the class ）。

### 类装饰器

*类装饰器* 是在类声明之前、紧接着类声明处使用的。类声明作用与类的构造器，而可用于对类的定义进行观察、修改或替换。类装饰器不能在声明文件，或任何其它外围上下文中使用（比如在某个`declare`类上。The class decorator is applied to the constructor of the class and can be used to observe, modify or replace a class definition. A class decorator cannot be used in a declaration file, or in any other ambient context(such as on a `declare` class)）。

> 什么是TypeScript的外围上下文（ambient context, 有的翻译为“已有环境”）?
    > 
    >

类装饰器的表达式，将被作为一个函数，在运行时以被装饰的类的构造器函数，作为唯一参数而被调用。

> **注意** 应注意返回一个新的构造器函数，因为必须注意维护好原来的原型。运行时对装饰器的应用这一逻辑，并不会做这件事（Should you chose to return a new constructor function, you must take care to maintain the original prototype. The logic that applies decorators at runtime will not do this for you）。

下面是一个应用到`Greeter`类的类装饰器（`@sealed`）的示例：

```typescript
@sealed
class Greeter {
    greeting: string;

    constructor(message: string) {
        this.greeting = message;
    }

    greeter () {
        return `Hello, { this.greeting }`;
    }
}
```

可将`@sealed`装饰器定义为使用下面的函数声明：

```typescript
function sealed(constructor: Function) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}
```

在`@sealed`装饰器（于运行时）被执行后，它将同时封闭构造器及其原型。

接着的是一个如何覆写构造器的示例：

```typescript
function classDecorator<T extends {new( ...args: any[] ): {}}>(constructor: T) {
    return class extends constructor {
        newProperty = "new property";
        hello = "override";
    }
}

@classDecorator
class Greeter {
    property = "property";
    hello: string;

    constructor(m: string) {
        this.hello = m;
    }
}

console.log(new Greeter("world"));
```

### 方法装饰器（Method Decorators）

*方法装饰器* 是在某个方法声明之前、紧接着该方法处使用的。此种装饰器被应用到方法的 *属性描述符* ，而可用于对方法定义进行观察、修改或替换。不能在定义文件、过载或任何其它已有上下文中（比如某个`declare`类中）使用方法装饰器（The decorator is applied to the *Property Descriptor* for the method, and can be used to observe, modify, or replace a method definition. A method decorator cannot be used in a declaration file, on an overload, or in any other ambient context(such as in a `declare` class)）。

方法装饰器的表达式，将在运行时作为函数，以下面的三个参数进行调用：

1. 静态成员的类构造函数，或实例成员的类的原型（Either the constructor function of the class for a static member, or the prototype of the class for an instance member, ）。

> 关于静态成员与实例成员的区别：

> 前面所说的都是对于类的实例成员，在实例化后的对象才会起作用。可以使用static定义类中的静态成员，所有实例可以使用this中的名称来访问静态成员。 
> [TypeScript笔记](http://yrq110.me/2018/01/06/20180106-typescript-note/)

2. 成员的名称。

3. 成员的 *属性描述符*。

>  **注意** 在低于ES5的目标脚本中， *成员描述符* 将为 `undefined`。

在方法装饰器有返回值时，其将作为该方法的 *属性描述符*。

> **注意** 在目标脚本低于ES5版本中，该返回值将被忽略。

下面是一个应用到`Greeter`类的方法装饰器（`@enumerable`）的示例：

```typescript
function enumerable (value: boolean) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        descriptor.enumerable = value;
    }
}

class Greeter {
    greeting: string;

    constructor (m: string) {
        this.greeting = m;
    }

    @enumerable(false)
    greet () {
        return `Hello, ${ this.greeting }`;
    }
}

let g = new Greeter("world");
console.log(g.greet());
```

这里的`@enumerable(false)`装饰器是一个装饰器工厂。在`@enumerable(false)`装饰器被调用时，其就对属性描述符的`enumberable`属性，进行修改。

### 访问器装饰器（Accessor Decorators）

*访问器装饰器* 是在紧接着某个访问器声明之前进行声明的。访问器装饰器是应用到该访问器的 *属性描述符（the Property Descriptor）* 上的，且可用于对某个访问器的定义进行观察、修改或替换。在定义文件、或其他任何外围上下文（比如某个`declare`的类）中，都不能使用访问器的装饰器。

> **注意** 对与单个成员，TypeScript是不允许对其`get`或`set`访问器进行装饰的。而是该成员的所有装饰器，都必须应用到按文档顺序所指定的第一个访问器（TypeScript disallows decorating both the `get` and `set` accessor for a single member. Instead, all decorators for the member must be applied to the first accessor specified in document order）。这是因为应用到 *熟悉描述符* 的那些结合了`get`与`set`访问器的装饰器，并不是各自单独声明的。

访问器装饰器的表达式，在运行时将作为函数得以调用，有着以下三个参数：

1. 对于静态成员，类的构造函数；或对于实例成员，那就就是类的原型

2. 该成员的名称

3. 该成员的 *属性描述符*

在访问器装饰器返回一个值时，该值将作为成员的 *属性描述符* 得以使用。

> **注意** 在低于`ES5`的目标脚本下，该返回值将被忽略。

下面是一个应用到`Point`类的某个成员上的访问器修饰器`@configurable`的示例：

```typescript
Class Point {
    private _x: number;
    private _y: number;

    constructor (x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    @configurable (false)
    get x() { return this._x; }

    @configurable (false)
    get y() { return this._y; }
}
```

使用以下的函数声明，可定义出该`@configurable`装饰器：

```typescript
function configurable (value: boolean) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        descriptor.configurable = value;    
    }
}
```


### 属性装饰器（Property Decorators）

*属性装饰器* 是紧接着某个属性声明之前进行声明的。在声明文件中，以及任何其他外围上下文（比如在某个`declare`类中），都不能使用属性装饰器。

属性装饰器的表达式，将在运行时作为函数进行调用，有着以下两个参数：

1. 某个静态成员的类构造函数，或某个实例成员的类的原型；

2. 该成员的名称。

> **注意** 由于在TypeScript中属性装饰器初始化方式的原因，将不会把 *属性描述符* 提供给属性装饰器。这是因为在定义某个原型的成员时，目前还没有对实例属性进行描述的机制，同时也没有对某个属性的初始化器进行观察与修改的途径。由于上述原因，属性装饰器的返回值也被加以忽略了。那么属性装饰器就只能用于已声明为某个类的、某个指定名称的属性进行观察了。

有了这些信息，就可以记录有关该属性的元数据了，如下面的示例：

```typescript
class Greeter {
    @format("Hello, %s")
    greeting: string;

    constructor (message: string) {
        this.greeting = message;
    }

    greet () {
        let formatString = getFormat(this, "greeting");
        return formatString.replace(""%s", this.greeting);
    }
}
```

此时就可以使用下的函数声明，来定义该`@format`装饰器与`getFormat`函数：

```typescript
import "reflect-metadata";

// const formatMetadataKey = Symbol("format");
// const formatMetadataKey: Symbol;
//
// 上面两种写法都不行，估计是新版本的typescript已经不支持 Symbol 类型变量的初始化了
let formatMetadataKey: Symbol;

function format (formatMetadataKey: string) {
    return Reflect.metadata(formatMetadataKey, formatString);
}

function getFormat (target: any, propertyKey: string) {
    return Reflect.getMetadata(formatMetadataKey, target, propertyKey);
}
```

这里的装饰器 `@format("Hello, %s")`是一个 [装饰器工厂](#decorator-factories)
