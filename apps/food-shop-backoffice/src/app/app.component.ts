import {Component} from '@angular/core';
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {combineLatest, map, Observable} from "rxjs";

@Component({
  selector: 'food-shop-architecture-workshop-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isOpen = true;
  sideNavConfig$: Observable<{ isLargeScreen: boolean }>;


  constructor(
    private breakpointsObserver: BreakpointObserver
  ) {
    this.sideNavConfig$ = combineLatest([
      breakpointsObserver.observe([Breakpoints.XSmall, Breakpoints.Small]),
      breakpointsObserver.observe([Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge])
    ]).pipe(
      map(([small, large]) => {
        if (large.matches) {
          this.isOpen = true;
        }
        return {isLargeScreen: large.matches};
      })
    );
  }
}
