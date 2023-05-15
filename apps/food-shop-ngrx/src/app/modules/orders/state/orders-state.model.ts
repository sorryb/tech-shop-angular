import { DomainEntity, Order } from '@food-shop-architecture-workshop/core/model';

export interface OrdersState extends DomainEntity<Array<Order>> {
  selectedOrder: DomainEntity<Order | undefined>;
}

export const ORDERS_REDUX_KEY = 'orders';
