// 1️⃣ Load .env at the very top
import 'dotenv/config';

import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

// 2️⃣ Adapter uses the correct DATABASE_URL
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL, // now guaranteed to be a string
});

const prisma = new PrismaClient({ adapter });

async function main() {
  // Create Users
  const user1 = await prisma.user.create({
    data: { name: "Alice", email: "alice@example.com" },
  });

  const user2 = await prisma.user.create({
    data: { name: "Bob", email: "bob@example.com" },
  });

  // Create Books
  const book1 = await prisma.book.create({
    data: { title: "1984", author: "George Orwell", isbn: "1234567890" },
  });

  const book2 = await prisma.book.create({
    data: { title: "Clean Code", author: "Robert C. Martin", isbn: "9876543210" },
  });

  // Create Book Copies
  await prisma.bookCopy.createMany({
    data: [
      { bookId: book1.id, copyNumber: 1 },
      { bookId: book1.id, copyNumber: 2 },
      { bookId: book2.id, copyNumber: 1 },
    ],
  });

  console.log("Seed completed!");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());