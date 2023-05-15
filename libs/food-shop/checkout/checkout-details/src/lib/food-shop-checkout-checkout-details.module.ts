import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutDetailsComponent } from './checkout-details/checkout-details.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { SharedComponentsInputRadioCardModule } from '@food-shop-architecture-workshop/shared/components/input-radio-card';

@NgModule({
  declarations: [CheckoutDetailsComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatTooltipModule,
    SharedComponentsInputRadioCardModule,
  ],
  exports: [CheckoutDetailsComponent],
})
export class FoodShopCheckoutCheckoutDetailsModule {}
