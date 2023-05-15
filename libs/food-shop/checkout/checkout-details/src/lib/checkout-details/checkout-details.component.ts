import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InputRadioCardModel } from '@food-shop-architecture-workshop/shared/components/input-radio-card';
import {
  Order,
  OrderPaymentSummaryExtraFee,
  OrderStatus,
  Product,
  ProductOrder,
} from '@food-shop-architecture-workshop/core/model';
import { buildCheckoutForm } from '@food-shop-architecture-workshop/food-shop/cart/cart-utility';
import * as moment from 'moment';

@Component({
  selector: 'app-checkout-details',
  templateUrl: 'checkout-details.component.html',
})
export class CheckoutDetailsComponent {
  checkoutFormGroup: FormGroup;
  @Input()
  cartProducts: Array<ProductOrder> = [];
  @Input()
  orderPaymentSummaryExtraFee!: OrderPaymentSummaryExtraFee;
  @Input()
  paymentMethodCards: InputRadioCardModel[] = [];
  @Input()
  paymentMethodTitle: string = '';
  @Output()
  updateProductQuantity: EventEmitter<ProductOrder> = new EventEmitter<ProductOrder>();
  @Output()
  removeProduct: EventEmitter<ProductOrder> = new EventEmitter<ProductOrder>();
  @Output()
  createOrder: EventEmitter<Order> = new EventEmitter<Order>();
  @Output()
  paymentMethodChanged: EventEmitter<InputRadioCardModel[]> = new EventEmitter<InputRadioCardModel[]>();

  constructor() {
    this.checkoutFormGroup = buildCheckoutForm();
  }

  updateQuantity(product: Product, quantity: number) {
    if (quantity > 0) {
      this.updateProductQuantity.emit({ product, quantity });
    }
  }

  submitOrder() {
    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
    } else {
      const customerInfo = this.checkoutFormGroup.value;
      this.createOrder.emit({
        orderedProducts: this.cartProducts,
        name: customerInfo.name,
        comment: customerInfo.comment,
        table: customerInfo.table,
        orderPaymentSummaryExtraFee: this.orderPaymentSummaryExtraFee,
        // workaround since we don't have a real backend
        orderStatus: OrderStatus.ORDER_NEW,
        orderDateUnix: moment().unix(),
      });
    }
  }

  handlePaymentMethodChange(paymentMethodsCard: InputRadioCardModel[]) {
    this.paymentMethodCards = paymentMethodsCard;
    this.paymentMethodChanged.emit(paymentMethodsCard);
  }
}
