import { Component, Input, OnInit } from '@angular/core';
import { StatusList } from 'src/app/core/models/calendar';

@Component({
  selector: 'app-status-request',
  templateUrl: './status-request.component.html',
  styleUrls: ['./status-request.component.scss'],
})
export class StatusRequestComponent implements OnInit {
  @Input() status: StatusList;

  constructor() { }

  ngOnInit() {
  }

}
