/*
Problem:
Convert an integer to its Roman numeral representation.

Sample:
Input: num = 1994
Output: "MCMXCIV"

Input: num = 58
Output: "LVIII"

Solution:
Greedily subtract the largest possible Roman value until the number becomes 0.

Time: O(1)
Space: O(1)
*/

function intToRoman(num) {
  const values = [
    [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"],
    [100, "C"], [90, "XC"], [50, "L"], [40, "XL"],
    [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]
  ];

  let result = "";

  for (const [value, symbol] of values) {
    while (num >= value) {
      result += symbol;
      num -= value;
    }
  }

  return result;
}

/*
Explanation:
Including subtractive cases like 900 and 4 in the table lets the greedy method
build a valid Roman numeral directly.
*/
