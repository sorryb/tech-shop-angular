import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsRegistryModule, MaterialModule } from '@food-shop-architecture-workshop/core/theme';
import { DomPortalModule } from '@food-shop-architecture-workshop/shared/components/dom-portal';
import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { AppRouting } from './app.routing';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { OrdersComponent } from './components/orders/orders.component';
import { FoodShopBackofficeOrdersStatsModule } from '@food-shop-architecture-workshop/food-shop-backoffice/orders/stats';
import { FoodShopBackofficeOrdersOrderStatusTableModule } from '@food-shop-architecture-workshop/food-shop-backoffice/orders/order-status-table';
import { StoreModule } from '@ngrx/store';
import { appRootReducer } from './store/app-state.model';
import { getStorageMetaReducers } from '@food-shop-architecture-workshop/shared/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ApiServiceModule } from '@food-shop-architecture-workshop/core/services/api-service';
import { StatsEffects } from './store/stats/stats.effects';
import { OrdersPaginatedEffects } from './store/orders/orders-paginated.effects';
import { OrdersEntityAdapterEffects } from './store/orders-entity-adapter/orders-entity-adapter.effects';
import { TemplateProjectionExampleComponent } from './components/template-projection-example/template-projection-example.component';
import { TableComponent, TableHeaderDirective, TableRowDirective } from './components/table/table.component';

@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    DashboardComponent,
    OrdersComponent,
    TemplateProjectionExampleComponent,
    TableComponent,
    TableRowDirective,
    TableHeaderDirective
  ],
  imports: [
    BrowserAnimationsModule,
    MaterialModule,
    IconsRegistryModule,
    DomPortalModule,
    HttpClientModule,
    LayoutModule,
    AppRouting,
    ApiServiceModule,
    FoodShopBackofficeOrdersStatsModule,
    FoodShopBackofficeOrdersOrderStatusTableModule,
    StoreModule.forRoot(appRootReducer, {
      metaReducers: [
        getStorageMetaReducers('__food_shop_backoffice_ngrx', ['stats'])
      ],
      runtimeChecks: {
        strictStateImmutability: true,
        strictStateSerializability: true
      }
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    }),
    EffectsModule.forRoot([
      StatsEffects,
      OrdersPaginatedEffects,
      OrdersEntityAdapterEffects
    ])
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
