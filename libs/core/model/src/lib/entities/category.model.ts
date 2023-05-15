import { ProductType } from '@food-shop-architecture-workshop/core/model';

export interface CategorySummary {
  name: string;
  image: string;
  type: ProductType;
}
