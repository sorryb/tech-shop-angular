import { APP_INITIALIZER, Injectable, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { IconsRegistryModule, MaterialModule } from '@food-shop-architecture-workshop/core/theme';
import { ShopWidgetsComponent } from './components/shop-widgets/shop-widgets.component';
import { FoodShopOrdersOrdersWidgetModule } from '@food-shop-architecture-workshop/food-shop/orders/orders-widget';
import { FoodShopCartCartWidgetModule } from '@food-shop-architecture-workshop/food-shop/cart/cart-widget';
import { FoodShopFavoriteFavoriteWidgetModule } from '@food-shop-architecture-workshop/food-shop/favorite/favorite-widget';
import { CartStateService } from './services/cart-state.service';
import { CheckoutStateService } from './services/checkout-state.service';
import { FavoriteStateService } from './services/favorite-state.service';
import { OrdersStateService } from './services/orders-state.service';
import { ProductsStateService } from './services/products-state.service';
import { ApiServiceModule } from '@food-shop-architecture-workshop/core/services/api-service';
import { ShopComponent } from './components/shop/shop.component';
import { DomPortalModule } from '@food-shop-architecture-workshop/shared/components/dom-portal';
import { AppRouting } from './app.routing';
import { FoodShopCategoryCategorySummaryModule } from '@food-shop-architecture-workshop/food-shop/category/category-summary';
import { OverlayProductDetailsDialog } from './components/product-details-overlay/product-details-overlay.component';
import { FoodShopProductProductListModule } from '@food-shop-architecture-workshop/food-shop/product/product-list';
import { FoodShopProductProductDetailsModule } from '@food-shop-architecture-workshop/food-shop/product/product-details';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { FoodShopCheckoutCheckoutDetailsModule } from '@food-shop-architecture-workshop/food-shop/checkout/checkout-details';
import { YourOrdersComponent } from './components/your-orders/your-orders.component';
import { YourOrderDetailsComponent } from './components/your-order-details/your-order-details.component';
import { FoodShopOrdersOrderCardListModule } from '@food-shop-architecture-workshop/food-shop/orders/order-card-list';
import { FoodShopOrdersOrderDetailsModule } from '@food-shop-architecture-workshop/food-shop/orders/order-details';
import { COMMON_SETTINGS_TOKEN, CommonSettings } from '@food-shop-architecture-workshop/core/model';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';

@Injectable()
export class ConfigLoader<T extends CommonSettings> {

  public appSettings!: T;

  constructor(private httpClient: HttpClient) {
  }

  loadConfig(url: string): Observable<any> {
    return this.httpClient.get<T>(url).pipe(
      tap(v => this.appSettings = v)
    );
  }

}

export interface FoodShopSettings extends CommonSettings {
  enableCart: boolean;
}

@NgModule({
  declarations: [
    AppComponent,
    ShopWidgetsComponent,
    ShopComponent,
    OverlayProductDetailsDialog,
    CheckoutComponent,
    YourOrdersComponent,
    YourOrderDetailsComponent
  ],
  imports: [
    BrowserAnimationsModule,
    MaterialModule,
    AppRouting,
    ApiServiceModule,
    FoodShopOrdersOrdersWidgetModule,
    FoodShopCartCartWidgetModule,
    FoodShopFavoriteFavoriteWidgetModule,
    FoodShopCategoryCategorySummaryModule,
    DomPortalModule,
    IconsRegistryModule,
    FoodShopProductProductListModule,
    FoodShopProductProductDetailsModule,
    FoodShopCheckoutCheckoutDetailsModule,
    FoodShopOrdersOrderCardListModule,
    FoodShopOrdersOrderDetailsModule
  ],
  providers: [
    CartStateService,
    CheckoutStateService,
    FavoriteStateService,
    OrdersStateService,
    ProductsStateService,
    ConfigLoader,
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: (configLoader: ConfigLoader<FoodShopSettings>) => () => {
        return configLoader.loadConfig('http://localhost:4200/api/config').pipe(
          catchError(err => {
            return of({
              enableCart: false,
              enableAddToFavorite: false
            });
          }),
          tap(v => console.log(v))
        ).toPromise();

      },
      deps: [ConfigLoader]
    },
    {
      provide: COMMON_SETTINGS_TOKEN,
      useFactory: (configLoader: ConfigLoader<FoodShopSettings>) => configLoader.appSettings,
      deps: [ConfigLoader]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}



