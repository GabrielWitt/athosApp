import { Component, Input, OnInit } from '@angular/core';
import { Service } from 'src/app/core/models/services';

@Component({
  selector: 'app-detail-service',
  templateUrl: './detail-service.component.html',
  styleUrls: ['./detail-service.component.scss'],
})
export class DetailServiceComponent implements OnInit {
  @Input() service: Service;
  @Input() reserve: boolean;
  defaultSpace = '../../../../../assets/blueprint.png';

  constructor() { }

  ngOnInit() {}

}
