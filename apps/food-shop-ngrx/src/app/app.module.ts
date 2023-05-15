import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsRegistryModule, MaterialModule } from '@food-shop-architecture-workshop/core/theme';
import { ApiServiceModule } from '@food-shop-architecture-workshop/core/services/api-service';
import { FoodShopOrdersOrdersWidgetModule } from '@food-shop-architecture-workshop/food-shop/orders/orders-widget';
import { FoodShopCartCartWidgetModule } from '@food-shop-architecture-workshop/food-shop/cart/cart-widget';
import { FoodShopFavoriteFavoriteWidgetModule } from '@food-shop-architecture-workshop/food-shop/favorite/favorite-widget';
import { FoodShopCategoryCategorySummaryModule } from '@food-shop-architecture-workshop/food-shop/category/category-summary';
import { DomPortalModule } from '@food-shop-architecture-workshop/shared/components/dom-portal';
import { FoodShopProductProductListModule } from '@food-shop-architecture-workshop/food-shop/product/product-list';
import { FoodShopProductProductDetailsModule } from '@food-shop-architecture-workshop/food-shop/product/product-details';
import { FoodShopCheckoutCheckoutDetailsModule } from '@food-shop-architecture-workshop/food-shop/checkout/checkout-details';
import { FoodShopOrdersOrderCardListModule } from '@food-shop-architecture-workshop/food-shop/orders/order-card-list';
import { FoodShopOrdersOrderDetailsModule } from '@food-shop-architecture-workshop/food-shop/orders/order-details';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { YourOrderDetailsComponent } from './modules/orders/components/your-order-details/your-order-details.component';
import { YourOrdersComponent } from './modules/orders/components/your-orders/your-orders.component';
import { AppRouting } from './app.routing';
import { StoreModule } from '@ngrx/store';
import { foodShopActionReducerMap } from './store/app-state.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ShopModule } from './modules/shop/shop.module';
import { EffectsModule } from '@ngrx/effects';
import { ShopEffect } from './modules/shop/store/shop.effect';
import { getStorageMetaReducers } from '@food-shop-architecture-workshop/shared/store';

@NgModule({
  declarations: [AppComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserAnimationsModule,
    MaterialModule,
    ShopModule,
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
    FoodShopOrdersOrderDetailsModule,
    StoreModule.forRoot(foodShopActionReducerMap, {
      metaReducers: [getStorageMetaReducers('__food_shop_ngrx__', ['cartState', 'favoriteState'])],
      runtimeChecks: {
        strictStateImmutability: true,
        strictStateSerializability: true
      }
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    }),
    EffectsModule.forRoot([ShopEffect])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}




