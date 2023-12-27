/*
  Warnings:

  - You are about to drop the column `apiId` on the `Ingredient` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `ingredientId` on the `pantry_ingredient` table. All the data in the column will be lost.
  - Added the required column `api_id` to the `Ingredient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ingredient_id` to the `pantry_ingredient` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "pantry_ingredient" DROP CONSTRAINT "pantry_ingredient_ingredientId_fkey";

-- AlterTable
ALTER TABLE "Ingredient" DROP COLUMN "apiId",
ADD COLUMN     "api_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "pantry_ingredient" DROP COLUMN "ingredientId",
ADD COLUMN     "ingredient_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "pantry_ingredient" ADD CONSTRAINT "pantry_ingredient_ingredient_id_fkey" FOREIGN KEY ("ingredient_id") REFERENCES "Ingredient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
