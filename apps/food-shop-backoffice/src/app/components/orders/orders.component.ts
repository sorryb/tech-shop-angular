import {Component} from "@angular/core";
import {Order, OrderStatus} from "@food-shop-architecture-workshop/core/model";
import {BoOrdersService, OrdersState} from "../../services/bo-orders.service";
import {MatTabChangeEvent} from "@angular/material/tabs";
import {Sort} from "@angular/material/sort";
import {Observable} from "rxjs";

@Component({
  selector: 'app-orders',
  templateUrl: 'orders.component.html'
})
export class OrdersComponent {

  orders$: Observable<OrdersState>;
  acceptedOrders$: Observable<OrdersState>;
  newOrders$: Observable<OrdersState>;
  processingOrders$: Observable<OrdersState>;
  canceledOrders: Observable<OrdersState>;
  deliveredOrders$: Observable<OrdersState>;
  selectedIndex = 0;
  ORDER_STATUS = OrderStatus;

  constructor(
    private backofficeOrdersState: BoOrdersService) {
    this.orders$ = backofficeOrdersState.ordersSortedAndFiltered$;
    this.acceptedOrders$ = backofficeOrdersState.getOrdersFilteredByOrderStatus(OrderStatus.ORDER_ACCEPTED);
    this.newOrders$ = backofficeOrdersState.getOrdersFilteredByOrderStatus(OrderStatus.ORDER_NEW);
    this.processingOrders$ = backofficeOrdersState.getOrdersFilteredByOrderStatus(OrderStatus.ORDER_PROCESSING);
    this.canceledOrders = backofficeOrdersState.getOrdersFilteredByOrderStatus(OrderStatus.ORDER_CANCELED);
    this.deliveredOrders$ = backofficeOrdersState.getOrdersFilteredByOrderStatus(OrderStatus.ORDER_DELIVERED);
    this.backofficeOrdersState.loadAllOrders();
  }

  updateOrderStatus(payload: { order: Order; newOrderStatus: OrderStatus }) {
    this.backofficeOrdersState.updateOrderStatus(payload.order, payload.newOrderStatus);
  }

  reloadOrders(): void {
    this.backofficeOrdersState.loadAllOrders();
  }

  handleSortChanged(sort: Sort) {
    this.backofficeOrdersState.sortOrdersOnlyOnFE(sort);
  }


  handleFilter(matTabChangeEvent: MatTabChangeEvent) {
    const tabIndex = matTabChangeEvent.index;
    const orderStatus: OrderStatus | undefined = tabIndex === 0 ? undefined :
      tabIndex === 1 ? OrderStatus.ORDER_NEW : tabIndex === 2 ? OrderStatus.ORDER_ACCEPTED :
        tabIndex === 3 ? OrderStatus.ORDER_PROCESSING : tabIndex === 4 ? OrderStatus.ORDER_CANCELED : OrderStatus.ORDER_DELIVERED;
    this.backofficeOrdersState.filterOrdersOnlyFe(orderStatus);
  }
}
