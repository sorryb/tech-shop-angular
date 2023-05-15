import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Order, OrderStatus } from '@food-shop-architecture-workshop/core/model';


export const OrdersEntityAdapterActions = createActionGroup({
  source: 'Orders Entity Adapter',
  events: {
    'Load orders': emptyProps(),
    'Load orders success': props<{ orders: Order[] }>(),
    'Load orders failed': props<{ errorMessage: string }>(),
    'Update order': props<{ orderId: string, orderStatus: OrderStatus }>(),
    'Update order success': props<{ order: Order }>(),
    'Update order failed': props<{ errorMessage: string }>(),
    'Update order filter': props<{ orderFilter: OrderStatus }>(),
    'Set filter by order status': props<{ orderStatus: OrderStatus | undefined }>()
  }
});
