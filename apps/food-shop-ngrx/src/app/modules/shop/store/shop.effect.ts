import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ApplicationState } from '../../../store/app-state.module';
import { CategoriesApiService, OrdersApiService, ProductsApiService } from '@food-shop-architecture-workshop/core/services/api-service';
import { catchError, forkJoin, map, of, switchMap } from 'rxjs';
import { ShopActions } from './shop.actions';


@Injectable()
export class ShopEffect {

  loadProductsAndCategories$ = createEffect(() => this.actions.pipe(
    ofType(ShopActions.loadProductsAndCategories),
    switchMap(() => forkJoin([
      this.categoriesApiService.loadProductCategories(),
      this.productsApiService.loadProducts()
    ]).pipe(
      map(([categories, products]) => {
        return ShopActions.loadProductsAndCategoriesSuccess({
          categories, products
        });
      }),
      catchError(err => {
        return of(ShopActions.loadProductsAndCategoriesFailed({
          errorMessage: 'Something went wrong',
          errorCode: 3213
        }));
      })
    ))
  ));

  countOrders$ = createEffect(() => {
    return this.actions.pipe(
      ofType(ShopActions.countOrders),
      switchMap(() => {
        return this.ordersApiService.getOrdersTotalCount().pipe(
          map(totalOrders => ShopActions.counterOrdersSuccess({ totalOrders })),
          catchError(err => of(ShopActions.countOrdersFailed({ errorMessage: 'Something went wrong ...' }))
          ));
      })
    );
  });


  constructor(
    private store: Store<ApplicationState>, private actions: Actions,
    private productsApiService: ProductsApiService, private categoriesApiService: CategoriesApiService,
    private ordersApiService: OrdersApiService
  ) {
  }


}
