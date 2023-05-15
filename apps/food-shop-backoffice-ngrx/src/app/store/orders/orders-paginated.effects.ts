import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ApplicationState } from '../app-state.model';
import { OrdersPaginatedActions } from './orders-paginated.actions';
import { catchError, map, of, switchMap, take } from 'rxjs';
import { OrdersApiService } from '@food-shop-architecture-workshop/core/services/api-service';
import { getOrdersPaginationConfig } from './orders-paginated.selectors';

@Injectable()
export class OrdersPaginatedEffects {

  loadOrdersPaginated$ = createEffect(() => this.actions$.pipe(
    ofType(OrdersPaginatedActions.updateSortAndPagination),
    switchMap(() => this.store.select(getOrdersPaginationConfig).pipe(take(1))),
    switchMap((config) => {
      return this.ordersApiService.loadOrdersPaginatedAndSorted(config.pagination.pageIndex, config.pagination.pageSize, {
        active: config.sort.active,
        direction: config.sort.direction
      }).pipe(
        map(response => OrdersPaginatedActions.loadOrdersSuccess({
          orders: response.orders,
          totalCount: response.totalCount
        })),
        catchError(err => of(OrdersPaginatedActions.loadOrdersFailed({
          errorMessage: 'Something went wrong ...'
        })))
      );

    })
  ));


  constructor(private actions$: Actions, private store: Store<ApplicationState>, private ordersApiService: OrdersApiService) {
  }

}
