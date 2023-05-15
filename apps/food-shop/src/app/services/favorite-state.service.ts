import {Injectable} from "@angular/core";
import {BehaviorSubject, map, Observable} from "rxjs";
import {StateSerializerService} from "@food-shop-architecture-workshop/core/services/api-service";
import {Product} from "@food-shop-architecture-workshop/core/model";

@Injectable()
export class FavoriteStateService {

  private favoriteProducts: Array<Product> = [];
  private favoriteProductsSubject: BehaviorSubject<Array<Product>> = new BehaviorSubject<Array<Product>>(this.favoriteProducts);
  public favoriteProducts$: Observable<Array<Product>> = this.favoriteProductsSubject.asObservable();

  constructor(private stateSerializer: StateSerializerService) {
    let savedProducts = stateSerializer.restoreState();
    if (savedProducts && savedProducts.cartProducts && savedProducts.cartProducts.length > 0) {
      // todo: add dependency to products service and maybe filter out products which are
      // todo: no longer available
      this.favoriteProducts = savedProducts.favoriteProducts;
      this.favoriteProductsSubject.next(this.favoriteProducts);
    }
  }

  public isFavoriteProduct(product: Product): Observable<boolean> {
    return this.favoriteProducts$.pipe(
      map(products => !!products.find(prod => prod.id === product.id))
    );
  }

  public updateFavoriteState(payload: { product: Product, favorite: boolean }) {
    if (!payload.favorite) {
      this.favoriteProducts = this.favoriteProducts.filter(prod => prod.id !== payload.product.id);
    } else {
      if (!this.favoriteProducts.find(p => p.id === payload.product.id)) {
        this.favoriteProducts.push(payload.product);
      }
    }
    this.updateSubjectAndStoreToLocalStorage(this.favoriteProducts);
  }

  removeAllProducts() {
    this.favoriteProducts = [];
    this.updateSubjectAndStoreToLocalStorage(this.favoriteProducts);
  }

  removeProduct(product: Product) {
    this.favoriteProducts = this.favoriteProducts.filter(p => p.id !== product.id);
    this.updateSubjectAndStoreToLocalStorage(this.favoriteProducts);
  }

  private updateSubjectAndStoreToLocalStorage(favoriteProducts: Product[]) {
    this.favoriteProductsSubject.next(this.favoriteProducts);
    this.stateSerializer.saveFavoriteProducts(this.favoriteProducts);
  }

}
