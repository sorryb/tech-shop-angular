import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategorySummary } from '@food-shop-architecture-workshop/core/model';
import { API_BASE_URL } from '../api-url.token';

@Injectable()
export class CategoriesApiService {
  constructor(private httpClient: HttpClient, @Inject(API_BASE_URL) private apiBaseUrl: string) {}

  public loadProductCategories(): Observable<CategorySummary[]> {
    return this.httpClient.get<CategorySummary[]>(`${this.apiBaseUrl}/categories`);
  }
}
