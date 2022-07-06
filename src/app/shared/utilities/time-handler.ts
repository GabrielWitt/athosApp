import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as moment from 'moment';
import * as timezone from 'moment-timezone';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class TimeHandlerModule {
  year = [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Deciembre'];

    // tslint:disable: radix

  formatUTC(dateInfo: any){
    return moment().utc(dateInfo).format();
  }

  getUTCHours(time){
    const day = moment(time).format('DD-MM-YYYY');
    const hour = parseInt(moment(time).format('H'));
    const min = parseInt(moment(time).format('m'));
    return moment(day , 'DD-MM-YYYY').hours(hour).minutes(min).toDate();
  }

  getCurrentNYTime(){
    const day = timezone().tz('America/Guayaquil').format('MM-DD-YYYY');
    const hour = parseInt(timezone().tz('America/Guayaquil').format('H'));
    const min = parseInt(timezone().tz('America/Guayaquil').format('m'));
    return moment(day , 'MM-DD-YYYY').hours(hour).minutes(min).toDate();
  }

  momentFromNow(date) {
    return moment(date).fromNow();
  }

  DateFixer(date, hours){
    let now = '' + moment().format();
    if (date){now = '' + moment(date).format(); }
    const translator = moment.utc(hours).format('kk:mm:ss');
    return  now.split('T')[0] + 'T' + translator;
  }

  ReservationDateString(start, end){
    return moment.parseZone(start).format('dddd, MM/DD/YYYY | h:mm a') + ' - ' + moment.parseZone(end).format('h:mm a');
  }

  maxTimeString(date){
    let RESULT = 'Unlimited time';
    if (date){
      // tslint:disable-next-line: radix
      let hours = (parseInt(date) / 60).toFixed(1);
      hours = hours.split('.')[0];
      // tslint:disable-next-line: radix
      const minutes = parseInt(date) - (parseInt(hours) * 60);
      RESULT = (hours !== '0') ? hours + ((hours !== '1') ? ' hours ' : ' hour ') : '';
      RESULT = RESULT + ((minutes !== 0) ? minutes + ' minutes' : '');
    }
    return RESULT;
  }

  joinDateTimeInISO8601 = (date: string, time: string) => {
    const momentTime = moment(time, 'HH:mm');
    return moment(date).set({h: momentTime.hours(), m: momentTime.minutes(), s: 0 }).format('YYYY-MM-DDTHH:mm:ss');
  }

  getTodayMidDay(){
    return moment().set({h: 12, m: 0, s: 0, ms: 0}).toISOString();
  }

  getTomorrow(){
    return moment().add(1,'day').set({h: 12, m: 0, s: 0, ms: 0}).toISOString();
  }

  getMonth(date){
    return moment.parseZone(date).format('MMMM YYYY');
  }

  getTodayUTCDate(){
    return moment.parseZone().toISOString();
  }

  getUTCDate(date){
    const dateFix = {day: moment.parseZone(date).format('MM/DD/YY'), display: moment.parseZone(date).format('ddd, MMM DD, hh:mm A')}
    return dateFix;
  }

  getStartDate(date){
    return moment.parseZone().toISOString();
    const dateFix = {day: moment.parseZone(date).format('MM/DD/YY'), display: moment.parseZone(date).format('ddd, MMM DD, hh:mm A')}
    return dateFix;
  }

  getDateOrder(a, b){
    return moment(a).isAfter(moment(b)) ?  -1 : moment(b).isBefore(moment(a)) ? 1 : 0;
  }

  checkBundleDate(limitDate, startDate){
    return moment.parseZone(limitDate) > moment.parseZone(startDate)
  }

  async fixByMonth(list){
    let final = []; let count = 1;
    const sortList = list.sort((a, b) => this.getDateOrder(a, b) );
    // tslint:disable-next-line: prefer-const
    let Months: any = { 12: [], 11: [], 10: [], 9: [], 8: [], 7: [], 6: [], 5: [], 4: [], 3: [], 2: [], 1: [] };
    for (const billData of sortList){
      let created_at = '';
      if(billData.created_at){created_at = billData.created_at; }else{ created_at = billData.services[0].created_at}
      const billMonth = parseInt(created_at.split('T')[0].split('-')[1]);
      Months[billMonth].push(billData);
    }
    for (const m of this.year){
      if (Months[count].length !== 0){ const Month = { name: Months[count][0].created_at, services: Months[count] }; final.push(Month); } count++;
    }
    final =  final.sort((a, b) => this.getDateOrder(a.name, b.name) );
    return final;
  }

 }

 export const joinDateTimeInISO8601 = (date: string, time: string) => {
  const momentTime = moment(time, 'HH:mm');
  return moment(date).set({h: momentTime.hours(), m: momentTime.minutes(), s: 0 }).format('YYYY-MM-DDTHH:mm:ss');
};
