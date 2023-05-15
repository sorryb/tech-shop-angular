import { ApplicationState, OrdersStats } from '../app-state.model';
import { createSelector } from '@ngrx/store';
import { StatsRow } from '@food-shop-architecture-workshop/food-shop-backoffice/orders/stats';
import { getAllDeliveredCanceledOrdersStats, getNewProcessingAcceptedOrdersStats } from '@food-shop-architecture-workshop/food-shop-backoffice/orders/order-status-table';

export const appState = (appState: ApplicationState) => appState;

export const statsState = createSelector<ApplicationState, ApplicationState, OrdersStats>(appState, appState => appState.stats);

export const getStatsOfOrders = createSelector<ApplicationState, OrdersStats, { allDeliveredCanceledOrdersStats: StatsRow[], newProcessingAcceptedOrdersStats: StatsRow[] }>(statsState, statsState => {
  return {
    allDeliveredCanceledOrdersStats: getAllDeliveredCanceledOrdersStats(statsState.domain),
    newProcessingAcceptedOrdersStats: getNewProcessingAcceptedOrdersStats(statsState.domain)
  };
});
