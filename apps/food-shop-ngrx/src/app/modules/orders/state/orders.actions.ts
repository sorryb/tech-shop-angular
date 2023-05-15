import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Order } from '@food-shop-architecture-workshop/core/model';

export const OrdersActions = createActionGroup({
  source: 'Orders',
  events: {
    'Load orders': emptyProps(),
    'Load orders success': props<{ orders: Array<Order> }>(),
    'Load orders failed': props<{ errorMessage: string }>(),
    'Set order details': props<{ order: Order }>(),
    'Load order details': props<{ orderId: string }>(),
    'Load order details success': props<{ order: Order }>(),
    'Load order details failed': props<{ errorMessage: string }>()
  }
});
