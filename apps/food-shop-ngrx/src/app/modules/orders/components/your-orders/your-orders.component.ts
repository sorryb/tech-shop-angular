import { Component } from '@angular/core';
import { Order } from '@food-shop-architecture-workshop/core/model';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { OrdersState } from '../../state/orders-state.model';
import { OrdersActions } from '../../state/orders.actions';
import { getOrdersState } from '../../state/orders.selectors';

@Component({
  selector: 'app-your-orders-component',
  templateUrl: 'your-orders.component.html'
})
export class YourOrdersComponent {
  ordersState$!: Observable<OrdersState>;

  constructor(private store: Store<OrdersState>, private router: Router) {
    this.ordersState$ = this.store.select(getOrdersState);
    this.store.dispatch(OrdersActions.loadOrders());
  }

  selectOrder(order: Order) {
    this.store.dispatch(OrdersActions.setOrderDetails({ order }));
    this.router.navigate(['orders', order.id]);
  }
}
