import { CategorySummary, DomainEntity, Product, ProductType } from '@food-shop-architecture-workshop/core/model';

export interface ShopState extends DomainEntity<{ categories: Array<CategorySummary>, products: Array<Product> }> {
  filter: ProductType | undefined;
  ordersTotalCount: DomainEntity<number>;
}
