import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteWidgetComponent } from './components/favorite-widget/favorite-widget.component';
import { FavoriteListComponent } from './components/favorite-list/favorite-list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [FavoriteWidgetComponent, FavoriteListComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    MatTooltipModule,
  ],
  exports: [FavoriteWidgetComponent],
})
export class FoodShopFavoriteFavoriteWidgetModule {}
