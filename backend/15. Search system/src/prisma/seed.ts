import { prisma } from "../lib/prisma.js";
import { Prisma } from "../generated/prisma/client.js";

const names = [
  "iPhone 16",
  "Samsung Galaxy S25",
  "Logitech Mouse",
  "Dell Laptop",
  "Mechanical Keyboard",
  "Gaming Monitor",
  "Office Chair",
  "USB-C Hub",
  "Wireless Earbuds",
  "Webcam",
];

const categories = ["Electronics", "Accessories", "Office"];

async function main() {
  const products: Prisma.ProductCreateManyInput[] = [];

  for (let i = 1; i <= 10000; i++) {
    const name = names[i % names.length];

    products.push({
      name: `${name} ${i}`,
      description: `Description for ${name} ${i}`,
      category: categories[i % categories.length],
      price: new Prisma.Decimal((Math.random() * 900 + 100).toFixed(2)),
    });
  }

  await prisma.product.createMany({
    data: products,
  });

  console.log("✅ Seeded 10,000 products");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
