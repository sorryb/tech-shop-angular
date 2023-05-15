import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnixMomentPipe } from './pipes/unix-moment.pipe';
import { MomentPipe } from './pipes/moment.pipe';

@NgModule({
  declarations: [UnixMomentPipe, MomentPipe],
  imports: [CommonModule],
  exports: [UnixMomentPipe, MomentPipe],
})
export class SharedPipesModule {}
