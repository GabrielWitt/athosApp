import { Component, Input, OnInit } from '@angular/core';
import { CalendarItem } from 'src/app/core/models/calendar';

@Component({
  selector: 'app-item-reservation',
  templateUrl: './item-reservation.component.html',
  styleUrls: ['./item-reservation.component.scss'],
})
export class ItemReservationComponent implements OnInit {
  @Input() request: CalendarItem
  defaultSpace = '../../../../../assets/blueprint.png';

  constructor() { }

  ngOnInit() {}

}
