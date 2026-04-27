import { PrismaClient } from "../generated/prisma/client.ts";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

// Example: Create a user
const newUser = await prisma.user.create({
  data: {
    name: "Alice",
    email: "alice@prisma.io",
  },
});

// Example: Fetch all users
const users = await prisma.user.findMany();
