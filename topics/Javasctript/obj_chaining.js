// ---------------------------------- 1st option: without chaining ---------------------------

var studentWithoutChaining = {
  name: "Rohit Verma",
  class: "Computer Science",
  score: [],
  addScore(val) {
    this.score.push(val);
  },
  doTotal: function () {
    this.total = this.score.reduce((x, y) => x + y, 0);
  },
  doAverage: function () {
    this.average = this.total / this.score.length;
  },
};

studentWithoutChaining.addScore(97);
studentWithoutChaining.addScore(96);
studentWithoutChaining.addScore(99);
studentWithoutChaining.doTotal();
studentWithoutChaining.doAverage();
console.log(studentWithoutChaining);

// ---------------------------------- 2nd option: with chaining ---------------------------

var studentWithChaining = {
  name: "Rohit Verma",
  class: "Computer Science",
  score: [],
  addScore: function (val) {
    this.score.push(val);
    return this;
  },
  doTotal: function () {
    this.total = this.score.reduce((x, y) => x + y, 0);
    return this;
  },
  doAverage: function () {
    this.average = this.total / this.score.length;
    return this;
  },
};

studentWithChaining
  .addScore(97)
  .addScore(96)
  .addScore(99)
  .doTotal()
  .doAverage();
console.log(studentWithChaining);

// Interview point: returning this from each method allows method chaining.
