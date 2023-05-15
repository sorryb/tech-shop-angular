import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  Product,
  ProductOrder,
} from '@food-shop-architecture-workshop/core/model';

@Component({
  selector: 'app-cart-list',
  templateUrl: 'cart-list.component.html',
})
export class CartListComponent {
  @Input()
  products: Array<ProductOrder> = [];

  @Output()
  navigateToProducts: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  navigateToCheckout: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  removeProductFromCart: EventEmitter<ProductOrder> = new EventEmitter<ProductOrder>();

  @Output()
  updateProductQuantity: EventEmitter<{ product: Product; quantity: number }> =
    new EventEmitter<{ product: Product; quantity: number }>();

  onAddProducts() {
    this.navigateToProducts.emit(true);
  }

  removeProduct(productOrder: ProductOrder): void {
    this.removeProductFromCart.emit(productOrder);
  }

  updateQuantity(product: Product, quantity: number) {
    if (quantity > 0) {
      this.updateProductQuantity.emit({ product, quantity });
    }
  }

  onNavigateToCheckout() {
    this.navigateToCheckout.emit(true);
  }
}
