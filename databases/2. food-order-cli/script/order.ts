import "dotenv/config";
import { PrismaClient } from "../prisma/generated/client";
import { PrismaPg } from "@prisma/adapter-pg";
import readlineSync from "readline-sync";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

export const prisma = new PrismaClient({ adapter });

async function main() {
  const foods = await prisma.food.findMany();
  console.log("Available foods:");
  foods.forEach(f => console.log(`${f.id}: ${f.name} - $${f.price}`));

  const name = readlineSync.question("Your name: ");
  const foodId = parseInt(readlineSync.question("Enter food ID to order: "));

  // check if user exists (using findFirst since name may not be @unique)
  let user = await prisma.user.findFirst({ where: { name } });
  if (!user) {
    user = await prisma.user.create({ data: { name } });
  }

  // create order
  const order = await prisma.order.create({
    data: { userId: user.id, foodId }
  });

  console.log(`Order created! ID: ${order.id}, Food: ${foodId}, User: ${user.name}`);
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
