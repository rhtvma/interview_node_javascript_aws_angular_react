/*
Problem:
Group strings that are anagrams of each other.

Sample:
Input: strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
Output: [["eat", "tea", "ate"], ["tan", "nat"], ["bat"]]

Input: strs = [""]
Output: [[""]]

Solution:
Use the sorted characters of each word as the hash key.

Time: O(n * k log k)
Space: O(n * k)
*/

function groupAnagrams(strs) {
  const groups = new Map();

  for (const str of strs) {
    const key = str.split("").sort().join("");

    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(str);
  }

  return Array.from(groups.values());
}

/*
Explanation:
Anagrams have the same letters in different orders. Sorting the letters creates
the same key for every word in an anagram group.
*/

