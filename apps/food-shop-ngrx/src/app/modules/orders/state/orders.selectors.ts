import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ORDERS_REDUX_KEY, OrdersState } from './orders-state.model';
import { DomainEntity, Order } from '@food-shop-architecture-workshop/core/model';


const ordersFeatureSelector = createFeatureSelector<OrdersState>(ORDERS_REDUX_KEY);

export const getOrdersState = createSelector(ordersFeatureSelector, s1 => s1);
export const getSelectedOrder = createSelector<OrdersState, OrdersState, DomainEntity<Order | undefined>>(getOrdersState, s1 => s1.selectedOrder);


export const isOrderDetailsLoaded = (orderId: string) => createSelector(getSelectedOrder, s1 => {
  {
    if (s1.requestStatus.status === 'NEW' || s1.requestStatus.status === 'PENDING') {
      return false;
    } else if (s1.requestStatus.status === 'ERROR') {
      return true;
    } else {
      return s1.domain?.id === orderId;
    }
  }
});
