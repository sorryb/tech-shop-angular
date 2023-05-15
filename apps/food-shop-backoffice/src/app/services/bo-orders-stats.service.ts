import {Injectable} from "@angular/core";
import {BehaviorSubject, catchError, map, Observable, of, take} from "rxjs";
import {DomainEntity, Order} from "@food-shop-architecture-workshop/core/model";
import {OrdersApiService} from "@food-shop-architecture-workshop/core/services/api-service";
import {StatsRow} from "@food-shop-architecture-workshop/food-shop-backoffice/orders/stats";
import {getAllDeliveredCanceledOrdersStats, getNewProcessingAcceptedOrdersStats} from "@food-shop-architecture-workshop/food-shop-backoffice/orders/order-status-table";


export interface OrdersStatsState extends DomainEntity<{ allDeliveredCanceledOrdersStats: StatsRow[], newProcessingAcceptedOrdersStats: StatsRow[] }> {

}


@Injectable()
export class BoOrdersStatsService {

  private ordersStatsState: OrdersStatsState = {
    domain: {
      allDeliveredCanceledOrdersStats: [],
      newProcessingAcceptedOrdersStats: []
    },
    requestStatus: {status: "NEW"}
  };

  private ordersStatsStateSubject: BehaviorSubject<OrdersStatsState> = new BehaviorSubject(this.ordersStatsState);
  public ordersStatsState$: Observable<OrdersStatsState> = this.ordersStatsStateSubject.asObservable();

  constructor(private ordersApi: OrdersApiService) {
  }

  public loadAllStats(): void {
    this.ordersStatsState = {...this.ordersStatsState, requestStatus: {status: "PENDING"}};
    this.ordersStatsStateSubject.next(this.ordersStatsState);
    this.ordersApi.loadOrders().pipe(
      map<Array<Order>, OrdersStatsState>(orders => {
        return {
          domain: {
            allDeliveredCanceledOrdersStats: getAllDeliveredCanceledOrdersStats(orders),
            newProcessingAcceptedOrdersStats: getNewProcessingAcceptedOrdersStats(orders)
          }, requestStatus: {status: "COMPLETED"}
        };
      }),
      catchError(err => {
        const errorPayload: OrdersStatsState = {
          domain: {
            allDeliveredCanceledOrdersStats: [],
            newProcessingAcceptedOrdersStats: []
          },
          requestStatus: {
            status: "ERROR",
            error: {message: "Something went wrong"}
          }
        };
        return of(errorPayload);
      }),
      take(1)
    ).subscribe(value => {
      this.ordersStatsState = value;
      this.ordersStatsStateSubject.next(this.ordersStatsState);
    });

  }

}
