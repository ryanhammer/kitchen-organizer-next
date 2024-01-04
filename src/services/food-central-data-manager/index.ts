import { BrandedIngredient, Ingredient } from "@prisma/client";
import { AbridgedFood, BrandedFoodJSON } from "../../types/food-central-api";
import fs from 'fs';

export class FoodCentralApiDataManager {
  public processAbridgedFoodDataForUpsert(abridgedFoodData: AbridgedFood[]): Omit<Ingredient, 'id'>[] {
    console.log(abridgedFoodData.length);
    return abridgedFoodData.map((abridgedFood: AbridgedFood) => {
      return {
        apiId: abridgedFood.fdcId,
        name: abridgedFood.description,
      };
    });
  }

  public processBrandedFoodDataForUpsert(brandedFoodData: BrandedFoodJSON[]): Omit<BrandedIngredient, 'id'>[] {
    return brandedFoodData.map((brandedFood: BrandedFoodJSON) => {
      return {
        apiId: brandedFood.fdcId,
        description: brandedFood.description,
        brandName: brandedFood.brandName || brandedFood.brandOwner,
        brandOwner: brandedFood.brandOwner,
        gtinUpc: brandedFood.gtinUpc,
        packageWeight: brandedFood.packageWeight || null,
        servingSizeUnit: brandedFood.servingSizeUnit,
        servingSize: brandedFood.servingSize,
      };
    });
  }

  public async getBrandedFoodData(): Promise<BrandedFoodJSON[] | undefined> {
    const filePath = '../../../assets/data/brandedDownload.json';
    let brandedFoodData;
    
    await fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) throw err;

      const parsedData: {brandedFoods: BrandedFoodJSON[]} = JSON.parse(data);

      brandedFoodData = [...parsedData.brandedFoods];
    });

    return brandedFoodData;
  }
}