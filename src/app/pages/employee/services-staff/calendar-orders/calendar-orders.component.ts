import { Component, OnInit } from '@angular/core';
import { ServicesController } from 'src/app/core/controller/services.controller';
import { CalendarItem } from 'src/app/core/models/calendar';
import { UserFormData } from 'src/app/core/models/user';
import { FireAuthService } from 'src/app/core/services/modules/fire-auth.service';
import { RequestsService } from 'src/app/core/services/modules/requests.service';

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
    private requests: RequestsService,
    public auth: FireAuthService
  ) { }

  ngOnInit() {
  }

}
