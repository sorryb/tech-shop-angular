import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { YourOrdersComponent } from './components/your-orders/your-orders.component';
import { YourOrderDetailsComponent } from './components/your-order-details/your-order-details.component';


const ordersRoute: Routes = [
  {
    path: '',
    component: YourOrdersComponent
  }, {
    path: ':id',
    component: YourOrderDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(ordersRoute)],
  exports: [RouterModule]
})
export class OrdersRouting {

}
