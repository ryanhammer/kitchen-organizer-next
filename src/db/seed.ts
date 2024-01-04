import { faker } from '@faker-js/faker';
import { Ingredient, PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const password = process.env.DEV_USER_PASSWORD || '<PASSWORD>';

  const hashedPassword = await bcrypt.hash('racheliscool', 10);

  const user = await prisma.user.create({
    data: {
      firstName: 'Ryan',
      lastName: 'Dev',
      username: 'ryandev',
      email: 'rdev@test.com',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  const recipeOneIngredientNames = [
    'butter',
    'large egg',
    'taco seasoning',
    'shredded Cheddar cheese',
    '6 inch flour tortilla',
  ];

  const recipeTwoIngredientNames = [
    'English cucumber',
    'low-sodium soy sauce',
    'can pink salmon',
    'chile-garlic sauce',
    'light mayonnaise',
    'rice vinegar',
    'cooked white rice',
    'avocado',
    'sesame seeds',
    'chopped green onion',
  ];

  const recipeThreeIngredientNames = [
    'olive oil',
    'boneless pork chops',
    'taco seasoning',
    'ground cumin',
    'smoked paprika',
    'salt',
    'chopped onion',
    'green bell pepper',
    'cloves garlic',
    '10-ounce can diced tomatoes and green chilies',
    'chili powder',
    'ground black pepper',
    'chicken broth',
    'frozen corn',
    'zucchini',
    'uncooked rice',
    'flat-leaf parsley',
    'cilantro',
    'lime slices',
  ];

  function generateIngredientData(ingredientNames: string[]): Ingredient[] {
    return ingredientNames.map((name) => ({
      id: faker.string.uuid(),
      name: name,
      apiId: faker.number.int({ min: 10000, max: 99999 }),
    }));
  }

  const recipeOneIngredients = generateIngredientData(recipeOneIngredientNames);
  const recipeTwoIngredients = generateIngredientData(recipeTwoIngredientNames);
  const recipeThreeIngredients = generateIngredientData(recipeThreeIngredientNames);

  await prisma.ingredient.createMany({
    data: [...recipeOneIngredients, ...recipeTwoIngredients, ...recipeThreeIngredients],
  });

  // Create recipes and associate them with the user
  const recipes = faker.datatype.array(3).map(() => {
    return {
      title: faker.lorem.words(),
      description: faker.lorem.paragraph(),
      userId: user.id,
    };
  });

  await prisma.recipe.createMany({
    data: recipes,
  });

  const createdRecipes = await prisma.recipe.findMany();

  const ingredientIds = [
    recipeOneIngredients.map((ingredient) => ingredient.id),
    recipeTwoIngredients.map((ingredient) => ingredient.id),
    recipeThreeIngredients.map((ingredient) => ingredient.id),
  ];

  // For each recipe, associate some ingredients (for simplicity, using the same ingredients)
  const recipeIngredientData = [];

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < ingredientIds[i].length; j++) {
      recipeIngredientData.push({
        recipeId: createdRecipes[i].id,
        ingredientId: ingredientIds[i][j],
        quantity: faker.number.int({ min: 1, max: 5 }).toString(),
      });
    }
  }

  await prisma.recipeIngredient.createMany({
    data: recipeIngredientData,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
