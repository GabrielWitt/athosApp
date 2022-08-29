import { Injectable } from '@angular/core';
import { serverTimestamp } from 'firebase/firestore';
import * as moment from 'moment';
import * as timezone from 'moment-timezone';
import { AlertsService } from './alerts';

moment.locale('fr', {
  months : 'enero_febrero_marzo_abril_mayo_junio_juilio_agosto_septiembre_octubre_noviembre_diciembre'.split('_'),
  monthsShort : 'ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.'.split('_'),
  monthsParseExact : true,
  weekdays : 'domingo_lunes_martes_miércoles_jueves_viernes_sabado'.split('_'),
  weekdaysShort : 'dom._lun._mar._mie._jue._vie._sab.'.split('_'),
  weekdaysMin : 'Do_Lu_Ma_Mi_Ju_Vi_Sa'.split('_'),
  weekdaysParseExact : true,
  longDateFormat : {
      LT : 'HH:mm',
      LTS : 'HH:mm:ss',
      L : 'DD/MM/YYYY',
      LL : 'D MMMM YYYY',
      LLL : 'D MMMM YYYY HH:mm',
      LLLL : 'dddd D MMMM YYYY HH:mm'
  },
  calendar : {
      sameDay : '[Hoy a las] LT',
      nextDay : '[Mañaña a las] LT',
      nextWeek : 'dddd [de la semana siguiente] LT',
      lastDay : '[Ayer a las] LT',
      lastWeek : 'dddd [de la semana anterior] LT',
      sameElse : 'L'
  },
  relativeTime : {
      future : 'sera en %s',
      past : 'fue hace %s',
      s : 'hace segundos',
      m : 'hace un minuto',
      mm : '%d minutos',
      h : 'una hora',
      hh : '%d horas',
      d : 'un día',
      dd : '%d días',
      M : 'un mes',
      MM : '%d meses',
      y : 'un año',
      yy : '%d años'
  },
  dayOfMonthOrdinalParse : /\d{1,2}(er|e)/,
  ordinal : function (number) {
      return number + (number === 1 ? 'er' : 'e');
  },
  meridiemParse : /PD|MD/,
  isPM : function (input) {
      return input.charAt(0) === 'M';
  },
  // In case the meridiem units are not separated around 12, then implement
  // this function (look at locale/id.js for an example).
  // meridiemHour : function (hour, meridiem) {
  //     return /* 0-23 hour, given meridiem token and hour 1-12 */ ;
  // },
  meridiem : function (hours, minutes, isLower) {
      return hours < 12 ? 'AM' : 'PM';
  },
  week : {
      dow : 1, // Monday is the first day of the week.
      doy : 4  // Used to determine first week of the year.
  }
});
moment.locale('es');


@Injectable({
  providedIn: 'root'
})
export class TimeHandlerModule {
  year = 'enero_febrero_marzo_abril_mayo_junio_juilio_agosto_septiembre_octubre_noviembre_diciembre'.split('_')
  
  constructor(private alerts: AlertsService){}

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

  getDateOrder(a, b){
    return moment(a).isAfter(moment(b)) ?  -1 : moment(b).isBefore(moment(a)) ? 1 : 0;
  }

  dateTransform(data){
    if(data?.seconds){
      return moment(data.seconds * 1000 + data.nanoseconds/1000000).toISOString();
    } else {
      return moment.parseZone().toISOString();
    }
  }

  maxTimeString(date){
    let RESULT = 'Tiempo ilimitado';
    if (date){
      // tslint:disable-next-line: radix
      let hours = (parseInt(date) / 60).toFixed(1);
      hours = hours.split('.')[0];
      // tslint:disable-next-line: radix
      const minutes = parseInt(date) - (parseInt(hours) * 60);
      RESULT = (hours !== '0') ? hours + ((hours !== '1') ? ' horas ' : ' hora ') : '';
      RESULT = RESULT + ((minutes !== 0) ? minutes + ' minutos' : '');
    }
    return RESULT;
  }

  getCurrentDateEs(){
    return moment().format('ddd, DD MMM YYYY');
  }

  getShortDate(date){
    return moment(date).format('DD/MM/YYYY');
  }

  getShortDateUTC(date){
    return moment.parseZone(date).format('DD_MM_YYYY');
  }

  geDateFullUTC(date){
    return moment.parseZone(date).format('DD/MM/YYYY');
  }

  getStartTime(selectedDate, startTime){
    return moment(moment(selectedDate).format('MM/DD/YY') + ' ' + moment(startTime).format('HH:mm')).toISOString();
  }

  getScheduleList(scheduleDate, startTime, endTime, addTime){
    return new Promise((resolve) => {
      let list = [];
      try {
        const endTimeSchedule = moment(moment(scheduleDate).format('MM/DD/YY') + ' ' + moment(endTime).format('HH:mm'), 'MM/DD/YY HH:mm');
        const currentTime = moment(moment(scheduleDate).format('MM/DD/YY') + ' ' + moment(startTime).format('HH:mm'), 'MM/DD/YY HH:mm');
        const LocalTime = { day: moment().format('MM/DD/YY'), hour: moment().format('HH'), minute: moment().format('mm')};
    
        while (currentTime.isBefore(endTimeSchedule)) {
          const newSlot = {
            date: currentTime.format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z',
            time: currentTime.format('h:mm A') + ' - ' + moment(currentTime).add(addTime, 'minutes').format('h:mm A'),
            disabled: moment(moment(currentTime).add(addTime, 'minutes')).isBefore(moment(LocalTime.day).set({hour: parseInt(LocalTime.hour), minute: parseInt(LocalTime.minute)}))? true : false,
            selected: false,
            isFirst: ( moment(currentTime).isBefore(moment()) && list ) ? true : false
          };
          if (currentTime.add(addTime, 'minutes').isSameOrBefore(endTimeSchedule)){ list.push(newSlot); }
        }
        resolve(list);
      } catch (error) {
        console.log(error);
        resolve(list);
      }
    })
  }

  clickDaySlot(scheduleTimes,timeSlotStart,timeSlotEnd,timeSlot,index,timeToAdd,maximumTime){
    return new Promise((resolve) => {
      try {
        if (timeSlotStart.date && timeSlotEnd.date && timeSlotStart.index !== timeSlotEnd.index) {
          scheduleTimes.forEach((slot) => { slot.selected = false; });
          timeSlotStart = { hour: null, date: null, index: null };
          timeSlotEnd = { hour: null, date: null, index: null };
          timeSlotStart = {
            hour: moment.parseZone(timeSlot.date).format('h:mm A'),
            date: moment.parseZone(timeSlot.date).toISOString(),
            index
          };
          timeSlotEnd = {
            hour: moment.parseZone(timeSlot.date).add(timeToAdd, 'minutes').format('h:mm A'),
            date: moment.parseZone(timeSlot.date).add(timeToAdd, 'minutes').toISOString(),
            index
          };
          timeSlot.selected = true;
          timeSlot.isFirstSelected = true;
        } else if (!timeSlotStart.date) {
          timeSlotStart = {
            hour: moment.parseZone(timeSlot.date).format('h:mm A'),
            date: moment.parseZone(timeSlot.date).toISOString(),
            index
          };
          timeSlotEnd = {
            hour: moment.parseZone(timeSlot.date).add(timeToAdd, 'minutes').format('h:mm A'),
            date:  moment.parseZone(timeSlot.date).add(timeToAdd, 'minutes').toISOString(),
            index
          };
          timeSlot.selected = true;
          timeSlot.isFirstSelected = true;
        } else if (timeSlotStart.date) {
          console.log('timeSlotStart.date',timeSlot.date, timeSlotStart.date)
          if (timeSlot.date === timeSlotStart.date) {
            scheduleTimes.forEach((slot) => {
              slot.selected = false;
              slot.isFirstSelected = true;
            });
            timeSlotStart = { hour: null, date: null, index: null };
            timeSlotEnd = { hour: null, date: null, index: null };
          } else if (moment.parseZone(timeSlot.date).isBefore(moment.parseZone(timeSlotStart.date))) {
            scheduleTimes.forEach((slot) => {
              slot.selected = false;
            });
            timeSlotStart = {
              hour: moment.parseZone(timeSlot.date).format('h:mm A'),
              date: moment.parseZone(timeSlot.date).add(timeToAdd, 'minutes').toISOString(),
              index
            };
            timeSlotEnd = {
              hour: moment.parseZone(timeSlot.date).add(timeToAdd, 'minutes').format('h:mm A'),
              date:  moment.parseZone(timeSlot.date).add(timeToAdd, 'minutes').toISOString(),
              index
            };
            timeSlot.selected = true;
            timeSlot.isFirstSelected = true;
          } else if (moment.parseZone(timeSlot.date).isAfter(moment.parseZone(timeSlotStart.date))) {
            const saved = timeSlotStart.index;
            let indexSelected = timeSlotStart.index; let countTwo = 0;
            while (moment.parseZone(scheduleTimes[indexSelected].date).isBefore(moment.parseZone(timeSlot.date))) {
              countTwo++;
              if (scheduleTimes[indexSelected].disabled) {
                this.alerts.showAlert('TIEMPO DE RESERVA',
                'El tiempo seleccionado se cruza con otra reservación')
                .then(back => {
                  scheduleTimes.forEach((slot) => {
                    slot.selected = false;
                  });
                  timeSlotStart = {
                    hour: moment.parseZone(scheduleTimes[saved].date).format('h:mm A'),
                    date: moment.parseZone(scheduleTimes[saved].date).toISOString(),
                    index: scheduleTimes[saved].index
                  };
                  timeSlotEnd = {
                    hour:  moment.parseZone(scheduleTimes[saved].date).add(timeToAdd, 'minutes').format('h:mm A'),
                    date:  moment.parseZone(scheduleTimes[saved].date).add(timeToAdd, 'minutes').toISOString(),
                    index: scheduleTimes[saved].index
                  };
                  scheduleTimes[saved].selected = true;
                  scheduleTimes[saved].isFirstSelected = true;
                });
                break;
              } else {
                scheduleTimes[indexSelected].selected = true;
                indexSelected += 1;
                scheduleTimes[indexSelected].isFirstSelected = (moment.parseZone(scheduleTimes[indexSelected].date).isBefore(moment.parseZone())
                && scheduleTimes || (scheduleTimes[countTwo - 1].isFirstSelected !== true)) ? true : false;
              }
            }
    
            const end = moment.parseZone(scheduleTimes[index].date).add(timeToAdd, 'minutes');
            let start = moment.parseZone(timeSlotStart.date);
              // Repairs if date moves +1/-1 day because UTC transform
              // tslint:disable-next-line: radix
            start = moment.parseZone(end.format('YYYY-MM-DD'), 'YYYY-MM-DD').set({h: parseInt(start.format('k')), m: parseInt(start.format('m'))});
            const diff = end.diff(start, 'minutes');
    
            if (maximumTime > 0 && diff > maximumTime) {
                this.alerts.showAlert('TIEMPO DE RESERVA',
                `El tiempo seleccionado excede el tiempo máximo de reserva (${this.maxTimeString(maximumTime)})`)
                .then(back => {
                  scheduleTimes.forEach((slot) => {
                    slot.selected = false;
                  });
                  timeSlotStart = {
                    hour: moment.parseZone(scheduleTimes[saved].date).format('h:mm A'),
                    date: moment.parseZone(scheduleTimes[saved].date).toISOString(),
                    index: saved
                  };
                  timeSlotEnd = {
                    hour:  moment.parseZone(scheduleTimes[saved].date).add(timeToAdd, 'minutes').format('h:mm A'),
                    date:  moment.parseZone(scheduleTimes[saved].date).add(timeToAdd, 'minutes').toISOString(),
                    index: saved
                  };
                  scheduleTimes[saved].selected = true;
                  scheduleTimes[saved].isFirstSelected = true;
                });
              } else {
                timeSlotEnd = {
                  hour:  moment.parseZone(scheduleTimes[index].date).add(timeToAdd, 'minutes').format('h:mm A'),
                  date:  moment.parseZone(scheduleTimes[saved].date).add(timeToAdd, 'minutes').toISOString(),
                  index: index + 1
                };
              }
              timeSlot.selected = true;
            }
          }
        resolve({scheduleTimes,timeSlotStart,timeSlotEnd,timeSlot});
      } catch (error) {
        console.log(error);
        resolve(null);
      }
    })
  }

  scheduleTimeElapsed(start, end){
    const diff = moment(end).diff(moment(start), 'minutes');
    return this.maxTimeString(diff);
  }

  getStartHours(timeSlot){
    return moment(timeSlot).format('h:mm A')
  }

  getEndHours(timeSlot,addTime){
    return moment(timeSlot).add(addTime, 'minutes').format('h:mm A')
  }

  getStartDate(){
    return moment().hours(8).minutes(0).seconds(0).millisecond(0).toISOString();
  }

  getEndDate(){
    return moment().hours(18).minutes(0).seconds(0).millisecond(0).toISOString();
  }

  getCurrentMonthStart(date){
    return moment.parseZone(date).startOf('month').toISOString();
  }

  getEndMonth(date){
    return moment.parseZone(date).endOf('month').toISOString();
  }

  getNextMonStart(date){
    return moment.parseZone(date).add(1, 'months').toISOString();
  }

  getPrevMonStart(date){
    return moment.parseZone(date).subtract(1, 'months').toISOString();
  }

  getSelectedDate(date){
    return moment(date).toISOString();
  }

  getMonthName(date){
    return moment.parseZone(date).format('MMMM');
  }

  timeSpent(lastUpdate){
    const a = moment();
    const b = moment.parseZone(lastUpdate);
    console.log(a.toISOString(),b.toISOString())
    return a.diff(b, 'minutes');
  }

 }

 export const joinDateTimeInISO8601 = (date: string, time: string) => {
  const momentTime = moment(time, 'HH:mm');
  return moment(date).set({h: momentTime.hours(), m: momentTime.minutes(), s: 0 }).format('YYYY-MM-DDTHH:mm:ss');
};