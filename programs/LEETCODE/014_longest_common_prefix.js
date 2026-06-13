/*
Problem:
Find the longest prefix shared by every string in an array.

Sample:
Input: strs = ["flower", "flow", "flight"]
Output: "fl"

Input: strs = ["dog", "racecar", "car"]
Output: ""

Solution:
Start with the first string as the candidate prefix and shrink it until every
string begins with it.

Time: O(total characters)
Space: O(1)
*/

function longestCommonPrefix(strs) {
  if (strs.length === 0) return "";

  let prefix = strs[0];

  for (let i = 1; i < strs.length; i++) {
    while (!strs[i].startsWith(prefix)) {
      prefix = prefix.slice(0, -1);
      if (prefix === "") return "";
    }
  }

  return prefix;
}

/*
Explanation:
The common prefix can only get shorter as more strings are checked. Shrinking
from the current candidate keeps the code simple and efficient enough.
*/
