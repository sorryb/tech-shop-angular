import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CategorySummary } from '@food-shop-architecture-workshop/core/model';

@Component({
  selector: 'app-category-summary-card',
  templateUrl: 'category-summary-card.component.html',
  styleUrls: ['category-summary-card.component.scss'],
})
export class CategorySummaryCardComponent {
  @Input()
  selected = 0;

  @Input()
  categorySummaries: CategorySummary[] = [];

  @Output()
  categorySelected: EventEmitter<CategorySummary | undefined> = new EventEmitter<CategorySummary | undefined>();

  updateCategorySelected(categorySummary: CategorySummary | undefined, selectedIndex: number) {
    this.selected = selectedIndex;
    this.categorySelected.emit(categorySummary);
  }
}


