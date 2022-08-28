import { Component, OnInit } from '@angular/core';
import { ServicesController } from 'src/app/core/controller/services.controller';
import { UserController } from 'src/app/core/controller/user.controller';

@Component({
  selector: 'app-services-resident',
  templateUrl: './services-resident.page.html',
  styleUrls: ['./services-resident.page.scss'],
})
export class ServicesResidentPage implements OnInit {

  constructor(
    public services: ServicesController,
    public userCtrl: UserController
    ) { }

  ngOnInit() {
  }

  segmentChanged(ev: any) {
    this.services.changeTab(ev.detail.value)
  }

}
