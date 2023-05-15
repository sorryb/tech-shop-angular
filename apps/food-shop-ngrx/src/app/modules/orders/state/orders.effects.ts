import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { OrdersState } from './orders-state.model';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { OrdersApiService } from '@food-shop-architecture-workshop/core/services/api-service';
import { OrdersActions } from './orders.actions';
import { catchError, map, of, switchMap } from 'rxjs';


@Injectable()
export class OrdersEffects {

  loadOrders$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(OrdersActions.loadOrders),
      switchMap(() => {
        return this.ordersApiService.loadOrders().pipe(
          map(orders => OrdersActions.loadOrdersSuccess({ orders })),
          catchError(err => {
            return of(OrdersActions.loadOrdersFailed);
          })
        );
      })
    );
  });

  loadOrderDetails = createEffect(() => {
    return this.actions$.pipe(
      ofType(OrdersActions.loadOrderDetails),
      switchMap(({ orderId }) => {
        return this.ordersApiService.loadOrderById(orderId).pipe(
          map(order => OrdersActions.loadOrderDetailsSuccess({ order })),
          catchError(err => of(OrdersActions.loadOrderDetailsFailed({ errorMessage: 'Something went wrong' })))
        );
      })
    );
  });


  constructor(private store: Store<OrdersState>, private actions$: Actions, private ordersApiService: OrdersApiService) {
  }

}
