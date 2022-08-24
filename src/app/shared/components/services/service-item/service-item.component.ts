import { Component, Input, OnInit } from '@angular/core';
import { Service } from 'src/app/core/models/services';

@Component({
  selector: 'app-service-item',
  templateUrl: './service-item.component.html',
  styleUrls: ['./service-item.component.scss'],
})
export class ServiceItemComponent implements OnInit {
  @Input() service: Service;
  @Input() maintenance: boolean;
  defaultService = '../../../../../assets/cleaning.png';

  constructor() { }

  ngOnInit() {}

}
