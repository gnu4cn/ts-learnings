import { v4 as uuid } from 'uuid';

interface Person {
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

console.log(user.id);
