import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersWidgetComponent } from './components/orders-widget/orders-widget.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [OrdersWidgetComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    MatTooltipModule,
  ],
  exports: [OrdersWidgetComponent],
})
export class FoodShopOrdersOrdersWidgetModule {}
