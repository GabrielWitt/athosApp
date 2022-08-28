import { Component, Input, OnInit } from '@angular/core';
import { reservationSlot } from 'src/app/core/models/calendar';

@Component({
  selector: 'app-reservation-item',
  templateUrl: './reservation-item.component.html',
  styleUrls: ['./reservation-item.component.scss'],
})
export class ReservationItemComponent implements OnInit {
  @Input() item: reservationSlot

  constructor() { }

  ngOnInit() {console.log(this.item)}

}
