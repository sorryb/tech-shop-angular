import { createReducer, on } from '@ngrx/store';
import { OrdersState } from './orders-state.model';
import { OrdersActions } from './orders.actions';


const initialOrdersState: OrdersState = {
  domain: [],
  requestStatus: {
    status: 'NEW'
  },
  selectedOrder: {
    domain: undefined,
    requestStatus: {
      status: 'NEW'
    }
  }
};

export const ordersReducer = createReducer<OrdersState>(initialOrdersState,
  on(OrdersActions.loadOrders, (state) => {
    return {
      ...state,
      requestStatus: {
        status: 'PENDING'
      }
    };
  }),

  on(OrdersActions.setOrderDetails, (state, { order }) => {
    return {
      ...state,
      selectedOrder: {
        domain: order,
        requestStatus: {
          status: 'COMPLETED'
        }
      }
    };
  }),
  on(OrdersActions.loadOrdersSuccess, (state, { orders }) => {
    return {
      ...state,
      domain: orders,
      requestStatus: { status: 'COMPLETED' }
    };
  }),
  on(OrdersActions.loadOrderDetails, (state) => {
    return {
      ...state,
      selectedOrder: {
        ...state.selectedOrder,
        requestStatus: {
          status: 'PENDING'
        }
      }
    };
  }),
  on(OrdersActions.loadOrderDetailsSuccess, (state, { order }) => {
    return {
      ...state,
      selectedOrder: {
        domain: order,
        requestStatus: {
          status: 'COMPLETED'
        }
      }
    };
  })
);
