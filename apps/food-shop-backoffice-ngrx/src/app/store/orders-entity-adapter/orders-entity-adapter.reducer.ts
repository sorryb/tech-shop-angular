import { createReducer, on } from '@ngrx/store';
import { OrdersEntityAdapterState } from '../app-state.model';
import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { Order } from '@food-shop-architecture-workshop/core/model';
import { OrdersEntityAdapterActions } from './orders-entity-adapter.actions';


export const orderEntityAdapter: EntityAdapter<Order> = createEntityAdapter<Order>({
  selectId: (order: Order) => (order.id as string)
});

const initialState: OrdersEntityAdapterState = {
  ...orderEntityAdapter.getInitialState(),
  requestStatus: {
    status: 'NEW'
  },
  orderStatusFilter: undefined
};

export const ordersEntityAdapterReducer = createReducer<OrdersEntityAdapterState>(initialState,
  on(OrdersEntityAdapterActions.loadOrders, (state) => {
    return {
      ...state, requestStatus: {
        status: 'PENDING'
      }
    };
  }),
  on(OrdersEntityAdapterActions.loadOrdersSuccess, (state, { orders }) => {
    return {
      ...orderEntityAdapter.setAll(orders, state),
      requestStatus: {
        status: 'COMPLETED'
      }
    };
  }),
  on(OrdersEntityAdapterActions.loadOrdersFailed, (state, { errorMessage }) => {
    return {
      ...state,
      requestStatus: {
        status: 'ERROR',
        error: {
          message: errorMessage
        }
      }
    };
  }),
  on(OrdersEntityAdapterActions.updateOrder, (state) => {
    return {
      ...state,
      requestStatus: {
        status: 'PENDING'
      }
    };
  }),
  on(OrdersEntityAdapterActions.updateOrderSuccess, (state, { order }) => {
    return {
      ...orderEntityAdapter.setOne(order, state), requestStatus: {
        status: 'COMPLETED'
      }
    };
  }),
  on(OrdersEntityAdapterActions.setFilterByOrderStatus, (state, { orderStatus }) => {
    return {
      ...state,
      orderStatusFilter: orderStatus
    };
  })
);
