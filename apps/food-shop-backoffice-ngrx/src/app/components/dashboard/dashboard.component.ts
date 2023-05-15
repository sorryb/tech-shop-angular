import { Component } from '@angular/core';
import { Observable, switchMap, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Sort, SortDirection } from '@angular/material/sort';
import { Order, OrderStatus } from '@food-shop-architecture-workshop/core/model';
import { PageEvent } from '@angular/material/paginator';
import { Store } from '@ngrx/store';
import { ApplicationState, OrdersPaginatedState } from '../../store/app-state.model';
import { StatsActions } from '../../store/stats/stats.actions';
import { getStatsOfOrders } from '../../store/stats/stats.selectors';
import { StatsRow } from '@food-shop-architecture-workshop/food-shop-backoffice/orders/stats';
import { OrdersPaginatedActions } from '../../store/orders/orders-paginated.actions';
import { getOrdersPaginatedState } from '../../store/orders/orders-paginated.selectors';

@Component({
    selector: 'app-dashboard',
    templateUrl: 'dashboard.component.html'
  }
)
export class DashboardComponent {

  ordersState$!: Observable<OrdersPaginatedState>;
  stats$!: Observable<{ allDeliveredCanceledOrdersStats: StatsRow[], newProcessingAcceptedOrdersStats: StatsRow[] }>;

  constructor(
    private router: Router,
    private store: Store<ApplicationState>,
    private activatedRouter: ActivatedRoute) {

    this.store.dispatch(StatsActions.loadStats());
    this.stats$ = this.store.select(getStatsOfOrders);

    this.ordersState$ = this.activatedRouter.queryParamMap.pipe(
      tap(queryParamMap => {
        const sortKey = queryParamMap.get('sortKey') as string;
        const sortDirection = queryParamMap.get('sortDirection') as SortDirection;
        const pageIndex = queryParamMap.get('pageIndex') !== null ? Number(queryParamMap.get('pageIndex')) : undefined;
        const pageSize = queryParamMap.get('pageSize') !== null ? Number(queryParamMap.get('pageSize')) : undefined;
        this.store.dispatch(OrdersPaginatedActions.updateSortAndPagination({
          pagination: { pageIndex, pageSize },
          sort: { active: sortKey, direction: sortDirection }
        }));
      }),
      switchMap(() => this.store.select(getOrdersPaginatedState))
    );
  }


  updateOrderStatus(payload: { order: Order; newOrderStatus: OrderStatus }) {
    /*this.boOrdersPaginatedService.updateOrderStatus(payload.order, payload.newOrderStatus);
    this.boOrdersStatsService.loadAllStats();*/
  }

  reloadOrders(): void {
    // this.boOrdersPaginatedService.refreshOrders();
  }

  handleSortChange(sort: Sort) {
    const sortChange: Partial<{ sortKey: string, sortDirection: string }> = {};
    if (sort.active !== '' && sort.direction !== '') {
      sortChange.sortKey = sort.active;
      sortChange.sortDirection = sort.direction;
      this.router.navigate(['/'], { queryParams: sortChange, queryParamsHandling: 'merge' });
    } else {
      const pageChange: Partial<{ pageIndex: number, pageSize: number }> = {};
      if (this.activatedRouter.snapshot.queryParamMap.get('pageIndex')) {
        pageChange.pageIndex = this.activatedRouter.snapshot.queryParamMap.get('pageIndex') as unknown as number;
      }
      if (this.activatedRouter.snapshot.queryParamMap.get('pageSize')) {
        pageChange.pageSize = this.activatedRouter.snapshot.queryParamMap.get('pageSize') as unknown as number;
      }
      if (pageChange.pageIndex !== undefined && pageChange.pageSize !== undefined) {
        this.router.navigate(['/'], { queryParams: pageChange });
      } else {
        this.router.navigate(['/']);
      }
    }
  }

  reloadStats() {
    // this.boOrdersStatsService.loadAllStats();
  }

  handlePageChanged(pageEvent: PageEvent) {
    const pageChange: Partial<{ pageIndex: number, pageSize: number }> = {};
    pageChange.pageIndex = Number(this.activatedRouter.snapshot.queryParamMap.get('pageSize')) === pageEvent.pageSize ? pageEvent.pageIndex : 0;
    pageChange.pageSize = pageEvent.pageSize;
    this.router.navigate(['/'], { queryParams: pageChange, queryParamsHandling: 'merge' });
  }

}
