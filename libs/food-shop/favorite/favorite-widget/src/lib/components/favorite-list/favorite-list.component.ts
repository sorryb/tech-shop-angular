import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { COMMON_SETTINGS_TOKEN, CommonSettings, Product, ProductOrder } from '@food-shop-architecture-workshop/core/model';

@Component({
  selector: 'app-favorite-list',
  templateUrl: 'favorite-list.component.html'
})
export class FavoriteListComponent {

  @Input()
  products: Array<Product> = [];
  @Output()
  navigateToProducts: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  addProductToCart: EventEmitter<ProductOrder> = new EventEmitter<ProductOrder>();
  @Output()
  addAllProductsToCart: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  removeProductFromFavorite: EventEmitter<Product> = new EventEmitter<Product>();

  constructor(/*@Inject(COMMON_SETTINGS_TOKEN) public commonSettings: CommonSettings*/) {
  }

  onAddProducts() {
    this.navigateToProducts.emit(true);
  }

  addToCart(product: Product) {
    this.addProductToCart.emit({ product: product, quantity: 1 });
  }

  removeProduct(product: Product) {
    this.removeProductFromFavorite.emit(product);
  }
}
