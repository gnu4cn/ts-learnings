# 混入

## Mixins

## 简介

自可重用组建构造出类，除了传统的面向对象层次外，还有另一种流行方式，即通过将较为简单的小部分类结合起来（along with traditional OO hierarchies, another popular way of building up classes from resuable components is to build them by combining simpler partial classes）。如熟悉 Scala 等编程语言中的 [混入](https://en.wikipedia.org/wiki/Mixin) 或 [traits](https://en.wikipedia.org/wiki/Trait_(computer_programming))特性，那么这些特性也已在 JavaScript 社区中有一些接受了。

## 混入示例

在下面的代码中，展示了在TypeScript进行混入建模的方式。接着该代码，这里将分步说明混入是如何工作的。


```typescript
// 一个名为 Disposable 的混入
class Disposable {
    isDisposable: boolean;
    dispose () {
        this.isDisposable = true;
    }
}

// 一个名为 Activatable 的混入
class Activatable {
    isActive: boolean;

    activate() {
        this.isActive = true;
    }

    deactivate() {
        this.isActive = false;
    }
}

class SmartObject implements Disposable, Activatable {
    constructor() {
        setInterval(() => {
            console.log(`${this.isActive} : ${this.isDisposable}`)
        }, 500);
    }

        interact() {
            this.activate();
        }

        // Disposable
        isDisposable: boolean = false;
        dispose: () => void;

        // Activatable
        isActive: boolean = false;
        activate: () => void;
        deactivate: () => void;
}

applyMixins(SmartObject, [Disposable, Activatable]);

let smartObj = new SmartObject();
setTimeout(() => smartObj.interact(), 1000);

function applyMixins(derivedCtor: any, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            derivedCtor.prototype[name] = baseCtor.prototype[name];
        });
    });
}
```

## 掌握该示例

该段代码一两个扮演了这里混入角色的类开始。可以看出他们各自着重于某个特定行为或功能。随后就将他们混合在了一起，从而形成了一个新的、同时有着二者功能的类。

```typescript
// 一个名为 Disposable 的混入
class Disposable {
    isDisposable: boolean;
    dispose () {
        this.isDisposable = true;
    }
}

// 一个名为 Activatable 的混入
class Activatable {
    isActive: boolean;

    activate() {
        this.isActive = true;
    }

    deactivate() {
        this.isActive = false;
    }
}
```

接着创建了将对上述两个混入进行结合的类。来更详细地看看这个新类是如何完成结合的：

```typescript
class SmartObject implements Disposable, Activatable {}
```


可能注意到的第一件事，便是这里使用了`implements`而非`extends`关键字。此做法就将两个混入类作为接口看待了，同时仅使用了`Disposable`与`Activatable`背后的类型，而非他们的实现。这就意味着在新类`SmartObject`中必须提供到实现。不过，这一点正是在使用混入特性时要避免的（This means that we'll have to provide the implementation in class. Except, that's exactly what we want to avoid by using mixins）。

为满足此要求，这里为那些将要从混入类中过来的成员，创建出了他们的起身属性及其相应类型。于是令到编译器满足于运行时这些成员可用了。虽然这样做有些重复累赘，不过确实能获得使用混入特性的好处。

```typescript
        // Disposable
        isDisposable: boolean = false;
        dispose: () => void;

        // Activatable
        isActive: boolean = false;
        activate: () => void;
        deactivate: () => void;
```

最后，将两个混入类混合到一起，创建完整的实现。

```typescript
applyMixins(SmartObject, [Disposable, Activatable]);
```

代码的最后，创建了完成混合的一个助手函数。该函数将遍历各个混入类的那些属性，并将这些属性拷贝到这些混入的目标，以这些属性的实现，将其替身属性填充起来。

```typescript
function applyMixins(derivedCtor: any, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            derivedCtor.prototype[name] = baseCtor.prototype[name];
        });
    });
}
```
