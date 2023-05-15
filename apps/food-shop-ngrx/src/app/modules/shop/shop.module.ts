import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@food-shop-architecture-workshop/core/theme';
import { FoodShopOrdersOrdersWidgetModule } from '@food-shop-architecture-workshop/food-shop/orders/orders-widget';
import { FoodShopFavoriteFavoriteWidgetModule } from '@food-shop-architecture-workshop/food-shop/favorite/favorite-widget';
import { FoodShopCartCartWidgetModule } from '@food-shop-architecture-workshop/food-shop/cart/cart-widget';
import { FoodShopProductProductListModule } from '@food-shop-architecture-workshop/food-shop/product/product-list';
import { DomPortalModule } from '@food-shop-architecture-workshop/shared/components/dom-portal';
import { FoodShopCategoryCategorySummaryModule } from '@food-shop-architecture-workshop/food-shop/category/category-summary';
import { FoodShopProductProductDetailsModule } from '@food-shop-architecture-workshop/food-shop/product/product-details';
import { ShopWidgetsComponent } from './components/shop-widgets/shop-widgets.component';
import { ShopComponent } from './components/shop/shop.component';
import { OverlayProductDetailsDialog } from './components/product-details-overlay/product-details-overlay.component';

@NgModule({
  declarations: [
    ShopWidgetsComponent,
    ShopComponent,
    OverlayProductDetailsDialog
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FoodShopOrdersOrdersWidgetModule,
    FoodShopFavoriteFavoriteWidgetModule,
    FoodShopCartCartWidgetModule,
    DomPortalModule,
    FoodShopCategoryCategorySummaryModule,
    FoodShopProductProductListModule,
    FoodShopProductProductDetailsModule
  ],
  exports: [
    ShopComponent,
    ShopWidgetsComponent
  ]
})
export class ShopModule {
}
