import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { OrderStatusBarComponent } from './components/order-status-bar/order-status-bar.component';
import { SharedPipesModule } from "@food-shop-architecture-workshop/shared/pipes";

@NgModule({
  declarations: [OrderDetailsComponent, OrderStatusBarComponent],
  imports: [CommonModule, SharedPipesModule],
  exports: [OrderDetailsComponent],
})
export class FoodShopOrdersOrderDetailsModule {}
