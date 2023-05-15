import {Component} from '@angular/core';
import {ProductsStateService} from "./services/products-state.service";

@Component({
  selector: 'food-shop-architecture-workshop-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'food-shop';

  constructor(private productsStateService: ProductsStateService) {
  }
}
