import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Product } from '@food-shop-architecture-workshop/core/model';

export const FavoriteActions = createActionGroup({
  source: 'Favorite',
  events: {
    'Add product': props<{ product: Product }>(),
    'Remove product': props<{ productId: number | string }>(),
    'Remove all products': emptyProps()
  }

});
