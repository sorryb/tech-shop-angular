import { NgModule } from '@angular/core';
import { YourOrdersComponent } from './components/your-orders/your-orders.component';
import { YourOrderDetailsComponent } from './components/your-order-details/your-order-details.component';
import { CommonModule } from '@angular/common';
import { IconsRegistryModule, MaterialModule } from '@food-shop-architecture-workshop/core/theme';
import { DomPortalModule } from '@food-shop-architecture-workshop/shared/components/dom-portal';
import { FoodShopOrdersOrderCardListModule } from '@food-shop-architecture-workshop/food-shop/orders/order-card-list';
import { FoodShopOrdersOrderDetailsModule } from '@food-shop-architecture-workshop/food-shop/orders/order-details';
import { OrdersRouting } from './orders.routing';
import { StoreModule } from '@ngrx/store';
import { ORDERS_REDUX_KEY } from './state/orders-state.model';
import { ordersReducer } from './state/orders.reducer';
import { EffectsModule } from '@ngrx/effects';
import { OrdersEffects } from './state/orders.effects';


@NgModule({
  declarations: [
    YourOrdersComponent,
    YourOrderDetailsComponent
  ],
  imports: [
    CommonModule,
    OrdersRouting,
    MaterialModule,
    StoreModule.forFeature(ORDERS_REDUX_KEY, ordersReducer),
    EffectsModule.forFeature([OrdersEffects]),
    DomPortalModule,
    IconsRegistryModule,
    FoodShopOrdersOrderCardListModule,
    FoodShopOrdersOrderDetailsModule

  ]

})
export class OrdersModule {

}
