import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import {
  Order,
  OrderStatus,
} from '@food-shop-architecture-workshop/core/model';

@Component({
  selector: 'app-order-status-bar',
  templateUrl: 'order-status-bar.component.html',
})
export class OrderStatusBarComponent implements OnChanges {
  ORDER_STATUS = OrderStatus;

  barNumberWidth = 0;

  @Input()
  order!: Order;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes['order']?.currentValue) {
      this.barNumberWidth = this.calculateWidth(
        changes['order']?.currentValue?.orderStatus
      );
    }
  }

  private calculateWidth(orderStatus: OrderStatus) {
    const x =
      orderStatus === OrderStatus.ORDER_NEW
        ? 0
        : orderStatus === OrderStatus.ORDER_ACCEPTED
        ? 1
        : orderStatus === OrderStatus.ORDER_PROCESSING
        ? 2
        : 4;
    return (x * 2 + 1) / 8;
  }
}
