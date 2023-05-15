import { ApplicationState } from '../../store/app-state.module';
import { createSelector } from '@ngrx/store';
import { CartState } from './cart-state.model';
import { ProductOrder } from '@food-shop-architecture-workshop/core/model';

const selectCartState = (appState: ApplicationState) => appState.cartState;

export const getAllProductsInCart = createSelector<ApplicationState, CartState, Array<ProductOrder>>(selectCartState, (cartState) => {
  return cartState.products;
});

export const getAllProductsInCartWithTotalQuantity = createSelector<ApplicationState, Array<ProductOrder>, { products: ProductOrder[], totalQuantity: number }>(getAllProductsInCart, (allProducts) => {
  return {
    totalQuantity: allProducts.length === 0 ? 0 : allProducts.map(prod => prod.quantity).reduce((a, b) => a + b),
    products: allProducts
  };
});
