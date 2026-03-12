import pkg from "pg";
import readline from "readline";

const { Client } = pkg;

const client = new Client({
  host: "localhost",
  port: 5432,
  user: "testuser",
  password: "testpass",
  database: "mydb"
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(question) {
  return new Promise(resolve => rl.question(question, resolve));
}

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
      const name = await ask("Enter name: ");
      const age = await ask("Enter age: ");

      await client.query(
        "INSERT INTO users(name, age) VALUES($1,$2)",
        [name, age]
      );

      console.log("✅ User inserted");
      break;

    case "2":
      const res = await client.query("SELECT * FROM users");
      console.table(res.rows);
      break;

    case "3":
      const uname = await ask("Enter name to update: ");
      const newAge = await ask("Enter new age: ");

      await client.query(
        "UPDATE users SET age=$1 WHERE name=$2",
        [newAge, uname]
      );

      console.log("✅ User updated");
      break;

    case "4":
      const delName = await ask("Enter name to delete: ");

      await client.query(
        "DELETE FROM users WHERE name=$1",
        [delName]
      );

      console.log("✅ User deleted");
      break;

    case "5":
      console.log("Goodbye");
      rl.close();
      await client.end();
      process.exit();

    default:
      console.log("Invalid option");
  }

  menu(); // show menu again
}

async function main() {

  await client.connect();

  await client.query(`
    CREATE TABLE IF NOT EXISTS users(
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      age INT NOT NULL
    )
  `);

  menu();
}

main();