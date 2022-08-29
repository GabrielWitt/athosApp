import { Component, Input, OnInit } from '@angular/core';
import { CalendarItem } from 'src/app/core/models/calendar';


@Component({
  selector: 'app-calendar-service-item',
  templateUrl: './calendar-service-item.component.html',
  styleUrls: ['./calendar-service-item.component.scss'],
})
export class CalendarServiceItemComponent implements OnInit {
  @Input() item: CalendarItem

  constructor() { }

  ngOnInit() {}

}
