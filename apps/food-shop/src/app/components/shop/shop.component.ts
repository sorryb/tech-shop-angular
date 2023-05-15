import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { ProductsState, ProductsStateService } from '../../services/products-state.service';
import { Observable } from 'rxjs';
import { CartStateService } from '../../services/cart-state.service';
import { CategorySummary, Product } from '@food-shop-architecture-workshop/core/model';
import { OverlayProductDetailsDialog } from '../product-details-overlay/product-details-overlay.component';

@Component({
  selector: 'app-shop',
  templateUrl: 'shop.component.html'
})
export class ShopComponent {

  shopState: Observable<ProductsState>;

  matSnackbarRef: MatSnackBarRef<any> | undefined;
  @ViewChild('templatePortalContent') templatePortalContent!: TemplateRef<any>;

  constructor(
    private dialog: MatDialog, private snackBar: MatSnackBar,
    private productsStateService: ProductsStateService,
    private cartStateService: CartStateService
  ) {
    productsStateService.loadAllProducts();
    productsStateService.loadAllCategories();
    this.shopState = this.productsStateService.productsState$;

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
    this.cartStateService.addProductToCart({ product, quantity: 1 });
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
    this.productsStateService.filterProducts(categorySummary);
  }

}



