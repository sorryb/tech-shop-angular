import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ProductOrder } from '@food-shop-architecture-workshop/core/model';


export const CartActions = createActionGroup({
  source: 'Cart',
  events: {
    'Add product': props<{ productOrder: ProductOrder }>(),
    'Add products': props<{ productOrders: Array<ProductOrder> }>(),
    'Remove product': props<{ productOrder: ProductOrder }>(),
    'Remove all products': emptyProps(),
    'Update quantity': props<{ productOrder: ProductOrder }>()

  }
});
