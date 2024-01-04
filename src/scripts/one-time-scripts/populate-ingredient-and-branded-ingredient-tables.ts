#!/usr/bin/env node
import { AbridgedFood } from '../../types/food-central-api';
// import { logger } from '../../logger';
import { FoodCentralApiDataManager } from '../../services/food-central-data-manager';
import { PrismaClient } from '@prisma/client';

if (require.main === module) {
  main()
    .then(() => console.info('Initial ingredient and branded ingredient data populated succuessfully.'))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}

async function main(): Promise<void> {
  const foodCentralApiDataManager = new FoodCentralApiDataManager();

  const apiUrl = `https://api.nal.usda.gov/fdc/v1/foods/list?api_key=${process.env.USDA_DATA_API_KEY}`;

  const foundationFoods = await fetch(`${apiUrl}&dataType=Foundation`)
    .then((res) => {
      console.log(res.body);
      return res.json;
    })
    .catch((err) => {
      throw new Error('Error getting foundation foods from FoodCentral API', err);
    });

  const foundationIngredients = foodCentralApiDataManager.processAbridgedFoodDataForUpsert(
    foundationFoods as unknown as AbridgedFood[]
  );

  const abridgedBrandedFoods = await fetch(`${apiUrl}&dataType=Branded`)
    .then((res) => res.json)
    .catch((err) => {
      throw new Error('Error getting branded foods from FoodCentral API', err);
    });

  const brandedFoods = await foodCentralApiDataManager
    .getBrandedFoodData()
    .then((brandedFoods) => {
      if (!brandedFoods) {
        throw new Error('Empty return from brandedFoods json file');
      }

      return brandedFoods;
    })
    .catch((err) => {
      throw new Error('Error getting branded foods from json file', err);
    });

  if (abridgedBrandedFoods.length !== brandedFoods.length) {
    throw new Error('Abridged branded foods and branded foods are not the same length');
  }

  const brandedIngredients = foodCentralApiDataManager.processAbridgedFoodDataForUpsert(
    abridgedBrandedFoods as unknown as AbridgedFood[]
  );

  const processedBrandedFoods = foodCentralApiDataManager.processBrandedFoodDataForUpsert(brandedFoods);

  const client = new PrismaClient();

  await client.$transaction([
    client.ingredient.createMany({
      data: [...foundationIngredients, ...brandedIngredients],
    }),
    client.brandedIngredient.createMany({
      data: processedBrandedFoods,
    }),
  ]);
}
