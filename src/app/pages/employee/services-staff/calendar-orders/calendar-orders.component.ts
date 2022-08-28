import { Component, OnInit } from '@angular/core';
import { reservationSlot } from 'src/app/core/models/calendar';
import { CalendarService } from 'src/app/core/services/modules/calendar.service';

@Component({
  selector: 'app-calendar-orders',
  templateUrl: './calendar-orders.component.html',
  styleUrls: ['./calendar-orders.component.scss'],
})
export class CalendarOrdersComponent implements OnInit {
  calendarItems: reservationSlot[] = [];
  loading = false;

    constructor(
      private calendar: CalendarService
    ) { }
  
    ngOnInit() {
      this.loading = true;
      this.loadData().then(() => {this.loading = false;});
    }

    async loadData(){
      this.calendarItems = await this.calendar.readServicesCalendar()
      console.log(this.calendarItems);
      return null;
      /*
      this.calendar.readReservationCalendar().then(data => {
        console.log(data);
      })
       */
    }
  }
