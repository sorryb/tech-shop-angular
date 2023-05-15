import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { Observable, tap } from 'rxjs';
import { CategorySummary, Product } from '@food-shop-architecture-workshop/core/model';
import { OverlayProductDetailsDialog } from '../product-details-overlay/product-details-overlay.component';
import { Store } from '@ngrx/store';
import { ApplicationState } from '../../../../store/app-state.module';
import { ShopActions } from '../../store/shop.actions';
import { getShopStateWithProductsFiltered } from '../../store/shop.selectors';
import { ShopState } from '../../store/shop-state.model';
import { CartActions } from '../../../cart/cart.actions';

@Component({
  selector: 'app-shop',
  templateUrl: 'shop.component.html'
})
export class ShopComponent {

  shopState$: Observable<ShopState>;

  matSnackbarRef: MatSnackBarRef<any> | undefined;
  @ViewChild('templatePortalContent') templatePortalContent!: TemplateRef<any>;

  constructor(
    private store: Store<ApplicationState>,
    private dialog: MatDialog, private snackBar: MatSnackBar
  ) {
    this.store.dispatch(ShopActions.loadProductsAndCategories());
    this.shopState$ = this.store.select(getShopStateWithProductsFiltered).pipe(
      tap(v => {
        console.log(v);
      })
    );
  }

  showProductDetails(product: Product): void {
    this.dialog.open(OverlayProductDetailsDialog, {
      width: '100%',
      maxWidth: '584px',
      maxHeight: '90vh',
      panelClass: 'no-padding-dialog',
      data: {
        product,
        numberOfServings: 1
      }
    });

  }

  handleAddToBag(product: Product) {
    this.store.dispatch(CartActions.addProduct({
      productOrder: {
        product,
        quantity: 1
      }
    }));
    this.matSnackbarRef = this.snackBar.openFromTemplate(this.templatePortalContent,
      {
        horizontalPosition: 'end',
        verticalPosition: 'top',
        data: product,
        duration: 4000,
        panelClass: 'custom-snackbar'
      });
  }

  filterProducts(categorySummary: CategorySummary | undefined) {
    this.store.dispatch(ShopActions.filterProducts({ productType: categorySummary?.type }));
  }

}



