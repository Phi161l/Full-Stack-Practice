import pkg from "pg";
import readline from "readline";

const { Client } = pkg;

const client = new Client({
  host: "localhost",
  port: 5432,
  user: "testuser",
  password: "testpass",
  database: "mydb",
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Ask function returning a Promise
function ask(question) {
  return new Promise(function (resolve) {
    rl.question(question, (answer) => resolve(answer));
  });
}

// Main menu
async function menu() {
  console.log("\nChoose operation:");
  console.log("1. Insert user");
  console.log("2. View users");
  console.log("3. Update user age");
  console.log("4. Delete user");
  console.log("5. Exit");

  const choice = await ask("Enter choice: ");

  switch (choice) {
    case "1":
      // INSERT user with transaction & validation
      const name = await ask("Enter name: ");

      let age;
      while (true) {
        const ageInput = await ask("Enter age: ");
        age = parseInt(ageInput);
        if (!isNaN(age) && age > 0) break;
        console.log("⚠️ Please enter a valid positive number for age.");
      }

      try {
        await client.query("BEGIN");
        await client.query("INSERT INTO users(name, age) VALUES($1,$2)", [
          name,
          age,
        ]);
        await client.query("COMMIT");
        console.log("✅ User inserted (transaction committed)");
      } catch (err) {
        await client.query("ROLLBACK");
        console.log("❌ Transaction failed, rolled back:", err.message);
      }
      break;

    case "2":
      // VIEW all users
      try {
        const res = await client.query("SELECT * FROM users");
        console.table(res.rows);
      } catch (err) {
        console.log("❌ Error fetching users:", err.message);
      }
      break;

    case "3":
      // UPDATE user age with transaction & validation
      const uname = await ask("Enter name to update: ");

      let newAge;
      while (true) {
        const ageInput = await ask("Enter new age: ");
        newAge = parseInt(ageInput);
        if (!isNaN(newAge) && newAge > 0) break;
        console.log("⚠️ Please enter a valid positive number for age.");
      }

      try {
        await client.query("BEGIN");
        const result = await client.query(
          "UPDATE users SET age=$1 WHERE name=$2",
          [newAge, uname]
        );
        if (result.rowCount === 0) throw new Error("User not found");
        await client.query("COMMIT");
        console.log("✅ User updated (transaction committed)");
      } catch (err) {
        await client.query("ROLLBACK");
        console.log("❌ Transaction failed, rolled back:", err.message);
      }
      break;

    case "4":
      // DELETE user with transaction
      const delName = await ask("Enter name to delete: ");

      try {
        await client.query("BEGIN");
        const result = await client.query(
          "DELETE FROM users WHERE name=$1",
          [delName]
        );
        if (result.rowCount === 0) throw new Error("User not found");
        await client.query("COMMIT");
        console.log("✅ User deleted (transaction committed)");
      } catch (err) {
        await client.query("ROLLBACK");
        console.log("❌ Transaction failed, rolled back:", err.message);
      }
      break;

    case "5":
      console.log("Goodbye!");
      rl.close();
      await client.end();
      process.exit();

    default:
      console.log("⚠️ Invalid option");
  }

  menu(); // Loop menu again
}

// Main function
async function main() {
  try {
    await client.connect();
    await client.query(`
      CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        age INT NOT NULL
      )
    `);

    menu();
  } catch (err) {
    console.log("❌ Error initializing app:", err.message);
    rl.close();
    await client.end();
  }
}

main();