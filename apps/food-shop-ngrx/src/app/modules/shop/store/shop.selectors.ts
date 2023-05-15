import { ApplicationState } from '../../../store/app-state.module';
import { createSelector } from '@ngrx/store';
import { ShopState } from './shop-state.model';
import { CategorySummary, DomainEntity, Product } from '@food-shop-architecture-workshop/core/model';


const shopState = (appState: ApplicationState) => appState.shopState;

export const getProductsAndCategoriesState = createSelector<ApplicationState, ShopState, ShopState>(shopState, s1 => {
  return s1;
});

export const getShopStateWithProductsFiltered = createSelector<ApplicationState, ShopState, ShopState>(getProductsAndCategoriesState, state => {
  if (state.filter === undefined) {
    return { ...state };
  } else {
    const filterCategorySummary: CategorySummary | undefined = state.domain.categories.find(cat => cat.type === state.filter);
    return {
      ...state,
      domain: {
        ...state.domain,
        products: state.domain.products.filter(product => product.productType === state.filter)
      }
    };
  }

});

export const getAllProducts = createSelector<ApplicationState, ShopState, Product[]>(getProductsAndCategoriesState, (s1) => {
  return s1.domain.products;
});
export const getAllCategories = createSelector<ApplicationState, ShopState, CategorySummary[]>(getProductsAndCategoriesState, (s1) => {
  return s1.domain.categories;
});

const categoriesAndProducts = createSelector<ApplicationState, ApplicationState, Product[], CategorySummary[], { categories: number, products: number }>([getAllProducts, getAllCategories], (products, categories) => {
  return {
    categories: categories.length,
    products: products.length
  };
});

export const getCountOrders = createSelector<ApplicationState, ShopState, DomainEntity<number>>(shopState, (s1) => {
  return s1.ordersTotalCount;
});

