import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CategorySummary, Product, ProductType } from '@food-shop-architecture-workshop/core/model';

export const ShopActions = createActionGroup({
  source: 'Shop',
  events: {
    'Load Products and Categories': emptyProps(),
    'Load Products and Categories success': props<{ products: Array<Product>; categories: Array<CategorySummary> }>(),
    'Load Products and categories failed': props<{ errorMessage: string, errorCode: number }>(),
    'Filter Products': props<{ productType: ProductType | undefined }>(),
    'Count Orders': emptyProps(),
    'Counter Orders Success': props<{ totalOrders: number }>(),
    'Count Orders Failed': props<{ errorMessage: string }>()
  }
});

