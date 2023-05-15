import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Order } from '@food-shop-architecture-workshop/core/model';

export const StatsActions = createActionGroup({
  source: 'Orders stats',
  events: {
    'Load stats': emptyProps(),
    'Load stats success': props<{ orders: Array<Order> }>(),
    'Load stats failed': props<{ errorMessage: string }>()
  }
});
