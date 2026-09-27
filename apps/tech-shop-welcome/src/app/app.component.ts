import { Component } from '@angular/core';

@Component({
  selector: 'tech-shop-welcome-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  readonly storefrontUrl = 'http://localhost:4200';
  readonly backofficeUrl = 'http://localhost:4201';
}
