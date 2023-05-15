import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputNumberButtonComponent } from './components/input-number-button/input-number-button.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [InputNumberButtonComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule],
  exports: [InputNumberButtonComponent],
})
export class SharedComponentsInputNumberButtonModule {}
