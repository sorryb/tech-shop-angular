import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {OrdersComponent} from "./components/orders/orders.component";


const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "dashboard"
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    pathMatch: "full"
  },
  {
    path: "orders",
    component: OrdersComponent
  }

];


@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: "enabledBlocking"
  })],
  exports: [
    RouterModule
  ]
})
export class AppRouting {

}
