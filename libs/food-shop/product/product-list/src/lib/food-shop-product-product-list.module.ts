import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './components/product-list/product-list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';

@NgModule({
  declarations: [ProductListComponent],
  imports: [CommonModule, MatButtonModule, MatRippleModule],
  exports: [ProductListComponent],
})
export class FoodShopProductProductListModule {}
