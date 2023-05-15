import { createReducer, on } from '@ngrx/store';
import { FavoriteState } from './favorite-state.model';
import { FavoriteActions } from './favorite.actions';

const favoriteInitialState: FavoriteState = {
  products: []
};

export const favoriteReducer = createReducer<FavoriteState>(favoriteInitialState,
  on(FavoriteActions.addProduct, (state, { product }) => {
    return {
      ...state,
      products: [...state.products, product]
    };
  }),
  on(FavoriteActions.removeProduct, (state, { productId }) => {
    return {
      ...state,
      products: [...state.products.filter(product => product.id !== productId)]
    };
  }),
  on(FavoriteActions.removeAllProducts, (state) => {
    return {
      ...state,
      products: []
    };
  })
);
