import {faker} from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create a user
  const user = await prisma.user.create({
    data: {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      passwordHash: faker.internet.password(),
    },
  });

  // Create ingredients
  for (let i = 0; i < 10; i++) {
    await prisma.ingredient.create({
      data: {
        name: faker.commerce.productName(),
        quantity: faker.number.int({min: 1, max: 10}).toString(),
        userId: user.id,
      },
    });
  }

  // Create recipes and associate them with the user
  for (let i = 0; i < 3; i++) {
    const recipe = await prisma.recipe.create({
      data: {
        title: faker.lorem.words(),
        description: faker.lorem.paragraph(),
        userId: user.id,
      },
    });

    // For each recipe, associate some ingredients (for simplicity, using the same ingredients)
    for (let j = 0; j < 3; j++) {
      await prisma.recipeIngredient.create({
        data: {
          recipeId: recipe.id,
          ingredientId: (j + 1).toString(), // assuming ingredient IDs are 1 through 10
          quantity: faker.number.int({min: 1, max: 5}).toString(),
        },
      });
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
