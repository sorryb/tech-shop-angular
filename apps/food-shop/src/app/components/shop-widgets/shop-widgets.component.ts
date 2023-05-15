import {Component} from "@angular/core";
import {map, Observable} from "rxjs";
import {Router} from "@angular/router";
import {DomainEntity, Order, Product, ProductOrder} from "@food-shop-architecture-workshop/core/model";
import {CartStateService} from "../../services/cart-state.service";
import {FavoriteStateService} from "../../services/favorite-state.service";
import {OrdersStateService} from "../../services/orders-state.service";

@Component({
  selector: "app-shop-widgets",
  templateUrl: "shop-widgets.component.html"
})
export class ShopWidgetsComponent {

  cartState$: Observable<{ products: ProductOrder[], totalQuantity: number }>;
  favoriteState$: Observable<Array<Product>>;
  orders$: Observable<DomainEntity<Order[]>>;

  constructor(private cartStateService: CartStateService,
              private favoriteStateService: FavoriteStateService,
              private ordersStateService: OrdersStateService,
              private router: Router
  ) {
    this.favoriteState$ = this.favoriteStateService.favoriteProducts$;
    this.cartState$ = this.cartStateService.productsInCart$.pipe(
      map<ProductOrder[], { products: ProductOrder[], totalQuantity: number }>(products => ({
        products: products,
        totalQuantity: products.length > 0 ?
          products.map(prod => prod.quantity).reduce((previousValue, currentValue) => previousValue + currentValue) : 0
      }))
    );
    this.orders$ = this.ordersStateService.ordersState$;
    this.ordersStateService.loadOrders();
  }

  handleRemoveProductFromCart(productOrder: ProductOrder): void {
    this.cartStateService.removeProductFromCart(productOrder);
  }

  handleUpdateProductQuantity(payload: { product: Product; quantity: number }) {
    this.cartStateService.updateQuantity(payload.product, payload.quantity);
  }

  handleAddAllProductsToCart(products: Product[]) {
    this.cartStateService.addMultipleProductsToCart(products.map(p => ({product: p, quantity: 1})));
    this.favoriteStateService.removeAllProducts();
  }

  handleRemoveProductFromFavorite(product: Product) {
    this.favoriteStateService.removeProduct(product);
  }

  handleAddProductToCart(productOrder: ProductOrder) {
    this.cartStateService.addProductToCart(productOrder);
    this.favoriteStateService.removeProduct(productOrder.product);
  }

  handleOrdersClicked() {
    this.router.navigate(["orders"]);
  }
}
