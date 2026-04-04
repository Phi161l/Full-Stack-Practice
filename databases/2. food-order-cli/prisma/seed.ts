import { PrismaClient } from "./generated/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

export const prisma = new PrismaClient({ adapter });

async function main() {
  const foods = [
    { name: "Pizza", price: 10.5 },
    { name: "Burger", price: 7 },
    { name: "Sushi", price: 15 }
  ];

  for (const food of foods) {
    await prisma.food.create({ data: food });
  }

  console.log("Foods seeded!");
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());