import { prisma } from "./src/prisma";

async function clearDatabase() {
  try {
    console.log("Clearing all data...");

    // Order matters due to foreign key constraints
    await prisma.loan.deleteMany({});
    await prisma.bookCopy.deleteMany({});
    await prisma.book.deleteMany({});
    await prisma.user.deleteMany({});

    console.log("All tables cleared ✅");
  } catch (err) {
    console.error("Error clearing database:", err);
  } finally {
    await prisma.$disconnect();
  }
}

clearDatabase();