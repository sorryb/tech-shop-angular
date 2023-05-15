import { createReducer, on } from '@ngrx/store';
import { ShopState } from './shop-state.model';
import { ShopActions } from './shop.actions';

const shopInitialState: ShopState = {
  domain: {
    categories: [],
    products: []
  },
  requestStatus: {
    status: 'NEW'
  },
  filter: undefined,
  ordersTotalCount: {
    domain: 0,
    requestStatus: {
      status: 'NEW'
    }
  }
};


export const shopReducer = createReducer<ShopState>(shopInitialState,
  on(ShopActions.loadProductsAndCategories, (state) => ({
    ...state, domain: { categories: [], products: [] },
    requestStatus: { status: 'PENDING' }
  })),
  on(ShopActions.loadProductsAndCategoriesSuccess, (state, { products, categories }) => ({
    ...state, domain: { categories, products },
    requestStatus: { status: 'COMPLETED' }
  })),
  on(ShopActions.loadProductsAndCategoriesFailed, (state, { errorMessage, errorCode }) => ({
    ...state, domain: { categories: [], products: [] },
    requestStatus: { status: 'ERROR', error: { message: errorMessage, code: errorCode } }
  })),
  on(ShopActions.filterProducts, (state, { productType }) => {
    return {
      ...state,
      filter: productType
    };
  }),
  on(ShopActions.countOrders, (state) => {
    return {
      ...state,
      ordersTotalCount: {
        ...state.ordersTotalCount,
        requestStatus: {
          status: 'NEW'
        }
      }
    };
  }),
  on(ShopActions.counterOrdersSuccess, (state, { totalOrders }) => {
    return {
      ...state,
      ordersTotalCount: {
        ...state.ordersTotalCount,
        domain: totalOrders,
        requestStatus: {
          status: 'COMPLETED'
        }
      }
    };
  }),
  on(ShopActions.countOrdersFailed, (state, { errorMessage }) => {
    return {
      ...state, ordersTotalCount: {
        ...state.ordersTotalCount,
        requestStatus: {
          status: 'ERROR',
          error: {
            message: errorMessage
          }
        }
      }
    };
  })
);
