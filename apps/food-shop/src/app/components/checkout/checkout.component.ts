import { Component } from '@angular/core';
import { CartStateService } from '../../services/cart-state.service';
import { BehaviorSubject, combineLatest, map, Observable, Subject, switchMap, take, tap } from 'rxjs';
import { CheckoutStateService } from '../../services/checkout-state.service';
import { Router } from '@angular/router';
import { Order, OrderPaymentSummaryExtraFee, Product, ProductOrder } from '@food-shop-architecture-workshop/core/model';
import { getCartPriceFeeModel, mapPaymentFeeFromCardData } from '@food-shop-architecture-workshop/food-shop/cart/cart-utility';
import { InputRadioCardModel } from '@food-shop-architecture-workshop/shared/components/input-radio-card';
import { FavoriteStateService } from '../../services/favorite-state.service';

@Component({
  selector: 'app-checkout',
  templateUrl: 'checkout.component.html'
})
export class CheckoutComponent {

  checkoutData$: Observable<{
    orderPaymentSummaryExtraFee: OrderPaymentSummaryExtraFee,
    cartProducts: Array<ProductOrder>
  }>;
  cardData: Array<InputRadioCardModel> = [
    { name: 'Card', description: 'Card transaction fee', value: 0.00, valueDescription: '$0.00', selected: true },
    { name: 'Cash', description: 'Cash processing fee', value: 12.50, valueDescription: '$12.50', selected: false }
  ];

  private feeSubject: Subject<number> = new BehaviorSubject<number>(mapPaymentFeeFromCardData(this.cardData));

  constructor(private cartState: CartStateService, private checkoutService: CheckoutStateService, private router: Router, private favoriteState: FavoriteStateService) {
    this.checkoutService.checkoutSummary$.pipe(
      switchMap(checkout => {
        return combineLatest([
          this.favoriteState.favoriteProducts$,
          this.feeSubject
        ]);

      })
    );

    /*this.checkoutData$ = combineLatest([
      this.checkoutService.checkoutSummary$.pipe(
        withLatestFrom(this.cartState.productsInCart$)
      ),
      this.feeSubject
    ]).pipe(
      map(([a, b]) => {
        return {
          cartProducts: a[1],
          orderPaymentSummaryExtraFee: getCartPriceFeeModel(a[0], b)
        };
      })
    );*/


    this.checkoutData$ = combineLatest([
      combineLatest([
        this.checkoutService.checkoutSummary$,
        this.feeSubject
      ]).pipe(
        map(([checkoutSummary, paymentFee]) => {
          return getCartPriceFeeModel(checkoutSummary, paymentFee);
        })
      ), cartState.productsInCart$.pipe(
        tap(products => {
          if (products?.length === 0) {
            this.router.navigate(['/']);
          }
        })
      )
    ]).pipe(
      map(([orderPaymentSummaryExtraFee, cartProducts]) => ({ orderPaymentSummaryExtraFee, cartProducts }))
    );
  }

  updateQuantity(product: Product, quantity: number) {
    if (quantity > 0) {
      this.cartState.updateQuantity(product, quantity);
    }

  }

  handlePaymentMethodChange(cardData: any[]) {
    this.feeSubject.next(mapPaymentFeeFromCardData(cardData));
  }

  handleCreateOrder(order: Order) {
    this.checkoutService.createOrder(order).pipe(
      take(1)
    ).subscribe(() => {
      this.router.navigate(['/orders']);
    });
  }

  handleUpdateProductQuantity(productOrder: { product: Product; quantity: number }) {
    this.cartState.updateQuantity(productOrder.product, productOrder.quantity);
  }

  handleRemoveProduct(product: ProductOrder) {
    this.cartState.removeProductFromCart(product);
  }

}
