import { Component, Input, OnInit } from '@angular/core';
import { CalendarItem } from 'src/app/core/models/calendar';

@Component({
  selector: 'app-detail-reservation',
  templateUrl: './detail-reservation.component.html',
  styleUrls: ['./detail-reservation.component.scss'],
})
export class DetailReservationComponent implements OnInit {
  @Input() request: CalendarItem
  defaultSpace = '../../../../../assets/blueprint.png';

  constructor() { }

  ngOnInit() {}

}
