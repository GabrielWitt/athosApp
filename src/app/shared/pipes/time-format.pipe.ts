import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import * as timezone from 'moment-timezone';

@Pipe({
  name: 'timeFormat'
})
export class TimeFormatPipe implements PipeTransform {
  // | timeFormat:'h:mm A'
  private RESULT = '';

  transform(date: string, method: string) {
    this.RESULT = '';
    
    switch (method){
      case 'DD/MM/YYYY':
        this.RESULT =  moment(date).format('DD/MM/YYYY');
        break;
      case 'h:mm A':
        this.RESULT =  moment(date).format('h:mm A');
        break;
      case 'shortDateUTC': 
        this.RESULT =  moment.parseZone(date).format('DD/MM/YYYY');
        break;
      case 'fullDateUTC': 
        this.RESULT =  moment.parseZone(date).format('DD/MM/YYYY h:mm A');
        break;
      case 'displayDateUTC': 
        this.RESULT =  moment.parseZone(date).format('dddd, DD') + ' de ' +moment.parseZone(date).format('MMMM, YYYY');
        break;
      case 'TimeUTC':
        this.RESULT =  moment.parseZone(date).format('h:mm A');
        break;
      case 'MonthDisplay':
        this.RESULT =  moment.parseZone(date).format('MMMM / YYYY');
        break;
      default:
        this.RESULT =  date;
    }
    return this.RESULT;
  }
}
