export interface AbridgedFood {
  fdcId: number;
  description: string;
  dataType: string;
  publicationDate: string;
  ndbNumber: string;
  foodNutrients: Nutrient[];
}

interface Nutrient {
  number: string;
  name: string;
  amount: number;
  unitName: string;
  derivationCode: string;
  derivationDescription: string;
}

export interface BrandedFoodJSON {
  description: string;
  marketCountry: string;
  brandOwner: string;
  brandName?: string;
  gtinUpc: number;
  servingSize: number;
  servingSizeUnit: string;
  packageWeight?: string;
  dataType: 'Branded';
  fdcId: number;
}
