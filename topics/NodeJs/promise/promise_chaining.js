var users = [
  {
    id: 1,
    name: "Rohit Verma",
    age: 25,
  },
  {
    id: 2,
    name: "Sunil Yadav",
    age: 25,
  },
  {
    id: 3,
    name: "Abhishek Saini",
    age: 25,
  },
  {
    id: 4,
    name: "Deep Chand",
    age: 25,
  },
  {
    id: 5,
    name: "Shubham",
    age: 25,
  },
];

var subjects = [
  {
    id: 1,
    subjects: ["Hindi", "English", "Maths", "Sanskrit"],
  },
  {
    id: 2,
    subjects: ["Hindi", "English", "Maths", "Sanskrit"],
  },
  {
    id: 3,
    subjects: ["Hindi", "English", "Sanskrit"],
  },
  {
    id: 4,
    subjects: ["Hindi", "Maths", "Sanskrit"],
  },
  {
    id: 5,
    subjects: ["Hindi", "English", "Maths", "Social Science"],
  },
];

function getUserById(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = users.find((currentUser) => currentUser.id === id);

      if (user) {
        resolve(user);
      } else {
        reject(new Error("User not found"));
      }
    }, 1000);
  });
}

function getUserSubjects(user) {
  return new Promise((resolve, reject) => {
    const subject = subjects.find(
      (currentSubject) => currentSubject.id === user.id,
    );

    if (subject) {
      resolve({ userName: user.name, subjects: subject.subjects });
    } else {
      reject(new Error("Subjects not available for user: " + user.name));
    }
  });
}

// Promise chaining: each then() returns data for the next then().
getUserById(1)
  .then((user) => getUserSubjects(user))
  .then((subjectDetails) => {
    console.log(subjectDetails);
  })
  .catch((error) => {
    console.log(error.message);
  });

// Output:
// {
//   userName: 'Rohit Verma',
//   subjects: [ 'Hindi', 'English', 'Maths', 'Sanskrit' ]
// }
