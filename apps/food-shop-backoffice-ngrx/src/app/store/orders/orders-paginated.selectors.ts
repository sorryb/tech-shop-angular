import { ApplicationState } from '../app-state.model';
import { createSelector } from '@ngrx/store';

const appState = (appState: ApplicationState) => appState;
export const getOrdersPaginatedState = createSelector(appState, appState => appState.ordersPaginated);
export const getOrdersPaginationConfig = createSelector(getOrdersPaginatedState, state => {
  return {
    pagination: state.pagination,
    sort: state.sort
  };
});
