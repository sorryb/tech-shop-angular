import { AfterViewInit, Component, Input, OnDestroy, ViewChild } from '@angular/core';
import { CdkPortal, DomPortalOutlet } from '@angular/cdk/portal';

@Component({
  selector: 'app-dom-portal',
  templateUrl: 'dom-portal.component.html'
})
export class DomPortalComponent implements AfterViewInit, OnDestroy {
  @Input()
  selector!: string;

  @ViewChild(CdkPortal)
  private portal!: CdkPortal;

  private host!: DomPortalOutlet;

  ngAfterViewInit(): void {
    this.host = new DomPortalOutlet(
      document.querySelector(this.selector) as Element
    );
    this.host.attachTemplatePortal(this.portal);
  }

  ngOnDestroy(): void {
    this.host.detach();
  }
}
