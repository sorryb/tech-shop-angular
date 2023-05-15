import { Component, Inject, TemplateRef, ViewChild } from '@angular/core';
import { Product } from '@food-shop-architecture-workshop/core/model';
import { Observable, take } from 'rxjs';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ApplicationState } from '../../../../store/app-state.module';
import { FavoriteActions } from '../../../favorite/store/favorite.actions';
import { isProductToFavorite } from '../../../favorite/store/favorite.selectors';

@Component({
  selector: 'app-overlay-product-details',
  templateUrl: 'product-details-overlay.component.html'
})

export class OverlayProductDetailsDialog {

  product: Product;
  isFavoriteProduct$!: Observable<boolean>;
  numberOfServing: number;
  matSnackbarRef!: MatSnackBarRef<any>;

  @ViewChild('templatePortalContent') templatePortalContent!: TemplateRef<any>;

  constructor(
    private store: Store<ApplicationState>,
    public dialogRef: MatDialogRef<OverlayProductDetailsDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { product: Product; numberOfServings: number },
    private snackBar: MatSnackBar
  ) {
    this.product = data.product;
    this.numberOfServing = data.numberOfServings;
    this.isFavoriteProduct$ = this.store.select(isProductToFavorite(data.product.id)).pipe(
      take(1)
    );
  }

  closeDialog() {
    this.dialogRef.close();
  }

  handleAddToBag(item: { product: Product; quantity: number }) {
    // this.cartStateService.addProductToCart(item);
    this.dialogRef.close();
    this.matSnackbarRef = this.snackBar.openFromTemplate(this.templatePortalContent,
      {
        horizontalPosition: 'end',
        verticalPosition: 'top',
        data: item.product,
        duration: 4000,
        panelClass: 'custom-snackbar'
      });
  }

  handleFavoriteChanged(payload: { product: Product; favorite: boolean }) {
    if (payload.favorite) {
      this.store.dispatch(FavoriteActions.addProduct({ product: payload.product }));
    } else {
      this.store.dispatch(FavoriteActions.removeProduct({ productId: payload.product.id }));
    }
  }
}
