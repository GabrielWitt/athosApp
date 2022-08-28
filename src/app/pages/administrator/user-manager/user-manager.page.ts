import { Component, OnInit } from '@angular/core';
import { UserController } from 'src/app/core/controller/user.controller';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.page.html',
  styleUrls: ['./user-manager.page.scss'],
})
export class UserManagerPage implements OnInit {
  selectedTab = 'users'

  constructor(public userCtrl: UserController) { }

  ngOnInit() {
  }

  segmentChanged(ev: any) {
    this.selectedTab = ev.detail.value;
  }
}