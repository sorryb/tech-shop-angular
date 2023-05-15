import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {StateSerializerService} from "@food-shop-architecture-workshop/core/services/api-service";
import {Product, ProductOrder} from "@food-shop-architecture-workshop/core/model";


@Injectable()
export class CartStateService {

  private productsInCart: Array<ProductOrder> = [];
  private productsInCartSubject: Subject<Array<ProductOrder>> = new BehaviorSubject<Array<ProductOrder>>([]);
  public productsInCart$: Observable<Array<ProductOrder>> = this.productsInCartSubject.asObservable();

  constructor(private stateSerializer: StateSerializerService) {
    let savedProducts = stateSerializer.restoreState();
    if (savedProducts && savedProducts.cartProducts && savedProducts.cartProducts.length > 0) {
      // todo: add dependency to products service and maybe filter out products which are
      // todo: no longer available
      this.productsInCart = savedProducts.cartProducts;
      this.productsInCartSubject.next(this.productsInCart);
    }
  }

  addMultipleProductsToCart(orderedProducts: ProductOrder[]): void {
    orderedProducts.forEach(prod => {
      this.updateSyncState(prod);
    });
    this.pushSubjectAndStoreToLocalStorage(this.productsInCart);
  }


  addProductToCart(orderProduct: ProductOrder): void {
    this.updateSyncState(orderProduct);
    this.pushSubjectAndStoreToLocalStorage(this.productsInCart);
  }

  private updateSyncState(orderProduct: ProductOrder) {
    if (this.productsInCart.find(v => v.product.id === orderProduct.product.id)) {
      this.productsInCart = this.productsInCart.map(prod => (
        {
          ...prod,
          quantity: prod.product.id === orderProduct.product.id ? prod.quantity + orderProduct.quantity :
            prod.quantity
        }));

    } else {
      this.productsInCart.push(orderProduct);
    }
  }

  removeProductFromCart(productOrder: ProductOrder): void {
    this.productsInCart = this.productsInCart.filter(p => p.product.id !== productOrder.product.id);
    this.pushSubjectAndStoreToLocalStorage(this.productsInCart);
  }

  removeAllProductsFromCart() {
    this.productsInCart = [];
    this.pushSubjectAndStoreToLocalStorage(this.productsInCart);
  }

  updateQuantity(product: Product, quantity: number) {
    this.productsInCart = this.productsInCart.map(p => {
      return {...p, quantity: p.product.id === product.id ? quantity : p.quantity};
    });
    this.pushSubjectAndStoreToLocalStorage(this.productsInCart);
  }

  private pushSubjectAndStoreToLocalStorage(productsInCart: Array<ProductOrder>) {
    this.productsInCartSubject.next(productsInCart);
    this.stateSerializer.saveCartProducts(productsInCart);
  }

}
