setTimeout(() => {
  console.log("done");
}, 5000);

console.log("helooo")


const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

await sleep(5000);