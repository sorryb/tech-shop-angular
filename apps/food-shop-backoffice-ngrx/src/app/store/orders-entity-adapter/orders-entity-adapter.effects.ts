import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ApplicationState } from '../app-state.model';
import { OrdersEntityAdapterActions } from './orders-entity-adapter.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { OrdersApiService } from '@food-shop-architecture-workshop/core/services/api-service';


@Injectable()
export class OrdersEntityAdapterEffects {

  loadOrders$ = createEffect(() => this.actions$.pipe(
    ofType(OrdersEntityAdapterActions.loadOrders),
    switchMap(() => {
      return this.ordersApiService.loadOrders().pipe(
        map(orders => OrdersEntityAdapterActions.loadOrdersSuccess({ orders })),
        catchError(err => of(OrdersEntityAdapterActions.loadOrdersFailed({ errorMessage: 'Something went wrong... Please try again' })))
      );
    })
  ));

  updateOrder$ = createEffect(() => this.actions$.pipe(
    ofType(OrdersEntityAdapterActions.updateOrder),
    switchMap(({ orderId, orderStatus }) => {
      return this.ordersApiService.updateOrderStatus2(orderId, orderStatus).pipe(
        map((order) => {
          return OrdersEntityAdapterActions.loadOrders();
          return OrdersEntityAdapterActions.updateOrderSuccess({ order });
        }),
        catchError(err => of(OrdersEntityAdapterActions.updateOrderFailed({ errorMessage: 'Something went wrong... Please try again' })))
      );
    })
  ));


  constructor(private actions$: Actions, private store: Store<ApplicationState>, private ordersApiService: OrdersApiService) {
  }

}
