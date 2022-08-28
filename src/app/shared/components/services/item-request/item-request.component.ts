import { Component, Input, OnInit } from '@angular/core';
import { CalendarItem } from 'src/app/core/models/calendar';

@Component({
  selector: 'app-item-request',
  templateUrl: './item-request.component.html',
  styleUrls: ['./item-request.component.scss'],
})
export class ItemRequestComponent implements OnInit {
  @Input() request: CalendarItem;
  @Input() reserve: boolean;
  defaultSpace = '../../../../../assets/blueprint.png';

  constructor() { }

  ngOnInit() {}

}
