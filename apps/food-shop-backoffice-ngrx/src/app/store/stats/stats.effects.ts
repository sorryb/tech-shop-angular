import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ApplicationState } from '../app-state.model';
import { OrdersApiService } from '@food-shop-architecture-workshop/core/services/api-service';
import { StatsActions } from './stats.actions';
import { catchError, map, of, switchMap } from 'rxjs';


@Injectable()
export class StatsEffects {

  loadStats$ = createEffect(() => this.actions$.pipe(
    ofType(StatsActions.loadStats),
    switchMap(() => this.ordersApiService.loadOrders().pipe(
      map(orders => StatsActions.loadStatsSuccess({ orders })),
      catchError(err => of(StatsActions.loadStatsFailed({ errorMessage: 'Something went wrong' })))
    ))
  ));

  constructor(private actions$: Actions, private store: Store<ApplicationState>, private ordersApiService: OrdersApiService) {
  }


}
