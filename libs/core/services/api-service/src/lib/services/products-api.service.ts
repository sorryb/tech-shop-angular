import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '@food-shop-architecture-workshop/core/model';
import { API_BASE_URL } from '../api-url.token';

@Injectable()
export class ProductsApiService {
  constructor(private httpClient: HttpClient, @Inject(API_BASE_URL) private apiBaseUrl: string) {}

  public loadProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.apiBaseUrl}/product`);
  }
}
