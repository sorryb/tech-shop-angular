import { ActionReducerMap } from '@ngrx/store';
import { ShopState } from '../modules/shop/store/shop-state.model';
import { shopReducer } from '../modules/shop/store/shop.reducer';
import { FavoriteState } from '../modules/favorite/store/favorite-state.model';
import { favoriteReducer } from '../modules/favorite/store/favorite.reducer';
import { CartState } from '../modules/cart/cart-state.model';
import { cartReducer } from '../modules/cart/cart.reducer';

export interface ApplicationState {
  shopState: ShopState;
  cartState: CartState;
  favoriteState: FavoriteState;
}

export const foodShopActionReducerMap: ActionReducerMap<ApplicationState> = {
  shopState: shopReducer,
  cartState: cartReducer,
  favoriteState: favoriteReducer
};

