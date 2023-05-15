import { Component } from '@angular/core';
import { DomainEntity, Order } from '@food-shop-architecture-workshop/core/model';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, Observable, switchMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { OrdersState } from '../../state/orders-state.model';
import { getSelectedOrder, isOrderDetailsLoaded } from '../../state/orders.selectors';
import { OrdersActions } from '../../state/orders.actions';

@Component({
  selector: 'app-your-order-details',
  templateUrl: 'your-order-details.component.html'
})
export class YourOrderDetailsComponent {
  order$: Observable<DomainEntity<Order | undefined>>;

  constructor(
    private router: Router,
    private activatedRute: ActivatedRoute,
    private store: Store<OrdersState>
  ) {
    this.order$ = this.activatedRute.paramMap.pipe(
      map(paramMap => paramMap.get('id')),
      tap(id => {
        if (!id) {
          this.router.navigate(['/orders']);
        }
      }),
      filter(id => !!id),
      switchMap(id => {
        return this.store.select(isOrderDetailsLoaded(id as string)).pipe(
          switchMap(isOrderDetailsLoaded => {
            if (!isOrderDetailsLoaded) {
              this.store.dispatch(OrdersActions.loadOrderDetails({ orderId: id as string }));
            }
            return this.store.select(getSelectedOrder);
          })
        );
      })
    );
  }
}
