import { Component, EventEmitter, Input, OnDestroy, Output, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { Subject, take, takeUntil } from 'rxjs';
import { MatButton } from '@angular/material/button';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { Router } from '@angular/router';
import { TemplatePortal } from '@angular/cdk/portal';
import { Product, ProductOrder } from '@food-shop-architecture-workshop/core/model';

@Component({
  selector: 'app-favorite-widget',
  templateUrl: 'favorite-widget.component.html'
})
export class FavoriteWidgetComponent implements OnDestroy {
  @Input()
  favoriteProducts: Array<Product> = [];
  @ViewChild('favoriteButton')
  favoriteButton!: MatButton;
  overlayRef: OverlayRef | undefined;
  @ViewChild('favoriteList') templatePortalContent!: TemplateRef<any>;
  @Output()
  addProductToCart: EventEmitter<ProductOrder> = new EventEmitter<ProductOrder>();
  @Output()
  addAllProductsToCart: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  removeProductFromFavorite: EventEmitter<Product> = new EventEmitter<Product>();
  private disposeObservables: Subject<any> = new Subject();

  constructor(
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef,
    private router: Router
  ) {
  }

  showFavoriteDetails(): void {
    this.overlayRef = this.overlay.create({
      positionStrategy: this.overlay
        .position()
        .flexibleConnectedTo(this.favoriteButton._elementRef)
        .withPositions([
          {
            originX: 'end',
            originY: 'top',
            overlayX: 'end',
            overlayY: 'top',
            offsetY: 40
          }]),
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      width: '350px',
      maxHeight: '500px',
      hasBackdrop: true,
      disposeOnNavigation: true
    });
    this.overlayRef.attach(new TemplatePortal(this.templatePortalContent, this.viewContainerRef));
    this.overlayRef
      .backdropClick()
      .pipe(takeUntil(this.disposeObservables), take(1))
      .subscribe((_) => {
        this.overlayRef?.detach();
        this.overlayRef = undefined;
      });
  }

  ngOnDestroy(): void {
    this.disposeObservables.next('');
  }

  handleAddProducts() {
    this.router.navigate([]);
    this.overlayRef?.dispose();
  }

  handleAddProductToCart(productOrder: ProductOrder) {
    this.addProductToCart.emit(productOrder);
    if (this.favoriteProducts.length === 1) {
      this.overlayRef?.dispose();
    }
  }

  handleAddAllProductsToCart(event: boolean) {
    this.addAllProductsToCart.emit(event);
    this.overlayRef?.dispose();
  }

  handleRemoveProductFromFavorite(product: Product) {
    this.removeProductFromFavorite.emit(product);
    if (this.favoriteProducts.length === 1) {
      this.overlayRef?.dispose();
    }
  }
}
