const data = {
  employees: {
    employee1: {
      id: "1",
      firstName: "Tom",
      lastName: "Cruise",
      address: {
        street: "",
      },
    },
  },
};

// Return every nested key from an object.
// Interview point: recursion is useful when the depth of the object is unknown.
const findKeys = (input, keys = []) => {
  for (const key in input) {
    if (!Object.prototype.hasOwnProperty.call(input, key)) {
      continue;
    }

    keys.push(key);

    if (
      typeof input[key] === "object" &&
      input[key] !== null &&
      !Array.isArray(input[key])
    ) {
      findKeys(input[key], keys);
    }
  }

  return keys;
};

console.log(findKeys(data));

// Output:
// [ 'employees', 'employee1', 'id', 'firstName', 'lastName', 'address', 'street' ]
