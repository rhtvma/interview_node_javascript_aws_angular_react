/************************************************************************
 * Frequency Counter - validAnagram
 *
 * Given two strings, write a function to determine if the second string is an anagram of the first.
 * An anagram is a word, phrase, or name formed by rearragning the letters of another,
 * such as cinema, formed from iceman.
 *
 * example:
 * validGram('car', 'arc') // true
 * validGram('', '') // true
 * validGram('rat', 'car') // false
 * validGram('awesome', 'awesom') // false
 *************************************************************************/

function validAnagram(string1, string2) {
  if (string1.length !== string2.length) {
    return false;
  }

  let string1Obj = {};
  let string2Obj = {};

  for (let char of string1) {
    string1Obj[char] = (string1Obj[char] || 0) + 1;
  }
  for (let char of string2) {
    string2Obj[char] = (string2Obj[char] || 0) + 1;
  }
  console.log(string1Obj, string2Obj);

  for (let key in string1Obj) {
    if (string2Obj[key] !== string1Obj[key]) {
      return false;
    }
  }
  return true;
}

console.log(validAnagram("car", "car"));

/************************************************************************
 * Solution 2
 * - Will remove third loop from solution 1
 *************************************************************************/

function validAnagramRefactored(string1, string2) {
  if (string1.length !== string2.length) {
    return false;
  }

  let string1Obj = {};

  for (let char of string1) {
    string1Obj[char] ? (string1Obj[char] += 1) : (string1Obj[char] = 1);
  }

  for (let char of string2) {
    if (!string1Obj[char]) {
      return false;
    } else {
      string1Obj[char] -= 1;
    }
  }

  return true;
}

console.log(validAnagramRefactored("car1", "c1ar"));
