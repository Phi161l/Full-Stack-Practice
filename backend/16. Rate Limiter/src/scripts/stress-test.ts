const URL = "http://localhost:3000/login";

async function run() {
  for (let i = 1; i <= 10; i++) {
    const response = await fetch(URL);

    console.log(`Request ${i}: ${response.status} ${response.statusText}`);
  }
}

run().catch(console.error);
