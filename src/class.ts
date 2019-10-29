import { v4 as uuid } from 'uuid';

abstract class Thing {
    protected id: string;
    public constructor(protected name: string) {
        this.name = name;
        this.id = uuid();
    }

    getName() {
        return this.name;
    }
    setName(name: string) {
        this.name = name;
    }

    public abstract sayHi(): string;
}

class Animal extends Thing {
    sayHi() {
        return `Hi, I am ${this.name}, ${this.id} is my ID number.`;
    }
}

let cat = new Animal('Tom');
console.log(cat.sayHi());


interface Alarm {
    alert(): void;
}

interface Light {
    lightOn(): void;
    lightOff(): void;
}

interface LightableAlarm extends Alarm {
    lightOn(): void;
    lightOff(): void;
}

class Door {
}

class SecurityDoor extends Door implements Alarm {
    alert() {
        console.log('SecurityDoor alert...');
    }
}

class Car implements LightableAlarm {
    alert() {
        console.log('Car alert...');
    }
    lightOn() {
        console.log('The light is on.');
    }
    lightOff() {
        console.log('The light is off.');
    }
}

let door = new SecurityDoor();
console.log(door);
door.alert();

let car = new Car();
console.log(car);
car.alert();
car.lightOn();
car.lightOff();

class Point {
    x: number;
    y: number;
}

interface Point3D extends Point {
    z: number;
    calc(): string;
}

class RealPoint implements Point3D {
    public constructor(public x: number, public y: number, public z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    calc() {
        let distance = Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2)); 
        return Math.round(distance).toString();
    }
}

let pointA = new RealPoint(123, -19980, 10234);

console.log(pointA, pointA.calc());
