import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@NgModule({
  imports: [CommonModule, MatIconModule],
  exports: [],
})
export class IconsRegistryModule {
  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon(
      'user-chef',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/user-chef-light.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'chart-line-light',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/chart-line-light.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'chart-pie-light',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/chart-pie-light.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'chart-mixed-light',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/chart-mixed-light.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'chart-simple-horizontal-light',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/chart-simple-horizontal-light.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'burger-soda-light',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/burger-soda-light.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'minus-solid',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/minus-solid.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'plus-solid',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/plus-solid.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'star-solid',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/star-solid.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'star-half-duotone',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/star-half-duotone.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'heart-light',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/heart-light.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'heart-solid',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/heart-solid.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'close',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/xmark-solid.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'basket',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/basket-shopping-simple-solid.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'trash-light',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/trash-light.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'cart-circle-plus-light',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/cart-circle-plus-light.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'arrow-left-solid',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/arrow-left-solid.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'menu',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/bars-solid.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'memo-circle-info-light',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/memo-circle-info-light.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'memo-circle-info-solid',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/memo-circle-info-solid.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'circle-info',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/circle-info.svg')
    );
  }
}
