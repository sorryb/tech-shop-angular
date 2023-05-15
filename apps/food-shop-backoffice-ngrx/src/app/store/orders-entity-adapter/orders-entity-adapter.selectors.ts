import { ApplicationState, OrdersEntityAdapterState } from '../app-state.model';
import { orderEntityAdapter } from './orders-entity-adapter.reducer';
import { createSelector } from '@ngrx/store';
import { Order, OrderStatus } from '@food-shop-architecture-workshop/core/model';


export const ordersEntityAdapterState = (appState: ApplicationState) => appState.ordersEA;

const { selectIds, selectEntities, selectTotal, selectAll } = orderEntityAdapter.getSelectors();

export const getAllOrders = createSelector<ApplicationState, OrdersEntityAdapterState, Order[]>(ordersEntityAdapterState, selectAll);
export const getOrderStatusFilter = createSelector<ApplicationState, OrdersEntityAdapterState, OrderStatus | undefined>(ordersEntityAdapterState, s1 => s1.orderStatusFilter);


// export const getAllOrdersDependingOnCurrentOrderStatus = createSelector()

export const getAllOrdersFiltered = createSelector<ApplicationState, Order[], OrderStatus | undefined, Order[]>(getAllOrders, getOrderStatusFilter, (s1, s2) => {
  if (s2 === undefined) {
    return s1;
  } else {
    return s1.filter(ord => ord.orderStatus === (s2 as OrderStatus));
  }
});


export const getAllOrdersByStatus = (orderStatus: OrderStatus) => createSelector<ApplicationState, Order[], Order[]>(getAllOrders, allOrders => {
  return allOrders.filter(order => order.orderStatus === orderStatus);
});

