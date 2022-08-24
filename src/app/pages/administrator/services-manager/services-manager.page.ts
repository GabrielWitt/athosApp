import { Component, OnInit } from '@angular/core';
import { UserController } from 'src/app/core/controller/user.controller';

@Component({
  selector: 'app-services-manager',
  templateUrl: './services-manager.page.html',
  styleUrls: ['./services-manager.page.scss'],
})
export class ServicesManagerPage implements OnInit {
  selectedTab = 'request'

  constructor(public userCtrl: UserController) { }

  ngOnInit() {
  }

  segmentChanged(ev: any) {
    this.selectedTab = ev.detail.value;
  }

}
