import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SharedComponentsInputNumberButtonModule } from '@food-shop-architecture-workshop/shared/components/input-number-button';
import { MatRippleModule } from '@angular/material/core';

@NgModule({
  declarations: [ProductDetailsComponent],
  imports: [
    CommonModule,
    SharedComponentsInputNumberButtonModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatRippleModule
  ],
  exports: [ProductDetailsComponent],
})
export class FoodShopProductProductDetailsModule {}
