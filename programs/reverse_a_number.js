//reverse a number

function reverseNum(num) {
  var reverse = 0,
    reminder,
    n = num;
  while (n > 0) {
    reminder = n % 10;
    reverse = reverse * 10 + reminder;
    n = Math.floor(n / 10);
  }
  return reverse;
}

console.log(reverseNum(2121));

//output:
//  1212