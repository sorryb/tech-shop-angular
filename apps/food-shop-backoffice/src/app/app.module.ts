import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {OrdersComponent} from "./components/orders/orders.component";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatSidenavModule} from "@angular/material/sidenav";
import {AppRouting} from "./app.routing";
import {IconsRegistryModule} from "@food-shop-architecture-workshop/core/theme";
import {HttpClientModule} from "@angular/common/http";
import {DomPortalModule} from "@food-shop-architecture-workshop/shared/components/dom-portal";
import {FoodShopBackofficeOrdersOrderStatusTableModule} from "@food-shop-architecture-workshop/food-shop-backoffice/orders/order-status-table";
import {FoodShopBackofficeOrdersStatsModule} from "@food-shop-architecture-workshop/food-shop-backoffice/orders/stats";
import {BoOrdersService} from "./services/bo-orders.service";
import {BoOrdersPaginatedService} from "./services/bo-orders-paginated.service";
import {BoOrdersStatsService} from "./services/bo-orders-stats.service";
import {ApiServiceModule} from "@food-shop-architecture-workshop/core/services/api-service";
import {MatTabsModule} from "@angular/material/tabs";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    OrdersComponent
  ],
  imports: [
    BrowserAnimationsModule,
    AppRouting,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTabsModule,
    DomPortalModule,
    HttpClientModule,
    IconsRegistryModule,
    FoodShopBackofficeOrdersOrderStatusTableModule,
    FoodShopBackofficeOrdersStatsModule,
    ApiServiceModule
  ],
  providers: [
    BoOrdersService,
    BoOrdersPaginatedService,
    BoOrdersStatsService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {

}
