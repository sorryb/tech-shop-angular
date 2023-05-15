import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input-number-button',
  templateUrl: 'input-number-button.component.html',
})
export class InputNumberButtonComponent {
  @Input()
  value = 0;

  @Input()
  minValue = 0;

  @Output()
  valueChanged: EventEmitter<number> = new EventEmitter<number>();

  updateValue(value: number) {
    if (value >= this.minValue) {
      this.value = value;
      this.valueChanged.emit(this.value);
    }
  }
}
