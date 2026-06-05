//----------------------------------1st option without chaining---------------------------

var obj = {
    name: 'Rohit Verma',
    class: 'Computer Science',
    score: [],
    addScore(val) {
        this.score.push(val);
    },
    doTotal: function () {
        this.total = this.score.reduce((x, y) => {
            return x + y;
        }, 0);
    },
    doAverage: function () {
        this.average = this.total / this.score.length;
    }
};
obj.addScore(97);
obj.addScore(96);
obj.addScore(99);
obj.doTotal();
obj.doAverage();
console.log(obj);

//Output
// { name: 'Rohit Verma',
//   class: 'Computer Science',
//   score: [ 97, 96, 99 ],
//   addScore: [Function: addScore],
//   doTotal: [Function: doTotal],
//   doAverage: [Function: doAverage],
//   total: 292,
//   average: 97.33333333333333 
// }

//----------------------------------2nd option with chaining---------------------------

var obj = {
    name: 'Rohit Verma',
    class: 'Computer Science',
    score: [],
    addScore: function (val) {
        this.score.push(val);
        return this;
    },
    doTotal: function () {
        this.total = this.score.reduce((x, y) => {
            return x + y;
        }, 0);
        return this;
    },
    doAverage: function () {
        this.average = this.total / this.score.length;
        return this;
    }
};
obj.addScore(97).addScore(96).addScore(99).doTotal().doAverage();
console.log(obj);
