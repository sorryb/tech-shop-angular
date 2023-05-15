import { createActionGroup, props } from '@ngrx/store';
import { Sort } from '@angular/material/sort';
import { Order } from '@food-shop-architecture-workshop/core/model';

export const OrdersPaginatedActions = createActionGroup({
  source: 'Orders',
  events: {
    'Update sort and pagination': props<{ sort: Sort, pagination: { pageIndex: number | undefined, pageSize: number | undefined } }>(),
    'Load orders success': props<{ orders: Order[], totalCount: number }>(),
    'Load orders failed': props<{ errorMessage: string }>()
  }
});
