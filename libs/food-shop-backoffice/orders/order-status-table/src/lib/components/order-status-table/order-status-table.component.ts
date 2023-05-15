import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, Observable } from 'rxjs';
import { orderTableDetailExpandTrigger } from './order-status-table.animations';
import { Sort } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator';
import {
  Order,
  OrderStatus,
  PaginationConfig,
} from '@food-shop-architecture-workshop/core/model';

@Component({
  selector: 'app-order-table',
  templateUrl: 'order-status-table.component.html',
  styleUrls: ['order-status-table.component.scss'],
  animations: [orderTableDetailExpandTrigger],
})
export class OrderStatusTable {
  displayedColumns: string[] = [
    'orderId',
    'customer',
    'price',
    'items',
    'orderDate',
    'status',
  ];
  ORDER_STATUS = OrderStatus;
  isSmallScreen$: Observable<boolean>;
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement: string | null = null;

  @Input() orders: Array<Order> = [];
  @Input() showOrdersStatus = true;
  @Input() sort: Sort | undefined;
  @Input() paginationConfig: PaginationConfig | undefined;
  @Output() orderStatusChanged: EventEmitter<{
    order: Order;
    newOrderStatus: OrderStatus;
  }> = new EventEmitter<{ order: Order; newOrderStatus: OrderStatus }>();
  @Output() pageChanged: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();
  @Output() sortChanged: EventEmitter<Sort> = new EventEmitter<Sort>();

  constructor(private breakpointObserver: BreakpointObserver) {
    this.isSmallScreen$ = breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .pipe(
        map((xs) => {
          return xs.matches;
        })
      );
  }

  updateOrderStatus(order: Order, newOrderStatus: OrderStatus) {
    this.orderStatusChanged.emit({ newOrderStatus, order });
    this.expandedElement = null;
  }

  sortData(sort: Sort) {
    this.sortChanged.emit(sort);
  }
}
