import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-data-yet-message',
  templateUrl: './not-data-yet-message.component.html',
  styleUrls: ['./not-data-yet-message.component.scss'],
})
export class NotDataYetMessageComponent implements OnInit {
  @Input() text: string;
  @Input() icon: string;

  constructor() { }

  ngOnInit() {}

}
