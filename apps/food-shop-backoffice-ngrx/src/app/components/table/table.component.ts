import { Component, ContentChild, Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appTableHeader]'
})
export class TableHeaderDirective {
  constructor(public templateRef: TemplateRef<unknown>) {
  }
}

@Directive({
  selector: '[appTableRow]'
})
export class TableRowDirective {
  constructor(public templateRef: TemplateRef<unknown>) {
  }
}


@Component({
  selector: 'app-table-project',
  templateUrl: 'table.component.html',
  styleUrls: ['table.component.scss']
})
export class TableComponent {

  @Input()
  data!: Array<any>;


  @ContentChild(TableHeaderDirective)
  tableHeader!: TableHeaderDirective;

  @ContentChild(TableRowDirective)
  tableRow!: TableRowDirective;


}
