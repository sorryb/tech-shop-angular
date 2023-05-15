import {Injectable} from "@angular/core";
import {BehaviorSubject, catchError, map, Observable, of, Subject, switchMap} from "rxjs";
import {Sort} from "@angular/material/sort";
import {DomainEntity, Order, OrderStatus} from "@food-shop-architecture-workshop/core/model";
import {OrdersApiService} from "@food-shop-architecture-workshop/core/services/api-service";
import {sortOrders} from "@food-shop-architecture-workshop/food-shop-backoffice/orders/order-status-table";

export interface OrdersState {
  orders: DomainEntity<Order[]>;
  filterOrderStatus: OrderStatus | undefined;
  sort: Sort;
}

@Injectable()
export class BoOrdersService {

  private ordersState: OrdersState = {
    orders: {domain: [], requestStatus: {status: "NEW"}},
    filterOrderStatus: undefined,
    sort: {
      direction: "",
      active: ""
    }
  };
  private ordersSubject: Subject<OrdersState> = new BehaviorSubject(this.ordersState);
  public ordersState$: Observable<OrdersState> = this.ordersSubject.asObservable();
  public ordersSortedAndFiltered$: Observable<OrdersState> = this.ordersState$.pipe(
    map(state => {
      return {
        ...state,
        orders: {
          ...state.orders,
          domain: state.filterOrderStatus === undefined ?
            sortOrders([...state.orders.domain], state.sort) :
            sortOrders([...state.orders.domain.filter(ord => ord.orderStatus === state.filterOrderStatus)], state.sort)
        }
      };

    })
  );

  constructor(private ordersApiService: OrdersApiService) {
  }

  public getOrdersFilteredByOrderStatus(orderStatus: OrderStatus): Observable<OrdersState> {
    return this.ordersState$.pipe(
      map(ordersState => {
        return {
          ...ordersState, orders: {
            ...ordersState.orders,
            domain: ordersState.orders.domain.filter(x => x.orderStatus === orderStatus)
          }
        };
      })
    );
  }

  public loadAllOrders(): void {
    this.setPendingState();
    this.loadOrders().subscribe((state) => {
      this.ordersState = {
        ...this.ordersState,
        orders: state
      };
      this.ordersSubject.next(this.ordersState);
    });
  }

  public updateOrderStatus(order: Order, newOrderStatus: OrderStatus) {
    this.setPendingState();
    this.ordersApiService.updateOrderStatus(order, newOrderStatus).pipe(
      switchMap(_ => this.loadOrders())
    ).subscribe((state) => {
      this.ordersState = {
        ...this.ordersState,
        orders: state
      };
      this.ordersSubject.next(this.ordersState);
    });

  }

  private loadOrders(): Observable<DomainEntity<Order[]>> {
    return this.ordersApiService.loadOrders().pipe(
      map<Order[], DomainEntity<Order[]>>(orders => ({
        domain: orders, requestStatus: {
          status: "COMPLETED"
        }
      })),
      catchError(err => {
        const errorPayload: DomainEntity<Order[]> = {
          domain: [],
          requestStatus: {
            status: "ERROR",
            error: {message: "Something went wrong"}
          }
        };
        return of(errorPayload);
      })
    );
  }

  private setPendingState(): void {
    this.ordersState = {
      ...this.ordersState, orders: {
        ...this.ordersState.orders, requestStatus: {
          status: "PENDING"
        }
      }
    };
    this.ordersSubject.next(this.ordersState);
  }

  sortOrdersOnlyOnFE(sort: Sort): void {
    this.ordersState = {
      ...this.ordersState,
      sort: sort
    };
    this.ordersSubject.next(this.ordersState);
  }

  filterOrdersOnlyFe(orderStatus: OrderStatus | undefined): void {
    this.ordersState = {
      ...this.ordersState,
      filterOrderStatus: orderStatus
    };
    this.ordersSubject.next(this.ordersState);
  }

}


