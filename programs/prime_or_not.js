// A prime number is divisible only by itself and 1.
// Examples: 2, 3, 5, 7, 11.

function isPrime(number) {
  if (number <= 1) {
    return false;
  }

  for (var i = 2; i <= Math.sqrt(number); i++) {
    if (number % i === 0) {
      return false;
    }
  }

  return true;
}

function printPrimeResult(number) {
  console.log(
    isPrime(number)
      ? `${number} is a prime number`
      : `${number} is not a prime number`,
  );
}

printPrimeResult(12);
printPrimeResult(13);

// Output:
// 12 is not a prime number
// 13 is a prime number
