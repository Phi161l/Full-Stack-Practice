// export function getUserByEmail(email) {
//   return mockUsers.find(u => u.email === email);
// }

// // Somewhere else
// getUserByEmail("abc"); // ❌ TypeScript error at compile time

// const arr = Array.from( {length: 15}).fill(9);
// console.log(arr)

// Array.from({ length: 5 }).map((_, i) => {
//   console.log(i)
//  })


// const u = { id: "2", email: "user@example.com", role: "user" };
// console.log(u);

// const role = "admin";

// const chnaged = { ...u, role };
// console.log(chnaged);



const obj = {
    a: "1",
    b: "2",
    c: "3"
}

console.log(obj)

const d = "4"
const a = "248w95"
const obj2 = {...obj, a, d }
console.log(obj2)