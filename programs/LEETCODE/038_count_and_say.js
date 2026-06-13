/*
Problem:
Generate the nth term of the count-and-say sequence.

Sample:
Input: n = 4
Output: "1211"

Input: n = 1
Output: "1"

Solution:
Start from "1" and repeatedly describe consecutive runs of the previous term.

Time: O(total generated length)
Space: O(current term length)
*/

function countAndSay(n) {
  let term = "1";

  for (let step = 2; step <= n; step++) {
    let next = "";
    let count = 1;

    for (let i = 1; i <= term.length; i++) {
      if (term[i] === term[i - 1]) {
        count++;
      } else {
        next += String(count) + term[i - 1];
        count = 1;
      }
    }

    term = next;
  }

  return term;
}

/*
Explanation:
Each term is a run-length encoding of the previous term: "21" means one "2" and
one "1", which becomes "1211".
*/

