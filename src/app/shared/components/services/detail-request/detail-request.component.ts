import { Component, Input, OnInit } from '@angular/core';
import { CalendarItem } from 'src/app/core/models/calendar';
import { Service } from 'src/app/core/models/services';

@Component({
  selector: 'app-detail-request',
  templateUrl: './detail-request.component.html',
  styleUrls: ['./detail-request.component.scss'],
})
export class DetailRequestComponent implements OnInit {
  @Input() request: CalendarItem;
  @Input() reserve: boolean;
  defaultSpace = '../../../../../assets/blueprint.png';

  constructor() { }

  ngOnInit() {}

}