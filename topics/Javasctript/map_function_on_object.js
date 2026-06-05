var array1 = [25, 27, 50, 59, 15, 10];
var array2 = {
    "abc": [{ name: "rohit", age: 15 },
    { name: "Anuj", age: 17 },
    { name: "Som", age: 19 },
    { name: "Rai", age: 10 }],
    "xyz": [{ name: "xrohit", age: 55 },
    { name: "xAnuj", age: 57 },
    { name: "xSom", age: 59 },
    { name: "xRai", age: 50 }],
};

const map2 = Object.keys(array2).map((keyObj, iObj) => {
    return array2[keyObj].map((val, key) => {
        "use strict";
        const found = array1.indexOf(val.age) !== -1 ? true : false;
        if (found) {
            val.age = val.age + 30;
        }
        return val;
    })
});

console.log(map2);
// expected output: Array :
[[{ name: 'rohit', age: 45 },
{ name: 'Anuj', age: 17 },
{ name: 'Som', age: 19 },
{ name: 'Rai', age: 40 }],
[{ name: 'xrohit', age: 55 },
{ name: 'xAnuj', age: 57 },
{ name: 'xSom', age: 89 },
{ name: 'xRai', age: 80 }]]
