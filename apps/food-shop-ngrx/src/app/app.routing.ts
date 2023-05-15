import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ShopComponent } from './modules/shop/components/shop/shop.component';

const routes: Routes = [
  {
    path: '',
    component: ShopComponent
  },
  {
    path: 'checkout',
    component: CheckoutComponent
  },
  {
    path: 'orders',
    loadChildren: () => import('./modules/orders/orders.module').then((m) => m.OrdersModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking',
      useHash: true
    })
  ],
  exports: [RouterModule]
})
export class AppRouting {
}
