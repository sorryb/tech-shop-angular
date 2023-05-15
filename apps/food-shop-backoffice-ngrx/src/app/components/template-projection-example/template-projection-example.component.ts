import { Component } from '@angular/core';
import { OrdersApiService } from '@food-shop-architecture-workshop/core/services/api-service';
import { map, Observable, tap } from 'rxjs';


@Component({
  selector: 'app-template-projection',
  templateUrl: 'template-projection-example.component.html'
})
export class TemplateProjectionExampleComponent {


  menuEntries$!: Observable<string[]>;

  constructor(private ordersApiService: OrdersApiService) {
    this.menuEntries$ = this.ordersApiService.loadOrders().pipe(
      map(order => order.map(ord => ord.id as string)),
      tap(v => console.log('HIT HIT HIT'))
    );
  }


  dataSource = [
    { firstName: 'First name example', lastName: 'Last name example' },
    { firstName: 'First name example', lastName: 'Last name example' },
    { firstName: 'First name example', lastName: 'Last name example' },
    { firstName: 'First name example', lastName: 'Last name example' },
    { firstName: 'First name example', lastName: 'Last name example' },
  ]

  dataSource2 = [
    { OtherKey: 'First name example', lastName: 'Last name example' },
    { OtherKey: 'First name example', lastName: 'Last name example' },
    { OtherKey: 'First name example', lastName: 'Last name example' },
    { OtherKey: 'First name example', lastName: 'Last name example' },
    { OtherKey: 'First name example', lastName: 'Last name example' },
  ]


}
