import { OrdersApiService } from './services/orders-api.service';
import { StateSerializerService } from './services/state-serializer.service';
import { CommonModule } from '@angular/common';
import { CategoriesApiService } from './services/categories-api.service';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ProductsApiService } from './services/products-api.service';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    ProductsApiService,
    CategoriesApiService,
    StateSerializerService,
    OrdersApiService,
  ],
})
export class ApiServiceModule {}
