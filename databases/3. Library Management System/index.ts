import "dotenv/config";

import { PrismaClient } from "./generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { select } from "@inquirer/prompts";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

export async function mainMenu() {
  const action = await select({
    message: "Select an action",
    choices: [
      { name: "List Users", value: "List Users" },
      { name: "List Books", value: "List Books" },
      { name: "Borrow Book", value: "Borrow Book" },
      { name: "Return Book", value: "Return Book" },
      { name: "Exit", value: "Exit" },
    ],
  });

  switch (action) {
    case "List Users":
      await listUsers();
      break;
    case "List Books":
      await listBooks();
      break;
    case "Borrow Book":
      await borrowBook();
      break;
    case "Return Book":
      await returnBook();
      break;
    case "Exit":
      await prisma.$disconnect();
      process.exit(0);
  }

  await mainMenu();
}

export async function listUsers() {
  const users = await prisma.user.findMany();
  console.table(users);
}

export async function listBooks() {
  const books = await prisma.book.findMany({
    include: { copies: true },
  });

  console.table(books);
}

export async function borrowBook() {
  const users = await prisma.user.findMany();
  const books = await prisma.book.findMany();

  const userId = await select({
    message: "Select User",
    choices: users.map((u) => ({
      name: u.name,
      value: u.id,
    })),
  });

  const bookId = await select({
    message: "Select Book",
    choices: books.map((b) => ({
      name: b.title,
      value: b.id,
    })),
  });

  const availableCopy = await prisma.bookCopy.findFirst({
    where: {
      bookId,
      loans: {
        every: { returnDate: { not: null } }, 
      },
    },
  });

  if (!availableCopy) {
    console.log("No copies available!");
    return;
  }

  await prisma.loan.create({
    data: {
      userId,
      bookCopyId: availableCopy.id,
      borrowDate: new Date(),
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  console.log(`Book borrowed successfully! Copy ID: ${availableCopy.id}`);
}

export async function returnBook() {
  const users = await prisma.user.findMany();

  const userId = await select({
    message: "Select User",
    choices: users.map((u) => ({
      name: u.name,
      value: u.id,
    })),
  });

  const activeLoans = await prisma.loan.findMany({
    where: {
      userId,
      returnDate: null,
    },
    include: {
      bookCopy: {
        include: {
          book: true,
        },
      },
    },
  });

  if (activeLoans.length === 0) {
    console.log("No active loans for this user!");
    return;
  }

  const loanId = await select({
    message: "Select Loan to Return",
    choices: activeLoans.map((l) => ({
      name: `${l.bookCopy.book.title} (Copy ${l.bookCopy.id})`,
      value: l.id,
    })),
  });

  await prisma.loan.update({
    where: {
      id: loanId,
    },
    data: {
      returnDate: new Date(),
    },
  });

  console.log("Book returned successfully!");
}


mainMenu();