import { prisma } from "./lib/prisma";

const command = process.argv[2];

async function main() {
  if (command === "create-user") {
    const name = process.argv[3];
    const email = process.argv[4];

    const user = await prisma.user.create({
      data: { name, email },
    });

    console.log("User created:", user);
  }

  else if (command === "create-post") {
    const title = process.argv[3];
    const content = process.argv[4];
    const authorId = Number(process.argv[5]);

    const post = await prisma.post.create({
      data: { title, content, authorId },
    });

    console.log("Post created:", post);
  }

  else if (command === "list-users") {
    const users = await prisma.user.findMany({
      include: { posts: true },
    });

    console.log(JSON.stringify(users, null, 2));
  }

  else {
    console.log("Unknown command");
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });