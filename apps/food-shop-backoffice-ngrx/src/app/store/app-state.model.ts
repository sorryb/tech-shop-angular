import { DomainEntity, Order, OrderStatus, PaginationConfig, RequestStatus } from '@food-shop-architecture-workshop/core/model';
import { ActionReducerMap } from '@ngrx/store';
import { statsReducer } from './stats/stats.reducer';
import { Sort } from '@angular/material/sort';
import { ordersPaginatedReducer } from './orders/orders-paginated.reducer';
import { EntityState } from '@ngrx/entity/src/models';
import { ordersEntityAdapterReducer } from './orders-entity-adapter/orders-entity-adapter.reducer';

export interface ApplicationState {
  stats: OrdersStats;
  ordersPaginated: OrdersPaginatedState;
  ordersEA: OrdersEntityAdapterState;
}


export interface OrdersPaginatedState {
  orders: DomainEntity<Order[]>;
  pagination: PaginationConfig;
  sort: Sort;
}


export interface OrdersEntityAdapterState extends EntityState<Order> {
  requestStatus: RequestStatus;
  orderStatusFilter: OrderStatus | undefined;
}


export interface OrdersStats extends DomainEntity<Order[]> {

}

export const appRootReducer: ActionReducerMap<ApplicationState> = {
  stats: statsReducer,
  ordersPaginated: ordersPaginatedReducer,
  ordersEA: ordersEntityAdapterReducer
};
