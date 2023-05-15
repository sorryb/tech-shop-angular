import { Component, Input } from '@angular/core';
import { Order } from '@food-shop-architecture-workshop/core/model';

@Component({
  selector: 'app-order-details',
  templateUrl: 'order-details.component.html',
})
export class OrderDetailsComponent {
  @Input()
  order!: Order;
}
