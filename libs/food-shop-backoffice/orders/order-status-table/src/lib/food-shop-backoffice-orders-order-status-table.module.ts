import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderStatusTable } from './components/order-status-table/order-status-table.component';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [OrderStatusTable],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
  ],
  exports: [OrderStatusTable],
})
export class FoodShopBackofficeOrdersOrderStatusTableModule {}
