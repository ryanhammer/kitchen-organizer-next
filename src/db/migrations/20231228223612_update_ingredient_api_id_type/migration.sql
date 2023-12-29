/*
  Warnings:

  - Changed the type of `api_id` on the `BrandedIngredient` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `api_id` on the `Ingredient` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "BrandedIngredient" DROP COLUMN "api_id",
ADD COLUMN     "api_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Ingredient" DROP COLUMN "api_id",
ADD COLUMN     "api_id" INTEGER NOT NULL;
