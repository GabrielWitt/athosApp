import { Component, OnInit } from '@angular/core';
import { UserController } from 'src/app/core/controller/user.controller';

@Component({
  selector: 'app-services-staff',
  templateUrl: './services-staff.page.html',
  styleUrls: ['./services-staff.page.scss'],
})
export class ServicesStaffPage implements OnInit {
  selectedTab = 'request'

  constructor(public userCtrl: UserController) { }

  ngOnInit() {
  }

  segmentChanged(ev: any) {
    this.selectedTab = ev.detail.value;
  }
}
