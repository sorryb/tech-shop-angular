import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ApplicationState } from '../../store/app-state.model';
import { OrdersEntityAdapterActions } from '../../store/orders-entity-adapter/orders-entity-adapter.actions';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Observable } from 'rxjs';
import { Order, OrderStatus } from '@food-shop-architecture-workshop/core/model';
import { getAllOrdersFiltered } from '../../store/orders-entity-adapter/orders-entity-adapter.selectors';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-orders',
  templateUrl: 'orders.component.html'
})
export class OrdersComponent {
  selectedIndex: number = 0;
  orders$: Observable<Order[]>;

  constructor(private store: Store<ApplicationState>) {
    this.store.dispatch(OrdersEntityAdapterActions.loadOrders());
    this.orders$ = this.store.select(getAllOrdersFiltered);
  }

  reloadOrders() {
    this.store.dispatch(OrdersEntityAdapterActions.loadOrders());
  }

  handleFilter(tabChangeEvent: MatTabChangeEvent) {
    const index = tabChangeEvent.index;
    this.store.dispatch(OrdersEntityAdapterActions.setFilterByOrderStatus({
      orderStatus: index === 0 ? undefined : index === 1 ? OrderStatus.ORDER_NEW :
        index === 2 ? OrderStatus.ORDER_ACCEPTED :
          index === 3 ? OrderStatus.ORDER_PROCESSING :
            index === 4 ? OrderStatus.ORDER_CANCELED : OrderStatus.ORDER_DELIVERED
    }));
  }

  updateOrderStatus(event: { order: Order; newOrderStatus: OrderStatus }) {
    this.store.dispatch(OrdersEntityAdapterActions.updateOrder({
      orderId: event.order.id as string,
      orderStatus: event.newOrderStatus
    }));
  }
}
