import { createReducer, on } from '@ngrx/store';
import { OrdersStats } from '../app-state.model';
import { StatsActions } from './stats.actions';

const statsInitialState: OrdersStats = {
  domain: [],
  requestStatus: {
    status: 'NEW'
  }
};

export const statsReducer = createReducer<OrdersStats>(statsInitialState,
  on(StatsActions.loadStats, (state) => {
    return {
      ...state,
      domain: [],
      requestStatus: {
        status: 'PENDING'
      }
    };
  }),
  on(StatsActions.loadStatsSuccess, (state, { orders }) => {
    return {
      ...state,
      domain: orders,
      requestStatus: {
        status: 'COMPLETED'
      }
    };
  }),
  on(StatsActions.loadStatsFailed, (state, { errorMessage }) => {
    return {
      ...state,
      domain: [],
      requestStatus: {
        status: 'ERROR',
        error: {
          message: errorMessage
        }
      }
    };
  })
);
