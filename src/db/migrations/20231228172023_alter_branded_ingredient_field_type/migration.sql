/*
  Warnings:

  - Changed the type of `gtin_upc` on the `BrandedIngredient` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "BrandedIngredient" DROP COLUMN "gtin_upc",
ADD COLUMN     "gtin_upc" INTEGER NOT NULL;
