import {Component} from "@angular/core";
import {Order, OrderStatus} from "@food-shop-architecture-workshop/core/model";
import {Observable, switchMap, tap} from "rxjs";
import {BoOrdersStatsService, OrdersStatsState} from "../../services/bo-orders-stats.service";
import {ActivatedRoute, Router} from "@angular/router";
import {BoOrdersPaginatedService, OrdersPaginatedState} from "../../services/bo-orders-paginated.service";
import {Sort, SortDirection} from "@angular/material/sort";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent {

  ordersState$: Observable<OrdersPaginatedState>;
  stats$: Observable<OrdersStatsState>;

  constructor(
    private boOrdersPaginatedService: BoOrdersPaginatedService,
    private boOrdersStatsService: BoOrdersStatsService,
    private router: Router,
    private activatedRouter: ActivatedRoute) {

    this.ordersState$ = this.activatedRouter.queryParamMap.pipe(
      tap(queryParamMap => {
        const sortKey = queryParamMap.get("sortKey") as string;
        const sortDirection = queryParamMap.get("sortDirection") as SortDirection;
        const pageIndex = queryParamMap.get("pageIndex") !== null ? Number(queryParamMap.get("pageIndex")) : undefined;
        const pageSize = queryParamMap.get("pageSize") !== null ? Number(queryParamMap.get("pageSize")) : undefined;
        this.boOrdersPaginatedService.updateSortAndPaginationState({active: sortKey, direction: sortDirection},
          {pageIndex, pageSize});
      }),
      switchMap(() => boOrdersPaginatedService.orderSortedAndPaginated$)
    );
    boOrdersStatsService.loadAllStats();
    this.stats$ = this.boOrdersStatsService.ordersStatsState$;
  }


  updateOrderStatus(payload: { order: Order; newOrderStatus: OrderStatus }) {
    this.boOrdersPaginatedService.updateOrderStatus(payload.order, payload.newOrderStatus);
    this.boOrdersStatsService.loadAllStats();
  }

  reloadOrders(): void {
    this.boOrdersPaginatedService.refreshOrders();
  }

  handleSortChange(sort: Sort) {
    const sortChange: Partial<{ sortKey: string, sortDirection: string }> = {};
    if (sort.active !== "" && sort.direction !== "") {
      sortChange.sortKey = sort.active;
      sortChange.sortDirection = sort.direction;
      this.router.navigate(["/"], {queryParams: sortChange, queryParamsHandling: "merge"});
    } else {
      const pageChange: Partial<{ pageIndex: number, pageSize: number }> = {};
      if (this.activatedRouter.snapshot.queryParamMap.get("pageIndex")) {
        pageChange.pageIndex = this.activatedRouter.snapshot.queryParamMap.get("pageIndex") as unknown as number;
      }
      if (this.activatedRouter.snapshot.queryParamMap.get("pageSize")) {
        pageChange.pageSize = this.activatedRouter.snapshot.queryParamMap.get("pageSize") as unknown as number;
      }
      if (pageChange.pageIndex !== undefined && pageChange.pageSize !== undefined) {
        this.router.navigate(["/"], {queryParams: pageChange});
      } else {
        this.router.navigate(["/"]);
      }
    }
  }

  reloadStats() {
    this.boOrdersStatsService.loadAllStats();
  }

  handlePageChanged(pageEvent: PageEvent) {
    const pageChange: Partial<{ pageIndex: number, pageSize: number }> = {};
    pageChange.pageIndex = Number(this.activatedRouter.snapshot.queryParamMap.get("pageSize")) === pageEvent.pageSize ? pageEvent.pageIndex : 0;
    pageChange.pageSize = pageEvent.pageSize;
    this.router.navigate(["/"], {queryParams: pageChange, queryParamsHandling: "merge"});
  }
}
