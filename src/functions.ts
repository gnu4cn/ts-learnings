function push<T>(array: Array<T>, ...items: Array<T>) {
    items.forEach(i => {
        array.push(i);
    });
}

let arrayA: Array<string> = [];
push(arrayA, '1', '2', '3', '7');
console.log(arrayA);
// [ 1, 2, 3, 'test' ]

// 为了精准表达输入为数字，输出也是数字；输入为字符串，输出也是字符串
function reverse(x: number): number;
function reverse(x: string): string;

function reverse(x: number | string): number | string {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}

console.log(reverse('This is a test.'));
console.log(reverse(2742312534));

interface SearchFunc {
    (source: string, subString?: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function(source: string, subString: string = 'as') {
    return source.search(subString) !== -1;
}
console.log(mySearch('This is a test.'));

function buildName(firstName: string, lastName: string = 'Tom') {
    return `${firstName} ${lastName}`;
}
console.log(buildName('John'));

// Type Assertion
function getLength(a: string | number): number{
    if((<string>a).length){
        return (<string>a).length;
    } else {
        return a.toString().length;
    }
}
console.log(getLength('This is a test.'));
console.log(getLength(988123035235));

function toBoolean(b: string | number): boolean {
    if((<string>b).length > 0) {
        return true;
    } else
    if(Math.abs(b as number) > 0){
        return true;
    } else return false;


}

console.log(toBoolean(-1));
console.log(toBoolean(0));

console.log(toBoolean('This is a test.'));
console.log(toBoolean(''));
