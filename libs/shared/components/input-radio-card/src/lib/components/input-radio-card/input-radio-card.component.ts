import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InputRadioCardModel } from '../../model/input-radio-card.model';

@Component({
  selector: 'app-input-radio-card',
  templateUrl: 'input-radio-card.component.html',
})
export class InputRadioCardComponent {
  @Input()
  title!: string;

  @Input()
  inputRadioCardModel: InputRadioCardModel[] = [];

  @Output()
  inputRadioCardModelChanged: EventEmitter<InputRadioCardModel[]> =
    new EventEmitter<InputRadioCardModel[]>();

  updateSelected(item: InputRadioCardModel) {
    this.inputRadioCardModel = this.inputRadioCardModel.map((cd) => {
      return cd.name === item.name
        ? { ...cd, selected: true }
        : { ...cd, selected: false };
    });
    this.inputRadioCardModelChanged.emit(this.inputRadioCardModel);
  }
}
