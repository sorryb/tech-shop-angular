import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderCardListComponent } from './components/order-card-list.component';

@NgModule({
  declarations: [OrderCardListComponent],
  imports: [CommonModule],
  exports: [OrderCardListComponent],
})
export class FoodShopOrdersOrderCardListModule {}
