import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { DomainEntity, Product, ProductOrder } from '@food-shop-architecture-workshop/core/model';
import { Store } from '@ngrx/store';
import { ApplicationState } from '../../../../store/app-state.module';
import { getAllFavoriteProducts } from '../../../favorite/store/favorite.selectors';
import { FavoriteActions } from '../../../favorite/store/favorite.actions';
import { getAllProductsInCartWithTotalQuantity } from '../../../cart/cart.selectors';
import { CartActions } from '../../../cart/cart.actions';
import { getCountOrders } from '../../store/shop.selectors';
import { ShopActions } from '../../store/shop.actions';

@Component({
  selector: 'app-shop-widgets',
  templateUrl: 'shop-widgets.component.html'
})
export class ShopWidgetsComponent implements OnInit {

  cartState$!: Observable<{ products: ProductOrder[], totalQuantity: number }>;
  favoriteState$!: Observable<Array<Product>>;
  orders$!: Observable<DomainEntity<number>>;

  constructor(
    private router: Router,
    private store: Store<ApplicationState>
  ) {
    this.favoriteState$ = this.store.select(getAllFavoriteProducts);
    this.cartState$ = this.store.select(getAllProductsInCartWithTotalQuantity);
    this.orders$ = this.store.select(getCountOrders);
  }

  ngOnInit(): void {
    this.store.dispatch(ShopActions.countOrders());
  }

  handleRemoveProductFromCart(productOrder: ProductOrder): void {
    this.store.dispatch(CartActions.removeProduct({ productOrder }));
  }

  handleUpdateProductQuantity(productOrder: { product: Product; quantity: number }) {
    this.store.dispatch(CartActions.updateQuantity({ productOrder }));
  }

  handleAddAllProductsToCart(products: Product[]) {
    this.store.dispatch(FavoriteActions.removeAllProducts());
    this.store.dispatch(CartActions.addProducts({
      productOrders: products.map(product => {
        return {
          product,
          quantity: 1
        };
      })
    }));
  }

  handleRemoveProductFromFavorite(product: Product) {
    this.store.dispatch(FavoriteActions.removeProduct({ productId: product.id }));
  }

  handleAddProductToCart(productOrder: ProductOrder) {
    // this.cartStateService.addProductToCart(productOrder);
    // this.favoriteStateService.removeProduct(productOrder.product);
  }

  handleOrdersClicked() {
    this.router.navigate(['orders']);
  }
}
