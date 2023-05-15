import { Pipe, PipeTransform } from '@angular/core';

import * as moment from 'moment';

@Pipe({
  name: 'unixMoment',
})
export class UnixMomentPipe implements PipeTransform {
  transform(value: number): moment.Moment {
    return moment.unix(value);
  }
}
