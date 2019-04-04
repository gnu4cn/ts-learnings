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
