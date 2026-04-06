import { prisma } from "../prisma";

// USERS
export const getUsers = () => {
  return prisma.user.findMany();
};

export const createUser = (data: { name: string; email: string }) => {
  return prisma.user.create({ data });
};

// BOOKS
export const getBooks = () => {
  return prisma.book.findMany({ include: { copies: true } });
};

export const createBook = (data: any) => {
  return prisma.book.create({ data });
};

// BORROW
export const borrowBook = async (userId: number, bookId: number) => {
  const availableCopy = await prisma.bookCopy.findFirst({
    where: {
      bookId,
      loans: {
        none: { returnDate: null },
      },
    },
  });

  if (!availableCopy) {
    throw new Error("No available copies");
  }

  return prisma.loan.create({
    data: {
      userId,
      bookCopyId: availableCopy.id,
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });
};

// RETURN
export const returnBook = async (loanId: number) => {
  const loan = await prisma.loan.findUnique({
    where: { id: loanId }
  });

  if (!loan) {
    throw new Error("Loan not found");
  }

  return prisma.loan.update({
    where: { id: loanId },
    data: { returnDate: new Date() },
  });
};

// LOANS
export const getLoans = () => {
  return prisma.loan.findMany({
    include: {
      user: true,
      bookCopy: { include: { book: true } },
    },
  });
};




// const loanExample = {
//   id: 1,                        // Loan ID
//   userId: 2,                     // Who borrowed it (user ID)
//   bookCopyId: 5,                 // Which copy of the book
//   dueDate: new Date("2026-04-13"), // Due date
//   returnDate: null,              // null = not returned yet
//   user: {                        // included because of `include: { user: true }`
//     id: 2,
//     name: "Ibrahim",
//     email: "ibrahim@example.com"
//   },
//   bookCopy: {                    // included because of `include: { bookCopy: { include: { book: true } } }`
//     id: 5,
//     bookId: 1,
//     book: {
//       id: 1,
//       title: "Clean Code",
//       author: "Robert C. Martin",
//       publishedYear: 2008
//     }
//   }
// };



