import {Injectable} from "@angular/core";
import {CartStateService} from "./cart-state.service";
import {environment} from "../../environments/environment";
import {map, Observable, tap} from "rxjs";
import * as uuid from "uuid";
import {} from "@food-shop-architecture-workshop/core/services/api-service";
import {Order, OrderPaymentSummary} from "@food-shop-architecture-workshop/core/model";
import {StateSerializerService, OrdersApiService} from "@food-shop-architecture-workshop/core/services/api-service";
import {getCartPriceModel} from "@food-shop-architecture-workshop/food-shop/cart/cart-utility";


@Injectable()
export class CheckoutStateService {

  private vatRate = environment.vatRatePercentage;
  private serviceChargePercentage = environment.serviceChargePercentage;

  checkoutSummary$: Observable<OrderPaymentSummary>;

  constructor(
    private cartState: CartStateService,
    private ordersApiService: OrdersApiService,
    private stateSerializer: StateSerializerService) {
    this.checkoutSummary$ = this.cartState.productsInCart$.pipe(
      map(products => getCartPriceModel(products, this.vatRate, this.serviceChargePercentage))
    );
  }

  createOrder(order: Order) {
    return this.ordersApiService.createOrder({
      ...order,
      id: uuid.v4().substring(0, 8).toUpperCase(),
      userId: this.stateSerializer.getUserState()?.id
    }).pipe(
      tap((_) => this.cartState.removeAllProductsFromCart())
    );
  }

}
