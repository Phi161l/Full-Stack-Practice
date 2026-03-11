import pkg from "pg";        // ES6 import
const { Client } = pkg;      // destructure Client from pg

// PostgreSQL connection configuration
const client = new Client({
  host: "localhost",
  port: 5432,
  user: "testuser",
  password: "testpass",
  database: "mydb"
});

async function main() {
  try {

    // Connect to PostgreSQL
    await client.connect();
    console.log("✅ Connected to PostgreSQL server");

    // Create table if not exists
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        age INT NOT NULL
      )
    `);
    console.log("✅ Table created / exists");

    // Insert a row
    await client.query(`
      INSERT INTO users (name, age)
      VALUES ('bilal', 25)
    `);
    console.log("✅ Inserted a user");

    // Query data
    const res = await client.query(`
      SELECT * FROM users WHERE age > 18
    `);

    console.log("Query results:", res.rows);

  } catch (err) {
    console.error("❌ Error:", err);
  } finally {

    // Disconnect
    await client.end();
    console.log("✅ Disconnected from PostgreSQL server");

  }
}

// Run main function
main();