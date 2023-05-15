import { ApplicationState } from '../../../store/app-state.module';
import { createSelector } from '@ngrx/store';
import { FavoriteState } from './favorite-state.model';
import { Product } from '@food-shop-architecture-workshop/core/model';

const favoriteSelector = (appState: ApplicationState) => appState.favoriteState;

export const getAllFavoriteProducts = createSelector<ApplicationState, FavoriteState, Array<Product>>(favoriteSelector, (favoriteState) => {
  return favoriteState.products;
});


export const isProductToFavorite = (productId: number | string) =>
  createSelector<ApplicationState, Array<Product>, boolean>(getAllFavoriteProducts, (favoriteProducts) => {
    return !!favoriteProducts.find(product => product.id === productId);
  });
