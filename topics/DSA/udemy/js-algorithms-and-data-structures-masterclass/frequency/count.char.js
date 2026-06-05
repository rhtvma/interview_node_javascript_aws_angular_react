/************************************************************************
 * Write a function called string char frequency count, which accepts one string.
 * The function should return each element with its occurrence count.
 *************************************************************************/

/************************************************************************
 * Solution 1
 * - Make an object to return at the end.
 * - Loop over string, for each char
 * - Return Object at end
 *************************************************************************/
function charCount(str) {
  let result = {};
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (result[char] > 0) {
      result[char]++;
    } else {
      result[char] = 1;
    }
  }
  return result;
}

console.log(charCount("Hello faa!"));
/*************************************************************************
 * Output
 * { H: 1, e: 1, l: 2, o: 1, ' ': 1, f: 1, a: 2, '!': 1 }
 *
 * Note: It includes special characters and spaces.
 *************************************************************************/

/************************************************************************
 * Solution 2 : Without special char.
 * - Make an object to return at the end.
 * - Loop over string, for each char
 * - Check if char is alphanumeric or not
 * - if char is already in object then increment counter
 * - Return Object at end
 *************************************************************************/
function charCountRegex(str) {
  let result = {};
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (/[a-zA-Z0-9]/.test(char)) {
      if (result[char] > 0) {
        result[char]++;
      } else {
        result[char] = 1;
      }
    }
  }
  return result;
}

console.log(charCountRegex("Hello faa!"));
/*************************************************************************
 * Output
 * { H: 1, e: 1, l: 2, o: 1, f: 1, a: 2 }
 *
 * Note: It removes special characters and spaces.
 * Regex can be slower for very large inputs.
 *************************************************************************/

/************************************************************************
 * Solution 3 : Without special char.
 * - Make an object to return at the end.
 * - Loop over string, for each char
 * - Check if char is alphanumeric using a helper function.
 * - if char is already in object then increment counter
 * - Return Object at end
 *************************************************************************/
function isAlphaNumeric(char) {
  let code = char.charCodeAt(0);
  if (
    !(code > 47 && code < 58) && // Numeric (0-9)
    !(code > 64 && code < 91) && // Uppercase (A-Z)
    !(code > 96 && code < 123) // Lowercase (a-z)
  ) {
    return false;
  }
  return true;
}

function charCountBestSolution(str) {
  let result = {};
  for (let val of str) {
    const char = val.toLowerCase();
    if (isAlphaNumeric(char)) {
      if (result[char] > 0) {
        result[char]++;
      } else {
        result[char] = 1;
      }
    }
  }
  return result;
}

console.log(charCountBestSolution("Hello faa!"));
/*************************************************************************
 * Output
 * { h: 1, e: 1, l: 2, o: 1, f: 1, a: 2 }
 *
 * Note: It removes special characters and spaces.
 * This is the best solution here because it avoids regex inside the loop.
 *************************************************************************/
