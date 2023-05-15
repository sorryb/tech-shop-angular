import { createReducer, on } from '@ngrx/store';
import { CartState } from './cart-state.model';
import { CartActions } from './cart.actions';
import { updateProductOrderQuantity } from '../favorite/store/cart.util';
import { ProductOrder } from '@food-shop-architecture-workshop/core/model';


const cartInitialState: CartState = {
  products: []
};

export const cartReducer = createReducer<CartState>(cartInitialState,
  on(CartActions.addProduct, (state, { productOrder }) => {
    return {
      ...state, products: updateProductOrderQuantity([...state.products], productOrder)
    };
  }),
  on(CartActions.addProducts, (state, { productOrders }) => {
    let allProductOrders: Array<ProductOrder> = [...state.products];
    productOrders.forEach(po => {
      allProductOrders = updateProductOrderQuantity(allProductOrders, po);
    });
    return { ...state, products: allProductOrders };
  }),
  on(CartActions.updateQuantity, (state, { productOrder }) => ({
    ...state,
    products: state.products.map(prod => prod.product.id === productOrder.product.id ? { ...prod, quantity: productOrder.quantity } : { ...prod })
  })),
  on(CartActions.removeProduct, (state, { productOrder }) => ({
    ...state,
    products: state.products.filter(po => po.product.id !== productOrder.product.id)
  })),
  on(CartActions.removeAllProducts, (state) => ({ ...cartInitialState }))
);
