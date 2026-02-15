// // 1. SSR: Server-Side Rendering example with pure express
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  const name = "Ibrahim";       // dynamic value rendered on the server. could come form the server
  res.setHeader("Content-Type", "text/html");
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>My SSR Page</title>
        <style>
          body { font-family: sans-serif; padding: 20px; }
          h1 { color: darkblue; }
        </style>
      </head>
      <body>
        <h1>Hello, ${name}!</h1>
        <p>This content is rendered on the server before sending to the browser.</p>
      </body>
    </html>
  `);
});

// Start the server
const PORT = 3003;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));









// // 2. CSR: Client-Side Rendering example with pure express

// const express = require("express");
// const app = express();
// const PORT = 3000;

// // Serve static frontend (HTML/JS/CSS)
// app.get("/", (req, res) => {
//   res.send(`
//     <html>
//       <head>
//         <title>Fullstack Demo</title>
//       </head>
//       <body>
//         <h1>Welcome!</h1>
//         <button id="btn">Get Data</button>
//         <div id="data"></div>

//         <script>
//           const btn = document.getElementById("btn");
//           const dataDiv = document.getElementById("data");

//           btn.addEventListener("click", async () => {
//             const response = await fetch("/api/message");
//             const data = await response.json();
//             dataDiv.textContent = data.msg;
//           });
//         </script>
//       </body>
//     </html>
//   `);
// });

// // Backend API
// app.get("/api/message", (req, res) => {
//   res.json({ msg: "Hello from backend!" });
// });

// // Start server
// app.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });
