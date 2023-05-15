import { Component, Input } from '@angular/core';
import { StatsRow } from '../../model/stats-row.model';

@Component({
  selector: 'app-stats',
  templateUrl: 'stats.component.html',
})
export class StatsComponent {
  Math = Math;

  @Input()
  statsRows!: StatsRow[];
}
