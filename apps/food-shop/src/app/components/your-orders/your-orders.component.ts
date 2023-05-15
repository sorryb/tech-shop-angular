import { Component } from '@angular/core';
import { Order } from '@food-shop-architecture-workshop/core/model';
import { OrdersApiService } from '@food-shop-architecture-workshop/core/services/api-service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-your-orders-component',
  templateUrl: 'your-orders.component.html'
})
export class YourOrdersComponent {
  orders$: Observable<Order[]>;

  constructor(private orderService: OrdersApiService, private router: Router) {
    this.orders$ = this.orderService.loadOrders();
  }

  selectOrder(order: Order) {
    this.router.navigate(['orders', order.id]);
  }
}
