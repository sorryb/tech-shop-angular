import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Sort } from '@angular/material/sort';
import { Order, OrderStatus } from '@food-shop-architecture-workshop/core/model';
import { API_BASE_URL } from '../api-url.token';

@Injectable()
export class OrdersApiService {
  constructor(private httpClient: HttpClient, @Inject(API_BASE_URL) private apiBaseUrl: string) {}

  public createOrder(order: Order): Observable<Order> {
    return this.httpClient.post<Order>(`${this.apiBaseUrl}/order`, order);
  }

  public loadOrders(): Observable<Order[]> {
    return this.httpClient.get<Order[]>(`${this.apiBaseUrl}/order`);
  }

  public getOrdersTotalCount(): Observable<number> {
    const params: HttpParams = new HttpParams().append('_page', 1).append('_limit', 10);
    return this.httpClient
      .get<Order[]>(`${this.apiBaseUrl}/order`, { params, observe: 'response' })
      .pipe(
        map((response) => (response.headers.get('X-Total-Count') ? Number(response.headers.get('X-Total-Count')) : 0))
      );
  }

  public loadOrdersPaginatedAndSorted(
    pageIndex: number,
    pageSize: number,
    sort: Sort
  ): Observable<{ orders: Order[]; totalCount: number }> {
    const _start = pageIndex * pageSize;
    const _end = _start + pageSize;
    const _sort = sort.active;
    const _order = sort.direction;
    let params: HttpParams = new HttpParams().append('_start', _start).append('_end', _end);
    if (sort.direction !== '' && sort.direction !== null) {
      params = params.append('_sort', _sort).append('_order', _order);
    }
    return this.httpClient
      .get<Order[]>(`${this.apiBaseUrl}/order`, {
        observe: 'response',
        params: params,
      })
      .pipe(
        map((response) => {
          return {
            orders: response.body ? response.body : [],
            totalCount: response.headers.get('X-Total-Count') ? Number(response.headers.get('X-Total-Count')) : 0,
          };
        })
      );
  }

  public loadOrderById(orderId: string): Observable<Order> {
    return this.httpClient.get<Order>(`${this.apiBaseUrl}/order/${orderId}`);
  }

  public updateOrderStatus(order: Order, newOrderStatus: OrderStatus) {
    return this.httpClient.patch<Order>(`${this.apiBaseUrl}/order/${order.id}`, {
      orderStatus: newOrderStatus,
    });
  }

  public updateOrderStatus2(orderId:string, newOrderStatus: OrderStatus) {
    return this.httpClient.patch<Order>(`${this.apiBaseUrl}/order/${orderId}`, {
      orderStatus: newOrderStatus,
    });
  }
}
