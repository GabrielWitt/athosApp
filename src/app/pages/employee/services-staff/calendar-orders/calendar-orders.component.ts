import { Component, OnInit } from '@angular/core';
import { ServicesController } from 'src/app/core/controller/services.controller';
import { CalendarItem } from 'src/app/core/models/calendar';
import { UserFormData } from 'src/app/core/models/user';
import { CalendarService, CustomDayHeader } from 'src/app/core/services/modules/calendar.service';
import { FireAuthService } from 'src/app/core/services/modules/fire-auth.service';
import { RequestsService } from 'src/app/core/services/modules/requests.service';

import { Calendar, createElement, DayHeaderContentArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';

@Component({
  selector: 'app-calendar-orders',
  templateUrl: './calendar-orders.component.html',
  styleUrls: ['./calendar-orders.component.scss'],
})
export class CalendarOrdersComponent implements OnInit {
  calendarItems: CalendarItem[] = [];
  currentUser: UserFormData;
  loading = false;
  filterSelected: '>'|'<' = '>'

  filterItems = [
    {name: 'Próximas',filter: '>'},
    {name: 'Pasadas',filter: '<'}
  ]
  constructor(
    private calendar: CalendarService, 
    private requests: RequestsService,
    public auth: FireAuthService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.loadData().then(() => {this.loading = false;});
    let calendarEl: HTMLElement = document.getElementById('calendar')!;

    let calendar = new Calendar(calendarEl, {
      plugins: [ dayGridPlugin, timeGridPlugin, listPlugin ],
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      },
      initialDate: '2018-01-12',
      navLinks: true, // can click day/week names to navigate views
      editable: true,
      dayMaxEvents: true, // allow "more" link when too many events
      dayHeaderContent(arg: DayHeaderContentArg) {
        return createElement(CustomDayHeader, { text: arg.text })
      },
      events: [
        {
          title: 'All Day Event',
          start: '2018-01-01',
        },
        {
          title: 'Long Event',
          start: '2018-01-07',
          end: '2018-01-10'
        },
        {
          groupId: '999',
          title: 'Repeating Event',
          start: '2018-01-09T16:00:00'
        },
        {
          groupId: '999',
          title: 'Repeating Event',
          start: '2018-01-16T16:00:00'
        },
        {
          title: 'Conference',
          start: '2018-01-11',
          end: '2018-01-13'
        },
        {
          title: 'Meeting',
          start: '2018-01-12T10:30:00',
          end: '2018-01-12T12:30:00'
        },
        {
          title: 'Lunch',
          start: '2018-01-12T12:00:00'
        },
        {
          title: 'Meeting',
          start: '2018-01-12T14:30:00'
        },
        {
          title: 'Happy Hour',
          start: '2018-01-12T17:30:00'
        },
        {
          title: 'Dinner',
          start: '2018-01-12T20:00:00'
        },
        {
          title: 'Birthday Party',
          start: '2018-01-13T07:00:00'
        },
        {
          title: 'Click for Google',
          url: 'http://google.com/',
          start: '2018-01-28'
        }
      ]
    });
  
    calendar.render();
  }

  async loadData(){
    const user = await this.auth.getUser()
    this.currentUser = user.data;
    this.calendarItems = await this.calendar.readFutureServicesByUser(this.currentUser.uid, new Date().toISOString(),this.filterSelected);
    this.calendarItems.sort((a,b)=>{
      if(a.startDate > b.startDate){return 1}
      if(a.startDate < b.startDate){return -1}
      return 0
    })
    await this.requests.readRequestListOrder()
    .then((data:any) => { 
      console.log(data);
      this.calendarItems.forEach(item => {
        data.forEach(service => {
          if(item.uid === service.uid){
            item['service'] = service;
          }
        })
      })
    });
    console.log(this.calendarItems);
    return null;
    /*
    this.calendarItems = await this.calendar.readScheduleServicesByUser(this.currentUser.uid);
    this.calendar.readReservationCalendar().then(data => {
      console.log(data);
    })
     */
  }

  async doRefresh(refresh?){
    // load 
    await this.loadData();
    if (refresh){ refresh.target.complete(); }
  }

  filterChange(e){
    this.filterSelected = e.detail.value;
    this.loadData();
  }
}
