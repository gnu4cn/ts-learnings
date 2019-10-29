import { v4 as uuid } from 'uuid';

export interface Person {
    readonly id: string;
    name: string;
    gender: string;
    [propName: string]: string|number;
}

let user: Person = {
    id: uuid(),
    name: "彭海林",
    gender: 'male',
    age: 35
}

// 这里必须要对数组初始化，编译后的js才能运行
let employees: Array<Person> = []; 
employees.push(user);

employees.forEach(p => {console.log(p)});

console.log(employees);
console.log(typeof(employees));

interface Persons {
    [index: number]: Person;
}

let employers: Persons = [user];
console.log(employers);
console.log(typeof(employers));

function sum() {
    let args: IArguments = arguments;
}

let b: Boolean = new Boolean(1);
console.log(b, b.valueOf());

let e: Error = new Error("发生了错误。");
console.log(typeof(e), e.message, e.name)

let d: Date = new Date();
console.log(d, typeof(d), d.toLocaleString());

let r: RegExp = /[a-z][A-Z]/
console.log(r, typeof(r), r.test("This is a test"));

console.log(Math.pow(10, 2));
console.log(Math.E, Math.PI)

let anyArray: Array<any> = [5, 'Peng Hailin', {website: 'https:xfoss.com'}];
console.log(anyArray, typeof anyArray);
