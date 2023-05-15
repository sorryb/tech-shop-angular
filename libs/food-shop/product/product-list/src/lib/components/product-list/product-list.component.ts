import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { combineLatest, map, Observable } from 'rxjs';
import { Product } from '@food-shop-architecture-workshop/core/model';

@Component({
  selector: 'app-product-list',
  templateUrl: 'product-list.component.html',
})
export class ProductListComponent implements OnInit {
  @Input()
  products: Product[] = [];
  ingredientsSliceValue$: Observable<number>;

  @Output()
  onShowProductDetails: EventEmitter<Product> = new EventEmitter<Product>();

  @Output()
  onAddToBag: EventEmitter<Product> = new EventEmitter<Product>();

  constructor(private breakpointsObserver: BreakpointObserver) {
    this.ingredientsSliceValue$ = combineLatest([
      breakpointsObserver.observe(Breakpoints.XSmall),
      breakpointsObserver.observe(Breakpoints.Small),
      breakpointsObserver.observe(Breakpoints.Medium),
      breakpointsObserver.observe(Breakpoints.Large),
      breakpointsObserver.observe(Breakpoints.XLarge),
    ]).pipe(
      map(([xs, sm, md, lg, xl]) =>
        xs.matches
          ? 400
          : sm.matches
          ? 35
          : md.matches
          ? 25
          : lg.matches
          ? 25
          : 30
      )
    );
  }

  ngOnInit(): void {}

  addToBag(product: Product) {
    this.onAddToBag.emit(product);
  }

  showProductDetails(product: Product) {
    this.onShowProductDetails.emit(product);
  }
}
