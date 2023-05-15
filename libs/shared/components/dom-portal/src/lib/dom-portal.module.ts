import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalModule } from '@angular/cdk/portal';
import { DomPortalComponent } from './dom-portal.component';

@NgModule({
  imports: [CommonModule, PortalModule],
  declarations: [DomPortalComponent],
  exports: [DomPortalComponent],
})
export class DomPortalModule {}
