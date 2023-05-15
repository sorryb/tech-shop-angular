import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '@food-shop-architecture-workshop/core/model';

@Component({
  selector: 'app-product-details',
  templateUrl: 'product-details.component.html',
})
export class ProductDetailsComponent {
  @Input()
  product!: Product;

  @Input()
  favorite: boolean | null = false;

  @Input()
  quantity!: number;

  @Output()
  addToBagEvent: EventEmitter<{ product: Product; quantity: number }> =
    new EventEmitter<any>();

  @Output()
  closeEvent: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  favoriteChanged: EventEmitter<{ product: Product; favorite: boolean }> =
    new EventEmitter<{ product: Product; favorite: boolean }>();

  handleQuantityChanged(quantity: number) {
    this.quantity = quantity;
  }

  addToBag() {
    this.addToBagEvent.emit({ product: this.product, quantity: this.quantity });
  }

  close() {
    this.closeEvent.emit();
  }

  favoriteClicked() {
    this.favorite = !this.favorite;
    this.favoriteChanged.emit({
      product: this.product,
      favorite: this.favorite,
    });
  }
}
