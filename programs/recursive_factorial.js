// Factorial using recursion.
// Example: 5! = 5 * 4 * 3 * 2 * 1 = 120.
function factorial(number) {
  if (number < 0) {
    return null;
  }

  if (number === 0 || number === 1) {
    return 1;
  }

  return number * factorial(number - 1);
}

console.log(factorial(5));
console.log(factorial(0));

// Output:
// 120
// 1
