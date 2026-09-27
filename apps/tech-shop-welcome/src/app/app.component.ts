import { Component } from '@angular/core';
import { environment } from '../environments/environment';

@Component({
  selector: 'tech-shop-welcome-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  readonly storefrontUrl = environment.storefrontUrl;
  readonly backofficeUrl = environment.backofficeUrl;
}
