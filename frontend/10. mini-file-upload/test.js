////////---------------------///////////
////// Async  practice  ////////
////////---------------------///////////

// // 1.  Creating an immediately resolved promise
const p = Promise.resolve(10);          // creates a promise that resolves with 10 immediately
console.log(p); 



// // 2. Simple promise with setTimeout
// const delayedPromise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(20); // resolves after 1 second
//   }, 1000);
// });


// delayedPromise
//   .then(value => value * 2) // multiply the resolved value by 2
//   .then(console.log)         // logs 40
//   .catch(error => console.log('Oh no ' + error.message)); // handles errors



// // 3. Async function returning nothing
// async function logNothing() {
//   console.log(5);
// }

// const res = logNothing(); // async function always returns a promise
// console.log(res); // Logs Promise { <pending> }




// // 4. Awaiting a simple promise
// const promiseHello = new Promise((res, rej) => {
//   setTimeout(() => {
//     res("hello");
//   }, 500);
// });

// async function logHello() {
//   const result = await promiseHello; // waits for promise to resolve
//   console.log(result);       // Logs "hello"
//   return result
// }

// const res = logHello().then(console.log);
// console.log(res)       // promise will be retured and will be logged first before hello with pending state. => shows the excution(thread) is not blocked. 



// // 5. Awaiting promise with try/catch
// const promise100 = new Promise((res, rej) => {
//   setTimeout(() => {
//     res(100);
//     // rej(new Error("Oops")); // uncomment to see error handling
//   }, 500);
// });

// async function logPromise() {
//   try {
//     const result = await promise100; // pauses until promise resolves
//     console.log(result);             // then Logs 100
//   } catch (error) {
//     console.log('Oh no ' + error.message); // Handles rejected promises
//   }
// }

// logPromise();
// console.log(5)    // 5 will be logged first cause the thread not block until the promised is resolved which waiting for 500 miliseconds.




// // 6. Multiple async operations in sequence
// const p1 = new Promise(res => setTimeout(() => res(1), 500));
// const p2 = new Promise(res => setTimeout(() => res(2), 300));
// const p3 = new Promise(res => setTimeout(() => res(3), 100));

// async function sequence() {
//   const r1 = await p1;
//   console.log(r1); // 1
//   const r2 = await p2;
//   console.log(r2); // 2
//   const r3 = await p3;
//   console.log(r3); // 3
// }

// sequence();         // logs 1,2,3 in order




// // 7. Multiple promises in parallel
// async function parallel() {
//   const results = await Promise.all([p1, p2, p3]); // runs all at the same time
//   console.log(results);         // [1,2,3] when all resolve
// }

// parallel();
