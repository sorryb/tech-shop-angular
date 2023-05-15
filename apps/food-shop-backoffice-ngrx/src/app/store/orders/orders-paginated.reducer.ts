import { createReducer, on } from '@ngrx/store';
import { OrdersPaginatedState } from '../app-state.model';
import { OrdersPaginatedActions } from './orders-paginated.actions';


const initialState: OrdersPaginatedState = {
  orders: {
    domain: [],
    requestStatus: {
      status: 'NEW'
    }
  },
  sort: {
    active: '',
    direction: ''
  },
  pagination: {
    length: 0,
    pageIndex: 0,
    pageSize: 10
  }
};

export const ordersPaginatedReducer = createReducer<OrdersPaginatedState>(initialState,
  on(OrdersPaginatedActions.updateSortAndPagination, (state, { pagination, sort }) => {
    return {
      ...state,
      orders: {
        domain: [],
        requestStatus: {
          status: 'PENDING'
        }
      },
      pagination: {
        ...state.pagination,
        pageSize: pagination.pageSize !== undefined ? pagination.pageSize : state.pagination.pageSize,
        pageIndex: pagination.pageIndex !== undefined ? pagination.pageIndex : state.pagination.pageIndex
      },
      sort: {
        active: sort.active,
        direction: sort.direction
      }
    };
  }),
  on(OrdersPaginatedActions.loadOrdersSuccess, (state, { orders, totalCount }) => {
    return {
      ...state,
      orders: {
        domain: orders,
        requestStatus: {
          status: 'COMPLETED'
        },
        totalCount
      }
    };
  })
);
