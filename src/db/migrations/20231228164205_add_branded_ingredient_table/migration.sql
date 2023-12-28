-- CreateTable
CREATE TABLE "BrandedIngredient" (
    "id" TEXT NOT NULL,
    "api_id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "brand_name" TEXT NOT NULL,
    "brand_owner" TEXT NOT NULL,
    "gtin_upc" TEXT NOT NULL,
    "package_weight" TEXT NOT NULL,
    "serving_size_unit" TEXT NOT NULL,
    "serving_size" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "BrandedIngredient_pkey" PRIMARY KEY ("id")
);
