const arr = [1, 2, 3];
let str = `First value ${arr[0]}`;

function f() {
    console.log(str);
    return arr.filter(el => el < 3);
}

f();
