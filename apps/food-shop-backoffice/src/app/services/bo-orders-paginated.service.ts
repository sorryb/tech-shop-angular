import {Injectable} from "@angular/core";
import {Sort} from "@angular/material/sort";
import {BehaviorSubject, catchError, map, of, Subject, take} from "rxjs";
import {DomainEntity, Order, OrderStatus, PaginationConfig} from "@food-shop-architecture-workshop/core/model";
import {OrdersApiService} from "@food-shop-architecture-workshop/core/services/api-service";

export interface OrdersPaginatedState {
  orders: DomainEntity<Order[]>;
  pagination: PaginationConfig;
  sort: Sort;
}

const initialState: OrdersPaginatedState = {
  orders: {
    domain: [],
    requestStatus: {status: "NEW"}
  },
  sort: {direction: "", active: ""},
  pagination: {length: 0, pageIndex: 0, pageSize: 10}
};

@Injectable()
export class BoOrdersPaginatedService {

  private ordersState: OrdersPaginatedState = initialState;
  private ordersStateSubject: Subject<OrdersPaginatedState> = new BehaviorSubject(this.ordersState);
  public orderSortedAndPaginated$ = this.ordersStateSubject.asObservable();

  constructor(private ordersApiService: OrdersApiService) {
  }


  public updateSortAndPaginationState(sort: Sort, pagination: { pageIndex: number | undefined, pageSize: number | undefined }) {
    this.ordersState = {
      ...this.getPendingState(this.ordersState),
      sort: sort,
      pagination: {
        ...this.ordersState.pagination,
        pageSize: pagination.pageSize !== undefined ? pagination.pageSize : this.ordersState.pagination.pageSize,
        pageIndex: pagination.pageIndex !== undefined ? pagination.pageIndex : this.ordersState.pagination.pageIndex
      }
    };
    this.ordersStateSubject.next(this.ordersState);
    this.loadOrdersSortedAndFiltered(this.ordersState.pagination.pageIndex, this.ordersState.pagination.pageSize, this.ordersState.sort);
  }

  public updateSortState(sort: Sort): void {
    this.ordersState = {
      ...this.getPendingState(this.ordersState),
      sort: sort
    };
    this.ordersStateSubject.next(this.ordersState);
    this.loadOrdersSortedAndFiltered(this.ordersState.pagination.pageIndex, this.ordersState.pagination.pageSize, sort);
  }

  public updatePaginationState(pagination: PaginationConfig): void {
    this.ordersState = {
      ...this.getPendingState(this.ordersState),
      pagination: pagination
    };
    this.ordersStateSubject.next(this.ordersState);
    this.loadOrdersSortedAndFiltered(pagination.pageIndex, pagination.pageSize, this.ordersState.sort);
  }

  updateOrderStatus(order: Order, newOrderStatus: OrderStatus) {
    this.ordersState = {...this.getPendingState(this.ordersState)};
    this.ordersStateSubject.next(this.ordersState);
    this.ordersApiService.updateOrderStatus(order, newOrderStatus).pipe(
      take(1)
    ).subscribe((state) => {
      this.loadOrdersSortedAndFiltered(this.ordersState.pagination.pageIndex, this.ordersState.pagination.pageSize, this.ordersState.sort);
    });
  }

  refreshOrders() {
    this.ordersState = {...this.getPendingState(this.ordersState)};
    this.ordersStateSubject.next(this.ordersState);
    this.loadOrdersSortedAndFiltered(this.ordersState.pagination.pageIndex, this.ordersState.pagination.pageSize, this.ordersState.sort);
  }

  private loadOrdersSortedAndFiltered(pageIndex: number, pageSize: number, sort: Sort) {
    this.ordersApiService.loadOrdersPaginatedAndSorted(pageIndex, pageSize, sort).pipe(
      take(1),
      map<{ orders: Order[], totalCount: number }, OrdersPaginatedState>(data => {
        return {
          ...this.ordersState,
          orders: {
            domain: data.orders,
            requestStatus: {status: "COMPLETED"}
          },
          pagination: {
            ...this.ordersState.pagination,
            length: data.totalCount
          }
        };
      }),
      catchError(err => {
        const errorResponse: OrdersPaginatedState = {
          ...this.ordersState,
          orders: {
            domain: [], requestStatus: {
              status: "ERROR",
              error: {
                message: "Something went wrong. Please try again later"
              }
            }
          }
        };
        return of(errorResponse);
      })
    ).subscribe(state => {
      this.ordersState = {...state};
      this.ordersStateSubject.next(this.ordersState);
    });
  }


  private getPendingState(ordersPaginatedState: OrdersPaginatedState): OrdersPaginatedState {
    return {
      ...ordersPaginatedState,
      orders: {
        ...ordersPaginatedState.orders,
        requestStatus: {status: "PENDING"}
      }
    };
  }

}
