import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Order } from '@food-shop-architecture-workshop/core/model';

@Component({
  selector: 'app-orders-widget',
  templateUrl: 'orders-widget.component.html',
})
export class OrdersWidgetComponent {
  @Input()
  ordersCount: number = 0;

  @Output()
  ordersClicked: EventEmitter<boolean> = new EventEmitter<boolean>();
}
