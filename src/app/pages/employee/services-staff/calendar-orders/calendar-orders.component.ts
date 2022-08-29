import { Component, OnInit } from '@angular/core';
import { CalendarItem } from 'src/app/core/models/calendar';
import { UserFormData } from 'src/app/core/models/user';
import { CalendarService } from 'src/app/core/services/modules/calendar.service';
import { FireAuthService } from 'src/app/core/services/modules/fire-auth.service';

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
    public auth: FireAuthService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.loadData().then(() => {this.loading = false;});
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
