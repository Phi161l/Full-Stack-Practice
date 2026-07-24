// const URL = "http://localhost:3000/login";

// async function run() {
//   for (let i = 1; i <= 10; i++) {
//     const response = await fetch(URL);

//     console.log(`Request ${i}: ${response.status} ${response.statusText}`);
//   }
// }

// run().catch(console.error);



const URL = "http://localhost:3000/login";

async function run() {
  for (let i = 1; i <= 5; i++) {
    const response = await fetch(URL, {
      headers: {
        "x-user-id": "42",
      },
    });

    console.log(`User 42 -> ${response.status}`);
  }

  console.log("----------------");

  for (let i = 1; i <= 5; i++) {
    const response = await fetch(URL, {
      headers: {
        "x-user-id": "99",
      },
    });

    console.log(`User 99 -> ${response.status}`);
  }
}

run().catch(console.error);
